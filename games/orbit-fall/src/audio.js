// Original Orbit / Fall sound engine. The editable synthesis score is retained in
// assets/games/orbit-fall/sources/sound-synthesis.mjs; no external audio sources.
const EVENTS=['brake','magnet','tether','interact','power','signal','low-oxygen','damage','fail','success','ending','door','click'];
const MENU_STINGERS=new Set(['signal','ending','fail','success','click']);
const ALIASES={thrust:'thrust',oxygen:'power',repair:'power',collect:'signal',warning:'low-oxygen',error:'damage',win:'success',death:'fail'};
const bound=n=>Math.max(0,Math.min(1,Number.isFinite(Number(n))?Number(n):0));
export class AudioEngine {
  constructor(){this.context=null;this.music=.35;this.sfx=.65;this.paused=false;this.hidden=false;this.disposed=false;this.buffers=new Map();this.voices=new Set();this.lastEvent=new Map();this.maxVoices=16;this.ready=false;this.thrust=0;this.loadErrors=[];}
  async unlock(){
    if(this.disposed)return false;
    if(!this.context){const AudioContext=globalThis.AudioContext||globalThis.webkitAudioContext;if(!AudioContext)return false;this.context=new AudioContext();const c=this.context;
      this.master=c.createGain();this.master.gain.value=.7;this.limiter=c.createDynamicsCompressor();this.limiter.threshold.value=-12;this.limiter.knee.value=15;this.limiter.ratio.value=4;this.limiter.attack.value=.008;this.limiter.release.value=.18;this.master.connect(this.limiter).connect(c.destination);
      this.musicGain=c.createGain();this.musicGain.gain.value=this.paused?0:this.music*.5;this.musicGain.connect(this.master);this.sfxGain=c.createGain();this.sfxGain.gain.value=this.sfx;this.sfxGain.connect(this.master);this.thrustGain=c.createGain();this.thrustGain.gain.value=0;this.thrustGain.connect(this.sfxGain);
      this.loading=Promise.all(['ambient-loop','thruster-loop',...EVENTS].map(async name=>{try{const response=await fetch(new URL(`./assets/audio/${name}.wav`,import.meta.url));if(!response.ok)throw new Error(`${response.status}`);const data=await response.arrayBuffer();const buffer=await c.decodeAudioData(data);if(!this.disposed)this.buffers.set(name,buffer);}catch(error){this.loadErrors.push({name,message:error.message});}})).then(()=>{if(this.disposed)return;this.ready=true;this._startLoops();});
    }
    if(this.hidden){if(this.context.state==='running')await this.context.suspend();}else if(this.context.state==='suspended')await this.context.resume();return true;
  }
  _startLoops(){if(this.musicSource||!this.context)return;const c=this.context;const ambient=this.buffers.get('ambient-loop'),thrust=this.buffers.get('thruster-loop');
    if(ambient){this.musicSource=c.createBufferSource();this.musicSource.buffer=ambient;this.musicSource.loop=true;this.musicSource.connect(this.musicGain);this.musicSource.start();}
    if(thrust){this.thrustSource=c.createBufferSource();this.thrustSource.buffer=thrust;this.thrustSource.loop=true;const filter=c.createBiquadFilter();filter.type='lowpass';filter.frequency.value=1100;this.thrustSource.connect(filter).connect(this.thrustGain);this.thrustSource.start();this.thrustFilter=filter;}
  }
  setVolumes(music,sfx){this.music=bound(music);this.sfx=bound(sfx);if(!this.context||this.disposed)return;const t=this.context.currentTime;this.musicGain.gain.setTargetAtTime(this.paused?0:this.music*.5,t,.04);this.sfxGain.gain.setTargetAtTime(this.sfx,t,.04);}
  // A menu pauses simulation and fades continuous sound, but keeps its short
  // confirmation/ending cues on the SFX bus. Visibility alone suspends the clock.
  setPaused(value){this.paused=Boolean(value);if(!this.context||this.disposed)return;const t=this.context.currentTime;this.musicGain.gain.cancelScheduledValues(t);this.musicGain.gain.setTargetAtTime(this.paused?0:this.music*.5,t,.025);if(this.paused){this.thrust=0;this.thrustGain.gain.cancelScheduledValues(t);this.thrustGain.gain.setValueAtTime(0,t);}}
  setHidden(value){this.hidden=Boolean(value);if(!this.context||this.disposed)return;if(this.hidden){this.thrust=0;this.thrustGain.gain.cancelScheduledValues(this.context.currentTime);this.thrustGain.gain.setValueAtTime(0,this.context.currentTime);this.context.suspend().catch(()=>{});}else{this.musicGain.gain.setTargetAtTime(this.paused?0:this.music*.5,this.context.currentTime,.025);this.context.resume().catch(()=>{});}}
  play(rawName){const name=ALIASES[rawName]||rawName;if(name==='thrust'){this.update(1);return;}if(!this.context||this.hidden||this.disposed||this.sfx===0||(this.paused&&!MENU_STINGERS.has(name)))return;const c=this.context,t=c.currentTime;
    const cooldown=name==='low-oxygen'?8:name==='damage'?.4:.075;if(t-(this.lastEvent.get(name)??-100)<cooldown)return;this.lastEvent.set(name,t);
    if(this.voices.size>=this.maxVoices){const oldest=this.voices.values().next().value;oldest?.stop();this.voices.delete(oldest);}
    const buffer=this.buffers.get(name);let source,gain=c.createGain();gain.gain.value=name==='low-oxygen'?.4:.65;gain.connect(this.sfxGain);
    if(buffer){source=c.createBufferSource();source.buffer=buffer;source.connect(gain);}
    else {source=c.createOscillator();source.type='sine';source.frequency.setValueAtTime(name==='damage'?110:330,t);source.frequency.exponentialRampToValueAtTime(name==='damage'?70:440,t+.12);gain.gain.setValueAtTime(.08,t);gain.gain.exponentialRampToValueAtTime(.001,t+.15);source.connect(gain);source.stop(t+.17);}
    this.voices.add(source);source.onended=()=>{this.voices.delete(source);source.disconnect();gain.disconnect();};source.start();
  }
  update(amount=0){if(this.disposed||!this.context||this.paused||this.hidden)return;this.thrust=bound(typeof amount==='boolean'?(amount?1:0):amount);const t=this.context.currentTime;this.thrustGain.gain.setTargetAtTime(this.thrust*.22,t,.07);if(this.thrustFilter)this.thrustFilter.frequency.setTargetAtTime(500+this.thrust*1000,t,.1);}
  dispose(){if(this.disposed)return;this.disposed=true;this.musicSource?.stop();this.thrustSource?.stop();for(const voice of this.voices){try{voice.stop();}catch{}}this.voices.clear();this.buffers.clear();this.context?.close().catch(()=>{});this.context=null;}
}
