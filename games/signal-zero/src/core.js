import {numericRecord,RUN as R,PLAYER as P,DEVICE as D,VISION as V} from './numeric.js';
import { Box3, Ray, Vector3 } from 'three';
import { LEVELS } from './levels.js';

export const PHYSICS = Object.freeze({ speed: 4.8, crouchSpeed: 2.15, gravity: 22, jumpSpeed: 10.7, radius: .325, height: 1.65, crouchHeight: .88, coyote: .1, buffer: .12 });
export const TOOL_DEFS = Object.freeze([
  { id: 'pulse', name: '干擾脈衝', hint: '近 8m：讓一台攝影機、無人機或雷射停機 8 秒', color: '#65f4d3' },
  { id: 'decoy', name: '聲音誘餌', hint: '近 11m：讓可聽見誘餌的守衛調查 7 秒；牆體隔音', color: '#f9c57b' },
  { id: 'rewire', name: '迴路改線', hint: '近 5m：永久關閉一座雷射或攝影機', color: '#c595ff' },
]);

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const copy = value => JSON.parse(JSON.stringify(value));
const distance = (a,b) => {const x=a.x-b.x,y=a.y-b.y;return Math.sqrt(x*x+y*y)};
const heightOf = player => player.crouched ? PHYSICS.crouchHeight : PHYSICS.height;
const playerBox = (box, x, y, height) => { box.min.set(x-PHYSICS.radius,y,-.3);box.max.set(x+PHYSICS.radius,y+height,.3);return box; };
const PRIORITIES = { normal:0,suspicious:1,searching:2,tracking:3 };
const ALERT_STATES = ['normal','suspicious','searching','tracking'];
export const canonicalSeed = chapter => 1009 + chapter * 97;
export const validSeed = (seed,chapter=0) => Number.isInteger(seed)&&seed>=0&&seed<=0xffffffff?seed:canonicalSeed(chapter);
export function resolveEncounter(level,seed){
 return level.devices.map((device,index)=>{
  let hash=seed>>>0;for(let i=0;i<device.id.length;i++){hash=Math.imul(hash^device.id.charCodeAt(i),16777619)>>>0}hash=(Math.imul(hash^(hash>>>16),2246822507)>>>0);const n=hash/4294967296;
  const d={...device};if(device.id.startsWith('sector-')&&seed!==canonicalSeed(LEVELS.indexOf(level))){d.phase=(device.phase??index*1.37)+n*7;if(device.max-device.min>1){d.x=device.min+.5+n*(device.max-device.min-1);d.dir=hash&1?1:-1;}}return d;
 });
}
const solidBox = item => new Box3(new Vector3(item.x - item.w / 2, item.y - item.h / 2, (item.z || 0) - (item.d || 2) / 2), new Vector3(item.x + item.w / 2, item.y + item.h / 2, (item.z || 0) + (item.d || 2) / 2));
const emit = (run,type,text,extra) => { const event=run._eventPool[run.events.length];if(!event)return;event.type=type;event.text=text;event.quiet=false;event.tool=undefined;event.target=undefined;event.deviceId=undefined;event.id=undefined;event.medals=undefined;if(extra)Object.assign(event,extra);run.events.push(event); };
export function selectTool(run,index){if(index===run.selectedTool)return false;run.selectedTool=index;emit(run,'tool-selected',TOOL_DEFS[index].name,{tool:index});return true;}
function alarm(run,text,device){run.alerts++;if(run.difficulty==='standard'){run.tracePenalty+=4;run.traceRemaining=Math.max(0,run.traceRemaining-4);}emit(run,'alarm',text+(run.difficulty==='standard'?' · 追蹤 +4 秒':''),{deviceId:device.id});}

class Device {
 constructor(device,index){
  // Named adapters preserve saves/tests; AI reads the preallocated double buffer.
  this.id=device.id;this.type=device.type;this.x=.1;this.y=.1;this.z=.1;this.min=.1;this.max=.1;this.dir=1;this.range=.1;this.speed=.1;this.period=.1;this.onTime=.1;this.initialX=.1;this.initialDir=1;this.phase=.1;this.scanOffset=.1;this.cycleRemaining=.1;this.suspicion=.1;this.disabledUntil=.1;this.searchRemaining=.1;this.decoyUntil=.1;
  this.x=device.x;this.y=device.y;this.z=0;this.min=device.min;this.max=device.max;this.dir=device.dir;this.range=device.range;this.speed=device.speed||0;this.period=device.period||7;this.onTime=device.onTime||0;this.initialX=device.x;this.initialDir=device.dir;this.phase=device.phase??index*1.37;this.scanOffset=0;this.cycleRemaining=0;this.suspicion=0;this.disabledUntil=0;this.searchRemaining=0;this.decoyUntil=0;
  this.state='normal';this.rewired=false;this.lastSeen=null;this.active=true;this.tripAt=null;this.tripLatched=false;this._lastSeen=numericRecord({x:.1,y:.1},{x:0,y:1});numericRecord(this,D,['tripAt']);synchronizeCycle(this,ZERO_TIME);
 }
}
function freshDevice(device,index){return new Device(device,index);}

