import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

// Exercise the actual public panel implementation with a minimal DOM/clock;
// no duplicated rate gate and no game/physics state are injected.
const source = (await readFile(new URL('../../../public/games/orbit-fall/measurement.js', import.meta.url), 'utf8'))
  .replace('export function createMeasurementPanel', 'function createMeasurementPanel');
function harness() {
  let now = 0;
  const elements = [], blobs = new Map(), revoked = [], listeners = new Map();
  let urlCount = 0;
  const document = { createElement(tagName) {
    const element = { tagName, children: [], hidden: false, textContent: '', attributes: {},
      append(...children) { this.children.push(...children); },
      setAttribute(name, value) { this.attributes[name] = value; },
      removeAttribute(name) { delete this.attributes[name]; delete this[name]; },
      click() { this.clicks = (this.clicks ?? 0) + 1; },
    };
    elements.push(element); return element;
  } };
  const sandbox = vm.createContext({ document, performance: { now: () => now }, Blob,
    URL: {
      createObjectURL(blob) { const url = `blob:measurement-test/${++urlCount}`; blobs.set(url, blob); return url; },
      revokeObjectURL(url) { revoked.push(url); },
    },
    addEventListener(event, listener) { listeners.set(event, listener); },
  });
  vm.runInContext(source, sandbox);
  const parent = document.createElement('main');
  const panel = sandbox.createMeasurementPanel(parent, () => ({ room: 'test-room', elapsed: 12 }));
  const select = elements.find(element => element.tagName === 'select');
  const buttons = elements.filter(element => element.tagName === 'button');
  const output = elements.find(element => element.tagName === 'pre');
  const link = elements.find(element => element.tagName === 'a');
  return { panel, elements, parent, select, output, link, blobs, revoked, setClock(value) { now = value; },
    choose(value) { select.value = value; select.onchange(); },
    start() { buttons[0].onclick(); },
    report() { if (!output.hidden) buttons[1].onclick(); buttons[1].onclick(); return JSON.parse(output.textContent); },
    async download() { buttons[2].onclick(); return JSON.parse(await blobs.get(link.href).text()); },
    pagehide() { listeners.get('pagehide')(); },
  };
}

test('real panel exposes an accessible visible unlimited/30/15 selector; default accepts every rAF', () => {
  const h = harness();
  const label = h.elements.find(element => element.tagName === 'label');
  assert.equal(label.textContent, '畫面率限制：');
  assert.equal(label.htmlFor, h.select.id);
  assert.deepEqual(h.select.children.map(option => [option.value, option.textContent]), [['unlimited', '不限'], ['30', '30'], ['15', '15']]);
  assert.equal(h.select.value, 'unlimited');
  assert.equal(h.panel.diagnostics().fpsLimit, null);
  for (const hz of [60, 165, 240]) for (let frame = 0; frame < hz * 2; frame++) assert.equal(h.panel.shouldRender(frame * 1000 / hz), true);
});

for (const hz of [60, 165, 240]) for (const target of [15, 30]) {
  test(`real selector gate averages ${target} fps for ${hz}Hz timestamps without simulation time loss`, () => {
    const h = harness(); h.choose(String(target));
    const accepted = [];
    for (let frame = 0; frame <= hz * 20; frame++) {
      const now = frame * 1000 / hz;
      if (h.panel.shouldRender(now)) accepted.push(now);
    }
    assert.ok(Math.abs(accepted.length - (target * 20 + 1)) <= 1, `accepted ${accepted.length} frames`);
    // The main loop must derive dt from accepted timestamps, not input callbacks.
    const intervals = accepted.slice(1).map((time, i) => time - accepted[i]);
    assert.ok(intervals.every(ms => ms > 0 && ms <= 1000 / target + 1000 / hz + 1e-7));
    assert.ok(Math.abs(intervals.reduce((a, b) => a + b, 0) - 20000) < 1000 / target + 1e-7);
    assert.equal(h.panel.diagnostics().fpsLimit, target);
  });
}

