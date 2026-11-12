// Performance fixture and routed controls never count as earned gameplay.
import {quietProfiles} from './quiet-profile.mjs';
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {performance} from 'node:perf_hooks';
import {base,ensureServer} from './server.mjs';
import {measureMovement} from './performance.mjs';
import {resourceGates,gate} from './allocation-gates.mjs';
import {importPerformanceFixture,fixture} from './profile-fixture.mjs';
const artifacts=(process.env.MOSS_ARTIFACTS||'/tmp/moss-and-moon-acceptance')+'/profile';
await mkdir(artifacts,{recursive:true});
let worldSource=await readFile(new URL('../../public/games/moss-and-moon/world.js',import.meta.url),'utf8');
const negative=process.env.MOSS_ALLOCATION_CONTROL==='negative';
if(negative) {
 worldSource=worldSource.replace('  function frame(now) {','  const churnRing=new Array(64);let churnIndex=0;\n  function frame(now) {');
 worldSource=worldSource.replace('    const updateStart = performance.now();','    const updateStart = performance.now();\n    for(let n=0;n<32;n++)churnRing[(churnIndex++)%64]={now,n,x:n+1,y:n+2,z:n+3};');
}
await writeFile(artifacts+'/world.mjs',worldSource);
const syntax=spawnSync(process.execPath,['--check',artifacts+'/world.mjs'],{encoding:'utf8'});assert.equal(syntax.status,0,syntax.stderr);
const manifest=[];
for(const file of ['world.js','main.js','campaign.js','models.js','vendor/three.module.js','vendor/three.core.js']) {
 const source=file==='world.js'?worldSource:await readFile(new URL('../../public/games/moss-and-moon/'+file,import.meta.url),'utf8');
 manifest.push({file,sha256:createHash('sha256').update(source).digest('hex'),bytes:Buffer.byteLength(source)});
}
await writeFile(artifacts+'/source-manifest.json',JSON.stringify(manifest,null,2));
let browser,server;const gates=[],report={errors:[],failed:[],views:[],referenceOnly:true,fixture,control:negative?'negative':'unchanged',source:manifest};
const add=(name,pass,details)=>gates.push(gate(name,pass,details));
try {
 server=await ensureServer();browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 report.browserVersion=browser.version();
 const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:3});page.setDefaultTimeout(90000);
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('requestfailed',r=>report.failed.push(r.url()));
 if(negative)await page.route('**/world.js',route=>route.fulfill({contentType:'text/javascript',body:worldSource}));
 await importPerformanceFixture(page,base);
 const cdp=await page.context().newCDPSession(page);await cdp.send('HeapProfiler.collectGarbage');
 report.before=await page.evaluate(()=>window.mossDiagnostics());
 await cdp.send('HeapProfiler.startSampling',{samplingInterval:512,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
 report.movement=await measureMovement(page,18000);
 const {profile}=await cdp.send('HeapProfiler.stopSampling');await writeFile(artifacts+'/allocation.json',JSON.stringify(profile));
 await page.locator('[data-open="settings"]').click();await page.locator('[data-setting="quality"]').selectOption('low');await page.locator('[data-setting="quality"]').selectOption('auto');await page.locator('[data-resume]').click();
 report.fixedBefore=await page.evaluate(()=>window.mossDiagnostics());
 await cdp.send('HeapProfiler.startSampling',{samplingInterval:512,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});
 await page.locator('#world').focus();await page.keyboard.down('d');const adaptStart=performance.now();
 while((await page.evaluate(()=>window.mossDiagnostics({summary:true}).world.renderScale))>.7501&&performance.now()-adaptStart<90000)await page.waitForTimeout(1000);
 await page.keyboard.up('d');report.fixedAfter=await page.evaluate(()=>window.mossDiagnostics());
 const {profile:fixedProfile}=await cdp.send('HeapProfiler.stopSampling');await writeFile(artifacts+'/allocation-fixed.json',JSON.stringify(fixedProfile));
 add('framebuffer-static-stage',report.fixedBefore.world.staticStageRebuilds===report.fixedAfter.world.staticStageRebuilds);
 add('framebuffer-auto-adaptation',report.fixedAfter.world.renderScale<=.7501);
 report.fixedAllocation=[];
 function walk(n){if(n.selfSize&&n.callFrame.url.includes('/moss-and-moon/')&&!n.callFrame.url.includes('/vendor/'))report.fixedAllocation.push({bytes:n.selfSize,frame:n.callFrame});for(const child of n.children)walk(child);}
 walk(fixedProfile.head);
 add('framebuffer-static-allocation',!report.fixedAllocation.some(r=>/appendStage|rebuildStaticStage/.test(r.frame.functionName)));
 try {
  report.hotLoop=await quietProfiles(page,cdp,artifacts,worldSource);
  gates.push(...report.hotLoop.gates||[]);
 }catch(error){report.hotLoopError=String(error);gates.push(gate('allocation-collection',false,{message:String(error)}));}
 // A failed allocation gate must not suppress independent evidence below.
 for(const quality of ['auto','high']) {
  await page.locator('[data-open="settings"]').click();await page.locator('[data-setting="quality"]').selectOption(quality);await page.locator('[data-resume]').click();
  for(let i=0;i<4;i++) {
   const before=await page.evaluate(()=>window.mossDiagnostics());await page.keyboard.press('r');
   const after=await page.evaluate(()=>window.mossDiagnostics());
   add(`${quality}-turn-${i}-static-rebuilds`,after.world.staticStageRebuilds-before.world.staticStageRebuilds<=1);
   report.views.push({quality,world:after.world});gates.push(...resourceGates(after.world,quality+'-'+i));
   await page.screenshot({path:artifacts+'/'+quality+'-view-'+after.world.cameraTurn+'.png'});
  }
  await page.screenshot({path:artifacts+'/'+quality+'-dense.png'});
 }
 report.resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>({name:r.name,bytes:r.transferSize})));
 report.transferBytes=report.resources.reduce((n,r)=>n+r.bytes,0);add('transfer',report.transferBytes<=30*1024*1024,{actual:report.transferBytes,limit:30*1024*1024});
 add('movement-samples',report.movement.samples.length>30);add('update-p95',report.movement.update.p95<=6,{actual:report.movement.update.p95,limit:6});gates.push(...resourceGates(report.movement.world,'movement'));
 add('browser-errors',report.errors.length===0,{errors:report.errors});add('network-errors',report.failed.length===0,{errors:report.failed});
 report.gates=gates;report.gateFailures=gates.filter(g=>!g.pass);
 await writeFile(artifacts+'/profile.json',JSON.stringify(report,null,2));
 assert.deepEqual(report.gateFailures,[],'all profile gates pass');
 console.log('PASS allocation/profile',JSON.stringify({transferBytes:report.transferBytes,update:report.movement.update,staticRebuilds:[report.fixedBefore.world.staticStageRebuilds,report.fixedAfter.world.staticStageRebuilds],scale:[report.fixedBefore.world.renderScale,report.fixedAfter.world.renderScale]}));
}catch(error){report.error=String(error);report.gates=gates;report.gateFailures=gates.filter(g=>!g.pass);await writeFile(artifacts+'/profile.json',JSON.stringify(report,null,2));await writeFile(artifacts+'/failure.json',JSON.stringify(report,null,2));throw error;}
finally{await browser?.close();server?.kill('SIGTERM');}
