// Original Aetherwake audio score and synthesis. Context opens only from unlock(),
// called by the host inside a user gesture. No timers continue while paused.
const EVENTS = Object.freeze({
  glide:{notes:[392,587.33,783.99],duration:.3,type:'triangle',gain:.18},
  tailwind:{notes:[293.66,440,587.33],duration:.45,type:'sine',gain:.13},
  energy:{notes:[220,196],duration:.16,type:'triangle',gain:.13},
  land:{notes:[98,146.83,196],duration:.22,type:'sine',gain:.22},
  stall:{notes:[293.66,220,146.83],duration:.2,type:'triangle',gain:.15},
  unlock:{notes:[293.66,369.99,440,587.33,739.99],duration:.19,type:'sine',gain:.2},
  ui:{notes:[587.33],duration:.07,type:'sine',gain:.09},
  relic:{notes:[440,587.33,880],duration:.15,type:'sine',gain:.17},
  finish:{notes:[293.66,369.99,440,587.33,739.99,880],duration:.25,type:'sine',gain:.2},
});
const ALIAS={deploy:'glide',sail:'glide',open:'glide',wind:'tailwind',low:'energy',lowEnergy:'energy',exhausted:'energy',landing:'land',fail:'stall',respawn:'stall',station:'unlock',interact:'ui',collect:'relic',complete:'finish'};
const clamp=(n,min,max)=>Math.min(max,Math.max(min,Number.isFinite(n)?n:min));

