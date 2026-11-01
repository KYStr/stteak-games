import { PLANTS, DECORATIONS, RECIPES, QUESTS, DISCOVERIES, REGIONS, PUZZLES, PHASES, RESIDENTS, RESOURCE_NAMES, itemName } from './content.js';

const plantById = Object.fromEntries(PLANTS.map(p => [p.id, p]));
const decorById = Object.fromEntries(DECORATIONS.map(p => [p.id, p]));
Object.setPrototypeOf(plantById, null);
Object.setPrototypeOf(decorById, null);
const allItems = new Set([...PLANTS.flatMap(p => [p.id, `seed:${p.id}`]), ...DECORATIONS.map(d => d.id), ...Object.keys(RESOURCE_NAMES)]);
const clone = value => JSON.parse(JSON.stringify(value));
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const integer = (value, max = 1000000000) => Number.isSafeInteger(value) && value >= 0 && value <= max;
const indexValid = index => Number.isInteger(index) && index >= 0 && index < 64;
const neighbors = index => [index % 8 ? index - 1 : -1, index % 8 < 7 ? index + 1 : -1, index - 8, index + 8].filter(indexValid);
const uniqueKnown = (array, allowed, max) => Array.isArray(array) && array.length <= max && new Set(array).size === array.length && array.every(id => allowed.includes(id));
const add = (state, id, count) => { state.inventory[id] = (state.inventory[id] ?? 0) + count; };
const spend = (state, items) => { for (const [id, count] of Object.entries(items)) state.inventory[id] -= count; };
const missingItems = (state, items) => Object.entries(items).filter(([id, count]) => (state.inventory[id] ?? 0) < count).map(([id, count]) => `${itemName(id)} ${state.inventory[id] ?? 0}/${count}`);
const fail = (state, message) => ({ ok: false, state, message });

export function createState(slot = 1) {
  if (![1, 2].includes(slot)) throw new RangeError('存檔槽必須為 1 或 2');
  return {
    schema: 1, slot, revision: 0, day: 1, coins: 24, grid: Array(64).fill(null),
    inventory: { 'seed:moss': 4, 'seed:moonflower': 2, wood: 2, fiber: 2, stone: 2 },
    activeQuests: [], completedQuests: [], discoveries: [], puzzles: [], festival: false, festivalDay: null,
    stats: { planted: 0, watered: 0, harvested: 0, crafted: 0, transactions: 0, daysPlayed: 0 },
    region: 'garden', settings: { music: 0.35, ambient: 0.45, sfx: 0.5, reducedMotion: false, quality: 'high', textSpeed: 0, joystick: false },
    relationships: Object.fromEntries(RESIDENTS.map(r => [r.id, 0])),
    memo: { gathered: {}, talked: {}, rescueDay: 0, tutorialStep: 0, lastMessage: '種下絨苔，澆水，再回屋睡覺。植物在換日時成長。' }, undo: null,
  };
}

