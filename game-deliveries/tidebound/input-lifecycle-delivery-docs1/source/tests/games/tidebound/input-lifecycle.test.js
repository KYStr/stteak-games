import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// CPU fixture: execute exact production input declarations/functions/listeners.
// DOM nodes, event routing, capture, scene/audio and modal rendering are explicit
// stand-ins. No browser layout, real pointer dispatch, BFCache, GPU or audio claim.
const sourcePath = process.env.TIDE_INPUT_SOURCE || new URL('../../../games/tidebound/src/main.js', import.meta.url);
const source = readFileSync(sourcePath, 'utf8');
function section(start, end) {
  assert.equal(source.split(start).length, 2, `unique production anchor: ${start}`);
  const from = source.indexOf(start), to = source.indexOf(end, from);
  assert.ok(to > from, `production end anchor: ${end}`);
  return source.slice(from, to);
}
function eventTarget() {
  const handlers = new Map();
  return {
    addEventListener(type, handler) { const list = handlers.get(type) || []; list.push(handler); handlers.set(type, list); },
    dispatch(type, values = {}) { const e = { type, target: this, preventDefault() { this.defaultPrevented = true; }, ...values }; for (const handler of handlers.get(type) || []) handler(e); return e; },
    listeners(type) { return (handlers.get(type) || []).length; },
  };
}
function harness() {
  const active = new Set(), captures = new Map(), nodes = new Map(), buttons = [], released = [];
  const calls = { save: 0, audioDispose: 0, sceneDispose: 0, unlock: 0, camera: 0, interact: 0 };
  let throwRelease = false;
  function node(tagName = 'DIV') {
    const n = { tagName, dataset: {}, attributes: {}, style: { setProperty(k, v) { this[k] = v; } },
      setAttribute(k, v) { this.attributes[k] = v; },
      setPointerCapture(id) { if (!active.has(id)) throw Error('inactive pointer'); captures.set(id, this); },
      hasPointerCapture(id) { return captures.get(id) === this; },
      releasePointerCapture(id) { if (captures.get(id) !== this) return; captures.delete(id); released.push(id); this.onlostpointercapture?.({ pointerId: id }); if (throwRelease) throw Error('capture already ended'); },
      getBoundingClientRect() { return { left: 10, top: 20, width: 100, height: 100 }; },
      blur() {}, focus() {}, querySelectorAll() { return []; },
      append(child) { buttons.push(child); if (child.id) nodes.set('#' + child.id, child); },
      prepend(child) { if (child.id) nodes.set('#' + child.id, child); },
    };
    return n;
  }
  for (const id of ['helm-knob', 'modal', 'modal-content', 'interact-button', 'surface-button', 'map-button', 'journal-button', 'camera-button', 'pause-button']) nodes.set('#' + id, node());
  nodes.set('.steering', node());
  for (const dir of ['left', 'right']) { const b = node('BUTTON'); b.dataset.hold = dir; buttons.push(b); }
  const document = { ...eventTarget(), hidden: false, activeElement: null,
    createElement: tag => node(tag.toUpperCase()),
    querySelector: selector => nodes.get(selector),
    querySelectorAll: selector => selector === '[data-hold]' ? buttons : [],
  };
  const context = { document, window: eventTarget(), console,
    state: { mode: 'sailing', boat: { sail: 0 } }, phase: 'running', paused: false, overlay: null, ready: true, gesture: false, lastFocus: null,
    $: selector => document.querySelector(selector),
    save() { calls.save++; }, audio: { dispose() { calls.audioDispose++; } }, scene: { dispose() { calls.sceneDispose++; } },
    unlock() { calls.unlock++; context.gesture = true; }, toggleCamera() { calls.camera++; }, actionInteract() { calls.interact++; },
    updateAudio() {}, invalidate() {}, doAction() {}, surface() {},
    setPhase(p) { context.phase = p; },
  };
  vm.createContext(context);
  const declarations = section('const keys=new Set(),holds=new Map(),samples=[];', 'let markedObservation');
  const clear = section('function clearInput(){', 'function notify(');
  const pause = section('function pause(value=true){', 'function begin(');
  const close = section('function closeModal(resume=true){', 'function header(');
  const keyboard = section("document.addEventListener('keydown',", 'const steer=');
  const controls = section("const steer=$('.steering');", 'let orbitPointer=');
  const lifecycle = section("window.addEventListener('blur',", "window.addEventListener('message',");
  const input = section('function input(){', 'function frame(');
  // Modal markup/rendering is outside input scope; preserve only its input gate/reset contract.
  vm.runInContext(declarations + clear + pause + close +
    "function showModal(type){overlay=type;clearInput();}\n" + keyboard + controls + lifecycle + input +
    '\nglobalThis.snapshot=()=>({keys:[...keys],holds:[...holds],owner:helmPointer,helm:{...helmInput},input:input(),paused,overlay,phase});globalThis.clear=clearInput;globalThis.resume=()=>pause(false);', context);
  const plain = value => JSON.parse(JSON.stringify(value));
  function pointer(control, type, id, x = 92, y = 70) {
    const n = control === 'helm' ? nodes.get('#helm') : buttons.find(b => b.dataset.hold === control);
    assert.ok(n, `control ${control}`);
    if (type === 'pointerdown') active.add(id);
    if (type === 'lostpointercapture') captures.delete(id);
    const e = { pointerId: id, clientX: x, clientY: y, preventDefault() { this.defaultPrevented = true; } };
    n['on' + type]?.(e);
    // CPU approximation of implicit pointer-capture release after up/cancel.
    if (type === 'pointerup' || type === 'pointercancel') {
      active.delete(id);
      captures.get(id)?.releasePointerCapture(id);
    }
    return e;
  }
  return { context, calls, captures, released, pointer, document,
    snapshot: () => plain(context.snapshot()),
    key(type, key, extras = {}) { return document.dispatch(type, { key, target: { tagName: 'BODY' }, repeat: false, ...extras }); },
    window(type, values) { return context.window.dispatch(type, values); },
    visibility(hidden) { document.hidden = hidden; document.dispatch('visibilitychange'); },
    clear() { context.clear(); }, resume() { context.resume(); }, failRelease() { throwRelease = true; },
  };
}
const zero = { turn: 0, sailDelta: 0, brake: false, diveX: 0, diveZ: 0 };
const output = (h, expected) => assert.deepEqual(h.snapshot().input, { ...zero, ...expected });
function neutral(h) {
  output(h, {});
  assert.deepEqual(h.snapshot().keys, []);
  assert.deepEqual(h.snapshot().holds, []);
  assert.equal(h.snapshot().owner, null);
  assert.deepEqual(h.snapshot().helm, { x: 0, y: 0 });
}
function mix(h) {
  h.key('keydown', 'a'); h.key('keydown', 'w'); h.key('keydown', ' ');
  h.pointer('right', 'pointerdown', 21); h.pointer('forward', 'pointerdown', 22);
  h.pointer('helm', 'pointerdown', 23, 76, 70);
  output(h, { turn: .5, sailDelta: 1, brake: true, diveX: .5, diveZ: -1 });
}

