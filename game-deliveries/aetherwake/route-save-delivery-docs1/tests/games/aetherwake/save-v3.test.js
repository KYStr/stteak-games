import test from 'node:test';
import assert from 'node:assert/strict';
import { WORLD, STATIONS } from '../../../games/aetherwake/src/world.js';
import { SAVE_VERSION, SAVE_KEY, SaveStore, defaultSave, validateSave, migrateSave } from '../../../games/aetherwake/src/storage.js';

const oldRecord = { time: 143.25, score: 5200, stalls: 2, assisted: true };
const oldRoute = { time: 24.5, assisted: false, module: 'reserve', seed: 42 };
function memoryStorage(initial) {
  const values = new Map(initial === undefined ? [] : [[SAVE_KEY, initial]]);
  const writes = [];
  return { values, writes, getItem: (key) => values.get(key) ?? null, setItem(key, value) { writes.push({ key, value }); values.set(key, value); } };
}
function legacySave(version = 2) {
  return {
    schemaVersion: version, seed: 42, module: 'reserve', checkpoint: 'island-camp', unlocked: WORLD.islands.map((island) => island.id),
    activated: [...STATIONS], relics: ['relic-01', 'relic-05'], challenges: ['challenge-1'], completedChallenges: ['challenge-1', 'challenge-2'],
    elapsed: 143.25, stalls: 2, assist: true, usedAssist: true, routeStyle: 'shortcut', completed: true,
    records: { reserve: { ...oldRecord } }, routeRecords: { 'route-1-safe': { ...oldRoute } },
    settings: { music: 0, sfx: 0.25, reducedMotion: true, camera: 'overhead', quality: 'low' },
  };
}
// Content fixtures live only in this Node process and are restored after each
// check. Different counts prove persistence follows content rather than constants.
function withPhaseContent(check) {
  const originals = [...WORLD.routes.map((item) => [item, 'samples', Object.getOwnPropertyDescriptor(item, 'samples')]), ...WORLD.challenges.map((item) => [item, 'stages', Object.getOwnPropertyDescriptor(item, 'stages')])];
  try {
    for (const route of WORLD.routes) route.samples = Array.from({ length: route.mission <= 3 ? route.mission + 3 : 0 }, () => ({}));
    for (const [index, challenge] of WORLD.challenges.entries()) challenge.stages = Array.from({ length: index + 2 }, () => ({}));
    return check();
  } finally {
    for (const [item, key, descriptor] of originals) { if (descriptor) Object.defineProperty(item, key, descriptor); else delete item[key]; }
  }
}

test('schema 3 defaults provide independent phase counters and undamaged cargo', () => {
  assert.equal(SAVE_VERSION, 3);
  const first = defaultSave(), second = defaultSave();
  assert.deepEqual(first.mainSamples, [0, 0, 0]);
  assert.deepEqual(Object.keys(first.courseStages), WORLD.challenges.map((challenge) => challenge.id));
  assert.ok(Object.values(first.courseStages).every((value) => value === 0));
  assert.equal(first.cargoStability, 100); assert.equal(first.cargoDamage, 0);
  first.mainSamples[0] = 2; first.courseStages['challenge-1'] = 2; first.legacyChallenges.push('challenge-1'); first.settings.music = 1;
  assert.deepEqual(second, defaultSave());
});

test('v1 aliases migrate without losing discovery, settings, or the old ending', () => {
  const alias = migrateSave({ version: 1, island: 'island-reed', fragments: ['relic-03'], unlocked: ['island-reed'], settings: { music: 0 }, elapsed: 33, stalls: 1, assist: true });
  assert.equal(alias.migrated, true); assert.equal(alias.save.schemaVersion, 3);
  assert.equal(alias.save.checkpoint, 'island-reed'); assert.deepEqual(alias.save.relics, ['relic-03']);
  assert.deepEqual(alias.save.unlocked, ['island-camp', 'island-reed']); assert.equal(alias.save.settings.music, 0);
  assert.equal(alias.save.elapsed, 33); assert.equal(alias.save.stalls, 1); assert.equal(alias.save.usedAssist, true);
  const ending = migrateSave(legacySave(1)).save;
  assert.equal(ending.completed, true); assert.deepEqual(ending.activated, STATIONS); assert.deepEqual(ending.legacyRecords.reserve, oldRecord);
});

