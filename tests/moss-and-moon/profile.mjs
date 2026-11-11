// Performance-only populated fixture. Never evidence of earning a campaign win.
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {base,ensureServer} from './server.mjs';
import {measureMovement,assertBudget} from './performance.mjs';
const artifacts=(process.env.MOSS_ARTIFACTS||'/tmp/moss-and-moon-acceptance')+'/profile';
await mkdir(artifacts,{recursive:true});
const fixture=process.env.MOSS_FIXTURE||'/workspace/stteak8/work/moss-and-moon/rounds/r2/qa-stress/fixture.json';
let browser,server;const report={errors:[],failed:[],views:[],referenceOnly:true};
try {
 server=await ensureServer();browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:3});
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('requestfailed',r=>report.failed.push(r.url()));
 await page.goto(base);await page.locator('#new-mode').selectOption('free');await page.locator('#start').click();await page.keyboard.press('Escape');
 await page.locator('[data-open="settings"]').click();await page.locator('#import-file').setInputFiles(fixture);await page.waitForFunction(()=>window.mossDiagnostics().day===31);await page.locator('[data-resume]').click();
 const cdp=await page.context().newCDPSession(page);await cdp.send('HeapProfiler.collectGarbage');
 report.before=await page.evaluate(()=>window.mossDiagnostics());
 await cdp.send('HeapProfiler.startSampling',{samplingInterval:512,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
 // Fixed camera/region and movement; both auto scale reductions must only resize the framebuffer.
 report.movement=await measureMovement(page,18000); // helper rotates only after 4 polls: use a fixed key run below instead
 const {profile}=await cdp.send('HeapProfiler.stopSampling');await writeFile(artifacts+'/allocation.json',JSON.stringify(profile));
 // Set auto again to restart the adaptation cycle, with a fixed camera (no helper turns).
 await page.locator('[data-open="settings"]').click();await page.locator('[data-setting="quality"]').selectOption('low');await page.locator('[data-setting="quality"]').selectOption('auto');await page.locator('[data-resume]').click();
 report.fixedBefore=await page.evaluate(()=>window.mossDiagnostics());
 await cdp.send('HeapProfiler.startSampling',{samplingInterval:512,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
 await page.locator('#world').focus();await page.keyboard.down('d');const adaptStart=performance.now();
 while((await page.evaluate(()=>window.mossDiagnostics().world.renderScale))>.7501&&performance.now()-adaptStart<90000)await page.waitForTimeout(1000);
 await page.keyboard.up('d');
 report.fixedAfter=await page.evaluate(()=>window.mossDiagnostics());
 const {profile:fixedProfile}=await cdp.send('HeapProfiler.stopSampling');await writeFile(artifacts+'/allocation-fixed.json',JSON.stringify(fixedProfile));
 assert.equal(report.fixedBefore.world.staticStageRebuilds,report.fixedAfter.world.staticStageRebuilds,'framebuffer adaptation does not rebuild static stage');
 assert.ok(report.fixedAfter.world.renderScale<=.7501,'both auto scale reductions exercised');
 report.fixedAllocation=[];
 function walk(n){if(n.selfSize&&n.callFrame.url.includes('/moss-and-moon/')&&!n.callFrame.url.includes('/vendor/'))report.fixedAllocation.push({bytes:n.selfSize,frame:n.callFrame});for(const child of n.children)walk(child);}
 walk(fixedProfile.head);
 assert.ok(!report.fixedAllocation.some(r=>/appendStage|rebuildStaticStage/.test(r.frame.functionName)),'zero static vertex-array allocation during framebuffer-only adaptation');
 for(const quality of ['auto','high']) {
   await page.locator('[data-open="settings"]').click();await page.locator('[data-setting="quality"]').selectOption(quality);await page.locator('[data-resume]').click();
   for(let i=0;i<4;i++) {const before=await page.evaluate(()=>window.mossDiagnostics());await page.keyboard.press('r');const after=await page.evaluate(()=>window.mossDiagnostics());assert.ok(after.world.staticStageRebuilds-before.world.staticStageRebuilds<=1);report.views.push({quality,world:after.world});await page.screenshot({path:artifacts+"/"+quality+"-view-"+after.world.cameraTurn+".png"});}
   await page.screenshot({path:artifacts+'/'+quality+'-dense.png'});
 }
 const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,bytes:r.transferSize})));
 report.transferBytes=resources.reduce((n,r)=>n+r.bytes,0);assert.ok(report.transferBytes<=30*1024*1024);
 assertBudget(report.movement,'dense garden');assert.deepEqual(report.errors,[]);assert.deepEqual(report.failed,[]);
 for(const {world} of report.views){assert.ok(world.drawCalls<=250);assert.ok(world.triangles<=1500000);assert.ok(world.dpr<=2);assert.ok(world.textureBytesBound<=256*1024*1024);}
 await writeFile(artifacts+'/profile.json',JSON.stringify(report,null,2));console.log('PASS allocation/profile',JSON.stringify({transferBytes:report.transferBytes,update:report.movement.update,staticRebuilds:[report.fixedBefore.world.staticStageRebuilds,report.fixedAfter.world.staticStageRebuilds],scale:[report.fixedBefore.world.renderScale,report.fixedAfter.world.renderScale]}));
} catch(error){await writeFile(artifacts+'/failure.json',JSON.stringify({...report,error:String(error)},null,2));throw error;}
finally{await browser?.close();server?.kill('SIGTERM');}
