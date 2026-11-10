import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from '../../games/aetherwake/node_modules/three/build/three.module.js';
import { AetherScene, NavigationLabelOcclusion } from '../../games/aetherwake/src/scene.js';

function wind(data) {
  return {data, group:{visible:true,userData:{update(dt){this.updates.push(dt);},updates:[]}},
    halfLength:data.start?Math.abs(data.end.x-data.start.x)/2:0,
    bounds:new THREE.Sphere(new THREE.Vector3(data.x,0,data.z),data.boundRadius||10),animationDt:0};
}
test('software wind animation is bounded at 20 Hz; full crossing corridors, nearest corridor and local thermal survive culling', () => {
  const local=wind({type:'thermal',x:0,z:0,radius:20});
  const nearest=wind({type:'tailwind',x:0,z:20,start:{x:-10,z:20},end:{x:10,z:20}});
  const crossing=wind({type:'tailwind',x:180,z:-50,start:{x:-20,z:-50},end:{x:380,z:-50},boundRadius:201});
  const outside=wind({type:'tailwind',x:220,z:50,start:{x:200,z:50},end:{x:240,z:50}});
  const camera=new THREE.PerspectiveCamera(56,16/9,.3,1000);camera.updateMatrixWorld();
  const scene={quality:'auto',autoScale:.65,camera,menu:false,reduced:false,
    winds:[local,nearest,crossing,outside],windFrustum:new THREE.Frustum(),viewProjection:new THREE.Matrix4()};
  const state={player:{x:0,z:0},routeStyle:'safe',elapsed:1,seed:2718};
  for(let i=0;i<2;i++) AetherScene.prototype.updateWorldWinds.call(scene,state,1/60);
  assert.equal(local.group.userData.updates.length,0);
  AetherScene.prototype.updateWorldWinds.call(scene,state,1/60);
  for(const item of [local,nearest,crossing]) {assert.equal(item.group.visible,true);assert.equal(item.group.userData.updates.length,1);}
  assert.equal(outside.group.visible,false);
  scene.reduced=true;
  AetherScene.prototype.updateWorldWinds.call(scene,state,.1);
  assert.equal(local.group.userData.updates.length,1);
  nearest.data.routeId='optional';nearest.data.style='shortcut';
  AetherScene.prototype.updateWorldWinds.call(scene,state,.01);
  assert.equal(nearest.group.visible,false,'Route changes take effect without waiting for an animation upload');
});
test('navigation occlusion keeps the transform anchor after resizing and excludes overlapping cards', () => {
  const label={style:{},getBoundingClientRect:()=>({left:380,top:260,width:240,height:80})};
  const card={getBoundingClientRect:()=>({left:450,right:650,top:240,bottom:400,width:200,height:160})};
  class Observer {observe(){}disconnect(){}}
  const occlusion=new NavigationLabelOcclusion(label,card,Observer);
  occlusion.place(500,300);occlusion.refresh();
  assert.deepEqual(occlusion.origin,{x:0,y:0});
  assert.equal(label.style.visibility,'hidden');
  occlusion.place(200,150);assert.equal(label.style.visibility,'');
  label.getBoundingClientRect=()=>({left:80,top:110,width:240,height:80});
  occlusion.refresh();assert.deepEqual(occlusion.origin,{x:0,y:0});
  occlusion.dispose();
});
