import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { randomUUID } from 'node:crypto';
import { createRun, startTutorial } from '../../../public/games/hollow-crown/rules.js';
import { freshProfile } from '../../../public/games/hollow-crown/storage.js';

const main = fs.readFileSync(new URL('../../../public/games/hollow-crown/main.js', import.meta.url), 'utf8');
const input = fs.readFileSync(new URL('../../../public/games/hollow-crown/input.js', import.meta.url), 'utf8');
function productionBody(start, end) {
  const first = main.indexOf(start), last = main.indexOf(end, first + start.length);
  assert.ok(first >= 0 && last > first, `missing production boundary: ${start}`);
  return main.slice(first, last);
}
const pauseCallback = main.match(/pause:(\(\)=>paused\?resume\(\):pause\(\))/)?.[1];
assert.ok(pauseCallback, 'production Controls pause callback must exist');
const lifecycleHandlers = ["window.addEventListener('blur'", "document.addEventListener('visibilitychange'"]
  .map(prefix => { const line = main.split('\n').find(line => line.startsWith(prefix)); assert.ok(line, prefix); return line; });

// CPU-only fixture: production Controls and main lifecycle bodies execute intact.
// Only browser rendering, sound output and persistence are inert doubles. This is
// neither a browser/playthrough test nor a product-side test API.
class Element extends EventTarget {
  constructor(tagName = 'DIV') {
    super(); this.tagName = tagName; this.style = {}; this.dataset = {};
    this.classList = { add() {}, remove() {} }; this.captures = new Set();
  }
  querySelector() { return new Element('I'); }
  querySelectorAll() { return []; }
  setPointerCapture(id) { this.captures.add(id); }
  hasPointerCapture(id) { return this.captures.has(id); }
  releasePointerCapture(id) { this.captures.delete(id); }
  focus() {}
}
function fixture(t, { playing = true } = {}) {
  const window = new Element('WINDOW'), document = new Element('DOCUMENT'), elements = new Map(), events = [];
  document.hidden = false;
  document.getElementById = id => {
    if (!elements.has(id)) elements.set(id, new Element(id === 'world' ? 'CANVAS' : 'BUTTON'));
    return elements.get(id);
  };
  const config = { seed: 56789, route: 'ash', startTalent: 'fleet-ash', challenge: 'normal', difficulty: 'pilgrim' };
  const context = vm.createContext({
    window, document, AbortController, crypto: { randomUUID }, createRun, startTutorial,
    profile: freshProfile(), config, run: playing ? createRun(config) : null,
    paused: false, overlay: playing ? '' : 'camp', lastPhase: 'combat', lastRoom: '', replaceReward: null,
    confirmAction: 'begin', confirmReturn: 'camp', runId: 'initial-run', credited: { rooms: 0, parries: 0, flawless: 0 }, controls: null,
    clearWarningCue() {}, requestAnimationFrame() {}, renderPanel: name => name,
    updateVisibility() {}, updateConfigNote() {}, updateHud() {}, safeCheckpoint() {},
    unlockProgress() {}, persist() {}, settleRun() {},
    sound: {
      pause() { events.push('audio:pause'); }, resume() { events.push('audio:resume'); },
      unlock() { events.push('audio:unlock'); }, setTheme(theme) { events.push(`theme:${theme}`); }
    },
    bridge: { state(state) { events.push(`bridge:${state}`); } },
    $: id => document.getElementById(id)
  });
  vm.runInContext(`
    ${input.replace('export class Controls', 'class Controls')}
    ${productionBody('function setOverlay(', 'function renderPanel(')}
    ${productionBody('function flushInput()', 'function resumeSave(')}
    ${productionBody('function pause(show=true)', 'function updateVisibility(')}
    controls = new Controls($('world'), {screenToGround(){return null;}}, {
      pause: ${pauseCallback}, gesture(){},
      enabled: () => !!run && !paused && !overlay && ['combat','tutorial'].includes(run.phase)
    });
    ${lifecycleHandlers.join('\n')}
  `, context);
  t.after(() => context.controls.dispose());
  function key(code = 'Escape', { type = 'keydown', repeat = false, target = 'world' } = {}) {
    const event = new Event(type, { cancelable: true });
    Object.defineProperties(event, { code: { value: code }, repeat: { value: repeat }, target: { value: document.getElementById(target) } });
    window.dispatchEvent(event);
    return event;
  }
  const run = code => vm.runInContext(code, context);
  return { context, events, key, run, window, document };
}

test('fresh Escape pauses through production main and clears held gameplay input', t => {
  const f = fixture(t);
  f.key('KeyJ'); f.key('KeyW');
  assert.equal(f.context.controls.read(f.context.run.player, true).attackHeld, true);
  assert.equal(f.key().defaultPrevented, true);
  assert.equal(f.context.paused, true); assert.equal(f.context.overlay, 'pause');
  const input = f.context.controls.read(f.context.run.player, true);
  assert.equal(input.attackHeld, false); assert.equal(input.moveZ, 0);
  assert.deepEqual(f.events, ['audio:pause', 'bridge:paused']);
});

