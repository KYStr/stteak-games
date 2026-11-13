import test from "node:test";
import assert from "node:assert/strict";
import { MISSIONS } from "../../games/dust-redemption/content.js";
import {
  encounterFor,
  validSeed,
  challengeKey,
} from "../../games/dust-redemption/encounter-variants.js";
import {
  createProfile,
  beginMission,
  failMission,
  completeMission,
  normalizeProfile,
  validateProfile,
} from "../../games/dust-redemption/rules.js";
test("same uint32 seed gives exact same encounters; approved seeds vary mechanics", () => {
  for (const m of MISSIONS) {
    const variants = Array.from({ length: 20 }, (_, seed) =>
      encounterFor(m.id, seed),
    );
    assert.equal(new Set(variants.map((v) => v.profile)).size, 3);
    for (const v of variants) {
      assert.deepEqual(v, encounterFor(m.id, v.seed));
      assert.deepEqual(
        v.enemies.map((e) => e.id),
        m.enemies.map((e) => e.id),
      );
      for (const [i, e] of v.enemies.entries()) {
        assert.ok(
          e.warningSeconds >= (m.enemies[i].type === "sniper" ? 1.25 : 0.95),
        );
        assert.ok(e.rounds > 0);
      }
      if (m.id === "dawn-pact")
        assert.deepEqual(
          v.enemies.map((e) => e.rounds),
          m.enemies.map((e) => (e.type === "sniper" ? 16 : 30)),
        );
    }
  }
  for (const seed of [-1, 1.2, NaN, 4294967296, "17"]) {
    assert.equal(validSeed(seed), false);
    assert.throws(() => encounterFor("dry-mail", seed));
  }
});
test("seed survives recovery and retry; comparable bests persist without duplicate story rewards", () => {
  const b = beginMission(createProfile(), "dry-mail", {
    seed: 4,
    difficulty: "hard",
  });
  assert.equal(normalizeProfile(b.profile).activeRun.seed, 4);
  const retried = beginMission(
    failMission(b.profile, b.run).profile,
    "dry-mail",
    { seed: b.run.seed, difficulty: b.run.difficulty },
  );
  assert.deepEqual(
    encounterFor("dry-mail", retried.run.seed),
    encounterFor("dry-mail", 4),
  );
  let p = completeMission(b.profile, b.run, {
    strategy: "nonlethal",
    stats: { activeSeconds: 77 },
  }).profile;
  const wallet = p.wallet,
    history = structuredClone(p.history);
  for (const seed of [4, 5]) {
    const replay = beginMission(p, "dry-mail", {
      replay: true,
      seed,
      difficulty: "hard",
    });
    p = completeMission(replay.profile, replay.run, {
      strategy: "nonlethal",
      stats: { activeSeconds: 40 + seed, assisted: true },
    }).profile;
  }
  assert.equal(p.wallet, wallet);
  assert.deepEqual(p.history, history);
  assert.equal(Object.keys(p.challenges["dry-mail"].records).length, 2);
  assert.ok(
    p.challenges["dry-mail"].records[
      challengeKey(p.challenges["dry-mail"].last)
    ],
  );
  assert.ok(validateProfile(p));
  assert.deepEqual(normalizeProfile(p).challenges, p.challenges);
});

test("expanded and legacy fieldwork never share an action-time record key", () => {
  const row = {
    seed: 17,
    encounterProfile: "rapid-relief",
    difficulty: "standard",
    stats: { assisted: true, slowAim: false },
  };
  const old = challengeKey(row);
  assert.equal(old, "17:rapid-relief:standard:assist:normal");
  assert.notEqual(
    challengeKey({ ...row, fieldworkVersion: "fieldwork-authoring-1" }),
    challengeKey({ ...row, fieldworkVersion: "fieldwork-onward-2" }),
  );
  assert.equal(challengeKey(row), old, "legacy keys remain readable unchanged");
});
