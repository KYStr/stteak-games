import {getControlsNumericView,CONTROL_VALUE as C} from './input.js';
import { TRACKS,CARS,PRACTICE_TRACK,FIXED_DT,PHYSICS_VERSION,TRACK_VERSION,sampleTrackInto,ROAD_SAMPLE,TRACK_SAMPLE,sampleTrackBufferAt,roadStatusBufferAt,resolveTourTrack } from './content.js';

const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
const angle=v=>Math.atan2(Math.sin(v),Math.cos(v));
const round=v=>Math.round(v*10000)/10000;
const finite=(v,fallback=0)=>Number.isFinite(v)?v:fallback;
const histories=new WeakMap(),numeric=new WeakMap();
// Stable numeric indices; public enumerable accessors preserve serialization and tooling.
const N=Object.freeze({"sensitivity":0,"seed":1,"s":2,"lateral":3,"yaw":4,"velocityYaw":5,"speed":6,"steer":7,"x":8,"y":9,"z":10,"heading":11,"pitch":12,"elapsed":13,"countdown":14,"lap":15,"lapTime":16,"lapStart":17,"nextCheckpoint":18,"checkpointCount":19,"lastLegalS":20,"lastLegalCheckpoint":21,"score":22,"pendingScore":23,"combo":24,"driftTime":25,"driftAngle":26,"cleanDriftTime":27,"bestLap":28,"ghostTime":29,"penalty":30,"timeRemaining":31,"collisions":32,"resets":33,"wallCooldown":34,"offTrackTime":35,"wrongWayTime":36,"eventId":37,"ticks":38,"lapTicks":39,"accumulator":40,"forwardProgress":41,"scoredProgress":42,"driftRelease":43});
export const RACE_VALUE=N;
// Internal presentation view; never exported through browser diagnostics.
export function getRaceNumericView(state){return numeric.get(state);}
const numericDescriptors=Object.fromEntries(Object.keys(N).map(key=>{const index=N[key];return [key,{enumerable:true,configurable:false,get(){return numeric.get(this)[index];},set(value){numeric.get(this)[index]=value;}}];}));
// Shared history accessors keep serialization callbacks stable across races.
// Histories remain separate, keyed by the actual race identity.
const historyDescriptors={
  ghostSamples:{enumerable:true,configurable:true,get(){return histories.get(this).samples.rows();},set(rows){histories.get(this).samples.load(rows);}},
  ghostInputs:{enumerable:true,configurable:true,get(){return histories.get(this).inputs.rows();},set(rows){histories.get(this).inputs.load(rows);}},
};
const VEHICLE=Object.freeze({acceleration:0,brake:1,drag:2,topSpeed:3,steerRate:4,grip:5,driftGrip:6,cornerGrip:7});
const scratch=new WeakMap(),validatedGhosts=new WeakSet(),ghostPoses=new WeakMap();
const driftReasons=['','乾淨漂移 ×1 · 放開手煞車、反打出彎','乾淨漂移 ×2 · 放開手煞車、反打出彎','乾淨漂移 ×3 · 放開手煞車、反打出彎','乾淨漂移 ×4 · 放開手煞車、反打出彎'];
const neutral={throttle:0,brake:0,steer:0,handbrake:false};