const ZERO_TIME=new Float64Array(11);
function synchronizeCycle(device, timing) {
  const time=timing[R.time];
  if (device.type === 'camera') device.numeric[D.scanOffset] = Math.sin((time + device.numeric[D.phase]) * .62) * 1.05;
  if (device.type === 'laser') {
    const phase = ((time + device.numeric[D.phase]) % device.numeric[D.period] + device.numeric[D.period]) % device.numeric[D.period];
    device.active = phase < device.numeric[D.onTime];
    device.numeric[D.cycleRemaining] = device.active ? device.numeric[D.onTime] - phase : device.numeric[D.period] - phase;
  }
}

class Player {
 constructor(spawn){
  // Preserve double precision across the 120 Hz collision and movement steps.
  this.x=.1;this.y=.1;this.z=.1;this.vx=.1;this.vy=.1;this.coyote=.1;this.jumpBuffer=.1;
  this.x=spawn.x;this.y=spawn.y;this.z=0;this.vx=0;this.vy=0;this.coyote=PHYSICS.coyote;this.jumpBuffer=0;
  this.facing=1;this.grounded=true;this.crouched=false;this.animation='idle';this.climbing=false;numericRecord(this,P);
 }
}

export function createRun(levelIndex = 0, checkpoint = null, seed, difficulty = 'standard') {
  const safeIndex = clamp(Math.floor(Number(levelIndex) || 0), 0, LEVELS.length - 1);
  const level = LEVELS[safeIndex];
  const run = {
    levelIndex: safeIndex, levelId: level.id, seed: validSeed(seed,safeIndex), difficulty:difficulty==='relaxed'?'relaxed':'standard',traceRemaining:level.traceDeadline,tracePenalty:0, detectionSeconds:level.detectionSeconds, patrolMultiplier:level.patrolMultiplier,
    player: new Player(level.spawn),
    devices: resolveEncounter(level,validSeed(seed,safeIndex)).map(freshDevice), time: .1, alerts: 0, alertTime: .1, suspicion: .1, alertState: 'normal',
    phase: 'playing', objectives: [], packet: false, tools: [...level.supplies], selectedTool: 0,
    checkpoint: null, checkpointReached: false, checkpointIndex: -1, hackProgress: .1, _promptTerminal: null, _exitRemaining: -1, _exitPrompt: '', hackTarget: null, prompt: '', events: [],
    _eventPool:Array.from({length:64},()=>({})),_subInput:{axis:.1,jumpHeld:false,jumpPressed:false,crouch:false,up:false,interactPressed:false},_ray:new Ray(),_rayOrigin:new Vector3(),_rayDelta:new Vector3(),_rayHit:new Vector3(),_vision:createVision(),_target:new Vector3(),_delta:new Vector3(),_toolOrigin:new Vector3(),_toolTarget:new Vector3(),_collision:new Box3(),hackMilestone:0,encounters:[],sectorId:null, catches: 0, lastFailure: null, route: 'ground', traveled: .1,
    _solids: [...level.platforms, ...level.covers].map(item => ({ ...item, box: solidBox(item) })),
  };
  numericRecord(run,R);run.numeric[R.frameDelta]=1/60;
  run.time=0;run.alertTime=0;run.suspicion=0;run.hackProgress=0;run.traveled=0;
  if (checkpoint) return restoreRun(checkpoint, safeIndex);
  return run;
}

function prepareDevice(device){
 if(device.numeric)return;
 if(device.period==null)device.period=7;
 numericRecord(device,D,['tripAt']);
 const last=device._lastSeen||{x:0,y:0};device._lastSeen=last.numeric?last:numericRecord(last,{x:0,y:1});
 if(device.lastSeen&&!device.lastSeen.numeric)device.lastSeen=numericRecord(device.lastSeen,{x:0,y:1});
}
/** Exact 3D line segment versus the same solid geometry used by collision. */
export function lineBlocked(run, from, to) {
  const origin=run._rayOrigin.set(from.x,from.y,from.z||0),delta=run._rayDelta.set(to.x,to.y,to.z||0).sub(origin),length=delta.length();
  if(length<.001)return false;const ray=run._ray.set(origin,delta.normalize()),hit=run._rayHit;
  for(let i=0;i<run._solids.length;i++){if(ray.intersectBox(run._solids[i].box,hit)){const d=hit.distanceTo(origin);if(d>.025&&d<length-.025)return true;}}return false;
}

export function createVision(){return numericRecord({origin:new Vector3(),direction:new Vector3(),halfAngle:0,range:0},V)}
export function visionFor(device,out=createVision()) {
  if(!out.numeric)numericRecord(out,V);
  if(!device.numeric)prepareDevice(device);
  const slope = device.type === 'camera' ? -.28 : device.type === 'drone' ? -.23 : -.025;
  const heading = Math.atan2(slope, device.numeric[D.dir]) + (device.numeric[D.scanOffset] || 0);
  out.origin.set(device.numeric[D.x],device.numeric[D.y]+(device.type==='guard'?1.25:0),0);out.direction.set(Math.cos(heading),Math.sin(heading),0);out.numeric[V.halfAngle]=(device.type==='drone'?43:34)*Math.PI/180;out.numeric[V.range]=device.numeric[D.range];return out;
}