function validInventory(inventory) {
  return isRecord(inventory) && Object.entries(inventory).every(([id, count]) => allItems.has(id) && integer(count, 1000000));
}
function validGrid(grid) {
  return Array.isArray(grid) && grid.length === 64 && grid.every(cell => cell === null ||
    (isRecord(cell) && typeof cell.id === 'string' && (cell.type === 'plant' ? Boolean(plantById[cell.id]) && integer(cell.growth, plantById[cell.id].days) && typeof cell.watered === 'boolean' : // current與undo共用字串gate，拒絕singleton-array經字典key轉型後流入模型consumer。
      cell.type === 'decor' && Boolean(decorById[cell.id]) && integer(cell.rotation, 3))));
}
export function validateState(state) {
  let error = null;
  if (!isRecord(state) || state.schema !== 1) error = '不支援的存檔版本';
  else if (![1, 2].includes(state.slot) || !integer(state.revision) || !integer(state.day, 1000000) || state.day < 1 || !integer(state.coins)) error = '日期、金額或存檔槽損壞';
  else if (!validGrid(state.grid) || !validInventory(state.inventory)) error = '庭園或背包資料損壞';
  else if (!uniqueKnown(state.activeQuests, QUESTS.map(q => q.id), 3) || !uniqueKnown(state.completedQuests, QUESTS.map(q => q.id), QUESTS.length) || state.activeQuests.some(id => state.completedQuests.includes(id))) error = '委託狀態損壞';
  else if (!uniqueKnown(state.discoveries, DISCOVERIES.map(d => d.id), 12) || !uniqueKnown(state.puzzles, PUZZLES.map(p => p.id), 3)) error = '探索紀錄損壞';
  else if (typeof state.festival !== 'boolean' || (state.festival ? !integer(state.festivalDay, state.day) || state.festivalDay < 1 : state.festivalDay !== null)) error = '慶典紀錄損壞';
  else if (!isRecord(state.stats) || !['planted', 'watered', 'harvested', 'crafted', 'transactions', 'daysPlayed'].every(key => integer(state.stats[key]))) error = '統計資料損壞';
  else if (!['garden', 'cottage', ...REGIONS.map(r => r.id)].includes(state.region)) error = '所在區域損壞';
  else if (!isRecord(state.settings) || !['music', 'ambient', 'sfx'].every(key => Number.isFinite(state.settings[key]) && state.settings[key] >= 0 && state.settings[key] <= 1) || typeof state.settings.reducedMotion !== 'boolean' || typeof state.settings.joystick !== 'boolean' || !['low', 'high', 'auto'].includes(state.settings.quality) || ![0, 1, 2, 3].includes(state.settings.textSpeed)) error = '設定資料損壞'; // 逐字延遲只有四個選項；小數不能作陣列索引，並非卡死修正。
  else if (!isRecord(state.relationships) || !RESIDENTS.every(r => integer(state.relationships[r.id], 3))) error = '居民關係資料損壞';
  else if (!isRecord(state.memo) || !isRecord(state.memo.gathered) || !isRecord(state.memo.talked) || !Object.entries(state.memo.talked).every(([id, day]) => RESIDENTS.some(r => r.id === id) && integer(day, state.day)) || !Object.entries(state.memo.gathered).every(([id, day]) => REGIONS.some(r => r.id === id) && integer(day, state.day)) || !integer(state.memo.rescueDay, state.day) || !integer(state.memo.tutorialStep, 20) || typeof state.memo.lastMessage !== 'string' || state.memo.lastMessage.length > 1000) error = '每日紀錄損壞';
  else if (state.undo !== null && (!isRecord(state.undo) || !validGrid(state.undo.grid) || !validInventory(state.undo.inventory) || state.undo.revision !== state.revision || !['plant', 'clear', 'place', 'move'].includes(state.undo.type))) error = '撤銷紀錄損壞';
  return { ok: error === null, error };
}

export function phaseOf(day) { return Math.floor((Math.max(1, day) - 1) / 2) % 4; }

export function growthPreview(state, index) {
  const cell = state.grid[index];
  if (!cell || cell.type !== 'plant') return null;
  const plant = plantById[cell.id];
  const mature = cell.growth >= plant.days;
  const phaseBonus = plant.phase === phaseOf(state.day) ? 1 : 0;
  const neighborBonus = plant.neighborTag && neighbors(index).some(i => state.grid[i]?.type === 'plant' && plantById[state.grid[i].id].tag === plant.neighborTag) ? 1 : 0;
  const gain = !mature && cell.watered ? 1 + phaseBonus + neighborBonus : 0;
  const nextGrowth = Math.min(plant.days, cell.growth + gain);
  return {
    stage: Math.min(3, Math.floor(cell.growth * 3 / plant.days)), mature, progress: cell.growth, required: plant.days,
    watered: cell.watered, phaseBonus, neighborBonus, gain, nextGrowth,
    nextStage: Math.min(3, Math.floor(nextGrowth * 3 / plant.days)),
    reason: mature ? '已成熟，可收成或留作佈景。' : !cell.watered ? '今日尚未澆水：睡覺不會成長。' : `睡覺後 +${gain} 成長（澆水 +1${phaseBonus ? '、月相 +1' : ''}${neighborBonus ? '、鄰植 +1' : ''}）。`,
  };
}

