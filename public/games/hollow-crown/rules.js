import {clamp,minimumRadius} from './numeric.js';
import { OBJECTIVES, objectiveInstruction, roomPool, journeyPlan, crownType, ARENA, RULE_VERSION, ROOMS, TUTORIAL_ROOM, BOSS_ROOM, ROUTES, TALENTS, STARTING_TALENTS, CHALLENGES, DIFFICULTIES, STORIES, ENDINGS, ENEMIES } from './content.js';
const ROOM_ENTRY_PHASES=Object.freeze(['camp', 'route']);
const COMMITTED_STATES=Object.freeze(['telegraph', 'attack']);
const IMMOBILE_ACTIONS=Object.freeze(['dodge', 'hurt']);
const RESTING_ACTIONS=Object.freeze(['block', 'idle', 'run']);
const AIM_LOCK_ACTIONS=Object.freeze(['light', 'charge', 'dodge', 'block']);
const RECOVERY_STATES=Object.freeze(['recover', 'stagger']);
const CHOICE_PHASES=Object.freeze(['reward', 'route']);
const ACTIVE_PHASES=Object.freeze(['combat', 'tutorial']);
const SAVE_PHASES=Object.freeze(['combat', 'tutorial', 'reward', 'route', 'result']);
const PLAYER_ACTIONS=Object.freeze(['idle', 'run', 'light', 'charge', 'block', 'dodge', 'hurt', 'death']);
const ENEMY_STATES=Object.freeze(['idle', 'approach', 'telegraph', 'attack', 'recover', 'stagger', 'dead']);
const ATTACK_SHAPES=Object.freeze(['line', 'cone', 'circle', 'ring']);
const ROUTE_RISKS=Object.freeze(['steady', 'perilous']);
const HAZARD_PHASES=Object.freeze(['recover','telegraph','attack']);


const TAU = Math.PI * 2;
const EMPTY_INPUT = Object.freeze({});
const runScratch = new WeakMap(), navigation = new WeakMap(), topologies = new WeakMap();
const knownRooms=new WeakSet(),lineCaches=new WeakMap();
const topologyPool=new Map(),NAV_RADII=Object.freeze([ARENA.playerRadius,.4,.42,.48,.6,.86,.9]);
const EDGES = ['attackPressed','attackReleased','dodge'];
const SEEK_OFFSETS = [0,.65,-.65,1.2,-1.2,Math.PI*.5];
function scratch(state){let s=runScratch.get(state);if(!s){s={pending:{attackPressed:false,attackReleased:false,dodge:false},controls:{moveX:0,moveZ:0,aimX:undefined,aimZ:undefined,autoAim:false,attackHeld:false,block:false,attackPressed:false,attackReleased:false,dodge:false},segment:{shape:'line',width:.18,x:0,z:0,heading:0,range:0},origin:{x:0,z:0},living:[]};runScratch.set(state,s);}return s;}
// The cross-room topology LRU belongs to an expedition. Returning to camp releases
// its graph buffers; a new expedition still warms its actual entrance normally.
export function releaseRun(state){
  topologyPool.clear();if(!state)return;runScratch.delete(state);if(state.room){topologies.delete(state.room);lineCaches.delete(state.room);knownRooms.delete(state.room);}
  for(let i=0;i<(state.enemies?.length||0);i++)navigation.delete(state.enemies[i]);
}
export function clearInputEdges(state){const work=runScratch.get(state);if(work)for(let i=0;i<EDGES.length;i++)work.pending[EDGES[i]]=false;state.pendingInput=null;}
function committedCount(state){let n=0;for(let i=0;i<state.enemies.length;i++){const e=state.enemies[i];if(e.hp>0&&!ENEMIES[e.type].ranged&&(e.state==='telegraph'||e.state==='attack'))n++;}return n;}
function allDefeated(enemies){for(let i=0;i<enemies.length;i++)if(enemies[i].hp>0)return false;return true;}
function compact(items){let n=0;for(let i=0;i<items.length;i++)if(items[i].life>0)items[n++]=items[i];items.length=n;}

const length = (x, z) => Math.sqrt(x*x+z*z);
const distance = (a, b) => length(a.x - b.x, a.z - b.z);
const heading = (x, z) => Math.atan2(x, z);
const difference = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
const copy = value => JSON.parse(JSON.stringify(value));
const byId = (list,id) => {for(let i=0;i<list.length;i++)if(list[i].id===id)return list[i];};
const uid = state => ++state.serial;
const event = (state, type, data = {}) => { state.events.push({ type, ...data }); };
const effect = (state, type, x, z, extra = {}) => state.effects.push({ id: uid(state), type, x, z, life: .45, ...extra });

export function random(state) {
  let x = state.rng | 0; x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
  state.rng = x >>> 0;
  return state.rng / 4294967296;
}

export function combineModifiers(talents = []) {
  const result = { moveMultiplier: 1, dodgeMultiplier: 1, dodgeCost: 24, afterDodgeBonus: 0, regenMultiplier: 1, maxEnergy: 100, parryWindow: 0, counterMultiplier: 1, blockMultiplier: 1, parryHeal: 0, burnDamage: 0, chargeMultiplier: 1, chargeCost: 32, burningBonus: 0, lowHpBonus: 0 };
  for (const id of [...new Set(talents)].slice(0, 4)) {
    const talent = byId(TALENTS, id);
    for (const [key, value] of Object.entries(talent?.modifiers || {})) {
      if (key.endsWith('Multiplier')) result[key] *= value;
      else result[key] += value;
    }
  }
  return result;
}

function refreshStats(state) {
  state.modifiers = combineModifiers(state.talents);
  state.player.maxEnergy = state.modifiers.maxEnergy;
  state.player.energy = Math.min(state.player.energy, state.player.maxEnergy);
}

export function createRun({ seed = Date.now() >>> 0, route = 'ash', startTalent = 'fleet-ash', challenge = 'normal', difficulty = 'standard', skin = 'ivory' } = {}) {
  const challengeData = byId(CHALLENGES, challenge) || CHALLENGES[0];
  const validSeed = challengeData.seed ?? (Number(seed) >>> 0 || 1);
  const talent = byId(STARTING_TALENTS, startTalent) || STARTING_TALENTS[0];
  const state = {
    schema: RULE_VERSION, seed: validSeed, rng: validSeed || 1, serial: 0, time: 0,
    phase: 'camp', route: byId(ROUTES, route)?.id || 'ash', difficulty: byId(DIFFICULTIES, difficulty)?.id || 'standard', challenge: challengeData.id,
    room: null, roomIndex: -1, roomHistory: [], roomsCleared: 0, roomElapsed: 0, roomHits: 0, roomRisk: 'steady',
    player: { x: 0, z: 6.8, angle: Math.PI, hp: 120, maxHp: 120, energy: 100, maxEnergy: 100, action: 'idle', actionTime: 0, invuln: 0, charge: 0, skin, radius: ARENA.playerRadius, blockAge: 0, wasBlocking: false, cooldown: 0, dodgeX: 0, dodgeZ: -1, afterDodge: 0, healCooldown: 0, attack: null, heldTime: 0 },
    talents: [talent.id], startTalent: talent.id, school: talent.school,
    enemies: [], projectiles: [], effects: [], events: [], pendingWaves: [], wave: 0,
    rewardOptions: [], rewardChoices: [], routeOptions: [], routeChoices: [], stories: [], story: null,
    stats: { damageDealt: 0, damageTaken: 0, damageSources: {}, damageByAction: {}, parries: 0, blocks: 0, hits: 0, attacks: 0, dodges: 0, kills: 0, rooms: 0, flawlessRooms: 0, maxCommittedMelee: 0 },
    result: null, tutorial: null, settings: {}, entrySnapshot: null,
  };
  refreshStats(state);
  enterRoom(state, ROOMS[0].id, 'steady');
  return state;
}

function enemyAt(state, type, x, z, index = 0) {
  const spec = ENEMIES[type];
  const hpMultiplier = byId(DIFFICULTIES, state.difficulty).enemyHp * (state.roomRisk === 'perilous' ? 1.15 : 1);
  const hp = Math.round(spec.hp * hpMultiplier);
  const e = { id: `e${uid(state)}`, type, x, z, angle: 0, hp, maxHp: hp, radius: spec.radius, state: 'idle', timer: .6 + index * .24, stateDuration: .6 + index * .24, attack: null, phase: 1, moveIndex: 0, burn: 0, burnTick: 0, shieldBroken: 0, staggerCooldown: 0, damaged: false, attackHit: false };
  pushOut(state.room, e, e.radius);
  return e;
}

const spawnPoints = [[-5.8, -5.4], [5.6, -4.8], [0, -6.8], [-6, 2], [6, 2], [-3, -6.5], [3, -6.5], [0, -3.8]];
function spawnWave(state, types) {
  if(allDefeated(state.enemies))state.enemies.length=0;
  types.forEach((type, i) => {
    const offset=(i+state.wave*2)%spawnPoints.length;
    const point=Array.from({length:spawnPoints.length},(_,n)=>spawnPoints[(offset+n)%spawnPoints.length]).find(([x,z])=>length(x-state.player.x,z-state.player.z)>3&&!state.enemies.some(e=>e.hp>0&&length(x-e.x,z-e.z)<1.5))||spawnPoints[offset];
    state.enemies.push(enemyAt(state, type, point[0], point[1], i));
  });
  state.wave++;
}

