import test from 'node:test';
import assert from 'node:assert/strict';
import { makeBox, firstHit, moveCircle } from '../../../public/games/dust-redemption/physics.js';
import {
  enemyWeaponRange,
  createEnemyTacticsState,
  updateEnemyTactics,
  certifyTacticalPath,
  tacticalSegmentClear,
  tacticalGeometryKey,
  planTacticalPath,
} from '../../../games/dust-redemption/enemy-tactics.js';

// Pure CPU contracts against the real collision/ray helpers. These fixtures do
// not exercise browser input, animation, the combat loop, or gameplay pacing.
const EPS = 1e-6;
const gap = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const point = (x, z) => ({ x, z });
const freeze = value => {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
};
const overlap = (p, box, radius = 0.38) =>
  p.x + radius > box.min.x + EPS && p.x - radius < box.max.x - EPS &&
  p.z + radius > box.min.z + EPS && p.z - radius < box.max.z - EPS;
function fixture(overrides = {}, planner) {
  const view = {
    id: 'guard-a', type: 'guard', position: point(0, 0), threat: point(35, 0),
    underFire: true, suppressed: 0, rounds: 18, enabled: true, now: 0,
    colliders: [], radius: 0.38, bounds: 23, ...overrides,
  };
  const calls = { plan: 0, move: 0, trace: [] };
  const adapters = {
    trace(a, b) {
      calls.trace.push({ a: { ...a }, b: { ...b } });
      return firstHit(a, b, view.colliders);
    },
    moveCircle(...args) { calls.move++; return moveCircle(...args); },
  };
  if (planner) adapters.planPath = options => { calls.plan++; return planner(options); };
  return { view, adapters, calls };
}
const straightPlanner = ({ from, to }) => [{ ...from }, { ...to }];
function certify(path, options = {}, mover = moveCircle) {
  return certifyTacticalPath(path, {
    from: point(-4, 0), to: point(4, 0), colliders: [],
    radius: 0.38, bounds: 23, maxDistance: 24, ...options,
  }, mover);
}
function assertSafeMovement(movement, view) {
  assert.ok(movement, 'a certified movement is required');
  assert.ok(movement.proof, 'movement exposes its reachability proof');
  assert.ok(Number.isFinite(movement.distance));
  assert.ok(movement.path.length > 0);
  for (const p of [movement.goal, movement.waypoint, ...movement.path]) {
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.z));
    assert.ok(Math.abs(p.x) <= view.bounds && Math.abs(p.z) <= view.bounds);
    assert.equal(view.colliders.some(box => overlap(p, box, view.radius)), false);
  }
  assert.equal(certifyTacticalPath(movement.path, {
    from: view.position, to: movement.goal, colliders: view.colliders,
    radius: view.radius, bounds: view.bounds, maxDistance: 24,
  }, moveCircle).ok, true);
}

test('weapon ranges cover only the four authored enemy types', () => {
  assert.equal(enemyWeaponRange('guard'), 30);
  assert.equal(enemyWeaponRange('flanker'), 30);
  assert.equal(enemyWeaponRange('shotgun'), 10);
  assert.equal(enemyWeaponRange('sniper'), 44);
  for (const type of ['unknown', 'constructor', '__proto__', '', null, undefined])
    assert.throws(() => enemyWeaponRange(type));
});

test('certification validates a clear path with bounded real movement and preserves frozen inputs', () => {
  const path = freeze([point(-4, 0), point(4, 0)]), before = JSON.stringify(path);
  let moves = 0;
  const result = certify(path, {}, (p, dx, dz, ...rest) => {
    moves++;
    assert.ok(Math.hypot(dx, dz) <= 0.100001, 'movement proof uses small substeps');
    return moveCircle(p, dx, dz, ...rest);
  });
  assert.equal(result.ok, true);
  assert.ok(Math.abs(result.distance - 8) < EPS);
  assert.ok(moves >= 80);
  assert.equal(JSON.stringify(path), before);
});

test('a complete detour around an inflated solid is certified while its direct chord is rejected', () => {
  const colliders = [makeBox('wall', 0, 0, 2, 2, 4)];
  const path = [point(-4, 0), point(-4, -2.6), point(4, -2.6), point(4, 0)];
  const result = certify(path, { colliders });
  assert.equal(result.ok, true);
  assert.ok(Math.abs(result.distance - 13.2) < EPS);
  assert.equal(certify([point(-4, 0), point(4, 0)], { colliders }).ok, false);
});

test('a thin wall blocks a whole segment even if a permissive movement adapter accepts the endpoint', () => {
  const colliders = [makeBox('thin-wall', 0, 0, 0.01, 2, 4)];
  const endpointOnly = (p, dx, dz) => point(p.x + dx, p.z + dz);
  assert.equal(certify([point(-4, 0), point(4, 0)], { colliders }, endpointOnly).ok, false);
});

