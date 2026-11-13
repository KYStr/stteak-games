import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const source = readFileSync(
  new URL("../../games/dust-redemption/game.js", import.meta.url),
  "utf8",
);
const nearbyCode = source.slice(
  source.indexOf("function nearby() {"),
  source.indexOf("\nfunction applyFieldEffect"),
);
function fixture({
  clues = [],
  objectives = [],
  secured = false,
  flow = null,
} = {}) {
  const cart = { id: "pact-cart", title: "original cart" },
    state = { x: 0, z: 2.4005 };
  const getNearby = new Function(
    "player",
    "mission",
    "clues",
    "objectives",
    "field",
    "missionSystem",
    "fieldEffects",
    "secured",
    "fieldInteractionAdapters",
    nearbyCode + ";return nearby;",
  )(
    { position: state },
    {},
    clues,
    objectives,
    {
      getNearby(p) {
        return Math.hypot(p.x, p.z) <= 2.6 ? cart : null;
      },
      taskPoint() {
        return { x: 0, z: 0 };
      },
    },
    {
      nearest() {
        return flow;
      },
    },
    { healCharges: 0 },
    secured,
    new WeakMap(),
  );
  return { getNearby, cart, state };
}
test("rear cart grips honor the authored 2.6m radius beyond the general 2.4m range", () => {
  const f = fixture(),
    first = f.getNearby();
  assert.equal(first.type, "field");
  assert.equal(first.task, f.cart);
  for (let i = 0; i < 240; i++)
    assert.equal(f.getNearby(), first, "reused task adapter");
  f.state.z = 2.61;
  assert.equal(f.getNearby(), null, "task radius remains authoritative");
});
test("clues and objectives keep the original range and nearest/exit precedence", () => {
  const clue = { position: [0, 0.2], read: false, type: "clue" };
  const f = fixture({ clues: [clue] });
  assert.equal(f.getNearby(), clue);
  clue.read = true;
  assert.equal(f.getNearby().task, f.cart);
  f.state.z = 4;
  assert.equal(f.getNearby(), null);
  const exit = { position: [0, 0.4], type: "exit" };
  const g = fixture({
    objectives: [exit],
    secured: true,
    flow: { distance: 0.1, type: "flow" },
  });
  assert.equal(g.getNearby(), exit, "secured exit keeps extraction precedence");
});
