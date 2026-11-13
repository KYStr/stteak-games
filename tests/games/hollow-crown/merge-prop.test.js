import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from '../../../public/games/hollow-crown/vendor/three.module.js';
import {mergePropGeometry} from '../../../public/games/hollow-crown/merge-prop.js';

test('static prop batching preserves world positions, UVs, normals and triangle count',()=>{
  const a=new THREE.BoxGeometry(),b=new THREE.CylinderGeometry(1,1,1,8);
  const parts=[{geometry:a,matrix:new THREE.Matrix4().makeTranslation(-4,2,0)},{geometry:b,matrix:new THREE.Matrix4().makeScale(2,.5,1)}];
  const merged=mergePropGeometry(THREE,parts);
  assert.equal(merged.getAttribute('position').count,a.index.count+b.index.count);
  assert.equal(merged.getAttribute('uv').count,merged.getAttribute('position').count);
  assert.equal(merged.getAttribute('normal').count,merged.getAttribute('position').count);
  merged.computeBoundingBox();assert.equal(merged.boundingBox.min.x,-4.5);assert.equal(merged.boundingBox.max.y,2.5);
  assert.equal(a.getAttribute('position').getX(0),.5,'source geometry remains reusable');
  merged.dispose();a.dispose();b.dispose();
});
