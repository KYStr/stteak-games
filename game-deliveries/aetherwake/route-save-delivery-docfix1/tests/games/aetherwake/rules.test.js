import test from 'node:test';
import assert from 'node:assert/strict';
import { WORLD, MODULES, STATIONS, islandById } from '../../../games/aetherwake/src/world.js';
import { FlightSimulation } from '../../../games/aetherwake/src/simulation.js';
import { SAVE_VERSION, SaveStore, defaultSave, validateSave, migrateSave } from '../../../games/aetherwake/src/storage.js';
import { dt, distance, steer, flyMainSegment, flyCourse, flyToIsland } from './flight-test-pilot.mjs';

const sampleTotals = () => STATIONS.map((_, index) => WORLD.routes.find((route) => route.mission === index + 1 && route.style === 'safe').samples.length);
function routeSimulation(route, seed = 1, module = 'turn') {
  return new FlightSimulation({ save: { ...defaultSave(), seed, module, checkpoint: route.from, activated: STATIONS.slice(0, route.mission - 1), mainSamples: sampleTotals().map((total, index) => index < route.mission - 1 ? total : 0) } });
}
function walkTo(sim, target) {
  for (let frame = 0; frame < 1200 && distance(sim.player, target) > 1; frame++) {
    const d = distance(sim.player, target); sim.step({ x: (target.x - sim.player.x) / d, z: (target.z - sim.player.z) / d }, dt);
  }
  assert.ok(distance(sim.player, target) < 1.2); assert.equal(sim.player.grounded, true);
}

test('content contains six physical islands, three stations, twelve unique fragments and six real challenges', () => {
  assert.equal(WORLD.islands.length, 6); assert.equal(new Set(WORLD.islands.map((i) => i.region)).size, 3);
  assert.equal(STATIONS.length, 3); assert.equal(WORLD.relics.length, 12); assert.equal(new Set(WORLD.relics.map((r) => r.id)).size, 12);
  assert.equal(WORLD.challenges.length, 6); assert.equal(MODULES.length, 3);
  assert.deepEqual(new Set(WORLD.challenges.map((c) => c.kind)), new Set(['speed', 'energy', 'thermal', 'crosswind', 'fog', 'stability']));
  assert.equal(WORLD.challenges.reduce((sum, challenge) => sum + challenge.stages.length, 0), 23);
  const ids = new Set();
  for (const challenge of WORLD.challenges) for (const [index, stage] of challenge.stages.entries()) {
    assert.equal(stage.gates.length, 9); assert.equal(stage.landing, true); assert.notEqual(stage.fromIslandId, stage.toIslandId);
    if (index) assert.equal(stage.fromIslandId, challenge.stages[index - 1].toIslandId);
    const destination = islandById(stage.toIslandId), last = stage.gates.at(-1);
    assert.equal(distance(last, destination), 0); assert.ok(last.y > destination.y);
    for (const gate of stage.gates) { assert.ok(!ids.has(gate.id)); ids.add(gate.id); assert.ok(gate.radius > 0); }
  }
  for (const mission of [1, 2, 3]) {
    const safe = WORLD.routes.find((route) => route.mission === mission && route.style === 'safe');
    const shortcut = WORLD.routes.find((route) => route.mission === mission && route.style === 'shortcut');
    assert.equal(safe.samples.length, 8); assert.deepEqual(safe.samples.map((sample) => sample.id), shortcut.samples.map((sample) => sample.id));
    assert.notDeepEqual(safe.samples.map(({ x, y, z }) => ({ x, y, z })), shortcut.samples.map(({ x, y, z }) => ({ x, y, z })));
  }
  assert.deepEqual(new Set(WORLD.winds.map((w) => w.type)), new Set(['thermal', 'tailwind', 'crosswind']));
});

test('all three missions × two routes × three modules are physically reachable without recovery', (t) => {
  for (const route of WORLD.routes.filter((r) => r.mission <= 3)) {
    for (let run = 0; run < 3; run++) {
      const sim = routeSimulation(route, 173 + run, MODULES[run].id); sim.launch();
      const time = flyMainSegment(sim, route.mission, route.style);
      assert.equal(sim.activated.length, route.mission); assert.equal(sim.state.mainSamples[route.mission - 1], route.samples.length);
      assert.equal(sim.checkpoint, route.to); assert.equal(sim.stalls, 0);
      assert.equal(sim.drainEvents().filter((event) => event.type === 'survey').length, route.samples.length);
      t.diagnostic(`${route.id}/${MODULES[run].id}: ${time.toFixed(2)} simulation seconds`);
    }
  }
});

