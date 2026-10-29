import { mkdir, writeFile, readFile, copyFile, stat } from 'node:fs/promises';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { createKit, ACTOR_IDS, COLLIDERS, KIT_VERSION } from '../sources/kit.mjs';
import { generateStoneSurfaces } from './stone-surfaces.mjs';

const here=dirname(fileURLToPath(import.meta.url));
const root=resolve(here,'../../../..');
const output=resolve(root,'public/games/hollow-crown/assets/models');
const THREE=await import(pathToFileURL(resolve(root,'games/hollow-crown/node_modules/three/build/three.module.js')));
const {GLTFExporter}=await import(pathToFileURL(resolve(root,'games/hollow-crown/node_modules/three/examples/jsm/exporters/GLTFExporter.js')));
// GLTFExporter uses only these FileReader methods for untextured geometry in Node.
globalThis.FileReader ||= class FileReader {
  readAsArrayBuffer(blob){blob.arrayBuffer().then(buffer=>{this.result=buffer;this.onloadend?.();});}
  readAsDataURL(blob){blob.arrayBuffer().then(buffer=>{this.result=`data:${blob.type||'application/octet-stream'};base64,${Buffer.from(buffer).toString('base64')}`;this.onloadend?.();});}
};
const kit=createKit(THREE),exporter=new GLTFExporter(),assets=[];
await mkdir(output,{recursive:true});
const surfaceMaps=await generateStoneSurfaces(resolve(output,'../textures'));
await copyFile(resolve(here,'../sources/kit.mjs'),resolve(output,'kit.js'));
const hash=data=>createHash('sha256').update(data).digest('hex');
const source='sources/kit.mjs';
function describe(object){
  object.updateMatrixWorld(true);let triangles=0;const slots=new Set();let bones=0;
  object.traverse(o=>{if(o.isBone)bones++;if(o.isMesh){triangles+=(o.geometry.index?.count||o.geometry.attributes.position.count)/3;slots.add(o.material.name);}});
  const size=new THREE.Box3().setFromObject(object).getSize(new THREE.Vector3()).toArray().map(v=>Math.round(v*10000)/10000);
  return{unit:'meter',up:'+Y',forward:'+Z',pivot:'feet-center',dimensions:size,triangles,bones,rig:'rigid meshes parented to named THREE.Bone joints',rootMotion:false,materialSlots:[...slots],materials:'UV-equipped procedural primitives; PBR metallic/roughness; stone slots embed original seamless baseColor/normal/roughness maps',clips:(object.animations||[]).map(c=>({name:c.name,duration:c.duration,loop:!['light','attack','hurt','dodge','death','recover'].includes(c.name)})),weaponMount:'root/hips/spine/arm-r/forearm-r/hand-r/weapon-mount',textureColorSpace:{baseColor:'sRGB',normal:'linear',roughness:'linear'},lod:[],animationEvents:object.userData.animationEvents||{},collision:object.userData.collider||null};
}
function embedStoneTextures(raw){
  const glb=Buffer.from(raw),jsonLength=glb.readUInt32LE(12),json=JSON.parse(glb.toString('utf8',20,20+jsonLength));if(!json.materials?.some(m=>['basalt-stone','ash-stone'].includes(m.name)))return glb;
  const binStart=20+jsonLength,binLength=glb.readUInt32LE(binStart);let bin=glb.subarray(binStart+8,binStart+8+binLength);json.images||=[];json.textures||=[];json.samplers||=[];const sampler=json.samplers.length;json.samplers.push({magFilter:9729,minFilter:9987,wrapS:10497,wrapT:10497});const indices=[];
  for(const bytes of Object.values(surfaceMaps)){const pad=(4-bin.length%4)%4;if(pad)bin=Buffer.concat([bin,Buffer.alloc(pad)]);const view=json.bufferViews.length;json.bufferViews.push({buffer:0,byteOffset:bin.length,byteLength:bytes.length});bin=Buffer.concat([bin,bytes]);const source=json.images.length;json.images.push({bufferView:view,mimeType:'image/png'});indices.push(json.textures.length);json.textures.push({sampler,source});}
  for(const m of json.materials)if(['basalt-stone','ash-stone'].includes(m.name)){m.pbrMetallicRoughness.baseColorTexture={index:indices[0]};m.pbrMetallicRoughness.metallicRoughnessTexture={index:indices[2]};m.pbrMetallicRoughness.roughnessFactor=1;m.normalTexture={index:indices[1],scale:.75};}
  json.buffers[0].byteLength=bin.length;const j=Buffer.from(JSON.stringify(json)),jp=Buffer.concat([j,Buffer.alloc((4-j.length%4)%4,32)]),bp=Buffer.concat([bin,Buffer.alloc((4-bin.length%4)%4)]),header=Buffer.alloc(12),jh=Buffer.alloc(8),bh=Buffer.alloc(8);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(12+8+jp.length+8+bp.length,8);jh.writeUInt32LE(jp.length,0);jh.writeUInt32LE(0x4e4f534a,4);bh.writeUInt32LE(bp.length,0);bh.writeUInt32LE(0x004e4942,4);return Buffer.concat([header,jh,jp,bh,bp]);
}
async function record(id,kind,runtime,spec,extra={}){
  const data=await readFile(resolve(output,runtime));
  assets.push({id:'hollow-crown.'+id,version:KIT_VERSION,kind,source,runtime:['assets/models/'+runtime],sha256:{['assets/models/'+runtime]:hash(data)},provenance:{method:'original-procedural',creator:'Hollow Crown Maker scene-assets assistant',createdAt:'2026-10-25',tool:'Three.js 0.180.0 GLTFExporter; editable JavaScript primitives',promptRecord:'generation/brief.md',referenceSources:[],rights:'Original project geometry, designs, materials and clips; third-party engine Three.js is separately MIT licensed.'},spec,budget:{runtimeBytes:data.byteLength,maxSimultaneousInstances:kind==='model'?12:1},reuse:{tags:[kind,id.split('.').at(-1)],compatibleWith:['hollow-crown-rig-v1','hollow-crown-ruin-kit-v1']},dependencies:[],derivatives:[],...extra});
}
for(const id of ACTOR_IDS){
  const model=kit.makeActor(id);const binary=await exporter.parseAsync(model.group,{binary:true,animations:model.clips,onlyVisible:false});const filename=id+'.glb';await writeFile(resolve(output,filename),Buffer.from(binary));
  await record('character.'+id,'model',filename,describe(model.group),{runtimeUse:'Reusable glTF export of the exact runtime kit geometry and rigid Bone clips. Live game constructs the same asset through assets/models/kit.js to share geometry and material allocations.'});
}
for(const id of ['pillar','altar','candelabrum','wall','banner','floor-tile','rubble','brazier']){
  const prop=kit.makeProp(id);const binary=await exporter.parseAsync(prop,{binary:true,onlyVisible:false});await writeFile(resolve(output,id+'.glb'),embedStoneTextures(binary));await record('environment.'+id,'model',id+'.glb',describe(prop),{runtimeUse:'Runtime uses the identical parametric source in kit.js; repeated pieces use InstancedMesh.'});
}
const low=kit.makeProp('pillar',true);await writeFile(resolve(output,'pillar-low.glb'),embedStoneTextures(await exporter.parseAsync(low,{binary:true})));await record('environment.pillar-low','model','pillar-low.glb',describe(low));
await writeFile(resolve(output,'collision-proxies.json'),JSON.stringify({schemaVersion:1,unit:'meter',up:'+Y',actors:COLLIDERS,environment:Object.fromEntries(['pillar','altar','wall'].map(id=>[id,kit.makeProp(id).userData.collider])),runtimeContract:'Visual colliders are reusable references. The rules module is authoritative; its room obstacle positions and attack shapes are rendered read-only.'},null,2)+'\n');
await record('data.collision-proxies','data','collision-proxies.json',{schemaVersion:1,unit:'meter',coordinates:'Y up, X/Z ground plane',separateFromVisualMeshes:true});
await record('source.runtime-kit','code','kit.js',{language:'JavaScript ES module',threeVersion:'0.180.0',publicExports:['KIT_VERSION','PALETTE','ACTOR_IDS','COLLIDERS','createKit'],dependencies:['../../vendor/three.module.js (injected by scene.js)']});
for(const[name,data]of Object.entries(surfaceMaps)){const path='assets/textures/'+name;assets.push({id:'hollow-crown.material.'+name.replace('.png',''),version:KIT_VERSION,kind:'texture',source:'recipes/stone-surfaces.mjs',runtime:[path],sha256:{[path]:hash(data)},provenance:{method:'original-procedural',creator:'Hollow Crown Maker scene-assets assistant',createdAt:'2026-10-25',tool:'Deterministic periodic noise and PNG encoder in Node.js',promptRecord:'generation/brief.md',referenceSources:[],rights:'Original project procedural pixels; no source photographs or external textures.'},spec:{width:256,height:256,channels:'RGBA',colorSpace:name.includes('basecolor')?'sRGB':'linear',seamless:true,uvScale:'One repeat per standard primitive UV unit; no text or baked lighting',normalConvention:name.includes('normal')?'OpenGL +Y':null},budget:{runtimeBytes:data.length,decodedBytes:256*256*4,maxSimultaneousInstances:1},reuse:{tags:['stone','seamless','PBR'],compatibleWith:['hollow-crown-ruin-kit-v1']},dependencies:[],derivatives:[]});}
const manifest={schemaVersion:1,gameId:'hollow-crown',version:KIT_VERSION,generatedAt:'2026-10-25',rebuild:'node assets/games/hollow-crown/recipes/export-assets.mjs',runtimeModelRoot:'public/games/hollow-crown/',assetPolicy:'Original procedural mesh assets with reusable GLB exports and deterministic seamless PBR textures; live rendering uses the same source kit. No external fonts, photos or images.',relatedManifests:['audio-manifest.json'],assets};
await writeFile(resolve(here,'../manifest.json'),JSON.stringify(manifest,null,2)+'\n');
kit.dispose();
console.log(JSON.stringify({assets:assets.length,bytes:assets.reduce((n,a)=>n+a.budget.runtimeBytes,0),manifest:relative(root,resolve(here,'../manifest.json'))}));
