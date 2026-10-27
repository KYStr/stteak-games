// CPU-only, metre-space tactical decisions. The host owns actors, animation,
// telegraphs and the existing weapon windup; no state here changes those rules.
const EPS = 1e-6;
const HEIGHT = 1.35;
const MAX_APPROACH = 16;
const MAX_PATH = 24;
const RANGE = Object.freeze({ guard: 30, flanker: 30, shotgun: 10, sniper: 44 });
const point = (p) => ({ x: p.x, z: p.z });
const finitePoint = (p) => p && Number.isFinite(p.x) && Number.isFinite(p.z);
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const copy = (value) => JSON.parse(JSON.stringify(value));

export function enemyWeaponRange(type) {
  if (!Object.hasOwn(RANGE, type)) throw new TypeError(`Unknown enemy type: ${type}`);
  return RANGE[type];
}

export function createEnemyTacticsState(id) {
  if (typeof id !== "string" || !id) throw new TypeError("Enemy id is required");
  return {
    version: 1, actorId: id, announced: false, cache: null,
    lastPosition: null, lastMovement: null, approachOrigin: null,
    approachTravel: 0, approachStopped: false,
  };
}

function boxesCopy(boxes) {
  if (!Array.isArray(boxes)) throw new TypeError("colliders must be an array");
  return boxes.map((b) => {
    if (!b || !b.min || !b.max || !["x", "y", "z"].every((k) =>
      Number.isFinite(b.min[k]) && Number.isFinite(b.max[k]) && b.min[k] <= b.max[k]))
      throw new TypeError("Invalid collider bounds");
    return {
      id: b.id ?? null, kind: b.kind ?? null,
      x: (b.min.x + b.max.x) / 2, z: (b.min.z + b.max.z) / 2,
      w: b.max.x - b.min.x, h: b.max.y - b.min.y, d: b.max.z - b.min.z,
      min: { ...b.min }, max: { ...b.max },
    };
  });
}

function pointClear(p, boxes, radius, bounds) {
  return finitePoint(p) && Math.abs(p.x) <= bounds && Math.abs(p.z) <= bounds &&
    !boxes.some((b) => p.x > b.min.x - radius + EPS && p.x < b.max.x + radius - EPS &&
      p.z > b.min.z - radius + EPS && p.z < b.max.z + radius - EPS);
}

// Test the whole segment, not just sampled endpoints (thin walls still count).
function segmentClear(a, b, boxes, radius) {
  for (const box of boxes) {
    let lo = 0, hi = 1, intersects = true;
    for (const k of ["x", "z"]) {
      const min = box.min[k] - radius + EPS, max = box.max[k] + radius - EPS;
      const delta = b[k] - a[k];
      if (Math.abs(delta) < EPS) {
        if (a[k] <= min || a[k] >= max) { intersects = false; break; }
      } else {
        let near = (min - a[k]) / delta, far = (max - a[k]) / delta;
        if (near > far) [near, far] = [far, near];
        lo = Math.max(lo, near); hi = Math.min(hi, far);
        if (lo >= hi) { intersects = false; break; }
      }
    }
    if (intersects && lo < hi && hi > 0 && lo < 1) return false;
  }
  return true;
}

// Cached routes still check the complete geometric segment on every use. The
// host applies <=.1m moveCircle steps; only a new route needs full certification.
export function tacticalSegmentClear({ from, to, colliders, radius = 0.38, bounds = 23 }) {
  if (!finitePoint(from) || !finitePoint(to) || !Number.isFinite(radius) || radius <= 0 ||
    !Number.isFinite(bounds) || bounds <= 0) return false;
  let boxes;
  try { boxes = boxesCopy(colliders); } catch { return false; }
  return pointClear(from, boxes, radius, bounds) && pointClear(to, boxes, radius, bounds) &&
    segmentClear(from, to, boxes, radius);
}

export function tacticalGeometryKey(colliders, radius = 0.38, bounds = 23) {
  if (!Number.isFinite(radius) || radius <= 0 || !Number.isFinite(bounds) || bounds <= 0)
    throw new TypeError("Invalid actor radius or bounds");
  return geometryKey(boxesCopy(colliders), radius, bounds);
}

