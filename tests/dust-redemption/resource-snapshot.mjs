import assert from "node:assert/strict";
import { snapshot, action, mode } from "./driver.mjs";
export async function resourceSnapshot(page, client) {
  const initial = await snapshot(page);
  const resumed = initial.mode === "playing";
  if (resumed) {
    await page.keyboard.press("Escape");
    await mode(page, "paused");
  }
  const state = await snapshot(page);
  const stableListeners = await page.evaluate(
    () => window.__listenerAudit?.() || null,
  );
  const raf = await page.evaluate(() => window.__raf?.pending ?? 1);
  await client.send("HeapProfiler.collectGarbage");
  const heap = (await client.send("Runtime.getHeapUsage")).usedSize,
    dom = await client.send("Memory.getDOMCounters");
  const result = {
    endpoint:
      "native pause outside measured gameplay window; live audio handlers released",
    heap,
    dom,
    render: state.render,
    update: state.performance.updateTotals,
    audio: state.audio,
    stableListeners,
    raf,
    state,
  };
  if (resumed) {
    await action(page, "resume");
    await mode(page, "playing");
  }
  return result;
}
export function boundedResources(
  before,
  after,
  label,
  { geometry = true } = {},
) {
  assert.ok(
    (after.heap - before.heap) / before.heap < 0.1,
    `${label}: post-GC growth ${(after.heap - before.heap) / before.heap}`,
  );
  assert.deepEqual(
    after.stableListeners,
    before.stableListeners,
    `${label}: stable application/DOM listeners`,
  );
  assert.ok(
    after.audio.voices <= 32 && (after.audio.peakVoices || 0) <= 32,
    `${label}: bounded live audio voices`,
  );
  // Raw aggregate includes each live AudioScheduledSourceNode.onended. Stable registrations above are separately counted.
  assert.ok(
    after.dom.jsEventListeners - after.audio.voices <=
      before.dom.jsEventListeners - before.audio.voices,
    `${label}: listener counter after live voice attribution`,
  );
  assert.equal(after.raf, 1);
  if (geometry)
    assert.equal(
      after.render.geometries,
      before.render.geometries,
      `${label}: equivalent-state geometries`,
    );
  assert.equal(
    after.render.textures,
    before.render.textures,
    `${label}: textures`,
  );
}
export async function observerControl(page, client) {
  await client.send("HeapProfiler.collectGarbage");
  const before = (await client.send("Runtime.getHeapUsage")).usedSize;
  await snapshot(page);
  const withDiagnostics = (await client.send("Runtime.getHeapUsage")).usedSize;
  await client.send("HeapProfiler.collectGarbage");
  const after = (await client.send("Runtime.getHeapUsage")).usedSize;
  return { before, withDiagnostics, after };
}
