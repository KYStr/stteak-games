// Original PCM and reproducible DSP: assets/games/moss-and-moon/sources/audio-kit.mjs.
const filenames={music:'music-loop.wav',ambient:'ambient-leaves.wav',plant:'sfx-plant.wav',water:'sfx-water.wav',harvest:'sfx-harvest.wav',ui:'sfx-ui.wav',success:'sfx-success.wav'};
// PCM absolute bound at sliders=1, even without cooldown: music + ambience +
// six copies of the loudest gained effect (harvest). 2.535906982421875 * .30
// = .7607720947265625, leaving 2.37 dB below full scale before reconstruction.
export const AUDIO_OUTPUT_GAIN=.30;
export const AUDIO_FADE_SECONDS=.03;

export function createAudio(onError){
 let context=null,buses={},output=null,envelope=null,active=false,settings={music:.35,ambient:.45,sfx:.5},loadPromise=null,ready=false,lastEffect=0,voices=0,error=null;
 let revision=0,pauseTimer=null,suspendPromise=null,disposed=false,disposePromise=null;
 let ramp={from:0,to:0,start:0,end:0};
 const buffers={},loops=[];
 const cancelPause=()=>{if(pauseTimer!==null){clearTimeout(pauseTimer);pauseTimer=null;}};
 const currentEnvelope=()=>{const now=context.currentTime;if(now>=ramp.end)return ramp.to;if(now<=ramp.start)return ramp.from;return ramp.from+(ramp.to-ramp.from)*(now-ramp.start)/(ramp.end-ramp.start);};
 const silence=()=>{const now=context.currentTime;envelope.gain.cancelScheduledValues(now);envelope.gain.setValueAtTime(0,now);ramp={from:0,to:0,start:now,end:now};};
 function fadeTo(value){
  const now=context.currentTime,from=currentEnvelope();
  envelope.gain.cancelScheduledValues(now);envelope.gain.setValueAtTime(from,now);
  envelope.gain.linearRampToValueAtTime(value,now+AUDIO_FADE_SECONDS);
  ramp={from,to:value,start:now,end:now+AUDIO_FADE_SECONDS};
  return ramp.end;
 }
 function startLoops(){
  if(!ready||loops.length||disposed||!active||context.state!=='running')return;
  for(const name of ['music','ambient']){const source=context.createBufferSource();source.buffer=buffers[name];source.loop=true;source.loopStart=0;source.loopEnd=source.buffer.duration;source.connect(buses[name]);source.start();loops.push(source);}
 }
 function pauseAfterFade(request){
  cancelPause();
  if(context.state!=='running'){silence();return;}
  const end=fadeTo(0);
  const finish=()=>{
   pauseTimer=null;if(disposed||active||request!==revision)return;
   if(context.state!=='running'){silence();return;}
   // Wall timers can precede the audio clock or be delayed in a background tab.
   // Never suspend until the scheduled envelope has reached silence.
   if(context.currentTime<end){pauseTimer=setTimeout(finish,Math.max(4,(end-context.currentTime)*1000));return;}
   const pending=context.suspend();suspendPromise=pending;
   pending.then(()=>{if(suspendPromise===pending)suspendPromise=null;},e=>{error=e.message;if(suspendPromise===pending)suspendPromise=null;});
  };
  pauseTimer=setTimeout(finish,AUDIO_FADE_SECONDS*1000);
 }
 async function resumeActive(request){
  // A suspend already sent to the audio thread must settle before a later resume.
  if(suspendPromise)await suspendPromise.catch(()=>{});
  if(disposed||!active||request!==revision)return;
  try{if(context.state!=='running'){silence();await context.resume();}}catch(e){if(!disposed)error=e.message;return;}
  if(disposed)return;
  if(!active){pauseAfterFade(revision);return;}
  if(request!==revision)return;
  startLoops();if(ready)fadeTo(1);
 }
 async function unlock(){
  if(disposed)return;
  if(!context){
   context=new (window.AudioContext||window.webkitAudioContext)();
   output=context.createGain();output.gain.value=AUDIO_OUTPUT_GAIN;
   envelope=context.createGain();envelope.gain.value=0;
   output.connect(envelope);envelope.connect(context.destination);
   for(const name of ['music','ambient','sfx']){buses[name]=context.createGain();buses[name].gain.value=settings[name];buses[name].connect(output);}
   loadPromise=Promise.all(Object.entries(filenames).map(async([id,file])=>{const response=await fetch(new URL('./assets/audio/'+file,import.meta.url));if(!response.ok)throw new Error('Audio load failed: '+file);buffers[id]=await context.decodeAudioData(await response.arrayBuffer());})).then(()=>{if(disposed)return;ready=true;if(active)return resumeActive(revision);}).catch(e=>{if(disposed)return;error=e.message;onError?.('音訊暫時無法載入。庭園仍可遊玩，重新載入可重試。');});
  }
  if(active)await resumeActive(revision);await loadPromise;
 }
 function update(s){
  for(const name of ['music','ambient','sfx'])if(Number.isFinite(s[name]))settings[name]=Math.max(0,Math.min(1,s[name]));
  if(context&&!disposed)for(const name of ['music','ambient','sfx'])buses[name].gain.setTargetAtTime(settings[name],context.currentTime,.06);
 }
 function setActive(value){
  if(disposed)return;active=Boolean(value);const request=++revision;cancelPause();if(!context)return;
  if(active)return resumeActive(request);pauseAfterFade(request);
 }
 function effect(kind){
  if(disposed||!context||!active||!ready||context.state!=='running'||voices>=6||context.currentTime-lastEffect<.065)return;
  lastEffect=context.currentTime;
  const name=kind==='water'?'water':kind==='plant'?'plant':kind==='harvest'?'harvest':['deliver','festival','discover','craft'].includes(kind)?'success':'ui';
  const source=context.createBufferSource(),gain=context.createGain();source.buffer=buffers[name];source.playbackRate.value=1+(voices%3-1)*.035;gain.gain.value=name==='success'?.65:.8;source.connect(gain);gain.connect(buses.sfx);source.start();voices++;
  source.onended=()=>{voices--;source.disconnect();gain.disconnect();};
 }
 function dispose(){
  if(disposePromise)return disposePromise;disposed=true;active=false;++revision;cancelPause();
  if(!context)return Promise.resolve();
  disposePromise=new Promise(resolve=>{
   const close=()=>{for(const source of loops)source.stop();Promise.resolve(context.close()).then(resolve,resolve);};
   if(context.state!=='running'){close();return;}
   const end=fadeTo(0),finish=()=>{if(context.state==='running'&&context.currentTime<end){setTimeout(finish,Math.max(4,(end-context.currentTime)*1000));return;}close();};
   setTimeout(finish,AUDIO_FADE_SECONDS*1000);
  });
  return disposePromise;
 }
 return {unlock,update,setActive,tick(){},effect,dispose,metrics:()=>({state:context?.state||'locked',voices,loopSources:loops.length,ready,error,volumes:{music:settings.music,ambient:settings.ambient,sfx:settings.sfx},outputGain:AUDIO_OUTPUT_GAIN,envelope:context?currentEnvelope():0})};
}