test('three complete expeditions require ordered stations, return to camp, result and replay', (t) => {
  for (const module of MODULES) {
    const sim = new FlightSimulation({ seed: 20261025, module: module.id }); sim.launch();
    assert.equal(sim.interact(), false); assert.equal(sim.status, 'running');
    for (let mission = 1; mission <= 4; mission++) {
      const route = WORLD.routes.find((r) => r.mission === mission && r.style === (module.id === 'tailwind' ? 'shortcut' : 'safe'));
      flyMainSegment(sim, mission, route.style);
    }
    assert.equal(sim.status, 'complete'); assert.deepEqual(sim.state.mainSamples, sampleTotals()); assert.equal(sim.stalls, 0); assert.ok(sim.state.rating); assert.ok(sim.state.score > 0);
    t.diagnostic(`${module.id} main expedition: ${sim.elapsed.toFixed(2)} simulation seconds; stalls=${sim.stalls}`);
    const before = sim.snapshot(); sim.step({ x: 1, glide: true }, dt); assert.deepEqual(sim.snapshot(), before);
    const saved = sim.saveData(); assert.ok(saved.records[module.id]); assert.equal(Object.keys(saved.routeRecords).length, 4);
    sim.reset({ module: 'reserve', seed: 100 }); assert.equal(sim.status, 'ready'); assert.equal(sim.elapsed, 0); assert.equal(sim.activated.length, 0); assert.ok(sim.saveData().records[module.id]);
  }
});

test('same seed and input replay has identical state on ten runs; fixed frames agree at 30/60 render cadence', () => {
  function replay(renderHz) {
    const sim = new FlightSimulation({ seed: 4519 }); sim.launch();
    for (let renderFrame = 0; renderFrame < renderHz * 45; renderFrame++) {
      for (let sub = 0; sub < 60 / renderHz; sub++) {
        const frame = renderFrame * (60 / renderHz) + sub;
        sim.step({ x: Math.sin(frame / 500) * 0.5 - 0.3, z: -0.7, glide: frame === 0, brake: frame >= 720 && frame < 1000 }, dt);
      }
    }
    return sim.snapshot();
  }
  const expected = replay(60);
  for (let i = 0; i < 10; i++) assert.deepEqual(replay(60), expected);
  assert.deepEqual(replay(30), expected);
});

test('all six island edges × ten falls recover safely without loops or lost fragments', () => {
  for (const island of WORLD.islands) for (let edge = 0; edge < 10; edge++) {
    const sim = new FlightSimulation({ save: { ...defaultSave(), checkpoint: island.id, relics: ['relic-01'] } }); sim.launch();
    const angle = edge / 10 * Math.PI * 2;
    Object.assign(sim.player, { x: island.x + Math.cos(angle) * (island.radius + 2), z: island.z + Math.sin(angle) * (island.radius + 2), y: island.y - 1, grounded: false, gliding: false });
    for (let frame = 0; frame < 600 && sim.stalls === 0; frame++) sim.step({}, dt);
    assert.equal(sim.stalls, 1); assert.equal(sim.player.grounded, true); assert.equal(sim.player.y, island.y); assert.equal(distance(sim.player, island), 0);
    assert.deepEqual(sim.relics, ['relic-01']);
    for (let frame = 0; frame < 120; frame++) sim.step({}, dt);
    assert.equal(sim.stalls, 1); assert.equal(sim.player.grounded, true);
    sim.step({ x: 1 }, dt); assert.ok(sim.player.x > island.x);
  }
});

test('airborne pause is stationary for 30 seconds × five cycles and reopens without consuming energy', () => {
  const sim = new FlightSimulation(); sim.launch(); sim.step({ glide: true, z: -1 }, dt);
  for (let attempt = 0; attempt < 5; attempt++) {
    sim.setPaused(true); const state = sim.snapshot();
    for (let frame = 0; frame < 1800; frame++) sim.step({ glide: true, x: 1 }, dt);
    assert.deepEqual(sim.snapshot(), state); sim.setPaused(false); sim.step({ z: -1 }, dt);
  }
});