export function getVision(device, run) {
  if(!device.numeric)prepareDevice(device);
  const active = !device.rewired && device.numeric[D.disabledUntil] <= run.numeric[R.time] && (device.type !== 'laser' || device.active);
  if (device.type === 'laser') return { origin: { x: device.numeric[D.x], y: device.numeric[D.y], z: 0 }, endpoint: { x: device.numeric[D.x], y: device.numeric[D.y] + device.numeric[D.range], z: 0 }, direction: { x: 0, y: 1, z: 0 }, halfAngle: 0, range: device.numeric[D.range], active };
  return { ...visionFor(device), active };
}

export function visionPolygon(device, run) {
  const vision = getVision(device, run);
  if (!vision.active || device.type === 'laser') return [];
  const origin = new Vector3(vision.origin.x, vision.origin.y, vision.origin.z);
  const heading = Math.atan2(vision.direction.y, vision.direction.x);
  const points = [{ ...vision.origin }];
  const hit = new Vector3();
  for (let i = 0; i <= 24; i++) {
    const angle = heading - vision.halfAngle + i * vision.halfAngle * 2 / 24;
    const direction = new Vector3(Math.cos(angle), Math.sin(angle), 0);
    const ray = new Ray(origin, direction);
    let length = vision.range;
    for (let solidIndex=0;solidIndex<run._solids.length;solidIndex++) {const solid=run._solids[solidIndex];
      if (ray.intersectBox(solid.box, hit)) {
        const d = hit.distanceTo(origin);
        if (d > .025) length = Math.min(length, d);
      }
    }
    const endpoint = origin.clone().addScaledVector(direction, length);
    points.push({ x: endpoint.x, y: endpoint.y, z: endpoint.z });
  }
  points.push({ ...vision.origin });
  return points;
}

export function canSee(run, device, player = run.player) {
  if(!device.numeric)prepareDevice(device);if(!player.numeric)numericRecord(player,P);
  if (device.rewired || device.numeric[D.disabledUntil] > run.numeric[R.time] || device.type === 'laser') return false;
  const px=player.numeric[P.x],py=player.numeric[P.y],pz=player.numeric[P.z];
  if(Math.abs(device.numeric[D.x]-px)>device.numeric[D.range]||Math.abs(device.numeric[D.y]-py)>device.numeric[D.range]+PHYSICS.height)return false;
  const vision=visionFor(device,run._vision),h=heightOf(player),target=run._target,delta=run._delta;
  for(let i=0;i<2;i++){target.set(px,py+h*(i===0?.82:.4),pz||0);delta.copy(target).sub(vision.origin);const length=delta.length();if(length>vision.numeric[V.range]||length<.025)continue;if(delta.normalize().dot(vision.direction)<Math.cos(vision.numeric[V.halfAngle]))continue;if(!lineBlocked(run,vision.origin,target))return true;}return false;
}

export function toolTarget(run, index = run.selectedTool) {
  const p = run.player;
  const origin=run._toolOrigin.set(p.numeric[P.x],p.numeric[P.y]+.65,0),target=run._toolTarget,limit=index===0?8:index===1?11:index===2?5:null;if(limit==null)return null;let best=null,bestDistance=Infinity;
  for(let deviceIndex=0;deviceIndex<run.devices.length;deviceIndex++){const device=run.devices[deviceIndex];if(!device.numeric)prepareDevice(device);if(device.rewired||device.numeric[D.disabledUntil]>run.numeric[R.time])continue;if(index===0&&device.type!=='camera'&&device.type!=='drone'&&device.type!=='laser')continue;if(index===1&&(device.type!=='guard'||device.numeric[D.decoyUntil]>run.numeric[R.time]))continue;if(index===2&&device.type!=='laser'&&device.type!=='camera')continue;target.set(device.numeric[D.x],device.numeric[D.y]+(device.type==='guard'?1.1:device.type==='laser'?1:0),0);const dx=p.numeric[P.x]-device.numeric[D.x],dy=p.numeric[P.y]-device.numeric[D.y],d=Math.sqrt(dx*dx+dy*dy);if(distance(origin,target)<=limit&&d<bestDistance&&!lineBlocked(run,origin,target)){best=device;bestDistance=d;}}return best;
}

export function useTool(run) {
  const index = run.selectedTool;
  const target = toolTarget(run, index);
  if (run.phase !== 'playing') return false;
  if (!run.tools[index]) { emit(run, 'tool-failed', '這項工具已用完；仍可觀察巡邏或改走另一條路。'); return false; }
  if (!target) { emit(run, 'tool-failed', '範圍內沒有可作用且未被遮擋的目標。'); return false; }
  run.tools[index]--;
  if (index === 0) {
    target.numeric[D.disabledUntil] = run.numeric[R.time] + 8; target.state = 'disabled'; target.numeric[D.suspicion] = 0; target.numeric[D.tripAt] = NaN;
    emit(run, 'tool', '干擾成功 · 設備暫停 8 秒', { tool: index, target: target.id });
  } else if (index === 1) {
    target.lastSeen = target._lastSeen;target.lastSeen.numeric[0]=clamp(run.player.numeric[P.x]+run.player.facing*8,target.numeric[D.min],target.numeric[D.max]);target.lastSeen.numeric[1]=target.numeric[D.y];
    target.numeric[D.decoyUntil] = run.numeric[R.time] + 7; target.numeric[D.searchRemaining] = 7; target.state = 'searching'; target.numeric[D.suspicion] = 0;
    emit(run, 'tool', '誘餌成功 · 守衛調查聲音 7 秒', { tool: index, target: target.id });
  } else {
    target.rewired = true; target.numeric[D.disabledUntil] = Infinity; target.state = 'disabled'; target.numeric[D.suspicion] = 0;
    emit(run, 'tool', '改線成功 · 供電已永久切斷', { tool: index, target: target.id });
  }
  // A reload must not refund a tool spent after the safe checkpoint.
  if (run.checkpoint) {
    run.checkpoint.tools = [...run.tools];
    run.checkpoint.selectedTool = index;
    if (index === 2) {
      const savedTarget = run.checkpoint.devices.find(device => device.id === target.id);
      if (savedTarget) { savedTarget.rewired = true; savedTarget.disabledUntil = 0; }
    }
    emit(run, 'checkpoint', '工具存量已同步至安全點', { quiet: true });
  }
  return true;
}

