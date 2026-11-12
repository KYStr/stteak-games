// Ownership is source-specific: a helper named `sample` or `update` in another
// file must never inherit an instrumentation/event exemption by its name.
const sources={
 telemetry:new Set(['core.js:serializePlayer','telemetry.js:clock','telemetry.js:stamp','telemetry.js:mark','telemetry.js:gpuResult','telemetry.js:export','telemetry.js:summary','app.js:diagnostics','app.js:phaseSummary','view.js:textureBytes','view.js:gpuHistory']),
 display:new Set(['app.js:bindingText','app.js:formatContext']),
 event:new Set(['input.js:keyDown','input.js:keyUp','input.js:syncAction','input.js:hold','input.js:clear','core.js:emit','core.js:alarm','core.js:selectTool','core.js:useTool','core.js:makeSnapshot','core.js:serializeDevice','view.js:effect','app.js:actionFeedback','app.js:notify','app.js:persist']),
};
export function classify(file,name){
 const key=file+':'+name;
 if(file.startsWith('three')||file.includes('vendor/'))return'engine';
 if(sources.telemetry.has(key))return'telemetry';
 if(file==='hud-text.js'||sources.display.has(key))return'changed-display';
 if(file==='audio.js'||sources.event.has(key))return'event/audio';
 if(['app.js','input.js','core.js','view.js','models.js','render-budget.js','static-stage.js','static-batch.js','edge-pass.js','telemetry.js','numeric.js'].includes(file))return'steady/application';
 return'other';
}
export const sourceKey=row=>[row.file,row.function,row.line,row.column].join(':');
export function aggregateAllocations(profile){
 const byLocation=new Map();
 function visit(node){const frame=node.callFrame,url=frame.url.split('?')[0],file=url.includes('/vendor/')?'vendor/'+url.split('/').at(-1):url.split('/').at(-1),own=url.includes('/games/signal-zero/');
  if(node.selfSize&&own){const category=classify(file,frame.functionName),rowKey=sourceKey({file,function:frame.functionName,line:frame.lineNumber+1,column:frame.columnNumber+1});let row=byLocation.get(rowKey);
   if(!row){row={function:frame.functionName,file,line:frame.lineNumber+1,column:frame.columnNumber+1,category,bytes:0,stacks:0};byLocation.set(rowKey,row)}row.bytes+=node.selfSize;row.stacks++}
  for(const child of node.children||[])visit(child);
 }visit(profile.profile.head);return [...byLocation.values()].sort((a,b)=>b.bytes-a.bytes);
}
export function allocationGate(profiles,timeline={rows:[]}){
 const residual=[],warmupAllocations=[];
 // A matched confirmation window must itself have ZERO application allocations.
 // Earlier samples are preserved, never subtracted or given byte allowances.
 // This distinguishes one-time compilation from recurring frame work.
 const confirmed=new Set(profiles.filter(p=>p.confirmation).map(p=>p.group));
 for(const profile of profiles)for(const row of profile.allocations)if(row.category==='steady/application'&&row.bytes>0){
  const evidence={window:profile.label,frames:profile.frames,wallMs:profile.wallMs,...row};
  if(profile.group&&!profile.confirmation&&confirmed.has(profile.group))warmupAllocations.push(evidence);else residual.push(evidence);
 }
 const windows=timeline.windows||[timeline];
 for(const [index,window]of windows.entries())for(const row of window.rows)if(row.category==='steady/application'&&row.count>0){
  const evidence={window:'exact-timeline-'+(index+1),frames:window.frames,wallMs:window.durationMs,...row};
  if(index<windows.length-1)warmupAllocations.push(evidence);else residual.push(evidence);
 }
 return{rubricAllocationPass:residual.length===0,residual,warmupAllocations};
}
