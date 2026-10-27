import test from 'node:test';
import assert from 'node:assert/strict';
import { LEVELS, ENDINGS } from '../../../games/signal-zero/src/levels.js';
import { createRun, step, canSee, lineBlocked, getVision, visionPolygon, toolTarget, useTool, checkpointSnapshot, restoreRun, PHYSICS } from '../../../games/signal-zero/src/core.js';
import { defaultSave, validateSave, writeSave, loadSave, recordCompletion, SAVE_KEY, SAVE_BACKUP_KEY } from '../../../games/signal-zero/src/save.js';

const advance = (run, seconds, input = {}, fps = 60) => { for (let n = 0; n < Math.round(seconds * fps); n++) step(run, input, 1 / fps); };
const calm = index => { const run = createRun(index); run.devices = []; return run; };
const memoryStorage = () => { const map = new Map(); return { getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) }; };

test('six authored maps retain finite floor geometry, reachable ladders, objectives and complete endings', () => {
  assert.equal(LEVELS.length, 6);
  assert.equal(new Set(LEVELS.map(l => l.region)).size, 3);
  for (const level of LEVELS) {
    assert.ok(level.terminals.length >= 2);
    assert.equal(new Set(level.devices.map(d => d.type)).size >= 2, true);
    assert.ok(level.length >= 900 && level.length <= 1200);
    assert.ok(level.platforms.filter(p => p.ground).length > 1);
    assert.ok(level.sectors.length >= 6);
    assert.ok(level.ladders.length >= 4);
    for (const ladder of level.ladders) assert.ok(level.platforms.some(p => Math.abs(p.y + p.h / 2 - ladder.y1) < .01 && Math.abs(ladder.x - p.x) <= p.w / 2));
    assert.ok(level.packet.y > 0);
    assert.ok(level.exit.x > level.terminals.at(-1).x);
    assert.ok(level.supplies.every(n => n > 0));
  }
  assert.equal(ENDINGS.length, 2);
  assert.ok(ENDINGS.every(e => e.title && e.text.length > 50));
});

test('30 and 60 FPS produce the same jump apex and landing, with variable jump height', () => {
  const jump = (fps, releaseAt) => {
    const run = calm(0); let apex = 0;
    for (let frame = 0; frame < fps * 2; frame++) {
      step(run, { jumpPressed: frame === 0, jumpHeld: frame / fps < releaseAt }, 1 / fps);
      apex = Math.max(apex, run.player.y);
    }
    assert.ok(run.player.grounded); assert.equal(run.player.y, 0);
    return apex;
  };
  const high30 = jump(30, 1), high60 = jump(60, 1), low = jump(60, .08);
  assert.ok(high60 > 2.4 && high60 < 2.7);
  assert.ok(Math.abs(high30 - high60) < .02);
  assert.ok(low < high60 - .7);
});

test('100ms coyote and 120ms landing buffer accept forgiving inputs', () => {
  const coyote = calm(0);
  coyote.player.y = .2; coyote.player.grounded = false; coyote.player.coyote = .1;
  advance(coyote, .05);
  step(coyote, { jumpPressed: true, jumpHeld: true });
  assert.ok(coyote.player.vy > 9);
  const buffered = calm(0);
  buffered.player.y = .13; buffered.player.vy = -3; buffered.player.grounded = false; buffered.player.coyote = 0;
  step(buffered, { jumpPressed: true, jumpHeld: true });
  advance(buffered, .08, { jumpHeld: true });
  assert.ok(buffered.player.y > .3); assert.ok(buffered.player.vy > 0);
});

test('physical covers stop walking; jumping climbs a real top; ladders land on roof geometry', () => {
  const run = calm(0); run.player.x = 10;
  advance(run, 1, { axis: 1 });
  assert.ok(run.player.x < 11);
  step(run, { axis: 1, jumpPressed: true, jumpHeld: true });
  advance(run, .25, { axis: 1, jumpHeld: true });
  assert.ok(run.player.y >= 1.2);
  const ladder = calm(0); ladder.player.x = 13.5;
  advance(ladder, 1.5, { up: true });
  assert.ok(Math.abs(ladder.player.y - 3.4) < .01);
  assert.ok(ladder.player.grounded);
});

