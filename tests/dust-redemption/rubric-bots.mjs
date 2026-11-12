// Actual-input calibration. Chapter access fixtures are labelled, never reported
// as earned story progress. No clock mutation, teleport or accelerated simulation.
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { spawn, execFileSync } from "node:child_process";
import { chromium } from "/workspace/stteak8/tools/node_modules/playwright-core/index.mjs";
import { MISSIONS } from "../../games/dust-redemption/content.js";
import {
  seededRandom,
  encounterFor,
} from "../../games/dust-redemption/encounter-variants.js";
import { createProfile } from "../../games/dust-redemption/rules.js";
import { campaignFunctions } from "./campaign.mjs";
import { url, port, snapshot, action, mode } from "./driver.mjs";
const evidence = process.env.DUST_EVIDENCE_DIR || "/tmp/dust-rubric-bots";
await mkdir(evidence, { recursive: true });
let server, browser;
const report = {
  errors: [],
  failedRequests: [],
  competent: [],
  random: null,
  idle: null,
  stageMetrics: [],
};
async function install(page, profile) {
  await page.goto(url + "?touch=1");
  await mode(page, "title");
  await page.evaluate((p) => {
    localStorage.clear();
    localStorage.setItem(
      "stteak:dust-redemption:profile:v2",
      JSON.stringify(p),
    );
    localStorage.setItem(
      "stteak:dust-redemption:settings",
      JSON.stringify({ reduced: true }),
    );
  }, profile);
  await page.reload();
  await mode(page, "title");
  await action(page, "hub");
}
async function deploy(page, id, seed = 17) {
  await action(page, "brief", `[data-id="${id}"]`);
  await page.selectOption("#loadout-difficulty", "standard");
  if (await page.locator("#loadout-seed").isEditable())
    await page.locator("#loadout-seed").fill(String(seed));
  if (id === "dawn-pact") await page.selectOption("#loadout-item", "smoke");
  await action(page, "deploy");
  await mode(page, "playing");
}
const summarize = (d, start) => ({
  wallSeconds: (Date.now() - start) / 1000,
  activeSeconds: d.challenge?.activeSeconds,
  activeWallSeconds: d.challenge?.activeWallSeconds,
  remainingSeconds: d.challenge?.remainingSeconds,
  failureReason: d.challenge?.failureReason,
  mode: d.mode,
  damage: d.stats.damageTaken,
  clues: d.clues.length,
  objectives: d.field?.state.completed.length || 0,
  completed: d.profile.completed.length,
  seed: d.encounter?.seed,
  profile: d.encounter?.profile,
  choices: d.field?.state.choices,
  encounter: d.encounter,
});
try {
  if (process.env.DUST_SKIP_BUILD !== "1")
    execFileSync("node", ["games/dust-redemption/build.mjs"], {
      stdio: "inherit",
    });
  try {
    await fetch(url, { signal: AbortSignal.timeout(1500) });
  } catch {
    server = spawn(
      "python3",
      [
        "-m",
        "http.server",
        String(port),
        "--bind",
        "127.0.0.1",
        "--directory",
        "public",
      ],
      { stdio: "ignore" },
    );
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 100));
      try {
        if ((await fetch(url)).ok) break;
      } catch {}
    }
  }
  browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });
  page.setDefaultTimeout(120000);
  page.on("pageerror", (e) => report.errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") report.errors.push(m.text());
  });
  const before = [],
    after = [];
  await install(page, createProfile());
  // The complete acceptance run can supply its actual earned snapshots, avoiding
  // a redundant first campaign. These contain real input receipts, not unlock fixtures.
  if (process.env.DUST_BOT_EARNED_DIR) {
    for (let i = 0; i < MISSIONS.length; i++) {
      const p = JSON.parse(
        await readFile(
          `${process.env.DUST_BOT_EARNED_DIR}/${MISSIONS[i].id}-earned.json`,
          "utf8",
        ),
      );
      const r = p.history.at(-1);
      assert.equal(r.missionId, MISSIONS[i].id);
      assert.equal(r.difficulty, "standard");
      assert.ok(r.stats.activeWallSeconds > 0);
      before[i] = i ? after[i - 1] : createProfile();
      after[i] = p;
      report.competent.push({
        chapter: r.missionId,
        attempt: 1,
        chapterAccessFixture: false,
        source: "earned acceptance campaign",
        success: true,
        activeSeconds: r.stats.activeSeconds,
        activeWallSeconds: r.stats.activeWallSeconds,
        remainingSeconds: 600 + i * 60 - r.stats.activeSeconds,
        damage: r.stats.damageTaken,
        choices: r.fieldChoices,
        seed: r.seed,
        profile: r.encounterProfile,
      });
    }
  } else {
    for (let i = 0; i < MISSIONS.length; i++) {
      before[i] = (await snapshot(page)).profile;
      await deploy(page, MISSIONS[i].id);
      const start = Date.now();
      await campaignFunctions[i](page);
      const d = await snapshot(page);
      after[i] = d.profile;
      report.competent.push({
        chapter: MISSIONS[i].id,
        attempt: 1,
        chapterAccessFixture: false,
        success: true,
        ...summarize(d, start),
      });
      await writeFile(
        `${evidence}/${MISSIONS[i].id}-earned.json`,
        JSON.stringify(d.profile, null, 2),
      );
      await action(page, "hub");
      console.log(`Competent earned ${MISSIONS[i].id}`);
    }
  }
  // Replay access uses the real earned chapter snapshots. Three total samples
  // per chapter cover all authored profiles without duplicating campaign rewards.
  for (let i = 0; i < MISSIONS.length; i++)
    for (let attempt = 2; attempt <= 3; attempt++) {
      await install(page, after[i]);
      const seeds = [];
      for (let seed = 0; seeds.length < 3; seed++) {
        const e = encounterFor(MISSIONS[i].id, seed);
        if (
          !seeds.some(
            (s) => encounterFor(MISSIONS[i].id, s).profile === e.profile,
          )
        )
          seeds.push(seed);
      }
      const firstProfile = after[i].history.at(-1).encounterProfile,
        alternatives = seeds.filter(
          (seed) => encounterFor(MISSIONS[i].id, seed).profile !== firstProfile,
        );
      await deploy(page, MISSIONS[i].id, alternatives[attempt - 2]);
      const start = Date.now();
      try {
        await campaignFunctions[i](page);
        const d = await snapshot(page);
        report.competent.push({
          chapter: MISSIONS[i].id,
          attempt,
          chapterAccessFixture: true,
          success: true,
          ...summarize(d, start),
        });
      } catch (e) {
        const d = await snapshot(page);
        report.competent.push({
          chapter: MISSIONS[i].id,
          attempt,
          chapterAccessFixture: true,
          success: false,
          error: e.message,
          ...summarize(d, start),
        });
      }
      await writeFile(
        `${evidence}/bots-progress.json`,
        JSON.stringify(report, null, 2),
      );
      console.log(`Competent ${MISSIONS[i].id} attempt ${attempt}`);
    }
  for (const m of MISSIONS) {
    const runs = report.competent.filter((r) => r.chapter === m.id);
    report.stageMetrics.push({
      id: m.id,
      count: m.enemies.length,
      types: m.enemies.map((e) => e.type),
      deadline: 600 + 60 * MISSIONS.indexOf(m),
      failureRate: runs.filter((r) => !r.success).length / runs.length,
      maxSuccessfulActiveSeconds: Math.max(
        ...runs.filter((r) => r.success).map((r) => r.activeSeconds),
      ),
    });
  }
  // Identical wall budget is reported separately; comparison uses active time.
  await install(page, createProfile());
  await deploy(page, "dry-mail");
  let start = Date.now();
  const random = seededRandom(5821);
  while (true) {
    let d = await snapshot(page);
    if (d.mode === "dead" || d.challenge.activeSeconds >= 300) break;
    if (d.mode === "withdraw") await action(page, "back-playing");
    else if (d.mode === "paused") await action(page, "resume");
    else if (d.mode !== "playing") await page.keyboard.press("Escape");
    const key = [
      "KeyW",
      "KeyA",
      "KeyS",
      "KeyD",
      "KeyE",
      "KeyR",
      "Space",
      "KeyF",
    ][Math.floor(random() * 8)];
    await page.keyboard.down(key);
    await page.waitForTimeout(450);
    await page.keyboard.up(key);
    if (random() < 0.4) {
      await page.mouse.move(150 + random() * 950, 150 + random() * 450);
      await page.mouse.down();
      await page.waitForTimeout(120);
      await page.mouse.up();
    }
  }
  report.random = summarize(await snapshot(page), start);
  console.log("Random complete", report.random.activeSeconds);
  await install(page, createProfile());
  await deploy(page, "dry-mail");
  start = Date.now();
  let last = 0;
  while (true) {
    const d = await snapshot(page);
    if (d.mode === "dead") break;
    assert.equal(d.mode, "playing");
    if (d.challenge.activeSeconds - last >= 30) {
      last = d.challenge.activeSeconds;
      console.log(`Idle active ${last.toFixed(1)}/600s`);
      await writeFile(
        `${evidence}/idle-progress.json`,
        JSON.stringify(summarize(d, start)),
      );
    }
    await page.waitForTimeout(1000);
  }
  report.idle = summarize(await snapshot(page), start);
  assert.equal(report.idle.failureReason, "deadline");
  const safe = (await snapshot(page)).profile;
  await action(page, "retry");
  await mode(page, "playing");
  const retry = await snapshot(page);
  assert.equal(retry.challenge.activeSeconds < 2, true);
  assert.deepEqual(retry.profile.completed, safe.completed);
  for (let i = 1; i < report.stageMetrics.length; i++)
    assert.ok(
      report.stageMetrics[i].failureRate -
        report.stageMetrics[i - 1].failureRate <=
        0.4,
    );
  assert.equal(report.competent.filter((r) => !r.success).length, 0);
  assert.ok(
    report.random.objectives < 3,
    "random clearly underperforms competent",
  );
  assert.deepEqual(report.errors, []);
} catch (e) {
  report.failure = e.stack;
  process.exitCode = 1;
  console.error(e);
} finally {
  await browser?.close();
  if (server) {
    const stopped = new Promise((r) => server.once("exit", r));
    server.kill();
    await stopped;
  }
  await writeFile(
    `${evidence}/rubric-bots.json`,
    JSON.stringify(report, null, 2),
  );
}
