import test from "node:test";
import assert from "node:assert/strict";
import {
  trailingFollowers,
  completedEscortWaypoint,
  needsSupply,
} from "./driver.mjs";
test("escort input waits for trailing people, and catches up with people already ahead", () => {
  const state = {
    player: { x: 12, z: -4 },
    field: { traversal: { type: "escort" } },
    nightFlow: { party: { members: [{ position: [5.9, -4] }] } },
  };
  assert.equal(trailingFollowers(state, { x: 5, z: -4 }), false);
  state.nightFlow.party.members[0].position = [17, -4];
  assert.equal(trailingFollowers(state, { x: 5, z: -4 }), true);
  state.nightFlow.party.members[0].position = [14, -4];
  assert.equal(trailingFollowers(state, { x: 5, z: -4 }), false);
  state.field.onward = { following: true, members: [{ position: [18, -4] }] };
  assert.equal(trailingFollowers(state, { x: 5, z: -4 }), true);
});

test("a completed authored escort waypoint returns before waiting on people ahead", () => {
  const d = {
    player: { x: 12.09247, z: -4.11019 },
    field: {
      traversal: {
        type: "escort",
        route: [
          [13, -8],
          [12, -4],
          [5, -4],
        ],
        index: 2,
      },
    },
    nightFlow: {
      party: {
        members: [0, 1, 2].map((i) => ({
          id: `family-${i}`,
          position: [6.06, -4],
        })),
      },
    },
  };
  assert.equal(trailingFollowers(d, { x: 12, z: -4 }), true);
  assert.equal(completedEscortWaypoint(d, { x: 12, z: -4 }), true);
  assert.equal(completedEscortWaypoint(d, { x: 5, z: -4 }), false);
  assert.equal(completedEscortWaypoint(d, { x: 12.3, z: -4 }), false);
  d.field.traversal.index = 1;
  assert.equal(completedEscortWaypoint(d, { x: 12, z: -4 }), false);
  d.field.traversal.type = "carry";
  assert.equal(completedEscortWaypoint(d, { x: 13, z: -8 }), false);
  for (const index of [-1, 0, 1.5, undefined]) {
    d.field.traversal.index = index;
    d.field.traversal.type = "escort";
    assert.equal(completedEscortWaypoint(d, { x: 13, z: -8 }), false);
  }
});

test("medicine upgrades preserve the larger heal but cannot delay smoke use", () => {
  const d = {
    profile: { equipment: { item: "medkit" }, supplies: { medicine: 0 } },
    stats: { itemsUsed: 0 },
    player: { hp: 44 },
  };
  assert.equal(needsSupply(d), true);
  d.profile.supplies.medicine = 3;
  assert.equal(needsSupply(d), false);
  d.player.hp = 34;
  assert.equal(needsSupply(d), true);
  d.player.hp = 44;
  d.profile.equipment.item = "smoke";
  assert.equal(needsSupply(d), true);
  d.player.hp = 46;
  assert.equal(needsSupply(d), false);
  d.player.hp = 20;
  d.stats.itemsUsed = 1;
  assert.equal(needsSupply(d), false);
});