test('21 3D sight cases cover front, rear, range, vertical/depth bounds and real occlusion', () => {
  const run = createRun(0);
  for (const type of ['guard', 'camera', 'drone']) {
    const device = { id: type, type, x: 8, y: type === 'guard' ? 0 : 1.25, dir: 1, range: 9, disabledUntil: 0, rewired: false, scanOffset: 0 };
    const player = { x: 10, y: 0, z: 0, crouched: false };
    assert.ok(canSee(run, device, player), `${type} front`);
    assert.equal(canSee(run, device, { ...player, x: 4 }), false, `${type} rear`);
    assert.equal(canSee(run, device, { ...player, x: 30 }), false, `${type} range`);
    assert.equal(canSee(run, device, { ...player, y: 12 }), false, `${type} above cone`);
    assert.equal(canSee(run, device, { ...player, z: 9 }), false, `${type} depth`);
    assert.equal(canSee(run, device, { ...player, x: 13, crouched: true }), false, `${type} cover`);
    assert.ok(canSee(run, device, { ...player, x: 13 }), `${type} exposed head`);
  }
  assert.ok(lineBlocked(run, { x: 8, y: .8, z: 0 }, { x: 13, y: .8, z: 0 }));
});

test('rendered vision rays terminate at actual solids and use the same cone definition', () => {
  const run = createRun(0);
  const guard = { ...run.devices[0], x: 8, dir: 1 };
  const vision = getVision(guard, run);
  const polygon = visionPolygon(guard, run);
  assert.equal(polygon.length, 27);
  assert.deepEqual(polygon[0], vision.origin);
  assert.ok(polygon.some(p => Math.abs(p.x - 11.1) < .02));
  guard.disabledUntil = 4;
  assert.deepEqual(visionPolygon(guard, run), []);
});

test('exposure offers at least 700ms, raises alarm, then searches last seen position and clears', () => {
  const run = createRun(0);
  run.player.x = 7;
  run.devices = [{ ...run.devices[0], x: 3, min: 3, max: 3, dir: 1, speed: 0 }];
  advance(run, .7);
  assert.equal(run.alerts, 0); assert.equal(run.phase, 'playing');
  advance(run, .15);
  assert.equal(run.alerts, 1); assert.equal(run.devices[0].state, 'tracking');
  const last = { ...run.devices[0].lastSeen };
  run.player.x = 60; run.player.y = 3.4;
  advance(run, .2);
  assert.equal(run.devices[0].state, 'searching');
  assert.deepEqual(run.devices[0].lastSeen, last);
  advance(run, 6.1);
  assert.equal(run.devices[0].state, 'normal'); assert.equal(run.devices[0].lastSeen, null);
});

test('laser phase has observable safe windows and never causes instant capture', () => {
  const run = createRun(1); run.player.x = 25;
  const laser = run.devices.find(d => d.type === 'laser'); run.devices = [laser]; laser.phase = 0;
  advance(run, .7);
  assert.equal(run.alerts, 0); assert.equal(run.phase, 'playing');
  advance(run, .1);
  assert.equal(run.alerts, 1); assert.equal(run.phase, 'playing');
  run.player.x = 40;
  advance(run, 3);
  assert.equal(laser.active, false);
  assert.equal(getVision(laser, run).active, false);
});

test('all tools reject incompatible or occluded targets without charge consumption', () => {
  for (let i = 0; i < 3; i++) {
    const run = createRun(0); run.selectedTool = i; run.player.x = 3;
    const before = [...run.tools];
    assert.equal(useTool(run), false);
    assert.deepEqual(run.tools, before);
  }
  const run = createRun(0); run.player.x = 10; run.player.crouched = true; run.selectedTool = 1;
  run.devices = [{ ...run.devices[0], x: 13, y: 0 }];
  assert.equal(toolTarget(run), null);
  assert.equal(useTool(run), false);
});

test('three tools have bounded, distinct legal effects and subtract exactly one charge', () => {
  for (let index = 0; index < 3; index++) {
    const run = createRun(0); run.player.x = 5; run.selectedTool = index;
    const type = index === 1 ? 'guard' : 'camera';
    run.devices = [{ ...run.devices.find(d => d.type === type), x: 8, y: type === 'guard' ? 0 : 1.5, min: 1, max: 10 }];
    const before = run.tools[index];
    assert.equal(useTool(run), true); assert.equal(run.tools[index], before - 1);
    const device = run.devices[0];
    if (index === 0) assert.equal(device.disabledUntil, 8);
    if (index === 1) { assert.equal(device.state, 'searching'); assert.equal(device.decoyUntil, 7); }
    if (index === 2) assert.equal(device.rewired, true);
  }
});

