import assert from 'node:assert/strict';
import {parse} from '../../games/tidebound/node_modules/acorn/dist/acorn.mjs';
import {TraceMap,originalPositionFor} from '../../games/tidebound/node_modules/@jridgewell/trace-mapping/dist/trace-mapping.mjs';
// Source inspection distinguishes recurring containers from numeric boxing in V8
// samples. Event payloads/variant changes and caller-omitted scratch fallbacks are
// explicitly outside the ordinary stationary hot path.
export function auditHotContainers(sources){
 const sites=[];const targets={'scene.js':['update'],'rules.js':['step','clearLocalPath'],'main.js':['frame','advancePhysics']};
 for(const [file,source]of Object.entries(sources)){
  const ast=parse(source,{ecmaVersion:'latest',sourceType:'module',locations:true});
  function inspect(node,parent){if(!node||typeof node!=='object')return;
   if(node.type==='IfStatement'&&source.slice(node.test.start,node.test.end)==='lastVariant!==variant.id'){inspect(node.alternate,node);return;}
   if(node.type==='CallExpression'&&node.callee.name==='event')return;
   if(node.type==='ArrayExpression'&&parent?.type==='LogicalExpression'&&source.slice(parent.left.start,parent.left.end)==='eventsOut')return;
   if(['ArrayExpression','ObjectExpression','NewExpression','ArrowFunctionExpression','FunctionExpression'].includes(node.type))sites.push({file,line:node.loc.start.line,type:node.type});
   if(node.type==='CallExpression'&&node.callee.type==='MemberExpression'&&['flatMap','map','filter','sort','slice','concat'].includes(node.callee.property.name))sites.push({file,line:node.loc.start.line,type:node.callee.property.name});
   for(const [key,child]of Object.entries(node)){if(['loc','start','end'].includes(key))continue;if(Array.isArray(child))for(const value of child)inspect(value,node);else if(child&&typeof child==='object')inspect(child,node);}
  }
  function find(node){if(!node||typeof node!=='object')return;if(node.type==='FunctionDeclaration'&&targets[file]?.includes(node.id.name)){inspect(node.body,null);return;}for(const child of Object.values(node)){if(Array.isArray(child))for(const value of child)find(value);else if(child&&typeof child==='object')find(child);}}
  find(ast);
 }
 assert.deepEqual(sites,[],'recurring application container/callback sites in frame/physics/scene');return {functions:targets,containerSites:sites};
}
export function summarizeAllocations(profile,map,frames){
 const trace=new TraceMap(map),stacks=[];let applicationBytes=0,engineBytes=0,telemetryBytes=0,totalBytes=0;
 function visit(node,path){const cf=node.callFrame;let mapped=null;if(cf.url?.endsWith('/game.js'))mapped=originalPositionFor(trace,{line:cf.lineNumber+1,column:cf.columnNumber});
  const source=mapped?.source||cf.url||'',bytes=node.selfSize||0;totalBytes+=bytes;
  const telemetry=path.includes('evaluate')||path.includes('metrics')||cf.functionName==='metrics';const kind=telemetry?'telemetry/native':source.includes('/src/')?'application':source.includes('/three/')?'engine':'telemetry/native';if(kind==='application')applicationBytes+=bytes;else if(kind==='engine')engineBytes+=bytes;else telemetryBytes+=bytes;
  if(bytes)stacks.push({bytes,kind,function:cf.functionName,source:source+(mapped?.line?':'+mapped.line:''),stack:[...path,cf.functionName||'(anonymous)'].slice(-8).join(' > ')});
  for(const child of node.children||[])visit(child,[...path,cf.functionName||'(anonymous)']);
 }
 visit(profile.profile?.head||profile.head,[]);stacks.sort((a,b)=>b.bytes-a.bytes);return {frames,totalBytes,applicationBytes,engineBytes,telemetryBytes,applicationBytesPerFrame:applicationBytes/frames,stacks};
}
export function assertAllocationWindows(first,second,audit){
 assert.deepEqual(audit.containerSites,[],'recurring containers');assert.ok(first.frames>0&&second.frames>0);
 // GC event sampling varies by one collection and 10% across equal-duration
 // windows. A rising rate above that tolerance is a regression, not frame cost.
 const before=first.gcEvents/first.frames,after=second.gcEvents/second.frames,tolerance=Math.max(1/second.frames,before*.1);
 assert.ok(after<=before+tolerance,`normalized GC rate increased: ${before} -> ${after}`);
 return {firstGCPerFrame:before,secondGCPerFrame:after,tolerance,containerSites:audit.containerSites};
}