for (const end of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  test(`mixed keyboard + same-direction hold: ${end} preserves held keyboard`, () => {
    const h = harness(); h.key('keydown', 'd'); h.pointer('right', 'pointerdown', 1);
    output(h, { turn: 1, diveX: 1 }); h.pointer('right', end, 1);
    output(h, { turn: 1, diveX: 1 }); h.key('keyup', 'd'); neutral(h);
  });
  test(`two same-direction hold pointers: first ${end} preserves second`, () => {
    const h = harness(); h.pointer('forward', 'pointerdown', 1); h.pointer('forward', 'pointerdown', 2);
    h.pointer('forward', end, 1); output(h, { sailDelta: 1, diveZ: -1 });
    assert.deepEqual(h.snapshot().holds, [[2, 'forward']]); h.pointer('forward', end, 2); neutral(h);
  });
  test(`mixed helm ${end} preserves keyboard and unrelated hold ownership`, () => {
    const h = harness(); h.key('keydown', 'a'); h.pointer('forward', 'pointerdown', 11); h.pointer('helm', 'pointerdown', 12);
    output(h, { sailDelta: 1, diveZ: -1 }); h.pointer('helm', end, 12);
    output(h, { turn: -1, diveX: -1, sailDelta: 1, diveZ: -1 });
    h.key('keyup', 'a'); h.pointer('forward', end, 11); neutral(h);
  });
  test(`non-owner helm ${end} leaves keyboard, helm and other touches intact`, () => {
    const h = harness(); mix(h); h.pointer('helm', 'pointerdown', 99, 28, 70);
    const before = h.snapshot(); h.pointer('helm', end, 99); assert.deepEqual(h.snapshot(), before);
    h.clear(); neutral(h);
  });
}

