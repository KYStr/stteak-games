// Diagnostic response variants only. This entry point never modifies shipped modules.
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {base,ensureServer} from './server.mjs';
import {sampleQuietInterval} from './allocation-sampling.mjs';
const artifacts=(process.env.MOSS_ARTIFACTS||'/tmp/moss-and-moon-attribution')+'/attribution';
await mkdir(artifacts,{recursive:true});
const original=await readFile(new URL('../../public/games/moss-and-moon/world.js',import.meta.url),'utf8');
function replaceOnce(source,from,to){assert.equal(source.split(from).length,2,`unique transform: ${from}`);return source.replace(from,to);}
const minimal=await readFile(new URL('./minimal-three-control.mjs',import.meta.url),'utf8');
const transforms={
 'minimal-three':s=>minimal,
 'baseline-restored':s=>original,
 'minimal-no-render':s=>replaceOnce(minimal,'   renderer.render(scene,camera);','   /* diagnostic: renderer submission omitted */'),
 'baseline':s=>s,
 'no-render':s=>replaceOnce(s,'      renderer.render(scene, camera);','      /* diagnostic: renderer submission omitted */'),
 'no-animation':s=>replaceOnce(replaceOnce(s,'playerMixer.update(dt);','void dt;'),'mixers[i]?.update(dt);','void dt;'),
 'no-projection-labels':s=>replaceOnce(s,'    updateLabels();','    /* diagnostic: label projection omitted */'),
 'no-campaign-models':s=>replaceOnce(s,'    updateCampaignModels(dt);','    /* diagnostic: campaign models omitted */'),
 'no-movement':s=>{const start=s.indexOf('      if (dx || dz) {'),end=s.indexOf('      if (actionTime > 0)',start);assert.ok(start>0&&end>start);return s.slice(0,start)+'      /* diagnostic: keyboard/target movement omitted */\n'+s.slice(end);},
};
const names=process.env.MOSS_VARIANTS?.split(',')||['baseline','no-render','no-animation','no-projection-labels','no-campaign-models','no-movement','minimal-three','minimal-no-render','baseline-restored'];
const variants=[];
for(const name of names){
 let source=original;
 for(const part of name.split('+')){assert.ok(transforms[part],`known variant ${part}`);source=transforms[part](source);}
 const dir=artifacts+'/'+name;await mkdir(dir,{recursive:true});
 const file=dir+'/world.mjs';await writeFile(file,source);
 const check=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});assert.equal(check.status,0,check.stderr);
 const identity={name,sha256:createHash('sha256').update(source).digest('hex'),bytes:Buffer.byteLength(source),sourceFile:file};
 await writeFile(dir+'/source.json',JSON.stringify(identity,null,2));variants.push({...identity,source,dir});
}
let browser,server;const report={diagnosticOnly:true,fixture:process.env.MOSS_FIXTURE||'/workspace/stteak8/work/moss-and-moon/rounds/r2/qa-stress/fixture.json',variants:[]};
try {
 server=await ensureServer();browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 report.browserVersion=browser.version();
 for(const variant of variants){
  const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:3});const page=await context.newPage();
  const result={name:variant.name,sha256:variant.sha256,errors:[],failed:[],intervals:[]};report.variants.push(result);
  page.on('pageerror',e=>result.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')result.errors.push(m.text());});page.on('requestfailed',r=>result.failed.push(r.url()));
  try {
   await page.route('**/world.js',route=>route.fulfill({contentType:'text/javascript',body:variant.source}));
   await page.goto(base);await page.locator('#new-mode').selectOption('free');await page.locator('#start').click();await page.keyboard.press('Escape');
   await page.locator('[data-open="settings"]').click();await page.locator('#import-file').setInputFiles(report.fixture);await page.waitForFunction(()=>window.mossDiagnostics().day===31);await page.locator('[data-resume]').click();
   // Same fixed camera as the failed profile. Low locks the same .75 lightweight
   // framebuffer: omitting rendering otherwise makes auto quality increase.
   for(let i=0;i<3;i++)await page.keyboard.press('r');
   await page.locator('[data-open="settings"]').click();await page.locator('[data-setting="quality"]').selectOption('low');await page.locator('[data-resume]').click();
   await page.locator('#world').focus();await page.keyboard.down('d');await page.waitForTimeout(18000);await page.keyboard.up('d');
   const cdp=await context.newCDPSession(page);
   for(let i=0;i<2;i++){result.intervals.push(await sampleQuietInterval(page,cdp,variant.dir,i));await writeFile(variant.dir+'/quiet-intervals.json',JSON.stringify(result.intervals,null,2));}
   result.identity={viewport:page.viewportSize(),world:result.intervals[0].before};
  }catch(error){result.error=String(error);}
  finally{await writeFile(variant.dir+'/report.json',JSON.stringify(result,null,2));await context.close();}
  await writeFile(artifacts+'/report.json',JSON.stringify(report,null,2));
  console.log('attribution',result.name,JSON.stringify(result.intervals.map(r=>({frames:r.frames,ms:r.elapsedMs,bpf:r.frameBytesPerFrame,se:r.directStandardError,app:r.sampledAppBytes,three:r.threeBytes}))),result.error||'');
 }
 assert.ok(report.variants.every(v=>!v.error&&v.intervals.length===2),'all variants collected');
 assert.ok(report.variants.every(v=>v.errors.length===0&&v.failed.length===0),'diagnostic pages have no browser/network errors');
}finally{await browser?.close();server?.kill('SIGTERM');}
