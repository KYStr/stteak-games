import { ARENA, RULE_VERSION, ROOMS, TUTORIAL_ROOM, BOSS_ROOM, ROUTES, TALENTS, STARTING_TALENTS, CHALLENGES, DIFFICULTIES, STORIES, ENDINGS, ENEMIES } from './content.js';

const TAU = Math.PI * 2;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const length = (x, z) => Math.hypot(x, z);
const distance = (a, b) => length(a.x - b.x, a.z - b.z);
const heading = (x, z) => Math.atan2(x, z);
const difference = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
const copy = value => JSON.parse(JSON.stringify(value));
const byId = (list, id) => list.find(item => item.id === id);
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
  types.forEach((type, i) => {
    const point = spawnPoints[(i + state.wave * 2) % spawnPoints.length];
    state.enemies.push(enemyAt(state, type, point[0], point[1], i));
  });
  state.wave++;
}

export function enterRoom(state, roomId, risk = 'steady') {
  if (!state || !['camp', 'route'].includes(state.phase)) return false;
  if (state.phase === 'route' && !state.routeOptions.some(option => option.roomId === roomId && option.risk === risk)) return false;
  const boss = roomId === BOSS_ROOM.id;
  const template = boss ? BOSS_ROOM : byId(ROOMS, roomId);
  if (!template || (boss && state.roomsCleared !== 4) || (!boss && state.roomsCleared >= 4)) return false;
  state.room = copy(template);
  state.roomIndex = state.roomsCleared;
  state.roomRisk = risk === 'perilous' ? 'perilous' : 'steady';
  state.phase = 'combat'; state.roomElapsed = 0; state.roomHits = 0; state.wave = 0;
  state.enemies = []; state.projectiles = []; state.effects = []; state.pendingWaves = [];
  Object.assign(state.player, { x: 0, z: 6.8, angle: Math.PI, action: 'idle', actionTime: 0, attack: null, invuln: .7, charge: 0, cooldown: 0, heldTime: 0, wasBlocking: false, energy: state.player.maxEnergy });
  state.rewardOptions = []; state.rewardChoices = []; state.routeOptions = []; state.routeChoices = [];
  if (boss) {
    state.enemies.push(enemyAt(state, byId(ROUTES, state.route).boss, 0, -4.7));
  } else {
    spawnWave(state, template.roster);
    state.pendingWaves.push([...template.extra, ...(state.roomRisk === 'perilous' ? [template.roster[0]] : [])]);
    if (state.roomsCleared >= 2) state.pendingWaves.push([template.roster[0], template.extra[0], template.roster[template.roster.length - 1]]);
  }
  event(state, 'ui', { text: `${template.name} · ${boss ? '王座守衛' : '清除敵人'}`, cue: boss ? 'boss' : 'room' });
  state.entrySnapshot = snapshot(state);
  return true;
}

export function startTutorial({ practiceWindow = .5 } = {}) {
  const state = createRun({ seed: 1001, difficulty: 'pilgrim', startTalent: 'wide-oath' });
  state.phase = 'tutorial'; state.room = copy(TUTORIAL_ROOM); state.enemies = []; state.pendingWaves = []; state.events = [];
  state.player.x = 0; state.player.z = 4; state.player.hp = state.player.maxHp;
  state.tutorial = { step: 0, text: '以 WASD 或左搖桿移動。先在庭院移動一小段。', done: false, distance: 0, start: { x: 0, z: 4 } };
  state.settings.practiceWindow = clamp(Number(practiceWindow) || .5, .18, .8);
  state.enemies.push(enemyAt(state, 'soldier', 0, 0));
  state.entrySnapshot = snapshot(state);
  return state;
}

// Collider geometry is shared by attack tests, projectile obstruction, and actor movement.
function circleOverlaps(x, z, radius, obstacle) {
  if (Number.isFinite(obstacle.r)) return length(x - obstacle.x, z - obstacle.z) < radius + obstacle.r;
  return length(x - clamp(x, obstacle.x - obstacle.w / 2, obstacle.x + obstacle.w / 2), z - clamp(z, obstacle.z - obstacle.d / 2, obstacle.z + obstacle.d / 2)) < radius;
}

