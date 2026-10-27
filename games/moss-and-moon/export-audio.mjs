import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import {AUDIO_VERSION,AUDIO_SEED,getAudioPlan,renderAudioAssets,encodeWav} from '../../assets/games/moss-and-moon/sources/audio-kit.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const sourceRoot=path.join(root,'assets/games/moss-and-moon');
const runtimeRoot=path.join(root,'public/games/moss-and-moon');
const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
const sourcePath='sources/audio-kit.mjs';
const sourceBytes=await readFile(path.join(sourceRoot,sourcePath));
const plan=getAudioPlan(),plannedTotal=plan.reduce((total,a)=>total+a.expectedWavBytes,0);
assert(plannedTotal<=1_000_000,'Audio plan exceeds the 1 MB runtime budget');
const rendered=renderAudioAssets(),files=[];
for(const asset of rendered){
  const bytes=Buffer.from(encodeWav(asset.samples,asset.sampleRate));
  const expected=plan.find(item=>item.id===asset.id);
  assert.equal(bytes.length,expected.expectedWavBytes);assert.equal(asset.stats.durationSeconds,asset.duration);
  assert(asset.samples.every(Number.isFinite),'Non-finite PCM');assert(asset.stats.peak<.99,'Clipping risk');
  assert.equal(bytes.readUInt16LE(22),1);assert.equal(bytes.readUInt32LE(24),asset.sampleRate);assert.equal(bytes.readUInt32LE(40),asset.samples.length*2);
  if(!asset.loop){assert.equal(asset.samples[0],0);assert.equal(asset.samples.at(-1),0);}
  else assert(asset.stats.seamStep<=asset.stats.maxAdjacentStep*1.25+.00001,'Unexpected loop discontinuity');
  files.push({asset,bytes});
}
const total=files.reduce((sum,file)=>sum+file.bytes.length,0);assert.equal(total,plannedTotal);
// All synthesis and validation finish before any runtime file is changed.
await mkdir(path.join(runtimeRoot,'assets/audio'),{recursive:true});
await mkdir(path.join(runtimeRoot,'assets/data'),{recursive:true});
await mkdir(path.join(sourceRoot,'sources/audio'),{recursive:true});
const records=[];
for(const {asset,bytes} of files){
  const file='assets/audio/'+asset.file,sourceWav='sources/audio/'+asset.file;await writeFile(path.join(runtimeRoot,file),bytes);await writeFile(path.join(sourceRoot,sourceWav),bytes);
  records.push({
    id:'moss-and-moon.audio.'+asset.id,version:AUDIO_VERSION,kind:asset.loop?'audio-loop':'audio-event',source:sourcePath,sourceProject:'Original deterministic JavaScript synthesis and score; the PCM WAV is the lossless source render.',sourceRender:{path:sourceWav,bytes:bytes.length,sha256:sha256(bytes)},runtime:[file],sha256:{[file]:sha256(bytes),[sourceWav]:sha256(bytes)},
    provenance:{method:'original-procedural',creator:'Moss & Moon Maker / asset assistant',createdAt:'2026-10-25',tool:'Node.js built-in math and PCM WAV encoder; no external sample library',seed:asset.seed,referenceSources:[],rights:'Original project-authored composition and synthesis. No external audio recordings, samples or melodies. No public-domain claim.'},
    spec:{format:'WAV',encoding:'PCM signed 16-bit little-endian',sampleRate:asset.sampleRate,channels:asset.channels,bitDepth:asset.bitDepth,durationSeconds:asset.duration,samples:asset.samples.length,loop:asset.loop,loopStartSeconds:asset.loopStart,loopEndSeconds:asset.loopEnd,crossfadeSeconds:asset.crossfadeSeconds||0,description:asset.description,measurements:asset.stats},
    playback:{bus:asset.id==='music'?'music':asset.id==='ambient'?'environment':'effects',recommendedGain:asset.recommendedGain,maxSimultaneousVoices:asset.maxVoices,cooldownMs:asset.cooldownMs,loopPolicy:asset.loop?'one reusable source; no stacked duplicate loops':'fade or replace the oldest matching voice on cap',pausePolicy:'runtime suspends audio and ramps gain; no hidden playback'},
    budget:{runtimeBytes:bytes.length,decodedFloat32Bytes:asset.samples.length*4},reuse:{tags:[asset.id,'garden','soft','original'],compatibleWith:['moss-audio-kit-v1']},dependencies:[],derivatives:[]
  });
}
const manifest={schema:1,game:'moss-and-moon',version:AUDIO_VERSION,seed:AUDIO_SEED,assetCount:records.length,totalRuntimeBytes:total,totalDecodedFloat32Bytes:records.reduce((n,a)=>n+a.budget.decodedFloat32Bytes,0),source:{path:sourcePath,sha256:sha256(sourceBytes),bytes:sourceBytes.length,notes:'sources/audio-notes.md'},recipe:'games/moss-and-moon/export-audio.mjs',voicePolicy:{musicMax:1,environmentMax:1,combinedEventMax:8,enforcement:'Runtime responsibility; manifest is a playback contract.'},validation:{structural:'PCM header, byte count, finite samples, duration, headroom and loop boundary assertions passed during this export',actualListening:'not assessed by the generator; requires device/browser listening',releaseReview:'not a Reviewer score or release approval'},assets:records};
const json=JSON.stringify(manifest,null,2)+'\n';
await writeFile(path.join(sourceRoot,'audio-manifest.json'),json);
await writeFile(path.join(runtimeRoot,'assets/data/audio-manifest.json'),json);
console.log(JSON.stringify({assetCount:records.length,totalRuntimeBytes:total,sourceSha256:manifest.source.sha256,assets:records.map(a=>({id:a.id,file:a.runtime[0],bytes:a.budget.runtimeBytes,rate:a.spec.sampleRate,loop:a.spec.loop,peakDbfs:a.spec.measurements.peakDbfs,rmsDbfs:a.spec.measurements.rmsDbfs,seamStep:a.spec.measurements.seamStep}))},null,2));