test('v2 migration archives short-course achievements and starts new phases and records empty', () => withPhaseContent(() => {
  const original = legacySave();
  Object.assign(original, { mainSamples: [4, 5, 6], courseStages: { 'challenge-1': 99 }, cargoStability: 14, cargoDamage: 30 });
  const { save, migrated } = migrateSave(original);
  assert.equal(migrated, true); assert.equal(save.completed, true);
  for (const key of ['seed', 'module', 'checkpoint', 'unlocked', 'activated', 'relics', 'settings', 'assist', 'usedAssist', 'stalls', 'elapsed', 'routeStyle']) assert.deepEqual(save[key], original[key], key);
  assert.deepEqual(save.legacyRecords, original.records); assert.deepEqual(save.legacyRouteRecords, original.routeRecords);
  assert.deepEqual(save.legacyChallenges, ['challenge-1', 'challenge-2']);
  assert.deepEqual(save.records, {}); assert.deepEqual(save.routeRecords, {}); assert.deepEqual(save.challenges, []); assert.deepEqual(save.completedChallenges, []);
  assert.deepEqual(save.mainSamples, [0, 0, 0]); assert.ok(Object.values(save.courseStages).every((count) => count === 0));
  assert.equal(save.cargoStability, 100); assert.equal(save.cargoDamage, 0);
}));

test('historical records survive migration, safe save, reload and later settings changes', () => {
  const old = legacySave();
  old.legacyRecords = { 'retired-module': { ...oldRecord, time: 301 } };
  old.legacyRouteRecords = { 'retired-route': { ...oldRoute, time: 75 } };
  old.legacyChallenges = ['retired-challenge'];
  const raw = JSON.stringify(old), storage = memoryStorage(raw), store = new SaveStore(storage);
  const loaded = store.load(); assert.equal(loaded.migrated, true); assert.match(loaded.warning, /升級/);
  assert.equal(storage.getItem(SAVE_KEY), raw, 'Loading must not overwrite the original legacy save'); assert.equal(storage.writes.length, 0);
  assert.equal(store.save({ settings: { sfx: 0.8 } }).ok, true);
  const reloaded = new SaveStore(storage).load(); assert.equal(reloaded.migrated, false); assert.equal(reloaded.warning, null);
  assert.deepEqual(reloaded.save.legacyRecords, { ...old.legacyRecords, ...old.records });
  assert.deepEqual(reloaded.save.legacyRouteRecords, { ...old.legacyRouteRecords, ...old.routeRecords });
  assert.deepEqual(reloaded.save.legacyChallenges, ['retired-challenge', 'challenge-1', 'challenge-2']);
  assert.equal(reloaded.save.settings.music, 0); assert.equal(reloaded.save.settings.sfx, 0.8);
  assert.deepEqual(migrateSave(reloaded.save), { save: reloaded.save, migrated: false });
});

test('invalid core data and unsupported versions cannot become valid checkpoints', () => {
  for (const value of [null, [], {}, { ...defaultSave(), schemaVersion: 2 }, { ...defaultSave(), checkpoint: 'missing' }, { ...defaultSave(), relics: {} }, { ...defaultSave(), activated: 'island-reed' }]) assert.equal(validateSave(value), null);
  for (const value of [{ schemaVersion: 99, version: 1 }, { schemaVersion: 2 }, { ...legacySave(), checkpoint: 'missing' }, { ...legacySave(), relics: null }, { version: 1, island: 'missing' }]) assert.deepEqual(migrateSave(value), { save: null, migrated: false });
});

test('phase counters clamp to content bounds and drop unknown, malformed and fractional values', () => withPhaseContent(() => {
  const saved = validateSave({ ...defaultSave(), mainSamples: [999, 2.9, -1, 77], courseStages: { 'challenge-1': 999, 'challenge-2': 1.9, 'challenge-3': -1, 'challenge-4': Infinity, 'challenge-5': '4', 'unknown-challenge': 100 } });
  assert.deepEqual(saved.mainSamples, [4, 2, 0]);
  assert.deepEqual(saved.courseStages, { 'challenge-1': 2, 'challenge-2': 1, 'challenge-3': 0, 'challenge-4': 0, 'challenge-5': 0, 'challenge-6': 0 });
  const invalid = validateSave({ ...defaultSave(), mainSamples: { 0: 3 }, courseStages: [2, 3] });
  assert.deepEqual(invalid.mainSamples, [0, 0, 0]); assert.ok(Object.values(invalid.courseStages).every((value) => value === 0));
  const maxima = validateSave({ ...defaultSave(), mainSamples: [4, 5, 6] }); assert.deepEqual(maxima.mainSamples, [4, 5, 6]);
}));

