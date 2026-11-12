import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {url,artifact,harness} from './test-config.mjs';
import {createRun,step,chooseReward,chooseStory,enterRoom,checkpoint} from '../../public/games/hollow-crown/rules.js';
import {installPilot} from './browser-pilot.js';
import {freshProfile} from '../../public/games/hollow-crown/storage.js';
let page;
const KEY='stteak.hollow-crown.v1',runner=await harness(),report={checks:[],errors:[]};
try {
 page=await runner.browser.newPage({viewport:{width:1280,height:720}});page.on('pageerror',e=>report.errors.push(e.message));page.on('console',e=>{if(e.type()==='error')report.errors.push(e.text());});page.on('requestfailed',r=>{if(!r.failure()?.errorText.includes('ERR_ABORTED'))report.errors.push(r.url());});
 const boot=async()=>{await page.goto(url);await page.waitForFunction(()=>window.hollowCrownDiagnostics?.metrics().render?.frameSamples>=3);};
 const snap=()=>page.evaluate(()=>hollowCrownDiagnostics.snapshot());
 const seed=async p=>{await page.evaluate(({p,KEY})=>{localStorage.clear();if(p)localStorage.setItem(KEY,JSON.stringify(p));},{p,KEY});await boot();};
 const check=name=>{report.checks.push(name);console.log('PASS '+name);};await boot();
 // Wrap to the first enabled control; a disabled route select must never trap Tab.
 assert.equal(await page.locator('[data-config="route"]').isDisabled(),true);
 await page.locator('[data-action="progress"]').focus();await page.keyboard.press('Tab');assert.equal(await page.locator('[data-config="difficulty"]').evaluate(el=>el===document.activeElement),true);
 await page.keyboard.press('Shift+Tab');assert.equal(await page.locator('[data-action="progress"]').evaluate(el=>el===document.activeElement),true);
 await page.locator('[data-config="challenge"]').selectOption('normal');await page.locator('[data-action="progress"]').focus();await page.keyboard.press('Tab');assert.equal(await page.locator('[data-config="route"]').evaluate(el=>el===document.activeElement),true);
 await page.locator('[data-config="challenge"]').selectOption('crown-pilgrimage');check('camp keyboard wraps across enabled controls for both route modes');
 for(const phase of ['reward','route']) {
  const state=createRun({seed:72});state.enemies.forEach(e=>e.hp=0);state.pendingWaves=[];step(state,{},.02);if(phase==='route')chooseReward(state,'restore');
  const cp=checkpoint(state);cp.run[phase==='reward'?'rewardOptions':'routeOptions']=[];
  const profile=freshProfile();profile.settings.music=.15;profile.unlocked.push('kindling');profile.checkpoint={run:cp,runId:'valid-identity',credited:{rooms:0,parries:0,flawless:0}};
  await seed(profile);await page.click('[data-action="continue"]');const s=await snap();assert.equal(s.overlay,'camp');assert.equal(s.run,null);assert.equal(s.profile.checkpoint,null);assert.ok(s.profile.unlocked.includes('kindling'));assert.equal(s.profile.settings.music,.15);assert.match(await page.locator('#toast').innerText(),/損壞/);check('reject empty '+phase+' preserving profile');
 }
 for(const os of ['reduce','no-preference']) {
  await page.emulateMedia({reducedMotion:os});await seed(null);assert.equal((await snap()).profile.settings.reducedMotion,os==='reduce');
  await page.emulateMedia({reducedMotion:os==='reduce'?'no-preference':'reduce'});await page.waitForFunction(expected=>hollowCrownDiagnostics.snapshot().profile.settings.reducedMotion===expected,os!=='reduce');assert.equal((await snap()).profile.settings.reducedMotion,os!=='reduce');check('fresh OS motion default and changes: '+os);
 }
 for(const value of [false,true]) {
  await page.emulateMedia({reducedMotion:value?'no-preference':'reduce'});await seed(null);await page.click('[data-action="settings"]');await page.locator('[data-setting="reducedMotion"]').setChecked(value);await boot();assert.equal((await snap()).profile.settings.reducedMotion,value);assert.equal((await snap()).profile.settings.reducedMotionExplicit,true);
  await page.emulateMedia({reducedMotion:value?'reduce':'no-preference'});await page.waitForTimeout(100);assert.equal((await snap()).profile.settings.reducedMotion,value);check('explicit motion '+value+' survives OS and reload');
 }
 await seed({...freshProfile(),tutorialDone:true});
 for(const source of ['camp','pause']) {
  if(source==='pause'){await page.click('[data-action="begin"]');await page.waitForFunction(()=>['','pause'].includes(hollowCrownDiagnostics.snapshot().overlay));if((await snap()).overlay==='')await page.click('#pause-button');await page.waitForFunction(()=>hollowCrownDiagnostics.snapshot().overlay==='pause');}
  await page.click('[data-action="settings"]');const mute=page.locator('[data-action="mute"]');const music=await page.locator('[data-setting="music"]').inputValue(),effects=await page.locator('[data-setting="effects"]').inputValue();
  await mute.focus();for(const value of [true,false]){await page.keyboard.press('m');assert.equal((await snap()).profile.settings.muted,value);assert.equal(await mute.getAttribute('aria-pressed'),String(value));assert.match(await mute.innerText(),value?/恢復聲音/:/全部靜音/);}
  for(const value of [true,false]){await mute.click();assert.equal(await mute.evaluate(el=>el===document.activeElement),true);assert.equal((await snap()).profile.settings.muted,value);}
  assert.equal(await page.locator('[data-setting="music"]').inputValue(),music);assert.equal(await page.locator('[data-setting="effects"]').inputValue(),effects);await page.keyboard.press('Escape');check('mute hotkey, button, ARIA and focus from '+source);
  if(source==='pause')for(const width of [1280,1920]){await page.setViewportSize({width,height:width*9/16});await page.click('[data-action="restart-confirm"]');assert.equal(await page.evaluate(()=>document.activeElement?.dataset.action),'cancel-confirm');const enabled=page.locator('#overlay button:not(:disabled)');await enabled.last().focus();await page.keyboard.press('Tab');assert.equal(await enabled.first().evaluate(el=>el===document.activeElement),true);await page.keyboard.press('Shift+Tab');assert.equal(await enabled.last().evaluate(el=>el===document.activeElement),true);await page.keyboard.press('Escape');assert.equal((await snap()).overlay,'pause');}await page.setViewportSize({width:1280,height:720});

 }
 // Real shipped DOM, real keyboard progress: stop immediately before parry.
 await seed(null);await page.click('[data-action="tutorial"]');await installPilot(page);
 await page.evaluate(()=>new Promise(resolve=>{function stopAtParry(){if(hollowCrownDiagnostics.snapshot().run.tutorial.step>=3){acceptancePilot.stop();resolve();}else requestAnimationFrame(stopAtParry);}requestAnimationFrame(stopAtParry);}));
 const observeCue=async label=>{
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('#warning-cue')).visibility==='visible'&&document.querySelector('#warning-cue-text').textContent==='扇形提示：蓄勢',null,{timeout:25000,polling:'raf'});
  await page.screenshot({path:artifact('warning-'+label+'.png')});
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('#warning-cue')).visibility==='visible'&&['扇形提示：出招','觀察場上動作'].includes(document.querySelector('#warning-cue-text').textContent),null,{timeout:10000,polling:'raf'});
  check('shipped tutorial warning windup and strike/neutral: '+label);
 };
 await observeCue('initial');await page.keyboard.down('KeyJ');await page.waitForTimeout(900);await page.keyboard.up('KeyJ');await observeCue('after-charge');
 await page.keyboard.press('Escape');assert.equal(await page.locator('#warning-cue').evaluate(el=>getComputedStyle(el).visibility),'hidden');await page.click('[data-action="settings"]');assert.equal(await page.locator('#warning-cue').evaluate(el=>getComputedStyle(el).visibility),'hidden');await page.keyboard.press('Escape');await page.click('[data-action="resume"]');await observeCue('resumed');
 await page.setViewportSize({width:1920,height:1080});await observeCue('resized');
 await page.evaluate(()=>window.dispatchEvent(new Event('blur')));assert.equal(await page.locator('#warning-cue').evaluate(el=>getComputedStyle(el).visibility),'hidden');await page.click('[data-action="resume"]');
 await page.keyboard.press('Escape');await page.click('[data-action="leave-confirm"]');await page.click('[data-action="confirm"]');await page.click('[data-action="tutorial"]');await installPilot(page);
 await page.evaluate(()=>new Promise(resolve=>{function stopAtParry(){if(hollowCrownDiagnostics.snapshot().run.tutorial.step>=3){acceptancePilot.stop();resolve();}else requestAnimationFrame(stopAtParry);}requestAnimationFrame(stopAtParry);}));await observeCue('restarted');
 // Restore an honest crossfire entrance fixture, then receive live environmental damage.
 const crossfire=createRun({seed:72,challenge:'crown-pilgrimage',difficulty:'pilgrim'});
 for(let i=0;i<12&&!crossfire.objective?.attack;i++){for(const enemy of crossfire.enemies)enemy.hp=0;crossfire.pendingWaves=[];for(const target of crossfire.objective?.targets||[])target.done=true;if(crossfire.objective)crossfire.objective.completed=crossfire.objective.targets.length;step(crossfire,{},.02);if(crossfire.story)chooseStory(crossfire,crossfire.story.choices[0].id);chooseReward(crossfire,'restore');enterRoom(crossfire,crossfire.routeOptions[0].roomId,crossfire.routeOptions[0].risk);}
 const crossing=freshProfile();crossing.tutorialDone=true;crossing.checkpoint={run:checkpoint(crossfire),runId:'crossfire-toast',credited:{rooms:0,parries:0,flawless:0}};Object.assign(crossing.checkpoint.run.run.player,{x:3,z:-8,invuln:0});
 await seed(crossing);await page.click('[data-action="continue"]');await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('場地交火'),null,{timeout:20000});assert.doesNotMatch(await page.locator('#toast').innerText(),/training-hazard/);assert.ok((await snap()).run.stats.damageSources['training-hazard']>0);check('live environmental hurt toast is localized while telemetry keeps its source ID');
 // Offline presentation fixture preserves the stored source identifier and totals.
 const hazard=createRun({seed:72});hazard.stats.damageSources={'training-hazard':32};hazard.player.hp=0;hazard.player.invuln=0;step(hazard,{},.02);
 const saved=freshProfile();saved.tutorialDone=true;saved.checkpoint={run:checkpoint(hazard),runId:'hazard-localization',credited:{rooms:0,parries:0,flawless:0}};
 // Result checkpoints are valid read-only UI fixtures; no completion credit is taken.
 saved.checkpoint.run.run.phase='result';saved.checkpoint.run.run.result={...hazard.result,won:false,reason:'training-hazard',damageSources:{'training-hazard':32},rooms:[],time:1,parries:0,hits:1};
 await seed(saved);await page.click('[data-action="continue"]');assert.match(await page.locator('.result-reason').innerText(),/場地交火/);assert.match(await page.locator('#overlay').innerText(),/場地交火 32/);assert.doesNotMatch(await page.locator('#overlay').innerText(),/training-hazard/);check('environmental damage result and loss reason are localized');
 assert.deepEqual(report.errors,[]);report.passed=true;
}catch(e){report.failure=e.stack;report.snapshot=await page?.evaluate(()=>hollowCrownDiagnostics.snapshot()).catch(()=>null);await page?.screenshot({path:artifact('regression-failure.png')}).catch(()=>{});report.passed=false;process.exitCode=1;console.error(e);}finally{await writeFile(artifact('regressions.json'),JSON.stringify(report,null,2));await runner.cleanup();}
