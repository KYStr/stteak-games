import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../../../..'),assetRoot=path.resolve(here,'..'),runtime=path.join(root,'public/games/orbit-fall');
const manifest=JSON.parse(await fs.readFile(path.join(assetRoot,'manifest.json'),'utf8'));
const {GLTFLoader}=await import(pathToFileURL(path.join(root,'games/orbit-fall/node_modules/three/examples/jsm/loaders/GLTFLoader.js')));
const loader=new GLTFLoader(),results=[];
for(const entry of manifest.assets){assert((await fs.stat(path.resolve(assetRoot,entry.source))).isFile(),`${entry.id} retained source`);
  for(const file of entry.runtime){const data=await fs.readFile(path.join(runtime,file));assert(data.length>0,`${file} empty`);assert.equal(crypto.createHash('sha256').update(data).digest('hex'),entry.sha256[file],`${file} checksum`);
    if(file.endsWith('.glb')){const gltf=await loader.parseAsync(data.buffer.slice(data.byteOffset,data.byteOffset+data.byteLength),'');let meshes=0,instanced=0,skin=0;gltf.scene.traverse(o=>{if(o.isMesh){meshes++;assert(o.geometry.attributes.position.count>0,`${file} geometry`);assert(o.material.isMeshStandardMaterial,`${file} PBR material`);}if(o.isInstancedMesh)instanced++;if(o.isSkinnedMesh){skin++;assert.equal(o.skeleton.bones.length,11,`${file} bone count`);}});assert(meshes>0,`${file} empty model`);if(entry.id.includes('room-'))assert(instanced>=6,`${file} instanced modular panels`);if(entry.id.endsWith('astronaut')){assert.equal(skin,1);assert.deepEqual(gltf.animations.map(x=>x.name).sort(),['anchored','brake','damaged','idle','thrust']);}results.push({id:entry.id,meshes,instanced,skin,clips:gltf.animations.map(x=>x.name),bytes:data.length});}
    if(file.endsWith('.wav')){assert.equal(data.toString('ascii',0,4),'RIFF');assert.equal(data.readUInt32LE(24),24000);assert.equal(data.readUInt16LE(22),1);const frames=(data.length-44)/2;assert.equal(frames,Math.ceil(entry.spec.duration*24000));if(entry.spec.loop)assert(Math.abs(data.readInt16LE(44)-data.readInt16LE(data.length-2))<=1,`${file} loop continuity`);}
  }
}
// 公開子集不包含私人歷史環境快照；此驗證器不讀取或宣稱環境未變。
// Inspect the real generated runtime loader, not only raw GLB data: glTF does not
// encode Three-specific shadow flags, action loops, or per-instance state ownership.
const nativeFetch=globalThis.fetch;globalThis.ProgressEvent=class extends Event{constructor(type,options){super(type);Object.assign(this,options);}};
globalThis.fetch=async input=>{const url=typeof input==='string'?input:input.url||input.href;if(!url.startsWith('file:'))return nativeFetch(input);const bytes=await fs.readFile(fileURLToPath(url));return new Response(bytes,{headers:{'Content-Length':String(bytes.length)}});};
const runtimeModel=await import(pathToFileURL(path.join(runtime,'models.js'))),THREE=await import(pathToFileURL(path.join(runtime,'vendor/three.module.js')));
const loaded=await runtimeModel.loadAssetLibrary();assert.equal(loaded.loaded,18);assert.deepEqual(loaded.failed,[]);
const mirror=runtimeModel.createDevice('mirror'),bounds=new THREE.Box3().setFromObject(mirror);assert(Math.abs(bounds.min.y)<1e-6,'mirror base remains on y=0');
const suit=runtimeModel.createAstronaut();let shadowCount=0;suit.traverse(o=>{if(o.isMesh){assert(o.castShadow&&o.receiveShadow,'GLB shadow flags restored');shadowCount++;}if(o.name.startsWith('arm-shell'))assert(new THREE.Vector3(0,1,0).applyQuaternion(o.getWorldQuaternion(new THREE.Quaternion())).y>.99,'arm sleeve axis is vertical');});assert.equal(shadowCount,42);
const room=runtimeModel.createRoomKit('airlock');room.traverse(o=>{if(o.name.startsWith('ceiling-cutaway-tube'))assert(Math.abs(new THREE.Vector3(0,1,0).applyQuaternion(o.getWorldQuaternion(new THREE.Quaternion())).x)>.99,'ceiling pipe stays horizontal');});
runtimeModel.animateAstronaut(suit,'damaged',0,.016);assert.equal(suit.userData.actions.damaged.loop,THREE.LoopOnce);assert.equal(suit.userData.actions.brake.loop,THREE.LoopOnce);
const arc=runtimeModel.createDevice('arc','ready');runtimeModel.animateDevice(arc,4);arc.traverse(o=>{if(o.name.startsWith('arc-segment'))assert(!o.visible,'safe state hides arc regardless of animation time');});runtimeModel.setDeviceState(arc,'danger');runtimeModel.animateDevice(arc,0);arc.traverse(o=>{if(o.name.startsWith('arc-segment'))assert(o.visible,'danger remains visible with reduced-motion time zero');});
const consoleA=runtimeModel.createDevice('console','danger'),consoleB=runtimeModel.createDevice('console','powered');assert.notEqual(consoleA.getObjectByName('state-light').material,consoleB.getObjectByName('state-light').material,'state materials are per instance');
for(const obj of [mirror,suit,room,arc,consoleA,consoleB])runtimeModel.disposeObject(obj);runtimeModel.disposeAssetLibrary();globalThis.fetch=nativeFetch;
const report={schemaVersion:1,checkedAt:new Date().toISOString(),assets:manifest.assets.length,models:results,checks:{retainedSources:true,runtimeHashes:true,nonemptyGeometry:true,pbrMaterials:true,instancedRooms:true,skeletonAndNamedClips:true,wavSampleRateAndDuration:true,loopSampleContinuity:true,persistentEnvironmentCheck:'NOT_INCLUDED_PUBLIC_SUBSET',verticalCylinderAxes:true,horizontalCeilingPipes:true,mirrorBaseAtZero:true,loadedShadowFlags:true,nonLoopingDamageAndBrake:true,explicitArcState:true,instanceMaterialIsolation:true},limitations:['No claim of perceptual audio review or device performance; integrated browser and real-device validation belongs to the independent reviewer.']}; // 公開衍生只標記未包含歷史環境檢查；其餘資產檢查不變。
await fs.mkdir(path.join(assetRoot,'generation'),{recursive:true});await fs.writeFile(path.join(assetRoot,'generation/verification.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({assets:report.assets,models:results.length,checks:report.checks},null,2));
