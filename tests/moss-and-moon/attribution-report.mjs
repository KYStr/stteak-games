import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const folders=process.argv.slice(2);if(!folders.length)throw new Error('usage: node attribution-report.mjs <attribution directories...>');
const variants=[];
for(const dir of folders){const report=JSON.parse(await readFile(resolve(dir,'report.json'),'utf8'));variants.push(...report.variants);}
function aggregate(intervals) {
 const frames=intervals.reduce((n,r)=>n+r.frames,0);
 return {frames,elapsedMs:intervals.reduce((n,r)=>n+r.elapsedMs,0),
  bytesPerFrame:intervals.reduce((n,r)=>n+r.frameBytesPerFrame*r.frames,0)/frames,
  standardError:Math.sqrt(intervals.reduce((n,r)=>n+r.directSampleSquaredBytes,0))/frames};
}
const baseline=aggregate(variants.find(v=>v.name==='baseline').intervals);
const comparison=variants.map(v=>{
 const value=aggregate(v.intervals),difference=value.bytesPerFrame-baseline.bytesPerFrame;
 const uncertainty=3*Math.hypot(baseline.standardError,value.standardError);
 return {name:v.name,sha256:v.sha256,...value,differenceFromBaseline:difference,threeSigmaUncertainty:uncertainty,
  reproducibleReduction:difference < -uncertainty,errors:v.errors,failed:v.failed,error:v.error};
});
await writeFile(resolve(folders.at(-1),'comparison.json'),JSON.stringify({baseline,comparison},null,2));
console.table(comparison.map(({name,bytesPerFrame,standardError,differenceFromBaseline,threeSigmaUncertainty,reproducibleReduction})=>({name,bytesPerFrame,standardError,differenceFromBaseline,threeSigmaUncertainty,reproducibleReduction})));
