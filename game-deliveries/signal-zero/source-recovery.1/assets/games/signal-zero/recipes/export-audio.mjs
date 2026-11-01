import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const here = dirname(fileURLToPath(import.meta.url)); const root = resolve(here, '../../../..'); const assets = resolve(here, '..');
const require = createRequire(resolve(root, 'games/signal-zero/package.json')); const { chromium } = require('@playwright/test');
const sourcePath = resolve(root, 'games/signal-zero/src/audio.js'); const runtimePath = resolve(root, 'public/games/signal-zero/audio.js');
const source = await readFile(sourcePath); const runtime = await readFile(runtimePath); const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const sourceHash = sha(source); const runtimeHash = sha(runtime); const { Sound } = await import(pathToFileURL(sourcePath).href);
await mkdir(resolve(assets, 'sources/audio'), { recursive: true }); await copyFile(sourcePath, resolve(assets, 'sources/audio/audio.js'));
const settings = { sfx: .7, music: .45 }; const sampleRate = 44100; const loopSeconds = 64 * .33;
const events = ['jump', 'land', 'step', 'hack', 'objective', 'packet', 'checkpoint', 'tool', 'toolFail', 'alert', 'caught', 'complete', 'click'];
const purposes = { jump: 'Jump accepted', land: 'Landing contact', step: 'Footstep', hack: 'Hacking action', objective: 'Objective completed', packet: 'Optional data collected', checkpoint: 'Checkpoint entered', tool: 'Tool used successfully', toolFail: 'Invalid or unavailable tool', alert: 'Detection warning', caught: 'Caught/failure', complete: 'Level complete', click: 'Interface interaction' };
const definitions = events.map(event => {
  const tones = []; const sound = new Sound(settings); sound.tone = (freq,duration,volume,type,slide=0) => tones.push({freq,duration,volume,type,slide,time:0}); sound.event(event);
  assert.equal(tones.length,1,`${event} is an active runtime sound`); return { name: event.replace(/[A-Z]/g, c=>'-'+c.toLowerCase()), event, purpose: purposes[event], duration: tones[0].duration + .05, tones, loop: false };
});
for (const alert of [0,1]) {
 const tones = [];const sound = new Sound(settings);sound.running=true;let tick=0;
 sound.tone=(freq,duration,volume,type,slide=0)=>tones.push({freq,duration,volume,type,slide,time:tick*.33});
 // Schedule three cycles and extract the middle one so tails crossing the loop
 // boundary are retained. The runtime's 330 ms initial scheduler wait is omitted.
 for(tick=0;tick<192;tick++)sound.update(.33,alert);
 definitions.push({name:alert?'music-search':'music-stealth',event:null,purpose:alert?'64-step score with search pulse layer':'64-step stealth score',duration:loopSeconds,renderDuration:loopSeconds*3+.1,offset:loopSeconds,tones,loop:true});
}
const browserOptions={headless:true}; // 公開版預設使用 Playwright Chromium，取消原本固定 Microsoft Edge 的平台限制。
if(process.env.STTEAK_CHROMIUM_PATH)browserOptions.executablePath=process.env.STTEAK_CHROMIUM_PATH; // 可明確指定已安裝的受信任 Chromium；不自動下載或猜測個人路徑。
const browser=await chromium.launch(browserOptions);let rendered; // 保留原 OfflineAudioContext 配方，只改可攜瀏覽器選擇。
try {
 const page=await browser.newPage();
 rendered=await page.evaluate(async ({definitions,sampleRate})=>{
  const all=[];
  for(const d of definitions){const context=new OfflineAudioContext(1,Math.ceil((d.renderDuration??d.duration)*sampleRate),sampleRate);const master=context.createGain();master.gain.value=.55;master.connect(context.destination);
   for(const voice of d.tones){const o=context.createOscillator(),g=context.createGain(),t=voice.time;o.type=voice.type;o.frequency.setValueAtTime(voice.freq,t);if(voice.slide)o.frequency.exponentialRampToValueAtTime(Math.max(20,voice.freq+voice.slide),t+voice.duration);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(Math.max(.0002,voice.volume),t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+voice.duration);o.connect(g);g.connect(master);o.start(t);o.stop(t+voice.duration+.03);}
   const buffer=await context.startRendering();const start=Math.round((d.offset??0)*sampleRate);const pcm=buffer.getChannelData(0).slice(start,start+Math.round(d.duration*sampleRate));all.push({name:d.name,samples:Array.from(pcm)});
  }return all;
 },{definitions,sampleRate});
}finally{await browser.close();}
function wav(samples){const bytes=Buffer.alloc(44+samples.length*2);bytes.write('RIFF',0);bytes.writeUInt32LE(bytes.length-8,4);bytes.write('WAVEfmt ',8);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(sampleRate,24);bytes.writeUInt32LE(sampleRate*2,28);bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(samples.length*2,40);samples.forEach((s,i)=>bytes.writeInt16LE(Math.max(-32768,Math.min(32767,Math.round(s*32767))),44+i*2));return bytes;}
const manifest=JSON.parse(await readFile(resolve(assets,'manifest.json'),'utf8'));manifest.assets=manifest.assets.filter(a=>a.kind!=='audio');const validation=[];
for(const d of definitions){const samples=rendered.find(r=>r.name===d.name).samples;assert.ok(samples.length>0);const peak=samples.reduce((m,s)=>Math.max(m,Math.abs(s)),0);assert.ok(peak>0&&peak<1);const bytes=wav(samples);const file=`sources/audio/${d.name}.wav`;await writeFile(resolve(assets,file),bytes);const rms=Math.sqrt(samples.reduce((s,v)=>s+v*v,0)/samples.length);const boundaryDelta=Math.abs(samples[0]-samples[samples.length-1]);
 const id=`signal-zero.audio.${d.name}`;manifest.assets.push({id,version:'1.0.0',kind:'audio',source:'sources/audio/audio.js',sourceSha256:sourceHash,runtimeRoot:'public/games/signal-zero',runtime:['audio.js'],sha256:{'audio.js':runtimeHash},provenance:{method:'original-procedural',creator:'Signal Zero Maker',createdAt:'2026-10-25',tool:'Web Audio API OfflineAudioContext / Microsoft Edge',promptRecord:'generation/audio-brief.md',referenceSources:[],rights:'Original project-authored oscillator events and score; reusable in this project and its derivatives.'},spec:{purpose:d.purpose,dispatch:d.event,sampleRate,channels:1,referenceFormat:'PCM 16-bit WAV',runtimeFormat:'Real-time Web Audio oscillators; device-native AudioContext sample rate',voicesMaximum:12,masterGain:.55,referenceSettings:settings,loop:d.loop?{steps:64,stepSeconds:.33,startSample:0,endSample:samples.length,durationSeconds:loopSeconds,construction:'Middle cycle rendered with preceding/following note tails; first scheduler wait omitted'}:null,peakDBFS:+(20*Math.log10(peak)).toFixed(3),rmsDBFS:+(20*Math.log10(rms)).toFixed(3),referenceMaster:{path:file,sha256:sha(bytes),bytes:bytes.length},transport:'Single active transport; voices disconnected on end, stopped and AudioContext suspended on pause; no WAV requests at runtime.'},budget:{runtimeBytes:runtime.length,runtimeBytesSharedAcrossAudioEntries:true,referenceBytes:bytes.length,maxSimultaneousVoices:12},reuse:{tags:['procedural','synth',d.loop?'music':'sfx'],compatibleWith:['signal-zero-audio-v1']},dependencies:['Web Audio API'],derivatives:[file]});
 validation.push({id,file,bytes:bytes.length,sha256:sha(bytes),samples:samples.length,peak,rms,boundaryDelta,loop:d.loop,result:'pass'});
}
await writeFile(resolve(assets,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const report={generatedAt:new Date().toISOString(),sourceSha256:sourceHash,runtimeSha256:runtimeHash,sourceMatchesRuntime:sourceHash===runtimeHash,sampleRate,channels:1,referenceFiles:validation.length,totalReferenceBytes:validation.reduce((s,v)=>s+v.bytes,0),runtimeAudioDownloadedBytes:0,checks:validation,result:'pass',scope:'Deterministic source derivation and non-silent unclipped WAV reference verification; not independent audio quality or device acceptance.'};
await writeFile(resolve(assets,'generation/audio-validation.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({result:report.result,referenceFiles:report.referenceFiles,totalReferenceBytes:report.totalReferenceBytes,sourceMatchesRuntime:report.sourceMatchesRuntime,sourceSha256:sourceHash,runtimeSha256:runtimeHash},null,2));
