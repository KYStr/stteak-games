import test from 'node:test';
import assert from 'node:assert/strict';
import {arcPhase,debrisPosition,hazardContact} from '../../../games/orbit-fall/hazards.js';
test('visible arc phase and damaging volume use the same deterministic clock',()=>{for(let i=0;i<3600;i++){const t=i/60;assert.equal(hazardContact('arc',{x:0,y:2,z:-4},t),arcPhase(t)==='active');assert.equal(hazardContact('arc',{x:4,y:2,z:-4},t),false)}assert.equal(arcPhase(3),'warning');assert.equal(arcPhase(4),'active')});
test('debris volume follows its displayed three-dimensional path',()=>{for(let t=0;t<30;t+=.1){const [x,y,z]=debrisPosition(t);assert.equal(hazardContact('debris',{x,y,z},t),true);assert.equal(hazardContact('debris',{x:x+2,y,z},t),false)}});
