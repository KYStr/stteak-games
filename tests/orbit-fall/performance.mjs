import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {snapshot,press,travel,fly} from './flight.mjs';
const distribution=a=>{const sorted=[...a].sort((a,b)=>a-b);return {samples:a.length,averageMs:a.length?a.reduce((a,b)=>a+b,0)/a.length:0,p95Ms:sorted[Math.floor(sorted.length*.95)]||0,maxMs:sorted.at(-1)||0}};
export async function performanceSoak(page,context,evidence){
 const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 const metrics=async(gc=false)=>{if(gc)await cdp.send('HeapProfiler.collectGarbage');const values=(await cdp.send('Performance.getMetrics')).metrics;return {...Object.fromEntries(values.filter(x=>['JSHeapUsedSize','Nodes','JSEventListeners'].includes(x.name)).map(x=>[x.name,x.value])),pendingRaf:await page.evaluate(()=>window.testPendingRaf?.size),textureBudget:await page.evaluate(()=>window.testTextureBudget||null),renderer:(await snapshot(page)).renderer}};
 const restart=async()=>{await press(page,'Escape');await page.click('#checkpoint');await travel(page,'room-d3-optics')};
 const result={fixtureAssisted:true,costFailures:[],interruptions:[],observations:[],allocationProfiles:[]};
 try{
  // The functional flight has warmed every legacy room. Warm the actual restart
  // path and a complete hazard cycle before the first forced-GC endpoint.
  await restart();await page.waitForTimeout(7500);
  result.before=await metrics(true);const initial=await snapshot(page),start=performance.now(),seconds=Number(process.env.ORBIT_SOAK_SECONDS||180);let restarted=false;
  await cdp.send('HeapProfiler.startSampling',{samplingInterval:32768,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
  while(performance.now()-start<seconds*1000){
   await page.waitForTimeout(Math.min(5000,Math.max(0,seconds*1000-(performance.now()-start))));const s=await snapshot(page);result.observations.push({wallMs:performance.now()-start,snapshot:s,unforcedHeap:await metrics()});
   if(s.modal==='interruption'){result.interruptions.push(s);await page.evaluate(()=>document.querySelector('#resume')?.click())}
   if(!restarted&&performance.now()-start>seconds*500){await restart();restarted=true;result.restartWallMs=performance.now()-start}
   if(result.observations.length%6===0)console.log(`Soak: ${(performance.now()-start)/1000|0}/${seconds}s`);
  }
  result.wallMs=performance.now()-start;result.after=await metrics(true);const final=await snapshot(page),count=Math.min(54000,final.totalActiveFrames-initial.totalActiveFrames);
  result.rawIntervals=(await page.evaluate(()=>__orbitDiagnostics.frames())).slice(-count);result.rawUpdateMs=(await page.evaluate(()=>__orbitDiagnostics.updates())).slice(-count);result.allFrames=distribution(result.rawIntervals);result.updateTime=distribution(result.rawUpdateMs);result.activeBrowserSeconds=final.activeBrowserSeconds-initial.activeBrowserSeconds;result.simulationSeconds=final.elapsed-initial.elapsed;result.cpuThrottleRate=1;result.requestedSeconds=seconds;result.developmentShortRun=seconds<180;
  const profile=await cdp.send('HeapProfiler.stopSampling');await writeFile(new URL('allocation-profile-optics.json',evidence),JSON.stringify(profile));result.allocationProfiles.push('allocation-profile-optics.json');
  const frames=result.observations.map(o=>o.snapshot.renderer);result.maxDrawCalls=Math.max(...frames.map(r=>r.drawCalls));result.maxTriangles=Math.max(...frames.map(r=>r.triangles));result.maxTextureBytes=Math.max(...result.observations.map(o=>o.unforcedHeap.textureBudget?.peakBytes??Infinity));result.retainedHeapGrowth=(result.after.JSHeapUsedSize-result.before.JSHeapUsedSize)/result.before.JSHeapUsedSize;
  const check=(condition,message)=>{if(!condition)result.costFailures.push(message)};
  check(result.allFrames.samples>0,'Nonempty frame evidence');check(result.wallMs>=seconds*1000,'Monotonic observation duration');check(restarted,'Actual restart inside observation window');check(result.maxDrawCalls<=250,'Draw calls <=250');check(result.maxTriangles<=1500000,'Triangles <=1.5 million');check(result.maxTextureBytes<=256*1024*1024,'Texture bytes <=256 MiB');check(result.updateTime.p95Ms<=6,'Complete application update p95 <=6ms, render excluded');check(result.retainedHeapGrowth<.10,'Retained heap growth <10%');
  for(const key of ['JSEventListeners','pendingRaf'])check(result.before[key]===result.after[key],`Stable ${key}`);
  for(const key of ['geometries','textures'])check(result.before.renderer[key]===result.after.renderer[key],`Stable renderer ${key}`);
  check(result.after.renderer.dpr<=2,'DPR capped <=2');
  // Software-renderer intervals and interruptions are reported, never FPS gates.
  await travel(page,'room-d2-cargo');const cargo=await snapshot(page);await fly(page,[cargo.crate.x,cargo.crate.y,cargo.crate.z+1.8]);await press(page,'t');assert.equal((await snapshot(page)).tethered,true);await cdp.send('HeapProfiler.startSampling',{samplingInterval:32768,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});await page.waitForTimeout(10000);const cargoProfile=await cdp.send('HeapProfiler.stopSampling');await writeFile(new URL('allocation-profile-cargo.json',evidence),JSON.stringify(cargoProfile));result.allocationProfiles.push('allocation-profile-cargo.json');assert.deepEqual(result.costFailures,[]);result.passed=true;return result;
 }catch(e){result.failure=e.stack;throw e}finally{await cdp.send('HeapProfiler.stopSampling').catch(()=>{});await cdp.detach();await writeFile(new URL('performance.json',evidence),JSON.stringify(result,null,2))}
}