function movePlayer(run,input) {
  const dt=run.numeric[R.subDelta];
  const p = run.player;
  const level = LEVELS[run.levelIndex];
  const axis = clamp(Number(input.axis) || 0, -1, 1);
  p.numeric[P.jumpBuffer] = input.jumpPressed ? PHYSICS.buffer : Math.max(0, p.numeric[P.jumpBuffer] - dt);
  p.numeric[P.coyote] = p.grounded ? PHYSICS.coyote : Math.max(0, p.numeric[P.coyote] - dt);
  if (axis) p.facing = axis > 0 ? 1 : -1;
  if (input.crouch) p.crouched = p.grounded;
  else if (p.crouched) {
    const box=playerBox(run._collision,p.numeric[P.x],p.numeric[P.y]+.02,PHYSICS.height);let blocked=false;for(let solidIndex=0;solidIndex<run._solids.length;solidIndex++)if(run._solids[solidIndex].box.intersectsBox(box)){blocked=true;break;}if(!blocked)p.crouched=false;
  }
  let ladder=null;for(let ladderIndex=0;ladderIndex<level.ladders.length;ladderIndex++){const l=level.ladders[ladderIndex];if(Math.abs(p.numeric[P.x]-l.x)<.75&&p.numeric[P.y]>=l.y0-.12&&p.numeric[P.y]<=l.y1+.12){ladder=l;break;}}
  const wantsClimb = input.up && ladder && p.numeric[P.y] < ladder.y1 - .01 && p.numeric[P.jumpBuffer] <= 0;
  if (wantsClimb || (p.climbing && ladder && !axis && !input.jumpPressed && !input.crouch)) {
    if(!p.climbing)emit(run,'climb','');p.climbing = true; p.crouched = false; p.numeric[P.x] += (ladder.x - p.numeric[P.x]) * Math.min(1, dt * 16); p.numeric[P.vx] = 0; p.numeric[P.vy] = 0;
    if (input.up) p.numeric[P.y] = Math.min(ladder.y1, p.numeric[P.y] + 2.7 * dt);
    p.grounded = p.numeric[P.y] >= ladder.y1;
    if (p.grounded) { p.climbing = false; p.numeric[P.coyote] = PHYSICS.coyote; }
    p.animation = 'ladder'; return;
  }
  p.climbing = false;
  if (p.numeric[P.jumpBuffer] > 0 && p.numeric[P.coyote] > 0 && !p.crouched) {
    p.numeric[P.vy] = PHYSICS.jumpSpeed; p.grounded = false; p.numeric[P.coyote] = 0; p.numeric[P.jumpBuffer] = 0;
    emit(run, 'jump', '');
  }
  if (!input.jumpHeld && p.numeric[P.vy] > 4.5) p.numeric[P.vy] = 4.5;
  const acceleration = p.grounded ? 42 : 28;
  const targetSpeed = axis * (p.crouched ? PHYSICS.crouchSpeed : PHYSICS.speed);
  p.numeric[P.vx] += clamp(targetSpeed - p.numeric[P.vx], -acceleration * dt, acceleration * dt);
  const oldX = p.numeric[P.x];
  let nextX = clamp(p.numeric[P.x] + p.numeric[P.vx] * dt, 1, level.length - 1);
  const h = heightOf(p);
  let climbed = false;
  for (let solidIndex=0;solidIndex<run._solids.length;solidIndex++) {const solid=run._solids[solidIndex];
    const b = solid.box;
    if (p.numeric[P.y] + h <= b.min.y + .015 || p.numeric[P.y] >= b.max.y - .015 || b.max.z < -.3 || b.min.z > .3) continue;
    if (nextX + PHYSICS.radius > b.min.x && nextX - PHYSICS.radius < b.max.x) {
      // A facing ledge within arm reach has an explicit climb action and real landing face.
      const topDelta = b.max.y - p.numeric[P.y];
      if ((input.up || input.jumpHeld) && topDelta > .05 && topDelta <= 1.55 && p.numeric[P.vy] >= -2 && !p.crouched) {
        const box=playerBox(run._collision,nextX,b.max.y+.02,h);let blocked=false;for(let otherIndex=0;otherIndex<run._solids.length;otherIndex++){const other=run._solids[otherIndex];if(other!==solid&&other.box.intersectsBox(box)){blocked=true;break;}}
        if (!blocked) {
          p.numeric[P.y] = b.max.y; p.numeric[P.vy] = 0; p.grounded = true; p.animation = 'climb'; climbed = true;
          emit(run, 'climb', ''); continue;
        }
      }
      if (p.numeric[P.vx] > 0) nextX = b.min.x - PHYSICS.radius;
      else if (p.numeric[P.vx] < 0) nextX = b.max.x + PHYSICS.radius;
      p.numeric[P.vx] = 0;
    }
  }
  p.numeric[P.x] = nextX;
  run.numeric[R.traveled] += Math.abs(p.numeric[P.x] - oldX);
  if (climbed) return;
  const oldY = p.numeric[P.y];
  const wasAirborne = !p.grounded;
  const impactSpeed = Math.max(0, -p.numeric[P.vy]);
  p.numeric[P.vy] -= PHYSICS.gravity * dt;
  let nextY = oldY + p.numeric[P.vy] * dt;
  p.grounded = false;
  for (let solidIndex=0;solidIndex<run._solids.length;solidIndex++) {const solid=run._solids[solidIndex];
    const b = solid.box;
    if (p.numeric[P.x] + PHYSICS.radius <= b.min.x + .005 || p.numeric[P.x] - PHYSICS.radius >= b.max.x - .005 || b.max.z < -.3 || b.min.z > .3) continue;
    if (p.numeric[P.vy] <= 0 && oldY >= b.max.y - .025 && nextY <= b.max.y) { nextY = Math.max(nextY, b.max.y); p.numeric[P.vy] = 0; p.grounded = true; }
    else if (p.numeric[P.vy] > 0 && oldY + h <= b.min.y + .02 && nextY + h >= b.min.y) { nextY = b.min.y - h; p.numeric[P.vy] = 0; }
  }
  p.numeric[P.y] = nextY;
  if (wasAirborne && p.grounded && impactSpeed > 2) emit(run, 'land', '');
  p.animation = !p.grounded ? p.numeric[P.vy] > 0 ? 'jump' : 'fall' : p.crouched ? 'crouch' : Math.abs(p.numeric[P.vx]) > .15 ? 'run' : 'idle';
  if (p.numeric[P.y] > 2.5) run.route = 'upper';
  if (p.numeric[P.y] < -8) catchPlayer(run, '墜落至維修區下方。');
}

