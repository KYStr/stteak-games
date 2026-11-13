import test from 'node:test';import assert from 'node:assert/strict';
import {clamp,minimumRadius} from '../../../public/games/hollow-crown/numeric.js';
test('scalar clamp exactly preserves Math coercion, bounds, infinities, NaN and signed zero',()=>{
 const values=[NaN,-Infinity,Infinity,-0,0,-1,1,-.1,.1,Number.MIN_VALUE,-Number.MIN_VALUE,Number.MAX_VALUE,-Number.MAX_VALUE,'2',null,undefined];
 for(const n of values)for(const a of values)for(const b of values)assert.ok(Object.is(clamp(n,a,b),Math.max(a,Math.min(b,n))),`clamp ${String(n)} / ${String(a)} / ${String(b)}`);
 for(const v of [Symbol('x'),1n])assert.throws(()=>clamp(v,-1,1),TypeError);
});
test('minimum collision radius preserves effective values and legacy coercion',()=>{
 for(const value of [NaN,-Infinity,Infinity,-0,0,.0001,.001,.04,1,'0.04',null,undefined])assert.ok(Object.is(minimumRadius(value),Math.max(.001,value)));
});

import {NumericRing} from '../../../public/games/hollow-crown/ring-buffer.js';
test('ring summaries preserve wrapped order, recent averages and exact sorted/chronological statistics',()=>{
 const ring=new NumericRing(4);for(let i=0;i<100;i++)ring.push(i);assert.deepEqual(ring.summary(2),{length:4,mean:97.5,sortedMean:97.5,recentMean:98.5,p95:99});assert.deepEqual(ring.toArray(),[96,97,98,99]);
 for(const values of [[1e16,-1e16,1],[1,NaN,2],[-0,0,-0],[Infinity,1,-Infinity],[13.3,17.8,45.9,3.1,19.5]]){const r=new NumericRing(values.length);for(const v of values)r.push(v);const before=r.toArray(),sorted=before.slice().sort((a,b)=>a-b),result=r.summary(2);assert.ok(Object.is(result.mean,before.reduce((a,b)=>a+b,0)/before.length));assert.ok(Object.is(result.sortedMean,sorted.reduce((a,b)=>a+b,0)/sorted.length));assert.ok(Object.is(result.p95,sorted[Math.floor(sorted.length*.95)]));assert.ok(Object.is(result.recentMean,before.slice(-2).reduce((a,b)=>a+b,0)/Math.min(2,before.length)));assert.deepEqual(r.toArray(),before);}
});
