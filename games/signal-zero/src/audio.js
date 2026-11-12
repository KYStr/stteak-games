const CHORDS=[1,.75,.8909,.6674],SCALE=[110,0,165,220,0,164.81,146.83,0,110,0,196,220,0,146.83,164.81,0];
const CUES={...{jump:[260,.16,.12,'triangle',120],land:[70,.08,.1,'sine',-30],step:[95,.035,.025,'triangle',-40],hack:[660,.12,.1,'sine',220],objective:[520,.4,.15,'sine',260],packet:[880,.35,.12,'triangle',440],checkpoint:[330,.4,.12,'sine',330],tool:[180,.26,.12,'sawtooth',540],toolFail:[120,.12,.08,'square',-40],alert:[330,.35,.1,'triangle',-110],caught:[140,.6,.15,'sawtooth',-90],complete:[523,.7,.15,'sine',523],click:[440,.06,.08,'sine',100]},'tool-selected':[440,.08,.06,'sine',110],climb:[190,.12,.06,'triangle',90],'hack-start':[440,.12,.06,'sine',110],'hack-progress':[660,.08,.05,'sine',110]};
// Original procedural score: one transport, bounded voices, no external assets.
export class Sound{
 constructor(settings){this.settings=settings;this.context=null;this.voices=new Set();this.running=false;this.clock=0;this.beat=0;this.alert=0;this.generation=0;this.wantContext=false;this.disposed=false}
 // Every asynchronous resume belongs to one lifecycle generation.
 gesture(){
  if(this.disposed)return;this.generation++;this.wantContext=true;
  if(!this.context){const C=window.AudioContext||window.webkitAudioContext;if(!C)return;this.context=new C();this.master=this.context.createGain();this.master.gain.value=.55;this.master.connect(this.context.destination);this.applySettings()}
  this.resumeContext(this.generation);
 }
 async resumeContext(token){
  if(!this.context)return false;
  try{if(this.context.state==='suspended')await this.context.resume()}catch{return false}
  if(token!==this.generation||this.disposed){if(!this.wantContext)this.suspendContext();return false}
  return this.context.state==='running';
 }
 // Suspension itself is asynchronous too. If a later gesture/mission wins
 // the race, restore its requested running state when the old suspend settles.
 suspendContext(){
  if(!this.context)return;const token=this.generation;
  this.context.suspend().then(()=>{if(token!==this.generation&&this.wantContext&&!this.disposed)this.resumeContext(this.generation)}).catch(()=>{});
 }
 applySettings(){if(this.master)this.master.gain.setTargetAtTime(this.settings.muted?0:.55,this.context.currentTime,.025)}
 stopVoices(){for(const voice of this.voices){try{voice.stop()}catch{}}this.voices.clear()}
 setRunning(value){this.generation++;this.wantContext=value;this.running=value;this.clock=0;if(!this.context)return;if(value)this.resumeContext(this.generation);else{this.stopVoices();this.suspendContext()}}
 finishRun(type){
  const token=++this.generation;this.running=false;this.clock=0;this.stopVoices();
  if(!this.context||this.disposed)return;
  if(this.settings.muted||!(this.settings.sfx??.6)){this.wantContext=false;this.suspendContext();return}
  this.wantContext=true;
  const play=()=>{
   if(token!==this.generation||this.disposed)return;
   const a=CUES[type];if(!a)return;
   this.tone(a[0],a[1],a[2]*(this.settings.sfx??.6),a[3],a[4],()=>{
    if(token===this.generation){this.wantContext=false;this.suspendContext()}
   });
  };
  // The normal outcome path is synchronous; only an externally suspended
  // context waits for resume. No music is restarted on the result screen.
  if(this.context.state==='running')play();else return this.resumeContext(token).then(ready=>{if(ready)play()});
 }
 tone(freq,duration,volume,type='sine',slide=0,ended=null){if(this.settings.muted||!this.context||this.context.state!=='running'||this.voices.size>=12)return;const c=this.context,t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(20,freq+slide),t+duration);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(this.master);this.voices.add(o);o.onended=()=>{o.disconnect();g.disconnect();this.voices.delete(o);ended?.()};o.start();o.stop(t+duration+.03);return o}
 event(type){const v=this.settings.sfx??.6;if(!v)return;const a=CUES[type];if(a)this.tone(a[0],a[1],a[2]*v,a[3],a[4])}
 update(dt,alert){if(!this.running)return;this.clock+=dt;this.alert=alert;if(this.clock<.33)return;this.clock%=.33;const chord=CHORDS[Math.floor(this.beat/16)%4];const n=this.beat++%16,v=this.settings.music??.35;if(!v)return;if(SCALE[n])this.tone(SCALE[n]*chord,.65,.045*v,'sine');if(n%4===0)this.tone(55*chord,.4,.08*v,'triangle');if(alert>0&&n%2===0)this.tone(440+(n%4)*55,.09,.025*v,'triangle')}
 dispose(){this.disposed=true;this.setRunning(false);this.context?.close()}
}