function catchPlayer(run, reason) {
  if (run.phase !== 'playing') return;
  run.phase = 'caught'; run.player.animation = 'caught'; run.player.numeric[P.vx] = 0; run.player.numeric[P.vy] = 0;
  run.lastFailure = { x: run.player.numeric[P.x], y: run.player.numeric[P.y], time: run.numeric[R.time], reason };
  emit(run, 'caught', reason);
}

function moveDevice(run,device,mode) {
  const amount=device.numeric[D.dir]*(mode===1?(device.type==='guard'?3.1:2.2):device.numeric[D.speed]*(mode===2?1.15:run.numeric[R.patrolMultiplier]))*run.numeric[R.subDelta];
  let next = device.numeric[D.x] + amount;
  if (device.type === 'guard') {
    for (let solidIndex=0;solidIndex<run._solids.length;solidIndex++) {const solid=run._solids[solidIndex];
      const b = solid.box;
      if (device.numeric[D.y] + 1.6 <= b.min.y + .015 || device.numeric[D.y] >= b.max.y - .015 || b.max.z < -.3 || b.min.z > .3) continue;
      if (next + .32 > b.min.x && next - .32 < b.max.x) next = amount > 0 ? b.min.x - .32 : b.max.x + .32;
    }
  }
  device.numeric[D.x] = next;
}

function patrol(run,device) {
  const dt=run.numeric[R.subDelta];
  if (device.type !== 'guard' && device.type !== 'drone') return;
  if (device.numeric[D.x] >= device.numeric[D.max]) device.numeric[D.dir] = -1;
  if (device.numeric[D.x] <= device.numeric[D.min]) device.numeric[D.dir] = 1;
  const before=device.numeric[D.x];
  moveDevice(run,device,0);
  if(Math.abs(device.numeric[D.x]-before)<device.numeric[D.speed]*dt*.25)device.numeric[D.dir]*=-1;
}

