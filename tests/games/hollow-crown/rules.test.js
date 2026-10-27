import test from 'node:test';
import assert from 'node:assert/strict';
import { createRun, step, shapeHits, lineClear, blocked, findPath, checkpoint, restoreRun, chooseReward, enterRoom, startTutorial, chooseStory, combineModifiers, ROOMS, TALENTS, STARTING_TALENTS, ENEMIES } from '../../../public/games/hollow-crown/rules.js';

function simulate(state, seconds, input = {}) {
  for (let i = 0; i < Math.ceil(seconds * 60); i++) step(state, input, 1 / 60);
  return state;
}
function makeEnemy(type = 'soldier', x = 0, z = 2.4) {
  const spec = ENEMIES[type];
  return { id: 'test-enemy', type, x, z, angle: Math.PI, hp: spec.hp, maxHp: spec.hp, radius: spec.radius, state: 'idle', timer: 100, stateDuration: 100, attack: null, phase: 1, moveIndex: 0, burn: 0, burnTick: 0, shieldBroken: 0, attackHit: false };
}
function arena(type = 'soldier') {
  const state = createRun({ seed: 11 });
  state.room.obstacles = []; state.enemies = [makeEnemy(type)]; state.pendingWaves = [];
  Object.assign(state.player, { x: 0, z: 0, angle: 0, invuln: 0 });
  return state;
}
function light(state) { step(state, { attackPressed: true, aimX: 0, aimZ: 8 }, 1 / 60); simulate(state, .45, { aimX: 0, aimZ: 8 }); }
function charge(state) {
  step(state, { attackPressed: true, attackHeld: true, aimX: 0, aimZ: 8 }, 1 / 60);
  simulate(state, .8, { attackHeld: true, aimX: 0, aimZ: 8 });
  step(state, { attackReleased: true, aimX: 0, aimZ: 8 }, 1 / 60);
  simulate(state, .5, { aimX: 0, aimZ: 8 });
}
function incoming(state, { shape = 'line', range = 3, width = 1, radius = 3, innerRadius = 1, source = 'soldier', x = 0, z = 2 } = {}) {
  const enemy = state.enemies[0];
  Object.assign(enemy, { x, z, state: 'telegraph', timer: .001, stateDuration: .8, attackHit: false, attack: { shape, x, z, heading: Math.PI, range, width, angle: 1.3, radius, innerRadius, damage: 20, source, recovery: 1, activeTime: .18, projectiles: 0 } });
}
function forceClear(state) {
  for (const enemy of state.enemies) { enemy.hp = 0; enemy.state = 'dead'; }
  state.pendingWaves = [];
  step(state, {}, .02);
}

test('pacing follow-up: six templates retain later waves and perilous adds one second-wave enemy without delay', () => {
  const originalTemplates = structuredClone(ROOMS);
  for (const room of ROOMS) for (let cleared = 0; cleared < 4; cleared++) for (const risk of ['steady', 'perilous']) {
    const state = createRun({ seed: 8801, difficulty: 'standard' });
    state.phase = 'camp'; state.roomsCleared = cleared;
    assert.equal(enterRoom(state, room.id, risk), true);
    const waves = [room.roster, [...room.extra, ...(risk === 'perilous' ? [room.roster[0]] : [])]];
    if (cleared >= 2) waves.push([room.roster[0], room.extra[0], room.roster.at(-1)]);
    assert.deepEqual(state.pendingWaves, waves.slice(1));
    for (let wave = 0; wave < waves.length; wave++) {
      const alive = state.enemies.filter(enemy => enemy.hp > 0);
      assert.deepEqual(alive.map(enemy => enemy.type), waves[wave]);
      alive.forEach(enemy => assert.equal(enemy.maxHp, Math.round(ENEMIES[enemy.type].hp * (risk === 'perilous' ? 1.15 : 1))));
      for (const enemy of alive) { enemy.hp = 0; enemy.state = 'dead'; }
      const elapsed = state.roomElapsed;
      step(state, {}, .02);
      assert.ok(state.roomElapsed - elapsed <= .020001);
      if (wave < waves.length - 1) {
        assert.equal(state.phase, 'combat');
        assert.equal(state.wave, wave + 2);
        assert.equal(state.events.at(-1).text, `第 ${wave + 2} 波守衛進場`);
      } else assert.equal(state.phase, 'reward');
    }
  }
  assert.deepEqual(ROOMS, originalTemplates);
});

