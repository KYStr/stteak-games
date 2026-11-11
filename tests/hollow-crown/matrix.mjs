import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
import {createRun,step,chooseReward,chooseStory,enterRoom,TALENTS,ENEMIES} from '../../public/games/hollow-crown/rules.js';
import {DIFFICULTIES} from '../../public/games/hollow-crown/content.js';
import {publicView,VisibleController} from './visible-controller.js';
const folder=process.env.HOLLOW_ARTIFACT_DIR||'/tmp/hollow-r3-matrix';await mkdir(folder,{recursive:true});
const report={mode:'fixed-step rules supplement; browser evidence required separately',decisionMs:200,seeds:[72,4837,271828],cases:[],errors:[]};
const schoolStart={mobility:'fleet-ash',counter:'wide-oath',burn:'kindling'};
for(const difficulty of ['pilgrim','standard'])for(const seed of report.seeds)for(const strategy of Object.keys(schoolStart)){
 const s=createRun({seed,difficulty,startTalent:schoolStart[strategy],challenge:'crown-pilgrimage'}),bot=new VisibleController(strategy);let c={},tick=0,stage=-1;const stages=[];const difficultyData=DIFFICULTIES.find(d=>d.id===difficulty);const encounterMetrics=()=>{const types=[...s.enemies.map(e=>e.type),...s.pendingWaves.flat(),...(s.objective?.kind==='seals'?['soldier','spear','soldier','spear']:[])];return {enemyCount:types.length,effectiveHp:types.reduce((n,t)=>n+Math.round(ENEMIES[t].hp*difficultyData.enemyHp*(s.roomRisk==='perilous'?1.15:1)),0),maxLive:Math.max(s.enemies.length,...s.pendingWaves.map(w=>w.length)),actors:types.map(t=>({type:t,speed:ENEMIES[t].speed,damage:ENEMIES[t].damage*difficultyData.enemyDamage*(ENEMIES[t].boss?difficultyData.bossDamageMultiplier:1),windup:ENEMIES[t].windup*(ENEMIES[t].boss?difficultyData.bossWindupMultiplier:1),moves:ENEMIES[t].moves?.map(m=>({id:m.id,shape:m.shape,range:m.range,windup:m.windup*difficultyData.bossWindupMultiplier,phaseTwoWindup:Math.max(.65,m.windup*.85*difficultyData.bossWindupMultiplier),recovery:m.recover*difficultyData.bossRecoveryMultiplier,damage:m.damage*difficultyData.enemyDamage*difficultyData.bossDamageMultiplier}))})),walkableSquareMeters:Array.from({length:361},(_,i)=>({x:(i/19|0)-9,z:i%19-9})).filter(p=>!s.room.obstacles.some(o=>o.r?Math.hypot(p.x-o.x,p.z-o.z)<o.r+.43:Math.abs(p.x-o.x)<o.w/2+.43&&Math.abs(p.z-o.z)<o.d/2+.43)).length};};
 for(;tick<180000&&s.phase!=='result';tick++){
  if(stage!==s.roomIndex){stage=s.roomIndex;stages.push({index:stage,room:s.room.id,entryHp:s.player.hp,at:s.time,build:[...s.talents],risk:s.roomRisk,effective:encounterMetrics(),mechanic:s.objective?.shape||s.objective?.kind||'boss',roster:s.enemies.map(e=>({type:e.type,hp:e.hp,speed:ENEMIES[e.type].speed,damage:ENEMIES[e.type].damage,windup:ENEMIES[e.type].windup})),waves:s.pendingWaves});}
  if(s.phase==='reward'){
   const school=s.rewardOptions.find(t=>t.school===strategy),rest=s.player.hp<75||!school;
   const replace=s.talents.find(id=>id!==s.startTalent&&TALENTS.find(t=>t.id===id).school!==strategy);
   if(rest||s.talents.length===4&&!replace)chooseReward(s,'restore');else chooseReward(s,school.id,replace);
  }
  if(s.phase==='route'){if(s.story)chooseStory(s,s.story.choices[0].id);enterRoom(s,s.routeOptions[0].roomId,s.routeOptions[0].risk);}
  if(tick%10===0)c=bot.decide(publicView(s));step(s,{...c,attackPressed:tick%10===0&&c.attackPressed,attackReleased:tick%10===0&&c.attackReleased,dodge:tick%10===0&&c.dodge},.02);s.events.length=0;
 }
 const result={seed,difficulty,strategy,complete:s.phase==='result',outcome:s.result?.won?'win':s.result?'loss':'incomplete',seconds:s.time,stages,rooms:s.roomHistory,stats:s.stats,talents:s.talents};report.cases.push(result);console.log(JSON.stringify({seed,difficulty,strategy,outcome:result.outcome,time:s.time,rooms:s.roomsCleared,hp:s.player.hp}));await writeFile(folder+'/matrix.json',JSON.stringify(report,null,2));
}
report.conditionalFailure=Array.from({length:14},(_,i)=>{const entrants=report.cases.filter(c=>c.stages.some(s=>s.index===i)).length,losses=report.cases.filter(c=>c.outcome==='loss'&&c.rooms.length===i).length;return {stage:i+1,entrants,losses,rate:entrants?losses/entrants:0};});
report.byDifficulty=Object.fromEntries(['pilgrim','standard'].map(d=>[d,Array.from({length:14},(_,i)=>{const cases=report.cases.filter(c=>c.difficulty===d),entrants=cases.filter(c=>c.stages.some(s=>s.index===i)).length,losses=cases.filter(c=>c.outcome==='loss'&&c.rooms.length===i).length;return {stage:i+1,entrants,losses,rate:entrants?losses/entrants:0};})]));
report.accessibleBuilds=Object.keys(schoolStart).every(s=>report.cases.some(c=>c.difficulty==='pilgrim'&&c.strategy===s&&c.outcome==='win'));report.standardWin=report.cases.some(c=>c.difficulty==='standard'&&c.outcome==='win');report.complete=report.cases.every(c=>c.complete);report.smooth=Object.values(report.byDifficulty).every(stages=>stages.every((c,i,a)=>i===0||c.rate-a[i-1].rate<=.4));report.passed=report.accessibleBuilds&&report.standardWin&&report.complete&&report.smooth;
await writeFile(folder+'/matrix.json',JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;
