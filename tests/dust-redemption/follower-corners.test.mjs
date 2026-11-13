import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  EscortRouting,
  ESCORT_MOVEMENT_EPSILON,
} from "../../games/dust-redemption/escort-routing.js";
import { moveCircle } from "../../games/dust-redemption/physics.js";
const captures = JSON.parse(
  readFileSync(new URL("./fixtures/follower-corners.json", import.meta.url)),
);
for (const capture of captures)
  test(`real collision integration clears captured ${capture.name}`, () => {
    const member = { position: { ...capture.from } },
      router = new EscortRouting(capture.colliders);
    const out = {};
    for (let i = 0; i < 240; i++) {
      const next = router.target(member, capture.target, capture.colliders, 0);
      const dx = next.x - member.position.x,
        dz = next.z - member.position.z,
        length = Math.hypot(dx, dz);
      if (length > ESCORT_MOVEMENT_EPSILON) {
        const amount = Math.min(length, 0.05 * 2.4);
        Object.assign(
          member.position,
          moveCircle(
            member.position,
            (dx / length) * amount,
            (dz / length) * amount,
            capture.colliders,
            0.27,
            23,
            out,
          ),
        );
      }
      assert.equal(
        router.free(member.position.x, member.position.z),
        true,
        `collision at step ${i}`,
      );
      assert.equal(router.recalculations, 1, `stable path at step ${i}`);
    }
    assert.ok(
      Math.hypot(
        member.position.x - capture.from.x,
        member.position.z - capture.from.z,
      ) > 1,
    );
    assert.ok(
      Math.hypot(
        member.position.x - capture.target.x,
        member.position.z - capture.target.z,
      ) < 0.08,
    );
  });
test("a nearby corner is retained when skipping it cuts the expanded solid bank", () => {
  const colliders = [{ min: { x: -1, z: -1 }, max: { x: 1, z: 1 } }];
  const router = new EscortRouting(colliders),
    member = { position: { x: -1.3, z: -1.22 } };
  const target = { x: 2, z: 0 };
  const corner = router.target(member, target, colliders, 0);
  assert.ok(
    Math.hypot(corner.x - member.position.x, corner.z - member.position.z) <
      0.12,
  );
  assert.equal(
    router.clear(member.position, member.fieldRoute.points[1]),
    false,
  );
  const index = member.fieldRoute.index;
  for (let i = 0; i < 20; i++) {
    assert.equal(router.target(member, target, colliders, 0), corner);
    assert.equal(member.fieldRoute.index, index);
    assert.equal(router.recalculations, 1);
  }
});