test('pacing follow-up: talent healing grants the displayed 12 or 18 once and caps at maximum HP', () => {
  for (const [risk, amount] of [['steady', 12], ['perilous', 18]]) for (const hp of [40, 119]) {
    const state = createRun({ seed: 8802 }); state.roomRisk = risk; forceClear(state);
    state.player.hp = hp; state.player.energy = 0;
    const choice = state.rewardOptions.find(option => option.kind === 'talent');
    assert.equal(choice.healAmount, amount);
    assert.equal(chooseReward(state, 'missing-reward'), false); assert.equal(state.player.hp, hp);
    assert.equal(chooseReward(state, choice.id), true);
    assert.equal(state.player.hp, Math.min(120, hp + amount));
    assert.equal(state.player.energy, state.player.maxEnergy);
    assert.equal(chooseReward(state, choice.id), false);
    assert.equal(state.player.hp, Math.min(120, hp + amount));
  }
});

test('pacing follow-up: full slots require valid replacement before healing', () => {
  const state = createRun({ seed: 8803 }); forceClear(state); state.player.hp = 40;
  const choice = state.rewardOptions.find(option => option.kind === 'talent');
  state.talents = TALENTS.filter(talent => talent.id !== choice.id).slice(0, 4).map(talent => talent.id);
  const before = [...state.talents];
  for (const replaceId of [null, 'missing-talent']) {
    assert.equal(chooseReward(state, choice.id, replaceId), false);
    assert.equal(state.player.hp, 40); assert.deepEqual(state.talents, before);
  }
  assert.equal(chooseReward(state, choice.id, before[0]), true);
  assert.equal(state.player.hp, 52); assert.equal(state.talents.length, 4);
  assert.ok(state.talents.includes(choice.id)); assert.ok(!state.talents.includes(before[0]));
  assert.equal(chooseReward(state, choice.id, before[1]), false); assert.equal(state.player.hp, 52);
});

test('pacing follow-up: saved healing offers survive reload and legacy rewards grant zero new healing', () => {
  for (const risk of ['steady', 'perilous']) for (const legacy of [false, true]) {
    const state = createRun({ seed: 8804 }); state.roomRisk = risk; forceClear(state); state.player.hp = 40;
    if (legacy) state.rewardOptions.forEach(option => { delete option.healAmount; });
    const choice = state.rewardOptions.find(option => option.kind === 'talent');
    const expected = legacy ? 0 : risk === 'perilous' ? 18 : 12;
    let restored = restoreRun(checkpoint(state)); assert.ok(restored);
    assert.deepEqual(restored.rewardOptions, state.rewardOptions);
    assert.equal(chooseReward(restored, choice.id), true); assert.equal(restored.player.hp, 40 + expected);
    restored = restoreRun(checkpoint(restored)); assert.ok(restored);
    assert.equal(chooseReward(restored, choice.id), false); assert.equal(restored.player.hp, 40 + expected);
  }
});

test('pacing follow-up: dedicated rest stays 32 or 45 with no talent healing added', () => {
  for (const [risk, amount] of [['steady', 32], ['perilous', 45]]) for (const hp of [40, 119]) {
    const state = createRun({ seed: 8805 }); state.roomRisk = risk; forceClear(state); state.player.hp = hp;
    const talents = [...state.talents];
    assert.equal(chooseReward(state, 'restore'), true);
    assert.equal(state.player.hp, Math.min(120, hp + amount)); assert.deepEqual(state.talents, talents);
    assert.equal(chooseReward(state, 'restore'), false); assert.equal(state.player.hp, Math.min(120, hp + amount));
  }
});

test('pacing follow-up: corrupt added healing amounts are rejected while old missing fields remain valid', () => {
  const state = createRun({ seed: 8806 }); forceClear(state);
  const saved = checkpoint(state);
  for (const invalid of [null, NaN, -1, 0, 99, '12']) {
    const bad = structuredClone(saved);
    bad.run.rewardOptions.find(option => option.kind === 'talent').healAmount = invalid;
    assert.equal(restoreRun(bad), null);
  }
  const wrongKind = structuredClone(saved);
  wrongKind.run.rewardOptions.find(option => option.kind === 'heal').healAmount = 12;
  assert.equal(restoreRun(wrongKind), null);
  saved.run.rewardOptions.forEach(option => { delete option.healAmount; });
  assert.ok(restoreRun(saved));
});

test('content contains six distinct rooms, five enemy classes, two three-move bosses, twelve talents and six starts', () => {
  assert.equal(ROOMS.length, 6); assert.equal(new Set(ROOMS.map(r => JSON.stringify(r.obstacles))).size, 6);
  assert.equal(TALENTS.length, 12); assert.equal(STARTING_TALENTS.length, 6);
  assert.equal(Object.values(ENEMIES).filter(e => !e.boss).length, 5);
  for (const boss of Object.values(ENEMIES).filter(e => e.boss)) assert.equal(boss.moves.length, 3);
});

