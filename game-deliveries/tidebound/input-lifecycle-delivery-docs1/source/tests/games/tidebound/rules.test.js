import test from 'node:test';
import assert from 'node:assert/strict';
import { ISLANDS, DISCOVERIES, CONTRACTS, RIGS, REEFS, WHIRLS, CURRENTS, DIVE_SITES, OBSERVATIONS, ROUTE_CHOICES, ROUTE_DIRECTIONS, TIDE_PERIOD } from '../../../games/tidebound/src/world.js';
import { CREDITS_DESCRIPTION, createState, tideAt, currentAt, whirlActive, step, depart, dock, interact, startDive, surface, rescue, advanceTide, serialize, restore, contractProgress, nextObjective, nearestObservation, collectObservation, skipObservation, nearestRouteChoice, chooseRoute, activeNavigation, cancelRoute } from '../../../games/tidebound/src/rules.js';
import { measureFirst } from './maker-pacing.mjs';
import { simulateReturn, simulateBranch, simulateCompleteLeg, crossingLegs, startLeg } from './maker-0011-navigation.mjs';

const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const islandById = (id) => ISLANDS.find((island) => island.id === id);
const pointSegmentDistance = (p, a, b) => {
  const length = (b.x - a.x) ** 2 + (b.z - a.z) ** 2;
  const t = length === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * (b.x - a.x) + (p.z - a.z) * (b.z - a.z)) / length));
  return distance(p, { x: a.x + t * (b.x - a.x), z: a.z + t * (b.z - a.z) });
};
function moor(state, islandId) {
  const island = islandById(islandId);
  Object.assign(state.boat, island.dock, { speed: 0, sail: 0 });
  state.mode = 'sailing';
  return dock(state);
}
function steerTo(state, target, tolerance = 10) {
  for (let i = 0; i < 5000; i += 1) {
    const d = distance(state.boat, target);
    if (d < tolerance) return;
    assert.equal(state.mode, 'sailing', `rescue interrupted navigation to ${JSON.stringify(target)}`);
    const angle = Math.atan2(target.x - state.boat.x, -(target.z - state.boat.z));
    const error = Math.atan2(Math.sin(angle - state.boat.heading), Math.cos(angle - state.boat.heading));
    const desiredSail = Math.abs(error) > 1 ? 0.2 : d < 30 ? 0.42 : 0.8;
    step(state, 0.1, { turn: Math.max(-1, Math.min(1, error * 2.8)), sailDelta: (desiredSail - state.boat.sail) * 5 });
  }
  assert.fail(`navigation timed out at ${JSON.stringify(state.boat)} to ${JSON.stringify(target)}`);
}
function navigate(state, waypoints) {
  for (const target of waypoints.slice(1)) steerTo(state, target, 7);
  for (let i = 0; i < 15; i += 1) step(state, 0.1, { brake: true });
}
function swimTo(state, target) {
  for (let i = 0; i < 300; i += 1) {
    const dx = target.x - state.diver.x, dz = target.z - state.diver.z, d = Math.hypot(dx, dz);
    if (d < 1) return;
    step(state, 0.1, { diveX: dx / d, diveZ: dz / d });
  }
  assert.fail('swim did not reach target');
}

test('hand-authored 1.0 content has exactly seven islands, twelve discoveries, six contracts and three rigs/dives', () => {
  assert.equal(ISLANDS.length, 7);
  assert.equal(DISCOVERIES.length, 12);
  assert.equal(CONTRACTS.length, 6);
  assert.equal(RIGS.length, 3);
  assert.equal(DIVE_SITES.length, 3);
  for (const kind of ['animal', 'plant', 'relic']) assert.equal(DISCOVERIES.filter((item) => item.kind === kind).length, 4);
  assert.equal(new Set(DISCOVERIES.map((item) => item.id)).size, 12);
  for (const island of ISLANDS) {
    assert.ok(Math.abs(island.x) + island.radius <= 260 && Math.abs(island.z) + island.radius <= 260);
    assert.ok(distance(island, island.dock) >= island.radius + 7, `${island.id} dock must clear the 11.9m vessel`);
    for (const id of island.discoveries) assert.equal(DISCOVERIES.find((item) => item.id === id).islandId, island.id);
  }
});

test('tide, current and two whirl thresholds stay deterministic through ten full cycles', () => {
  for (let cycle = 0; cycle < 10; cycle += 1) {
    for (let t = 0; t < TIDE_PERIOD; t += 0.25) {
      const base = tideAt(t), later = tideAt(t + cycle * TIDE_PERIOD);
      assert.ok(Math.abs(base.height - later.height) < 1e-10);
      assert.equal(base.label, later.label);
      assert.equal(base.secondsToChange, later.secondsToChange);
      assert.equal(later.forecast.length, 2);
      assert.ok(later.forecast[1].startsIn >= 60);
      assert.equal(tideAt(t + cycle * TIDE_PERIOD + later.secondsToChange + 0.001).label, later.nextLabel);
      for (const stream of CURRENTS) {
        const a = currentAt(stream.x, stream.z, t, 5), b = currentAt(stream.x, stream.z, t + cycle * TIDE_PERIOD, 5);
        assert.ok(Math.abs(a.x - b.x) + Math.abs(a.z - b.z) < 1e-9);
      }
      for (const whirl of WHIRLS) assert.equal(whirlActive(whirl, t), whirlActive(whirl, t + cycle * TIDE_PERIOD));
      for (const reef of REEFS) assert.equal(base.height > reef.safeHeight, later.height > reef.safeHeight);
    }
  }
});