test('station order cannot be skipped; wind assist is an explicit choice after three recoveries', () => {
  const sim = new FlightSimulation({ save: { ...defaultSave(), checkpoint: 'island-storm' } }); sim.launch();
  assert.equal(sim.interact(), false); assert.deepEqual(sim.activated, []);
  for (let i = 0; i < 3; i++) { Object.assign(sim.player, { y: -60, grounded: false, gliding: false }); sim.step({}, dt); }
  assert.equal(sim.assist, false); assert.ok(sim.drainEvents().some((e) => e.type === 'assist-offer'));
  sim.setAssist(true); assert.equal(sim.state.usedAssist, true);
});

test('fragments are collected only once and permanent exploration persists across reset and module changes', () => {
  const sim = new FlightSimulation(); sim.launch(); const relic = WORLD.relics[0];
  Object.assign(sim.player, { x: relic.x, z: relic.z });
  for (let i = 0; i < 10; i++) sim.step({}, dt);
  assert.deepEqual(sim.relics, [relic.id]); assert.equal(sim.drainEvents().filter((e) => e.type === 'relic').length, 1);
  sim.state.courseStages['challenge-1'] = WORLD.challenges[0].stages.length;
  sim.state.challenges.push('challenge-1'); sim.state.completedChallenges.push('challenge-1'); sim.state.unlocked.push('island-reed');
  sim.reset({ module: 'tailwind' }); assert.deepEqual(sim.relics, [relic.id]); assert.ok(sim.state.unlocked.includes('island-reed'));
  assert.deepEqual(sim.challenges, []); assert.deepEqual(sim.state.completedChallenges, ['challenge-1']);
});

test('save reconstruction always starts on safe ground and sanitizes invalid or duplicated data', () => {
  const save = validateSave({ ...defaultSave(), checkpoint: 'island-storm', relics: ['relic-01', 'relic-01', 'made-up'], activated: ['island-storm'], elapsed: Infinity, player: { x: 0, y: -90, z: 0 } });
  assert.deepEqual(save.relics, ['relic-01']); assert.deepEqual(save.activated, []); assert.equal(save.elapsed, 0);
  const sim = new FlightSimulation({ save }); assert.equal(sim.player.grounded, true); assert.equal(sim.player.y, islandById('island-storm').y);
  assert.equal(validateSave({ schemaVersion: SAVE_VERSION, checkpoint: 'bad' }), null);
});

test('v1 migration, corrupt JSON, unavailable storage and quota failure return actionable warnings', () => {
  const memory = new Map(); const storage = { getItem: (key) => memory.get(key), setItem: (key, value) => memory.set(key, value) };
  const store = new SaveStore(storage); assert.equal(store.load().warning, null);
  assert.equal(store.save({ ...defaultSave(), settings: { music: 0, reducedMotion: true } }).ok, true);
  const previous = storage.getItem(store.key); storage.setItem(store.key, '{invalid'); assert.match(store.load().warning, /損壞/); assert.equal(storage.getItem(store.key), '{invalid');
  storage.setItem(store.key, JSON.stringify({ version: 1, island: 'island-reed', fragments: ['relic-03'], settings: { music: 0 } }));
  const migration = store.load(); assert.equal(migration.migrated, true); assert.equal(migration.save.checkpoint, 'island-reed'); assert.equal(migration.save.settings.music, 0);
  assert.equal(migrateSave({ schemaVersion: 99 }).save, null);
  const unavailable = new SaveStore(null); assert.match(unavailable.load().warning, /不可用/); assert.equal(unavailable.save(defaultSave()).ok, false);
  storage.setItem(store.key, previous);
  const quota = new SaveStore({ getItem: storage.getItem, setItem() { throw Error('quota'); } }); quota.load();
  assert.equal(quota.save({ ...defaultSave(), relics: ['relic-02'] }).ok, false); assert.equal(storage.getItem(store.key), previous); assert.deepEqual(quota.memory.relics, ['relic-02']);
  store.load(); store.clearProgress(); assert.equal(store.load().save.settings.music, 0); assert.equal(store.load().save.settings.reducedMotion, true);
});