test('fixed seed, input and room choices produce the same entire state', () => {
  const a = createRun({ seed: 5678 }), b = createRun({ seed: 5678 });
  for (let frame = 0; frame < 1200; frame++) {
    const input = { moveX: Math.sin(frame / 60), moveZ: Math.cos(frame / 60), autoAim: true, attackPressed: frame % 30 === 0, dodge: frame % 91 === 0 };
    step(a, input, 1 / 60); step(b, input, 1 / 60);
  }
  assert.deepEqual(a, b);
});

test('light thrust works with zero energy, hits once, and ends its active window', () => {
  const state = arena(); state.player.energy = 0;
  light(state);
  assert.equal(state.enemies[0].hp, 35); assert.equal(state.stats.damageDealt, 25); assert.equal(state.stats.attacks, 1);
  simulate(state, .5); assert.equal(state.enemies[0].hp, 35);
});

test('charge consumes energy and breaks frontal shields; normal thrust must flank', () => {
  const frontal = arena('shield'); light(frontal);
  assert.equal(frontal.enemies[0].hp, 95);
  charge(frontal); assert.ok(frontal.enemies[0].hp < 95); assert.ok(frontal.enemies[0].shieldBroken > 0);
  const flank = arena('shield'); flank.enemies[0].angle = 0; light(flank); assert.equal(flank.enemies[0].hp, 70);
});

test('empty energy converts an otherwise valid charge into a normal thrust', () => {
  const state = arena('shield'); state.player.energy = 0;
  charge(state); assert.equal(state.enemies[0].shieldBroken, 0); assert.equal(state.enemies[0].hp, 95);
});

test('same-frame dodge wins twenty times against every close-range enemy and boss pattern', () => {
  for (const [type, spec] of Object.entries(ENEMIES)) {
    const attacks = spec.boss ? spec.moves : [{ ...spec, range: spec.reach, radius: spec.reach, source: type }];
    for (const attack of attacks) for (let repetition = 0; repetition < 20; repetition++) {
      const state = arena(type); state.player.x = attack.shape === 'ring' ? 4 : 0;
      incoming(state, { ...attack, source: attack.id || type, x: 0, z: 0 });
      step(state, { dodge: true, moveX: 1 }, 1 / 60);
      assert.equal(state.player.hp, 120, `${type}/${attack.id || type}/${repetition}`);
      assert.equal(state.stats.dodges, 1);
    }
  }
});

test('every weapon shape has repeatable inner, outer, side and annulus boundaries', () => {
  const attacks = [
    { shape: 'line', range: 3.15, width: .82 }, { shape: 'line', range: 4.2, width: 1.1 },
    ...Object.values(ENEMIES).flatMap(spec => spec.boss ? spec.moves : [{ ...spec, range: spec.reach, radius: spec.reach }]),
  ];
  for (const data of attacks) for (let i = 0; i < 20; i++) {
    const attack = { ...data, x: 1, z: -2, heading: .37 };
    const r = data.radius || data.range, radius = .2;
    const point = (forward, side = 0) => ({ x: attack.x + Math.sin(attack.heading) * forward + Math.cos(attack.heading) * side, z: attack.z + Math.cos(attack.heading) * forward - Math.sin(attack.heading) * side, radius });
    const inner = data.shape === 'ring' ? (data.innerRadius + r) / 2 : Math.min(1, r * .5);
    assert.equal(shapeHits(attack, point(inner)), true, `inside ${data.id || data.shape}`);
    assert.equal(shapeHits(attack, point(r + radius + .02)), false, `outside ${data.id || data.shape}`);
    if (data.shape === 'line') assert.equal(shapeHits(attack, point(1, data.width / 2 + radius + .02)), false);
    if (data.shape === 'ring') assert.equal(shapeHits(attack, point(0)), false);
  }
});

test('parry requires a fresh frontal guard; held guard chips and cannot loop free healing', () => {
  const fresh = arena(); incoming(fresh); step(fresh, { block: true, aimX: 0, aimZ: 3 }, .02);
  assert.equal(fresh.stats.parries, 1); assert.equal(fresh.player.hp, 120); assert.equal(fresh.enemies[0].hp, 31);
  const early = arena(); simulate(early, .6, { block: true, aimX: 0, aimZ: 3 }); incoming(early);
  step(early, { block: true, aimX: 0, aimZ: 3 }, .02); assert.equal(early.stats.parries, 0); assert.equal(early.stats.blocks, 1); assert.equal(early.player.hp, 115);
  const rear = arena(); incoming(rear); step(rear, { block: true, aimX: 0, aimZ: -3 }, .02); assert.equal(rear.stats.parries, 0); assert.equal(rear.player.hp, 100);
});

