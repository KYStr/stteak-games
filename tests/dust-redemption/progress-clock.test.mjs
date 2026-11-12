import test from "node:test";
import assert from "node:assert/strict";
import { ProgressClock } from "./progress-clock.mjs";
const state = (seconds, x = 0, mode = "playing") => ({
  mode,
  challenge: { activeSeconds: seconds },
  player: { x },
  field: {},
});
test("slow wall rendering continues while simulation and movement make progress", () => {
  const c = new ProgressClock({
    label: "slow",
    simulationBudget: 30,
    wallWatchdog: 600000,
    progress: (d) => 100 - d.player.x,
  });
  for (let i = 0; i < 20; i++) c.observe(state(i, i), i * 30000);
  assert.equal(c.lastSim, 19);
});
test("ten simulated stationary seconds fail with movement state", () => {
  const c = new ProgressClock({
    label: "blocked",
    progress: (d) => 100 - d.player.x,
  });
  c.observe(state(0), 0);
  assert.throws(() => c.observe(state(11), 1000), /movement stalled/);
});
test("a party outside follow range is not misreported as a blocked in-range route", () => {
  const c = new ProgressClock({
    label: "leash",
    progress: () => 10,
    stallEligible: (d) => d.player.x < 6,
  });
  c.observe(state(0, 7), 0);
  c.observe(state(20, 7), 2000);
  c.observe(state(21, 0), 2100);
  c.observe(state(29, 0), 2900);
  assert.throws(() => c.observe(state(31, 0), 3100), /movement stalled/);
});
test("death fails immediately, while a wall watchdog is explicitly infrastructure timeout", () => {
  const c = new ProgressClock({ label: "leg", wallWatchdog: 600000 });
  c.observe(state(0), 0);
  assert.throws(() => c.observe(state(0.01, 0, "dead"), 1), /dead/);
  assert.throws(
    () => c.observe(state(0.1), 600001),
    /infrastructure-or-render-progress timeout/,
  );
});