test('same-direction keyboard keyup preserves held pointer', () => {
  const h = harness(); h.key('keydown', 'd'); h.pointer('right', 'pointerdown', 1); h.key('keyup', 'd');
  output(h, { turn: 1, diveX: 1 }); h.pointer('right', 'pointerup', 1); neutral(h);
});
for (const release of ['keyboard', 'pointer']) test(`opposite keyboard/hold directions cancel, release ${release} restores survivor`, () => {
  const h = harness(); h.key('keydown', 'a'); h.pointer('right', 'pointerdown', 1); output(h, {});
  if (release === 'keyboard') { h.key('keyup', 'a'); output(h, { turn: 1, diveX: 1 }); h.pointer('right', 'pointerup', 1); }
  else { h.pointer('right', 'pointercancel', 1); output(h, { turn: -1, diveX: -1 }); h.key('keyup', 'a'); }
  neutral(h);
});
for (const release of ['keyboard', 'helm']) test(`opposite keyboard/helm directions cancel, release ${release} restores survivor`, () => {
  const h = harness(); h.key('keydown', 'a'); h.pointer('helm', 'pointerdown', 1); output(h, {});
  if (release === 'keyboard') { h.key('keyup', 'a'); output(h, { turn: 1, diveX: 1 }); h.pointer('helm', 'pointerup', 1); }
  else { h.pointer('helm', 'pointercancel', 1); output(h, { turn: -1, diveX: -1 }); h.key('keyup', 'a'); }
  neutral(h);
});

test('opposite hold directions and multi-finger release preserve remaining owners', () => {
  const h = harness(); h.pointer('left', 'pointerdown', 1); h.pointer('left', 'pointerdown', 2); h.pointer('right', 'pointerdown', 3); output(h, {});
  h.pointer('left', 'pointerup', 1); output(h, {}); h.pointer('right', 'pointercancel', 3);
  output(h, { turn: -1, diveX: -1 }); h.pointer('left', 'pointerup', 2); neutral(h);
});
test('opposite vertical keyboard/hold directions cancel and preserve surviving input', () => {
  const h = harness(); h.key('keydown', 'w'); h.pointer('back', 'pointerdown', 1); output(h, {});
  h.key('keyup', 'w'); output(h, { sailDelta: -1, diveZ: 1 }); h.pointer('back', 'pointercancel', 1); neutral(h);
});
test('vertical helm opposes dive input but does not change keyboard sailDelta', () => {
  const h = harness(); h.key('keydown', 'w'); h.pointer('helm', 'pointerdown', 1, 60, 102);
  output(h, { sailDelta: 1 }); h.pointer('helm', 'pointercancel', 1); output(h, { sailDelta: 1, diveZ: -1 }); h.key('keyup', 'w'); neutral(h);
});
test('same-direction keyboard + helm clamps, with partial opposite contribution preserved', () => {
  const h = harness(); h.key('keydown', 'd'); h.pointer('helm', 'pointerdown', 1);
  output(h, { turn: 1, diveX: 1 }); h.pointer('helm', 'pointermove', 1, 44, 70);
  output(h, { turn: .5, diveX: .5 }); h.clear(); neutral(h);
});
test('keyboard aliases and repeat release independently without dropping the other alias', () => {
  const h = harness(); h.key('keydown', 'D'); h.key('keydown', 'ArrowRight'); h.key('keydown', 'd', { repeat: true });
  h.key('keyup', 'D'); output(h, { turn: 1, diveX: 1 }); h.key('keyup', 'ArrowRight'); neutral(h);
});
test('typing target and modifier shortcuts do not become game input', () => {
  const h = harness();
  for (const tagName of ['INPUT', 'SELECT', 'TEXTAREA']) h.key('keydown', 'w', { target: { tagName } });
  for (const modifier of ['ctrlKey', 'altKey', 'metaKey']) h.key('keydown', 'd', { [modifier]: true });
  neutral(h);
});

