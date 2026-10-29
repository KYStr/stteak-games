/** Limit a carrier's proposed step without moving the cargo or trapping an existing overlap. */
export function tetherPosition(previous, proposed, cargo, reach = 1.8) {
  const dx = proposed.x - previous.x,
    dz = proposed.z - previous.z;
  const px = previous.x - cargo.x,
    pz = previous.z - cargo.z;
  const radius = Math.max(reach, Math.hypot(px, pz));
  if (Math.hypot(proposed.x - cargo.x, proposed.z - cargo.z) <= radius + 1e-9)
    return { x: proposed.x, z: proposed.z };
  const a = dx * dx + dz * dz;
  if (a < 1e-12) return { x: previous.x, z: previous.z };
  const b = 2 * (px * dx + pz * dz),
    c = px * px + pz * pz - radius * radius;
  const t = Math.max(
    0,
    Math.min(1, (-b + Math.sqrt(Math.max(0, b * b - 4 * a * c))) / (2 * a)),
  );
  return { x: previous.x + dx * t, z: previous.z + dz * t };
}