test('six safe routes avoid all island colliders and every shoal/whirl at all tides', () => {
  for (const contract of CONTRACTS) {
    assert.equal(contract.routes.length, 2);
    const path = contract.routes[0].waypoints;
    assert.deepEqual(path.at(-1), islandById(contract.routes[0].legs.at(-1).toIslandId).dock);
    for (let i = 1; i < path.length; i += 1) {
      for (const island of ISLANDS) assert.ok(pointSegmentDistance(island, path[i - 1], path[i]) >= island.radius + 7, `${contract.id}: coast ${island.id}`);
      for (const hazard of [...REEFS, ...WHIRLS]) assert.ok(pointSegmentDistance(hazard, path[i - 1], path[i]) > hazard.radius + 1, `${contract.id}: hazard ${hazard.id}`);
    }
  }
});

test('phase descriptions match the continuous water level and forecasts announce changes thirty seconds early', () => {
  for (let t = 0.1; t < TIDE_PERIOD * 10; t += 0.5) {
    const tide = tideAt(t);
    const derivative = tideAt(t + 0.01).height - tideAt(t - 0.01).height;
    assert.equal(tide.direction, derivative > 0 ? 'rising' : 'falling');
    assert.equal(tide.waterLevel, tide.height >= 0 ? 'high' : 'low');
    assert.match(tide.label, tide.direction === 'rising' ? /漲潮/ : /退潮/);
    assert.ok(tide.forecastHorizon >= 120);
    for (const predicted of tide.forecast) {
      const actual = tideAt(t + predicted.startsIn + 0.01);
      assert.equal(predicted.direction, actual.direction);
      assert.equal(predicted.waterLevel, actual.waterLevel);
      assert.equal(predicted.description, actual.description);
    }
  }
  for (let transition = 60; transition <= TIDE_PERIOD * 10; transition += 60) {
    const state = createState();
    state.time = transition - 30.01;
    const events = step(state, 0.02);
    const forecast = events.find((entry) => entry.type === 'tide-forecast');
    assert.ok(forecast);
    assert.ok(Math.abs(forecast.startsIn - 30) < 0.02);
    assert.equal(forecast.nextLabel, tideAt(transition + 0.01).label);
    assert.equal(step(state, 0.02).filter((entry) => entry.type === 'tide-forecast').length, 0);
  }
});

test('shoal collision and whirl damage switch within 0.1 seconds of analytic predictions across ten cycles', () => {
  const probe = (hazard, atTime) => {
    const state = createState();
    depart(state);
    Object.assign(state.boat, { x: hazard.x, z: hazard.z, hull: 100, sail: 0, speed: 0 });
    state.time = atTime;
    step(state, 0.01);
    return state.boat.hull < 100;
  };
  for (let cycle = 0; cycle < 10; cycle += 1) {
    for (const reef of REEFS) {
      const first = Math.asin(reef.safeHeight) / (Math.PI * 2) * TIDE_PERIOD;
      const second = TIDE_PERIOD / 2 - first;
      assert.equal(probe(reef, cycle * TIDE_PERIOD + first - 0.05), true);
      assert.equal(probe(reef, cycle * TIDE_PERIOD + first + 0.05), false);
      assert.equal(probe(reef, cycle * TIDE_PERIOD + second - 0.05), false);
      assert.equal(probe(reef, cycle * TIDE_PERIOD + second + 0.05), true);
    }
    for (const whirl of WHIRLS) {
      const first = ((Math.asin(0.25) - whirl.phase) / (Math.PI * 2) * TIDE_PERIOD + TIDE_PERIOD) % TIDE_PERIOD;
      assert.equal(probe(whirl, cycle * TIDE_PERIOD + first - 0.05), false);
      assert.equal(probe(whirl, cycle * TIDE_PERIOD + first + 0.05), true);
    }
  }
});

for (const contract of CONTRACTS) {
  for (const route of contract.routes) {
    test(`physics navigation completes ${contract.id}/${route.id} and returns with idempotent reward`, () => {
      const state = createState(4);
      depart(state, contract.id, 'steady');
      let events = [];
      for (const leg of route.legs) {
        navigate(state, leg.waypoints);
        events = dock(state);
        assert.equal(state.currentIsland, leg.toIslandId, JSON.stringify(events));
        if (leg.toIslandId === 'harbor') continue;
        interact(state);
        for (const objective of contract.objectives.filter((item) => item.islandId === leg.toIslandId && item.kind === 'dive')) {
          startDive(state, objective.siteId);
          swimTo(state, DIVE_SITES.find((item) => item.id === objective.siteId).target);
          interact(state); surface(state);
        }
        depart(state);
      }
      assert.ok(state.discoveries.includes(contract.targetDiscovery));
      if (state.currentIsland !== 'harbor') {
        navigate(state, [...route.waypoints].reverse());
        events = dock(state);
      }
      assert.ok(events.some((item) => item.type === 'delivery'), JSON.stringify(events));
      assert.equal(state.mode, 'result');
      assert.ok(state.completed.includes(contract.id));
      const credits = state.credits;
      for (let reload = 0; reload < 5; reload += 1) {
        const restored = restore(serialize(state)).state;
        assert.equal(restored.credits, credits);
        dock(restored);
        assert.equal(restored.credits, credits);
      }
    });
  }
}

test('docking requires distance and safe speed, repairs are always free', () => {
  const state = createState();
  depart(state);
  Object.assign(state.boat, { x: 230, z: 220, hull: 15 });
  assert.equal(dock(state)[0].type, 'info');
  Object.assign(state.boat, islandById('gull').dock, { speed: 9 });
  assert.match(dock(state)[0].text, /航速太快/);
  state.boat.speed = 0;
  dock(state);
  assert.equal(state.boat.hull, 100);
  assert.equal(state.credits, 0);
});

