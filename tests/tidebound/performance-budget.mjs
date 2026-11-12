import assert from 'node:assert/strict';
export function assertBudgets({renderer,cpu,textureBytes,transferBytes}){
 assert.ok(renderer.maxDrawCalls<=250,`draw calls ${renderer.maxDrawCalls}>250 (shadow + main)`);
 assert.ok(renderer.maxTriangles<=1500000,'triangle budget');assert.ok(textureBytes<=256*1024*1024,'texture budget');assert.ok(transferBytes<=30*1024*1024,'transfer budget');
 const updateP95=(cpu.step?.p95||0)+(renderer.updateP95||0)+(cpu.hud?.p95||0);assert.ok(updateP95<=6,`update p95 ${updateP95}>6ms`);return updateP95;
}
