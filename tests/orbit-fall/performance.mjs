import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {snapshot} from './flight.mjs';
const distribution=a=>{const sorted=[...a].sort((a,b)=>a-b);return {samples:a.length,averageMs:a.reduce((a,b)=>a+b,0)/a.length,p95Ms:sorted[Math.floor(sorted.length*.95)],maxMs:sorted.at(-1)}};
export async function performanceSoak(page,context,evidence){
 const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});
 const metrics=async()=>{await cdp.send('HeapProfiler.collectGarbage');const values=(await cdp.send('Performance.getMetrics')).metrics;return {...Object.fromEntries(values.filter(x=>['JSHeapUsedSize','Nodes','JSEventListeners'].includes(x.name)).map(x=>[x.name,x.value])),pendingRaf:await page.evaluate(()=>window.testPendingRaf?.size),renderer:(await snapshot(page)).renderer}};
 // Warm a complete six-second electrical phase so lazily uploaded hazard
 // geometry is included in the baseline rather than mistaken for a leak.
 await page.waitForFunction(()=>__orbitDiagnostics.snapshot().elapsed>=0);await page.waitForTimeout(7500);
 const seconds=process.env.ORBIT_SOAK_SECONDS?Number(process.env.ORBIT_SOAK_SECONDS):180,attempts=[];
 try{for(let attempt=0;attempt<2;attempt++){
  const before=await metrics(),initial=await snapshot(page),start=performance.now(),observations=[],interruptions=[];
  for(let elapsed=0;elapsed<seconds;elapsed+=5){if(elapsed%30===0)console.log(`Soak ${attempt+1}: ${elapsed}/${seconds}s`);await page.waitForTimeout(Math.min(5,seconds-elapsed)*1000);const s=await snapshot(page);observations.push({wallMs:performance.now()-start,hidden:s.hidden,modal:s.modal,elapsed:s.elapsed,steps:s.simulationSteps,renderer:s.renderer});if(s.modal==='interruption'){interruptions.push(s);await page.evaluate(()=>document.getElementById('resume').click())}}
  const final=await snapshot(page),wallMs=performance.now()-start,intervals=(await page.evaluate(()=>__orbitDiagnostics.frames())).slice(-Math.min(54000,final.totalActiveFrames-initial.totalActiveFrames)),after=await metrics(),windows=[];let window=[];
  for(const ms of intervals){if(ms>1000){if(window.length)windows.push(window);window=[];}else window.push(ms)}if(window.length)windows.push(window);
  const longest=windows.sort((a,b)=>b.reduce((x,y)=>x+y,0)-a.reduce((x,y)=>x+y,0))[0]||[];
  const updateMs=(await page.evaluate(()=>__orbitDiagnostics.updates())).slice(-Math.min(54000,final.totalActiveFrames-initial.totalActiveFrames));
  const result={updateTime:distribution(updateMs),rawUpdateMs:updateMs,requestedSeconds:seconds,wallMs,activeBrowserSeconds:final.activeBrowserSeconds-initial.activeBrowserSeconds,simulationSeconds:(final.simulationSteps-initial.simulationSteps)/60,renderCount:final.renderer.renderCount-initial.renderer.renderCount,cpuThrottleRate:1,rawIntervals:intervals,allFrames:distribution(intervals),uninterruptedWindow:{durationMs:longest.reduce((a,b)=>a+b,0),...distribution(longest)},interruptions,observations,before,after,interrupted:interruptions.length>0||final.longGaps.length>initial.longGaps.length};attempts.push(result);
  assert.ok(result.updateTime.p95Ms<=5,'Per-frame JS update p95 <=5 ms (render excluded)');assert.ok(after.JSHeapUsedSize-before.JSHeapUsedSize<5e6,'Retained heap growth <5 MB');assert.equal(after.JSEventListeners,before.JSEventListeners,'Stable listeners');assert.equal(after.pendingRaf,before.pendingRaf,'Stable RAF count');assert.equal(after.renderer.geometries,before.renderer.geometries);assert.equal(after.renderer.textures,before.renderer.textures);assert.ok(after.renderer.drawCalls<=70,'C2 draw-call budget');assert.ok(after.renderer.drawingBuffer[0]>=960&&after.renderer.drawingBuffer[1]>=540,'Normal clarity floor');assert.ok(result.allFrames.samples>seconds*8,'Frame sample minimum');
  if(!result.interrupted){if(seconds>=180){assert.ok(result.allFrames.averageMs<=33.3,`SwiftShader average ${result.allFrames.averageMs} ms >33.3 ms`);assert.ok(result.allFrames.p95Ms<=40,`SwiftShader p95 ${result.allFrames.p95Ms} ms >40 ms`)}return {attempts,passed:true,developmentShortRun:seconds<180};}
  console.log('Host interruption retained in evidence; retrying the full measurement');
 }throw Error('Both performance attempts were interrupted; no uninterrupted pass claimed');
 }finally{await writeFile(new URL('performance.json',evidence),JSON.stringify({attempts},null,2))}
}