function updateDevices(run) {
  const dt=run.numeric[R.subDelta];
  let maxSuspicion = 0;
  let priority = 0;
  for (let deviceIndex=0;deviceIndex<run.devices.length;deviceIndex++) {const device=run.devices[deviceIndex];if(!device.numeric)prepareDevice(device);
    if (device.rewired || device.numeric[D.disabledUntil] > run.numeric[R.time]) { device.state = 'disabled'; device.active = false; device.numeric[D.suspicion] = 0; continue; }
    device.active = true;
    if (device.state === 'disabled') device.state = 'normal';
    synchronizeCycle(device,run.numeric);
    if (device.type === 'laser') {
      const p = run.player;
      const intersects = device.active && Math.abs(p.numeric[P.x] - device.numeric[D.x]) < .39 && p.numeric[P.y] < device.numeric[D.y] + device.numeric[D.range] && p.numeric[P.y] + heightOf(p) > device.numeric[D.y];
      // A tripwire records a breach, then visibly counts down before sounding.
      // Sprinting through in one frame cannot erase the recorded crossing.
      if (intersects && !device.tripLatched) { device.numeric[D.tripAt] = run.numeric[R.time]; device.tripLatched = true; }
      if (!intersects) device.tripLatched = false;
      if (!Number.isNaN(device.numeric[D.tripAt])) device.numeric[D.suspicion] = Math.min(1, (run.numeric[R.time] - device.numeric[D.tripAt]) / .75);
      else device.numeric[D.suspicion] = Math.max(0, device.numeric[D.suspicion] - dt * .8);
      if (!Number.isNaN(device.numeric[D.tripAt]) && device.numeric[D.suspicion] >= 1 && device.state !== 'tracking') {
        device.state = 'tracking'; device.numeric[D.searchRemaining] = 5; alarm(run,'雷射感應到通行 · 警報已記錄',device);
        device.numeric[D.tripAt] = NaN;
      } else if (!intersects && device.state === 'tracking') device.state = 'searching';
      if (device.state === 'searching') { device.numeric[D.searchRemaining] -= dt; if (device.numeric[D.searchRemaining] <= 0) device.state = 'normal'; }
      if (device.state === 'normal' || device.state === 'suspicious') device.state = device.numeric[D.suspicion] > .02 ? 'suspicious' : 'normal';
    } else {
      const visible = canSee(run, device);
      const distracted = device.numeric[D.decoyUntil] > run.numeric[R.time];
      if (visible && !distracted) {
        device.numeric[D.suspicion] = Math.min(1, device.numeric[D.suspicion] + dt / (device.numeric[D.x]<55?.95:run.numeric[R.detectionSeconds]));
        if (device.numeric[D.suspicion] >= 1) {
          if (device.state !== 'tracking') { alarm(run,'追蹤開始 · 躲入遮擋，離開最後目擊位置',device); }
          device.state = 'tracking'; if(!device.lastSeen)device.lastSeen=device._lastSeen;device.lastSeen.numeric[0]=run.player.numeric[P.x];device.lastSeen.numeric[1]=run.player.numeric[P.y]; device.numeric[D.searchRemaining] = 6;
        } else if (device.state !== 'tracking') device.state = 'suspicious';
      } else {
        device.numeric[D.suspicion] = Math.max(0, device.numeric[D.suspicion] - dt * .55);
        if (device.state === 'tracking') { device.state = 'searching'; device.numeric[D.searchRemaining] = 6; }
        if (device.state === 'suspicious' && device.numeric[D.suspicion] <= .02) device.state = 'normal';
      }
      if (device.state === 'tracking') {
        if (device.type === 'guard' || device.type === 'drone') {
          const delta = device.lastSeen.numeric[0] - device.numeric[D.x];
          if (Math.abs(delta) > .15) { device.numeric[D.dir] = Math.sign(delta); moveDevice(run,device,1); }
        }
        if (device.type === 'guard' && visible && Math.abs(device.numeric[D.x] - run.player.numeric[P.x]) < .45 && Math.abs(device.numeric[D.y] - run.player.numeric[P.y]) < .55) catchPlayer(run, '守衛抵達了你的位置。換一條路，或先引開巡邏。');
      } else if (device.state === 'searching') {
        device.numeric[D.searchRemaining] = Math.max(0, device.numeric[D.searchRemaining] - dt);
        if ((device.type === 'guard' || device.type === 'drone') && device.lastSeen) {
          const delta = device.lastSeen.numeric[0] - device.numeric[D.x];
          if (Math.abs(delta) > .15) { device.numeric[D.dir] = Math.sign(delta); moveDevice(run,device,2); }
        }
        if (device.numeric[D.searchRemaining] <= 0 && !distracted) { device.state = 'normal'; device.lastSeen = null; device.numeric[D.suspicion] = 0; }
      } else patrol(run,device);
    }
    maxSuspicion = Math.max(maxSuspicion, device.numeric[D.suspicion]);
    priority = Math.max(priority, PRIORITIES[device.state] || 0);
  }
  run.numeric[R.suspicion] = maxSuspicion;
  run.alertState = ALERT_STATES[priority];
  if (priority >= 2) run.numeric[R.alertTime] += dt;
}

