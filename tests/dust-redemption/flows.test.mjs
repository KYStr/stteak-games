import test from 'node:test';
import assert from 'node:assert/strict';
import {MISSION_FLOW,createMissionProgress,recordMissionEvent,canonicalMissionProgress} from '../../games/dust-redemption/mission-flow.js';
import {createWaterProgress,canonicalWaterProgress} from '../../games/dust-redemption/water-flow.js';
import {createSignalProgress,canonicalSignalProgress} from '../../games/dust-redemption/signal-flow.js';
import {createLedgerProgress,canonicalLedgerProgress} from '../../games/dust-redemption/ledger-flow.js';
import {createNightProgress,canonicalNightProgress} from '../../games/dust-redemption/night-flow.js';
import {createPactProgress,canonicalPactProgress} from '../../games/dust-redemption/pact-flow.js';
for(const [id,create,canonical] of [
 ['dry-mail',createMissionProgress,canonicalMissionProgress],['broken-water',createWaterProgress,canonicalWaterProgress],
 ['last-signal',createSignalProgress,canonicalSignalProgress],['black-ledger',createLedgerProgress,canonicalLedgerProgress],
 ['long-night',createNightProgress,canonicalNightProgress],['dawn-pact',createPactProgress,canonicalPactProgress]
]) test(`${id}: a fresh event log cannot fabricate a completed physical handoff`,()=>{
 const state=create(id);assert.throws(()=>canonical(id,state));
 const summary=canonical(id,state,{requireComplete:false});assert.equal(summary.complete,false);
 assert.deepEqual(create(id),state);
});
test('mail: delivery preserves two medicine units, requires an accepted proposal and actual positions',()=>{
 const id='dry-mail',f=MISSION_FLOW[id];let state=createMissionProgress(id),serial=0;
 const emit=(type,payload)=>{const result=recordMissionEvent(id,state,{id:`test-${++serial}`,type,...payload});state=result.state;return result;};
 for(const sourceId of f.verification.requiredSources)emit('evidence-observed',{sourceId,recordId:f.evidence[sourceId].recordId});
 emit('seal-verification-attempted',{reasonId:'cross-source-match'});
 emit('allocation-proposed',{decisionId:'handoff',choiceId:'mutual-aid'});
 assert.throws(()=>emit('cargo-picked-up',{entityId:f.objective.id,playerPosition:f.objective.position,cargoPosition:f.objective.position}));
 emit('handoff-accepted',{snapshot:{actorId:'mail-1',actorPosition:f.actors['mail-1'].position,playerPosition:f.actors['mail-1'].position,visible:true,alive:true,recordIds:f.verification.requiredSources.map(id=>f.evidence[id].recordId)}});
 emit('promise-relayed',{playerPosition:f.communication.position,communicationSnapshot:{sourceId:f.communication.id,leverAngle:f.communication.connectedAngle,connected:true,cableConnected:true}});
 emit('cargo-picked-up',{entityId:f.objective.id,playerPosition:f.objective.position,cargoPosition:f.objective.position});
 const recipientId=f.decision.choices['mutual-aid'].recipientId,pos=f.recipients[recipientId].position;
 assert.throws(()=>emit('cargo-delivered',{entityId:f.objective.id,recipientId,playerPosition:f.objective.position,cargoPosition:f.objective.position}));
 emit('cargo-delivered',{entityId:f.objective.id,recipientId,playerPosition:pos,cargoPosition:pos});
 const result=canonicalMissionProgress(id,state);assert.equal(result.complete,true);assert.equal(result.allocation.clinic,1);assert.equal(result.allocation.guard,1);assert.equal(result.cargo.units,0);assert.ok(result.receipt);assert.equal(result.response.status,'prevented');
});
