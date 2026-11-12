import assert from 'node:assert/strict';
export function sampleCountsFor({renderer,cpu}){
 return {scene:renderer.cpu?.update?.count||0,hud:cpu.hud?.count||0,physics:cpu.step?.count||0};
}
export function assertSamplingPrerequisites(sampleCounts,mode){
 assert.ok(sampleCounts?.scene>=180,`insufficient scene samples: ${sampleCounts?.scene} < 180`);
 assert.ok(sampleCounts?.hud>=20,`insufficient HUD samples: ${sampleCounts?.hud} < 20`);
 // An inactive scene may retain physics telemetry from its entry frame.
 // A nonempty percentile still needs a representative population.
 if(['sailing','diving'].includes(mode)||sampleCounts.physics>0)assert.ok(sampleCounts?.physics>=180,`insufficient physics samples: ${sampleCounts?.physics} < 180`);
}
export function updateP95For({renderer,cpu}){return (cpu.step?.p95||0)+(renderer.updateP95||0)+(cpu.hud?.p95||0);}
export function assertBudgets({renderer,cpu,textureBytes,transferBytes,sampleCounts,mode}){
 assertSamplingPrerequisites(sampleCounts,mode);
 assert.ok(renderer.maxDrawCalls<=250,`draw calls ${renderer.maxDrawCalls}>250 (shadow + main)`);
 assert.ok(renderer.maxTriangles<=1500000,'triangle budget');assert.ok(textureBytes<=256*1024*1024,'texture budget');assert.ok(transferBytes<=30*1024*1024,'transfer budget');
 const updateP95=updateP95For({renderer,cpu});assert.ok(updateP95<=6,`update p95 ${updateP95}>6ms`);return updateP95;
}