test('DOCK-001 departure adds only the missing reef clearance and leaves the other six docks unchanged', () => {
  const originalDocks = JSON.stringify(ISLANDS.map(({ id, dock }) => ({ id, dock })));
  for (const island of ISLANDS) {
    const state = createState();
    Object.assign(state, { mode: island.id === 'harbor' ? 'harbor' : 'island', currentIsland: island.id, lastSafeIsland: island.id });
    depart(state);
    assert.ok(distance(state.boat, island) >= island.radius + 8 - 1e-9, `${island.id}: missing hull/current departure buffer`);
    if (island.id === 'reef') {
      assert.ok(Math.abs(distance(state.boat, island.dock) - 1) < 1e-9);
      assert.ok(Math.abs(state.boat.x) < 1e-9);
      assert.equal(state.boat.z, 28);
    } else assert.deepEqual({ x: state.boat.x, z: state.boat.z }, island.dock, `${island.id}: existing departure position changed`);
  }
  assert.equal(JSON.stringify(ISLANDS.map(({ id, dock }) => ({ id, dock }))), originalDocks);
});

test('DOCK-001 rule fixtures depart and redock without damage across seven islands, three rigs, three seeds and thirteen tide phases', () => {
  // Rules-level controlled fixtures reproduce the reviewer's UI timings. This is not
  // browser navigation evidence or a claim that a player completed these voyages.
  const tidePhases = [4, 29, 59.9, 60.1, 74, 109, 119.9, 120.1, 149, 179.9, 180.1, 209, 239.9];
  let cases = 0;
  for (const island of ISLANDS) for (const rig of RIGS) for (const seed of [1, 2, 3]) for (const time of tidePhases) {
    const state = createState(seed);
    Object.assign(state, { time, mode: island.id === 'harbor' ? 'harbor' : 'island', currentIsland: island.id, lastSafeIsland: island.id, rigId: rig.id });
    Object.assign(state.boat, island.dock);
    const label = `${island.id}/${rig.id}/seed${seed}/time${time}`;
    depart(state, state.contractId, rig.id);
    const originalHull = state.boat.hull, originalDamage = state.voyage.damage;
    assert.equal(state.boat.sail, 0, `${label}: departure starts furled`);
    const events = step(state, 0.2);
    state.boat.sail = 1; // Equivalent rule input to the visible full-sail button.
    events.push(...step(state, 0.8));
    events.push(...step(state, 0.45, { brake: true }));
    assert.equal(state.boat.hull, originalHull, `${label}: near-dock departure hull damage`);
    assert.equal(state.voyage.damage, originalDamage, `${label}: near-dock voyage damage`);
    assert.ok(!events.some(({ type }) => type === 'damage' || type === 'rescue'), `${label}: unexpected damage/rescue event`);
    const docking = dock(state);
    assert.ok(docking.some(({ type, islandId }) => type === 'dock' && islandId === island.id), `${label}: cannot redock after braking: ${JSON.stringify(docking)}`);
    assert.equal(state.currentIsland, island.id, `${label}: wrong return port`);
    assert.equal(state.voyage.damage, originalDamage, `${label}: docking must not hide voyage damage`);
    cases += 1;
  }
  assert.equal(cases, 819);
});

test('each island withstands five collision/sinking recoveries without losing main progress', () => {
  for (const island of ISLANDS) {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const state = createState();
      state.parts = ['prism']; state.discoveries = ['foxfish']; state.cargo = ['tern', 'turtle'];
      depart(state);
      Object.assign(state.boat, { x: island.x, z: island.z, hull: 1, sail: 0, speed: 0 });
      const events = step(state, 0.05);
      assert.ok(events.some((item) => item.type === 'rescue'));
      assert.equal(state.boat.hull, 100);
      assert.deepEqual(state.parts, ['prism']);
      assert.deepEqual(state.discoveries, ['foxfish']);
      assert.equal(state.cargo.length, 1);
      assert.ok(['island', 'harbor'].includes(state.mode));
      depart(state);
      assert.equal(state.mode, 'sailing');
    }
  }
});

test('each finite dive supports three collect-and-return trips with >15% oxygen remaining', () => {
  for (const site of DIVE_SITES) {
    const state = createState();
    depart(state); moor(state, site.islandId);
    for (let attempt = 0; attempt < 3; attempt += 1) {
      startDive(state, site.id);
      swimTo(state, site.target);
      interact(state);
      assert.ok(state.parts.includes(site.partId));
      assert.ok(state.discoveries.includes(site.discoveryId));
      swimTo(state, site.entry);
      assert.ok(state.oxygen > site.oxygen * 0.15);
      surface(state);
      assert.equal(state.mode, 'island');
    }
    assert.equal(state.parts.length, 1);
  }
});

test('drowning before obtaining each main part allows immediate retry and recovery', () => {
  for (const site of DIVE_SITES) {
    const state = createState();
    depart(state); moor(state, site.islandId); startDive(state, site.id);
    state.oxygen = 0.05;
    const events = step(state, 0.1);
    assert.ok(events.some((item) => item.type === 'rescue'));
    assert.ok(!state.parts.includes(site.partId));
    startDive(state, site.id);
    assert.equal(state.mode, 'diving');
    swimTo(state, site.target); interact(state);
    state.oxygen = 0.01;
    step(state, 0.1);
    assert.ok(state.parts.includes(site.partId));
    assert.equal(state.boat.hull, 100);
  }
});

test('dive region is bounded, bubbles refill oxygen and surface never soft-locks', () => {
  const state = createState();
  depart(state); moor(state, 'coral'); startDive(state, 'coral-dive');
  const site = DIVE_SITES[0];
  Object.assign(state.diver, site.bubbles[0]); state.oxygen = 20;
  step(state, 1);
  assert.ok(state.oxygen > 20);
  step(state, 20, { diveX: 1 });
  assert.ok(distance(state.diver, site.entry) <= site.radius + 1e-9);
  surface(state);
  assert.equal(state.mode, 'island');
});

