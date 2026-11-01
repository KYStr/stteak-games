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
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const heightOf = player => player.crouched ? PHYSICS.crouchHeight : PHYSICS.height;
const playerBox = player => new Box3(new Vector3(player.x - PHYSICS.radius, player.y, -.3), new Vector3(player.x + PHYSICS.radius, player.y + heightOf(player), .3));
const solidBox = item => new Box3(new Vector3(item.x - item.w / 2, item.y - item.h / 2, (item.z || 0) - (item.d || 2) / 2), new Vector3(item.x + item.w / 2, item.y + item.h / 2, (item.z || 0) + (item.d || 2) / 2));
const emit = (run, type, text, extra = {}) => run.events.push({ type, text, ...extra });

function freshDevice(device, index) {
  const runtime = { ...device, z: 0, initialX: device.x, initialDir: device.dir, phase: device.phase ?? index * 1.37, state: 'normal', suspicion: 0, disabledUntil: 0, rewired: false, lastSeen: null, searchRemaining: 0, decoyUntil: 0, active: true };
  synchronizeCycle(runtime, 0);
  return runtime;
}

function synchronizeCycle(device, time) {
  if (device.type === 'camera') device.scanOffset = Math.sin((time + device.phase) * .62) * 1.05;
  if (device.type === 'laser') {
    const phase = ((time + device.phase) % device.period + device.period) % device.period;
    device.active = phase < device.onTime;
    device.cycleRemaining = device.active ? device.onTime - phase : device.period - phase;
  }
}

export function createRun(levelIndex = 0, checkpoint = null) {
  const safeIndex = clamp(Math.floor(Number(levelIndex) || 0), 0, LEVELS.length - 1);
  const level = LEVELS[safeIndex];
  const run = {
    levelIndex: safeIndex, levelId: level.id, seed: 1009 + safeIndex * 97,
    player: { x: level.spawn.x, y: level.spawn.y, z: 0, vx: 0, vy: 0, facing: 1, grounded: true, crouched: false, animation: 'idle', coyote: PHYSICS.coyote, jumpBuffer: 0, climbing: false },
    devices: level.devices.map(freshDevice), time: 0, alerts: 0, alertTime: 0, suspicion: 0, alertState: 'normal',
    phase: 'playing', objectives: [], packet: false, tools: [...level.supplies], selectedTool: 0,
    checkpoint: null, checkpointReached: false, checkpointIndex: -1, hackProgress: 0, hackTarget: null, prompt: '', events: [],
    catches: 0, lastFailure: null, route: 'ground', traveled: 0,
    _solids: [...level.platforms, ...level.covers].map(item => ({ ...item, box: solidBox(item) })),
  };
  if (checkpoint) return restoreRun(checkpoint, safeIndex);
  return run;
}

/** Exact 3D line segment versus the same solid geometry used by collision. */
export function lineBlocked(run, from, to) {
  const origin = new Vector3(from.x, from.y, from.z || 0);
  const delta = new Vector3(to.x, to.y, to.z || 0).sub(origin);
  const length = delta.length();
  if (length < .001) return false;
  const ray = new Ray(origin, delta.normalize());
  const hit = new Vector3();
  return run._solids.some(solid => {
    if (!ray.intersectBox(solid.box, hit)) return false;
    const hitDistance = hit.distanceTo(origin);
    return hitDistance > .025 && hitDistance < length - .025;
  });
}

export function visionFor(device) {
  const slope = device.type === 'camera' ? -.28 : device.type === 'drone' ? -.23 : -.025;
  const heading = Math.atan2(slope, device.dir) + (device.scanOffset || 0);
  return { origin: { x: device.x, y: device.y + (device.type === 'guard' ? 1.25 : 0), z: 0 }, direction: new Vector3(Math.cos(heading), Math.sin(heading), 0), halfAngle: (device.type === 'drone' ? 43 : 34) * Math.PI / 180, range: device.range };
}

