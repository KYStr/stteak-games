// Short development profile; this never replaces the >=180 s release soak.
import {harness} from './browser-harness.mjs';
import {navigateAndReady} from './evidence.mjs';
import {aggregateAllocations,allocationGate} from './allocation-profile.mjs';
import {allocationTypes} from './allocation-types.mjs';
import {writeFile} from 'node:fs/promises';
const h=await harness('allocation-probe'),report={profiles:[],errors:h.errors,failedRequests:h.failedRequests};
try{
 const {page}=h;await navigateAndReady(page,opts=>page.goto(h.base,opts));await page.click('#begin');await page.click('#deploy');
 const warmFrames=Number(process.env.SIGNAL_ZERO_WARM_FRAMES||0);while(await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames)<warmFrames){await page.waitForTimeout(5000);if(await page.evaluate(()=>signalZeroControlState.screen==='caught'))await page.click('#restart');console.log('warm frames',await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames));}
 const cdp=await page.context().newCDPSession(page);await cdp.send('HeapProfiler.enable');
 for(const moving of [false,true]){
  if(moving)await page.keyboard.down('KeyD');
  // Moving window stays in the safe entrance by alternating physical keys.
  async function waitWindow(ms){for(let i=0;i<ms/500;i++){if(moving){await page.keyboard.up(i%2?'KeyD':'KeyA');await page.keyboard.down(i%2?'KeyA':'KeyD')}await page.waitForTimeout(500)}}
  await waitWindow(15000);
  const before=await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames),start=performance.now();
  await cdp.send('HeapProfiler.startSampling',{samplingInterval:4096,includeObjectsCollectedByMajorGC:true,includeObjectsCollectedByMinorGC:true});await waitWindow(20000);
  const data=await cdp.send('HeapProfiler.stopSampling'),frames=await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames);
  const label=moving?'moving':'stationary',allocations=aggregateAllocations(data);report.profiles.push({label,frames:frames-before,wallMs:performance.now()-start,allocations});await writeFile(h.artifacts+'/'+label+'.json',JSON.stringify(data));
  console.log(label,JSON.stringify(allocations.filter(r=>r.category==='steady/application')));
  await page.keyboard.up('KeyD');await page.keyboard.up('KeyA');
 }
 report.timeline=await allocationTypes(page,cdp,data=>writeFile(h.artifacts+'/timeline.heapsnapshot',data));Object.assign(report,allocationGate(report.profiles,report.timeline));
 await writeFile(h.artifacts+'/probe.json',JSON.stringify(report,null,2));console.log('strict gate',report.rubricAllocationPass,JSON.stringify(report.residual));
}finally{await h.close()}
