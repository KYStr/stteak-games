import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../../../games/signal-zero/node_modules/three/build/three.module.js';
import {createSecurity,animateSecurity,disposeInstance} from '../../../games/signal-zero/src/models.js';
import {StaticStage} from '../../../games/signal-zero/src/static-stage.js';

function fixture(optimized=true){
 const scene=new T.Scene(),stage=new T.Group(),guard=createSecurity('guard');scene.add(stage);stage.add(guard);
 const skin=guard.getObjectByName('runner-skinned-armor');skin.boundingSphere=new T.Sphere(new T.Vector3(0,.73,0),1.5);skin.frustumCulled=true;
 const camera=new T.PerspectiveCamera(43,16/9,.1,150);camera.position.set(0,3,20);camera.lookAt(0,1,0);
 const sun=new T.DirectionalLight();sun.position.set(60,20,15);sun.target.position.set(60,0,0);
 Object.assign(sun.shadow.camera,{left:-20,right:20,top:14,bottom:-10,near:1,far:65});sun.shadow.camera.updateProjectionMatrix();scene.add(sun,sun.target);
 scene.updateMatrixWorld(true);
 const spatial=optimized?new StaticStage(stage,new Set([guard]),[guard]):null;
 return {scene,stage,guard,skin,camera,sun,spatial,
  render(shadows=true){scene.updateMatrixWorld();camera.updateMatrixWorld();spatial?.updateVisibility(camera,sun,shadows);},
  close(){disposeInstance(stage);sun.shadow.dispose();}
 };
}
function closeEnough(a,b,label){assert.equal(a.length,b.length);for(let i=0;i<a.length;i++)assert.ok(Math.abs(a[i]-b[i])<1e-10,`${label}[${i}]: ${a[i]} != ${b[i]}`);}
function equivalent(a,b){
 const aNodes=[],bNodes=[];a.guard.traverse(o=>aNodes.push(o));b.guard.traverse(o=>bNodes.push(o));assert.equal(aNodes.length,23);
 for(let i=0;i<aNodes.length;i++){
  assert.equal(aNodes[i].name,bNodes[i].name);
  closeEnough(aNodes[i].matrixWorld.elements,bNodes[i].matrixWorld.elements,aNodes[i].name);
 }
 closeEnough(a.skin.bindMatrixInverse.elements,b.skin.bindMatrixInverse.elements,'bind inverse');
 a.skin.skeleton.update();b.skin.skeleton.update();closeEnough(a.skin.skeleton.boneMatrices,b.skin.skeleton.boneMatrices,'palette');
}

test('guards are dynamic siblings of frozen scenery and shadow-only guards remain visible',()=>{
 const f=fixture();try{
  assert.equal(f.spatial.stats.staticRoots,0);assert.equal(f.guard.parent.parent,f.stage);
  f.guard.position.x=60;f.render(false);assert.equal(f.guard.parent.visible,false);
  f.render(true);assert.equal(f.guard.parent.visible,true);assert.equal(f.spatial.stats.visibleGuards,1);
  f.guard.position.x=500;f.render(true);assert.equal(f.guard.parent.visible,false);
  f.guard.position.set(0,0,0);f.render(false);assert.equal(f.guard.parent.visible,true,'current local transform, not stale world matrix');
 }finally{f.close()}
});

