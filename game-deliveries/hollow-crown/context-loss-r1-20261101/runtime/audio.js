const FILES=['camp','combat','boss','light','charge','hit','metal','stone','hurt','parry','dodge','death','win','loss','ui','warning'];
export class Soundscape {
  constructor(settings,onError){this.settings=settings;this.onError=onError;this.ctx=null;this.buffers=new Map();this.voices=[];this.track=null;this.theme='camp';this.active=false;this.failed=false;this.loading=null;this.activation=0;this.disposed=false;}
  async unlock(){
    if(this.disposed)return;
    if(!this.ctx){try{this.ctx=new (globalThis.AudioContext||globalThis.webkitAudioContext)();this.music=this.ctx.createGain();this.fx=this.ctx.createGain();this.music.connect(this.ctx.destination);this.fx.connect(this.ctx.destination);this.update(this.settings);}catch{this.failed=true;this.onError('這個瀏覽器無法啟動音訊；所有危險仍有視覺預警。');return;}}
    const activation=this.activation;
    try{await this.ctx.resume();}catch{return;}
    if(this.disposed||activation!==this.activation)return;
    this.active=true;
    if(!this.loading)this.loading=Promise.all(FILES.map(async name=>{
      const response=await fetch(new URL(`./assets/audio/${name}.wav`,import.meta.url));
      if(this.disposed)return;
      if(!response.ok)throw new Error(name);
      const bytes=await response.arrayBuffer();if(this.disposed)return;
      const buffer=await this.ctx.decodeAudioData(bytes);if(this.disposed)return;
      this.buffers.set(name,buffer);
    })).then(()=>{if(!this.disposed)this.playTheme();}).catch(()=>{if(this.disposed)return;this.failed=true;this.onError('部分聲音載入失敗；可在暫停選單重新載入頁面。');});
    await this.loading;if(!this.disposed)this.playTheme();
  }
  update(settings){this.settings=settings;if(this.ctx){this.music.gain.setTargetAtTime(settings.music*.7,this.ctx.currentTime,.04);this.fx.gain.setTargetAtTime(settings.effects,this.ctx.currentTime,.02);}}
  setTheme(theme){if(this.theme!==theme){this.theme=theme;this.stopTrack();}this.playTheme();}
  playTheme(){if(this.disposed||!this.ctx||!this.active||this.track||!this.buffers.has(this.theme))return;const s=this.ctx.createBufferSource();s.buffer=this.buffers.get(this.theme);s.loop=true;s.connect(this.music);s.start();this.track=s;}
  stopTrack(){if(this.track){try{this.track.stop();}catch{}this.track.disconnect();this.track=null;}}
  cue(type,material){if(type==='hit'&&material==='metal')type='metal';if(type==='hit'&&material==='stone')type='stone';if(type==='room-clear')type='win';if(!this.active||!this.ctx||!this.buffers.has(type))return;
    if(this.voices.length>=12){const old=this.voices.shift();try{old.stop();}catch{}}
    const s=this.ctx.createBufferSource();s.buffer=this.buffers.get(type);s.connect(this.fx);s.onended=()=>{s.disconnect();const i=this.voices.indexOf(s);if(i>=0)this.voices.splice(i,1);};this.voices.push(s);s.start();
  }
  // Invalidate pending activations; loading may still cache sounds while paused.
  pause(){this.activation++;this.active=false;this.stopTrack();for(const s of [...this.voices]){try{s.stop();}catch{}}this.voices=[];this.ctx?.suspend().catch(()=>{});}
  async resume(){if(this.disposed||!this.ctx)return;const activation=this.activation;try{await this.ctx.resume();if(this.disposed||activation!==this.activation)return;this.active=true;this.playTheme();}catch{}}
  metrics(){return{context:this.ctx?.state??'not-created',musicTracks:this.track?1:0,voices:this.voices.length,buffers:this.buffers.size};}
  dispose(){if(this.disposed)return;this.disposed=true;this.pause();this.ctx?.close().catch(()=>{});this.buffers.clear();}
}