test('all twelve fragments and six wind challenges are collectible through ordinary movement in one full tour', (t) => {
  const sim = new FlightSimulation({ seed: 402, module: 'turn' }); sim.launch();
  const course = (id) => WORLD.challenges.find((challenge) => challenge.id === `challenge-${id}`);
  function collectIsland(id) {
    const island = islandById(`island-${id}`); assert.equal(sim.checkpoint, island.id); assert.equal(sim.player.grounded, true);
    if (sim.state.trackedHint) sim.cancelChallenge();
    for (const relic of WORLD.relics.filter((relic) => relic.islandId === island.id)) {
      if (relic.y - island.y < 4) walkTo(sim, relic);
      else {
        for (let frame = 0; frame < 60 * 60 && !sim.relics.includes(relic.id); frame++) {
          assert.equal(sim.state.activeChallenge, null, 'Unselected course interrupted relic exploration');
          steer(sim, relic);
        }
        flyToIsland(sim, island);
      }
      assert.ok(sim.relics.includes(relic.id), `Uncollected ${relic.id}: ${JSON.stringify(sim.player)}`);
    }
    walkTo(sim, island); assert.equal(sim.stalls, 0);
  }
  // Each course returns to its own starting island. The two inland courses are
  // visited at actual delivery stops, so no state placement or unpowered shortcut
  // substitutes for traversing the world.
  collectIsland('camp'); flyCourse(sim, course(1));
  flyMainSegment(sim, 1); collectIsland('reed');
  flyCourse(sim, course(2), { stopAfterStage: 1 }); collectIsland('archive'); flyCourse(sim, course(5));
  flyCourse(sim, course(2), { stopAfterStage: 2 }); collectIsland('bridge'); flyCourse(sim, course(3));
  flyCourse(sim, course(2));
  flyMainSegment(sim, 2); collectIsland('storm'); flyCourse(sim, course(4));
  flyMainSegment(sim, 3); collectIsland('dawn'); flyCourse(sim, course(6));
  flyMainSegment(sim, 4);
  assert.equal(sim.relics.length, 12); assert.equal(sim.challenges.length, 6); assert.equal(sim.status, 'complete'); assert.equal(sim.state.rating.exploration, 'S');
  for (const challenge of WORLD.challenges) assert.equal(sim.state.courseStages[challenge.id], challenge.stages.length);
  assert.equal(sim.stalls, 0);
  t.diagnostic(`Full 12-fragment / 23-stage / 6-course tour: ${sim.elapsed.toFixed(2)} simulation seconds (${(sim.elapsed / 60).toFixed(2)} minutes); stalls=${sim.stalls}. Informed ordinary-input pilot, not first-time human playtime.`);
});

test('each multi-stage wind-skill course is completable with all three modules using ordinary inputs', (t) => {
  for (const challenge of WORLD.challenges) for (const module of MODULES) {
    const sim = new FlightSimulation({ save: { ...defaultSave(), seed: 20261025, module: module.id, checkpoint: challenge.islandId } }); sim.launch();
    const seconds = flyCourse(sim, challenge);
    assert.ok(sim.challenges.includes(challenge.id)); assert.equal(sim.state.courseStages[challenge.id], challenge.stages.length);
    assert.equal(sim.state.challengeProgress[challenge.id], undefined); assert.equal(sim.state.activeChallenge, null); assert.equal(sim.state.challengeHint, null);
    assert.equal(sim.checkpoint, challenge.stages.at(-1).toIslandId); assert.equal(sim.player.grounded, true); assert.equal(sim.stalls, 0);
    const events = sim.drainEvents(); assert.equal(events.filter((e) => e.type === 'challenge-start').length, challenge.stages.length);
    assert.equal(events.filter((e) => e.type === 'challenge-gate').length, challenge.stages.reduce((count, stage) => count + stage.gates.length, 0));
    assert.equal(events.filter((e) => e.type === 'challenge-stage').length, challenge.stages.length - 1); assert.equal(events.filter((e) => e.type === 'challenge').length, 1);
    t.diagnostic(`${challenge.kind}/${module.id}: ${seconds.toFixed(2)} s, energy=${sim.player.energy.toFixed(1)}`);
  }
});

