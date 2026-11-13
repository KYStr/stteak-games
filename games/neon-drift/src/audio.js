import {getControlsNumericView,CONTROL_VALUE as C} from './input.js';
import {RACE_VALUE as N,getRaceNumericView} from './physics.js';
const NOTES=[55,55,82.406,65.406,55,73.416,82.406,65.406];
// Synchronous native event boundaries keep bounded input/automation work distinct
// from continuously sampled controls. Events are retained, never queued to a RAF.
const audioOwners=new WeakMap();
function controlCueEvent(){const audio=audioOwners.get(this);if(audio?.feedbackEnabled&&audio.wantsContext)audio.emitControlCue(audio.immediateCue);}
function contextStateChanged(){const audio=audioOwners.get(this);if(audio&&audio.ctx===this){audio.contextRunning=audio.wantsContext&&this.state==='running';if(!audio.contextRunning)audio.active=false;}}
function applySynthesisTargets(){
  const audio=audioOwners.get(this);if(!audio?.contextRunning||!audio.ctx)return;
  const v=audio.targets,last=audio.scheduled,t=audio.ctx.currentTime;audio.automationBatches++;
  if(v[0]!==last[0]){audio.motor.frequency.setTargetAtTime(v[0]|0,t,.08);last[0]=v[0];audio.automationCalls++;}
  if(v[1]!==last[1]){audio.filter.frequency.setTargetAtTime(v[1]|0,t,.08);last[1]=v[1];audio.automationCalls++;}
  if(v[2]!==last[2]){audio.motorGain.gain.setTargetAtTime(v[2]*.002,t,.03);last[2]=v[2];audio.automationCalls++;}
  if(v[3]!==last[3]){audio.tireGain.gain.setTargetAtTime(v[3]*.005,t,.04);last[3]=v[3];audio.automationCalls++;}
  if(v[4]!==last[4]){audio.musicGain.gain.setTargetAtTime(v[4],t,.06);last[4]=v[4];audio.automationCalls++;}
}
// Original procedural audio score. No remote media; all voices start after a user gesture.
export class DriveAudio {
  constructor(){this.events=new EventTarget();audioOwners.set(this.events,this);this.cueEvent=new Event('pedal');this.synthesisEvent=new Event('synthesis');this.events.addEventListener('pedal',controlCueEvent);this.events.addEventListener('synthesis',applySynthesisTargets);this.immediateCue=0;this.contextRunning=false;this.observedContext=null;this.automationBatches=0;this.automationCalls=0;this.controlFallback=new Float64Array(3);this.levels=Float64Array.of(.6,.32);this.targets=new Float64Array(5);this.scheduled=Float64Array.of(-1,-1,-1,-1,-1);this.fallbackNumbers=new Float64Array(Object.keys(N).length);this.controlCueCount=0;this.toneCount=0;this.ctx=null;this.wantsContext=false;this.feedbackEnabled=false;this.throttleHeld=false;this.brakeHeld=false;this.handbrakeHeld=false;this.pendingCue=0;this.settings={music:.32,sfx:.6};this.active=false;this.lastBeat=-1;this.lastHit=-1;this.buffers={};this.voices=new Set();this.successGeneration=0;this.successTimers=new Set();} // 初始化成功音世代與待執行計時器集合，供新局與釋放時取消。
  async unlock(){
    this.wantsContext=true;
    if(!this.ctx){
      const AC=globalThis.AudioContext||globalThis.webkitAudioContext;if(!AC)return;
      const ctx=this.ctx=new AC();this.observedContext=ctx;audioOwners.set(ctx,this);ctx.addEventListener('statechange',contextStateChanged);this.scheduled.fill(-1);this.master=ctx.createGain();this.master.gain.value=.6;this.master.connect(ctx.destination);
      this.sfxGain=ctx.createGain();this.sfxGain.gain.value=this.settings.sfx;this.sfxGain.connect(this.master); // 建立共用音效增益匯流排，讓已開始的聲音也跟隨即時音量。
      this.motor=ctx.createOscillator();this.motor.type='sawtooth';this.motor.frequency.value=45;
      this.filter=ctx.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=320;
      this.motorGain=ctx.createGain();this.motorGain.gain.value=0;this.motor.connect(this.filter).connect(this.motorGain).connect(this.master);this.motor.start();
      this.lfo=ctx.createOscillator();this.lfo.frequency.value=8;this.lfoGain=ctx.createGain();this.lfoGain.gain.value=1.5;this.lfo.connect(this.lfoGain).connect(this.motor.frequency);this.lfo.start();
      const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);const a=buf.getChannelData(0);let seed=7291;for(let i=0;i<a.length;i++){seed=(seed*16807)%2147483647;a[i]=(seed/2147483647*2-1)*.35;}
      this.noise=ctx.createBufferSource();this.noise.buffer=buf;this.noise.loop=true;this.tireFilter=ctx.createBiquadFilter();this.tireFilter.type='bandpass';this.tireFilter.frequency.value=1300;this.tireFilter.Q.value=3;
      this.tireGain=ctx.createGain();this.tireGain.gain.value=0;this.noise.connect(this.tireFilter).connect(this.tireGain).connect(this.master);this.noise.start();
      this.musicGain=ctx.createGain();this.musicGain.gain.value=0;this.musicGain.connect(this.master);
      this.loading=Promise.all(['music','click','impact','success'].map(async id=>{try{const res=await fetch(`./assets/audio/${id}.wav`);if(!res.ok)throw Error('Audio unavailable');this.buffers[id]=await ctx.decodeAudioData(await res.arrayBuffer());if(id==='music'){this.music=ctx.createBufferSource();this.music.buffer=this.buffers.music;this.music.loop=true;this.music.connect(this.musicGain);this.music.start();}}catch{/* Procedural voices remain available if an audio file is unavailable. */}}));
    }
    const ctx=this.ctx;await ctx.resume().catch(()=>{});
    // A late gesture resume must not undo blur/visibility/manual pause.
    if(!this.wantsContext&&ctx===this.ctx)await ctx.suspend().catch(()=>{});if(ctx===this.ctx)this.contextRunning=this.wantsContext&&ctx.state==='running';
    if(ctx===this.ctx&&this.wantsContext&&this.feedbackEnabled&&this.pendingCue&&ctx.state==='running'){const cue=this.pendingCue;this.pendingCue=0;this.immediateCue=cue;this.events.dispatchEvent(this.cueEvent);}
  }
  resetControls(){if(this.controlVoice){this.controlVoice.stop();this.controlVoice=null;}this.feedbackEnabled=false;this.throttleHeld=this.brakeHeld=this.handbrakeHeld=false;this.pendingCue=0;}
  emitControlCue(cue){this.controlCueCount++;if(this.controlVoice)this.controlVoice.stop();this.controlVoice=this.tone(Math.abs(cue)===3?160:Math.abs(cue)===2?85:110,.035,cue<0?.0125:.025,'triangle','sfx');}
  controlFeedback(controls,active,numbers=getControlsNumericView(controls)){
    if(!active){this.resetControls();return;}
    this.feedbackEnabled=true;if(!numbers){numbers=this.controlFallback;numbers[0]=controls.throttle||0;numbers[1]=controls.brake||0;}
    const throttle=this.throttleHeld?numbers[C.throttle]>.2:numbers[C.throttle]>=.5;
    const brake=this.brakeHeld?numbers[C.brake]>.2:numbers[C.brake]>=.5;
    const handbrake=this.handbrakeHeld?Number(controls.handbrake)>.2:Number(controls.handbrake)>=.5;
    let cue=0;
    if(throttle!==this.throttleHeld)cue=throttle?1:-1;
    if(brake!==this.brakeHeld)cue=brake?2:-2;
    if(handbrake!==this.handbrakeHeld)cue=handbrake?3:-3;
    this.throttleHeld=throttle;this.brakeHeld=brake;this.handbrakeHeld=handbrake;
    if(!cue)return;
    if(this.ctx?.state==='running'&&this.wantsContext){this.pendingCue=0;this.immediateCue=cue;this.events.dispatchEvent(this.cueEvent);}
    else if(this.ctx)this.pendingCue=cue;
  }
  setOptions(settings){this.settings={...this.settings,...settings};this.levels[0]=this.settings.sfx;this.levels[1]=this.settings.music;if(this.sfxGain)this.sfxGain.gain.setValueAtTime(this.settings.sfx,this.ctx.currentTime);} // 保留合併設定，立即更新音效匯流排而非僅影響新聲音。
  tone(freq,duration=.12,volume=.1,type='sine',bus='sfx'){
    if(!this.ctx||this.ctx.state!=='running')return;this.toneCount++;const c=this.ctx,t=c.currentTime;const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(volume*(bus==='sfx'?1:(this.settings[bus]??.5)),t);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g).connect(bus==='sfx'?this.sfxGain:this.master);o.start(t);o.stop(t+duration+.02);o.onended=()=>{if(this.controlVoice===o)this.controlVoice=null;o.disconnect();g.disconnect();};return o; // 程序音效只乘一次共用音量，音樂仍沿原路由與原設定。
  }
  play(id){if(!this.ctx||this.ctx.state!=='running'||!this.buffers[id])return false;if(this.voices.size>=4){const first=this.voices.values().next().value;first.stop();this.voices.delete(first);}const s=this.ctx.createBufferSource(),g=this.ctx.createGain();s.buffer=this.buffers[id];g.gain.value=1;s.connect(g).connect(this.sfxGain);this.voices.add(s);s.onended=()=>{this.voices.delete(s);s.disconnect();g.disconnect();};s.start();return true;} // 音檔局部增益保持一，經共用音效匯流排實現即時靜音。
  click(){if(!this.play('click'))this.tone(660,.06,.09);}
  resetSuccess(){this.successGeneration++;for(const timer of this.successTimers)clearTimeout(timer);this.successTimers.clear();} // 新局或釋放提升世代並清除尚未發生的成功音回呼。
  success(generation=this.successGeneration){if(generation!==this.successGeneration)return;if(!this.play('success'))[523.25,659.25,783.99].forEach((v,i)=>{const timer=setTimeout(()=>{this.successTimers.delete(timer);if(generation===this.successGeneration&&this.ctx?.state==='running')this.tone(v,.5,.12);},i*110);this.successTimers.add(timer);});} // 過期世代不排程；每個成功音回呼執行後移除並再次檢查世代。
  failure(generation=this.successGeneration){if(generation!==this.successGeneration)return;for(let i=0;i<2;i++){const timer=setTimeout(()=>{this.successTimers.delete(timer);if(generation===this.successGeneration)this.tone(i?110:165,.24,.12,'triangle');},i*170);this.successTimers.add(timer);}}
  pause(){this.contextRunning=false;this.resetControls();this.scheduled[2]=this.scheduled[3]=-1;this.wantsContext=false;this.active=false;if(this.ctx){this.motorGain.gain.setValueAtTime(0,this.ctx.currentTime);this.tireGain.gain.setValueAtTime(0,this.ctx.currentTime);this.ctx.suspend().catch(()=>{});}}
  update(state,running,numbers=getRaceNumericView(state)){
    const ctx=this.ctx;if(!ctx)return;if(ctx!==this.observedContext){this.observedContext=ctx;this.contextRunning=ctx.state==='running';}if(!this.contextRunning)return;this.active=running;
    if(!numbers){numbers=this.fallbackNumbers;numbers[N.speed]=state?.speed||0;numbers[N.driftAngle]=state?.driftAngle||0;}
    const v=this.targets,last=this.scheduled,speed=Math.abs(numbers[N.speed]),sfx=this.levels[0];
    v[0]=Math.round(38+speed*3.1);v[1]=Math.round((250+speed*15)/5)*5;v[2]=v[3]=v[4]=0;
    if(running){v[2]=Math.round((0.04+speed*.001)*sfx/.002);if(state?.drifting)v[3]=Math.round((0.09+Math.min(.18,Math.abs(numbers[N.driftAngle])*.18))*sfx/.005);v[4]=this.levels[1];}
    if(v[0]!==last[0]||v[1]!==last[1]||v[2]!==last[2]||v[3]!==last[3]||v[4]!==last[4]){
      this.events.dispatchEvent(this.synthesisEvent);
    }
    if(running){if(!this.music){const beat=Math.floor(ctx.currentTime*2.6);if(beat!==this.lastBeat){this.lastBeat=beat;this.tone(NOTES[beat%8],.32,.18,'triangle','music');}}
      if(state.lastEvent?.type==='collision'&&state.lastEvent.id!==this.lastHit){this.lastHit=state.lastEvent.id;if(!this.play('impact'))this.tone(75,.18,.32,'triangle');}
    }
  }
  get status(){return {automationBatches:this.automationBatches,automationCalls:this.automationCalls,controlCueCount:this.controlCueCount,toneCount:this.toneCount,state:this.ctx?.state||'locked',active:this.active,buffers:Object.keys(this.buffers),voices:this.voices.size,sfx:this.settings.sfx,music:this.settings.music};}
  dispose(){this.contextRunning=false;this.observedContext=null;if(this.ctx){this.ctx.removeEventListener?.('statechange',contextStateChanged);audioOwners.delete(this.ctx);}this.resetControls();this.wantsContext=false;this.lfo?.stop();this.lfo?.disconnect();this.lfoGain?.disconnect();this.resetSuccess();this.motor?.stop();this.noise?.stop();this.music?.stop();for(const voice of this.voices)voice.stop();this.ctx?.close();this.ctx=null;} // 先取消延遲成功音，再沿原流程停止節點與關閉音訊上下文。
}
