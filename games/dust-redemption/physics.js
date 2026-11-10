// Shared metre-space proxies: identical geometry for movement, line of sight and bullets.
export function rayBox(origin, direction, box, maxDistance = Infinity) {
  let near = 0,
    far = maxDistance;
  for (const key of ["x", "y", "z"]) {
    const lo = box.min[key],
      hi = box.max[key],
      d = direction[key];
    if (Math.abs(d) < 1e-8) {
      if (origin[key] < lo || origin[key] > hi) return null;
    } else {
      let a = (lo - origin[key]) / d,
        b = (hi - origin[key]) / d;
      if (a > b) [a, b] = [b, a];
      near = Math.max(near, a);
      far = Math.min(far, b);
      if (near > far) return null;
    }
  }
  return near <= maxDistance ? near : null;
}
export function firstHit(a, b, boxes) {
  const delta = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
  const length = Math.hypot(delta.x, delta.y, delta.z);
  if (!length) return null;
  const dir = { x: delta.x / length, y: delta.y / length, z: delta.z / length };
  let hit = null;
  for (const box of boxes) {
    const distance = rayBox(a, dir, box, length);
    if (distance !== null && (!hit || distance < hit.distance))
      hit = { box, distance };
  }
  return hit;
}
export function moveCircle(
  position,
  dx,
  dz,
  boxes,
  radius = 0.34,
  bounds = 23,
) {
  const penetration = (x, z, b) =>
    Math.max(
      0,
      Math.min(
        x + radius - b.min.x,
        b.max.x + radius - x,
        z + radius - b.min.z,
        b.max.z + radius - z,
      ),
    );
  const blocked = (x, z) =>
    boxes.some((b) => {
      const next = penetration(x, z, b);
      if (next <= 1e-8) return false;
      const existing = penetration(position.x, position.z, b);
      // A dropped object can introduce a small overlap. Only an outward step
      // that reduces that existing penetration is allowed; new solids still block.
      return existing <= 1e-8 || next >= existing - 1e-8;
    });
  let x = Math.max(-bounds, Math.min(bounds, position.x + dx)),
    z = position.z;
  if (blocked(x, z)) x = position.x;
  z = Math.max(-bounds, Math.min(bounds, position.z + dz));
  if (blocked(x, z)) z = position.z;
  return { x, z };
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
