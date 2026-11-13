import test from "node:test";
import assert from "node:assert/strict";
import { createDepartureGuidance } from "../../games/dust-redemption/departure-guidance.js";
import { moveCircle } from "../../games/dust-redemption/physics.js";
import { certifyTacticalPath } from "../../games/dust-redemption/enemy-tactics.js";
const wall = {
  id: "solid",
  kind: "wall",
  min: { x: -0.5, y: 0, z: -2 },
  max: { x: 0.5, y: 2, z: 2 },
};
test("guidance retains its result, point and marker workspaces while continuously proving the real collision path", () => {
  const guide = createDepartureGuidance({ moveCircle }),
    p = { x: -3, z: 0 },
    target = { x: 3, z: 0 },
    colliders = [wall],
    input = { enabled: true, position: p, target, colliders };
  let state = guide.update(input);
  assert.equal(state.visible, true);
  const result = state,
    path = state.path,
    markers = state.chevrons,
    firstMarker = state.chevrons[0];
  for (let i = 0; i < 240; i++) {
    state = guide.update(input);
    assert.equal(state, result);
    assert.equal(state.path, path);
    assert.equal(state.chevrons, markers);
    assert.equal(state.chevrons[0], firstMarker);
    assert.equal(
      certifyTacticalPath(
        state.path,
        {
          from: p,
          to: target,
          colliders,
          radius: 0.34,
          bounds: 23,
          maxDistance: 64,
        },
        moveCircle,
      ).ok,
      true,
    );
  }
  const next = state.path[1],
    dx = next.x - p.x,
    dz = next.z - p.z,
    len = Math.hypot(dx, dz);
  p.x += (dx / len) * 0.05;
  p.z += (dz / len) * 0.05;
  assert.equal(guide.update(input), result);
  const revision = result.revision;
  wall.max.z += 0.3;
  guide.update(input);
  assert.ok(result.revision > revision);
  input.enabled = false;
  assert.equal(guide.update(input).visible, false);
  assert.equal(guide.update(input).reason, "disabled");
});
test("an impossible route stays hidden and does not repeat the search at a stationary failed origin", () => {
  const guide = createDepartureGuidance({ moveCircle }),
    input = {
      enabled: true,
      position: { x: 0, z: 0 },
      target: { x: 3, z: 0 },
      colliders: [wall],
    };
  const first = guide.update(input);
  assert.equal(first.reason, "no-path");
  const revision = first.revision;
  for (let i = 0; i < 240; i++)
    assert.equal(guide.update(input).revision, revision);
});

test("the courtyard exit hint precedes onward work; extraction guidance requires the complete handoff", async () => {
  const { MissionSystem } = await import(
    "../../public/games/dust-redemption/mission-system.js"
  );
  const { MISSION_FLOW } = await import(
    "../../games/dust-redemption/mission-flow.js"
  );
  const system = Object.create(MissionSystem.prototype);
  let secured = false;
  Object.assign(system, {
    status: { receipt: {}, routeId: "aid-delivery" },
    field: { baseComplete: true },
    flow: MISSION_FLOW["dry-mail"],
    player: { position: { x: -8, z: -4 } },
    props: {
      group: {
        userData: {
          placement: { courtyard: { min: [-15.5, -7], max: [-6.5, -1] } },
        },
      },
    },
    callbacks: { secured: () => secured, exitPosition: () => [-12, 17] },
  });
  const state = system.departure();
  assert.ok(state);
  assert.equal(state.stage, "courtyard");
  const target = state.target;
  for (let i = 0; i < 240; i++) {
    assert.equal(system.departure(), state);
    assert.equal(system.departure().target, target);
  }
  system.player.position.z = 3;
  assert.equal(system.departure(), null);
  secured = true;
  assert.equal(system.departure(), state);
  assert.equal(state.stage, "extraction");
  assert.deepEqual(state.target, { x: -12, z: 17 });
});