export function blocked(room, x, z, radius = 0) {
  return (room?.obstacles || []).some(o => circleOverlaps(x, z, Math.max(.001, radius), o));
}

function pushOut(room, actor, radius) {
  actor.x = clamp(actor.x, ARENA.min + radius, ARENA.max - radius);
  actor.z = clamp(actor.z, ARENA.min + radius, ARENA.max - radius);
  for (let iteration = 0; iteration < 3; iteration++) {
    for (const obstacle of room.obstacles) {
      if (!circleOverlaps(actor.x, actor.z, radius, obstacle)) continue;
      if (Number.isFinite(obstacle.r)) {
        const dx = actor.x - obstacle.x, dz = actor.z - obstacle.z, d = length(dx, dz) || 1;
        actor.x = obstacle.x + (dx || .001) / d * (obstacle.r + radius + .01);
        actor.z = obstacle.z + (dz || 1) / d * (obstacle.r + radius + .01);
      } else {
        const left = obstacle.x - obstacle.w / 2 - radius, right = obstacle.x + obstacle.w / 2 + radius;
        const top = obstacle.z - obstacle.d / 2 - radius, bottom = obstacle.z + obstacle.d / 2 + radius;
        const edges = [{ d: Math.abs(actor.x - left), axis: 'x', n: left }, { d: Math.abs(actor.x - right), axis: 'x', n: right }, { d: Math.abs(actor.z - top), axis: 'z', n: top }, { d: Math.abs(actor.z - bottom), axis: 'z', n: bottom }];
        edges.sort((a, b) => a.d - b.d); actor[edges[0].axis] = edges[0].n;
      }
    }
  }
}

function move(state, actor, dx, dz, radius) {
  const x = actor.x, z = actor.z;
  actor.x += dx; pushOut(state.room, actor, radius);
  actor.z += dz; pushOut(state.room, actor, radius);
  return length(actor.x - x, actor.z - z);
}

export function lineClear(room, ax, az, bx, bz, radius = .04) {
  const d = length(bx - ax, bz - az), samples = Math.max(1, Math.ceil(d / .12));
  for (let i = 0; i <= samples; i++) if (blocked(room, ax + (bx - ax) * i / samples, az + (bz - az) * i / samples, radius)) return false;
  return true;
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
  if (bossFront && source === 'light' && ['telegraph', 'attack'].includes(enemy.state)) amount *= .55;
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
  const blockable = source !== 'cinder-fall' && source !== 'crown-ring' && source !== 'pale-verdict' && source !== 'beetle';
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
  if (player.cooldown > 0 || ['dodge', 'hurt'].includes(player.action)) return false;
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

function updatePlayer(state, input, dt) {
  const p = state.player;
  p.invuln = Math.max(0, p.invuln - dt); p.cooldown = Math.max(0, p.cooldown - dt); p.afterDodge = Math.max(0, p.afterDodge - dt); p.healCooldown = Math.max(0, p.healCooldown - dt);
  p.actionTime = Math.max(0, p.actionTime - dt);
  p.energy = Math.min(p.maxEnergy, p.energy + 20 * state.modifiers.regenMultiplier * dt * (p.action === 'dodge' || p.charge > 0 ? .25 : 1));
  if (p.actionTime <= 0 && !['block', 'idle', 'run'].includes(p.action)) { p.action = 'idle'; p.attack = null; }
  let mx = clamp(Number(input.moveX) || 0, -1, 1), mz = clamp(Number(input.moveZ) || 0, -1, 1);
  const ml = length(mx, mz); if (ml > 1) { mx /= ml; mz /= ml; }
  if (Number.isFinite(input.aimX) && Number.isFinite(input.aimZ) && length(input.aimX - p.x, input.aimZ - p.z) > .05) {
    if (!p.attack && p.action !== 'dodge') p.angle = heading(input.aimX - p.x, input.aimZ - p.z);
  } else if (input.autoAim) {
    const target = state.enemies.filter(e => e.hp > 0 && lineClear(state.room, p.x, p.z, e.x, e.z)).sort((a, b) => distance(p, a) - distance(p, b))[0];
    if (target && !p.attack && p.action !== 'dodge') p.angle = heading(target.x - p.x, target.z - p.z);
    else if (ml > .05) p.angle = heading(mx, mz);
  } else if (ml > .05 && !['light', 'charge', 'dodge', 'block'].includes(p.action)) p.angle = heading(mx, mz);
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
        if (!p.wasBlocking) p.blockAge = 0;
        p.action = 'block'; p.blockAge += dt;
      } else { p.action = ml > .05 ? 'run' : 'idle'; p.blockAge = 0; }
    }
    if (input.attackPressed && !input.block && p.actionTime <= 0) { p.heldTime = 0; attackPlayer(state, false); }
    if (input.attackHeld && !input.block) {
      p.heldTime += dt;
      if (p.heldTime > .34 && p.actionTime <= 0) { p.charge = clamp((p.heldTime - .34) / .8, 0, 1); p.action = 'charge'; }
    }
    if (input.attackReleased) {
      if (p.heldTime >= .65 && p.action !== 'dodge') { p.cooldown = Math.max(0, p.cooldown); attackPlayer(state, true); }
      p.heldTime = 0; p.charge = 0;
      if (!p.attack && p.action === 'charge') p.action = 'idle';
    }
    if (!input.attackHeld && !input.attackReleased && p.charge && !p.attack) { p.charge = 0; p.heldTime = 0; p.action = 'idle'; }
  }
  p.wasBlocking = Boolean(input.block) && p.action === 'block';
  if (p.attack) {
    const attack = p.attack; const oldAge = attack.age; attack.age += dt;
    if (attack.age >= attack.activeStart && oldAge <= attack.activeEnd) {
      for (const enemy of state.enemies) {
        if (enemy.hp <= 0 || attack.hitIds.includes(enemy.id)) continue;
        if (shapeHits(attack, enemy) && lineClear(state.room, attack.x, attack.z, enemy.x, enemy.z)) {
          attack.hitIds.push(enemy.id); damageEnemy(state, enemy, attack.damage, attack.charged ? 'charge' : 'light');
        }
      }
    }
  }
}