test('entry does not complete a course; cancellation, stall and reload retain delivered stages only', () => {
  const challenge = WORLD.challenges[0], sim = new FlightSimulation(); sim.launch();
  flyCourse(sim, challenge, { stopAfterStage: 1 }); assert.equal(sim.state.courseStages[challenge.id], 1);
  flyCourse(sim, challenge, { stopAfterGate: 1 }); assert.equal(sim.challenges.length, 0); assert.equal(sim.state.activeChallenge, challenge.id);
  const saved = sim.saveData(), restored = new FlightSimulation({ save: saved });
  assert.equal(restored.state.activeChallenge, null); assert.deepEqual(restored.state.challengeProgress, {}); assert.equal('challengeProgress' in saved, false);
  assert.equal(restored.state.courseStages[challenge.id], 1); assert.equal(restored.checkpoint, challenge.stages[0].toIslandId);
  const before = { stalls: sim.stalls, activated: [...sim.activated], relics: [...sim.relics] };
  assert.equal(sim.cancelChallenge(), true); assert.equal(sim.state.activeChallenge, null); assert.equal(sim.stalls, before.stalls); assert.deepEqual(sim.activated, before.activated); assert.deepEqual(sim.relics, before.relics);
  assert.equal(sim.state.courseStages[challenge.id], 1);
  assert.ok(sim.drainEvents().some((e) => e.type === 'challenge-reset' && e.reason === 'cancel'));
  const retry = new FlightSimulation({ save: { ...saved, relics: ['relic-01'], completedChallenges: ['challenge-6'] } }); retry.launch(); flyCourse(retry, challenge, { stopAfterGate: 2 });
  Object.assign(retry.player, { y: -60, grounded: false, gliding: false }); retry.step({}, dt);
  assert.equal(retry.state.activeChallenge, null); assert.equal(retry.state.challengeProgress[challenge.id], undefined); assert.equal(retry.state.courseStages[challenge.id], 1);
  assert.deepEqual(retry.state.completedChallenges, ['challenge-6']); assert.deepEqual(retry.relics, ['relic-01']);
  assert.ok(retry.drainEvents().some((e) => e.type === 'challenge-reset' && e.reason === 'stall'));
});

test('passing every gate is not a delivered stage until the player lands and presses interact', () => {
  const challenge = WORLD.challenges[0], stage = challenge.stages[0], sim = new FlightSimulation(); sim.launch();
  flyCourse(sim, challenge, { stopAfterGate: stage.gates.length });
  assert.equal(sim.player.grounded, false); assert.equal(sim.state.courseStages[challenge.id], 0); assert.equal(sim.saveData().courseStages[challenge.id], 0);
  assert.equal(sim.interact(), false); assert.equal(sim.state.challengeHint.landing, true);
  const landing = islandById(stage.toIslandId);
  for (let frame = 0; frame < 60 * 60 && !(sim.player.grounded && distance(sim.player, landing) < 8); frame++) steer(sim, landing, { landing: true });
  assert.equal(sim.player.grounded, true); assert.ok(distance(sim.player, landing) < 8); assert.equal(sim.state.courseStages[challenge.id], 0);
  assert.equal(sim.interact(), true); assert.equal(sim.state.courseStages[challenge.id], 1); assert.equal(sim.saveData().courseStages[challenge.id], 1); assert.equal(sim.stalls, 0);
});

test('gates enforce sequence and entry cancellation does not immediately restart the course', () => {
  const sim = new FlightSimulation(); sim.launch(); const challenge = WORLD.challenges[0];
  const placeForRuleProbe = (target) => Object.assign(sim.player, { x: target.x, y: target.y, z: target.z, vx: 18, vy: 0, vz: 0, heading: Math.PI / 2, grounded: false, gliding: true, energy: 100 });
  // These explicit point probes validate rejection only. Reachability is covered
  // separately by the 18 ordinary-input course traversals above.
  const entry = sim.courseEntry(challenge);
  assert.equal(sim.trackChallenge(challenge.id), true);
  placeForRuleProbe(entry); sim.step({ x: 1 }, dt); assert.equal(sim.state.activeChallenge, challenge.id); assert.equal(sim.state.challengeProgress[challenge.id], 0);
  placeForRuleProbe(challenge.stages[0].gates[1]); sim.step({ x: 1 }, dt); assert.equal(sim.state.challengeProgress[challenge.id], 0, 'Skipped gate was incorrectly accepted');
  placeForRuleProbe(entry); sim.step({ x: 1 }, dt); assert.equal(sim.challenges.length, 0, 'Early return completed course');
  sim.cancelChallenge(); sim.step({ x: 1 }, dt); assert.equal(sim.state.activeChallenge, null, 'Cancellation instantly restarted inside entry ring');
  assert.equal(sim.state.challengeProgress[challenge.id], undefined);
});