// This is the conservative x-then-z sweep used by the runtime moveCircle.
// Planning rejects a blocked substep rather than relying on sliding through it.
function planningSegmentClear(a, b, boxes, radius, bounds) {
  if (!segmentClear(a, b, boxes, radius)) return false;
  const count = Math.max(1, Math.ceil(distance(a, b) / 0.1));
  let previous = a;
  for (let i = 1; i <= count; i++) {
    const next = { x: a.x + (b.x - a.x) * i / count, z: a.z + (b.z - a.z) * i / count };
    if (!pointClear({ x: next.x, z: previous.z }, boxes, radius, bounds) ||
      !pointClear(next, boxes, radius, bounds)) return false;
    previous = next;
  }
  return true;
}

/** Complete, bounded visibility graph; returns null instead of moving a target.
 * The host should call this only on invalidated caches, never every frame.
 * Actor and NPC/mission-object vectors are never retained or modified.
 */
export function planTacticalPath({ from, to, colliders, radius = 0.38, bounds = 23, maxDistance = MAX_PATH }) {
  if (!finitePoint(from) || !finitePoint(to) || !Number.isFinite(radius) || radius <= 0 ||
    !Number.isFinite(bounds) || bounds <= 0 || !Number.isFinite(maxDistance) || maxDistance < 0 ||
    maxDistance > 128) return null;
  let boxes;
  try { boxes = boxesCopy(colliders); } catch { return null; }
  if (!pointClear(from, boxes, radius, bounds) || !pointClear(to, boxes, radius, bounds) ||
    distance(from, to) > maxDistance + EPS) return null;
  if (planningSegmentClear(from, to, boxes, radius, bounds)) return [point(from), point(to)];
  const nodes = [point(from), point(to)], seen = new Set();
  for (const box of boxes) {
    for (const x of [box.min.x - radius - 0.12, box.max.x + radius + 0.12]) {
      for (const z of [box.min.z - radius - 0.12, box.max.z + radius + 0.12]) {
        const candidate = { x, z }, key = `${x}:${z}`;
        if (seen.has(key) || !pointClear(candidate, boxes, radius, bounds) ||
          distance(from, candidate) + distance(candidate, to) > maxDistance + EPS) continue;
        seen.add(key); nodes.push(candidate);
        if (nodes.length > 512) return null;
      }
    }
  }
  const costs = nodes.map(() => Infinity), parents = nodes.map(() => -1), visited = new Set();
  costs[0] = 0;
  for (let attempt = 0; attempt < nodes.length; attempt++) {
    let index = -1, score = Infinity;
    for (let i = 0; i < nodes.length; i++) {
      const estimated = costs[i] + distance(nodes[i], to);
      if (!visited.has(i) && estimated < score) { index = i; score = estimated; }
    }
    if (index < 0 || score > maxDistance + EPS) return null;
    if (index === 1) {
      const route = [];
      for (let i = index; i >= 0; i = parents[i]) route.push(point(nodes[i]));
      return route.reverse();
    }
    visited.add(index);
    for (let i = 0; i < nodes.length; i++) {
      if (visited.has(i) || i === index) continue;
      const cost = costs[index] + distance(nodes[index], nodes[i]);
      if (cost >= costs[i] || cost + distance(nodes[i], to) > maxDistance + EPS) continue;
      if (!planningSegmentClear(nodes[index], nodes[i], boxes, radius, bounds)) continue;
      costs[i] = cost; parents[i] = index;
    }
  }
  return null;
}

export function certifyTacticalPath(path, {
  from, to, colliders, radius = 0.38, bounds = 23, maxDistance = MAX_PATH,
}, moveCircle) {
  const fail = (reason) => ({ ok: false, path: [], distance: 0, reason });
  if (!finitePoint(from) || !finitePoint(to) || !Number.isFinite(radius) || radius <= 0 ||
    !Number.isFinite(bounds) || bounds <= 0 || !Number.isFinite(maxDistance) || maxDistance < 0 ||
    typeof moveCircle !== "function") return fail("invalid-input");
  let boxes;
  try { boxes = boxesCopy(colliders); } catch { return fail("invalid-colliders"); }
  if (!Array.isArray(path) || !path.length || path.length > 1024 || !path.every(finitePoint))
    return fail("missing-path");
  const route = path.map(point);
  if (distance(route[0], from) > EPS) route.unshift(point(from));
  if (distance(route.at(-1), to) > EPS) return fail("wrong-destination");
  if (!route.every((p) => pointClear(p, boxes, radius, bounds))) return fail("blocked-waypoint");
  let length = 0;
  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1], b = route[i], span = distance(a, b);
    length += span;
    if (length > maxDistance + EPS) return fail("path-budget");
    if (!segmentClear(a, b, boxes, radius)) return fail("blocked-segment");
    const count = Math.max(1, Math.ceil(span / 0.1));
    let actual = point(a);
    for (let step = 1; step <= count; step++) {
      const target = { x: a.x + (b.x - a.x) * step / count, z: a.z + (b.z - a.z) * step / count };
      const next = moveCircle(point(actual), target.x - actual.x, target.z - actual.z, boxes, radius, bounds);
      if (!finitePoint(next) || distance(next, target) > 0.0001) return fail("physics-blocked");
      actual = point(next);
    }
  }
  return { ok: true, path: route, distance: length, reason: "certified" };
}