export function getVision(device, run) {
  const active = !device.rewired && device.disabledUntil <= run.time && (device.type !== 'laser' || device.active);
  if (device.type === 'laser') return { origin: { x: device.x, y: device.y, z: 0 }, endpoint: { x: device.x, y: device.y + device.range, z: 0 }, direction: { x: 0, y: 1, z: 0 }, halfAngle: 0, range: device.range, active };
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
    for (const solid of run._solids) {
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
  if (device.rewired || device.disabledUntil > run.time || device.type === 'laser') return false;
  const vision = visionFor(device);
  const h = heightOf(player);
  return [h * .82, h * .4].some(offset => {
    const target = { x: player.x, y: player.y + offset, z: player.z || 0 };
    const delta = new Vector3(target.x - vision.origin.x, target.y - vision.origin.y, target.z - vision.origin.z);
    const length = delta.length();
    if (length > vision.range || length < .025) return false;
    if (delta.normalize().dot(vision.direction) < Math.cos(vision.halfAngle)) return false;
    return !lineBlocked(run, vision.origin, target);
  });
}

export function toolTarget(run, index = run.selectedTool) {
  const p = run.player;
  const origin = { x: p.x, y: p.y + .65, z: 0 };
  const limit = [8, 11, 5][index];
  if (limit == null) return null;
  return run.devices.filter(device => {
    if (device.rewired || device.disabledUntil > run.time) return false;
    if (index === 0 && !['camera', 'drone', 'laser'].includes(device.type)) return false;
    if (index === 1 && (device.type !== 'guard' || device.decoyUntil > run.time)) return false;
    if (index === 2 && !['laser', 'camera'].includes(device.type)) return false;
    const target = { x: device.x, y: device.y + (device.type === 'guard' ? 1.1 : device.type === 'laser' ? 1 : 0), z: 0 };
    return distance(origin, target) <= limit && !lineBlocked(run, origin, target);
  }).sort((a, b) => distance(p, a) - distance(p, b))[0] || null;
}

export function useTool(run) {
  const index = run.selectedTool;
  const target = toolTarget(run, index);
  if (run.phase !== 'playing') return false;
  if (!run.tools[index]) { emit(run, 'tool-failed', '這項工具已用完；仍可觀察巡邏或改走另一條路。'); return false; }
  if (!target) { emit(run, 'tool-failed', '範圍內沒有可作用且未被遮擋的目標。'); return false; }
  run.tools[index]--;
  if (index === 0) {
    target.disabledUntil = run.time + 8; target.state = 'disabled'; target.suspicion = 0; target.tripAt = null;
    emit(run, 'tool', '干擾成功 · 設備暫停 8 秒', { tool: index, target: target.id });
  } else if (index === 1) {
    target.lastSeen = { x: clamp(run.player.x + run.player.facing * 8, target.min, target.max), y: target.y };
    target.decoyUntil = run.time + 7; target.searchRemaining = 7; target.state = 'searching'; target.suspicion = 0;
    emit(run, 'tool', '誘餌成功 · 守衛調查聲音 7 秒', { tool: index, target: target.id });
  } else {
    target.rewired = true; target.disabledUntil = Infinity; target.state = 'disabled'; target.suspicion = 0;
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

function movePlayer(run, input, dt) {
  const p = run.player;
  const level = LEVELS[run.levelIndex];
  const axis = clamp(Number(input.axis) || 0, -1, 1);
  p.jumpBuffer = input.jumpPressed ? PHYSICS.buffer : Math.max(0, p.jumpBuffer - dt);
  p.coyote = p.grounded ? PHYSICS.coyote : Math.max(0, p.coyote - dt);
  if (axis) p.facing = axis > 0 ? 1 : -1;
  if (input.crouch) p.crouched = p.grounded;
  else if (p.crouched) {
    const standing = { ...p, crouched: false };
    if (!run._solids.some(solid => solid.box.intersectsBox(playerBox({ ...standing, y: p.y + .02 })))) p.crouched = false;
  }
  const ladder = level.ladders.find(l => Math.abs(p.x - l.x) < .75 && p.y >= l.y0 - .12 && p.y <= l.y1 + .12);
  const wantsClimb = input.up && ladder && p.y < ladder.y1 - .01 && p.jumpBuffer <= 0;
  if (wantsClimb || (p.climbing && ladder && !axis && !input.jumpPressed && !input.crouch)) {
    p.climbing = true; p.crouched = false; p.x += (ladder.x - p.x) * Math.min(1, dt * 16); p.vx = 0; p.vy = 0;
    if (input.up) p.y = Math.min(ladder.y1, p.y + 2.7 * dt);
    p.grounded = p.y >= ladder.y1;
    if (p.grounded) { p.climbing = false; p.coyote = PHYSICS.coyote; }
    p.animation = 'ladder'; return;
  }
  p.climbing = false;
  if (p.jumpBuffer > 0 && p.coyote > 0 && !p.crouched) {
    p.vy = PHYSICS.jumpSpeed; p.grounded = false; p.coyote = 0; p.jumpBuffer = 0;
    emit(run, 'jump', '');
  }
  if (!input.jumpHeld && p.vy > 4.5) p.vy = 4.5;
  const acceleration = p.grounded ? 42 : 28;
  const targetSpeed = axis * (p.crouched ? PHYSICS.crouchSpeed : PHYSICS.speed);
  p.vx += clamp(targetSpeed - p.vx, -acceleration * dt, acceleration * dt);
  const oldX = p.x;
  let nextX = clamp(p.x + p.vx * dt, 1, level.length - 1);
  const h = heightOf(p);
  let climbed = false;
  for (const solid of run._solids) {
    const b = solid.box;
    if (p.y + h <= b.min.y + .015 || p.y >= b.max.y - .015 || b.max.z < -.3 || b.min.z > .3) continue;
    if (nextX + PHYSICS.radius > b.min.x && nextX - PHYSICS.radius < b.max.x) {
      // A facing ledge within arm reach has an explicit climb action and real landing face.
      const topDelta = b.max.y - p.y;
      if ((input.up || input.jumpHeld) && topDelta > .05 && topDelta <= 1.55 && p.vy >= -2 && !p.crouched) {
        const candidate = { ...p, x: nextX, y: b.max.y + .02 };
        if (!run._solids.some(other => other !== solid && other.box.intersectsBox(playerBox(candidate)))) {
          p.y = b.max.y; p.vy = 0; p.grounded = true; p.animation = 'climb'; climbed = true;
          emit(run, 'climb', ''); continue;
        }
      }
      if (p.vx > 0) nextX = b.min.x - PHYSICS.radius;
      else if (p.vx < 0) nextX = b.max.x + PHYSICS.radius;
      p.vx = 0;
    }
  }
  p.x = nextX;
  run.traveled += Math.abs(p.x - oldX);
  if (climbed) return;
  const oldY = p.y;
  p.vy -= PHYSICS.gravity * dt;
  let nextY = oldY + p.vy * dt;
  p.grounded = false;
  for (const solid of run._solids) {
    const b = solid.box;
    if (p.x + PHYSICS.radius <= b.min.x + .005 || p.x - PHYSICS.radius >= b.max.x - .005 || b.max.z < -.3 || b.min.z > .3) continue;
    if (p.vy <= 0 && oldY >= b.max.y - .025 && nextY <= b.max.y) { nextY = Math.max(nextY, b.max.y); p.vy = 0; p.grounded = true; }
    else if (p.vy > 0 && oldY + h <= b.min.y + .02 && nextY + h >= b.min.y) { nextY = b.min.y - h; p.vy = 0; }
  }
  p.y = nextY;
  p.animation = !p.grounded ? p.vy > 0 ? 'jump' : 'fall' : p.crouched ? 'crouch' : Math.abs(p.vx) > .15 ? 'run' : 'idle';
  if (p.y > 2.5) run.route = 'upper';
  if (p.y < -8) catchPlayer(run, '墜落至維修區下方。');
}

function catchPlayer(run, reason) {
  if (run.phase !== 'playing') return;
  run.phase = 'caught'; run.player.animation = 'caught'; run.player.vx = 0; run.player.vy = 0;
  run.lastFailure = { x: run.player.x, y: run.player.y, time: run.time, reason };
  emit(run, 'caught', reason);
}

function moveDevice(run, device, amount) {
  let next = device.x + amount;
  if (device.type === 'guard') {
    for (const solid of run._solids) {
      const b = solid.box;
      if (device.y + 1.6 <= b.min.y + .015 || device.y >= b.max.y - .015 || b.max.z < -.3 || b.min.z > .3) continue;
      if (next + .32 > b.min.x && next - .32 < b.max.x) next = amount > 0 ? b.min.x - .32 : b.max.x + .32;
    }
  }
  device.x = next;
}

function patrol(run, device, dt) {
  if (device.type !== 'guard' && device.type !== 'drone') return;
  if (device.x >= device.max) device.dir = -1;
  if (device.x <= device.min) device.dir = 1;
  moveDevice(run, device, device.dir * device.speed * dt);
}

function updateDevices(run, dt) {
  let maxSuspicion = 0;
  let priority = 0;
  const priorities = { normal: 0, suspicious: 1, searching: 2, tracking: 3 };
  for (const device of run.devices) {
    if (device.rewired || device.disabledUntil > run.time) { device.state = 'disabled'; device.active = false; device.suspicion = 0; continue; }
    device.active = true;
    if (device.state === 'disabled') device.state = 'normal';
    synchronizeCycle(device, run.time);
    if (device.type === 'laser') {
      const p = run.player;
      const intersects = device.active && Math.abs(p.x - device.x) < .39 && p.y < device.y + device.range && p.y + heightOf(p) > device.y;
      // A tripwire records a breach, then visibly counts down before sounding.
      // Sprinting through in one frame cannot erase the recorded crossing.
      if (intersects && !device.tripLatched) { device.tripAt = run.time; device.tripLatched = true; }
      if (!intersects) device.tripLatched = false;
      if (device.tripAt != null) device.suspicion = Math.min(1, (run.time - device.tripAt) / .75);
      else device.suspicion = Math.max(0, device.suspicion - dt * .8);
      if (device.tripAt != null && device.suspicion >= 1 && device.state !== 'tracking') {
        device.state = 'tracking'; device.searchRemaining = 5; run.alerts++; emit(run, 'alarm', '雷射感應到通行 · 警報已記錄', { deviceId: device.id });
        device.tripAt = null;
      } else if (!intersects && device.state === 'tracking') device.state = 'searching';
      if (device.state === 'searching') { device.searchRemaining -= dt; if (device.searchRemaining <= 0) device.state = 'normal'; }
      if (device.state === 'normal' || device.state === 'suspicious') device.state = device.suspicion > .02 ? 'suspicious' : 'normal';
    } else {
      const visible = canSee(run, device);
      const distracted = device.decoyUntil > run.time;
      if (visible && !distracted) {
        device.suspicion = Math.min(1, device.suspicion + dt / .8);
        if (device.suspicion >= 1) {
          if (device.state !== 'tracking') { run.alerts++; emit(run, 'alarm', '追蹤開始 · 躲入遮擋，離開最後目擊位置', { deviceId: device.id }); }
          device.state = 'tracking'; device.lastSeen = { x: run.player.x, y: run.player.y }; device.searchRemaining = 6;
        } else if (device.state !== 'tracking') device.state = 'suspicious';
      } else {
        device.suspicion = Math.max(0, device.suspicion - dt * .55);
        if (device.state === 'tracking') { device.state = 'searching'; device.searchRemaining = 6; }
        if (device.state === 'suspicious' && device.suspicion <= .02) device.state = 'normal';
      }
      if (device.state === 'tracking') {
        if (device.type === 'guard' || device.type === 'drone') {
          const delta = device.lastSeen.x - device.x;
          if (Math.abs(delta) > .15) { device.dir = Math.sign(delta); moveDevice(run, device, device.dir * (device.type === 'guard' ? 3.1 : 2.2) * dt); }
        }
        if (device.type === 'guard' && visible && Math.abs(device.x - run.player.x) < .74 && Math.abs(device.y - run.player.y) < 1.15) catchPlayer(run, '守衛抵達了你的位置。換一條路，或先引開巡邏。');
      } else if (device.state === 'searching') {
        device.searchRemaining = Math.max(0, device.searchRemaining - dt);
        if ((device.type === 'guard' || device.type === 'drone') && device.lastSeen) {
          const delta = device.lastSeen.x - device.x;
          if (Math.abs(delta) > .15) { device.dir = Math.sign(delta); moveDevice(run, device, device.dir * device.speed * 1.15 * dt); }
        }
        if (device.searchRemaining <= 0 && !distracted) { device.state = 'normal'; device.lastSeen = null; device.suspicion = 0; }
      } else patrol(run, device, dt);
    }
    maxSuspicion = Math.max(maxSuspicion, device.suspicion);
    priority = Math.max(priority, priorities[device.state] || 0);
  }
  run.suspicion = maxSuspicion;
  run.alertState = ['normal', 'suspicious', 'searching', 'tracking'][priority];
  if (priority >= 2) run.alertTime += dt;
}

function updateObjectives(run, input, dt) {
  const level = LEVELS[run.levelIndex];
  const p = run.player;
  const terminal = level.terminals.find(item => !run.objectives.includes(item.id) && Math.abs(item.x - p.x) < 1.4 && Math.abs(item.y - p.y) < .65);
  run.prompt = terminal ? `按住 W／互動 · ${terminal.label}` : '';
  if (terminal && (input.up || input.interactPressed) && p.grounded && Math.abs(p.vx) < .3) {
    if (run.hackTarget !== terminal.id) run.hackProgress = 0;
    run.hackTarget = terminal.id; run.hackProgress = Math.min(1, run.hackProgress + dt / 1.05); p.animation = 'hack';
    if (run.hackProgress >= 1) {
      run.objectives.push(terminal.id); run.hackProgress = 0; run.hackTarget = null;
      emit(run, 'objective', `${terminal.label} · ${terminal.kind === 'data' ? '取得完成' : '改寫完成'}`, { id: terminal.id });
    }
  } else { run.hackProgress = 0; run.hackTarget = null; }
  if (!run.packet && Math.abs(p.x - level.packet.x) < 1 && Math.abs(p.y - level.packet.y) < 1) { run.packet = true; emit(run, 'packet', '可選資料包已取得 · 本關全資料獎章已備妥'); }
  const checkpoints = level.checkpoints || [level.checkpoint];
  const reachedIndex = checkpoints.findIndex((point, index) => index > run.checkpointIndex && Math.abs(p.x - point.x) < 1.5 && Math.abs(p.y - point.y) < .5);
  if (reachedIndex >= 0 && run.objectives.length > 0 && run.alertState !== 'tracking' && run.alertState !== 'searching') {
    run.checkpointReached = true; run.checkpointIndex = reachedIndex; run.checkpoint = makeSnapshot(run);
    emit(run, 'checkpoint', `安全 checkpoint ${reachedIndex + 1}/${checkpoints.length} 已保存`);
  }
  if (Math.abs(p.x - level.exit.x) < 1.6 && Math.abs(p.y - level.exit.y) < .7) {
    if (run.objectives.length === level.terminals.length) {
      run.phase = 'complete'; p.vx = 0; p.animation = 'idle';
      emit(run, 'complete', '訊號送達 · 任務完成', { medals: medalsFor(run) });
    } else run.prompt = `出口未解鎖 · 尚有 ${level.terminals.length - run.objectives.length} 個任務節點`;
  }
}

export function step(run, input = {}, delta = 1 / 60) {
  run.events = [];
  if (run.phase !== 'playing' || !Number.isFinite(delta) || delta <= 0) return run.events;
  if (input.cyclePressed) { run.selectedTool = (run.selectedTool + 1) % TOOL_DEFS.length; emit(run, 'tool-selected', TOOL_DEFS[run.selectedTool].name); }
  if (input.toolPressed) useTool(run);
  // Bounded substeps: frame rate changes cannot skip a thin collider or laser.
  let remaining = Math.min(delta, .1);
  let first = true;
  while (remaining > .000001 && run.phase === 'playing') {
    const dt = Math.min(remaining, 1 / 120);
    run.time += dt;
    const subInput = first ? input : { ...input, jumpPressed: false, interactPressed: false };
    movePlayer(run, subInput, dt);
    updateDevices(run, dt);
    if (run.phase === 'playing') updateObjectives(run, subInput, dt);
    first = false; remaining -= dt;
  }
  return run.events;
}

export function medalsFor(run) {
  return { speed: run.time <= LEVELS[run.levelIndex].timeTarget, ghost: run.alerts === 0, data: run.packet };
}

function makeSnapshot(run) {
  const level = LEVELS[run.levelIndex];
  const point = level.checkpoints?.[Math.max(0, run.checkpointIndex)] || level.checkpoint;
  return {
    schema: 1, levelIndex: run.levelIndex, levelId: run.levelId, levelRevision: level.revision || 1, checkpointIndex: Math.max(0, run.checkpointIndex), seed: run.seed,
    x: point.x, y: point.y,
    time: run.time, alerts: run.alerts, alertTime: run.alertTime, objectives: [...run.objectives], packet: run.packet,
    tools: [...run.tools], selectedTool: run.selectedTool, devices: run.devices.map(device => ({ ...device, disabledUntil: Number.isFinite(device.disabledUntil) ? device.disabledUntil : 0 })),
  };
}

export function checkpointSnapshot(run) { return run.checkpoint ? copy(run.checkpoint) : null; }

export function restoreRun(snapshot, fallbackLevel = 0) {
  if (!snapshot || snapshot.schema !== 1 || !Number.isInteger(snapshot.levelIndex) || !LEVELS[snapshot.levelIndex] || snapshot.levelId !== LEVELS[snapshot.levelIndex].id) return createRun(fallbackLevel);
  if ((snapshot.levelRevision || 1) !== (LEVELS[snapshot.levelIndex].revision || 1)) return createRun(snapshot.levelIndex);
  const run = createRun(snapshot.levelIndex);
  const level = LEVELS[run.levelIndex];
  run.checkpointIndex = clamp(Number.isInteger(snapshot.checkpointIndex) ? snapshot.checkpointIndex : 0, 0, (level.checkpoints?.length || 1) - 1);
  const point = level.checkpoints?.[run.checkpointIndex] || level.checkpoint;
  run.seed = 1009 + run.levelIndex * 97;
  run.player.x = point.x; run.player.y = point.y;
  run.time = Number.isFinite(snapshot.time) ? clamp(snapshot.time, 0, 86400) : 0;
  run.alerts = Number.isFinite(snapshot.alerts) ? clamp(Math.floor(snapshot.alerts), 0, 100000) : 0;
  run.alertTime = Number.isFinite(snapshot.alertTime) ? clamp(snapshot.alertTime, 0, run.time) : 0;
  run.objectives = level.terminals.filter(t => Array.isArray(snapshot.objectives) && snapshot.objectives.includes(t.id)).map(t => t.id);
  run.packet = snapshot.packet === true;
  run.tools = level.supplies.map((max, i) => Number.isInteger(snapshot.tools?.[i]) ? clamp(snapshot.tools[i], 0, max) : 0);
  run.selectedTool = Number.isInteger(snapshot.selectedTool) ? clamp(snapshot.selectedTool, 0, 2) : 0;
  // Only known devices and finite bounded positions are restored; serialized data is untrusted.
  for (const device of run.devices) {
    const saved = Array.isArray(snapshot.devices) ? snapshot.devices.find(d => d?.id === device.id) : null;
    if (!saved) continue;
    if (Number.isFinite(saved.x)) device.x = clamp(saved.x, device.min, device.max);
    device.dir = saved.dir === -1 ? -1 : 1;
    device.rewired = saved.rewired === true;
    device.disabledUntil = Number.isFinite(saved.disabledUntil) ? clamp(saved.disabledUntil, 0, run.time + 8) : 0;
    device.state = device.rewired || device.disabledUntil > run.time ? 'disabled' : 'normal';
    synchronizeCycle(device, run.time);
  }
  run.checkpointReached = true; run.checkpoint = makeSnapshot(run);
  return run;
}
