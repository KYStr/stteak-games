import { chromium } from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import assert from 'node:assert/strict';
import { mkdir, writeFile, access } from 'node:fs/promises';
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
    return {heap:await cdp.send('Runtime.getHeapUsage'),dom:await cdp.send('Memory.getDOMCounters'),
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
    for(let i=0;i<4;i++) {
      if((await page.evaluate(()=>window.mossDiagnostics())).world.cameraTurn===0) break;
      await page.keyboard.press('r');
    }
    await page.keyboard.press('1');
    await page.locator('[data-open="journal"]').click();
    await close();
    await page.waitForTimeout(5000); // Let toasts, focus tasks and retired panel DOM settle equally.
  };
  report.transitions=[];
  // Replay the UI-earned festival to warm all six authored resident skins as well as LODs.
  await page.locator('[data-open="journal"]').click();
  await page.locator('[data-festival]').click();
  await page.waitForTimeout(1000);
  await close();
  // Warm both viewport buffers, every camera cutaway and each region before comparison.
  for(let i=0;i<2;i++) report.transitions.push(...await transitions());
  for(const viewport of [{width:1920,height:1080},{width:1280,height:720}]) {
    await page.setViewportSize(viewport);
    for(let i=0;i<4;i++) {await page.keyboard.press('r');await page.waitForTimeout(250);}
  }
  await canonicalGarden();
  await page.waitForTimeout(25000);
  report.warmupMs=25000;
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
  while(performance.now()-start<duration) {
    const viewport=n%2 ? {width:1920,height:1080} : {width:1280,height:720};
    await page.setViewportSize(viewport);
    await page.waitForTimeout(1500);
    segments.push(await measureMovement(page,Math.min(15000,Math.max(2000,duration-(performance.now()-start)))));
    // Exercise repeated suspend/gesture recovery during the monotonic run.
    await page.evaluate(()=>window.__audioContexts[0].suspend());
    await page.keyboard.press('1');
    await page.waitForFunction(()=>window.mossDiagnostics().audio.state==='running');
    if(++n%3===0) report.transitions.push(...await transitions());
    await collectActive();
    report.fullRunRAF.push(...await page.evaluate(()=>window.__drainRafSamples()));
    console.log('Stability',Math.round((performance.now()-start)/1000)+'/'+duration/1000+' s');
  }
  await page.locator('.hud [data-open="settings"]').click();
  await page.locator('[data-open="slots"]').click();
  await page.locator('[data-open="reset"]').click();
  await page.locator('[data-reset-confirm]').click();
  await page.locator('.hud [data-open="settings"]').click();
  await page.locator('#import-file').setInputFiles(backup);
  await page.waitForFunction(()=>window.mossDiagnostics().completedQuests===8);
  await page.locator('[data-resume]').click();
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
  assert.equal(after.runtime.pendingFrames,1); assert.equal(before.runtime.pendingFrames,1);
  assert.equal(after.dom.jsEventListeners,before.dom.jsEventListeners);
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
  if(browser) await browser.close();
  if(server) server.kill('SIGTERM');
}
