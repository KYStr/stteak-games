import test from 'node:test';
import assert from 'node:assert/strict';
import {createCampaign,stepCampaign,campaignAction,validateCampaign,campaignMetrics} from '../../../public/games/moss-and-moon/campaign.js';
import {STAGES,SOCKET_CANDIDATES} from '../../../public/games/moss-and-moon/campaign-content.js';
import {createState} from '../../../public/games/moss-and-moon/rules.js';
import {saveSlot,loadSlot,exportState,importSlot,recordCampaign,loadRecords,RECORDS_KEY,migrateState} from '../../../public/games/moss-and-moon/storage.js';
class Memory {data=new Map();getItem(k){return this.data.get(k)??null;}setItem(k,v){this.data.set(k,String(v));}removeItem(k){this.data.delete(k);}}
const begin=c=>campaignAction(c,{type:'begin'});
function tick(c,ms){while(ms>0&&c.status==='playing'){const used=stepCampaign(c,ms);ms-=used;}}
function act(c,type,node){return campaignAction(c,{type,node},c.taskNodes[node]);}
export function policyRun(seed,strategy='water') {
 const c=createCampaign(seed);begin(c);const p={x:0,z:5};let target=0,decisionAt=0;
 const stages=[];
 while(c.status==='playing'||c.status==='stage-result') {
  if(c.status==='stage-result'){stages.push({stage:c.stage,integrity:c.integrity,tasks:c.stageTasks,failed:false});campaignAction(c,{type:'continue'});p.x=0;p.z=5;}
  if(c.activeMs>=decisionAt) {
   const h=c.hazards.find(h=>h.attached)||c.hazards[0];
   target=c.carried?c.carried%4:h&&(c.integrity<90||strategy!=='water')?h.node:(strategy==='shelter'&&c.stageTasks>=STAGES[c.stage].tasks?undefined:c.taskNodes.find(n=>!n.done)?.id) ?? h?.node ?? target;
   decisionAt=c.activeMs+250;
  }
  const n=c.taskNodes[target],dx=n.x-p.x,dz=n.z-p.z,d=Math.hypot(dx,dz);
  if(d>1){p.x+=dx/d*Math.min(.75,d);p.z+=dz/d*Math.min(.75,d);}
  else {
   const a=type=>campaignAction(c,{type,node:target},p);
   if(c.hazards.some(h=>h.node===target)&&!(strategy==='harvest'&&c.resources.plants>0))a('water');
   if(strategy==='shelter'&&c.resources.moss>0&&c.shieldTimers[target]===0)a('shelter');
   if(strategy==='harvest'&&c.hazards.some(h=>h.node===target&&h.attached)&&c.resources.plants>0)a('harvest');
   if(c.carried&&target===c.carried%4)a('deliver');
   else if(!n.done&&!(strategy==='shelter'&&c.stageTasks>=STAGES[c.stage].tasks)){if(n.kind==='path'&&n.rotation!==n.target)a('rotate');else a('perform');}
  }
  stepCampaign(c,250);
 }
 stages.push({stage:c.stage,integrity:c.integrity,tasks:c.stageTasks,failed:c.status==='lost'});
 return {seed,strategy,status:c.status,activeMs:c.activeMs,stages,score:c.score,eventHash:c.eventHash,resources:c.resources};
}
test('deterministic seeds, changing layouts/events and bounded pools',()=>{
 const a=createCampaign(12345),b=createCampaign(12345),d=createCampaign(67890);assert.deepEqual(a,b);
 assert.notEqual(campaignMetrics(a).layoutHash,campaignMetrics(d).layoutHash);
 begin(a);begin(b);begin(d);
 for(let i=0;i<360;i++){stepCampaign(a,250);stepCampaign(b,250);stepCampaign(d,250);assert.ok(a.hazards.length<=4);assert.ok(validateCampaign(a));}
 assert.deepEqual(a,b);assert.notEqual(a.eventHash,d.eventHash);assert.equal(a.status,'lost');assert.ok(a.activeMs<=90000);
 const end=structuredClone(a);stepCampaign(a,250);assert.deepEqual(a,end);assert.equal(createCampaign(0).seed,0x6d2b79f5);
});
test('monotonic capped steps, pause/reload no offline advancement and full state export',()=>{
 const state=createState(1,{mode:'journey',seed:12345});begin(state.campaign);assert.equal(stepCampaign(state.campaign,1000),250);assert.equal(stepCampaign(state.campaign,-5),0);
 const storage=new Memory();saveSlot(state,storage);assert.deepEqual(loadSlot(1,storage).state,state);
 const imported=importSlot(2,exportState(state),storage);assert.equal(imported.ok,true);assert.deepEqual(imported.state.campaign,state.campaign);
 const stopped=structuredClone(state.campaign);stopped.status='stage-result';assert.equal(stepCampaign(stopped,250),0);
});
test('local actions, resource failures and wrong paths never alter unrelated garden data',()=>{
 const c=createCampaign(2);begin(c);const before=structuredClone(c);assert.equal(campaignAction(c,{type:'perform',node:0},{x:100,z:100}).ok,false);assert.deepEqual(c,before);
 c.resources.moss=0;assert.equal(act(c,'shelter',0).ok,false);assert.equal(c.resources.moss,0);
 for(const n of c.taskNodes)assert.ok(SOCKET_CANDIDATES.some(([x,z])=>n.x===x&&n.z===z));
 c.stage=2;c.taskNodes[0].kind='path';assert.equal(act(c,'perform',0).ok,false);assert.equal(c.stageTasks,0);act(c,'rotate',0);assert.equal(c.taskNodes[1].rotation,0);
});
test('twenty fixed seeds and three competent strategies survive a smooth four-stage curve',()=>{
 const corpus=[];
 for(const strategy of ['water','shelter','harvest'])for(let seed=1;seed<=20;seed++){
  const result=policyRun(seed,strategy);corpus.push(result);assert.equal(result.status,'won',JSON.stringify(result));assert.equal(result.activeMs,640000);
 }
 const rates=STAGES.map((_,stage)=>corpus.filter(r=>r.stages.some(s=>s.stage===stage&&s.failed)).length/corpus.length);
 assert.ok(rates.every((v,i)=>i===0||v-rates[i-1]<=.4));
});
test('result score and independent record survive reset, imports are idempotent, corrupt records isolated',()=>{
 const storage=new Memory(),c=createCampaign(12345);c.status='won';c.score=7000;c.activeMs=640000;
 assert.equal(recordCampaign(c,storage).ok,true);const raw=storage.getItem(RECORDS_KEY);recordCampaign(c,storage);assert.equal(storage.getItem(RECORDS_KEY),raw);
 saveSlot(createState(1),storage);assert.equal(loadRecords(storage).best.score,7000);c.score=6000;recordCampaign(c,storage);assert.equal(loadRecords(storage).best.score,7000);
 storage.setItem(RECORDS_KEY,'{"version":9}');assert.equal(loadRecords(storage).best,null);assert.equal(loadSlot(1,storage).state.day,1);
 const old=createState(1);delete old.mode;delete old.campaign;old.schema=1;
 const migrated=migrateState(old);assert.equal(migrated.mode,'free');assert.deepEqual(migrated.grid,old.grid);assert.deepEqual(migrated.inventory,old.inventory);
});