test('each tool checks every security type ten times and never spends on an illegal target', () => {
  const supported = [['camera', 'drone', 'laser'], ['guard'], ['camera', 'laser']];
  for (let tool = 0; tool < 3; tool++) {
    for (const type of ['guard', 'camera', 'drone', 'laser']) {
      for (let attempt = 0; attempt < 10; attempt++) {
        const run = createRun(0); run.selectedTool = tool;
        run.devices = [{ id: 'fixture', type, x: 6 + attempt * .1, y: type === 'guard' || type === 'laser' ? 0 : 1.2, min: 1, max: 10, dir: 1, disabledUntil: 0, rewired: false, decoyUntil: 0 }];
        const charge = run.tools[tool]; const legal = supported[tool].includes(type);
        assert.equal(useTool(run), legal, `${tool}/${type}/${attempt}`);
        assert.equal(run.tools[tool], charge - (legal ? 1 : 0));
        const blocked = createRun(0); blocked.selectedTool = tool; blocked.player.x = 10;
        blocked.devices = [{ id: 'fixture', type, x: 13, y: type === 'guard' || type === 'laser' ? 0 : .9, min: 1, max: 20, dir: -1, disabledUntil: 0, rewired: false, decoyUntil: 0 }];
        assert.equal(useTool(blocked), false, `${tool}/${type}/${attempt}/wall`);
        assert.equal(blocked.tools[tool], LEVELS[0].supplies[tool]);
      }
    }
    const terminalOnly = createRun(0); terminalOnly.devices = []; terminalOnly.player.x = LEVELS[0].terminals[0].x; terminalOnly.selectedTool = tool;
    for (let attempt = 0; attempt < 10; attempt++) assert.equal(useTool(terminalOnly), false);
    assert.equal(terminalOnly.tools[tool], LEVELS[0].supplies[tool]);
  }
});

test('six missions complete objectives, optional data, a safe checkpoint and an unlocked exit without tools', () => {
  for (let index = 0; index < LEVELS.length; index++) {
    const run = calm(index); const level = LEVELS[index]; run.tools = [0, 0, 0];
    // Interaction contract, separate from route traversal: each authored objective is reachable on ground.
    for (const terminal of level.terminals) {
      run.player.x = terminal.x; run.player.y = terminal.y; run.player.vx = 0;
      advance(run, 1.2, { up: true });
      assert.ok(run.objectives.includes(terminal.id), `${level.id}/${terminal.id}`);
    }
    run.player.x = level.checkpoint.x; run.player.y = 0;
    step(run, {});
    assert.ok(checkpointSnapshot(run));
    run.player.x = level.packet.x; run.player.y = level.packet.y;
    step(run, {}); assert.equal(run.packet, true);
    run.player.x = level.exit.x; run.player.y = 0;
    step(run, {}); assert.equal(run.phase, 'complete');
    assert.deepEqual(run.tools, [0, 0, 0]);
  }
});

test('checkpoint round trip fixes position and patrol snapshot; tool use is never refunded by reload', () => {
  const run = createRun(0);
  run.player.x = LEVELS[0].checkpoint.x; run.objectives = ['frequency'];
  step(run, {});
  const snapshot = checkpointSnapshot(run); assert.ok(snapshot);
  const a = restoreRun(snapshot), b = restoreRun(snapshot);
  assert.deepEqual(a.devices, b.devices); assert.deepEqual(a.tools, b.tools);
  run.player.x = 32; run.player.y = 0; run.selectedTool = 0;
  assert.equal(useTool(run), true);
  const after = restoreRun(checkpointSnapshot(run));
  assert.equal(after.tools[0], LEVELS[0].supplies[0] - 1);
  for (let i = 0; i < 5; i++) assert.equal(restoreRun(checkpointSnapshot(after)).tools[0], LEVELS[0].supplies[0] - 1);
  assert.equal(after.player.x, LEVELS[0].checkpoint.x);
});

test('finished and caught states do not advance timing or award further events', () => {
  for (const phase of ['complete', 'caught']) {
    const run = createRun(0); run.phase = phase;
    advance(run, 30, { axis: 1, toolPressed: true });
    assert.equal(run.time, 0); assert.equal(run.player.x, 3); assert.deepEqual(run.events, []);
  }
});