test('all three main parts, lighthouse repair, return celebration and free replay form a complete story', () => {
  const state = createState();
  depart(state);
  for (const site of DIVE_SITES) {
    moor(state, site.islandId); interact(state); startDive(state, site.id);
    swimTo(state, site.target); interact(state); surface(state); depart(state);
  }
  assert.equal(state.parts.length, 3);
  moor(state, 'lighthouse');
  assert.ok(interact(state).some((item) => item.type === 'lighthouse'));
  assert.equal(state.storyComplete, false);
  depart(state);
  assert.ok(moor(state, 'harbor').some((item) => item.type === 'ending'));
  assert.equal(state.storyComplete, true);
  assert.equal(state.mode, 'result');
  const before = state.credits;
  dock(state); assert.equal(state.credits, before);
  depart(state, 'gull-watch', 'swift');
  assert.equal(state.mode, 'sailing');
  assert.equal(state.storyComplete, true);
});

test('save recovery is safe, versioned, idempotent and never advances offline resources', () => {
  for (const mode of ['harbor', 'island', 'sailing', 'diving']) {
    let state = createState(9);
    depart(state); moor(state, 'coral'); interact(state);
    state.mode = mode;
    state.time = 172.25; state.parts = ['prism']; state.completed = ['gull-watch']; state.credits = 37;
    state.boat.hull = 1;
    state.boat.x = 86; state.boat.z = 115;
    for (let i = 0; i < 5; i += 1) {
      const result = restore(serialize(state));
      state = result.state;
      assert.equal(state.time, 172.25);
      assert.equal(state.boat.hull, 100);
      assert.equal(state.credits, 37);
      assert.deepEqual(state.parts, ['prism']);
      assert.deepEqual(state.completed, ['gull-watch']);
      assert.equal(state.currentIsland, 'coral');
      assert.ok(distance(state.boat, islandById('coral').dock) < 0.01);
      assert.ok(!['sailing', 'diving'].includes(state.mode));
    }
  }
});

test('interrupted cargo is halved once: rereading the same snapshot and five safe re-saves never compound loss', () => {
  for (const mode of ['sailing', 'diving']) {
    const original = createState();
    depart(original); moor(original, 'coral');
    original.mode = mode;
    original.cargo = ['tern', 'turtle', 'fan-coral', 'mangrove-root', 'glass-coral'];
    original.parts = ['prism']; original.credits = 123;
    const snapshot = serialize(original);
    const expectedCargo = ['mangrove-root', 'glass-coral'];
    for (let i = 0; i < 5; i += 1) assert.deepEqual(restore(snapshot).state.cargo, expectedCargo);
    let restored = restore(snapshot).state;
    for (let i = 0; i < 5; i += 1) {
      assert.equal(restored.mode, 'island');
      assert.deepEqual(restored.cargo, expectedCargo);
      assert.deepEqual(restored.parts, ['prism']);
      assert.equal(restored.credits, 123);
      restored = restore(serialize(restored)).state;
    }
    assert.deepEqual(original.cargo, ['tern', 'turtle', 'fan-coral', 'mangrove-root', 'glass-coral']);
  }
});

test('delivery describes marks as collectible only and every rig is available with zero marks', () => {
  assert.match(CREDITS_DESCRIPTION, /沒有購買用途/);
  for (const rig of RIGS) {
    const state = createState();
    depart(state, 'coral-survey', rig.id);
    assert.equal(state.rigId, rig.id);
    assert.equal(state.credits, 0);
  }
  const state = createState();
  depart(state, 'gull-watch'); moor(state, 'gull'); interact(state); depart(state);
  const events = moor(state, 'harbor');
  assert.match(events.find((entry) => entry.type === 'delivery').text, /沒有購買用途/);
  assert.equal(state.result.creditsDescription, CREDITS_DESCRIPTION);
});

test('malformed, foreign schema and nonfinite saves reset safely; IDs are sanitized', () => {
  for (const raw of ['{broken', '[]', 'null', '{"schemaVersion":99}', { schemaVersion: 1, time: Infinity, seed: 1 }, { schemaVersion: 1, time: -1, seed: 1 }]) {
    const result = restore(raw);
    assert.equal(result.state.mode, 'harbor');
    assert.equal(result.state.discoveries.length, 0);
    assert.ok(result.message.length > 0);
  }
  const original = createState();
  original.discoveries = ['tern', 'tern', 'fake'];
  original.parts = ['prism', 'fake'];
  original.lastSafeIsland = 'fake';
  original.storyComplete = true;
  const restored = restore(original).state;
  assert.deepEqual(restored.discoveries, ['tern']);
  assert.deepEqual(restored.parts, ['prism']);
  assert.equal(restored.storyComplete, false);
  assert.equal(restored.currentIsland, 'harbor');
});

test('waiting advances exactly to the next tide only at home; dt=0 freezes every resource', () => {
  const state = createState();
  state.time = 53;
  const prior = serialize(state);
  step(state, 0, { turn: 1, sailDelta: 1 });
  assert.equal(serialize(state), prior);
  advanceTide(state);
  assert.ok(Math.abs(state.time - 60.001) < 1e-9);
  assert.equal(tideAt(state.time).label, '退潮・高水位');
  depart(state); const t = state.time;
  advanceTide(state);
  assert.equal(state.time, t);
});

test('departure stays furled and seven-metre clearance protects the full vessel hull', () => {
  const state=createState(); depart(state);
  assert.equal(state.boat.sail,0);
  const at={x:state.boat.x,z:state.boat.z}; step(state,2,{});
  assert.ok(distance(at,state.boat)<0.01,'a novice can read the departure hint before accelerating');
  Object.assign(state.boat,{x:0,z:165,heading:Math.PI,sail:1,speed:3});
  step(state,0.05,{});
  assert.ok(distance(state.boat,islandById('harbor'))>=32-1e-8,'11.9m hull clears the terrain boundary');
});

