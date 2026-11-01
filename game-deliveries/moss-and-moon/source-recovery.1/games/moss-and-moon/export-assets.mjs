import { readFile,writeFile,mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { GLTFExporter } from './node_modules/three/examples/jsm/exporters/GLTFExporter.js';
import * as kit from '../../assets/games/moss-and-moon/sources/model-kit.mjs';

// Node Blob implements arrayBuffer; this tiny adapter supplies the asynchronous
// browser FileReader contract used by the pinned Three.js GLTF exporter.
globalThis.FileReader=class FileReader {
  readAsArrayBuffer(blob){blob.arrayBuffer().then(value=>{this.result=value;this.onloadend?.({target:this});},error=>this.onerror?.(error));}
  readAsDataURL(blob){blob.arrayBuffer().then(value=>{this.result=`data:${blob.type};base64,${Buffer.from(value).toString('base64')}`;this.onloadend?.({target:this});},error=>this.onerror?.(error));}
};
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const assetRoot=path.join(root,'assets/games/moss-and-moon');
const publicRoot=path.join(root,'public/games/moss-and-moon');
const hash=data=>createHash('sha256').update(data).digest('hex');
const source=await readFile(path.join(assetRoot,'sources/model-kit.mjs'),'utf8');
const runtime=source.replace("'../../../../games/moss-and-moon/node_modules/three/build/three.module.js'","'./vendor/three.module.js'");
await mkdir(path.join(publicRoot,'assets/models'),{recursive:true});
await mkdir(path.join(publicRoot,'assets/data'),{recursive:true});
await writeFile(path.join(publicRoot,'models.js'),runtime);
const assets=[];
for(const id of kit.PLANT_IDS)for(let stage=0;stage<4;stage++)assets.push({object:kit.createPlant(id,stage),category:'plant',max:64,tags:[id,'garden','growth-'+stage]});
for(const id of kit.DECORATION_IDS)assets.push({object:kit.createDecoration(id),category:'decoration',max:64,tags:[id,'furniture','placeable']});
for(const id of kit.DISCOVERY_IDS)assets.push({object:kit.createDiscovery(id),category:'discovery',max:1,tags:[id,'nature','observe']});
for(let index=0;index<7;index++)assets.push({object:kit.createCharacter(index),category:'character',max:index?1:1,tags:[index?'resident':'player','moss-humanoid-v1']});
for(const id of ['forest','brook','hill'])assets.push({object:kit.createTerrain(id),category:'terrain',max:12,tags:[id,'modular','2m-grid']});
for(const id of ['watering-can','trowel','basket','hoe','seed-pouch'])assets.push({object:kit.createTool(id),category:'tool',max:1,tags:[id,'handheld']});
for(const id of ['oak','willow','pine','birch'])assets.push({object:kit.createTree(id),category:'environment',max:20,tags:[id,'foliage']});
assets.push({object:kit.createHouse(),category:'architecture',max:1,tags:['cottage','home']},{object:kit.createRock(),category:'environment',max:18,tags:['moss','rock']});
const exporter=new GLTFExporter(),manifest=[],colliders={},modelIndex={};
for(const {object,category,max,tags} of assets){
  const stats=kit.getModelStats(object);
  const glb=await exporter.parseAsync(object,{binary:true,animations:object.animations,onlyVisible:true,trs:!!object.animations.length});
  const data=Buffer.from(glb),relative=`assets/models/${object.name}.glb`;
  await writeFile(path.join(publicRoot,relative),data);
  colliders[object.userData.assetId]={...object.userData.collider,visualFile:relative};
  modelIndex[object.userData.assetId]={file:relative,bytes:data.length,sha256:hash(data),category,animations:stats.animations};
  manifest.push({
    id:object.userData.assetId,version:kit.ASSET_VERSION,kind:category==='character'?'skinned-model':'model',
    source:'sources/model-kit.mjs',runtime:['models.js',relative],sha256:{'models.js':hash(runtime),[relative]:hash(data)},
    provenance:{method:'original-procedural',creator:'Moss & Moon Maker / asset assistant',createdAt:'2026-10-25',tool:'Three.js 0.180.0 GLTFExporter; Node.js',promptRecord:'generation/original-design.md',referenceSources:[],rights:'Original project-authored procedural geometry and palette. No external model, texture, character or logo source. Three.js is a separately licensed MIT runtime dependency.'},
    spec:{unit:'meter',up:'+Y',forward:'+Z',pivot:category==='terrain'?'tile surface center; ground depth extends below Y=0':'base-center',dimensions:stats.dimensions,triangles:stats.triangles,meshes:stats.meshes,skinnedMeshes:stats.skinnedMeshes,collision:{file:'assets/data/colliders.json',key:object.userData.assetId,separateFromVisual:true},materialSlots:stats.materialSlots,lod:[],lodPolicy:category==='plant'||category==='decoration'?'One closed 3D grid geometry, instancing-compatible. Every authored component is retained; rounded parts use 20 triangles, leaves 8 triangles and mushroom caps 48 triangles, with reference primitive bounds preserved. Main and shadow passes use the same geometry.':'Single detailed geometry at low polygon budget. Environment, architecture, characters, discoveries and tools retain their authored primitive subdivisions.',textureColorSpace:{},material:'Vertex-colour PBR; vertex RGB stored in linear colour space; metallic 0.035, roughness 0.87; built-in primitive UVs preserved, no texture dependency.',animations:stats.animations,skeleton:object.userData.skeleton||null},
    budget:{runtimeBytes:data.length,maxSimultaneousInstances:max,firstLoadPolicy:'Runtime factories create cached procedural geometry; portable GLB is an optional equivalent and is not eagerly downloaded.'},
    reuse:{tags,compatibleWith:category==='character'?['moss-humanoid-v1']:['moss-model-kit-v1']},dependencies:['three@0.180.0','assets/data/colliders.json'],derivatives:[{path:relative,recipe:'../../../../games/moss-and-moon/export-assets.mjs',format:'glTF 2.0 binary',bytes:data.length,sha256:hash(data)}]
  });
}
await writeFile(path.join(publicRoot,'assets/data/colliders.json'),JSON.stringify({schema:1,unit:'meter',up:'+Y',forward:'+Z',assets:colliders},null,2)+'\n');
await writeFile(path.join(publicRoot,'assets/data/model-index.json'),JSON.stringify({schema:1,version:kit.ASSET_VERSION,assets:modelIndex},null,2)+'\n');
const total=manifest.reduce((sum,item)=>sum+item.budget.runtimeBytes,0);
const document={schema:1,game:'moss-and-moon',version:kit.ASSET_VERSION,sourceSha256:hash(source),sourceBytes:Buffer.byteLength(source),runtimeFactory:{path:'models.js',sha256:hash(runtime),bytes:Buffer.byteLength(runtime)},units:'metres',palette:kit.PALETTE,exporter:'Three.js 0.180.0 GLTFExporter',assetCount:manifest.length,totalPortableGlbBytes:total,notes:['The scene runtime uses procedural factories. GLB files are portable, equivalent derivatives for reuse and interchange; optional downloads only.','No raster textures are required: handmade surfaces use opaque PBR materials and per-vertex linear colours.','Collision is separately defined, never inferred from decorative foliage. Runtime game rules choose where collision is blocking.','No measured FPS, memory or draw-call result is claimed by this manifest; renderer evidence belongs to independent review.'],assets:manifest};
await writeFile(path.join(assetRoot,'manifest.json'),JSON.stringify(document,null,2)+'\n');
await writeFile(path.join(publicRoot,'assets/data/asset-manifest.json'),JSON.stringify(document,null,2)+'\n');
console.log(JSON.stringify({assetCount:manifest.length,totalPortableGlbBytes:total,sourceSha256:document.sourceSha256,characters:manifest.filter(x=>x.kind==='skinned-model').map(x=>({id:x.id,clips:x.spec.animations.map(c=>c.name),triangles:x.spec.triangles})),maxTriangles:Math.max(...manifest.map(x=>x.spec.triangles))},null,2));
