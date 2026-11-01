import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, transact } from '../../../public/games/moss-and-moon/rules.js';
import { saveSlot, loadSlot, exportState, importSlot, storageKeys } from '../../../public/games/moss-and-moon/storage.js';

class MemoryStorage {
  data = new Map(); failAt = null;
  getItem(key) { return this.data.get(key) ?? null; }
  setItem(key, value) { if (key === this.failAt) throw new Error('quota exceeded'); this.data.set(key, String(value)); }
  removeItem(key) { this.data.delete(key); }
}
const action = (state, input) => { const result = transact(state, input); assert.equal(result.ok, true, result.message); return result.state; };

test('two independent slots, every snapshot reload exact with no offline advancement', () => {
  const storage = new MemoryStorage(); let state = createState(1), second = createState(2);
  assert.equal(saveSlot(second, storage).ok, true);
  const actions = [{ type: 'plant', id: 'moss', index: 0 }, { type: 'water', index: 0 }, { type: 'sleep' }, { type: 'water', index: 0 }, { type: 'sleep' }, { type: 'water', index: 0 }, { type: 'sleep' }, { type: 'harvest', index: 0 }, { type: 'sell', id: 'moss' }, { type: 'talk', id: 'mira' }, { type: 'buy', id: 'stones' }, { type: 'place', id: 'stones', index: 2 }, { type: 'settings', values: { music: 0, reducedMotion: true } }];
  for (const next of actions) {
    state = action(state, next); assert.equal(saveSlot(state, storage).ok, true);
    for (let repeat = 0; repeat < 5; repeat++) assert.deepEqual(loadSlot(1, storage).state, state);
  }
  assert.deepEqual(loadSlot(2, storage).state, second);
});

test('corrupt current restores previous valid snapshot; corrupt both opens safe fresh slot', () => {
  const storage = new MemoryStorage(), initial = createState(1);
  saveSlot(initial, storage); const next = action(initial, { type: 'sleep' }); saveSlot(next, storage);
  storage.setItem(storageKeys(1).current, '{broken');
  const recovered = loadSlot(1, storage); assert.equal(recovered.recovered, true); assert.deepEqual(recovered.state, initial); assert.match(recovered.error, /上一個有效/);
  storage.setItem(storageKeys(1).backup, 'null');
  const fresh = loadSlot(1, storage); assert.equal(fresh.recovered, false); assert.equal(fresh.state.day, 1); assert.match(fresh.error, /無法讀取/);
});

test('write failure at each stage retains last committed state and staging never auto-loads', () => {
  for (const stage of ['pending', 'backup', 'current']) {
    const storage = new MemoryStorage(), old = createState(1); saveSlot(old, storage);
    const next = action(old, { type: 'sleep' }); storage.failAt = storageKeys(1)[stage];
    assert.equal(saveSlot(next, storage).ok, false); assert.deepEqual(loadSlot(1, storage).state, old);
  }
  const storage = new MemoryStorage(); storage.setItem(storageKeys(1).pending, exportState(action(createState(1), { type: 'sleep' })));
  assert.equal(loadSlot(1, storage).state.day, 1);
});

test('checksum/schema validation rejects edited payload, malformed export, fractional money', () => {
  const storage = new MemoryStorage(); const original = createState(1); saveSlot(original, storage);
  const tampered = JSON.parse(exportState(original)); tampered.payload = tampered.payload.replace('"coins":24', '"coins":900');
  assert.equal(importSlot(1, JSON.stringify(tampered), storage).ok, false); assert.deepEqual(loadSlot(1, storage).state, original);
  original.coins = 0.5; assert.equal(saveSlot(original, storage).ok, false); assert.throws(() => exportState(original));
  for (const text of ['{}', 'null', '', '[]', 'x'.repeat(200001)]) assert.equal(importSlot(1, text, storage).ok, false);
});

test('export/import can move valid progress to another slot without altering original', () => {
  const storage = new MemoryStorage(); const first = action(createState(1), { type: 'sleep' }); saveSlot(first, storage);
  const result = importSlot(2, exportState(first), storage);
  assert.equal(result.ok, true); assert.equal(result.state.slot, 2); assert.equal(result.state.day, 2); assert.equal(loadSlot(1, storage).state.slot, 1);
  assert.equal(loadSlot(3, storage).state, null); assert.equal(importSlot(3, exportState(first), storage).ok, false);
});

test('unavailable storage surfaces explicit error while keeping a playable new state', () => {
  const unavailable = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() {} };
  assert.equal(loadSlot(1, unavailable).state.slot, 1); assert.match(loadSlot(1, unavailable).error, /blocked/); assert.equal(saveSlot(createState(), unavailable).ok, false);
});