/** The presentation layer calls this with frame dt. All gameplay runs at exactly 120 Hz. */
export function createRace({trackId='harbor',carId='comet',mode='time',sensitivity=1,ghost=null,seed=1337,track:resolvedTrack=null}={}) {
  const track=resolvedTrack||(mode==='tutorial'?PRACTICE_TRACK:TRACKS.find(t=>t.id===trackId)||TRACKS[0]),car=CARS.find(c=>c.id===carId)||CARS[0];
  const history={samples:packed(7000,[[0,0,0,0,0]]),inputs:packed(40000,[],true)};
  const state={track,car,trackId:track.id,carId:car.id,mode:['time','drift','tutorial'].includes(mode)?mode:'time',sensitivity:clamp(sensitivity,0,2),seed,layoutId:track.layoutId||`${track.id}:original:v1`,
    s:0,lateral:0,yaw:0,velocityYaw:0,speed:0,steer:0,x:0,y:0,z:0,heading:0,pitch:0,
    elapsed:0,countdown:3,lap:1,lapTime:0,lapStart:0,lapTimes:[],nextCheckpoint:1,checkpointCount:0,
    lastLegalS:0,lastLegalCheckpoint:0,score:0,pendingScore:0,combo:1,driftTime:0,drifting:false,driftAngle:0,
    cleanDriftTime:0,reason:'起跑準備',finished:false,result:null,ghostSamples:undefined,ghostInputs:undefined,completedGhost:null,
    bestLap:Infinity,ghost:validGhost(ghost,track.id,track.layoutId)?ghost:null,ghostTime:0,sectors:[],lapSectors:[],checkpointTimes:[],
    penalty:0,timeRemaining:mode==='tutorial'?90:120,collisions:0,resets:0,wallCooldown:0,offTrackTime:0,
    wrongWayTime:0,lastEvent:null,eventId:0,ticks:0,lapTicks:0,accumulator:0,forwardProgress:0,scoredProgress:0,
    tutorial:{accelerate:false,entry:false,control:false,exit:false,recover:false},driftRelease:0,lapInvalid:false,
  };
  const numbers=new Float64Array(Object.keys(N).length);
  for(const key of Object.keys(N))numbers[N[key]]=state[key];
  numeric.set(state,numbers);histories.set(state,history);Object.defineProperties(state,historyDescriptors);Object.defineProperties(state,numericDescriptors);
  scratch.set(state,{p:new Float64Array(8),next:new Float64Array(8),pose:new Float64Array(8),road:new Float64Array(4),step:new Float64Array(8),historyRow:new Int32Array(5),vehicle:Float64Array.from(Object.keys(VEHICLE),key=>car[key]),course:Float64Array.of(track.length,track.width),checkpoints:Float64Array.from(track.checkpoints),controlFallback:new Float64Array(3)});updatePose(state);return state;
}

function event(state,type,text) {
  const n=numeric.get(state);state.lastEvent={id:++n[N.eventId],type,text,time:n[N.elapsed]};}
