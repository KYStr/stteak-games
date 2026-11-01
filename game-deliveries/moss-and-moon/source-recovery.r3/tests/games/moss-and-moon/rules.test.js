import test from 'node:test';
import assert from 'node:assert/strict';
import { PLANTS, DECORATIONS, RECIPES, QUESTS, DISCOVERIES, REGIONS, PUZZLES, RESIDENTS } from '../../../public/games/moss-and-moon/content.js';
import { createState, validateState, transact, phaseOf, growthPreview, questStatus, gardenRating, festivalStatus } from '../../../public/games/moss-and-moon/rules.js';

function act(state, action) { const result = transact(state, action); assert.equal(result.ok, true, `${JSON.stringify(action)}: ${result.message}`); assert.equal(validateState(result.state).ok, true); return result.state; }

test('complete stable content counts and four growth silhouettes', () => {
  assert.deepEqual([PLANTS.length, DECORATIONS.length, RECIPES.length, QUESTS.length, DISCOVERIES.length, REGIONS.length, PUZZLES.length, RESIDENTS.length], [8, 12, 8, 12, 12, 3, 3, 6]);
  for (const plant of PLANTS) {
    const state = createState(); const stages = new Set();
    for (let growth = 0; growth <= plant.days; growth++) { state.grid[0] = { type: 'plant', id: plant.id, growth, watered: false }; stages.add(growthPreview(state, 0).stage); }
    assert.deepEqual([...stages], [0, 1, 2, 3]);
  }
});

for (const plant of PLANTS) for (let phase = 0; phase < 4; phase++) test(`growth matrix ${plant.id} phase ${phase}: forecast equals sleeping result`, () => {
  const state = createState(); state.day = 1 + phase * 2;
  state.grid[0] = { type: 'plant', id: plant.id, growth: 0, watered: true };
  if (plant.neighborTag) state.grid[1] = { type: 'plant', id: PLANTS.find(p => p.tag === plant.neighborTag).id, growth: 0, watered: false };
  const preview = growthPreview(state, 0), expected = 1 + Number(plant.phase === phase) + Number(Boolean(plant.neighborTag));
  assert.equal(preview.gain, expected);
  const slept = act(state, { type: 'sleep' });
  assert.equal(slept.grid[0].growth, preview.nextGrowth); assert.equal(growthPreview(slept, 0).stage, preview.nextStage); assert.equal(slept.grid[0].watered, false);
  assert.equal(state.grid[0].growth, 0, 'immutable original');
  const dry = act(slept, { type: 'sleep' }); assert.equal(dry.grid[0].growth, slept.grid[0].growth);
});

test('each moon phase lasts precisely two days, including wrap', () => {
  assert.deepEqual(Array.from({ length: 16 }, (_, i) => phaseOf(i + 1)), [0, 0, 1, 1, 2, 2, 3, 3, 0, 0, 1, 1, 2, 2, 3, 3]);
});

test('neighbor bonus never wraps horizontally across the garden', () => {
  const state = createState(); state.day = 5;
  state.grid[7] = { type: 'plant', id: 'starcap', growth: 0, watered: true };
  state.grid[8] = { type: 'plant', id: 'moss', growth: 0, watered: true };
  assert.equal(growthPreview(state, 7).neighborBonus, 0);
  state.grid[6] = state.grid[8]; assert.equal(growthPreview(state, 7).neighborBonus, 1);
});

test('100 rapid buys and 100 deliveries commit once per payable action', () => {
  let state = createState(); state.coins = 12; state.inventory = {};
  for (let n = 0; n < 100; n++) { const result = transact(state, { type: 'buy', id: 'seed:moss' }); if (result.ok) state = result.state; else assert.strictEqual(result.state, state); }
  assert.equal(state.coins, 0); assert.equal(state.inventory['seed:moss'], 6); assert.equal(state.stats.transactions, 6);
  state.inventory.moss = 2; state = act(state, { type: 'accept', id: 'mira-1' });
  for (let n = 0; n < 100; n++) { const result = transact(state, { type: 'deliver', id: 'mira-1' }); if (result.ok) state = result.state; else assert.strictEqual(result.state, state); }
  assert.equal(state.coins, 15); assert.equal(state.inventory.moss, 0); assert.deepEqual(state.completedQuests, ['mira-1']);
  assert.equal(state.stats.transactions, 7); assert.equal(validateState(state).ok, true);
});

