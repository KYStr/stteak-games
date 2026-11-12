import {installGeometryTracker,residencyDelta} from './geometry-tracker.mjs';
import {activate,settledTravel} from './interactions.mjs';
import { chromium } from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import assert from 'node:assert/strict';
import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import os from 'node:os';
import { base, ensureServer } from './server.mjs';
import { measureMovement, stats, assertBudget } from './performance.mjs';
const artifacts = process.env.MOSS_ARTIFACTS || '/tmp/moss-and-moon-acceptance';
const backup = artifacts + '/garden-backup.json';
const duration = Number(process.env.MOSS_SOAK_MS || 180000);
if (!Number.isFinite(duration) || duration < 180000)
  throw new Error('Acceptance stability requires MOSS_SOAK_MS >= 180000 monotonic milliseconds');
await access(backup); // Earned by the UI campaign, never a synthetic winning state.
await mkdir(artifacts, { recursive:true });
let browser, server;
const errors = [], failed = [], report = { timestamp:new Date().toISOString(), durationTargetMs:duration };
const harnessSource=await readFile(new URL(import.meta.url),'utf8');
report.harnessSha256=createHash('sha256').update(harnessSource).digest('hex');
await writeFile(artifacts+'/stability-source.mjs',harnessSource);
try {
  server = await ensureServer();
  browser = await chromium.launch({executablePath:'/usr/bin/google-chrome',args:[
    '--use-angle=swiftshader','--enable-unsafe-swiftshader',
  ]});
  const page = await browser.newPage({viewport:{width:1280,height:720}});
  page.setDefaultTimeout(90000);
  await page.addInitScript(()=>{
    const request = window.requestAnimationFrame.bind(window), cancel = window.cancelAnimationFrame.bind(window), pending = new Set();
    let lastRAF=null, rafSamples=[];
    window.__drainRafSamples=()=>{const result=rafSamples;rafSamples=[];return result;};
    window.requestAnimationFrame = fn => {
      let id=request(time=>{
        pending.delete(id);
        if (lastRAF !== null) rafSamples.push({time,intervalMs:time-lastRAF});
        lastRAF=time;
        fn(time);
      }); pending.add(id); return id;
    };
    window.cancelAnimationFrame = id => {pending.delete(id);cancel(id);};
    window.__pendingFrames = ()=>pending.size;
    const Original = window.AudioContext;
    window.__audioContexts=[];
    window.AudioContext=class extends Original {
      constructor(...args){super(...args);window.__audioContexts.push(this);}
    };
  });
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error') errors.push(m.text());});
  page.on('requestfailed',r=>failed.push(r.url()+': '+r.failure()?.errorText));
  page.on('response',r=>{if(r.status()>=400) failed.push(r.status()+' '+r.url());});
  await installGeometryTracker(page);
  await page.goto(base);
  await page.locator('#start').click();
  await page.keyboard.press('Escape');
  await page.locator('.hud [data-open="settings"]').click();
  await page.locator('#import-file').setInputFiles(backup);
  await page.waitForFunction(()=>window.mossDiagnostics().completedQuests===8);
  await page.locator('[data-resume]').click();
  await page.waitForFunction(()=>window.mossDiagnostics().audio.ready);
  const cdp=await page.context().newCDPSession(page);
  const sample=async()=>{
    // Blink creates native Attr/NamedNodeMap wrappers lazily (canvas focus added six).
    // Materialize the identical live tree on both sides before strict CDP node comparison.
    await page.evaluate(()=>{
      for(const element of document.querySelectorAll('*'))
        for(const attribute of element.attributes) void attribute.value;
    });
    await cdp.send('HeapProfiler.collectGarbage');
    const residency=await page.evaluate(()=>window.__geometryTracker.snapshot());
    const world=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world);
    assert.equal(residency.length,world.geometries,"tracker matches Three r180 registration count");
    return {residency,heap:await cdp.send('Runtime.getHeapUsage'),dom:await cdp.send('Memory.getDOMCounters'),
      runtime:await page.evaluate(()=>({diagnostics:window.mossDiagnostics(),pendingFrames:window.__pendingFrames(),
        liveNodes:document.querySelectorAll('*').length, html:document.documentElement.outerHTML}))};
  };
  const close=async()=>{if(await page.locator('#panel').evaluate(el=>el.open)) await page.keyboard.press('Escape');};
  const transitions=async()=>{
    const results=[];
    for(const region of ['forest','brook','ridge','garden']) {
      const start=performance.now();
      await page.locator('[data-open="map"]').focus();await page.keyboard.press('Enter');
      await page.locator(`#panel [data-region="${region}"]`).focus();await page.keyboard.press('Enter');
      await page.waitForFunction(region=>!document.querySelector('#panel').open&&!window.mossDiagnostics().transitioning&&window.mossDiagnostics().region===region,region);
      await page.waitForTimeout(300);
      results.push({region,durationMs:performance.now()-start,world:(await page.evaluate(()=>window.mossDiagnostics())).world});
    }
    // Actual full reset/import below exercises geometry replacement, while the
    // acceptance suite separately covers furniture preview/confirm/undo input.
    await page.keyboard.press('1');
    return results;
  };
  const canonicalGarden = async () => {
    await settledTravel(page,'garden');
    for(let i=0;i<4;i++) {
      if((await page.evaluate(()=>window.mossDiagnostics({summary:true}))).world.cameraTurn===0) break;
      await page.keyboard.press('r');
    }
    await page.keyboard.press('1');
    await activate(page,'[data-open="journal"]');await close();
    const before=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world);
    await page.waitForFunction(({frame,signature})=>{const d=window.mossDiagnostics({summary:true}),w=d.world;
      return !d.paused&&!d.transitioning&&!document.querySelector('#panel').open&&d.region==='garden'&&w.sceneRegion==='garden'&&
        w.cameraTurn===0&&w.position[0]===0&&w.position[1]===0&&w.position[2]===5&&w.gridSignature===signature&&
        w.quality==='auto'&&w.celebrating===0&&w.activeRenderedFrames>=frame+4;
    },{frame:before.activeRenderedFrames,signature:before.gridSignature},{timeout:90000});
  };
  const resetImport=async()=>{
    await activate(page,'.hud [data-open="settings"]');await activate(page,'[data-open="slots"]');
    await activate(page,'[data-open="reset"]');await activate(page,'[data-reset-confirm]');
    await activate(page,'.hud [data-open="settings"]');await page.locator('#import-file').setInputFiles(backup);
    await page.waitForFunction(()=>window.mossDiagnostics({summary:true}).completedQuests===8);
    await activate(page,'[data-resume]');
  };
  report.transitions=[];report.warmCycles=[];
  report.warmAsset='moon-cottage authored geometry: transparent cutaway on region entry at camera-turn-2; rotating an existing baked cottage does not register its authored variant';
  report.initial=await sample();
  for(let cycle=0;cycle<3;cycle++) {
    await activate(page,'[data-open="journal"]');await activate(page,'[data-festival]');
    const celebrationFrame=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world.renderedFrames);
    await page.waitForFunction(frame=>window.mossDiagnostics({summary:true}).world.renderedFrames>=frame+2,celebrationFrame);await close();
    report.transitions.push(...await transitions());
    for(const viewport of [{width:1920,height:1080},{width:1280,height:720}]) {
      await page.setViewportSize(viewport);
      for(let i=0;i<4;i++) {
        await page.keyboard.press('r');
        const frame=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world.renderedFrames);
        await page.waitForFunction(frame=>window.mossDiagnostics({summary:true}).world.renderedFrames>=frame+2,frame);
        if((await page.evaluate(()=>window.mossDiagnostics({summary:true}).world.cameraTurn))===2) {
          // Re-entry constructs the cottage with an already-transparent cutaway
          // material. Rotating an existing baked cottage alone misses this variant.
          report.transitions.push(...await transitions());
          const reentered=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world.renderedFrames);
          await page.waitForFunction(frame=>window.mossDiagnostics({summary:true}).world.renderedFrames>=frame+2,reentered);
        }
      }
    }
    await resetImport();report.transitions.push(...await transitions());await canonicalGarden();
    const snapshot=await sample(),previous=report.warmCycles.at(-1)?.snapshot||report.initial;
    report.warmCycles.push({cycle,snapshot,delta:residencyDelta(previous.residency,snapshot.residency)});
    await writeFile(artifacts+'/geometry-warmup.json',JSON.stringify(report.warmCycles,null,2));
    console.log('Geometry warm cycle',cycle,snapshot.residency.length,report.warmCycles.at(-1).delta);
  }
  // Strict plateau after explicit asset/variant warming, never a permitted growth budget.
  assert.deepEqual(report.warmCycles[2].delta.addedIds,[],'identity-audited warm residency plateaus');
  assert.ok(report.warmCycles[0].snapshot.residency.some(g=>g.name==='moon-cottage'),'authored cottage cutaway explicitly resident before measurement');
  await page.waitForTimeout(5000);
  report.before=await sample();
  report.machine={chrome:browser.version(),platform:os.platform(),arch:os.arch(),cpu:os.cpus()[0]?.model,
    cores:os.cpus().length,loadavg:os.loadavg(),autoplay:'Chrome default'};
  await page.evaluate(()=>window.__drainRafSamples());
  const start=performance.now();
  const segments=[];
  report.fullRunRAF=[];
  report.allActiveSamples=[];
  let fullCursor=report.before.runtime.diagnostics.world.activeRenderedFrames;
  const collectActive = async () => {
    const d=await page.evaluate(since=>window.mossDiagnostics({since}),fullCursor);
    report.allActiveSamples.push(...d.world.samples);
    fullCursor=d.world.activeRenderedFrames;
  };
  let n=0;
  const viewportSamples=width=>segments.reduce((count,s)=>count+(s.viewport.width===width?s.samples.length:0),0);
  // A host interruption can consume the full time budget in the first segment.
  // Still render both required viewports; never fabricate or omit their samples.
  while(performance.now()-start<duration ||
    viewportSamples(1280)<=30 || viewportSamples(1920)<=30) {
    const viewport=n%2 ? {width:1920,height:1080} : {width:1280,height:720};
    await page.setViewportSize(viewport);
    await page.waitForTimeout(1500);
    const segmentMs=viewportSamples(viewport.width)<=30 ? 15000 :
      Math.min(15000,Math.max(2000,duration-(performance.now()-start)));
    segments.push(await measureMovement(page,segmentMs));
    // Exercise repeated suspend/gesture recovery during the monotonic run.
    await page.evaluate(()=>window.__audioContexts[0].suspend());
    await page.keyboard.press('1');
    await page.waitForFunction(()=>window.mossDiagnostics().audio.state==='running');
    if(++n%3===0) report.transitions.push(...await transitions());
    await collectActive();
    report.fullRunRAF.push(...await page.evaluate(()=>window.__drainRafSamples()));
    console.log('Stability',Math.round((performance.now()-start)/1000)+'/'+duration/1000+' s');
  }
  await resetImport();
  report.durationMs=performance.now()-start;
  assert.ok(report.durationMs>=180000,'three monotonic minutes');
  // Return to the same region, viewport and warmed residency before GC comparison.
  await page.setViewportSize({width:1280,height:720});
  report.transitions.push(...await transitions());
  await canonicalGarden();
  await collectActive();
  report.fullRunRAF.push(...await page.evaluate(()=>window.__drainRafSamples()));
  report.fullRunRAFStats=stats(report.fullRunRAF.map(s=>s.intervalMs));
  report.after=await sample();
  report.residencyDelta=residencyDelta(report.before.residency,report.after.residency);
  report.segments=segments;
  report.movement=[1280,1920].map(width=>{
    const matching=segments.filter(s=>s.viewport.width===width), samples=matching.flatMap(s=>s.samples);
    return {viewport:matching[0].viewport,samples,raf:stats(samples.map(s=>s.rafMs)),
      completion:stats(samples.map(s=>s.completionMs)),update:stats(samples.map(s=>s.updateMs)),submit:stats(samples.map(s=>s.submitMs))};
  });
  report.errors=errors;report.failed=failed;
  await page.screenshot({path:artifacts+'/stability-final.png'});
  // Write all raw observations before assertions, including long intervals and failures.
  await writeFile(artifacts+'/stability.json',JSON.stringify(report,null,2));
  const {before,after}=report;
  const canonicalBefore=before.runtime.diagnostics.world,canonicalAfter=after.runtime.diagnostics.world;
  for(const field of ['sceneRegion','cameraTurn','position','quality','renderScale','gridSignature','framebuffer'])
    assert.deepEqual(canonicalAfter[field],canonicalBefore[field],'equivalent rendered canonical '+field);
  assert.ok(canonicalAfter.activeRenderedFrames>canonicalBefore.activeRenderedFrames);
  assert.equal(after.runtime.pendingFrames,1); assert.equal(before.runtime.pendingFrames,1);
  assert.equal(after.dom.jsEventListeners,before.dom.jsEventListeners);
  assert.deepEqual(report.residencyDelta.addedIds,[],'same warmed geometry identities after restart/import');
  assert.deepEqual(report.residencyDelta.removedIds,[],'warmed geometry identities remain resident');
  // DOM wrapper totals are retained for reference; live listener/RAF/GPU residency is gated.
  assert.ok(after.runtime.diagnostics.world.geometries<=before.runtime.diagnostics.world.geometries,"no geometry residency growth");
  assert.ok(after.runtime.diagnostics.world.textures<=before.runtime.diagnostics.world.textures,"no texture residency growth");
  assert.equal(after.runtime.diagnostics.audio.loopSources,2);
  assert.ok((after.heap.usedSize-before.heap.usedSize)/before.heap.usedSize < .10,'bounded post-GC heap');
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  for(const movement of report.movement) assertBudget(movement,`${movement.viewport.width} stability movement`);
  console.log('PASS stability',JSON.stringify({durationMs:report.durationMs,before,after,
    movement:report.movement.map(({samples,...m})=>({...m,samples:samples.length})),errors,failed},null,2));
} catch(error) {
  if(browser) {const pages=browser.contexts().flatMap(c=>c.pages());if(pages[0]){report.failureState=await pages[0].evaluate(()=>({diagnostics:window.mossDiagnostics?.(),active:document.activeElement?.outerHTML,panel:document.querySelector('#panel')?.outerHTML})).catch(()=>null);await pages[0].screenshot({path:artifacts+'/stability-failure.png'}).catch(()=>{});}}
  console.error('FAIL stability',error);
  await writeFile(artifacts+'/stability-failure.json',JSON.stringify({error:String(error),report,errors,failed},null,2));
  process.exitCode=1;
} finally {
  if(browser) {for(const c of browser.contexts())for(const p of c.pages())await p.evaluate(()=>window.__geometryTracker?.restore()).catch(()=>{});await browser.close();}
  if(server) server.kill('SIGTERM');
}
