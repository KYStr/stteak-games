import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir=new URL('../../public/games/tidebound/assets/audio/',import.meta.url),src=new URL('../../assets/games/tidebound/sources/',import.meta.url);await mkdir(dir,{recursive:true});await mkdir(src,{recursive:true});
const rate=22050,tau=Math.PI*2;
let seed=777;const noise=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/2147483648-1;};
const envelope=(t,d)=>Math.min(1,t/.025)*Math.min(1,(d-t)/.12);
const notes=[261.63,329.63,392,523.25,440,392,329.63,293.66];
const recipes={
 waves:{duration:8,loop:true,sample:(t)=>noise()*.2*(.48+.3*Math.sin(t*tau/8))+.02*Math.sin(t*tau*65)},
 music:{duration:16,loop:true,sample:(t)=>{let v=0;for(let i=0;i<8;i++){const q=t-i*2;if(q>=0&&q<3.8)v+=Math.sin(q*tau*notes[i])*.17*Math.exp(-q*1.6)*Math.min(1,q/.03);}return v;}},
 sail:{duration:.7,sample:t=>noise()*.18*Math.sin(Math.PI*t/.7)+.05*Math.sin(t*tau*180)},
 dock:{duration:1.1,sample:t=>(Math.sin(t*tau*260)*.18*Math.exp(-t*6)+Math.sin(t*tau*390)*.12*Math.exp(-t*3))},
 discovery:{duration:1.8,sample:t=>[523.25,659.25,783.99].reduce((sum,f,i)=>{const q=t-i*.22;return sum+(q>=0?Math.sin(q*tau*f)*.17*Math.exp(-q*3)*Math.min(1,q/.02):0);},0)},
 danger:{duration:.7,sample:t=>Math.sin(t*tau*(150+30*Math.sin(t*20)))*.2*Math.exp(-t*3)+noise()*.1*Math.exp(-t*12)},
 gull:{duration:1.2,sample:t=>Math.sin(t*tau*(750+150*Math.sin(t*7)))*.1*Math.sin(Math.PI*t/1.2)**2}
};
const manifest=[];
const peakDb=b=>{let peak=0;for(let i=44;i<b.length;i+=2)peak=Math.max(peak,Math.abs(b.readInt16LE(i)));return Math.round(20*Math.log10(peak/32768)*100)/100;};
for(const [name,r] of Object.entries(recipes)){const count=Math.floor(rate*r.duration),b=Buffer.alloc(44+count*2);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(rate,24);b.writeUInt32LE(rate*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(count*2,40);for(let n=0;n<count;n++)b.writeInt16LE(Math.max(-32767,Math.min(32767,Math.round(r.sample(n/rate)*envelope(n/rate,r.duration)*32767))),44+n*2);await writeFile(new URL(`${name}.wav`,dir),b);await writeFile(new URL(`${name}.wav`,src),b);manifest.push({id:`tidebound.audio.${name}`,version:'1.0.0',kind:'audio',source:`sources/${name}.wav`,recipe:'../../../games/tidebound/generate-audio.mjs',runtime:[`assets/audio/${name}.wav`],sha256:{[`assets/audio/${name}.wav`]:createHash('sha256').update(b).digest('hex')},provenance:{method:'original-procedural',creator:'Tidebound Maker',createdAt:'2026-10-25',tool:'Node PCM synthesis',referenceSources:[],rights:'專案原創；無外部取樣'},spec:{sampleRate:rate,channels:1,format:'PCM16 WAV',duration:r.duration,loop:!!r.loop,loopPoints:r.loop?[0,count]:null,peakDbFS:peakDb(b)},budget:{runtimeBytes:b.length,maxSimultaneousInstances:r.loop?1:8},dependencies:[]});}
await writeFile(new URL('../../assets/games/tidebound/audio-manifest.json',import.meta.url),JSON.stringify(manifest,null,2));console.log('Generated 7 original sound assets.');