test('changing the visible selector releases the next callback; late or reset timestamps do not deadlock or replay backlog', () => {
  const h = harness(); h.choose('15');
  assert.equal(h.panel.shouldRender(0), true);
  assert.equal(h.panel.shouldRender(1), false);
  h.choose('30'); assert.equal(h.panel.shouldRender(2), true);
  assert.equal(h.panel.shouldRender(3), false);
  h.choose('unlimited'); assert.equal(h.panel.shouldRender(4), true); assert.equal(h.panel.shouldRender(5), true);
  h.choose('15'); assert.equal(h.panel.shouldRender(6), true);
  assert.equal(h.panel.shouldRender(10_000), true);
  assert.equal(h.panel.shouldRender(10_001), false);
  assert.equal(h.panel.shouldRender(0), true);
  assert.equal(h.panel.shouldRender(1), false);
  h.choose('invalid'); assert.equal(h.panel.diagnostics().fpsLimit, null); assert.equal(h.panel.shouldRender(2), true);
});

test('summary and explicit download preserve observations and throttle changes without inventing GPU or timing samples', async () => {
  const h = harness(); h.start();
  h.panel.frame(16.7); h.panel.frame(18.2);
  h.setClock(1200); h.choose('30'); h.panel.observe();
  h.setClock(2300); h.choose('15'); h.panel.frame(67.8);
  const report = h.report();
  assert.equal(h.output.attributes['aria-label'], '量測摘要');
  assert.equal(report.samples, 3);
  assert.equal(report.snapshotCount, 1);
  assert.equal(report.throttleChangeCount, 3);
  for (const key of ['frameMs', 'snapshots', 'throttleChanges']) assert.equal(Object.hasOwn(report, key), false);
  assert.equal(h.blobs.size, 0, 'Opening the summary does not construct the large export');
  assert.equal(report.throttle.fpsLimit, 15);
  const raw = await h.download();
  assert.deepEqual(raw.frameMs, [16.7, 18.2, 67.8]);
  assert.deepEqual(raw.throttleChanges.map(change => [change.seconds, change.fpsLimit]), [[0, null], [1.2, 30], [2.3, 15]]);
  assert.deepEqual(raw.snapshots, [{ seconds: 1.2, room: 'test-room', elapsed: 12 }]);
  for (const key of ['samples', 'activeSeconds', 'p50', 'p95', 'max', 'snapshotCount', 'throttleChangeCount']) assert.equal(raw[key], report[key]);
  assert.equal(h.elements.find(element => element.textContent === '下載完整量測 JSON').tagName, 'button');
  assert.equal(h.link.hidden, false);
  assert.equal(h.link.clicks, 1, 'The explicit download button activates the visible native download link');
  assert.match(h.link.download, /^orbit-fall-measurement-.*\.json$/);
  assert.equal(h.blobs.get(h.link.href).type, 'application/json');
  assert.match(report.note, /no GPU timer or synthetic frame samples/);
});

test('240000 frames and 1800 snapshots stay complete in the download while the visible summary stays below 15KB', async t => {
  const h = harness(); h.start();
  const expectedFrames = [];
  for (let frame = 0; frame < 165 * 15 * 60; frame++) { h.panel.frame(1000 / 165); expectedFrames.push(1000 / 165); }
  let report = h.report();
  assert.equal(report.samples, 148500); assert.equal(report.capped, false);
  for (let frame = 148500; frame < 240010; frame++) {
    const ms = 6 + (frame % 37) / 10;
    h.panel.frame(ms); if (frame < 240000) expectedFrames.push(ms);
  }
  for (let second = 1; second <= 1805; second++) { h.setClock(second * 1000); h.panel.observe(); }
  report = h.report();
  assert.equal(report.samples, 240000); assert.equal(report.capped, true);
  assert.equal(report.snapshotCount, 1800);
  assert.equal(report.throttleChangeCount, 1);
  const visibleBytes = Buffer.byteLength(h.output.textContent);
  assert.ok(visibleBytes < 15000, `${visibleBytes} bytes of visible summary`);
  assert.equal(h.blobs.size, 0);
  const raw = await h.download();
  assert.deepEqual(raw.frameMs, expectedFrames, 'Every downloaded frame is the original supplied value in order');
  assert.deepEqual(raw.snapshots, Array.from({ length: 1800 }, (_, i) => ({ seconds: i + 1, room: 'test-room', elapsed: 12 })));
  assert.deepEqual(raw.throttleChanges, [{ seconds: 0, fpsLimit: null, source: 'visible-diagnostics-select' }]);
  assert.equal(raw.samples, raw.frameMs.length);
  assert.equal(raw.snapshotCount, raw.snapshots.length);
  assert.equal(raw.activeSeconds, expectedFrames.reduce((a, b) => a + b, 0) / 1000);
  t.diagnostic(JSON.stringify({ frames: raw.frameMs.length, snapshots: raw.snapshots.length,
    fullPrettyPrintBytes: Buffer.byteLength(JSON.stringify(raw, null, 2)), visibleBytes,
    downloadBytes: h.blobs.get(h.link.href).size }));
});

