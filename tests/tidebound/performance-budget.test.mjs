import test from 'node:test';import assert from 'node:assert/strict';
import {assertBudgets,assertSamplingPrerequisites,sampleCountsFor} from './performance-budget.mjs';
const sample=()=>({renderer:{maxDrawCalls:140,maxTriangles:34000,updateP95:.2},cpu:{step:{p95:.1},hud:{p95:.4}},textureBytes:12000000,transferBytes:2100000,sampleCounts:{scene:180,hud:20,physics:180},mode:'sailing'});
test('rubric rejects draw and CPU overruns, independent of software frame interval',()=>{let s=sample();s.average=500;s.p95=900;assert.doesNotThrow(()=>assertBudgets(s));s.renderer.maxDrawCalls=251;assert.throws(()=>assertBudgets(s),/draw calls/);s=sample();s.renderer.updateP95=6.1;assert.throws(()=>assertBudgets(s),/update p95/);});
test('cold percentiles cannot satisfy the representative sampling prerequisite',()=>{
 for(const [key,value]of [['scene',7],['hud',19],['physics',179]]){const s=sample();s.sampleCounts[key]=value;assert.throws(()=>assertBudgets(s),/insufficient/);}
 assert.throws(()=>assertSamplingPrerequisites(undefined,'harbor'),/insufficient/);
 assert.doesNotThrow(()=>assertSamplingPrerequisites({scene:180,hud:20,physics:0},'result'));
 assert.deepEqual(sampleCountsFor({renderer:{cpu:{update:{count:182}}},cpu:{step:{count:181},hud:{count:21}}}),{scene:182,physics:181,hud:21});
});
test('a representative 6.01ms update still fails the unchanged 6ms bar',()=>{const s=sample();s.cpu.step.p95=2;s.renderer.updateP95=2;s.cpu.hud.p95=2.01;assert.throws(()=>assertBudgets(s),/update p95 6.01>6ms/);});

test('inactive scenes cannot score a lone physics startup sample or forgive a populated CPU overrun',()=>{
 const s=sample();s.mode='result';s.sampleCounts.physics=1;s.cpu.step.p95=6.5;
 assert.throws(()=>assertBudgets(s),/insufficient physics samples/);
 s.sampleCounts.physics=180;assert.throws(()=>assertBudgets(s),/update p95/);
});
