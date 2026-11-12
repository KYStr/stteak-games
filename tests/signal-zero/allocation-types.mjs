// Sampling reports all bytes. An allocation timeline adds exact per-function
// counts/bytes and retained node types, distinguishing scalar-size boxing and
// browser/JIT work from application containers. It is outside the timed soak.
export async function allocationTypes(page,cdp,write){
 await cdp.send('HeapProfiler.startTrackingHeapObjects',{trackAllocations:true});await page.waitForTimeout(10000);
 const chunks=[],receive=e=>chunks.push(e.chunk);cdp.on('HeapProfiler.addHeapSnapshotChunk',receive);
 try{await cdp.send('HeapProfiler.stopTrackingHeapObjects',{reportProgress:false})}finally{cdp.off('HeapProfiler.addHeapSnapshotChunk',receive)}
 const text=chunks.join('');await write(text);const data=JSON.parse(text),meta=data.snapshot.meta,strings=data.strings,infos=data.trace_function_infos,infoStride=meta.trace_function_info_fields.length,trace=new Map();
 function visit(nodes){for(let i=0;i<nodes.length;i+=5){const [id,index,count,bytes,children]=nodes.slice(i,i+5),start=index*infoStride;trace.set(id,{function:strings[infos[start+1]],url:strings[infos[start+2]],line:infos[start+4],count,bytes,retained:{}});visit(children)}}visit(data.trace_tree);
 const stride=meta.node_fields.length,types=meta.node_types[0];for(let i=0;i<data.nodes.length;i+=stride){const id=data.nodes[i+5],row=trace.get(id);if(!row)continue;const type=types[data.nodes[i]];row.retained[type]=(row.retained[type]||0)+data.nodes[i+3]}
 const rows=[];for(const row of trace.values())if(row.url.includes('/games/signal-zero/')&&!row.url.includes('/vendor/')){row.file=row.url.split('/').at(-1);row.scalarSized=row.bytes===row.count*12;rows.push(row)}
 return{durationMs:10000,scalarAllocationSize:12,rows};
}
