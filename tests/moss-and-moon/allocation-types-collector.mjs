import {writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
// Tracking is separate from sampling. The snapshot identifies live types only;
// source/storage and sampling checks cover allocations already collected.
export async function collectAllocationTypes(page,cdp,source,artifacts) {
 const report={sha256:createHash('sha256').update(source).digest('hex'),limitation:'Surviving allocations without a debugger breakpoint; already-collected objects cannot be typed.'};
 await page.locator('#world').focus();await page.keyboard.down('d');
 try {
 await cdp.send('HeapProfiler.startTrackingHeapObjects',{trackAllocations:true});
 await page.waitForTimeout(30000);report.before=await page.evaluate(()=>window.mossDiagnostics({summary:true}).world);
 // Do not enable Debugger here: compiling debug bytecode while tracking
 // attributes debugger-owned code/strings/scope wrappers to the paused frame.
 const chunks=[];const chunk=e=>chunks.push(e.chunk);cdp.on('HeapProfiler.addHeapSnapshotChunk',chunk);
 try {await cdp.send('HeapProfiler.takeHeapSnapshot',{reportProgress:false,captureNumericValue:true,exposeInternals:true});}
 finally {cdp.off('HeapProfiler.addHeapSnapshotChunk',chunk);}
 await writeFile(artifacts+'/tracked.heapsnapshot',chunks.join(''));
 await cdp.send('HeapProfiler.stopTrackingHeapObjects');
 const snapshot=JSON.parse(chunks.join('')),meta=snapshot.snapshot.meta,strings=snapshot.strings;
 const ff=meta.trace_function_info_fields,fnCount=ff.length,functions=[];
 for(let i=0;i<snapshot.trace_function_infos.length;i+=fnCount) {
  const row=snapshot.trace_function_infos.slice(i,i+fnCount);const get=name=>row[ff.indexOf(name)];
  functions.push({name:strings[get('name')],url:strings[get('script_name')],line:get('line'),column:get('column')});
 }
 const traces=new Map(),tf=meta.trace_node_fields;
 function walk(list,parents=[]) {
  for(let i=0;i<list.length;i+=tf.length){const row=list.slice(i,i+tf.length),get=name=>row[tf.indexOf(name)],stack=[...parents,functions[get('function_info_index')]];traces.set(get('id'),stack);walk(get('children'),stack);}
 }
 walk(snapshot.trace_tree);
 report.snapshotNodeCount=snapshot.nodes.length/meta.node_fields.length;
 report.trackedFrameTraceCount=[...traces.values()].filter(stack=>stack.at(-1)?.name==='frame'&&stack.at(-1)?.url?.endsWith('/world.js')).length;
 const nf=meta.node_fields,nodes=snapshot.nodes,types=meta.node_types[nf.indexOf('type')],groups=new Map();report.directFrameNodes=[];
 for(let i=0;i<nodes.length;i+=nf.length) {
  const get=name=>nodes[i+nf.indexOf(name)],stack=traces.get(get('trace_node_id'));
  if(!stack?.some(f=>f.url?.endsWith('/world.js')&&f.name==='frame'))continue;
  const type=types[get('type')],name=strings[get('name')],bytes=get('self_size'),key=type+':'+name;
  const group=groups.get(key)||{type,name,count:0,bytes:0,stacks:[]};group.count++;group.bytes+=bytes;
  if(!group.stacks.some(s=>JSON.stringify(s)===JSON.stringify(stack)))group.stacks.push(stack);
  groups.set(key,group);
  if(stack.at(-1)?.name==='frame')report.directFrameNodes.push({type,name,bytes,id:get('id'),traceId:get('trace_node_id'),stack});
 }
 report.types=[...groups.values()].sort((a,b)=>b.bytes-a.bytes);

 await writeFile(artifacts+'/types.json',JSON.stringify(report,null,2));
 return report;
 } finally {
  await page.keyboard.up('d').catch(()=>{});
  await cdp.send('HeapProfiler.stopTrackingHeapObjects').catch(()=>{});
 }
}
