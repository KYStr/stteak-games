import {classify,sourceKey} from './allocation-profile.mjs';
// Exact allocated counts/bytes are independent of node types surviving the final
// snapshot GC. Combine all stacks with the same file/function/source location.
export function aggregateTimeline(data){
 const {meta}=data.snapshot,strings=data.strings,infos=data.trace_function_infos,infoStride=meta.trace_function_info_fields.length,trace=new Map(),locations=new Map();
 function visit(nodes){for(let i=0;i<nodes.length;i+=5){const id=nodes[i],index=nodes[i+1],count=nodes[i+2],bytes=nodes[i+3],start=index*infoStride,url=strings[infos[start+2]];
  if(url.includes('/games/signal-zero/')&&!url.includes('/vendor/')){
   const file=url.split('?')[0].split('/').at(-1),name=strings[infos[start+1]],line=infos[start+4],column=infos[start+5],key=sourceKey({file,function:name,line,column});let row=locations.get(key);
   if(!row){row={function:name,url,file,line,column,category:classify(file,name),count:0,bytes:0,stacks:0,retained:{}};locations.set(key,row)}
   row.count+=count;row.bytes+=bytes;row.stacks++;trace.set(id,row);
  }visit(nodes[i+4]);
 }}visit(data.trace_tree);
 const stride=meta.node_fields.length,fields=meta.node_fields,types=meta.node_types[0],traceOffset=fields.indexOf('trace_node_id'),sizeOffset=fields.indexOf('self_size');
 for(let i=0;i<data.nodes.length;i+=stride){const row=trace.get(data.nodes[i+traceOffset]);if(!row)continue;const type=types[data.nodes[i]];row.retained[type]=(row.retained[type]||0)+data.nodes[i+sizeOffset]}
 return [...locations.values()].map(row=>({...row,scalarSized:row.bytes===row.count*12})).sort((a,b)=>b.bytes-a.bytes);
}
export async function allocationTypes(page,cdp,write){
 const before=await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames),started=performance.now();
 await cdp.send('HeapProfiler.startTrackingHeapObjects',{trackAllocations:true});await page.waitForTimeout(10000);
 const durationMs=performance.now()-started,chunks=[],receive=e=>chunks.push(e.chunk);cdp.on('HeapProfiler.addHeapSnapshotChunk',receive);
 try{await cdp.send('HeapProfiler.stopTrackingHeapObjects',{reportProgress:false})}finally{cdp.off('HeapProfiler.addHeapSnapshotChunk',receive)}
 const after=await page.evaluate(()=>signalZeroDiagnostics.performance.totalFrames),text=chunks.join('');await write(text);
 return{durationMs,frames:after-before,scalarAllocationSize:12,retainedTypeMeaning:'Types surviving snapshot GC only; not allocated types',rows:aggregateTimeline(JSON.parse(text))};
}