export function gardenRating(state) {
  const plants = state.grid.filter(c => c?.type === 'plant');
  const decorations = state.grid.filter(c => c?.type === 'decor');
  const variety = new Set(plants.map(p => p.id)).size;
  const tags = {};
  for (const cell of decorations) for (const tag of decorById[cell.id].tags) tags[tag] = (tags[tag] ?? 0) + 1;
  const level = plants.length >= 8 && decorations.length >= 6 && variety >= 4 ? 3 : plants.length >= 4 && decorations.length >= 3 && variety >= 2 ? 2 : 1;
  const target = level === 1 ? { plants: 4, decorations: 3, variety: 2 } : { plants: 8, decorations: 6, variety: 4 };
  const missing = level === 3 ? [] : [plants.length < target.plants && `植物 ${plants.length}/${target.plants}`, decorations.length < target.decorations && `裝飾 ${decorations.length}/${target.decorations}`, variety < target.variety && `植物種類 ${variety}/${target.variety}`].filter(Boolean);
  return { level, score: plants.length + decorations.length * 3 + variety * 2, label: ['初芽庭園', '月光庭園', '繁星庭園'][level - 1], plants: plants.length, decorations: decorations.length, variety, tags, missing, next: level < 3 ? level + 1 : null };
}

export function questStatus(state, id) {
  const quest = QUESTS.find(q => q.id === id);
  if (!quest) return { accepted: false, completed: false, ready: false, missing: ['找不到委託'] };
  const missing = missingItems(state, quest.requires);
  if (quest.theme) {
    const rating = gardenRating(state);
    const labels = { cozy: '溫馨', natural: '自然', moon: '月光', water: '水岸' };
    for (const [tag, count] of Object.entries(quest.theme.tags ?? {})) if ((rating.tags[tag] ?? 0) < count) missing.push(`${labels[tag]}物件 ${rating.tags[tag] ?? 0}/${count}`);
    if (quest.theme.minPlants && rating.plants < quest.theme.minPlants) missing.push(`植物 ${rating.plants}/${quest.theme.minPlants}`);
    if (quest.theme.adjacent) {
      const themeTags = Object.keys(quest.theme.tags ?? {});
      const adjacent = state.grid.some((cell, index) => cell?.type === 'decor' && decorById[cell.id].tags.some(t => themeTags.includes(t)) && neighbors(index).some(n => state.grid[n]?.type === 'decor'));
      if (!adjacent) missing.push('將主題裝飾放在任意裝飾旁（上下左右）');
    }
  }
  const completed = state.completedQuests.includes(id), accepted = state.activeQuests.includes(id);
  return { accepted, completed, ready: accepted && !completed && missing.length === 0, missing };
}

export function festivalStatus(state) {
  const objects = DECORATIONS.filter(d => d.festival).map(d => ({ id: d.id, name: d.name, placed: state.grid.some(c => c?.type === 'decor' && c.id === d.id) }));
  const level = gardenRating(state).level;
  const missing = [state.completedQuests.length < 8 && `完成委託 ${state.completedQuests.length}/8`, ...objects.filter(o => !o.placed).map(o => `放置${o.name}`), level < 2 && '提升庭園至第 2 級'].filter(Boolean);
  return { ready: !state.festival && missing.length === 0, missing, quests: state.completedQuests.length, objects, level, completed: state.festival };
}

