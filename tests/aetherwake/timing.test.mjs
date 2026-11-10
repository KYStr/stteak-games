import test from 'node:test';
import assert from 'node:assert/strict';
import { TimingSamples } from '../../games/aetherwake/src/timing.js';
test('phase samples retain only the bounded recent window and aggregate on inspection', () => {
  const timing = new TimingSamples(['simulationMs', 'renderCpuMs'], 4);
  assert.deepEqual(timing.summary().simulationMs, {count:0,mean:null,p95:null});
  for (let i=1;i<=6;i++) timing.push({simulationMs:i,renderCpuMs:i*2});
  const result = timing.summary();
  assert.deepEqual(result.simulationMs, {count:4,mean:4.5,p95:6});
  assert.deepEqual(result.renderCpuMs, {count:4,mean:9,p95:12});
  result.simulationMs.mean = -1;
  assert.equal(timing.summary().simulationMs.mean,4.5);
  assert.equal(timing.samples.simulationMs.length,4);
});
