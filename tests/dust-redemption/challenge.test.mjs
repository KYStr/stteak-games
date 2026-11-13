import test from "node:test";
import assert from "node:assert/strict";
import { MISSIONS } from "../../games/dust-redemption/content.js";
import {
  deadlineFor,
  createClock,
  tickClock,
} from "../../games/dust-redemption/challenge.js";
import {
  createProfile,
  beginMission,
  failMission,
  normalizeProfile,
  validateProfile,
} from "../../games/dust-redemption/rules.js";
test("six Standard budgets, Hard at 80%, Story untimed", () => {
  assert.deepEqual(
    MISSIONS.map((m) => deadlineFor(m.id)),
    [600, 660, 720, 780, 840, 900],
  );
  for (const m of MISSIONS) {
    assert.equal(deadlineFor(m.id, "hard"), deadlineFor(m.id) * 0.8);
    assert.equal(deadlineFor(m.id, "story"), null);
  }
});
test("deadline uses processed unscaled simulation only and deduplicates warnings", () => {
  const c = createClock("dry-mail", "standard");
  for (const flags of [
    [false, true, true],
    [true, false, true],
    [true, true, false],
  ])
    tickClock(c, 0.05, ...flags);
  assert.equal(c.activeSeconds, 0);
  tickClock(c, 30, true, true, true);
  assert.equal(c.activeSeconds, 0.05);
  const warnings = [];
  for (let i = 0; i < 12001; i++) {
    const event = tickClock(c, 0.05, true, true, true);
    if (event) warnings.push(event);
  }
  assert.deepEqual(warnings, [1, 2, 3]);
  assert.equal(c.remainingSeconds, 0);
  assert.equal(c.failureReason, "deadline");
  const atTimeout = c.activeSeconds;
  tickClock(c, 0.05, true, true, true);
  assert.equal(c.activeSeconds, atTimeout);
  const story = createClock("dry-mail", "story");
  for (let i = 0; i < 13000; i++) tickClock(story, 0.05, true, true, true);
  assert.equal(story.failureReason, null);
});
test("new runs are Standard; old active runs migrate untimed and retry restores immutable snapshot", () => {
  const original = createProfile(),
    b = beginMission(original, "dry-mail");
  assert.equal(b.run.difficulty, "standard");
  assert.ok(validateProfile(b.profile));
  const legacy = structuredClone(b.profile);
  delete legacy.activeRun.difficulty;
  delete legacy.activeRun.seed;
  const migrated = normalizeProfile(legacy);
  assert.equal(migrated.activeRun.difficulty, "story");
  assert.equal(migrated.activeRun.seed, 17);
  assert.deepEqual(failMission(b.profile, b.run).profile, original);
  const retry = beginMission(
    failMission(b.profile, b.run).profile,
    "dry-mail",
    { difficulty: b.run.difficulty, seed: b.run.seed },
  );
  assert.equal(retry.run.seed, b.run.seed);
  assert.equal(retry.run.difficulty, b.run.difficulty);
  b.profile.activeRun.difficulty = "instant";
  assert.equal(validateProfile(b.profile), false);
});