export function transact(state, action) {
  const valid = validateState(state);
  if (!valid.ok) return fail(state, `資料無法操作：${valid.error}`);
  if (!isRecord(action) || typeof action.type !== 'string') return fail(state, '無效操作');
  const next = clone(state);
  next.undo = null;
  let message = '';
  const cell = indexValid(action.index) ? next.grid[action.index] : null;
  const keepUndo = () => { next.undo = { type: action.type, revision: state.revision + 1, grid: clone(state.grid), inventory: clone(state.inventory) }; };
  switch (action.type) {
    case 'plant': {
      if (!indexValid(action.index) || cell || !plantById[action.id]) return fail(state, '請選擇空地與有效種子');
      const seed = `seed:${action.id}`;
      if (!(next.inventory[seed] > 0)) return fail(state, '沒有這種種子；森林每天提供免費絨苔種子');
      keepUndo(); next.inventory[seed]--; next.grid[action.index] = { type: 'plant', id: action.id, growth: 0, watered: false }; next.stats.planted++;
      message = `種下${itemName(action.id)}。記得澆水，睡覺後才會成長。`; break;
    }
    case 'water':
      if (!cell || cell.type !== 'plant') return fail(state, '請選擇一株植物');
      if (cell.watered) return fail(state, '這株今天已經澆過水了');
      if (growthPreview(state, action.index).mature) return fail(state, '這株已成熟，可以收成');
      cell.watered = true; next.stats.watered++; message = `澆好${itemName(cell.id)}。${growthPreview(next, action.index).reason}`; break;
    case 'harvest':
      if (!cell || cell.type !== 'plant' || !growthPreview(state, action.index).mature) return fail(state, '成熟的植物才能收成');
      add(next, cell.id, 1); next.grid[action.index] = null; next.stats.harvested++; next.stats.transactions++;
      message = `收成${itemName(cell.id)} ×1，已放進背包。`; break;
    case 'clear':
      if (!cell) return fail(state, '這裡已經是空地');
      keepUndo();
      if (cell.type === 'decor') add(next, cell.id, 1);
      else if (cell.growth === 0) add(next, `seed:${cell.id}`, 1);
      next.grid[action.index] = null;
      message = cell.type === 'decor' ? '裝飾收回背包，可撤銷。' : cell.growth === 0 ? '尚未生長的種子已收回，可撤銷。' : '已清理植物；最近這次清理可撤銷。'; break;
    case 'place':
      if (!indexValid(action.index) || cell || !decorById[action.id] || !integer(action.rotation ?? 0, 3)) return fail(state, '請選擇空地，旋轉值需為 0–3');
      if (!(next.inventory[action.id] > 0)) return fail(state, '背包沒有這件裝飾');
      keepUndo(); next.inventory[action.id]--; next.grid[action.index] = { type: 'decor', id: action.id, rotation: action.rotation ?? 0 }; message = `放好${itemName(action.id)}。可撤銷最近擺放。`; break;
    case 'move': {
      if (!indexValid(action.from) || !indexValid(action.index) || !integer(action.rotation ?? 0, 3)) return fail(state, '請選擇有效的來源、空地與旋轉方向');
      const source = next.grid[action.from];
      if (source?.type !== 'decor' || (cell && action.from !== action.index)) return fail(state, '只能搬動裝飾到空地');
      keepUndo(); next.grid[action.from] = null; next.grid[action.index] = { ...source, rotation: action.rotation ?? source.rotation }; message = '已搬動裝飾。可撤銷最近擺放。'; break;
    }
    case 'undo':
      if (!state.undo) return fail(state, '沒有可撤銷的擺放／耕地；交易、收成及其他操作後會確定佈置');
      next.grid = clone(state.undo.grid); next.inventory = clone(state.undo.inventory); message = '已撤銷最近一次擺放／耕地。'; break;
    case 'buy': {
      const plant = typeof action.id === 'string' && action.id.startsWith('seed:') ? plantById[action.id.slice(5)] : null;
      const item = plant ?? decorById[action.id];
      if (!item) return fail(state, '這項物品無法購買');
      if (next.coins < item.price) return fail(state, `月露不足，需要 ${item.price}；可採集、售出收成或完成委託`);
      next.coins -= item.price; add(next, action.id, 1); next.stats.transactions++; message = `購入${itemName(action.id)} ×1。`; break;
    }
    case 'sell': {
      if (!(next.inventory[action.id] > 0)) return fail(state, '背包沒有這項物品');
      const plant = plantById[action.id], decoration = decorById[action.id];
      const price = plant?.sell ?? (RESOURCE_NAMES[action.id] ? 1 : decoration ? Math.floor(decoration.price / 2) : 0);
      if (!price) return fail(state, '種子不可出售，可種植收成後交易');
      next.inventory[action.id]--; next.coins += price; next.stats.transactions++; message = `售出${itemName(action.id)} ×1，獲得 ${price} 月露。`; break;
    }
    case 'craft': {
      const recipe = RECIPES.find(r => r.id === action.id);
      if (!recipe) return fail(state, '找不到這份配方');
      const missing = missingItems(next, recipe.cost);
      if (missing.length) return fail(state, `材料不足：${missing.join('、')}`);
      spend(next, recipe.cost); for (const [id, count] of Object.entries(recipe.result)) add(next, id, count);
      next.stats.crafted++; next.stats.transactions++; message = `完成手作：${recipe.name}。`; break;
    }
    case 'accept':
      if (!QUESTS.some(q => q.id === action.id) || next.activeQuests.includes(action.id) || next.completedQuests.includes(action.id)) return fail(state, '這份委託不存在、已接取或已完成');
      if (next.activeQuests.length >= 3) return fail(state, '最多接取 3 件，可先免費放回一件');
      next.activeQuests.push(action.id); message = '已接下委託；不會過期，可隨時免費放回。'; break;
    case 'returnQuest':
      if (!next.activeQuests.includes(action.id)) return fail(state, '尚未接取這份委託');
      next.activeQuests = next.activeQuests.filter(id => id !== action.id); message = '已放回委託，材料仍保留。'; break;
    case 'deliver': {
      const quest = QUESTS.find(q => q.id === action.id), status = questStatus(state, action.id);
      if (!status.ready) return fail(state, status.completed ? '這份委託已完成，獎勵不能重複領取' : !status.accepted ? '請先接取委託' : `還缺：${status.missing.join('、')}`);
      spend(next, quest.requires); next.coins += quest.reward; next.activeQuests = next.activeQuests.filter(id => id !== action.id); next.completedQuests.push(action.id); next.stats.transactions++;
      next.relationships[quest.residentId] = Math.min(3, next.relationships[quest.residentId] + 1);
      message = `完成「${quest.title}」，獲得 ${quest.reward} 月露。`; break;
    }
    case 'gather': {
      const region = REGIONS.find(r => r.id === action.region);
      if (!region) return fail(state, '請選擇森林、溪畔或山脊');
      if (next.memo.gathered[region.id] === next.day) return fail(state, '今天這裡已採集過；睡覺後刷新，也可以探索其他區域');
      for (const [id, count] of Object.entries(region.resources)) add(next, id, count);
      next.memo.gathered[region.id] = next.day; next.region = region.id;
      const discovery = DISCOVERIES.find(d => d.region === region.id && !next.discoveries.includes(d.id));
      if (discovery) next.discoveries.push(discovery.id);
      message = `${region.name}：${Object.entries(region.resources).map(([id, count]) => `${itemName(id)} ×${count}`).join('、')}${discovery ? `。發現「${discovery.name}」` : ''}。`; break;
    }
    case 'rescue': {
      const hasSeed = PLANTS.some(p => (next.inventory[`seed:${p.id}`] ?? 0) > 0);
      const hasSaleable = Object.entries(next.inventory).some(([id, count]) => count > 0 && !id.startsWith('seed:'));
      if (hasSeed || hasSaleable || next.coins >= 2 || next.grid.some(c => c?.type === 'plant')) return fail(state, '已有可種種子、植物或可交易資源；先使用背包，森林也每天免費提供種子');
      add(next, 'seed:moss', 2); next.memo.rescueDay = next.day; message = '米拉送來絨苔種子 ×2。沒有資源時，隨時可領取重新開始。'; break;
    }
    case 'discover': {
      const discovery = DISCOVERIES.find(d => d.id === action.id);
      if (!discovery || next.region !== discovery.region) return fail(state, '請先前往發現所在的採集區');
      if (next.discoveries.includes(action.id)) return fail(state, '已記錄這個自然發現');
      next.discoveries.push(action.id); message = `記錄「${discovery.name}」：${discovery.description}`; break;
    }
    case 'puzzle': {
      const puzzle = PUZZLES.find(p => p.id === action.id);
      if (!puzzle || next.region !== puzzle.region) return fail(state, '請前往石碑所在的區域');
      if (next.puzzles.includes(action.id)) return fail(state, '這個謎題已完成，獎勵不能重複領取');
      if (action.answer !== puzzle.answer) return fail(state, '再想一想，答錯沒有懲罰。提示可在植物與月相說明找到。');
      next.puzzles.push(action.id); for (const [id, count] of Object.entries(puzzle.reward)) add(next, id, count);
      message = `${puzzle.explanation} 獲得 ${Object.entries(puzzle.reward).map(([id, n]) => `${itemName(id)} ×${n}`).join('、')}。`; break;
    }
    case 'sleep':
      if (next.day >= 1000000) return fail(state, '這份存檔已達日期上限，請使用另一存檔開始新庭園');
      next.grid = state.grid.map((current, index) => current?.type === 'plant' ? { ...current, growth: growthPreview(state, index).nextGrowth, watered: false } : clone(current));
      next.day++; next.stats.daysPlayed++; next.region = 'garden'; message = `早安，第 ${next.day} 天。${PHASES[phaseOf(next.day)].name}，採集區已刷新。`; break;
    case 'festival': {
      const status = festivalStatus(state);
      if (!status.ready) return fail(state, state.festival ? '慶典已舉行，現在可繼續自由種植與完成收藏' : `慶典還需要：${status.missing.join('、')}`);
      next.festival = true; next.festivalDay = next.day; message = `月光慶典開始！${next.completedQuests.length} 份心意、${next.stats.harvested} 次收成，匯成我們的庭園。明天仍可自由種植。`; break;
    }
    case 'travel':
    case 'visit':
      if (!['garden', 'cottage', ...REGIONS.map(r => r.id)].includes(action.region)) return fail(state, '找不到這個區域');
      next.region = action.region; message = action.region === 'garden' ? '回到月光庭園。' : action.region === 'cottage' ? '回到小屋，可以睡覺換日。' : `來到${REGIONS.find(r => r.id === action.region).name}。`; break;
    case 'talk': {
      const resident = RESIDENTS.find(r => r.id === action.id);
      if (!resident) return fail(state, '找不到這位居民');
      const hasMet = Object.hasOwn(next.memo.talked, resident.id);
      const completed = QUESTS.filter(q => q.residentId === resident.id && next.completedQuests.includes(q.id)).length;
      const active = QUESTS.some(q => q.residentId === resident.id && next.activeQuests.includes(q.id));
      const dialogue = completed > 0 && !active ? resident.complete : hasMet || active || completed > 0 ? resident.progress : resident.first;
      message = `${resident.name}：${dialogue}`;
      if (!hasMet) next.relationships[resident.id] = Math.min(3, next.relationships[resident.id] + 1);
      next.memo.talked[resident.id] = next.day; break;
    }
    case 'settings': {
      const values = action.values ?? action.settings;
      if (!isRecord(values) || !Object.keys(values).every(key => Object.hasOwn(next.settings, key))) return fail(state, '無效設定');
      Object.assign(next.settings, values); message = '設定已更新。'; break;
    }
    case 'tutorial':
      if (!integer(action.step, 20)) return fail(state, '無效教學步驟');
      next.memo.tutorialStep = Math.max(next.memo.tutorialStep, action.step); message = '教學進度已記錄。'; break;
    default: return fail(state, '無法識別這個操作');
  }
  next.revision++;
  next.memo.lastMessage = message;
  const after = validateState(next);
  if (!after.ok) return fail(state, `操作未完成：${after.error}`);
  return { ok: true, state: next, message };
}