function updateObjectives(run,input) {
  const dt=run.numeric[R.subDelta];
  const level = LEVELS[run.levelIndex];
  const p = run.player;
  let terminal=null;for(let terminalIndex=0;terminalIndex<level.terminals.length;terminalIndex++){const item=level.terminals[terminalIndex];if(!run.objectives.includes(item.id)&&Math.abs(item.x-p.numeric[P.x])<1.4&&Math.abs(item.y-p.numeric[P.y])<.65){terminal=item;break;}}
  if(run._promptTerminal!==terminal){run._promptTerminal=terminal;run.prompt=terminal?`按住 W／互動 · ${terminal.label}`:'';}
  if(!terminal)run.prompt='';
  if (terminal && (input.up || input.interactPressed) && p.grounded && Math.abs(p.numeric[P.vx]) < .3) {
    if(run.hackTarget!==terminal.id){run.numeric[R.hackProgress]=0;run.hackMilestone=0;emit(run,'hack-start','',{id:terminal.id});}
    run.hackTarget = terminal.id; run.numeric[R.hackProgress] = Math.min(1, run.numeric[R.hackProgress] + dt / 1.05); p.animation = 'hack';
    const milestone=Math.min(3,Math.floor(run.numeric[R.hackProgress]*4));if(milestone>run.hackMilestone){run.hackMilestone=milestone;emit(run,'hack-progress','',{id:terminal.id});}
    if (run.numeric[R.hackProgress] >= 1) {
      run.objectives.push(terminal.id); run.numeric[R.hackProgress] = 0; run.hackTarget = null;
      emit(run, 'objective', `${terminal.label} · ${terminal.kind === 'data' ? '取得完成' : '改寫完成'}`, { id: terminal.id });
    }
  } else { run.numeric[R.hackProgress] = 0; run.hackTarget = null; run.hackMilestone=0; }
  if (!run.packet && Math.abs(p.numeric[P.x] - level.packet.x) < 1 && Math.abs(p.numeric[P.y] - level.packet.y) < 1) { run.packet = true; emit(run, 'packet', '可選資料包已取得 · 本關全資料獎章已備妥'); }
  const checkpoints = level.checkpoints || [level.checkpoint];
  let reachedIndex=-1;for(let i=run.checkpointIndex+1;i<checkpoints.length;i++)if(Math.abs(p.numeric[P.x]-checkpoints[i].x)<1.5&&Math.abs(p.numeric[P.y]-checkpoints[i].y)<.5){reachedIndex=i;break;}
  if (reachedIndex >= 0 && run.objectives.length > 0 && run.alertState !== 'tracking' && run.alertState !== 'searching') {
    run.checkpointReached = true; run.checkpointIndex = reachedIndex; run.checkpoint = makeSnapshot(run);
    emit(run, 'checkpoint', `安全點 ${reachedIndex + 1}/${checkpoints.length} 已保存`);
  }
  if (Math.abs(p.numeric[P.x] - level.exit.x) < 1.6 && Math.abs(p.numeric[P.y] - level.exit.y) < .7) {
    if (run.objectives.length === level.terminals.length) {
      run.phase = 'complete'; p.numeric[P.vx] = 0; p.animation = 'idle';
      emit(run, 'complete', '訊號送達 · 任務完成', { medals: medalsFor(run) });
    } else {const remaining=level.terminals.length-run.objectives.length;if(run._exitRemaining!==remaining){run._exitRemaining=remaining;run._exitPrompt=`出口未解鎖 · 尚有 ${remaining} 個任務節點`;}run.prompt=run._exitPrompt;}
  }
}

const EMPTY_INPUT=Object.freeze({});
export function step(run,input=EMPTY_INPUT,delta=1/60){run.numeric[R.frameDelta]=delta;return stepBuffered(run,input)}
// Same simulation entrypoint with delta already in the persistent frame buffer.
export function stepBuffered(run,input=EMPTY_INPUT) {
  const delta=run.numeric[R.frameDelta];
  run.events.length = 0;
  if (run.phase !== 'playing' || !Number.isFinite(delta) || delta <= 0) return run.events;
  if (input.cyclePressed) selectTool(run,(run.selectedTool+1)%TOOL_DEFS.length);
  if (input.toolPressed) useTool(run);
  // Bounded substeps: frame rate changes cannot skip a thin collider or laser.
  let remaining = Math.min(delta, .1);
  const subInput=run._subInput;subInput.axis=input.axis;subInput.jumpHeld=input.jumpHeld;subInput.jumpPressed=input.jumpPressed;subInput.crouch=input.crouch;subInput.up=input.up;subInput.interactPressed=input.interactPressed;
  while (remaining > .000001 && run.phase === 'playing') {
    const dt = Math.min(remaining, 1 / 120);
    run.numeric[R.time] += dt;
    if(run.difficulty==='standard'){run.numeric[R.traceRemaining]=Math.max(0,run.numeric[R.traceRemaining]-dt);if(run.numeric[R.traceRemaining]===0){catchPlayer(run,'任務追蹤已鎖定訊號。觀察路線、減少警報，或在設定選擇舒緩模式。');break;}}
    run.numeric[R.subDelta]=dt;
    movePlayer(run,subInput);
    updateDevices(run);
    if (run.phase === 'playing') updateObjectives(run,subInput);
    subInput.jumpPressed=false;subInput.interactPressed=false;remaining-=dt;
  }
  for(let sectorIndex=0;sectorIndex<LEVELS[run.levelIndex].sectors.length;sectorIndex++){const sector=LEVELS[run.levelIndex].sectors[sectorIndex];if(run.player.numeric[P.x]>=sector.start&&run.player.numeric[P.x]<sector.end&&run.sectorId!==sector.id){run.sectorId=sector.id;let known=false;for(let i=0;i<run.encounters.length;i++)if(run.encounters[i].id===sector.mechanicId){known=true;break;}if(!known)run.encounters.push({id:sector.mechanicId,time:run.numeric[R.time]});break;}}
  return run.events;
}

export function medalsFor(run) {
  return { speed: run.time <= LEVELS[run.levelIndex].timeTarget, ghost: run.alerts === 0, data: run.packet };
}