test('obstacles stop movement, player spear hits, hostile strikes and projectile segments', () => {
  const state = arena(); state.room.obstacles = [{ x: 0, z: 1.2, w: 2, d: .6 }];
  light(state); assert.equal(state.enemies[0].hp, 60);
  incoming(state); step(state, {}, .02); assert.equal(state.player.hp, 120);
  simulate(state, 1, { moveZ: 1 }); assert.ok(state.player.z <= .48);
  assert.equal(lineClear(state.room, 0, 0, 0, 3), false); assert.equal(lineClear(state.room, 3, 0, 3, 3), true);
  assert.equal(blocked(state.room, 0, 1.2, .1), true);
});

test('all six rooms preserve valid movement and obstruction across their corners', () => {
  for (const room of ROOMS) {
    const state = arena(); state.room = structuredClone(room); state.player.invuln = 100;
    for (const [x, z] of [[-8.8, -8.8], [8.8, -8.8], [-8.8, 8.8], [8.8, 8.8]]) {
      Object.assign(state.player, { x, z }); simulate(state, .5, { moveX: x, moveZ: z });
      assert.ok(Math.abs(state.player.x) <= 9.08 && Math.abs(state.player.z) <= 9.08);
      assert.equal(blocked(state.room, state.player.x, state.player.z, state.player.radius - .01), false);
    }
  }
});

test('ten mixed enemy groups, three repeats never exceed two committed melee attackers', () => {
  const types = ['soldier', 'spear', 'crossbow', 'beetle', 'shield'];
  for (let group = 0; group < 10; group++) for (let repeat = 0; repeat < 3; repeat++) {
    const state = arena(); state.player.invuln = 100;
    state.enemies = Array.from({ length: 7 }, (_, i) => ({ ...makeEnemy(types[(i + group) % 5], Math.sin(i) * 3.5, Math.cos(i) * 3.5), id: `g${i}`, timer: i * .03 }));
    simulate(state, 7, {});
    assert.ok(state.stats.maxCommittedMelee <= 2, `group ${group} repeat ${repeat}: ${state.stats.maxCommittedMelee}`);
  }
});

test('boss moves cycle through three readable attacks and second phase has a safe transition', () => {
  for (const type of ['regent', 'arbiter']) {
    const state = arena(type); state.player.invuln = 100; state.enemies[0].z = 2; state.enemies[0].timer = 0;
    const enemy = state.enemies[0]; const seen = new Set();
    for (let frame = 0; frame < 2400; frame++) {
      step(state, {}, 1 / 60);
      if (enemy.attack) { seen.add(enemy.attack.source); assert.ok(enemy.attack.windup >= .65); }
    }
    assert.equal(seen.size, 3);
    enemy.hp = enemy.maxHp * .49; enemy.state = 'approach'; step(state, {}, .02);
    assert.equal(enemy.phase, 2); assert.equal(enemy.state, 'recover'); assert.equal(enemy.attack, null); assert.ok(enemy.timer > 1.5);
    simulate(state, 2); assert.notEqual(enemy.state, 'dead'); assert.ok(enemy.hp > 0);
  }
});

test('each talent modifier is composed once, bounded to four slots, with three schools supported', () => {
  for (const talent of TALENTS) {
    assert.deepEqual(combineModifiers([talent.id, talent.id]), combineModifiers([talent.id]));
    for (const [key, amount] of Object.entries(talent.modifiers)) {
      const base = combineModifiers([])[key], actual = combineModifiers([talent.id])[key];
      assert.equal(actual, key.endsWith('Multiplier') ? base * amount : base + amount);
    }
  }
  assert.equal(new Set(TALENTS.map(t => t.school)).size, 3);
  assert.deepEqual(combineModifiers(TALENTS.map(t => t.id)), combineModifiers(TALENTS.slice(0, 4).map(t => t.id)));
});

test('burn and mercy effects are finite and charged burn combinations cannot produce recursive damage', () => {
  const state = arena('regent'); state.talents = ['kindling', 'furnace-tip', 'coal-heart', 'mercy-ember'];
  state.modifiers = combineModifiers(state.talents); light(state);
  simulate(state, 4); assert.ok(state.stats.damageDealt > 25); assert.ok(state.stats.damageDealt < 100); assert.ok(state.player.hp <= 120);
  const damage = state.stats.damageDealt; simulate(state, 2); assert.equal(state.stats.damageDealt, damage);
});

