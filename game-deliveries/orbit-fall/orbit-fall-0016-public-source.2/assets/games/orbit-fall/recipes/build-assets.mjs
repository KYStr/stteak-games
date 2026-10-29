import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import crypto from 'node:crypto';
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'../../../..');
const source=path.resolve(here,'../sources');
const output=path.join(root,'public/games/orbit-fall');
const three=path.join(root,'games/orbit-fall/node_modules/three');
const write=async (p,v)=>{await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p,v);};
const helperEntries=[];
const MODEL_VERSION='1.0.1';
for(const [input,target] of [['examples/jsm/loaders/GLTFLoader.js','gltf-loader.js'],['examples/jsm/utils/BufferGeometryUtils.js','buffer-geometry-utils.js'],['examples/jsm/utils/SkeletonUtils.js','skeleton-utils.js']]) {
  let code=await fs.readFile(path.join(three,input),'utf8');await write(path.join(source,'vendor',target),code);
  code=code.replaceAll("from 'three'","from '../../vendor/three.module.js'").replaceAll("'../utils/BufferGeometryUtils.js'","'./buffer-geometry-utils.js'");
  await write(path.join(output,'assets/runtime',target),code);
  const file=`assets/runtime/${target}`;helperEntries.push({id:`orbit-fall.runtime.${target.replace('.js','')}`,version:'0.180.0',kind:'runtime-code',source:`sources/vendor/${target}`,runtime:[file],sha256:{[file]:crypto.createHash('sha256').update(code).digest('hex')},provenance:{method:'vendored-with-relative-import-rewrite',creator:'Three.js authors',createdAt:'2026-10-25',tool:'Three.js 0.180.0 from locked npm package',referenceSources:['https://github.com/mrdoob/three.js/tree/r180'],rights:'MIT; retained license at sources/vendor/three-LICENSE.txt and runtime assets/runtime/three-LICENSE.txt'},spec:{format:'ES module',changes:'Only local relative import paths rewritten'},budget:{runtimeBytes:Buffer.byteLength(code)},dependencies:['three@0.180.0'],derivatives:[]});
}
const license=await fs.readFile(path.join(three,'LICENSE'),'utf8');await write(path.join(source,'vendor/three-LICENSE.txt'),license);await write(path.join(output,'assets/runtime/three-LICENSE.txt'),license);
const modelSource=await fs.readFile(path.join(source,'models-source.js'),'utf8');
await write(path.join(output,'models.js'),modelSource);
helperEntries.push({id:'orbit-fall.runtime.models',version:MODEL_VERSION,kind:'runtime-code',source:'sources/models-source.js',runtime:['models.js'],sha256:{'models.js':crypto.createHash('sha256').update(modelSource).digest('hex')},provenance:{method:'original-procedural',creator:'Orbit / Fall asset maker',createdAt:'2026-10-25',tool:'Retained ES module',referenceSources:[],rights:'Original model runtime and generation recipes for stteak'},spec:{format:'ES module',contract:'Local GLB loading, geometry sharing, named skeletal animations, explicit active/danger arc state'},budget:{runtimeBytes:Buffer.byteLength(modelSource)},dependencies:['three@0.180.0'],derivatives:[]});
try{await write(path.join(output,'audio.js'),await fs.readFile(path.join(source,'audio-source.js'),'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
if(process.argv.includes('--runtime-only')) {console.log('Runtime models and helper dependencies built.');process.exit(0);}
// FileReader is only needed by Three's GLB writer; this browser-equivalent adapter
// retains bytes and never touches persistent operating-system configuration.
globalThis.FileReader=class {readAsArrayBuffer(blob){blob.arrayBuffer().then(x=>{this.result=x;this.onloadend?.();});}readAsDataURL(blob){blob.arrayBuffer().then(x=>{this.result=`data:${blob.type};base64,${Buffer.from(x).toString('base64')}`;this.onloadend?.();});}};
const imports={
  './vendor/three.module.js':pathToFileURL(path.join(three,'build/three.module.js')).href,
  './assets/runtime/gltf-loader.js':pathToFileURL(path.join(three,'examples/jsm/loaders/GLTFLoader.js')).href,
  './assets/runtime/skeleton-utils.js':pathToFileURL(path.join(three,'examples/jsm/utils/SkeletonUtils.js')).href,
};
let code=modelSource;for(const [from,to]of Object.entries(imports))code=code.replaceAll(`'${from}'`,`'${to}'`);
const model=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const {GLTFExporter}=await import(pathToFileURL(path.join(three,'examples/jsm/exporters/GLTFExporter.js')));
const THREE=await import(pathToFileURL(path.join(three,'build/three.module.js')));
const exporter=new GLTFExporter(),entries=[];
const artifacts=[['astronaut',model.createAstronaut()],...['airlock','maintenance','habitat','core'].map(k=>[`room-${k}`,model.createRoomKit(k)]),...model.DEVICE_KINDS.map(k=>[`device-${k}`,model.createDevice(k)])];
for(const [name,object]of artifacts){
  object.updateMatrixWorld(true);
  const data=await exporter.parseAsync(object,{binary:true,animations:object.animations||[],onlyVisible:false});
  const bytes=Buffer.from(data),relative=`assets/models/${name}.glb`;
  await write(path.join(output,relative),bytes);
  let triangles=0,meshes=0,instanced=0,vertexBytes=0,skinned=0;const geometries=new Set(),materialSlots=new Set();
  object.traverse(o=>{if(!o.isMesh)return;meshes++;if(o.isSkinnedMesh)skinned++;if(o.isInstancedMesh)instanced++;const geom=o.geometry;triangles+=(geom.index?geom.index.count:geom.attributes.position.count)/3*(o.count||1);if(!geometries.has(geom)){geometries.add(geom);vertexBytes+=Object.values(geom.attributes).reduce((sum,a)=>sum+a.array.byteLength,0)+(geom.index?.array.byteLength||0);}for(const mat of Array.isArray(o.material)?o.material:[o.material])materialSlots.add(mat.name);});
  const bounds=new THREE.Box3().setFromObject(object),size=bounds.getSize(new THREE.Vector3()).toArray(),center=bounds.getCenter(new THREE.Vector3()).toArray();
  const collider=name==='astronaut'?{shape:'capsule',radius:.36,halfHeight:.6,position:[0,0,0]}:name.startsWith('room-')?{shape:'compound',parts:[{shape:'box',halfExtents:[9,.2,8],position:[0,-.2,0]},{shape:'box',halfExtents:[.2,4,8],position:[-9.2,4,0]},{shape:'box',halfExtents:[.2,4,8],position:[9.2,4,0]},{shape:'box',halfExtents:[9,4,.2],position:[0,4,-8.2]},{shape:'box',halfExtents:[9,4,.2],position:[0,4,8.2]},{shape:'box',halfExtents:[9,.2,8],position:[0,8.2,0]}],note:'Door transitions replace corresponding wall collider only when route open.'}:name==='device-crate'?{shape:'box',halfExtents:[.7,.7,.7],position:[0,.7,0]}:{shape:'box',halfExtents:size.map(x=>Number((x*.5).toFixed(4))),position:center.map(x=>Number(x.toFixed(4))),sensor:['device-leak','device-arc','device-oxygen','device-console','device-memory','device-receiver','device-magnetic'].includes(name),use:'Reference simplified collider. Gameplay applies its explicit puzzle interaction and hazard rules.'};
  await write(path.join(output,`assets/data/${name}-colliders.json`),JSON.stringify({schemaVersion:1,id:`orbit-fall.${name}.collision`,unit:'meter',up:'+Y',forward:'+Z',pivot:object.userData.pivot,collider,sockets:object.userData.sockets||object.userData.connectors||[]},null,2)+'\n');
  entries.push({id:`orbit-fall.${name}`,version:MODEL_VERSION,kind:'model',source:'sources/models-source.js',runtime:[relative,`assets/data/${name}-colliders.json`],sha256:{[relative]:crypto.createHash('sha256').update(bytes).digest('hex')},provenance:{method:'original-procedural',creator:'Orbit / Fall asset maker',createdAt:'2026-10-25',tool:'Three.js 0.180.0 GLTFExporter + retained source recipe',promptRecord:'generation/design-record.md',referenceSources:[],rights:'Original procedural work created for stteak; no third-party visual assets or trademarks.'},spec:{unit:'meter',up:'+Y',forward:'+Z',pivot:object.userData.pivot||'base-center',dimensions:size.map(x=>Number(x.toFixed(4))),triangles,collision:'separate simplified collider JSON',materialSlots:[...materialSlots],lod:[{level:0,description:'Single low-poly LOD; room culling and instanced repeating panels, DPR/shadow reduction keep geometry intact.'}],textureColorSpace:{},uv:'Native UVs from Three.js primitive geometry; untextured PBR materials',skeleton:name==='astronaut'?'orbit-suit-v1':null,clips:object.animations?.map(c=>({name:c.name,duration:c.duration,loop:!['brake','damaged'].includes(c.name),rootMotion:false}))||[]},budget:{runtimeBytes:bytes.byteLength,triangles,meshes,instancedMeshes:instanced,skinnedMeshes:skinned,vertexBytes,maxSimultaneousInstances:name.startsWith('room-')?1:name==='astronaut'?1:8},reuse:{tags:[name.split('-')[0],'3d','orbit-kit-v1'],compatibleWith:['orbit-kit-v1']},dependencies:['three@0.180.0'],derivatives:[]});
  console.log(`${name}: ${bytes.byteLength} bytes, ${triangles} triangles`);
}
const manifest={schemaVersion:1,gameId:'orbit-fall',version:MODEL_VERSION,createdAt:'2026-10-25',recipe:'recipes/build-assets.mjs',assets:entries.concat(helperEntries)};
await write(path.resolve(here,'../manifest.json'),JSON.stringify(manifest,null,2)+'\n');
await write(path.join(output,'assets/data/model-catalog.json'),JSON.stringify({schemaVersion:1,unit:'meter',up:'+Y',forward:'+Z',assets:entries.map(x=>({id:x.id,runtime:x.runtime,sha256:x.sha256,budget:x.budget}))},null,2)+'\n');
console.log('Model assets and manifest built.');
