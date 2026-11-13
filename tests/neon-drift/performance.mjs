import {returnToGarage} from './ui-navigation.mjs';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {build} from '../../games/neon-drift/node_modules/esbuild/lib/main.js';
const root=fileURLToPath(new URL('../../',import.meta.url)),port=Number(process.env.NEON_PORT||8105),output=process.env.NEON_ARTIFACT_DIR||'/tmp/neon-drift-acceptance';
await mkdir(output,{recursive:true});
const report={complete:false,passed:false,errors:[],failures:[],samples:[],gaps:[],phase:"boot"};let server,browser,page,acceptance=null;
try{acceptance=JSON.parse(await readFile(output+'/acceptance.json','utf8'));acceptance.functionalBrowser={complete:acceptance.complete,passed:acceptance.passed};acceptance.complete=acceptance.passed=false;await writeFile(output+'/acceptance.json',JSON.stringify(acceptance,null,2));}catch{}
await writeFile(output+'/performance.json',JSON.stringify(report,null,2));
const checkpoint=async phase=>{report.phase=phase;await writeFile(output+'/performance.json',JSON.stringify(report,null,2));};
const bundle=await build({entryPoints:[root+'games/neon-drift/src/main.js'],bundle:true,format:'esm',target:'es2022',minify:true,legalComments:'eof',outfile:root+'public/games/neon-drift/game.js',sourcemap:'external',write:false});
const generated=bundle.outputFiles.find(f=>f.path.endsWith('game.js')).text;
assert.equal(generated,await readFile(root+'public/games/neon-drift/game.js','utf8'),'Allocation source map must correspond exactly to shipped runtime');
const map=JSON.parse(bundle.outputFiles.find(f=>f.path.endsWith('.map')).text),alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
let source=0,line=0,column=0;const decoded=map.mappings.split(';').map(row=>{let generated=0;return row.split(',').filter(Boolean).map(segment=>{let value=0,shift=0;const fields=[];for(const char of segment){const n=alphabet.indexOf(char);value|=(n&31)<<shift;if(n&32)shift+=5;else{fields.push(value&1?-(value>>>1):value>>>1);value=shift=0;}}generated+=fields[0];if(fields.length<4)return [generated];source+=fields[1];line+=fields[2];column+=fields[3];return [generated,source,line,column];});});
function locate(frame){if(!frame.url.endsWith('/game.js'))return null;const row=decoded[frame.lineNumber];if(!row)return null;let found;for(const segment of row){if(segment[0]>frame.columnNumber)break;if(segment.length===4)found=segment;}return found?{file:map.sources[found[1]],line:found[2]+1,column:found[3]}:null;}
try{
 server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root+'public'],{stdio:'ignore'});await new Promise(r=>setTimeout(r,500));assert.equal(server.exitCode,null);
 browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});page=await browser.newPage({viewport:{width:1280,height:720}});
 const pilot=await build({entryPoints:[root+'tests/neon-drift/controller.js'],bundle:true,write:false,format:'iife'});await page.addInitScript({content:pilot.outputFiles[0].text});
 await page.addInitScript(()=>{const raf=requestAnimationFrame.bind(window),known=new WeakMap();window.__raf={pending:0,max:0};window.requestAnimationFrame=callback=>{let record=known.get(callback);if(!record){const game=new Error().stack.includes('/game.js');record={game,invoke:t=>{if(game)__raf.pending--;callback(t);}};known.set(callback,record);}if(record.game){__raf.pending++;__raf.max=Math.max(__raf.max,__raf.pending);}return raf(record.invoke);};});
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});await page.goto(`http://127.0.0.1:${port}/games/neon-drift/`);await page.waitForFunction(()=>window.neonDrift?.snapshot().renderer.loadedCarAsset);
 const cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
 let totalActive=0;
 async function waitActive(target){let previous=-1,stalled=Date.now(),nextProgress=10;for(;;){const pollStart=Date.now();await page.waitForTimeout(500);if(Date.now()-pollStart>2000){report.gaps.push({kind:'host-wait',ms:Date.now()-pollStart});stalled=Date.now();}assert.deepEqual(report.errors,[]);const s=await page.evaluate(()=>neonDrift.snapshot());if(s.phase==='paused'){report.gaps.push(await page.evaluate(()=>neonDrift.events().at(-1)));await page.bringToFront();await page.locator('[data-action="resume"]').click();stalled=Date.now();}if(s.elapsed>previous){if(previous>=0)totalActive+=s.elapsed-previous;previous=s.elapsed;stalled=Date.now();}assert.ok(Date.now()-stalled<120000,'Active driving must progress');report.samples.push({elapsed:s.elapsed,calls:s.renderer.calls,triangles:s.renderer.triangles,textureBytes:s.renderer.textureBytes});if(s.elapsed>=nextProgress){console.log('Allocation driving',s.elapsed.toFixed(1),'/',target);nextProgress+=20;}if(s.elapsed>=target)return;}}
 async function start(){await page.locator('#launch').click();await page.evaluate(()=>__pilot=true);await waitActive(10);}
 async function garage(){await returnToGarage(page);await page.waitForTimeout(1000);await page.waitForFunction(()=>neonDrift.snapshot().renderer.loadedCarAsset);}
 async function memory(){await cdp.send('HeapProfiler.collectGarbage');const m=await cdp.send('Performance.getMetrics');return {...Object.fromEntries(m.metrics.filter(m=>['JSHeapUsedSize','JSEventListeners'].includes(m.name)).map(m=>[m.name,m.value])),renderer:await page.evaluate(()=>neonDrift.snapshot().renderer),raf:await page.evaluate(()=>__raf)};}
 // Warm a full route twice across new race objects, exercising checkpoints, drift banking, shortcuts and V8 tiers before baseline. Sampling below still covers both restarts without exclusions.
 await start();await waitActive(100);await garage();await start();await waitActive(100);await garage();await start();await page.evaluate(()=>document.querySelector('#pause-button').click());report.before=await memory();await page.locator('[data-action="resume"]').click();await checkpoint('warmed');totalActive=0;
 // Retain every mapped ancestor, so getters and helpers below the actual
 // application frame are covered as well as the previously gated tick/LOD.
 const sourceText=Object.fromEntries(await Promise.all(['main','audio','renderer','physics','clock'].map(async name=>[name,await readFile(root+`games/neon-drift/src/${name}.js`,'utf8')])));
 const lineOf=(name,marker)=>sourceText[name].slice(0,sourceText[name].indexOf(marker)).split('\n').length;
 const ranges=[];
 function range(file,name,start,end,kind){ranges.push({file:file+'.js',name,start:lineOf(file,start),end:lineOf(file,end),kind});}
 range('main','frame','function frame(now){','\ntry{renderer=','continuous');
 range('main','HUD','function updateHUD(){','let minimapCache=','boundedHUD');
 range('main','minimap','function drawMap(){','function download(','boundedHUD');
 // End markers for functions with compact single-line bodies.
 const named=(file,name,kind)=>{const lines=sourceText[file].split('\n'),start=lines.findIndex(l=>l.includes('function '+name+'('));if(start<0)return;let end=start+1;while(end<lines.length&&!/^  (?:function |[a-zA-Z]+\()|^function |^const |^let /.test(lines[end]))end++;ranges.push({file:file+'.js',name,start:start+1,end:end+1,kind});};
 for(const name of ['checkpointSession','finishRace','pauseRace','recordEvent'])named('main',name,'serializationEvent');
 for(const name of ['event','recordLap','finish','bankDrift'])named('physics',name,'serializationEvent');
 for(const name of ['setRace','buildWorld','resize'])named('renderer',name,'sceneTransition');
 range('renderer','LOD','function updateLod(','function render(','lod');
 range('physics','tick','function tick(','export function stepRace','tick');
 // Audio/control nodes are created on actual input/event edges only.
 const audioEventNames=['tone','play','controlFeedback','emitControlCue','unlock'];
 const audioLines=sourceText.audio.split('\n');
 for(const name of [...audioEventNames,'update']){const start=audioLines.findIndex(l=>new RegExp('^  (?:async )?'+name+'\\(').test(l));assert.ok(start>=0,name);let end=start+1;while(end<audioLines.length&&!/^  (?:async )?[a-zA-Z]+\(/.test(audioLines[end])&&!/^  get /.test(audioLines[end]))end++;ranges.push({file:'audio.js',name:'audio.'+name,start:start+1,end:end+1,kind:name==='update'?'continuous':'inputOrAudioEvent'});}
 named('audio','controlCueEvent','inputOrAudioEvent');named('audio','applySynthesisTargets','browserAudioBinding');
 for(const name of ['posePlayer','poseModel','render'])named('renderer',name,'continuous');
 const classifyFrame=frame=>{const loc=locate(frame);if(!loc)return {...frame,location:null};const matches=ranges.filter(r=>loc.file.endsWith('/'+r.file)&&loc.line>=r.start&&loc.line<r.end);return {...frame,location:loc,roles:matches.map(r=>r.name),kinds:matches.map(r=>r.kind)};};
 function analyze(profile){const sites=[],other=[];
  function visit(node,ancestors){const mapped=classifyFrame(node.callFrame),chain=[...ancestors,mapped];if(node.selfSize){const application=!!mapped.location&&/games\/neon-drift\/src\//.test(mapped.location.file),underFrame=chain.some(f=>f.roles?.includes('frame'));
    const controller=chain.some(f=>/controller|__playwright_evaluation_script__/.test(f.url)||['control','snapshot'].includes(f.functionName));
    let category='outsideFrame';
    if(underFrame&&!controller){category=application?'continuous':'browserOrThree';if(chain.some(f=>f.location&&/session.js|storage.js/.test(f.location.file)||f.kinds?.includes('serializationEvent')))category='serializationEvent';else if(chain.some(f=>f.kinds?.includes('sceneTransition')))category='sceneTransition';else if(chain.some(f=>f.kinds?.includes('boundedHUD')||['hudText','fmt'].includes(f.functionName)))category='boundedHUD';else if(chain.some(f=>f.kinds?.includes('inputOrAudioEvent')))category='inputOrAudioEvent';}
    if(underFrame&&chain.some(f=>f.kinds?.includes('browserAudioBinding')))category='browserAudioBinding';if(controller)category='controllerSnapshot';else if(underFrame&&mapped.location?.file.endsWith('/clock.js'))category='browserClockBinding';
    const site={...(mapped.location||{}),url:mapped.url,bytes:node.selfSize,function:node.callFrame.functionName,category,ancestry:chain};(application?sites:other).push(site);
  }for(const child of node.children)visit(child,chain);}visit(profile.head,[]);
  const bytes=category=>sites.filter(s=>s.category===category).reduce((n,s)=>n+s.bytes,0);
  const breakdown=Object.fromEntries(['frame','HUD','minimap','LOD','tick'].map(name=>[name,{direct:sites.filter(s=>s.ancestry.at(-1).roles?.includes(name)).reduce((n,s)=>n+s.bytes,0),descendant:sites.filter(s=>s.ancestry.some(f=>f.roles?.includes(name))).reduce((n,s)=>n+s.bytes,0)}]));
  for(const name of ['audio.update','posePlayer','poseModel','render'])breakdown[name]={direct:sites.filter(s=>s.ancestry.at(-1).roles?.includes(name)).reduce((n,s)=>n+s.bytes,0),descendant:sites.filter(s=>s.ancestry.some(f=>f.roles?.includes(name))).reduce((n,s)=>n+s.bytes,0)};
  return {sites:sites.sort((a,b)=>b.bytes-a.bytes),otherSites:other.sort((a,b)=>b.bytes-a.bytes),breakdown,continuousBytes:bytes('continuous'),categoryBytes:Object.fromEntries(['continuous','boundedHUD','inputOrAudioEvent','serializationEvent','sceneTransition','controllerSnapshot','browserClockBinding','browserAudioBinding','outsideFrame'].map(k=>[k,bytes(k)])),tickBytes:sites.filter(s=>s.ancestry.at(-1).kinds?.includes('tick')).reduce((n,s)=>n+s.bytes,0),lodBytes:sites.filter(s=>s.ancestry.at(-1).kinds?.includes('lod')).reduce((n,s)=>n+s.bytes,0)};
 }
 report.windows=[];report.gcEvents=[];
 for(let windowIndex=0;windowIndex<2;windowIndex++){
  const activeBefore=totalActive,frameBefore=await page.evaluate(()=>neonDrift.performance().count),countsBefore=await page.evaluate(()=>neonDrift.performance().presentationCounts),clockBefore=await page.evaluate(()=>neonDrift.performance().nativeClockReads),audioBefore=await page.evaluate(()=>neonDrift.snapshot({renderer:false}).audio);
  await cdp.send('Tracing.start',{categories:'v8',transferMode:'ReturnAsStream'});
  await cdp.send('HeapProfiler.startSampling',{samplingInterval:32768,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
  await waitActive(110);await garage();await start();
  await page.evaluate(()=>document.querySelector('#pause-button').click());
  const memoryAfter=await memory(),frameAfter=await page.evaluate(()=>neonDrift.performance().count),countsAfter=await page.evaluate(()=>neonDrift.performance().presentationCounts),clockAfter=await page.evaluate(()=>neonDrift.performance().nativeClockReads),audioAfter=await page.evaluate(()=>neonDrift.snapshot({renderer:false}).audio);
  const tracingDone=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');const {stream}=await tracingDone;let traceText='';for(;;){const chunk=await cdp.send('IO.read',{handle:stream});traceText+=chunk.data;if(chunk.eof)break;}await cdp.send('IO.close',{handle:stream});
  const gc=JSON.parse(traceText).traceEvents.filter(e=>e.name==='MinorGC'||e.name==='MajorGC');report.gcEvents.push(...gc);await writeFile(output+`/gc-events-${windowIndex+1}.json`,JSON.stringify(gc));
  const allocations=await cdp.send('HeapProfiler.stopSampling');await writeFile(output+`/allocations-${windowIndex+1}.json`,JSON.stringify(allocations));
  const window={index:windowIndex+1,...analyze(allocations.profile),activeSeconds:totalActive-activeBefore,frameCount:frameAfter-frameBefore,memoryAfter,gcCounts:{minor:gc.filter(e=>e.name==='MinorGC').length,major:gc.filter(e=>e.name==='MajorGC').length},presentationInvocations:Object.fromEntries(Object.keys(countsAfter).map(k=>[k,countsAfter[k]-countsBefore[k]])),nativeClock:{reads:clockAfter-clockBefore,sampledBytes:0,note:'Only clock.js: direct performance.now() native return into a retained Float64Array. Caller arithmetic and all other application sites remain gated.'},audioInvocations:{automationBatches:audioAfter.automationBatches-audioBefore.automationBatches,automationCalls:audioAfter.automationCalls-audioBefore.automationCalls,controlCues:audioAfter.controlCueCount-audioBefore.controlCueCount,tones:audioAfter.toneCount-audioBefore.toneCount},presentationCadence:'Normal HUD/map <=10Hz; immediate flush on input/event/tutorial transition. Counters count actual invocations, not rendered frames.'};
  window.nativeClock.sampledBytes=window.categoryBytes.browserClockBinding;report.windows.push(window);await checkpoint(`allocation-window-${windowIndex+1}`);await page.locator('[data-action="resume"]').click();
 }
 await page.evaluate(()=>document.querySelector('#pause-button').click());report.after=await memory();
 report.allocationSites=report.windows.flatMap(w=>w.sites);report.tickBytes=report.windows.reduce((n,w)=>n+w.tickBytes,0);report.lodBytes=report.windows.reduce((n,w)=>n+w.lodBytes,0);report.continuousBytes=report.windows.reduce((n,w)=>n+w.continuousBytes,0);report.gcCounts={minor:report.windows.reduce((n,w)=>n+w.gcCounts.minor,0),major:report.windows.reduce((n,w)=>n+w.gcCounts.major,0)};
 await writeFile(output+'/gc-events.json',JSON.stringify(report.gcEvents));report.frameCount=report.windows.reduce((n,w)=>n+w.frameCount,0);
 await writeFile(output+'/allocations.json',JSON.stringify({windows:report.windows.map(w=>({index:w.index,sites:w.sites,otherSites:w.otherSites,breakdown:w.breakdown}))}));
 report.activeSeconds=totalActive;report.heapGrowth=(report.after.JSHeapUsedSize-report.before.JSHeapUsedSize)/report.before.JSHeapUsedSize;
 report.update=await page.evaluate(()=>neonDrift.performance().updateCpu);
 const gate=(ok,name)=>{if(!ok)report.failures.push(name);};
 gate(report.windows.every(w=>w.frameCount>100&&w.sites.some(s=>s.ancestry.some(f=>f.roles?.includes('frame')))),'Both allocation windows must cover actual mapped application frames');
 gate(report.windows.every(w=>w.continuousBytes<32768),'Continuous application update/pose/audio allocations <32768 sampled bytes in each window');gate(report.tickBytes<32768,'Fixed physics hot loop must have no repeated sampled allocations');gate(report.lodBytes<32768,'Recurring LOD must have no repeated sampled allocations');
 gate(report.activeSeconds>=180,'At least 180 active seconds including restart');gate(report.heapGrowth<.10,'Retained heap growth <10%');gate(report.after.JSEventListeners===report.before.JSEventListeners,'Stable listeners');
 gate(report.after.renderer.geometries===report.before.renderer.geometries,'Stable geometries');gate(report.after.renderer.textures===report.before.renderer.textures,'Stable textures');gate(report.after.raf.pending===1&&report.after.raf.max===1,'One pending game RAF');
 gate(report.update.p95<=6,'Update-only p95 <=6ms');gate(report.samples.every(s=>s.calls<=250&&s.triangles<=1500000&&s.textureBytes<=268435456),'Draw/triangle/texture budgets');gate(report.after.renderer.pixelRatio<=2,'DPR <=2');gate(report.errors.length===0,'Zero browser errors');
 report.complete=true;report.passed=report.failures.length===0;await checkpoint('finished');
 console.log(JSON.stringify({complete:report.complete,passed:report.passed,failures:report.failures,activeSeconds:report.activeSeconds,heapGrowth:report.heapGrowth,update:report.update,tickBytes:report.tickBytes,lodBytes:report.lodBytes,continuousBytes:report.continuousBytes}));if(!report.passed)process.exitCode=1;
}catch(error){report.exception=error.stack;process.exitCode=1;console.error(error);}finally{if(acceptance){acceptance.allocationProbe={complete:report.complete,passed:report.passed,report:'performance.json',exception:report.exception};acceptance.complete=acceptance.passed=!!(acceptance.functionalBrowser.complete&&acceptance.functionalBrowser.passed&&report.complete&&report.passed);await writeFile(output+'/acceptance.json',JSON.stringify(acceptance,null,2));}await writeFile(output+'/performance.json',JSON.stringify(report,null,2));await browser?.close();server?.kill();}
