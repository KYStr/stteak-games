/** Original deterministic sound-design source, CC0-1.0. Requires only Node built-ins. */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

const directory=path.dirname(fileURLToPath(import.meta.url));
const project=JSON.parse(await readFile(path.join(directory,'sound-project.json'),'utf8'));
const runtime=path.resolve(directory,'../../../../public/games/dust-redemption/assets/audio');
const originals=path.join(directory,'wav');
await mkdir(originals,{recursive:true});await mkdir(runtime,{recursive:true});
const rate=project.sampleRate,tau=Math.PI*2;
function random(seed){let state=seed>>>0;return ()=>{state^=state<<13;state^=state>>>17;state^=state<<5;return ((state>>>0)/4294967295)*2-1;};}
const pulse=(t,start,decay)=>t<start?0:Math.exp(-(t-start)/decay);
const attack=(t,duration=.002)=>Math.min(1,Math.max(0,t/duration));
const sine=(t,f)=>Math.sin(tau*t*f);
function synthesize(effect,index){
  const count=Math.ceil(effect.duration*rate),samples=new Float64Array(count),noise=random(project.seed+index*9109);
  let low=0,previous=0;
  for(let i=0;i<count;i++){
    const t=i/rate,n=noise();low+=.13*(n-low);const high=n-previous;previous=n;
    let v=0;
    switch(effect.id){
      case 'revolver': v=.75*n*pulse(t,0,.045)+.38*sine(t,82)*pulse(t,0,.09)+.18*high*pulse(t,0,.009)+.1*sine(t,1580)*pulse(t,.018,.024)+.13*low*pulse(t,0,.13);break;
      case 'rifle': v=.85*high*pulse(t,0,.019)+.34*sine(t,118)*pulse(t,0,.058)+.2*n*pulse(t,.025,.046)+.1*sine(t,2340)*pulse(t,.012,.018);break;
      case 'enemy': v=.7*low*pulse(t,0,.064)+.2*sine(t,94)*pulse(t,0,.067)+.13*n*pulse(t,0,.012);break;
      case 'stone': v=.58*high*pulse(t,0,.015)+.24*sine(t,1800)*pulse(t,0,.018)+.18*n*pulse(t,.04,.012)+.11*n*pulse(t,.075,.01)+.06*n*pulse(t,.11,.012);break;
      case 'hit': v=.65*low*pulse(t,0,.025)+.2*sine(t,138)*pulse(t,0,.036);break;
      case 'hurt': v=.45*low*pulse(t,0,.095)+.17*Math.sin(tau*(90*t-45*t*t))*pulse(t,0,.14);break;
      case 'reload': v=.48*high*pulse(t,.008,.008)+.32*high*pulse(t,.155,.011)+.4*high*pulse(t,.32,.009)+.12*sine(t,1450)*pulse(t,.008,.02)+.1*sine(t,2100)*pulse(t,.155,.03)+.1*n*pulse(t,.34,.035);break;
      case 'step': v=.75*low*pulse(t,0,.036)+.24*sine(t,64)*pulse(t,0,.032)+.12*high*pulse(t,.02,.027);break;
      case 'warning': {const local=t<.2?t:t-.23;v=local>=0&&local<.2?.5*Math.sin(tau*(560*local+900*local*local))*Math.sin(Math.PI*local/.2):0;break;}
      case 'success': v=[220,329.63,493.88].reduce((sum,f,j)=>{const local=t-j*.08;return sum+(local>=0?.24*(sine(local,f)+.12*sine(local,f*2))*pulse(t,j*.08,.2)*attack(local,.006):0);},0);break;
      case 'ui': v=.5*sine(t,620)*pulse(t,0,.025)+.14*high*pulse(t,0,.007);break;
      default:throw new Error(`Unknown authored effect: ${effect.id}`);
    }
    // Deterministic two-ms attack and last 12-ms release avoid clicks at buffer boundaries.
    const release=Math.min(1,(count-i-1)/(rate*.012));
    samples[i]=v*attack(t)*Math.max(0,release);
  }
  const mean=samples.reduce((sum,value)=>sum+value,0)/count;
  let peak=0;for(let i=0;i<count;i++){samples[i]-=mean;peak=Math.max(peak,Math.abs(samples[i]));}
  const scale=project.targetPeak/Math.max(peak,1e-6);let squared=0,max=0;
  const pcm=Buffer.alloc(count*2);
  for(let i=0;i<count;i++){
    const value=Math.max(-32767,Math.min(32767,Math.round(samples[i]*scale*32767)));
    pcm.writeInt16LE(value,i*2);squared+=(value/32768)**2;max=Math.max(max,Math.abs(value/32768));
  }
  return {pcm,peak:max,rms:Math.sqrt(squared/count),frames:count};
}
function wav(pcm){
  const header=Buffer.alloc(44);header.write('RIFF');header.writeUInt32LE(36+pcm.length,4);header.write('WAVE',8);header.write('fmt ',12);
  header.writeUInt32LE(16,16);header.writeUInt16LE(1,20);header.writeUInt16LE(1,22);header.writeUInt32LE(rate,24);header.writeUInt32LE(rate*2,28);
  header.writeUInt16LE(2,32);header.writeUInt16LE(16,34);header.write('data',36);header.writeUInt32LE(pcm.length,40);return Buffer.concat([header,pcm]);
}
const files=[];
for(let index=0;index<project.effects.length;index++){
  const effect=project.effects[index],sound=synthesize(effect,index),bytes=wav(sound.pcm),file=`${effect.id}.wav`;
  await writeFile(path.join(originals,file),bytes);await writeFile(path.join(runtime,file),bytes);
  files.push({id:effect.id,file,source:`wav/${file}`,runtime:`public/games/dust-redemption/assets/audio/${file}`,bytes:bytes.length,
    durationSeconds:sound.frames/rate,sampleRate:rate,channels:1,bitsPerSample:16,peak:Number(sound.peak.toFixed(6)),peakDbfs:Number((20*Math.log10(sound.peak)).toFixed(3)),
    rms:Number(sound.rms.toFixed(6)),clippedSamples:0,sha256:createHash('sha256').update(bytes).digest('hex'),design:effect.design,license:'CC0-1.0'});
}
const manifest={schemaVersion:1,title:project.title,origin:'Original deterministic synthesis. No external audio or sampled recordings.',license:'CC0-1.0',
  generator:'assets/games/dust-redemption/audio/generate.mjs',project:'assets/games/dust-redemption/audio/sound-project.json',
  reproduction:'node assets/games/dust-redemption/audio/generate.mjs',music:project.music,effects:files,
  verification:{method:'PCM16 header/sample inspection, source-runtime SHA-256 comparison, no clipping; no listening test claimed.',maximumPeak:Math.max(...files.map(f=>f.peak)),effectCount:files.length}};
const json=JSON.stringify(manifest,null,2)+'\n';await writeFile(path.join(directory,'manifest.json'),json);await writeFile(path.join(runtime,'manifest.json'),json);
console.log(JSON.stringify({effects:files.length,source:originals,runtime,totalBytes:files.reduce((sum,file)=>sum+file.bytes,0),maxPeak:manifest.verification.maximumPeak},null,2));
