import test from 'node:test';
import assert from 'node:assert/strict';
import { WORLD, windWeight } from '../../games/aetherwake/src/world.js';
import { packWinds, accumulateWinds } from '../../games/aetherwake/src/wind-physics.js';
import { length2,length3 } from '../../games/aetherwake/src/math.js';
test('fixed arity norms preserve generic hypot equations on world coordinates',()=>{
 for(let i=0;i<10000;i++){const x=Math.sin(i)*2600,y=Math.cos(i*1.1)*90,z=Math.sin(i*.37)*2600;assert.equal(length2(x,z),Math.hypot(x,z));assert.equal(length3(x,y,z),Math.hypot(x,y,z));}
});
test('packed wind forces preserve source equations, ordering, charge, lift and gate exclusion',()=>{
 const groups=[WORLD.winds,...WORLD.campaignCircuits.flatMap(c=>c.stages.map(s=>s.winds))];
 for(const winds of groups){const packed=packWinds(winds);
  for(let i=0;i<80;i++){
   const w=winds[i%winds.length],p={x:w.x+Math.sin(i)*w.radius,y:w.y+w.height*.4,z:w.z+Math.cos(i)*w.radius},dx=Math.sin(i*.2),dz=Math.cos(i*.2),elapsed=i*1.73,phase=.71,gate=w.gate??-1;
   const expected={lift:0,charge:0,wx:0,wz:0,boost:0,count:0},actual=new Float64Array(10),types=[],expectedTypes=[];
   for(const wind of winds){if(gate>=0&&wind.gate!==gate)continue;const weight=windWeight(wind,p);if(weight<=0)continue;
    if(!expectedTypes.includes(wind.type))expectedTypes.push(wind.type);
    if(wind.type==='thermal'){expected.lift=Math.max(expected.lift,Math.max(-1.2,Math.min(wind.strength,(wind.ceiling-p.y)*.38+1.7))*weight);expected.charge=Math.max(expected.charge,(wind.charge??9)*weight);}
    else if(wind.type==='tailwind'){expected.boost=Math.max(expected.boost,wind.strength*Math.max(0,dx*wind.direction.x+dz*wind.direction.z)*weight*1.75);expected.lift=Math.max(expected.lift,Math.max(-1.2,Math.min(wind.liftCap??4.4,(wind.ceiling-p.y)*.18+1.7))*weight);expected.charge=Math.max(expected.charge,(wind.charge??(wind.style==='safe'?4.5:2.1))*weight);}
    else{const pulse=Math.max(0,Math.sin(elapsed/wind.period*Math.PI*2+phase));expected.wx+=wind.direction.x*wind.strength*pulse*weight;expected.wz+=wind.direction.z*wind.strength*pulse*weight;}
   }
   actual.set([dx,dz,elapsed,phase],6);
   accumulateWinds(packed,p,gate,true,actual,types);assert.deepEqual(types,expectedTypes);
   for(const [index,key] of ['lift','charge','wx','wz','boost'].entries())assert.ok(Math.abs(actual[index]-expected[key])<1e-12,`${key}: ${actual[index]} / ${expected[key]}`);
  }
 }
});
