/** Moss & Moon original procedural audio project, 1.0.0.
 * Pure deterministic synthesis: no files, browser state, external samples or RNG.
 * renderAudioAssets() returns lossless mono PCM ready for encodeWav().
 */
export const AUDIO_VERSION='1.0.0';
export const AUDIO_SEED=0x4d4f5353;
export const AUDIO_PLAN=Object.freeze([
  {id:'music',file:'music-loop.wav',duration:16,sampleRate:22050,loop:true,crossfadeSeconds:.12,peakTarget:.34,recommendedGain:.35,maxVoices:1,cooldownMs:0,description:'Four bars of original C-major pentatonic plucked melody and soft suspended pads.'},
  {id:'ambient',file:'ambient-leaves.wav',duration:4,sampleRate:16000,loop:true,crossfadeSeconds:.15,peakTarget:.18,recommendedGain:.30,maxVoices:1,cooldownMs:0,description:'Seeded filtered wind and soft leaf brushes with a seamless overlap crossfade.'},
  {id:'plant',file:'sfx-plant.wav',duration:.28,sampleRate:16000,loop:false,peakTarget:.38,recommendedGain:.50,maxVoices:3,cooldownMs:80,description:'Two soft wooden/soil taps with a short rustling tail.'},
  {id:'water',file:'sfx-water.wav',duration:.65,sampleRate:16000,loop:false,peakTarget:.36,recommendedGain:.45,maxVoices:4,cooldownMs:120,description:'Quiet filtered pour with three descending, rounded water droplets.'},
  {id:'harvest',file:'sfx-harvest.wav',duration:.45,sampleRate:16000,loop:false,peakTarget:.42,recommendedGain:.50,maxVoices:3,cooldownMs:90,description:'A rising pentatonic three-note chime and a soft leaf brush.'},
  {id:'ui',file:'sfx-ui.wav',duration:.10,sampleRate:16000,loop:false,peakTarget:.26,recommendedGain:.25,maxVoices:2,cooldownMs:45,description:'A brief rounded wooden-key confirmation.'},
  {id:'success',file:'sfx-success.wav',duration:1.2,sampleRate:16000,loop:false,peakTarget:.44,recommendedGain:.45,maxVoices:1,cooldownMs:1000,description:'An original four-note pentatonic completion phrase.'}
]);

const TAU=Math.PI*2;
const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
const midi=n=>440*Math.pow(2,(n-69)/12);
const smooth=t=>{t=clamp(t);return t*t*(3-2*t);};
function rng(seed){let n=seed>>>0;return()=>{n^=n<<13;n^=n>>>17;n^=n<<5;return(n>>>0)/4294967296;};}
function addSample(buffer,index,value,period=0){if(period){index=((index%period)+period)%period;buffer[index]+=value;}else if(index>=0&&index<buffer.length)buffer[index]+=value;}

function addPluck(buffer,rate,start,length,note,gain,{period=0,soft=false,detune=1}={}){
  const first=Math.round(start*rate),count=Math.round(length*rate),frequency=midi(note)*detune;
  for(let i=0;i<count;i++){
    const t=i/rate,attack=smooth(t/.008),release=smooth((length-t)/.075),decay=Math.exp(-t/(soft?.52:.30));
    const phase=TAU*frequency*t;
    const tone=Math.sin(phase)+.16*Math.sin(phase*2.001)+.045*Math.sin(phase*3.006);
    addSample(buffer,first+i,tone*gain*attack*release*decay,period);
  }
}
function addPad(buffer,rate,start,length,notes,gain,period){
  const first=Math.round(start*rate),count=Math.round(length*rate);
  for(let i=0;i<count;i++){
    const t=i/rate,envelope=smooth(t/.65)*smooth((length-t)/1.1);
    let tone=0;
    for(let k=0;k<notes.length;k++){const frequency=midi(notes[k]);tone+=(Math.sin(TAU*frequency*t)+.12*Math.sin(TAU*frequency*2*t)+.12*Math.sin(TAU*frequency*1.003*t))/(notes.length*1.24);}
    addSample(buffer,first+i,tone*gain*envelope,period);
  }
}

/** A real overlap crossfade with unchanged final duration.
 * raw has periodLength + overlap samples. The first overlap joins the continuous
 * tail raw[periodLength...] to raw[0...]; the final sample then joins raw[N].
 * Raised cosine weights sum to one, avoiding the +3 dB correlated-signal bump.
 */
