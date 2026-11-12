import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {allocationComparison,intervalGates,resourceGates} from '../../moss-and-moon/allocation-gates.mjs';
const recorded=JSON.parse(await readFile(new URL('../../moss-and-moon/fixtures/r4-allocation-failure.json',import.meta.url)));
const [before,after]=recorded.intervals.map(r=>({...r,directStandardError:Math.sqrt(r.sampleWeights.reduce((n,w)=>n+w*w,0))/r.frames}));
test('retained independent failure reconciles variable sample weights without discarding interval zero',()=>{
 const originalMargin=3*512*Math.sqrt((before.sampledAppBytes+after.sampledAppBytes)/512+1)/Math.min(before.frames,after.frames);
 assert.equal(after.frameBytesPerFrame<=before.frameBytesPerFrame+originalMargin,false);
 assert.ok(Math.abs(originalMargin-96.7944)<.001);
 const result=allocationComparison(before,after);
 assert.equal(result.beforeFrames,396);assert.equal(result.afterFrames,437);
 assert.ok(Math.abs(result.deltaBytesPerFrame-101.06548320735965)<1e-8);
 assert.ok(Math.abs(result.samplingMargin-193.9199252872633)<1e-8);
 assert.equal(result.pass,true);
});
test('observed-weight uncertainty still rejects a large recurring increase',()=>{
 const injected={...after,frameBytesPerFrame:after.frameBytesPerFrame+1600};
 assert.equal(allocationComparison(before,injected).pass,false);
});
test('named residency/resource failures accumulate independently',()=>{
 const world={drawCalls:251,triangles:1500001,dpr:2.1,textureBytesBound:256*1024*1024+1};
 assert.equal(resourceGates(world,'dense').filter(g=>!g.pass).length,4);
 const start={staticStageRebuilds:1,geometries:1,textures:1},end={staticStageRebuilds:2,geometries:2,textures:2};
 const gates=intervalGates({interval:0,frames:100,before:start,after:end,retained:{usedSize:111},heapBefore:{usedSize:100}});
 assert.equal(gates.filter(g=>!g.pass).length,4);
});

test('all unchanged control intervals pass but a bounded steady churn fails independently of growth',async()=>{
 const {referenceAllocationGate}=await import('../../moss-and-moon/allocation-gates.mjs');
 const reference=JSON.parse(await readFile(new URL('../../moss-and-moon/fixtures/numeric-path-reference.json',import.meta.url)));
 for(const interval of reference.records)assert.equal(referenceAllocationGate(interval,reference).pass,true);
 // Equal rates in both windows would pass a temporal-growth-only test. The
 // absolute matched-path reference rejects that steady recurring allocation.
 const steady={...reference.records[0],frameBytesPerFrame:2000};
 assert.equal(allocationComparison(steady,steady).pass,true);
 assert.equal(referenceAllocationGate(steady,reference).pass,false);
});