function updatePose(state) {
  const n=numeric.get(state);
  const p=sampleTrackBufferAt(state.track,n,N.s,scratch.get(state).pose);
  n[N.x]=p[TRACK_SAMPLE.x]+Math.cos(p[TRACK_SAMPLE.heading])*n[N.lateral];n[N.y]=p[TRACK_SAMPLE.y];n[N.z]=p[TRACK_SAMPLE.z]-Math.sin(p[TRACK_SAMPLE.heading])*n[N.lateral];
  n[N.heading]=p[TRACK_SAMPLE.heading]+n[N.yaw];n[N.pitch]=Math.atan(p[TRACK_SAMPLE.slope]);return p;
}
function bankDrift(state,hit=false) {
  const n=numeric.get(state);
  if(n[N.pendingScore]>0) {
    // A sub-second wall flick is not a completed drift. Sustained slides retain half on impact.
    const amount=Math.floor(n[N.pendingScore]*(hit?(n[N.cleanDriftTime]>=1?.5:0):1));n[N.score]+=amount;
    if(amount>5)event(state,hit?'drift-lost':'drift-bank',hit?`碰撞折損 50% · 保留 ${amount} 分`:`乾淨出彎 +${amount} 分`);
  }
  n[N.pendingScore]=0;n[N.combo]=1;n[N.cleanDriftTime]=0;n[N.driftRelease]=0;
}
function medalFor(state,value) {
  const thresholds=state.track.medals[state.mode==='time'?'time':'drift'];
  const index=thresholds.findIndex(t=>state.mode==='time'?value<=t:value>=t);
  return index<0?'none':['gold','silver','bronze'][index];
}
function finish(state,success=true) {
  const n=numeric.get(state);
  bankDrift(state);state.finished=true;n[N.speed]=0;state.drifting=false;
  const tutorialDone=Object.values(state.tutorial).every(Boolean);
  const completed=success&&(state.mode==='tutorial'?tutorialDone:state.mode==='drift'?Math.floor(n[N.score])>=state.track.medals.drift[2]:true);
  state.result={mode:state.mode,trackId:state.trackId,carId:state.carId,time:(Math.round((n[N.elapsed])*10000)/10000),score:Math.floor(n[N.score]),
    medal:state.mode==='tutorial'?(tutorialDone?'bronze':'none'):medalFor(state,state.mode==='time'?n[N.elapsed]:n[N.score]),
    success:completed,lapTimes:[...state.lapTimes],bestLap:Number.isFinite(n[N.bestLap])?n[N.bestLap]:null,
    penalty:n[N.penalty],collisions:n[N.collisions],resets:n[N.resets],sectors:state.sectors.map(x=>({...x})),
    tutorial:{...state.tutorial},physicsVersion:PHYSICS_VERSION,trackVersion:TRACK_VERSION,seed:n[N.seed],layoutId:state.layoutId,activeSeconds:(Math.round((n[N.elapsed]-n[N.penalty])*10000)/10000)};
  state.reason=state.mode==='tutorial'?(tutorialDone?'教學完成 · 準備挑戰雙圈！':'練習時間到 · 可再練習未完成項目'):completed?'挑戰完成':state.mode==='drift'?`漂移目標未達 · ${Math.floor(n[N.score])} / ${state.track.medals.drift[2]} 分`:'超時 · 下次提早煞車，保住出彎速度';
  event(state,'finish',state.reason);
}
/** Complete the school early only after every driving task has been earned. */
export function finishTutorial(state){
  if(!state||state.mode!=='tutorial'||state.finished||!Object.values(state.tutorial).every(Boolean))return false;
  finish(state,true);return true;
}
function recordLap(state) {
  const n=numeric.get(state);
  const time=(Math.round((n[N.elapsed]-n[N.lapStart])*10000)/10000);
  if(state.lapInvalid){state.reason='漏過檢查點，本圈無效';return;}
  const end=[time,(Math.round((((n[N.s]%state.track.length)+state.track.length)%state.track.length)*10000)/10000),(Math.round((n[N.lateral])*10000)/10000),(Math.round((n[N.yaw])*10000)/10000),(Math.round((n[N.speed])*10000)/10000)];
  if(state.ghostSamples.at(-1)?.[0]!==time)histories.get(state).samples.append(...end);
  state.lapTimes.push(time);state.sectors.push(...state.lapSectors.map((duration,index)=>({lap:n[N.lap],sector:index+1,time:(Math.round((duration)*10000)/10000)})));
  if(time<n[N.bestLap]) {
    n[N.bestLap]=time;
    state.completedGhost={schemaVersion:1,physicsVersion:PHYSICS_VERSION,trackVersion:TRACK_VERSION,trackId:state.trackId,
      carId:state.carId,seed:n[N.seed],layoutId:state.layoutId,fixedDt:FIXED_DT,time,samples:state.ghostSamples.map(p=>[...p]),
      inputs:state.ghostInputs.map(p=>[...p]),checkpoints:state.checkpointTimes.map(p=>[...p])};
  }
  event(state,'lap',`第 ${n[N.lap]} 圈 ${time.toFixed(2)} 秒`);
  if(state.mode==='time'&&n[N.lap]>=2){finish(state);return;}
  n[N.lap]++;n[N.lapStart]=n[N.elapsed];n[N.lapTicks]=0;n[N.lapTime]=0;n[N.ghostTime]=0;
  state.ghostSamples=[[0,...end.slice(1)]];state.ghostInputs=[];state.checkpointTimes=[];state.lapSectors=[];n[N.nextCheckpoint]=1;
}

