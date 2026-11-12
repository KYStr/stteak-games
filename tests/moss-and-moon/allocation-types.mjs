// Independent diagnostic: allocation-tracked heap snapshot without a debugger
// breakpoint. Unlike sampling this identifies surviving allocated node types. It
// cannot identify every object already collected; the raw snapshot is retained.
import {chromium} from '/workspace/stteak8/tools/node_modules/playwright-core/index.mjs';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {collectAllocationTypes} from './allocation-types-collector.mjs';
import {base,ensureServer} from './server.mjs';
import {importPerformanceFixture} from './profile-fixture.mjs';
const artifacts=(process.env.MOSS_ARTIFACTS||'/tmp/moss-and-moon-types')+'/types';await mkdir(artifacts,{recursive:true});
let browser,server;const report={errors:[],limitation:'Live tracked allocations at a snapshot; already-collected types are not recoverable.'};
try {
 server=await ensureServer();browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:3});page.setDefaultTimeout(90000);
 page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});
 const source=await readFile(new URL('../../public/games/moss-and-moon/world.js',import.meta.url),'utf8');
 report.sha256=createHash('sha256').update(source).digest('hex');await writeFile(artifacts+'/world.mjs',source);
 await importPerformanceFixture(page,base);
 for(let i=0;i<3;i++)await page.keyboard.press('r');
 await page.locator('[data-open="settings"]').click();await page.locator('[data-setting="quality"]').selectOption('low');await page.locator('[data-resume]').click();
 await page.locator('#world').focus();await page.keyboard.down('d');await page.waitForTimeout(18000);
 const cdp=await page.context().newCDPSession(page);
 Object.assign(report,await collectAllocationTypes(page,cdp,source,artifacts));
 await writeFile(artifacts+'/types.json',JSON.stringify(report,null,2));
 console.log('allocation types',JSON.stringify(report.directFrameNodes.reduce((counts,n)=>(counts[n.type]=(counts[n.type]||0)+1,counts),{})));
}catch(error){report.error=String(error);await writeFile(artifacts+'/types.json',JSON.stringify(report,null,2));throw error;}
finally{await browser?.close();server?.kill('SIGTERM');}