test('one physical Escape hold cannot auto-resume combat or restart audio', t => {
  const f = fixture(t); f.key();
  for (let i = 0; i < 12; i++) {
    assert.equal(f.key('Escape', { repeat: true, target: 'pause-button' }).defaultPrevented, true);
    assert.equal(f.context.paused, true, `repeat ${i + 1} must stay paused`);
    assert.equal(f.context.overlay, 'pause');
  }
  assert.deepEqual(f.events, ['audio:pause', 'bridge:paused']);
});

test('release then fresh Escape resumes once; its repeats cannot re-pause', t => {
  const f = fixture(t); f.key(); f.key('Escape', { type: 'keyup' });
  assert.equal(f.key('Escape', { target: 'pause-button' }).defaultPrevented, true);
  assert.equal(f.context.paused, false); assert.equal(f.context.overlay, '');
  for (let i = 0; i < 12; i++) {
    f.key('Escape', { repeat: true });
    assert.equal(f.context.paused, false); assert.equal(f.context.overlay, '');
  }
  assert.equal(f.events.filter(x => x === 'audio:pause').length, 1);
  assert.equal(f.events.filter(x => x === 'audio:resume').length, 1);
});

test('repeat-only Escape cannot act on combat, including after a restart', t => {
  const f = fixture(t);
  f.key('Escape', { repeat: true });
  assert.equal(f.context.paused, false); assert.equal(f.context.overlay, '');
  f.run('begin(false)'); const restarted = f.context.run;
  f.key('Escape', { repeat: true });
  assert.equal(f.context.run, restarted); assert.equal(f.context.paused, false); assert.equal(f.context.overlay, '');
  f.key(); assert.equal(f.context.paused, true);
});

test('blur pause remains paused when a held Escape repeats after focus returns', t => {
  const f = fixture(t); f.key('KeyJ');
  f.window.dispatchEvent(new Event('blur'));
  assert.equal(f.context.paused, true); assert.equal(f.context.overlay, 'pause');
  f.key('Escape', { repeat: true });
  assert.equal(f.context.paused, true); assert.equal(f.context.overlay, 'pause');
  assert.equal(f.context.controls.read(f.context.run.player, true).attackHeld, false);
  assert.equal(f.events.includes('audio:resume'), false);
});

test('visibility pause cannot be escaped by a repeat keydown', t => {
  const f = fixture(t); f.document.hidden = true;
  f.document.dispatchEvent(new Event('visibilitychange'));
  f.document.hidden = false; f.document.dispatchEvent(new Event('visibilitychange'));
  f.key('Escape', { repeat: true });
  assert.equal(f.context.paused, true); assert.equal(f.context.overlay, 'pause');
  assert.equal(f.events.includes('bridge:running'), false);
});

for (const menu of ['settings', 'help']) {
  test(`repeat Escape preserves the paused ${menu} panel; fresh Escape keeps prior resume semantics`, t => {
    const f = fixture(t); f.run(`pause(false);setOverlay('${menu}')`);
    f.key('Escape', { repeat: true, target: 'pause-button' });
    assert.equal(f.context.paused, true); assert.equal(f.context.overlay, menu);
    f.key('Escape', { target: 'pause-button' });
    assert.equal(f.context.paused, false); assert.equal(f.context.overlay, '');
  });
}

test('repeat Escape neither dismisses restart confirmation nor starts a new run', t => {
  const f = fixture(t), original = f.context.run;
  f.run("showConfirm('begin')");
  f.key('Escape', { repeat: true });
  assert.equal(f.context.paused, true); assert.equal(f.context.overlay, 'confirm'); assert.equal(f.context.run, original);
});

test('fresh Escape remains a no-op in camp, while still suppressing browser default', t => {
  const f = fixture(t, { playing: false });
  assert.equal(f.key().defaultPrevented, true); assert.equal(f.key('Escape', { repeat: true }).defaultPrevented, true);
  assert.equal(f.context.run, null); assert.equal(f.context.paused, false); assert.equal(f.context.overlay, 'camp');
  assert.deepEqual(f.events, []);
});

test('non-Escape attack and dodge first-press/repeat behavior is unchanged', t => {
  const f = fixture(t), controls = f.context.controls, player = f.context.run.player;
  f.key('KeyJ'); let first = controls.read(player, true);
  assert.equal(first.attackPressed, true); assert.equal(first.attackHeld, true);
  f.key('KeyJ', { repeat: true }); let repeat = controls.read(player, true);
  assert.equal(repeat.attackPressed, false); assert.equal(repeat.attackHeld, true);
  f.key('KeyJ', { type: 'keyup' }); let released = controls.read(player, true);
  assert.equal(released.attackReleased, true); assert.equal(released.attackHeld, false);
  f.key('Space'); assert.equal(controls.read(player, true).dodge, true);
  f.key('Space', { repeat: true }); assert.equal(controls.read(player, true).dodge, false);
  assert.equal(f.context.paused, false);
});