test('a 0.60m gap cannot admit a 0.38m-radius enemy', () => {
  const colliders = [
    makeBox('upper', 0, 2.3, 2, 2, 4),
    makeBox('lower', 0, -2.3, 2, 2, 4),
  ];
  assert.equal(certify([point(-4, 0), point(4, 0)], { colliders }).ok, false);
});

test('certification rejects inside-solid endpoints and any waypoint outside the world bounds', () => {
  const colliders = [makeBox('occupied-goal', 4, 0, 1, 2, 1)];
  assert.equal(certify([point(-4, 0), point(4, 0)], { colliders }).ok, false);
  assert.equal(certify([point(-4, 0), point(24, 0), point(4, 0)]).ok, false);
  assert.equal(certify([point(-24, 0), point(4, 0)], { from: point(-24, 0) }).ok, false);
  assert.equal(certify([point(-4, 0), point(24, 0)], { to: point(24, 0) }).ok, false);
});

test('the travel budget applies to the full detour rather than the start-to-goal chord', () => {
  const path = [point(-4, 0), point(-4, -2.6), point(4, -2.6), point(4, 0)];
  const result = certify(path, { maxDistance: 9 });
  assert.equal(result.ok, false);
});

test('an attacked guard at 35m starts a certified 29m standoff approach and announces it', () => {
  const f = fixture(), result = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters);
  assert.equal(result.movement?.kind, 'approach');
  assertSafeMovement(result.movement, f.view);
  assert.ok(Math.abs(gap(result.movement.goal, f.view.threat) - 29) < EPS);
  assert.ok(Math.abs(result.movement.goal.x - 6) < EPS);
  assert.equal(typeof result.announcement?.id, 'string');
  assert.equal(typeof result.announcement?.text, 'string');
  assert.ok(result.announcement.text.length > 0);
});

test('standing cover requires a real 1.35m blocking ray: low crates fail and tall crates qualify', () => {
  for (const height of [1.05, 1.8]) {
    const f = fixture({ type: 'sniper', colliders: [makeBox('cover', 4, 0, 2, height, 2)] });
    const result = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters);
    if (height < 1.35) assert.equal(result.movement, null);
    else {
      assert.equal(result.movement?.kind, 'cover');
      assertSafeMovement(result.movement, f.view);
      assert.ok(gap(f.view.position, result.movement.goal) <= 10 + EPS);
      assert.equal(firstHit(
        { ...f.view.threat, y: 1.35 }, { ...result.movement.goal, y: 1.35 }, f.view.colliders,
      )?.box.id, 'cover');
      assert.ok(f.calls.trace.some(row => row.a.y === 1.35 && row.b.y === 1.35));
    }
  }
});

test('cover candidates work from all four threat directions instead of always choosing one box face', () => {
  for (const [sx, sz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const f = fixture({
      type: 'sniper', position: point(-4 * sx, -4 * sz), threat: point(20 * sx, 20 * sz),
      colliders: [makeBox('central-cover', 0, 0, 2, 1.8, 2)],
    });
    const result = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters);
    assert.equal(result.movement?.kind, 'cover');
    assertSafeMovement(result.movement, f.view);
    assert.ok(result.movement.goal.x * sx + result.movement.goal.z * sz < 0, 'candidate lies on the protected face');
  }
});

test('suppression cancels firing but still permits certified movement to cover for every enemy type', () => {
  for (const type of ['guard', 'flanker', 'shotgun', 'sniper']) {
    const f = fixture({ type, underFire: false, suppressed: 1.7, colliders: [makeBox('cover', 4, 0, 2, 1.8, 2)] });
    const result = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters);
    assert.equal(result.suppressFire, true);
    assert.equal(result.movement?.kind, 'cover');
    assertSafeMovement(result.movement, f.view);
  }
});

test('other enemy types do not invent pursuit and inactive, unprovoked, or empty-ammo guards do not start it', () => {
  for (const override of [
    { type: 'flanker' }, { type: 'shotgun' }, { type: 'sniper' },
    { enabled: false }, { rounds: 0 }, { underFire: false },
  ]) {
    const f = fixture(override), result = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters);
    assert.equal(result.movement, null);
    assert.equal(result.announcement, null);
  }
});

test('unreachable planner results and an obstructed direct fallback never become movement', () => {
  const rejected = fixture({ colliders: [makeBox('cover', 4, 0, 2, 1.8, 2)] }, () => null);
  assert.equal(updateEnemyTactics(createEnemyTacticsState(rejected.view.id), rejected.view, rejected.adapters).movement, null);
  assert.ok(rejected.calls.plan > 0);
  const direct = fixture({ colliders: [makeBox('low-wall', 3, 0, 0.1, 1.05, 12)] });
  assert.equal(updateEnemyTactics(createEnemyTacticsState(direct.view.id), direct.view, direct.adapters).movement, null);
});