/** Checkpoints only accept continuous forward crossings within a legal corridor. */
function advanceCheckpoints(state,work) {
  const n=numeric.get(state),before=work.step[0],after=n[N.s],legal=work.road[ROAD_SAMPLE.legal]!==0;
  if(!legal||after<=before||after-before>3)return;
  const length=work.course[0];
  const ordinal=n[N.checkpointCount]+1;
  const lapIndex=Math.floor(ordinal/8),index=(ordinal%8)|0;
  const expected=lapIndex*length+work.checkpoints[index];
  if(before<=expected&&after>=expected) {
    n[N.checkpointCount]++;n[N.lastLegalS]=expected;n[N.lastLegalCheckpoint]=index;
    const lapElapsed=n[N.elapsed]-n[N.lapStart];
    const previous=state.checkpointTimes.at(-1)?.[1]||0;
    state.lapSectors.push(lapElapsed-previous);state.checkpointTimes.push([index,(Math.round((lapElapsed)*10000)/10000)]);
    n[N.nextCheckpoint]=(index+1)%8;
    if(index===0)recordLap(state);
    else event(state,'checkpoint',`檢查點 ${index}/7`);
  }
  // A missed physical crossing does not become eligible later in the same lap.
  if(after>expected+3&&n[N.checkpointCount]<ordinal) {
    state.reason='漏過檢查點 · 按 R 回到最後合法點';
    state.lapInvalid=true;
  }
}

function tick(state,input) {
  const n=numeric.get(state);
  const dt=FIXED_DT;
  n[N.ticks]++;
  if(n[N.countdown]>0){n[N.countdown]=Math.max(0,n[N.countdown]-dt);if(n[N.countdown]<1e-8)n[N.countdown]=0;return;}
  n[N.elapsed]+=dt;n[N.lapTime]=n[N.elapsed]-n[N.lapStart];n[N.ghostTime]=n[N.lapTime];n[N.lapTicks]++;
  n[N.timeRemaining]=Math.max(0,(state.mode==='tutorial'?90:120)-n[N.elapsed]);
  n[N.wallCooldown]=Math.max(0,n[N.wallCooldown]-dt);
  const work=scratch.get(state);
  integrateTick(state,work,input);resolveWallTick(state,work);scoreTick(state,work);recordHistoryTick(state,work);
  advanceCheckpoints(state,work);updatePose(state);
  if(!state.finished&&state.mode!=='time'&&n[N.timeRemaining]<=1e-8)finish(state);
  if(!state.finished&&state.mode==='time'&&n[N.elapsed]>=300)finish(state,false);
}

