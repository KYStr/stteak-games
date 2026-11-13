import test from 'node:test';
import assert from 'node:assert/strict';
import {createRace,stepRace,getRaceNumericView,RACE_VALUE as N} from '../../../games/neon-drift/src/physics.js';
test('internal numeric view follows the actual race while enumerable session values remain exact',()=>{
  const race=createRace(),view=getRaceNumericView(race),other=createRace();
  assert.ok(view instanceof Float64Array);assert.equal(view,getRaceNumericView(race));assert.notEqual(view,getRaceNumericView(other));
  race.speed=Math.PI;assert.equal(view[N.speed],Math.PI);assert.equal(JSON.parse(JSON.stringify(race)).speed,Math.PI);
  stepRace(race,{throttle:1,brake:0,steer:0,handbrake:false},.1);
  for(const [name,index] of Object.entries(N)){assert.equal(view[index],race[name]);assert.ok(Object.keys(race).includes(name));}
  assert.equal(getRaceNumericView({}),undefined);
});

test('new races share history accessor identities while retaining independent histories and JSON order',()=>{
  const first=createRace(),second=createRace();
  for(const key of ['ghostSamples','ghostInputs']){
    const a=Object.getOwnPropertyDescriptor(first,key),b=Object.getOwnPropertyDescriptor(second,key);
    assert.equal(a.get,b.get);assert.equal(a.set,b.set);assert.equal(a.enumerable,true);assert.equal(a.configurable,true);
  }
  first.ghostSamples=[[0,10,20,30,40]];first.ghostInputs=[[0,1,0,0,0]];
  assert.deepEqual(first.ghostSamples,[[0,10,20,30,40]]);assert.deepEqual(second.ghostSamples,[[0,0,0,0,0]]);assert.deepEqual(second.ghostInputs,[]);
  const roundTrip=JSON.parse(JSON.stringify(first));assert.deepEqual(roundTrip.ghostSamples,first.ghostSamples);assert.deepEqual(roundTrip.ghostInputs,first.ghostInputs);
  assert.ok(Object.keys(first).indexOf('ghostSamples')<Object.keys(first).indexOf('completedGhost'));
});