test('an effective cached plan is reused without asking the planner again every frame', () => {
  const f = fixture({ colliders: [makeBox('cover', 4, 0, 2, 1.8, 2)] }, straightPlanner);
  const first = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters), count = f.calls.plan, moves = f.calls.move;
  assert.ok(first.movement && count > 0);
  const second = updateEnemyTactics(first.state, { ...f.view, now: 0.1, threat: point(35, 0.5) }, f.adapters);
  assert.ok(second.movement);
  assert.equal(f.calls.plan, count);
  assert.equal(f.calls.move, moves, 'unchanged route does not repeat every .1m certification step each frame');
  assert.equal(second.announcement, null);
});

test('cheap segment checks reject thin solids and changed geometry keys include mutable bounds', () => {
  const collider = makeBox('thin', 0, 0, 0.01, 2, 4);
  const options = { from: point(-4, 0), to: point(4, 0), colliders: [collider] };
  const before = tacticalGeometryKey(options.colliders);
  assert.equal(tacticalSegmentClear(options), false);
  Object.assign(collider, makeBox('thin', 0, 10, 0.01, 2, 4));
  assert.notEqual(tacticalGeometryKey(options.colliders), before);
  assert.equal(tacticalSegmentClear(options), true);
  assert.equal(tacticalSegmentClear({ ...options, to: point(23.01, 0) }), false);
  assert.notEqual(tacticalGeometryKey(options.colliders, 0.3), tacticalGeometryKey(options.colliders, 0.38));
});

test('in-place collider geometry mutation invalidates a cached route despite stable array and object identity', () => {
  const box = makeBox('cover', 4, 0, 2, 1.8, 2), f = fixture({ colliders: [box] }, straightPlanner);
  const first = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters), count = f.calls.plan;
  assert.ok(first.movement);
  Object.assign(box, makeBox('cover', 5, 0, 2, 1.8, 2));
  const second = updateEnemyTactics(first.state, { ...f.view, now: 0.1 }, f.adapters);
  assert.ok(f.calls.plan > count);
  assertSafeMovement(second.movement, f.view);
  assert.equal(second.announcement, null);
});

test('failed searches cache for one second but changed geometry invalidates the failure immediately', () => {
  const box = makeBox('cover', 4, 0, 2, 1.8, 2), f = fixture({ colliders: [box] }, () => null);
  let result = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters), count = f.calls.plan;
  assert.ok(count > 0); assert.equal(result.movement, null);
  result = updateEnemyTactics(result.state, { ...f.view, now: 0.5 }, f.adapters);
  assert.equal(f.calls.plan, count);
  result = updateEnemyTactics(result.state, { ...f.view, now: 1.01 }, f.adapters);
  assert.ok(f.calls.plan > count); count = f.calls.plan;
  Object.assign(box, makeBox('cover', 5, 0, 2, 1.8, 2));
  result = updateEnemyTactics(result.state, { ...f.view, now: 1.1 }, f.adapters);
  assert.ok(f.calls.plan > count); assert.equal(result.movement, null);
});

test('large threat drift invalidates a plan and substantial actor displacement invalidates a cached failure', () => {
  const f = fixture({ colliders: [makeBox('cover', 4, 0, 2, 1.8, 2)] }, straightPlanner);
  let result = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters), count = f.calls.plan;
  result = updateEnemyTactics(result.state, { ...f.view, now: 0.1, threat: point(35, 3) }, f.adapters);
  assert.ok(f.calls.plan > count);
  assert.equal(result.announcement, null);
  const failed = fixture({ colliders: [makeBox('cover', 4, 0, 2, 1.8, 2)] }, () => null);
  const failure = updateEnemyTactics(createEnemyTacticsState(failed.view.id), failed.view, failed.adapters);
  const failedCount = failed.calls.plan;
  assert.ok(failedCount > 0);
  updateEnemyTactics(failure.state, { ...failed.view, now: 0.1, position: point(-3, 0) }, failed.adapters);
  assert.ok(failed.calls.plan > failedCount);
});

