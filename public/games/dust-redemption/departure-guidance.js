import {
  planTacticalPath,
  certifyTacticalPath,
  tacticalGeometryKey,
  tacticalSegmentClear,
} from "./enemy-tactics.js";

// Presentation only: no actor positions, mission progress or collision mutate.
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
const point = (p) => ({ x: p.x, z: p.z });
const finite = (p) => p && Number.isFinite(p.x) && Number.isFinite(p.z);
const gap = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

function nearestSegment(position, path) {
  let nearest = { distance: Infinity, index: 0 };
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1],
      b = path[i];
    const dx = b.x - a.x,
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
    const distance = gap(position, { x: a.x + dx * t, z: a.z + dz * t });
    if (distance < nearest.distance) nearest = { distance, index: i };
  }
  return nearest;
}

function markersAlong(path) {
  const markers = [];
  let wanted = DEPARTURE_GUIDANCE.firstMarker,
    travelled = 0;
  const total = path.slice(1).reduce((n, p, i) => n + gap(path[i], p), 0);
  for (
    let i = 1;
    i < path.length && markers.length < DEPARTURE_GUIDANCE.maxMarkers;
    i++
  ) {
    const a = path[i - 1],
      b = path[i],
      length = gap(a, b);
    if (length < 1e-6) continue;
    while (
      wanted <= travelled + length &&
      wanted <= total - 0.08 &&
      markers.length < DEPARTURE_GUIDANCE.maxMarkers
    ) {
      const t = (wanted - travelled) / length;
      markers.push({
        x: a.x + (b.x - a.x) * t,
        z: a.z + (b.z - a.z) * t,
        yaw: Math.atan2(b.x - a.x, b.z - a.z),
      });
      wanted += DEPARTURE_GUIDANCE.spacing;
    }
    travelled += length;
  }
  return markers;
}

/** Inject the runtime's real moveCircle; source and packaged modules share it. */
export function createDepartureGuidance({ moveCircle } = {}) {
  if (typeof moveCircle !== "function")
    throw new TypeError("Pass the real moveCircle");
  let cache = null,
    revision = 0;
  const hidden = (reason) => ({
    visible: false,
    reason,
    chevrons: [],
    path: [],
    revision,
  });
  const reset = () => {
    cache = null;
  };
  function update({ enabled = false, position, target, colliders } = {}) {
    if (!enabled) {
      reset();
      return hidden("disabled");
    }
    if (!finite(position) || !finite(target) || !Array.isArray(colliders)) {
      reset();
      return hidden("invalid-input");
    }
    const options = {
      from: point(position),
      to: point(target),
      colliders,
      radius: DEPARTURE_GUIDANCE.radius,
      bounds: DEPARTURE_GUIDANCE.bounds,
      maxDistance: DEPARTURE_GUIDANCE.maxDistance,
    };
    let geometry;
    try {
      geometry = tacticalGeometryKey(colliders, options.radius, options.bounds);
    } catch {
      reset();
      return hidden("invalid-input");
    }
    if (
      gap(position, target) <= DEPARTURE_GUIDANCE.arrivalDistance &&
      tacticalSegmentClear(options)
    ) {
      reset();
      return hidden("arrived");
    }
    // A stationary player at an impossible route must not rebuild a visibility
    // graph every frame. Moving again or changing any collider retries it.
    if (
      cache?.failedFrom &&
      cache.geometry === geometry &&
      gap(cache.target, target) <= 1e-6 &&
      gap(cache.failedFrom, position) <= 0.1
    )
      return hidden("no-path");
    let nearest = cache && nearestSegment(position, cache.path);
    let remaining = nearest ? cache.path.slice(nearest.index) : [];
    while (remaining.length && gap(position, remaining[0]) < 1e-6)
      remaining.shift();
    const length = remaining.reduce(
      (total, p, i) => total + gap(i ? remaining[i - 1] : position, p),
      0,
    );
    let replan =
      !cache ||
      cache.geometry !== geometry ||
      gap(cache.target, target) > 1e-6 ||
      nearest.distance > DEPARTURE_GUIDANCE.deviationDistance ||
      !remaining.length ||
      length > options.maxDistance;
    if (!replan) {
      // Deviation changes this one segment even when the collider geometry is
      // unchanged. A clear chord alone does not prove x-then-z movement around
      // a box corner. Retain the already certified tail; certify only the head.
      const head = cache.head;
      if (
        !head ||
        gap(head.from, position) > 1e-9 ||
        gap(head.to, remaining[0]) > 1e-9
      ) {
        const proof = certifyTacticalPath(
          [point(position), remaining[0]],
          {
            ...options,
            to: remaining[0],
          },
          moveCircle,
        );
        cache.head = {
          from: point(position),
          to: point(remaining[0]),
          ok: proof.ok,
        };
      }
      replan = !cache.head.ok;
    }
    if (replan) {
      revision++;
      const proof = certifyTacticalPath(
        planTacticalPath(options),
        options,
        moveCircle,
      );
      cache = {
        geometry,
        target: point(target),
        path: proof.ok ? proof.path : [],
        failedFrom: proof.ok ? null : point(position),
        head: proof.ok
          ? { from: point(position), to: point(proof.path[1]), ok: true }
          : null,
      };
      if (!proof.ok) return hidden("no-path");
      remaining = cache.path.slice(1);
    }
    const path = [point(position), ...remaining.map(point)];
    const chevrons = markersAlong(path);
    return {
      visible: chevrons.length > 0,
      reason: "route",
      chevrons,
      path,
      revision,
    };
  }
  return { update, reset };
}
