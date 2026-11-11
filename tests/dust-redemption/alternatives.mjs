import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { url, action, mode, snapshot } from "./driver.mjs";
import {
  completeWater,
  completeSignal,
  completeLedger,
  completeNight,
  completePact,
} from "./campaign.mjs";
const key = "stteak:dust-redemption:profile:v2";
// Explicit chapter-access fixtures, separate from the uninterrupted earned campaign.
export async function alternateRoutes(page, evidence, pass) {
  const original = (await snapshot(page)).profile;
  for (const [before, id, fn, route] of [
    ["dry-mail", "broken-water", completeWater, "civilian-boost"],
    ["broken-water", "last-signal", completeSignal, "public-dispatch"],
    ["last-signal", "black-ledger", completeLedger, "notice-copy"],
    ["black-ledger", "long-night", completeNight, "east-ridge"],
    ["long-night", "dawn-pact", completePact, "assault-siding"],
  ]) {
    const fixture = JSON.parse(
      await readFile(`${evidence}/${before}-earned.json`, "utf8"),
    );
    await page.goto(url + "?touch=1");
    await mode(page, "title");
    await page.evaluate(
      ({ key, fixture }) => localStorage.setItem(key, JSON.stringify(fixture)),
      { key, fixture },
    );
    await page.reload();
    await mode(page, "title");
    await action(page, "hub");
    await action(page, "brief", `[data-id="${id}"]`);
    if (id === "dawn-pact") await page.selectOption("#loadout-item", "smoke");
    await action(page, "deploy");
    await mode(page, "playing");
    await fn(page, route);
    const d = await snapshot(page);
    assert.equal(d.profile.completed.at(-1), id);
    assert.equal(d.profile.history.at(-1).strategy, "nonlethal");
    await writeFile(
      `${evidence}/fixture-alternate-${id}.json`,
      JSON.stringify(
        { fixture: true, route, history: d.profile.history.at(-1) },
        null,
        2,
      ),
    );
    pass(`labelled physical alternative fixture: ${id}/${route}`);
  }
  await page.evaluate(
    ({ key, original }) => localStorage.setItem(key, JSON.stringify(original)),
    { key, original },
  );
  await page.reload();
  await mode(page, "title");
  await action(page, "hub");
}
