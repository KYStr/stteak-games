import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { WORLD, MODULES, STATIONS, islandById } from '../../../games/aetherwake/src/world.js';
import { FlightSimulation } from '../../../games/aetherwake/src/simulation.js';
import { defaultSave, validateSave } from '../../../games/aetherwake/src/storage.js';
import { dt, distance, steer, flyCourse, flyToCourseEntry } from './flight-test-pilot.mjs';

const xyz = ({ x, y, z }) => ({ x, y, z });
const gap = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
const courseAt = (island) => WORLD.challenges.find((challenge) => challenge.stages[0].fromIslandId === island.id);
function expedition(island, module = 'turn', extra = {}) {
  const sim = new FlightSimulation({ save: { ...defaultSave(), seed: 73107, module, checkpoint: island.id, mainSamples: [1, 0, 0], routeStyle: 'shortcut', ...extra } });
  sim.launch(); return sim;
}
function assertSafeReturn(sim, checkpoint) {
  assert.deepEqual(xyz(sim.player), xyz(islandById(checkpoint)));
  assert.equal(sim.player.grounded, true); assert.equal(sim.player.gliding, false);
  assert.equal(sim.player.vx, 0); assert.equal(sim.player.vy, 0); assert.equal(sim.player.vz, 0);
  assert.equal(sim.player.energy, 100); assert.equal(sim.status, 'running');
}
function advanceTracked(sim, until, maxSeconds = 300) {
  const stalls = sim.stalls;
  for (let frame = 0; frame < maxSeconds * 60; frame++) {
    if (until()) return;
    assert.equal(sim.state.activeChallenge, null, `Unexpected course start: ${JSON.stringify(sim.snapshot())}`);
    assert.ok(sim.state.trackedHint, 'Missing transit target');
    steer(sim, sim.state.trackedHint);
    assert.equal(sim.stalls, stalls, `Transfer recovery: ${JSON.stringify(sim.snapshot())}`);
  }
  assert.fail(`Transfer condition timeout: ${JSON.stringify(sim.snapshot())}`);
}

function verifyJourney(t, from, to, module) {
  // A legal checkpoint is the only starting fixture. All travel after launch is
  // input-driven; no player position, velocity, energy or sample counter is set.
  const sim = expedition(from, module), challenge = courseAt(to);
  const phases = structuredClone(sim.state.courseStages), samples = [...sim.state.mainSamples];
  let maxStep = 0, frames = 0;
  const seconds = flyToCourseEntry(sim, challenge, { afterStep(current, previous) {
    const moved = gap(current.player, previous); maxStep = Math.max(maxStep, moved); frames++;
    assert.ok(moved < 2, `Discontinuous flight ${from.id} -> ${to.id}/${module}: ${moved} m in one frame`);
    assert.ok(Number.isFinite(current.player.energy) && current.player.energy > 0 && current.player.energy <= 100);
  } });
  assert.equal(sim.stalls, 0); assert.ok(frames > 0); assert.equal(sim.state.activeChallenge, challenge.id);
  assert.ok(gap(sim.player, sim.courseEntry(challenge)) < challenge.radius + 0.01);
  assert.equal(sim.state.challengeProgress[challenge.id], 0); assert.deepEqual(sim.state.courseStages, phases);
  assert.deepEqual(sim.state.mainSamples, samples); assert.deepEqual(sim.activated, []); assert.deepEqual(sim.challenges, []);
  const events = sim.drainEvents();
  assert.equal(events.filter((event) => event.type === 'challenge-start').length, 1);
  assert.equal(events.filter((event) => ['survey', 'challenge-gate', 'challenge-stage', 'challenge', 'station', 'stall'].includes(event.type)).length, 0);
  t.diagnostic(`${from.id} -> ${to.id}/${module}: ${seconds.toFixed(2)} simulation seconds, ${frames} ordinary-input frames, max step ${maxStep.toFixed(3)} m, energy ${sim.player.energy.toFixed(1)}`);
}

