// Preserve the independent sampler verbatim; cover new hot helpers too, so a
// refactor cannot turn an existing recurring allocation into an unclassified pass.
import {spawn} from 'node:child_process';
import {readFile,writeFile} from 'node:fs/promises';
import {artifact} from './test-config.mjs';
const additionalHot=new Set(['updatePresentation','updateSceneMotion','insertionSort','trimmedMean','still','rayResult','updateLiveRun','advanceFrame','renderFrame','minimumRadius']);
let child,interrupted=false;
const interrupt=signal=>{interrupted=true;child?.kill(signal);};
const sigint=()=>interrupt('SIGINT'),sigterm=()=>interrupt('SIGTERM');
process.on('SIGINT',sigint);process.on('SIGTERM',sigterm);
let exitCode=1;
try{
 exitCode=await new Promise(resolve=>{child=spawn(process.execPath,[new URL('./allocation.mjs',import.meta.url).pathname],{stdio:'inherit'});child.once('error',e=>{console.error(e);resolve(1);});child.once('exit',code=>resolve(code??1));});child=null;
 const original=JSON.parse(await readFile(artifact('allocation.json'),'utf8'));
 const windows=original.windows.map(w=>{const extra=w.allocationStacks.filter(s=>s.leafOwner==='application'&&s.category!=='event/transition'&&additionalHot.has(s.stack.at(-1)?.function));return{mode:w.mode,frames:w.frames,originalHotBytes:w.applicationHotLoopBytes,additionalHotBytes:extra.reduce((n,s)=>n+s.bytes,0),additionalStacks:extra,totalHotBytes:w.applicationHotLoopBytes+extra.reduce((n,s)=>n+s.bytes,0),allApplicationBytes:w.allocationStacks.filter(s=>s.leafOwner==='application').reduce((n,s)=>n+s.bytes,0)};});
 const report={method:'Unchanged four-window sampler plus explicit coverage of newly extracted hot helpers. Event/transition stacks retain the sampler classification. Bounds refreshes on observed invalidations remain visible in the original allocationStacks.',originalExitCode:exitCode,interrupted,additionalHot:[...additionalHot],windows,passed:!interrupted&&exitCode===0&&original.passed&&windows.length===4&&windows.every(w=>w.totalHotBytes===0)};
 await writeFile(artifact('allocation-inclusive.json'),JSON.stringify(report,null,2));console.log('INCLUSIVE ALLOCATION '+JSON.stringify(windows.map(w=>({mode:w.mode,frames:w.frames,original:w.originalHotBytes,additional:w.additionalHotBytes}))));if(!report.passed)exitCode=1;
}catch(error){console.error(error);exitCode=1;}finally{process.off('SIGINT',sigint);process.off('SIGTERM',sigterm);}
process.exitCode=interrupted?130:exitCode;
