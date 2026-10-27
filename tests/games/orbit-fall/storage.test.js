import test from 'node:test';
import assert from 'node:assert/strict';
import { createRun, grantTool, enterRoom, solvePuzzle, collectSignal, startChallenge } from '../../../public/games/orbit-fall/rules.js';
import { SAVE_PREFIX, saveRun, loadRun, sanitizeRun, checksum } from '../../../public/games/orbit-fall/storage.js';

class MemoryStorage {
  values = new Map(); failAt = null;
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { if (this.failAt === key) throw new Error('QuotaExceededError'); this.values.set(key, value); }
  removeItem(key) { this.values.delete(key); }
}

function progressed() {
  const run = createRun('standard'); grantTool(run, 'tether'); grantTool(run, 'boots');
  enterRoom(run, 'room-d1-cargo'); solvePuzzle(run, 'puzzle-momentum-1'); collectSignal(run, 'signal-1'); return run;
}

test('safe-room and completed-puzzle saves round-trip and reset transient pause/input clock', () => {
  const storage = new MemoryStorage(); const run = progressed(); run.paused = true; run.accumulator = 0.01;
  assert.equal(saveRun(storage, run).ok, true);
  const loaded = loadRun(storage);
  assert.equal(loaded.ok, true); assert.equal(loaded.run.paused, false); assert.equal(loaded.run.accumulator, 0);
  assert.deepEqual(loaded.run.solvedPuzzles, run.solvedPuzzles); assert.deepEqual(loaded.run.signals, run.signals);
  assert.equal(loaded.run.mode, 'standard'); assert.equal(storage.getItem(SAVE_PREFIX + 'story:pending'), null);
});

test('version 1 direct saves migrate known progress and tools without trusting invalid IDs', () => {
  const storage = new MemoryStorage();
  storage.setItem(SAVE_PREFIX + 'story', JSON.stringify({ schema: 1, difficulty: 'standard', completedPuzzles: ['puzzle-momentum-1', 'puzzle-reflection-1', 'fake'], collectedSignals: ['signal-1'], checkpoint: 'room-d2-safe' }));
  const result = loadRun(storage);
  assert.equal(result.migrated, true); assert.equal(result.run.schema, 2); assert.equal(result.run.mode, 'standard');
  assert.deepEqual(result.run.unlockedDecks, [1, 2]); assert.equal(result.run.safeRoomId, 'room-d2-safe'); assert.ok(result.run.tools.includes('tether'));
  assert.equal(saveRun(storage, result.run).ok, true); assert.equal(loadRun(storage).migrated, false);
});

test('corrupt primary is recovered from intact backup with an explicit recovery notice', () => {
  const storage = new MemoryStorage(); const run = progressed(); saveRun(storage, run); run.elapsed = 80; saveRun(storage, run);
  storage.setItem(SAVE_PREFIX + 'story', '{broken');
  const result = loadRun(storage);
  assert.equal(result.ok, true); assert.equal(result.recovered, true); assert.equal(result.source, ':backup');
  assert.deepEqual(result.run.solvedPuzzles, ['puzzle-momentum-1']); assert.ok(result.message);
});

test('interrupted promotion recovers validated staging copy with newer progress', () => {
  const storage = new MemoryStorage(); const run = progressed(); saveRun(storage, run);
  run.elapsed = 40; storage.failAt = SAVE_PREFIX + 'story';
  assert.equal(saveRun(storage, run).ok, false);
  storage.failAt = null;
  const result = loadRun(storage);
  assert.equal(result.recovered, true); assert.equal(result.source, ':pending'); assert.equal(result.run.elapsed, 40);
  assert.equal(saveRun(storage, result.run).ok, true); assert.equal(loadRun(storage).source, 'primary');
});

test('integrity mismatch is rejected; all-corrupt data stays untouched until an explicit new save', () => {
  const storage = new MemoryStorage(); saveRun(storage, progressed());
  const key = SAVE_PREFIX + 'story'; const bad = JSON.parse(storage.getItem(key)); bad.payload += ' ';
  storage.setItem(key, JSON.stringify(bad)); const original = storage.getItem(key);
  const result = loadRun(storage);
  assert.equal(result.ok, false); assert.equal(result.reason, 'corrupt-save'); assert.equal(result.run, null);
  assert.equal(storage.getItem(key), original);
});

test('future schema is preserved and cannot be overwritten by this build', () => {
  const storage = new MemoryStorage(); const payload = JSON.stringify({ schema: 900 });
  const original = JSON.stringify({ format: 'orbit-fall-save', payload, checksum: checksum(payload), revision: 7 });
  storage.setItem(SAVE_PREFIX + 'story', original);
  assert.equal(loadRun(storage).reason, 'unsupported-schema'); assert.equal(saveRun(storage, progressed()).ok, false);
  assert.equal(storage.getItem(SAVE_PREFIX + 'story'), original);
});

test('blocked localStorage and quota report failures without throwing or deleting prior progress', () => {
  const blocked = { getItem() { throw new Error('SecurityError'); }, setItem() { throw new Error('SecurityError'); } };
  assert.equal(loadRun(blocked).reason, 'storage-unavailable'); assert.equal(saveRun(blocked, createRun()).ok, false);
  const storage = new MemoryStorage(); saveRun(storage, progressed()); const original = storage.getItem(SAVE_PREFIX + 'story');
  storage.failAt = SAVE_PREFIX + 'story:pending'; assert.equal(saveRun(storage, createRun()).ok, false);
  assert.equal(storage.getItem(SAVE_PREFIX + 'story'), original);
});

test('invalid values and out-of-room snapshots are repaired without losing valid recordings', () => {
  const run = sanitizeRun({ schema: 2, roomId: 'room-d3-signal', safeRoomId: 'bad', oxygen: -1, health: 0, status: 'failed', signals: ['signal-1', 'signal-1', 'bad'], elapsed: Infinity, snapshots: { 'room-d1-cargo': { objects: [{ id: 'crate-main', position: [1e9, -1e9, 1e9] }] }, bad: { objects: [] } }, stats: { deaths: -2 } });
  assert.equal(run.roomId, 'room-d1-safe'); assert.equal(run.oxygen, 100); assert.equal(run.health, 100); assert.equal(run.elapsed, 0);
  assert.deepEqual(run.signals, ['signal-1']); assert.equal(run.stats.deaths, 0);
  assert.deepEqual(run.snapshots['room-d1-cargo'].objects[0].position, [7, 0.75, 7]); assert.equal(run.snapshots.bad, undefined);
});

test('challenge saves cannot overwrite story progress and use a separate valid slot', () => {
  const storage = new MemoryStorage(); const story = progressed(); story.endings = ['beacon']; saveRun(storage, story);
  const before = storage.getItem(SAVE_PREFIX + 'story'); const challenge = startChallenge('challenge-cargo', story).run;
  assert.equal(saveRun(storage, challenge).reason, 'slot-mismatch'); assert.equal(saveRun(storage, challenge, 'challenge').ok, true);
  assert.equal(storage.getItem(SAVE_PREFIX + 'story'), before); assert.equal(loadRun(storage, 'challenge').run.challengeId, 'challenge-cargo');
});
