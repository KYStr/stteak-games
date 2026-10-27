import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../../../games/signal-zero/node_modules/three/build/three.module.js';
import {StaticStage} from '../../../games/signal-zero/src/static-stage.js';

function fixture(){
 const scene=new T.Scene(),stage=new T.Group();scene.add(stage);
 const make=(x,width=2)=>{const m=new T.Mesh(new T.BoxGeometry(width,2,2),new T.MeshBasicMaterial());m.position.set(x,1,0);stage.add(m);return m};
 const near=make(0),shadowOnly=make(60),remote=make(200),wide=make(500,500),dynamic=make(3);
 scene.updateMatrixWorld(true);const before=[near,shadowOnly,remote,wide].map(o=>o.matrixWorld.toArray());
 const spatial=new StaticStage(stage,new Set([dynamic]));
 const camera=new T.PerspectiveCamera(43,16/9,.1,150);camera.position.set(0,3,20);camera.lookAt(0,1,0);camera.updateMatrixWorld(true);
 const sun=new T.DirectionalLight();sun.position.set(60,20,15);sun.target.position.set(60,0,0);Object.assign(sun.shadow.camera,{left:-20,right:20,top:14,bottom:-10,near:1,far:65});sun.shadow.camera.updateProjectionMatrix();scene.add(sun,sun.target);scene.updateMatrixWorld(true);
 return {scene,stage,near,shadowOnly,remote,wide,dynamic,spatial,camera,sun,before};
}
test('scenery is bounded conservatively and dynamic roots retain their parent',()=>{
 const f=fixture();assert.equal(f.dynamic.parent,f.stage);assert.equal(f.spatial.stats.staticRoots,4);
 for(const chunk of f.spatial.chunks){
  for(const o of chunk.children){const box=new T.Box3().setFromObject(o);for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z])assert.ok(chunk.worldSphere.distanceToPoint(new T.Vector3(x,y,z))<1e-9);}
 }
 assert.notEqual(f.wide.parent,f.remote.parent,'wide scenery uses its own conservative bucket');
});
test('shadow-only casters remain while off-camera/off-shadow chunks are skipped',()=>{
 const f=fixture();f.spatial.updateVisibility(f.camera,f.sun,false);
 assert.equal(f.near.parent.visible,true);assert.equal(f.shadowOnly.parent.visible,false);assert.equal(f.remote.parent.visible,false);
 f.spatial.updateVisibility(f.camera,f.sun,true);
 assert.equal(f.near.parent.visible,true);assert.equal(f.shadowOnly.parent.visible,true);assert.equal(f.remote.parent.visible,false);
});
test('cached world matrices skip static traversal while dynamic movement still updates',()=>{
 const f=fixture();let staticVisits=0,dynamicVisits=0;
 for(const o of [f.near,f.shadowOnly,f.remote,f.wide]){const original=o.updateMatrixWorld;o.updateMatrixWorld=function(...args){staticVisits++;return original.apply(this,args)}}
 const original=f.dynamic.updateMatrixWorld;f.dynamic.updateMatrixWorld=function(...args){dynamicVisits++;return original.apply(this,args)};
 for(let i=0;i<100;i++){f.dynamic.position.x=i;f.scene.updateMatrixWorld();}
 assert.equal(staticVisits,0);assert.equal(dynamicVisits,100);assert.equal(f.dynamic.matrixWorld.elements[12],99);
 [f.near,f.shadowOnly,f.remote,f.wide].forEach((o,i)=>assert.deepEqual(o.matrixWorld.toArray(),f.before[i]));
});
test('ordinary resource traversal still reaches hidden scenery',()=>{
 const f=fixture();f.spatial.updateVisibility(f.camera,f.sun,false);const visited=new Set();f.stage.traverse(o=>visited.add(o));
 for(const o of [f.near,f.shadowOnly,f.remote,f.wide,f.dynamic])assert.ok(visited.has(o));
});
