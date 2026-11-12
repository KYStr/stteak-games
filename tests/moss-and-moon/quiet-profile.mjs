import {createHash} from 'node:crypto';
import {writeFile,readFile} from 'node:fs/promises';
import {sampleQuietInterval} from './allocation-sampling.mjs';
import {collectAllocationTypes} from './allocation-types-collector.mjs';
import {allocationComparison,gate,intervalGates,referenceAllocationGate} from './allocation-gates.mjs';
// No page diagnostics/polling within either 30-second sampling interval.
// This function returns named gates; it never aborts independent budget checks.
export async function quietProfiles(page,cdp,artifacts,source) {
 const reference=JSON.parse(await readFile(new URL('./fixtures/numeric-path-reference.json',import.meta.url),'utf8'));
 const results=[],gates=[];
 for(let interval=0;interval<2;interval++) {
  const result=await sampleQuietInterval(page,cdp,artifacts,interval);results.push(result);
  gates.push(...intervalGates(result));
  // No function-name exemption for frame: its bytes, sample weights and live
  // types are all examined below. Other recurring app stacks must be explained.
  const unknown=result.app.filter(r=>r.frame.functionName!=='frame'||!r.frame.url.endsWith('/world.js'));
  gates.push(gate(`interval-${interval}-unclassified-application-stacks`,unknown.length===0,{unknown}));
  await writeFile(artifacts+'/quiet-intervals.json',JSON.stringify(results,null,2));
 }
 const [a,b]=results;
 const legacyMargin=3*512*Math.sqrt((a.sampledAppBytes+b.sampledAppBytes)/512+1)/Math.min(a.frames,b.frames);
 const legacyComparison={beforeBytesPerFrame:a.frameBytesPerFrame,afterBytesPerFrame:b.frameBytesPerFrame,
  deltaBytesPerFrame:b.frameBytesPerFrame-a.frameBytesPerFrame,samplingMargin:legacyMargin,
  pass:b.frameBytesPerFrame<=a.frameBytesPerFrame+legacyMargin,
  beforeFrames:a.frames,afterFrames:b.frames,beforeElapsedMs:a.elapsedMs,afterElapsedMs:b.elapsedMs,
  referenceOnly:true,reason:'Original fixed-512-byte uncertainty approximation; observed sample weights are variable.'};
 await writeFile(artifacts+'/legacy-allocation-comparison.json',JSON.stringify(legacyComparison,null,2));
 const comparison=allocationComparison(a,b);
 await writeFile(artifacts+'/allocation-comparison.json',JSON.stringify(comparison,null,2));
 // Preserve the temporal comparison as evidence. A/B/A controls reproduce
 // their aggregate rate while individual intervals change with engine tiers.
 // The release gate compares every interval to that recorded full-path control.
 for(const interval of results)gates.push(referenceAllocationGate(interval,reference));
 gates.push(gate('gc-rate-stability',b.gcPerFrame<=a.gcPerFrame+1/Math.min(a.frames,b.frames),{before:a.gcPerFrame,after:b.gcPerFrame}));
 gates.push(gate('equal-interval-retained-heap',(b.retained.usedSize-a.retained.usedSize)/a.retained.usedSize<.10));
 source??=await readFile(new URL('../../public/games/moss-and-moon/world.js',import.meta.url),'utf8');
 gates.push(gate('classified-source-identity',createHash('sha256').update(source).digest('hex')===reference.source.sha256,
  {expected:reference.source.sha256,actual:createHash('sha256').update(source).digest('hex')}));
 const frame=source.slice(source.indexOf('  function frame(now)'),source.indexOf('  frameRequest = requestAnimationFrame(frame); //'));
 const blocked=source.slice(source.indexOf('  function blocked('),source.indexOf('  function animate('));
 // Supplemental source checks, NOT proof of the allocation types. All direct
 // allocation bytes stay in the rate gate and independent type collection.
 const storage=/\bnew\s|\.map\(|\.filter\(|\.clone\(|\.toArray\(|Math\.hypot\(/.test(frame+blocked)||
  /path = \[\]/.test(frame)||/(?:^|[=(:,?])\s*[\[{]/m.test(frame+blocked)||/\bfunction\b|=>/.test(frame.slice(frame.indexOf('{')+1));
 gates.push(gate('application-storage-construction',!storage));
 let types;
 try {
  types=await collectAllocationTypes(page,cdp,source,artifacts);
  // V8's number/hidden/code nodes are engine storage. A JS object, array,
  // closure, or string at the direct update site is application churn, even if
  // retained heap plateaus. The negative ring control exercises this gate.
  const applicationTypes=types.directFrameNodes.filter(n=>!['number','hidden','code','native'].includes(n.type));
  gates.push(gate('direct-frame-live-application-allocation',applicationTypes.length===0,{applicationTypes,
   observedTypes:[...new Set(types.directFrameNodes.map(n=>n.type))]}));
  gates.push(gate('allocation-type-collection-valid',types.snapshotNodeCount>0,
   {snapshotNodes:types.snapshotNodeCount,trackedFrameTraces:types.trackedFrameTraceCount,liveDirectNodes:types.directFrameNodes.length}));
 }catch(error){gates.push(gate('allocation-types-collection',false,{message:String(error)}));}
 const result={intervals:results,gates,comparison,legacyComparison,reference,types,
  classification:'Sampling totals include V8/Three.js work and do not identify collected object types. A separate allocation-tracked snapshot without a debugger breakpoint types surviving direct allocations; source checks and unknown-stack gates supplement that limited coverage. Minimal renderer controls and subsystem A/B/A evidence are documented in docs/moss-and-moon-round5.md. No zero-total-allocation claim.',
  assessment:gates.every(g=>g.pass)?'All named allocation, type, GC, heap and residency gates passed.':'See named failed gates; independent resource measurements continue.'};
 await writeFile(artifacts+'/allocation-gates.json',JSON.stringify(result,null,2));return result;
}
