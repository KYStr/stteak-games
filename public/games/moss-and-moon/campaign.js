import {STAGES, STAGE_MS, SOCKET_CANDIDATES} from './campaign-content.js';
const finite=(v,a,b)=>Number.isFinite(v)&&v>=a&&v<=b;
const integer=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
function random(c) { let x=c.rngState; x^=x<<13; x^=x>>>17; x^=x<<5; c.rngState=x>>>0; return c.rngState/4294967296; }
function event(c,value) { c.eventHash=Math.imul(c.eventHash ^ value,16777619)>>>0; c.events++; }
function pattern(c) {
  c.carried=0;
  for(let i=0;i<4;i++) {
    const n=c.taskNodes[i];
    n.done=false;
    n.kind=c.stage===0?'water':c.stage===1?'deliver':c.stage===2?(i<3?'path':'water'):['deliver','path','path','water'][i];
    n.rotation=0; n.target=1+Math.floor(random(c)*3);
    event(c,100+i*19+n.target*7+c.stage);
  }
  c.pattern++;
}
function prepareStage(c) {
  c.stageStartRng=c.rngState; c.stageStartTasks=c.totalTasks;
  c.stageStartMoss=c.resources.moss; c.stageStartPlants=c.resources.plants;
  c.stageElapsedMs=0; c.stageTasks=0; c.integrity=Math.max(70,c.integrity);
  c.nextSpawnMs=8000; c.nextPatternMs=20000; c.carried=0; c.pattern=0;
  c.hazards.length=0; c.taskNodes.length=0; c.shieldTimers.length=0;
  const chosen=[];
  while(chosen.length<4) {const i=Math.floor(random(c)*SOCKET_CANDIDATES.length); if(!chosen.includes(i))chosen.push(i);}
  for(let i=0;i<4;i++) {
    const [x,z]=SOCKET_CANDIDATES[chosen[i]];
    c.taskNodes.push({id:i,x,z,kind:'water',done:false,rotation:0,target:1});
    c.shieldTimers.push(0);
    event(c,chosen[i]+c.stage*41);
  }
  pattern(c);
}
export function createCampaign(seed=12345,difficulty='standard') {
  seed=Number(seed)>>>0 || 0x6d2b79f5;
  const c={version:1,mode:'journey',seed,difficulty:difficulty==='gentle'?'gentle':'standard',status:'ready',stage:0,
    stageElapsedMs:0,activeMs:0,pendingMs:0,integrity:100,stageTasks:0,totalTasks:0,mistakes:0,score:0,
    completedStages:[],rngState:seed,nextSpawnMs:8000,nextPatternMs:20000,hazards:[],taskNodes:[],shieldTimers:[],
    resources:{moss:2,plants:2},carried:0,pattern:0,eventHash:2166136261,events:0,reason:'',resultRecorded:false};
  prepareStage(c); return c;
}
export function stageGoal(c) {return STAGES[c.stage];}
function finish(c,status,reason='') {
  if(c.status!=='playing')return;
  c.status=status; c.reason=reason;
  if(status==='won'||status==='lost') c.score=Math.max(0,c.totalTasks*100+Math.round(c.integrity)*5+c.completedStages.length*250-c.mistakes*10);
  event(c,status==='won'?999:status==='lost'?998:997);
}
// Pure simulation: only the supplied serializable record changes; no browser clocks or I/O.
// Callers retain unprocessed elapsed time; a call processes at most 250 ms in <=50 ms steps.
export function stepCampaign(c,elapsedMs) {
  if(c.status!=='playing'||!Number.isFinite(elapsedMs)||elapsedMs<=0)return 0;
  let remaining=Math.min(250,elapsedMs),processed=0;
  const stage=STAGES[c.stage],gentle=c.difficulty==='gentle';
  while(remaining>0&&c.status==='playing') {
    const dt=Math.min(50,remaining,STAGE_MS-c.stageElapsedMs),seconds=dt/1000;
    c.stageElapsedMs+=dt;c.activeMs=c.stage*STAGE_MS+c.stageElapsedMs;processed+=dt;remaining-=dt;
    for(let i=0;i<4;i++)c.shieldTimers[i]=Math.max(0,c.shieldTimers[i]-dt);
    if(c.stageElapsedMs>=c.nextPatternMs&&c.stageElapsedMs<STAGE_MS){pattern(c);c.nextPatternMs+=20000;}
    if(c.stageElapsedMs>=c.nextSpawnMs) {
      if(c.hazards.length<stage.cap) {
        const node=Math.floor(random(c)*4),n=c.taskNodes[node],side=random(c)<.5?-1:1;
        c.hazards.push({node,x:n.x+side*2.4,z:n.z,attached:false});event(c,500+node*13+(side===1?1:0));
      }
      c.nextSpawnMs+=stage.interval*(gentle?1.35:1);
    }
    for(let i=c.hazards.length-1;i>=0;i--) {
      const h=c.hazards[i],n=c.taskNodes[h.node];
      if(c.shieldTimers[h.node]>0){c.hazards.splice(i,1);continue;}
      const dx=n.x-h.x,dz=n.z-h.z,d=Math.hypot(dx,dz);
      if(d<=.12){h.attached=true;c.integrity=Math.max(0,c.integrity-stage.damage*(gentle?.65:1)*seconds);}
      else {const move=Math.min(d,stage.speed*seconds);h.x+=dx/d*move;h.z+=dz/d*move;}
    }
    if(c.integrity<=0)finish(c,'lost','月光完整度歸零。走近陰影澆水，或用絨苔建立庇護。');
    else if(c.stageElapsedMs>=STAGE_MS) {
      if(c.stageTasks<stage.tasks)finish(c,'lost',`本章任務不足：${c.stageTasks}/${stage.tasks}。每 20 秒會刷新四個任務。`);
      else {c.completedStages.push(c.stage);finish(c,c.stage===3?'won':'stage-result');}
    }
  }
  return processed;
}
function repel(c,x,z) {
  let cleared=0;
  for(let i=c.hazards.length-1;i>=0;i--)if(Math.hypot(c.hazards[i].x-x,c.hazards[i].z-z)<=1.7){c.hazards.splice(i,1);cleared++;}
  return cleared;
}
export function campaignAction(c,a,position) {
  if(a.type==='retry'&&c.status==='lost') {
    c.rngState=c.stageStartRng;c.totalTasks=c.stageStartTasks;
    c.resources.moss=c.stageStartMoss;c.resources.plants=c.stageStartPlants;
    c.integrity=100;c.resultRecorded=false;c.reason='';c.activeMs=c.stage*STAGE_MS;c.pendingMs=0;
    prepareStage(c);c.status='playing';c.score=c.totalTasks*10;
    return {ok:true,message:'重新守望這一章，先前完成的章節保留。'};
  }
  if(a.type==='begin'&&c.status==='ready'){c.status='playing';return {ok:true,message:'月光旅程開始。走近信標，完成任務並守住月光！'};}
  if(a.type==='continue'&&c.status==='stage-result'){c.stage++;prepareStage(c);c.status='playing';return {ok:true,message:STAGES[c.stage].mechanic};}
  if(c.status!=='playing')return {ok:false,message:'請從旅程結果繼續，或重新開始。'};
  const n=c.taskNodes[a.node];
  if(!n||!position||Math.hypot(position.x-n.x,position.z-n.z)>1.7)return {ok:false,message:'先走近信標（1.7 公尺內），再進行照顧。'};
  let complete=false,message='',cleared=0;
  if(a.type==='water') {
    cleared=repel(c,n.x,n.z);
    if(!n.done&&(n.kind==='water'||n.kind==='path'&&n.rotation===n.target))complete=true;
    message=cleared?`水光驅散 ${cleared} 片陰影。`:'水光閃爍，附近暫無陰影。';
  } else if(a.type==='shelter') {
    if(c.resources.moss<1||c.shieldTimers[n.id]>0)return {ok:false,message:'需要一份任務獎勵絨苔，且此信標尚無庇護。'};
    c.resources.moss--;c.shieldTimers[n.id]=20000;repel(c,n.x,n.z);message='絨苔庇護守護這個信標 20 秒。';
  } else if(a.type==='harvest') {
    if(c.resources.plants<1||!c.hazards.some(h=>h.node===n.id&&h.attached))return {ok:false,message:'需要一株培育植物與附著的陰影。'};
    c.resources.plants--;for(let i=c.hazards.length-1;i>=0;i--)if(c.hazards[i].node===n.id&&c.hazards[i].attached)c.hazards.splice(i,1);
    c.integrity=Math.min(100,c.integrity+8);message='獻出一株培育植物，淨化附著陰影，恢復 8 月光。';
  } else if(a.type==='perform') {
    if(n.done)return {ok:false,message:'本輪已完成。仍可澆水驅散陰影，或建立庇護。'};
    if(n.kind==='deliver') {
      if(!c.carried){c.carried=n.id+1;message='已拾取光種。帶到下一個編號信標，按交付。';}
      else return {ok:false,message:'已攜帶光種，請前往下一個編號信標交付。'};
    } else if(n.kind==='path') {
      if(n.rotation===n.target){complete=true;message='藍鈴與蓮花相鄰，光路接通！';}
      else return {ok:false,message:'先旋轉到目標方向，再接通光路。'};
    } else {complete=true;repel(c,n.x,n.z);}
  } else if(a.type==='deliver') {
    const origin=c.carried-1;
    if(origin<0||n.id!==(origin+1)%4||c.taskNodes[origin].done)return {ok:false,message:'把光種送到拾取點的下一個編號信標。'};
    const source=c.taskNodes[origin]; source.done=true;c.carried=0;
    reward(c);repel(c,n.x,n.z);message='光種送達，森林月光重新流動！';
  } else if(a.type==='rotate') {
    if(n.kind!=='path'||n.done)return {ok:false,message:'選擇尚未接通的光路。'};
    n.rotation=(n.rotation+1)%4;message=`光路轉到 ${n.rotation}/3，目標 ${n.target}/3。`;
  } else return {ok:false,message:'未知旅程操作。'};
  if(complete){n.done=true;reward(c);message='信標恢復！+10 光點 · +4 月光 · 獲得絨苔或培育植物。';}
  event(c,700+n.id*17+a.type.length);
  return {ok:true,message};
}
function reward(c){c.stageTasks++;c.totalTasks++;c.score+=10;c.integrity=Math.min(100,c.integrity+4);if(c.totalTasks%2)c.resources.moss++;else c.resources.plants++;}
export function campaignMetrics(c) {
  if(!c)return null;
  return {...c,layoutHash:c.taskNodes.map(n=>`${n.x},${n.z}`).join('|'),rank:c.score>=7000?'S':c.score>=6000?'A':c.score>=5000?'B':'C'};
}
export function validateCampaign(c) {
  if(!c||c.version!==1||c.mode!=='journey'||!['standard','gentle'].includes(c.difficulty)||!['ready','playing','stage-result','won','lost'].includes(c.status))return false;
  if(!integer(c.seed,1,4294967295)||!integer(c.rngState,1,4294967295)||!integer(c.stage,0,3)||!finite(c.stageElapsedMs,0,STAGE_MS)||!finite(c.activeMs,0,STAGE_MS*4)||!finite(c.integrity,0,100)||!finite(c.pendingMs,0,60000))return false;
  if(!['stageTasks','totalTasks','mistakes','score','pattern','events','eventHash'].every(k=>integer(c[k],0,4294967295))||!integer(c.carried,0,4)||typeof c.reason!=='string'||c.reason.length>500||typeof c.resultRecorded!=='boolean')return false;
  if(!integer(c.stageStartRng,1,4294967295)||!integer(c.stageStartTasks,0,c.totalTasks)||!integer(c.stageStartMoss,0,100000)||!integer(c.stageStartPlants,0,100000))return false;
  if(!finite(c.nextSpawnMs,0,200000)||!finite(c.nextPatternMs,20000,180000)||!c.resources||!integer(c.resources.moss,0,100000)||!integer(c.resources.plants,0,100000))return false;
  if(!Array.isArray(c.completedStages)||c.completedStages.length>4||c.completedStages.some((v,i)=>v!==i))return false;
  if(Math.abs(c.activeMs-(c.stage*STAGE_MS+c.stageElapsedMs))>.001)return false;
  if(c.status==='won'&&(c.stage!==3||c.completedStages.length!==4||c.integrity<=0||c.stageElapsedMs!==STAGE_MS))return false;
  if(c.status==='stage-result'&&(c.stage===3||c.completedStages.length!==c.stage+1||c.stageElapsedMs!==STAGE_MS))return false;
  if(['ready','playing','lost'].includes(c.status)&&c.completedStages.length!==c.stage)return false;
  if(!Array.isArray(c.taskNodes)||c.taskNodes.length!==4||!c.taskNodes.every((n,i)=>n&&n.id===i&&SOCKET_CANDIDATES.some(([x,z])=>x===n.x&&z===n.z)&&['water','deliver','path'].includes(n.kind)&&typeof n.done==='boolean'&&integer(n.rotation,0,3)&&integer(n.target,1,3))||new Set(c.taskNodes.map(n=>`${n.x},${n.z}`)).size!==4)return false;
  if(!Array.isArray(c.shieldTimers)||c.shieldTimers.length!==4||!c.shieldTimers.every(t=>finite(t,0,20000)))return false;
  return Array.isArray(c.hazards)&&c.hazards.length<=STAGES[c.stage].cap&&c.hazards.every(h=>h&&integer(h.node,0,3)&&finite(h.x,-10,10)&&finite(h.z,-8,8)&&typeof h.attached==='boolean');
}
