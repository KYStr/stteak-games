import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { installListenerAudit } from "./listener-audit.mjs";
import { start, snapshot, action, mode } from "./driver.mjs";
import {
  resourceSnapshot,
  boundedResources,
  observerControl,
} from "./resource-snapshot.mjs";

// Installed before navigation, with fixed storage throughout every measured window.
export function installFrameObserver() {
  const raf = requestAnimationFrame.bind(window),
    cancel = cancelAnimationFrame.bind(window),
    pending = new Set();
  window.__raf = {};
  Object.defineProperty(__raf, "pending", { get: () => pending.size });
  window.__frameObserver = {
    values: new Float64Array(18000),
    index: 0,
    count: 0,
    total: 0,
    last: 0,
    enabled: false,
  };
  window.requestAnimationFrame = (fn) => {
    const id = raf((t) => {
      pending.delete(id);
      const observer = __frameObserver;
      // Sample only the application's frame callback; the measurement owns no RAF.
      if (observer.enabled) {
        if (observer.last) {
          observer.values[observer.index] = t - observer.last;
          observer.index = (observer.index + 1) % observer.values.length;
          observer.count = Math.min(observer.count + 1, observer.values.length);
          observer.total++;
        }
        observer.last = t;
      }
      fn(t);
    });
    pending.add(id);
    return id;
  };
  window.cancelAnimationFrame = (id) => {
    pending.delete(id);
    cancel(id);
  };
}
async function heapSnapshot(client, path) {
  const stream = createWriteStream(path),
    chunk = (event) => stream.write(event.chunk);
  client.on("HeapProfiler.addHeapSnapshotChunk", chunk);
  try {
    await client.send("HeapProfiler.takeHeapSnapshot", {
      reportProgress: false,
    });
  } finally {
    client.off("HeapProfiler.addHeapSnapshotChunk", chunk);
    await new Promise((resolve) => stream.end(resolve));
  }
}
export async function coldPerformanceGate(parent, evidence, pass) {
  const context = await parent
    .context()
    .browser()
    .newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("requestfailed", (r) =>
    errors.push(`${r.url()} ${r.failure()?.errorText}`),
  );
  await page.addInitScript(installListenerAudit);
  await page.addInitScript(installFrameObserver);
  const client = await context.newCDPSession(page);
  const row = {
    status: "running",
    scope: "fresh context/profile; first mission; no scene warmup",
    errors,
  };
  const persist = () =>
    writeFile(
      `${evidence}/cold-performance.json`,
      JSON.stringify(row, null, 2),
    );
  try {
    await start(page);
    await page.waitForFunction(
      () =>
        dustDiagnostics().audio.decoded === 11 &&
        document.fonts.status === "loaded",
    );
    await page.waitForTimeout(5000);
    if (process.env.DUST_COLD_SNAPSHOTS === "1") {
      await page.keyboard.press("Escape");
      await mode(page, "paused");
      await heapSnapshot(client, `${evidence}/cold-before.heapsnapshot`);
      await action(page, "resume");
      await mode(page, "playing");
    }
    row.before = await resourceSnapshot(page, client);
    await page.evaluate(() => {
      __frameObserver.enabled = true;
    });
    const started = Date.now();
    await persist();
    for (let i = 0; i < 6; i++) {
      const key = i % 2 ? "KeyA" : "KeyD";
      await page.keyboard.down(key);
      await page.waitForTimeout(1500);
      await page.keyboard.up(key);
      await page.waitForTimeout(28500);
      if (i === 2) {
        await page.keyboard.press("Escape");
        await mode(page, "paused");
        await action(page, "abandon");
        await mode(page, "hub");
        await action(page, "brief", "[data-id=dry-mail]");
        await action(page, "deploy");
        await mode(page, "playing");
        row.restarts = 1;
      }
      console.log(`Cold movement/restart gate: ${(i + 1) * 30}/180s`);
      assert.equal((await snapshot(page)).mode, "playing");
    }
    row.durationMs = Date.now() - started;
    await page.evaluate(() => {
      __frameObserver.enabled = false;
    });
    row.after = await resourceSnapshot(page, client);
    row.growth = (row.after.heap - row.before.heap) / row.before.heap;
    row.observer = await observerControl(page, client);
    row.frameIntervals = await page.evaluate(() => {
      const o = __frameObserver,
        sorted = o.values.slice(0, o.count).sort();
      return {
        capacity: o.values.length,
        samples: o.count,
        total: o.total,
        meanMs: sorted.reduce((a, b) => a + b, 0) / o.count,
        p95Ms: sorted[Math.floor(o.count * 0.95)],
      };
    });
    const before = row.before.update,
      after = row.after.update;
    let accumulated = 0;
    row.update = { samples: after.count - before.count, p95Ms: Infinity };
    for (let i = 0; i < after.histogram.length; i++) {
      accumulated += after.histogram[i] - before.histogram[i];
      if (accumulated >= row.update.samples * 0.95) {
        row.update.p95Ms = (i + 1) * after.binMs;
        break;
      }
    }
    await persist();
    if (process.env.DUST_COLD_SNAPSHOTS === "1" || row.growth >= 0.1) {
      await page.keyboard.press("Escape");
      await mode(page, "paused");
      await heapSnapshot(client, `${evidence}/cold-after.heapsnapshot`);
    }
    assert.ok(row.durationMs >= 180000);
    assert.equal(row.restarts, 1);
    assert.deepEqual(errors, []);
    assert.ok(row.update.p95Ms <= 6);
    assert.ok(
      row.after.render.drawCalls <= 250 &&
        row.after.render.triangles <= 1500000 &&
        row.after.render.textureBytesEstimate <= 256 * 1024 * 1024,
    );
    boundedResources(
      row.before,
      row.after,
      "fresh cold movement/restart window",
    );
    row.status = "passed";
    pass(
      `cold fresh-profile 180s movement/restart: ${(row.growth * 100).toFixed(2)}% post-GC growth`,
    );
    return row;
  } catch (e) {
    row.status = "failed";
    row.failure = e.stack;
    throw e;
  } finally {
    await persist();
    await client.detach();
    await context.close();
  }
}