function geometryKey(boxes, radius, bounds) {
  return JSON.stringify([radius, bounds, boxes.map((b) => [b.id, b.min.x, b.min.y, b.min.z, b.max.x, b.max.y, b.max.z])]);
}

function traceCover(at, threat, trace) {
  const hit = trace({ x: threat.x, y: HEIGHT, z: threat.z }, { x: at.x, y: HEIGHT, z: at.z });
  return hit && hit.box && Number.isFinite(hit.distance) && hit.distance < distance(at, threat) - EPS ? hit : null;
}

function plan(from, to, boxes, radius, bounds, maxDistance, adapters) {
  const path = adapters.planPath ? adapters.planPath({
    from: point(from), to: point(to), colliders: boxesCopy(boxes), radius, bounds, maxDistance,
  }) : [point(from), point(to)];
  return certifyTacticalPath(path, { from, to, colliders: boxes, radius, bounds, maxDistance }, adapters.moveCircle);
}

function newMovement(kind, goal, proof, hit = null) {
  return {
    kind, goal: point(goal), waypoint: point(proof.path[1] || goal),
    path: proof.path.map(point), distance: proof.distance,
    ...(hit ? { occluderId: hit.box.id ?? null } : {}),
    proof: { collision: "inflated-aabb-and-moveCircle", radius: 0.38, maxStep: 0.1,
      ...(hit ? { lineOfSightHeight: HEIGHT, blockedBy: hit.box.id ?? null } : {}) },
  };
}

/**
 * Immutable actor-local state. Pressure may start one response; a cached route
 * can finish after suppression expires. Suppression never authorizes a shot.
 * planPath must return the complete route; failed planning never becomes an
 * unchecked direct movement. now is used only to throttle failed path searches.
 */
