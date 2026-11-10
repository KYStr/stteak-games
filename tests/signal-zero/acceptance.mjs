import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {defaultSave,SAVE_KEY,SAVE_BACKUP_KEY} from '../../games/signal-zero/src/save.js';
import {createRun,step,checkpointSnapshot} from '../../games/signal-zero/src/core.js';
import {LEVELS} from '../../games/signal-zero/src/levels.js';

const root=fileURLToPath(new URL('../../',import.meta.url));
const artifacts=process.env.SIGNAL_ZERO_ARTIFACTS||'/tmp/signal-zero-acceptance';
await mkdir(artifacts,{recursive:true});
const base='http://127.0.0.1:8107/games/signal-zero/';
let browser,server;
const errors=[],failed=[],checks=[],report={};
const check=(name)=>{checks.push(name);console.log('PASS '+name)};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
try{
 try{const response=await fetch(base);assert.ok(response.ok)}catch{
  server=spawn('python3',['-m','http.server','8107','--bind','127.0.0.1','--directory',root+'public'],{stdio:'ignore'});
  for(let n=0;n<100;n++){try{if((await fetch(base)).ok)break}catch{}if(server.exitCode!==null)throw Error('Port 8107 unavailable');await wait(100)}
 }
 browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
 const page=await browser.newPage({viewport:{width:1280,height:720}});
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('requestfailed',r=>failed.push(r.url()));page.on('response',r=>{if(r.status()>=400)failed.push(r.status()+' '+r.url())});
 await page.addInitScript(()=>{
  const Audio=window.AudioContext;window.AudioContext=class extends Audio{constructor(...args){super(...args);window.__acceptanceAudio=this}};
 });
 const state=()=>page.evaluate(()=>window.signalZeroControlState);
 const screen=async expected=>{await page.waitForFunction(s=>window.signalZeroControlState?.screen===s,expected,{timeout:60000})};
 const keys=new Set();
 async function setKeys(desired){for(const k of [...keys])if(!desired.includes(k)){await page.keyboard.up(k);keys.delete(k)}for(const k of desired)if(!keys.has(k)){await page.keyboard.down(k);keys.add(k)}}
 async function driveTo(goal,{hack=false,maxMs=180000,jumpGaps=true}={}){
  const start=performance.now();let jumpUntil=0;
  while(performance.now()-start<maxMs){
   const s=await state(),p=s.player,l=LEVELS[s.levelIndex];if(s.phase!=='playing'){await setKeys([]);return s}
   const delta=goal-p.x,near=Math.abs(delta)<.6;
   if(near&&p.grounded&&Math.abs(p.vx)<.5&&!hack){await setKeys([]);return s}
   if(hack&&s.objectives.includes(l.terminals.find(t=>Math.abs(t.x-goal)<1)?.id)){await setKeys([]);return s}
   const cover=l.covers.some(c=>Math.abs(c.x-p.x)<2.3&&(c.x-p.x)*Math.sign(delta)>0&&p.y<c.y+c.h/2-.05&&c.y-c.h/2<p.y+1.65);
   const guard=s.devices.some(d=>d.type==='guard'&&Math.abs(d.x-p.x)<2.6&&(d.x-p.x)*Math.sign(delta)>0&&Math.abs(d.y-p.y)<1.2);
   const support=l.platforms.find(a=>Math.abs(a.y+a.h/2-p.y)<.06&&p.x>=a.x-a.w/2-.1&&p.x<=a.x+a.w/2+.1),edge=support?support.x+support.w/2:Infinity;
   const landing=support&&l.platforms.some(a=>a!==support&&a.x-a.w/2>edge+.05&&a.x-a.w/2<edge+3.2&&a.y+a.h/2>=p.y-1.5&&a.y+a.h/2<=p.y+1.3);
   // Browser input is sampled more slowly than the deterministic 60Hz driver.
   const gap=jumpGaps&&p.grounded&&landing&&edge-p.x<1.1&&edge-p.x>-.15;
   if(gap)jumpUntil=s.time+.7;
   const jump=p.grounded&&!near&&(cover||guard||gap);
   const desired=[];if(!near)desired.push(delta>0?'KeyD':'KeyA');if(near&&hack)desired.push('KeyW');
   if(jump||s.time<jumpUntil||(!near&&p.y<.9&&p.vy>0))desired.push('Space');
   // Jam the first camera while approaching the introductory terminal.
   if(s.levelIndex===0&&p.x>30&&p.x<35&&s.devices.find(d=>d.id==='camera-a').disabledUntil<=s.time)await page.keyboard.press('KeyE');
   await setKeys(desired);await page.waitForTimeout(65);
  }
  await setKeys([]);throw Error('Movement timed out at '+JSON.stringify(await state()));
 }
 await page.goto(base);await screen('home');assert.equal((await page.evaluate(()=>signalZeroDiagnostics.audio.context)),'not-created');check('relative modules load; audio waits for user gesture');
 await page.click('#begin');await screen('brief');await page.keyboard.press('Escape');await screen('missions');await page.click('[data-level="0"]');await page.click('#guide');await screen('help');await page.keyboard.press('Escape');await screen('brief');await page.click('#deploy');await screen('playing');
 await driveTo(32,{hack:true});assert.ok((await state()).objectives.includes('frequency'));await driveTo(35);await page.waitForFunction(()=>signalZeroControlState.checkpoint,null,{timeout:12000});
 const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),SAVE_KEY);assert.equal(saved.checkpoint.levelRevision,LEVELS[0].revision);check('real keyboard movement, jumping, tool, terminal hacking and checkpoint save');
 await page.screenshot({path:artifacts+'/play-1280.png'});
 await page.reload();await screen('home');await page.click('#begin');await screen('playing');assert.ok(Math.abs((await state()).player.x-35)<.05);check('reload restores earned checkpoint and objective');
 await page.goto('about:blank');await page.goBack();await page.waitForFunction(()=>['home','pause'].includes(signalZeroControlState?.screen));if((await state()).screen==='home')await page.click('#begin');else await page.click('#resume');await screen('playing');assert.ok((await state()).checkpoint);check('browser navigation back returns paused or restores the saved checkpoint');
 await page.keyboard.down('KeyD');await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.keyboard.up('KeyD');await screen('pause');const frozen=(await state()).time;await page.waitForTimeout(300);assert.equal((await state()).time,frozen);
 await page.waitForFunction(()=>signalZeroDiagnostics.audio.context==='suspended');await page.click('#resume');await page.waitForFunction(()=>signalZeroDiagnostics.audio.context==='running');check('blur freezes simulation and suspends audio; explicit resume recovers');
 await page.keyboard.press('Escape');await screen('pause');await page.click('#settings');const original=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).settings.bindings,SAVE_KEY);
 await page.click('[data-bind="right"]');await page.click('#back');await page.keyboard.press('KeyX');assert.deepEqual(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).settings.bindings,SAVE_KEY),original);
 await page.click('#settings');await page.click('[data-bind="right"]');await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.keyboard.press('KeyZ');assert.deepEqual(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).settings.bindings,SAVE_KEY),original);check('binding capture cancels on Back and blur');
 await page.locator('#reset-keys').focus();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'back');await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'reset-keys');check('modal keyboard focus stays in menu');
 await page.click('#mute');assert.equal(await page.locator('#mute').getAttribute('aria-pressed'),'true');await page.reload();await screen('home');assert.equal(await page.locator('#mute').getAttribute('aria-pressed'),'true');await page.click('#mute');await page.click('#begin');await page.keyboard.press('Escape');await page.click('#settings');
 await page.locator('#music').focus();await page.keyboard.press('Home');await page.locator('#sfx').focus();await page.keyboard.press('Home');assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).settings.music,SAVE_KEY),0);await page.locator('#music').evaluate(el=>{el.value='0.45';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.locator('#sfx').evaluate(el=>{el.value='0.7';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.click('#back');await page.click('#resume');
 await page.evaluate(()=>window.__acceptanceAudio.suspend());await page.keyboard.press('KeyA');await page.waitForFunction(()=>signalZeroDiagnostics.audio.context==='running');check('mute/volume persist; a gesture resumes externally suspended audio');
 // Stable empty entry area: real rendering/physics/music remain active for 3 min.
 await page.keyboard.press('Escape');await page.click('#restart');await page.click('#confirm');await screen('playing');await page.waitForTimeout(2500);
 const cdp=await page.context().newCDPSession(page);await cdp.send('HeapProfiler.collectGarbage');const initialDom=await cdp.send('Memory.getDOMCounters');const initial=await page.evaluate(()=>({heap:performance.memory?.usedJSHeapSize,render:signalZeroDiagnostics.render}));
 const soakMs=Number(process.env.SIGNAL_ZERO_SOAK_MS||180000);console.log('Running '+soakMs+' ms stability soak');
 for(let elapsed=0;elapsed<soakMs;elapsed+=15000){await page.waitForTimeout(Math.min(15000,soakMs-elapsed));console.log('soak '+Math.min(soakMs,elapsed+15000)+' / '+soakMs)}
 await cdp.send('HeapProfiler.collectGarbage');const finalDom=await cdp.send('Memory.getDOMCounters');const end=await page.evaluate(()=>{const d=signalZeroDiagnostics;return{heap:performance.memory?.usedJSHeapSize,render:d.render,audio:d.audio,frames:d.performance.frames,performance:{average:d.performance.average,p95:d.performance.p95,samples:d.performance.samples}}});
 const steady=end.frames.slice(Math.min(120,Math.floor(end.frames.length/4))).map(f=>f.ms).sort((a,b)=>a-b);report.performance={...end.performance,steadyAverage:steady.reduce((a,b)=>a+b,0)/steady.length,steadyP95:steady[Math.floor(steady.length*.95)],initialHeap:initial.heap,finalHeap:end.heap,initialDom,finalDom,render:end.render,soakMs};
 assert.ok(end.audio.voices<=12);assert.equal(end.render.geometries,initial.render.geometries);assert.ok(finalDom.jsEventListeners<=initialDom.jsEventListeners+2);assert.ok(end.heap<initial.heap+8e6);check('bounded audio voices, geometry, listeners and heap across stability soak');
 await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:artifacts+'/play-1920.png'});await page.keyboard.press('Escape');await page.click('#settings');await page.screenshot({path:artifacts+'/settings-1920.png'});await page.setViewportSize({width:1280,height:720});
 assert.ok(await page.locator('#reset-keys').isVisible());check('1280×720 and 1920×1080 responsive HUD and settings');
 // A valid late checkpoint fixture isolates browser defeat/victory UI; complete
 // input-driven campaign routes are independently covered by the unit suite.
 const fixtureRun=createRun(0);fixtureRun.objectives=LEVELS[0].terminals.map(t=>t.id);fixtureRun.player.x=LEVELS[0].checkpoints.at(-1).x;step(fixtureRun,{});
 const fixture=defaultSave();fixture.activeLevel=0;fixture.checkpoint=checkpointSnapshot(fixtureRun);assert.ok(fixture.checkpoint);
 async function loadFixture(){await page.evaluate(({key,backup,save})=>{localStorage.removeItem(backup);localStorage.setItem(key,JSON.stringify(save))},{key:SAVE_KEY,backup:SAVE_BACKUP_KEY,save:fixture});await page.reload();await screen('home');await page.click('#begin');await screen('playing')}
 await loadFixture();await driveTo(1013);await driveTo(1020,{jumpGaps:false});await page.waitForFunction(()=>signalZeroControlState.phase==='caught',null,{timeout:10000});await setKeys([]);await screen('caught');await page.screenshot({path:artifacts+'/caught.png'});await page.click('#retry');await screen('playing');assert.ok((await state()).checkpoint);check('fall -> defeat -> checkpoint retry');
 await driveTo(LEVELS[0].exit.x);await screen('complete');await page.screenshot({path:artifacts+'/complete.png'});assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).unlocked,SAVE_KEY),2);await page.click('#replay');await page.click('#deploy');await screen('playing');assert.equal((await state()).objectives.length,0);check('exit -> victory -> saved unlock -> replay');
 let endingSave={...defaultSave(),unlocked:6,pendingEnding:true};
 for(let choice=0;choice<2;choice++){await page.evaluate(({key,save})=>localStorage.setItem(key,JSON.stringify(save)),{key:SAVE_KEY,save:endingSave});await page.reload();await screen('home');await page.click('#begin');await screen('ending');await page.click('#ending-'+choice);await screen('epilogue');endingSave=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),SAVE_KEY);assert.equal(endingSave.endings.length,choice+1);assert.equal(endingSave.pendingEnding,false);await page.screenshot({path:artifacts+'/ending-'+choice+'.png'});endingSave.pendingEnding=true}
 check('both ending choices reach epilogues and persist independently');
 // Graceful context failure is intentionally tested last, then rebuilt by reload.
 await page.evaluate(()=>{const gl=document.getElementById('world').getContext('webgl2');gl.getExtension('WEBGL_lose_context').loseContext()});await screen('error');await page.click('#retry');await screen('home');check('WebGL context loss has a working recovery action');
 await page.evaluate(({key,backup})=>{localStorage.setItem(key,'{broken');localStorage.removeItem(backup)},{key:SAVE_KEY,backup:SAVE_BACKUP_KEY});await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await screen('home');assert.equal(await page.locator('#storage-warning').isVisible(),true);await page.click('#settings');assert.equal(await page.locator('#motion').isChecked(),true);check('corrupt save falls back visibly and new settings honor system reduced motion');
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);check('zero uncaught errors, console errors, failed requests or HTTP errors');
 report.checks=checks;report.errors=errors;report.failedRequests=failed;await writeFile(artifacts+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report.performance,null,2));console.log('PASS '+checks.length+' browser acceptance checks; artifacts '+artifacts);
}catch(error){console.error(error);await writeFile(artifacts+'/failure.json',JSON.stringify({message:error.message,checks,errors,failed},null,2));process.exitCode=1}finally{await browser?.close();server?.kill('SIGTERM')}