test('save corruption recovers a valid backup; unavailable storage fails visibly without throwing', () => {
  const storage = memoryStorage();
  const data = defaultSave(); data.unlocked = 2;
  assert.equal(writeSave(data, storage).ok, true);
  data.unlocked = 3; assert.equal(writeSave(data, storage).ok, true);
  storage.setItem(SAVE_KEY, '{oops');
  const recovered = loadSave(storage);
  assert.equal(recovered.data.unlocked, 2); assert.match(recovered.warning, /備份/);
  assert.ok(storage.getItem(SAVE_BACKUP_KEY));
  const denied = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); } };
  assert.ok(loadSave(denied).warning); assert.equal(writeSave(data, denied).ok, false);
  assert.equal(validateSave({ schema: 999 }), null);
  assert.equal(validateSave({ schema: 1, unlocked: 900 }).unlocked, 6);
});

test('completion accumulates independent medals and bests while preserving a chosen ending', () => {
  const run = createRun(0); run.phase = 'complete'; run.objectives = LEVELS[0].terminals.map(t => t.id);
  run.time = LEVELS[0].timeTarget + 30; run.alerts = 0; run.packet = true;
  const initial = defaultSave(); initial.endings = ['voices'];
  const first = recordCompletion(initial, run);
  assert.deepEqual(first.medals.antenna, { speed: false, ghost: true, data: true });
  assert.equal(first.unlocked, 2);
  const replay = createRun(0); Object.assign(replay, { phase: 'complete', objectives: [...run.objectives], time: 50, alerts: 3, packet: false });
  const second = recordCompletion(first, replay);
  assert.deepEqual(second.medals.antenna, { speed: true, ghost: true, data: true });
  assert.equal(second.bests.antenna.alerts, 0); assert.equal(second.bests.antenna.time, 50);
  assert.deepEqual(second.endings, ['voices']);
});

test('each chapter restores both safe checkpoints five times with identical phase, tools and progress', () => {
  for (let index = 0; index < LEVELS.length; index++) {
    const run = createRun(index); const level = LEVELS[index];
    run.objectives = [level.terminals[0].id]; run.tools = [1, 2, 0];
    for (const [checkpointIndex, point] of level.checkpoints.entries()) {
      run.player.x = point.x; run.player.y = point.y; run.player.vx = 0;
      step(run, {});
      assert.equal(run.checkpointIndex, checkpointIndex);
      const snapshot = checkpointSnapshot(run);
      let previous = restoreRun(snapshot);
      for (let i = 0; i < 5; i++) {
        const restored = restoreRun(checkpointSnapshot(previous));
        assert.equal(restored.player.x, point.x);
        assert.equal(restored.checkpointIndex, checkpointIndex);
        assert.deepEqual(restored.tools, [1, 2, 0]);
        assert.deepEqual(restored.objectives, run.objectives);
        assert.deepEqual(restored.devices, previous.devices);
        previous = restored;
      }
    }
  }
});

test('storage round trips preserve all authored devices and post-checkpoint permanent rewires', () => {
  for (const [index, level] of LEVELS.entries()) {
    const run = createRun(index), storage = memoryStorage(), save = defaultSave();
    save.unlocked = LEVELS.length;
    run.objectives = [level.terminals[0].id];
    run.player.x = level.checkpoints[1].x;
    run.time = 70;
    step(run, {});
    assert.ok(run.checkpoint);
    const target = run.devices.slice(16).find(d => d.type === 'laser' || d.type === 'camera');
    assert.ok(target, 'expanded chapter has a later electronic device');
    run.player.x = target.x; run.player.y = target.y + (target.type === 'laser' ? .35 : -.65);
    run.selectedTool = 2;
    assert.equal(toolTarget(run)?.id, target.id);
    assert.equal(useTool(run), true);
    save.checkpoint = checkpointSnapshot(run);
    save.checkpoint.devices.push({id:'unknown-injected-device', rewired:true});
    for (let n = 0; n < 5; n++) {
      assert.equal(writeSave(save, storage).ok, true);
      const reloaded = loadSave(storage);
      assert.equal(reloaded.warning, '');
      assert.deepEqual(reloaded.data.checkpoint.devices.map(d => d.id), level.devices.map(d => d.id));
      const restored = restoreRun(reloaded.data.checkpoint);
      assert.equal(restored.devices.find(d => d.id === target.id).rewired, true);
      assert.equal(restored.devices.find(d => d.id === target.id).state, 'disabled');
      assert.deepEqual(restored.tools, run.tools);
      assert.deepEqual(restored.devices.map(d => [d.id,d.x,d.dir]), restoreRun(checkpointSnapshot(run)).devices.map(d => [d.id,d.x,d.dir]));
      save.checkpoint = checkpointSnapshot(restored);
    }
  }
});