// Deliberate JSON boundaries keep schema 1 independent of numeric storage.
export function serializePlayer(p){return{x:p.x,y:p.y,z:p.z,vx:p.vx,vy:p.vy,coyote:p.coyote,jumpBuffer:p.jumpBuffer,facing:p.facing,grounded:p.grounded,crouched:p.crouched,animation:p.animation,climbing:p.climbing}}
function serializeDevice(d){return{id:d.id,type:d.type,x:d.x,y:d.y,z:d.z,min:d.min,max:d.max,dir:d.dir,range:d.range,speed:d.speed,period:d.period,onTime:d.onTime,initialX:d.initialX,initialDir:d.initialDir,phase:d.phase,scanOffset:d.scanOffset,cycleRemaining:d.cycleRemaining,suspicion:d.suspicion,disabledUntil:Number.isFinite(d.disabledUntil)?d.disabledUntil:0,searchRemaining:d.searchRemaining,decoyUntil:d.decoyUntil,state:d.state,rewired:d.rewired,lastSeen:d.lastSeen?{x:d.lastSeen.x,y:d.lastSeen.y}:null,active:d.active,tripAt:d.tripAt,tripLatched:d.tripLatched,_lastSeen:{x:d._lastSeen.x,y:d._lastSeen.y}}}

function makeSnapshot(run) {
  const level = LEVELS[run.levelIndex];
  const point = level.checkpoints?.[Math.max(0, run.checkpointIndex)] || level.checkpoint;
  return {
    schema: 1, levelIndex: run.levelIndex, levelId: run.levelId, levelRevision: level.revision || 1, checkpointIndex: Math.max(0, run.checkpointIndex), seed: run.seed,
    x: point.x, y: point.y,
    difficulty:run.difficulty,traceRemaining:run.traceRemaining,tracePenalty:run.tracePenalty,time: run.time, alerts: run.alerts, alertTime: run.alertTime, objectives: [...run.objectives], packet: run.packet,
    tools: [...run.tools], selectedTool: run.selectedTool, devices: run.devices.map(serializeDevice),
  };
}

export function checkpointSnapshot(run) { return run.checkpoint ? copy(run.checkpoint) : null; }

export function restoreRun(snapshot, fallbackLevel = 0) {
  if (!snapshot || snapshot.schema !== 1 || !Number.isInteger(snapshot.levelIndex) || !LEVELS[snapshot.levelIndex] || snapshot.levelId !== LEVELS[snapshot.levelIndex].id) return createRun(fallbackLevel);
  if ((snapshot.levelRevision || 1) !== (LEVELS[snapshot.levelIndex].revision || 1)) return createRun(snapshot.levelIndex);
  const run = createRun(snapshot.levelIndex,null,snapshot.seed,snapshot.difficulty);
  const level = LEVELS[run.levelIndex];
  run.checkpointIndex = clamp(Number.isInteger(snapshot.checkpointIndex) ? snapshot.checkpointIndex : 0, 0, (level.checkpoints?.length || 1) - 1);
  const point = level.checkpoints?.[run.checkpointIndex] || level.checkpoint;
  run.traceRemaining=Number.isFinite(snapshot.traceRemaining)?clamp(snapshot.traceRemaining,0,level.traceDeadline):Math.max(0,level.traceDeadline-(snapshot.time||0));run.tracePenalty=Number.isFinite(snapshot.tracePenalty)?clamp(snapshot.tracePenalty,0,100000):0;
  run.player.x = point.x; run.player.y = point.y;
  run.time = Number.isFinite(snapshot.time) ? clamp(snapshot.time, 0, 86400) : 0;
  run.alerts = Number.isFinite(snapshot.alerts) ? clamp(Math.floor(snapshot.alerts), 0, 100000) : 0;
  run.alertTime = Number.isFinite(snapshot.alertTime) ? clamp(snapshot.alertTime, 0, run.time) : 0;
  run.objectives = level.terminals.filter(t => Array.isArray(snapshot.objectives) && snapshot.objectives.includes(t.id)).map(t => t.id);
  run.packet = snapshot.packet === true;
  run.tools = level.supplies.map((max, i) => Number.isInteger(snapshot.tools?.[i]) ? clamp(snapshot.tools[i], 0, max) : 0);
  run.selectedTool = Number.isInteger(snapshot.selectedTool) ? clamp(snapshot.selectedTool, 0, 2) : 0;
  // Only known devices and finite bounded positions are restored; serialized data is untrusted.
  for (let deviceIndex=0;deviceIndex<run.devices.length;deviceIndex++) {const device=run.devices[deviceIndex];
    const saved = Array.isArray(snapshot.devices) ? snapshot.devices.find(d => d?.id === device.id) : null;
    if (!saved) continue;
    if (Number.isFinite(saved.x)) device.x = clamp(saved.x, 1, level.length-1);
    device.dir = saved.dir === -1 ? -1 : 1;
    device.rewired = saved.rewired === true;
    device.disabledUntil = Number.isFinite(saved.disabledUntil) ? clamp(saved.disabledUntil, 0, run.time + 8) : 0;
    device.state = device.rewired || device.disabledUntil > run.time ? 'disabled' : 'normal';
    synchronizeCycle(device,run.numeric);
  }
  run.checkpointReached = true; run.checkpoint = makeSnapshot(run);
  return run;
}