export function createObjective(state){
 const spec=state.challenge==='crown-pilgrimage'&&state.room.id!=='crown-arena'?OBJECTIVES[state.roomIndex]:null;
 if(!spec)return null;
 const o={kind:spec.kind,shape:spec.shape||null,completed:0,chargeRequired:spec.chargeRequired||0,targets:[],phase:'recover',timer:3,cycles:0,mastered:false,attack:null};
 if(spec.kind==='beacons'||spec.kind==='seals')for(let i=0;i<2;i++){
  const t={id:`objective-${i}`,x:i?6.8:-6.8,z:i?-5:4.8,progress:0,hp:spec.hp||0,done:false};o.targets.push(t);
  if(spec.kind==='seals')state.room.obstacles.push({x:t.x,z:t.z,w:1.3,d:1.3,sealId:t.id});
 }
 if(spec.shape)o.attack={shape:spec.shape,x:0,z:0,heading:0,range:18,width:1.2,angle:1.2,radius:8.2,innerRadius:3.1,damage:15,source:'training-hazard',name:spec.shape==='ring'?'外環：進入空心區':spec.shape==='circle'?'圓形：離開圓心':'交火：橫移離開直線',windup:spec.shape==='line'?1.4:2.4,recovery:2,activeTime:.18};
 return o;
}
function objectiveDone(state){const o=state.objective;return !o||o.kind==='clear'||o.kind==='crossfire'||o.completed===o.targets.length;}
function updateObjective(state,dt){
 const o=state.objective;if(!o)return;
 if(o.kind==='beacons')for(let ti=0;ti<o.targets.length;ti++){const t=o.targets[ti];if(!t.done&&distance(t,state.player)<=1.6){
  let safe=true;for(let ei=0;ei<state.enemies.length;ei++){const e=state.enemies[ei];if(e.hp>0&&distance(e,t)<3){safe=false;break;}}
  if(safe){t.progress=Math.min(o.chargeRequired,t.progress+dt);if(t.progress>=o.chargeRequired){t.done=true;o.completed++;state.player.energy=Math.min(state.player.maxEnergy,state.player.energy+15);event(state,'objective',{text:`燈台已點燃 · ${o.completed}/2`});effect(state,'parry',t.x,t.z);}}
 }
 }
 if(!o.attack)return;
 o.timer-=dt;if(o.timer>0)return;
 if(o.phase==='recover'){
  o.phase='telegraph';o.timer=o.attack.windup;const a=o.attack;
  if(a.shape==='line'){a.x=o.cycles%2?-5:3;a.z=-9;a.heading=0;}
  else if(a.shape==='circle'){a.x=state.player.x;a.z=state.player.z;a.radius=3.2;}
  else {a.x=0;a.z=0;}
  event(state,'hazard',{text:o.mastered?null:a.name});
 }else if(o.phase==='telegraph'){
  o.phase='attack';o.timer=.18;
  if(shapeHits(o.attack,state.player)&&lineClear(state.room,o.attack.x,o.attack.z,state.player.x,state.player.z))playerDamage(state,o.attack.damage,'training-hazard',o.attack);
  else o.mastered=true;
 }else {o.phase='recover';o.timer=2;o.cycles++;}
}

export function enterRoom(state, roomId, risk = 'steady') {
  if (!state || !ROOM_ENTRY_PHASES.includes(state.phase)) return false;
  if (state.phase === 'route' && !state.routeOptions.some(option => option.roomId === roomId && option.risk === risk)) return false;
  const boss = roomId === BOSS_ROOM.id;
  const template = boss ? BOSS_ROOM : byId(ROOMS, roomId);
  const plan = journeyPlan(state);
  if (!template || (boss && (state.roomsCleared < plan.rooms || state.roomsCleared >= plan.rooms + plan.crowns)) || (!boss && state.roomsCleared >= plan.rooms)) return false;
  state.room = copy(template);state.room.revision=0;
  state.roomIndex = state.roomsCleared;
  state.roomRisk = risk === 'perilous' ? 'perilous' : 'steady';
  state.phase = 'combat'; state.roomElapsed = 0; state.roomHits = 0; state.wave = 0;
  state.enemies = []; state.projectiles = []; state.effects = []; state.pendingWaves = [];state.waveArrival=null;
  Object.assign(state.player, { x: 0, z: 6.8, angle: Math.PI, action: 'idle', actionTime: 0, attack: null, invuln: .7, charge: 0, cooldown: 0, heldTime: 0, wasBlocking: false, energy: state.player.maxEnergy });
  state.rewardOptions = []; state.rewardChoices = []; state.routeOptions = []; state.routeChoices = [];
  if (boss) {
    state.enemies.push(enemyAt(state, crownType(state), 0, -4.7));
  } else {
    spawnWave(state, template.roster);
    state.pendingWaves.push([...template.extra, ...(state.roomRisk === 'perilous' ? [template.roster[0]] : [])]);
    if (state.challenge==='long-watch-extended'&&state.roomsCleared>=6) state.pendingWaves.push([template.roster.find(t=>!ENEMIES[t].ranged),[...template.roster,...template.extra].find(t=>ENEMIES[t].ranged)||'crossbow','beetle']);
    else if(state.roomsCleared>=2)state.pendingWaves.push([template.roster[0],template.extra[0],template.roster[template.roster.length-1]]);
  }
  if(state.challenge==='crown-pilgrimage'&&!boss){
    // Small staggered squads extend tactical play; health/simulation speed stay unchanged.
    const chapter=Math.floor(state.roomIndex/4),roster=template.roster;
    state.pendingWaves=[];
    for(let w=0;w<4;w++){const types=[roster[w%roster.length],template.extra[w%template.extra.length],w%3===0?'crossbow':w%3===1?'soldier':'spear'];if(w===0&&state.roomRisk==='perilous')types.push(roster[0]);state.pendingWaves.push(types);}
  }
  state.objective=createObjective(state);warmNavigation(state.room);scratch(state);
  if(state.objective)event(state,'objective',{text:objectiveInstruction(state.objective)});
  event(state, 'ui', { text: `${template.name} · ${boss ? '王座守衛' : '清除敵人'}`, cue: boss ? 'boss' : 'room' });
  state.entrySnapshot = snapshot(state);
  return true;
}

export function startTutorial({ practiceWindow = .5 } = {}) {
  const state = createRun({ seed: 1001, difficulty: 'pilgrim', startTalent: 'wide-oath' });
  state.objective=null;state.phase = 'tutorial'; state.room = copy(TUTORIAL_ROOM); state.enemies = []; state.pendingWaves = []; state.events = [];
  state.player.x = 0; state.player.z = 4; state.player.hp = state.player.maxHp;
  warmNavigation(state.room);state.tutorial = { step: 0, text: '以 WASD 或左搖桿移動。先在庭院移動一小段。', done: false, distance: 0, start: { x: 0, z: 4 } };
  state.settings.practiceWindow = clamp(Number(practiceWindow) || .5, .18, .8);
  state.enemies.push(enemyAt(state, 'soldier', 0, 0));
  state.entrySnapshot = snapshot(state);
  return state;
}

// Collider geometry is shared by attack tests, projectile obstruction, and actor movement.
function circleOverlaps(x, z, radius, obstacle) {
  if(Number.isFinite(obstacle.r)){const dx=x-obstacle.x,dz=z-obstacle.z,r=radius+obstacle.r;return dx*dx+dz*dz<r*r;}
  const dx=x-clamp(x,obstacle.x-obstacle.w/2,obstacle.x+obstacle.w/2),dz=z-clamp(z,obstacle.z-obstacle.d/2,obstacle.z+obstacle.d/2);return dx*dx+dz*dz<radius*radius;
}

export function blocked(room, x, z, radius = 0) {
  if(!room)return false;if(typeof radius==='number'){const r=minimumRadius(radius);for(let i=0;i<room.obstacles.length;i++)if(circleOverlaps(x,z,r,room.obstacles[i]))return true;}else for(let i=0;i<room.obstacles.length;i++)if(circleOverlaps(x,z,Math.max(.001,radius),room.obstacles[i]))return true;return false;
}

function pushOut(room, actor, radius) {
  actor.x = clamp(actor.x, ARENA.min + radius, ARENA.max - radius);
  actor.z = clamp(actor.z, ARENA.min + radius, ARENA.max - radius);
  for (let iteration = 0; iteration < 3; iteration++) {
    for (let obstacleIndex=0;obstacleIndex<room.obstacles.length;obstacleIndex++) {const obstacle=room.obstacles[obstacleIndex];
      if (!circleOverlaps(actor.x, actor.z, radius, obstacle)) continue;
      if (Number.isFinite(obstacle.r)) {
        const dx = actor.x - obstacle.x, dz = actor.z - obstacle.z, d = length(dx, dz) || 1;
        actor.x = obstacle.x + (dx || .001) / d * (obstacle.r + radius + .01);
        actor.z = obstacle.z + (dz || 1) / d * (obstacle.r + radius + .01);
      } else {
        const left = obstacle.x - obstacle.w / 2 - radius, right = obstacle.x + obstacle.w / 2 + radius;
        const top = obstacle.z - obstacle.d / 2 - radius, bottom = obstacle.z + obstacle.d / 2 + radius;
        let d=Math.abs(actor.x-left),axis='x',n=left;if(Math.abs(actor.x-right)<d){d=Math.abs(actor.x-right);n=right;}if(Math.abs(actor.z-top)<d){d=Math.abs(actor.z-top);axis='z';n=top;}if(Math.abs(actor.z-bottom)<d){axis='z';n=bottom;}actor[axis]=n;
      }
    }
  }
}

function move(state, actor, dx, dz, radius) {
  const x = actor.x, z = actor.z;
  if(dx===0&&dz===0&&x>=ARENA.min+radius&&x<=ARENA.max-radius&&z>=ARENA.min+radius&&z<=ARENA.max-radius&&!blocked(state.room,x,z,radius))return 0;
  actor.x += dx; pushOut(state.room, actor, radius);
  actor.z += dz; pushOut(state.room, actor, radius);
  return length(actor.x - x, actor.z - z);
}