test('four-habitat commission advances six actual observations independently of cargo and delivers once', () => {
  const state = createState();
  depart(state, 'coral-survey', 'swift');
  state.cargo = OBSERVATIONS.slice(0, 5).map((item) => `observation:${item.id}`);
  assert.equal(contractProgress(state).total, 6);
  for (const [index, objective] of CONTRACTS[0].objectives.entries()) {
    assert.equal(nextObjective(state).discoveryId, objective.discoveryId);
    moor(state, objective.islandId);
    if (objective.kind === 'dive') {
      startDive(state, objective.siteId); swimTo(state, DIVE_SITES.find((item) => item.id === objective.siteId).target); interact(state); surface(state);
    } else interact(state);
    assert.equal(contractProgress(state).completedCount, index + 1);
    assert.equal(state.cargo.length, 5, 'full cargo must not block required observations');
    const restored = restore(serialize(state)).state;
    assert.deepEqual(contractProgress(restored), contractProgress(state));
    if (index < 5) assert.equal(contractProgress(state).readyToDeliver, false);
  }
  assert.equal(nextObjective(state).kind, 'return');
  depart(state); const events = moor(state, 'harbor');
  assert.ok(events.some(({ type }) => type === 'delivery'));
  assert.equal(state.credits, CONTRACTS[0].reward + 15);
  const credits = state.credits;
  for (let i = 0; i < 5; i += 1) { dock(state); assert.equal(state.credits, credits); }
  depart(state);
  assert.equal(contractProgress(state).completedCount, 0, 'repeat voyage needs its own observations');
  assert.equal(contractProgress(state).alreadyDelivered, true, 'old completion is permanent');
  assert.equal(nextObjective(state).islandId, 'coral');
  moor(state, 'harbor'); assert.equal(state.credits, credits);
});

test('partial observation, rescue, legacy schema-one migration and permanent delivery remain monotonic', () => {
  const state = createState(); depart(state); moor(state, 'coral'); interact(state);
  depart(state); moor(state, 'harbor');
  assert.ok(!state.completed.includes('coral-survey'), 'one old target is no longer the full new commission');
  const legacy = createState(); legacy.completed = ['coral-survey']; legacy.credits = 30;
  legacy.voyage.harvested = ['fan-coral']; delete legacy.voyage.observed; delete legacy.voyage.skippedObservations;
  const migrated = restore(legacy).state;
  assert.equal(contractProgress(migrated).completedCount, 1);
  assert.equal(contractProgress(migrated).alreadyDelivered, true);
  assert.equal(migrated.credits, 30);
  assert.deepEqual(migrated.voyage.skippedObservations, []);
  rescue(migrated, '規則測試救援');
  assert.equal(contractProgress(migrated).completedCount, 1);
  assert.ok(migrated.completed.includes('coral-survey'));
  assert.equal(restore(serialize(migrated)).state.credits, 30);
});

test('optional observation samples have safe locations, distinct knowledge, range, speed and capacity costs', () => {
  assert.ok(OBSERVATIONS.length >= 10 && OBSERVATIONS.length <= 16);
  assert.equal(new Set(OBSERVATIONS.map((item) => item.id)).size, OBSERVATIONS.length);
  assert.equal(new Set(OBSERVATIONS.map((item) => item.note)).size, OBSERVATIONS.length);
  for (const item of OBSERVATIONS) {
    for (const island of ISLANDS) assert.ok(distance(item, island) > island.radius + 7, `${item.id} collides with ${island.id}`);
    for (const hazard of [...REEFS, ...WHIRLS]) assert.ok(distance(item, hazard) > hazard.radius + 1, `${item.id} overlaps ${hazard.id}`);
  }
  const state = createState(); depart(state, 'coral-survey', 'swift');
  const item = OBSERVATIONS[0]; Object.assign(state.boat, item, { speed: 1.5 });
  assert.equal(nearestObservation(state, 9).id, item.id);
  assert.match(collectObservation(state, item.id)[0].text, /低航速/);
  state.boat.speed = 0;
  state.cargo = ['fan-coral', 'foxfish', 'tern', 'turtle', 'glass-coral'];
  assert.match(collectObservation(state, item.id)[0].text, /貨艙已滿/);
  assert.ok(!state.voyage.harvested.includes(`observation:${item.id}`));
  state.cargo.pop();
  assert.equal(collectObservation(state, item.id)[0].type, 'observation');
  assert.equal(state.cargo.length, 5);
  assert.equal(state.discoveries.length, 0);
  collectObservation(state, item.id); assert.equal(state.cargo.length, 5);
  assert.equal(nearestObservation(state, 1), null);
  const distant = OBSERVATIONS.at(-1);
  assert.equal(collectObservation(state, distant.id)[0].type, 'info');
  assert.equal(skipObservation(state, distant.id)[0].type, 'info');
});

test('skipping is saved but permits later collection; rescue loss, delivery and new-voyage reset are idempotent', () => {
  let state = createState(); depart(state);
  for (const item of OBSERVATIONS.slice(0, 4)) {
    Object.assign(state.boat, item, { speed: 0 });
    assert.equal(skipObservation(state, item.id)[0].type, 'observation-skipped');
    assert.equal(nearestObservation(state, 1), null);
    assert.equal(nearestObservation(state, 1, { includeSkipped: true }).id, item.id);
    assert.equal(interact(state)[0].type, 'observation');
  }
  assert.equal(state.cargo.length, 4);
  state = restore(serialize(state)).state;
  assert.equal(state.cargo.length, 2);
  assert.equal(state.voyage.harvested.length, 4);
  assert.equal(state.voyage.skippedObservations.length, 4);
  for (let i = 0; i < 5; i += 1) state = restore(serialize(state)).state;
  assert.equal(state.cargo.length, 2);
  const before = state.credits;
  moor(state, 'harbor');
  assert.equal(state.credits, before + 6);
  dock(state); assert.equal(state.credits, before + 6);
  depart(state);
  assert.deepEqual(state.voyage.harvested, []);
  assert.deepEqual(state.voyage.skippedObservations, []);
  const item = OBSERVATIONS[0]; Object.assign(state.boat, item);
  assert.equal(collectObservation(state, item.id)[0].type, 'observation');
  const malformed = serialize({ ...state, cargo: ['observation:fake'], voyage: { ...state.voyage, harvested: ['observation:fake'], observed: ['fake'], skippedObservations: ['fake'] } });
  const clean = restore(malformed).state;
  assert.deepEqual(clean.cargo, []); assert.deepEqual(clean.voyage.harvested, []); assert.deepEqual(clean.voyage.observed, []); assert.deepEqual(clean.voyage.skippedObservations, []);
});

