import test from 'node:test';import assert from 'node:assert/strict';
import * as THREE from '../../../public/games/hollow-crown/vendor/three.module.js';
import {SceneView} from '../../../public/games/hollow-crown/scene.js';
test('wave handoff returns obsolete actors first and reuses their exact objects without retaining attack state',()=>{
 let created=0;const view=Object.assign(Object.create(SceneView.prototype),{actors:new Map(),actorList:[],actorPool:new Map(),scene:new THREE.Scene(),softwareRenderer:false,healthGeometry:new THREE.PlaneGeometry(1,1),contactGeometry:new THREE.CircleGeometry(.5),healthBackMaterial:new THREE.MeshBasicMaterial(),healthFrontMaterial:new THREE.MeshBasicMaterial(),contactMaterial:new THREE.MeshBasicMaterial(),kit:{makeActor(){created++;return{group:new THREE.Group(),clips:[]};}}});
 const old=[];for(let i=0;i<4;i++){const a=view.createActor('old-'+i,'infantry');a.lastAttack={obsolete:true};old.push(a);}
 // Dead actors remain authoritative until their wave is actually replaced.
 const next=[{id:'old-0',hp:0},{id:'new-1',hp:100},{id:'new-2',hp:100},{id:'new-3',hp:100}];view.recycleActors(next);assert.equal(view.actors.get('old-0'),old[0]);
 for(let i=1;i<4;i++){const actor=view.createActor(next[i].id,'infantry');assert.ok(old.includes(actor));assert.equal(actor.lastAttack,null);}
 assert.equal(created,4);assert.equal(view.actorList.length,4);view.recycleActors([]);assert.equal(view.actorPool.get('infantry:undefined').length,4);
 for(let i=0;i<4;i++)assert.ok(old.includes(view.createActor('third-'+i,'infantry')));assert.equal(created,4);
});
test('warning fill and instanced ticks keep distinct synchronized materials and release their own resources',()=>{
 const view=Object.assign(Object.create(SceneView.prototype),{warningGroups:new Map(),scene:new THREE.Scene(),elapsed:1});
 const enemy={id:'teacher',x:0,z:0,state:'telegraph',attack:{shape:'cone',range:3,width:1,radius:3,angle:1.5,innerRadius:0}};
 view.warning(enemy);const record=view.warningGroups.get('teacher'),[fill,,ticks]=record.group.children;assert.notEqual(fill.material,ticks.material,'normal and instanced shader flags must not share one material cache');assert.equal(fill.material.opacity,ticks.material.opacity);
 const geometry=fill.geometry;enemy.state='attack';view.warning(enemy);assert.equal(record,view.warningGroups.get('teacher'));assert.equal(fill.geometry,geometry);assert.equal(fill.material.opacity,ticks.material.opacity);assert.equal(fill.material.color.getHex(),ticks.material.color.getHex());
 let disposed=0;for(const material of [record.material,record.tickMaterial,record.outlineMaterial])material.addEventListener('dispose',()=>disposed++);view.disposeWarning(record);assert.equal(disposed,3);
});
