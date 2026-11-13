import { coldPerformanceGate } from "./cold-performance.mjs";
import { activeCombat } from "./combat-performance.mjs";
import { traversalPerformance } from "./traversal-performance.mjs";
import {
  resourceSnapshot,
  boundedResources,
  observerControl,
} from "./resource-snapshot.mjs";
import { completeMail, completeNight } from "./campaign.mjs";
import assert from "node:assert/strict";
import { writeFile, readFile } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { snapshot, action, mode, url, walk, click } from "./driver.mjs";
const stats = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  return {
    samples: values.length,
    meanMs: values.reduce((a, b) => a + b, 0) / values.length,
    p95Ms: sorted[Math.floor(sorted.length * 0.95)],
    over100ms: values.filter((x) => x > 100).length,
  };
};
export async function renderedRebuilds(
  page,
  client,
  evidence,
  { snapshots = false, count = 10, warmup = false } = {},
) {
  assert.ok(Number.isInteger(count) && count > 0 && count <= 50);
  const prefix = warmup ? "warmup-" : "";
  const cycle = [];
  for (let i = 0; i < count; i++) {
    await page.keyboard.press("Escape");
    await mode(page, "paused");
    await action(page, "abandon");
    await mode(page, "hub");
    await action(page, "brief", "[data-id=dry-mail]");
    await action(page, "deploy");
    await mode(page, "playing");
    await page.waitForFunction(() => dustDiagnostics().render.geometries > 100);
    await page.waitForTimeout(350);
    await page.waitForFunction(() => __raf.pending === 1);
    const measured = await resourceSnapshot(page, client);
    cycle.push({ i, warmup, ...measured });
    await writeFile(
      `${evidence}/${prefix}resource-cycles.json`,
      JSON.stringify(cycle, null, 2),
    );
    if (snapshots && ([0, 5, count - 1].includes(i) || i % 10 === 9)) {
      await page.keyboard.press("Escape");
      await mode(page, "paused");
      const stream = createWriteStream(
        `${evidence}/${prefix}rebuild-${i}.heapsnapshot`,
      );
      const chunk = (event) => stream.write(event.chunk);
      client.on("HeapProfiler.addHeapSnapshotChunk", chunk);
      await client.send("HeapProfiler.takeHeapSnapshot", {
        reportProgress: false,
      });
      client.off("HeapProfiler.addHeapSnapshotChunk", chunk);
      await new Promise((resolve) => stream.end(resolve));
      await action(page, "resume");
      await mode(page, "playing");
    }
    console.log(
      `${warmup ? "Compilation warmup" : "Rendered rebuild"} ${i + 1}/${count}: ${measured.heap} post-GC bytes`,
    );
  }
  if (!warmup)
    boundedResources(cycle[0], cycle.at(-1), `${count} rendered rebuilds`);
  for (const row of cycle) {
    assert.equal(row.raf, 1);
    assert.equal(row.render.geometries, cycle[0].render.geometries);
    assert.equal(row.render.textures, cycle[0].render.textures);
    assert.deepEqual(row.stableListeners, cycle[0].stableListeners);
  }
  return cycle;
}
export async function performanceGate(page, evidence, pass) {
  const cold = await coldPerformanceGate(page, evidence, pass);
  const client = await page.context().newCDPSession(page);
  await page.bringToFront();
  if ((await snapshot(page)).mode === "paused") await action(page, "resume");
  await mode(page, "playing");
  await page.waitForTimeout(5000);
  await page.waitForFunction(
    () =>
      dustDiagnostics().audio.decoded === 11 &&
      document.fonts.status === "loaded",
  );
  // Cold snapshots identify constructor/validator JIT code, with unchanged
  // scene-object counts and a thirty-build plateau. Keep this readiness phase
  // explicit and separate from every subsequent fixed measured interval.
  const warmup = await renderedRebuilds(page, client, evidence, {
    warmup: true,
  });
  const observer = await observerControl(page, client);
  await writeFile(
    `${evidence}/heap-observer-control.json`,
    JSON.stringify(observer, null, 2),
  );
  const runs = [];
  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1280, height: 720 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(5000);
    await page.waitForFunction(
      () =>
        dustDiagnostics().audio.decoded === 11 &&
        document.fonts.status === "loaded",
    );
    await page.evaluate(() => {
      window.__frames ??= new Float64Array(18000);
    });
    const before = await resourceSnapshot(page, client);
    await page.evaluate(() => {
      window.__frameCount = 0;
      window.__frameIndex = 0;
      window.__measuring = true;
      let last = 0;
      function measure(t) {
        if (!window.__measuring) return;
        if (last) {
          window.__frames[window.__frameIndex] = t - last;
          window.__frameIndex =
            (window.__frameIndex + 1) % window.__frames.length;
          window.__frameCount = Math.min(
            window.__frameCount + 1,
            window.__frames.length,
          );
        }
        last = t;
        requestAnimationFrame(measure);
      }
      requestAnimationFrame(measure);
    });
    for (let i = 0; i < 6; i++) {
      await page.waitForTimeout(30000);
      console.log(`Resource soak ${viewport.width}: ${(i + 1) * 30}/180s`);
    }
    const intervals = await page.evaluate(() => {
      window.__measuring = false;
      return Array.from(window.__frames.subarray(0, window.__frameCount));
    });
    await page.waitForFunction(() => __raf.pending === 1);
    const after = await resourceSnapshot(page, client);
    const d = after.state;
    const cumulative = d.performance.updateTotals,
      count = cumulative.count - before.update.count;
    const histogram = cumulative.histogram.map(
      (n, i) => n - before.update.histogram[i],
    );
    let accumulated = 0,
      percentileBin = 0;
    for (let i = 0; i < histogram.length; i++) {
      accumulated += histogram[i];
      if (accumulated >= count * 0.95) {
        percentileBin = i;
        break;
      }
    }
    const update = {
        samples: count,
        meanMs: (cumulative.totalMs - before.update.totalMs) / count,
        p95Ms:
          percentileBin === histogram.length - 1
            ? Infinity
            : (percentileBin + 1) * cumulative.binMs,
        overflow: histogram.at(-1),
        histogram,
        binMs: cumulative.binMs,
      },
      timing = stats(intervals),
      row = { viewport, before, after, update, frameIntervals: timing };
    runs.push(row);
    await writeFile(
      `${evidence}/soak-${viewport.width}-${runs.length}.json`,
      JSON.stringify(
        { ...row, intervals, recentUpdateSamples: d.performance.updateMs },
        null,
        2,
      ),
    );
    assert.ok(
      update.p95Ms <= 6,
      `JS update budget exceeded: ${JSON.stringify(update)}`,
    );
    assert.ok(
      after.render.drawCalls <= 250 &&
        after.render.triangles <= 1500000 &&
        after.render.textureBytesEstimate <= 256 * 1024 * 1024,
      "render complexity budget",
    );
    assert.ok(
      after.render.fadeRaycasts - before.render.fadeRaycasts <= 1,
      "stationary foreground ray cache",
    );
    assert.equal(after.render.visibleInstances, before.render.visibleInstances);
    assert.equal(after.render.geometries, before.render.geometries);
    assert.equal(after.render.textures, before.render.textures);
    boundedResources(before, after, `soak ${viewport.width}`);
    assert.ok(after.render.bufferWidth >= Math.min(viewport.width, 960));
    await page.screenshot({
      path: `${evidence}/gameplay-${viewport.width}.png`,
    });
  }
  await page.setViewportSize({ width: 1280, height: 720 });
  const cycle = await renderedRebuilds(page, client, evidence);
  // Four camera angles use the same collision geometry, and static sheets draw only when dirty.
  for (let i = 0; i < 4; i++) {
    const rays = (await snapshot(page)).render.fadeRaycasts;
    await page.keyboard.press("KeyC");
    await page.waitForFunction(
      (before) => dustDiagnostics().render.fadeRaycasts > before,
      rays,
    );
    assert.equal(
      (await snapshot(page)).render.fadeRaycasts - rays,
      1,
      "each physical camera rotation refreshes foreground occlusion once",
    );
    await page.screenshot({ path: `${evidence}/camera-${i}.png` });
  }
  await page.keyboard.press("Escape");
  const paused = (await snapshot(page)).render;
  await page.waitForTimeout(1000);
  const idle = (await snapshot(page)).render;
  assert.ok(idle.renderedFrames - paused.renderedFrames <= 1);
  assert.ok(idle.skippedFrames > paused.skippedFrames);
  await action(page, "settings");
  const high = (await snapshot(page)).render.bufferWidth;
  await click(page, "[data-setting=low]");
  assert.equal(await page.locator("[data-setting=low]").isChecked(), true);
  assert.ok((await snapshot(page)).render.bufferWidth < high);
  await click(page, "[data-setting=low]");
  assert.equal(await page.locator("[data-setting=low]").isChecked(), false);
  await action(page, "close-sheet");
  await action(page, "resume");
  const workloads = await activeWorkloads(page, client, evidence);
  const traversals = await traversalPerformance(
    page,
    client,
    evidence,
    allocationSummary,
  );
  await client.detach();
  pass(
    "three fixed 180-second resource/JS windows; ten rendered rebuilds; live combat and real carry/escort identities; one RAF; quality setting",
  );
  return {
    cold,
    readiness:
      "decoded audio, loaded fonts, initial five seconds, ten native rendered rebuilds",
    warmup,
    runs,
    cycle,
    workloads,
    traversals,
  };
}

