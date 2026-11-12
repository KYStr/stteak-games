import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import { browserEnvironment } from './browser-environment.mjs';
const port=Number(process.env.AETHERWAKE_PORT||8101),url=`http://127.0.0.1:${port}/games/aetherwake/`,output=process.env.AETHERWAKE_EVIDENCE||'/tmp/aetherwake-acceptance';
let server,browser,env;const report={inputs:[],errors:[],failures:[]};
await mkdir(output,{recursive:true});
try {
 try{assert.ok((await fetch(url)).ok);}catch{server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',new URL('../../public',import.meta.url).pathname],{stdio:'ignore'});await new Promise(r=>setTimeout(r,500));}
 env=await browserEnvironment();browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',env:env.env,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
 for(const reducedMotion of ['no-preference','reduce']) for(const touch of [false,true]){
  const context=await browser.newContext({viewport:touch?{width:390,height:844}:{width:1280,height:720},reducedMotion,isMobile:touch,hasTouch:touch});
  try {
   const page=await context.newPage();page.setDefaultTimeout(60000);page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('requestfailed',r=>report.failures.push(r.url()));
   await page.goto(url);await page.waitForFunction(()=>window.__aetherwake);await page.locator('#start').click();await page.waitForFunction(()=>__aetherwake.metrics().audio.contextState==='running');
   for(let i=0;i<12;i++){
    const record=await page.evaluate(({touch,i})=>{
     const before=__aetherwake.metrics().feedback.accepted,voices=__aetherwake.metrics().audio.events,start=performance.now();
     const dispatch=()=>touch?document.querySelector('#touch-glide').dispatchEvent(new PointerEvent('pointerdown',{pointerId:11,pointerType:'touch',bubbles:true,cancelable:true})):document.querySelector('#world').dispatchEvent(new KeyboardEvent('keydown',{code:'Space',key:' ',bubbles:true,cancelable:true}));
     dispatch();const end=performance.now(),text=document.querySelector('#sail-feedback').textContent;
     dispatch(); // Duplicate queued command is rejected before the next fixed step.
     document.querySelector('#world').dispatchEvent(new KeyboardEvent('keydown',{code:'Space',repeat:true,bubbles:true}));
     document.querySelector('#world').dispatchEvent(new KeyboardEvent('keyup',{code:'Space',bubbles:true}));
     const after=__aetherwake.metrics();
     return {i,before,id:after.feedback.accepted,processingMs:end-start,acknowledgementMs:after.feedback.acknowledged-start,text,sounds:after.audio.events-voices};
    },{touch,i});
    assert.equal(record.id,record.before+1);assert.match(record.text,/指令已接收/);assert.ok(record.processingMs<=50);assert.ok(record.acknowledgementMs<=100);assert.equal(record.sounds,1);
    await page.waitForFunction(id=>__aetherwake.metrics().feedback.submittedId===id,record.id);
    const after=await page.evaluate(()=>__aetherwake.metrics());record.feedback=after.feedback;record.renderSubmissionDelayMs=after.feedback.submitted-after.feedback.receipt;report.inputs.push({reducedMotion,touch,...record});
    assert.ok(after.feedback.maxConsumptionProcessingMs<=50);assert.ok(after.audio.peakVoices<=20);
    await page.waitForTimeout(100);
   }
   // Clear a queued request on blur; no menu/held-repeat sail acknowledgement.
   const cleared=await page.evaluate(()=>{const world=document.querySelector('#world');world.dispatchEvent(new KeyboardEvent('keydown',{code:'Space',bubbles:true}));window.dispatchEvent(new Event('blur'));const before=__aetherwake.metrics().feedback.accepted;world.dispatchEvent(new KeyboardEvent('keydown',{code:'Space',bubbles:true}));return {before,after:__aetherwake.metrics().feedback.accepted,text:document.querySelector('#sail-feedback').textContent,status:__aetherwake.snapshot().status};});
   assert.equal(cleared.before,cleared.after);assert.equal(cleared.text,'');assert.equal(cleared.status,'paused');
   await page.getByRole('button',{name:'重新遠征',exact:true}).click();await page.getByRole('button',{name:'重新遠征',exact:true}).click();
   await page.waitForFunction(()=>__aetherwake.snapshot().status==='running');
   console.log('PASS immediate feedback',reducedMotion,touch?'touch':'keyboard');
  }finally{await context.close();}
 }
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.failures,[]);report.success=true;
}finally{await writeFile(`${output}/feedback.json`,JSON.stringify(report,null,2));await browser?.close();server?.kill();await env?.dispose();}
