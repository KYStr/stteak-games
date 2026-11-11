import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {base,ensureServer} from './server.mjs';
const artifacts=(process.env.MOSS_ARTIFACTS||'/tmp/moss-and-moon-acceptance')+'/regressions';await mkdir(artifacts,{recursive:true});
let browser,server;const report={errors:[],failed:[],escape:[],feedback:[]};
try {
 server=await ensureServer();browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1280,height:720}});
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('requestfailed',r=>report.failed.push(r.url()));
 await page.addInitScript(()=>{
   window.__feedback=[];let input=0;
   const raf=requestAnimationFrame.bind(window);window.__heldTravel=[];window.__holdTravel=false;
   window.requestAnimationFrame=fn=>{
     if(window.__holdTravel&&fn.toString().includes('requestAnimationFrame(resolve)')) {window.__heldTravel.push(fn);return -window.__heldTravel.length;}
     return raf(fn);
   };
   window.__releaseTravel=()=>{window.__holdTravel=false;for(const fn of window.__heldTravel)raf(fn);window.__heldTravel.length=0;};
   document.addEventListener('click',e=>{if(e.isTrusted){input=performance.now();window.__feedback.push({kind:'input',at:input,action:{...e.target.closest('button')?.dataset}});}},true);
   const Original=window.AudioContext;window.__contexts=[];
   window.AudioContext=class extends Original {constructor(...args){super(...args);window.__contexts.push(this);}createBufferSource(){const source=super.createBufferSource(),start=source.start.bind(source);source.start=(...args)=>{window.__feedback.push({kind:'sound',loop:source.loop,at:performance.now(),latency:performance.now()-input});return start(...args);};return source;}};
   const set=Storage.prototype.setItem;
   Storage.prototype.setItem=function(k,v){const result=set.call(this,k,v);if(k==='moss-and-moon:v1:slot:1')window.__feedback.push({kind:'commit',at:performance.now(),latency:performance.now()-input,revision:JSON.parse(JSON.parse(v).payload).revision});return result;};
   new MutationObserver(records=>{for(const r of records)if(r.target.id==='toast'||r.target.id==='travel-status')window.__feedback.push({kind:'status',id:r.target.id,at:performance.now(),latency:performance.now()-input,text:r.target.textContent});}).observe(document,{subtree:true,childList:true});
 });
 await page.goto(base);await page.waitForFunction(()=>window.mossDiagnostics);
 const diag=()=>page.evaluate(()=>window.mossDiagnostics());
 await page.locator('#switch-slot').click();
 for(let i=0;i<5;i++)await page.keyboard.down('Escape');await page.keyboard.up('Escape');assert.equal(await page.locator('#panel').evaluate(el=>el.open),false);assert.equal((await diag()).started,false);
 await page.locator('#new-mode').selectOption('free');await page.locator('#start').click();await page.keyboard.press('Escape');await page.waitForFunction(()=>window.mossDiagnostics().audio.ready);
 const baseline=await page.context().newCDPSession(page);await baseline.send('HeapProfiler.collectGarbage');
 const before=await baseline.send('Memory.getDOMCounters');
 for(let sequence=0;sequence<25;sequence++){
  await page.keyboard.down('w');
  for(let i=0;i<5;i++){await page.keyboard.down('Escape');const d=await diag();report.escape.push({sequence,i,paused:d.paused});assert.equal(d.paused,true);}
  await page.keyboard.up('w');await page.keyboard.up('Escape');await page.waitForFunction(()=>window.mossDiagnostics().audio.state==='suspended');await page.keyboard.press('Escape');
  const pos=(await diag()).world.position;await page.waitForTimeout(30);assert.deepEqual((await diag()).world.position,pos);
 }
 const after=await baseline.send('Memory.getDOMCounters');assert.equal(after.jsEventListeners,before.jsEventListeners);
 await page.locator('[data-open="shop"]').click();
 const prior=await diag();await page.locator('[data-buy="seed:moss"]').click();await page.locator('[data-buy="seed:moss"]').click();
 const bought=await diag();assert.equal(bought.revision,prior.revision+2);assert.equal(bought.audio.confirmationStarts,prior.audio.confirmationStarts+2);
 await page.keyboard.press('Escape');
 for(const region of ['forest','brook','ridge','garden']) {
  await page.locator('[data-open="map"]').click();
  await page.locator(`#panel [data-region="${region}"]`).click();
  // Status is a synchronous visible acknowledgment; cold scene work runs after two frame callbacks.
  const acknowledged=await page.locator('#travel-status').evaluate(el=>({busy:document.querySelector('#world').getAttribute('aria-busy'),text:el.textContent}));
  report.feedback.push({region,acknowledged});
  if(await page.locator("#travel-status").isVisible()) await page.screenshot({path:artifacts+"/transition-"+region+".png"});
  await page.waitForFunction(()=>!window.mossDiagnostics().transitioning);
  assert.equal((await diag()).region,region);
 }
 // Hold only the transition's paint boundary, preserving real canvas/UI frames.
 await page.evaluate(()=>window.__holdTravel=true);
 await page.locator('[data-open="map"]').click();await page.locator('#panel [data-region="forest"]').click();
 assert.equal((await diag()).transitioning,true);
 await page.screenshot({path:artifacts+'/transition-visible.png'});
 await page.keyboard.press('Escape');assert.equal((await diag()).paused,true);
 const committedRevision=(await diag()).revision;
 await page.locator('#import-file').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{broken')});
 await page.waitForFunction(()=>document.querySelector('#toast').textContent.includes('匯入失敗'));
 assert.equal((await diag()).revision,committedRevision);assert.equal((await diag()).world.sceneRegion,'forest');
 await page.evaluate(()=>window.__releaseTravel());
 await page.waitForTimeout(200);assert.equal((await diag()).paused,true);assert.equal((await diag()).world.sceneRegion,'forest');
 await page.locator('[data-resume]').click();
 // Queue a transition and cancel it by switching gardens before the deferred scene callback.
 await page.evaluate(()=>window.__holdTravel=true);
 await page.locator('[data-open="map"]').click();await page.locator('#panel [data-region="forest"]').click();await page.keyboard.press('Escape');
 if(!(await diag()).paused)await page.keyboard.press('Escape');
 await page.locator('#panel [data-open="slots"]').click();await page.locator('[data-slot="2"]').click();await page.evaluate(()=>window.__releaseTravel());await page.waitForFunction(()=>!window.mossDiagnostics().transitioning);assert.equal((await diag()).slot,2);assert.equal((await diag()).region,'garden');
 report.events=await page.evaluate(()=>window.__feedback);
 const commits=report.events.filter(e=>e.kind==='commit');assert.ok(commits.every(e=>e.latency<=50),'state mutation latency <=50ms');
 const sounds=report.events.filter(e=>e.kind==='sound'&&!e.loop);assert.ok(sounds.every(e=>e.latency<=100),'feedback source start <=100ms');
 // Observer delivery follows the handler; travel's explicit status must precede expensive construction.
 const statuses=report.events.filter(e=>e.kind==='status'&&e.id==='travel-status'&&e.text==='正在前往…');assert.ok(statuses.length>=4);assert.ok(statuses.every(e=>e.latency<=100));
 await page.screenshot({path:artifacts+'/final.png'});assert.deepEqual(report.errors,[]);assert.deepEqual(report.failed,[]);
 await writeFile(artifacts+'/regressions.json',JSON.stringify(report,null,2));console.log('PASS Escape/audio/transition regressions');
} catch(error){await writeFile(artifacts+'/failure.json',JSON.stringify({...report,error:String(error)},null,2));throw error;}
finally{await browser?.close();server?.kill('SIGTERM');}