test('reward confirmation, four-slot replacement, three story choices and four-room routing form a closed loop', () => {
  for (const route of ['ash', 'ivory']) {
    const state = createRun({ seed: 44, route });
    for (let room = 0; room < 4; room++) {
      forceClear(state); assert.equal(state.phase, 'reward'); assert.equal(state.roomsCleared, room + 1);
      if (state.story) { const storyId = state.story.id; assert.equal(chooseStory(state, state.story.choices[0].id), true); assert.equal(state.stories.at(-1).storyId, storyId); }
      const choice = state.rewardOptions.find(c => c.kind === 'talent');
      if (state.talents.length === 4) { assert.equal(chooseReward(state, choice.id), false); assert.equal(state.phase, 'reward'); assert.equal(chooseReward(state, choice.id, state.talents[0]), true); }
      else assert.equal(chooseReward(state, choice.id), true);
      assert.ok(state.talents.length <= 4); assert.equal(state.phase, 'route');
      const next = state.routeOptions[0]; assert.equal(enterRoom(state, next.roomId, next.risk), true);
    }
    assert.equal(state.roomIndex, 4); assert.equal(ENEMIES[state.enemies[0].type].boss, true);
    forceClear(state); assert.equal(state.phase, 'result'); assert.equal(state.result.won, true); assert.equal(state.result.rooms.length, 5); assert.equal(state.result.tutorial, false);
    assert.equal(state.stories.length, 3); assert.equal(state.result.skinUnlock, 'ember');
    const frozen = JSON.stringify(state); step(state, { attackPressed: true }, .1); assert.equal(JSON.stringify(state), frozen);
  }
});

test('single-school challenges enforce talent restrictions and daily seeds override user seeds', () => {
  for (const startTalent of ['fleet-ash', 'wide-oath', 'kindling']) {
    const state = createRun({ challenge: 'single-school', startTalent }); forceClear(state);
    assert.ok(state.rewardOptions.filter(c => c.kind === 'talent').every(c => c.school === state.school));
  }
  assert.equal(createRun({ challenge: 'daily', seed: 99 }).seed, createRun({ challenge: 'daily', seed: 20 }).seed);
});

test('save restores room-entry seed, equipment and health instead of farming combat progress', () => {
  const state = createRun({ seed: 899 });
  const entry = checkpoint(state); simulate(state, 6, { autoAim: true });
  const saved = checkpoint(state); assert.deepEqual(saved.run, entry.run);
  const restored = restoreRun(saved); assert.ok(restored); assert.equal(restored.player.hp, 120); assert.equal(restored.time, 0);
  for (let i = 0; i < 10; i++) assert.deepEqual(restoreRun(checkpoint(restored)).enemies, entry.run.enemies);
});

test('clear-room rewards persist identically through ten restores and grant only once', () => {
  const state = createRun({ seed: 800 }); forceClear(state);
  const expected = structuredClone(state.rewardOptions);
  for (let i = 0; i < 10; i++) {
    const restored = restoreRun(checkpoint(state)); assert.deepEqual(restored.rewardOptions, expected);
    assert.equal(chooseReward(restored, expected[0].id), true); assert.equal(chooseReward(restored, expected[0].id), false);
    assert.equal(restored.talents.filter(id => id === expected[0].id).length, 1);
  }
});

test('malformed, missing, unknown-version and non-finite saves safely return null', () => {
  for (const bad of [null, {}, { schema: 900, run: {} }, { schema: 1, run: {} }, 'broken']) assert.equal(restoreRun(bad), null);
  const changes = [s => delete s.run.player.cooldown, s => s.run.player.hp = null, s => s.run.enemies[0].type = 'unknown', s => s.run.talents.push('unknown'), s => s.run.stats.parries = -1, s => s.run.room.id = 'unknown', s => s.run.pendingWaves = [['unknown']]];
  for (const change of changes) { const saved = checkpoint(createRun()); change(saved); assert.equal(restoreRun(saved), null); }
});

test('twenty telegraph pauses keep enemy and player timing exactly unchanged', () => {
  const state = arena(); incoming(state); state.enemies[0].timer = .6; state.paused = true;
  const original = JSON.stringify(state);
  for (let i = 0; i < 20; i++) step(state, { moveX: 1, dodge: true, attackPressed: true }, .5);
  assert.equal(JSON.stringify(state), original);
  state.paused = false; step(state, {}, .02); assert.ok(state.enemies[0].timer < .6);
});

