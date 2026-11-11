import test from 'node:test';
import assert from 'node:assert/strict';
import { RenderBudget } from '../../../public/games/hollow-crown/render-budget.js';

test('sustained slow rendering lowers resolution without unbounded storage or oscillation', () => {
  const budget = new RenderBudget(true);
  for(let i=0;i<10000;i++)budget.record(85);
  assert.equal(budget.scale,.8); assert.equal(budget.samples.length,40);
  for(let i=0;i<1200;i++)budget.record(16.7);
  assert.equal(budget.scale,1);
});
test('render budgeting ignores invalid timings and isolated scheduling stalls', () => {
  const budget = new RenderBudget();
  for(const sample of [NaN,Infinity,0,-20,5000])assert.equal(budget.record(sample),false);
  assert.equal(budget.frames,0);
  for(let i=0;i<90;i++)budget.record(i===20?800:16.7);
  assert.equal(budget.scale,1);
  budget.reset();assert.deepEqual(budget.samples,[]);
});

test('software resolution has a readable floor and two-window recovery hysteresis',()=>{
 const b=new RenderBudget(true);for(let i=0;i<240;i++)b.record(100);assert.equal(b.scale,.8);
 for(let i=0;i<120;i++)b.record(16);assert.equal(b.scale,.8);
 for(let i=0;i<120;i++)b.record(16);assert.equal(b.scale,.85);
});