function beginAttack(state, enemy) {
  const spec = ENEMIES[enemy.type];
  const move = spec.boss ? spec.moves[enemy.moveIndex++ % spec.moves.length] : null;
  enemy.angle = heading(state.player.x - enemy.x, state.player.z - enemy.z);
  const attack = {
    shape: move?.shape || spec.shape, x: enemy.x, z: enemy.z, heading: enemy.angle,
    range: move?.range || spec.reach, width: move?.width || spec.width || .8,
    angle: move?.angle || spec.angle || 1.2, radius: move?.radius || spec.reach,
    innerRadius: move?.innerRadius || 0, damage: move?.damage || spec.damage,
    source: move?.id || enemy.type, name: move?.name || spec.name,
    windup: (move?.windup || spec.windup) * (enemy.phase === 2 ? .85 : 1),
    recovery: (move?.recover || spec.recover) * (enemy.phase === 2 ? .85 : 1),
    activeTime: .18, projectiles: move?.projectiles || (spec.ranged ? 1 : 0), targeted: Boolean(move?.targeted),
  };
  if (attack.targeted) { attack.x = state.player.x; attack.z = state.player.z; }
  // No heavy tell is shortened below 650 ms, including the second boss phase.
  attack.windup = Math.max(spec.boss || spec.damage >= 23 ? .65 : .35, attack.windup);
  enemy.attack = attack; enemy.attackHit = false; enemy.state = 'telegraph'; enemy.timer = attack.windup; enemy.stateDuration = attack.windup;
  event(state, 'ui', { cue: 'telegraph', text: spec.boss ? attack.name : null, source: enemy.type });
}