function integrateTick(state,work,input){
  const n=numeric.get(state),dt=FIXED_DT;
  const p=sampleTrackBufferAt(state.track,n,N.s,work.p),car=work.vehicle;
  let controls=getControlsNumericView(input);
  if(!controls){controls=work.controlFallback;controls[0]=controls[1]=controls[2]=0;if(typeof input.throttle==='number')controls[0]=input.throttle;if(typeof input.brake==='number')controls[1]=input.brake;if(typeof input.steer==='number')controls[2]=input.steer;}
  work.step[3]=work.step[4]=work.step[5]=0;
  if(controls[C.throttle]===controls[C.throttle]&&controls[C.throttle]!==Infinity&&controls[C.throttle]!==-Infinity)work.step[3]=Math.min(1,Math.max(0,controls[C.throttle]));
  if(controls[C.brake]===controls[C.brake]&&controls[C.brake]!==Infinity&&controls[C.brake]!==-Infinity)work.step[4]=Math.min(1,Math.max(0,controls[C.brake]));
  if(controls[C.steer]===controls[C.steer]&&controls[C.steer]!==Infinity&&controls[C.steer]!==-Infinity)work.step[5]=Math.min(1,Math.max(-1,controls[C.steer]));
  const throttle=work.step[3],brake=work.step[4],steer=work.step[5],handbrake=Boolean(input.handbrake);
  n[N.steer]+=(steer-n[N.steer])*(1-Math.exp(-11*dt));
  const absSpeed=Math.abs(n[N.speed]),sensitivity=n[N.sensitivity]===0?.78:n[N.sensitivity]===2?1.22:1;
  const activeHandbrake=handbrake&&n[N.speed]>7;
  // Longitudinal velocity, rolling resistance, drag and road grade are separated.
  let acceleration=throttle*car[VEHICLE.acceleration];
  if(brake>0)acceleration-=n[N.speed]>1?car[VEHICLE.brake]*brake:car[VEHICLE.acceleration]*.48*brake;
  if(n[N.speed]<0&&throttle>0)acceleration+=car[VEHICLE.brake]*.6*throttle;
  acceleration-=Math.sign(n[N.speed])*(1.05+car[VEHICLE.drag]*n[N.speed]*n[N.speed]);
  acceleration-=p[TRACK_SAMPLE.slope]*6;
  if(activeHandbrake)acceleration-=3.6;
  if(throttle===0&&brake===0&&absSpeed<.035)n[N.speed]=0;
  else n[N.speed]=Math.min(state.mode==='tutorial'?22:car[VEHICLE.topSpeed],Math.max(-7.5,n[N.speed]+acceleration*dt));
  const road=roadStatusBufferAt(state.track,n,N.s,N.lateral,work.road);
  const speedFactor=Math.min(1,Math.max(0,absSpeed/10))/(1+Math.max(0,absSpeed-18)*.027);
  // Camera follows +Z with +Y up, so screen-right is -X and D means negative world yaw.
  const turnRate=-n[N.steer]*car[VEHICLE.steerRate]*sensitivity*speedFactor*Math.sign(n[N.speed]||1)*(activeHandbrake?1.22:1);
  const grip=(activeHandbrake?car[VEHICLE.driftGrip]:car[VEHICLE.grip])*(road[ROAD_SAMPLE.shortcut]?.78:1);
  // Body heading reacts first; tire grip then aligns velocity. No track-following assistance.
  n[N.yaw]=Math.atan2(Math.sin(n[N.yaw]+turnRate*dt),Math.cos(n[N.yaw]+turnRate*dt));
  const tireResponse=Math.atan2(Math.sin(n[N.yaw]-n[N.velocityYaw]),Math.cos(n[N.yaw]-n[N.velocityYaw]))*(1-Math.exp(-grip*dt));
  const lateralLimit=car[VEHICLE.cornerGrip]/Math.max(5,absSpeed)*dt;
  n[N.velocityYaw]=Math.atan2(Math.sin(n[N.velocityYaw]+Math.min(lateralLimit,Math.max(-lateralLimit,tireResponse))),Math.cos(n[N.velocityYaw]+Math.min(lateralLimit,Math.max(-lateralLimit,tireResponse))));
  const metric=Math.min(1.8,Math.max(.45,1-p[TRACK_SAMPLE.curvature]*n[N.lateral]));
  const forward=n[N.speed]*Math.cos(n[N.velocityYaw])/metric;
  const lateralVelocity=n[N.speed]*Math.sin(n[N.velocityYaw]);
  const before=n[N.s];work.step[0]=before;
  n[N.s]+=forward*dt;n[N.lateral]+=lateralVelocity*dt;
  const newP=sampleTrackBufferAt(state.track,n,N.s,work.next);
  const roadTurn=Math.atan2(Math.sin(newP[TRACK_SAMPLE.heading]-p[TRACK_SAMPLE.heading]),Math.cos(newP[TRACK_SAMPLE.heading]-p[TRACK_SAMPLE.heading]));
  n[N.yaw]=Math.atan2(Math.sin(n[N.yaw]-roadTurn),Math.cos(n[N.yaw]-roadTurn));n[N.velocityYaw]=Math.atan2(Math.sin(n[N.velocityYaw]-roadTurn),Math.cos(n[N.velocityYaw]-roadTurn));
  work.step[1]=forward;work.step[2]=Number(activeHandbrake);work.step[3]=throttle;work.step[4]=brake;work.step[5]=steer;work.step[6]=Number(handbrake);
}

