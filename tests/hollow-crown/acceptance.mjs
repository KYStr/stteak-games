import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {installPilot} from './browser-pilot.js';
import {url,artifact,harness} from './test-config.mjs';
const KEY='stteak.hollow-crown.v1';
let runner,browser,page,cdp;const errors=[],requests=[],checks=[],report={};
const check=(label)=>{checks.push(label);console.log('PASS '+label);};
const snapshot=()=>page.evaluate(()=>hollowCrownDiagnostics.snapshot());
const wait=(fn,timeout=20000)=>page.waitForFunction(fn,null,{timeout});
const shot=async name=>page.screenshot({path:artifact(name+'.png')});
const sleep=ms=>page.waitForTimeout(ms);
async function boot(){await page.goto(url);await wait(()=>!!window.hollowCrownDiagnostics);await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().render.frameSamples>2);}
async function memory(){await cdp.send('HeapProfiler.collectGarbage');const {metrics}=await cdp.send('Performance.getMetrics'),dom=await cdp.send('Memory.getDOMCounters');return{heap:metrics.find(x=>x.name==='JSHeapUsedSize')?.value,...dom};}
async function seed(value){await page.evaluate(({KEY,value})=>{localStorage.clear();localStorage.setItem(KEY,JSON.stringify(value));},{KEY,value});await boot();}
try{
  runner=await harness();browser=runner.browser;
  page=await browser.newPage({viewport:{width:1280,height:720}});
  await page.addInitScript(()=>{const native=requestAnimationFrame.bind(window),cancel=cancelAnimationFrame.bind(window),pending=new Set();window.requestAnimationFrame=fn=>{const id=native(t=>{pending.delete(id);fn(t);});pending.add(id);return id;};window.cancelAnimationFrame=id=>{pending.delete(id);cancel(id);};window.pendingGameRaf=()=>pending.size;});page.setDefaultTimeout(20000);
  page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text());});
  page.on('requestfailed',r=>{if(!r.failure()?.errorText?.includes('ERR_ABORTED'))requests.push(r.url()+': '+r.failure()?.errorText);});
  page.on('response',r=>{if(r.status()>=400)requests.push(r.status()+' '+r.url());});
  cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
  await boot();assert.equal((await page.evaluate(()=>hollowCrownDiagnostics.metrics())).audio.context,'not-created');await shot('camp-1280');
  assert.equal(await page.locator('[data-config="challenge"]').inputValue(),'crown-pilgrimage');
  report.materialAudit=await page.evaluate(async()=>{const {SceneView}=await import('./scene.js');return new Promise(resolve=>{const original=SceneView.prototype.render;let frames=0;SceneView.prototype.render=function(...args){const result=original.apply(this,args);if(++frames<4)return result;SceneView.prototype.render=original;const findings=[];this.scene.traverse(o=>{if(!o.isMesh||!o.visible||!o.material)return;const m=o.material,p=this.renderer.properties.get(m),g=o.geometry;const fields={instancing:o.isInstancedMesh===true,skinning:o.isSkinnedMesh===true,vertexTangents:!!g.attributes.tangent&&(!!m.normalMap||m.anisotropy>0),morphTargets:!!g.morphAttributes.position,morphNormals:!!g.morphAttributes.normal,morphColors:!!g.morphAttributes.color,vertexAlphas:m.vertexColors===true&&!!g.attributes.color&&g.attributes.color.itemSize===4};const mismatch=Object.entries(fields).filter(([k,v])=>p[k]!==undefined&&p[k]!==v);if(mismatch.length)findings.push({object:o.name,material:m.name,type:m.type,mismatch,stored:Object.fromEntries(Object.keys(fields).map(k=>[k,p[k]]))});});resolve(findings);return result;};});});console.log('MATERIAL_AUDIT '+JSON.stringify(report.materialAudit));

  check('fresh startup, no audio before gesture, full expedition is available');
  await page.click('[data-action="settings"]');assert.equal(await page.getAttribute('#overlay','role'),'dialog');
  await page.locator('[data-setting="music"]').evaluate(el=>{el.value='.2';el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));});
  await page.click('[data-action="mute"]');let prefs=(await snapshot()).profile.settings;assert.equal(prefs.muted,true);assert.equal(prefs.music,.2);
  await page.click('[data-action="mute"]');assert.equal((await snapshot()).profile.settings.muted,false);
  await page.keyboard.press('Escape');assert.equal((await snapshot()).overlay,'camp');
  await page.click('[data-action="help"]');const buttons=page.locator('#overlay button');await buttons.last().focus();await page.keyboard.press('Tab');assert.equal(await buttons.first().evaluate(el=>el===document.activeElement),true);await page.keyboard.press('Escape');
  check('settings persist, reversible mute, dialog focus containment and Escape navigation');
  await page.click('[data-action="tutorial"]');await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().audio.buffers===17);
  await installPilot(page);await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.snapshot().run?.phase==='result',120000);
  let s=await snapshot();assert.equal(s.run.tutorial.done,true);assert.equal(s.profile.tutorialDone,true);await shot('tutorial-complete');await page.evaluate(()=>acceptancePilot.stop());
  check('tutorial completes using movement, light attack, dodge, timed guard and defeat');
  await page.click('[data-action="begin"]');await page.keyboard.down('KeyD');await sleep(600);await page.keyboard.up('KeyD');s=await snapshot();assert.ok(s.run.player.x>1);
  const runId=s.runId,seedNumber=s.run.seed;await page.keyboard.press('j');await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.snapshot().run.stats.attacks>0);
  await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.snapshot().paused);const pausedTime=(await snapshot()).run.time;await sleep(300);assert.equal((await snapshot()).run.time,pausedTime);await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().audio.context==='suspended');
  await page.click('[data-action="settings"]');await page.keyboard.press('Escape');assert.equal((await snapshot()).overlay,'pause');await page.click('[data-action="resume"]');await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().audio.context==='running');
  await boot();await page.click('[data-action="continue"]');s=await snapshot();assert.equal(s.runId,runId);assert.equal(s.run.seed,seedNumber);assert.ok(Math.abs(s.run.player.x)<.01);assert.equal(s.profile.settings.music,.2);
  await wait(()=>window.hollowCrownDiagnostics&&hollowCrownDiagnostics.metrics().audio.context==='running');check('real movement and attacks, blur pause, suspended audio resume, reload and room-entry restore');
  await page.evaluate(()=>{window.activeRaf={raw:[],windows:[],last:performance.now(),active:true};function sample(t){const p=activeRaf;if(!p.active)return;if(document.body.dataset.menu==='false')p.raw.push(t-p.last);p.last=t;requestAnimationFrame(sample);}requestAnimationFrame(sample);});
  await page.keyboard.press('Escape');await page.click('[data-action="leave-confirm"]');await page.click('[data-action="confirm"]');await sleep(1000);
  const before=await memory(),beforeSameScene=await page.evaluate(()=>hollowCrownDiagnostics.metrics());await page.click('[data-action="continue"]');
  const soakStart=performance.now(),performanceWindows=[];await installPilot(page);
  let lastLog=performance.now();const bossCaptures=new Set();report.bossCaptures=[];
  while(performance.now()-soakStart<3600000){
    await sleep(1000);performanceWindows.push(await page.evaluate(()=>hollowCrownDiagnostics.metrics()));s=await snapshot();for(const boss of s.run.enemies.filter(e=>e.hp>0&&['regent','arbiter'].includes(e.type))){const key=boss.type+'-phase-'+boss.phase;if(!bossCaptures.has(key)){bossCaptures.add(key);report.bossCaptures.push({key,at:s.run.time});for(const width of [1280,1920]){await page.setViewportSize({width,height:width*9/16});await shot(key+'-'+width);}await page.setViewportSize({width:1280,height:720});}}
    if(performance.now()-lastLog>15000){console.log(`PLAY room=${s.run.roomIndex+1} phase=${s.run.phase} hp=${s.run.player.hp.toFixed(0)} time=${s.run.time.toFixed(0)}`);lastLog=performance.now();}
    if(s.run.phase==='result')break;
  }
  s=await snapshot();assert.equal(s.run.result?.won,true,'Twin Crown keyboard pilot must win');assert.equal(s.run.roomHistory.length,14);assert.equal(bossCaptures.size,4,'both phases of both crowns captured');assert.equal(s.profile.wins,1);assert.ok(s.profile.skins.includes('cinder'));await shot('twin-crown-victory');
  report.functionalPilot={limitation:"Reads exact threat countdowns; functional smoke only, no build/depth credit",time:s.run.time,kills:s.run.stats.kills,hits:s.run.stats.hits,rooms:s.run.roomHistory};check('full twelve-room / two-boss expedition wins through keyboard input and settles once');
  await page.evaluate(()=>acceptancePilot.stop());await page.click('[data-action="replay"]');assert.equal((await snapshot()).run.seed,seedNumber);assert.notEqual((await snapshot()).runId,runId);
  // Continue live combat for at least three wall-clock minutes including the completed run.
  await installPilot(page);const soakMs=Number(process.env.HOLLOW_SOAK_MS||180000);
  while(performance.now()-soakStart<soakMs){await sleep(Math.min(5000,soakMs-(performance.now()-soakStart)));s=await snapshot();if(s.run.phase==='result'){await page.evaluate(()=>acceptancePilot.stop());await page.click('[data-action="replay"]');await installPilot(page);}}
  const after=await memory();report.soak={wallMs:performance.now()-soakStart,before,after,metrics:await page.evaluate(()=>hollowCrownDiagnostics.metrics())};
  const measured=report.soak.metrics;report.performanceBudget={averageTargetMs:33.3,p95TargetMs:66.7,met:measured.avgFrameMs<=33.3&&measured.p95FrameMs<=66.7};
  report.independentRaf=await page.evaluate(()=>{activeRaf.active=false;const raw=activeRaf.raw;activeRaf.raw=[];const sorted=[...raw].sort((a,b)=>a-b);return{raw,avg:raw.reduce((a,b)=>a+b,0)/raw.length,p95:sorted[Math.floor(sorted.length*.95)]};});
  report.performanceWindows=performanceWindows;
  // QA-RUBRIC explicitly excludes absolute SwiftShader speed from release gates.
  // Keep the historical frame targets as audited reference data, never as a pass claim.
  report.frameTimingReference=report.performanceBudget;delete report.performanceBudget;
  const worst={drawCalls:Math.max(...performanceWindows.map(m=>m.render.drawCalls)),triangles:Math.max(...performanceWindows.map(m=>m.render.triangles)),updateP95Ms:Math.max(...performanceWindows.map(m=>m.updateP95Ms))};
  report.performanceBudget={criteria:'hardware-independent per QA-RUBRIC',maxDrawCalls:250,maxTriangles:1500000,maxUpdateP95Ms:6,maxTextureBytes:256*1024*1024,measured:worst,met:worst.drawCalls<=250&&worst.triangles<=1500000&&worst.updateP95Ms<=6&&performanceWindows.every(m=>m.render.textureMemoryBytes<=256*1024*1024)};
  assert.ok(report.performanceBudget.met,'Renderer/update work budget failed');
  report.activeWallMs=report.independentRaf.raw.reduce((a,b)=>a+b,0);
  report.releaseComplete=soakMs>=180000&&report.soak.wallMs>=180000&&report.activeWallMs>=180000;assert.ok(report.releaseComplete,'Development soak incomplete: release requires >=180000 active ms');
  // Final retained comparisons below use the identical camp scene after all controllers stop.
  await page.evaluate(()=>acceptancePilot.stop());await sleep(200);assert.equal(await page.evaluate(()=>pendingGameRaf()),1,'one game RAF after sampler and controller stop');check('restart and >=3 minute bounded-memory/listener run');
  for(let i=0;i<10;i++){await page.keyboard.press('Escape');await page.click('[data-action="restart-confirm"]');await page.click('[data-action="confirm"]');await sleep(200);assert.equal(await page.evaluate(()=>pendingGameRaf()),1);}
  await page.keyboard.press('Escape');await page.click('[data-action="leave-confirm"]');await page.click('[data-action="confirm"]');await sleep(1000);
  const retained=await memory(),afterSameScene=await page.evaluate(()=>hollowCrownDiagnostics.metrics());
  report.restartAudit={restarts:10,pendingRaf:await page.evaluate(()=>pendingGameRaf()),memory:retained};
  report.retention={method:'Finite prop/actor templates prewarmed before interactive; identical camp before expedition and after ten restarts. All pool bytes are resident at baseline.',before,after:retained,growth:(retained.heap-before.heap)/before.heap,beforeRender:beforeSameScene.render,afterRender:afterSameScene.render};
  assert.ok(report.retention.growth<.10,'Retained heap growth must be <10%');assert.equal(retained.jsEventListeners,before.jsEventListeners);assert.equal(afterSameScene.render.geometries,beforeSameScene.render.geometries);assert.equal(afterSameScene.render.textures,beforeSameScene.render.textures);assert.equal(await page.evaluate(()=>pendingGameRaf()),1);check('full expedition and ten restarts retain <10% heap and identical resources/listeners/RAF');
  await page.click('[data-action="continue"]');
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
  await page.emulateMedia({reducedMotion:'reduce'});await seed(null);assert.equal((await snapshot()).profile.settings.reducedMotion,true);check('system reduced-motion preference');
  assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);check('zero uncaught errors, console errors or failed HTTP requests');
  report.passed=true;
}catch(e){report.passed=false;report.failure=e.stack;report.snapshot=page?await snapshot().catch(()=>null):null;report.metrics=page?await page.evaluate(()=>hollowCrownDiagnostics.metrics()).catch(()=>null):null;console.error(e);if(page)await shot('failure').catch(()=>{});process.exitCode=1;
}finally{report.checks=checks;report.errors=errors;report.failedRequests=requests;await writeFile(artifact(report.passed?'acceptance.json':`failure-${Date.now()}.json`),JSON.stringify(report,null,2)+'\n');await runner?.cleanup();}