test('death, victory and restart each repeat ten times without duplicate final events', () => {
  for (let i = 0; i < 10; i++) {
    const loss = arena(); loss.player.hp = 1; incoming(loss); step(loss, {}, .02);
    assert.equal(loss.phase, 'result'); assert.equal(loss.result.won, false);
    simulate(loss, 1); assert.equal(loss.events.filter(e => e.type === 'loss').length, 1);
    const win = createRun({ seed: i + 1 }); win.roomsCleared = 4; win.roomHistory = Array.from({ length: 4 }, (_, n) => ({ id: ROOMS[n].id })); win.phase = 'route'; win.routeOptions = [{ roomId: 'crown-arena', risk: 'steady' }]; enterRoom(win, 'crown-arena'); forceClear(win);
    simulate(win, 1); assert.equal(win.events.filter(e => e.type === 'win').length, 1);
    const restart = createRun({ seed: i + 1 }); assert.equal(restart.phase, 'combat'); assert.equal(restart.stats.kills, 0); assert.equal(restart.enemies.length, 3); assert.equal(restart.player.hp, 120);
  }
});

test('tutorial advances by actual movement, light hit, dodge, parry and defeat', () => {
  const state = startTutorial({ practiceWindow: .7 });
  simulate(state, .4, { moveX: 1 }); assert.equal(state.tutorial.step, 1);
  Object.assign(state.player, { x: 0, z: 2.3, angle: Math.PI });
  step(state, { attackPressed: true, aimX: 0, aimZ: 0 }, .02); simulate(state, .45, { aimX: 0, aimZ: 0 }); assert.equal(state.tutorial.step, 2);
  step(state, { dodge: true, moveX: 1 }, .02); simulate(state, .35); assert.equal(state.tutorial.step, 3);
  Object.assign(state.player, { x: 0, z: 0, angle: 0, invuln: 0 }); incoming(state);
  step(state, { block: true, aimX: 0, aimZ: 3 }, .02); assert.equal(state.tutorial.step, 4); assert.ok(state.enemies[0].hp > 0); assert.notEqual(state.enemies[0].state, 'dead');
  state.enemies[0].hp = 0; state.enemies[0].state = 'dead'; simulate(state, .1);
  assert.equal(state.tutorial.done, true); assert.equal(state.result.tutorial, true); assert.equal(state.result.skinUnlock, null);
});

test('slow frames preserve input edges and attack damage while zero and invalid deltas do nothing', () => {
  const fast = arena(), slow = arena(); fast.player.invuln = 5; slow.player.invuln = 5;
  step(fast, { attackPressed: true, aimX: 0, aimZ: 8 }, 1 / 60); simulate(fast, .45);
  step(slow, { attackPressed: true, aimX: 0, aimZ: 8 }, .5);
  assert.equal(slow.stats.attacks, 1); assert.equal(fast.stats.damageDealt, slow.stats.damageDealt);
  const before = JSON.stringify(slow); for (const dt of [0, -1, NaN, Infinity]) step(slow, { dodge: true }, dt); assert.equal(JSON.stringify(slow), before);
});

test('hitstop freezes simulation briefly and preserves a dodge pressed during the frozen frame', () => {
  const state = arena(); step(state, { attackPressed: true, aimX: 0, aimZ: 8 }, .1);
  assert.ok(state.hitStop > .02); const time = state.time;
  step(state, { dodge: true }, .01); assert.equal(state.time, time); assert.equal(state.stats.dodges, 0);
  step(state, {}, .1); assert.equal(state.stats.dodges, 1); assert.equal(state.player.action, 'dodge');
});

test('enemy navigation crosses around a pillar instead of oscillating forever', () => {
  const state = createRun({ seed: 22 }); state.player.invuln = 100;
  simulate(state, 18);
  const soldier = state.enemies[0];
  assert.ok(Math.hypot(soldier.x - state.player.x, soldier.z - state.player.z) < 2.2);
  assert.ok(findPath(state.room, { x: -5, z: -4 }, state.player, .5).length > 0);
});

