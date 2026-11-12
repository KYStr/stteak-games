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
 await page.addInitScript(()=>{const raf=requestAnimationFrame.bind(window),known=new WeakMap();window.__raf={pending:0,max:0};window.requestAnimationFrame=callback=>{let game=known.get(callback);if(game===undefined){game=new Error().stack.includes('/game.js');known.set(callback,game);}if(game){__raf.pending++;__raf.max=Math.max(__raf.max,__raf.pending);}return raf(t=>{if(game)__raf.pending--;callback(t);});};});
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});await page.goto(`http://127.0.0.1:${port}/games/neon-drift/`);await page.waitForFunction(()=>window.neonDrift?.snapshot().renderer.loadedCarAsset);
 const cdp=await page.context().newCDPSession(page);await cdp.send('Performance.enable');
 let totalActive=0;
 async function waitActive(target){let previous=-1,stalled=Date.now(),nextProgress=10;for(;;){const pollStart=Date.now();await page.waitForTimeout(500);if(Date.now()-pollStart>2000){report.gaps.push({kind:'host-wait',ms:Date.now()-pollStart});stalled=Date.now();}assert.deepEqual(report.errors,[]);const s=await page.evaluate(()=>neonDrift.snapshot());if(s.phase==='paused'){report.gaps.push(await page.evaluate(()=>neonDrift.events().at(-1)));await page.bringToFront();await page.locator('[data-action="resume"]').click();stalled=Date.now();}if(s.elapsed>previous){if(previous>=0)totalActive+=s.elapsed-previous;previous=s.elapsed;stalled=Date.now();}assert.ok(Date.now()-stalled<120000,'Active driving must progress');report.samples.push({elapsed:s.elapsed,calls:s.renderer.calls,triangles:s.renderer.triangles,textureBytes:s.renderer.textureBytes});if(s.elapsed>=nextProgress){console.log('Allocation driving',s.elapsed.toFixed(1),'/',target);nextProgress+=20;}if(s.elapsed>=target)return;}}
 async function start(){await page.locator('#launch').click();await page.evaluate(()=>__pilot=true);await waitActive(10);}
 async function garage(){await page.keyboard.press('Escape');await page.locator('[data-action="garage"]').click();await page.waitForTimeout(1000);await page.waitForFunction(()=>neonDrift.snapshot().renderer.loadedCarAsset);}
 async function memory(){await cdp.send('HeapProfiler.collectGarbage');const m=await cdp.send('Performance.getMetrics');return {...Object.fromEntries(m.metrics.filter(m=>['JSHeapUsedSize','JSEventListeners'].includes(m.name)).map(m=>[m.name,m.value])),renderer:await page.evaluate(()=>neonDrift.snapshot().renderer),raf:await page.evaluate(()=>__raf)};}
 // Warm a full route twice across new race objects, exercising checkpoints, drift banking, shortcuts and V8 tiers before baseline. Sampling below still covers both restarts without exclusions.
 await start();await waitActive(100);await garage();await start();await waitActive(100);await garage();await start();await page.keyboard.press('Escape');report.before=await memory();await page.locator('[data-action="resume"]').click();await checkpoint('warmed');totalActive=0;
 await cdp.send('Tracing.start',{categories:'v8',transferMode:'ReturnAsStream'});
 await cdp.send('HeapProfiler.startSampling',{samplingInterval:32768,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
 await waitActive(110);await checkpoint('first-100-active-seconds');await garage();await start();await waitActive(110);await checkpoint('second-100-active-seconds');await garage();await start();await page.keyboard.press('Escape');report.after=await memory();
 const tracingDone=new Promise(resolve=>cdp.once('Tracing.tracingComplete',resolve));await cdp.send('Tracing.end');const {stream}=await tracingDone;let traceText='';for(;;){const chunk=await cdp.send('IO.read',{handle:stream});traceText+=chunk.data;if(chunk.eof)break;}await cdp.send('IO.close',{handle:stream});const trace=JSON.parse(traceText);report.gcEvents=trace.traceEvents.filter(e=>e.name==='MinorGC'||e.name==='MajorGC');await writeFile(output+'/gc-events.json',JSON.stringify(report.gcEvents));
 const allocations=await cdp.send('HeapProfiler.stopSampling');await writeFile(output+'/allocations.json',JSON.stringify(allocations));
 const sites=[];function visit(node){if(node.selfSize){const location=locate(node.callFrame);if(location&&/games\/neon-drift\/src\//.test(location.file))sites.push({...location,bytes:node.selfSize,function:node.callFrame.functionName});}for(const child of node.children)visit(child);}visit(allocations.profile.head);report.allocationSites=sites.sort((a,b)=>b.bytes-a.bytes);
 const physics=await readFile(root+'games/neon-drift/src/physics.js','utf8'),tickStart=physics.slice(0,physics.indexOf('function tick(')).split('\n').length,tickEnd=physics.slice(0,physics.indexOf('export function stepRace')).split('\n').length;
 const tickSites=sites.filter(s=>s.file.endsWith('/physics.js')&&s.line>=tickStart&&s.line<tickEnd);
 const rendererSource=await readFile(root+'games/neon-drift/src/renderer.js','utf8'),lodStart=rendererSource.slice(0,rendererSource.indexOf('function updateLod(')).split('\n').length,lodEnd=rendererSource.slice(0,rendererSource.indexOf('function render(')).split('\n').length;
 const lodSites=sites.filter(s=>s.file.endsWith('/renderer.js')&&s.line>=lodStart&&s.line<lodEnd);
 report.tickAllocationSites=tickSites;report.lodAllocationSites=lodSites;
 report.tickBytes=tickSites.reduce((n,s)=>n+s.bytes,0);report.lodBytes=lodSites.reduce((n,s)=>n+s.bytes,0);
 report.activeSeconds=totalActive;report.heapGrowth=(report.after.JSHeapUsedSize-report.before.JSHeapUsedSize)/report.before.JSHeapUsedSize;
 report.update=await page.evaluate(()=>neonDrift.performance().updateCpu);
 report.gcCounts={minor:report.gcEvents.filter(e=>e.name==='MinorGC').length,major:report.gcEvents.filter(e=>e.name==='MajorGC').length};
 report.eventSerializationSites=sites.filter(s=>/session.js|storage.js/.test(s.file)||['rows','recordLap','finish','event'].includes(s.function));
 report.hotFrameSites=sites.filter(s=>!/session.js|storage.js/.test(s.file)&&!['rows','recordLap','finish','event'].includes(s.function));
 const gate=(ok,name)=>{if(!ok)report.failures.push(name);};
 gate(report.tickBytes<32768,'Fixed physics hot loop must have no repeated sampled allocations');gate(report.lodBytes<32768,'Recurring LOD must have no repeated sampled allocations');
 gate(report.activeSeconds>=180,'At least 180 active seconds including restart');gate(report.heapGrowth<.10,'Retained heap growth <10%');gate(report.after.JSEventListeners===report.before.JSEventListeners,'Stable listeners');
 gate(report.after.renderer.geometries===report.before.renderer.geometries,'Stable geometries');gate(report.after.renderer.textures===report.before.renderer.textures,'Stable textures');gate(report.after.raf.pending===1&&report.after.raf.max===1,'One pending game RAF');
 gate(report.update.p95<=6,'Update-only p95 <=6ms');gate(report.samples.every(s=>s.calls<=250&&s.triangles<=1500000&&s.textureBytes<=268435456),'Draw/triangle/texture budgets');gate(report.after.renderer.pixelRatio<=2,'DPR <=2');gate(report.errors.length===0,'Zero browser errors');
 report.complete=true;report.passed=report.failures.length===0;await checkpoint('finished');
 console.log(JSON.stringify({complete:report.complete,passed:report.passed,failures:report.failures,activeSeconds:report.activeSeconds,heapGrowth:report.heapGrowth,update:report.update,tickBytes:report.tickBytes,lodBytes:report.lodBytes}));if(!report.passed)process.exitCode=1;
}catch(error){report.exception=error.stack;process.exitCode=1;console.error(error);}finally{if(acceptance){acceptance.allocationProbe={complete:report.complete,passed:report.passed,report:'performance.json',exception:report.exception};acceptance.complete=acceptance.passed=!!(acceptance.functionalBrowser.complete&&acceptance.functionalBrowser.passed&&report.complete&&report.passed);await writeFile(output+'/acceptance.json',JSON.stringify(acceptance,null,2));}await writeFile(output+'/performance.json',JSON.stringify(report,null,2));await browser?.close();server?.kill();}
