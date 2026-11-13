const AXES = ["x", "y", "z"];
const directionScratch = { x: 0, y: 0, z: 0 };
// Shared metre-space proxies: identical geometry for movement, line of sight and bullets.
export function rayBox(origin, direction, box, maxDistance = Infinity) {
  let near = 0,
    far = maxDistance;
  for (const key of AXES) {
    const lo = box.min[key],
      hi = box.max[key],
      d = direction[key];
    if (Math.abs(d) < 1e-8) {
      if (origin[key] < lo || origin[key] > hi) return null;
    } else {
      let a = (lo - origin[key]) / d,
        b = (hi - origin[key]) / d;
      if (a > b) {
        const temp = a;
        a = b;
        b = temp;
      }
      near = Math.max(near, a);
      far = Math.min(far, b);
      if (near > far) return null;
    }
  }
  return near <= maxDistance ? near : null;
}
export function firstHit(a, b, boxes, out = {}) {
  const dx = b.x - a.x,
    dy = b.y - a.y,
    dz = b.z - a.z,
    length = Math.hypot(dx, dy, dz);
  if (!length) return null;
  directionScratch.x = dx / length;
  directionScratch.y = dy / length;
  directionScratch.z = dz / length;
  let closest = Infinity,
    hit = null;
  for (let i = 0; i < boxes.length; i++) {
    const distance = rayBox(a, directionScratch, boxes[i], length);
    if (distance !== null && distance < closest) {
      hit = boxes[i];
      closest = distance;
    }
  }
  if (!hit) return null;
  out.box = hit;
  out.distance = closest;
  return out;
}
function penetration(x, z, b, radius) {
  return Math.max(
    0,
    Math.min(
      x + radius - b.min.x,
      b.max.x + radius - x,
      z + radius - b.min.z,
      b.max.z + radius - z,
    ),
  );
}
function blocked(x, z, position, boxes, radius) {
  for (let i = 0; i < boxes.length; i++) {
    const next = penetration(x, z, boxes[i], radius);
    if (next <= 1e-8) continue;
    const existing = penetration(position.x, position.z, boxes[i], radius);
    if (existing <= 1e-8 || next >= existing - 1e-8) return true;
  }
  return false;
}
export function moveCircle(
  position,
  dx,
  dz,
  boxes,
  radius = 0.34,
  bounds = 23,
  out = {},
) {
  let x = Math.max(-bounds, Math.min(bounds, position.x + dx)),
    z = position.z;
  if (blocked(x, z, position, boxes, radius)) x = position.x;
  z = Math.max(-bounds, Math.min(bounds, position.z + dz));
  if (blocked(x, z, position, boxes, radius)) z = position.z;
  out.x = x;
  out.z = z;
  return out;
}
export function coverDistance(p, b) {
  return Math.hypot(
    Math.max(b.min.x - p.x, 0, p.x - b.max.x),
    Math.max(b.min.z - p.z, 0, p.z - b.max.z),
  );
}
export function makeBox(id, x, z, w, h, d, kind = "crate-low") {
  return {
    id,
    x,
    z,
    w,
    h,
    d,
    kind,
    vaultable: h <= 1.25,
    min: { x: x - w / 2, y: 0, z: z - d / 2 },
    max: { x: x + w / 2, y: h, z: z + d / 2 },
  };
}