for (const lifecycle of ['blur', 'hidden', 'visible', 'clear']) test(`${lifecycle} clears mixed input; stale endings cannot poison a new helm owner`, () => {
  const h = harness(); mix(h);
  if (lifecycle === 'blur') h.window('blur');
  else if (lifecycle === 'hidden' || lifecycle === 'visible') h.visibility(lifecycle === 'hidden');
  else h.clear();
  neutral(h); assert.equal(h.captures.has(23), false); assert.deepEqual(h.released, [23]);
  h.pointer('helm', 'pointermove', 23, 28, 70); neutral(h);
  if (lifecycle === 'blur' || lifecycle === 'hidden') { assert.equal(h.snapshot().paused, true); h.resume(); }
  h.pointer('helm', 'pointerdown', 24, 28, 70); output(h, { turn: -1, diveX: -1 });
  h.key('keyup', 'a'); h.key('keyup', 'w'); h.key('keyup', ' ');
  h.pointer('right', 'pointerup', 21); h.pointer('forward', 'pointercancel', 22);
  h.pointer('helm', 'lostpointercapture', 23); output(h, { turn: -1, diveX: -1 });
  h.pointer('helm', 'pointerup', 24); neutral(h);
});
test('repeated blur/visibility/reset is idempotent and permits fresh mixed controls', () => {
  const h = harness(); mix(h); h.window('blur'); h.visibility(true); h.clear(); h.window('blur'); neutral(h);
  assert.deepEqual(h.released, [23]);
  h.pointer('right', 'pointerup', 21); h.pointer('forward', 'pointercancel', 22); h.pointer('helm', 'pointerup', 23);
  h.resume(); mix(h); h.clear(); neutral(h);
});
test('blur in an existing overlay clears all inputs without opening another pause modal', () => {
  const h = harness(); mix(h); h.context.overlay = 'map'; h.window('blur'); neutral(h);
  assert.equal(h.snapshot().overlay, 'map'); assert.equal(h.snapshot().phase, 'running');
});
test('capture release exception during blur still clears all channels and pauses', () => {
  const h = harness(); mix(h); h.failRelease(); assert.doesNotThrow(() => h.window('blur')); neutral(h); assert.equal(h.snapshot().paused, true);
});
test('pause/resume through the actual keyboard callback clears all channels', () => {
  const h = harness(); mix(h); h.key('keydown', 'Escape'); output(h, {}); assert.equal(h.snapshot().paused, true);
  h.key('keyup', 'Escape'); neutral(h); h.key('keydown', 'Escape'); neutral(h);
  assert.equal(h.snapshot().paused, false); mix(h); h.clear(); neutral(h);
});
for (const persisted of [false, true]) test(`pagehide disposal has neutral input even without prior blur/visibility (persisted=${persisted})`, () => {
  const h = harness(); mix(h); h.window('pagehide', { persisted });
  assert.equal(h.calls.save, 1); assert.equal(h.calls.audioDispose, 1); assert.equal(h.calls.sceneDispose, 1);
  neutral(h); assert.equal(h.captures.has(23), false); assert.deepEqual(h.released, [23]);
  h.pointer('helm', 'pointermove', 23, 28, 70); neutral(h);
  h.window('pagehide', { persisted }); neutral(h); assert.deepEqual(h.released, [23]);
});
test('dispose then fresh document evaluation initializes independent, neutral controls', () => {
  const old = harness(); mix(old); old.visibility(true); old.window('pagehide', { persisted: false });
  const fresh = harness(); neutral(fresh); assert.equal(fresh.document.listeners('keydown'), 1); assert.equal(fresh.document.listeners('keyup'), 1);
  old.pointer('helm', 'pointermove', 23, 28, 70); old.key('keyup', 'a'); neutral(fresh);
  mix(fresh); fresh.clear(); neutral(fresh);
});
