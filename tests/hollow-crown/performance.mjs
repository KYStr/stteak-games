// Fixed room-entry scene; independent RAF data and CDP trace. No live-state mutation.
import {writeFile} from 'node:fs/promises';
import {url,artifact,harness} from './test-config.mjs';
import {startTutorial,checkpoint} from '../../public/games/hollow-crown/rules.js';
import {freshProfile} from '../../public/games/hollow-crown/storage.js';
const runner=await harness(),report={samples:[],errors:[]};
try {
 const page=await runner.browser.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',e=>{if(e.type()==='error')report.errors.push(e.text());});
 const cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
 for(const width of [1280,1920]) {
  await page.setViewportSize({width,height:width*9/16});await page.goto(url);await page.waitForFunction(()=>window.hollowCrownDiagnostics);
  const p=freshProfile();p.tutorialDone=true;p.checkpoint={run:checkpoint(startTutorial()),runId:'probe',credited:{rooms:0,parries:0,flawless:0}};
  await page.evaluate(p=>localStorage.setItem('stteak.hollow-crown.v1',JSON.stringify(p)),p);await page.reload();await page.waitForFunction(()=>window.hollowCrownDiagnostics);await page.click('[data-action="continue"]');
  // Idle input in the same seeded arena; real enemies remain active.
  await page.waitForTimeout(5000);
  await page.evaluate(()=>{window.rafProbe={raw:[],last:performance.now(),active:true};function sample(t){const p=window.rafProbe;if(!p.active)return;const s=hollowCrownDiagnostics.snapshot();if(!s.overlay&&!s.paused)p.raw.push(t-p.last);p.last=t;requestAnimationFrame(sample);}requestAnimationFrame(sample);});
  const windows=[];for(let i=0;i<30;i++){await page.waitForTimeout(1000);windows.push(await page.evaluate(()=>hollowCrownDiagnostics.metrics()));}
  const raw=await page.evaluate(()=>{rafProbe.active=false;return rafProbe.raw;});const sorted=[...raw].sort((a,b)=>a-b);
  await page.screenshot({path:artifact(`probe-${width}.png`)});
  report.samples.push({width,raw,windows,avg:raw.reduce((a,b)=>a+b,0)/raw.length,p95:sorted[Math.floor(sorted.length*.95)],performance:await cdp.send('Performance.getMetrics')});console.log(JSON.stringify({width,avg:report.samples.at(-1).avg,p95:report.samples.at(-1).p95,render:windows.at(-1).render}));
 }
 const chunks=[];cdp.on('Tracing.dataCollected',e=>chunks.push(...e.value));await cdp.send('Tracing.start',{categories:'devtools.timeline,blink,cc,gpu',transferMode:'ReportEvents'});await page.waitForTimeout(2500);const ended=new Promise(r=>cdp.once('Tracing.tracingComplete',r));await cdp.send('Tracing.end');await ended;await writeFile(artifact('chrome-trace.json'),JSON.stringify({traceEvents:chunks}));
}finally{await writeFile(artifact('performance-probe.json'),JSON.stringify(report,null,2));await runner.cleanup();}
