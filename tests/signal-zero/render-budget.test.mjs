import test from 'node:test';
import assert from 'node:assert/strict';
import {RenderBudget} from '../../games/signal-zero/src/render-budget.js';

const feed=(budget,ms,n)=>{for(let i=0;i<n;i++)budget.sample(ms)};
test('software auto starts at the visual floor; sustained stalls cannot reduce it',()=>{
 const b=new RenderBudget(true);assert.equal(b.scale,.75);feed(b,80,1000);assert.equal(b.scale,.75);assert.equal(b.samples.length,120);
});
test('quality requires two slow windows and recovers only after five fast seconds',()=>{
 const b=new RenderBudget();feed(b,40,120);assert.equal(b.scale,1);feed(b,40,30);assert.equal(b.scale,1);feed(b,40,25);assert.equal(b.scale,.95);
 feed(b,16,500);assert.ok(b.scale>=.95&&b.scale<=1);assert.ok(b.summary.p95<=25);
});
test('paused intervals and resume warm-up never drive quality adaptation',()=>{
 const b=new RenderBudget();feed(b,NaN,500);feed(b,0,500);assert.equal(b.warmup,120);feed(b,60,120);assert.equal(b.scale,1);
 feed(b,60,100);assert.ok(b.scale<1);const previous=b.scale;b.resume();feed(b,1200,120);assert.equal(b.scale,previous);assert.equal(b.samples.length,0);b.reset();assert.equal(b.scale,1);
});