export function findPath(room, from, to, radius = .5) {
  const cells = new Map();
  for (let x = -9; x <= 9; x++) for (let z = -9; z <= 9; z++) {
    if (Math.abs(x) <= ARENA.max - radius && Math.abs(z) <= ARENA.max - radius && !blocked(room, x, z, radius + .08)) cells.set(`${x},${z}`, { x, z });
  }
  const nearest = point => [...cells.values()].sort((a, b) => distance(a, point) - distance(b, point)).find(cell => lineClear(room, point.x, point.z, cell.x, cell.z, radius));
  const start = nearest(from), goal = nearest(to);
  if (!start || !goal) return [];
  const key = cell => `${cell.x},${cell.z}`, startKey = key(start), goalKey = key(goal), queue = [start];
  const parents = new Map([[startKey, null]]);
  for (let cursor = 0; cursor < queue.length && !parents.has(goalKey); cursor++) {
    const cell = queue[cursor];
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const id = `${cell.x + dx},${cell.z + dz}`, next = cells.get(id);
      if (!next || parents.has(id) || !lineClear(room, cell.x, cell.z, next.x, next.z, radius)) continue;
      parents.set(id, key(cell)); queue.push(next);
    }
  }
  if (!parents.has(goalKey)) return [];
  const path = []; let current = goalKey;
  while (current && current !== startKey) { path.push(cells.get(current)); current = parents.get(current); }
  path.reverse(); path.push({ x: to.x, z: to.z });
  return path;
}

