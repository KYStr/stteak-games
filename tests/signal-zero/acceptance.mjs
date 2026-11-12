import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {defaultSave,SAVE_KEY,SAVE_BACKUP_KEY} from '../../games/signal-zero/src/save.js';
import {createRun,step,checkpointSnapshot} from '../../games/signal-zero/src/core.js';
import {runBrowserChapter} from './campaign-driver.mjs';
import {instrumentation,captureErrors} from './browser-harness.mjs';
import {actionTimeout,capture,stopServer,installFeedbackProbe,deadline,navigateAndReady} from './evidence.mjs';
import {LEVELS} from '../../games/signal-zero/src/levels.js';

const root=fileURLToPath(new URL('../../',import.meta.url));
const artifacts=process.env.SIGNAL_ZERO_ARTIFACTS||'/tmp/signal-zero-acceptance';
await mkdir(artifacts,{recursive:true});
const port=Number(process.env.SIGNAL_ZERO_PORT||8107);
assert.ok(Number.isInteger(port)&&port>=1024&&port<=65535);
const base=`http://127.0.0.1:${port}/games/signal-zero/`;
let browser,server,page;
const errors=[],failed=[],checks=[],report={requiredFailures:[],groups:[]};let virtualClock=false;
const check=(name)=>{checks.push(name);console.log('PASS '+name)};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
try{
 try{const response=await fetch(base);assert.ok(response.ok)}catch{
  server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root+'public'],{stdio:'ignore'});
  for(let n=0;n<100;n++){try{if((await fetch(base)).ok)break}catch{}if(server.exitCode!==null)throw Error(`Port ${port} unavailable`);await wait(100)}
 }
 async function openBrowser(){
 browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 page=await browser.newPage({viewport:{width:1280,height:720}});page.setDefaultTimeout(actionTimeout);
 captureErrors(page,errors,failed);
 await page.addInitScript(instrumentation);
 await page.addInitScript(()=>{
  // Consume fixtures on the new document, after pagehide persisted the old run.
  const pending=location.protocol==='http:'&&location.pathname.startsWith('/games/signal-zero/')?sessionStorage.getItem('signal-zero-acceptance-pending-save'):null;
  if(pending){localStorage.setItem('stteak.signal-zero.save.v1',pending);localStorage.removeItem('stteak.signal-zero.save.v1.backup');sessionStorage.removeItem('signal-zero-acceptance-pending-save')}
  const pendingRaf=new Set(),nativeRaf=requestAnimationFrame.bind(window),nativeCancel=cancelAnimationFrame.bind(window);
  // The named application loop is separate from Playwright's own RAF pollers.
  window.__raf={pending:pendingRaf,max:0,requests:0};
  window.requestAnimationFrame=callback=>{if(callback.name!=='frame')return nativeRaf(callback);window.__raf.requests++;const id=nativeRaf(now=>{pendingRaf.delete(id);callback(now)});pendingRaf.add(id);window.__raf.max=Math.max(window.__raf.max,pendingRaf.size);return id};
  window.cancelAnimationFrame=id=>{pendingRaf.delete(id);nativeCancel(id)};
  const Audio=window.AudioContext;window.AudioContext=class extends Audio{constructor(...args){super(...args);window.__acceptanceAudio=this;const analyser=this.createAnalyser();analyser.connect(this.destination);window.__audioAnalyser=analyser;const create=this.createGain.bind(this);this.createGain=()=>{const g=create(),connect=g.connect.bind(g);g.connect=(target,...rest)=>connect(target===this.destination?analyser:target,...rest);return g}}};
 });
 }
 await openBrowser();
 const nav=(navigate,expected='home',options={})=>navigateAndReady(page,navigate,expected,actionTimeout,{report,errors,failedRequests:failed,...options});
 // Poll from Node: browser timers intentionally stop under page.clock, and
 // can be delayed by a busy software compositor. The predicate itself still
 // reads the real application state and retains the same bounded deadline.
 const waitForState=async(predicate,arg,options={})=>{
  const until=performance.now()+(options.timeout??actionTimeout);let lastError;
  while(performance.now()<until){
   try{if(await deadline(page.evaluate(predicate,arg),Math.max(1,until-performance.now())))return}
   catch(error){lastError=error;if(!/not defined|Execution context was destroyed|Cannot find context|deadline/.test(error.message))throw error}
   await wait(Math.min(100,Math.max(1,until-performance.now())));
  }
  throw Error('State deadline: '+String(predicate)+(lastError?' ('+lastError.message+')':''));
 };
 const state=()=>page.evaluate(()=>window.signalZeroControlState);
 const screen=async expected=>{if(expected!=='error'){const failure=await page.evaluate(()=>window.signalZeroControlState?.screen==='error'?document.getElementById('overlay').textContent:null);if(failure)throw Error('Graphics recovery screen: '+failure)}await waitForState(s=>window.signalZeroControlState?.screen===s,expected,{timeout:actionTimeout})};
 async function refreshVirtualRafProbe(){
  await page.evaluate(()=>{
   // Clock installation replaces requestAnimationFrame. Observe the currently
   // installed scheduler, then let the one existing loop seed this new probe.
   const native=requestAnimationFrame.bind(window),cancel=cancelAnimationFrame.bind(window),pending=new Set();
   window.__raf={pending,max:0,requests:0};
   window.requestAnimationFrame=callback=>{if(callback.name!=='frame')return native(callback);__raf.requests++;const id=native(now=>{pending.delete(id);callback(now)});pending.add(id);__raf.max=Math.max(__raf.max,pending.size);return id};
   window.cancelAnimationFrame=id=>{pending.delete(id);cancel(id)};
  });
 }
 async function loadSaveFixture(save,{start=true}={}){
  await page.evaluate(save=>sessionStorage.setItem('signal-zero-acceptance-pending-save',JSON.stringify(save)),save);
  await nav(opts=>page.reload(opts));await installFeedbackProbe(page);if(virtualClock)await refreshVirtualRafProbe();if(!start)return;
  const initialFrame=await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames);
  try{await page.click('#begin')}catch(error){if((await state()).screen!=='playing')throw error}
  await screen('playing');
  if(virtualClock)await page.clock.fastForward(100);
  await waitForState(n=>{const d=signalZeroDiagnostics;return d.performance.totalFrames>n&&d.render.drawCalls>0},initialFrame);
  const restored=await state();assert.equal(restored.levelIndex,save.checkpoint?.levelIndex??save.activeLevel);
  if(save.checkpoint){assert.equal(restored.checkpointIndex,save.checkpoint.checkpointIndex);assert.ok(Math.abs(restored.player.x-save.checkpoint.x)<.05)}
  assert.equal(await page.evaluate(()=>signalZeroDiagnostics.settings.quality),save.settings.quality);
 }
 function checkpointSave(index,chapter=0){const run=createRun(chapter),l=LEVELS[chapter];run.objectives=l.terminals.slice(0,index+1).map(t=>t.id);run.player.x=l.checkpoints[index].x;step(run,{});const save=defaultSave();save.unlocked=chapter+1;save.activeLevel=chapter;save.checkpoint=checkpointSnapshot(run);assert.ok(save.checkpoint);return save}
 async function captureWorld(name){
  const previous=await page.evaluate(()=>{const ids=['overlay','hud'],values=ids.map(id=>document.getElementById(id).hidden);document.getElementById('overlay').hidden=true;document.getElementById('hud').hidden=false;return values});
  try{await capture(page,artifacts+'/'+name+'.png',report)}finally{await page.evaluate(values=>['overlay','hud'].forEach((id,i)=>document.getElementById(id).hidden=values[i]),previous)}
 }
 async function measureScene(name,duration=30000,retry=false){
  await page.waitForTimeout(1000);await page.keyboard.press('Escape');await screen('pause');
  assert.equal(await page.evaluate(()=>signalZeroDiagnostics.render.autoScale),.75);
  await captureWorld(name+'-minimum');await page.click('#resume');
  await page.waitForTimeout(3000);
  const start=await page.evaluate(()=>({frames:signalZeroDiagnostics.performance.totalFrames,time:signalZeroControlState.time})),wall=performance.now();
  await page.waitForTimeout(duration);
  const d=await page.evaluate(()=>signalZeroDiagnostics),wallMs=performance.now()-wall;
  const intervals=d.performance.frames.filter(f=>f.index>=start.frames).map(f=>f.ms),sorted=[...intervals].sort((a,b)=>a-b);
  let slowWindow=false,sum=0,left=0;for(let right=0;right<intervals.length;right++){sum+=intervals[right];while(sum-intervals[left]>=1000)sum-=intervals[left++];if(sum>=1000&&(right-left+1)/sum*1000<20)slowWindow=true}
  const record={name,viewport:page.viewportSize(),playerX:d.state.player.x,quality:d.settings.quality,canvas:d.render.resolution,scale:d.render.dpr,drawCalls:d.render.maxDrawCalls,triangles:d.render.maxTriangles,textureBytes:d.render.textureBytes,textureLedger:await page.evaluate(()=>__textureLedger),wallMs,simulationSeconds:d.state.time-start.time,frames:sorted.length,mean:sorted.reduce((a,b)=>a+b,0)/sorted.length,p95:sorted[Math.floor(sorted.length*.95)],max:sorted.at(-1),slowWindow,phases:d.performance.phases,render:d.render};
  (report.scenes??=[]).push(record);await writeFile(artifacts+'/report.json',JSON.stringify(report,null,2));console.log('SCENE '+JSON.stringify(record));
  await page.keyboard.press('Escape');await screen('pause');await captureWorld(name);
  assert.ok(record.canvas[0]>=page.viewportSize().width*.75&&record.canvas[1]>=page.viewportSize().height*.75,JSON.stringify(record));
  record.requestedWallMs=duration;record.attempt=retry?2:1;record.coverage=d.state.screen==='playing'&&record.simulationSeconds>=10&&record.frames>=100&&wallMs>=duration;record.classification=record.coverage?'active':'insufficient coverage';record.visibility=await page.evaluate(()=>document.visibilityState);if(!record.coverage&&!retry){const retryMs=Math.min(180000,Math.max(duration*1.5,duration*12/Math.max(.1,record.simulationSeconds),duration*140/Math.max(1,record.frames)));await page.click('#resume');return measureScene(name,retryMs,true)}assert.ok(record.coverage,'Insufficient active scene coverage: '+JSON.stringify(record));
  record.passed=record.drawCalls<=250&&record.triangles<=1500000&&record.textureBytes<=256*1024*1024&&record.textureLedger.peak<=256*1024*1024&&record.render.dpr<=2&&record.phases.logic.p95<=6;
  if(process.env.SIGNAL_ZERO_STRICT_RAF==='1')record.passed&&=record.mean<=33.4&&record.p95<=50.1&&!slowWindow;
  // Retain every scene and run the lifecycle/soak checks even if pacing fails.
  // The final assertion still fails release acceptance with the entire record.
 }
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
   const approachingGuard=s.devices.find(d=>d.type==='guard'&&Math.abs(d.x-p.x)<8&&(d.x-p.x)*Math.sign(delta)>0&&d.state!=='searching');
   if(approachingGuard&&s.tools[1]>0){await page.click('[data-tool="1"]');await page.keyboard.press('KeyE')}
   // Jam the first camera while approaching the introductory terminal.
   if(s.levelIndex===0&&p.x>30&&p.x<35&&s.devices.find(d=>d.id==='camera-a').disabledUntil<=s.time){await page.click('[data-tool="0"]');await page.keyboard.press('KeyE')}
   await setKeys(desired);await page.waitForTimeout(65);
  }
  await setKeys([]);throw Error('Movement timed out at '+JSON.stringify(await state()));
 }
 async function group(name,fn){
  const record={name};report.groups.push(record);console.log('GROUP '+name);
  try{await fn();record.passed=true}catch(error){record.error=error.stack;record.state=await Promise.race([state(),wait(10000).then(()=>null)]).catch(()=>null);report.requiredFailures.push(name+': '+error.message);console.error('FAIL '+name+': '+error.message);if(record.state)await setKeys([]).catch(()=>{});
   else{console.error('Closing unresponsive browser before recreating it');await browser.close();await openBrowser();virtualClock=false;keys.clear();await nav(opts=>page.goto(base,opts),'home',{url:base})}
  }
  await writeFile(artifacts+'/report.json',JSON.stringify(report,null,2));
 }
 await group('opening-controls-save-audio',async()=>{
 const loadStarted=performance.now();
 await nav(opts=>page.goto(base,opts),'home',{url:base});
 await screen('home');await installFeedbackProbe(page);report.load=await page.evaluate(()=>({bytes:performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0),resources:performance.getEntriesByType('resource').length}));report.load.interactiveWallMs=performance.now()-loadStarted;assert.ok(report.load.bytes<=30*1024*1024);assert.equal((await page.evaluate(()=>signalZeroDiagnostics.audio.context)),'not-created');check('relative modules load; audio waits for user gesture');
 await page.click('#begin');await screen('brief');await page.keyboard.press('Escape');await screen('missions');await page.click('[data-level="0"]');await page.fill('#seed-code','9999');await page.click('#guide');await screen('help');await page.keyboard.press('Escape');await screen('brief');assert.equal(await page.locator('#seed-code').inputValue(),'9999');check('brief frequency code survives help and Back');await page.click('#deploy');await screen('playing');
 await waitForState(()=>{if(window.__acceptanceAudio?.state!=='running')return false;const data=new Float32Array(window.__audioAnalyser.fftSize);window.__audioAnalyser.getFloatTimeDomainData(data);return data.some(v=>Math.abs(v)>.00001)});check('default gesture policy unlocks running audio with nonzero samples');
 await page.evaluate(async()=>{const {Sound}=await import('./audio.js');const event=Sound.prototype.event,tone=Sound.prototype.tone;window.__landing={events:[],voices:[]};Sound.prototype.event=function(type){window.__landing.events.push(type);return event.call(this,type)};Sound.prototype.tone=function(...args){const before=this.voices.size,result=tone.apply(this,args);if(args[0]===70)window.__landing.voices.push(this.voices.size>before);return result};window.__restoreSound=()=>{Sound.prototype.event=event;Sound.prototype.tone=tone}});
 for(const mode of ['audible','mute','zero-sfx']){
  if(mode==='mute')await page.click('#mute');
  if(mode==='zero-sfx'){await page.click('#mute');await page.keyboard.press('Escape');await page.click('#settings');await page.locator('#sfx').evaluate(el=>{el.value='0';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.click('#back');await page.click('#resume')}
  await page.evaluate(()=>{__landing.events=[];__landing.voices=[]});await page.keyboard.down('Space');await waitForState(()=>!signalZeroControlState.player.grounded,null,{timeout:60000});await page.waitForTimeout(250);await page.keyboard.up('Space');await waitForState(()=>signalZeroControlState.player.grounded,null,{timeout:60000});
  const observed=await page.evaluate(()=>({...__landing,audio:signalZeroDiagnostics.audio}));(report.landings??=[]).push({mode,...observed});assert.equal(observed.events.filter(t=>t==='land').length,1);assert.equal(observed.events.filter(t=>t==='jump').length,1);assert.ok(observed.audio.voices<=12);assert.equal(observed.voices.some(Boolean),mode==='audible');
 }
 await page.evaluate(()=>__restoreSound());await page.keyboard.press('Escape');await page.click('#settings');await page.locator('#sfx').evaluate(el=>{el.value='.7';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.click('#back');await page.click('#restart');await page.click('#confirm');check('keyboard jump emits one landing; mute and zero SFX suppress its voice');
 // Isolate action envelopes from music; each event must schedule a live voice.
 await page.keyboard.press('Escape');await page.click('#settings');await page.locator('#music').evaluate(el=>{el.value='0';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.click('#back');await page.click('#resume');
 await page.evaluate(async()=>{const {Sound}=await import('./audio.js');const event=Sound.prototype.event;window.__cues=[];Sound.prototype.event=function(type){const before=this.voices.size;const out=event.call(this,type);__cues.push({type,voice:this.voices.size>before,at:performance.now(),running:this.context?.state});return out;};});
 const selected=(await state()).selectedTool;await page.keyboard.press('KeyQ');await waitForState(i=>signalZeroControlState.selectedTool===i,(selected+1)%3);assert.equal(await page.locator('[data-tool="'+((selected+1)%3)+'"]').getAttribute('aria-pressed'),'true');await page.click('[data-tool="'+((selected+2)%3)+'"]');await page.click('[data-tool="'+((selected+2)%3)+'"]');await page.keyboard.press('KeyE');await waitForState(()=>__cues.some(e=>e.type==='toolFail'));const selection=await page.evaluate(()=>__cues);assert.equal(selection.filter(e=>e.type==='tool-selected').length,2);assert.ok(selection.filter(e=>e.type==='tool-selected'||e.type==='toolFail').every(e=>e.voice));
 await driveTo(13.5);const climbStart=await page.evaluate(()=>({y:signalZeroControlState.player.y,cues:__cues.filter(e=>e.type==='climb'&&e.voice).length}));await page.keyboard.down('KeyW');await waitForState(start=>signalZeroControlState.player.y>=start.y+.15&&__cues.filter(e=>e.type==='climb'&&e.voice).length>start.cues,climbStart);await page.keyboard.up('KeyW');assert.ok(await page.evaluate(()=>__cues.some(e=>e.type==='climb'&&e.voice)));await page.keyboard.press('Escape');await page.click('#restart');await page.click('#confirm');
 await driveTo(32);await waitForState(()=>Math.abs(signalZeroControlState.player.vx)<.05&&signalZeroControlState.player.grounded);await page.keyboard.down('KeyW');await waitForState(()=>signalZeroControlState.objectives.includes('frequency'));await page.keyboard.up('KeyW');assert.ok((await state()).objectives.includes('frequency'));const cues=await page.evaluate(()=>__cues);report.actionCues=cues;for(const type of ['hack-start','hack-progress','objective'])assert.ok(cues.some(c=>c.type===type&&c.voice),type+' must have a live envelope');assert.equal(cues.filter(c=>c.type==='hack-start').length,1);assert.equal(cues.filter(c=>c.type==='hack-progress').length,3);
 await page.waitForTimeout(150);report.feedback=await page.evaluate(()=>({events:__feedback,rawEventToReadQueueMs:__rawQueue}));
 for(const type of ['jump','land','tool-selected','toolFail','climb','hack-start','hack-progress','objective','tool']){
  const rows=report.feedback.events.filter(row=>row.type===type&&row.voice);assert.ok(rows.length,type+' audible category');
  assert.ok(rows.some(row=>row.visual),type+' visual output');
  assert.ok(rows.every(row=>row.inputMs<=50&&row.audioMs<=100&&row.visualMs<=100),type+' numeric JS feedback deadlines');
  assert.ok(rows.some(row=>row.audioPeak>.00001),type+' nonzero output');
 }
 check('Q/mouse selection, failed tool, climb and hack milestones have live envelopes and immediate visual feedback');await driveTo(35);await waitForState(()=>signalZeroControlState.checkpoint,null,{timeout:12000});
 const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),SAVE_KEY);assert.equal(saved.checkpoint.levelRevision,LEVELS[0].revision);assert.equal(saved.checkpoint.seed,saved.activeSeed);check('real keyboard movement, jumping, tool, terminal hacking and checkpoint save');
 await capture(page,artifacts+'/play-1280.png',report);
 await nav(opts=>page.reload(opts));await page.click('#begin');await screen('playing');assert.ok(Math.abs((await state()).player.x-35)<.05);assert.equal((await state()).seed,saved.activeSeed);assert.ok((await state()).traceRemaining<=saved.checkpoint.traceRemaining);check('reload restores earned checkpoint and objective');
 await page.goto('about:blank',{waitUntil:'commit'});await nav(opts=>page.goBack(opts),['home','pause'],{history:true,url:base});if((await state()).screen==='home')await page.click('#begin');else await page.click('#resume');await screen('playing');assert.ok((await state()).checkpoint);check('browser navigation back returns paused or restores the saved checkpoint');
 await page.keyboard.down('KeyD');await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.keyboard.up('KeyD');await screen('pause');const frozen=(await state()).time,frozenTrace=(await state()).traceRemaining;await page.waitForTimeout(300);assert.equal((await state()).time,frozen);assert.equal((await state()).traceRemaining,frozenTrace);
 await waitForState(()=>signalZeroDiagnostics.audio.context==='suspended');await page.click('#resume');await waitForState(()=>signalZeroDiagnostics.audio.context==='running');check('blur freezes simulation and suspends audio; explicit resume recovers');
 await page.keyboard.press('Escape');await screen('pause');await page.click('#settings');const original=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).settings.bindings,SAVE_KEY);
 await page.click('[data-bind="right"]');await page.click('#back');await page.keyboard.press('KeyX');assert.deepEqual(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).settings.bindings,SAVE_KEY),original);
 await page.click('#settings');await page.click('[data-bind="right"]');await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.keyboard.press('KeyZ');assert.deepEqual(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).settings.bindings,SAVE_KEY),original);check('binding capture cancels on Back and blur');
 await page.locator('#reset-keys').focus();await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'back');await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'reset-keys');check('modal keyboard focus stays in menu');
 await page.click('#mute');assert.equal(await page.locator('#mute').getAttribute('aria-pressed'),'true');await nav(opts=>page.reload(opts));assert.equal(await page.locator('#mute').getAttribute('aria-pressed'),'true');await page.click('#mute');await page.click('#begin');await page.keyboard.press('Escape');await page.click('#settings');
 await page.locator('#music').focus();await page.keyboard.press('Home');await page.locator('#sfx').focus();await page.keyboard.press('Home');assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).settings.music,SAVE_KEY),0);await page.locator('#music').evaluate(el=>{el.value='0.45';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.locator('#sfx').evaluate(el=>{el.value='0.7';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.click('#back');await page.click('#resume');
 await page.evaluate(()=>window.__acceptanceAudio.suspend());await page.keyboard.press('KeyA');await waitForState(()=>signalZeroDiagnostics.audio.context==='running');check('mute/volume persist; a gesture resumes externally suspended audio');
 assert.ok(await page.evaluate(()=>__raf.requests)>0);assert.equal(await page.evaluate(()=>__raf.max),1);check('pause/resume retains one outstanding game RAF');
 });
 await group('navigation-readiness-regressions',async()=>{
  report.muteReloadTrials=[];
  for(let trial=0;trial<5;trial++){
   const before=await page.locator('#mute').getAttribute('aria-pressed');await page.click('#mute');
   const expected=before!=='true';await nav(opts=>page.reload(opts));
   assert.equal(await page.locator('#mute').getAttribute('aria-pressed'),String(expected));
   assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).settings.muted,SAVE_KEY),expected);
   report.muteReloadTrials.push({trial:trial+1,muted:expected,navigation:report.navigations.at(-1)});
  }
  check('five consecutive mute/reload trials preserve saved values on a new rendered document');
  const broken=await browser.newPage();
  try{
   await broken.route('**/synthetic-boot-error',route=>route.fulfill({contentType:'text/html',body:'<script>window.signalZeroControlState={screen:"error",error:"synthetic missing module"}</script>'}));
   await assert.rejects(navigateAndReady(broken,opts=>broken.goto(base+'synthetic-boot-error',opts),'home',5000),/synthetic missing module/);
   report.syntheticBootFailureRejected=true;check('readiness rejects a synthetic boot failure');
   await broken.route('**/synthetic-rendered-boot',route=>route.fulfill({contentType:'text/html',body:'<link rel="icon" href="data:,"><script>window.signalZeroControlState={screen:"home"};window.signalZeroDiagnostics={render:{drawCalls:1}}</script>'}));
   await broken.clock.install();
   const first=await navigateAndReady(broken,opts=>broken.goto(base+'synthetic-rendered-boot',opts),'home',5000);
   const virtualOrigin=await broken.evaluate(()=>performance.timeOrigin);
   const second=await navigateAndReady(broken,opts=>broken.reload(opts),'home',5000);
   assert.notEqual(second.origin,first.origin);assert.equal(await broken.evaluate(()=>performance.timeOrigin),virtualOrigin);
   report.nativeOriginUnderVirtualClock=true;check('native document identity changes on reload while virtual time origin stays fixed');
  }finally{await broken.close()}
 });
 await group('hud-dirty-updates-and-remapping',async()=>{
  const entry=defaultSave();entry.activeLevel=0;await page.setViewportSize({width:480,height:270});await loadSaveFixture(entry);await page.waitForTimeout(500);
  await page.evaluate(()=>{window.__hudWrites={objectives:0,keys:0};for(const [id,node]of [['objectives',document.getElementById('objectives')],['keys',document.querySelector('.key-hints')]])new MutationObserver(rows=>__hudWrites[id]+=rows.length).observe(node,{subtree:true,childList:true,characterData:true});window.__objectiveNodes=[...document.getElementById('objectives').children]});
  await page.waitForTimeout(2000);assert.deepEqual(await page.evaluate(()=>__hudWrites),{objectives:0,keys:0});
  const before=await page.locator('#exit-distance').textContent();await page.keyboard.down('KeyD');await waitForState(()=>signalZeroControlState.player.x>5);await page.keyboard.up('KeyD');await page.waitForTimeout(150);assert.notEqual(await page.locator('#exit-distance').textContent(),before);assert.ok(await page.evaluate(()=>__objectiveNodes.every((n,i)=>n===document.getElementById('objectives').children[i])));
  await page.keyboard.press('Escape');await page.click('#settings');await page.click('[data-bind="up"]');await page.keyboard.press('KeyE');await page.click('#back');await page.click('#help');const help=await page.locator('#overlay').textContent();assert.ok(help.includes('E／互動'));assert.ok(help.includes('W 使用'));await page.click('#back');await page.click('#settings');await page.click('#reset-keys');await page.click('#back');await page.click('#restart');await page.click('#confirm');assert.ok((await page.locator('#objectives').textContent()).includes('0 / 4'));assert.ok((await page.locator('.key-hints').textContent()).includes('W 互動'));
  await loadSaveFixture(checkpointSave(0));assert.ok((await page.locator('#objectives').textContent()).includes('1 / 4'));assert.ok((await page.locator('[data-tool="0"] b').textContent()).startsWith('×'));check('unchanged objective/key subtrees have zero writes; movement, remap, restart and restore update persistent nodes');
  await page.setViewportSize({width:1280,height:720});
 });
 await group('four-scene-windows',async()=>{
 for(const index of [0,1,3]){await loadSaveFixture(checkpointSave(index));await measureScene('checkpoint-'+index+'-1280')}
 await page.setViewportSize({width:1920,height:1080});await loadSaveFixture(checkpointSave(0));await measureScene('checkpoint-0-1920');
 });
 await group('visual-poses-quality-areas',async()=>{
 // Additional reproducible scene review, paused after camera settles.
 for(const size of [1280,1920]){await page.setViewportSize({width:size,height:size===1280?720:1080});for(const chapter of [2,5]){const save=defaultSave();save.unlocked=chapter+1;save.activeLevel=chapter;await loadSaveFixture(save);await page.waitForTimeout(3000);await page.keyboard.press('Escape');await captureWorld(`chapter-${chapter+1}-${size}`)}}
 for(const size of [1280,1920]){
  await page.setViewportSize({width:size,height:size===1280?720:1080});await loadSaveFixture(checkpointSave(0));
  await page.keyboard.down('KeyD');await waitForState(()=>signalZeroControlState.player.vx>3);await page.keyboard.press('Escape');await page.keyboard.up('KeyD');await captureWorld('runner-running-'+size);
  await page.click('#resume');await page.keyboard.down('Space');await waitForState(()=>signalZeroControlState.player.y>.5&&signalZeroControlState.player.vy>0);await page.keyboard.press('Escape');await page.keyboard.up('Space');await captureWorld('runner-airborne-'+size);
  await loadSaveFixture(checkpointSave(0));await page.keyboard.down('KeyD');await waitForState(()=>signalZeroControlState.player.x>36.7);await page.keyboard.up('KeyD');await page.keyboard.down('KeyS');await waitForState(()=>signalZeroControlState.player.crouched);await waitForState(()=>signalZeroControlState.playerOccluded,null,{timeout:120000});await page.keyboard.press('Escape');await page.keyboard.up('KeyS');await captureWorld('runner-occluded-'+size);
 }
 check('standing, running, airborne and occluded silhouettes at both sizes');
 await page.click('#settings');
 for(const quality of ['high','low','auto']){await page.selectOption('#quality',quality);await waitForState(q=>signalZeroDiagnostics.render.quality===q,quality);const render=await page.evaluate(()=>signalZeroDiagnostics.render);assert.equal(render.shadows,quality==='high');if(quality==='low'){assert.equal(render.dpr,.65);assert.equal(render.antialias,'none')}else assert.equal(render.antialias,'FXAA');await captureWorld('quality-'+quality)}
 check('quality switches apply materials, shadows, resolution and edge filtering');
 for(const width of [1280,1920])for(const quality of ['auto','high'])for(const [chapter,point]of [[0,0],[0,1],[0,3],[2,1],[5,3]]){await page.setViewportSize({width,height:width===1280?720:1080});const save=checkpointSave(point,chapter);save.settings.quality=quality;await loadSaveFixture(save);await page.waitForTimeout(1200);await page.keyboard.press('Escape');await captureWorld(`area-${chapter+1}-cp-${point}-${quality}-${width}`);const d=await page.evaluate(()=>signalZeroDiagnostics.render);(report.visualResources??=[]).push({chapter,point,quality,width,...d});assert.ok(d.maxDrawCalls<=250);assert.ok(d.maxTriangles<=1500000);assert.ok(d.textureBytes<=256*1024*1024);}

 });
 await group('soak-reconstruction',async()=>{
 await page.setViewportSize({width:1280,height:720});const entry=defaultSave();entry.activeLevel=0;await loadSaveFixture(entry);
 // Stable empty entry area: real rendering/physics/music remain active for 3 min.
 await page.keyboard.press('Escape');await page.click('#restart');await page.click('#confirm');await screen('playing');await page.waitForTimeout(2500);
 const cdp=await page.context().newCDPSession(page);report.soakWarmup=[];for(let warm=0;warm<6;warm++){await page.waitForTimeout(5000);await cdp.send('HeapProfiler.collectGarbage');const heap=(await cdp.send('Runtime.getHeapUsage')).usedSize;report.soakWarmup.push(heap);if(warm>=3&&Math.abs(heap-report.soakWarmup[warm-1])/heap<.01)break;}await cdp.send('HeapProfiler.collectGarbage');const initialDom=await cdp.send('Memory.getDOMCounters'),initialHeap=(await cdp.send('Runtime.getHeapUsage')).usedSize;const initial=await page.evaluate(()=>({time:signalZeroControlState.time,heap:performance.memory?.usedJSHeapSize,render:signalZeroDiagnostics.render,ownedListeners:__gameListenerCount(),raf:{pending:__raf.pending.size,max:__raf.max}}));
 initial.heap=initialHeap;
 const soakWallStart=performance.now(),soakMs=Number(process.env.SIGNAL_ZERO_SOAK_MS||180000);console.log('Running '+soakMs+' ms stability soak');
 for(let elapsed=0;elapsed<soakMs;elapsed+=15000){await page.waitForTimeout(Math.min(15000,soakMs-elapsed));console.log('soak '+Math.min(soakMs,elapsed+15000)+' / '+soakMs)}
 await cdp.send('HeapProfiler.collectGarbage');const finalDom=await cdp.send('Memory.getDOMCounters'),endHeap=(await cdp.send('Runtime.getHeapUsage')).usedSize;const end=await page.evaluate(()=>{const d=signalZeroDiagnostics;return{time:d.state.time,heap:performance.memory?.usedJSHeapSize,render:d.render,ownedListeners:__gameListenerCount(),audio:d.audio,frames:d.performance.frames,raf:{pending:__raf.pending.size,max:__raf.max},performance:{average:d.performance.average,p95:d.performance.p95,samples:d.performance.samples,phases:d.performance.phases}}});
 end.heap=endHeap;
 const steady=end.frames.slice(Math.min(120,Math.floor(end.frames.length/4))).map(f=>f.ms).sort((a,b)=>a-b);report.performance={wallMs:performance.now()-soakWallStart,simulationSeconds:end.time-initial.time,...end.performance,steadyAverage:steady.reduce((a,b)=>a+b,0)/steady.length,steadyP95:steady[Math.floor(steady.length*.95)],initialHeap:initial.heap,finalHeap:end.heap,initialDom,finalDom,initialRaf:initial.raf,finalRaf:end.raf,render:end.render,soakMs};
 assert.ok(end.audio.voices<=12);assert.equal(end.render.geometries,initial.render.geometries);assert.equal(end.render.textures,initial.render.textures);assert.equal(end.ownedListeners,initial.ownedListeners);assert.ok(end.heap/initial.heap<1.1);check('bounded audio voices, geometry, listeners and heap across stability soak');
 assert.equal(end.raf.pending,1);assert.equal(end.raf.max,1);
 // Reconstruct the same chapter, then compare the same entrance after warm-up.
 const reconstructionStart=await cdp.send('Memory.getDOMCounters');
 for(let repeat=0;repeat<6;repeat++){await page.keyboard.press('Escape');await page.click('#restart');await page.click('#confirm');await screen('playing');await page.waitForTimeout(500)}
 await page.waitForTimeout(2500);await cdp.send('HeapProfiler.collectGarbage');
 const reconstructionEnd=await cdp.send('Memory.getDOMCounters'),reconstructionHeap=(await cdp.send('Runtime.getHeapUsage')).usedSize;report.reconstruction=await page.evaluate(()=>({heap:performance.memory.usedJSHeapSize,render:signalZeroDiagnostics.render,ownedListeners:__gameListenerCount(),raf:{pending:__raf.pending.size,max:__raf.max}}));report.reconstruction.heap=reconstructionHeap;report.reconstruction.initialDom=reconstructionStart;report.reconstruction.finalDom=reconstructionEnd;
 assert.equal(report.reconstruction.render.geometries,end.render.geometries);assert.equal(report.reconstruction.render.textures,end.render.textures);assert.equal(report.reconstruction.raf.max,1);assert.ok(report.reconstruction.heap/initial.heap<1.1);assert.equal(report.reconstruction.ownedListeners,initial.ownedListeners);check('six same-chapter reconstructions retain bounded resources and one RAF');
 await page.setViewportSize({width:1920,height:1080});await capture(page,artifacts+'/play-1920.png',report);await page.keyboard.press('Escape');await page.click('#settings');await capture(page,artifacts+'/settings-1920.png',report);await page.setViewportSize({width:1280,height:720});
 assert.ok(await page.locator('#reset-keys').isVisible());check('1280×720 and 1920×1080 responsive HUD and settings');
 });
 await group('outcome-replay-ending-lifecycle',async()=>{
 // A valid late checkpoint fixture isolates browser defeat/victory UI; complete
 // input-driven campaign routes are independently covered by the unit suite.
 const fixtureRun=createRun(0);fixtureRun.objectives=LEVELS[0].terminals.map(t=>t.id);fixtureRun.player.x=LEVELS[0].checkpoints.at(-1).x;step(fixtureRun,{});
 const fixture=defaultSave();fixture.activeLevel=0;fixture.checkpoint=checkpointSnapshot(fixtureRun);assert.ok(fixture.checkpoint);
 async function loadFixture(){await loadSaveFixture(fixture)}
 await loadFixture();await driveTo(1013);await driveTo(1020,{jumpGaps:false});await waitForState(()=>signalZeroControlState.phase==='caught',null,{timeout:10000});await setKeys([]);await screen('caught');await capture(page,artifacts+'/caught.png',report);await page.click('#retry');await screen('playing');assert.ok((await state()).checkpoint);check('fall -> defeat -> checkpoint retry');
 if(!virtualClock){await page.clock.install();virtualClock=true;await refreshVirtualRafProbe()}await runBrowserChapter(page,0,{artifacts,clock:true,fromCurrent:true,seedLabel:'lifecycle-fixture'});await screen('complete');await capture(page,artifacts+'/complete.png',report);assert.equal(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).unlocked,SAVE_KEY),2);const oldSeed=(await state()).seed,oldPhases=(await state()).devices.map(d=>d.phase);await page.click('#replay');assert.equal(Number(await page.locator('#seed-code').inputValue()),oldSeed);await page.click('#deploy');await screen('playing');assert.equal((await state()).objectives.length,0);check('exit -> victory -> saved unlock -> same-frequency replay');
 await page.keyboard.press('Escape');await page.click('#missions');await page.click('[data-level="0"]');await page.fill('#seed-code','9999');await page.click('#deploy');await screen('playing');const variation=await state();assert.equal(variation.seed,9999);assert.ok(variation.devices.filter((d,i)=>d.phase!==oldPhases[i]).length>=3);await page.keyboard.press('Escape');await page.click('#restart');await page.click('#confirm');assert.equal((await state()).seed,9999);assert.ok(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)).bests.antenna,SAVE_KEY));report.seedVariation={oldSeed,newSeed:variation.seed,differentPhases:variation.devices.filter((d,i)=>d.phase!==oldPhases[i]).length};check('new frequency changes encounters; restart preserves seed and standard best');
 let endingSave={...defaultSave(),unlocked:6,pendingEnding:true};
 for(let choice=0;choice<2;choice++){await loadSaveFixture(endingSave,{start:false});await page.click('#begin');await screen('ending');await page.click('#ending-'+choice);await screen('epilogue');endingSave=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),SAVE_KEY);assert.equal(endingSave.endings.length,choice+1);assert.equal(endingSave.pendingEnding,false);await capture(page,artifacts+'/ending-'+choice+'.png',report);endingSave.pendingEnding=true}
 check('both ending choices reach epilogues and persist independently');
 await page.click('#missions');await page.click('[data-level="0"]');await page.click('#deploy');await page.keyboard.press('Escape');await page.click('#settings');
 await page.evaluate(()=>{const original=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key.startsWith('stteak.signal-zero'))throw new DOMException('Quota full','QuotaExceededError');return original.call(this,key,value)};window.__restoreStorage=()=>Storage.prototype.setItem=original});
 await page.locator('#music').evaluate(el=>{el.value='.3';el.dispatchEvent(new Event('input',{bubbles:true}))});assert.equal(await page.locator('#storage-warning').isVisible(),true);await page.click('#back');await page.click('#resume');assert.equal((await state()).phase,'playing');await page.evaluate(()=>__restoreStorage());check('storage quota failure displays a warning and preserves play');
 });
 await group('context-corrupt-save',async()=>{
 const entry=defaultSave();entry.activeLevel=0;await loadSaveFixture(entry);
 // Graceful context failure is intentionally tested last, then rebuilt by reload.
 await page.evaluate(()=>{const gl=document.getElementById('world').getContext('webgl2');gl.getExtension('WEBGL_lose_context').loseContext()});await screen('error');if(virtualClock)await page.clock.fastForward(100);await page.waitForTimeout(500);assert.equal(await page.evaluate(()=>__raf.pending.size),0);assert.equal(await page.evaluate(()=>__raf.max),1);await nav(opts=>Promise.all([page.waitForNavigation(opts),page.click('#retry',{noWaitAfter:true})]));check('WebGL context loss stops RAF and has a working recovery action');
 await page.evaluate(({key,backup})=>{localStorage.setItem(key,'{broken');localStorage.removeItem(backup)},{key:SAVE_KEY,backup:SAVE_BACKUP_KEY});await page.emulateMedia({reducedMotion:'reduce'});await nav(opts=>page.reload(opts));assert.equal(await page.locator('#storage-warning').isVisible(),true);await page.click('#settings');assert.equal(await page.locator('#motion').isChecked(),true);check('corrupt save falls back visibly and new settings honor system reduced motion');
 });
 await group('result-audio-output-matrix',async()=>{
  await page.setViewportSize({width:480,height:270});
  if(!virtualClock){await page.clock.install();virtualClock=true}
  report.resultAudio=[];
  for(const mode of ['audible','mute','zero-sfx'])for(const type of ['caught','complete']){
   const save=type==='complete'?checkpointSave(3):defaultSave();save.activeLevel=0;save.settings.quality='low';save.settings.music=0;save.settings.muted=mode==='mute';save.settings.sfx=mode==='zero-sfx'?0:.7;
   if(type==='caught')save.activeTrace=2;
   await loadSaveFixture(save);
   if(type==='complete')await runBrowserChapter(page,0,{clock:true,fromCurrent:true,seedLabel:'audio-'+mode});
   else for(let tick=0;tick<100&&(await state()).phase==='playing';tick++)await page.clock.fastForward(100);
   await screen(type);
   // Audio hardware time is real even when the simulation clock is virtual.
   let peak=0;for(let sample=0;sample<5;sample++){await wait(15);peak=Math.max(peak,await page.evaluate(()=>{const data=new Float32Array(__audioAnalyser.fftSize);__audioAnalyser.getFloatTimeDomainData(data);return data.reduce((n,v)=>Math.max(n,Math.abs(v)),0)}))}
   const observed=await page.evaluate(type=>({rows:__feedback.filter(r=>r.type===type),audio:signalZeroDiagnostics.audio}),type);const row=observed.rows.findLast(r=>r.audioMs!==undefined)||observed.rows.at(-1);
   report.resultAudio.push({mode,type,peak,...observed});assert.equal(observed.audio.transport,false);assert.equal(observed.rows.filter(r=>r.voice).length,mode==='audible'?1:0);
   if(mode==='audible'){assert.ok(row.audioMs<=100);assert.ok(row.inputMs<=50);assert.ok(row.visual);assert.ok(peak>.00001,'real analyser output for '+type)}else{assert.equal(observed.audio.voices,0);assert.equal(observed.audio.context,'suspended');assert.ok(peak<.00001)}
   if(mode==='audible'&&type==='caught'){await page.evaluate(()=>window.dispatchEvent(new Event('blur')));assert.equal(await page.evaluate(()=>signalZeroDiagnostics.audio.voices),0)}
   await wait(800);assert.equal(await page.evaluate(()=>signalZeroDiagnostics.audio.context),'suspended');
   if(type==='caught'){await page.click('#retry');await screen('playing');await waitForState(()=>signalZeroDiagnostics.audio.context==='running');assert.equal(await page.evaluate(()=>signalZeroDiagnostics.audio.transport),true);await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await screen('pause')}
  }
  check('defeat/completion create one audible result envelope within 100ms; mute/SFX-zero, idle suspension and retry pass');
 });
 await group('input-only-chapter',async()=>{
 await page.setViewportSize({width:480,height:270});const clean=defaultSave();clean.settings.quality='low';await loadSaveFixture(clean,{start:false});await page.click('#begin');await page.click('#deploy');if(!virtualClock){await page.clock.install();virtualClock=true}report.inputOnlyChapter=await runBrowserChapter(page,0,{artifacts,clock:true});assert.equal(report.inputOnlyChapter.phase,'complete');report.movingResources=await page.evaluate(()=>signalZeroDiagnostics);assert.ok(report.movingResources.render.maxDrawCalls<=250);assert.ok(report.movingResources.render.maxTriangles<=1500000);assert.ok(report.movingResources.render.textureBytes<=256*1024*1024);assert.ok(report.movingResources.performance.phases.logic.p95<=6);await page.clock.uninstall?.();check('input-only rendered first chapter, without progress fixtures');
 });
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);check('zero uncaught errors, console errors, failed requests or HTTP errors');
 report.checks=checks;report.errors=errors;report.failedRequests=failed;await writeFile(artifacts+'/report.json',JSON.stringify(report,null,2));
 assert.deepEqual(report.scenes.filter(scene=>scene.coverage&&!scene.passed),[], 'Steady scene release gates failed: '+JSON.stringify(report.scenes.filter(scene=>scene.coverage&&!scene.passed)));assert.equal(new Set(report.scenes.filter(s=>s.coverage).map(s=>s.name)).size,4);check('four steady scenes meet resource, update cost and active coverage gates');
 assert.deepEqual(report.requiredFailures,[],'Required scenarios failed');report.checks=checks;await writeFile(artifacts+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report.performance,null,2));console.log('PASS '+checks.length+' browser acceptance checks; artifacts '+artifacts);
}catch(error){console.error(error);if(page){report.failureState=await page.evaluate(()=>({...window.signalZeroDiagnostics,raf:{max:__raf.max,requests:__raf.requests,pending:__raf.pending.size}})).catch(()=>null);await capture(page,artifacts+'/failure.png',report).catch(()=>{})}await writeFile(artifacts+'/failure.json',JSON.stringify({message:error.message,checks,errors,failed,report},null,2));process.exitCode=1}finally{await browser?.close();await stopServer(server)}