// Squared point/closed-segment distance; scalar arguments avoid temporary vectors.
function pointSegmentSq(px,pz,ax,az,dx,dz,lenSq){
  const t=lenSq?clamp(((px-ax)*dx+(pz-az)*dz)/lenSq,0,1):0;
  const x=px-ax-t*dx,z=pz-az-t*dz;return x*x+z*z;
}
function pointBoxSq(x,z,left,right,top,bottom){
  const dx=x-clamp(x,left,right),dz=z-clamp(z,top,bottom);return dx*dx+dz*dz;
}
function segmentBox(ax,az,dx,dz,left,right,top,bottom){
  let near=0,far=1;
  if(dx===0){if(ax<left||ax>right)return false;}
  else{const a=(left-ax)/dx,b=(right-ax)/dx;near=Math.max(near,Math.min(a,b));far=Math.min(far,Math.max(a,b));if(near>far)return false;}
  if(dz===0)return az>=top&&az<=bottom;
  const a=(top-az)/dz,b=(bottom-az)/dz;return Math.max(near,Math.min(a,b))<=Math.min(far,Math.max(a,b));
}
function rayResult(cache,slot,visible){
 if(cache){cache.values[slot+5]=visible?1:0;cache.last=cache.next;cache.next=(cache.next+1)%8;cache.used=Math.min(8,cache.used+1);}return visible;
}
export function lineClear(room, ax, az, bx, bz, radius = .04) {
  if(!room||room.obstacles.length===0)return true;
  const r=minimumRadius(radius);let cache=null,slot=0;
  // Only rule-owned rooms have a managed revision. Caller-owned geometry stays
  // uncached, so arbitrary external edits cannot reuse an unprovable result.
  if(knownRooms.has(room)&&Number.isSafeInteger(room.revision)){
    cache=lineCaches.get(room);
    if(!cache){cache={revision:room.revision,obstacles:room.obstacles,count:room.obstacles.length,next:0,last:0,used:0,values:new Float64Array(48)};lineCaches.set(room,cache);}
    if(cache.revision!==room.revision||cache.obstacles!==room.obstacles||cache.count!==room.obstacles.length){cache.revision=room.revision;cache.obstacles=room.obstacles;cache.count=room.obstacles.length;cache.next=0;cache.last=0;cache.used=0;}
    const values=cache.values;
    for(let i=0;i<cache.used;i++){const at=((cache.last-i+cache.used)%cache.used)*6;if(values[at]===ax&&values[at+1]===az&&values[at+2]===bx&&values[at+3]===bz&&values[at+4]===r){cache.last=at/6;return values[at+5]===1;}}
    slot=cache.next*6;values[slot]=ax;values[slot+1]=az;values[slot+2]=bx;values[slot+3]=bz;values[slot+4]=r;
  }
  const dx=bx-ax,dz=bz-az,lenSq=dx*dx+dz*dz,rSq=r*r;
  for(let i=0;i<room.obstacles.length;i++){
    const o=room.obstacles[i];
    if(Number.isFinite(o.r)){
      const reach=o.r+r;if(pointSegmentSq(o.x,o.z,ax,az,dx,dz,lenSq)<reach*reach)return rayResult(cache,slot,false);
    }else{
      const left=o.x-o.w/2,right=o.x+o.w/2,top=o.z-o.d/2,bottom=o.z+o.d/2;
      if(segmentBox(ax,az,dx,dz,left,right,top,bottom))return rayResult(cache,slot,false);
      // Disjoint closed segments attain their minimum at an endpoint of either
      // segment. Test endpoint-to-box and each corner-to-segment distance; unlike
      // an expanded AABB this preserves the rounded corners and strict tangency.
      if(pointBoxSq(ax,az,left,right,top,bottom)<rSq||pointBoxSq(bx,bz,left,right,top,bottom)<rSq||
         pointSegmentSq(left,top,ax,az,dx,dz,lenSq)<rSq||pointSegmentSq(right,top,ax,az,dx,dz,lenSq)<rSq||
         pointSegmentSq(left,bottom,ax,az,dx,dz,lenSq)<rSq||pointSegmentSq(right,bottom,ax,az,dx,dz,lenSq)<rSq)return rayResult(cache,slot,false);
    }
  }
  return rayResult(cache,slot,true);
}

export function shapeHits(attack, target, targetRadius = target.radius || .43) {
  const dx = target.x - attack.x, dz = target.z - attack.z, d = length(dx, dz);
  const range = attack.range ?? attack.radius ?? 0;
  if (attack.shape === 'circle') return d <= (attack.radius ?? range) + targetRadius;
  if (attack.shape === 'ring') return d <= attack.radius + targetRadius && d + targetRadius >= attack.innerRadius;
  const aim = attack.heading || 0;
  const forward = dx * Math.sin(aim) + dz * Math.cos(aim);
  if (attack.shape === 'line') {
    const side = Math.abs(dx * Math.cos(aim) - dz * Math.sin(aim));
    return forward >= -targetRadius && forward <= range + targetRadius && side <= (attack.width || .8) / 2 + targetRadius;
  }
  if (attack.shape === 'cone') {
    if (d > range + targetRadius) return false;
    if (d <= targetRadius) return true;
    return Math.abs(difference(heading(dx, dz), aim)) <= (attack.angle || 1.2) / 2 + Math.asin(Math.min(1, targetRadius / d));
  }
  return false;
}

function killEnemy(state, enemy) {
  if (enemy.state === 'dead') return;
  enemy.hp = 0; enemy.state = 'dead'; enemy.timer = .75; enemy.attack = null;
  state.stats.kills++; effect(state, 'death', enemy.x, enemy.z); event(state, 'death', { target: enemy.type });
}

function damageEnemy(state, enemy, damage, source, { stagger = true, burn = true, bypassShield = false } = {}) {
  if (enemy.state === 'dead' || enemy.hp <= 0) return 0;
  const spec = ENEMIES[enemy.type];
  const shieldFront = spec.shield && enemy.shieldBroken <= 0 && Math.abs(difference(heading(state.player.x - enemy.x, state.player.z - enemy.z), enemy.angle)) < Math.PI * .45;
  if (shieldFront && !bypassShield && source !== 'charge' && source !== 'burn' && source !== 'counter') {
    effect(state, 'shield', enemy.x, enemy.z); event(state, 'hit', { material: 'shield', damage: 0 }); return 0;
  }
  if (spec.shield && source === 'charge') { enemy.shieldBroken = 4; effect(state, 'break', enemy.x, enemy.z); }
  let amount = damage;
  const bossFront = spec.boss && Math.abs(difference(heading(state.player.x - enemy.x, state.player.z - enemy.z), enemy.angle)) < Math.PI * .45;
  if (bossFront && source === 'light' && COMMITTED_STATES.includes(enemy.state)) amount *= .55;
  if (source !== 'burn' && enemy.burn > 0) amount *= 1 + state.modifiers.burningBonus;
  const actual = Math.min(enemy.hp, Math.max(0, amount));
  enemy.hp -= actual; enemy.damaged = true;
  state.stats.damageDealt += actual;
  state.stats.damageByAction[source] = (state.stats.damageByAction[source] || 0) + actual;
  if (burn && state.modifiers.burnDamage && source !== 'burn') enemy.burn = 3;
  effect(state, source === 'burn' ? 'burn' : 'hit', enemy.x, enemy.z, { damage: Math.round(actual) });
  if (source !== 'burn') { event(state, 'hit', { material: spec.material, damage: Math.round(actual), x: enemy.x, z: enemy.z }); state.hitStop = .045; }
  if (enemy.hp <= 0) killEnemy(state, enemy);
  else if (stagger && !spec.boss && source !== 'burn' && (source !== 'light' || (enemy.staggerCooldown || 0) <= 0)) {
    enemy.state = 'stagger'; enemy.timer = source === 'counter' ? .85 : .34; enemy.stateDuration = enemy.timer; enemy.attack = null;
    enemy.staggerCooldown = 1.05;
  }
  return actual;
}

function playerDamage(state, damage, source, origin, enemy = null) {
  const player = state.player;
  if (player.invuln > 0 || player.hp <= 0) return false;
  const faces = Math.abs(difference(player.angle, heading(origin.x - player.x, origin.z - player.z))) < Math.PI * .58;
  const blockable = source !== 'cinder-fall' && source !== 'crown-ring' && source !== 'pale-verdict' && source !== 'beetle' && source !== 'training-hazard';
  if (player.action === 'block' && faces && blockable) {
    const parryWindow = state.tutorial
      ? clamp(Number(state.settings.practiceWindow) || .5, .18, .8)
      : byId(DIFFICULTIES, state.difficulty).parryWindow + state.modifiers.parryWindow;
    if (player.blockAge <= parryWindow) {
      state.stats.parries++; player.energy = Math.min(player.maxEnergy, player.energy + 18); player.invuln = .16;
      event(state, 'parry'); effect(state, 'parry', player.x, player.z);
      if (enemy) damageEnemy(state, enemy, 29 * state.modifiers.counterMultiplier, 'counter', { bypassShield: true });
      if (state.modifiers.parryHeal && player.healCooldown <= 0) { player.hp = Math.min(player.maxHp, player.hp + state.modifiers.parryHeal); player.healCooldown = 3; }
      return true;
    }
    state.stats.blocks++;
    damage *= .25 * state.modifiers.blockMultiplier;
    event(state, 'hit', { material: 'shield', damage: 0 });
  }
  const amount = Math.min(player.hp, damage * byId(DIFFICULTIES, state.difficulty).enemyDamage);
  player.hp -= amount; player.invuln = .55; state.roomHits++; state.stats.hits++; state.stats.damageTaken += amount;
  state.stats.damageSources[source] = (state.stats.damageSources[source] || 0) + amount;
  event(state, 'hurt', { source, damage: Math.round(amount) }); effect(state, 'hurt', player.x, player.z);
  if (player.action !== 'dodge') { player.action = 'hurt'; player.actionTime = .2; player.attack = null; player.charge = 0; }
  if (state.tutorial && player.hp <= 0) { player.hp = player.maxHp; event(state, 'ui', { text: '教學不會死亡。再看一次前搖，接近命中時才格擋。' }); }
  else if (player.hp <= 0) finishRun(state, false, ENEMIES[source]?.name || source);
  return true;
}

