import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {snapshot,press,travel,fly,pauseMenu,dismissInterruption} from './flight.mjs';
import {analyzeAllocation} from './allocation-analysis.mjs';
const distribution=a=>{const sorted=[...a].sort((a,b)=>a-b);return {samples:a.length,averageMs:a.length?a.reduce((a,b)=>a+b,0)/a.length:0,p95Ms:sorted[Math.floor(sorted.length*.95)]||0,maxMs:sorted.at(-1)||0}};
function allocations(profile){
 const totals={},functions={};
 const visit=(node,family='browser/setup')=>{const f=node.callFrame,url=f.url||'';if(url.includes('vendor/three'))family='Three renderer';else if(url.includes('vendor/rapier'))family='Rapier bindings';else if(/\/(main|scene|physics|rules|models|audio|marker-layout)\.js/.test(url))family='application';else if(/evaluate|pptr:/.test(url))family='Playwright serialization';totals[family]=(totals[family]||0)+node.selfSize;const key=`${f.functionName} @ ${url}:${f.lineNumber}`;functions[key]=(functions[key]||0)+node.selfSize;for(const child of node.children||[])visit(child,family)};
 visit(profile.head);return {sampledBytesByFamily:totals,topFunctions:Object.entries(functions).sort((a,b)=>b[1]-a[1]).slice(0,30),shaderSetupSampledBytes:Object.entries(functions).filter(([key])=>/getParameters|getProgramCacheKey/.test(key)).reduce((n,[,bytes])=>n+bytes,0)};
}
export async function performanceSoak(page,context,evidence){
 const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 const metrics=async(gc=false)=>{if(gc)await cdp.send('HeapProfiler.collectGarbage');const values=(await cdp.send('Performance.getMetrics')).metrics;return {...Object.fromEntries(values.filter(x=>['Timestamp','JSHeapUsedSize','Nodes','JSEventListeners'].includes(x.name)).map(x=>[x.name,x.value])),pendingRaf:await page.evaluate(()=>window.testPendingRaf?.size),textureBudget:await page.evaluate(()=>window.testTextureBudget||null),renderer:(await snapshot(page)).renderer}};
 const restart=async()=>{await pauseMenu(page);await page.click('.overlay[data-screen=pause] #checkpoint');await travel(page,'room-d3-optics')};
 const result={fixtureAssisted:true,costFailures:[],interruptions:[],observations:[],allocationProfiles:[],gcWindows:[],profilingNotes:'Hot binding reads use guarded copy-into and owned native velocity/gravity vectors; 600-step unit audit counts wrapper/finalizer calls. Sampling estimates allocation, not retained heap. Playwright evaluation/setup attributed separately. Restart construction is profiled separately from steady frames.'};
 const trace=[];let tracing=false,initial,start,restarted=false,profileStarted=false;
 const sampleStart=async()=>{await cdp.send('HeapProfiler.startSampling',{samplingInterval:32768,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});profileStarted=true};
 const sampleStop=async name=>{const {profile}=await cdp.send('HeapProfiler.stopSampling');profileStarted=false;await writeFile(new URL(name,evidence),JSON.stringify({profile}));result.allocationProfiles.push(name);(result.allocations ||= {})[name]={...allocations(profile),stackAttribution:analyzeAllocation(profile)}};
 const activeWait=async seconds=>{const begin=await snapshot(page),wall=performance.now();while((await snapshot(page)).activeBrowserSeconds-begin.activeBrowserSeconds<seconds){if(performance.now()-wall>Math.max(120000,seconds*10000))throw Error('Warmup inconclusive: insufficient active frames');if(await dismissInterruption(page))result.interruptions.push(await snapshot(page));await page.waitForTimeout(500)}};
 try{
  await restart();await activeWait(8);await restart();await activeWait(8);
  result.before=await metrics(true);initial=await snapshot(page);start=performance.now();const seconds=Number(process.env.ORBIT_SOAK_SECONDS||180),ceiling=Number(process.env.ORBIT_SOAK_WALL_SECONDS||Math.max(900,seconds*5));result.requestedSeconds=seconds;result.hardWallCeilingSeconds=ceiling;result.developmentShortRun=seconds<180;
  cdp.on('Tracing.dataCollected',data=>{for(const event of data.value)if(/GC|Scavenge|MarkCompact/.test(event.name))trace.push(event)});
  await cdp.send('Tracing.start',{categories:'v8,devtools.timeline,disabled-by-default-v8.gc',transferMode:'ReportEvents'});tracing=true;await sampleStart();
  while(true){
   await page.waitForTimeout(2000);let s=await snapshot(page),active=s.activeBrowserSeconds-initial.activeBrowserSeconds;
   result.observations.push({wallMs:performance.now()-start,activeBrowserSeconds:active,snapshot:s,unforcedHeap:await metrics()});
   if(s.modal==='interruption'){result.interruptions.push(s);await dismissInterruption(page)}else assert.equal(s.modal,null,'Soak must remain active');
   if(active>=seconds)break;
   if(performance.now()-start>ceiling*1000)throw Error(`Soak inconclusive: only ${active} active seconds at hard wall ceiling ${ceiling}s`);
   if(!restarted&&active>=seconds/2){
    await sampleStop('allocation-profile-optics-before-restart.json');await sampleStart();await restart();await activeWait(3);await sampleStop('allocation-profile-restart.json');await sampleStart();restarted=true;result.restartWallMs=performance.now()-start;
   }
   if(result.observations.length%10===0)console.log(`Soak: ${active.toFixed(1)}/${seconds} active s; ${((performance.now()-start)/1000).toFixed(1)} wall s`);
  }
  await sampleStop('allocation-profile-optics.json');
  const complete=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');await complete;tracing=false;await writeFile(new URL('gc-trace.json',evidence),JSON.stringify({traceEvents:trace}));
  result.wallMs=performance.now()-start;const final=await snapshot(page);result.after=await metrics(true);const count=Math.min(54000,final.totalActiveFrames-initial.totalActiveFrames);
  result.rawIntervals=(await page.evaluate(()=>__orbitDiagnostics.frames())).slice(-count);result.rawUpdateMs=(await page.evaluate(()=>__orbitDiagnostics.updates())).slice(-count);result.allFrames=distribution(result.rawIntervals);result.updateTime=distribution(result.rawUpdateMs);result.activeBrowserSeconds=final.activeBrowserSeconds-initial.activeBrowserSeconds;result.simulationSeconds=final.elapsed-initial.elapsed;result.cpuThrottleRate=1;
  // CDP timestamps and trace ts share the monotonic browser clock. Map events
  // using observed active-time anchors; interruptions add no active time.
  const anchors=[{active:0,ts:result.before.Timestamp*1e6},...result.observations.map(o=>({active:o.activeBrowserSeconds,ts:o.unforcedHeap.Timestamp*1e6}))];
  const gcEvents=trace.filter(e=>['MinorGC','MajorGC'].includes(e.name)&&e.ph==='X');
  const activeAt=ts=>{let before=anchors[0];for(const after of anchors.slice(1)){if(ts<=after.ts)return before.active+(after.active-before.active)*Math.max(0,Math.min(1,(ts-before.ts)/(after.ts-before.ts)));before=after}return before.active};
  const windowSeconds=seconds<180?seconds/3:60;
  for(let i=0;i<Math.floor(result.activeBrowserSeconds/windowSeconds);i++){const events=gcEvents.filter(e=>{const t=activeAt(e.ts);return t>=i*windowSeconds&&t<(i+1)*windowSeconds});result.gcWindows.push({activeStart:i*windowSeconds,activeEnd:(i+1)*windowSeconds,minor:events.filter(e=>e.name==='MinorGC').length,major:events.filter(e=>e.name==='MajorGC').length,totalDurationMs:events.reduce((sum,e)=>sum+(e.dur||0)/1000,0)})}
  result.gcEvidence={file:'gc-trace.json',rawEvents:trace.length,topLevelEvents:gcEvents.length,eventNames:[...new Set(trace.map(e=>e.name))],restartIncluded:true};
  const frames=result.observations.map(o=>o.snapshot.renderer);result.maxDrawCalls=Math.max(...frames.map(r=>r.drawCalls));result.maxTriangles=Math.max(...frames.map(r=>r.triangles));result.maxTextureBytes=Math.max(...result.observations.map(o=>o.unforcedHeap.textureBudget?.peakBytes??Infinity));result.retainedHeapGrowth=(result.after.JSHeapUsedSize-result.before.JSHeapUsedSize)/result.before.JSHeapUsedSize;
  const check=(condition,message)=>{if(!condition)result.costFailures.push(message)};
  check(result.allFrames.samples>0,'Nonempty frame evidence');check(result.activeBrowserSeconds>=seconds,'Requested active browser duration');check(restarted,'Actual restart inside observation window');check(result.maxDrawCalls<=250,'Draw calls <=250');check(result.maxTriangles<=1500000,'Triangles <=1.5 million');check(result.maxTextureBytes<=256*1024*1024,'Texture bytes <=256 MiB');check(result.updateTime.p95Ms<=6,'Complete application update p95 <=6ms, render excluded');check(result.retainedHeapGrowth<.10,'Retained heap growth <10%');
  for(const key of ['JSEventListeners','pendingRaf'])check(result.after[key]<=result.before[key],`No growth in ${key}`);
  for(const key of ['geometries','textures'])check(result.after.renderer[key]<=result.before.renderer[key],`No growth in renderer ${key}`);
  check(result.after.renderer.dpr<=2,'DPR capped <=2');check(trace.length>0,'Raw GC evidence captured');
  // Equal active-time windows expose a rising collection rate. Construction on
  // restart is allowed one extra collection; a sustained doubling is a failure.
  if(result.gcWindows.length>=3){const first=result.gcWindows[0],last=result.gcWindows.at(-1);check(last.minor<=Math.max(3,first.minor*2+1),'No increasing steady GC frequency');check(last.major<=Math.max(2,first.major+1),'No increasing major GC frequency')}
  const steadyNames=['allocation-profile-optics-before-restart.json','allocation-profile-optics.json'];for(const name of steadyNames)check(result.allocations[name].shaderSetupSampledBytes===0,`No recurring shader parameter/cache-key allocation in ${name}`);
  const [beforeProfile,afterProfile]=steadyNames.map(name=>result.allocations[name].stackAttribution.recurringRafCandidates);result.recurringRafSites=Object.keys(beforeProfile).filter(key=>afterProfile[key]>0).map(key=>({site:key,beforeBytes:beforeProfile[key],afterBytes:afterProfile[key]}));check(result.recurringRafSites.length===0,'No recurring authored/physics/renderer RAF allocation sites across both steady optics profiles');
  // Software frame intervals are reference evidence only. Measure moving cargo
  // separately, keeping profiling and public getter costs visible.
  await travel(page,'room-d2-cargo');const cargo=await snapshot(page);await fly(page,[cargo.crate.x,cargo.crate.y,cargo.crate.z+1.8],{tetherApproach:true});await press(page,'t');assert.equal((await snapshot(page)).tethered,true);await sampleStart();const movingStart=await snapshot(page);await fly(page,[cargo.repair.target[0],cargo.repair.target[1],cargo.repair.target[2]+1.3],{radius:.45});await activeWait(10);const movingEnd=await snapshot(page);result.cargoMotion={before:movingStart.crate,after:movingEnd.crate,simulationSeconds:movingEnd.elapsed-movingStart.elapsed};check(Math.hypot(movingEnd.crate.x-movingStart.crate.x,movingEnd.crate.y-movingStart.crate.y,movingEnd.crate.z-movingStart.crate.z)>1,'Cargo allocation profile includes >1m actual cargo movement');await sampleStop('allocation-profile-cargo.json');
  result.passed=result.costFailures.length===0;return result;
 }catch(e){result.failure=e.stack;throw e}finally{if(profileStarted)await cdp.send('HeapProfiler.stopSampling').catch(()=>{});if(tracing){const complete=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end').catch(()=>{});await Promise.race([complete,new Promise(resolve=>setTimeout(resolve,2000))]);await writeFile(new URL('gc-trace.json',evidence),JSON.stringify({traceEvents:trace}))}await cdp.detach();await writeFile(new URL('performance.json',evidence),JSON.stringify(result,null,2))}
}
