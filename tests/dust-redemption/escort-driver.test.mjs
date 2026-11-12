import test from "node:test";
import assert from "node:assert/strict";
import { trailingFollowers } from "./driver.mjs";
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
