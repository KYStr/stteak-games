import { TRACKS,CARS,PRACTICE_TRACK,FIXED_DT,PHYSICS_VERSION,TRACK_VERSION,sampleTrack,roadStatus } from './content.js';

const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
const round=v=>Math.round(v*10000)/10000;
const finite=(v,fallback=0)=>Number.isFinite(v)?v:fallback;
const neutral={throttle:0,brake:0,steer:0,handbrake:false};

/** The presentation layer calls this with frame dt. All gameplay runs at exactly 120 Hz. */
export function createRace({trackId='harbor',carId='comet',mode='time',sensitivity=1,ghost=null,seed=1337}={}) {
  const track=mode==='tutorial'?PRACTICE_TRACK:TRACKS.find(t=>t.id===trackId)||TRACKS[0],car=CARS.find(c=>c.id===carId)||CARS[0];
  const state={track,car,trackId:track.id,carId:car.id,mode:['time','drift','tutorial'].includes(mode)?mode:'time',sensitivity:clamp(sensitivity,0,2),seed,
    s:0,lateral:0,yaw:0,velocityYaw:0,speed:0,steer:0,x:0,y:0,z:0,heading:0,pitch:0,
    elapsed:0,countdown:3,lap:1,lapTime:0,lapStart:0,lapTimes:[],nextCheckpoint:1,checkpointCount:0,
    lastLegalS:0,lastLegalCheckpoint:0,score:0,pendingScore:0,combo:1,driftTime:0,drifting:false,driftAngle:0,
    cleanDriftTime:0,reason:'起跑準備',finished:false,result:null,ghostSamples:[[0,0,0,0,0]],ghostInputs:[],completedGhost:null,
    bestLap:Infinity,ghost:validGhost(ghost,track.id)?ghost:null,ghostTime:0,sectors:[],lapSectors:[],checkpointTimes:[],
    penalty:0,timeRemaining:mode==='tutorial'?90:120,collisions:0,resets:0,wallCooldown:0,offTrackTime:0,
    wrongWayTime:0,lastEvent:null,eventId:0,ticks:0,lapTicks:0,accumulator:0,forwardProgress:0,scoredProgress:0,
    tutorial:{accelerate:false,entry:false,control:false,exit:false,recover:false},driftRelease:0,lapInvalid:false,
  };
  updatePose(state);return state;
}

function event(state,type,text) {state.lastEvent={id:++state.eventId,type,text,time:state.elapsed};}
function updatePose(state) {
  const p=sampleTrack(state.track,state.s);
  state.x=p.x+Math.cos(p.heading)*state.lateral;state.y=p.y;state.z=p.z-Math.sin(p.heading)*state.lateral;
  state.heading=p.heading+state.yaw;state.pitch=Math.atan(p.slope);return p;
}
function bankDrift(state,hit=false) {
  if(state.pendingScore>0) {
    // A sub-second wall flick is not a completed drift. Sustained slides retain half on impact.
    const amount=Math.floor(state.pendingScore*(hit?(state.cleanDriftTime>=1?.5:0):1));state.score+=amount;
    if(amount>5)event(state,hit?'drift-lost':'drift-bank',hit?`碰撞折損 50% · 保留 ${amount} 分`:`乾淨出彎 +${amount} 分`);
  }
  state.pendingScore=0;state.combo=1;state.cleanDriftTime=0;state.driftRelease=0;
}
function medalFor(state,value) {
  const thresholds=state.track.medals[state.mode==='time'?'time':'drift'];
  const index=thresholds.findIndex(t=>state.mode==='time'?value<=t:value>=t);
  return index<0?'none':['gold','silver','bronze'][index];
}
function finish(state,success=true) {
  bankDrift(state);state.finished=true;state.speed=0;state.drifting=false;
  const tutorialDone=Object.values(state.tutorial).every(Boolean);
  state.result={mode:state.mode,trackId:state.trackId,carId:state.carId,time:round(state.elapsed),score:Math.floor(state.score),
    medal:state.mode==='tutorial'?(tutorialDone?'bronze':'none'):medalFor(state,state.mode==='time'?state.elapsed:state.score),
    success:success&&(state.mode!=='tutorial'||tutorialDone),lapTimes:[...state.lapTimes],bestLap:Number.isFinite(state.bestLap)?state.bestLap:null,
    penalty:state.penalty,collisions:state.collisions,resets:state.resets,sectors:state.sectors.map(x=>({...x})),
    tutorial:{...state.tutorial},physicsVersion:PHYSICS_VERSION,trackVersion:TRACK_VERSION,seed:state.seed};
  state.reason=state.mode==='tutorial'?(tutorialDone?'教學完成 · 準備挑戰雙圈！':'練習時間到 · 可再練習未完成項目'):success?'挑戰完成':'超時 · 下次提早煞車，保住出彎速度';
  event(state,'finish',state.reason);
}
function recordLap(state) {
  const time=round(state.elapsed-state.lapStart);
  if(state.lapInvalid){state.reason='漏過檢查點，本圈無效';return;}
  const end=[time,round(((state.s%state.track.length)+state.track.length)%state.track.length),round(state.lateral),round(state.yaw),round(state.speed)];
  if(state.ghostSamples.at(-1)?.[0]!==time)state.ghostSamples.push(end);
  state.lapTimes.push(time);state.sectors.push(...state.lapSectors.map((duration,index)=>({lap:state.lap,sector:index+1,time:round(duration)})));
  if(time<state.bestLap) {
    state.bestLap=time;
    state.completedGhost={schemaVersion:1,physicsVersion:PHYSICS_VERSION,trackVersion:TRACK_VERSION,trackId:state.trackId,
      carId:state.carId,seed:state.seed,fixedDt:FIXED_DT,time,samples:state.ghostSamples.map(p=>[...p]),
      inputs:state.ghostInputs.map(p=>[...p]),checkpoints:state.checkpointTimes.map(p=>[...p])};
  }
  event(state,'lap',`第 ${state.lap} 圈 ${time.toFixed(2)} 秒`);
  if(state.mode==='time'&&state.lap>=2){finish(state);return;}
  state.lap++;state.lapStart=state.elapsed;state.lapTicks=0;state.lapTime=0;state.ghostTime=0;
  state.ghostSamples=[[0,...end.slice(1)]];state.ghostInputs=[];state.checkpointTimes=[];state.lapSectors=[];state.nextCheckpoint=1;
}