function resolveWallTick(state,work){
  const n=numeric.get(state),dt=FIXED_DT;
  let status=roadStatusBufferAt(state.track,n,N.s,N.lateral,work.road);
  if(!status[ROAD_SAMPLE.legal]) {
    n[N.offTrackTime]+=dt;
    if(n[N.wallCooldown]<=0) {
      n[N.collisions]++;n[N.wallCooldown]=.7;bankDrift(state,true);state.reason='碰撞 · 提早煞車，輕轉方向';event(state,'collision',state.reason);
      n[N.speed]*=.52;
    }
    // Resolve against the closest physical corridor edge; no free progress from wall riding.
    const main=Math.min(state.track.width/2-.95,Math.max(-state.track.width/2+.95,n[N.lateral]));
    let bound=main;
    if(!Number.isNaN(status[ROAD_SAMPLE.offset])) {
      const sh=state.track.shortcut.width/2-.95,alt=Math.min(status[ROAD_SAMPLE.offset]+sh,Math.max(status[ROAD_SAMPLE.offset]-sh,n[N.lateral]));
      if(Math.abs(alt-n[N.lateral])<Math.abs(main-n[N.lateral]))bound=alt;
    }
    n[N.lateral]=bound;
    n[N.velocityYaw]*=.3;n[N.yaw]*=.55;
    n[N.speed]=Math.max(-4,n[N.speed]-18*dt);
    status=roadStatusBufferAt(state.track,n,N.s,N.lateral,work.road);
  }else n[N.offTrackTime]=0;
}

function scoreTick(state,work){
  const n=numeric.get(state),dt=FIXED_DT;
  const before=work.step[0],forward=work.step[1],activeHandbrake=work.step[2]!==0,status=work.road;
  n[N.forwardProgress]+=Math.max(0,n[N.s]-before);
  n[N.wrongWayTime]=forward<-.5?n[N.wrongWayTime]+dt:0;
  n[N.driftAngle]=Math.abs(Math.atan2(Math.sin(n[N.yaw]-n[N.velocityYaw]),Math.cos(n[N.yaw]-n[N.velocityYaw])));
  const validDrift=n[N.speed]>11&&n[N.driftAngle]>.12&&n[N.driftAngle]<1.15&&forward>5&&n[N.wallCooldown]===0&&status[ROAD_SAMPLE.legal]!==0&&n[N.s]>n[N.scoredProgress];
  state.drifting=!!validDrift;
  if(validDrift) {
    n[N.cleanDriftTime]+=dt;n[N.driftTime]+=dt;n[N.combo]=Math.min(4,1+Math.floor(n[N.cleanDriftTime]/1.8));
    // Reject momentary slip spikes from steering into a barrier. A sustained 0.4 s clean slide qualifies.
    if(n[N.cleanDriftTime]>=.4)n[N.pendingScore]+=n[N.speed]*n[N.driftAngle]*8*n[N.combo]*dt;
    n[N.scoredProgress]=n[N.s];n[N.driftRelease]=0;
    state.reason=driftReasons[n[N.combo]|0];
    state.tutorial.entry=true;if(n[N.cleanDriftTime]>=2)state.tutorial.control=true;
  }else {
    n[N.driftRelease]+=dt;
    if(n[N.pendingScore]>0&&n[N.driftRelease]>.75) {bankDrift(state);if(state.tutorial.entry)state.tutorial.exit=true;}
    if(n[N.wallCooldown]===0)state.reason=n[N.wrongWayTime]>.5?'逆行 · 煞停後回正':n[N.speed]<11?'加速至 40 km/h 以上才能漂移計分':activeHandbrake?'轉向入彎 · 維持側滑角度':status[ROAD_SAMPLE.shortcut]!==0?'風險捷徑 · 路窄抓地較低':'循線加速 · 彎前煞車';
  }
  if(n[N.speed]>11)state.tutorial.accelerate=true;
}

