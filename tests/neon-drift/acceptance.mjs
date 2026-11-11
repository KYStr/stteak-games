import assert from 'node:assert/strict';
import {legalRecordFixture} from './fixture.mjs';
import {spawn} from 'node:child_process';
import {mkdir,writeFile,readFile,readdir,mkdtemp,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {build} from '../../games/neon-drift/node_modules/esbuild/lib/main.js';
const root=fileURLToPath(new URL('../../',import.meta.url));
const port=Number(process.env.NEON_PORT||8105);
assert.ok(Number.isInteger(port)&&port>=1024&&port<=65535,'NEON_PORT must be an integer from 1024 to 65535');
const output=process.env.NEON_ARTIFACT_DIR||'/tmp/neon-drift-acceptance';await mkdir(output,{recursive:true});
const url=`http://127.0.0.1:${port}/games/neon-drift/`;
const report={cases:process.env.NEON_CASES||'all',passed:false,complete:false,port,regressions:[],benchmarks:[],soak:[],schedulerGaps:[],consoleErrors:[],failedRequests:[],policyViolations:[],performanceFailures:[]};
let browser,page,server,interrupted=false;
for(const signal of ['SIGTERM','SIGINT'])process.once(signal,()=>{interrupted=true;process.exitCode=1;void browser?.close();server?.kill();});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const command=(cmd,args,env={})=>new Promise((resolve,reject)=>{const p=spawn(cmd,args,{cwd:root,env:{...process.env,...env},stdio:'pipe'});let log='';p.stdout.on('data',b=>log+=b);p.stderr.on('data',b=>log+=b);p.on('error',reject);p.on('close',code=>code===0?resolve(log):reject(Error(`${cmd} exited ${code}: ${log}`)));});
async function hashes(dir,prefix=''){const result={};for(const e of await readdir(dir,{withFileTypes:true})){if(e.name==='.gitattributes')continue;const path=join(prefix,e.name);if(e.isDirectory())Object.assign(result,await hashes(join(dir,e.name),path));else result[path]=createHash('sha256').update(await readFile(join(dir,e.name))).digest('hex');}return result;}
async function reproducible(){const temp=await mkdtemp(join(tmpdir(),'neon-rebuild-'));try{const shipped=await hashes(root+'public/games/neon-drift');for(let i=0;i<2;i++){await command('npm',['--prefix','games/neon-drift','run','assets']);await command('node',['games/neon-drift/tools/build.mjs'],{NEON_BUILD_OUT:join(temp,String(i))});assert.deepEqual(await hashes(join(temp,String(i))),shipped,'Independent build must exactly reproduce every shipped runtime/asset/license file');}report.rebuild={passed:true,files:Object.keys(shipped).length,hashes:shipped};}finally{await rm(temp,{recursive:true,force:true});}}
const snap=()=>page.evaluate(()=>neonDrift.snapshot());
const shot=name=>page.screenshot({path:join(output,name+'.png')});
const pass=name=>{report.regressions.push(name);console.log('PASS',name);};
const heldKeys=new Set();
async function resumeSchedulingGap(){
  if(!await page.evaluate(()=>window.neonDrift?.snapshot().phase==='paused'))return 0;
  const event=await page.evaluate(()=>neonDrift.events().at(-1));
  if(!['frame-gap','window-blur','document-hidden'].includes(event?.reason))return 0;
  report.schedulerGaps.push(event);await page.bringToFront();await page.locator('[data-action="resume"]').click();
  for(const key of heldKeys)if(key!=='Escape')await page.keyboard.down(key);
  return event.frameGapMs||1;
}
async function waitFor(predicate,arg,timeout=30000){
  let spent=0,previous=await page.evaluate(()=>window.neonDrift?.snapshot({renderer:false})),lastProgress=Date.now();
  while(true){
    assert.deepEqual(report.consoleErrors,[],'Unexpected browser error');const pollStart=Date.now();
    try{await page.waitForFunction(predicate,arg,{timeout:1000});return;}catch(error){
      if(error.name!=='TimeoutError')throw error;
      const gap=await resumeSchedulingGap();
      const current=await page.evaluate(()=>window.neonDrift?.snapshot({renderer:false}));
      const pollWallMs=Date.now()-pollStart;if(pollWallMs>2000){(report.hostWaitInterruptions??=[]).push({pollWallMs,phase:current?.phase,elapsed:current?.elapsed,at:Date.now()});lastProgress=Date.now();}
      if(gap){lastProgress=Date.now();previous=current;continue;}
      if(current?.phase==='running'&&previous?.phase==='running'){
        const progress=Math.max(0,current.elapsed-previous.elapsed)+Math.max(0,previous.countdown-current.countdown);
        spent+=progress*1000;if(progress>0)lastProgress=Date.now();
      }else spent+=Date.now()-pollStart;
      previous=current;
      if(spent>=timeout||Date.now()-lastProgress>180000)throw error;
    }
  }
}
const inflight=new Set();
async function settle(){let stable=0;for(let i=0;i<300&&stable<5;i++){await page.waitForTimeout(100);stable=inflight.size===0?stable+1:0;}assert.equal(inflight.size,0,'Asset requests must settle before navigation');}
async function reload(){await settle();await page.reload();}
async function newPage(){
  page=await browser.newPage({viewport:{width:1280,height:720}});
  const down=page.keyboard.down.bind(page.keyboard),up=page.keyboard.up.bind(page.keyboard);
  page.keyboard.down=async key=>{heldKeys.add(key);await down(key);};page.keyboard.up=async key=>{heldKeys.delete(key);await up(key);};
  await page.addInitScript(()=>{
    window.__audio=[];window.__meters=[];window.__policy=[];
    const nativeConnect=AudioNode.prototype.connect;
    AudioNode.prototype.connect=function(destination,...args){if(destination===this.context.destination){const meter=this.context.createAnalyser();nativeConnect.call(this,meter);__meters.push(meter);}return nativeConnect.call(this,destination,...args);};
    const Native=window.AudioContext;window.AudioContext=class extends Native{constructor(...args){super(...args);__audio.push(this);}};
    document.addEventListener('securitypolicyviolation',e=>__policy.push(e.violatedDirective));
    const nativeRAF=window.requestAnimationFrame.bind(window),kinds=new WeakMap();window.__raf={pending:0,max:0};
    window.requestAnimationFrame=function(callback){let game=kinds.get(callback);if(game===undefined){game=new Error().stack.includes('/game.js');kinds.set(callback,game);}if(game){__raf.pending++;__raf.max=Math.max(__raf.max,__raf.pending);}return nativeRAF(time=>{if(game)__raf.pending--;callback(time);});};
  });
  const controller=await build({entryPoints:[root+'tests/neon-drift/controller.js'],bundle:true,write:false,format:'iife'});
  await page.addInitScript({content:controller.outputFiles[0].text});
  page.on('request',r=>inflight.add(r));page.on('requestfinished',r=>inflight.delete(r));page.on('requestfailed',r=>inflight.delete(r));
  page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text());});page.on('pageerror',e=>report.consoleErrors.push(e.stack));
  page.on('requestfailed',r=>report.failedRequests.push({url:r.url(),reason:r.failure()}));page.on('response',r=>{if(r.status()>=400)report.failedRequests.push({url:r.url(),status:r.status()});});
  await page.goto(url);await waitFor(()=>window.neonDrift?.snapshot().renderer.loadedCarAsset);assert.equal(await page.evaluate(()=>__audio.length),0,'Audio must be absent before gesture');
}
async function idle(ms){await page.waitForTimeout(ms);await resumeSchedulingGap();}
async function garage(){await page.evaluate(()=>__pilot=false);const s=await snap();if(s.phase==='running')await page.keyboard.press('Escape');if((await snap()).phase!=='menu')await page.locator('[data-action="garage"]').click();}
async function clearAll(){await settings();await page.locator('[data-action="confirm-reset"]').click();await page.locator('[data-action="delete-save"]').click();}
async function settings(){if(await page.locator('#modal[open] [data-action="resume"]').count())await page.locator('[data-action="resume"]').click();await page.locator('#settings-button').click();}
async function volume(value){for(const key of ['volume','musicVolume'])await page.locator(`[data-setting="${key}"]`).evaluate((el,v)=>{el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));},value);}
async function noSavedProgress(){assert.deepEqual(await page.evaluate(()=>['race','save','save:backup'].map(s=>localStorage.getItem('stteak:neon-drift:'+s))),[null,null,null]);assert.equal((await snap()).resumable,false);assert.equal(await page.locator('#continue-race').isVisible(),false);assert.match(await page.locator('#tutorial-progress').textContent(),/尚未完成/);assert.equal((await snap()).audio.sfx,.55);assert.equal((await snap()).audio.music,.28);}
async function repeatEscape(){
  await waitFor(()=>neonDrift.snapshot().elapsed>1);await page.keyboard.down('Escape');const elapsed=(await snap()).elapsed;
  for(let i=0;i<3;i++)await page.keyboard.down('Escape');await page.waitForTimeout(500);
  assert.equal((await snap()).phase,'paused');assert.equal((await snap()).elapsed,elapsed);assert.equal((await snap()).audio.state,'suspended');assert.equal(await page.locator('#modal').isVisible(),true);
  await page.keyboard.up('Escape');await page.keyboard.press('Escape');assert.equal((await snap()).phase,'running');
  for(const trigger of ['#settings-button','#help-button']){
    await page.locator(trigger).click();await page.keyboard.down('Escape');assert.equal((await snap()).phase,'running');
    for(let i=0;i<3;i++)await page.keyboard.down('Escape');assert.equal((await snap()).phase,'running');await page.keyboard.up('Escape');
  }pass('F01 Escape repeat / distinct presses / settings / help');
}
async function focusChecks(){
  for(const size of [{width:1280,height:720},{width:1920,height:1080}]){
    await page.setViewportSize(size);
    for(const [kind,ids] of [['track',['harbor','skyway','oldtown']],['car',['comet','stinger','phantom']]])for(const id of ids){
      const selector=`[data-${kind}="${id}"]`;await page.locator(selector).focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(k=>document.activeElement.dataset[k],kind),id);await page.keyboard.press('Tab');assert.notEqual(await page.evaluate(()=>document.activeElement.tagName),'BODY');
    }
    await page.locator('#customize-button').focus();await page.keyboard.press('Enter');const swatch=page.locator('[data-color]:not(:disabled)').last();const id=await swatch.getAttribute('data-color');await swatch.focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.dataset.color),id);await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'customize-button');
    await page.locator('#settings-button').focus();await page.keyboard.press('Enter');for(let i=0;i<30;i++){await page.keyboard.press(i<15?'Tab':'Shift+Tab');assert.equal(await page.evaluate(()=>document.querySelector('#modal').contains(document.activeElement)),true);}await page.keyboard.press('Escape');
  }
  await clearAll();await page.setViewportSize({width:1280,height:720});pass('F03 track/car/swatch focus, opener restore and modal containment at both sizes');
}
async function resetChecks(){
  await settings();await volume(0);await page.keyboard.press('Escape');await page.locator('#launch').click();await waitFor(()=>neonDrift.snapshot().elapsed>1);await page.keyboard.press('Escape');await reload();await waitFor(()=>window.neonDrift?.snapshot().resumable);
  await settings();await page.locator('[data-action="confirm-reset"]').click();
  await page.evaluate(()=>{window.__remove=Storage.prototype.removeItem;Storage.prototype.removeItem=function(key){if(key==='stteak:neon-drift:race')throw Error('test denial');return __remove.call(this,key);};});
  await page.locator('[data-action="delete-save"]').click();assert.match(await page.locator('#modal-notice').textContent(),/未能清除/);assert.equal(await page.locator('#modal').isVisible(),true);assert.equal((await snap()).resumable,true);
  await page.evaluate(()=>Storage.prototype.removeItem=__remove);await page.locator('[data-action="delete-save"]').click();await noSavedProgress();await reload();await waitFor(()=>window.neonDrift?.snapshot().renderer.loadedCarAsset);await noSavedProgress();
  await page.locator('#launch').click();await waitFor(()=>neonDrift.snapshot().elapsed>1);await page.keyboard.press('Escape');await clearAll();await noSavedProgress();await page.evaluate(()=>window.dispatchEvent(new Event('pagehide')));await noSavedProgress();
  pass('F02 full reset including pending race/default audio; failure notice; paused reset cannot resurrect');
}
async function audioAndLifecycle(){
  await page.locator('#launch').click();await page.keyboard.down('KeyW');await waitFor(()=>neonDrift.snapshot().elapsed>3);await page.keyboard.up('KeyW');
  await waitFor(()=>neonDrift.snapshot().audio.buffers.length===4);await waitFor(()=>{const x=new Float32Array(2048);__meters[0].getFloatTimeDomainData(x);return x.some(v=>Math.abs(v)>.001);});
  await settings();await volume(0);await page.keyboard.press('Escape');await waitFor(()=>{const x=new Float32Array(2048);__meters[0].getFloatTimeDomainData(x);return x.every(v=>Math.abs(v)<1e-6);},null,10000);
  await settings();await volume(.3);await page.keyboard.press('Escape');await page.evaluate(()=>__audio[0].suspend());await page.keyboard.press('KeyW');await waitFor(()=>__audio[0].state==='running');
  await repeatEscape();await page.evaluate(()=>window.dispatchEvent(new Event('blur')));const before=(await snap()).elapsed;await page.waitForTimeout(400);assert.equal((await snap()).elapsed,before);await waitFor(()=>neonDrift.snapshot().audio.state==='suspended');await shot('pause');
  await reload();await waitFor(()=>window.neonDrift?.snapshot().resumable);await page.locator('#continue-race').click();assert.equal((await snap()).elapsed,before);assert.equal((await snap()).phase,'paused');await page.locator('[data-action="resume"]').click();
  await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});assert.equal((await snap()).phase,'paused');await waitFor(()=>neonDrift.snapshot().audio.state==='suspended');await page.evaluate(()=>delete document.hidden);
  await garage();await clearAll();pass('audio gesture/mute/recovery; blur/hidden pause; exact reload/continue');
}
async function schoolSuccess(){
  await page.locator('#tutorial-button').click();await page.evaluate(()=>{
    const held=new Set(),key=(code,down)=>{if(held.has(code)===down)return;if(down)held.add(code);else held.delete(code);document.body.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,bubbles:true,cancelable:true}));};
    let brakingAt=null;function school(){const s=neonDrift.snapshot({renderer:false});if(s.phase!=='running')return;
      if(!s.tutorial.control){key('KeyW',true);key('KeyA',s.elapsed>=4&&s.elapsed<4.8);key('Space',s.elapsed>=4);}
      else{key('KeyW',false);key('KeyA',false);key('Space',false);brakingAt??=s.elapsed;key('KeyS',s.elapsed-brakingAt<.8);if(s.tutorial.exit){key('KeyS',false);key('KeyR',true);key('KeyR',false);return;}}
      requestAnimationFrame(school);
    }requestAnimationFrame(school);
  });await waitFor(()=>Object.values(neonDrift.snapshot().tutorial).every(Boolean),null,90000);await page.locator('#finish-school').click();assert.equal((await snap()).result.success,true);assert.ok((await snap()).result.time<90);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('stteak:neon-drift:save')).tutorialComplete),true);await garage();await reload();await waitFor(()=>window.neonDrift?.snapshot().phase==='menu');assert.match(await page.locator('#tutorial-progress').textContent(),/已完成/);pass('documented keyboard school sequence; early Finish persists');
}
async function eventExpiry(motion){
  await garage();await page.emulateMedia({reducedMotion:motion==='system'?'reduce':'no-preference'});await settings();await page.locator('[data-setting="reducedMotion"]').setChecked(motion==='app');await page.keyboard.press('Escape');await page.locator('#launch').click();assert.equal(await page.locator('#race-event').textContent(),'');await page.evaluate(()=>__pilot=true);await waitFor(()=>document.querySelector('#race-event').classList.contains('show'),null,45000);const text=await page.locator('#race-event').textContent();assert.ok(text);await page.evaluate(()=>__pilot=false);await page.keyboard.press('Escape');await waitFor(()=>document.querySelector('#race-event').textContent==='',null,10000);assert.equal(await page.locator('#race-event').textContent(),'');await page.keyboard.press('Escape');assert.equal(await page.locator('#race-event').textContent(),'');pass(`F07 checkpoint expiry and pause/resume: ${motion}`);
}
async function schoolFailure(){
  await garage();await clearAll();await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#tutorial-button').click();
  for(let i=0;i<240&&(await snap()).phase!=='result';i++)await idle(1000);
  const s=await snap();assert.equal(s.phase,'result');assert.equal(s.result.success,false);assert.notEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('stteak:neon-drift:save')||'{}').tutorialComplete),true);await page.keyboard.press('Escape');assert.equal((await snap()).phase,'result');await shot('tutorial-loss');await page.locator('[data-action="retry"]').click();assert.ok((await snap()).countdown>0);assert.equal((await snap()).elapsed,0);assert.equal(await page.locator('#race-event').textContent(),'');await garage();await page.setViewportSize({width:390,height:844});await page.locator('#launch').click();assert.equal(await page.locator('#race-event').textContent(),'');await shot('mobile-clean-countdown');await garage();await page.setViewportSize({width:1280,height:720});pass('idle 90-second loss; result Escape locked; Retry fresh; F07 clean mobile countdown');
}
function frameMetrics(frames){const f=frames.toSorted((a,b)=>a-b);return {frames:f.length,avgMs:f.reduce((a,b)=>a+b,0)/f.length,p95Ms:f[Math.floor(f.length*.95)],maxMs:f.at(-1),over100ms:f.filter(x=>x>100).length};}
async function benchmarkMatrix(){
  await garage();const fixture=legalRecordFixture();await page.evaluate(fixture=>{const key='stteak:neon-drift:save',old=JSON.parse(localStorage.getItem(key)||'{}');fixture.settings={...fixture.settings,...old.settings};localStorage.setItem(key,JSON.stringify(fixture));localStorage.removeItem(key+':backup');},fixture);report.retainedRecordFixture={source:'Legal fixed-tick simulation, all six Free Drive cards; no race-state mutation',records:Object.keys(fixture.records),bytes:JSON.stringify(fixture).length};await reload();await waitFor(()=>window.neonDrift?.snapshot().renderer.loadedCarAsset);await page.locator('[data-track="harbor"]').click();await page.locator('[data-mode="time"]').click();await page.locator('#launch').click();await page.evaluate(()=>__pilot=true);await waitFor(()=>neonDrift.snapshot().elapsed>=30,null,120000);await garage();
  const cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
  const memory=async()=>{await cdp.send('HeapProfiler.collectGarbage');const m=await cdp.send('Performance.getMetrics');return {...Object.fromEntries(m.metrics.filter(x=>['JSHeapUsedSize','Nodes','JSEventListeners'].includes(x.name)).map(x=>[x.name,x.value])),raf:await page.evaluate(()=>({...__raf})),renderer:(await snap()).renderer};};
  for(const viewport of [{width:1280,height:720},{width:1920,height:1080}]){
    await garage();await page.setViewportSize(viewport);await page.locator('[data-track="oldtown"]').click();await settle();await page.waitForTimeout(1000);await page.locator('[data-track="harbor"]').click();await settings();await page.locator('[data-setting="ghost"]').uncheck();await page.keyboard.press('Escape');await settle();await page.waitForTimeout(1000);let active=0,baseline=await memory(),after=null;const samples=[],resources=[];report.soak.push({viewport,baseline,startedAt:Date.now(),samples});
    for(const track of ['harbor','skyway','oldtown']){
      await page.locator(`[data-track="${track}"]`).click();await page.locator('[data-mode="time"]').click();await shot(`preview-${track}-${viewport.width}`);await page.locator('#launch').click();await page.evaluate(()=>__pilot=true);
      while((await snap()).elapsed<10)await idle(500);
      const index=await page.evaluate(()=>neonDrift.performance().count);const startElapsed=(await snap()).elapsed;let previous=startElapsed;
      if(!baseline){baseline=await memory();report.soak.push({viewport,baseline,startedAt:Date.now(),samples});}
      while(true){await idle(1000);const s=await snap();const delta=Math.max(0,s.elapsed-previous);active+=delta;previous=s.elapsed;samples.push({at:Date.now(),phase:s.phase,track,elapsed:s.elapsed,active,renderer:s.renderer});assert.ok(s.renderer.calls<=250&&s.renderer.triangles<=1500000&&s.renderer.textureBytes<=268435456);
        if(samples.length%20===0)console.log('Active soak',viewport.width,track,active.toFixed(1),s.lap);
        if(s.phase==='result'||s.lap>=2&&s.elapsed-startElapsed>=Math.max(30,(190-active)))break;
        assert.ok(samples.length<1000,'Benchmark must make active progress');
      }
      await shot(`race-${track}-${viewport.width}`);const perf=await page.evaluate(()=>neonDrift.performance());const measured=frameMetrics(perf.frames.slice(index));const summary={viewport,track,active:samples.at(-1).elapsed-startElapsed,...measured,updateCpu:perf.updateCpu,renderer:perf.renderer,profilingEnabled:false};report.benchmarks.push(summary);console.log('BENCHMARK',viewport.width,track,JSON.stringify(measured));
      (report.referenceFrameTimings??=[]).push({viewport,track,...measured});assert.ok(perf.updateCpu.p95<=6,`Full non-render update p95 ${perf.updateCpu.p95}`);
      assert.ok(perf.renderer.pixelRatio<=2);assert.ok(perf.renderer.calls<=250);assert.ok(perf.renderer.triangles<=1500000);assert.ok(perf.renderer.textureBytes<=268435456);assert.equal(perf.renderer.profilingEnabled,false);assert.equal(perf.renderer.gpuTimer,null);
      // Complete the first harbor time trial, using only the legal controller.
      if(track==='harbor'&&viewport.width===1280){while((await snap()).phase!=='result')await idle(1000);assert.equal((await snap()).result.success,true);report.timeTrial=(await snap()).result;await shot('result-time');assert.equal(await page.evaluate(()=>document.activeElement.dataset.action),'retry');}
      await garage();await waitFor(()=>neonDrift.snapshot().renderer.loadedCarAsset);await page.waitForTimeout(600);resources.push(await memory());
    }
    assert.ok(active>=180,`Soak must cover >=180 active seconds after warmup, got ${active}`);await page.locator('[data-track="harbor"]').click();await settle();await page.waitForTimeout(1000);after=await memory();const soak=report.soak.at(-1);Object.assign(soak,{activeSeconds:active,after,resources,finishedAt:Date.now(),pilotRAF:'one additional acceptance-only RAF, excluded from game pending count'});
    assert.ok((after.JSHeapUsedSize-baseline.JSHeapUsedSize)/baseline.JSHeapUsedSize<.10,`heap ${baseline.JSHeapUsedSize} -> ${after.JSHeapUsedSize}`);assert.equal(after.renderer.geometries,baseline.renderer.geometries);assert.equal(after.renderer.textures,baseline.renderer.textures);assert.equal(after.JSEventListeners,baseline.JSEventListeners);assert.equal(after.raf.pending,1);assert.equal(after.raf.max,1);assert.ok(Math.max(...resources.map(x=>x.renderer.geometries))-Math.min(...resources.map(x=>x.renderer.geometries))<=4);
  }pass('active 180s soak at both viewports / full lap all districts / bounded heap listeners RAF resources');
}
async function driftAndRestore(){
  await page.locator('[data-track="harbor"]').click();await page.locator('[data-mode="drift"]').click();await page.locator('#launch').click();await page.evaluate(()=>__pilot=true);for(let i=0;i<300&&(await snap()).phase!=='result';i++)await idle(1000);const s=await snap();assert.equal(s.result.success,true);assert.ok(s.result.score>0);report.drift=s.result;await shot('result-drift');await garage();await reload();await waitFor(()=>window.neonDrift?.snapshot().renderer.loadedCarAsset);assert.ok(await page.evaluate(()=>JSON.parse(localStorage.getItem('stteak:neon-drift:save')).records['harbor:time'].bestTime));await clearAll();await noSavedProgress();pass('legal scored drift, time-trial persistence; records-only reset');
}
async function contextAndProfile(){
  await page.locator('#launch').click();await waitFor(()=>neonDrift.snapshot().elapsed>1);await page.evaluate(()=>(window.__loss=document.querySelector('#world').getContext('webgl2').getExtension('WEBGL_lose_context')).loseContext());await waitFor(()=>document.querySelector('#modal-title').textContent.includes('顯示裝置'));await page.keyboard.press('Escape');assert.equal((await snap()).phase,'paused');await page.evaluate(()=>__loss.restoreContext());await waitFor(()=>document.querySelector('[data-action="resume"]'));await page.locator('[data-action="resume"]').click();assert.equal((await snap()).phase,'running');await garage();
  // Static screens stop rendering while their one RAF continues polling gamepad Start.
  await page.waitForTimeout(800);const renders=(await snap()).renderer.renderedFrames;await page.waitForTimeout(400);assert.equal((await snap()).renderer.renderedFrames,renders);await page.locator('#launch').click();await page.evaluate(()=>__pad.buttons[9].pressed=true);await waitFor(()=>neonDrift.snapshot().phase==='paused');await page.evaluate(()=>__pad.buttons[9].pressed=false);await page.waitForTimeout(600);await page.evaluate(()=>__pad.buttons[9].pressed=true);await waitFor(()=>neonDrift.snapshot().phase==='running');await page.evaluate(()=>__pad.buttons[9].pressed=false);await garage();
  report.policyViolations.push(...await page.evaluate(()=>__policy));await settle();await page.goto(url+'?profile=1');await waitFor(()=>window.neonDrift?.snapshot().renderer.loadedCarAsset);await page.locator('#launch').click();await page.evaluate(()=>__pilot=true);await waitFor(()=>neonDrift.snapshot().elapsed>30,null,120000);const p=await page.evaluate(()=>neonDrift.performance());assert.equal(p.renderer.profilingEnabled,true);assert.ok(p.renderer.cpuTiming.samples.length>100);report.profiling={overhead:'Separate run with CPU rows, browser observers and sparse GPU timer queries enabled; test pilot adds its own RAF.',...frameMetrics(p.frames),renderer:p.renderer};await writeFile(join(output,'profile-on.json'),JSON.stringify(report.profiling,null,2));pass('context loss/restore; static rendering freezes; gamepad Start; separate opt-in profile');
}
try{
  await reproducible();pass('deterministic asset regeneration + independent rebuild twice');
  server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root+'public'],{stdio:'ignore'});await sleep(500);assert.equal(server.exitCode,null,`Port ${port} must be free`);assert.equal((await fetch(url)).status,200);
  browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});await newPage();await shot('menu-720');report.firstLoadBytes=await page.evaluate(()=>performance.getEntriesByType('resource').reduce((n,r)=>n+r.transferSize,0));assert.ok(report.firstLoadBytes<=30*1024*1024);
  const cases=process.env.NEON_CASES||'all';
  if(cases==='all'||cases==='core'){await focusChecks();await resetChecks();await audioAndLifecycle();await schoolSuccess();for(const motion of ['normal','system','app'])await eventExpiry(motion);await round3();await schoolFailure();}
  if(cases==='all'||cases==='tour')await tourCompletion();
  if(cases==='all'||cases==='matrix'){await benchmarkMatrix();await driftAndRestore();await contextAndProfile();}
  report.policyViolations.push(...await page.evaluate(()=>__policy));assert.deepEqual(report.consoleErrors,[]);assert.deepEqual(report.failedRequests,[]);assert.deepEqual(report.policyViolations,[]);report.complete=true;
  assert.deepEqual(report.performanceFailures,[],'Hardware-independent resource/update budgets');report.passed=true;console.log('PASS complete acceptance');
}catch(error){report.complete=false;report.exception=error.stack;console.error(error);process.exitCode=1;try{await shot('failure');report.partialSnapshot=await snap();report.localStorage=await page.evaluate(()=>Object.fromEntries(Object.entries(localStorage)));report.partialPerformance=await page.evaluate(()=>neonDrift.performance());report.policyViolations.push(...await page.evaluate(()=>__policy));}catch{}}
finally{report.interrupted=interrupted;report.finishedAt=new Date().toISOString();await writeFile(join(output,'acceptance.json'),JSON.stringify(report,null,2));await browser?.close();server?.kill();console.log('Artifacts:',output,'passed:',report.passed,'complete:',report.complete);}