/** Checkpoints only accept continuous forward crossings within a legal corridor. */
function advanceCheckpoints(state,before,after,legal) {
  if(!legal||after<=before||after-before>3)return;
  const length=state.track.length;
  const ordinal=state.checkpointCount+1;
  const lapIndex=Math.floor(ordinal/8),index=ordinal%8;
  const expected=lapIndex*length+state.track.checkpoints[index];
  if(before<=expected&&after>=expected) {
    state.checkpointCount++;state.lastLegalS=expected;state.lastLegalCheckpoint=index;
    const lapElapsed=state.elapsed-state.lapStart;
    const previous=state.checkpointTimes.at(-1)?.[1]||0;
    state.lapSectors.push(lapElapsed-previous);state.checkpointTimes.push([index,round(lapElapsed)]);
    state.nextCheckpoint=(index+1)%8;
    if(index===0)recordLap(state);
    else event(state,'checkpoint',`檢查點 ${index}/7`);
  }
  // A missed physical crossing does not become eligible later in the same lap.
  if(after>expected+3&&state.checkpointCount<ordinal) {
    state.reason='漏過檢查點 · 按 R 回到最後合法點';
    state.lapInvalid=true;
  }
}

function tick(state,input) {
  const dt=FIXED_DT;
  state.ticks++;
  if(state.countdown>0){state.countdown=Math.max(0,state.countdown-dt);if(state.countdown<1e-8)state.countdown=0;return;}
  state.elapsed+=dt;state.lapTime=state.elapsed-state.lapStart;state.ghostTime=state.lapTime;state.lapTicks++;
  state.timeRemaining=Math.max(0,(state.mode==='tutorial'?90:120)-state.elapsed);
  state.wallCooldown=Math.max(0,state.wallCooldown-dt);
  const p=sampleTrack(state.track,state.s),car=state.car;
  const throttle=clamp(finite(input.throttle),0,1),brake=clamp(finite(input.brake),0,1);
  const steer=clamp(finite(input.steer),-1,1),handbrake=Boolean(input.handbrake);
  state.steer+=(steer-state.steer)*(1-Math.exp(-11*dt));
  const absSpeed=Math.abs(state.speed),sensitivity=[.78,1,1.22][state.sensitivity]||1;
  const activeHandbrake=handbrake&&state.speed>7;
  // Longitudinal velocity, rolling resistance, drag and road grade are separated.
  let acceleration=throttle*car.acceleration;
  if(brake>0)acceleration-=state.speed>1?car.brake*brake:car.acceleration*.48*brake;
  if(state.speed<0&&throttle>0)acceleration+=car.brake*.6*throttle;
  acceleration-=Math.sign(state.speed)*(1.05+car.drag*state.speed*state.speed);
  acceleration-=p.slope*6;
  if(activeHandbrake)acceleration-=3.6;
  if(throttle===0&&brake===0&&absSpeed<.035)state.speed=0;
  else state.speed=clamp(state.speed+acceleration*dt,-7.5,state.mode==='tutorial'?22:car.topSpeed);
  const road=roadStatus(state.track,state.s,state.lateral);
  const speedFactor=clamp(absSpeed/10,0,1)/(1+Math.max(0,absSpeed-18)*.027);
  // Camera follows +Z with +Y up, so screen-right is -X and D means negative world yaw.
  const turnRate=-state.steer*car.steerRate*sensitivity*speedFactor*Math.sign(state.speed||1)*(activeHandbrake?1.22:1);
  const grip=(activeHandbrake?car.driftGrip:car.grip)*(road.shortcut?.78:1);
  // Body heading reacts first; tire grip then aligns velocity. No track-following assistance.
  state.yaw=angle(state.yaw+turnRate*dt);
  const tireResponse=angle(state.yaw-state.velocityYaw)*(1-Math.exp(-grip*dt));
  const lateralLimit=car.cornerGrip/Math.max(5,absSpeed)*dt;
  state.velocityYaw=angle(state.velocityYaw+clamp(tireResponse,-lateralLimit,lateralLimit));
  const metric=clamp(1-p.curvature*state.lateral,.45,1.8);
  const forward=state.speed*Math.cos(state.velocityYaw)/metric;
  const lateralVelocity=state.speed*Math.sin(state.velocityYaw);
  const before=state.s;
  state.s+=forward*dt;state.lateral+=lateralVelocity*dt;
  const newP=sampleTrack(state.track,state.s);
  const roadTurn=angle(newP.heading-p.heading);
  state.yaw=angle(state.yaw-roadTurn);state.velocityYaw=angle(state.velocityYaw-roadTurn);
  let status=roadStatus(state.track,state.s,state.lateral);
  if(!status.legal) {
    state.offTrackTime+=dt;
    if(state.wallCooldown<=0) {
      state.collisions++;state.wallCooldown=.7;bankDrift(state,true);state.reason='碰撞 · 提早煞車，輕轉方向';event(state,'collision',state.reason);
      state.speed*=.52;
    }
    // Resolve against the closest physical corridor edge; no free progress from wall riding.
    const main=clamp(state.lateral,-state.track.width/2+.95,state.track.width/2-.95);
    let bound=main;
    if(status.offset!==null) {
      const sh=state.track.shortcut.width/2-.95,alt=clamp(state.lateral,status.offset-sh,status.offset+sh);
      if(Math.abs(alt-state.lateral)<Math.abs(main-state.lateral))bound=alt;
    }
    state.lateral=bound;
    state.velocityYaw*=.3;state.yaw*=.55;
    state.speed=Math.max(-4,state.speed-18*dt);
    status=roadStatus(state.track,state.s,state.lateral);
  }else state.offTrackTime=0;
  state.forwardProgress+=Math.max(0,state.s-before);
  state.wrongWayTime=forward<-.5?state.wrongWayTime+dt:0;
  state.driftAngle=Math.abs(angle(state.yaw-state.velocityYaw));
  const validDrift=state.speed>11&&state.driftAngle>.12&&state.driftAngle<1.15&&forward>5&&state.wallCooldown===0&&status.legal&&state.s>state.scoredProgress;
  state.drifting=validDrift;
  if(validDrift) {
    state.cleanDriftTime+=dt;state.driftTime+=dt;state.combo=Math.min(4,1+Math.floor(state.cleanDriftTime/1.8));
    // Reject momentary slip spikes from steering into a barrier. A sustained 0.4 s clean slide qualifies.
    if(state.cleanDriftTime>=.4)state.pendingScore+=state.speed*state.driftAngle*8*state.combo*dt;
    state.scoredProgress=state.s;state.driftRelease=0;
    state.reason=`乾淨漂移 ×${state.combo} · 放開手煞車、反打出彎`;
    state.tutorial.entry=true;if(state.cleanDriftTime>=2)state.tutorial.control=true;
  }else {
    state.driftRelease+=dt;
    if(state.pendingScore&&state.driftRelease>.75) {bankDrift(state);if(state.tutorial.entry)state.tutorial.exit=true;}
    if(state.wallCooldown===0)state.reason=state.wrongWayTime>.5?'逆行 · 煞停後回正':state.speed<11?'加速至 40 km/h 以上才能漂移計分':activeHandbrake?'轉向入彎 · 維持側滑角度':status.shortcut?'風險捷徑 · 路窄抓地較低':'循線加速 · 彎前煞車';
  }
  if(state.speed>11)state.tutorial.accelerate=true;
  // 20 Hz pose samples are tied to fixed ticks; compressed input changes retain exact tick timing.
  if(state.lapTicks%6===0)state.ghostSamples.push([round(state.lapTime),round(((state.s%state.track.length)+state.track.length)%state.track.length),round(state.lateral),round(state.yaw),round(state.speed)]);
  const encoded=[throttle,brake,steer,handbrake?1:0].map(round),last=state.ghostInputs.at(-1);
  if(!last||encoded.some((v,i)=>v!==last[i+1]))state.ghostInputs.push([state.lapTicks,...encoded]);
  advanceCheckpoints(state,before,state.s,status.legal);
  updatePose(state);
  if(!state.finished&&state.mode!=='time'&&state.timeRemaining<=1e-8)finish(state);
  // A finite time limit supplies a recoverable failed run without overwriting best laps.
  if(!state.finished&&state.mode==='time'&&state.elapsed>=300)finish(state,false);
}

