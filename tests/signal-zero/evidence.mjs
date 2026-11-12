import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
export const actionTimeout=Number(process.env.SIGNAL_ZERO_ACTION_TIMEOUT_MS||120000);
assert.ok(Number.isInteger(actionTimeout)&&actionTimeout>=1000&&actionTimeout<=600000,'SIGNAL_ZERO_ACTION_TIMEOUT_MS must be 1000..600000');
export async function stopServer(server){if(server&&server.exitCode===null){const exited=new Promise(resolve=>server.once('exit',resolve));server.kill('SIGTERM');await exited}}
export function deadline(promise,ms){let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('CDP capture deadline '+ms+' ms')),ms)})]).finally(()=>clearTimeout(timer))}
// Navigation commit and observable application readiness have separate evidence.
// Node's clock keeps this deadline real under Playwright's virtual browser clock.
export async function navigateAndReady(page,navigate,expected='home',timeout=actionTimeout,options={}){
 const started=performance.now(),record={url:options.url||page.url(),expectedScreen:expected,commitMs:null,readyMs:null};
 if(options.report)(options.report.navigations??=[]).push(record);
 const oldOrigin=await deadline(page.evaluate(()=>(window.__pwClock?.builtins.performance??performance).timeOrigin),timeout).catch(()=>null);record.previousOrigin=oldOrigin;
 const left=()=>Math.max(1,timeout-(performance.now()-started));
 try{
  await deadline(navigate({waitUntil:'commit',timeout:left()}),left());record.commitMs=performance.now()-started;record.url=page.url();
  while(performance.now()-started<timeout){
   const snapshot=await deadline(page.evaluate(()=>{
    const state=window.signalZeroControlState;
    return{origin:(window.__pwClock?.builtins.performance??performance).timeOrigin,ready:document.readyState,screen:state?.screen,error:state?.error,calls:window.signalZeroDiagnostics?.render?.drawCalls||0};
   }),left());Object.assign(record,snapshot);
   if(snapshot.screen==='error')throw Error('Application boot failed: '+snapshot.error);
   const expectedScreens=Array.isArray(expected)?expected:[expected];
   if((options.history||snapshot.origin!==oldOrigin)&&snapshot.ready!=='loading'&&expectedScreens.includes(snapshot.screen)&&snapshot.calls>0){record.readyMs=performance.now()-started;return snapshot}
   await new Promise(resolve=>setTimeout(resolve,Math.min(50,left())));
  }
  throw Error('Navigation committed but application readiness deadline expired');
 }catch(error){record.failure=error.message;if(options.report)(options.report.requiredFailures??=[]).push('Navigation: '+error.message);throw error}
 finally{record.elapsedMs=performance.now()-started;record.errors=[...(options.errors||[])];record.failedRequests=[...(options.failedRequests||[])]}
}
export async function capture(page,path,report){
 const record={path,attempts:[]};(report.captures??=[]).push(record);
 // Direct CDP capture avoids Playwright's layout/animation/font synchronization
 // on an intentionally paused WebGL scene. Both paths retain the actual pixels.
 for(let attempt=0;attempt<2;attempt++){
  const started=performance.now();let session;
  try{session=await page.context().newCDPSession(page);const result=await deadline(session.send('Page.captureScreenshot',{format:'png',fromSurface:attempt===0,captureBeyondViewport:false}),attempt===0?actionTimeout:Math.min(600000,actionTimeout*1.5));await writeFile(path,Buffer.from(result.data,'base64'));record.attempts.push({attempt:attempt+1,ms:performance.now()-started,passed:true});return true}
  catch(error){record.attempts.push({attempt:attempt+1,ms:performance.now()-started,error:error.message});record.state=await deadline(page.evaluate(()=>({screen:window.signalZeroControlState?.screen,raf:window.__raf?.requests,viewport:[innerWidth,innerHeight],render:window.signalZeroDiagnostics?.render,phases:window.signalZeroDiagnostics?.performance.phases})),10000).catch(()=>null)}
  finally{await session?.detach().catch(()=>{})}
 }
 (report.requiredFailures??=[]).push('Capture failed twice: '+path);return false;
}
export async function installFeedbackProbe(page){await page.evaluate(async()=>{
 if(window.__feedback)return;
 // Playwright preserves its native performance object in the installed clock's
 // builtins. Keep cue timing real even while advancing simulation timestamps.
 const realNow=()=>window.__pwClock?.builtins.performance.now()??performance.now();
 const {Input}=await import('./input.js'),{Sound}=await import('./audio.js'),{View}=await import('./view.js');
 window.addEventListener('click',event=>{if(event.target.closest?.('[data-tool]'))window.__inputAt=realNow()},true);
 window.__feedback=[];window.__inputAt=realNow();window.__rawQueue=[];
 const read=Input.prototype.read;Input.prototype.read=function(){const at=realNow();if(this.receivedAt)__rawQueue.push(at-this.receivedAt);window.__inputAt=at;const out=read.call(this);window.__readCost=realNow()-at;return out};
 const tone=Sound.prototype.tone,event=Sound.prototype.event,finish=Sound.prototype.finishRun,effect=View.prototype.effect;
 function row(type){const at=realNow(),r={type,at,inputMs:at-__inputAt,readMs:window.__readCost||0,voice:false,visual:false,audioPeak:0};__feedback.push(r);return r}
 function samples(r){for(const ms of [25,60])setTimeout(()=>{if(!window.__audioAnalyser)return;const data=new Float32Array(__audioAnalyser.fftSize);__audioAnalyser.getFloatTimeDomainData(data);for(const v of data)r.audioPeak=Math.max(r.audioPeak,Math.abs(v))},ms)}
 Sound.prototype.tone=function(...args){const before=this.voices.size,out=tone.apply(this,args),r=window.__currentCue;if(r&&this.voices.size>before){r.voice=true;r.audioMs=realNow()-r.at;samples(r)}return out};
 Sound.prototype.event=function(type){const r=row(type);window.__currentCue=r;const out=event.call(this,type);window.__currentCue=null;return out};
 Sound.prototype.finishRun=function(type){const previous=__feedback.findLast(r=>r.type===type),r=row(type);r.visual=!!previous?.visual;r.visualMs=previous?.visualMs||0;window.__currentCue=r;const out=finish.call(this,type);window.__currentCue=null;return out};
 View.prototype.effect=function(event,run){const out=effect.call(this,event,run),type=event.type==='alarm'?'alert':event.type==='tool-failed'?'toolFail':event.type;let r=__feedback.findLast(r=>r.type===type);if(!r&&(type==='caught'||type==='complete')){r=row(type);r.visual=true;r.visualMs=realNow()-r.at}else if(r){r.visual=this.effects.some(slot=>slot.mesh.visible);r.visualMs=realNow()-r.at}return out};
})}
