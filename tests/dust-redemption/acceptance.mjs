import assert from 'node:assert/strict';
import {spawn,execFileSync} from 'node:child_process';
import {mkdir,writeFile,readdir,readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {url,start,walk,snapshot,action,mode} from './driver.mjs';
import {completeMail} from './campaign.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url));
const evidence=process.env.DUST_EVIDENCE_DIR || '/tmp/dust-redemption-acceptance';
await mkdir(evidence,{recursive:true});
const report={checks:[],errors:[],failedRequests:[],performance:null};
const pass=(name)=>{report.checks.push(name);console.log(`PASS ${name}`)};
let server,browser;
try{
 execFileSync('node',['games/dust-redemption/build.mjs'],{cwd:root,stdio:'inherit'});
 const unitFiles=(await readdir(new URL('../games/dust-redemption/',import.meta.url))).filter(f=>f.endsWith('.test.js')).map(f=>`tests/games/dust-redemption/${f}`);
 const extra=(await readdir(new URL('./',import.meta.url))).filter(f=>f.endsWith('.test.mjs')).map(f=>`tests/dust-redemption/${f}`);
 execFileSync('node',['--test',...unitFiles,...extra],{cwd:root,stdio:'inherit'});pass('unit tests');
 for(const f of await readdir(new URL('../../games/dust-redemption/',import.meta.url)))
  if(/\.(js|css|html)$/.test(f))assert.equal(await readFile(new URL(`../../games/dust-redemption/${f}`,import.meta.url),'utf8'),await readFile(new URL(`../../public/games/dust-redemption/${f}`,import.meta.url),'utf8'),`source/runtime mismatch: ${f}`);
 pass('complete source/runtime equality');
 try{await fetch(url)}catch{
  server=spawn('python3',['-m','http.server','8102','--bind','127.0.0.1','--directory',`${root}/public`],{stdio:'ignore'});
  for(let n=0;n<40;n++){await new Promise(r=>setTimeout(r,100));try{if((await fetch(url)).ok)break}catch{}}
 }
 assert.equal(await (await fetch(new URL('game.js',url))).text(),await readFile(new URL('../../public/games/dust-redemption/game.js',import.meta.url),'utf8'),'port 8102 must serve this working tree');
 browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
 const page=await browser.newPage({viewport:{width:1280,height:720}});page.setDefaultTimeout(60000);
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text())});
 page.on('requestfailed',r=>{if(!r.failure()?.errorText?.includes('ERR_ABORTED'))report.failedRequests.push(r.url())});
 page.on('response',r=>{if(r.status()>=400)report.failedRequests.push(`${r.status()} ${r.url()}`)});
 await page.addInitScript(()=>{
  const Native=window.AudioContext;
  window.__qaContexts=[];
  window.AudioContext=class extends Native {constructor(...args){super(...args);window.__qaContexts.push(this);}};
 });
 await page.goto(url);await mode(page,'title');assert.equal((await snapshot(page)).audio.state,'uninitialized');
 await page.screenshot({path:`${evidence}/title-1280.png`});
 await action(page,'settings');
 await page.locator('[data-setting=reduced]').check();
 await page.locator('[data-setting=music]').fill('0.25');await page.locator('[data-setting=music]').dispatchEvent('input');
 await action(page,'close-sheet');await action(page,'hub');
 await page.waitForFunction(()=>dustDiagnostics().audio.decoded===11);
 assert.equal((await snapshot(page)).audio.state,'running');assert.deepEqual((await snapshot(page)).audio.errors,[]);
 pass('gesture audio unlock, all 11 WAVs decoded, settings applied');
 await page.keyboard.press('Shift+Tab');assert.ok(await page.evaluate(()=>document.getElementById('overlay').contains(document.activeElement)));
 pass('menu focus containment');
 await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:`${evidence}/hub-1920.png`});
 assert.ok(await page.locator('.panel').evaluate(el=>el.getBoundingClientRect().height<=innerHeight));
 await page.setViewportSize({width:1280,height:720});
 await action(page,'brief');await action(page,'deploy');await mode(page,'playing');
 await page.keyboard.down('KeyD');await page.waitForTimeout(200);await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.keyboard.up('KeyD');await mode(page,'paused');
 const atPause=(await snapshot(page)).player;await page.waitForTimeout(250);assert.deepEqual((await snapshot(page)).player,atPause);
 assert.equal((await snapshot(page)).audio.state,'suspended');
 await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await action(page,'resume');await mode(page,'playing');
 await page.evaluate(async()=>{await window.__qaContexts[0].suspend()});
 await page.keyboard.press('KeyR');await page.waitForFunction(()=>dustDiagnostics().audio.state==='running');
 pass('blur freezes game and input; explicit resume and suspended audio recovery');
 const beforeReload=(await snapshot(page)).profile;
 await page.reload();await mode(page,'title');await action(page,'hub');await action(page,'recover');await mode(page,'playing');
 const restored=await snapshot(page);assert.equal(restored.mission,'dry-mail');assert.equal(restored.player.hp,100);assert.equal(restored.profile.wallet,beforeReload.wallet);assert.equal(restored.profile.activeRun.id,beforeReload.activeRun.id);
 pass('departure save survives reload and restores safe entry');
 await page.evaluate(()=>{window.__qaLoss=document.getElementById('world').getContext('webgl2').getExtension('WEBGL_lose_context');window.__qaLoss.loseContext()});
 await mode(page,'paused');await page.waitForTimeout(300);await page.evaluate(()=>window.__qaLoss.restoreContext());await page.waitForFunction(()=>dustDiagnostics().render.contextLost===false);await action(page,'resume');await mode(page,'playing');
 pass('WebGL context loss and restoration retain the mission');
 await page.goto(url+'?touch=1');await mode(page,'title');await action(page,'hub');await action(page,'recover');await mode(page,'playing');
 await completeMail(page);
 assert.equal((await snapshot(page)).profile.completed[0],'dry-mail');assert.equal((await snapshot(page)).profile.activeRun,null);
 await page.screenshot({path:`${evidence}/contract-result.png`});pass('real-input first contract: evidence, machinery, negotiation, transport, receipt, extraction');
 await action(page,'hub');await page.reload();await mode(page,'title');await action(page,'hub');assert.equal((await snapshot(page)).profile.completed.length,1);assert.equal(await page.locator('[data-action=brief]:not(:disabled)').count(),2);
 pass('completed story and next unlock persist after reload');
 await action(page,'brief','[data-id="dry-mail"]');await action(page,'deploy');await mode(page,'playing');
 const guard=(await snapshot(page)).enemies.find(e=>e.id==='mail-1');await walk(page,{x:guard.x,z:guard.z+2},.3);
 await page.mouse.move(650,310);await page.mouse.down();await page.waitForTimeout(200);await page.mouse.up();assert.ok((await snapshot(page)).stats.shots>=1);await page.waitForFunction(()=>dustDiagnostics().mode==='dead',null,{timeout:90000});
 await action(page,'retry');await mode(page,'playing');assert.equal((await snapshot(page)).player.hp,100);assert.equal((await snapshot(page)).profile.completed.length,1);
 pass('combat loss and retry preserve the finished story');
 await page.goto(url);await mode(page,'title');await action(page,'hub');await action(page,'recover');await mode(page,'playing');
 await page.waitForFunction(()=>dustDiagnostics().render.geometries>100);await page.waitForTimeout(2500);
 const client=await page.context().newCDPSession(page);await client.send('HeapProfiler.collectGarbage');
 const resourcesBefore=await client.send('Memory.getDOMCounters');
 const heapBefore=await page.evaluate(()=>performance.memory.usedJSHeapSize);
 const renderBefore=(await snapshot(page)).render;
 await page.evaluate(()=>{window.__qaFrames=[];window.__qaLast=0;window.__qaMeasure=true;function measure(t){if(!window.__qaMeasure)return;if(window.__qaLast)window.__qaFrames.push(t-window.__qaLast);window.__qaLast=t;requestAnimationFrame(measure)}requestAnimationFrame(measure)});
 for(let i=0;i<6;i++){await page.waitForTimeout(30000);console.log(`Performance soak ${(i+1)*30}/180s`)}
 const timing=await page.evaluate(()=>{window.__qaMeasure=false;const f=window.__qaFrames.slice(30).sort((a,b)=>a-b);return {frames:f.length,avgMs:f.reduce((a,b)=>a+b,0)/f.length,p95Ms:f[Math.floor(f.length*.95)]}});
 await client.send('HeapProfiler.collectGarbage');const heapAfter=await page.evaluate(()=>performance.memory.usedJSHeapSize),resourcesAfter=await client.send('Memory.getDOMCounters'),renderAfter=(await snapshot(page)).render;
 report.performance={...timing,heapBefore,heapAfter,resourcesBefore,resourcesAfter,renderBefore,renderAfter};
 assert.equal(renderAfter.geometries,renderBefore.geometries);assert.equal(renderAfter.textures,renderBefore.textures);assert.ok(resourcesAfter.jsEventListeners<=resourcesBefore.jsEventListeners+2);assert.ok(heapAfter-heapBefore<8e6);
 await page.screenshot({path:`${evidence}/gameplay-1280.png`});pass('180-second frame, heap, listener and GPU-resource soak');
 await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:`${evidence}/gameplay-1920.png`});await page.setViewportSize({width:1280,height:720});
 // Exercise damaged and old data in the same browser after the completed campaign was verified.
 await page.evaluate(()=>localStorage.setItem('stteak:dust-redemption:profile:v2','{broken'));
 await page.reload();await mode(page,'title');assert.equal((await snapshot(page)).profile.completed.length,0);assert.match(await page.locator('#overlay').innerText(),/損毀/);
 await action(page,'hub');await action(page,'brief');await action(page,'deploy');await mode(page,'playing');assert.equal(await page.evaluate(()=>localStorage.getItem('stteak:dust-redemption:profile:v2:recovery')),'{broken');pass('corrupt save is safely preserved before replacement');
 await page.goto(url+'?touch=1');await mode(page,'title');await action(page,'hub');await action(page,'recover');await mode(page,'playing');
 const pad=await page.locator('#move-pad').boundingBox();await page.mouse.move(pad.x+pad.width/2,pad.y+pad.height/2);await page.mouse.down();await page.mouse.move(pad.x+pad.width*.78,pad.y+pad.height/2);await page.waitForTimeout(250);await page.keyboard.press('Escape');await mode(page,'paused');await page.mouse.up();await action(page,'resume');
 const neutral=(await snapshot(page)).player;await page.waitForTimeout(250);assert.equal((await snapshot(page)).player.x,neutral.x);assert.equal((await snapshot(page)).player.z,neutral.z);
 const fire=await page.locator('#touch-fire').boundingBox();await page.mouse.move(fire.x+fire.width/2,fire.y+fire.height/2);await page.mouse.down();await page.waitForTimeout(150);await page.keyboard.press('Escape');await page.mouse.up();assert.equal((await snapshot(page)).player.firing,false);assert.equal((await snapshot(page)).player.aiming,false);await action(page,'resume');
 await page.screenshot({path:`${evidence}/touch-1280.png`});pass('touch move/fire capture is released by pause');
 await page.evaluate(()=>{const profile=dustDiagnostics().profile;profile.schema=1;profile.activeRun=null;profile.safeSnapshot=null;localStorage.setItem('stteak:dust-redemption:profile:v2',JSON.stringify(profile))});await page.reload();await mode(page,'title');assert.equal((await snapshot(page)).profile.schema,2);assert.match(await page.locator('#overlay').innerText(),/舊版/);pass('schema-1 browser save migrates safely');
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.failedRequests,[]);pass('zero browser errors or failed asset requests');
 console.log(JSON.stringify(report.performance,null,2));
}catch(error){report.failure=error.stack;console.error(error);process.exitCode=1;
 try {const failedPage=browser?.contexts()[0]?.pages()[0];if(failedPage){await failedPage.screenshot({path:`${evidence}/failure.png`,timeout:10000});await writeFile(`${evidence}/failure-state.json`,JSON.stringify(await snapshot(failedPage),null,2));}}catch{}
}
finally{await browser?.close();server?.kill();await writeFile(`${evidence}/acceptance.json`,JSON.stringify(report,null,2));console.log(`Evidence: ${evidence}`)}