export function stepRace(state,input=neutral,frameDt=FIXED_DT) {
  if(state.finished||state.paused)return state;
  state.accumulator+=clamp(finite(frameDt),0,.25);
  while(state.accumulator+1e-10>=FIXED_DT&&!state.finished) {
    state.accumulator-=FIXED_DT;tick(state,input);
  }
  return state;
}

/** Recovery never changes checkpoint order and always adds a visible 2-second penalty. */
export function resetCar(state) {
  if(state.finished||state.countdown>0)return false;
  const time=state.elapsed-state.lapStart;
  const before=[round(time),round(((state.s%state.track.length)+state.track.length)%state.track.length),round(state.lateral),round(state.yaw),round(state.speed)];
  // Replay the penalty as a hold followed by a teleport, never as a drive through intervening scenery.
  state.ghostSamples.push(before,[round(time+2-FIXED_DT),...before.slice(1)]);
  state.s=state.lastLegalS+.1;state.lateral=0;state.yaw=0;state.velocityYaw=0;state.speed=0;state.steer=0;
  state.elapsed+=2;state.penalty+=2;state.resets++;state.wallCooldown=.5;state.offTrackTime=0;state.wrongWayTime=0;
  state.ghostSamples.push([round(time+2),round(state.s%state.track.length),0,0,0]);
  state.lapInvalid=false;state.pendingScore=0;state.combo=1;state.cleanDriftTime=0;state.drifting=false;
  state.tutorial.recover=true;state.reason='已回正 · +2.00 秒 · 連段清除';
  event(state,'reset',state.reason);updatePose(state);return true;
}

