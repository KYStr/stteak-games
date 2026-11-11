import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {url,artifact,harness} from './test-config.mjs';
import {createRun,step,chooseReward,checkpoint} from '../../public/games/hollow-crown/rules.js';
import {freshProfile} from '../../public/games/hollow-crown/storage.js';
const KEY='stteak.hollow-crown.v1',runner=await harness(),report={checks:[],errors:[]};
try {
 const page=await runner.browser.newPage({viewport:{width:1280,height:720}});page.on('pageerror',e=>report.errors.push(e.message));page.on('console',e=>{if(e.type()==='error')report.errors.push(e.text());});page.on('requestfailed',r=>{if(!r.failure()?.errorText.includes('ERR_ABORTED'))report.errors.push(r.url());});
 const boot=async()=>{await page.goto(url);await page.waitForFunction(()=>window.hollowCrownDiagnostics);};
 const snap=()=>page.evaluate(()=>hollowCrownDiagnostics.snapshot());
 const seed=async p=>{await page.evaluate(({p,KEY})=>{localStorage.clear();if(p)localStorage.setItem(KEY,JSON.stringify(p));},{p,KEY});await boot();};
 const check=name=>{report.checks.push(name);console.log('PASS '+name);};await boot();
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
  if(source==='pause'){await page.click('[data-action="begin"]');await page.keyboard.press('Escape');}
  await page.click('[data-action="settings"]');const mute=page.locator('[data-action="mute"]');const music=await page.locator('[data-setting="music"]').inputValue(),effects=await page.locator('[data-setting="effects"]').inputValue();
  await mute.focus();for(const value of [true,false]){await page.keyboard.press('m');assert.equal((await snap()).profile.settings.muted,value);assert.equal(await mute.getAttribute('aria-pressed'),String(value));assert.match(await mute.innerText(),value?/恢復聲音/:/全部靜音/);}
  for(const value of [true,false]){await mute.click();assert.equal(await mute.evaluate(el=>el===document.activeElement),true);assert.equal((await snap()).profile.settings.muted,value);}
  assert.equal(await page.locator('[data-setting="music"]').inputValue(),music);assert.equal(await page.locator('[data-setting="effects"]').inputValue(),effects);await page.keyboard.press('Escape');check('mute hotkey, button, ARIA and focus from '+source);
 }
 assert.deepEqual(report.errors,[]);report.passed=true;
}catch(e){report.failure=e.stack;report.passed=false;process.exitCode=1;console.error(e);}finally{await writeFile(artifact('regressions.json'),JSON.stringify(report,null,2));await runner.cleanup();}
