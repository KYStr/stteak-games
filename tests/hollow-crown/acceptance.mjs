import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {installPilot} from './browser-pilot.js';
const root=fileURLToPath(new URL('../../',import.meta.url)),art=new URL('./artifacts/',import.meta.url);
await mkdir(art,{recursive:true});
const {chromium}=await import(process.env.PLAYWRIGHT_PATH||'/workspace/stteak8/tools/node_modules/playwright-core/index.mjs');
const origin='http://127.0.0.1:8103',url=origin+'/games/hollow-crown/',KEY='stteak.hollow-crown.v1';
let server,browser,page,cdp;const errors=[],requests=[],checks=[],report={};
const check=(label)=>{checks.push(label);console.log('PASS '+label);};
const snapshot=()=>page.evaluate(()=>hollowCrownDiagnostics.snapshot());
const wait=(fn,timeout=20000)=>page.waitForFunction(fn,null,{timeout});
const shot=async name=>page.screenshot({path:fileURLToPath(new URL(name+'.png',art))});
const sleep=ms=>page.waitForTimeout(ms);
async function boot(){await page.goto(url);await wait(()=>!!window.hollowCrownDiagnostics);await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().render.frameSamples>2);}
async function memory(){await cdp.send('HeapProfiler.collectGarbage');const {metrics}=await cdp.send('Performance.getMetrics'),dom=await cdp.send('Memory.getDOMCounters');return{heap:metrics.find(x=>x.name==='JSHeapUsedSize')?.value,...dom};}
async function seed(value){await page.evaluate(({KEY,value})=>{localStorage.clear();localStorage.setItem(KEY,JSON.stringify(value));},{KEY,value});await boot();}
try{
  // Own the prescribed port. Never leave a web server or browser running after this command.
  try{await fetch(url);throw Error('Port 8103 is in use; stop that server before running acceptance.');}catch(e){if(!String(e).includes('fetch failed'))throw e;}
  server=spawn('python3',['-m','http.server','8103','--bind','127.0.0.1','--directory',root+'public'],{stdio:'ignore'});
  for(let i=0;i<50;i++){try{if((await fetch(url)).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
  browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
  page=await browser.newPage({viewport:{width:1280,height:720}});page.setDefaultTimeout(20000);
  page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text());});
  page.on('requestfailed',r=>{if(!r.failure()?.errorText?.includes('ERR_ABORTED'))requests.push(r.url()+': '+r.failure()?.errorText);});
  page.on('response',r=>{if(r.status()>=400)requests.push(r.status()+' '+r.url());});
  cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
  await boot();assert.equal((await page.evaluate(()=>hollowCrownDiagnostics.metrics())).audio.context,'not-created');await shot('camp-1280');
  assert.equal(await page.locator('[data-config="challenge"]').inputValue(),'long-watch');
  check('fresh startup, no audio before gesture, full expedition is available');
  await page.click('[data-action="settings"]');assert.equal(await page.getAttribute('#overlay','role'),'dialog');
  await page.locator('[data-setting="music"]').evaluate(el=>{el.value='.2';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));});
  await page.click('[data-action="mute"]');let prefs=(await snapshot()).profile.settings;assert.equal(prefs.muted,true);assert.equal(prefs.music,.2);
  await page.click('[data-action="mute"]');assert.equal((await snapshot()).profile.settings.muted,false);
  await page.keyboard.press('Escape');assert.equal((await snapshot()).overlay,'camp');
  await page.click('[data-action="help"]');const buttons=page.locator('#overlay button');await buttons.last().focus();await page.keyboard.press('Tab');assert.equal(await buttons.first().evaluate(el=>el===document.activeElement),true);await page.keyboard.press('Escape');
  check('settings persist, reversible mute, dialog focus containment and Escape navigation');
  await page.click('[data-action="tutorial"]');await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().audio.buffers===16);
  await installPilot(page);await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.snapshot().run?.phase==='result',120000);
  let s=await snapshot();assert.equal(s.run.tutorial.done,true);assert.equal(s.profile.tutorialDone,true);await shot('tutorial-complete');await page.evaluate(()=>acceptancePilot.stop());
  check('tutorial completes using movement, light attack, dodge, timed guard and defeat');
  await page.click('[data-action="begin"]');await page.keyboard.down('KeyD');await sleep(600);await page.keyboard.up('KeyD');s=await snapshot();assert.ok(s.run.player.x>1);
  const runId=s.runId,seedNumber=s.run.seed;await page.keyboard.press('j');await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.snapshot().run.stats.attacks>0);
  await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.snapshot().paused);const pausedTime=(await snapshot()).run.time;await sleep(300);assert.equal((await snapshot()).run.time,pausedTime);await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().audio.context==='suspended');
  await page.click('[data-action="settings"]');await page.keyboard.press('Escape');assert.equal((await snapshot()).overlay,'pause');await page.click('[data-action="resume"]');await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().audio.context==='running');
  await boot();await page.click('[data-action="continue"]');s=await snapshot();assert.equal(s.runId,runId);assert.equal(s.run.seed,seedNumber);assert.ok(Math.abs(s.run.player.x)<.01);assert.equal(s.profile.settings.music,.2);
  await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().audio.context==='running');check('real movement and attacks, blur pause, suspended audio resume, reload and room-entry restore');
  const soakStart=performance.now();await sleep(2000);const before=await memory();await installPilot(page);
  let lastLog=performance.now(),bossShot=false;
  while(performance.now()-soakStart<300000){
    await sleep(1000);s=await snapshot();if(s.run.roomIndex>=6&&!bossShot){bossShot=true;await shot('boss-combat');}
    if(performance.now()-lastLog>15000){console.log(`PLAY room=${s.run.roomIndex+1} phase=${s.run.phase} hp=${s.run.player.hp.toFixed(0)} time=${s.run.time.toFixed(0)}`);lastLog=performance.now();}
    if(s.run.phase==='result')break;
  }
  s=await snapshot();assert.equal(s.run.result?.won,true,'Twin Crown keyboard pilot must win');assert.equal(s.run.roomHistory.length,8);assert.equal(s.profile.wins,1);assert.ok(s.profile.skins.includes('cinder'));await shot('twin-crown-victory');
  report.play={time:s.run.time,kills:s.run.stats.kills,hits:s.run.stats.hits,rooms:s.run.roomHistory};check('full six-room / two-boss expedition wins through keyboard input and settles once');
  await page.evaluate(()=>acceptancePilot.stop());await page.click('[data-action="replay"]');assert.equal((await snapshot()).run.seed,seedNumber);assert.notEqual((await snapshot()).runId,runId);
  // Continue live combat for at least three wall-clock minutes including the completed run.
  await installPilot(page);const soakMs=Number(process.env.HOLLOW_SOAK_MS||180000);
  while(performance.now()-soakStart<soakMs){await sleep(Math.min(5000,soakMs-(performance.now()-soakStart)));s=await snapshot();if(s.run.phase==='result'){await page.evaluate(()=>acceptancePilot.stop());await page.click('[data-action="replay"]');await installPilot(page);}}
  const after=await memory();report.soak={wallMs:performance.now()-soakStart,before,after,metrics:await page.evaluate(()=>hollowCrownDiagnostics.metrics())};
  const measured=report.soak.metrics;report.performanceBudget={averageTargetMs:33.3,p95TargetMs:66.7,met:measured.avgFrameMs<=33.3&&measured.p95FrameMs<=66.7};
  assert.ok(after.heap-before.heap<16*1024*1024,'GC heap growth under 16MB');assert.ok(after.jsEventListeners-before.jsEventListeners<30,'listener count stays bounded');
  await page.evaluate(()=>acceptancePilot.stop());check('restart and >=3 minute bounded-memory/listener run');
  await page.keyboard.press('Escape');await shot('pause-1280');
  await page.setViewportSize({width:1920,height:1080});await sleep(400);await shot('pause-1920');
  await page.setViewportSize({width:390,height:844});await page.click('[data-action="settings"]');await shot('settings-mobile');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.keyboard.press('Escape');await page.keyboard.press('Escape');
  await page.setViewportSize({width:1280,height:720});
  // Context loss is a terminal graphics pause, with an explicit reload recovery.
  await page.evaluate(()=>document.querySelector('#world').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.snapshot().overlay==='graphics-error');assert.equal((await snapshot()).paused,true);await shot('context-recovery');
  await page.click('[data-action="reload"]');await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.snapshot().overlay==='camp');await page.click('[data-action="continue"]');assert.equal((await snapshot()).run.phase,'combat');check('responsive dialogs and WebGL context loss reload recovery');
  // A real death path, independent of the winning controller.
  await seed({schemaVersion:1,tutorialDone:true,settings:{quality:'auto'}});await page.locator('[data-config="challenge"]').selectOption('normal');await page.click('[data-action="begin"]');await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.snapshot().run?.phase==='result',90000);s=await snapshot();assert.equal(s.run.result.won,false);assert.equal(s.profile.runs,1);await page.click('[data-action="replay"]');assert.equal((await snapshot()).run.phase,'combat');check('natural combat death, settlement and restart');
  await page.evaluate(KEY=>{const raw=localStorage.getItem(KEY);localStorage.setItem(KEY+'.backup',raw);localStorage.setItem(KEY,'broken');},KEY);await boot();assert.match(await page.locator('#save-notice').innerText(),/備份/);
  await page.evaluate(KEY=>{localStorage.setItem(KEY,'[]');localStorage.setItem(KEY+'.backup','[]');},KEY);await boot();assert.equal((await snapshot()).profile.runs,0);assert.match(await page.locator('#save-notice').innerText(),/重建/);check('corrupt primary backup recovery and malformed-array safe rebuild');
  await page.emulateMedia({reducedMotion:'reduce'});await boot();assert.equal((await snapshot()).profile.settings.reducedMotion,true);check('system reduced-motion preference');
  assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);check('zero uncaught errors, console errors or failed HTTP requests');
  report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;report.snapshot=page?await snapshot().catch(()=>null):null;report.metrics=page?await page.evaluate(()=>hollowCrownDiagnostics.metrics()).catch(()=>null):null;console.error(e);if(page)await shot('failure').catch(()=>{});process.exitCode=1;
}finally{report.checks=checks;report.errors=errors;report.failedRequests=requests;await writeFile(new URL(report.passed?'acceptance.json':'failure.json',art),JSON.stringify(report,null,2)+'\n');await browser?.close();if(server){server.kill('SIGTERM');await new Promise(resolve=>{if(server.exitCode!==null)resolve();else server.once('exit',resolve);});}}