for (const from of WORLD.islands) for (const to of WORLD.islands) {
  test(`transit turn ${from.id} -> ${to.id} reaches the selected course continuously`, (t) => verifyJourney(t, from, to, 'turn'));
}
// Turn covers these directions in the all-pairs matrix. Repeat the reverse main
// corridors and both inland branches with each of the other two modules.
for (const module of MODULES.filter((module) => module.id !== 'turn')) {
  for (const [fromId, toId] of [['reed', 'camp'], ['storm', 'reed'], ['dawn', 'storm'], ['bridge', 'archive'], ['archive', 'bridge']]) {
    const from = islandById(`island-${fromId}`), to = islandById(`island-${toId}`);
    test(`transit ${module.id} ${from.id} -> ${to.id} traverses reverse or branch corridors`, (t) => verifyJourney(t, from, to, module.id));
  }
}

test('an unselected course entrance can be crossed without starting a course', () => {
  const sim = expedition(WORLD.islands[0]), challenge = WORLD.challenges[0], entry = sim.courseEntry(challenge);
  let crossed = false;
  for (let frame = 0; frame < 60 * 30 && !crossed; frame++) {
    steer(sim, entry); crossed = gap(sim.player, entry) < entry.radius;
    assert.equal(sim.state.activeChallenge, null); assert.equal(sim.state.trackedHint, null);
  }
  assert.equal(crossed, true); assert.equal(sim.stalls, 0);
  assert.equal(sim.drainEvents().filter((event) => event.type === 'challenge-start').length, 0);
});

test('airborne course selection is rejected without replacing an existing route or changing state', () => {
  for (const selected of [false, true]) {
    const sim = expedition(WORLD.islands[0]);
    if (selected) assert.equal(sim.trackChallenge('challenge-4'), true);
    sim.step({ glide: true, z: -1 }, dt); assert.equal(sim.player.grounded, false);
    const before = sim.snapshot();
    assert.equal(sim.trackChallenge('challenge-3'), false); assert.deepEqual(sim.snapshot(), before);
  }
});

test('canceling a tracked transfer returns safely without a stall, penalty or lost delivered phases', () => {
  const sim = expedition(WORLD.islands[0], 'turn', { courseStages: { 'challenge-5': 1 }, completedChallenges: ['challenge-6'], relics: ['relic-01'] });
  assert.equal(sim.trackChallenge('challenge-5'), true);
  advanceTracked(sim, () => !sim.player.grounded && distance(sim.player, WORLD.islands[0]) > 80);
  const before = sim.snapshot(); assert.ok(before.trackedHint.transit);
  assert.equal(sim.cancelChallenge(), true); assertSafeReturn(sim, before.checkpoint);
  assert.equal(sim.elapsed, before.elapsed); assert.equal(sim.stalls, before.stalls); assert.equal(sim.state.score, before.score);
  for (const key of ['mainSamples', 'courseStages', 'completedChallenges', 'relics', 'activated']) assert.deepEqual(sim.state[key], before[key], key);
  assert.equal(sim.state.trackedHint, null); assert.equal(sim.state.activeChallenge, null); assert.deepEqual(sim.state.transitWaypoints, []);
  const saved = validateSave(sim.saveData()); assert.equal(saved.courseStages['challenge-5'], 1);
  assert.ok(sim.drainEvents().some((event) => event.type === 'challenge-reset' && event.reason === 'cancel'));
});

test('canceling an active later stage returns to its delivered checkpoint and preserves permanent achievements', () => {
  const challenge = WORLD.challenges[0], checkpoint = challenge.stages[0].toIslandId;
  const sim = expedition(islandById(checkpoint), 'turn', { courseStages: { [challenge.id]: 1 }, completedChallenges: ['challenge-6'], relics: ['relic-01'] });
  flyCourse(sim, challenge, { stopAfterGate: 1 }); assert.equal(sim.state.activeChallenge, challenge.id);
  const before = sim.snapshot(); assert.equal(sim.player.grounded, false);
  assert.equal(sim.cancelChallenge(), true); assertSafeReturn(sim, checkpoint);
  assert.equal(sim.elapsed, before.elapsed); assert.equal(sim.stalls, before.stalls); assert.equal(sim.state.score, before.score);
  assert.equal(sim.state.courseStages[challenge.id], 1); assert.deepEqual(sim.state.completedChallenges, ['challenge-6']);
  assert.deepEqual(sim.relics, before.relics); assert.deepEqual(sim.state.mainSamples, before.mainSamples);
  assert.equal(sim.state.challengeProgress[challenge.id], undefined);
  const restored = new FlightSimulation({ save: sim.saveData() });
  assert.equal(restored.checkpoint, checkpoint); assert.equal(restored.state.courseStages[challenge.id], 1);
  assert.deepEqual(restored.state.completedChallenges, ['challenge-6']);
});