function attackPlayer(state, charged) {
  const player = state.player;
  if (player.cooldown > 0 || IMMOBILE_ACTIONS.includes(player.action)) return false;
  if (charged && player.energy < state.modifiers.chargeCost) { event(state, 'ui', { text: '能量不足，改用不耗能的輕刺。' }); charged = false; }
  if (charged) player.energy -= state.modifiers.chargeCost;
  let damage = charged ? 55 * state.modifiers.chargeMultiplier : 25;
  if (player.afterDodge > 0) { damage *= 1 + state.modifiers.afterDodgeBonus; player.afterDodge = 0; }
  if (player.hp / player.maxHp < .4) damage *= 1 + state.modifiers.lowHpBonus;
  player.action = charged ? 'charge' : 'light'; player.actionTime = charged ? .52 : .36;
  player.cooldown = player.actionTime; player.charge = 0;
  player.attack = { shape: 'line', x: player.x, z: player.z, heading: player.angle, range: charged ? 4.2 : 3.15, width: charged ? 1.1 : .82, damage, hitIds: [], age: 0, activeStart: charged ? .16 : .095, activeEnd: charged ? .32 : .21, charged };
  state.stats.attacks++; event(state, charged ? 'charge' : 'light'); return true;
}

function sealVisible(room,p,t){const d=distance(p,t)||1;return lineClear(room,p.x,p.z,t.x+(p.x-t.x)/d*.98,t.z+(p.z-t.z)/d*.98);}
function hitSeals(state,attack){
      for(let ti=0;ti<(state.objective?.targets.length||0);ti++){const t=state.objective.targets[ti];if(state.objective.kind==='seals'&&!t.done&&!attack.hitIds.includes(t.id)&&shapeHits(attack,t,.65)&&sealVisible(state.room,attack,t)){
        attack.hitIds.push(t.id);t.hp=Math.max(0,t.hp-attack.damage);effect(state,'hit',t.x,t.z);event(state,'hit',{material:'stone'});
        if(t.hp===0){t.done=true;state.objective.completed++;const obstacle=state.room.obstacles.find(o=>o.sealId===t.id);if(obstacle){state.room.obstacles.splice(state.room.obstacles.indexOf(obstacle),1);state.room.revision++;topologies.delete(state.room);}state.pendingWaves.push(['soldier','spear']);event(state,'objective',{text:'封印已破 · 兩名守衛即將增援'});}
      }
      }
}

function updatePlayer(state, input, dt) {
  const p = state.player;
  p.invuln = Math.max(0, p.invuln - dt); p.cooldown = Math.max(0, p.cooldown - dt); p.afterDodge = Math.max(0, p.afterDodge - dt); p.healCooldown = Math.max(0, p.healCooldown - dt);
  p.actionTime = Math.max(0, p.actionTime - dt);
  p.energy = Math.min(p.maxEnergy, p.energy + 20 * state.modifiers.regenMultiplier * dt * (p.action === 'dodge' || p.charge > 0 ? .25 : 1));
  if (p.actionTime <= 0 && !RESTING_ACTIONS.includes(p.action)) { p.action = 'idle'; p.attack = null; }
  let mx = clamp(Number(input.moveX) || 0, -1, 1), mz = clamp(Number(input.moveZ) || 0, -1, 1);
  const ml = length(mx, mz); if (ml > 1) { mx /= ml; mz /= ml; }
  if (Number.isFinite(input.aimX) && Number.isFinite(input.aimZ) && length(input.aimX - p.x, input.aimZ - p.z) > .05) {
    if (!p.attack && p.action !== 'dodge') p.angle = heading(input.aimX - p.x, input.aimZ - p.z);
  } else if (input.autoAim) {
    let target=null,nearest=Infinity;for(let ei=0;ei<state.enemies.length;ei++){const e=state.enemies[ei];const d=distance(p,e);if(e.hp>0&&d<nearest&&lineClear(state.room,p.x,p.z,e.x,e.z)){target=e;nearest=d;}}for(let ti=0;ti<(state.objective?.targets.length||0);ti++){const t=state.objective.targets[ti];const d=distance(p,t);if(state.objective.kind==='seals'&&!t.done&&d<nearest&&sealVisible(state.room,p,t)){target=t;nearest=d;}}
    if (target && !p.attack && p.action !== 'dodge') p.angle = heading(target.x - p.x, target.z - p.z);
    else if (ml > .05) p.angle = heading(mx, mz);
  } else if (ml > .05 && !AIM_LOCK_ACTIONS.includes(p.action)) p.angle = heading(mx, mz);
  // Dodge resolves before all attack windows in this simulation step, including same-frame impacts.
  if (input.dodge && p.energy >= state.modifiers.dodgeCost && p.action !== 'dodge' && p.action !== 'death') {
    p.energy -= state.modifiers.dodgeCost; p.action = 'dodge'; p.actionTime = .3; p.invuln = .32; p.attack = null; p.charge = 0; p.heldTime = 0;
    p.dodgeX = ml > .05 ? mx / Math.max(ml, 1) : Math.sin(p.angle); p.dodgeZ = ml > .05 ? mz / Math.max(ml, 1) : Math.cos(p.angle);
    p.afterDodge = 1.5; state.stats.dodges++; event(state, 'dodge'); effect(state, 'dodge', p.x, p.z);
  }
  if (p.action === 'dodge') move(state, p, p.dodgeX * 12 * state.modifiers.dodgeMultiplier * dt, p.dodgeZ * 12 * state.modifiers.dodgeMultiplier * dt, p.radius);
  else {
    const speed = 4.5 * state.modifiers.moveMultiplier * (p.action === 'block' ? .52 : p.attack ? .35 : p.charge > .25 ? .64 : 1);
    const travelled = move(state, p, mx * speed * dt, mz * speed * dt, p.radius);
    if (state.tutorial) state.tutorial.distance += travelled;
    if (p.actionTime <= 0) {
      if (input.block) {
        if (!p.wasBlocking) {p.blockAge = 0;event(state,'guard');}
        p.action = 'block'; p.blockAge += dt;
      } else { p.action = ml > .05 ? 'run' : 'idle'; p.blockAge = 0; }
    }
    if (input.attackPressed && !input.block && p.actionTime <= 0) { p.heldTime = 0; attackPlayer(state, false); }
    if (input.attackHeld && !input.block) {
      p.heldTime += dt;
      if (p.heldTime > .34 && p.actionTime <= 0) { const ready=p.heldTime>=.65;if(ready&&!p.chargeReady){event(state,'charge-ready');effect(state,'parry',p.x,p.z);}p.chargeReady=ready;p.charge = clamp((p.heldTime - .34) / .8, 0, 1); p.action = 'charge'; }
    }
    if (input.attackReleased) {
      if (!input.block && p.heldTime >= .65 && p.action !== 'dodge') { p.cooldown = Math.max(0, p.cooldown); attackPlayer(state, true); }
      p.heldTime = 0; p.charge = 0;
      if (!p.attack && p.action === 'charge') p.action = 'idle';
    }
    if (!input.attackHeld && !input.attackReleased && p.charge && !p.attack) { p.charge = 0; p.heldTime = 0; p.action = 'idle'; }
  }
  if(!input.attackHeld)p.chargeReady=false;
  p.wasBlocking = Boolean(input.block) && p.action === 'block';
  if (p.attack) {
    const attack = p.attack; const oldAge = attack.age; attack.age += dt;
    if (attack.age >= attack.activeStart && oldAge <= attack.activeEnd) {
      if(state.objective?.kind==='seals')hitSeals(state,attack);
      for (let ei=0;ei<state.enemies.length;ei++) {const enemy=state.enemies[ei];
        if (enemy.hp <= 0 || attack.hitIds.includes(enemy.id)) continue;
        if (shapeHits(attack, enemy) && lineClear(state.room, attack.x, attack.z, enemy.x, enemy.z)) {
          attack.hitIds.push(enemy.id); damageEnemy(state, enemy, attack.damage, attack.charged ? 'charge' : 'light');
        }
      }
    }
  }
}

function beginAttack(state, enemy) {
  const spec = ENEMIES[enemy.type],difficulty=byId(DIFFICULTIES,state.difficulty);
  const move = spec.boss ? spec.moves[enemy.moveIndex++ % spec.moves.length] : null;
  enemy.angle = heading(state.player.x - enemy.x, state.player.z - enemy.z);
  const attack = {
    shape: move?.shape || spec.shape, x: enemy.x, z: enemy.z, heading: enemy.angle,
    range: move?.range || spec.reach, width: move?.width || spec.width || .8,
    angle: move?.angle || spec.angle || 1.2, radius: move?.radius || spec.reach,
    innerRadius: move?.innerRadius || 0, damage: (move?.damage || spec.damage)*(spec.boss?difficulty.bossDamageMultiplier:1),
    source: move?.id || enemy.type, name: move?.name || spec.name,
    windup: (move?.windup || spec.windup) * (enemy.phase === 2 ? .85 : 1)*(spec.boss?difficulty.bossWindupMultiplier:1),
    recovery: (move?.recover || spec.recover) * (spec.boss?difficulty.bossRecoveryMultiplier:1),
    activeTime: .18, projectiles: move?.projectiles || (spec.ranged ? 1 : 0), targeted: Boolean(move?.targeted),
  };
  if (attack.targeted) { attack.x = state.player.x; attack.z = state.player.z; }
  // No heavy tell is shortened below 650 ms, including the second boss phase.
  attack.windup = Math.max(spec.boss || spec.damage >= 23 ? .65 : .35, attack.windup);
  enemy.attack = attack; enemy.attackHit = false; enemy.state = 'telegraph'; enemy.timer = attack.windup; enemy.stateDuration = attack.windup;
  event(state, 'ui', { cue: 'telegraph', text: spec.boss ? attack.name : null, source: enemy.type });
}

