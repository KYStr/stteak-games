import assert from 'node:assert/strict';
import {writeFile,readFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
// No diagnostics/polling inside either 30-second measurement. CDP collects outside
// the page heap; UI input is dispatched before sampling starts.
export async function quietProfiles(page,cdp,artifacts) {
 const results=[];
 for(let interval=0;interval<2;interval++) {
  await page.locator('#world').focus();await page.keyboard.down('d');
  await page.waitForTimeout(3000);
  await cdp.send('HeapProfiler.collectGarbage');
  const before=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world);
  const heapBefore=await cdp.send('Runtime.getHeapUsage');
  const trace=[];const collect=event=>trace.push(...event.value);
  cdp.on('Tracing.dataCollected',collect);
  await cdp.send('Tracing.start',{categories:'v8,devtools.timeline,disabled-by-default-v8.gc',transferMode:'ReportEvents'});
  await cdp.send('HeapProfiler.startSampling',{samplingInterval:512,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
  const start=performance.now();
  let profile;
  try {
   await page.waitForTimeout(30000);
   ({profile}=await cdp.send('HeapProfiler.stopSampling'));
  } finally {await page.keyboard.up('d');}
  const elapsedMs=performance.now()-start;
  const complete=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');await complete;
  cdp.off('Tracing.dataCollected',collect);
  const heapEnd=await cdp.send('Runtime.getHeapUsage');
  const after=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world);
  await cdp.send('HeapProfiler.collectGarbage');const retained=await cdp.send('Runtime.getHeapUsage');
  await writeFile(`${artifacts}/quiet-${interval}-allocation.json`,JSON.stringify(profile));
  await writeFile(`${artifacts}/quiet-${interval}-trace.json`,JSON.stringify({traceEvents:trace}));
  const allocations=[];
  function walk(n) {if(n.selfSize)allocations.push({bytes:n.selfSize,frame:n.callFrame});for(const c of n.children)walk(c);}
  walk(profile.head);
  const frames=after.activeRenderedFrames-before.activeRenderedFrames;
  const app=allocations.filter(r=>r.frame.url.includes('/moss-and-moon/')&&!r.frame.url.includes('/vendor/'));
  const diagnostics=app.filter(r=>/metrics|value|stats/.test(r.frame.functionName));
  const recurring=app.filter(r=>!diagnostics.includes(r));
  // The source audit below checks explicit storage/closure creation in these
  // functions. Sampling does not identify types: native RAF bookkeeping and
  // double boxing remain possible. Preserve all direct frame bytes for review.
  const auditedFrame=recurring.filter(r=>['frame','blocked'].includes(r.frame.functionName));
  const unknown=recurring.filter(r=>!auditedFrame.includes(r));
  const minor=trace.filter(e=>e.name==='MinorGC'&&['X','B'].includes(e.ph)).length;
  const major=trace.filter(e=>e.name==='MajorGC'&&['X','B'].includes(e.ph)).length;
  const gcEventNames={};for(const e of trace)if(/GC/.test(e.name))gcEventNames[e.name]=(gcEventNames[e.name]||0)+1;
  const total=rows=>rows.reduce((n,r)=>n+r.bytes,0);
  const result={interval,elapsedMs,frames,before,after,heapBefore,heapEnd,retained,app,diagnostics,auditedFrame,unknown,
   sampledAppBytes:total(app),frameBytesPerFrame:total(auditedFrame)/frames,
   gcEventNames,minorGC:minor,majorGC:major,gcPerFrame:(minor+major)/frames,
   threeBytes:total(allocations.filter(r=>r.frame.url.includes('/vendor/'))),instrumentationBytes:total(allocations.filter(r=>!r.frame.url.includes('/moss-and-moon/')))};
  results.push(result);
  await writeFile(artifacts+'/quiet-intervals.json',JSON.stringify(results,null,2));
  assert.ok(frames>30,'quiet profile has active rendered frames');
  assert.deepEqual(unknown,[],'no recurring application object/array allocation outside audited numeric updates');
  assert.equal(after.staticStageRebuilds,before.staticStageRebuilds);
  assert.equal(after.geometries,before.geometries);assert.equal(after.textures,before.textures);
  assert.ok((retained.usedSize-heapBefore.usedSize)/heapBefore.usedSize<.10,'quiet interval retained heap <10%');
 }
 // Audit the actual shipped hot path alongside sampling. Reject new explicit
 // object/array/vector creation. Native numeric boxing is recorded, not hidden.
 const source=await readFile(new URL('../../public/games/moss-and-moon/world.js',import.meta.url),'utf8');
 const frame=source.slice(source.indexOf('  function frame(now)'),source.indexOf('  frameRequest = requestAnimationFrame(frame); //'));
 const blocked=source.slice(source.indexOf('  function blocked('),source.indexOf('  function animate('));
 assert.ok(!/\bnew\s|\.map\(|\.filter\(|\.clone\(|\.toArray\(|Math\.hypot\(/.test(frame+blocked),'hot loop uses reusable storage and scalar collision arithmetic');
 assert.ok(!/path = \[\]/.test(frame),'hot path reuses route storage');
 assert.ok(!/(?:^|[=(:,?])\s*[\[{]/m.test(frame+blocked),'no object or array literals in hot updates');
 assert.ok(!/\bfunction\b|=>/.test(frame.slice(frame.indexOf('{')+1)),'no closures constructed inside frame');
 const [a,b]=results;
 // Sampling is stochastic: compare normalized rates with a Poisson margin based
 // on 512-byte samples. A newly recurring allocation still fails above by name.
 const samplingMargin=3*512*Math.sqrt((a.sampledAppBytes+b.sampledAppBytes)/512+1)/Math.min(a.frames,b.frames);
 assert.ok(b.frameBytesPerFrame<=a.frameBytesPerFrame+samplingMargin,'direct frame allocation/frame does not increase beyond sampling uncertainty');
 assert.ok(b.gcPerFrame<=a.gcPerFrame+1/Math.min(a.frames,b.frames),'no increasing GC/frame rate (one-event quantization)');
 assert.ok((b.retained.usedSize-a.retained.usedSize)/a.retained.usedSize<.10,'equal quiet intervals retained heap <10%');
 return {intervals:results,classification:'Direct frame samples do not identify object types. Native callback registration/numeric boxing is inferred from the storage/closure source audit, not proved by sampling alone.',assessment:'No explicit recurring application storage construction; residual frame attribution retained; equal-interval GC, heap and residency gates passed.',samplingMargin};
}
