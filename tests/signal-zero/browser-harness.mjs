import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {mkdir} from 'node:fs/promises';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {actionTimeout,stopServer} from './evidence.mjs';
export async function harness(name){
 const root=fileURLToPath(new URL('../../',import.meta.url)),port=Number(process.env.SIGNAL_ZERO_PORT||8107),artifacts=process.env.SIGNAL_ZERO_ARTIFACTS||'/tmp/signal-zero-'+name;
 await mkdir(artifacts,{recursive:true});const base=`http://127.0.0.1:${port}/games/signal-zero/`;let server,browser;
 try{try{if(!(await fetch(base,{signal:AbortSignal.timeout(1500)})).ok)throw Error('offline')}catch{server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root+'public'],{stdio:'ignore'});for(let i=0;i<100;i++){try{if((await fetch(base,{signal:AbortSignal.timeout(1500)})).ok)break}catch{}if(server.exitCode!==null)throw Error('HTTP port '+port+' is occupied or unavailable');await new Promise(r=>setTimeout(r,100));}}
 browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});const page=await browser.newPage({viewport:{width:480,height:270}}),errors=[];page.setDefaultTimeout(actionTimeout);const failedRequests=[];captureErrors(page,errors,failedRequests);
 return {page,base,artifacts,errors,failedRequests,browser,close:async()=>{await browser.close();await stopServer(server);}};
 }catch(error){await browser?.close();await stopServer(server);throw error;}
}
export function instrumentation(){
 const add=EventTarget.prototype.addEventListener,removeListener=EventTarget.prototype.removeEventListener,records=[];
 EventTarget.prototype.addEventListener=function(type,callback,options){
  const result=add.call(this,type,callback,options);if(new Error().stack.includes('/games/signal-zero/'))records.push({target:new WeakRef(this),callback:new WeakRef(callback),type,signal:options?.signal,removed:false});return result;
 };
 EventTarget.prototype.removeEventListener=function(type,callback,options){for(const r of records)if(r.target.deref()===this&&r.callback.deref()===callback&&r.type===type)r.removed=true;return removeListener.call(this,type,callback,options);};
 window.__gameListenerCount=()=>{let count=0;for(const r of records){const target=r.target.deref();if(!r.removed&&!r.signal?.aborted&&r.callback.deref()&&target&&(target===window||target===document||target.isConnected))count++;}for(const target of document.querySelectorAll('*'))if(typeof target.onclick==='function')count++;return count;};
 const pending=new Set(),raf=requestAnimationFrame.bind(window);window.__gameRaf={pending,max:0};window.requestAnimationFrame=callback=>{if(callback.name!=='frame')return raf(callback);const id=raf(now=>{pending.delete(id);callback(now)});pending.add(id);__gameRaf.max=Math.max(__gameRaf.max,pending.size);return id};
 const glProto=WebGL2RenderingContext.prototype,create=glProto.createTexture,bind=glProto.bindTexture,image=glProto.texImage2D,storage=glProto.texStorage2D,remove=glProto.deleteTexture,bindings=new Map(),ledger=new Map();window.__textureLedger={bytes:0,peak:0,count:0};
 function record(texture,width,height,bytes){const prior=ledger.get(texture)||0;ledger.set(texture,bytes);__textureLedger.bytes+=bytes-prior;__textureLedger.peak=Math.max(__textureLedger.peak,__textureLedger.bytes);__textureLedger.count=ledger.size;}
 glProto.createTexture=function(){const t=create.call(this);ledger.set(t,0);return t};glProto.bindTexture=function(target,texture){bindings.set(target,texture);return bind.call(this,target,texture)};
 glProto.texImage2D=function(...args){const out=image.apply(this,args),texture=bindings.get(args[0]);if(texture&&args[1]===0){const width=args.length>=9?args[3]:args[5]?.width||1,height=args.length>=9?args[4]:args[5]?.height||1;record(texture,width,height,width*height*16*4/3);}return out};
 glProto.texStorage2D=function(target,levels,format,width,height){const out=storage.call(this,target,levels,format,width,height);if(bindings.get(target))record(bindings.get(target),width,height,width*height*16*4/3);return out};
 glProto.deleteTexture=function(texture){__textureLedger.bytes-=ledger.get(texture)||0;ledger.delete(texture);__textureLedger.count=ledger.size;return remove.call(this,texture)};
}

export function captureErrors(page,errors,failedRequests=[]){
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 page.on('requestfailed',r=>failedRequests.push(r.url()+': '+r.failure()?.errorText));page.on('response',r=>{if(r.status()>=400)failedRequests.push(r.status()+' '+r.url())});
 return{errors,failedRequests};
}
