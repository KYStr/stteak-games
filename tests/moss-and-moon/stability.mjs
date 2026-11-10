import { chromium } from "/workspace/stteak8/tools/node_modules/playwright-core/index.mjs";
import assert from "node:assert/strict";
import { mkdir, writeFile, access } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
const base = "http://127.0.0.1:8104/games/moss-and-moon/";
const artifacts = process.env.MOSS_ARTIFACTS || "/tmp/moss-and-moon-acceptance";
const backup = artifacts + "/garden-backup.json";
await access(backup); // Produced by the UI campaign test; no synthetic winning state.
await mkdir(artifacts, { recursive: true });
let browser, server;
const errors = [],
  failed = [];
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
try {
  try {
    await fetch(base);
  } catch {
    server = spawn(
      "python3",
      [
        "-m",
        "http.server",
        "8104",
        "--bind",
        "127.0.0.1",
        "--directory",
        fileURLToPath(new URL("../../public/", import.meta.url)),
      ],
      { stdio: "ignore" },
    );
    for (let i = 0; i < 40; i++) {
      await wait(100);
      try {
        if ((await fetch(base)).ok) break;
      } catch {}
    }
  }
  browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    args: [
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--autoplay-policy=no-user-gesture-required",
    ],
  });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
  });
  await page.addInitScript(() => {
    const request = window.requestAnimationFrame.bind(window),
      cancel = window.cancelAnimationFrame.bind(window),
      pending = new Set();
    window.requestAnimationFrame = (fn) => {
      let id = request((time) => {
        pending.delete(id);
        fn(time);
      });
      pending.add(id);
      return id;
    };
    window.cancelAnimationFrame = (id) => {
      pending.delete(id);
      cancel(id);
    };
    window.__pendingFrames = () => pending.size;
  });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("requestfailed", (r) => failed.push(r.url()));
  page.on("response", (r) => {
    if (r.status() >= 400) failed.push(r.status() + " " + r.url());
  });
  await page.goto(base);
  await page.locator("#start").click();
  await page.keyboard.press("Escape");
  await page.locator('[data-open="settings"]').click();
  await page.locator("#import-file").setInputFiles(backup);
  await page.waitForFunction(
    () => window.mossDiagnostics().completedQuests === 8,
  );
  await page.locator("[data-resume]").click();
  await page.waitForFunction(() => window.mossDiagnostics().audio.ready);
  const cdp = await page.context().newCDPSession(page);
  const sample = async () => {
    await cdp.send("HeapProfiler.collectGarbage");
    return {
      heap: await cdp.send("Runtime.getHeapUsage"),
      dom: await cdp.send("Memory.getDOMCounters"),
      runtime: await page.evaluate(() => ({
        diagnostics: window.mossDiagnostics(),
        pendingFrames: window.__pendingFrames(),
      })),
    };
  };
  await page.waitForTimeout(25000);
  const before = await sample();
  const ms = Number(process.env.MOSS_SOAK_MS || 180000),
    start = Date.now();
  while (Date.now() - start < ms) {
    await page.waitForTimeout(Math.min(15000, ms - (Date.now() - start)));
    console.log(
      "Stability",
      Math.round((Date.now() - start) / 1000) + "/" + ms / 1000 + " s",
    );
  }
  const after = await sample();
  assert.equal(after.runtime.pendingFrames, 1);
  assert.equal(before.runtime.pendingFrames, 1);
  assert.equal(after.dom.jsEventListeners, before.dom.jsEventListeners);
  assert.equal(after.dom.nodes, before.dom.nodes);
  assert.equal(
    after.runtime.diagnostics.world.geometries,
    before.runtime.diagnostics.world.geometries,
  );
  assert.equal(
    after.runtime.diagnostics.world.textures,
    before.runtime.diagnostics.world.textures,
  );
  assert.equal(after.runtime.diagnostics.audio.loopSources, 2);
  assert.ok(
    after.heap.usedSize - before.heap.usedSize <
      Math.max(2000000, before.heap.usedSize * 0.15),
    "post-GC heap growth remains bounded",
  );
  assert.deepEqual(errors, []);
  assert.deepEqual(failed, []);
  await page.screenshot({ path: artifacts + "/stability-final.png" });
  const report = {
    durationMs: Date.now() - start,
    before,
    after,
    errors,
    failed,
  };
  await writeFile(
    artifacts + "/stability.json",
    JSON.stringify(report, null, 2),
  );
  console.log("PASS stability", JSON.stringify(report, null, 2));
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  if (server) server.kill("SIGTERM");
}