test('insufficient material is immutable, exact material is consumed once', () => {
  const state = createState(); state.inventory = { wood: 2 };
  const denied = transact(state, { type: 'craft', id: 'make-planter' }); assert.equal(denied.ok, false); assert.strictEqual(denied.state, state);
  state.inventory.moss = 1;
  const crafted = act(state, { type: 'craft', id: 'make-planter' });
  assert.equal(crafted.inventory.planter, 1); assert.equal(crafted.inventory.wood, 0); assert.equal(crafted.inventory.moss, 0);
  assert.equal(transact(crafted, { type: 'craft', id: 'make-planter' }).ok, false);
});

test('gathering is daily, free seeds break a same-day zero-resource softlock', () => {
  let state = createState(); state = act(state, { type: 'gather', region: 'forest' });
  assert.equal(transact(state, { type: 'gather', region: 'forest' }).ok, false);
  state.coins = 0; state.inventory = {};
  state = act(state, { type: 'rescue' }); assert.equal(state.inventory['seed:moss'], 2);
  assert.equal(transact(state, { type: 'rescue' }).ok, false);
  state = act(state, { type: 'plant', index: 0, id: 'moss' }); state = act(state, { type: 'water', index: 0 }); state = act(state, { type: 'sleep' });
  state = act(state, { type: 'gather', region: 'forest' }); assert.equal(state.inventory['seed:moss'], 3);
});

test('layout undo restores exactly once, later economic transactions invalidate it', () => {
  let state = createState(); const original = JSON.stringify(state.inventory);
  state = act(state, { type: 'plant', index: 0, id: 'moss' }); state = act(state, { type: 'undo' });
  assert.equal(JSON.stringify(state.inventory), original); assert.equal(state.grid[0], null); assert.equal(transact(state, { type: 'undo' }).ok, false);
  state.inventory.bench = 1; state = act(state, { type: 'place', index: 1, id: 'bench', rotation: 0 });
  state = act(state, { type: 'move', from: 1, index: 2, rotation: 2 }); state = act(state, { type: 'undo' });
  assert.equal(state.grid[1].id, 'bench'); assert.equal(state.grid[2], null); assert.equal(state.inventory.bench, 0);
  state = act(state, { type: 'clear', index: 1 }); state = act(state, { type: 'sell', id: 'bench' });
  assert.equal(transact(state, { type: 'undo' }).ok, false); assert.equal(state.grid[1], null); assert.equal(state.inventory.bench, 0);
});

test('all 64 cells, repeated move/rotation and region transitions preserve uniqueness', () => {
  let state = createState(); state.inventory.stones = 64;
  for (let index = 0; index < 64; index++) state = act(state, { type: 'place', id: 'stones', index, rotation: index % 4 });
  assert.equal(state.grid.filter(Boolean).length, 64); assert.equal(state.inventory.stones, 0);
  assert.equal(transact(state, { type: 'place', id: 'stones', index: 0 }).ok, false);
  assert.equal(transact(state, { type: 'move', from: 0, index: 1 }).ok, false);
  for (let i = 0; i < 10; i++) {
    state = act(state, { type: 'move', from: 0, index: 0, rotation: i % 4 });
    state = act(state, { type: 'travel', region: 'forest' }); state = act(state, { type: 'travel', region: 'garden' });
  }
  assert.equal(state.grid.filter(Boolean).length, 64); assert.equal(state.inventory.stones, 0);
});

