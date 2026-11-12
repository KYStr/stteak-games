import assert from "node:assert/strict";
import { readFile, writeFile, copyFile } from "node:fs/promises";
import { url, action, mode, snapshot } from "./driver.mjs";
import { MISSIONS } from "../../games/dust-redemption/content.js";
import { campaignFunctions } from "./campaign.mjs";
import { alternateRoutes } from "./alternatives.mjs";
import { replayVariants, resultPresentation } from "./replay-variants.mjs";
import {
  performanceGate,
  renderedRebuilds,
  activePerformanceGate,
} from "./performance.mjs";
import { regressions } from "./regressions.mjs";
export async function runPhase(phase, page, evidence, pass, report) {
  assert.ok(
    [
      "campaign",
      "alternatives",
      "variants",
      "performance",
      "lifecycle",
      "rebuilds",
      "workloads",
    ].includes(phase),
    "DUST_PHASE: campaign, alternatives, variants, performance, lifecycle, rebuilds",
  );
  if (phase === "campaign") {
    await page.goto(url + "?touch=1");
    await mode(page, "title");
    await action(page, "hub");
    report.campaign = "uninterrupted new profile";
    if (process.env.DUST_CAMPAIGN_RESUME) {
      const fixture = JSON.parse(
        await readFile(process.env.DUST_CAMPAIGN_RESUME, "utf8"),
      );
      report.campaign = "earned checkpoint continuation";
      report.checkpoint = process.env.DUST_CAMPAIGN_RESUME;
      await page.evaluate(
        (p) =>
          localStorage.setItem(
            "stteak:dust-redemption:profile:v2",
            JSON.stringify(p),
          ),
        fixture,
      );
      await page.reload();
      await mode(page, "title");
      await action(page, "hub");
    }
    let d = await snapshot(page);
    for (let i = d.profile.completed.length; i < 6; i++) {
      const m = MISSIONS[i];
      await action(page, "brief", `[data-id="${m.id}"]`);
      if (m.id === "dawn-pact")
        await page.selectOption("#loadout-item", "smoke");
      await action(page, "deploy");
      await mode(page, "playing");
      await campaignFunctions[i](page);
      d = await snapshot(page);
      assert.equal(d.profile.completed.at(-1), m.id);
      await writeFile(
        `${evidence}/${m.id}-earned.json`,
        JSON.stringify(d.profile, null, 2),
      );
      await resultPresentation(page, evidence, m.id);
      pass(`earned chapter ${m.id}`);
      await action(page, "hub");
      await page.reload();
      await mode(page, "title");
      await action(page, "hub");
    }
    await action(page, "ending");
    await mode(page, "ending");
    await page.screenshot({ path: `${evidence}/earned-ending.png` });
    report.activeSeconds = (await snapshot(page)).profile.history.reduce(
      (n, r) => n + r.stats.activeSeconds,
      0,
    );
    assert.ok(
      report.activeSeconds >= 600,
      `active content below 600 simulation seconds: ${report.activeSeconds}`,
    );
    pass(
      "six expanded contracts and ending; at least 600 seconds of real active work",
    );
    return;
  }
  const source = process.env.DUST_CHECKPOINT_DIR || evidence;
  for (const m of MISSIONS)
    if (source !== evidence)
      await copyFile(
        `${source}/${m.id}-earned.json`,
        `${evidence}/${m.id}-earned.json`,
      );
  const profile = JSON.parse(
    await readFile(`${evidence}/dawn-pact-earned.json`, "utf8"),
  );
  report.fixture = {
    label: "actually earned campaign profile; diagnostic phase",
    source,
  };
  await page.goto(url);
  await mode(page, "title");
  await page.evaluate(
    (p) =>
      localStorage.setItem(
        "stteak:dust-redemption:profile:v2",
        JSON.stringify(p),
      ),
    profile,
  );
  await page.reload();
  await mode(page, "title");
  await action(page, "hub");
  if (phase === "alternatives") await alternateRoutes(page, evidence, pass);
  if (phase === "variants") await replayVariants(page, evidence, pass);
  if (phase === "lifecycle") await regressions(page, pass);
  if (phase === "performance") {
    await action(page, "brief", "[data-id=dry-mail]");
    await action(page, "deploy");
    await mode(page, "playing");
    report.performance = await performanceGate(page, evidence, pass);
  }
  if (phase === "workloads") {
    await action(page, "brief", "[data-id=dry-mail]");
    await action(page, "deploy");
    await mode(page, "playing");
    report.performance = await activePerformanceGate(page, evidence, pass);
  }
  if (phase === "rebuilds") {
    await action(page, "brief", "[data-id=dry-mail]");
    await action(page, "deploy");
    await mode(page, "playing");
    await page.waitForTimeout(5000);
    await page.waitForFunction(
      () =>
        dustDiagnostics().audio.decoded === 11 &&
        document.fonts.status === "loaded",
    );
    const client = await page.context().newCDPSession(page);
    const warmups = Number(process.env.DUST_REBUILD_WARMUPS ?? 10);
    report.warmup = warmups
      ? await renderedRebuilds(page, client, evidence, {
          count: warmups,
          warmup: true,
        })
      : [];
    report.scope =
      "diagnostic rebuild sequence, with heap snapshots at cycles 0/5/9; excludes other performance workloads";
    report.rebuilds = await renderedRebuilds(page, client, evidence, {
      snapshots: true,
      count: Number(process.env.DUST_REBUILD_COUNT || 10),
    });
    await client.detach();
    pass(
      "diagnostic ten rendered rebuilds with retained constructor/ownership snapshots",
    );
  }
}
