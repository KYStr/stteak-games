import test from 'node:test';
import assert from 'node:assert/strict';
import { SETTINGS_KEY, initializeSettings, sanitizeSettings } from '../../../public/games/orbit-fall/settings.js';
import { createRun, enterRoom, grantTool, solvePuzzle, collectSignal } from '../../../public/games/orbit-fall/rules.js';
import { saveRun, loadRun } from '../../../public/games/orbit-fall/storage.js';

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, String(value)); }
  removeItem(key) { this.values.delete(key); }
}

function storyStorage() {
  const storage = new MemoryStorage(); const run = createRun('standard');
  grantTool(run, 'boots'); grantTool(run, 'tether'); enterRoom(run, 'room-d1-cargo');
  solvePuzzle(run, 'puzzle-momentum-1'); collectSignal(run, 'signal-1');
  assert.equal(saveRun(storage, run).ok, true); return storage;
}

test('corrupt settings JSON falls back while the existing story still loads and saves', () => {
  const storage = storyStorage(); storage.setItem(SETTINGS_KEY, '{broken');
  const initialized = initializeSettings(() => storage, true);
  assert.equal(initialized.storage, storage); assert.equal(initialized.status, 'invalid');
  assert.deepEqual(initialized.settings, { music: 0.28, sfx: 0.55, quality: 'high', reducedMotion: true, assist: true });
  const loaded = loadRun(initialized.storage);
  assert.equal(loaded.ok, true); assert.deepEqual(loaded.run.solvedPuzzles, ['puzzle-momentum-1']); assert.deepEqual(loaded.run.signals, ['signal-1']);
  loaded.run.elapsed = 75;
  assert.equal(saveRun(initialized.storage, loaded.run).ok, true);
  assert.equal(loadRun(storage).run.elapsed, 75);
  assert.equal(storage.getItem(SETTINGS_KEY), '{broken', 'Initialization must not rewrite the user’s corrupt settings or unrelated keys.');
});

test('valid settings retain supported preferences and zero volume without touching story data', () => {
  const storage = storyStorage(); const before = [...storage.values.entries()];
  storage.setItem(SETTINGS_KEY, JSON.stringify({ music: 0, sfx: 0.7, quality: 'low', reducedMotion: true, assist: false }));
  const result = initializeSettings(() => storage);
  assert.equal(result.status, 'loaded');
  assert.deepEqual(result.settings, { music: 0, sfx: 0.7, quality: 'low', reducedMotion: true, assist: false });
  for (const [key, value] of before) assert.equal(storage.getItem(key), value);
});

test('non-object JSON preferences never disable healthy story storage', () => {
  for (const value of ['null', '[]', '42', 'true', '"low"', '']) {
    const storage = storyStorage(); storage.setItem(SETTINGS_KEY, value);
    const result = initializeSettings(() => storage);
    assert.equal(result.storage, storage); assert.equal(result.status, 'invalid');
    assert.deepEqual(result.settings, sanitizeSettings(null));
    const story = loadRun(result.storage); assert.equal(story.ok, true); assert.equal(saveRun(result.storage, story.run).ok, true);
  }
});

test('unsupported settings schema is ignored without rewriting it or the independent story', () => {
  for (const marker of [{ schema: 2 }, { schemaVersion: 999 }, { schema: '1' }, { schema: 1, schemaVersion: 2 }]) {
    const storage = storyStorage(); const value = JSON.stringify({ ...marker, music: 0, assist: false, quality: 'low' });
    storage.setItem(SETTINGS_KEY, value); const result = initializeSettings(() => storage, true);
    assert.equal(result.status, 'unsupported-schema'); assert.deepEqual(result.settings, sanitizeSettings(null, true));
    assert.equal(loadRun(result.storage).ok, true); assert.equal(storage.getItem(SETTINGS_KEY), value);
  }
});

test('bad field types and unknown or prototype keys cannot pollute runtime settings', () => {
  const raw = JSON.parse('{"music":"0.1","sfx":null,"quality":{},"assist":"false","reducedMotion":0,"unknownFutureOption":true,"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}}}');
  const settings = sanitizeSettings(raw, true);
  assert.deepEqual(settings, sanitizeSettings(null, true));
  assert.equal(Object.getPrototypeOf(settings), Object.prototype); assert.equal(settings.polluted, undefined);
  assert.deepEqual(Object.keys(settings).sort(), ['assist', 'music', 'quality', 'reducedMotion', 'sfx']);
  assert.deepEqual(sanitizeSettings(Object.create({ music: 0, quality: 'low', assist: false })), sanitizeSettings(null));
  assert.deepEqual(sanitizeSettings({ music: Infinity, sfx: NaN, assist: [], reducedMotion: {} }), sanitizeSettings(null));
});

test('finite volumes are clamped and invalid fields fall back independently', () => {
  assert.deepEqual(sanitizeSettings({ schema: 1, music: -3, sfx: 4, quality: 'ultra', reducedMotion: false, assist: true }, true), { music: 0, sfx: 1, quality: 'high', reducedMotion: false, assist: true });
  assert.equal(sanitizeSettings({ music: 0.4, sfx: false }).music, 0.4);
  assert.equal(sanitizeSettings({ music: 0.4, sfx: false }).sfx, 0.55);
});

test('a genuinely inaccessible storage getter provides the existing visible-save-error path', () => {
  const result = initializeSettings(() => { throw new Error('SecurityError'); }, true);
  assert.equal(result.status, 'unavailable'); assert.deepEqual(result.settings, sanitizeSettings(null, true));
  assert.equal(loadRun(result.storage).reason, 'storage-unavailable');
  assert.equal(saveRun(result.storage, createRun()).reason, 'storage-unavailable');
});

test('a settings-key read failure preserves the storage object so story access is checked independently', () => {
  const storage = storyStorage(); const getItem = storage.getItem.bind(storage);
  storage.getItem = key => { if (key === SETTINGS_KEY) throw new Error('settings read failed'); return getItem(key); };
  const result = initializeSettings(() => storage);
  assert.equal(result.storage, storage); assert.equal(result.status, 'unavailable');
  const story = loadRun(result.storage); assert.equal(story.ok, true); assert.equal(saveRun(result.storage, story.run).ok, true);
});

test('an empty preference slot uses system motion preference without writing any keys', () => {
  const storage = new MemoryStorage(); const result = initializeSettings(() => storage, true);
  assert.equal(result.status, 'default'); assert.equal(result.settings.reducedMotion, true); assert.equal(storage.values.size, 0);
});