// Fixed indexed grid; topology is cached by room identity and radius. No per-search cells/Maps.
function topology(room,radius){
  let cache=topologies.get(room);if(!cache){cache=new Map();topologies.set(room,cache);}let g=cache.get(radius);
  if(!g){const key=JSON.stringify(room.obstacles)+'|'+radius;g=topologyPool.get(key);if(g){cache.set(radius,g);return g;}const valid=new Uint8Array(361),links=new Int16Array(361*4);links.fill(-1);for(let i=0;i<361;i++){const x=(i/19|0)-9,z=i%19-9;valid[i]=Math.abs(x)<=ARENA.max-radius&&Math.abs(z)<=ARENA.max-radius&&!blocked(room,x,z,radius+.08);}
    for(let i=0;i<361;i++)if(valid[i])for(let d=0;d<4;d++){const x=(i/19|0)-9,z=i%19-9,nx=x+(d===0?1:d===1?-1:0),nz=z+(d===2?1:d===3?-1:0),n=(nx+9)*19+nz+9;if(nx>=-9&&nx<=9&&nz>=-9&&nz<=9&&valid[n]&&lineClear(room,x,z,nx,nz,radius))links[i*4+d]=n;}
    g={valid,links,parents:new Int16Array(361),queue:new Int16Array(361),reverse:new Int16Array(361)};cache.set(radius,g);topologyPool.set(key,g);if(topologyPool.size>32)topologyPool.delete(topologyPool.keys().next().value);}
  return g;
}
function warmNavigation(room){knownRooms.add(room);for(const radius of NAV_RADII)topology(room,radius);}
export function findPath(room,from,to,radius=.5,output=[]){
  const g=topology(room,radius);
  let start=-1,goal=-1,sd=Infinity,gd=Infinity;for(let i=0;i<361;i++)if(g.valid[i]){const x=(i/19|0)-9,z=i%19-9,ds=length(x-from.x,z-from.z),dg=length(x-to.x,z-to.z);if(ds<sd&&lineClear(room,from.x,from.z,x,z,radius)){start=i;sd=ds;}if(dg<gd&&lineClear(room,to.x,to.z,x,z,radius)){goal=i;gd=dg;}}
  output.length=0;if(start<0||goal<0)return output;g.parents.fill(-2);g.parents[start]=-1;g.queue[0]=start;let end=1;
  for(let q=0;q<end&&g.parents[goal]===-2;q++){const i=g.queue[q];for(let d=0;d<4;d++){const n=g.links[i*4+d];if(n>=0&&g.parents[n]===-2){g.parents[n]=i;g.queue[end++]=n;}}}
  if(g.parents[goal]===-2)return output;let count=0;for(let i=goal;i!==start&&i>=0;i=g.parents[i])g.reverse[count++]=i;
  // Output owns its point records, reused on the next search for the same navigator.
  const pool=output._pool||(Object.defineProperty(output,'_pool',{value:[],enumerable:false}),output._pool);
  for(let n=0;n<count;n++){const i=g.reverse[count-1-n],p=pool[n]||(pool[n]={x:0,z:0});p.x=(i/19|0)-9;p.z=i%19-9;output.push(p);}const p=pool[count]||(pool[count]={x:0,z:0});p.x=to.x;p.z=to.z;output.push(p);return output;
}

function seek(state, enemy, dx, dz, dt, flee = false) {
  const spec = ENEMIES[enemy.type], d = length(dx, dz) || 1;
  const speed = spec.speed * (enemy.phase === 2 ? 1.12 : 1) * dt;
  let angle = heading(dx, dz) + (flee ? Math.PI : 0);
  if (!flee && !lineClear(state.room, enemy.x, enemy.z, enemy.x + dx, enemy.z + dz, spec.radius + .08)) {
    let nav=navigation.get(enemy);if(!nav){nav={timer:0,target:{x:0,z:0},points:[]};navigation.set(enemy,nav);}nav.timer-=dt;
    if(nav.timer<=0||length(nav.target.x-enemy.x-dx,nav.target.z-enemy.z-dz)>1.5){nav.timer=.8;nav.target.x=enemy.x+dx;nav.target.z=enemy.z+dz;findPath(state.room,enemy,nav.target,spec.radius,nav.points);}
    const points=nav.points;
    while(points.length>1&&distance(enemy,points[0])<.35)points.shift();
    let next = points[0];
    for (let i = points.length - 1; i >= 0; i--) if (lineClear(state.room, enemy.x, enemy.z, points[i].x, points[i].z, spec.radius + .06)) { next = points[i]; break; }
    if (next) angle = heading(next.x - enemy.x, next.z - enemy.z);
  }
  const preferred = enemy.id.charCodeAt(enemy.id.length - 1) % 2 ? 1 : -1;
  for (let i=0;i<SEEK_OFFSETS.length;i++) {const offset=SEEK_OFFSETS[i]*preferred;
    const x = enemy.x + Math.sin(angle + offset) * speed, z = enemy.z + Math.cos(angle + offset) * speed;
    if (!blocked(state.room, x, z, spec.radius + .05) && x > ARENA.min + spec.radius && x < ARENA.max - spec.radius && z > ARENA.min + spec.radius && z < ARENA.max - spec.radius) {
      move(state, enemy, x - enemy.x, z - enemy.z, spec.radius); break;
    }
  }
  enemy.angle = heading(dx / d, dz / d);
}

function updateEnemy(state, enemy, dt) {
  const spec = ENEMIES[enemy.type];
  enemy.timer -= dt; enemy.shieldBroken = Math.max(0, enemy.shieldBroken - dt);
  enemy.staggerCooldown = Math.max(0, (enemy.staggerCooldown || 0) - dt);
  if (enemy.hp <= 0) return;
  if (enemy.burn > 0) {
    enemy.burn -= dt; enemy.burnTick += dt;
    if (enemy.burnTick >= .5) { enemy.burnTick -= .5; damageEnemy(state, enemy, state.modifiers.burnDamage * .5, 'burn', { stagger: false, burn: false, bypassShield: true }); }
  } else enemy.burnTick = 0;
  if (enemy.hp <= 0) return;
  if (spec.boss && enemy.phase === 1 && enemy.hp <= enemy.maxHp / 2) {
    const response=Math.max(1.8*byId(DIFFICULTIES,state.difficulty).bossRecoveryMultiplier,enemy.state==='recover'?enemy.timer:0,enemy.attack?.recovery||0);enemy.phase = 2; enemy.state = 'recover'; enemy.timer = response; enemy.stateDuration = enemy.timer; enemy.attack = null;
    effect(state, 'phase', enemy.x, enemy.z, { life: 1.2 }); event(state, 'ui', { text: `${spec.name} · 第二誓式`, cue: 'phase' });
  }
  if (state.tutorial && state.tutorial.step < 3) { enemy.state = 'idle'; enemy.timer = .5; return; }
  if (enemy.state === 'idle' && enemy.timer <= 0) enemy.state = 'approach';
  if (RECOVERY_STATES.includes(enemy.state)) {
    if (enemy.timer <= 0) { enemy.state = 'approach'; enemy.attack = null; }
    return;
  }
  if (enemy.state === 'telegraph') {
    if (enemy.timer <= 0) {
      enemy.state = 'attack'; enemy.timer = enemy.attack.activeTime; enemy.stateDuration = enemy.timer;
      if (enemy.attack.projectiles) {
        for (let i = 0; i < enemy.attack.projectiles; i++) {
          const angle = enemy.attack.heading + (i - (enemy.attack.projectiles - 1) / 2) * .24;
          state.projectiles.push({ id: uid(state), x: enemy.x, z: enemy.z, angle, speed: spec.boss ? 9 : 8, life: 2.5, source: enemy.attack.source, damage: enemy.attack.damage, ownerId: enemy.id });
        }
        event(state, 'ui', { cue: 'bolt' });
      }
    } else return;
  }
  if (enemy.state === 'attack') {
    if (!enemy.attack.projectiles && !enemy.attackHit && shapeHits(enemy.attack, state.player) && lineClear(state.room, enemy.attack.x, enemy.attack.z, state.player.x, state.player.z)) {
      enemy.attackHit = true;
      playerDamage(state, enemy.attack.damage, enemy.attack.source, enemy, enemy);
    }
    if (enemy.timer <= 0 && enemy.state === 'attack') { enemy.state = 'recover'; enemy.timer = enemy.attack.recovery; enemy.stateDuration = enemy.timer; enemy.attack = null; }
    return;
  }
  if (enemy.state !== 'approach') return;
  const dx = state.player.x - enemy.x, dz = state.player.z - enemy.z, d = length(dx, dz);
  const visible = lineClear(state.room, enemy.x, enemy.z, state.player.x, state.player.z, .15);
  const committed = committedCount(state);
  const nextMove = spec.boss ? spec.moves[enemy.moveIndex % spec.moves.length] : null;
  const range = nextMove ? (nextMove.targeted || nextMove.projectiles ? 13 : nextMove.range) : spec.reach;
  if (d <= range * .9 && visible && (spec.ranged || committed < 2)) beginAttack(state, enemy);
  else if (spec.ranged && d < 4) seek(state, enemy, dx, dz, dt, true);
  else if (d > (spec.ranged ? 7 : spec.reach * .7) || !visible) seek(state, enemy, dx, dz, dt);
  else {
    // Waiting melee combatants circle without committing additional attacks.
    const side = enemy.id.charCodeAt(enemy.id.length-1) % 2 ? 1 : -1;
    seek(state, enemy, dz * side, -dx * side, dt * .3);
    enemy.angle = heading(dx, dz);
  }
}

function updateProjectiles(state, dt) {
  for (let pi=0;pi<state.projectiles.length;pi++) {const projectile=state.projectiles[pi];
    if (projectile.life <= 0) continue;
    const oldX = projectile.x, oldZ = projectile.z;
    projectile.x += Math.sin(projectile.angle) * projectile.speed * dt;
    projectile.z += Math.cos(projectile.angle) * projectile.speed * dt; projectile.life -= dt;
    if (!lineClear(state.room, oldX, oldZ, projectile.x, projectile.z, .1)) { projectile.life = 0; effect(state, 'stone', oldX, oldZ); event(state, 'hit', { material: 'stone', damage: 0 }); continue; }
    const segment=scratch(state).segment;segment.x=oldX;segment.z=oldZ;segment.heading=projectile.angle;segment.range=projectile.speed*dt;
    if (shapeHits(segment, state.player)) {
      projectile.life = 0;
      const enemy = state.enemies.find(e => e.id === projectile.ownerId);
      const origin=scratch(state).origin;origin.x=oldX-Math.sin(projectile.angle);origin.z=oldZ-Math.cos(projectile.angle);playerDamage(state,projectile.damage,projectile.source,origin,enemy);
    }
  }
  compact(state.projectiles);
}

