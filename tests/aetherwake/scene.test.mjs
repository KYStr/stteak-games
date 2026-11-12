import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from '../../games/aetherwake/node_modules/three/build/three.module.js';
import { AetherScene, NavigationLabelOcclusion, packVisibleWinds, positionLabel } from '../../games/aetherwake/src/scene.js';
import { createIsland } from '../../games/aetherwake/src/models.js';

test('all six terraces keep shared patch depth priorities above ground and below stepping markers', () => {
  let sharedTurf, sharedSand;
  for (const [index, radius] of [38,34,34,41,34,38].entries()) {
    const island = createIsland({radius, index, region:[0,0,1,2,1,2][index]});
    const high = island.children[0].levels[0].object;
    const turf = high.getObjectByName('terrain-patch-turf-merged');
    const sand = high.getObjectByName('terrain-patch-sand-merged');
    const terrace = high.getObjectByName(`island-${index}-terrace-merged`);
    assert.ok(turf && sand && terrace, `Island ${index} has both batched patch colours`);
    for (const patch of [turf, sand]) {
      assert.equal(patch.material.polygonOffset, true);
      patch.geometry.computeBoundingBox(); terrace.geometry.computeBoundingBox();
      const top = patch.geometry.boundingBox.max.y;
      assert.ok(top > terrace.geometry.boundingBox.max.y && top < .05);
      const expected=patch===turf?.02:.03;
      assert.ok(Math.abs(top-expected)<1e-6);
      assert.ok(Math.abs(patch.geometry.boundingBox.min.y-expected)<1e-6);
      const normals=patch.geometry.getAttribute('normal');
      for(let n=0;n<normals.count;n++)assert.ok(normals.getY(n)>.999);
      assert.equal(patch.castShadow,false);
      assert.equal(patch.material.polygonOffsetFactor,0);
    }
    assert.equal(terrace.castShadow,true);
    assert.ok(sand.material.polygonOffsetUnits < turf.material.polygonOffsetUnits);
    sharedTurf ??= turf.material; sharedSand ??= sand.material;
    assert.equal(turf.material, sharedTurf); assert.equal(sand.material, sharedSand);
    const structuralSand = high.getObjectByName('mineral-sand-merged').material;
    assert.equal(structuralSand.polygonOffset, false, 'Architectural slabs retain their own depth');
    assert.notEqual(structuralSand, sand.material);
  }
});

function wind(data) {
  return {data, group:{visible:true,userData:{update(dt){this.updates.push(dt);},updates:[]}},
    halfLength:data.start?Math.abs(data.end.x-data.start.x)/2:0,
    bounds:new THREE.Sphere(new THREE.Vector3(data.x,0,data.z),data.boundRadius||10),animationDt:0};
}
test('software wind animation is bounded at 20 Hz; full crossing corridors, nearest corridor and local thermal survive culling', () => {
  const local=wind({type:'thermal',x:0,z:0,radius:20});
  const nearest=wind({type:'tailwind',routeId:'test-safe',style:'safe',x:0,z:20,start:{x:-10,z:20},end:{x:10,z:20}});
  const crossing=wind({type:'tailwind',x:180,z:-50,start:{x:-20,z:-50},end:{x:380,z:-50},boundRadius:201});
  const outside=wind({type:'tailwind',x:220,z:50,start:{x:200,z:50},end:{x:240,z:50}});
  const camera=new THREE.PerspectiveCamera(56,16/9,.3,1000);camera.updateMatrixWorld();
  const scene={quality:'auto',autoScale:.65,camera,menu:false,reduced:false,
    winds:[local,nearest,crossing,outside],windFrustum:new THREE.Frustum(),viewProjection:new THREE.Matrix4()};
  scene.packedWinds=packVisibleWinds(scene.winds);
  const state={player:{x:0,z:0},routeStyle:'safe',elapsed:1,seed:2718};
  for(let i=0;i<2;i++) AetherScene.prototype.updateWorldWinds.call(scene,state,1/60);
  assert.equal(local.group.userData.updates.length,0);
  AetherScene.prototype.updateWorldWinds.call(scene,state,1/60);
  for(const item of [local,nearest,crossing]) {assert.equal(item.group.visible,true);assert.equal(item.group.userData.updates.length,1);}
  assert.equal(outside.group.visible,false);
  scene.reduced=true;
  AetherScene.prototype.updateWorldWinds.call(scene,state,.1);
  assert.equal(local.group.userData.updates.length,1);
  state.routeStyle='shortcut';
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

test('label fallback places the first frame immediately and retains its actual anchor between HUD ticks',()=>{
  const record={label:{style:{}},x:NaN,y:NaN,bottom:false,translate:null};
  positionLabel(record,140.4,105.2,false);
  assert.deepEqual([record.x,record.y],[140,105]);
  const first=record.label.style.transform;
  positionLabel(record,240.2,150.4,false);
  assert.equal(record.label.style.transform,first);assert.deepEqual([record.x,record.y],[140,105]);
  positionLabel(record,240.2,150.4,true);
  assert.deepEqual([record.x,record.y],[240,150]);assert.notEqual(record.label.style.transform,first);
});