test('deadline quota failure, stage retry checkpoint and final reward are single transitions',()=>{
 const c=createCampaign(9876);begin(c);
 c.integrity=100;c.stageElapsedMs=159750;c.activeMs=159750;c.hazards.length=0;
 stepCampaign(c,250);assert.equal(c.status,'lost');assert.match(c.reason,/任務不足/);
 assert.equal(campaignAction(c,{type:'retry'}).ok,true);assert.equal(c.stage,0);assert.equal(c.stageElapsedMs,0);assert.equal(c.status,'playing');assert.ok(validateCampaign(c));
 for(let stage=0;stage<4;stage++) {
  c.stageTasks=STAGES[stage].tasks;c.totalTasks+=STAGES[stage].tasks;c.integrity=95;c.stageElapsedMs=159750;c.activeMs=stage*160000+159750;c.hazards.length=0;
  stepCampaign(c,250);assert.ok(validateCampaign(c));
  if(stage<3){assert.equal(c.status,'stage-result');assert.equal(campaignAction(c,{type:'continue'}).ok,true);assert.equal(campaignAction(c,{type:'continue'}).ok,false);}
 }
 assert.equal(c.status,'won');assert.equal(c.activeMs,640000);assert.equal(c.completedStages.length,4);assert.equal(c.score,c.totalTasks*100+Math.round(c.integrity)*5+1000);
 const won=structuredClone(c);stepCampaign(c,250);assert.deepEqual(c,won);assert.equal(campaignAction(c,{type:'continue'}).ok,false);
});

test('schema/envelope 1 migrates all gameplay fields without altering the backup',()=>{
 const storage=new Memory(),old=createState(1);delete old.mode;delete old.campaign;old.schema=1;
 const envelope=JSON.parse(exportState(old));envelope.version=1;const text=JSON.stringify(envelope);storage.setItem('moss-and-moon:v1:slot:1',text);
 const migrated=loadSlot(1,storage).state;const {mode,campaign,...fields}=migrated;assert.equal(mode,'free');assert.equal(campaign,null);fields.schema=1;assert.deepEqual(fields,old);assert.equal(storage.getItem('moss-and-moon:v1:slot:1'),text);
});