test('current course completion needs every stage while an earned badge survives replay', () => withPhaseContent(() => {
  const save = validateSave({ ...defaultSave(), courseStages: { 'challenge-1': 1, 'challenge-2': 3, 'challenge-3': 0 }, challenges: ['challenge-1', 'challenge-2', 'challenge-3'], completedChallenges: ['challenge-3', 'challenge-3', 'unknown'] });
  assert.deepEqual(save.challenges, ['challenge-2']); assert.deepEqual(save.completedChallenges, ['challenge-3', 'challenge-2']);
  const replay = validateSave({ ...save, courseStages: { 'challenge-2': 0, 'challenge-3': 1 }, challenges: [] });
  assert.deepEqual(replay.challenges, []); assert.deepEqual(replay.completedChallenges, save.completedChallenges);
}));

test('missing phase content safely yields zero and never grants empty-course completion', () => withPhaseContent(() => {
  for (const route of WORLD.routes) delete route.samples;
  for (const challenge of WORLD.challenges) delete challenge.stages;
  const save = validateSave({ ...defaultSave(), mainSamples: [99, 99, 99], courseStages: { 'challenge-1': 99 }, challenges: ['challenge-1'] });
  assert.deepEqual(save.mainSamples, [0, 0, 0]); assert.ok(Object.values(save.courseStages).every((value) => value === 0));
  assert.deepEqual(save.challenges, []); assert.deepEqual(save.completedChallenges, []);
}));

test('reload retains completed stages and cargo damage but discards an unfinished gate sequence', () => withPhaseContent(() => {
  const storage = memoryStorage(), store = new SaveStore(storage);
  assert.equal(store.save({ ...defaultSave(), mainSamples: [2, 1, 0], courseStages: { 'challenge-1': 1 }, activeChallenge: 'challenge-1', challengeProgress: { 'challenge-1': 7 }, challengeHint: { step: 7 }, cargoStability: 64.5, cargoDamage: 35.5 }).ok, true);
  const raw = JSON.parse(storage.getItem(SAVE_KEY)), restored = new SaveStore(storage).load().save;
  assert.deepEqual(restored.mainSamples, [2, 1, 0]); assert.equal(restored.courseStages['challenge-1'], 1);
  assert.equal(restored.cargoStability, 64.5); assert.equal(restored.cargoDamage, 35.5);
  for (const key of ['activeChallenge', 'challengeProgress', 'challengeHint']) assert.equal(Object.hasOwn(raw, key), false, key);
  assert.deepEqual(restored.challenges, []);
}));

test('cargo and optional records remain sanitized without weakening valid core progress', () => {
  const save = validateSave({ ...defaultSave(), cargoStability: 140, cargoDamage: -5, records: { turn: { time: 12, score: -5, stalls: 1.9 }, reserve: { time: -1 } }, routeRecords: { 'route-1-safe': { time: 5, module: 'invalid', seed: Infinity }, unknown: { time: 1 } } });
  assert.equal(save.cargoStability, 100); assert.equal(save.cargoDamage, 0);
  assert.deepEqual(save.records, { turn: { time: 12, score: 0, stalls: 1, assisted: false } });
  assert.deepEqual(save.routeRecords, { 'route-1-safe': { time: 5, assisted: false, module: 'turn', seed: 1 } });
  assert.equal(validateSave({ ...defaultSave(), cargoStability: NaN, cargoDamage: Infinity }).cargoStability, 100);
  assert.equal(validateSave({ ...defaultSave(), cargoStability: 0, cargoDamage: 150 }).cargoStability, 0);
});

test('corrupt or inaccessible storage preserves safe memory and leaves original bytes untouched', () => {
  const storage = memoryStorage('{broken'), store = new SaveStore(storage), originalMemory = structuredClone(store.memory);
  assert.match(store.load().warning, /損壞/); assert.equal(storage.getItem(SAVE_KEY), '{broken'); assert.equal(storage.writes.length, 0);
  assert.equal(store.save({ checkpoint: 'missing' }).ok, false); assert.deepEqual(store.memory, originalMemory); assert.equal(storage.getItem(SAVE_KEY), '{broken');
  const denied = new SaveStore({ getItem() { throw Error('denied'); }, setItem() { throw Error('denied'); } });
  assert.match(denied.load().warning, /無法讀取/); assert.equal(denied.save({ cargoDamage: 12 }).ok, false); assert.equal(denied.memory.cargoDamage, 12);
  const absent = new SaveStore(null); assert.match(absent.load().warning, /不可用/); assert.equal(absent.save({ cargoStability: 82 }).ok, false); assert.equal(absent.load().save.cargoStability, 82);
});

