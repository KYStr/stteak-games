import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../../games/signal-zero/node_modules/three/build/three.module.js';
import {StaticBatch} from '../../games/signal-zero/src/static-batch.js';
import {createProp} from '../../games/signal-zero/src/models.js';
import {LEVELS} from '../../games/signal-zero/src/levels.js';

const boundsByMaterial=stage=>{const result=new Map();stage.updateMatrixWorld(true);stage.traverse(o=>{if(!o.isMesh)return;const b=new T.Box3().setFromObject(o);if(!result.has(o.material))result.set(o.material,new T.Box3());result.get(o.material).union(b)});return result};
test('spatial merge preserves transformed bounds, materials and render flags',()=>{
 const stage=new T.Group();stage.position.set(6,2,-1);stage.rotation.y=.2;
 const a=new T.MeshStandardMaterial({color:0x3388cc}),b=new T.MeshBasicMaterial({color:0xeeaa66});
 for(let i=0;i<12;i++){const parent=new T.Group();parent.position.set(i*5,Math.sin(i),0);parent.rotation.z=i*.1;stage.add(parent);const mesh=new T.Mesh(i%2?new T.BoxGeometry(2,1,1).toNonIndexed():new T.BoxGeometry(2,1,1),i%3?a:b);mesh.position.set(.3,.2,0);mesh.castShadow=true;mesh.receiveShadow=true;mesh.renderOrder=2;parent.add(mesh)}
 const before=boundsByMaterial(stage),batch=new StaticBatch(stage,new Set()),after=boundsByMaterial(stage);
 assert.equal(before.size,after.size);for(const [m,bounds] of before){assert.ok(bounds.min.distanceTo(after.get(m).min)<1e-5);assert.ok(bounds.max.distanceTo(after.get(m).max)<1e-5)}
 assert.ok(batch.stats.batches<batch.stats.inputMeshes);
 for(const {mesh} of batch.meshes){assert.ok(mesh.geometry.boundingBox.max.x-mesh.geometry.boundingBox.min.x<=32);assert.equal(mesh.castShadow,true);assert.equal(mesh.receiveShadow,true);assert.equal(mesh.renderOrder,2)}
 batch.dispose();a.dispose();b.dispose();
});
test('animated roots, instances, transparency, lines and multi-material meshes stay separate',()=>{
 const stage=new T.Group(),material=new T.MeshStandardMaterial(),geometry=new T.BoxGeometry();
 const dynamic=new T.Mesh(geometry,material),glass=new T.Mesh(geometry,new T.MeshStandardMaterial({transparent:true})),instanced=new T.InstancedMesh(geometry,material,2),multi=new T.Mesh(geometry,[material]),line=new T.Line(geometry,new T.LineBasicMaterial());
 stage.add(dynamic,glass,instanced,multi,line);stage.updateMatrixWorld(true);const batch=new StaticBatch(stage,new Set([dynamic]));
 for(const object of [dynamic,glass,instanced,multi,line])assert.equal(object.parent,stage);assert.equal(batch.meshes.length,0);batch.dispose();
});
test('Lambert variants cache complete appearance and high restores original material',()=>{
 const stage=new T.Group(),m=new T.MeshStandardMaterial({color:0x3388cc,emissive:0x221100,emissiveIntensity:.8,side:T.DoubleSide,vertexColors:true,depthWrite:false,alphaTest:.2});stage.add(new T.Mesh(new T.BoxGeometry(),m));stage.updateMatrixWorld(true);
 const batch=new StaticBatch(stage,new Set());batch.setSimplified(true);const v=batch.meshes[0].mesh.material;assert.ok(v.isMeshLambertMaterial);for(const k of ['emissiveIntensity','side','vertexColors','depthWrite','depthTest','alphaTest'])assert.equal(v[k],m[k]);assert.ok(v.color.equals(m.color));assert.ok(v.emissive.equals(m.emissive));
 batch.setSimplified(false);assert.equal(batch.meshes[0].mesh.material,m);batch.setSimplified(true);assert.equal(batch.meshes[0].mesh.material,v);assert.equal(batch.variants.size,1);batch.dispose();
});
test('repeated chapter construction releases owned merge resources once and retains shared kit resources',()=>{
 const shared=new T.BoxGeometry(),material=new T.MeshBasicMaterial();let sharedDisposals=0;shared.addEventListener('dispose',()=>sharedDisposals++);
 for(let repeat=0;repeat<5;repeat++){
  const stage=new T.Group();for(const p of LEVELS[0].covers){const prop=createProp('cover',{w:p.w,h:p.h,d:p.d});prop.position.set(p.x,p.y-p.h/2,0);stage.add(prop)}stage.add(new T.Mesh(shared,material));stage.updateMatrixWorld(true);
  const batch=new StaticBatch(stage,new Set());batch.setSimplified(true);let geometryDisposals=0,variantDisposals=0,sourceDisposals=0;
  const geometryCount=batch.geometries.size,variantCount=batch.variants.size,sourceCount=batch.ownedMaterials.size;for(const m of batch.ownedMaterials)m.addEventListener('dispose',()=>sourceDisposals++);for(const g of batch.geometries)g.addEventListener('dispose',()=>geometryDisposals++);for(const m of batch.variants.values())m.addEventListener('dispose',()=>variantDisposals++);
  batch.dispose();batch.dispose();assert.equal(geometryDisposals,geometryCount);assert.equal(variantDisposals,variantCount);assert.equal(sourceDisposals,sourceCount);assert.equal(sharedDisposals,0);
 }
 shared.dispose();material.dispose();
});
