// Original deterministic additive/noise composition. No external recordings or samples.
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const root=new URL('../../../../',import.meta.url), output=new URL('public/games/hollow-crown/assets/audio/',root);
await mkdir(output,{recursive:true});
const rate=22050, TWO=Math.PI*2;let random=48273;
function noise(){random=(Math.imul(random,1664525)+1013904223)>>>0;return random/4294967296*2-1;}
function wav(samples){const b=Buffer.alloc(44+samples.length*2);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(rate,24);b.writeUInt32LE(rate*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(samples.length*2,40);samples.forEach((s,i)=>b.writeInt16LE(Math.max(-32767,Math.min(32767,Math.round(s*32767))),44+i*2));return b;}
const records=[];
async function save(id,samples,kind){const data=wav(samples),name=id+'.wav';await writeFile(new URL(name,output),data);records.push({id:'hollow-crown.audio.'+id,version:'1.0.0',kind,source:'audio/generate.mjs',runtime:['assets/audio/'+name],sha256:{['assets/audio/'+name]:createHash('sha256').update(data).digest('hex')},provenance:{method:'original-procedural',creator:'Hollow Crown Maker',createdAt:'2026-10-25',tool:'Node.js additive synthesis',rights:'Original project composition; no third-party samples',referenceSources:[]},spec:{sampleRate:rate,channels:1,format:'PCM16 WAV',duration:samples.length/rate,loop:kind==='music',peakTargetDb:-7},budget:{runtimeBytes:data.length,maxSimultaneousInstances:kind==='music'?1:12},dependencies:[]});}
const themes={camp:[110,146.832,164.814,130.813,110,196,164.814,146.832],combat:[110,110,130.813,146.832,164.814,146.832,130.813,98],boss:[82.407,98,110,123.471,82.407,110,98,73.416]};
for(const [id,notes] of Object.entries(themes)){
  const seconds=16,a=new Float32Array(rate*seconds);
  for(let i=0;i<a.length;i++){const t=i/rate,beat=Math.floor(t*2),within=t%0.5,n=notes[Math.floor(t)%notes.length];const swell=Math.sin(Math.PI*t/seconds)**2;const drone=(Math.sin(TWO*55*t)+.3*Math.sin(TWO*110*t))*.045;
    const chime=Math.sin(TWO*n*(id==='camp'?2:1)*t)*Math.exp(-within*(id==='camp'?7:12))*.08;
    const bass=id==='camp'?0:Math.sin(TWO*(id==='boss'?55:82.5)*within)*Math.exp(-within*15)*.07;
    const bell=(Math.sin(TWO*n*4*t)+.3*Math.sin(TWO*n*7*t))*Math.exp(-(t%2)*4)*.025;
    a[i]=(drone+chime+bass+bell)*swell;
  }await save(id,a,'music');
}
const cues={light:[.16,380,130,'air'],charge:[.65,110,440,'tone'],hit:[.2,170,50,'flesh'],metal:[.32,1100,300,'metal'],stone:[.2,230,60,'stone'],hurt:[.35,200,70,'flesh'],parry:[.45,650,1400,'metal'],dodge:[.2,200,90,'air'],death:[.7,190,40,'tone'],win:[1.4,330,660,'tone'],loss:[1,180,55,'tone'],ui:[.09,660,880,'tone'],warning:[.25,330,220,'metal']};
for(const [id,[duration,f0,f1,kind]] of Object.entries(cues)){
 const a=new Float32Array(Math.floor(rate*duration));let phase=0;for(let i=0;i<a.length;i++){const t=i/rate,u=t/duration,env=Math.min(1,t/.008)*Math.pow(1-u,2),f=f0+(f1-f0)*u;phase+=TWO*f/rate;const n=noise();a[i]=env*.28*(kind==='air'?n*.55:kind==='flesh'?.5*n+.5*Math.sin(phase):kind==='stone'?.6*n+.25*Math.sin(phase):kind==='metal'?.5*Math.sin(phase)+.3*Math.sin(phase*2.76)+.2*n:Math.sin(phase)+.15*Math.sin(phase*2));}await save(id,a,'sound');
}
await writeFile(new URL('assets/games/hollow-crown/audio-manifest.json',root),JSON.stringify({schemaVersion:1,assets:records},null,2)+'\n');
console.log(`Generated ${records.length} original audio assets / ${records.reduce((n,a)=>n+a.budget.runtimeBytes,0)} bytes.`);
