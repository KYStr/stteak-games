import assert from 'node:assert/strict';import {writeFile} from 'node:fs/promises';import {url,artifact,harness} from './test-config.mjs';
const runner=await harness(),report={method:'No controller, no snapshots/diagnostic cloning in hot windows. Tutorial idle after 30s warmup. Two equal 30s V8 allocation/GC windows.',windows:[],errors:[]};
try{
 const page=await runner.browser.newPage({viewport:{width:1280,height:720}});page.on('pageerror',e=>report.errors.push(e.message));page.on('console',e=>{if(e.type()==='error')report.errors.push(e.text());});await page.goto(url);await page.waitForFunction(()=>window.hollowCrownDiagnostics);await page.click('[data-action="tutorial"]');await page.waitForTimeout(30000);
 const cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
 for(let i=0;i<2;i++){
  await cdp.send('HeapProfiler.collectGarbage');const before=await cdp.send('Performance.getMetrics'),events=[];const listener=e=>events.push(...e.value);cdp.on('Tracing.dataCollected',listener);
  await cdp.send('HeapProfiler.startSampling',{samplingInterval:16384,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});await cdp.send('Tracing.start',{categories:'v8,devtools.timeline,disabled-by-default-v8.gc',transferMode:'ReportEvents'});
  await page.waitForTimeout(30000);
  const done=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');await done;cdp.off('Tracing.dataCollected',listener);const {profile}=await cdp.send('HeapProfiler.stopSampling'),after=await cdp.send('Performance.getMetrics');
  const stacks=[];function walk(n,path=[]){const next=[...path,{function:n.callFrame.functionName,url:n.callFrame.url,line:n.callFrame.lineNumber}];if(n.selfSize)stacks.push({bytes:n.selfSize,stack:next});for(const c of n.children||[])walk(c,next);}walk(profile.head);stacks.sort((a,b)=>b.bytes-a.bytes);
  const gc=events.filter(e=>e.name==='MinorGC'||e.name==='MajorGC');report.windows.push({durationMs:30000,before:before.metrics.find(m=>m.name==='JSHeapUsedSize').value,after:after.metrics.find(m=>m.name==='JSHeapUsedSize').value,minor:gc.filter(e=>e.name==='MinorGC').length,major:gc.filter(e=>e.name==='MajorGC').length,allocationStacks:stacks});await writeFile(artifact(`allocation-trace-${i}.json`),JSON.stringify({traceEvents:events}));console.log('ALLOCATION window '+(i+1)+' '+JSON.stringify({minor:report.windows[i].minor,major:report.windows[i].major}));
 }
 report.stableGc=report.windows[1].minor<=Math.max(report.windows[0].minor*1.2,report.windows[0].minor+2);report.applicationStacks=report.windows.map(w=>w.allocationStacks.filter(a=>a.stack.some(s=>/\/(main|rules|scene|input|render-budget|rigid-batch)\.js$/.test(s.url))));
 report.programRebuildBytes=report.windows.map(w=>w.allocationStacks.filter(a=>a.stack.at(-1)?.function==='getParameters').reduce((n,a)=>n+a.bytes,0));report.noProgramRebuildChurn=report.programRebuildBytes.every(n=>n===0);
 report.passed=report.stableGc&&report.noProgramRebuildChurn&&!report.errors.length;assert.ok(report.passed,'GC rate must remain stable');
}catch(e){report.failure=e.stack;process.exitCode=1;console.error(e);}finally{await writeFile(artifact('allocation.json'),JSON.stringify(report,null,2));await runner.cleanup();}
