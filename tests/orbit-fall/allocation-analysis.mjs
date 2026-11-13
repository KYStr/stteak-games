// Postprocess raw CDP sampling profiles; no browser or candidate writes.
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {pathToFileURL} from 'node:url';
export function analyzeAllocation(profile){
 const totals={},functions={},hotFunctions={},hotFamilies={},shader={getParameters:0,getProgramCacheKey:0};
 function visit(node,family='native/runtime',instrumentation=false,raf=false,boundary=false){
  const {url='',functionName=''}=node.callFrame;
  instrumentation ||= /pptr:|__playwright/.test(url)||(!url&&/innerSerialize|serializeAsCallArgument|serializeValue|parseEvaluationResult|evaluate/.test(functionName))||(/\/main\.js$/.test(url)&&functionName==='snapshot');
  raf ||= /\/main\.js$/.test(url)&&functionName==='animate';
  boundary ||= ['persist','saveRun','storeSnapshot','updateHud','hudText','toast','completePhase','loadRoom','snapshot','tutorialDone','play','observe'].includes(functionName);
  if(instrumentation)family='Playwright and diagnostic pulls';
  else if(url.includes('/vendor/three'))family='Three rendering';
  else if(url.includes('/vendor/rapier'))family='Rapier bindings';
  else if(/\/(main|scene|physics|models|rules|audio|marker-layout|hazards)\.js$/.test(url))family='authored application';
  else if(/\/(storage|player-backup)\.js$/.test(url))family='save/setup boundaries';
  totals[family]=(totals[family]||0)+node.selfSize;
  const key=`${functionName} @ ${url}:${node.callFrame.lineNumber}`;functions[key]=(functions[key]||0)+node.selfSize;
  if(raf&&!instrumentation&&!boundary&&['Three rendering','Rapier bindings','authored application'].includes(family)&&node.selfSize){hotFunctions[key]=(hotFunctions[key]||0)+node.selfSize;hotFamilies[family]=(hotFamilies[family]||0)+node.selfSize}
  if(functionName==='getParameters')shader.getParameters+=node.selfSize;
  if(functionName.startsWith('getProgramCacheKey'))shader.getProgramCacheKey+=node.selfSize;
  for(const child of node.children||[])visit(child,family,instrumentation,raf,boundary);
 }
 visit(profile.head);return {sampledBytesByStackFamily:totals,shaderSetupSampledBytes:shader,recurringRafCandidates:hotFunctions,rafSampledBytesByFamily:hotFamilies,topFunctions:Object.entries(functions).sort((a,b)=>b[1]-a[1]).slice(0,30)};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const directory=resolve(process.argv[2]),result={note:'Sample estimates include collected objects. Stack-based attribution separates evaluator serialization/diagnostic pulls from actual RAF work. Copy-into adapters/owned native vectors avoid hot binding wrappers. RAF samples exclude explicit UI/save/diagnostic boundaries; samples estimate allocation, not retained memory.',profiles:{}};
 for(const name of (await readdir(directory)).filter(name=>/^allocation-profile.*\.json$/.test(name))){const raw=JSON.parse(await readFile(join(directory,name),'utf8'));result.profiles[name]=analyzeAllocation(raw.profile||raw)}
 await writeFile(join(directory,'allocation-attribution.json'),JSON.stringify(result,null,2));console.log('Allocation attribution written:',join(directory,'allocation-attribution.json'));
}