test('final exit survives reload before an ending choice and never overwrites prior ending history', () => {
  const storage = memoryStorage(); const run = createRun(5);
  Object.assign(run, { phase: 'complete', objectives: LEVELS[5].terminals.map(t => t.id), time: 320 });
  const prior = defaultSave(); prior.endings = ['voices']; prior.settings.touchControls = 'on';
  const completed = recordCompletion(prior, run);
  assert.equal(completed.pendingEnding, true);
  assert.equal(writeSave(completed, storage).ok, true);
  for (let i = 0; i < 5; i++) {
    const reloaded = loadSave(storage).data;
    assert.equal(reloaded.pendingEnding, true);
    assert.equal(reloaded.settings.touchControls, 'on');
    assert.deepEqual(reloaded.endings, ['voices']);
    assert.equal(reloaded.bests.broadcast.completions, 1);
  }
  completed.pendingEnding = false; completed.endings.push('freedom');
  writeSave(completed, storage);
  assert.equal(loadSave(storage).data.pendingEnding, false);
  assert.deepEqual(loadSave(storage).data.endings, ['voices', 'freedom']);
});

function traverseMission(index, route = 'ground', startWait = 0, ghost = false, fps = 60) {
  const run = createRun(index); if (!ghost) run.tools = [0, 0, 0];
  const level = LEVELS[index];
  const actions = level.terminals.map(t => ({ kind: 'hack', x: t.x, y: t.y, id: t.id }));
  if (route === 'upper') {
    const skipIntro = [-1, 2, 1, 1, 2, 2][index];
    for (const [n, entry] of level.upperEntries.entries()) if (!ghost || n !== skipIntro) actions.push({ kind: 'ladder', x: entry.x, y: entry.y1 });
  }
  actions.push({ kind: 'exit', x: level.exit.x, y: 0 });
  actions.sort((a, b) => a.x - b.x);
  const trace = [];
  const alarms = [];
  const toolUses = [];
  let observationSeconds = 0;
  let elevatedDistance = 0;
  let jumpUntil = 0;
  advance(run, startWait, {}, fps);
  for (const action of actions) {
    let frames = 0;
    while (run.phase === 'playing' && frames++ < fps * 180) {
      const p = run.player;
      const delta = action.x - p.x;
      const near = Math.abs(delta) < .25;
      const coverAhead = level.covers.some(c => Math.abs(c.x - p.x) < 2.3 && (c.x - p.x) * Math.sign(delta) > 0 && p.y < c.y + c.h / 2 - .05 && c.y - c.h / 2 < p.y + PHYSICS.height);
      const guardAhead = run.devices.some(d => d.type === 'guard' && Math.abs(d.x - p.x) < 2.6 && (d.x - p.x) * Math.sign(delta) > 0 && Math.abs(d.y - p.y) < 1.2);
      const support = level.platforms.find(platform => Math.abs(platform.y + platform.h / 2 - p.y) < .06 && p.x >= platform.x - platform.w / 2 - .1 && p.x <= platform.x + platform.w / 2 + .1);
      const edge = support ? support.x + support.w / 2 : Infinity;
      const landing = support && level.platforms.some(platform => platform !== support && platform.x - platform.w / 2 > edge + .05 && platform.x - platform.w / 2 < edge + 3.2 && platform.y + platform.h / 2 >= p.y - 1.5 && platform.y + platform.h / 2 <= p.y + 1.3);
      const gapAhead = p.grounded && landing && edge - p.x < .5 && edge - p.x > -.15;
      if (gapAhead) jumpUntil = run.time + .7;
      const input = { axis: near ? 0 : Math.sign(delta), jumpHeld: run.time < jumpUntil || route === 'upper' || p.y < .9, jumpPressed: p.grounded && !near && (coverAhead || guardAhead || gapAhead), up: near && action.kind !== 'exit' };
      if (ghost) {
        const beam = run.devices.find(device => device.type === 'laser' && !device.rewired && device.disabledUntil <= run.time && device.x - p.x > .8 && device.x - p.x < 2.1 && p.y < device.y + device.range);
        if (beam && (beam.active || beam.cycleRemaining < .75)) { input.axis = 0; input.jumpPressed = false; observationSeconds += 1 / fps; }
        const threat = run.devices.find(device => device.type !== 'laser' && device.disabledUntil <= run.time && !device.rewired && !(device.decoyUntil > run.time) && canSee(run, device));
        if (threat) {
          let selected = threat.type === 'drone' ? 0 : threat.type === 'guard' ? 1 : 2;
          if (threat.type === 'camera' && threat.suspicion > .65 && !toolTarget(run, 2) && run.tools[0] > 0) selected = 0;
          const target = toolTarget(run, selected);
          if (target?.id === threat.id && run.tools[selected] > 0) {
            if (run.selectedTool !== selected) input.cyclePressed = true;
            else input.toolPressed = true;
          }
        }
      }
      const previousX = p.x;
      const events = step(run, input, 1 / fps);
      if (p.y > 3) elevatedDistance += Math.abs(p.x - previousX);
      for (const event of events) {
        if (event.type === 'alarm') alarms.push({ id: event.deviceId, x: +p.x.toFixed(2), time: +run.time.toFixed(2) });
        if (event.type === 'tool') toolUses.push({ tool: event.tool, target: event.target, x: +p.x.toFixed(2), time: +run.time.toFixed(2) });
      }
      if (action.kind === 'hack' && run.objectives.includes(action.id)) break;
      if (action.kind === 'ladder' && Math.abs(p.x - action.x) < 2.5 && p.y >= action.y - .02) break;
      if (run.phase === 'complete') break;
    }
    trace.push({ action: action.kind, x: action.x, actualX: +run.player.x.toFixed(2), y: +run.player.y.toFixed(2), time: +run.time.toFixed(2), alerts: run.alerts, phase: run.phase });
    if (frames >= fps * 180 || run.phase !== 'playing') break;
  }
  return { run, trace, alarms, toolUses, observationSeconds, elevatedDistance };
}

