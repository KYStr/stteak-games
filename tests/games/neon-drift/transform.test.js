import test from 'node:test';
import assert from 'node:assert/strict';
import {Matrix4,Euler} from '../../../games/neon-drift/node_modules/three/build/three.module.js';
import {writeEulerRotation} from '../../../games/neon-drift/src/transform.js';
test('retained player/steering matrices match Three XYZ rotation and preserve mount translation',()=>{
  for(const x of [-2,-.1,0,.07,Math.PI])for(const y of [-3,-.38,0,1.25])for(const z of [-.075,0,.075]){
    const expected=new Matrix4().makeRotationFromEuler(new Euler(x,y,z,'XYZ')),actual=new Matrix4(),angles=Float64Array.of(99,x,y,z);
    actual.elements[12]=1.75;actual.elements[13]=.35;actual.elements[14]=-1.3;writeEulerRotation(actual.elements,angles,1);
    const typed=Float64Array.from(actual.elements);writeEulerRotation(typed,angles,1);assert.deepEqual(Array.from(typed),actual.elements);
    for(const i of [0,1,2,4,5,6,8,9,10])assert.ok(Math.abs(expected.elements[i]-actual.elements[i])<1e-12,`${i}: ${x},${y},${z}`);
    assert.deepEqual(actual.elements.slice(12),[1.75,.35,-1.3,1]);
  }
});
