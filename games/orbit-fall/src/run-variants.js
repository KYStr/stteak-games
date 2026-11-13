import {getCampaign} from './content.js';
// Unsigned deterministic xorshift32. Randomness is consumed only at room setup.
export function xorshift32(seed){let value=(seed>>>0)||0x6d2b79f5;return ()=>{value^=value<<13;value^=value>>>17;value^=value<<5;return (value>>>0)/4294967296}}
export function roomHash(id){let h=2166136261;for(let i=0;i<id.length;i++)h=Math.imul(h^id.charCodeAt(i),16777619);return h>>>0}
export function freshSeed(){return globalThis.crypto?.getRandomValues(new Uint32Array(1))[0]??(Date.now()>>>0)}
export function variantFor(seed,roomId,campaignVersion=2,variantVersion=1){const random=xorshift32((seed>>>0)^roomHash(roomId));return Object.freeze({seed:seed>>>0,version:campaignVersion===1?0:variantVersion,template:Math.floor(random()*3),reverse:random()>.5,rotation:Math.floor(random()*8)})}
const cargoStarts=[[-4,1.4,3],[4,5.8,3],[-4,5.8,-3],[4,1.4,3],[0,3.5,4]];
const cargoTargets=[[4,5.6,-3],[-4,1.5,-3],[4,1.5,1],[-4,5.6,-3]];
const opticalTemplates=[
 [[-4,1.5,-2],[0,4.5,-2],[4,6,2]],
 [[-4,2,1],[0,5,-3],[4,3,-1]],
 [[-3,5,-1],[1,2,-3],[4,6,1]]
];
const pressureTemplates=[
 [[-4,1.5,-3],[4,4.5,-3],[-4,6,2]],
 [[4,1.5,-3],[-4,4.5,-3],[4,6,2]],
 [[-4,5.8,-3],[4,1.5,-3],[0,4.5,2]]
];
export function resolveRepair(run,roomId,phaseIndex=0){
 const campaign=getCampaign(run.campaignVersion),room=campaign.roomById[roomId],base=campaign.puzzles[room?.puzzleId];
 if(!base||run.campaignVersion===1)return base;
 const variant=variantFor(run.seed,roomId,run.campaignVersion,run.variantVersion),phase=base.phases[Math.min(phaseIndex,base.phases.length-1)],k=(phaseIndex+variant.template)%3;
 const mirror=variant.reverse?-1:1;
 const transform=p=>[p[0]*mirror,p[1],p[2]+(variant.template-1)*.35];
 const p={...base,type:phase.type,phaseIndex,phaseCount:base.phases.length,phaseLabel:phase.label,variant,cacheKey:`${roomId}:v${run.variantVersion}:${run.seed}:${phaseIndex}`,variantVersion:run.variantVersion,activeObjectId:phase.objectId,routeEnabled:phase.type==='momentum'&&room.deck>=2};
 if(p.type==='momentum'){
  p.objects=base.phases.map((ph,i)=>({id:ph.objectId,start:transform(cargoStarts[(i+variant.template)%cargoStarts.length])})).filter((o,i)=>base.phases[i].type==='momentum');
  p.crateStart=p.objects.find(o=>o.id===phase.objectId).start;p.target=transform(cargoTargets[(phaseIndex+variant.template)%cargoTargets.length]);if(base.id==='puzzle-momentum-1'&&phaseIndex===0){p.crateStart[1]=1.4;p.target[1]=1.5}if(room.signalId&&p.target[0]<-2&&p.target[1]<3&&p.target[2]>0)p.target[2]=-2;p.targetRadius=base.stage.dockTolerance;p.maxDockSpeed=.7;p.holdSeconds=1.5;
  p.railStartPosition=[p.crateStart[0],p.crateStart[1],p.crateStart[2]+1.8];p.railPoints=[[p.crateStart[0],7.2,p.crateStart[2]+1.8],[-6*mirror,7.2,-5.8],[p.target[0],p.target[1],p.target[2]+1.3]];p.bypassPosition=[0,6.5,3];
  p.hint=`電芯 ${phaseIndex+1}：T 連接，拖到高度 ${p.target[1].toFixed(1)} m 插座後 Space 煞停。`+(p.routeEnabled?'直穿最快但有碎片；磁軌可用 F 自動升至上層，再逐段運輸；接管供氧時基礎耗氧降至 10%、節省推進；上層隔離開關可關閉本次危險，安全但較遠。':'一次牽引一件電芯。');
 }else if(p.type==='reflection'){
  p.mirrorPositions=opticalTemplates[k].map(transform);if(base.id==='puzzle-reflection-1')p.mirrorPositions=[p.mirrorPositions[0],p.mirrorPositions[2]].map(v=>[v[0],2,v[2]]);else if(base.deck===1)p.mirrorPositions=p.mirrorPositions.map((v,i)=>[v[0],1.5+i,v[2]]);else if(base.deck===2)p.mirrorPositions=p.mirrorPositions.map((v,i)=>[v[0],i===1?4.5:1.5,v[2]]);p.initialAngles=Array(p.mirrorPositions.length).fill(0);p.targetAngles=[(1+variant.rotation+phaseIndex)%8,(3+variant.rotation)%8,(5+phaseIndex)%8].slice(0,p.mirrorPositions.length);p.angleSteps=8;
  p.requiresIsolation=run.variantVersion===2&&(roomId==='room-d3-work-3'||roomId==='room-d3-work-6');if(p.requiresIsolation)p.powerPosition=[0,1.5,4];
  p.hint=`${p.requiresIsolation?'斷電 → 調整鏡面 → 復電確認接收器。':''}由發射端依序調整鏡面：${p.targetAngles.join(' → ')}。位置與實際反射平面依本次種子決定。`;
 }else{
  p.valvePositions=pressureTemplates[k].map(transform);if(base.deck===1)p.valvePositions=p.valvePositions.map(v=>[v[0],1.5,v[2]]);else if(base.deck===2)p.valvePositions=p.valvePositions.map((v,i)=>[v[0],i===1?4.5:1.5,v[2]]);if(room.signalId)for(const v of p.valvePositions)if(v[0]<-2&&v[1]<3&&v[2]>0)v[0]=0;const ventIndex=variant.reverse?1:2,inspectIndex=variant.reverse?2:1;p.sequence=[0,ventIndex,inspectIndex,0,inspectIndex];p.valveLabels=variant.reverse?['隔離兩扇門','通風等壓','遠端檢查 / 開啟內門']:['隔離兩扇門','遠端檢查 / 開啟內門','通風等壓'];if(base.roomId.includes('work-5')&&base.deck>=2){p.valvePositions.push([6,base.deck===3?6:3,3]);p.valveLabels.push('腔間轉接 · 兩門隔離後操作');p.sequence=[0,ventIndex,inspectIndex,0,3,ventIndex];if(run.variantVersion===2&&base.deck===3){for(let i=0;i<3;i++){p.valvePositions[i][0]*=.55;p.valvePositions[i][2]*=.55}p.valvePositions[3]=[0,4.8,3.8]}}
  p.hint=`腔 ${phaseIndex+1}：${p.sequence.includes(3)?'隔離 → 通風 → 檢查 → 再隔離 → 腔間轉接 → 通風確認':'隔離 → 通風 → 檢查 → 再隔離 → 開啟內門'}。操作順序 ${p.sequence.map(i=>i+1).join(' → ')}。未隔離時無法換腔。`;
 }
 if(run.variantVersion===2&&roomId==='room-d3-work-6'){const controls=p.type==='reflection'?p.mirrorPositions:p.type==='airlock'?p.valvePositions:null;if(controls)for(const position of controls){position[0]*=.8;position[2]*=.8}}
 p.objective=`${base.name} · 作業 ${Math.min(phaseIndex+1,p.phaseCount)}/${p.phaseCount} · ${phase.label}`;p.briefing=p.type==='airlock'?(p.sequence.includes(3)?'兩扇門不可同開。隔離 → 通風 → 檢查 → 再隔離 → 腔間轉接 → 通風確認。依控制站標示操作，每次轉接前須重新隔離。':'兩扇門不可同開。隔離 → 通風 → 檢查 → 再隔離 → 開啟內門。依控制站標示操作。'):p.type==='reflection'?`每條光路都有獨立鏡面位置。由光源開始追蹤光束，接通 ${p.mirrorPositions.length} 個有限鏡面與接收器。`:p.hint;
 if(p.requiresIsolation){p.objective=`${base.name} · 作業 ${phaseIndex+1}/${p.phaseCount} · 斷電 → 調整鏡面 → 復電確認接收器`;p.briefing='斷電 → 調整鏡面 → 復電確認接收器。帶電鏡面會鎖定；調整後返回供電站按 F。'}
 return Object.freeze(p);
}
export function challengeRecordKey(run){return run.campaignVersion===1?run.challengeId:`${run.challengeId}|${run.mode}|v${run.variantVersion}|${run.seed}`}