test('main sampling enforces order, speed, energy, vertical stability and entry direction', () => {
  function probe(mission, index, overrides = {}, aligned = true) {
    const route = WORLD.routes.find((route) => route.mission === mission && route.style === 'safe');
    const sim = routeSimulation(route); sim.state.mainSamples[mission - 1] = index; sim.setRouteStyle('safe'); sim.launch();
    const target = route.samples[index], direction = target.heading || { x: 0, z: -1 };
    const length = Math.hypot(direction.x, direction.z), sign = aligned ? 1 : -1;
    Object.assign(sim.player, { x: target.x, y: target.y, z: target.z, vx: sign * direction.x / length * 18, vz: sign * direction.z / length * 18, vy: 0, grounded: false, gliding: true, energy: 100, ...overrides });
    sim.step({ x: sign * direction.x / length, z: sign * direction.z / length }, dt);
    return sim.state.mainSamples[mission - 1];
  }
  const route = WORLD.routes.find((route) => route.id === 'route-1-safe'), skip = routeSimulation(route); skip.launch();
  Object.assign(skip.player, { ...route.samples[1], vx: 18, vy: 0, vz: 0, grounded: false, gliding: true }); skip.step({ x: 1 }, dt);
  assert.equal(skip.state.mainSamples[0], 0, 'Out-of-order sample was accepted');
  assert.equal(probe(1, 0, { vx: 0, vz: 0 }), 0, 'Too-slow entry was accepted'); assert.equal(probe(1, 0), 1);
  assert.equal(probe(1, 2, { energy: 5 }), 2, 'Low-energy entry was accepted'); assert.equal(probe(1, 2), 3);
  assert.equal(probe(2, 0, { vy: 9 }), 0, 'Unstable entry was accepted'); assert.equal(probe(2, 0), 1);
  assert.equal(probe(3, 1, {}, false), 1, 'Opposite heading was accepted'); assert.equal(probe(3, 1), 2);
  const missing = new FlightSimulation({ save: { ...defaultSave(), checkpoint: STATIONS[0] } }); missing.launch();
  assert.equal(missing.interact(), false); assert.equal(missing.activated.length, 0, 'Landing alone must not bypass samples');
});

test('used assistance survives disabling and reload; island, results and migrated saves each reload five times', () => {
  const sim = new FlightSimulation(); sim.launch(); sim.setAssist(true); sim.setAssist(false);
  for (let run = 0; run < 5; run++) {
    const reloaded = new FlightSimulation({ save: sim.saveData() });
    assert.equal(reloaded.state.usedAssist, true); assert.equal(reloaded.assist, false); assert.equal(reloaded.player.grounded, true);
    const finished = { ...defaultSave(), activated: [...STATIONS], completed: true, relics: ['relic-01'] };
    const results = new FlightSimulation({ save: finished }); assert.equal(results.status, 'complete'); assert.deepEqual(results.relics, ['relic-01']);
    const migrated = migrateSave({ version: 1, island: 'island-dawn', fragments: ['relic-11', 'relic-11'] });
    const upgraded = new FlightSimulation({ save: migrated.save }); assert.equal(upgraded.player.y, islandById('island-dawn').y); assert.deepEqual(upgraded.relics, ['relic-11']);
  }
});

test('the solid island body rejects sideways entry below the walking surface', () => {
  for (const island of WORLD.islands) {
    const sim = new FlightSimulation({ save: { ...defaultSave(), checkpoint: island.id } }); sim.launch();
    Object.assign(sim.player, { x: island.x + island.radius, y: island.y - 5, z: island.z, grounded: false, gliding: true });
    for (let frame = 0; frame < 60; frame++) {
      sim.step({ x: -1, brake: true }, dt);
      const depth = island.y - sim.player.y;
      if (depth > 0.1 && depth < 38) assert.ok(distance(sim.player, island) >= island.radius * Math.max(0.15, 1 - Math.max(0, depth - 2) / 43) + 0.7);
    }
  }
});

