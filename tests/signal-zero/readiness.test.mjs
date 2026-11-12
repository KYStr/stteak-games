import {test} from 'node:test';
import assert from 'node:assert/strict';
import {navigateAndReady} from './evidence.mjs';
function page(snapshots){let i=0;return{url:()=>'/game',evaluate:async()=>i++===0?100:snapshots[Math.min(i-2,snapshots.length-1)]}}
const ready={origin:200,ready:'interactive',screen:'home',calls:80,error:null};
test('readiness waits for commit, a new document and a rendered application',async()=>{
 const report={},p=page([{...ready,origin:100},{...ready,calls:0},ready]);let options;
 await navigateAndReady(p,async opts=>{options=opts},'home',1000,{report,url:'/attempt'});
 assert.equal(options.waitUntil,'commit');assert.equal(report.navigations[0].origin,200);assert.ok(report.navigations[0].readyMs>=report.navigations[0].commitMs);assert.deepEqual(report.requiredFailures||[],[]);assert.equal(report.navigations[0].previousOrigin,100);
});
test('synthetic failed import boot rejects readiness and records required failure',async()=>{
 const report={navigations:[],requiredFailures:[]};await assert.rejects(navigateAndReady(page([{...ready,screen:'error',error:'Failed to resolve module'}]),async()=>{},'home',1000,{report,errors:['module failure'],failedRequests:['/missing.js']}),/Failed to resolve module/);
 assert.equal(report.requiredFailures.length,1);assert.deepEqual(report.navigations[0].failedRequests,['/missing.js']);
});
test('stale rendered document cannot satisfy reload readiness',async()=>{
 await assert.rejects(navigateAndReady(page([{...ready,origin:100}]),async()=>{},'home',60),/readiness deadline expired/);
});
test('history restoration can retain time origin and paused screen',async()=>{
 const observed=await navigateAndReady(page([{...ready,origin:100,screen:'pause'}]),async()=>{},['home','pause'],500,{history:true});assert.equal(observed.screen,'pause');
});
