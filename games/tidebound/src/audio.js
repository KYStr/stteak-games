// Original Tidebound sound design. All sources are local, gesture gated, and bounded.
export class SeaAudio {
  constructor(){this.ctx=null;this.buffers={};this.voices=new Set();this.loops=[];this.last=new Map();this.prefs={music:.35,sfx:.65};this.active=false;this.ambient=false;this.disposed=false;this.resumePending=null;}
  async unlock(){
    if(this.disposed)return;
    if(!this.ctx){
      const Context=window.AudioContext||window.webkitAudioContext;if(!Context)throw new Error('Web Audio unavailable');
      this.ctx=new Context();
      this.master=this.ctx.createGain();this.master.gain.value=.75;this.master.connect(this.ctx.destination);
      this.music=this.ctx.createGain();this.effects=this.ctx.createGain();this.music.connect(this.master);this.effects.connect(this.master);
      this.ctx.onstatechange=()=>{if(this.active&&this.ctx.state==='suspended')this.resume();};
    }
    if(!this.pending){
      this.pending=Promise.all(['waves','music','sail','dock','discovery','danger','gull'].map(async name=>{
        if(this.buffers[name])return;
        const response=await fetch(new URL(`./assets/audio/${name}.wav`,location.href));if(!response.ok)throw new Error('音訊載入失敗');
        const buffer=await this.ctx.decodeAudioData(await response.arrayBuffer());if(!this.disposed)this.buffers[name]=buffer;
      })).catch(error=>{this.pending=null;throw error;});
    }
    await this.ctx.resume();await this.pending;if(this.disposed)return;this.setPrefs(this.prefs);this.setActive(this.active,this.ambient);
  }
  resume(){
    if(!this.ctx||this.ctx.state==='closed'||this.ctx.state==='running'||this.resumePending)return;
    this.resumePending=this.ctx.resume().catch(()=>{}).finally(()=>{this.resumePending=null;});
  }
  setPrefs(p){this.prefs={music:Math.max(0,Math.min(1,Number(p.music)||0)),sfx:Math.max(0,Math.min(1,Number(p.sfx)||0))};if(this.ctx){this.music.gain.setTargetAtTime(this.prefs.music*.32,this.ctx.currentTime,.03);this.effects.gain.setTargetAtTime(this.prefs.sfx*.42,this.ctx.currentTime,.03);}}
  setActive(active,ambient=active){
    this.active=active;this.ambient=ambient;if(!this.ctx||this.disposed)return;
    if(active)this.resume();
    // Harbour also has music; waves follow sailing and diving.
    for(const name of ['waves','music']){
      const wanted=active&&(name==='music'||ambient)&&this.buffers[name];const existing=this.loops.find(s=>s.sound===name);
      if(wanted&&!existing){const s=this.ctx.createBufferSource();s.sound=name;s.buffer=this.buffers[name];s.loop=true;s.connect(name==='music'?this.music:this.effects);s.start();this.loops.push(s);}
      if(!wanted&&existing){try{existing.stop();}catch{}existing.disconnect();this.loops=this.loops.filter(s=>s!==existing);}
    }
    if(!active){for(const s of this.voices){try{s.stop();}catch{}s.disconnect();}this.voices.clear();}
  }
  play(name){if(!this.ctx||!this.active||!this.buffers[name]||this.voices.size>=8||this.disposed)return;this.resume();const now=this.ctx.currentTime;if(now-(this.last.get(name)??-10)<.15)return;this.last.set(name,now);const s=this.ctx.createBufferSource();s.buffer=this.buffers[name];s.connect(this.effects);this.voices.add(s);s.onended=()=>{this.voices.delete(s);s.disconnect();};s.start();}
  dispose(){this.setActive(false);this.disposed=true;if(this.ctx)this.ctx.onstatechange=null;this.music?.disconnect();this.effects?.disconnect();this.master?.disconnect();this.ctx?.close().catch(()=>{});}
  stats(){return{context:this.ctx?.state??'locked',loops:this.loops.length,voices:this.voices.size,loaded:Object.keys(this.buffers).length,music:this.prefs.music,sfx:this.prefs.sfx};}
}
