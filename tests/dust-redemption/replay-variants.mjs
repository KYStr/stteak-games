import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { encounterFor } from "../../games/dust-redemption/encounter-variants.js";
import { url, action, mode, snapshot, walk } from "./driver.mjs";
import { completeMail } from "./campaign.mjs";
export async function replayVariants(page, evidence, pass) {
  const earned = (await snapshot(page)).profile;
  const seeds = [];
  for (const profile of ["patient-watch", "scarce-ammunition"])
    for (let seed = 0; seed < 1000; seed++)
      if (encounterFor("dry-mail", seed).profile === profile) {
        seeds.push(seed);
        break;
      }
  const runs = [];
  for (const seed of seeds) {
    await page.goto(url);
    await mode(page, "title");
    await action(page, "hub");
    await action(page, "brief", "[data-id=dry-mail]");
    await page.locator("#loadout-seed").fill(String(seed));
    await page.selectOption("#loadout-difficulty", "standard");
    await page.selectOption("#loadout-weapon", "rifle");
    await page.selectOption("#loadout-item", "medkit");
    assert.match(
      await page.locator("#encounter-preview").innerText(),
      new RegExp(encounterFor("dry-mail", seed).name),
    );
    await action(page, "deploy");
    await mode(page, "playing");
    const initial = await snapshot(page),
      enemy = initial.enemies[0];
    await walk(page, { x: enemy.x, z: enemy.z + 4 }, 0.3);
    await page.waitForTimeout(5000);
    const sample = await snapshot(page);
    assert.equal(sample.mode, "playing");
    // Actual identical input, measured enemy magazines/rounds/cadence and damage.
    runs.push({
      seed,
      encounter: sample.encounter,
      initial: initial.enemies,
      sample: sample.enemies,
      damage: sample.stats.damageTaken,
      activeSeconds: sample.challenge.activeSeconds,
    });
    if (sample.player.hp < 65) await page.keyboard.press("KeyF");
    await completeMail(page);
    const result = (await snapshot(page)).profile;
    assert.equal(result.wallet, earned.wallet);
    assert.deepEqual(result.choices, earned.choices);
    assert.deepEqual(result.history, earned.history);
    await action(page, "hub");
    await page.reload();
    await mode(page, "title");
    const persisted = (await snapshot(page)).profile;
    assert.equal(persisted.challenges["dry-mail"].last.seed, seed);
    assert.equal(persisted.challenges["dry-mail"].last.difficulty, "standard");
    assert.ok(
      Object.keys(persisted.challenges["dry-mail"].records).length >=
        runs.length,
    );
  }
  assert.notDeepEqual(
    runs[0].sample.map((e) => e.rounds),
    runs[1].sample.map((e) => e.rounds),
  );
  await writeFile(
    `${evidence}/seeded-replay-encounters.json`,
    JSON.stringify(runs, null, 2),
  );
  await action(page, "hub");
  pass(
    "two selected seeds: distinct measured reserves/cadence, actual-input completion, comparable records persist without story rewards",
  );
}
export async function resultPresentation(page, evidence, id) {
  const old = page.viewportSize();
  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    const text = await page.locator("#overlay").innerText();
    assert.doesNotMatch(
      text,
      /worker-\d+|signal-message-\d+|pact-supply-deed-receipt|night-party-arrival-receipt|ledger-custody-receipt/,
    );
    assert.match(text, /委託完成/);
    if (id === "last-signal") {
      for (const name of ["014 艾達", "027 巴斯", "031 柯爾", "046 黛拉"])
        assert.ok(text.includes(name));
      assert.match(text, /本次發送與南側回覆已核對一致/);
    }
    await page.screenshot({
      path: `${evidence}/${id}-result-${viewport.width}.png`,
    });
  }
  await page.setViewportSize(old);
}
