import {DISTRICT_LOD} from '../src/presentation.js'; // 配方記錄真實渲染距離，而非不存在的180公尺mesh LOD。
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { makeVehicle,makeEnvironmentModule,VEHICLE_SPECS } from '../../../assets/games/neon-drift/sources/models.js';

// GLTFExporter uses FileReader for embedded buffers. This local Node adapter performs
// the same Blob conversion without a DOM, remote service or nondeterministic media.
globalThis.FileReader=class {
  readAsArrayBuffer(blob){blob.arrayBuffer().then(result=>{this.result=result;this.onloadend?.();});}
  readAsDataURL(blob){blob.arrayBuffer().then(buffer=>{this.result=`data:${blob.type||'application/octet-stream'};base64,${Buffer.from(buffer).toString('base64')}`;this.onloadend?.();});}
};
const repo=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const assets=path.join(repo,'assets/games/neon-drift'),out=path.join(assets,'generated');
await fs.mkdir(path.join(out,'models'),{recursive:true});await fs.mkdir(path.join(out,'colliders'),{recursive:true});
const sha=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const records=[];
const provenance={method:'original-procedural',creator:'Neon Drift Maker / 3D asset assistant',createdAt:'2026-10-25',tool:'Three.js 0.170.0 GLTFExporter / Node.js',promptRecord:'generation/vehicle-kit.md',referenceSources:[],rights:'Original project geometry and material design. Distributed with the project; no third-party models, textures, logos or fonts.'};
for(const [id,spec] of Object.entries(VEHICLE_SPECS)){
  const model=makeVehicle(THREE,id);
  const gltf=await new GLTFExporter().parseAsync(model,{binary:false,animations:model.animations,onlyVisible:false,trs:true});
  const data=Buffer.from(JSON.stringify(gltf));await fs.writeFile(path.join(out,'models',`${id}.gltf`),data);
  const collider={id:`neon-drift.collider.${id}`,version:'1.0.0',unit:'meter',up:'+Y',forward:'+Z',pivot:'road-center',shape:'box',center:[0,.66,0],halfExtents:[spec.width*.47,.62,spec.length*.47],wheelMounts:[[-spec.width*.49,.35,-spec.axle*.5],[spec.width*.49,.35,-spec.axle*.5],[-spec.width*.49,.35,spec.axle*.5],[spec.width*.49,.35,spec.axle*.5]],physicsNote:'Track-space corridor collision uses the independent vehicle envelope; visual triangle meshes are not collision geometry.'};
  const collisionData=Buffer.from(JSON.stringify(collider,null,2));await fs.writeFile(path.join(out,'colliders',`${id}.json`),collisionData);
  let triangles=0,meshCount=0;model.traverse(o=>{if(o.isMesh){meshCount++;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;}});
  const actualDimensions=new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3()).toArray().map(v=>Math.round(v*10000)/10000);
  const runtime=`models/${id}.gltf`,collisionRuntime=`colliders/${id}.json`;
  records.push({id:`neon-drift.vehicle.${id}`,version:'1.0.0',kind:'model',source:'sources/models.js',runtime:[runtime,collisionRuntime],sha256:{[runtime]:sha(data),[collisionRuntime]:sha(collisionData)},provenance,spec:{unit:'meter',up:'+Y',forward:'+Z',pivot:'road-center',dimensions:actualDimensions,triangles,meshes:meshCount,collision:collisionRuntime,materialSlots:['paint','glass','trim','rubber','rim','headlight','brake','decal'],uv:'Generated UVs on body/cabin and Three.js primitive UVs on modular pieces.',rig:'Rigid vehicle hierarchy, no skin skeleton; wheel-front-left/right and wheel-rear-left/right are explicit mounting groups.',animations:[{name:'wheel-spin',duration:1,loop:true,rootMotion:false},{name:'steer-left',duration:.25,loop:false,rootMotion:false}],lod:[{level:0,triangles,distance:0},{level:1,policy:'Ghost uses identical reusable geometry with transparent material; no extra vehicle topology.'}],textureColorSpace:{baseColor:'sRGB',normal:'linear'},textures:'No external texture dependency. PBR base colors, metalness, roughness and emissive slots.'},budget:{runtimeBytes:data.length+collisionData.length,maxSimultaneousInstances:2},reuse:{tags:['original','vehicle','rigid','paintable','wheel-mounts'],compatibleWith:['neon-vehicle-rigid-v1']},dependencies:['three@0.170.0'],derivatives:[]});
}
for(const kind of ['dock-warehouse','highway-tower','oldtown-shop']){
  const model=makeEnvironmentModule(THREE,kind);const gltf=await new GLTFExporter().parseAsync(model,{binary:false});const data=Buffer.from(JSON.stringify(gltf));await fs.writeFile(path.join(out,'models',`${kind}.gltf`),data);
  const runtime=`models/${kind}.gltf`;
  records.push({id:`neon-drift.environment.${kind}`,version:'1.0.0',kind:'model',source:'sources/models.js',runtime:[runtime],sha256:{[runtime]:sha(data)},provenance,spec:{unit:'meter',up:'+Y',forward:'+Z',pivot:'base-center',dimensions:new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3()).toArray().map(v=>Math.round(v*10000)/10000),triangles:24,collision:'Static scenery exclusion outside drivable corridor and camera clearance; not drivable.',materialSlots:['structure','neon'],lod:[{level:0,triangles:24,distance:0},{level:1,triangles:12,distance:DISTRICT_LOD.rooflines,removedMesh:'neon-cornice',policy:'compact-visible-instances'}],runtimeDetailLod:{windowBands:{distance:DISTRICT_LOD.windowBands,source:'runtime-procedural',policy:'compact-visible-instances'}},textureColorSpace:{baseColor:'sRGB'},grid:1},budget:{runtimeBytes:data.length,maxSimultaneousInstances:160},reuse:{tags:['modular','district','instancing'],compatibleWith:['neon-city-grid-v1']},dependencies:['three@0.170.0'],derivatives:[]}); // 屋頂移除實際為220公尺；窗帶另列程序細節契約。
}
const manifest={schemaVersion:1,gameId:'neon-drift',version:'1.0.0',generatedAt:'2026-10-25',sourceRecipe:'../../../games/neon-drift/tools/generate-assets.mjs',runtimeBase:'public/games/neon-drift/assets/',coordinateContract:{unit:'meter',up:'+Y',forward:'+Z',pivot:'road-center for cars; base-center for scenery'},assets:records,budgets:{initialTransferTargetBytes:8000000,maxVehicleInstances:2,maxDynamicLights:4,shadowMaps:0,postprocess:'ACES tone mapping; no full-screen bloom or reflection pass',textureBytesDecoded:0,geometryPolicy:'Instanced road furniture and buildings. Window and roof detail removed at 170/220 m; coarse skyline boxes cull at 280/440 m by quality. No sprite replacement for core objects.'}};
manifest.presentationContract={source:'games/neon-drift/src/presentation.js',lod:DISTRICT_LOD}; // 窗帶是runtime程序幾何，不冒充匯出模型的第二mesh。
manifest.proceduralSources=[];
for(const [id,source,description] of [
  ['neon-drift.road-kit','games/neon-drift/src/renderer.js','Editable road ribbons, ramps, 3D curbs, armco, posts, road details (lane paint / kerbs / guide lamps / chevrons / puddles / start checkers / drain grates), contact shadows and district instancing. Bundled into runtime game.js.'],
  ['neon-drift.track-layouts','games/neon-drift/src/content.js','Three authored closed courses with elevation, width, checkpoint distances and optional legal offset corridors. Also supplies independent collision and recovery coordinates.'],
  ['neon-drift.presentation','games/neon-drift/src/presentation.js','Shared data-driven menu/theme and exact distance-culling contract; not GPU measurements.'], // 保留新共享契約的來源hash。
  ['neon-drift.vehicle-kit','assets/games/neon-drift/sources/models.js','Three original rigid vehicle bodies, wheel mounts, light modules, material slots and three geometric decal patterns.']
]){const bytes=await fs.readFile(path.join(repo,source));manifest.proceduralSources.push({id,source,sha256:sha(bytes),bytes:bytes.length,description,provenance});}
await fs.writeFile(path.join(assets,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({assets:records.length,bytes:records.reduce((sum,r)=>sum+r.budget.runtimeBytes,0),output:out},null,2));
