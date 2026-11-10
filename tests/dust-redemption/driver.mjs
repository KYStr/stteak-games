import assert from 'node:assert/strict';
import {planTacticalPath} from '../../games/dust-redemption/enemy-tactics.js';
export const url='http://127.0.0.1:8102/games/dust-redemption/';
export const snapshot=p=>p.evaluate(()=>dustDiagnostics());
export async function click(p,selector){await p.locator(selector).filter({visible:true}).first().click();}
export async function action(p,a,extra=''){await click(p,`#overlay [data-action="${a}"]:not(:disabled)${extra}`);}
export async function mode(p,expected){await p.waitForFunction(m=>dustDiagnostics().mode===m,expected,{timeout:30000});}
export async function start(p){await p.goto(url);await mode(p,'title');await action(p,'hub');await action(p,'brief');await action(p,'deploy');await mode(p,'playing');}
export async function walk(p,target,radius=1.6){
 let d=await snapshot(p); const from=d.player;
 const candidates=[target,...Array.from({length:24},(_,i)=>({x:target.x+Math.cos(i*Math.PI/12)*radius,z:target.z+Math.sin(i*Math.PI/12)*radius}))];
 let path=null;
 for(const bodyRadius of [d.player.handsOccupied?.8:.65,.45,.35]){
  for(const to of candidates){const candidate=planTacticalPath({from,to,colliders:d.colliders,radius:bodyRadius,bounds:22.5,maxDistance:120});if(candidate&&(!path||candidate.length<path.length))path=candidate;}
  if(path)break;
 }
 assert.ok(path,`No reachable route to ${JSON.stringify(target)}`);
 if(await p.locator('body').evaluate(el=>el.classList.contains('touch'))){
  const pad=await p.locator('#move-pad').boundingBox(),cx=pad.x+pad.width/2,cy=pad.y+pad.height/2,r=pad.width*.38;
  await p.mouse.move(cx,cy);await p.mouse.down();
  try{
   for(const waypoint of path.slice(1)){
    for(let tries=0;;tries++){
     d=await snapshot(p);if(d.mode==='field'&&!d.field?.traversal&&Math.hypot(d.player.x-target.x,d.player.z-target.z)<2)return;
     assert.equal(d.mode,'playing');const dx=waypoint.x-d.player.x,dz=waypoint.z-d.player.z,gap=Math.hypot(dx,dz);
     if(gap<.3)break;assert.ok(tries<160,`Analog movement stuck ${JSON.stringify(d.player)} heading ${JSON.stringify(waypoint)}`);
     const a=Math.PI/4+d.camera*Math.PI/2;
     await p.mouse.move(cx+(dx*Math.cos(a)-dz*Math.sin(a))/gap*r,cy+(dx*Math.sin(a)+dz*Math.cos(a))/gap*r);
     await p.waitForTimeout(Math.max(50,Math.min(220,gap/5*850)));
    }
   }
  }finally{await p.mouse.up()}
  return;
 }
 const route=[];
 for(let i=1;i<path.length;i++){
  const a=path[i-1],b=path[i],n=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/.75);
  for(let j=1;j<=n;j++)route.push({x:a.x+(b.x-a.x)*j/n,z:a.z+(b.z-a.z)*j/n});
 }
 for(const waypoint of route){
  let tries=0;
  while(true){
   d=await snapshot(p);if(d.mode==='field'&&!d.field?.traversal&&Math.hypot(d.player.x-target.x,d.player.z-target.z)<2)return;assert.equal(d.mode,'playing',`Walking interrupted: ${d.mode}`);
   const dx=waypoint.x-d.player.x,dz=waypoint.z-d.player.z,gap=Math.hypot(dx,dz);
   if(gap<.26 || (tries>12 && gap<.6))break;
   assert.ok(++tries<180,`Movement stuck at ${JSON.stringify(d.player)} heading ${JSON.stringify(waypoint)}`);
   const a=Math.PI/4+d.camera*Math.PI/2,x=dx*Math.cos(a)-dz*Math.sin(a),z=dx*Math.sin(a)+dz*Math.cos(a),angle=Math.atan2(z,x),sector=Math.round(angle/(Math.PI/4));
   const sx=Math.round(Math.cos(sector*Math.PI/4)),sz=Math.round(Math.sin(sector*Math.PI/4));
   const held=[...(sx?[sx>0?'KeyD':'KeyA']:[]),...(sz?[sz>0?'KeyS':'KeyW']:[])];
   for(const k of held)await p.keyboard.down(k);
   await p.waitForTimeout(Math.max(35,Math.min(130,gap/5*1000)));
   for(const k of held)await p.keyboard.up(k);
  }
 }
}
