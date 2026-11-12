import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {snapshot,fly,press,travel,device,dock,resumeGame,pauseMenu} from './flight.mjs';
import {graphicsProbe} from './graphics-probe.mjs';
export async function legacyLifecycle(browser,url,evidence){
const results={},errors=[],failed=[];let context,activePage;
try{
 context=await browser.newContext({viewport:{width:1280,height:720},acceptDownloads:true});
 await context.addInitScript(()=>{window.testPendingRaf=new Set();const request=window.requestAnimationFrame.bind(window),cancel=window.cancelAnimationFrame.bind(window);window.requestAnimationFrame=callback=>{const id=request(t=>{window.testPendingRaf.delete(id);callback(t)});window.testPendingRaf.add(id);return id};window.cancelAnimationFrame=id=>{window.testPendingRaf.delete(id);cancel(id)};window.testAudioContexts=[];const Native=window.AudioContext;window.AudioContext=new Proxy(Native,{construct(Target,args){const ctx=new Target(...args);window.testAudioContexts.push(ctx);const gain=ctx.createGain.bind(ctx);ctx.createGain=()=>{const g=gain();ctx.testMaster ||=g;return g};return ctx}})});
 await context.addInitScript(graphicsProbe);const page=await context.newPage();activePage=page;
 page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('requestfailed',r=>failed.push(`${r.url()}: ${r.failure()?.errorText}`));page.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()} ${r.url()}`)});
 await page.goto(url);await page.locator('#story').waitFor({timeout:60000});await page.screenshot({path:fileURLToPath(new URL('title-1280.png',evidence))});await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:fileURLToPath(new URL('title-1920.png',evidence))});await page.setViewportSize({width:1280,height:720});
 assert.equal(await page.evaluate(()=>window.testAudioContexts.length),0,'No audio context before a user gesture');await page.locator('#story-backup').focus();await press(page,'Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'story');await press(page,'Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'story-backup');await page.click('#preferences');await page.check('#reduced');await page.check('#low');await page.click('#preferences-back');
 // Explicit legacy fixture: new-campaign coverage is the separate fresh controller above.
 await page.evaluate(async()=>{const {createRun}=await import('./rules.js');localStorage.setItem('stteak:orbit-fall:story',JSON.stringify(createRun('story',{campaignVersion:1,seed:0})))});await page.reload();await page.click('#continue');
 await page.waitForFunction(()=>window.__orbitDiagnostics.snapshot().audio.ready);assert.equal((await snapshot(page)).audio.state,'running');
 const measureAudio=()=>page.evaluate(async()=>{const c=window.testAudioContexts[0],a=c.createAnalyser();a.fftSize=2048;c.testMaster.connect(a);await new Promise(r=>setTimeout(r,300));const data=new Float32Array(a.fftSize);a.getFloatTimeDomainData(data);c.testMaster.disconnect(a);return Math.sqrt(data.reduce((s,v)=>s+v*v,0)/data.length)});results.audioObservations=[];for(let attempt=0;attempt<3;attempt++){const before=await snapshot(page);if(before.modal==='interruption')await page.evaluate(()=>document.querySelector('#resume').click());const rms=await measureAudio(),after=await snapshot(page);results.audioObservations.push({rms,modal:after.modal,paused:after.paused,audio:after.audio});if(!after.modal&&!after.paused){results.musicRms=rms;break}}assert.ok(results.musicRms>.0001,'Music is audible during active gameplay after gesture; paused host interruptions recorded separately');
 await device(page,'tools');assert.deepEqual((await snapshot(page)).tools,['thruster','boots','tether']);
 await fly(page,[3,1.1,0],{radius:.12});await press(page,'Shift');assert.equal((await snapshot(page)).anchored,true);await press(page,'Shift');assert.equal((await snapshot(page)).anchored,false);
 await travel(page,'room-d1-cargo');await fly(page,[-3,1.5,2]);await press(page,'t');assert.equal((await snapshot(page)).tethered,true);await fly(page,[3,1.2,-.7]);await dock(page,'puzzle-momentum-1',{pointer:true});
 await device(page,'signal');await page.click('#signal-back');assert.equal((await snapshot(page)).signals.length,1);
 console.log('Campaign: first physical docking completed');
 await travel(page,'room-d1-optics');await device(page,'mirror-0');await press(page,'f');
 await device(page,'mirror-1'); // one turn, then reload must retain both mirror dials AND position
 let before=await snapshot(page);await page.reload();await page.click('#continue');let after=await snapshot(page);assert.deepEqual(after.angles,before.angles);assert.ok(Math.hypot(after.position.x-before.position.x,after.position.y-before.position.y,after.position.z-before.position.z)<.25);
 for(let i=0;i<5;i++)await press(page,'f');assert.equal((await snapshot(page)).solvedPuzzles.length,2);
 await page.screenshot({path:fileURLToPath(new URL('optics-1280.png',evidence))});
 await travel(page,'room-d1-signal');await device(page,'signal');await page.click('#signal-back');
 await travel(page,'room-d2-safe');await travel(page,'room-d2-airlock');
 for(const i of [0,2,1])await device(page,`valve-${i}`);
 assert.equal((await snapshot(page)).solvedPuzzles.length,3);await device(page,'signal');await page.click('#signal-back');
 await travel(page,'room-d2-cargo');await fly(page,[-4,1.5,4]);await press(page,'t');assert.equal((await snapshot(page)).tethered,true);
 // Raise above the moving debris before crossing the shaft.
 await fly(page,[-4,5,3]);await fly(page,[3,5,-.7]);await dock(page,'puzzle-momentum-2');
 console.log('Campaign: engineering deck completed');
 await page.screenshot({path:fileURLToPath(new URL('cargo-upper-1280.png',evidence))});
 await travel(page,'room-d2-signal');await device(page,'signal');await page.click('#signal-back');
 await travel(page,'room-d3-safe');await travel(page,'room-d3-optics');
 for(const [i,turns] of [1,5,3].entries()){await device(page,`mirror-${i}`);for(let n=1;n<turns;n++)await press(page,'f')}
 assert.equal((await snapshot(page)).solvedPuzzles.length,5);await device(page,'signal');await page.click('#signal-back');
 await travel(page,'room-d3-airlock');
 for(const i of [0,2,0,1])await device(page,`valve-${i}`);
 assert.equal((await snapshot(page)).solvedPuzzles.length,6);
 await travel(page,'room-d3-signal');await device(page,'signal');await page.click('#signal-back');assert.equal((await snapshot(page)).signals.length,6);
 await device(page,'ending');await page.click('[data-ending=beacon]');assert.equal((await snapshot(page)).status,'completed');await page.screenshot({path:fileURLToPath(new URL('ending-1280.png',evidence))});await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:fileURLToPath(new URL('ending-1920.png',evidence))});await page.setViewportSize({width:1280,height:720});
 await page.click('#result-continue');await press(page,'f');await page.click('[data-ending=memory]');assert.deepEqual((await snapshot(page)).endings,['beacon','memory']);
 console.log('Campaign: six repairs, six signals and both endings reached through real input');
 await page.click('#result-challenges');await page.click('[data-challenge=challenge-cargo]');assert.equal((await snapshot(page)).challengeId,'challenge-cargo');await page.reload();await page.click('#challenge-continue');assert.equal((await snapshot(page)).challengeId,'challenge-cargo');
 await fly(page,[-3,1.5,2]);await press(page,'t');await fly(page,[3,1.2,-.7]);await dock(page,'puzzle-momentum-1');await page.click('#result-continue');assert.equal((await snapshot(page)).challengeId,null);
 for(const challenge of ['challenge-engineering','challenge-core']){
  await press(page,'Escape');await page.click('#map');await page.click('#challenge-menu');await page.click(`[data-challenge=${challenge}]`);
  if(challenge==='challenge-engineering'){await travel(page,'room-d2-airlock');for(const i of [0,2,1])await device(page,`valve-${i}`);await travel(page,'room-d2-cargo');await fly(page,[-4,1.5,4]);await press(page,'t');await fly(page,[-4,5,3]);await fly(page,[3,5,-.7]);await dock(page,'puzzle-momentum-2');}
  else{await travel(page,'room-d3-optics');for(const [i,turns] of [1,5,3].entries()){await device(page,`mirror-${i}`);for(let n=1;n<turns;n++)await press(page,'f')}await travel(page,'room-d3-airlock');for(const i of [0,2,0,1])await device(page,`valve-${i}`);}
  assert.equal((await snapshot(page)).status,'completed');await page.click('#result-continue');
 }
 console.log('All three challenges completed through real input');
 // Blur must pause without held input; a fresh user gesture resumes a suspended AudioContext.
 await page.mouse.move(1050,400);await page.mouse.down();await page.keyboard.down('w');await page.evaluate(()=>dispatchEvent(new Event('blur')));await page.keyboard.up('w');await page.mouse.up();assert.equal(await page.evaluate(()=>document.querySelector('canvas').hasPointerCapture(1)),false);before=await snapshot(page);assert.equal(before.modal,'pause');assert.deepEqual(before.input,[]);await page.waitForTimeout(600);after=await snapshot(page);assert.equal(after.elapsed,before.elapsed);assert.equal(after.oxygen,before.oxygen);
 await page.evaluate(()=>window.testAudioContexts[0].suspend());assert.equal((await snapshot(page)).audio.state,'suspended');await resumeGame(page);await page.waitForFunction(()=>window.__orbitDiagnostics.snapshot().audio.state==='running');
 await press(page,'Escape');await page.screenshot({path:fileURLToPath(new URL('pause-1280.png',evidence))});await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:fileURLToPath(new URL('pause-1920.png',evidence))});await page.setViewportSize({width:1280,height:720});await page.locator('#music').focus();await press(page,'Home');await page.locator('#sfx').focus();await press(page,'Home');await page.check('#low');await page.click('#save-now');results.mutedRms=await measureAudio();assert.equal(results.mutedRms,0);await page.click('#story-backup');const downloadEvent=page.waitForEvent('download');await page.click('#story-backup-export');const download=await downloadEvent;await download.saveAs(fileURLToPath(new URL('story-backup.json',evidence)));await press(page,'Escape');
 // Visibility handling suspends continuous audio and clears controls. This synthetic
 // event exercises the browser visibility branch without depending on window manager focus.
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'))});assert.equal((await snapshot(page)).paused,true);await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'))});await resumeGame(page);
 // WebGL loss/restoration uses the real extension, not a fabricated DOM event.
 await page.evaluate(()=>{const gl=document.querySelector('canvas').getContext('webgl2');window.testContextLoss=gl.getExtension('WEBGL_lose_context');window.testContextLoss.loseContext()});await page.waitForFunction(()=>window.__orbitDiagnostics.snapshot().modal==='context');await page.waitForTimeout(1200);await page.evaluate(()=>window.testContextLoss.restoreContext());await page.waitForFunction(()=>window.__orbitDiagnostics.snapshot().modal==='pause');await resumeGame(page);
 await page.setViewportSize({width:1920,height:1080});await page.screenshot({path:fileURLToPath(new URL('station-1920.png',evidence))});
 await page.reload();await page.click('#continue');assert.equal((await snapshot(page)).solvedPuzzles.length,6);assert.deepEqual((await snapshot(page)).endings,['beacon','memory']);await press(page,'Escape');assert.equal(await page.inputValue('#music'),'0');assert.equal(await page.inputValue('#sfx'),'0');await resumeGame(page);
 assert.deepEqual(errors,[],'Console/page errors');assert.deepEqual(failed,[],'Failed HTTP requests');assert.deepEqual((await snapshot(page)).audio.errors,[]);assert.deepEqual((await snapshot(page)).audio.playbackErrors,[]);
 results.legacyCampaign='fixture-assisted compatibility: 6 repairs, 6 recordings, 2 endings, all three legacy challenges';results.lifecycle='reload partial puzzle/position, blur, visibility, suspended audio, mute, backup download, context restoration';
 await page.screenshot({path:fileURLToPath(new URL('soak-1280.png',evidence))});
 // Import a real file through the shipped preview/confirmation UI, then restore.
 await page.reload();await page.click('#story-backup');await page.setInputFiles('#story-backup-file',fileURLToPath(new URL('story-backup.json',evidence)));await page.locator('#story-backup-confirm:enabled').waitFor();await page.click('#story-backup-confirm');await page.click('#story-backup-reload');await page.click('#continue');assert.equal((await snapshot(page)).solvedPuzzles.length,6);
 // Deterministic low-oxygen fixture uses the documented save schema. Actual
 // simulation must reach failure and the visible recovery action must restart it.
 await press(page,'Escape');await page.click('#title-back');await page.evaluate(()=>{const key='stteak:orbit-fall:story',run=JSON.parse(JSON.parse(localStorage.getItem(key)).payload);run.oxygen=.001;run.roomId='room-d3-airlock';run.status='running';for(const suffix of [':pending',':backup'])localStorage.removeItem(key+suffix);localStorage.setItem(key,JSON.stringify(run))});await page.reload();await page.click('#continue');await page.locator('#recover').waitFor();assert.equal((await snapshot(page)).status,'failed');await page.click('#recover');assert.equal((await snapshot(page)).status,'running');assert.equal((await snapshot(page)).oxygen,100);
 await press(page,'Escape');await page.click('#title-back');await page.evaluate(()=>{for(const suffix of ['',':pending',':backup'])localStorage.removeItem('stteak:orbit-fall:story'+suffix);localStorage.setItem('stteak:orbit-fall:story','{broken')});await page.reload();await page.locator('#story').waitFor();assert.match(await page.locator('#panel').innerText(),/本機存檔無法讀取/);await page.click('#story');assert.equal((await snapshot(page)).solvedPuzzles.length,0);
 await press(page,'Escape');await page.click('#title-back');await page.evaluate(()=>{for(const suffix of ['',':pending',':backup'])localStorage.removeItem('stteak:orbit-fall:story'+suffix);localStorage.setItem('stteak:orbit-fall:story',JSON.stringify({schema:999}))});await page.reload();await page.locator('#story').waitFor();assert.match(await page.locator('#panel').innerText(),/較新版本/);await page.click('#story');assert.equal(await page.evaluate(()=>localStorage.getItem('stteak:orbit-fall:story')),JSON.stringify({schema:999}));assert.equal(await page.locator('#save-status').isVisible(),true);
 results.clockAdjustments=await page.evaluate(()=>window.testClockAdjustments||[]);results.hostInterruptions=await page.evaluate(()=>window.testHostInterruptions||[]);results.lifecycle+=', pointer capture release, backup import, oxygen failure/recovery, corrupt/future save protection';assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
results.passed=true;return results;
}catch(error){results.failure=error.stack;results.lastSnapshot=activePage?await snapshot(activePage).catch(()=>null):null;await activePage?.screenshot({path:fileURLToPath(new URL('legacy-failure.png',evidence))}).catch(()=>{});throw error}
finally{results.errors=errors;results.failedRequests=failed;await writeFile(new URL('legacy.json',evidence),JSON.stringify(results,null,2));await context?.close()}
}