const movableEnemy = enemy => !COMMITTED_STATES.includes(enemy.state);
function separateActors(state) {
  const living=scratch(state).living;let livingCount=0;for(let i=0;i<state.enemies.length;i++)if(state.enemies[i].hp>0)living[livingCount++]=state.enemies[i];for(let i=livingCount;i<living.length;i++)living[i]=null;
  const movable = movableEnemy;
  for (let iteration = 0; iteration < 2; iteration++) {
    for (let i = 0; i < livingCount; i++) {
      const a = living[i];
      for (let j = i + 1; j < livingCount; j++) {
        const b = living[j], dx = b.x - a.x, dz = b.z - a.z, d = length(dx, dz), minimum = a.radius + b.radius + .04;
        if (d >= minimum || !movable(a) && !movable(b)) continue;
        const nx = d > .0001 ? dx / d : 1, nz = d > .0001 ? dz / d : 0;
        const part = movable(a) && movable(b) ? .5 : 1, correction = (minimum - d) * part;
        if (movable(a)) move(state, a, -nx * correction, -nz * correction, a.radius);
        if (movable(b)) move(state, b, nx * correction, nz * correction, b.radius);
      }
      const p = state.player, dx = a.x - p.x, dz = a.z - p.z, d = length(dx, dz), minimum = p.radius + a.radius;
      if (d < minimum && p.action !== 'dodge') {
        const nx = d > .0001 ? dx / d : 1, nz = d > .0001 ? dz / d : 0;
        if (movable(a)) move(state, a, nx * (minimum - d), nz * (minimum - d), a.radius);
        else move(state, p, -nx * (minimum - d), -nz * (minimum - d), p.radius);
      }
    }
  }
}

const TUTORIAL_MESSAGES=Object.freeze([
    '以 WASD 或左搖桿移動。先在庭院移動一小段。',
    '瞄準教官，按一下攻擊輕刺。長按再放開可蓄力刺；槍尖能打到比身體更遠的目標。',
    '按 Space 或閃避鍵移位。閃避消耗能量，但輕刺永遠不耗能。',
    '教官開始進攻。看紅色扇形前搖，在命中前按住右鍵／格擋鍵，完成一次反擊；太早只會普通格擋。',
    '反擊成功！用槍的距離擊敗教官。正式遠征清房後選擇餘燼，再依旅程進度挑戰王座；營地可選長程或短程誓約。',
  ]);
function updateTutorial(state) {
  const tutorial = state.tutorial;
  if (!tutorial || tutorial.done) return;
  let complete=false;switch(tutorial.step){case 0:complete=tutorial.distance>1.5;break;case 1:complete=state.stats.damageDealt>0;break;case 2:complete=state.stats.dodges>0;break;case 3:complete=state.stats.parries>0;break;case 4:complete=true;for(let i=0;i<state.enemies.length;i++)if(state.enemies[i].hp>0)complete=false;}
  if (complete) {
    tutorial.step++;
    tutorial.text = TUTORIAL_MESSAGES[tutorial.step] || '試煉完成。回到營地選擇路線，開始你的守誓之旅。';
    event(state, 'ui', { text: tutorial.text, cue: 'tutorial' });
    if (tutorial.step === 4) {
      const teacher = state.enemies[0]; if (teacher) { teacher.hp = Math.max(35, teacher.hp); teacher.state = 'approach'; teacher.timer = .8; teacher.attack = null; }
    }
    if (tutorial.step >= 5) { tutorial.done = true; finishRun(state, true, 'tutorial'); }
  }
  if (tutorial.step < 4) for (let i=0;i<state.enemies.length;i++){const enemy=state.enemies[i];if (enemy.hp <= 0) { enemy.hp = 12; enemy.state = 'idle'; enemy.timer = .8; }}
}

function makeRewards(state) {
  const candidates = TALENTS.filter(t => !state.talents.includes(t.id) && (state.challenge !== 'single-school' || t.school === state.school));
  for (let i = candidates.length - 1; i > 0; i--) { const j = Math.floor(random(state) * (i + 1)); [candidates[i], candidates[j]] = [candidates[j], candidates[i]]; }
  if(state.challenge==='crown-pilgrimage'){const i=candidates.findIndex(t=>t.school===state.school);if(i>0)[candidates[0],candidates[i]]=[candidates[i],candidates[0]];}
  state.rewardOptions = candidates.slice(0, 3).map(talent => ({ ...talent, kind: 'talent', healAmount: state.roomRisk === 'perilous' ? 18 : 12 }));
  state.rewardOptions.push({ id: 'restore', name: '休憩餘火', description: `恢復 ${state.roomRisk === 'perilous' ? 45 : 32} 生命與全部能量。`, kind: 'heal', amount: state.roomRisk === 'perilous' ? 45 : 32 });
  state.rewardChoices = state.rewardOptions;
}

function clearRoom(state) {
  state.roomsCleared++; state.stats.rooms = state.roomsCleared;
  if (!state.roomHits) state.stats.flawlessRooms++;
  state.roomHistory.push({ id: state.room.id, name: state.room.name, risk: state.roomRisk, hits: state.roomHits, time: Math.round(state.roomElapsed),entryHp:state.entrySnapshot?.player.hp,exitHp:state.player.hp,kills:state.stats.kills-(state.entrySnapshot?.stats.kills||0),build:[...state.talents],objective:state.objective?.kind||'clear',mechanic:state.objective?.shape||state.objective?.kind||'clear' });
  state.projectiles = []; state.player.attack = null; state.player.action = 'idle'; state.player.actionTime = 0; state.player.charge = 0;
  event(state, 'room-clear', { flawless: state.roomHits === 0 });
  const plan = journeyPlan(state);
  if (state.room.id === BOSS_ROOM.id && state.roomsCleared >= plan.rooms + plan.crowns) { finishRun(state, true, 'boss'); return; }
  state.phase = 'reward'; makeRewards(state);
  const storyIndex=plan.acts===3?({1:0,4:1,12:2})[state.roomsCleared]:plan.acts===2?({1:0,6:1,12:2})[state.roomsCleared]:plan.crowns===2?({1:0,3:1,6:2})[state.roomsCleared]:state.roomsCleared-1;
  state.story = storyIndex !== undefined && storyIndex < STORIES.length ? copy(STORIES[storyIndex]) : null;
}

function makeRoutes(state) {
  if (state.roomsCleared >= journeyPlan(state).rooms) {
    state.routeOptions = [{ roomId: BOSS_ROOM.id, id: BOSS_ROOM.id, risk: 'steady', name: BOSS_ROOM.name, label: ENEMIES[crownType(state)].name, reward: '擊敗守衛，完成誓約', description: `${ENEMIES[crownType(state)].name} · ${journeyPlan(state).crowns===2 && state.roomsCleared===journeyPlan(state).rooms ? '第一頂王冠。擊敗攝政後可休憩，再前往最後的審判。' : byId(ROUTES, crownType(state) === 'arbiter' ? 'ivory' : 'ash').description}` }];
  } else {
    const available = roomPool(state).filter(room => !state.roomHistory.some(visit => visit.id === room.id));
    for (let i = available.length - 1; i > 0; i--) { const j = Math.floor(random(state) * (i + 1)); [available[i], available[j]] = [available[j], available[i]]; }
    state.routeOptions = available.slice(0, 2).map((room, index) => ({ id: room.id, roomId: room.id, name: room.name, label: `${room.name} · ${index ? '險途' : '穩途'}`, risk: index ? 'perilous' : 'steady', reward: index ? '第二波多 1 名敵人、生命 +15%；天賦附帶回復 18，休憩回復 45' : '標準敵群；天賦附帶回復 12，休憩回復 32', description: room.description }));
  }
  state.routeChoices = state.routeOptions;
}

export function chooseReward(state, id, replaceId = null) {
  if (state.phase !== 'reward') return false;
  const choice = byId(state.rewardOptions, id);
  if (!choice) return false;
  if (choice.kind === 'heal') state.player.hp = Math.min(state.player.maxHp, state.player.hp + choice.amount);
  else {
    if (state.talents.length >= 4) {
      if (!state.talents.includes(replaceId)) { state.pendingReward = id; return false; }
      state.talents.splice(state.talents.indexOf(replaceId), 1);
    }
    state.talents.push(id); refreshStats(state);
    // Persist the offered amount: older reward checkpoints keep their original offer.
    state.player.hp = Math.min(state.player.maxHp, state.player.hp + (choice.healAmount || 0));
  }
  state.pendingReward = null; state.player.energy = state.player.maxEnergy;
  state.phase = 'route'; makeRoutes(state); state.rewardOptions = []; state.rewardChoices = [];
  event(state, 'ui', { cue: 'reward', text: choice.name }); state.entrySnapshot = snapshot(state);
  return true;
}

export function chooseStory(state, id) {
  if (!state.story || !CHOICE_PHASES.includes(state.phase)) return false;
  const choice = byId(state.story.choices, id); if (!choice) return false;
  state.stories.push({ storyId: state.story.id, choiceId: choice.id, text: choice.text });
  state.story = null; event(state, 'ui', { cue: 'story', text: choice.text }); return true;
}