test('validation rejects fractional/negative/unknown/duplicate/corrupt states and invalid actions', () => {
  const corruptions = [s => s.coins = -1, s => s.day = 1.5, s => s.inventory.moss = 0.5, s => s.inventory.unobtainium = 1, s => s.grid.pop(), s => s.grid[0] = { type: 'plant', id: '__proto__', growth: 0, watered: false }, s => s.activeQuests = ['mira-1', 'mira-1'], s => s.settings.music = Infinity, s => s.undo = {}];
  for (const corrupt of corruptions) { const state = createState(); corrupt(state); assert.equal(validateState(state).ok, false); assert.equal(transact(state, { type: 'sleep' }).ok, false); }
  for (const action of [{ type: 'plant', index: 64, id: 'moss' }, { type: 'plant', index: 0, id: '__proto__' }, { type: 'place', index: 0, id: 'bench', rotation: -1 }, { type: 'settings', values: { sfx: NaN } }, { type: 'buy', id: 'toString' }]) { const state = createState(); const result = transact(state, action); assert.equal(result.ok, false); assert.strictEqual(result.state, state); }
});

test('three accepted quests maximum, return is free; dialogue and preferences persist in state', () => {
  let state = createState();
  for (const quest of QUESTS.slice(0, 3)) state = act(state, { type: 'accept', id: quest.id });
  assert.equal(transact(state, { type: 'accept', id: QUESTS[3].id }).ok, false);
  const inventory = JSON.stringify(state.inventory); state = act(state, { type: 'returnQuest', id: QUESTS[0].id });
  assert.equal(JSON.stringify(state.inventory), inventory); state = act(state, { type: 'accept', id: QUESTS[3].id });
  state = act(state, { type: 'talk', id: 'mira' }); assert.equal(state.relationships.mira, 1);
  state = act(state, { type: 'talk', id: 'mira' }); assert.equal(state.relationships.mira, 1);
  state = act(state, { type: 'settings', values: { music: 0, ambient: 0.2, sfx: 0.8, quality: 'low', reducedMotion: true } }); assert.equal(state.settings.music, 0); assert.equal(state.settings.quality, 'low');
});

test('new gardens show complete dialogue immediately; optional typewriter settings remain valid', () => {
  let state = createState(); assert.equal(state.settings.textSpeed, 0);
  for (const textSpeed of [1, 2, 3, 0]) { state = act(state, { type: 'settings', values: { textSpeed } }); assert.equal(state.settings.textSpeed, textSpeed); }
});

test('resident dialogue respects quest progress even before the first explicit talk', () => {
  const mira = RESIDENTS.find(r => r.id === 'mira');
  const initial = createState();
  assert.equal(transact(initial, { type: 'talk', id: 'mira' }).message, `米拉：${mira.first}`);
  let state = act(initial, { type: 'accept', id: 'mira-1' });
  assert.equal(transact(state, { type: 'talk', id: 'mira' }).message, `米拉：${mira.progress}`);
  state.inventory.moss = 2; state = act(state, { type: 'deliver', id: 'mira-1' });
  assert.equal(Object.hasOwn(state.memo.talked, 'mira'), false, 'the regression includes completing a quest without a prior talk action');
  let talked = transact(state, { type: 'talk', id: 'mira' });
  assert.equal(talked.message, `米拉：${mira.complete}`); state = talked.state;
  state = act(state, { type: 'accept', id: 'mira-2' });
  talked = transact(state, { type: 'talk', id: 'mira' }); assert.equal(talked.message, `米拉：${mira.progress}`);
  state = act(talked.state, { type: 'returnQuest', id: 'mira-2' });
  assert.equal(transact(state, { type: 'talk', id: 'mira' }).message, `米拉：${mira.complete}`);
});

