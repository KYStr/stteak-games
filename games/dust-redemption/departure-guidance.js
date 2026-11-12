import {
  planTacticalPath,
  certifyTacticalPath,
  tacticalGeometryKey,
  tacticalSegmentClear,
} from "./enemy-tactics.js";
// Presentation only. No actor, mission event, or collision is changed.
export const DEPARTURE_GUIDANCE = Object.freeze({
  radius: 0.34,
  bounds: 23,
  maxDistance: 64,
  arrivalDistance: 0.65,
  deviationDistance: 0.45,
  firstMarker: 0.55,
  spacing: 0.75,
  maxMarkers: 8,
});
const gap = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const finite = (p) => p && Number.isFinite(p.x) && Number.isFinite(p.z);
export function createDepartureGuidance({ moveCircle } = {}) {
  if (typeof moveCircle !== "function")
    throw TypeError("Pass the real moveCircle");
  let cache = null,
    revision = 0;
  const options = {
    from: { x: 0, z: 0 },
    to: { x: 0, z: 0 },
    colliders: null,
    radius: 0.34,
    bounds: 23,
    maxDistance: 64,
  };
  const headOptions = { ...options, from: options.from, to: { x: 0, z: 0 } };
  const walker = { x: 0, z: 0 },
    moved = {},
    nearest = { distance: Infinity, index: 0 };
  const hiddenState = {
    visible: false,
    reason: "disabled",
    chevrons: [],
    path: [],
    revision: 0,
  };
  const state = {
      visible: false,
      reason: "route",
      chevrons: [],
      path: [],
      revision: 0,
    },
    points = [],
    markers = [];
  for (let i = 0; i < 32; i++) points.push({ x: 0, z: 0 });
  for (let i = 0; i < 8; i++) markers.push({ x: 0, z: 0, yaw: 0 });
  function reset() {
    cache = null;
  }
  function hidden(reason) {
    hiddenState.reason = reason;
    hiddenState.revision = revision;
    return hiddenState;
  }
  function nearestSegment(position, path) {
    nearest.distance = Infinity;
    nearest.index = 0;
    for (let i = 1; i < path.length; i++) {
      const a = path[i - 1],
        b = path[i],
        dx = b.x - a.x,
        dz = b.z - a.z,
        squared = dx * dx + dz * dz;
      const t = squared
        ? Math.max(
            0,
            Math.min(
              1,
              ((position.x - a.x) * dx + (position.z - a.z) * dz) / squared,
            ),
          )
        : 0;
      const distance = Math.hypot(
        position.x - a.x - dx * t,
        position.z - a.z - dz * t,
      );
      if (distance < nearest.distance) {
        nearest.distance = distance;
        nearest.index = i;
      }
    }
  }
  function clearHead(position, to, colliders) {
    headOptions.from.x = position.x;
    headOptions.from.z = position.z;
    headOptions.to.x = to.x;
    headOptions.to.z = to.z;
    headOptions.colliders = colliders;
    if (!tacticalSegmentClear(headOptions)) return false;
    const dx = to.x - position.x,
      dz = to.z - position.z,
      count = Math.max(1, Math.ceil(Math.hypot(dx, dz) / 0.1));
    walker.x = position.x;
    walker.z = position.z;
    for (let i = 0; i < count; i++) {
      const x = walker.x + dx / count,
        z = walker.z + dz / count;
      moveCircle(walker, dx / count, dz / count, colliders, 0.34, 23, moved);
      if (Math.hypot(moved.x - x, moved.z - z) > 1e-5) return false;
      walker.x = moved.x;
      walker.z = moved.z;
    }
    return true;
  }
  function update(input) {
    const { enabled = false, position, target, colliders } = input || {};
    if (!enabled) {
      reset();
      return hidden("disabled");
    }
    if (!finite(position) || !finite(target) || !Array.isArray(colliders)) {
      reset();
      return hidden("invalid-input");
    }
    options.from.x = position.x;
    options.from.z = position.z;
    options.to.x = target.x;
    options.to.z = target.z;
    options.colliders = colliders;
    let geometry;
    try {
      geometry = tacticalGeometryKey(colliders, 0.34, 23);
    } catch {
      reset();
      return hidden("invalid-input");
    }
    if (gap(position, target) <= 0.65 && tacticalSegmentClear(options)) {
      reset();
      return hidden("arrived");
    }
    if (
      cache?.failedFrom &&
      cache.geometry === geometry &&
      gap(cache.target, target) <= 1e-6 &&
      gap(cache.failedFrom, position) <= 0.1
    )
      return hidden("no-path");
    if (cache) nearestSegment(position, cache.path);
    let index = cache ? nearest.index : 0;
    while (
      cache &&
      index < cache.path.length &&
      gap(position, cache.path[index]) < 1e-6
    )
      index++;
    let remaining = 0;
    if (cache)
      for (let i = index; i < cache.path.length; i++)
        remaining += gap(
          i === index ? position : cache.path[i - 1],
          cache.path[i],
        );
    let replan =
      !cache ||
      cache.geometry !== geometry ||
      gap(cache.target, target) > 1e-6 ||
      nearest.distance > 0.45 ||
      index >= cache.path.length ||
      remaining > 64;
    if (!replan) replan = !clearHead(position, cache.path[index], colliders);
    if (replan) {
      revision++;
      const proof = certifyTacticalPath(
        planTacticalPath(options),
        options,
        moveCircle,
      );
      cache = {
        geometry,
        target: { x: target.x, z: target.z },
        path: proof.ok ? proof.path : [],
        failedFrom: proof.ok ? null : { x: position.x, z: position.z },
      };
      if (!proof.ok) return hidden("no-path");
      index = 1;
      // Capacity grows only on a newly planned route, never ordinary stepping.
      while (points.length < cache.path.length + 1) points.push({ x: 0, z: 0 });
    }
    state.path.length = 0;
    points[0].x = position.x;
    points[0].z = position.z;
    state.path.push(points[0]);
    for (let i = index; i < cache.path.length; i++) {
      const p = points[state.path.length];
      p.x = cache.path[i].x;
      p.z = cache.path[i].z;
      state.path.push(p);
    }
    let total = 0;
    for (let i = 1; i < state.path.length; i++)
      total += gap(state.path[i - 1], state.path[i]);
    let wanted = 0.55,
      travelled = 0;
    state.chevrons.length = 0;
    for (let i = 1; i < state.path.length && state.chevrons.length < 8; i++) {
      const a = state.path[i - 1],
        b = state.path[i],
        length = gap(a, b);
      if (length < 1e-6) continue;
      while (
        wanted <= travelled + length &&
        wanted <= total - 0.08 &&
        state.chevrons.length < 8
      ) {
        const t = (wanted - travelled) / length,
          p = markers[state.chevrons.length];
        p.x = a.x + (b.x - a.x) * t;
        p.z = a.z + (b.z - a.z) * t;
        p.yaw = Math.atan2(b.x - a.x, b.z - a.z);
        state.chevrons.push(p);
        wanted += 0.75;
      }
      travelled += length;
    }
    state.visible = state.chevrons.length > 0;
    state.revision = revision;
    return state;
  }
  return { update, reset };
}
