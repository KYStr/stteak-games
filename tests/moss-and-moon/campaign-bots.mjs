import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {performance} from 'node:perf_hooks';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {base,ensureServer} from './server.mjs';
import {activate,actionabilityState} from './interactions.mjs';
const artifacts=(process.env.MOSS_ARTIFACTS||'/tmp/moss-and-moon-acceptance')+'/journey';
await mkdir(artifacts,{recursive:true});
let browser,server,deadline;
const report={cases:{},errors:[],failedRequests:[]};
const failures=[];
try {
 server=await ensureServer();
 browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 deadline=setTimeout(()=>void browser?.close(),30*60*1000);
 // Separate contexts/test cases: idle and random still run if another UI assertion fails.
 for(const bot of ['idle','random','competent']) {
  const context=await browser.newContext({viewport:{width:1280,height:720}}),page=await context.newPage();
  const result=report.cases[bot]={inputs:[],stages:[],milestones:[],pauses:[],errors:[],failedRequests:[]};
  page.setDefaultTimeout(90000);
  page.on('pageerror',e=>result.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());});
  page.on('requestfailed',r=>result.failedRequests.push(r.url()+': '+r.failure()?.errorText));page.on('response',r=>{if(r.status()>=400)result.failedRequests.push(r.status()+' '+r.url());});
  const diag=(full=false)=>page.evaluate(full=>window.mossDiagnostics({summary:!full}),full);
  const checkpoint=async()=>{
   result.lastDiagnostic=await diag();
   result.storage=await page.evaluate(()=>Object.fromEntries(Object.entries(localStorage)));
   await writeFile(`${artifacts}/${bot}-progress.json`,JSON.stringify(result,null,2));
  };
  const liveClick=async selector=>{
   const before=await diag();if(before.campaign.status!=='playing'||before.paused)return false;
   try {
    // Input delivery watchdog is independent of the JS latency measurements.
    const button=page.locator(selector);await button.waitFor({state:'visible',timeout:10000});
    assert.equal(await button.isEnabled(),true);await button.focus({timeout:10000});await page.keyboard.press('Enter',{timeout:10000});return true;
   } catch(error) {
    const now=await diag();result.inputs.push({action:'interrupted-input',selector,status:now.campaign.status,paused:now.paused,panel:now.panel});
    if(now.campaign.status!=='playing'||now.paused)return false;
    throw error;
   }
  };
  const resumeProtection=async d=>{
   if(d.campaign.status!=='playing'||!d.paused)return false;
   assert.equal(d.panel,'settings','only a playing settings pause may be resumed');
   // Re-read immediately before dispatch; never close an outcome with a stale playing snapshot.
   const fresh=await diag();if(fresh.campaign.status!=='playing'||!fresh.paused||fresh.panel!=='settings')return false;
   result.pauses.push({activeMs:fresh.campaign.activeMs,panel:fresh.panel,frames:fresh.world.activeRenderedFrames});
   await activate(page,'[data-resume]');return true;
  };
  try {
   await page.goto(base);await page.waitForFunction(()=>window.mossDiagnostics);
   await page.locator('#new-seed').fill('12345');
   const onboardingStart=performance.now();await page.locator('#start').click();await page.keyboard.press('Escape');
   let rng=67890;const rand=()=>{rng^=rng<<13;rng^=rng>>>17;rng^=rng<<5;return (rng>>>0)/4294967296;};
   let lastTarget=-1,lastWalk=0,lastCheckpoint=0,priorStage=-1,firstTaskMs=null,stalledFrames=0,previousPosition=null,retries=0;
   const fullStart=performance.now(),wallLimit=bot==='competent'?24*60*1000:4*60*1000;
   while(performance.now()-fullStart<wallLimit) {
    // Status, pause, panel, frames and position come from one atomic page evaluation.
    const d=await diag(),c=d.campaign;result.lastDiagnostic=d;
    if(c.status==='won'||c.status==='lost')break;
    if(c.status==='stage-result') {
     assert.equal(bot,'competent');
     result.stages.push({stage:c.stage,activeMs:c.activeMs,tasks:c.stageTasks,integrity:c.integrity,eventHash:c.eventHash});
     for(const viewport of [{width:1280,height:720},{width:1920,height:1080}]) {
      await page.setViewportSize(viewport);await page.screenshot({path:`${artifacts}/stage-${c.stage+1}-${viewport.width}.png`});
     }
     await page.setViewportSize({width:1280,height:720});
     await activate(page,'[data-campaign-next]');await page.keyboard.press('Escape');lastTarget=-1;previousPosition=null;retries=0;continue;
    }
    if(d.paused) {await resumeProtection(d);lastTarget=-1;previousPosition=null;retries=0;continue;}
    if(bot==='competent'&&!result.reloaded&&c.activeMs>=15000) {
     await page.keyboard.press('Escape');
     const saved=(await diag()).campaign;assert.equal((await diag()).paused,true);
     await page.reload();await page.waitForFunction(()=>window.mossDiagnostics);
     assert.deepEqual((await diag()).campaign,saved,'entire earned Journey survives paused reload without offline advance');
     await page.locator('#start').click();result.reloaded=true;lastTarget=-1;previousPosition=null;retries=0;continue;
    }
    if(c.stage!==priorStage){priorStage=c.stage;result.milestones.push({stage:c.stage,activeMs:c.activeMs,layoutHash:c.layoutHash,eventHash:c.eventHash});console.log(bot,'stage',c.stage+1);}
    if(c.activeMs-lastCheckpoint>=10000){lastCheckpoint=c.activeMs;result.inputs.push({sample:true,...c});await checkpoint();console.log(bot,Math.round(c.activeMs/1000)+'s',c.stageTasks,'tasks',Math.round(c.integrity)+'%');}
    if(bot==='idle'){await page.waitForTimeout(500);continue;}
    if(bot==='random') {
     if(c.activeMs>=65000)break;
     const target=Math.floor(rand()*4),kind=rand()<.5?'auto':'water';
     if(rand()<.35)await liveClick(`[data-task-walk="${target}"]`);
     else await liveClick(`[data-task-action="${kind}"][data-node="${target}"]`);
     result.inputs.push({activeMs:c.activeMs,node:target,kind});await page.waitForTimeout(400);continue;
    }
    if(!result.comparison&&c.activeMs>=(report.cases.random.final?.campaign.activeMs||65000))result.comparison=c;
    const hazard=c.hazards.find(h=>h.attached)||c.hazards[0];
    const target=c.carried?c.carried%4:hazard&&c.integrity<94?hazard.node:c.taskNodes.find(n=>!n.done)?.id ?? hazard?.node ?? (Math.floor(c.activeMs/3000)%4);
    const n=c.taskNodes[target],distance=Math.hypot(d.world.position[0]-n.x,d.world.position[2]-n.z);
    result.currentTarget={id:target,distance,position:d.world.position};
    if(target!==lastTarget){previousPosition=null;stalledFrames=d.world.activeRenderedFrames;retries=0;}
    const moved=previousPosition&&d.world.position.some((v,i)=>Math.abs(v-previousPosition[i])>.01);
    if(moved){stalledFrames=d.world.activeRenderedFrames;retries=0;}
    if(distance>1.65&&(target!==lastTarget||performance.now()-lastWalk>2500)) {
     await liveClick(`[data-task-walk="${target}"]`);lastWalk=performance.now();retries++;
     result.inputs.push({activeMs:c.activeMs,action:'walk',node:target,distance,retries,frame:d.world.activeRenderedFrames});
     if(retries>=4&&d.world.activeRenderedFrames-stalledFrames>=120)throw new Error('Repeated route requests without movement: '+JSON.stringify(result.currentTarget));
    }
    lastTarget=target;previousPosition=d.world.position;
    if(distance<=1.65) {
     const kind=c.hazards.some(h=>h.node===target)?'water':!n.done||c.carried?'auto':c.resources.moss>0&&c.shieldTimers[target]===0?'shelter':'water';
     await liveClick(`[data-task-action="${kind}"][data-node="${target}"]`);
     result.inputs.push({activeMs:c.activeMs,action:kind,node:target,integrity:c.integrity,tasks:c.stageTasks});
     if(firstTaskMs===null&&(await diag()).campaign.totalTasks>0) {
      firstTaskMs=performance.now()-onboardingStart;result.firstTaskMs=firstTaskMs;
      assert.ok(firstTaskMs<=15000,'fresh start to first meaningful action <=15 seconds');
     }
    }
    await page.waitForTimeout(230);
   }
   result.final=await diag(true);const final=result.final.campaign;await checkpoint();
   if(bot==='idle'){assert.equal(final.status,'lost');assert.ok(final.activeMs<=90000);}
   if(bot==='random'){assert.ok(final.activeMs>=65000||final.status==='lost');assert.equal(final.stage,0);result.observation=final.status==='playing'?'budget-limited, still playing':final.status;}
   if(bot==='competent') {
    assert.equal(final.status,'won');assert.ok(Math.abs(final.activeMs-640000)<.001);assert.ok(firstTaskMs<=15000);
    assert.equal(await page.locator('#panel').evaluate(el=>el.open),true);
    await writeFile(artifacts+'/win.json',JSON.stringify(result,null,2));
    for(const viewport of [{width:1280,height:720},{width:1920,height:1080}]){await page.setViewportSize(viewport);await page.screenshot({path:`${artifacts}/win-${viewport.width}.png`});}
    const best=result.final.record;
    await activate(page,'[data-campaign-retry]');await page.keyboard.press('Escape');assert.equal((await diag()).campaign.seed,12345);
    await page.keyboard.press('Escape');await activate(page,'[data-open="slots"]');await activate(page,'[data-open="journey-new"]');
    await page.locator('#journey-seed').fill('67890');await activate(page,'[data-campaign-new]');
    result.newSeed=(await diag()).campaign;assert.notEqual(result.newSeed.layoutHash,result.milestones[0].layoutHash);assert.equal((await diag(true)).record.score,best.score);
    const saved=(await diag()).campaign;await page.reload();await page.waitForFunction(()=>window.mossDiagnostics);assert.deepEqual((await diag()).campaign,saved);assert.equal((await diag(true)).record.score,best.score);
    const random=report.cases.random.final?.campaign,comparable=result.comparison;
    assert.ok(random&&comparable,'independent random and competent comparable samples');
    assert.ok(Math.abs(comparable.activeMs-random.activeMs)<5000,'comparison uses nearby active times');
    assert.ok(random.status==='lost'||random.integrity+10<comparable.integrity,'random underperforms competent integrity at comparable time');
   }
   // Idle's actual loss exercises retry-stage independently of the full win case.
   if(bot==='idle') {await page.screenshot({path:artifacts+'/loss.png'});await activate(page,'[data-campaign-retry-stage]');assert.ok((await diag()).campaign.stageElapsedMs<2000);}
   assert.deepEqual(result.errors,[]);assert.deepEqual(result.failedRequests,[]);result.passed=true;
  } catch(error) {
   result.error=String(error);failures.push(bot+': '+error);
   result.failureState=await actionabilityState(page).catch(()=>null);await checkpoint().catch(()=>{});
   await page.screenshot({path:`${artifacts}/${bot}-failure.png`}).catch(()=>{});
   await writeFile(`${artifacts}/${bot}-failure.json`,JSON.stringify(result,null,2));
  } finally {await context.close();}
  await writeFile(artifacts+'/bots.json',JSON.stringify(report,null,2));
 }
 assert.deepEqual(failures,[],'all independent bot cases pass');
 console.log('PASS real-time Journey and independent idle/random cases',JSON.stringify(Object.fromEntries(Object.entries(report.cases).map(([k,v])=>[k,{activeMs:v.final?.campaign.activeMs,integrity:v.final?.campaign.integrity,tasks:v.final?.campaign.totalTasks,firstTaskMs:v.firstTaskMs}]))));
} catch(error) {await writeFile(artifacts+'/bots-failure.json',JSON.stringify({...report,error:String(error)},null,2));throw error;}
finally {clearTimeout(deadline);await browser?.close();server?.kill('SIGTERM');}
