import assert from 'node:assert/strict';
import {walk,snapshot,action,mode} from './driver.mjs';
export async function completeMail(p){
 await walk(p,{x:-16,z:8});await p.keyboard.press('KeyE');await mode(p,'clue');await action(p,'back-playing');
 await walk(p,{x:-13,z:11});await p.keyboard.press('KeyE');await mode(p,'field');
 await action(p,'field-adjust','[data-step="show-back"][data-delta="1"]');
 await action(p,'field-adjust','[data-step="show-back"][data-delta="1"]');
 await action(p,'field-focus','[data-step="inspect-seal"]');await action(p,'field-inspect','[data-step="inspect-seal"]');
 await action(p,'mission-observe','[data-source="clinic-receiving-board"]');await action(p,'mission-verify','[data-reason="cross-source-match"]');
 await action(p,'mission-allocate','[data-choice="mutual-aid"]');await action(p,'field-choice','[data-choice="three-notches"]');
 assert.deepEqual((await snapshot(p)).field.state.completed,['mail-seal']);await action(p,'field-close');console.log('Mail: medicine verified');
 const guard=(await snapshot(p)).enemies.find(e=>e.id==='mail-1');await walk(p,{x:guard.x,z:guard.z+2},.6);await p.keyboard.press('KeyE');await action(p,'mission-accept');assert.equal((await snapshot(p)).missionFlow.status.handoffAccepted,true);console.log('Mail: handoff negotiated');
 await walk(p,{x:16,z:4});await p.keyboard.press('KeyE');await action(p,'back-playing');
 await walk(p,{x:6,z:5});await p.keyboard.press('KeyE');
 if((await snapshot(p)).mode==='parley'){
  await action(p,'mission-relay');await action(p,'mission-close');await walk(p,{x:7.5,z:5.8},.2);await p.keyboard.press('KeyE');
 }
 await action(p,'field-focus','[data-step="inspect-track"]');await action(p,'field-inspect','[data-step="inspect-track"]');
 await action(p,'field-adjust','[data-step="throw-switch"][data-delta="-1"]');await action(p,'field-choice','[data-choice="siding"]');
 if(!(await snapshot(p)).missionFlow.status.promiseRelayed)await action(p,'mission-relay');await action(p,'field-close');console.log('Mail: siding set, truce relayed');
 await walk(p,{x:-15,z:-8});await p.keyboard.press('KeyE');await action(p,'back-playing');
 await walk(p,{x:-13,z:11});await p.keyboard.press('KeyE');await action(p,'field-step','[data-step="take-crate"]');
 const traversal=(await snapshot(p)).field.traversal;assert.equal(traversal.type,'carry');
 for(let i=0;i<traversal.route.length;i++){
  const [x,z]=traversal.route[i],offset=traversal.offset || {x:0,z:0};
  await walk(p,{x:x-offset.x,z:z-offset.z},.2);
  await p.waitForFunction(index=>{const t=dustDiagnostics().field.traversal;return !t || t.index>index},i,{timeout:15000});
 }
 console.log('Mail: same crate carried through the open gate');await p.keyboard.press('KeyE');
 await action(p,'field-step','[data-step="place-crate"]');await action(p,'field-choice','[data-choice="secure-pallet"]');await action(p,'field-close');
 await p.keyboard.press('KeyE');await action(p,'mission-confirm');assert.equal((await snapshot(p)).secured,true);console.log('Mail: receipt secured');
 await walk(p,{x:-12,z:17});await p.keyboard.press('KeyE');await mode(p,'result');
}
