import assert from "node:assert/strict";
import { writeFile, readFile } from "node:fs/promises";
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
export async function performanceGate(page, evidence, pass) {
  const client = await page.context().newCDPSession(page);
  const runs = [];
  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(5000);
    await client.send("HeapProfiler.collectGarbage");
    const before = {
      heap: (await client.send("Runtime.getHeapUsage")).usedSize,
      dom: await client.send("Memory.getDOMCounters"),
      render: (await snapshot(page)).render,
      update: (await snapshot(page)).performance.updateTotals,
    };
    await page.evaluate(() => {
      window.__frames = [];
      window.__measuring = true;
      let last = 0;
      function measure(t) {
        if (!window.__measuring) return;
        if (last) window.__frames.push(t - last);
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
      return window.__frames;
    });
    await page.waitForFunction(() => __raf.pending === 1);
    await client.send("HeapProfiler.collectGarbage");
    const d = await snapshot(page);
    const after = {
      heap: (await client.send("Runtime.getHeapUsage")).usedSize,
      dom: await client.send("Memory.getDOMCounters"),
      render: d.render,
      raf: await page.evaluate(() => window.__raf.pending),
    };
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
      `${evidence}/soak-${viewport.width}.json`,
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
      after.render.drawCalls <= 220 &&
        after.render.triangles <= 35000 &&
        after.render.textures <= 40 &&
        after.render.textureBytesEstimate < 16 * 1024 * 1024,
      "render complexity budget",
    );
    assert.ok(
      after.render.fadeRaycasts - before.render.fadeRaycasts <= 1,
      "stationary foreground ray cache",
    );
    assert.equal(after.render.visibleInstances, before.render.visibleInstances);
    assert.equal(after.render.geometries, before.render.geometries);
    assert.equal(after.render.textures, before.render.textures);
    assert.ok(after.dom.jsEventListeners <= before.dom.jsEventListeners);
    assert.ok(
      (after.heap - before.heap) / before.heap < 0.1,
      `post-GC growth ${after.heap - before.heap}`,
    );
    assert.equal(after.raf, 1);
    assert.ok(after.render.bufferWidth >= Math.min(viewport.width, 960));
    await page.screenshot({
      path: `${evidence}/gameplay-${viewport.width}.png`,
    });
  }
  await page.setViewportSize({ width: 1280, height: 720 });
  const cycle = [];
  for (let i = 0; i < 10; i++) {
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
    await client.send("HeapProfiler.collectGarbage");
    cycle.push({
      i,
      heap: (await client.send("Runtime.getHeapUsage")).usedSize,
      dom: await client.send("Memory.getDOMCounters"),
      render: (await snapshot(page)).render,
      raf: await page.evaluate(() => __raf.pending),
    });
  }
  assert.ok((cycle.at(-1).heap - cycle[0].heap) / cycle[0].heap < 0.1);
  assert.ok(cycle.at(-1).dom.jsEventListeners <= cycle[0].dom.jsEventListeners);
  for (const row of cycle) {
    assert.equal(row.raf, 1);
    assert.equal(row.render.geometries, cycle[0].render.geometries);
    assert.equal(row.render.textures, cycle[0].render.textures);
  }
  await writeFile(
    `${evidence}/resource-cycles.json`,
    JSON.stringify(cycle, null, 2),
  );
  // Four camera angles use the same collision geometry, and static sheets draw only when dirty.
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("KeyC");
    await page.waitForTimeout(100);
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
  await client.detach();
  pass(
    "two 180-second resource/JS budgets; ten rendered rebuilds; one RAF; static modal caching; quality setting",
  );
  return { runs, cycle, workloads };
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
    const group = stack.includes("dustDiagnostics")
      ? "diagnostics"
      : /startMission |deploy |retry |build .*world\.js/.test(stack)
        ? "restart"
        : row.url.includes("/audio.js")
          ? "audioEvents"
          : row.url.includes("/vendor/")
            ? "renderer"
            : /games\/dust-redemption\/(?!vendor)/.test(row.url)
              ? "application"
              : "other";
    categories[group].push(row);
  }
  return { sampledBytes: rows.reduce((n, r) => n + r.bytes, 0), ...categories };
}
async function activeWorkloads(page, client, evidence) {
  const original = (await snapshot(page)).profile,
    rows = [];
  for (const workload of ["first-moving-restart", "final-combat"]) {
    if (workload === "final-combat") {
      const fixture = JSON.parse(
        await readFile(`${evidence}/long-night-earned.json`, "utf8"),
      );
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
      await action(page, "brief", "[data-id=dawn-pact]");
      await action(page, "deploy");
      await mode(page, "playing");
      const enemy = (await snapshot(page)).enemies[0];
      await walk(page, { x: enemy.x, z: enemy.z + 7 }, 0.5);
      const warm = (await snapshot(page)).enemies[0];
      await page.mouse.move(warm.screen.x, warm.screen.y);
      await page.mouse.down();
      await page.waitForTimeout(200);
      await page.mouse.up();
    }
    await page.waitForTimeout(5000);
    await client.send("HeapProfiler.collectGarbage");
    const before = {
      heap: (await client.send("Runtime.getHeapUsage")).usedSize,
      dom: await client.send("Memory.getDOMCounters"),
      state: await snapshot(page),
    };
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
    const duration = workload === "first-moving-restart" ? 180000 : 45000,
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
      } else {
        if (d.player.hp < 65 && d.stats.itemsUsed === 0)
          await page.keyboard.press("KeyF");
        const enemy = d.enemies.find((e) => e.hp > 0);
        if (enemy) {
          await page.mouse.move(enemy.screen.x, enemy.screen.y);
          await page.mouse.down();
          await page.waitForTimeout(180);
          await page.mouse.up();
        }
        await page.keyboard.press("KeyR");
        await page.waitForTimeout(300);
        shots = Math.max(shots, (await snapshot(page)).stats.shots);
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
    await client.send("HeapProfiler.collectGarbage");
    const after = {
      heap: (await client.send("Runtime.getHeapUsage")).usedSize,
      dom: await client.send("Memory.getDOMCounters"),
      render: state.render,
      raf: await page.evaluate(() => __raf.pending),
    };
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
    assert.ok(
      (after.heap - before.heap) / before.heap < 0.1,
      `${workload} heap growth`,
    );
    assert.ok(after.dom.jsEventListeners <= before.dom.jsEventListeners);
    assert.equal(after.render.geometries, before.state.render.geometries);
    assert.equal(after.render.textures, before.state.render.textures);
    assert.equal(after.raf, 1);
    assert.ok(
      max.drawCalls <= 250 &&
        max.triangles <= 1500000 &&
        max.textureBytesEstimate <= 256 * 1024 * 1024,
    );
    if (workload === "final-combat")
      assert.ok(shots > 0, "combat workload contains actual shots");
  }
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