test('sailing interaction prioritizes a nearby port over samples', () => {
  const state = createState(); depart(state);
  Object.assign(state.boat, islandById('lighthouse').dock, { speed: 0 });
  assert.ok(nearestObservation(state, 30));
  assert.equal(interact(state)[0].type, 'dock');
  assert.equal(state.cargo.length, 0);
});

test('recommended stable-rig rule navigation completes first voyage in 4–6 minutes and continuous story in 8–12 without waiting', () => {
  // Deterministic pure-rules autopilot, not a browser or human-play timing claim.
  for (const seed of [1, 2, 3, 8, 16]) for (const time of [0, 60, 120, 180]) {
    const result = measureFirst(seed, time, 'safe', true);
    assert.ok(result.seconds >= 240 && result.seconds <= 360, `${seed}/${time}: first ${result.seconds}s`);
    assert.ok(result.story.totalSeconds >= 480 && result.story.totalSeconds <= 720, `${seed}/${time}: story ${result.story.totalSeconds}s`);
    assert.equal(result.damage, 0); assert.equal(result.story.damage, 0);
    assert.equal(result.delivered, true); assert.equal(result.story.completed, true);
    assert.equal(new Set(result.decisions.filter((item) => item.kind === 'optional-sample-or-skip').map((item) => item.id)).size, result.decisions.filter((item) => item.kind === 'optional-sample-or-skip').length, 'repeated buoy sightings must not count as fresh choices');
  }
});

test('SAVE-008 malformed navigation directions cannot access prototypes or erase retained progress', () => {
  const saved = createState(); saved.parts = ['prism', 'gear']; saved.credits = 123;
  saved.voyage.routeChoices = ['__proto__', 'constructor', 'toString', null, {}, [], 'fake'].map((direction) => ({ id: ROUTE_CHOICES[0].id, direction, optionId: 'outer' }));
  saved.voyage.routeChoices.push({ id: ROUTE_CHOICES[0].id, direction: 'south', optionId: 'outer', legIndex: 2, time: 80 });
  const state = restore(serialize(saved)).state;
  assert.deepEqual(state.parts, ['prism', 'gear']); assert.equal(state.credits, 123);
  assert.equal(state.voyage.routeChoices.length, 1);
  assert.equal(state.voyage.routeChoices[0].direction, 'south');
  assert.equal(activeNavigation(state), null);
});

test('incomplete commission copy explains the next-voyage reset and per-contract records exclude partial or rescued trips', () => {
  const state = createState(); depart(state); moor(state, 'coral'); interact(state);
  depart(state); moor(state, 'harbor');
  assert.match(CONTRACTS[0].description, /同一趟/);
  assert.match(state.result.text, /下趟需重新完成調查清單/);
  assert.deepEqual(state.records.byContract, {});
  for (const elapsed of [300, 270, 290]) {
    depart(state); state.voyage.observed = CONTRACTS[0].objectives.map((item) => item.discoveryId);
    state.voyage.elapsed = elapsed; state.voyage.damage = 8; moor(state, 'harbor');
  }
  assert.deepEqual(state.records.byContract['coral-survey'], { bestTime: 270, bestDamage: 8, voyages: 3 });
  assert.match(state.result.text, /本趟完整調查已完成，委託獎勵不重發/);
  depart(state); state.voyage.observed = ['fan-coral', 'foxfish']; moor(state, 'harbor');
  assert.match(state.result.text, /下趟需重新完成調查清單/);
  assert.equal(state.records.byContract['coral-survey'].voyages, 3);
  depart(state); state.voyage.observed = CONTRACTS[0].objectives.map((item) => item.discoveryId);
  state.voyage.elapsed = 1; state.voyage.rescued = true; moor(state, 'harbor');
  assert.equal(state.records.byContract['coral-survey'].bestTime, 270);
  const saved = JSON.parse(serialize(state));
  saved.records.byContract.fake = { bestTime: 0, bestDamage: 0, voyages: 999 };
  saved.records.byContract['gull-watch'] = { bestTime: -1, bestDamage: 0, voyages: 1 };
  assert.deepEqual(restore(saved).state.records.byContract, { 'coral-survey': { bestTime: 270, bestDamage: 8, voyages: 3 } });
  delete saved.records.byContract;
  assert.deepEqual(restore(saved).state.records.byContract, {});
});

