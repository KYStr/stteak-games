import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from '../../../public/games/hollow-crown/vendor/three.module.js';
import {bakeColorGeometry,collectMeshParts} from '../../../public/games/hollow-crown/merge-prop.js';
import {RigidBatch} from '../../../public/games/hollow-crown/rigid-batch.js';
import {SceneView} from '../../../public/games/hollow-crown/scene.js';
test('flattened instances include parent transforms, material tint and source ownership',()=>{
 const root=new T.Group();root.position.x=3;const g=new T.BoxGeometry(),m=new T.MeshBasicMaterial({color:0xeeeeaa});const mesh=new T.InstancedMesh(g,m,2);mesh.setMatrixAt(0,new T.Matrix4().makeTranslation(2,0,0));mesh.setMatrixAt(1,new T.Matrix4().makeTranslation(-2,0,0));root.add(mesh);
 const baked=bakeColorGeometry(T,collectMeshParts(T,root));baked.computeBoundingBox();assert.equal(baked.boundingBox.min.x,.5);assert.equal(baked.boundingBox.max.x,5.5);assert.equal(baked.attributes.color.count,baked.attributes.position.count);assert.equal(baked.attributes.position.count,72);assert.equal(g.attributes.position.getX(0),.5);baked.dispose();g.dispose();m.dispose();mesh.dispose();
});
test('rigid software stream preserves bone movement and disposes its buffers only once',()=>{
 const group=new T.Group(),bone=new T.Bone();group.add(bone);const g=new T.BoxGeometry(),m=new T.MeshBasicMaterial({color:0xffffff});const baked=bakeColorGeometry(T,[{geometry:g,material:m,matrix:new T.Matrix4()}]);const actor={group,bakedParts:[{bone,geometry:baked}]};const batch=new RigidBatch(T,100);bone.position.x=7;batch.update([actor]);assert.equal(batch.count,36);assert.equal(batch.geometry.attributes.position.getX(0),7.5);assert.equal(batch.geometry.attributes.position.updateRanges[0].count,108);group.visible=false;batch.update([actor]);assert.equal(batch.count,0);let disposals=0;batch.geometry.addEventListener('dispose',()=>disposals++);batch.dispose();batch.dispose();assert.equal(disposals,1);g.dispose();m.dispose();baked.dispose();
});

test('room baking preserves translucent water and its original blending material',()=>{
 const root=new T.Group(),geometry=new T.BoxGeometry(),stone=new T.MeshBasicMaterial({color:0x555555}),water=new T.MeshBasicMaterial({color:0x5799aa,transparent:true,opacity:.24});
 const pond=new T.Mesh(geometry,water);pond.position.x=4;root.add(pond,new T.Mesh(geometry,stone));
 const view={ownMaterial:m=>m};SceneView.prototype.bakeStatic.call(view,root);
 assert.equal(pond.parent,root);assert.equal(pond.material,water);assert.equal(pond.material.opacity,.24);assert.equal(pond.position.x,4);assert.equal(root.children.length,2);
 root.userData.bakedGeometry.dispose();view.staticColorMaterial.dispose();geometry.dispose();stone.dispose();water.dispose();
});

test('empty decoration batches return without adding an undefined scene object',()=>{
 const root=new T.Group();root.add=()=>{throw Error('empty batch must not call add');};
 SceneView.prototype.bakeStatic.call({},root);assert.equal(root.children.length,0);
});