test('pursuit accounts for actual accumulated travel, stays within 16m, and announces only its first movement', () => {
  const f = fixture();
  let state = createEnemyTacticsState(f.view.id), position = point(0, 0), travelled = 0, announcements = 0, stopped = false;
  for (let i = 0; i < 10; i++) {
    const direction = i % 2 === 0 ? 1 : -1;
    const view = { ...f.view, position: { ...position }, threat: point(position.x + direction * 35, position.z), now: i * 1.1 };
    const result = updateEnemyTactics(state, view, f.adapters); state = result.state;
    if (result.announcement) announcements++;
    if (!result.movement) { stopped = true; break; }
    assert.equal(result.movement.kind, 'approach');
    assertSafeMovement(result.movement, view);
    travelled += gap(position, result.movement.goal);
    position = { ...result.movement.goal };
    assert.ok(travelled <= 16 + EPS, `actual travelled distance ${travelled} exceeds the reaction budget`);
    assert.ok(gap(point(0, 0), position) <= 16 + EPS);
  }
  assert.equal(stopped, true, 'a moving threat cannot renew the pursuit budget forever');
  assert.ok(travelled > 0);
  assert.equal(announcements, 1);
});

test('approach stops at 29m standoff and does not chase a threat beyond 46m', () => {
  for (const distance of [29, 46.01]) {
    const f = fixture({ threat: point(distance, 0) });
    const result = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters);
    assert.equal(result.movement, null); assert.equal(result.announcement, null);
  }
  const f = fixture();
  const first = updateEnemyTactics(createEnemyTacticsState(f.view.id), f.view, f.adapters);
  const second = updateEnemyTactics(first.state, { ...f.view, now: 0.1, position: { ...first.movement.goal } }, f.adapters);
  assert.equal(second.movement, null); assert.equal(second.announcement, null);
});

test('updates accept deeply frozen inputs and return independent state without mutating prior results', () => {
  const f = fixture({ colliders: [makeBox('cover', 4, 0, 2, 1.8, 2)] }, straightPlanner);
  const state = freeze(createEnemyTacticsState(f.view.id)), view = freeze(f.view);
  const beforeState = JSON.stringify(state), beforeView = JSON.stringify(view);
  const first = updateEnemyTactics(state, view, f.adapters);
  assert.equal(JSON.stringify(state), beforeState); assert.equal(JSON.stringify(view), beforeView);
  assert.notEqual(first.state, state);
  assertSafeMovement(first.movement, view);
  const frozenResult = freeze(first), previous = JSON.stringify(frozenResult);
  const second = updateEnemyTactics(frozenResult.state, freeze({ ...view, now: 0.1 }), f.adapters);
  assert.equal(JSON.stringify(frozenResult), previous);
  assert.notEqual(second.state, frozenResult.state);
  assert.equal(second.announcement, null);
});

test('the real planner produces a complete certified route around a blocking box', () => {
  const options = freeze({
    from: point(-4, 0), to: point(4, 0),
    colliders: [makeBox('blocking-box', 0, 0, 2, 2, 4)],
    radius: 0.38, bounds: 23, maxDistance: 24,
  });
  const before = JSON.stringify(options), path = planTacticalPath(options);
  assert.ok(Array.isArray(path) && path.length > 2, 'the blocked chord requires intermediate waypoints');
  const proof = certifyTacticalPath(path, options, moveCircle);
  assert.equal(proof.ok, true);
  assert.ok(proof.distance > gap(options.from, options.to));
  assert.equal(JSON.stringify(options), before);
});

test('the real planner rounds an L-shaped obstacle without cutting its inflated inside corner', () => {
  const options = {
    from: point(-3, -2), to: point(3, -2),
    colliders: [
      makeBox('vertical-leg', 0, 0, 1, 2, 6),
      makeBox('horizontal-leg', 2, -3, 4, 2, 1),
    ],
    radius: 0.38, bounds: 23, maxDistance: 24,
  };
  assert.equal(certifyTacticalPath([options.from, options.to], options, moveCircle).ok, false);
  const path = planTacticalPath(options);
  assert.ok(Array.isArray(path) && path.length > 2);
  const proof = certifyTacticalPath(path, options, moveCircle);
  assert.equal(proof.ok, true);
  assert.ok(proof.distance <= options.maxDistance);
  for (const p of path) assert.equal(options.colliders.some(box => overlap(p, box)), false);
});

test('the real planner returns null for a sealed courtyard and never pushes an invalid goal outside its collider', () => {
  const options = {
    from: point(5, 0), to: point(0, 0),
    colliders: [
      makeBox('east', 2, 0, 0.3, 2, 4.3),
      makeBox('west', -2, 0, 0.3, 2, 4.3),
      makeBox('north', 0, -2, 4.3, 2, 0.3),
      makeBox('south', 0, 2, 4.3, 2, 0.3),
    ],
    radius: 0.38, bounds: 23, maxDistance: 24,
  };
  assert.equal(planTacticalPath(options), null);
  assert.equal(planTacticalPath({ ...options, to: point(2, 0) }), null);
  assert.equal(planTacticalPath({ ...options, to: point(24, 0) }), null);
  assert.equal(planTacticalPath({ ...options, from: point(2, 0), to: point(5, 0) }), null);
});
