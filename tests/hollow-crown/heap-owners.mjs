import {readFile} from 'node:fs/promises';
// Diagnostic-only snapshot diff. V8 numeric node IDs persist across these two GCs.
export async function heapOwners(beforePath,afterPath){
 async function read(path){const h=JSON.parse(await readFile(path,'utf8')),meta=h.snapshot.meta,nf=meta.node_fields,ef=meta.edge_fields,types=meta.node_types[0],edgeTypes=meta.edge_types[0],stride=nf.length,edgeStride=ef.length,names=h.strings,summary={},ids=new Set();
  const ni=Object.fromEntries(nf.map((v,i)=>[v,i])),ei=Object.fromEntries(ef.map((v,i)=>[v,i]));
  for(let i=0;i<h.nodes.length;i+=stride){const type=types[h.nodes[i+ni.type]],name=names[h.nodes[i+ni.name]],key=type+':'+name,size=h.nodes[i+ni.self_size];ids.add(h.nodes[i+ni.id]);const r=summary[key]||(summary[key]={count:0,bytes:0});r.count++;r.bytes+=size;}
  return {h,names,types,edgeTypes,stride,edgeStride,ni,ei,summary,ids};
 }
 const before=await read(beforePath),after=await read(afterPath),diff=[];
 for(const [key,value]of Object.entries(after.summary)){const old=before.summary[key]||{count:0,bytes:0};if(value.count!==old.count||value.bytes!==old.bytes)diff.push({key,before:old,after:value,countGrowth:value.count-old.count,byteGrowth:value.bytes-old.bytes});}diff.sort((a,b)=>b.byteGrowth-a.byteGrowth);
 const {h,names,types,edgeTypes,stride,edgeStride,ni,ei}=after,count=h.nodes.length/stride,starts=new Uint32Array(count),parents=new Int32Array(count),parentEdges=new Int32Array(count),queue=new Uint32Array(count);parents.fill(-1);parents[0]=0;
 let at=0;for(let n=0;n<count;n++){starts[n]=at;at+=h.nodes[n*stride+ni.edge_count]*edgeStride;}
 let end=1;queue[0]=0;for(let q=0;q<end;q++){const n=queue[q],start=starts[n],limit=start+h.nodes[n*stride+ni.edge_count]*edgeStride;for(let e=start;e<limit;e+=edgeStride){if(edgeTypes[h.edges[e+ei.type]]==='weak')continue;const to=h.edges[e+ei.to_node]/stride;if(parents[to]!==-1)continue;parents[to]=n;parentEdges[to]=e;queue[end++]=to;}}
 const samples=[];for(let n=1;n<count&&samples.length<20;n++){const offset=n*stride,id=h.nodes[offset+ni.id],name=names[h.nodes[offset+ni.name]];if(before.ids.has(id)||!['AnimationMixer','AnimationAction','BufferGeometry','Float32Array','Int16Array','WeakMap'].includes(name))continue;const path=[];let node=n;for(let d=0;d<18&&node>0&&parents[node]>=0;d++){const e=parentEdges[node],kind=edgeTypes[h.edges[e+ei.type]],edge=kind==='element'||kind==='hidden'?h.edges[e+ei.name_or_index]:names[h.edges[e+ei.name_or_index]];path.push({name:names[h.nodes[node*stride+ni.name]],via:edge});node=parents[node];}samples.push({id,name,path:path.reverse()});}
 return {method:'Strong-edge shortest paths from V8 GC roots; weak edges excluded. Counts and bytes are retained, not sampled allocations.',largestGrowth:diff.slice(0,30),ownerClasses:diff.filter(d=>/^(?:object|native):(?:AnimationMixer|AnimationAction|BufferGeometry|PlaneGeometry|RingGeometry|BoxGeometry|Mesh|Group|Object3D|Float32Array|Int16Array|WeakMap)$/.test(d.key)),newOwnerPaths:samples};
}
