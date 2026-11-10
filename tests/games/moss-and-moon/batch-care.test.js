import test from "node:test";
import assert from "node:assert/strict";
import {
  createState,
  transact,
  validateState,
} from "../../../public/games/moss-and-moon/rules.js";
test("batch watering and harvest affect eligible plants exactly once, never decor or immature plants", () => {
  const before = createState();
  before.grid[0] = { type: "plant", id: "moss", growth: 0, watered: false };
  before.grid[1] = { type: "plant", id: "moss", growth: 3, watered: false };
  before.grid[2] = { type: "plant", id: "fern", growth: 1, watered: true };
  before.grid[3] = { type: "decor", id: "bench", rotation: 0 };
  const watered = transact(before, { type: "waterAll" });
  assert.equal(watered.ok, true);
  assert.equal(watered.state.stats.watered, 1);
  assert.equal(watered.state.grid[0].watered, true);
  assert.equal(watered.state.grid[1].watered, false);
  assert.equal(before.grid[0].watered, false);
  assert.equal(transact(watered.state, { type: "waterAll" }).ok, false);
  const harvested = transact(watered.state, { type: "harvestAll" });
  assert.equal(harvested.ok, true);
  assert.equal(harvested.state.inventory.moss, 1);
  assert.equal(harvested.state.grid[1], null);
  assert.deepEqual(harvested.state.grid[3], before.grid[3]);
  assert.equal(harvested.state.stats.harvested, 1);
  assert.equal(harvested.state.stats.transactions, 1);
  assert.equal(validateState(harvested.state).ok, true);
  assert.equal(transact(harvested.state, { type: "harvestAll" }).ok, false);
});