test('off-screen guards skip world traversal while animation continues, then refresh on the first visible frame',()=>{
 const actual=fixture(),reference=fixture(false);let worldVisits=0;
 actual.guard.traverse(o=>{const original=o.updateMatrixWorld;o.updateMatrixWorld=function(...args){worldVisits++;return original.apply(this,args)}});
 try{
  const states=['patrol','notice','search','chase','disabled','patrol'];
  for(let i=0;i<180;i++){
   const state=states[Math.floor(i/30)],visible=i%30>=25,x=visible?Math.sin(i)*3:400+i;
   for(const f of [actual,reference]){
    f.guard.position.set(x,i%11*.07,0);animateSecurity(f.guard,{state,dir:i%2?-1:1,disabled:state==='disabled',time:i/60},1/60);
   }
   worldVisits=0;actual.render(false);reference.render(false);
   assert.equal(actual.guard.userData.mixer.time,reference.guard.userData.mixer.time);
   assert.equal(actual.guard.userData.activeAnimation,reference.guard.userData.activeAnimation);
   const aBones=actual.skin.skeleton.bones,bBones=reference.skin.skeleton.bones;
   for(let j=0;j<aBones.length;j++){
    closeEnough(aBones[j].position.toArray(),bBones[j].position.toArray(),'local position');
    closeEnough(aBones[j].quaternion.toArray(),bBones[j].quaternion.toArray(),'local quaternion');
   }
   assert.equal(worldVisits,visible?23:0);
   if(visible)equivalent(actual,reference);
  }
 }finally{actual.close();reference.close()}
});

test('moving camera and light reveal current matrices without a stale frame',()=>{
 const actual=fixture(),reference=fixture(false);
 try{
  for(const f of [actual,reference]){f.guard.position.set(300,2,0);animateSecurity(f.guard,{state:'chase',dir:-1},.08);f.render(true);}
  assert.equal(actual.guard.parent.visible,false);
  for(const f of [actual,reference]){f.camera.position.set(300,4,20);f.camera.lookAt(300,2,0);f.render(false);}
  assert.equal(actual.guard.parent.visible,true);equivalent(actual,reference);
  for(const f of [actual,reference]){f.camera.position.set(0,3,20);f.camera.lookAt(0,1,0);f.sun.position.set(300,20,15);f.sun.target.position.set(300,0,0);animateSecurity(f.guard,{state:'search',dir:1},.04);f.render(true);}
  assert.equal(actual.guard.parent.visible,true);equivalent(actual,reference);
  actual.render(false);assert.equal(actual.guard.parent.visible,false,'quality change removes shadow-only work');
 }finally{actual.close();reference.close()}
});

test('resource traversal and disposal still reach hidden guard geometry and skeleton textures',()=>{
 const f=fixture();f.guard.position.x=500;f.render();assert.equal(f.guard.parent.visible,false);
 f.skin.skeleton.computeBoneTexture();let geometryDisposed=0,textureDisposed=0;
 f.skin.geometry.addEventListener('dispose',()=>geometryDisposed++);f.skin.skeleton.boneTexture.addEventListener('dispose',()=>textureDisposed++);
 f.close();assert.equal(geometryDisposed,1);assert.equal(textureDisposed,1);
});

test('first shadow-only wake uses the complete animated pose after a long hidden interval',()=>{
 const actual=fixture(),reference=fixture(false);
 try{
  for(let i=0;i<120;i++)for(const f of [actual,reference]){
   f.guard.position.set(60,i%7*.03,0);animateSecurity(f.guard,{state:i<60?'patrol':'chase',dir:i%2?-1:1},1/60);f.render(false);
  }
  assert.equal(actual.guard.parent.visible,false);
  for(const f of [actual,reference]){animateSecurity(f.guard,{state:'search',dir:-1},.025);f.render(true);}
  assert.equal(actual.spatial.cameraFrustum.intersectsSphere(actual.guard.parent.worldSphere),false);
  assert.equal(actual.guard.parent.visible,true);equivalent(actual,reference);
 }finally{actual.close();reference.close()}
});

test('manual guard matrices are respected when automatic local composition is disabled',()=>{
 const actual=fixture(),reference=fixture(false);
 try{
  for(const f of [actual,reference]){
   f.guard.matrixAutoUpdate=false;f.guard.position.set(500,0,0);
   f.guard.matrix.makeRotationY(Math.PI).setPosition(2,1,0);f.render(false);
  }
  assert.equal(actual.guard.parent.visible,true);equivalent(actual,reference);
  for(const f of [actual,reference]){f.guard.matrix.setPosition(500,1,0);f.render(false);}
  assert.equal(actual.guard.parent.visible,false);
 }finally{actual.close();reference.close()}
});