export class AudioEngine {
  constructor(){this.context=null;this.musicVolume=.55;this.sfxVolume=.7;this.paused=false;this.active=new Set();this.lastEvent=new Map();this.musicTime=0;this.nextNote=0;this.noteIndex=0;this.windFilter=null;this.windGain=null;this.disposed=false;this.sampleBuffers=new Map();this.sampleFailed=false;this.stats={peakVoices:0,events:0,maxVoices:20};}
  async unlock(){
    if(this.disposed)return false;
    const Constructor=globalThis.AudioContext||globalThis.webkitAudioContext;if(!Constructor)return false;
    if(!this.context){
      this.context=new Constructor();const ctx=this.context;
      this.master=ctx.createGain();this.master.gain.value=.6;this.master.connect(ctx.destination);
      this.musicBus=ctx.createGain();this.sfxBus=ctx.createGain();this.musicBus.gain.value=this.musicVolume;this.sfxBus.gain.value=this.sfxVolume;this.musicBus.connect(this.master);this.sfxBus.connect(this.master);
      // Air is deterministic band-passed noise; a repeating buffer crossfades at
      // its endpoints, while filter and gain respond smoothly to flight state.
      const count=ctx.sampleRate*4,buffer=ctx.createBuffer(1,count,ctx.sampleRate),data=buffer.getChannelData(0);let seed=72429,previous=0;
      for(let i=0;i<count;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const w=(seed/4294967296)*2-1;previous=.985*previous+.015*w;data[i]=previous*4*Math.min(1,i/512,(count-1-i)/512);}
      this.air=ctx.createBufferSource();this.air.buffer=buffer;this.air.loop=true;this.windFilter=ctx.createBiquadFilter();this.windFilter.type='lowpass';this.windFilter.frequency.value=450;this.windGain=ctx.createGain();this.windGain.gain.value=.12;this.air.connect(this.windFilter);this.windFilter.connect(this.windGain);this.windGain.connect(this.musicBus);this.air.start();
      // Runtime WAVs are original rendered samples from the retained recipe.
      // Synthesis remains a complete fallback if offline loading is unavailable.
      this.loadSamples();
    }
    if(!this.paused&&this.context.state==='suspended')await this.context.resume();return this.context.state==='running';
  }
  async loadSamples(){
    try{await Promise.all(['glide','land','stall','unlock','ui','relic'].map(async name=>{const response=await fetch(new URL(`./assets/audio/${name}.wav`,document.baseURI));if(!response.ok)throw new Error(`audio ${name}: ${response.status}`);const buffer=await this.context.decodeAudioData(await response.arrayBuffer());if(!this.disposed)this.sampleBuffers.set(name,buffer);}));}catch{this.sampleFailed=true;}
  }
  setVolumes({music=this.musicVolume,sfx=this.sfxVolume}={}){this.musicVolume=clamp(Number(music),0,1);this.sfxVolume=clamp(Number(sfx),0,1);if(this.context){const t=this.context.currentTime;this.musicBus.gain.setTargetAtTime(this.musicVolume,t,.035);this.sfxBus.gain.setTargetAtTime(this.sfxVolume,t,.035);}}
  setPaused(value){this.paused=Boolean(value);if(!this.context||this.disposed)return; if(this.paused){this.context.suspend().catch(()=>{});}else if(this.context.state==='suspended'){this.nextNote=this.context.currentTime+.1;this.context.resume().catch(()=>{});}}
  register(source){if(this.active.size>=this.stats.maxVoices){const oldest=this.active.values().next().value;try{oldest.stop();}catch{}this.active.delete(oldest);}this.active.add(source);this.stats.peakVoices=Math.max(this.stats.peakVoices,this.active.size);source.onended=()=>{this.active.delete(source);try{source.disconnect();}catch{}};}
  tone(frequency,start,duration,type,gain,bus){const ctx=this.context,osc=ctx.createOscillator(),env=ctx.createGain();osc.type=type;osc.frequency.setValueAtTime(frequency,start);env.gain.setValueAtTime(.0001,start);env.gain.exponentialRampToValueAtTime(Math.max(.0001,gain),start+.015);env.gain.exponentialRampToValueAtTime(.0001,start+duration);osc.connect(env);env.connect(bus);this.register(osc);const oldEnd=osc.onended;osc.onended=()=>{oldEnd();env.disconnect();};osc.start(start);osc.stop(start+duration+.02);}
  play(event){if(!this.context||this.context.state!=='running'||this.paused||this.disposed)return;const name=ALIAS[event]||event,setting=EVENTS[name];if(!setting)return;const now=this.context.currentTime,last=this.lastEvent.get(name)??-Infinity,cooldown=name==='energy'?1.6:name==='tailwind'?1.0:.08;if(now-last<cooldown)return;this.lastEvent.set(name,now);this.stats.events++;
    const sample=this.sampleBuffers.get(name);if(sample){const source=this.context.createBufferSource(),env=this.context.createGain();source.buffer=sample;env.gain.value=.6;source.connect(env);env.connect(this.sfxBus);this.register(source);const oldEnd=source.onended;source.onended=()=>{oldEnd();env.disconnect();};source.start();return;}
    setting.notes.forEach((note,i)=>this.tone(note,now+i*setting.duration*.58,setting.duration,setting.type,setting.gain,this.sfxBus));
  }
  update({speed=0,energy=100,wind=0,dt=1/60}={}){if(!this.context||this.context.state!=='running'||this.paused||this.disposed)return;const ctx=this.context,now=ctx.currentTime;const w=typeof wind==='number'?wind:wind?1:0;this.windFilter.frequency.setTargetAtTime(360+clamp(speed,0,30)*28+clamp(w,0,2)*190,now,.2);this.windGain.gain.setTargetAtTime(.07+clamp(speed,0,30)*.007+clamp(w,0,2)*.07,now,.2);if(energy<18&&energy>0)this.play('energy');
    // Original 16-beat D pentatonic phrase. Sparse voicing leaves space for wind.
    const melody=[293.66,0,440,369.99,587.33,0,440,0,329.63,0,493.88,440,369.99,0,293.66,0];
    if(this.nextNote<now-.5)this.nextNote=now+.06;
    if(this.nextNote<=now+.13){const i=this.noteIndex%melody.length,note=melody[i];if(note)this.tone(note,this.nextNote,1.75,'sine',.065,this.musicBus);if(i%4===0)this.tone(i<8?146.83:164.81,this.nextNote,3.3,'triangle',.028,this.musicBus);this.nextNote+=.8;this.noteIndex++;}
    this.musicTime+=clamp(dt,0,.1);
  }
  async dispose(){if(this.disposed)return;this.disposed=true;for(const voice of this.active){try{voice.stop();voice.disconnect();}catch{}}this.active.clear();if(this.air){try{this.air.stop();this.air.disconnect();}catch{}}this.sampleBuffers.clear();if(this.context&&this.context.state!=='closed')await this.context.close();this.context=null;}
}
export const AUDIO_EVENT_RECIPES=EVENTS;
