import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {base,ensureServer} from './server.mjs';
import {createCampaign,stepCampaign,campaignAction,campaignMetrics} from '../../public/games/moss-and-moon/campaign.js';
const artifacts=(process.env.MOSS_ARTIFACTS||'/tmp/moss-and-moon-acceptance')+'/journey';
await mkdir(artifacts,{recursive:true});
let browser,server,deadline;
const report={inputs:[],stages:[],errors:[],failedRequests:[],milestones:[]};
try {
 server=await ensureServer();
 browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 deadline=setTimeout(()=>void browser?.close(),20*60*1000);
 const page=await browser.newPage({viewport:{width:1280,height:720}});
 page.setDefaultTimeout(15000);
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
 page.on('requestfailed',r=>report.failedRequests.push(r.url()+': '+r.failure()?.errorText));page.on('response',r=>{if(r.status()>=400)report.failedRequests.push(r.status()+' '+r.url());});
 await page.addInitScript(()=>{
   const Original=window.AudioContext; window.__audioContexts=[];
   window.AudioContext=class extends Original{constructor(...a){super(...a);window.__audioContexts.push(this);}};
 });
 await page.goto(base);await page.waitForFunction(()=>window.mossDiagnostics);
 await page.locator('#new-seed').fill('12345');
 const start=performance.now();await page.locator('#start').click();await page.keyboard.press('Escape');
 const diag=()=>page.evaluate(()=>window.mossDiagnostics());
 const liveClick=async selector=>{
   try {await page.locator(selector).click({timeout:1500});return true;}
   catch(error) {
     const now=await diag();
     if(now.campaign.status!=='playing') {report.inputs.push({action:'outcome-interrupted-input',selector,activeMs:now.campaign.activeMs,status:now.campaign.status});return false;}
     throw error;
   }
 };
 // Held Escape has one owner, through paused submenus, before resuming explicitly.
 await page.keyboard.down('w');
 for(let i=0;i<5;i++){await page.keyboard.down('Escape');assert.equal((await diag()).paused,true);}
 await page.keyboard.up('w');await page.keyboard.up('Escape');
 const paused=await diag();await page.waitForTimeout(300);assert.equal((await diag()).campaign.activeMs,paused.campaign.activeMs);
 await page.locator('#panel [data-open="help"]').click();
 for(let i=0;i<5;i++){await page.keyboard.down('Escape');if(i===0)assert.equal((await diag()).paused,false);else assert.equal((await diag()).paused,false);}
 await page.keyboard.up('Escape');
 const resumePosition=(await diag()).world.position;
 await page.waitForTimeout(300);assert.deepEqual((await diag()).world.position,resumePosition);
 // Save/reload at an explicit pause must not advance the journey offline.
 await page.keyboard.press('Escape');const saved=(await diag()).campaign;
 await page.reload();await page.waitForFunction(()=>window.mossDiagnostics);
 assert.deepEqual((await diag()).campaign,saved); // Still at welcome: reload itself advanced no active time.
 await page.locator('#start').click();
 await page.keyboard.press('Escape');
 assert.ok((await diag()).campaign.activeMs-saved.activeMs<1000,'only the brief explicitly resumed interval may advance');
 await page.locator('[data-resume]').click();
 let lastTarget=-1,priorStage=-1,lastSample=0,firstTaskMs=null;
 const fullStart=performance.now();
 while(performance.now()-fullStart<16*60*1000) {
  const d=await diag(),c=d.campaign;
  if(c.status==='won')break;
  if(c.status==='lost')throw new Error('Competent bot lost: '+JSON.stringify(c));
  if(c.status==='stage-result') {
    report.stages.push({stage:c.stage,activeMs:c.activeMs,tasks:c.stageTasks,integrity:c.integrity,eventHash:c.eventHash});
    await page.screenshot({path:`${artifacts}/stage-${c.stage+1}-result.png`});
    await page.locator('[data-campaign-next]').click();await page.keyboard.press('Escape');lastTarget=-1;continue;
  }
  if(c.stage!==priorStage){
    priorStage=c.stage;report.milestones.push({stage:c.stage,activeMs:c.activeMs,layoutHash:c.layoutHash,eventHash:c.eventHash});
    await page.screenshot({path:`${artifacts}/stage-${c.stage+1}-1280.png`});
    await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:`${artifacts}/stage-${c.stage+1}-1920.png`});await page.setViewportSize({width:1280,height:720});
    console.log('Journey stage',c.stage+1,'active',Math.round(c.activeMs/1000)+'s');
  }
  const attached=c.hazards.find(h=>h.attached),hazard=attached||c.hazards[0];
  const target=c.carried?c.carried%4:hazard&&c.integrity<94?hazard.node:c.taskNodes.find(n=>!n.done)?.id ?? hazard?.node ?? (Math.floor(c.activeMs/3000)%4);
  const n=c.taskNodes[target],distance=Math.hypot(d.world.position[0]-n.x,d.world.position[2]-n.z);
  if(target!==lastTarget||distance>1.65) {
    if(target!==lastTarget){await liveClick(`[data-task-walk="${target}"]`);report.inputs.push({activeMs:c.activeMs,action:'walk',node:target});lastTarget=target;}
  }
  if(distance<=1.65) {
    const kind=c.hazards.some(h=>h.node===target)?'water':!n.done||c.carried?'auto':c.resources.moss>0&&c.shieldTimers[target]===0?'shelter':'water';
    await liveClick(`[data-task-action="${kind}"][data-node="${target}"]`);report.inputs.push({activeMs:c.activeMs,action:kind,node:target,integrity:c.integrity,tasks:c.stageTasks});
    if(firstTaskMs===null&&(await diag()).campaign.totalTasks>0)firstTaskMs=performance.now()-start;
  }
  if(c.activeMs-lastSample>=10000){lastSample=c.activeMs;report.inputs.push({sample:true,...c});console.log('Journey',Math.round(c.activeMs/1000)+'s',c.stageTasks,'tasks',Math.round(c.integrity)+'%');}
  await page.waitForTimeout(230); // Input-policy polling; threats/tasks stay live throughout.
 }
 const won=await diag();assert.equal(won.campaign.status,'won');assert.ok(Math.abs(won.campaign.activeMs-640000)<.001);assert.ok(firstTaskMs<=15000,'first action within 15 seconds');
 report.firstTaskMs=firstTaskMs;report.competent=won;report.elapsedMs=performance.now()-fullStart;
 await writeFile(artifacts+'/win.json',JSON.stringify({won,firstTaskMs,elapsedMs:report.elapsedMs,stages:report.stages,inputs:report.inputs},null,2));
 report.stages.push({stage:3,activeMs:won.campaign.activeMs,tasks:won.campaign.stageTasks,integrity:won.campaign.integrity,eventHash:won.campaign.eventHash});
 await page.screenshot({path:artifacts+'/win-1280.png'});await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:artifacts+'/win-1920.png'});await page.setViewportSize({width:1280,height:720});
 assert.equal(await page.locator('#panel').evaluate(el=>el.open),true);
 const best=won.record;
 await page.locator('[data-campaign-retry]').click();await page.keyboard.press('Escape');
 assert.equal((await diag()).campaign.seed,12345);assert.equal((await diag()).record.score,best.score);
 // Idle loss and usable retry through the actual UI.
 const idleStart=performance.now();
 while((await diag()).campaign.status==='playing') {
   if(performance.now()-idleStart>100000)throw new Error('Idle failed to lose within 90 active seconds');
   await page.waitForTimeout(500);
 }
 report.idle=(await diag()).campaign;assert.equal(report.idle.status,'lost');assert.ok(report.idle.activeMs<=90000);
 await page.screenshot({path:artifacts+'/loss.png'});
 assert.equal(await page.locator('#panel-title').evaluate(el=>document.activeElement===el),true);
 await page.locator('[data-campaign-retry-stage]').click();await page.keyboard.press('Escape');
 assert.equal((await diag()).campaign.stageElapsedMs < 2000,true);
 // Deterministic random movement/tool/local actions with equal live threats.
 let rng=67890;const rand=()=>{rng^=rng<<13;rng^=rng>>>17;rng^=rng<<5;return (rng>>>0)/4294967296;};
 const randomStart=performance.now();
 while(performance.now()-randomStart<65000&&(await diag()).campaign.status==='playing') {
   const target=Math.floor(rand()*4),kind=rand()<.5?'auto':'water';
   if(rand()<.35)await liveClick(`[data-task-walk="${target}"]`);
   else await liveClick(`[data-task-action="${kind}"][data-node="${target}"]`);
   report.inputs.push({bot:'random',elapsedMs:performance.now()-randomStart,node:target,kind});
   await page.waitForTimeout(400);
 }
 report.random=(await diag()).campaign;assert.ok(report.random.totalTasks<won.campaign.totalTasks/4);assert.equal(report.random.stage,0);
 // New-seed and records remain independent of replacing/resetting the current garden.
 if(await page.locator('#panel').evaluate(el=>el.open))await page.locator('[data-open="journey-new"]').click();
 else {await page.keyboard.press('Escape');await page.locator('[data-open="slots"]').click();await page.locator('[data-open="journey-new"]').click();}
 await page.locator('#journey-seed').fill('67890');await page.locator('[data-campaign-new]').click();await page.keyboard.press('Escape');
 report.newSeed=(await diag()).campaign;assert.notEqual(report.newSeed.layoutHash,report.milestones[0].layoutHash);assert.equal((await diag()).record.score,best.score);
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.failedRequests,[]);
 await writeFile(artifacts+'/bots.json',JSON.stringify(report,null,2));
 console.log('PASS real-time Festival Journey',JSON.stringify({activeMs:won.campaign.activeMs,firstTaskMs,stages:report.stages,idle:report.idle.activeMs,random:report.random.totalTasks,record:best}));
} catch(error) {report.error=String(error);await writeFile(artifacts+'/bots-failure.json',JSON.stringify(report,null,2));throw error;}
finally {clearTimeout(deadline);await browser?.close();server?.kill('SIGTERM');}
