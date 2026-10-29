import test from "node:test";
import assert from "node:assert/strict";
import { tetherPosition } from "../../../games/dust-redemption/cargo-tether.js";

test("cargo obstruction cannot leave carried object behind across repeated steps", () => {
  let p = { x: 0, z: 0 };
  const cargo = { x: 0, z: 0 };
  for (let i = 0; i < 100; i++)
    p = tetherPosition(p, { x: p.x + 0.2, z: p.z + 0.1 }, cargo);
  assert.ok(Math.hypot(p.x, p.z) <= 1.800000001);
  assert.deepEqual(cargo, { x: 0, z: 0 });
});
test("carrier can return toward cargo after a legitimate initial pickup at maximum reach", () => {
  assert.deepEqual(
    tetherPosition({ x: 2.2, z: 0 }, { x: 2, z: 0 }, { x: 0, z: 0 }),
    { x: 2, z: 0 },
  );
  assert.deepEqual(
    tetherPosition({ x: 2.2, z: 0 }, { x: 2.4, z: 0 }, { x: 0, z: 0 }),
    { x: 2.2, z: 0 },
  );
});
test("turning around an obstacle is permitted within reach and stops at the circle", () => {
  assert.deepEqual(
    tetherPosition({ x: 1, z: 0 }, { x: 1, z: 0.2 }, { x: 0, z: 0 }),
    { x: 1, z: 0.2 },
  );
  const p = tetherPosition(
    { x: 1.6, z: 0 },
    { x: 1.9, z: 0.5 },
    { x: 0, z: 0 },
  );
  assert.ok(Math.abs(Math.hypot(p.x, p.z) - 1.8) < 1e-9);
  assert.ok(p.z > 0);
});
test("zero motion is stable and a separate cart handle reach is supported", () => {
  assert.deepEqual(
    tetherPosition({ x: 1, z: 1 }, { x: 1, z: 1 }, { x: 0, z: 0 }),
    { x: 1, z: 1 },
  );
  assert.deepEqual(
    tetherPosition({ x: 2, z: 0 }, { x: 2.4, z: 0 }, { x: 0, z: 0 }, 2.6),
    { x: 2.4, z: 0 },
  );
});
