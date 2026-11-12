import test from 'node:test';
import assert from 'node:assert/strict';
import {FlightSimulation} from '../../games/aetherwake/src/simulation.js';
import {WORLD} from '../../games/aetherwake/src/world.js';

test('survey volumes exclude their exact radius, relic pickup keeps its strict horizontal boundary',()=>{
  const sim=new FlightSimulation();sim.launch();
  const gate={x:0,y:60,z:0,radius:15},epsilon=1e-5;
  for(const axis of ['x','y','z'])for(const offset of [-epsilon,0,epsilon]) {
    Object.assign(sim.player,{x:0,y:60,z:0,vx:0,vz:0});sim.player[axis]+=gate.radius+offset;
    assert.equal(sim._sampleSatisfied(gate),offset<0,`gate ${axis} radius ${offset}`);
  }
  const relic=WORLD.relics[0];
  for(const offset of [-epsilon,0,epsilon]) {
    sim.state.relics.length=0;
    Object.assign(sim.player,{x:relic.x+relic.radius+offset,y:relic.y,z:relic.z,gliding:false});
    sim._collect();assert.equal(sim.relics.includes(relic.id),offset<0,`relic radius ${offset}`);
  }
});
test('landing includes the walkable radius, cliff contact excludes the exact tapered radius',()=>{
  const island=WORLD.islands[0],epsilon=1e-5;
  for(const offset of [-epsilon,0,epsilon]) {
    const sim=new FlightSimulation();sim.launch();
    Object.assign(sim.player,{x:island.x+island.radius-1.5+offset,y:island.y+.05,z:island.z,vx:0,vy:-1,vz:0,grounded:false,gliding:false});
    sim.step({},Number.EPSILON);assert.equal(sim.player.grounded,offset<=0,`landing radius ${offset}`);
  }
  const radius=island.radius*Math.max(.15,1-(10-2)/43)+.75;
  for(const offset of [-epsilon,0,epsilon]) {
    const sim=new FlightSimulation();sim.launch();
    Object.assign(sim.player,{x:island.x+radius+offset,y:island.y-10,z:island.z,vx:0,vy:0,vz:0,grounded:false,gliding:false});
    sim.step({},Number.EPSILON);
    assert.ok(Math.abs(sim.player.x-island.x-(offset<0?radius:radius+offset))<1e-10,`cliff radius ${offset}`);
  }
});