test('quota failure cannot replace the safe checkpoint or erase new in-memory damage', () => {
  const storage = memoryStorage(JSON.stringify(defaultSave())), previous = storage.getItem(SAVE_KEY);
  const blocked = new SaveStore({ getItem: storage.getItem, setItem() { throw Error('quota'); } }); blocked.load();
  assert.equal(blocked.save({ cargoStability: 70, cargoDamage: 30, relics: ['relic-01'] }).ok, false);
  assert.equal(storage.getItem(SAVE_KEY), previous); assert.equal(blocked.memory.cargoDamage, 30); assert.deepEqual(blocked.memory.relics, ['relic-01']);
  const working = new SaveStore(storage); working.load(); assert.equal(working.save({ cargoDamage: 18 }).ok, true);
  assert.equal(storage.writes.length, 1); assert.equal(storage.writes[0].key, SAVE_KEY); assert.equal(JSON.parse(storage.writes[0].value).schemaVersion, 3);
});

test('explicit clear-progress resets all current and legacy achievements but retains settings', () => withPhaseContent(() => {
  const storage = memoryStorage(JSON.stringify(legacySave())), store = new SaveStore(storage); store.load();
  store.save({ courseStages: { 'challenge-1': 2 }, challenges: ['challenge-1'], mainSamples: [2, 1, 0], cargoStability: 40, cargoDamage: 60 });
  const settings = structuredClone(store.memory.settings); assert.equal(store.clearProgress().ok, true);
  assert.deepEqual(new SaveStore(storage).load().save, { ...defaultSave(), settings });
}));

test('new expedition reset keeps permanent phases, badges, discoveries and archives', async () => {
  const { FlightSimulation } = await import('../../../games/aetherwake/src/simulation.js');
  const course = WORLD.challenges[0], partial = WORLD.challenges[1];
  assert.ok(course.stages?.length > 1 && partial.stages?.length > 1, 'Integrated content must expose real multi-stage courses');
  const save = validateSave({ ...defaultSave(), checkpoint: 'island-reed', activated: [STATIONS[0]], mainSamples: [1, 0, 0], relics: ['relic-01'], unlocked: ['island-camp', 'island-reed'], courseStages: { [course.id]: course.stages.length, [partial.id]: 1 }, challenges: [course.id], completedChallenges: [course.id], cargoStability: 55, cargoDamage: 45, records: { turn: { ...oldRecord, time: 480 } }, routeRecords: { 'route-2-safe': { ...oldRoute, time: 130 } }, legacyRecords: { reserve: oldRecord }, legacyRouteRecords: { 'route-1-safe': oldRoute }, legacyChallenges: ['challenge-2'], settings: { music: 0, sfx: 0.1, reducedMotion: true } });
  const sim = new FlightSimulation({ save }); sim.reset({ seed: 81, module: 'reserve' });
  const reset = validateSave(sim.saveData()); assert.ok(reset); assert.equal(reset.seed, 81); assert.equal(reset.module, 'reserve');
  assert.deepEqual(reset.mainSamples, [0, 0, 0]); assert.deepEqual(reset.activated, []); assert.deepEqual(reset.challenges, []);
  for (const key of ['courseStages', 'completedChallenges', 'relics', 'unlocked', 'records', 'routeRecords', 'legacyRecords', 'legacyRouteRecords', 'legacyChallenges', 'settings']) assert.deepEqual(reset[key], save[key], key);
  assert.equal(reset.cargoStability, 100); assert.equal(reset.cargoDamage, 0);
});

test('saving a migrated ending cannot reclassify its old short-run time as a new record', async () => {
  const { FlightSimulation } = await import('../../../games/aetherwake/src/simulation.js');
  const converted = migrateSave(legacySave()).save, sim = new FlightSimulation({ save: converted });
  assert.equal(sim.status, 'complete', 'The old ending remains viewable');
  const saved = validateSave(sim.saveData());
  assert.deepEqual(saved.records, {}); assert.deepEqual(saved.routeRecords, {});
  assert.deepEqual(saved.legacyRecords, converted.legacyRecords); assert.deepEqual(saved.legacyRouteRecords, converted.legacyRouteRecords);
});
