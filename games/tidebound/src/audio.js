// Original Tidebound sound design. Voices are finite, de-duplicated and gesture gated.
export class SeaAudio {
  constructor(){this.ctx=null;this.buffers={};this.voices=new Set();this.loops=[];this.last=new Map();this.prefs={music:.35,sfx:.65};this.active=false;this.ambient=false;}
  async unlock(){
    if(!this.ctx){
      this.ctx=new (window.AudioContext||window.webkitAudioContext)();
      this.master=this.ctx.createGain();this.master.gain.value=.75;this.master.connect(this.ctx.destination);
      this.music=this.ctx.createGain();this.effects=this.ctx.createGain();this.music.connect(this.master);this.effects.connect(this.master);
      this.pending=Promise.all(['waves','music','sail','dock','discovery','danger','gull'].map(async name=>{
        const response=await fetch(new URL(`./assets/audio/${name}.wav`,location.href));if(!response.ok)throw new Error('音訊載入失敗');this.buffers[name]=await this.ctx.decodeAudioData(await response.arrayBuffer());
      }));
    }
    await this.ctx.resume();await this.pending;this.setPrefs(this.prefs);this.setActive(this.active,this.ambient);
  }
  setPrefs(p){this.prefs=p;if(this.ctx){this.music.gain.value=p.music*.32;this.effects.gain.value=p.sfx*.42;}}
  setActive(active,ambient=active){this.active=active;this.ambient=ambient;if(!this.ctx||!this.buffers.waves)return;if(active&&ambient&&this.loops.length===0){for(const name of ['waves','music']){const s=this.ctx.createBufferSource();s.buffer=this.buffers[name];s.loop=true;s.connect(name==='music'?this.music:this.effects);s.start();this.loops.push(s);}}else if(!active||!ambient){this.loops.forEach(s=>{s.stop();s.disconnect();});this.loops=[];}if(!active){for(const s of this.voices){try{s.stop();}catch{}s.disconnect();}this.voices.clear();}}
  play(name){if(!this.ctx||!this.active||!this.buffers[name]||this.voices.size>=8)return;const now=this.ctx.currentTime;if(now-(this.last.get(name)??-10)<.15)return;this.last.set(name,now);const s=this.ctx.createBufferSource();s.buffer=this.buffers[name];s.connect(this.effects);this.voices.add(s);s.onended=()=>{this.voices.delete(s);s.disconnect();};s.start();}
  dispose(){this.setActive(false);this.music?.disconnect();this.effects?.disconnect();this.master?.disconnect();this.ctx?.close();}
  stats(){return{context:this.ctx?.state??'locked',loops:this.loops.length,voices:this.voices.size};}
}