test('all twelve talents change their promised live combat or movement outcome', () => {
  const equip = (id, type = 'regent') => {
    const s = arena(type); s.talents = id ? [id] : []; s.modifiers = combineModifiers(s.talents); s.player.maxEnergy = s.modifiers.maxEnergy; return s;
  };
  const fleet = equip('fleet-ash'), slow = equip(null); simulate(fleet, .5, { moveX: 1 }); simulate(slow, .5, { moveX: 1 }); assert.ok(fleet.player.x > slow.player.x * 1.13);
  const stride = equip('long-stride'), regular = equip(null); step(stride, { dodge: true, moveX: 1 }, .02); step(regular, { dodge: true, moveX: 1 }, .02); simulate(stride, .3); simulate(regular, .3); assert.ok(stride.player.x > regular.player.x * 1.2); assert.ok(stride.player.energy > regular.player.energy);
  const wind = equip('returning-wind'); step(wind, { dodge: true, moveX: 1 }, .02); simulate(wind, .35); wind.player.x = 0; light(wind); assert.equal(wind.stats.damageByAction.light, 33.75);
  const breath = equip('deep-breath'); breath.player.energy = 0; simulate(breath, .5); assert.equal(breath.player.maxEnergy, 120); assert.ok(breath.player.energy > 13);
  const oath = equip('wide-oath'); Object.assign(oath.player, { action: 'block', blockAge: .26, wasBlocking: true }); incoming(oath); step(oath, { block: true, aimX: 0, aimZ: 3 }, .02); assert.equal(oath.stats.parries, 1);
  const thorn = equip('thorn-vow'); incoming(thorn); step(thorn, { block: true, aimX: 0, aimZ: 3 }, .02); assert.equal(thorn.stats.damageByAction.counter, 29 * 1.55);
  const stone = equip('steady-guard'); Object.assign(stone.player, { action: 'block', blockAge: .8, wasBlocking: true }); incoming(stone); step(stone, { block: true, aimX: 0, aimZ: 3 }, .02); assert.equal(stone.stats.damageTaken, 2.5);
  const mercy = equip('mercy-ember'); mercy.player.hp = 100; incoming(mercy); step(mercy, { block: true, aimX: 0, aimZ: 3 }, .02); assert.equal(mercy.player.hp, 103); assert.ok(mercy.player.healCooldown > 2.9);
  const fire = equip('kindling'); light(fire); simulate(fire, 3.5); assert.ok(fire.stats.damageByAction.burn >= 14);
  const coal = equip('coal-heart'), plain = equip(null); charge(coal); charge(plain); assert.equal(coal.stats.damageByAction.charge, plain.stats.damageByAction.charge * 1.3); assert.ok(coal.player.energy < plain.player.energy);
  const furnace = equip('furnace-tip'); furnace.enemies[0].burn = 2; light(furnace); assert.equal(furnace.stats.damageByAction.light, 31.25);
  const last = equip('last-light'); last.player.hp = 40; light(last); assert.equal(last.stats.damageByAction.light, 32.5);
});

// Rules-only bot: sees exact tell geometry and timers; it is not UI, device or human usability evidence.
function playSimulation({ route, startTalent, seed, loadout = null }) {
  const state = createRun({ route, startTalent, seed, difficulty: 'standard' });
  if (loadout) { state.talents = [...loadout]; state.modifiers = combineModifiers(loadout); state.player.maxEnergy = state.modifiers.maxEnergy; }
  let held = false, heldFor = 0, path = [], pathAge = 0;
  for (let frame = 0; frame < 60 * 60 * 20 && state.phase !== 'result'; frame++) {
    if (state.phase === 'reward') {
      if (state.story) chooseStory(state, state.story.choices[0].id);
      const choices = state.rewardOptions.filter(c => c.kind === 'talent' && c.school === state.school);
      const reward = loadout || state.player.hp < 75 ? state.rewardOptions.find(c => c.kind === 'heal') : choices[0] || state.rewardOptions.find(c => c.kind === 'heal');
      chooseReward(state, reward.id, state.talents.length === 4 ? state.talents[0] : null);
      continue;
    }
    if (state.phase === 'route') { const next = state.routeOptions[0]; enterRoom(state, next.roomId, next.risk); held = false; heldFor = 0; pathAge = 0; continue; }
    const p = state.player;
    const enemies = state.enemies.filter(e => e.hp > 0).sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z));
    const target = enemies[0]; if (!target) { step(state, {}, 1 / 60); continue; }
    const dx = target.x - p.x, dz = target.z - p.z, d = Math.hypot(dx, dz) || 1;
    let mx = dx / d, mz = dz / d;
    const desired = target.type === 'shield' ? 3.3 : target.type === 'regent' || target.type === 'arbiter' ? 3.5 : target.type === 'spear' ? 2.8 : 2.65;
    if (d < desired - .2) { mx *= -1; mz *= -1; }
    else if (d < desired + .15) { mx = 0; mz = 0; }
    if (!lineClear(state.room, p.x, p.z, target.x, target.z, p.radius + .05)) {
      pathAge -= 1 / 60;
      if (pathAge <= 0 || !path.length) { path = findPath(state.room, p, target, p.radius); pathAge = .6; }
      while (path.length > 1 && Math.hypot(path[0].x - p.x, path[0].z - p.z) < .35) path.shift();
      if (path[0]) { const pd = Math.hypot(path[0].x - p.x, path[0].z - p.z) || 1; mx = (path[0].x - p.x) / pd; mz = (path[0].z - p.z) / pd; }
    }
    const threats = enemies.filter(e => e.attack && ['telegraph', 'attack'].includes(e.state) && e.timer < .35 && shapeHits(e.attack, p, p.radius + .2));
    let dodge = false, block = false, attackPressed = false, attackReleased = false;
    let aimX = target.x, aimZ = target.z;
    if (threats.length) {
      const threat = threats[0];
      const blockable = ['soldier', 'spear', 'shield', 'royal-sweep', 'sentence'].includes(threat.attack.source);
      if (blockable && threat.timer < .18 && threats.length === 1 && p.actionTime < .05) { block = true; aimX = threat.x; aimZ = threat.z; }
      else if (p.energy >= state.modifiers.dodgeCost && p.action !== 'dodge' && threat.timer < .18) {
        let best = null;
        for (let i = 0; i < 16; i++) {
          const angle = i * Math.PI / 8, x = p.x + Math.sin(angle) * 3.1, z = p.z + Math.cos(angle) * 3.1;
          if (Math.abs(x) > 8.9 || Math.abs(z) > 8.9 || !lineClear(state.room, p.x, p.z, x, z, p.radius)) continue;
          const unsafe = threats.filter(e => shapeHits(e.attack, { x, z, radius: p.radius })).length;
          const score = unsafe * 100 + Math.abs(Math.hypot(x - target.x, z - target.z) - desired);
          if (!best || score < best.score) best = { score, mx: Math.sin(angle), mz: Math.cos(angle) };
        }
        if (best) { mx = best.mx; mz = best.mz; dodge = true; held = false; heldFor = 0; }
      }
    }
    if (!dodge && !block) {
      if (target.type === 'shield' && target.shieldBroken <= 0) {
        if (!held && d < 4.5 && p.cooldown <= 0) { held = true; heldFor = 0; attackPressed = true; }
        if (held) { heldFor += 1 / 60; if (heldFor >= .8) { attackReleased = true; held = false; heldFor = 0; } }
      } else if (d < 3.3 + target.radius && p.cooldown <= 0) attackPressed = true;
    } else if (block) { held = false; heldFor = 0; }
    step(state, { moveX: mx, moveZ: mz, aimX, aimZ, attackPressed, attackHeld: held, attackReleased, block, dodge }, 1 / 60);
    state.events = [];
  }
  return state;
}