test('route choices remain available with a full hold, record a real path, and never steer the boat automatically', () => {
  const state = createState(); depart(state);
  state.cargo = OBSERVATIONS.slice(0, 8).map((item) => `observation:${item.id}`);
  state.voyage.harvested = OBSERVATIONS.map((item) => `observation:${item.id}`);
  Object.assign(state.boat, { x: -53, z: 24, heading: Math.PI });
  const gate = nearestRouteChoice(state);
  assert.ok(gate); assert.equal(gate.options.length, 2); assert.ok(gate.options.every((item) => item.available));
  assert.notDeepEqual(gate.options[0].waypoints, gate.options[1].waypoints);
  const boat = { ...state.boat };
  assert.equal(chooseRoute(state, gate.id, gate.options[0].id)[0].type, 'route-choice');
  assert.deepEqual(state.boat, boat);
  assert.ok(activeNavigation(state)); assert.equal(state.voyage.routeChoices[0].cargoCount, 8);
  assert.equal(nearestRouteChoice(state), null);
  cancelRoute(state); assert.equal(activeNavigation(state), null);
  assert.ok(!nearestRouteChoice(state) || nearestRouteChoice(state).id !== gate.id, 'a cancelled gate cannot immediately reappear this leg');
  assert.equal(state.voyage.routeChoices.length, 1);
  moor(state, 'reef'); const leg = state.voyage.legIndex; depart(state);
  assert.equal(state.voyage.legIndex, leg + 1);
  Object.assign(state.boat, boat); assert.equal(nearestRouteChoice(state).id, gate.id);
});

test('new geographical gates can replace an older guide after eighteen seconds; safe-port recovery clears active guidance', () => {
  const state = createState(); depart(state);
  Object.assign(state.boat, { x: -53, z: 24, heading: Math.PI });
  const gate = nearestRouteChoice(state); chooseRoute(state, gate.id, 'inner');
  Object.assign(state.boat, { x: -35, z: 65 }); state.time += 17;
  assert.equal(nearestRouteChoice(state), null);
  state.time += 1;
  const next = nearestRouteChoice(state); assert.ok(next && next.id !== gate.id);
  chooseRoute(state, next.id, 'outer'); assert.equal(state.voyage.routeChoices.length, 2);
  assert.equal(activeNavigation(state).choiceId, next.id);
  const restored = restore(serialize(state)).state;
  assert.equal(activeNavigation(restored), null); assert.equal(restored.voyage.routeChoices.length, 2);
  rescue(state); assert.equal(activeNavigation(state), null);
});

test('navigation condition reflects reversed currents on a new leg, including cargo changes', () => {
  const state = createState(); depart(state);
  Object.assign(state.boat, { x: -63, z: -35, heading: Math.PI }); state.time = 60;
  const first = nearestRouteChoice(state); assert.ok(first.options.some((item) => item.alongCurrent < -0.1));
  chooseRoute(state, first.id, 'inner');
  moor(state, 'mangrove'); depart(state); state.time = 180; state.cargo = ['fan-coral'];
  Object.assign(state.boat, { x: -63, z: -35, heading: Math.PI });
  const second = nearestRouteChoice(state); assert.equal(second.id, first.id);
  assert.ok(second.options.some((item) => item.alongCurrent > 0.1));
  chooseRoute(state, second.id, 'inner');
  assert.notEqual(state.voyage.routeChoices[0].tideHeight, state.voyage.routeChoices[1].tideHeight);
  assert.notEqual(state.voyage.routeChoices[0].cargoCount, state.voyage.routeChoices[1].cargoCount);
});

test('all six full-hold returns offer two actual local routes within thirty seconds on every rig', () => {
  // Controlled island fixtures deliberately remove every optional-sample decision.
  // Both branch choices are physically steered; this is rules-model evidence only.
  for (const contract of CONTRACTS) for (const rig of RIGS) for (const seed of [1, 2, 3]) for (const time of [0, 60, 120, 180]) for (const option of ['outer', 'inner']) {
    const result = simulateReturn(contract, seed, time, option, rig.id);
    assert.equal(result.damage, 0, `${contract.id}/${rig.id}/${seed}/${time}/${option}`);
    assert.ok(result.maxDecisionGap <= 30, `${contract.id}/${rig.id}/${seed}/${time}/${option}: ${result.maxDecisionGap}`);
    assert.ok(result.choices.length > 0);
    assert.equal(result.events.at(-1).kind, 'dock-complete');
    assert.equal(new Set(result.choices.map((item) => item.id)).size, result.choices.length, 'each geographical decision counts only once');
    assert.ok(!result.choices.some((item) => item.id === 'harbor-final'), 'duplicating the same approach decision must not reset cadence');
  }
});

test('every advertised local branch is physically navigable at four tidal phases on every rig', () => {
  for (const gate of ROUTE_CHOICES) for (const direction of Object.keys(gate.directions)) for (let entryIndex = 0; entryIndex <= (gate.directions[direction].entries?.length || 0); entryIndex++) for (const option of gate.directions[direction].options) for (const rig of RIGS) for (const seed of [1, 2, 3]) for (const time of [0, 60, 120, 180]) {
    const result = simulateBranch(gate, direction, option.id, seed, time, rig.id, entryIndex);
    assert.equal(result.damage, 0, `${gate.id}/${direction}/${option.id}/${seed}/${time}`);
    // This isolates a branch to prove physical safety. In live navigation the next
    // distinct gate may replace its guide after 18s; the return test checks cadence.
    assert.ok(result.completed && result.seconds < 100);
  }
});