export function crossfadeLoop(raw,periodLength,overlap){
  if(raw.length<periodLength+overlap)throw new Error('Crossfade requires a continuous overlap tail');
  const result=raw.slice(0,periodLength);
  for(let i=0;i<overlap;i++){const weight=.5-.5*Math.cos(Math.PI*i/Math.max(1,overlap-1));result[i]=raw[periodLength+i]*(1-weight)+raw[i]*weight;}
  return result;
}
function music(plan){
  const rate=plan.sampleRate,period=Math.round(plan.duration*rate),overlap=Math.round(plan.crossfadeSeconds*rate),score=new Float32Array(period);
  const chords=[[48,55,60,64],[45,52,57,60],[50,57,62,64],[43,50,55,62]];
  chords.forEach((notes,bar)=>{
    addPad(score,rate,bar*4-.35,4.85,notes,.072,period);
    addPluck(score,rate,bar*4+.1,2.7,notes[0],.083,{period,soft:true});
    addPluck(score,rate,bar*4+2.1,2.2,notes[1],.048,{period,soft:true});
  });
  // Every melodic pitch belongs to C D E G A. Notes are deliberately sparse.
  const phrase=[
    [0.20,67],[.95,72],[1.7,69],[2.95,64],
    [4.2,69],[5.2,72],[6.2,76],[7.2,72],
    [8.2,74],[8.95,72],[10.2,69],[11.2,67],
    [12.2,67],[13.2,64],[14.2,62],[15.2,60]
  ];
  phrase.forEach(([at,note],i)=>addPluck(score,rate,at,2.25,note,.115-(i%3)*.008,{period,soft:true,detune:i%2?1.0004:1}));
  const dry=score.slice(),delayA=Math.round(.1875*rate),delayB=Math.round(.375*rate);
  for(let i=0;i<period;i++)score[i]+=dry[(i-delayA+period)%period]*.12+dry[(i-delayB+period)%period]*.06;
  const raw=new Float32Array(period+overlap);raw.set(score);raw.set(score.subarray(0,overlap),period);
  return crossfadeLoop(raw,period,overlap);
}
function ambient(plan,seed){
  const rate=plan.sampleRate,period=Math.round(plan.duration*rate),overlap=Math.round(plan.crossfadeSeconds*rate),raw=new Float32Array(period+overlap),random=rng(seed);
  let slow=0,fast=0,leafLow=0,leafHigh=0;
  // Warm filters before retaining audio so the first retained sample is settled.
  for(let i=-rate;i<raw.length;i++){
    const noise=random()*2-1;slow+=.025*(noise-slow);fast+=.12*(noise-fast);leafLow+=.16*(noise-leafLow);leafHigh+=.48*(noise-leafHigh);
    if(i<0)continue;
    const t=i/rate,gust=.56+.18*Math.sin(TAU*t/3.7)+.12*Math.sin(TAU*t/1.43+.8);
    const brush=.25+.5*Math.pow(.5+.5*Math.sin(TAU*t/1.17+1.1),4);
    raw[i]=(fast-slow)*gust*.55+(leafHigh-leafLow)*brush*.16;
  }
  return crossfadeLoop(raw,period,overlap);
}
function transient(plan,seed){
  const rate=plan.sampleRate,buffer=new Float32Array(Math.round(plan.duration*rate)),random=rng(seed);
  if(plan.id==='plant'){
    let low=0;for(let i=0;i<buffer.length;i++){const t=i/rate;low+=.15*((random()*2-1)-low);buffer[i]=low*.13*Math.exp(-t*16)*smooth(t/.004);}
    addPluck(buffer,rate,.008,.21,43,.25,{soft:false});addPluck(buffer,rate,.085,.18,38,.15,{soft:false});
  }else if(plan.id==='water'){
    let low=0,mid=0;for(let i=0;i<buffer.length;i++){const t=i/rate,n=random()*2-1;low+=.08*(n-low);mid+=.28*(n-mid);buffer[i]=(mid-low)*.09*smooth(t/.07)*smooth((plan.duration-t)/.2);}
    for(const [at,freq,gain]of[[.045,970,.11],[.19,760,.08],[.38,1120,.06]]){
      const start=Math.round(at*rate),length=Math.round(.21*rate);
      for(let j=0;j<length;j++){const t=j/rate,phase=TAU*(freq*t-650*t*t);addSample(buffer,start+j,Math.sin(phase)*gain*smooth(t/.004)*Math.exp(-t*25)*smooth((.21-t)/.035));}
    }
  }else if(plan.id==='harvest'){
    [76,79,84].forEach((note,i)=>addPluck(buffer,rate,.012+i*.055,.34,note,.13-i*.018));
    let low=0;for(let i=0;i<buffer.length;i++){low+=.18*((random()*2-1)-low);const t=i/rate;buffer[i]+=low*.025*Math.exp(-t*16)*smooth(t/.005);}
  }else if(plan.id==='ui')addPluck(buffer,rate,.001,.098,76,.18);
  else if(plan.id==='success')[72,76,79,84].forEach((note,i)=>addPluck(buffer,rate,[0,.12,.24,.42][i],.75,note,.14-i*.009,{soft:true}));
  // Event samples start and end at silence, even when rapidly retriggered.
  const fadeIn=Math.round(rate*.003),fadeOut=Math.round(rate*.025);
  for(let i=0;i<buffer.length;i++)buffer[i]*=smooth(i/fadeIn)*smooth((buffer.length-1-i)/fadeOut);
  return buffer;
}
function master(samples,target){
  let sum=0;for(const sample of samples)sum+=sample;
  const dc=sum/samples.length;let peak=0;
  for(let i=0;i<samples.length;i++){samples[i]-=dc;peak=Math.max(peak,Math.abs(samples[i]));}
  const gain=peak?target/peak:1;for(let i=0;i<samples.length;i++)samples[i]*=gain;
  return samples;
}
export function describePcm(samples,sampleRate){
  let peak=0,sum=0,squares=0,maxStep=0;for(let i=0;i<samples.length;i++){const value=samples[i];peak=Math.max(peak,Math.abs(value));sum+=value;squares+=value*value;if(i)maxStep=Math.max(maxStep,Math.abs(value-samples[i-1]));}
  const rms=Math.sqrt(squares/samples.length);return{sampleCount:samples.length,durationSeconds:samples.length/sampleRate,peak:+peak.toFixed(7),peakDbfs:+(20*Math.log10(Math.max(peak,1e-12))).toFixed(2),rms:+rms.toFixed(7),rmsDbfs:+(20*Math.log10(Math.max(rms,1e-12))).toFixed(2),dcOffset:+(sum/samples.length).toFixed(9),seamStep:+Math.abs(samples[0]-samples.at(-1)).toFixed(7),maxAdjacentStep:+maxStep.toFixed(7)};
}
export function getAudioPlan(){return AUDIO_PLAN.map(plan=>({...plan,channels:1,bitDepth:16,sampleCount:Math.round(plan.duration*plan.sampleRate),expectedWavBytes:44+Math.round(plan.duration*plan.sampleRate)*2}));}
export function renderAudioAssets({seed=AUDIO_SEED}={}){
  return AUDIO_PLAN.map((plan,index)=>{
    const assetSeed=(seed+Math.imul(index+1,0x9e3779b9))>>>0;
    let samples=plan.id==='music'?music(plan):plan.id==='ambient'?ambient(plan,assetSeed):transient(plan,assetSeed);
    samples=master(samples,plan.peakTarget);
    // Removing DC can move a transient's endpoint; restore only the last/first
    // 3 ms smoothly after mastering. Periodic clips keep their crossfaded seam.
    if(!plan.loop){const edge=Math.max(1,Math.round(plan.sampleRate*.003));for(let i=0;i<edge;i++){const gain=smooth(i/edge);samples[i]*=gain;samples[samples.length-1-i]*=gain;}samples[0]=0;samples[samples.length-1]=0;}
    return {...plan,seed:assetSeed,channels:1,bitDepth:16,samples,loopStart:plan.loop?0:null,loopEnd:plan.loop?samples.length/plan.sampleRate:null,stats:describePcm(samples,plan.sampleRate)};
  });
}
export function encodeWav(samples,sampleRate){
  const buffer=new ArrayBuffer(44+samples.length*2),view=new DataView(buffer);
  const text=(offset,value)=>{for(let i=0;i<value.length;i++)view.setUint8(offset+i,value.charCodeAt(i));};
  text(0,'RIFF');view.setUint32(4,buffer.byteLength-8,true);text(8,'WAVE');text(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,sampleRate,true);view.setUint32(28,sampleRate*2,true);view.setUint16(32,2,true);view.setUint16(34,16,true);text(36,'data');view.setUint32(40,samples.length*2,true);
  for(let i=0;i<samples.length;i++)view.setInt16(44+i*2,Math.round(clamp(samples[i],-1,1)*32767),true);
  return new Uint8Array(buffer);
}