export function updateEnemyTactics(previous, view, adapters) {
  if (!previous || previous.version !== 1 || previous.actorId !== view.id ||
    !finitePoint(view.position) || !finitePoint(view.threat) || !Number.isFinite(view.now) ||
    !Number.isFinite(view.suppressed) || !Number.isFinite(view.rounds) ||
    typeof adapters?.trace !== "function" || typeof adapters?.moveCircle !== "function")
    throw new TypeError("Invalid tactics view or adapters");
  const range = enemyWeaponRange(view.type), state = copy(previous);
  const position = point(view.position), threat = point(view.threat);
  const radius = view.radius ?? 0.38, bounds = view.bounds ?? 23;
  if (!Number.isFinite(radius) || radius <= 0 || !Number.isFinite(bounds) || bounds <= 0)
    throw new TypeError("Invalid actor radius or bounds");
  const boxes = boxesCopy(view.colliders), key = geometryKey(boxes, radius, bounds);
  const gap = distance(position, threat), suppressFire = view.suppressed > 0;
  if (state.lastPosition && state.lastMovement === "approach")
    state.approachTravel += distance(position, state.lastPosition);
  state.lastPosition = point(position);
  const finish = (movement, reason) => {
    let announcement = null;
    state.lastMovement = movement?.kind ?? null;
    if (movement && !state.announced) {
      state.announced = true;
      announcement = { id: `${view.id}:tactical-response`, text: movement.kind === "cover" ? "敵人準備轉移到掩體。" : "遠處守軍準備接近射程。" };
    }
    return { state, movement, announcement, suppressFire, reason };
  };
  if (view.enabled !== true || view.rounds <= 0) { state.cache = null; return finish(null, "inactive"); }
  if (!pointClear(position, boxes, radius, bounds)) { state.cache = null; return finish(null, "actor-obstructed"); }

  if (state.approachOrigin && (state.approachTravel >= MAX_APPROACH - EPS ||
    distance(position, state.approachOrigin) >= MAX_APPROACH - EPS || gap <= 29 || gap > 46)) {
    state.approachStopped = true;
    if (state.cache?.movement?.kind === "approach") state.cache = null;
  }

  let cached = state.cache;
  const sameWorld = cached && cached.geometry === key && distance(threat, cached.threat) <= 2;
  if (sameWorld && !cached.movement && distance(position, cached.from) <= 0.5 && view.now < cached.retryAt)
    return finish(null, cached.reason);
  if (sameWorld && cached.movement) {
    const move = cached.movement;
    if (move.kind === "cover" && !traceCover(move.goal, threat, adapters.trace)) cached = null;
    if (cached && distance(position, move.goal) <= 0.08) return finish(null, "at-cover");
    if (cached) {
      let index = cached.index;
      while (index < move.path.length - 1 && distance(position, move.path[index]) <= 0.08) index++;
      const waypoint = move.path[index];
      const segmentIsClear = waypoint && pointClear(waypoint, boxes, radius, bounds) &&
        segmentClear(position, waypoint, boxes, radius);
      if (segmentIsClear && !(move.kind === "approach" && state.approachStopped)) {
        cached.index = index; state.cache = cached;
        const result = copy(move); result.waypoint = point(waypoint);
        result.path = [position, ...move.path.slice(index).map(point)];
        result.distance = result.path.slice(1).reduce((n, p, i) => n + distance(result.path[i], p), 0);
        if (result.distance <= MAX_PATH + EPS &&
          (move.kind !== "approach" || result.distance <= MAX_APPROACH - state.approachTravel + EPS))
          return finish(result, "cached-route");
      }
    }
  }
  state.cache = null;
  if (!(view.underFire === true || suppressFire)) return finish(null, "no-pressure");

  const cacheNone = (reason) => {
    state.cache = { geometry: key, threat, from: position, retryAt: view.now + 1, reason, movement: null };
    return finish(null, reason);
  };
  // Four actual box faces, with the full combat actor radius outside the solid.
  const candidates = [];
  for (const box of boxes) {
    const x = (box.min.x + box.max.x) / 2, z = (box.min.z + box.max.z) / 2;
    for (const candidate of [
      { x: box.min.x - radius - 0.08, z }, { x: box.max.x + radius + 0.08, z },
      { x, z: box.min.z - radius - 0.08 }, { x, z: box.max.z + radius + 0.08 },
    ]) {
      if (distance(position, candidate) > 10 || !pointClear(candidate, boxes, radius, bounds)) continue;
      const hit = traceCover(candidate, threat, adapters.trace);
      if (!hit) continue;
      if (distance(position, candidate) <= 0.08) return cacheNone("already-covered");
      candidates.push({ candidate, hit, distance: distance(position, candidate) });
    }
  }
  candidates.sort((a, b) => a.distance - b.distance);
  let best = null;
  for (const candidate of candidates) {
    // Euclidean distance is a lower bound, so longer candidates cannot improve.
    if (best && candidate.distance >= best.distance) break;
    const proof = plan(position, candidate.candidate, boxes, radius, bounds, MAX_PATH, adapters);
    if (proof.ok && (!best || proof.distance < best.distance)) best = newMovement("cover", candidate.candidate, proof, candidate.hit);
  }
  if (!best && view.type === "guard" && view.underFire === true && !state.approachStopped && gap >= range && gap <= 46) {
    if (!state.approachOrigin) state.approachOrigin = point(position);
    const remaining = MAX_APPROACH - state.approachTravel;
    const amount = Math.min(gap - 29, remaining);
    const goal = { x: position.x + (threat.x - position.x) * amount / gap, z: position.z + (threat.z - position.z) * amount / gap };
    if (amount > EPS && distance(goal, state.approachOrigin) <= MAX_APPROACH + EPS && pointClear(goal, boxes, radius, bounds)) {
      const proof = plan(position, goal, boxes, radius, bounds, Math.min(MAX_PATH, remaining), adapters);
      if (proof.ok) best = newMovement("approach", goal, proof);
    }
  }
  if (!best) return cacheNone(state.approachStopped ? "approach-finished" : "no-reachable-cover");
  best.proof.radius = radius;
  state.cache = { geometry: key, threat, from: position, movement: copy(best), index: 1 };
  return finish(best, "new-route");
}