async function round3(){
 await garage();await page.emulateMedia({reducedMotion:'no-preference'});await settings();await page.locator('[data-setting="reducedMotion"]').uncheck();await page.keyboard.press('Escape');await page.locator('#launch').click();await page.keyboard.down('KeyW');assert.equal(await page.locator('#control-state').textContent(),'油門');await waitFor(()=>neonDrift.snapshot().speed>1);await page.emulateMedia({reducedMotion:'reduce'});await waitFor(()=>document.body.classList.contains('reduced-motion'));assert.equal((await snap()).renderer.reducedMotion,true);await page.emulateMedia({reducedMotion:'no-preference'});await waitFor(()=>!document.body.classList.contains('reduced-motion'));await page.keyboard.up('KeyW');await garage();
 await page.locator('[data-track="harbor"]').click();await page.locator('[data-mode="drift"]').click();await page.locator('#launch').click();await page.evaluate(()=>__pilot=false);await waitFor(()=>neonDrift.snapshot().phase==='result',null,140000);const loss=await snap();assert.equal(loss.result.success,false);assert.equal(loss.result.score,0);assert.match(await page.locator('#modal-title').textContent(),/未達/);report.idleDrift=loss.result;await page.locator('[data-action="retry"]').click();assert.equal((await snap()).elapsed,0);assert.ok((await snap()).countdown>0);await garage();
 await page.locator('#launch').click();await page.evaluate(()=>{__bot='random';__pilot=true;});await waitFor(()=>neonDrift.snapshot().phase==='result',null,140000);report.randomDrift=(await snap()).result;assert.equal(report.randomDrift.success,false);await page.evaluate(()=>{__pilot=false;__bot='competent';});await garage();
 for(const seed of [1,2,1]){await page.locator('#tour-seed').fill(String(seed));await page.locator('#tour-launch').click();assert.match(await page.locator('#modal-content').textContent(),new RegExp(`種子 ${seed}`));await page.locator('[data-action="tour-start"]').click();const s=await snap();(report.seedLayouts??=[]).push({seed,layoutId:s.layoutId});await garage();}
 assert.notEqual(report.seedLayouts[0].layoutId,report.seedLayouts[1].layoutId);assert.equal(report.seedLayouts[0].layoutId,report.seedLayouts[2].layoutId);pass('live reduced motion; immediate throttle; idle drift failure/retry; seeded random loses; reproducible playable variants');
}
async function tourCompletion(){
 await garage();await page.locator('[data-car="comet"]').click();await page.locator('#tour-seed').fill('7');await page.locator('#tour-launch').click();await reload();await waitFor(()=>window.neonDrift?.snapshot().resumable);await page.locator('#continue-race').click();assert.equal((await snap()).tour.stageIndex,0);
 report.tourStages=[];
 for(let i=0;i<6;i++){
   await page.locator('[data-action="tour-start"]').click();await page.evaluate(()=>{__pilot=true;__bot='competent';});
   await waitFor(()=>neonDrift.snapshot().phase==='result',null,320000);const s=await snap();report.tourStages.push({seed:s.seed,bot:'competent',car:s.carId,stage:i,...s.result});assert.equal(s.result.success,true,`Tour stage ${i+1}`);assert.equal(s.tour.results.length,i+1);await shot(`tour-${i+1}`);
   console.log('TOUR',i+1,s.result.activeSeconds,s.result.score,s.result.medal);
   if(i===1){await reload();await waitFor(()=>window.neonDrift?.snapshot().resumable);await page.locator('#continue-race').click();assert.equal((await snap()).tour.results.length,2);}
   if(i<5)await page.locator('[data-action="tour-next"]').click();
 }
 const t=(await snap()).tour;assert.equal(t.status,'complete');assert.ok(t.activeSeconds>=600,`Tour active time ${t.activeSeconds}`);assert.equal(t.results.length,6);if(report.randomDrift)assert.ok(report.randomDrift.score<report.tourStages[1].score);report.tour=t;await page.evaluate(()=>(window.__tourLoss=document.querySelector('#world').getContext('webgl2').getExtension('WEBGL_lose_context')).loseContext());await waitFor(()=>document.querySelector('#modal-title').textContent.includes('顯示裝置'));await page.evaluate(()=>__tourLoss.restoreContext());await waitFor(()=>document.querySelector('#modal-title').textContent.includes('巡迴完成'));assert.equal((await snap()).tour.results.length,6);await garage();await reload();await waitFor(()=>window.neonDrift?.snapshot().renderer.loadedCarAsset);assert.ok(await page.evaluate(()=>Object.keys(JSON.parse(localStorage.getItem('stteak:neon-drift:save')).tourBests).length));pass('six-stage uninterrupted Tour >=600 active seconds; mirrored routes; boundary reload; final best persists');
}