function updateDifference(before, after) {
  const count = after.count - before.count,
    histogram = after.histogram.map((n, i) => n - before.histogram[i]);
  let total = 0,
    p95 = Infinity;
  for (let i = 0; i < histogram.length - 1; i++) {
    total += histogram[i];
    if (total >= count * 0.95) {
      p95 = (i + 1) * after.binMs;
      break;
    }
  }
  return {
    samples: count,
    meanMs: (after.totalMs - before.totalMs) / count,
    p95Ms: p95,
    histogram,
    overflow: histogram.at(-1),
  };
}
function allocationSummary(profile) {
  const rows = [];
  function visit(node, ancestors) {
    const stack = [...ancestors, node.callFrame],
      frame = node.callFrame;
    if (node.selfSize)
      rows.push({
        bytes: node.selfSize,
        function: frame.functionName,
        url: frame.url,
        stack: stack.map((f) => `${f.functionName} ${f.url}:${f.lineNumber}`),
      });
    for (const child of node.children || []) visit(child, stack);
  }
  visit(profile.head, []);
  rows.sort((a, b) => b.bytes - a.bytes);
  const categories = {
    application: [],
    renderer: [],
    audioEvents: [],
    diagnostics: [],
    restart: [],
    other: [],
  };
  for (const row of rows) {
    const stack = row.stack.join("\n");
    let ownerURL = row.url;
    if (!ownerURL)
      for (let i = row.stack.length - 1; i >= 0; i--) {
        const match = row.stack[i].match(/https?:\/\/[^ ]+/);
        if (match) {
          ownerURL = match[0];
          break;
        }
      }
    const group = stack.includes("dustDiagnostics")
      ? "diagnostics"
      : /startMission |deploy |retry |build .*world\.js/.test(stack)
        ? "restart"
        : ownerURL.includes("/audio.js")
          ? "audioEvents"
          : ownerURL.includes("/vendor/")
            ? "renderer"
            : /games\/dust-redemption\/(?!vendor)/.test(ownerURL)
              ? "application"
              : "other";
    categories[group].push(row);
  }
  return { sampledBytes: rows.reduce((n, r) => n + r.bytes, 0), ...categories };
}
async function activeWorkloads(page, client, evidence) {
  const original = (await snapshot(page)).profile,
    rows = [];
  for (const workload of ["first-moving-restart"]) {
    // Match the post-restart camera/upload state at both endpoints; the prior
    // four-angle check uploads additional, valid off-screen geometries.
    await page.keyboard.press("Escape");
    await mode(page, "paused");
    await action(page, "abandon");
    await mode(page, "hub");
    await action(page, "brief", "[data-id=dry-mail]");
    await action(page, "deploy");
    await mode(page, "playing");
    await page.waitForTimeout(5000);
    const before = await resourceSnapshot(page, client);
    await client.send("HeapProfiler.startSampling", {
      samplingInterval: 32768,
      includeObjectsCollectedByMajorGC: true,
      includeObjectsCollectedByMinorGC: true,
    });
    const events = [];
    const collect = (data) => events.push(...data.value);
    client.on("Tracing.dataCollected", collect);
    await client.send("Tracing.start", {
      categories: "v8,disabled-by-default-v8.gc",
      transferMode: "ReportEvents",
    });
    const duration = 180000,
      started = Date.now();
    let restarted = false,
      shots = 0,
      max = {
        drawCalls: 0,
        triangles: 0,
        textureBytesEstimate: 0,
        visibleInstances: 0,
      };
    while (Date.now() - started < duration) {
      const d = await snapshot(page);
      assert.equal(
        d.mode,
        "playing",
        `${workload} must measure active gameplay`,
      );
      for (const key of Object.keys(max))
        max[key] = Math.max(max[key], d.render[key]);
      if (workload === "first-moving-restart") {
        if (!restarted && Date.now() - started >= duration / 2) {
          await page.keyboard.press("Escape");
          await mode(page, "paused");
          await action(page, "abandon");
          await mode(page, "hub");
          await action(page, "brief", "[data-id=dry-mail]");
          await action(page, "deploy");
          await mode(page, "playing");
          restarted = true;
        }
        const key = ["KeyD", "KeyA", "KeyS", "KeyW"][
          Math.floor((Date.now() - started) / 450) % 4
        ];
        await page.keyboard.down(key);
        await page.waitForTimeout(450);
        await page.keyboard.up(key);
      }
      if (
        Math.floor((Date.now() - started) / 30000) >
        Math.floor((Date.now() - started - 600) / 30000)
      )
        console.log(
          `Active workload ${workload}: ${Math.round((Date.now() - started) / 1000)}s`,
        );
    }
    const { profile: allocation } = await client.send(
      "HeapProfiler.stopSampling",
    );
    const complete = new Promise((resolve) =>
      client.once("Tracing.tracingComplete", resolve),
    );
    await client.send("Tracing.end");
    await complete;
    client.off("Tracing.dataCollected", collect);
    const state = await snapshot(page),
      update = updateDifference(
        before.state.performance.updateTotals,
        state.performance.updateTotals,
      );
    const after = await resourceSnapshot(page, client);
    const gcEvents = events.filter((e) =>
      /MinorGC|MajorGC|V8.GCScavenger$|V8.GCCompactor$/.test(e.name),
    );
    const row = {
      workload,
      chapterAccessFixture: workload === "final-combat",
      durationMs: Date.now() - started,
      before,
      after,
      update,
      max,
      shots,
      gc: {
        minor: gcEvents.filter((e) => /Minor|Scavenger/.test(e.name)).length,
        major: gcEvents.filter((e) => /Major|Compactor/.test(e.name)).length,
      },
      allocations: allocationSummary(allocation),
    };
    await writeFile(
      `${evidence}/${workload}-allocation.heapprofile`,
      JSON.stringify(allocation),
    );
    await writeFile(
      `${evidence}/${workload}-gc.json`,
      JSON.stringify(gcEvents),
    );
    await writeFile(
      `${evidence}/${workload}.json`,
      JSON.stringify(row, null, 2),
    );
    rows.push(row);
    assert.ok(update.p95Ms <= 6, `${workload} update p95 ${update.p95Ms}ms`);
    boundedResources(before, after, workload, {
      geometry: workload !== "final-combat",
    });
    assert.ok(
      max.drawCalls <= 250 &&
        max.triangles <= 1500000 &&
        max.textureBytesEstimate <= 256 * 1024 * 1024,
    );
  }
  rows.push(
    await activeCombat(
      page,
      client,
      evidence,
      allocationSummary,
      updateDifference,
    ),
  );
  await page.evaluate(
    (p) =>
      localStorage.setItem(
        "stteak:dust-redemption:profile:v2",
        JSON.stringify(p),
      ),
    original,
  );
  await page.reload();
  await mode(page, "title");
  await action(page, "hub");
  await action(page, "recover");
  await mode(page, "playing");
  return rows;
}
export async function activePerformanceGate(page, evidence, pass) {
  const client = await page.context().newCDPSession(page);
  await page.waitForTimeout(5000);
  await page.waitForFunction(
    () =>
      dustDiagnostics().audio.decoded === 11 &&
      document.fonts.status === "loaded",
  );
  const warmup = await renderedRebuilds(page, client, evidence, {
    warmup: true,
  });
  const workloads = await activeWorkloads(page, client, evidence);
  const traversals = await traversalPerformance(
    page,
    client,
    evidence,
    allocationSummary,
  );
  await client.detach();
  pass(
    "diagnostic active movement/restart, live combat, and carry/escort allocation workloads",
  );
  return {
    scope:
      "active workloads only; fixed stationary windows are covered by performance/all",
    warmup,
    workloads,
    traversals,
  };
}
