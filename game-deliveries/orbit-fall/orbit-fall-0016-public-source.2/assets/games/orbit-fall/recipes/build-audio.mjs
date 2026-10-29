import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import crypto from 'node:crypto';
import {SAMPLE_RATE,SOUND_SPECS,synthesize,pcmWav} from '../sources/sound-synthesis.mjs';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../../../..'),out=path.join(root,'public/games/orbit-fall'),entries=[];
await fs.mkdir(path.join(out,'assets/audio'),{recursive:true});
await fs.copyFile(path.resolve(here,'../sources/audio-source.js'),path.join(out,'audio.js'));
for(const [name,spec]of Object.entries(SOUND_SPECS)){const samples=synthesize(name),wav=pcmWav(samples),file=`assets/audio/${name}.wav`;await fs.writeFile(path.join(out,file),wav);let peak=0,rms=0;for(const v of samples){peak=Math.max(peak,Math.abs(v));rms+=v*v;}rms=Math.sqrt(rms/samples.length);
  entries.push({id:`orbit-fall.audio.${name}`,version:'1.0.0',kind:spec.loop?'music-or-loop':'sound-effect',source:'sources/sound-synthesis.mjs',runtime:[file],sha256:{[file]:crypto.createHash('sha256').update(wav).digest('hex')},provenance:{method:'original-procedural',creator:'Orbit / Fall asset maker',createdAt:'2026-10-25',tool:'Retained deterministic PCM synthesis score, Node.js',promptRecord:'generation/design-record.md',referenceSources:[],rights:'Original synthesis and composition for stteak. No external recordings, samples, or music.'},spec:{sampleRate:SAMPLE_RATE,channels:1,bitDepth:16,format:'PCM WAV',duration:spec.duration,loop:!!spec.loop,loopPoints:spec.loop?[0,samples.length]:null,peakDbFS:20*Math.log10(peak),rmsDbFS:20*Math.log10(rms),loopBoundaryDifference:spec.loop?Math.abs(samples[0]-samples[samples.length-1]):null,use:spec.use},budget:{runtimeBytes:wav.length,decodedBytes:samples.byteLength,maxSimultaneousVoices:16},dependencies:[],derivatives:[]});
}
const engine=await fs.readFile(path.join(out,'audio.js'));
entries.push({id:'orbit-fall.runtime.audio-engine',version:'1.0.1',kind:'runtime-code',source:'sources/audio-source.js',runtime:['audio.js'],sha256:{'audio.js':crypto.createHash('sha256').update(engine).digest('hex')},provenance:{method:'original-procedural',creator:'Orbit / Fall asset maker',createdAt:'2026-10-25',tool:'Retained ES module',referenceSources:[],rights:'Original sound engine for stteak'},spec:{format:'ES module',contract:'User-gesture unlock; paused menus mute music/thrust but allow signal/ending/fail/success/click; hidden documents suspend AudioContext'},budget:{runtimeBytes:engine.length},dependencies:[],derivatives:[]});
const file=path.resolve(here,'../manifest.json');const manifest=JSON.parse(await fs.readFile(file,'utf8'));manifest.assets=manifest.assets.filter(x=>!x.id.startsWith('orbit-fall.audio.')&&x.id!=='orbit-fall.runtime.audio-engine').concat(entries);
for(const a of manifest.assets)for(const p of a.runtime){const b=await fs.readFile(path.join(out,p));a.sha256[p]=crypto.createHash('sha256').update(b).digest('hex');}
await fs.writeFile(file,JSON.stringify(manifest,null,2)+'\n');await fs.writeFile(path.join(out,'assets/data/audio-catalog.json'),JSON.stringify({schemaVersion:1,assets:entries.filter(x=>x.kind!=='runtime-code').map(x=>({id:x.id,runtime:x.runtime,spec:x.spec,budget:x.budget}))},null,2)+'\n');
console.log(`Built ${entries.length-1} original PCM tracks and audio runtime; ${entries.reduce((s,x)=>s+x.budget.runtimeBytes,0)} bytes.`);