test('a real fall after an intermediate landing replans transit from the new safe island and remains flyable', (t) => {
  const camp = islandById('island-camp'), challenge = courseAt(islandById('island-storm'));
  const sim = expedition(camp, 'turn', { courseStages: { 'challenge-1': 1 }, relics: ['relic-01'] });
  assert.equal(sim.trackChallenge(challenge.id), true);
  const original = structuredClone(sim.state.transitWaypoints);
  const intermediate = WORLD.islands.find((island) => island.id !== camp.id && island.id !== challenge.islandId && original.some((point) => distance(point, island) < 0.01 && Math.abs(point.y - island.y - 26) < 0.01));
  assert.ok(intermediate, 'The selected route must actually pass an intermediate island');
  const stop = original.findIndex((point) => distance(point, intermediate) < 0.01 && Math.abs(point.y - intermediate.y - 26) < 0.01);
  assert.ok(stop >= 0, 'The selected route must actually pass the intermediate island');
  advanceTracked(sim, () => sim.state.transitIndex > stop);
  for (let frame = 0; frame < 60 * 60 && !(sim.player.grounded && distance(sim.player, intermediate) < 8); frame++) steer(sim, intermediate, { landing: true });
  assert.equal(sim.player.grounded, true); assert.equal(sim.checkpoint, intermediate.id); assert.equal(sim.stalls, 0);
  advanceTracked(sim, () => !sim.player.grounded && distance(sim.player, intermediate) > intermediate.radius + 45);
  const beforeFall = sim.elapsed;
  sim.step({ glide: true }, dt); assert.equal(sim.player.gliding, false);
  for (let frame = 0; frame < 60 * 20 && sim.stalls === 0; frame++) sim.step({}, dt);
  assert.equal(sim.stalls, 1); assertSafeReturn(sim, intermediate.id); assert.ok(sim.elapsed > beforeFall + 8);
  assert.equal(sim.state.trackedHint.id, challenge.id); assert.equal(sim.state.transitIndex, 0);
  assert.ok(sim.state.transitWaypoints.length < original.length); assert.notDeepEqual(xyz(sim.state.transitWaypoints[0]), xyz(original[0]));
  assert.deepEqual(sim.state.mainSamples, [1, 0, 0]); assert.equal(sim.state.courseStages['challenge-1'], 1); assert.deepEqual(sim.relics, ['relic-01']);
  const seconds = flyToCourseEntry(sim, challenge); assert.equal(sim.stalls, 1); assert.equal(sim.state.activeChallenge, challenge.id);
  t.diagnostic(`Replanned ${intermediate.id} -> ${challenge.islandId} in ${seconds.toFixed(2)} simulation seconds after one intentional closed-sail fall`);
});

test('tracked transit blocks keyboard station delivery and final return until tracking is canceled', (t) => {
  const totals = STATIONS.map((_, index) => WORLD.routes.find((route) => route.mission === index + 1 && route.style === 'safe').samples.length);
  const station = expedition(islandById(STATIONS[0]), 'turn', { mainSamples: [totals[0], 0, 0] });
  assert.equal(station.trackChallenge('challenge-3'), true);
  assert.equal(station.interact(), false); assert.deepEqual(station.activated, []); assert.equal(station.status, 'running');
  assert.equal(station.cancelChallenge(), true); assert.equal(station.interact(), true); assert.deepEqual(station.activated, [STATIONS[0]]);
  const returning = expedition(islandById('island-camp'), 'turn', { mainSamples: totals, activated: [...STATIONS] });
  assert.equal(returning.trackChallenge('challenge-5'), true);
  assert.equal(returning.interact(), false); assert.equal(returning.status, 'running'); assert.equal(returning.state.routeTimes.length, 0);
  assert.equal(returning.cancelChallenge(), true); assert.equal(returning.interact(), true); assert.equal(returning.status, 'complete');
  const source = readFileSync(new URL('../../../games/aetherwake/src/simulation.js', import.meta.url));
  t.diagnostic(`Source-only regression: simulation.js SHA-256 ${createHash('sha256').update(source).digest('hex')}`);
});
