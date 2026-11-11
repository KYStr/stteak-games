import { performance } from 'node:perf_hooks';
import assert from 'node:assert/strict';
export function stats(values) {
  const sorted = [...values].sort((a,b)=>a-b);
  return { count:values.length, mean:values.reduce((a,b)=>a+b,0)/(values.length||1),
    p95:sorted[Math.floor(sorted.length*.95)]||0, max:sorted.at(-1)||0 };
}
// Capture complete workload samples, without filtering scheduling stalls or slow transitions.
export async function measureMovement(page, durationMs = 12000) {
  await page.locator('#world').focus();
  let since = (await page.evaluate(()=>window.mossDiagnostics())).world.activeRenderedFrames;
  const start = performance.now(), samples = [], positions = [];
  let key = 'd', turn = 0;
  await page.keyboard.down(key);
  while (performance.now() - start < durationMs) {
    await page.waitForTimeout(Math.min(1200, durationMs - (performance.now()-start)));
    const reading = await page.evaluate(since=>window.mossDiagnostics({since}), since);
    samples.push(...reading.world.samples);
    since = reading.world.activeRenderedFrames;
    positions.push(reading.world.position);
    await page.keyboard.up(key);
    key = key === 'd' ? 'a' : 'd';
    if (++turn % 4 === 0) await page.keyboard.press(turn % 8 ? 'q' : 'r');
    await page.keyboard.down(key);
  }
  await page.keyboard.up(key);
  const final = await page.evaluate(since=>window.mossDiagnostics({since}), since);
  samples.push(...final.world.samples);
  return { durationMs:performance.now()-start, samples, positions,
    raf:stats(samples.map(s=>s.rafMs)), completion:stats(samples.map(s=>s.completionMs)),
    update:stats(samples.map(s=>s.updateMs)), submit:stats(samples.map(s=>s.submitMs)),
    viewport:page.viewportSize(), world:final.world };
}
export function assertBudget(measurement, label) {
  assert.ok(measurement.samples.length > 30, label + ': actual rendered samples');
  assert.ok(measurement.update.p95 <= 6, `${label}: complete non-render update p95 ${measurement.update.p95.toFixed(2)} <= 6 ms`);
  if (measurement.world) {
    assert.ok(measurement.world.drawCalls <= 250, label+': draw calls');
    assert.ok(measurement.world.triangles <= 1500000, label+': triangles');
    assert.ok(measurement.world.dpr <= 2, label+': capped DPR');
    assert.ok(measurement.world.textureBytesBound <= 256*1024*1024, label+': conservative texture memory');
  }
  measurement.referenceOnly = true; // RAF/completion includes CPU raster and host scheduling.
}