test('data-driven exploration requires added relic and course, preserves their save data, and guides the next objective', () => {
  const relicCount = WORLD.relics.length, challengeCount = WORLD.challenges.length;
  const originalRelics = WORLD.relics.map((item) => item.id), originalChallenges = WORLD.challenges.map((item) => item.id);
  const extraRelic = { ...WORLD.relics[0], id: 'relic-review-extension', name: '擴充航信', x: 0, y: 1.4, z: 0 };
  const extraChallenge = {
    ...WORLD.challenges[0], id: 'challenge-review-extension', name: '擴充測風航程',
    stages: WORLD.challenges[0].stages.map((stage, index) => ({ ...stage, id: `challenge-review-extension-stage-${index + 1}`,
      gates: stage.gates.map((gate) => ({ ...gate, id: `extension-${gate.id}` })),
      winds: stage.winds.map((wind) => ({ ...wind, id: `extension-${wind.id}`, challengeId: 'challenge-review-extension', stageId: `challenge-review-extension-stage-${index + 1}` })),
    })),
  };
  try {
    WORLD.relics.push(extraRelic); WORLD.challenges.push(extraChallenge);
    const originalComplete = { ...defaultSave(), checkpoint: 'island-camp', activated: [...STATIONS], mainSamples: sampleTotals(), relics: originalRelics, challenges: originalChallenges, completedChallenges: originalChallenges, courseStages: Object.fromEntries(WORLD.challenges.slice(0, challengeCount).map((challenge) => [challenge.id, challenge.stages.length])), completed: true };
    const missingBoth = new FlightSimulation({ save: originalComplete });
    assert.notEqual(missingBoth.state.rating.exploration, 'S', 'Previous totals cannot complete expanded content');
    assert.equal(missingBoth.state.rating.next, '再找出 1 份文明碎片');

    const pickup = new FlightSimulation({ save: { ...originalComplete, completed: false } }); pickup.launch(); pickup.step({}, dt);
    assert.ok(pickup.relics.includes(extraRelic.id), 'Added relic must be collectible from content data');
    assert.equal(pickup.interact(), true); assert.notEqual(pickup.state.rating.exploration, 'S');
    assert.equal(pickup.state.rating.next, '再完成 1 個測風挑戰');
    const savedPickup = validateSave(pickup.saveData()); assert.ok(savedPickup.relics.includes(extraRelic.id));

    const course = new FlightSimulation({ save: { ...savedPickup, completed: false } }); course.launch();
    flyCourse(course, extraChallenge);
    assert.ok(course.challenges.includes(extraChallenge.id), 'Added course must run through the existing course state machine');
    const allSaved = validateSave(course.saveData());
    assert.ok(allSaved.relics.includes(extraRelic.id)); assert.ok(allSaved.challenges.includes(extraChallenge.id));
    const complete = new FlightSimulation({ save: { ...allSaved, completed: true } });
    assert.equal(complete.state.rating.exploration, 'S'); assert.equal(complete.state.rating.next, '換上另一個模組，改善航程時間');
    const proportion = new FlightSimulation({ save: { ...originalComplete, relics: originalRelics.slice(0, 8) } });
    assert.equal(proportion.state.rating.exploration, 'B', 'Eight of thirteen is below the original two-thirds A threshold');
  } finally {
    WORLD.relics.splice(relicCount); WORLD.challenges.splice(challengeCount);
  }
  assert.equal(WORLD.relics.length, relicCount); assert.equal(WORLD.challenges.length, challengeCount);
});

test('existing twelve-relic content retains its A and B exploration thresholds', () => {
  for (const [count, expected] of [[0, 'C'], [3, 'C'], [4, 'B'], [7, 'B'], [8, 'A'], [11, 'A'], [12, 'A']]) {
    const sim = new FlightSimulation({ save: { ...defaultSave(), checkpoint: 'island-camp', activated: [...STATIONS], completed: true, relics: WORLD.relics.slice(0, count).map((item) => item.id) } });
    assert.equal(sim.state.rating.exploration, expected, `${count} of twelve relics`);
  }
});
