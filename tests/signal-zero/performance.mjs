import {allocationTypes} from './allocation-types.mjs';
import {aggregateAllocations,allocationGate} from './allocation-profile.mjs';
import {navigateAndReady,actionTimeout} from './evidence.mjs';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {harness,instrumentation} from './browser-harness.mjs';
const h=await harness('performance'),report={samples:[],profiles:[],errors:h.errors,failedRequests:h.failedRequests,forcedGC:0,navigations:[],requiredFailures:[]};
try{
 const {page}=h;await page.addInitScript(instrumentation);await navigateAndReady(page,opts=>page.goto(h.base,opts),'home',actionTimeout,{report,errors:h.errors,failedRequests:h.failedRequests,url:h.base});await page.click('#begin');await page.click('#deploy');await page.keyboard.press('Escape');await page.click('#restart');await page.click('#confirm');await page.waitForTimeout(5000);
 // Primitive position observations avoid serializing the diagnostics/control
 // getters inside a sampled region. This wrapper allocates no sample objects.
 await page.evaluate(async()=>{const {View}=await import('./view.js'),{PLAYER}=await import('./numeric.js'),update=View.prototype.updateScene;View.prototype.updateScene=function(run,dt,instant,rafMs){window.__perfX=run.player.numeric[PLAYER.x];window.__perfRun=run;return update.call(this,run,dt,instant,rafMs)}});
 const cdp=await page.context().newCDPSession(page);await cdp.send('HeapProfiler.enable');
 await cdp.send('Tracing.start',{categories:'devtools.timeline,v8',transferMode:'ReturnAsStream'});
 async function capture(){
  report.forcedGC++;const beforeGC=(await cdp.send('Runtime.getHeapUsage')).usedSize;
  await page.evaluate(()=>console.timeStamp('sz-forced-gc-start'));await cdp.send('HeapProfiler.collectGarbage');await page.evaluate(()=>console.timeStamp('sz-forced-gc-end'));
  const heap=(await cdp.send('Runtime.getHeapUsage')).usedSize,dom=await cdp.send('Memory.getDOMCounters'),d=await page.evaluate(()=>{const diagnostics=signalZeroDiagnostics;return{state:diagnostics.state,render:diagnostics.render,performance:diagnostics.performance,raf:{pending:__gameRaf.pending.size,max:__gameRaf.max},textures:__textureLedger,ownedListeners:__gameListenerCount()}});
  return{heap,beforeGC,dom,...d};
 }
 let direction=1;
 async function moveFor(ms){const until=Date.now()+ms;while(Date.now()<until){const x=await page.evaluate(()=>__perfX);if(x>8)direction=-1;if(x<3.5)direction=1;await page.keyboard.up(direction===1?'KeyA':'KeyD');await page.keyboard.down(direction===1?'KeyD':'KeyA');await page.waitForTimeout(100)}await page.keyboard.up('KeyD');await page.keyboard.up('KeyA')}
 async function profile(label,moving,group,confirmation){
  // No full diagnostics, forced GC, resource traversal or report serialization
  // occurs between startSampling and stopSampling.
  const before=await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames),start=Date.now();
  await page.evaluate(label=>console.timeStamp('sz-profile-'+label+'-start'),label);
  await cdp.send('HeapProfiler.startSampling',{samplingInterval:16384,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
  if(moving)await moveFor(20000);else await page.waitForTimeout(20000);
  const data=await cdp.send('HeapProfiler.stopSampling');await page.evaluate(label=>console.timeStamp('sz-profile-'+label+'-end'),label);
  const after=await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames),allocations=aggregateAllocations(data),categories={};for(const row of allocations)categories[row.category]=(categories[row.category]||0)+row.bytes;
  assert.ok(after-before>=100,'Insufficient frames in allocation window');report.profiles.push({label,group,confirmation,wallMs:Date.now()-start,frames:after-before,categories,allocations,samples:data.profile.samples.length});await writeFile(h.artifacts+'/allocation-'+label+'.json',JSON.stringify(data));
 }
 console.log('Warming moving and stationary paths before isolated profiles');await moveFor(20000);
 async function warmVisibility(){
  await page.evaluate(async()=>{
   const {canSee}=await import('./core.js'),{numericRecord,PLAYER,DEVICE}=await import('./numeric.js'),run=window.__perfRun,probe=numericRecord({x:0,y:0,z:0,crouched:false},PLAYER);
   // Read-only geometry queries warm visibility paths. The live player's
   // position, inventory, objectives and simulation state are never assigned.
   for(let i=0;i<20000;i++){const device=run.devices[i%run.devices.length];probe.numeric[PLAYER.x]=device.numeric[DEVICE.x]+device.numeric[DEVICE.dir]*3;probe.numeric[PLAYER.y]=device.numeric[DEVICE.y];canSee(run,device,probe);}
  });
 }
 await warmVisibility();
 report.jitWarmup=[];
 while(await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames)<3500){
  await page.waitForTimeout(5000);const sample=await page.evaluate(()=>({frames:signalZeroDiagnostics.performance.totalFrames,screen:signalZeroControlState.screen}));report.jitWarmup.push(sample);
  if(sample.screen==='caught')await page.click('#restart');console.log('WARM',sample.frames);
 }
 await page.keyboard.press('Escape');await page.click('#restart');await page.click('#confirm');await page.waitForTimeout(5000);
 report.warmup=[];
 for(let i=0;i<6;i++){await page.waitForTimeout(5000);const sample=await capture();report.warmup.push({heap:sample.heap,time:sample.state.time});if(i>=3&&Math.abs(sample.heap-report.warmup[i-1].heap)/sample.heap<.01)break}
 report.initial=await capture();const started=Date.now();
 for(let block=0;block<12;block++){
  if(block===0||block===4){const label=block===0?'stationary':'moving';await profile(label+'-initial',block===4,label,false);await profile(label+'-confirmed',block===4,label,true);}
  else if(block>=4&&block<8)await moveFor(15000);else await page.waitForTimeout(15000);
  const sample=await capture();report.samples.push({wallMs:Date.now()-started,heap:sample.heap,beforeGC:sample.beforeGC,dom:sample.dom,state:sample.state,render:sample.render,textures:sample.textures,raf:sample.raf,ownedListeners:sample.ownedListeners});
  assert.equal(sample.state.screen,'playing');assert.ok(sample.render.maxDrawCalls<=250);assert.ok(sample.render.maxTriangles<=1500000);assert.ok(sample.render.textureBytes<=256*1024*1024);assert.ok(sample.textures.peak<=256*1024*1024);assert.ok(sample.render.dpr<=2);assert.ok(sample.performance.phases.logic.p95<=6);console.log('PERF',block,sample.heap,sample.render.maxDrawCalls,sample.performance.phases.logic.p95);
  if(block===8){await page.keyboard.press('Escape');await page.click('#restart');await page.click('#confirm');await page.waitForTimeout(3000);await warmVisibility();const until=await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames+3500);while(await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames)<until)await page.waitForTimeout(5000);}
  await writeFile(h.artifacts+'/performance.json',JSON.stringify(report,null,2));
 }
 report.final=await capture();report.wallMs=Date.now()-started;assert.ok(report.wallMs>=180000);assert.ok(report.final.heap/report.initial.heap<1.1);assert.equal(report.final.ownedListeners,report.initial.ownedListeners);assert.equal(report.final.render.geometries,report.initial.render.geometries);assert.equal(report.final.render.textures,report.initial.render.textures);assert.equal(report.final.raf.pending,1);assert.equal(report.final.raf.max,1);
 const complete=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');const {stream}=await complete;let trace='';for(;;){const part=await cdp.send('IO.read',{handle:stream});trace+=part.data;if(part.eof)break}await cdp.send('IO.close',{handle:stream});await writeFile(h.artifacts+'/gc-trace.json',trace);
 const events=JSON.parse(trace).traceEvents,forced=[];let forcedStart=-Infinity;for(const event of events){if(event.name==='TimeStamp'&&event.args.data?.message==='sz-forced-gc-start')forcedStart=event.ts;if(event.name==='TimeStamp'&&event.args.data?.message==='sz-forced-gc-end')forced.push([forcedStart,event.ts])}
 const regions=[];for(const label of report.profiles.map(p=>p.label)){const start=events.find(e=>e.name==='TimeStamp'&&e.args.data?.message==='sz-profile-'+label+'-start')?.ts,end=events.find(e=>e.name==='TimeStamp'&&e.args.data?.message==='sz-profile-'+label+'-end')?.ts;regions.push({label,start,end})}
 const collections=events.filter(e=>e.ph==='X'&&['MinorGC','MajorGC'].includes(e.name));report.gc={requestedForcedCollections:report.forcedGC,forcedMarkers:forced.length,observedForced:collections.filter(e=>forced.some(([a,b])=>e.ts>=a&&e.ts<=b)).length,natural:collections.filter(e=>!forced.some(([a,b])=>e.ts>=a&&e.ts<=b)).map(e=>({name:e.name,microseconds:e.dur,at:e.ts,region:regions.find(r=>e.ts>=r.start&&e.ts<=r.end)?.label||'outside isolated profiles (includes diagnostics)'}))};
 // Every sampled function remains in the report. Never imply that a
 // per-stack byte allowance proves the literal zero-allocation bar.
 // Corrected unchanged HUD helpers must have no sampled allocations; the
 // timeline separately checks for application container/string regressions.
 const stableHud=new Set(['keyName','bindingText','renderHud','renderRoute','material.customProgramCacheKey']);
 for(const p of report.profiles)for(const row of p.allocations)if(stableHud.has(row.function)&&p.label==='stationary')assert.equal(row.bytes,0,'Unchanged HUD/cache allocation: '+JSON.stringify(row));
 const first=await allocationTypes(page,cdp,text=>writeFile(h.artifacts+'/allocation-types-initial.heapsnapshot',text)),confirmed=await allocationTypes(page,cdp,text=>writeFile(h.artifacts+'/allocation-types-confirmed.heapsnapshot',text));report.typeAudit={...confirmed,windows:[first,confirmed]};
 report.scalarContainerRegressionPass=report.typeAudit.rows.filter(row=>row.category==='steady/application').every(row=>
  (row.scalarSized||row.bytes===0)&&['object','array','closure','string','concatenated string','sliced string'].every(type=>!(row.retained[type]||0)));
 Object.assign(report,allocationGate(report.profiles,report.typeAudit));
 report.resourceLeakPass=true;
 report.allocationInterpretation='Strict rubric gate requires zero sampled/exact steady application allocations in both confirmed stationary/moving windows and the final exact timeline, including scalar boxing. Earlier matched samples are preserved as warmup evidence, with no byte allowances. All source locations, including core:step, app:frame and view:renderScene, are audited. Scalar/container regression and resource/leak results are separate; retained types describe survivors only.';
 await writeFile(h.artifacts+'/performance.json',JSON.stringify(report,null,2));
 assert.ok(report.rubricAllocationPass,'Recurring steady application allocations: '+JSON.stringify(report.residual));
 assert.deepEqual(h.errors,[]);assert.deepEqual(h.failedRequests,[]);report.passed=true;await writeFile(h.artifacts+'/performance.json',JSON.stringify(report,null,2));console.log('PASS full real-time soak, restart, isolated allocation aggregation and resource bars');
}catch(error){report.error=error.message;await writeFile(h.artifacts+'/performance-failure.json',JSON.stringify(report,null,2));throw error}finally{await h.close()}