function seek(state, enemy, dx, dz, dt, flee = false) {
  const spec = ENEMIES[enemy.type], d = length(dx, dz) || 1;
  const speed = spec.speed * (enemy.phase === 2 ? 1.12 : 1) * dt;
  let angle = heading(dx, dz) + (flee ? Math.PI : 0);
  if (!flee && !lineClear(state.room, enemy.x, enemy.z, enemy.x + dx, enemy.z + dz, spec.radius + .08)) {
    if (enemy.nav) enemy.nav.timer -= dt;
    const target = { x: enemy.x + dx, z: enemy.z + dz };
    if (!enemy.nav || enemy.nav.timer <= 0 || distance(enemy.nav.target, target) > 1.5) enemy.nav = { timer: .8, target, points: findPath(state.room, enemy, target, spec.radius) };
    const points = enemy.nav.points;
    while (points.length > 1 && distance(enemy, points[0]) < .35) points.shift();
    let next = points[0];
    for (let i = points.length - 1; i >= 0; i--) if (lineClear(state.room, enemy.x, enemy.z, points[i].x, points[i].z, spec.radius + .06)) { next = points[i]; break; }
    if (next) angle = heading(next.x - enemy.x, next.z - enemy.z);
  } else enemy.nav = null;
  const preferred = enemy.id.charCodeAt(enemy.id.length - 1) % 2 ? 1 : -1;
  for (const offset of [0, .65 * preferred, -.65 * preferred, 1.2 * preferred, -1.2 * preferred, Math.PI * .5 * preferred]) {
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
    enemy.phase = 2; enemy.state = 'recover'; enemy.timer = 1.8; enemy.stateDuration = 1.8; enemy.attack = null;
    effect(state, 'phase', enemy.x, enemy.z, { life: 1.2 }); event(state, 'ui', { text: `${spec.name} · 第二誓式`, cue: 'phase' });
  }
  if (state.tutorial && state.tutorial.step < 3) { enemy.state = 'idle'; enemy.timer = .5; return; }
  if (enemy.state === 'idle' && enemy.timer <= 0) enemy.state = 'approach';
  if (['recover', 'stagger'].includes(enemy.state)) {
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
  const committed = state.enemies.filter(e => e.hp > 0 && !ENEMIES[e.type].ranged && ['telegraph', 'attack'].includes(e.state)).length;
  const nextMove = spec.boss ? spec.moves[enemy.moveIndex % spec.moves.length] : null;
  const range = nextMove ? (nextMove.targeted || nextMove.projectiles ? 13 : nextMove.range) : spec.reach;
  if (d <= range * .9 && visible && (spec.ranged || committed < 2)) beginAttack(state, enemy);
  else if (spec.ranged && d < 4) seek(state, enemy, dx, dz, dt, true);
  else if (d > (spec.ranged ? 7 : spec.reach * .7) || !visible) seek(state, enemy, dx, dz, dt);
  else {
    // Waiting melee combatants circle without committing additional attacks.
    const side = Number(enemy.id.slice(1)) % 2 ? 1 : -1;
    seek(state, enemy, dz * side, -dx * side, dt * .3);
    enemy.angle = heading(dx, dz);
  }
}

function updateProjectiles(state, dt) {
  for (const projectile of state.projectiles) {
    if (projectile.life <= 0) continue;
    const oldX = projectile.x, oldZ = projectile.z;
    projectile.x += Math.sin(projectile.angle) * projectile.speed * dt;
    projectile.z += Math.cos(projectile.angle) * projectile.speed * dt; projectile.life -= dt;
    if (!lineClear(state.room, oldX, oldZ, projectile.x, projectile.z, .1)) { projectile.life = 0; effect(state, 'stone', oldX, oldZ); event(state, 'hit', { material: 'stone', damage: 0 }); continue; }
    const segment = { shape: 'line', x: oldX, z: oldZ, heading: projectile.angle, range: projectile.speed * dt, width: .18 };
    if (shapeHits(segment, state.player)) {
      projectile.life = 0;
      const enemy = state.enemies.find(e => e.id === projectile.ownerId);
      playerDamage(state, projectile.damage, projectile.source, { x: oldX - Math.sin(projectile.angle), z: oldZ - Math.cos(projectile.angle) }, enemy);
    }
  }
  state.projectiles = state.projectiles.filter(p => p.life > 0);
}

function separateActors(state) {
  const living = state.enemies.filter(enemy => enemy.hp > 0);
  const movable = enemy => !['telegraph', 'attack'].includes(enemy.state);
  for (let iteration = 0; iteration < 2; iteration++) {
    for (let i = 0; i < living.length; i++) {
      const a = living[i];
      for (let j = i + 1; j < living.length; j++) {
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

function updateTutorial(state) {
  const tutorial = state.tutorial;
  if (!tutorial || tutorial.done) return;
  const criteria = [tutorial.distance > 1.5, state.stats.damageDealt > 0, state.stats.dodges > 0, state.stats.parries > 0, state.enemies.every(e => e.hp <= 0)];
  const messages = [
    '以 WASD 或左搖桿移動。先在庭院移動一小段。',
    '瞄準教官，按一下攻擊輕刺。長按再放開可蓄力刺；槍尖能打到比身體更遠的目標。',
    '按 Space 或閃避鍵移位。閃避消耗能量，但輕刺永遠不耗能。',
    '教官開始進攻。看紅色扇形前搖，在命中前按住右鍵／格擋鍵，完成一次反擊；太早只會普通格擋。',
    '反擊成功！用槍的距離擊敗教官。清房後選擇餘燼，經過四房再挑戰王座。',
  ];
  if (criteria[tutorial.step]) {
    tutorial.step++;
    tutorial.text = messages[tutorial.step] || '試煉完成。回到營地選擇路線，開始你的守誓之旅。';
    event(state, 'ui', { text: tutorial.text, cue: 'tutorial' });
    if (tutorial.step === 4) {
      const teacher = state.enemies[0]; if (teacher) { teacher.hp = Math.max(35, teacher.hp); teacher.state = 'approach'; teacher.timer = .8; teacher.attack = null; }
    }
    if (tutorial.step >= 5) { tutorial.done = true; finishRun(state, true, 'tutorial'); }
  }
  if (tutorial.step < 4) for (const enemy of state.enemies) if (enemy.hp <= 0) { enemy.hp = 12; enemy.state = 'idle'; enemy.timer = .8; }
}

function makeRewards(state) {
  const candidates = TALENTS.filter(t => !state.talents.includes(t.id) && (state.challenge !== 'single-school' || t.school === state.school));
  for (let i = candidates.length - 1; i > 0; i--) { const j = Math.floor(random(state) * (i + 1)); [candidates[i], candidates[j]] = [candidates[j], candidates[i]]; }
  state.rewardOptions = candidates.slice(0, 3).map(talent => ({ ...talent, kind: 'talent', healAmount: state.roomRisk === 'perilous' ? 18 : 12 }));
  state.rewardOptions.push({ id: 'restore', name: '休憩餘火', description: `恢復 ${state.roomRisk === 'perilous' ? 45 : 32} 生命與全部能量。`, kind: 'heal', amount: state.roomRisk === 'perilous' ? 45 : 32 });
  state.rewardChoices = state.rewardOptions;
}

function clearRoom(state) {
  state.roomsCleared++; state.stats.rooms = state.roomsCleared;
  if (!state.roomHits) state.stats.flawlessRooms++;
  state.roomHistory.push({ id: state.room.id, name: state.room.name, risk: state.roomRisk, hits: state.roomHits, time: Math.round(state.roomElapsed) });
  state.projectiles = []; state.player.attack = null; state.player.action = 'idle'; state.player.actionTime = 0; state.player.charge = 0;
  event(state, 'room-clear', { flawless: state.roomHits === 0 });
  if (state.room.id === BOSS_ROOM.id) { finishRun(state, true, 'boss'); return; }
  state.phase = 'reward'; makeRewards(state);
  state.story = state.roomsCleared <= STORIES.length ? copy(STORIES[state.roomsCleared - 1]) : null;
}

function makeRoutes(state) {
  if (state.roomsCleared >= 4) {
    state.routeOptions = [{ roomId: BOSS_ROOM.id, id: BOSS_ROOM.id, risk: 'steady', name: BOSS_ROOM.name, label: byId(ROUTES, state.route).bossName, reward: '擊敗守衛，完成誓約', description: byId(ROUTES, state.route).description }];
  } else {
    const available = ROOMS.filter(room => !state.roomHistory.some(visit => visit.id === room.id));
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
  if (!state.story || !['reward', 'route'].includes(state.phase)) return false;
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
  if (!['combat', 'tutorial'].includes(state.phase)) return;
  state.time += dt; state.roomElapsed += dt;
  for (const item of state.effects) item.life -= dt;
  state.effects = state.effects.filter(item => item.life > 0).slice(-90);
  updatePlayer(state, input, dt);
  separateActors(state);
  for (const enemy of state.enemies) {
    if (!['combat', 'tutorial'].includes(state.phase)) break;
    updateEnemy(state, enemy, dt);
  }
  if (!['combat', 'tutorial'].includes(state.phase)) return;
  updateProjectiles(state, dt);
  const committed = state.enemies.filter(e => e.hp > 0 && !ENEMIES[e.type].ranged && ['telegraph', 'attack'].includes(e.state)).length;
  state.stats.maxCommittedMelee = Math.max(state.stats.maxCommittedMelee, committed);
  if (state.tutorial) { updateTutorial(state); return; }
  if (state.enemies.every(enemy => enemy.hp <= 0)) {
    if (state.pendingWaves.length) {
      spawnWave(state, state.pendingWaves.shift()); event(state, 'ui', { text: `第 ${state.wave} 波守衛進場`, cue: 'wave' });
    } else clearRoom(state);
  }
}

/** Mutates the supplied state. Input edges apply once; simulation divides slow frames into 20 ms steps. */
export function step(state, input = {}, dt = 1 / 60) {
  if (!state || !Number.isFinite(dt) || dt <= 0 || state.paused || !['combat', 'tutorial'].includes(state.phase)) return state;
  const elapsed = Math.min(dt, .5), count = Math.ceil(elapsed / .02), slice = elapsed / count;
  const pending = state.pendingInput || {};
  for (const key of ['attackPressed', 'attackReleased', 'dodge']) pending[key] = Boolean(pending[key] || input[key]);
  state.pendingInput = pending;
  let edgesConsumed = false;
  for (let i = 0; i < count; i++) {
    const frozen = Math.min(slice, Math.max(0, state.hitStop || 0));
    state.hitStop = Math.max(0, (state.hitStop || 0) - frozen);
    if (slice - frozen <= .000001) continue;
    const controls = { ...input, attackPressed: !edgesConsumed && pending.attackPressed, attackReleased: !edgesConsumed && pending.attackReleased, dodge: !edgesConsumed && pending.dodge };
    advance(state, controls, slice - frozen);
    edgesConsumed = true; state.pendingInput = null;
  }
  return state;
}

function snapshot(state) {
  const { entrySnapshot, events, effects, ...save } = state;
  return copy({ ...save, events: [], effects: [], entrySnapshot: null });
}

/** Active rooms recover from their entry. Rewards, choices, and completed results recover exactly. */
export function checkpoint(state) {
  if (!state || !state.player) return null;
  const active = ['combat', 'tutorial'].includes(state.phase);
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
    if (state.schema !== RULE_VERSION || !['combat', 'tutorial', 'reward', 'route', 'result'].includes(state.phase)) return null;
    if (!Number.isInteger(state.seed) || !Number.isInteger(state.rng) || !byId(ROUTES, state.route) || !byId(DIFFICULTIES, state.difficulty) || !byId(CHALLENGES, state.challenge)) return null;
    if (!within(state.seed, 1, 0xffffffff) || !within(state.rng, 0, 0xffffffff) || !byId(STARTING_TALENTS, state.startTalent)) return null; // createRun產生非零uint32種子與已知起始天賦，還原再玩配置前同樣驗證，避免合法run外殼仍攜帶不可重現的配置。
    const playerNumbers = ['x', 'z', 'angle', 'hp', 'maxHp', 'energy', 'maxEnergy', 'actionTime', 'invuln', 'charge', 'radius', 'blockAge', 'cooldown', 'dodgeX', 'dodgeZ', 'afterDodge', 'healCooldown', 'heldTime'];
    if (!state.player || !playerNumbers.every(key => Number.isFinite(state.player[key])) || ![state.time, state.serial, state.roomElapsed, state.roomHits, state.wave].every(Number.isFinite)) return null;
    if (!['idle', 'run', 'light', 'charge', 'block', 'dodge', 'hurt', 'death'].includes(state.player.action) || state.player.radius !== ARENA.playerRadius || Math.abs(state.player.x) > 10 || Math.abs(state.player.z) > 10) return null;
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
    if (!Array.isArray(state.enemies) || state.enemies.length > 30 || state.enemies.some(e => !ENEMIES[e.type] || !enemyNumbers.every(key => Number.isFinite(e[key])) || !['idle', 'approach', 'telegraph', 'attack', 'recover', 'stagger', 'dead'].includes(e.state) || ![1, 2].includes(e.phase) || Math.abs(e.x) > 11 || Math.abs(e.z) > 11)) return null;
    if (state.enemies.some(enemy => typeof enemy.id !== 'string' || !enemy.id.length || enemy.radius !== ENEMIES[enemy.type].radius || !count(enemy.moveIndex) || (enemy.staggerCooldown !== undefined && !within(enemy.staggerCooldown, 0, 1.05)))) return null; // seek讀字串ID；半徑必須跟正式類型一致；舊檔可缺staggerCooldown但錯型與無限期硬直不可進算術。
    const attackNumbers = ['x', 'z', 'heading', 'range', 'width', 'angle', 'radius', 'innerRadius', 'damage', 'windup', 'recovery', 'activeTime']; // 前搖／落招會直接消費的必要攻擊數值。
    if (state.enemies.some(enemy => { // 狀態與攻擊資料必須一致，不能恢復成下一幀必崩的敵人。
      if (!['telegraph', 'attack'].includes(enemy.state)) return false; // 非活動攻擊狀態保留既有相容行為。
      const attack = enemy.attack, spec = ENEMIES[enemy.type]; // 只驗證目前敵人實際可產生的攻擊來源與彈數。
      const sources = [enemy.type, ...(spec.moves || []).map(move => move.id)], projectileCounts = [spec.ranged ? 1 : 0, ...(spec.moves || []).map(move => move.projectiles || 0)]; // 沿用內容資料，不另複製招式表。
      return !attack || !['line', 'cone', 'circle', 'ring'].includes(attack.shape) || !attackNumbers.every(key => Number.isFinite(attack[key])) // 空物件或壞幾何／計時一律走損壞降級。
        || ['range', 'width', 'angle', 'radius', 'windup', 'activeTime'].some(key => attack[key] <= 0) || ['innerRadius', 'damage', 'recovery'].some(key => attack[key] < 0) // 防止負尺寸、負傷害與無效活動窗口。
        || attack.innerRadius > attack.radius || !sources.includes(attack.source) || !projectileCounts.includes(attack.projectiles); // 外環與彈數也必須符合已定義攻擊契約。
    })) return null; // 保留main既有安全回營地、保留解鎖與偏好的恢復路徑。
    if (!state.room || ![...ROOMS, TUTORIAL_ROOM, BOSS_ROOM].some(r => r.id === state.room.id) || !Array.isArray(state.roomHistory) || !state.stats || !Number.isInteger(state.roomsCleared) || state.roomsCleared < 0 || state.roomsCleared > 5) return null;
    const statNumbers = ['damageDealt', 'damageTaken', 'parries', 'blocks', 'hits', 'attacks', 'dodges', 'kills', 'rooms', 'flawlessRooms', 'maxCommittedMelee'];
    if (!statNumbers.every(key => Number.isFinite(state.stats[key]) && state.stats[key] >= 0) || state.roomHistory.length !== state.roomsCleared || !state.stats.damageSources || !state.stats.damageByAction) return null;
    if (state.roomHistory.some(visit => !record(visit) || ![...ROOMS, BOSS_ROOM].some(room => room.id === visit.id)) || !record(state.stats.damageSources) || !record(state.stats.damageByAction)) return null; // reward確認會讀visit.id，受傷與槍刺會寫damage字典，truthy primitive不能冒充record。
    if (Object.values(state.stats.damageSources).some(n => !Number.isFinite(n) || n < 0) || Object.values(state.stats.damageByAction).some(n => !Number.isFinite(n) || n < 0)) return null;
    if (!Array.isArray(state.routeOptions) || !Array.isArray(state.rewardOptions) || !Array.isArray(state.stories) || !Array.isArray(state.projectiles)) return null;
    if (state.stories.some(choice => !record(choice) || !STORIES.some(story => story.id === choice.storyId && story.choices.some(option => option.id === choice.choiceId)))) return null; // boss自然死亡結算會find故事欄位，陣列中的null不可留到finishRun才崩潰。
    if (state.story != null && (!record(state.story) || !STORIES.some(story => story.id === state.story.id) || !Array.isArray(state.story.choices) || state.story.choices.some(choice => !record(choice) || !STORIES.find(story => story.id === state.story.id).choices.some(option => option.id === choice.id)))) return null; // route畫面會直接map choices，保存故事ID與選項契約但不覆寫歷史文字。
    if (state.routeOptions.some(r => ![...ROOMS, BOSS_ROOM].some(room => room.id === r.roomId) || !['steady', 'perilous'].includes(r.risk))) return null;
    if (state.rewardOptions.some(r => r.id === 'restore' ? r.kind !== 'heal' || ![32, 45].includes(r.amount) : !byId(TALENTS, r.id) || r.kind !== 'talent')) return null; // 休憩只接受既有32／45回復量，種類損壞不可造成NaN或漏發天賦。
    if (state.rewardOptions.some(r => r.healAmount !== undefined && (r.kind !== 'talent' || ![12, 18].includes(r.healAmount)))) return null;
    if (state.projectiles.some(p => ![p.x, p.z, p.angle, p.speed, p.life, p.damage].every(Number.isFinite))) return null;
    if (state.phase === 'result' && (!state.result || typeof state.result.won !== 'boolean')) return null;
    if (state.phase === 'tutorial' && (!state.tutorial || !Number.isInteger(state.tutorial.step) || state.tutorial.step < 0 || state.tutorial.step > 5)) return null;
    state.room = copy([...ROOMS, TUTORIAL_ROOM, BOSS_ROOM].find(r => r.id === state.room.id));
    state.settings ||= {}; state.events = []; state.effects = []; state.projectiles ||= []; state.pendingWaves ||= [];
    if (state.pendingWaves.some(wave => !Array.isArray(wave) || wave.some(type => !ENEMIES[type]))) return null;
    state.rewardChoices = state.rewardOptions || []; state.routeChoices = state.routeOptions || [];
    state.paused = false; refreshStats(state); state.entrySnapshot = snapshot(state);
    return state;
  } catch { return null; }
}

export { ROOMS, TALENTS, STARTING_TALENTS, ROUTES, CHALLENGES, DIFFICULTIES, STORIES, ENEMIES };