test('re-export, restart and pagehide revoke old object URLs and never retain a stale visible download', async () => {
  const h = harness(); h.start(); h.panel.frame(16.7);
  const first = await h.download(), firstUrl = h.link.href;
  h.panel.frame(18.2);
  const second = await h.download(), secondUrl = h.link.href;
  assert.notEqual(secondUrl, firstUrl);
  assert.deepEqual(h.revoked, [firstUrl]);
  assert.deepEqual(first.frameMs, [16.7]);
  assert.deepEqual(second.frameMs, [16.7, 18.2]);
  assert.deepEqual(JSON.parse(await h.blobs.get(firstUrl).text()), first, 'Exported Blob is a stable capture, not a live array');
  h.report(); h.start();
  assert.deepEqual(h.revoked, [firstUrl, secondUrl]);
  assert.equal(h.link.hidden, true); assert.equal(h.link.href, undefined); assert.equal(h.link.download, undefined);
  assert.equal(h.output.hidden, true); assert.equal(h.output.textContent, '');
  const restarted = await h.download(), thirdUrl = h.link.href;
  assert.deepEqual(restarted.frameMs, []); assert.deepEqual(restarted.snapshots, []);
  assert.equal(restarted.samples, 0);
  h.pagehide();
  assert.deepEqual(h.revoked, [firstUrl, secondUrl, thirdUrl]);
  assert.equal(h.link.hidden, true); assert.equal(h.link.href, undefined);
  h.pagehide(); assert.equal(h.revoked.length, 3, 'Repeated cleanup is harmless');
});

test('actual main.animate keeps about 600 physics steps over 10 seconds while the real panel changes render frequency', async t => {
  const main = await readFile(new URL('../../../public/games/orbit-fall/main.js', import.meta.url), 'utf8');
  const start = main.indexOf('function animate(now)'), end = main.indexOf("addEventListener('keydown'", start);
  assert.ok(start >= 0 && end > start, 'Extract the real animate function before keyboard registration');
  const animateSource = main.slice(start, end);
  const outcomes = [];
  for (const mode of ['unlimited', '30', '15']) {
    const h = harness(); h.choose(mode); h.start();
    const counts = { scheduled: 0, renders: 0, steps: 0, audioUpdates: 0, renderedSeconds: 0 };
    const input = { x: 1, y: 0, z: 0, brake: false, thrusting: true };
    const sandbox = vm.createContext({
      measurement: h.panel, ready: true, started: true, modal: null, run: { status: 'running' },
      last: 1000 - 1000 / 165, accumulator: 0, simTime: 0, state: {},
      frameSamples: [], sampleCursor: 0, physics: { anchored: false }, toastUntil: Infinity,
      requestAnimationFrame(callback) { assert.equal(typeof callback, 'function'); counts.scheduled++; },
      inputState() { return input; },
      step(value) { assert.equal(value, input); counts.steps++; sandbox.simTime += 1 / 60; },
      audio: { update() { counts.audioUpdates++; } },
      view: { update(_physics, _run, _state, _simTime, dt) { counts.renders++; counts.renderedSeconds += dt; } },
      updateHud() {}, $() { return { classList: { remove() {} } }; },
    });
    vm.runInContext(animateSource, sandbox);
    for (let frame = 0; frame <= 165 * 10; frame++) sandbox.animate(1000 + frame * 1000 / 165);
    const expectedRenders = mode === 'unlimited' ? 1651 : Number(mode) * 10 + 1;
    assert.equal(counts.scheduled, 1651, 'Every rAF queues its successor, including skipped renders');
    assert.ok(Math.abs(counts.renders - expectedRenders) <= 1, `${mode}: ${counts.renders} renders`);
    assert.ok(Math.abs(counts.steps - 600) <= 2, `${mode}: ${counts.steps} steps`);
    assert.ok(Math.abs(counts.renderedSeconds - (10 + 1 / 165)) < 1e-7, 'Accepted frame dt covers elapsed time');
    assert.equal(counts.audioUpdates, counts.renders);
    assert.equal(sandbox.frameSamples.length, counts.renders);
    outcomes.push({ mode, ...counts });
  }
  assert.ok(Math.max(...outcomes.map(result => result.steps)) - Math.min(...outcomes.map(result => result.steps)) <= 1);
  t.diagnostic(JSON.stringify(outcomes));
});
