// CPU DOM fixture 僅驗證輸入模組契約，不代替瀏覽器、觸控裝置或 GUI 驗收。
import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { makeHarness } from './input-harness.js';
const file = process.env.INPUT_FILE || fileURLToPath(new URL('../../../games/neon-drift/src/input.js', import.meta.url));
const neutral = { throttle: 0, brake: 0, steer: 0, handbrake: false };
const setup = () => { const h = makeHarness(file), item = h.create(); item.input.setEnabled(true); return { ...h, ...item }; };
// 既有啟用、鍵盤、指標及輸入聯集語意必須保留。
test('disabled input ignores pointer and driving keys', () => {
  const h = makeHarness(file), { input, calls } = h.create();
  h.buttons.left.dispatch('pointerdown', { pointerId: 1 }); h.win.dispatch('keydown', { code: 'KeyW' });
  assert.deepEqual(h.sample(input), neutral); assert.equal(calls.gesture, 0);
});
for (const [code, field, value] of [['KeyW','throttle',1],['ArrowUp','throttle',1],['KeyS','brake',1],['ArrowDown','brake',1],['KeyA','steer',-1],['ArrowLeft','steer',-1],['KeyD','steer',1],['ArrowRight','steer',1],['Space','handbrake',true]]) {
  test(`keyboard ${code} press/release is preserved`, () => {
    const h = setup(); h.win.dispatch('keydown', { code }); assert.equal(h.sample(h.input)[field], value);
    h.win.dispatch('keyup', { code }); assert.deepEqual(h.sample(h.input), neutral);
  });
}
test('pause/reset callbacks and repeat suppression are preserved', () => {
  const h = setup(); h.win.dispatch('keydown', { code: 'Escape' }); h.win.dispatch('keydown', { code: 'Escape', repeat: true });
  h.win.dispatch('keydown', { code: 'KeyR' }); h.win.dispatch('keydown', { code: 'KeyR', repeat: true });
  assert.equal(h.calls.pause, 1); assert.equal(h.calls.reset, 1);
});
test('editable target and open dialog block keyboard input', () => {
  const h = setup(); h.win.dispatch('keydown', { code: 'KeyW', target: { closest: () => ({}) } });
  h.document.modal = true; h.win.dispatch('keydown', { code: 'KeyW' });
  assert.deepEqual(h.sample(h.input), neutral); assert.equal(h.calls.gesture, 0);
});
for (const [control, field, value] of [['left','steer',-1],['right','steer',1],['throttle','throttle',1],['brake','brake',1],['handbrake','handbrake',true]]) {
  test(`pointer ${control} press/release is preserved`, () => {
    const h = setup(), button = h.buttons[control]; const event = button.dispatch('pointerdown', { pointerId: 4 });
    assert.equal(event.defaultPrevented, true); assert.equal(h.sample(h.input)[field], value); assert.equal(button.classList.contains('pressed'), true);
    button.dispatch('pointerup', { pointerId: 4 }); assert.deepEqual(h.sample(h.input), neutral); assert.equal(button.classList.contains('pressed'), false);
  });
}
for (const type of ['pointercancel','lostpointercapture']) test(`${type} clears its input`, () => {
  const h = setup(); h.buttons.left.dispatch('pointerdown', { pointerId: 2 }); h.buttons.left.dispatch(type, { pointerId: 2 }); assert.deepEqual(h.sample(h.input), neutral);
});
test('two pointers on one control retain pressed state until the last release', () => {
  const h = setup(), button = h.buttons.left; button.dispatch('pointerdown', { pointerId: 2 }); button.dispatch('pointerdown', { pointerId: 3 });
  button.dispatch('pointerup', { pointerId: 2 }); assert.equal(h.sample(h.input).steer, -1); assert.equal(button.classList.contains('pressed'), true);
  button.dispatch('pointerup', { pointerId: 3 }); assert.equal(h.sample(h.input).steer, 0); assert.equal(button.classList.contains('pressed'), false);
});
test('keyboard plus pointer union survives either source release', () => {
  const h = setup(); h.win.dispatch('keydown', { code: 'KeyA' }); h.buttons.left.dispatch('pointerdown', { pointerId: 1 });
  h.buttons.left.dispatch('pointerup', { pointerId: 1 }); assert.equal(h.sample(h.input).steer, -1);
  h.buttons.left.dispatch('pointerdown', { pointerId: 2 }); h.win.dispatch('keyup', { code: 'KeyA' }); assert.equal(h.sample(h.input).steer, -1);
});
test('disable clears held inputs before re-enable', () => {
  const h = setup(); h.win.dispatch('keydown', { code: 'KeyW' }); h.buttons.left.dispatch('pointerdown', { pointerId: 1 });
  h.input.setEnabled(false); assert.deepEqual(h.sample(h.input), neutral); assert.equal(h.buttons.left.classList.contains('pressed'), false);
  h.input.setEnabled(true); assert.deepEqual(h.sample(h.input), neutral);
});
test('explicit clear retains active listeners but clears inputs', () => {
  const h = setup(); h.buttons.left.dispatch('pointerdown', { pointerId: 1 }); h.input.clear(); assert.deepEqual(h.sample(h.input), neutral);
  h.buttons.right.dispatch('pointerdown', { pointerId: 2 }); assert.equal(h.sample(h.input).steer, 1); assert.equal(h.countButtons(), 20);
});
test('active touch auto-throttle remains available', () => {
  const h = setup(); h.input.setOptions({ autoThrottle: true, touch: true }); assert.equal(h.sample(h.input).throttle, 1);
});
// 以下回歸在原 0015 source 及其 bundle 失敗，直接針對已重現的生命週期缺口。
test('dispose removes every button and window listener', () => {
  const h = setup(); h.input.dispose(); assert.equal(h.countButtons(), 0); assert.equal(h.win.count(), 0);
});
test('disposed old buttons cannot mutate state or trigger gesture', () => {
  const h = setup(); h.buttons.left.dispatch('pointerdown', { pointerId: 1 }); h.input.dispose(); const gestures = h.calls.gesture;
  const e = h.buttons.right.dispatch('pointerdown', { pointerId: 2 });
  assert.deepEqual(h.sample(h.input), neutral); assert.equal(h.calls.gesture, gestures); assert.equal(e.defaultPrevented, false); assert.equal(h.buttons.right.classList.contains('pressed'), false);
});
test('dispose neutralizes touch auto-throttle', () => {
  const h = setup(); h.input.setOptions({ autoThrottle: true, touch: true }); h.input.dispose(); assert.deepEqual(h.sample(h.input), neutral);
});
test('disposed keyboard callbacks stay detached', () => {
  const h = setup(); h.input.dispose(); for (const code of ['KeyW','Escape','KeyR']) h.win.dispatch('keydown', { code });
  assert.deepEqual(h.sample(h.input), neutral); assert.deepEqual(h.calls, { gesture: 0, pause: 0, reset: 0 });
});
test('setEnabled cannot revive a disposed controller', () => {
  const h = setup(); h.input.setOptions({ autoThrottle: true, touch: true }); h.input.dispose(); h.input.setEnabled(true);
  assert.deepEqual(h.sample(h.input), neutral); h.buttons.left.dispatch('pointerdown', { pointerId: 9 }); assert.equal(h.calls.gesture, 0);
});
test('recreating Input on the same buttons triggers only the new callback', () => {
  const h = setup(); h.input.dispose(); const fresh = h.create(); fresh.input.setEnabled(true); h.buttons.left.dispatch('pointerdown', { pointerId: 7 });
  assert.equal(h.calls.gesture, 0); assert.equal(fresh.calls.gesture, 1); assert.equal(h.countButtons(), 20); assert.equal(h.win.count(), 2); assert.deepEqual(h.sample(h.input), neutral);
});
test('repeated old dispose does not clear a replacement input UI', () => {
  const h = setup(); h.input.dispose(); const fresh = h.create(); fresh.input.setEnabled(true); h.buttons.right.dispatch('pointerdown', { pointerId: 8 });
  h.input.dispose(); assert.equal(h.buttons.right.classList.contains('pressed'), true); assert.equal(h.sample(fresh.input).steer, 1);
});
test('50 create/dispose cycles leave no listener accumulation', () => {
  const h = makeHarness(file); for (let i = 0; i < 50; i++) { const { input } = h.create(); input.setEnabled(true); assert.equal(h.countButtons(), 20); input.dispose(); assert.equal(h.countButtons(), 0); assert.equal(h.win.count(), 0); }
});
