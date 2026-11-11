import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { snapshot, action, mode } from "./driver.mjs";
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
    const cumulative = d.performance.updateTotals, count = cumulative.count - before.update.count;
    const histogram = cumulative.histogram.map((n, i) => n - before.update.histogram[i]);
    let accumulated = 0, percentileBin = 0;
    for(let i = 0; i < histogram.length; i++){accumulated += histogram[i];if(accumulated >= count * .95){percentileBin = i;break;}}
    const update = { samples: count, meanMs: (cumulative.totalMs - before.update.totalMs) / count, p95Ms: (percentileBin + 1) * cumulative.binMs, histogram, binMs: cumulative.binMs },
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
      update.meanMs <= 5 && update.p95Ms <= 12,
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
    assert.ok(after.dom.jsEventListeners <= before.dom.jsEventListeners + 2);
    assert.ok(
      after.heap - before.heap < 2 * 1024 * 1024,
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
  assert.ok(cycle.at(-1).heap - cycle[0].heap < 2 * 1024 * 1024);
  assert.ok(
    cycle.at(-1).dom.jsEventListeners <= cycle[0].dom.jsEventListeners + 2,
  );
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
  await page.locator("[data-setting=low]").check();
  assert.ok((await snapshot(page)).render.bufferWidth < high);
  await page.locator("[data-setting=low]").uncheck();
  await action(page, "close-sheet");
  await action(page, "resume");
  await client.detach();
  pass(
    "two 180-second resource/JS budgets; ten rendered rebuilds; one RAF; static modal caching; quality setting",
  );
  return { runs, cycle };
}