test('rules-only simulation: both routes complete with each of the three starting schools', t => {
  for (const route of ['ash', 'ivory']) for (const startTalent of ['fleet-ash', 'wide-oath', 'kindling']) {
    const state = playSimulation({ route, startTalent, seed: 2718 });
    assert.equal(state.phase, 'result', `${route}/${startTalent}: phase ${state.phase}, room ${state.room?.id}, time ${state.time}`);
    assert.equal(state.result.won, true, `${route}/${startTalent}: hp ${state.player.hp}, room ${state.room?.id}, source ${state.result.reason}, stats ${JSON.stringify(state.stats)}`);
    assert.equal(state.roomsCleared, 5); assert.ok(state.stats.maxCommittedMelee <= 2);
    t.diagnostic(`${route}/${startTalent}: ${state.result.time}s simulation, ${state.stats.kills} kills, ${state.stats.hits} hits, ${state.stats.parries} parries, ${state.player.hp.toFixed(1)} HP`);
  }
});

test('rules-only configured-loadout simulation: nine mixed builds spanning all twelve talents can complete', t => {
  const builds = [
    ['fleet-ash', 'deep-breath', 'wide-oath', 'kindling'], ['long-stride', 'returning-wind', 'steady-guard', 'furnace-tip'], ['fleet-ash', 'returning-wind', 'coal-heart', 'mercy-ember'],
    ['wide-oath', 'thorn-vow', 'long-stride', 'kindling'], ['steady-guard', 'mercy-ember', 'deep-breath', 'furnace-tip'], ['thorn-vow', 'mercy-ember', 'returning-wind', 'last-light'],
    ['kindling', 'furnace-tip', 'wide-oath', 'fleet-ash'], ['coal-heart', 'last-light', 'long-stride', 'thorn-vow'], ['kindling', 'coal-heart', 'mercy-ember', 'deep-breath'],
  ];
  assert.equal(new Set(builds.flat()).size, 12);
  builds.forEach((loadout, index) => {
    const route = index % 2 ? 'ivory' : 'ash', startTalent = ['fleet-ash', 'wide-oath', 'kindling'][Math.floor(index / 3)];
    const state = playSimulation({ route, startTalent, seed: 2718, loadout });
    assert.equal(state.result?.won, true, `${route}/${loadout.join(',')}: ${state.phase} ${state.result?.reason}`);
    assert.ok(state.player.hp <= state.player.maxHp); assert.ok(state.stats.maxCommittedMelee <= 2);
    t.diagnostic(`${route}: ${loadout.join(' + ')}: ${state.result.time}s, ${state.stats.hits} hits`);
  });
});
