// Original procedural audio score. No remote media; all voices start after a user gesture.
export class DriveAudio {
  constructor(){this.ctx=null;this.settings={music:.32,sfx:.6};this.active=false;this.lastBeat=-1;this.lastHit=-1;this.buffers={};this.voices=new Set();}
  async unlock(){
    if(!this.ctx){
      const AC=globalThis.AudioContext||globalThis.webkitAudioContext;if(!AC)return;
      const ctx=this.ctx=new AC();this.master=ctx.createGain();this.master.gain.value=.6;this.master.connect(ctx.destination);
      this.motor=ctx.createOscillator();this.motor.type='sawtooth';this.motor.frequency.value=45;
      this.filter=ctx.createBiquadFilter();this.filter.type='lowpass';this.filter.frequency.value=320;
      this.motorGain=ctx.createGain();this.motorGain.gain.value=0;this.motor.connect(this.filter).connect(this.motorGain).connect(this.master);this.motor.start();
      const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);const a=buf.getChannelData(0);let seed=7291;for(let i=0;i<a.length;i++){seed=(seed*16807)%2147483647;a[i]=(seed/2147483647*2-1)*.35;}
      this.noise=ctx.createBufferSource();this.noise.buffer=buf;this.noise.loop=true;this.tireFilter=ctx.createBiquadFilter();this.tireFilter.type='bandpass';this.tireFilter.frequency.value=1300;this.tireFilter.Q.value=3;
      this.tireGain=ctx.createGain();this.tireGain.gain.value=0;this.noise.connect(this.tireFilter).connect(this.tireGain).connect(this.master);this.noise.start();
      this.musicGain=ctx.createGain();this.musicGain.gain.value=0;this.musicGain.connect(this.master);
      this.loading=Promise.all(['music','click','impact','success'].map(async id=>{try{const res=await fetch(`./assets/audio/${id}.wav`);if(!res.ok)throw Error('Audio unavailable');this.buffers[id]=await ctx.decodeAudioData(await res.arrayBuffer());if(id==='music'){this.music=ctx.createBufferSource();this.music.buffer=this.buffers.music;this.music.loop=true;this.music.connect(this.musicGain);this.music.start();}}catch{/* Procedural voices remain available if an audio file is unavailable. */}}));
    }
    if(this.ctx.state==='suspended')await this.ctx.resume().catch(()=>{});
  }
  setOptions(settings){this.settings={...this.settings,...settings};}
  tone(freq,duration=.12,volume=.1,type='sine',bus='sfx'){
    if(!this.ctx||this.ctx.state!=='running')return;const c=this.ctx,t=c.currentTime;const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(volume*(this.settings[bus]??.5),t);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g).connect(this.master);o.start(t);o.stop(t+duration+.02);o.onended=()=>{o.disconnect();g.disconnect();};
  }
  play(id){if(!this.ctx||this.ctx.state!=='running'||!this.buffers[id])return false;if(this.voices.size>=4){const first=this.voices.values().next().value;first.stop();this.voices.delete(first);}const s=this.ctx.createBufferSource(),g=this.ctx.createGain();s.buffer=this.buffers[id];g.gain.value=this.settings.sfx;s.connect(g).connect(this.master);this.voices.add(s);s.onended=()=>{this.voices.delete(s);s.disconnect();g.disconnect();};s.start();return true;}
  click(){if(!this.play('click'))this.tone(660,.06,.09);}
  success(){if(!this.play('success'))[523.25,659.25,783.99].forEach((v,i)=>setTimeout(()=>{if(this.ctx?.state==='running')this.tone(v,.5,.12);},i*110));}
  pause(){this.active=false;if(this.ctx){this.motorGain.gain.setValueAtTime(0,this.ctx.currentTime);this.tireGain.gain.setValueAtTime(0,this.ctx.currentTime);this.ctx.suspend().catch(()=>{});}}
  update(state,running){
    const ctx=this.ctx;if(!ctx||ctx.state!=='running')return;const t=ctx.currentTime;this.active=running;
    const speed=Math.abs(state?.speed||0),sfx=this.settings.sfx;
    this.motor.frequency.setTargetAtTime(38+speed*3.1+Math.sin(t*8)*1.5,t,.08);this.filter.frequency.setTargetAtTime(250+speed*15,t,.08);
    this.motorGain.gain.setTargetAtTime(running?(0.04+speed*.001)*sfx:0,t,.03);
    this.tireGain.gain.setTargetAtTime(running&&state?.drifting?.valueOf()?(0.09+Math.min(.18,Math.abs(state.driftAngle||0)*.18))*sfx:0,t,.04);
    this.musicGain.gain.setTargetAtTime(running?this.settings.music:0,t,.06);
    if(running){const beat=Math.floor(t*2.6);if(!this.music&&beat!==this.lastBeat){this.lastBeat=beat;const notes=[55,55,82.406,65.406,55,73.416,82.406,65.406];this.tone(notes[beat%8],.32,.18,'triangle','music');}
      if(state.lastEvent?.type==='collision'&&state.lastEvent.id!==this.lastHit){this.lastHit=state.lastEvent.id;if(!this.play('impact'))this.tone(75,.18,.32,'triangle');}
    }
  }
  dispose(){this.motor?.stop();this.noise?.stop();this.music?.stop();for(const voice of this.voices)voice.stop();this.ctx?.close();this.ctx=null;}
}
