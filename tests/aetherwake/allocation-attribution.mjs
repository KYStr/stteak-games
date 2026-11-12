import {auditAllocationContract} from './allocation-contract.mjs';
import {build} from '../../games/aetherwake/node_modules/esbuild/lib/main.js';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';

// An external map generated from exactly the shipped bytes, never a debug build.
export async function allocationMapper(output) {
  const contract=await auditAllocationContract();
  const root=fileURLToPath(new URL('../../',import.meta.url));
  const result=await build({entryPoints:[`${root}/games/aetherwake/src/main.js`],outfile:`${root}/public/games/aetherwake/game.js`,bundle:true,minify:true,format:'esm',target:'es2022',legalComments:'eof',sourcemap:'external',write:false});
  const js=result.outputFiles.find(f=>f.path.endsWith('.js'));
  assert.deepEqual(Buffer.from(js.contents),await readFile(`${root}/public/games/aetherwake/game.js`),'Allocation source map describes exact served bundle');
  const map=JSON.parse(result.outputFiles.find(f=>f.path.endsWith('.map')).text);
  await writeFile(`${output}/allocation-game.js.map`,JSON.stringify(map));
  const alpha='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';let source=0,line=0,column=0;
  const vlq=s=>{let value=0,shift=0;const values=[];for(const c of s){const n=alpha.indexOf(c);value|=(n&31)<<shift;if(n&32)shift+=5;else{values.push(value&1?-(value>>1):value>>1);value=shift=0;}}return values;};
  const rows=map.mappings.split(';').map(row=>{let generated=0;return row.split(',').filter(Boolean).map(segment=>{const v=vlq(segment);generated+=v[0];if(v.length<4)return {generated};source+=v[1];line+=v[2];column+=v[3];return {generated,source:map.sources[source],line:line+1,column:column+1};});});
  return sample=>{
    const totals={application:0,three:0,instrumentation:0,engine:0},sites={},auditClasses={numericOrNative:0,cachedDisplay:0,transitionsAndOther:0};
    function walk(node){
      const f=node.callFrame;let category='engine',mapped;
      if(f.url.endsWith('/games/aetherwake/game.js')){
        for(const item of rows[f.lineNumber]||[]){if(item.generated>f.columnNumber)break;if(item.source)mapped=item;}
        category=mapped?.source.includes('/src/')?'application':'three';
      }else if(f.url||f.functionName)category='instrumentation';
      totals[category]+=node.selfSize;
      if(node.selfSize&&category==='application'){
        const key=`${mapped.source}:${mapped.line}:${f.functionName}`;
        sites[key]=(sites[key]||0)+node.selfSize;
        const audit=contract.find(item=>mapped.source.endsWith('/'+item.file)&&mapped.line>=item.line&&mapped.line<=item.endLine);
        auditClasses[audit?.explicitAllocations===0?'numericOrNative':audit?.cachedDisplayStrings||audit?.transitionOnlyContainers?'cachedDisplay':'transitionsAndOther']+=node.selfSize;
      }
      for(const child of node.children||[])walk(child);
    }
    walk(sample.profile.head);
    return {...sample,totals,sites,auditClasses,contract,classificationNote:'Sampling reports bytes and stacks, not allocated types. Numeric/native-call samples are retained in application totals. AST contracts separately reject explicit containers/strings in numeric loops and enforce label/HUD cache guards.',applicationBytesPerStep:totals.application/Math.max(1,sample.steps),applicationBytesPerFrame:totals.application/Math.max(1,sample.frames),applicationBytesPerSecond:totals.application/(sample.durationMs/1000)};
  };
}