function finishRun(state, won, reason) {
  if (state.phase === 'result') return;
  state.phase = 'result'; state.player.action = won ? 'idle' : 'death'; state.player.attack = null; state.projectiles = [];
  const finalChoice = state.stories.find(s => s.storyId === 'crown')?.choiceId || 'default';
  const unlocked = STARTING_TALENTS.filter(t => t.requirement === 'default' || t.requirement === 'room' && state.roomsCleared > 0 || t.requirement === 'flawless' && state.stats.flawlessRooms > 0 || t.requirement === 'parry' && state.stats.parries >= 3 || t.requirement === 'win' && won && !state.tutorial).map(t => t.id);
  state.result = { won, reason, tutorial: Boolean(state.tutorial), seed: state.seed, route: state.route, challenge: state.challenge, challengeComplete: won && (state.challenge !== 'unbroken' || state.stats.flawlessRooms > 0), talents: [...state.talents], rooms: copy(state.roomHistory), damageSources: copy(state.stats.damageSources), damageByAction: copy(state.stats.damageByAction), parries: state.stats.parries, hits: state.stats.hits, time: Math.round(state.time), kills: state.stats.kills, flawlessRooms: state.stats.flawlessRooms, unlocked, skinUnlock: won && !state.tutorial ? 'ember' : null, ending: won ? ENDINGS[finalChoice] : '誓言尚未熄滅。回到營地，記住這次受擊的來源，再換一條路。', rewardId: `${state.seed}:${state.route}:${won ? 'win' : 'loss'}` };
  event(state, won ? 'win' : 'loss'); state.entrySnapshot = snapshot(state);
}

function advance(state, input, dt) {
  if (!ACTIVE_PHASES.includes(state.phase)) return;
  state.time += dt; state.roomElapsed += dt;
  for (let i=0;i<state.effects.length;i++)state.effects[i].life-=dt;
  compact(state.effects);if(state.effects.length>90)state.effects.splice(0,state.effects.length-90);
  updatePlayer(state, input, dt);
  separateActors(state);
  for (let ei=0;ei<state.enemies.length;ei++) {const enemy=state.enemies[ei];
    if (!ACTIVE_PHASES.includes(state.phase)) break;
    updateEnemy(state, enemy, dt);
  }
  if (!ACTIVE_PHASES.includes(state.phase)) return;
  updateProjectiles(state, dt);updateObjective(state,dt);
  if(state.phase!=='combat'&&state.phase!=='tutorial')return;
  const committed = committedCount(state);
  state.stats.maxCommittedMelee = Math.max(state.stats.maxCommittedMelee, committed);
  if (state.tutorial) { updateTutorial(state); return; }
  if (allDefeated(state.enemies)) {
    if (state.pendingWaves.length) {
      if(state.waveArrival==null){state.waveArrival=1;event(state,'ui',{text:`第 ${state.wave+1} 波即將進場 · 移動至開闊處`,cue:'wave'});}
      state.waveArrival=Math.max(0,state.waveArrival-dt);
      if(state.waveArrival<=0){spawnWave(state,state.pendingWaves.shift());state.waveArrival=null;event(state,'ui',{text:`第 ${state.wave} 波守衛進場 · 清除敵人`,cue:'wave'});}
    } else if(objectiveDone(state))clearRoom(state);
  }
}

/** Mutates the supplied state. Input edges apply once; simulation divides slow frames into 20 ms steps. */
export function step(state, input = EMPTY_INPUT, dt = 1 / 60) {
  if (!state || !Number.isFinite(dt) || dt <= 0 || state.paused || !ACTIVE_PHASES.includes(state.phase)) return state;
  const elapsed = Math.min(dt, .5), count = Math.ceil(elapsed / .02), slice = elapsed / count;
  const work=scratch(state),pending=work.pending;
  for(let i=0;i<EDGES.length;i++){const key=EDGES[i];pending[key]=Boolean(pending[key]||input[key]);}
  let edgesConsumed = false;
  for (let i = 0; i < count; i++) {
    const frozen = Math.min(slice, Math.max(0, state.hitStop || 0));
    state.hitStop = Math.max(0, (state.hitStop || 0) - frozen);
    if (slice - frozen <= .000001) continue;
    const controls=work.controls;controls.moveX=input.moveX;controls.moveZ=input.moveZ;controls.aimX=input.aimX;controls.aimZ=input.aimZ;controls.autoAim=input.autoAim;controls.attackHeld=input.attackHeld;controls.block=input.block;for(let ei=0;ei<EDGES.length;ei++){const key=EDGES[ei];controls[key]=!edgesConsumed&&pending[key];}
    advance(state, controls, slice - frozen);
    edgesConsumed=true;for(let ei=0;ei<EDGES.length;ei++)pending[EDGES[ei]]=false;
  }
  return state;
}

function snapshot(state) {
  const { entrySnapshot, events, effects, pendingInput, ...save } = state;
  return copy({ ...save, events: [], effects: [], entrySnapshot: null });
}

/** Active rooms recover from their entry. Rewards, choices, and completed results recover exactly. */
export function checkpoint(state) {
  if (!state || !state.player) return null;
  const active = ACTIVE_PHASES.includes(state.phase);
  return { schema: RULE_VERSION, savedAt: new Date().toISOString(), run: active && state.entrySnapshot ? copy(state.entrySnapshot) : snapshot(state) };
}