function recordHistoryTick(state,work){
  const n=numeric.get(state),dt=FIXED_DT;
  const throttle=work.step[3],brake=work.step[4],steer=work.step[5],handbrake=work.step[6]!==0;
  // 20 Hz pose samples are tied to fixed ticks; compressed input changes retain exact tick timing.
  const history=histories.get(state);
  const row=work.historyRow;
  if(n[N.lapTicks]%6===0){row[0]=Math.round(n[N.lapTime]*10000)|0;row[1]=Math.round((((n[N.s]%work.course[0])+work.course[0])%work.course[0])*10000)|0;row[2]=Math.round(n[N.lateral]*10000)|0;row[3]=Math.round(n[N.yaw]*10000)|0;row[4]=Math.round(n[N.speed]*10000)|0;history.samples.appendFrom(row);}
  const a=(Math.round(throttle*10000)|0),b=(Math.round(brake*10000)|0),c=(Math.round(steer*10000)|0),d=handbrake?1:0,store=history.inputs,inputIndex=((store.count-1)*5)|0;
  if(!store.count||a!==store.data[inputIndex+1]||b!==store.data[inputIndex+2]||c!==store.data[inputIndex+3]||d!==store.data[inputIndex+4]){row[0]=n[N.lapTicks];row[1]=a;row[2]=b;row[3]=c;row[4]=d;store.appendFrom(row);}
}

export function stepRace(state,input=neutral,frameDt=FIXED_DT) {
  const n=numeric.get(state);
  if(state.finished||state.paused)return state;
  n[N.accumulator]+=Math.min(.25,Math.max(0,(Number.isFinite(frameDt)?frameDt:0)));
  while(n[N.accumulator]+1e-10>=FIXED_DT&&!state.finished) {
    n[N.accumulator]-=FIXED_DT;tick(state,input);
  }
  return state;
}

// Presentation supplies a retained buffer, avoiding a boxed floating argument at
// this deliberately separate fixed-step boundary. Public/session semantics match.
export function stepRaceFrom(state,input,buffer,index){
  const n=numeric.get(state);if(state.finished||state.paused)return state;
  const dt=buffer[index];n[N.accumulator]+=Math.min(.25,Math.max(0,typeof dt==='number'&&dt===dt&&dt!==Infinity&&dt!==-Infinity?dt:0));
  while(n[N.accumulator]+1e-10>=FIXED_DT&&!state.finished){n[N.accumulator]-=FIXED_DT;tick(state,input);}
  return state;
}

/** Recovery never changes checkpoint order and always adds a visible 2-second penalty. */
export function resetCar(state) {
  const n=numeric.get(state),work=scratch.get(state);
  if(state.finished||n[N.countdown]>0)return false;
  const time=n[N.elapsed]-n[N.lapStart];
  const before=[(Math.round((time)*10000)/10000),(Math.round((((n[N.s]%work.course[0])+work.course[0])%work.course[0])*10000)/10000),(Math.round((n[N.lateral])*10000)/10000),(Math.round((n[N.yaw])*10000)/10000),(Math.round((n[N.speed])*10000)/10000)];
  // Replay the penalty as a hold followed by a teleport, never as a drive through intervening scenery.
  histories.get(state).samples.append(...before);histories.get(state).samples.append((Math.round((time+2-FIXED_DT)*10000)/10000),...before.slice(1));
  n[N.s]=n[N.lastLegalS]+.1;n[N.lateral]=0;n[N.yaw]=0;n[N.velocityYaw]=0;n[N.speed]=0;n[N.steer]=0;
  n[N.elapsed]+=2;n[N.penalty]+=2;n[N.resets]++;n[N.wallCooldown]=.5;n[N.offTrackTime]=0;n[N.wrongWayTime]=0;
  histories.get(state).samples.append((Math.round((time+2)*10000)/10000),(Math.round((n[N.s]%work.course[0])*10000)/10000),0,0,0);
  state.lapInvalid=false;n[N.pendingScore]=0;n[N.combo]=1;n[N.cleanDriftTime]=0;state.drifting=false;
  state.tutorial.recover=true;state.reason='已回正 · +2.00 秒 · 連段清除';
  event(state,'reset',state.reason);updatePose(state);return true;
}

