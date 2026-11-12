function classify(file,name){if(file.startsWith('three')||file.includes('vendor/'))return'engine';if(['clock','diagnostics','phaseSummary','export','summary','textureBytes'].includes(name))return'telemetry';if(file==='hud-text.js'||name==='bindingText')return'changed-display';if(file==='audio.js'||['emit','alarm','effect','actionFeedback','notify','persist','selectTool','makeSnapshot'].includes(name))return'event/audio';if(['app.js','input.js','core.js','view.js','models.js','render-budget.js','static-stage.js','static-batch.js','edge-pass.js','telemetry.js'].includes(file))return'steady/application';return'other'}
export function aggregateAllocations(profile){
  const byLocation=new Map();
  function visit(node,inherited){const frame=node.callFrame,file=frame.url.split('?')[0].split('/').at(-1),own=frame.url.includes('/games/signal-zero/'),category=own?(frame.url.includes('/vendor/')?'engine':classify(file,frame.functionName)):inherited;
   if(node.selfSize&&own){const key=[category,file,frame.functionName,frame.lineNumber,frame.columnNumber].join(':');let row=byLocation.get(key);if(!row){row={function:frame.functionName,file,line:frame.lineNumber+1,column:frame.columnNumber+1,category,bytes:0,stacks:0};byLocation.set(key,row)}row.bytes+=node.selfSize;row.stacks++}
   for(const child of node.children||[])visit(child,category);
  }visit(profile.profile.head,'other');return [...byLocation.values()].sort((a,b)=>b.bytes-a.bytes);
 }
