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

test('actual identical warnings share immutable geometry while materials and instance buffers remain separate',()=>{
 const view=Object.assign(Object.create(SceneView.prototype),{warningGroups:new Map(),scene:new THREE.Scene(),elapsed:1});
 const attack={shape:'cone',range:3,width:1,radius:3,angle:1.5,innerRadius:0};view.warning({id:'a',x:0,z:0,state:'telegraph',attack});view.warning({id:'b',x:1,z:0,state:'telegraph',attack:{...attack}});
 const a=view.warningGroups.get('a'),b=view.warningGroups.get('b');assert.equal(a.geometries,b.geometries);assert.notEqual(a.material,b.material);assert.notEqual(a.tickMaterial,b.tickMaterial);assert.notEqual(a.group.children[2].instanceMatrix,b.group.children[2].instanceMatrix);
 let disposed=0;for(const g of a.geometries)g.addEventListener('dispose',()=>disposed++);
 view.disposeWarning(a);view.warningGroups.delete('a');view.clearWarningGeometryCache();assert.equal(disposed,0,'live peer retains shared geometry');view.disposeWarning(b);view.warningGroups.clear();view.clearWarningGeometryCache();assert.equal(disposed,3);view.clearWarningGeometryCache();assert.equal(disposed,3,'templates dispose exactly once');assert.equal(view.warningGeometryCache.size,0);
});

test('replacement waves reuse warning objects and release prior attack references',()=>{
 const view=Object.assign(Object.create(SceneView.prototype),{warningGroups:new Map(),actors:new Map(),scene:new THREE.Scene(),elapsed:1});
 const attack={shape:'cone',range:3,width:1,radius:3,angle:1.5,innerRadius:0},old=[];
 for(let i=0;i<4;i++){view.warning({id:'old-'+i,x:i,z:0,state:'telegraph',attack});old.push(view.warningGroups.get('old-'+i));}
 view.warningGroups.forEach(view.pruneWarning,view);assert.equal(view.warningGroups.size,0);assert.ok(old.every(w=>w.attackRef===null));
 for(let i=0;i<4;i++){const current={...attack};view.warning({id:'new-'+i,x:i,z:0,state:'telegraph',attack:current});const record=view.warningGroups.get('new-'+i);assert.ok(old.includes(record));assert.equal(record.attackRef,current);assert.equal(record.group.name,'attack-warning-new-'+i);}
 assert.equal(view.warningGeometryCache.size,1);view.warningGroups.forEach(view.pruneWarning,view);view.clearWarningGeometryCache();assert.equal(view.warningGeometryCache.size,0);assert.ok(old.every(w=>w.disposed));
});

function poseActor(){const group=new THREE.Group(),mixer=new THREE.AnimationMixer(group);return{group,mixer,actions:{idle:mixer.clipAction(new THREE.AnimationClip('idle',1,[])),death:mixer.clipAction(new THREE.AnimationClip('death',1,[]))},current:'idle',lastAttack:null,type:'infantry',positionHistory:new Float64Array(2),first:true,healthHp:NaN,healthMax:NaN,facingAngle:NaN,contact:new THREE.Object3D(),health:new THREE.Object3D(),healthFront:new THREE.Object3D()};}
test('pose cache restores camp rotation and refreshes health when it becomes visible',()=>{
 const view=Object.assign(Object.create(SceneView.prototype),{quality:'low',camera:new THREE.OrthographicCamera(),playerMarker:new THREE.Mesh(),facingMarker:new THREE.Mesh()});
 const player=poseActor(),p={x:0,z:3,angle:Math.PI,hp:120,maxHp:120,action:'idle'};view.animateActor(player,p,.016,true);player.group.rotation.y=-.42;view.animateActor(player,p,.016,true);assert.equal(player.group.rotation.y,Math.PI);
 const actor=poseActor(),e={x:1,z:2,angle:.4,hp:100,maxHp:100,state:'idle'};view.animateActor(actor,e,.016);assert.equal(actor.health.visible,false);
 view.camera.quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),.2);e.hp=80;view.animateActor(actor,e,.016);assert.equal(actor.health.visible,true);assert.equal(actor.health.position.x,1);assert.equal(actor.health.position.z,2);assert.ok(actor.health.quaternion.equals(view.camera.quaternion));assert.ok(Math.abs(actor.healthFront.scale.x-.568)<1e-12);
 e.hp=100;e.x=5;view.animateActor(actor,e,.016);assert.equal(actor.health.visible,false);e.hp=80;view.animateActor(actor,e,.016);assert.equal(actor.health.position.x,5);assert.ok(Math.abs(actor.healthFront.scale.x-.568)<1e-12);
});