export function validGhost(ghost,trackId) {
  return Boolean(ghost&&ghost.schemaVersion===1&&ghost.physicsVersion===PHYSICS_VERSION&&ghost.trackVersion===TRACK_VERSION&&ghost.trackId===trackId&&
    Number.isFinite(ghost.time)&&ghost.time>0&&Array.isArray(ghost.samples)&&ghost.samples.length>1&&ghost.samples.length<=7000&&
    ghost.samples.every(p=>Array.isArray(p)&&p.length===5&&p.every(Number.isFinite)));
}
export function getGhostPose(ghost,time) {
  if(!ghost||!validGhost(ghost,ghost.trackId)||time<0||time>ghost.time)return null;
  const samples=ghost.samples;let lo=0,hi=samples.length-1;
  while(lo+1<hi){const mid=(lo+hi)>>1;if(samples[mid][0]<=time)lo=mid;else hi=mid;}
  const a=samples[lo],b=samples[hi],t=clamp((time-a[0])/(b[0]-a[0]||1),0,1),track=TRACKS.find(x=>x.id===ghost.trackId);
  if(!track)return null;
  let distance=b[1]-a[1];if(distance<-track.length/2)distance+=track.length;
  const s=a[1]+distance*t,lateral=a[2]+(b[2]-a[2])*t,yaw=a[3]+angle(b[3]-a[3])*t,p=sampleTrack(track,s);
  return {x:p.x+Math.cos(p.heading)*lateral,y:p.y,z:p.z-Math.sin(p.heading)*lateral,heading:p.heading+yaw,
    pitch:Math.atan(p.slope),s,lateral,yaw,speed:a[4]+(b[4]-a[4])*t,carId:ghost.carId};
}
