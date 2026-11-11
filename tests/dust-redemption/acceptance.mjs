import assert from "node:assert/strict";
import { spawn, execFileSync } from "node:child_process";
import { mkdir, writeFile, readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "/workspace/stteak8/tools/node_modules/playwright-core/index.mjs";
import { url, port, start, walk, snapshot, action, mode } from "./driver.mjs";
import {
  completeMail,
  campaignFunctions,
  prematureExtraction,
} from "./campaign.mjs";
import { regressions, audioSignal } from "./regressions.mjs";
import { performanceGate } from "./performance.mjs";
import { alternateRoutes } from "./alternatives.mjs";
import { MISSIONS } from "../../games/dust-redemption/content.js";
import { endingFor } from "../../games/dust-redemption/rules.js";
const root = fileURLToPath(new URL("../../", import.meta.url));
const evidence =
  process.env.DUST_EVIDENCE_DIR || "/tmp/dust-redemption-acceptance";
await mkdir(evidence, { recursive: true });
const report = {
  checks: [],
  errors: [],
  failedRequests: [],
  performance: null,
  intentionalNavigationAborts: 0,
};
const pass = (name) => {
  report.checks.push(name);
  console.log(`PASS ${name}`);
};
let server, browser;
try {
  if (process.env.DUST_SKIP_BUILD !== "1")
    execFileSync("node", ["games/dust-redemption/build.mjs"], {
      cwd: root,
      stdio: "inherit",
    });
  const unitFiles = (
    await readdir(new URL("../games/dust-redemption/", import.meta.url))
  )
    .filter((f) => f.endsWith(".test.js"))
    .map((f) => `tests/games/dust-redemption/${f}`);
  const extra = (await readdir(new URL("./", import.meta.url)))
    .filter((f) => f.endsWith(".test.mjs"))
    .map((f) => `tests/dust-redemption/${f}`);
  execFileSync("node", ["--test", ...unitFiles, ...extra], {
    cwd: root,
    stdio: "inherit",
  });
  pass("unit tests");
  for (const f of await readdir(
    new URL("../../games/dust-redemption/", import.meta.url),
  ))
    if (/\.(js|css|html)$/.test(f))
      assert.equal(
        await readFile(
          new URL(`../../games/dust-redemption/${f}`, import.meta.url),
          "utf8",
        ),
        await readFile(
          new URL(`../../public/games/dust-redemption/${f}`, import.meta.url),
          "utf8",
        ),
        `source/runtime mismatch: ${f}`,
      );
  async function equalAssets(relative = "assets/") {
    for (const entry of await readdir(
      new URL(`../../games/dust-redemption/${relative}`, import.meta.url),
      { withFileTypes: true },
    )) {
      const path = relative + entry.name;
      if (entry.isDirectory()) await equalAssets(path + "/");
      else
        assert.deepEqual(
          await readFile(
            new URL(`../../games/dust-redemption/${path}`, import.meta.url),
          ),
          await readFile(
            new URL(
              `../../public/games/dust-redemption/${path}`,
              import.meta.url,
            ),
          ),
          `source/runtime asset mismatch: ${path}`,
        );
    }
  }
  await equalAssets();
  pass("complete source/runtime and original-asset equality");
  try {
    await fetch(url, { signal: AbortSignal.timeout(2000) });
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
        `${root}/public`,
      ],
      { stdio: "ignore" },
    );
    for (let n = 0; n < 40; n++) {
      await new Promise((r) => setTimeout(r, 100));
      try {
        if ((await fetch(url, { signal: AbortSignal.timeout(2000) })).ok) break;
      } catch {}
    }
  }
  assert.equal(
    await (
      await fetch(new URL("game.js", url), {
        signal: AbortSignal.timeout(3000),
      })
    ).text(),
    await readFile(
      new URL("../../public/games/dust-redemption/game.js", import.meta.url),
      "utf8",
    ),
    `port ${port} must serve this working tree`,
  );
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
  page.on("requestfailed", (r) => {
    if (report.navigating && r.failure()?.errorText?.includes("ERR_ABORTED"))
      report.intentionalNavigationAborts++;
    else report.failedRequests.push(`${r.url()} ${r.failure()?.errorText}`);
  });
  for (const method of ["goto", "reload"]) {
    const original = page[method].bind(page);
    page[method] = async (...args) => {
      await page.waitForLoadState("networkidle").catch(() => {});
      report.navigating = true;
      try {
        return await original(...args);
      } finally {
        await page.waitForLoadState("networkidle").catch(() => {});
        report.navigating = false;
      }
    };
  }
  page.on("response", (r) => {
    if (r.status() >= 400)
      report.failedRequests.push(`${r.status()} ${r.url()}`);
  });
  await page.addInitScript(() => {
    const Native = window.AudioContext;
    window.__qaContexts = [];
    window.__qaBufferDurations = [];
    const connect = AudioNode.prototype.connect;
    window.__nativeConnect = connect;
    AudioNode.prototype.connect = function (destination, ...args) {
      if (destination === this.context.destination && this.context.__tap)
        connect.call(this, this.context.__tap);
      return connect.call(this, destination, ...args);
    };
    window.AudioContext = class extends Native {
      createBufferSource() {
        const source = super.createBufferSource(),
          start = source.start.bind(source);
        source.start = (...args) => {
          window.__qaBufferDurations.push(source.buffer?.duration || 0);
          return start(...args);
        };
        return source;
      }
      constructor(...args) {
        super(...args);
        this.__tap = this.createAnalyser();
        this.__tap.fftSize = 2048;
        window.__qaContexts.push(this);
      }
    };
    const raf = requestAnimationFrame.bind(window),
      cancel = cancelAnimationFrame.bind(window),
      pending = new Set();
    window.__raf = { peak: 0 };
    Object.defineProperty(__raf, "pending", { get: () => pending.size });
    window.requestAnimationFrame = (fn) => {
      const id = raf((t) => {
        pending.delete(id);
        fn(t);
      });
      pending.add(id);
      __raf.peak = Math.max(__raf.peak, pending.size);
      return id;
    };
    window.cancelAnimationFrame = (id) => {
      pending.delete(id);
      cancel(id);
    };
  });
  await regressions(page, pass);
  await page.goto(url);
  await mode(page, "title");
  assert.equal((await snapshot(page)).audio.state, "uninitialized");
  await page.screenshot({ path: `${evidence}/title-1280.png` });
  await action(page, "settings");
  await page.locator("[data-setting=reduced]").check();
  await page.locator("[data-setting=music]").fill("0.25");
  await page.locator("[data-setting=music]").dispatchEvent("input");
  await action(page, "close-sheet");
  await action(page, "hub");
  await page.waitForFunction(() => dustDiagnostics().audio.decoded === 11);
  assert.equal((await snapshot(page)).audio.state, "running");
  assert.deepEqual((await snapshot(page)).audio.errors, []);
  pass("gesture audio unlock, all 11 WAVs decoded, settings applied");
  await page.keyboard.press("Shift+Tab");
  assert.ok(
    await page.evaluate(() =>
      document.getElementById("overlay").contains(document.activeElement),
    ),
  );
  pass("menu focus containment");
  await audioSignal(page, pass);
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({ path: `${evidence}/hub-1920.png` });
  assert.ok(
    await page
      .locator(".panel")
      .evaluate((el) => el.getBoundingClientRect().height <= innerHeight),
  );
  await page.setViewportSize({ width: 1280, height: 720 });
  await action(page, "brief");
  await action(page, "deploy");
  await mode(page, "playing");
  await page.keyboard.down("KeyD");
  await page.waitForTimeout(200);
  await page.evaluate(() => window.dispatchEvent(new Event("blur")));
  await page.keyboard.up("KeyD");
  await mode(page, "paused");
  const atPause = (await snapshot(page)).player;
  await page.waitForTimeout(250);
  assert.deepEqual((await snapshot(page)).player, atPause);
  assert.equal((await snapshot(page)).audio.state, "suspended");
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await action(page, "resume");
  await mode(page, "playing");
  await page.evaluate(async () => {
    await window.__qaContexts[0].suspend();
  });
  await page.keyboard.press("KeyR");
  await page.waitForFunction(() => dustDiagnostics().audio.state === "running");
  pass(
    "blur freezes game and input; explicit resume and suspended audio recovery",
  );
  const beforeReload = (await snapshot(page)).profile;
  await page.reload();
  await mode(page, "title");
  await action(page, "hub");
  await action(page, "recover");
  await mode(page, "playing");
  const restored = await snapshot(page);
  assert.equal(restored.mission, "dry-mail");
  assert.equal(restored.player.hp, 100);
  assert.equal(restored.profile.wallet, beforeReload.wallet);
  assert.equal(restored.profile.activeRun.id, beforeReload.activeRun.id);
  pass("departure save survives reload and restores safe entry");
  await page.evaluate(() => {
    window.__qaLoss = document
      .getElementById("world")
      .getContext("webgl2")
      .getExtension("WEBGL_lose_context");
    window.__qaLoss.loseContext();
  });
  await mode(page, "paused");
  await page.waitForTimeout(300);
  await page.evaluate(() => window.__qaLoss.restoreContext());
  await page.waitForFunction(
    () => dustDiagnostics().render.contextLost === false,
  );
  await action(page, "resume");
  await mode(page, "playing");
  pass("WebGL context loss and restoration retain the mission");
  await page.goto(url + "?touch=1");
  await mode(page, "title");
  await action(page, "hub");
  await action(page, "recover");
  await mode(page, "playing");
  await prematureExtraction(page);
  await completeMail(page);
  assert.equal((await snapshot(page)).profile.completed[0], "dry-mail");
  assert.equal((await snapshot(page)).profile.activeRun, null);
  await page.screenshot({ path: `${evidence}/contract-result.png` });
  pass(
    "real-input first contract: evidence, machinery, negotiation, transport, receipt, extraction",
  );
  await action(page, "hub");
  await page.reload();
  await mode(page, "title");
  await action(page, "hub");
  assert.equal((await snapshot(page)).profile.completed.length, 1);
  assert.equal(
    await page.locator("[data-action=brief]:not(:disabled)").count(),
    2,
  );
  pass("completed story and next unlock persist after reload");
  await writeFile(
    `${evidence}/dry-mail-earned.json`,
    JSON.stringify((await snapshot(page)).profile, null, 2),
  );
  for (let i = 1; i < MISSIONS.length; i++) {
    const m = MISSIONS[i];
    await action(page, "brief", `[data-id="${m.id}"]`);
    if (m.id === "dawn-pact") await page.selectOption("#loadout-item", "smoke");
    await action(page, "deploy");
    await mode(page, "playing");
    await prematureExtraction(page);
    await campaignFunctions[i](page);
    const d = await snapshot(page);
    assert.deepEqual(
      d.profile.completed,
      MISSIONS.slice(0, i + 1).map((x) => x.id),
    );
    assert.equal(d.profile.activeRun, null);
    assert.equal(d.profile.history.length, i + 1);
    assert.equal(new Set(d.profile.rewards).size, i + 1);
    if (m.choice)
      assert.equal(d.profile.choices[m.choice.key], m.choice.options[0].id);
    await writeFile(
      `${evidence}/${m.id}-earned.json`,
      JSON.stringify(d.profile, null, 2),
    );
    await page.screenshot({ path: `${evidence}/${m.id}-result.png` });
    await action(page, "hub");
    await page.reload();
    await mode(page, "title");
    assert.deepEqual(
      (await snapshot(page)).profile.completed,
      d.profile.completed,
    );
    await action(page, "hub");
    pass(
      `earned physical campaign ${m.id}: receipt, extraction, single reward, persistence`,
    );
  }
  const earned = (await snapshot(page)).profile;
  await action(page, "ending");
  await mode(page, "ending");
  assert.match(
    await page.locator("#overlay").innerText(),
    new RegExp(endingFor(earned).title),
  );
  await page.screenshot({ path: `${evidence}/earned-ending.png` });
  await action(page, "hub");
  await action(page, "brief", "[data-id=dry-mail]");
  await page.selectOption("#loadout-weapon", "rifle");
  await page.selectOption("#loadout-item", "smoke");
  await action(page, "deploy");
  await mode(page, "playing");
  await completeMail(page);
  const replay = (await snapshot(page)).profile;
  assert.equal(replay.wallet, earned.wallet);
  assert.deepEqual(replay.choices, earned.choices);
  assert.deepEqual(replay.history, earned.history);
  assert.equal(replay.challenges["dry-mail"].attempts, 1);
  await action(page, "hub");
  pass(
    "continuous new-profile six-contract ending and alternate-equipment replay preserve story/wallet",
  );
  await alternateRoutes(page, evidence, pass);
  await page.goto(url);
  await mode(page, "title");
  await action(page, "hub");
  await action(page, "brief", "[data-id=dry-mail]");
  await page.selectOption("#loadout-item", "medkit");
  await page.selectOption("#loadout-weapon", "rifle");
  await action(page, "deploy");
  await mode(page, "playing");
  await completeMail(page, { combat: true, route: "direct" });
  assert.equal(
    (await snapshot(page)).profile.challenges["dry-mail"].last.strategy,
    "combat",
  );
  assert.equal((await snapshot(page)).profile.wallet, earned.wallet);
  await action(page, "hub");
  pass(
    "real combat route: all existing guards defeated, direct-line same crate delivered, named receipt and extraction",
  );
  await action(page, "brief", '[data-id="dry-mail"]');
  await action(page, "deploy");
  await mode(page, "playing");
  const guard = (await snapshot(page)).enemies.find((e) => e.id === "mail-1");
  await walk(page, { x: guard.x, z: guard.z + 2 }, 0.3);
  await page.mouse.move(650, 310);
  await page.mouse.down();
  await page.waitForTimeout(200);
  await page.mouse.up();
  assert.ok((await snapshot(page)).stats.shots >= 1);
  await page.waitForFunction(() => dustDiagnostics().mode === "dead", null, {
    timeout: 90000,
  });
  await action(page, "retry");
  await mode(page, "playing");
  assert.equal((await snapshot(page)).player.hp, 100);
  assert.equal((await snapshot(page)).profile.completed.length, 6);
  const sounds = await page.evaluate(() => window.__qaBufferDurations);
  assert.ok(
    sounds.some((n) => Math.abs(n - 0.3) < 0.001),
    "decoded rifle effect actually started",
  );
  assert.ok(
    sounds.some((n) => Math.abs(n - 0.18) < 0.001),
    "decoded footstep effect actually started",
  );
  pass(
    "combat loss and retry preserve the finished story; real rifle/step buffer playback",
  );
  await page.goto(url);
  await mode(page, "title");
  await action(page, "hub");
  await action(page, "recover");
  await mode(page, "playing");
  report.performance = await performanceGate(page, evidence, pass);
  // Exercise damaged and old data in the same browser after the completed campaign was verified.
  await page.evaluate(() =>
    localStorage.setItem("stteak:dust-redemption:profile:v2", "{broken"),
  );
  await page.reload();
  await mode(page, "title");
  assert.equal((await snapshot(page)).profile.completed.length, 0);
  assert.match(await page.locator("#overlay").innerText(), /損毀/);
  await action(page, "hub");
  await action(page, "brief");
  await action(page, "deploy");
  await mode(page, "playing");
  assert.equal(
    await page.evaluate(() =>
      localStorage.getItem("stteak:dust-redemption:profile:v2:recovery"),
    ),
    "{broken",
  );
  pass("corrupt save is safely preserved before replacement");
  await page.goto(url + "?touch=1");
  await mode(page, "title");
  await action(page, "hub");
  await action(page, "recover");
  await mode(page, "playing");
  const pad = await page.locator("#move-pad").boundingBox();
  await page.mouse.move(pad.x + pad.width / 2, pad.y + pad.height / 2);
  await page.mouse.down();
  await page.mouse.move(pad.x + pad.width * 0.78, pad.y + pad.height / 2);
  await page.waitForTimeout(250);
  await page.keyboard.press("Escape");
  await mode(page, "paused");
  await page.mouse.up();
  await action(page, "resume");
  const neutral = (await snapshot(page)).player;
  await page.waitForTimeout(250);
  assert.equal((await snapshot(page)).player.x, neutral.x);
  assert.equal((await snapshot(page)).player.z, neutral.z);
  const fire = await page.locator("#touch-fire").boundingBox();
  await page.mouse.move(fire.x + fire.width / 2, fire.y + fire.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(150);
  await page.keyboard.press("Escape");
  await page.mouse.up();
  assert.equal((await snapshot(page)).player.firing, false);
  assert.equal((await snapshot(page)).player.aiming, false);
  await action(page, "resume");
  await page.screenshot({ path: `${evidence}/touch-1280.png` });
  pass("touch move/fire capture is released by pause");
  await page.evaluate(() => {
    const profile = dustDiagnostics().profile;
    profile.schema = 1;
    profile.activeRun = null;
    profile.safeSnapshot = null;
    localStorage.setItem(
      "stteak:dust-redemption:profile:v2",
      JSON.stringify(profile),
    );
  });
  await page.reload();
  await mode(page, "title");
  assert.equal((await snapshot(page)).profile.schema, 2);
  assert.match(await page.locator("#overlay").innerText(), /舊版/);
  pass("schema-1 browser save migrates safely");
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.failedRequests, []);
  pass("zero browser errors or failed asset requests");
  console.log(JSON.stringify(report.performance, null, 2));
} catch (error) {
  report.failure = error.stack;
  console.error(error);
  process.exitCode = 1;
  try {
    const failedPage = browser?.contexts()[0]?.pages()[0];
    if (failedPage) {
      await failedPage.screenshot({
        path: `${evidence}/failure.png`,
        timeout: 10000,
      });
      await writeFile(
        `${evidence}/failure-state.json`,
        JSON.stringify(await snapshot(failedPage), null, 2),
      );
    }
  } catch {}
} finally {
  await browser?.close();
  if (server && server.exitCode === null) {
    const exited = new Promise((resolve) => server.once("exit", resolve));
    server.kill();
    await exited;
  }
  await writeFile(
    `${evidence}/acceptance.json`,
    JSON.stringify(report, null, 2),
  );
  console.log(`Evidence: ${evidence}`);
}
