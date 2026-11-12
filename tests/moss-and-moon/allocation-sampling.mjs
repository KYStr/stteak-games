import {writeFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
export const samplingOptions={samplingInterval:512,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true};
// Sampling and tracing stay in CDP. No page polling within the measured interval.
export async function sampleQuietInterval(page,cdp,artifacts,interval) {
 await page.locator('#world').focus();await page.keyboard.down('d');
 await page.waitForTimeout(3000);await cdp.send('HeapProfiler.collectGarbage');
 const before=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world);
 const heapBefore=await cdp.send('Runtime.getHeapUsage');
 const trace=[];const collect=event=>trace.push(...event.value);
 cdp.on('Tracing.dataCollected',collect);
 let profile,elapsedMs;
 try {
  await cdp.send('Tracing.start',{categories:'v8,devtools.timeline,disabled-by-default-v8.gc',transferMode:'ReportEvents'});
  await cdp.send('HeapProfiler.startSampling',samplingOptions);
  const start=performance.now();await page.waitForTimeout(30000);
  ({profile}=await cdp.send('HeapProfiler.stopSampling'));elapsedMs=performance.now()-start;
 } finally {
  await page.keyboard.up('d');
  const complete=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));
  await cdp.send('Tracing.end');await complete;cdp.off('Tracing.dataCollected',collect);
 }
 const heapEnd=await cdp.send('Runtime.getHeapUsage');
 const after=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world);
 await cdp.send('HeapProfiler.collectGarbage');const retained=await cdp.send('Runtime.getHeapUsage');
 await writeFile(`${artifacts}/quiet-${interval}-allocation.json`,JSON.stringify(profile));
 await writeFile(`${artifacts}/quiet-${interval}-trace.json`,JSON.stringify({traceEvents:trace}));
 const allocations=[],directIds=new Set();
 function walk(n,parents) {
  const stack=[...parents,n.callFrame];
  if(n.selfSize)allocations.push({nodeId:n.id,bytes:n.selfSize,frame:n.callFrame,stack});
  if(n.callFrame.functionName==='frame'&&n.callFrame.url.endsWith('/world.js'))directIds.add(n.id);
  for(const child of n.children)walk(child,stack);
 }
 walk(profile.head,[]);
 const total=rows=>rows.reduce((n,r)=>n+r.bytes,0);
 const frames=after.activeRenderedFrames-before.activeRenderedFrames;
 const app=allocations.filter(r=>r.frame.url.includes('/moss-and-moon/')&&!r.frame.url.includes('/vendor/'));
 const directFrame=app.filter(r=>directIds.has(r.nodeId));
 const directSamples=profile.samples.filter(s=>directIds.has(s.nodeId));
 const minorGC=trace.filter(e=>e.name==='MinorGC'&&['X','B'].includes(e.ph)).length;
 const majorGC=trace.filter(e=>e.name==='MajorGC'&&['X','B'].includes(e.ph)).length;
 const gcEventNames={};for(const e of trace)if(/GC/.test(e.name))gcEventNames[e.name]=(gcEventNames[e.name]||0)+1;
 const result={interval,elapsedMs,frames,before,after,heapBefore,heapEnd,retained,allocations,app,directFrame,
  sampledAppBytes:total(app),frameBytesPerFrame:total(directFrame)/frames,
  directSampleCount:directSamples.length,directSampleSquaredBytes:directSamples.reduce((n,s)=>n+s.size*s.size,0),
  // Standard error of the compound Poisson sample sum, normalized by actual frames.
  directStandardError:Math.sqrt(directSamples.reduce((n,s)=>n+s.size*s.size,0))/frames,
  gcEventNames,minorGC,majorGC,gcPerFrame:(minorGC+majorGC)/frames,
  threeBytes:total(allocations.filter(r=>r.frame.url.includes('/vendor/'))),
  instrumentationBytes:total(allocations.filter(r=>!r.frame.url.includes('/moss-and-moon/')))};
 await writeFile(`${artifacts}/quiet-${interval}-stacks.json`,JSON.stringify(result,null,2));
 return result;
}
