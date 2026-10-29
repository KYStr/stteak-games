// Dependency-free geometric optics. Distances are metres, dial values are 45° steps.
// Mirrors and receiver are finite, two-sided disks; light is never snapped to centres.
const EPSILON = 1e-8;
const MIRROR_RADIUS = 0.85;
const RECEIVER_RADIUS = 0.9;
const ROOM_MIN = [-9, 0, -8];
const ROOM_MAX = [9, 8, 8];
const add = (a, b) => a.map((value, axis) => value + b[axis]);
const subtract = (a, b) => a.map((value, axis) => value - b[axis]);
const scale = (vector, scalar) => vector.map(value => value * scalar);
const dot = (a, b) => a.reduce((total, value, axis) => total + value * b[axis], 0);
const finitePoint = point => Array.isArray(point) && point.length === 3 && point.every(Number.isFinite);
const unit = vector => {
  const length = Math.hypot(...vector);
  return Number.isFinite(length) && length > EPSILON ? scale(vector, 1 / length) : null;
};
const rotateY = (normal, radians) => {
  const c = Math.cos(radians), s = Math.sin(radians);
  return [normal[0] * c + normal[2] * s, normal[1], -normal[0] * s + normal[2] * c];
};

function wallDistance(origin, direction) {
  let distance = Infinity;
  for (let axis = 0; axis < 3; axis += 1) {
    if (Math.abs(direction[axis]) < EPSILON) continue;
    const boundary = direction[axis] > 0 ? ROOM_MAX[axis] : ROOM_MIN[axis];
    const candidate = (boundary - origin[axis]) / direction[axis];
    if (candidate > EPSILON) distance = Math.min(distance, candidate);
  }
  // Invalid/outside-room authored data still produces a bounded, finite visual ray.
  return Number.isFinite(distance) ? Math.min(distance, 40) : 12;
}

function intersectDisk(origin, direction, centre, normal, radius) {
  const denominator = dot(direction, normal);
  if (!Number.isFinite(denominator) || Math.abs(denominator) <= EPSILON) return { hit: false, reason: 'parallel-plane' };
  const distance = dot(subtract(centre, origin), normal) / denominator;
  if (!Number.isFinite(distance) || distance <= EPSILON) return { hit: false, reason: 'plane-behind-ray' };
  if (distance > wallDistance(origin, direction) + EPSILON) return { hit: false, reason: 'wall-blocked' };
  const point = add(origin, scale(direction, distance));
  if (!finitePoint(point) || Math.hypot(...subtract(point, centre)) > radius + EPSILON) return { hit: false, reason: 'outside-aperture' };
  return { hit: true, point };
}

/**
 * Trace the authored emitter -> mirror chain -> receiver using reflected 3D rays.
 *
 * @param {{mirrorPositions:number[][], targetAngles:number[], initialAngles?:number[]}} puzzle
 * @param {number[]} angles Dial values; fractional values are supported for animation.
 * @returns {{path:number[][], powered:boolean, normals:number[][], hitCount:number, reason:string}}
 * path begins at the emitter and contains each actual hit point; a miss ends at a
 * room wall. hitCount counts mirrors only. normals are world-space unit normals,
 * including unlit mirrors, so the renderer can orient all disks consistently.
 * Powered depends on finite aperture intersections, never equality to targetAngles.
 */
export function traceOptics(puzzle, angles = []) {
  const result = { path: [], powered: false, normals: [], hitCount: 0, reason: 'invalid-puzzle' };
  const mirrors = puzzle?.mirrorPositions;
  if (!Array.isArray(mirrors) || !mirrors.length || mirrors.length > 32 || !mirrors.every(finitePoint)) return result;
  const emitter = [-7, mirrors[0][1], -5];
  const receiver = [6, mirrors.at(-1)[1], -6];
  result.path.push(emitter);
  const points = [emitter, ...mirrors, receiver];
  for (let index = 0; index < mirrors.length; index += 1) {
    const incoming = unit(subtract(points[index + 1], points[index]));
    const outgoing = unit(subtract(points[index + 2], points[index + 1]));
    const baseline = incoming && outgoing ? unit(subtract(incoming, outgoing)) : null;
    if (!baseline) {
      // Coincident vertices or an exactly straight-through authored mirror have
      // no usable reflection plane. Fail closed without emitting NaN geometry.
      result.normals = mirrors.map(() => [0, 0, 0]);
      result.reason = 'degenerate-geometry';
      return result;
    }
    const targetAngle = Number.isFinite(puzzle.targetAngles?.[index]) ? puzzle.targetAngles[index] : 0;
    const dialAngle = Number.isFinite(angles?.[index]) ? angles[index] : Number.isFinite(puzzle.initialAngles?.[index]) ? puzzle.initialAngles[index] : 0;
    // Reduce before subtracting: enormous finite dial inputs cannot overflow.
    const offset = ((dialAngle % 8) - (targetAngle % 8)) * Math.PI / 4;
    result.normals.push(rotateY(baseline, offset));
  }
  let origin = emitter;
  let direction = unit(subtract(mirrors[0], emitter));
  const miss = reason => {
    result.path.push(add(origin, scale(direction, wallDistance(origin, direction))));
    result.reason = reason;
    return result;
  };
  for (let index = 0; index < mirrors.length; index += 1) {
    const hit = intersectDisk(origin, direction, mirrors[index], result.normals[index], MIRROR_RADIUS);
    if (!hit.hit) return miss(`mirror-${index}:${hit.reason}`);
    origin = hit.point;
    result.path.push(origin);
    result.hitCount += 1;
    // Physical specular reflection; normal reversal represents the same plane.
    direction = unit(subtract(direction, scale(result.normals[index], 2 * dot(direction, result.normals[index]))));
    if (!direction) { result.reason = 'degenerate-reflection'; return result; }
  }
  const receiverNormal = unit(subtract(receiver, mirrors.at(-1)));
  const received = intersectDisk(origin, direction, receiver, receiverNormal, RECEIVER_RADIUS);
  if (!received.hit) return miss(`receiver:${received.reason}`);
  result.path.push(received.point);
  result.powered = true;
  result.reason = 'receiver-hit';
  return result;
}