export function validGhost(ghost,trackId,layoutId=`${trackId}:original:v1`) {
  return Boolean(ghost&&ghost.schemaVersion===1&&ghost.physicsVersion===PHYSICS_VERSION&&ghost.trackVersion===TRACK_VERSION&&ghost.trackId===trackId&&(ghost.layoutId||`${trackId}:original:v1`)===layoutId&&
    Number.isFinite(ghost.time)&&ghost.time>0&&Array.isArray(ghost.samples)&&ghost.samples.length>1&&ghost.samples.length<=7000&&
    ghost.samples.every(p=>Array.isArray(p)&&p.length===5&&p.every(Number.isFinite)));
}
export function getGhostPose(ghost,time) {
  if(!ghost||time<0||time>ghost.time)return null;
  if(!validatedGhosts.has(ghost)){if(!validGhost(ghost,ghost.trackId,ghost.layoutId))return null;validatedGhosts.add(ghost);ghostPoses.set(ghost,{sample:{},pose:{},track:ghost.layoutId?.includes(':mirrored:')?resolveTourTrack(ghost.trackId,7):TRACKS.find(x=>x.id===ghost.trackId)});}
  const samples=ghost.samples;let lo=0,hi=samples.length-1;
  while(lo+1<hi){const mid=(lo+hi)>>1;if(samples[mid][0]<=time)lo=mid;else hi=mid;}
  const a=samples[lo],b=samples[hi],t=clamp((time-a[0])/(b[0]-a[0]||1),0,1),track=ghostPoses.get(ghost).track;
  if(!track)return null;
  let distance=b[1]-a[1];if(distance<-track.length/2)distance+=track.length;
  const s=a[1]+distance*t,lateral=a[2]+(b[2]-a[2])*t,yaw=a[3]+angle(b[3]-a[3])*t,p=sampleTrackInto(track,s,ghostPoses.get(ghost).sample);
  const out=ghostPoses.get(ghost).pose;out.x=p.x+Math.cos(p.heading)*lateral;out.y=p.y;out.z=p.z-Math.sin(p.heading)*lateral;out.heading=p.heading+yaw;out.pitch=Math.atan(p.slope);out.s=s;out.lateral=lateral;out.yaw=yaw;out.speed=a[4]+(b[4]-a[4])*t;out.carId=ghost.carId;return out;
}

/** Rows stay quantized while recording; only explicit save/result reads materialize decimals. */
function packed(capacity,rows,input=false){
  const firstScale=input?1:10000,lastScale=input?1:10000;
  const store={data:new Int32Array(capacity*5),count:0,
    appendFrom(row){if(this.count===capacity)return;const i=this.count++*5;this.data[i]=row[0];this.data[i+1]=row[1];this.data[i+2]=row[2];this.data[i+3]=row[3];this.data[i+4]=row[4];},
    append(a,b,c,d,e){if(this.count===capacity)return;const i=this.count++*5;this.data[i]=Math.round(a*firstScale);this.data[i+1]=Math.round(b*10000);this.data[i+2]=Math.round(c*10000);this.data[i+3]=Math.round(d*10000);this.data[i+4]=Math.round(e*lastScale);},
    load(rows){this.count=0;for(const row of rows)this.append(row[0],row[1],row[2],row[3],row[4]);},
    rows(){const out=new Array(this.count);for(let n=0;n<this.count;n++){const i=n*5;out[n]=[this.data[i]/firstScale,this.data[i+1]/10000,this.data[i+2]/10000,this.data[i+3]/10000,this.data[i+4]/lastScale];}return out;}
  };
  store.load(rows);return store;
}
