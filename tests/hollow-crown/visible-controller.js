// Decision logic consumes only the deliberately projected public view. No enemy
// countdown, move order, RNG, hidden geometry, damage multipliers or state writes.
import {findPath,lineClear,shapeHits,blocked} from '../../public/games/hollow-crown/rules.js';
export function publicView(s){return {phase:s.phase,time:s.time,roomIndex:s.roomIndex,room:s.room,player:{x:s.player.x,z:s.player.z,radius:s.player.radius,hp:s.player.hp,energy:s.player.energy,action:s.player.action,heldTime:s.player.heldTime,cooldown:s.player.cooldown},talents:s.talents,projectiles:s.projectiles.map(b=>({x:b.x,z:b.z,angle:b.angle})),enemies:s.enemies.filter(e=>e.hp>0).map(e=>({id:e.id,type:e.type,x:e.x,z:e.z,radius:e.radius,hp:e.hp,maxHp:e.maxHp,state:e.state,shieldBroken:e.shieldBroken,attack:e.state==='telegraph'||e.state==='attack'?e.attack&&{shape:e.attack.shape,x:e.attack.x,z:e.attack.z,heading:e.attack.heading,range:e.attack.range,width:e.attack.width,radius:e.attack.radius,innerRadius:e.attack.innerRadius,angle:e.attack.angle}:null})),objective:s.objective&&{kind:s.objective.kind,phase:s.objective.phase,targets:s.objective.targets,attack:s.objective.phase==='telegraph'||s.objective.phase==='attack'?s.objective.attack:null}};}
export class VisibleController{
 constructor(strategy){this.strategy=strategy;this.ticks=0;this.path=[];this.pathAt=-1;this.lastTarget='';this.lastRoom=-1;this.guardAge=new Map();}
 decide(s){
  const p=s.player;this.ticks++;if(this.lastRoom!==s.roomIndex){this.lastRoom=s.roomIndex;this.path=[];this.guardAge.clear();}
  let target=null,near=Infinity;for(const e of s.enemies){const d=Math.hypot(e.x-p.x,e.z-p.z);if(d<near){target=e;near=d;}}
  const o=s.objective;let objectiveTarget=null;
  if(o?.kind==='seals'||o?.kind==='beacons')for(const t of o.targets)if(!t.done&&(!objectiveTarget||Math.hypot(t.x-p.x,t.z-p.z)<Math.hypot(objectiveTarget.x-p.x,objectiveTarget.z-p.z)))objectiveTarget=t;
  if(objectiveTarget&&(!target||o.kind==='seals'&&near>5))target={...objectiveTarget,type:o.kind==='seals'?'seal':'beacon',radius:.65,id:objectiveTarget.id};
  const c={moveX:0,moveZ:0,autoAim:true,attackPressed:false,attackHeld:false,attackReleased:false,dodge:false,block:false};if(!target)return c;
  const dx=target.x-p.x,dz=target.z-p.z,d=Math.hypot(dx,dz)||1,desired=target.type==='beacon'?0:target.type==='seal'?2.4:target.type==='shield'?3.2:target.radius>.8?3.3:2.7;
  let mx=dx/d,mz=dz/d;if(d<desired-.2){mx=-mx;mz=-mz;}else if(d<desired+.22){mx=0;mz=0;}
  if(target.type==='beacon'&&d<1.25){mx=0;mz=0;}
  const goal=target.type==='seal'?{x:target.x-dx/d*2.2,z:target.z-dz/d*2.2}:target;
  if(!lineClear(s.room,p.x,p.z,goal.x,goal.z,p.radius+.06)){
   if(s.time-this.pathAt>=.4||this.lastTarget!==target.id||!this.path.length){findPath(s.room,p,goal,p.radius,this.path);this.pathAt=s.time;this.lastTarget=target.id;}
   while(this.path.length>1&&Math.hypot(this.path[0].x-p.x,this.path[0].z-p.z)<.5)this.path.shift();
   if(this.path[0]){const n=Math.hypot(this.path[0].x-p.x,this.path[0].z-p.z)||1;mx=(this.path[0].x-p.x)/n;mz=(this.path[0].z-p.z)/n;}
  }
  const warnings=s.enemies.filter(e=>e.attack).map(e=>({id:e.id,type:e.type,state:e.state,attack:e.attack}));if(o?.attack)warnings.push({id:'hazard',type:'hazard',state:o.phase,attack:o.attack});
  for(const b of s.projectiles||[])warnings.push({id:'bolt',type:'projectile',state:'attack',attack:{shape:'line',x:b.x,z:b.z,heading:b.angle,range:3,width:.18}});
  const danger=warnings.filter(e=>shapeHits(e.attack,p,p.radius+.35));let defend=false;
  if(danger.length){
   const w=danger[0];let age=this.guardAge.get(w.id)||0;this.guardAge.set(w.id,++age);
   const blockable=w.attack.shape==='cone'||w.attack.shape==='line'&&w.type!=='hazard'&&w.type!=='projectile';
   if(blockable&&danger.length===1&&(this.strategy==='counter'&&!s.enemies.some(e=>e.type==='crossbow')&&['soldier','spear','shield','regent','arbiter'].includes(w.type)||p.energy<25)&&Math.hypot(w.attack.x-p.x,w.attack.z-p.z)<6){c.block=age>=(w.type==='regent'||w.type==='arbiter'?5:3);mx=0;mz=0;defend=true;}
   else {
    let best=Infinity,bx=mx,bz=mz;
    for(const travel of [1.3,2.6,4.2,6.2])for(let i=0;i<24;i++){
     const a=i*Math.PI/12,x=p.x+Math.sin(a)*travel,z=p.z+Math.cos(a)*travel;if(Math.abs(x)>8.8||Math.abs(z)>8.8||!lineClear(s.room,p.x,p.z,x,z,p.radius+.06))continue;
     let score=travel*.8+Math.abs(Math.hypot(x-target.x,z-target.z)-desired)*.45;
     for(const q of warnings)if(shapeHits(q.attack,{x,z,radius:p.radius+.25}))score+=100;
     for(const e of s.enemies)if(Math.hypot(x-e.x,z-e.z)<e.radius+p.radius+.1)score+=40;
     if(score<best){best=score;bx=Math.sin(a);bz=Math.cos(a);}
    }
    mx=bx;mz=bz;c.dodge=p.energy>=30&&p.action!=='dodge'&&this.ticks%2===0;defend=true;
   }
  }else this.guardAge.clear();
  c.moveX=mx;c.moveZ=mz;
  if(!defend&&target.type!=='beacon'){
   const charge=(target.type==='shield'&&target.shieldBroken<=0)||this.strategy==='burn'&&p.energy>45&&target.radius>.8;
   if(charge&&d<4.4){c.attackHeld=p.heldTime<.8;c.attackReleased=!c.attackHeld;}
   else {c.attackReleased=p.heldTime>0;c.attackPressed=d<3.15+target.radius&&p.cooldown<=0;c.attackHeld=c.attackPressed;}
  }else c.attackReleased=p.heldTime>0;
  return c;
 }
}