test('pure input traversal diagnostics for both authored routes', () => {
  const results = [];
  for (let index = 0; index < 6; index++) {
    for (const route of ['ground', 'upper']) {
      const { run, trace, elevatedDistance } = traverseMission(index, route);
      results.push({ level: LEVELS[index].id, route, elevatedDistance: +elevatedDistance.toFixed(2), phase: run.phase, time: +run.time.toFixed(2), alerts: run.alerts, trace });
    }
  }
  console.log('ROUTE_DIAGNOSTICS ' + JSON.stringify(results.map(({ trace, ...result }) => result)));
  assert.ok(results.every(result => result.phase === 'complete'), 'each route must complete using step input only');
  assert.ok(results.filter(result => result.route === 'ground').every(result => result.elevatedDistance < 100), 'the ground route stays below the elevated bridges');
  assert.ok(results.filter(result => result.route === 'upper').every(result => result.elevatedDistance > 600), 'the upper route traverses a distinct elevated route');
});

test('zero-alarm routes use finite tools, observation and real input', () => {
  const results = [];
  for (let index = 0; index < 6; index++) {
    const { run, alarms, toolUses, observationSeconds } = traverseMission(index, 'upper', 0, true);
    results.push({ level: LEVELS[index].id, phase: run.phase, time: +run.time.toFixed(2), alerts: run.alerts, remainingTools: run.tools, observationSeconds: +observationSeconds.toFixed(2), alarms, toolUses });
  }
  console.log('GHOST_DIAGNOSTICS ' + JSON.stringify(results));
  assert.ok(results.every(result => result.phase === 'complete' && result.alerts === 0), 'all maps must have a demonstrated zero-alarm route');
});

test('all twelve full input routes remain completable at 30 FPS', () => {
  const baseline = [[227.72, 238.76], [233.05, 247.79], [236.37, 251.24], [241.59, 256.07], [245.67, 260.77], [248.87, 264.01]];
  const results = [];
  for (let index = 0; index < LEVELS.length; index++) {
    for (const [routeIndex, route] of ['ground', 'upper'].entries()) {
      const { run } = traverseMission(index, route, 0, false, 30);
      results.push({ level: LEVELS[index].id, route, phase: run.phase, time: +run.time.toFixed(2), drift: +(run.time - baseline[index][routeIndex]).toFixed(2) });
    }
  }
  console.log('FPS30_DIAGNOSTICS ' + JSON.stringify(results));
  assert.ok(results.every(result => result.phase === 'complete'));
  assert.ok(results.every(result => Math.abs(result.drift) < 3), 'frame rate does not materially change route reachability or completion time');
});
