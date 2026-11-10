import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {build} from '../../games/neon-drift/node_modules/esbuild/lib/main.js';
const root=fileURLToPath(new URL('../../',import.meta.url));
const output=process.env.NEON_ARTIFACT_DIR||'/tmp/neon-drift-acceptance';await mkdir(output,{recursive:true});
const server=spawn('python3',['-m','http.server','8105','--bind','127.0.0.1','--directory',root+'public'],{stdio:'ignore'});
let browser;const errors=[],requests=[],policy=[],schedulerGaps=[];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
  await sleep(500);assert.equal(server.exitCode,null,'Port 8105 must be free before acceptance');
  const controller=await build({entryPoints:[root+'tests/neon-drift/controller.js'],bundle:true,write:false,format:'iife'});
  browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
  const context=await browser.newContext({viewport:{width:1280,height:720}});
  await context.addInitScript(()=>{window.__audio=[];window.__meters=[];const nativeConnect=AudioNode.prototype.connect;AudioNode.prototype.connect=function(destination,...args){if(destination===this.context.destination){const meter=this.context.createAnalyser();nativeConnect.call(this,meter);window.__meters.push(meter);}return nativeConnect.call(this,destination,...args);};const Native=window.AudioContext;window.AudioContext=class extends Native{constructor(...args){super(...args);window.__audio.push(this);}};document.addEventListener('securitypolicyviolation',e=>window.__policy=(window.__policy||[]).concat(e.violatedDirective));});
  await context.addInitScript({content:controller.outputFiles[0].text});
  const page=await context.newPage();const inflight=new Set();page.on('request',r=>inflight.add(r));page.on('requestfinished',r=>inflight.delete(r));page.on('requestfailed',r=>inflight.delete(r));
  async function settle(){let stable=0;for(let i=0;i<150&&stable<5;i++){await page.waitForTimeout(100);stable=inflight.size===0?stable+1:0;}assert.equal(inflight.size,0,'Assets must settle before navigation');}
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>requests.push({url:r.url(),reason:r.failure()}));page.on('response',r=>{if(r.status()>=400)requests.push({url:r.url(),status:r.status()});});
  await page.goto('http://127.0.0.1:8105/games/neon-drift/');await page.waitForFunction(()=>window.neonDrift?.snapshot().phase==='menu');assert.equal(await page.evaluate(()=>__audio.length),0);
  await page.screenshot({path:output+'/menu-720.png'});
  await page.locator('#settings-button').click();await page.locator('[data-setting="reducedMotion"]').check();await page.locator('[data-action="close"]').click();
  await page.locator('#launch').click();await page.keyboard.down('KeyW');await page.waitForFunction(()=>neonDrift.snapshot().elapsed>3);await page.keyboard.up('KeyW');
  await page.waitForFunction(()=>neonDrift.snapshot().audio.buffers.length===4);await page.waitForFunction(()=>{const meter=__meters[0],samples=new Float32Array(2048);meter.getFloatTimeDomainData(samples);return samples.some(x=>Math.abs(x)>.001);});assert.equal(await page.evaluate(()=>neonDrift.snapshot().audio.state),'running');
  await page.evaluate(()=>__audio[0].suspend());await page.keyboard.press('KeyW');await page.waitForFunction(()=>__audio[0].state==='running');
  await page.evaluate(()=>window.dispatchEvent(new Event('blur')));const before=await page.evaluate(()=>neonDrift.snapshot().elapsed);await page.waitForTimeout(350);assert.equal(await page.evaluate(()=>neonDrift.snapshot().elapsed),before);assert.equal(await page.evaluate(()=>neonDrift.snapshot().audio.state),'suspended');
  await page.screenshot({path:output+'/pause.png'});await settle();await page.reload();await page.waitForFunction(()=>neonDrift.snapshot().resumable);await page.locator('#continue-race').click();assert.equal(await page.evaluate(()=>neonDrift.snapshot().elapsed),before);await page.locator('[data-action="resume"]').click();await page.evaluate(()=>__pilot=true);
  const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');
  const metrics=async()=>{await cdp.send('HeapProfiler.collectGarbage');const x=await cdp.send('Performance.getMetrics');return Object.fromEntries(x.metrics.filter(m=>['JSHeapUsedSize','Nodes','JSEventListeners'].includes(m.name)).map(m=>[m.name,m.value]));};
  const start=Date.now();let baseline=null,after=null,firstResult=null,driftStarted=false;
  for(let poll=0;poll<600;poll++){
    await page.waitForTimeout(1000);const s=await page.evaluate(()=>neonDrift.snapshot());
    if(Date.now()-start>15000&&!baseline){baseline=await metrics();console.log('Warm heap',baseline);await page.screenshot({path:output+'/race.png'});}
    if(s.phase==='paused'){const event=await page.evaluate(()=>neonDrift.events().at(-1));assert.equal(event.reason,'frame-gap','Only scheduler gaps may pause this run');schedulerGaps.push(event);console.log('Resuming scheduler gap',event.frameGapMs);await page.locator('[data-action="resume"]').click();}
    if(s.phase==='result'&&!firstResult){assert.equal(s.result.success,true,'Time trial must finish legally');firstResult=s.result;console.log('Time trial completed',firstResult.time);assert.equal(await page.evaluate(()=>document.activeElement?.dataset.action),'retry');await page.screenshot({path:output+'/result-time.png'});await page.locator('[data-action="garage"]').click();await page.locator('[data-mode="drift"]').click();await page.locator('#launch').click();driftStarted=true;}
    else if(s.phase==='result'&&driftStarted){assert.equal(s.result.success,true);assert.ok(s.result.score>0,'Driver must bank drift points');console.log('Drift completed',s.result.score);await page.screenshot({path:output+'/result-drift.png'});break;}
    if(Date.now()-start>180000&&!after){after=await metrics();console.log('Three-minute heap',after);}
    if(Math.floor((Date.now()-start)/1000)%20===0)console.log('Driving',Math.floor((Date.now()-start)/1000),s.mode,s.elapsed.toFixed(1),s.lap,s.checkpoint);
  }
  assert.ok(firstResult);assert.equal(await page.evaluate(()=>neonDrift.snapshot().phase),'result');after??=await metrics();
  assert.ok(after.JSHeapUsedSize-baseline.JSHeapUsedSize<12*1024*1024,'Heap must stay bounded');assert.ok(after.JSEventListeners-baseline.JSEventListeners<8,'Listeners must stay bounded');
  const performance=await page.evaluate(()=>{const p=neonDrift.performance(),f=p.frames.sort((a,b)=>a-b);return {frames:f.length,avgMs:f.reduce((a,b)=>a+b,0)/f.length,p95Ms:f[Math.floor(f.length*.95)],triangles:p.renderer.triangles,calls:p.renderer.calls,buffer:p.renderer.drawingBufferSize};});
  console.log('Frame performance',JSON.stringify(performance));await page.locator('[data-action="garage"]').click();await settle();await settle();await page.reload();await page.waitForFunction(()=>window.neonDrift?.snapshot().phase==='menu');assert.ok(await page.evaluate(()=>JSON.parse(localStorage.getItem('stteak:neon-drift:save')).records['harbor:time'].bestTime));
  await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:output+'/menu-1080.png'});
  await page.setViewportSize({width:390,height:844});await page.locator('#settings-button').click();assert.ok(await page.locator('#modal').isVisible());await page.screenshot({path:output+'/mobile-settings.png'});await page.keyboard.press('Escape');
  await page.setViewportSize({width:1280,height:720});await page.locator('#launch').click();await page.waitForTimeout(500);await page.evaluate(()=>(window.__loss=document.querySelector('#world').getContext('webgl2').getExtension('WEBGL_lose_context')).loseContext());await page.waitForFunction(()=>document.querySelector('#modal-title').textContent.includes('顯示裝置'));await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>neonDrift.snapshot().phase),'paused');await page.evaluate(()=>window.__loss.restoreContext());await page.waitForTimeout(1200);await page.locator('[data-action="resume"]').click();await page.waitForFunction(()=>neonDrift.snapshot().phase==='running');
  policy.push(...await page.evaluate(()=>window.__policy||[]));assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);assert.deepEqual(policy,[]);
  const report={passed:true,timeTrial:firstResult,schedulerGaps,performance,baseline,after,consoleErrors:errors,failedRequests:requests,policyViolations:policy};await writeFile(output+'/acceptance.json',JSON.stringify(report,null,2));console.log('PASS',JSON.stringify(report));
}finally{await browser?.close();server.kill();}