test('normal-play route reaches all 12 quests, 12 discoveries, 3 puzzles, 8 recipes, festival, and 3 more days', () => {
  let state = createState(); const history = [];
  const doAction = action => { state = act(state, action); history.push(action.type); };
  function gatherAll() {
    for (const region of REGIONS) {
      if (state.memo.gathered[region.id] !== state.day) doAction({ type: 'gather', region: region.id });
      for (const discovery of DISCOVERIES.filter(d => d.region === region.id && !state.discoveries.includes(d.id))) doAction({ type: 'discover', id: discovery.id });
      const puzzle = PUZZLES.find(p => p.region === region.id);
      if (!state.puzzles.includes(puzzle.id)) doAction({ type: 'puzzle', id: puzzle.id, answer: puzzle.answer });
    }
  }
  function fund(price) {
    while (state.coins < price) {
      gatherAll();
      const sellable = Object.entries(state.inventory).find(([id, qty]) => qty > 0 && ['wood', 'fiber', 'stone', 'shell', 'crystal'].includes(id));
      if (sellable) doAction({ type: 'sell', id: sellable[0] }); else doAction({ type: 'sleep' });
    }
  }
  function grow(id, wanted) {
    while ((state.inventory[id] ?? 0) < wanted) {
      if (!(state.inventory[`seed:${id}`] > 0)) { fund(PLANTS.find(p => p.id === id).price); doAction({ type: 'buy', id: `seed:${id}` }); }
      const index = state.grid.findIndex(c => !c); assert.ok(index >= 0);
      doAction({ type: 'plant', id, index });
      while (!growthPreview(state, index).mature) { doAction({ type: 'water', index }); gatherAll(); doAction({ type: 'sleep' }); }
      doAction({ type: 'harvest', index });
    }
  }
  gatherAll();
  for (const quest of QUESTS.filter(q => !q.theme)) {
    for (const [id, qty] of Object.entries(quest.requires)) {
      if (PLANTS.some(p => p.id === id)) grow(id, qty);
      else if (DECORATIONS.some(d => d.id === id)) { fund(DECORATIONS.find(d => d.id === id).price); doAction({ type: 'buy', id }); }
      else while ((state.inventory[id] ?? 0) < qty) { gatherAll(); if ((state.inventory[id] ?? 0) < qty) doAction({ type: 'sleep' }); }
    }
    doAction({ type: 'accept', id: quest.id }); assert.equal(questStatus(state, quest.id).ready, true); doAction({ type: 'deliver', id: quest.id });
  }
  for (const recipe of RECIPES) {
    for (const [id, qty] of Object.entries(recipe.cost)) {
      if (PLANTS.some(p => p.id === id)) grow(id, qty);
      else while ((state.inventory[id] ?? 0) < qty) { gatherAll(); if ((state.inventory[id] ?? 0) < qty) doAction({ type: 'sleep' }); }
    }
    doAction({ type: 'craft', id: recipe.id });
  }
  for (const [index, id] of ['lantern', 'arch', 'table', 'birdbath', 'moonstand', 'planter', 'windchime', 'garland'].entries()) doAction({ type: 'place', index, id, rotation: index % 4 });
  for (let index = 16; index < 20; index++) {
    const id = index % 2 ? 'moss' : 'bluebell'; if (!(state.inventory[`seed:${id}`] > 0)) { fund(4); doAction({ type: 'buy', id: `seed:${id}` }); }
    doAction({ type: 'plant', index, id });
  }
  for (const quest of QUESTS.filter(q => q.theme)) { doAction({ type: 'accept', id: quest.id }); assert.deepEqual(questStatus(state, quest.id).missing, []); doAction({ type: 'deliver', id: quest.id }); }
  assert.equal(state.completedQuests.length, 12); assert.equal(state.discoveries.length, 12); assert.equal(state.puzzles.length, 3); assert.equal(state.stats.crafted, 8);
  assert.equal(gardenRating(state).level, 2); assert.equal(festivalStatus(state).ready, true);
  doAction({ type: 'festival' }); const festivalDay = state.day;
  for (let day = 0; day < 3; day++) { gatherAll(); doAction({ type: 'sleep' }); }
  assert.equal(state.day, festivalDay + 3); assert.equal(state.festival, true); assert.equal(state.festivalDay, festivalDay);
  assert.equal(transact(state, { type: 'festival' }).ok, false); assert.ok(history.length > 100);
});