test('four-direction entrances expose the real east/west crossing, retain north/south axes, and save without prototype lookup', () => {
  assert.deepEqual(Object.keys(ROUTE_DIRECTIONS).sort(), ['east', 'north', 'south', 'west']);
  const fixtures = [
    { id: 'glass-white-crossing', direction: 'east', x: 52, z: 35, heading: Math.PI / 2 },
    { id: 'glass-white-crossing', direction: 'west', x: 55, z: 35, heading: -Math.PI / 2 },
    { id: 'glass-west-current', direction: 'north', x: -53, z: 60, heading: 0 },
    { id: 'glass-west-current', direction: 'south', x: -53, z: 0, heading: Math.PI },
  ];
  for (const fixture of fixtures) {
    const state = startLeg({ fromIslandId: 'harbor' });
    state.voyage.routeChoices = ROUTE_CHOICES.filter((item) => item.id !== fixture.id).map((item) => ({ id: item.id, legIndex: state.voyage.legIndex }));
    Object.assign(state.boat, fixture);
    const gate = nearestRouteChoice(state);
    assert.equal(gate?.id, fixture.id); assert.equal(gate.direction, fixture.direction);
    assert.deepEqual(gate.axis, ROUTE_DIRECTIONS[fixture.direction]);
    const before = { ...state.boat }; chooseRoute(state, gate.id, 'outer');
    assert.deepEqual(state.boat, before, 'selection only records manual guidance');
    state.parts = ['prism']; state.credits = 93;
    const saved = JSON.parse(serialize(state));
    saved.voyage.routeChoices = [saved.voyage.routeChoices.at(-1), ...['__proto__', 'constructor', 'toString', 'up', null, {}, []].map((direction) => ({ id: fixture.id, direction, optionId: 'outer' })), { id: '__proto__', direction: 'east', optionId: 'outer' }, { id: fixture.id, direction: fixture.direction, optionId: '__proto__' }];
    const recovered = restore(saved).state;
    assert.equal(recovered.voyage.routeChoices.length, 1);
    assert.equal(recovered.voyage.routeChoices[0].direction, fixture.direction);
    assert.equal(recovered.credits, 93); assert.deepEqual(recovered.parts, ['prism']);
    assert.equal(activeNavigation(recovered), null);
    state.boat.heading += Math.PI;
    state.voyage.routeChoices = []; state.voyage.navigation = null;
    assert.notEqual(nearestRouteChoice(state)?.direction, fixture.direction);
  }
});

test('direction metadata uses finite geometry, safe fallbacks and a distance bound rather than a task filter', () => {
  const gate = ROUTE_CHOICES.find((item) => item.id === 'glass-white-crossing');
  const original = structuredClone(gate.directions.east);
  const state = startLeg({ fromIslandId: 'harbor', contractId: 'keepers-journal' });
  state.voyage.routeChoices = ROUTE_CHOICES.filter((item) => item.id !== gate.id).map((item) => ({ id: item.id, legIndex: state.voyage.legIndex }));
  Object.assign(state.boat, { x: 45, z: 35, heading: Math.PI / 2 });
  try {
    for (const malformed of [null, [], 'bad', { x: '64', z: 35, radius: 17 }, { x: 64, z: 35, radius: -1 }, { x: Infinity, z: 35, radius: 17 }]) {
      gate.directions.east.entry = malformed;
      assert.equal(nearestRouteChoice(state)?.id, gate.id, 'invalid custom entry falls back to the authored gate circle');
    }
    gate.directions.east.entry = { x: 64, z: 35, radius: 20, lateralRadius: -1, maxDestinationDistance: 5 };
    assert.equal(nearestRouteChoice(state), null, 'known destination distance limit is enforced');
    gate.directions.east.destinationIslandId = 'not-an-island';
    assert.equal(nearestRouteChoice(state)?.id, gate.id, 'unknown destination ignores the optional bound safely');
    gate.directions.east.destinationIslandId = 'gull';
    gate.directions.east.entry.maxDestinationDistance = NaN;
    assert.equal(nearestRouteChoice(state)?.id, gate.id, 'nonfinite bound is ignored; another contract does not hide this free-exploration gate');
    gate.directions.east.entries = [null, { x: 0, z: 0, radius: 0 }, { x: 50, z: 35, radius: 12, options: 'invalid' }];
    const fallback = nearestRouteChoice(state);
    assert.equal(fallback.options.length, 2);
    gate.directions.east.options = [{ id: 'outer', waypoints: [{ x: NaN, z: 0 }] }];
    assert.equal(nearestRouteChoice(state), null, 'invalid option metadata never reaches geometry or UI code');
  } finally { gate.directions.east = original; }
});

test('multiple entrances preserve one geographical decision and stable restorable option identities', () => {
  for (const gate of ROUTE_CHOICES) for (const data of Object.values(gate.directions)) for (const entry of data.entries || []) {
    assert.deepEqual((entry.options || data.options).map((option) => option.id).sort(), data.options.map((option) => option.id).sort());
  }
  const state = startLeg({ fromIslandId: 'harbor' });
  Object.assign(state.boat, { x: 0, z: 138, heading: 0 });
  const gate = nearestRouteChoice(state);
  assert.equal(gate.id, 'shoal-margin'); assert.equal(gate.entryIndex, 1);
  assert.notDeepEqual(gate.options[0].waypoints, gate.options[1].waypoints);
  chooseRoute(state, gate.id, 'inner'); cancelRoute(state);
  Object.assign(state.boat, { x: -35, z: 125, heading: 0 });
  assert.notEqual(nearestRouteChoice(state)?.id, gate.id, 'another entrance cannot reset the same gate clock');
  assert.equal(restore(serialize(state)).state.voyage.routeChoices.filter((item) => item.id === gate.id).length, 1);
});

test('reef-to-white and reverse crossings with exhausted optional samples finish both routes with real braking and no damage', () => {
  for (const leg of crossingLegs) for (const rig of RIGS) for (const seed of [1, 2, 3]) for (const time of [0, 60, 120, 180]) for (const option of ['outer', 'inner']) {
    const result = simulateCompleteLeg(leg, seed, time, option, rig.id);
    assert.equal(result.damage, 0);
    assert.equal(result.arrivalHull, 100);
    assert.ok(result.arrivalSpeed <= 0.5 && result.arrivalDistance < 13);
    assert.ok(result.maxDecisionGapRaw < 29, `${leg.direction}/${rig.id}/${seed}/${time}/${option}: ${result.maxDecisionGapRaw}`);
    assert.ok(result.choices.some((choice) => choice.id === 'glass-white-crossing' && choice.direction === leg.direction));
    assert.equal(result.events.at(-1).kind, 'dock-complete');
    assert.ok(result.events.every((item) => ['route-choice', 'dock-complete'].includes(item.kind)));
  }
});