export function restoreRun(saved) {
  try {
    const record = value => value !== null && typeof value === 'object' && !Array.isArray(value); // 落盤物件必須是真正record，primitive或array不可進入可變字典與欄位consumer。
    const within = (value, min, max) => Number.isFinite(value) && value >= min && value <= max; // 計時／幾何採有限且有語意的界限，不讓極大有限值拖死同步步驟。
    const count = value => Number.isSafeInteger(value) && value >= 0; // 計數不可是負數、小數或精度已失真的整數。
    const arenaSpan = ARENA.max - ARENA.min, uidReserve = 86400 * 1000; // 每秒1000個ID遠高於30敵、出招冷卻、燃燒與彈幕的總生成率，替完整24小時續局保留安全整數餘量。
    if (!saved || saved.schema !== RULE_VERSION || !saved.run) return null;
    const state = copy(saved.run);
    if (state.schema !== RULE_VERSION || !SAVE_PHASES.includes(state.phase)) return null;
    if (!Number.isInteger(state.seed) || !Number.isInteger(state.rng) || !byId(ROUTES, state.route) || !byId(DIFFICULTIES, state.difficulty) || !byId(CHALLENGES, state.challenge)) return null;
    if (!within(state.seed, 1, 0xffffffff) || !within(state.rng, 0, 0xffffffff) || !byId(STARTING_TALENTS, state.startTalent)) return null; // createRun產生非零uint32種子與已知起始天賦，還原再玩配置前同樣驗證，避免合法run外殼仍攜帶不可重現的配置。
    const playerNumbers = ['x', 'z', 'angle', 'hp', 'maxHp', 'energy', 'maxEnergy', 'actionTime', 'invuln', 'charge', 'radius', 'blockAge', 'cooldown', 'dodgeX', 'dodgeZ', 'afterDodge', 'healCooldown', 'heldTime'];
    if (!state.player || !playerNumbers.every(key => Number.isFinite(state.player[key])) || ![state.time, state.serial, state.roomElapsed, state.roomHits, state.wave].every(Number.isFinite)) return null;
    if (!PLAYER_ACTIONS.includes(state.player.action) || state.player.radius !== ARENA.playerRadius || Math.abs(state.player.x) > 10 || Math.abs(state.player.z) > 10) return null;
    if (state.player.maxHp !== 120 || state.player.hp < 0 || state.player.hp > 120 || state.time < 0 || state.time > 86400) return null;
    if (!count(state.serial) || state.serial > Number.MAX_SAFE_INTEGER - uidReserve || !count(state.wave) || !count(state.roomHits)) return null; // serial允許0／1／2，不猜測既有敵人的ID下界；wave負值會令spawnPoints索引變負。
    if (state.hitStop !== undefined && !within(state.hitStop, 0, .045)) return null; // 舊檔可完全缺hitStop；唯一正式賦值是45ms，不能恢復成NaN或永凍。
    if (state.player.attack != null) { // 非空攻擊即使action是idle仍會在updatePlayer被消費，不能只驗light／charge狀態。
      const attack = state.player.attack, numbers = ['x', 'z', 'heading', 'range', 'width', 'damage', 'age', 'activeStart', 'activeEnd']; // 僅包含正式玩家槍刺實際讀寫的必要欄位。
      if (!record(attack) || attack.shape !== 'line' || !numbers.every(key => Number.isFinite(attack[key])) || typeof attack.charged !== 'boolean' || !Array.isArray(attack.hitIds) || attack.hitIds.some(id => typeof id !== 'string')) return null; // 避免age寫入primitive與hitIds.includes／push崩潰。
      if (Math.abs(attack.x) > 10 || Math.abs(attack.z) > 10 || !within(attack.range, 0, arenaSpan) || !within(attack.width, 0, arenaSpan) || attack.damage < 0 || !within(attack.age, 0, 1) || !within(attack.activeStart, 0, attack.activeEnd) || !within(attack.activeEnd, 0, 1)) return null; // 場內槍刺須在幾何與時窗寬界內；傷害只要求有限非負，不任意拒絕合法四天賦加成。
    } // 空攻擊沿用歷史null／缺欄位相容行為。
    if (!Array.isArray(state.talents) || state.talents.length > 4 || state.talents.some(id => !byId(TALENTS, id)) || new Set(state.talents).size !== state.talents.length) return null;
    const enemyNumbers = ['x', 'z', 'angle', 'hp', 'maxHp', 'radius', 'timer', 'stateDuration', 'phase', 'moveIndex', 'burn', 'burnTick', 'shieldBroken'];
    if (!Array.isArray(state.enemies) || state.enemies.length > 30 || state.enemies.some(e => !ENEMIES[e.type] || !enemyNumbers.every(key => Number.isFinite(e[key])) || !ENEMY_STATES.includes(e.state) || ![1, 2].includes(e.phase) || Math.abs(e.x) > 11 || Math.abs(e.z) > 11)) return null;
    if (state.enemies.some(enemy => typeof enemy.id !== 'string' || !enemy.id.length || enemy.radius !== ENEMIES[enemy.type].radius || !count(enemy.moveIndex) || (enemy.staggerCooldown !== undefined && !within(enemy.staggerCooldown, 0, 1.05)))) return null; // seek讀字串ID；半徑必須跟正式類型一致；舊檔可缺staggerCooldown但錯型與無限期硬直不可進算術。
    const attackNumbers = ['x', 'z', 'heading', 'range', 'width', 'angle', 'radius', 'innerRadius', 'damage', 'windup', 'recovery', 'activeTime']; // 前搖／落招會直接消費的必要攻擊數值。
    if (state.enemies.some(enemy => { // 狀態與攻擊資料必須一致，不能恢復成下一幀必崩的敵人。
      if (!COMMITTED_STATES.includes(enemy.state)) return false; // 非活動攻擊狀態保留既有相容行為。
      const attack = enemy.attack, spec = ENEMIES[enemy.type]; // 只驗證目前敵人實際可產生的攻擊來源與彈數。
      const sources = [enemy.type, ...(spec.moves || []).map(move => move.id)], projectileCounts = [spec.ranged ? 1 : 0, ...(spec.moves || []).map(move => move.projectiles || 0)]; // 沿用內容資料，不另複製招式表。
      return !attack || !ATTACK_SHAPES.includes(attack.shape) || !attackNumbers.every(key => Number.isFinite(attack[key])) // 空物件或壞幾何／計時一律走損壞降級。
        || ['range', 'width', 'angle', 'radius', 'windup', 'activeTime'].some(key => attack[key] <= 0) || ['innerRadius', 'damage', 'recovery'].some(key => attack[key] < 0) // 防止負尺寸、負傷害與無效活動窗口。
        || attack.innerRadius > attack.radius || !sources.includes(attack.source) || !projectileCounts.includes(attack.projectiles); // 外環與彈數也必須符合已定義攻擊契約。
    })) return null; // 保留main既有安全回營地、保留解鎖與偏好的恢復路徑。
    if (!state.room || ![...ROOMS, TUTORIAL_ROOM, BOSS_ROOM].some(r => r.id === state.room.id) || !Array.isArray(state.roomHistory) || !state.stats || !Number.isInteger(state.roomsCleared) || state.roomsCleared < 0 || state.roomsCleared > journeyPlan(state).rooms + journeyPlan(state).crowns) return null;
    if(state.challenge==='crown-pilgrimage'){
      const settled=state.phase==='reward'||state.phase==='route'||state.phase==='result'&&state.result?.won===true,index=state.roomsCleared-(settled?1:0),plan=journeyPlan(state);
      if(state.roomIndex!==index||index<0||index>=plan.rooms+plan.crowns)return null;
      if(index>=plan.rooms?state.room.id!==BOSS_ROOM.id:!plan.pools[Math.floor(index/4)].includes(state.room.id))return null;
      const visited=new Set();for(let i=0;i<state.roomHistory.length;i++){const id=state.roomHistory[i]?.id;if(i>=plan.rooms){if(id!==BOSS_ROOM.id)return null;}else{if(!plan.pools[Math.floor(i/4)].includes(id)||visited.has(id))return null;visited.add(id);}}
    }
    const statNumbers = ['damageDealt', 'damageTaken', 'parries', 'blocks', 'hits', 'attacks', 'dodges', 'kills', 'rooms', 'flawlessRooms', 'maxCommittedMelee'];
    if (!statNumbers.every(key => Number.isFinite(state.stats[key]) && state.stats[key] >= 0) || state.roomHistory.length !== state.roomsCleared || !state.stats.damageSources || !state.stats.damageByAction) return null;
    if (state.roomHistory.some(visit => !record(visit) || ![...ROOMS, BOSS_ROOM].some(room => room.id === visit.id)) || !record(state.stats.damageSources) || !record(state.stats.damageByAction)) return null; // reward確認會讀visit.id，受傷與槍刺會寫damage字典，truthy primitive不能冒充record。
    if (Object.values(state.stats.damageSources).some(n => !Number.isFinite(n) || n < 0) || Object.values(state.stats.damageByAction).some(n => !Number.isFinite(n) || n < 0)) return null;
    if (!Array.isArray(state.routeOptions) || !Array.isArray(state.rewardOptions) || !Array.isArray(state.stories) || !Array.isArray(state.projectiles)) return null;
    if (state.stories.some(choice => !record(choice) || !STORIES.some(story => story.id === choice.storyId && story.choices.some(option => option.id === choice.choiceId)))) return null; // boss自然死亡結算會find故事欄位，陣列中的null不可留到finishRun才崩潰。
    if (state.story != null && (!record(state.story) || !STORIES.some(story => story.id === state.story.id) || !Array.isArray(state.story.choices) || state.story.choices.some(choice => !record(choice) || !STORIES.find(story => story.id === state.story.id).choices.some(option => option.id === choice.id)))) return null; // route畫面會直接map choices，保存故事ID與選項契約但不覆寫歷史文字。
    if (state.routeOptions.some(r => ![...ROOMS, BOSS_ROOM].some(room => room.id === r.roomId) || !ROUTE_RISKS.includes(r.risk))) return null;
    if (state.rewardOptions.some(r => r.id === 'restore' ? r.kind !== 'heal' || ![32, 45].includes(r.amount) : !byId(TALENTS, r.id) || r.kind !== 'talent')) return null; // 休憩只接受既有32／45回復量，種類損壞不可造成NaN或漏發天賦。
    if (state.rewardOptions.some(r => r.healAmount !== undefined && (r.kind !== 'talent' || ![12, 18].includes(r.healAmount)))) return null;
    if (state.projectiles.some(p => ![p.x, p.z, p.angle, p.speed, p.life, p.damage].every(Number.isFinite))) return null;
    if (state.phase === 'result' && (!state.result || typeof state.result.won !== 'boolean')) return null;
    if (state.phase === 'tutorial' && (!state.tutorial || !Number.isInteger(state.tutorial.step) || state.tutorial.step < 0 || state.tutorial.step > 5)) return null;
    state.room = copy([...ROOMS, TUTORIAL_ROOM, BOSS_ROOM].find(r => r.id === state.room.id));
    if(state.challenge==='crown-pilgrimage'&&state.room.id!=='crown-arena'){
      const o=state.objective,spec=OBJECTIVES[state.roomIndex];
      if(!spec||!record(o)||o.kind!==spec.kind||o.shape!==(spec.shape||null)||!count(o.completed)||!Array.isArray(o.targets)||o.targets.length!==(spec.kind==='beacons'||spec.kind==='seals'?2:0)||o.completed!==o.targets.filter(t=>t.done).length||!HAZARD_PHASES.includes(o.phase)||!within(o.timer,0,3)||!count(o.cycles)||typeof o.mastered!=='boolean'||o.chargeRequired!==(spec.chargeRequired||0))return null;
      if(o.targets.some((t,i)=>!record(t)||t.id!==`objective-${i}`||t.x!==(i?6.8:-6.8)||t.z!==(i?-5:4.8)||typeof t.done!=='boolean'||!within(t.progress,0,spec.chargeRequired||0)||!within(t.hp,0,spec.hp||0)||spec.kind==='seals'&&t.done!==(t.hp===0)||spec.kind==='beacons'&&t.done!==(t.progress===spec.chargeRequired)))return null;
      if(!spec.shape&&o.attack!==null)return null;
      if(spec.shape&&(!record(o.attack)||o.attack.shape!==spec.shape||!['x','z','heading','radius','innerRadius','range','width','damage','windup','recovery','activeTime'].every(k=>within(o.attack[k],0,30)||((k==='x'||k==='z'||k==='heading')&&within(o.attack[k],-30,30)))||o.attack.source!=='training-hazard'||o.attack.damage!==15||o.attack.windup!==(spec.shape==='line'?1.4:2.4)||o.attack.recovery!==2||o.attack.activeTime!==.18||o.attack.innerRadius!==3.1||o.attack.width!==1.2||o.attack.range!==18))return null;
      for(const t of o.targets)if(o.kind==='seals'&&!t.done)state.room.obstacles.push({x:t.x,z:t.z,w:1.3,d:1.3,sealId:t.id});
    }else state.objective=null;
    state.room.revision=0;
    state.settings ||= {}; state.events = []; state.effects = []; state.projectiles ||= []; state.pendingWaves ||= [];
    if(state.waveArrival!=null&&(!Number.isFinite(state.waveArrival)||state.waveArrival<0||state.waveArrival>1))return null;
    if (state.pendingWaves.some(wave => !Array.isArray(wave) || wave.some(type => !ENEMIES[type]))) return null;
    const plan = journeyPlan(state);
    if (state.phase === 'reward' && (state.roomsCleared < 1 || state.roomsCleared >= plan.rooms + plan.crowns || !state.rewardOptions.length || !state.rewardOptions.some(o => o.id === 'restore' && o.kind === 'heal'))) return null;
    if (state.phase === 'route') {
      if (state.roomsCleared < 1 || state.roomsCleared >= plan.rooms + plan.crowns || !state.routeOptions.length) return null;
      if (state.roomsCleared >= plan.rooms && state.routeOptions.some(o => o.roomId !== BOSS_ROOM.id)) return null;
      if (state.roomsCleared < plan.rooms && state.routeOptions.some(o => o.roomId === BOSS_ROOM.id || state.roomHistory.some(v => v.id === o.roomId))) return null;
      if(state.challenge==='crown-pilgrimage'&&state.roomsCleared<plan.rooms&&state.routeOptions.some(o=>!roomPool(state).some(r=>r.id===o.roomId)))return null;
    }
    state.rewardChoices = state.rewardOptions || []; state.routeChoices = state.routeOptions || [];
    state.paused = false; warmNavigation(state.room);scratch(state);refreshStats(state); state.entrySnapshot = snapshot(state);
    return state;
  } catch { return null; }
}

export { ROOMS, TALENTS, STARTING_TALENTS, ROUTES, CHALLENGES, DIFFICULTIES, STORIES, ENEMIES };
