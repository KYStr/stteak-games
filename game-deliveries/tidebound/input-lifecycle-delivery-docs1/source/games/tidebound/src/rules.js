import { ISLANDS, DISCOVERIES, CONTRACTS, RIGS, CURRENTS, REEFS, WHIRLS, DIVE_SITES, OBSERVATIONS, ROUTE_CHOICES, ROUTE_DIRECTIONS, WORLD_BOUND, TIDE_PERIOD } from './world.js';

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const getIsland = (id) => ISLANDS.find((item) => item.id === id) || ISLANDS[0];
const getRig = (id) => RIGS.find((item) => item.id === id) || RIGS[0];
const getSite = (id) => DIVE_SITES.find((item) => item.id === id);
const event = (type, text, extra = {}) => ({ type, text, ...extra });
// The level remains a continuous sine wave; a phase name describes its whole quarter,
// rather than calling the entire falling quarter "high tide".
const tidePhases = [
  { label: '漲潮・高水位', direction: 'rising', waterLevel: 'high', description: '從中水位持續上升，直到最高水位。' },
  { label: '退潮・高水位', direction: 'falling', waterLevel: 'high', description: '從最高水位持續下降，直到中水位。' },
  { label: '退潮・低水位', direction: 'falling', waterLevel: 'low', description: '從中水位持續下降，直到最低水位。' },
  { label: '漲潮・低水位', direction: 'rising', waterLevel: 'low', description: '從最低水位持續上升，直到中水位。' },
];
export const CREDITS_DESCRIPTION = '航海印記僅供收藏與記錄成就，沒有購買用途；所有帆裝與修復皆免費。';
const finite = (n, fallback = 0) => Number.isFinite(n) ? n : fallback;
const seedOf = (seed) => 1 + ((Math.trunc(finite(Number(seed), 1)) - 1) % 16 + 16) % 16;
const addUnique = (array, id) => { if (!array.includes(id)) { array.push(id); return true; } return false; };

export function createState(seed = 1) {
  const homeDock = getIsland('harbor').dock;
  return {
    schemaVersion: 1, seed: seedOf(seed), time: 0, elapsed: 0, mode: 'harbor',
    boat: { ...homeDock, heading: 0, sail: 0, hull: 100, speed: 0 },
    rigId: 'steady', contractId: 'coral-survey', currentIsland: 'harbor', lastSafeIsland: 'harbor',
    discoveries: [], parts: [], completed: [], cargo: [], lighthouseFixed: false, storyComplete: false,
    oxygen: 55, diver: { ...homeDock }, activeDive: null, diveCollected: false,
    credits: 0, records: { bestTime: null, bestDamage: null, voyages: 0, rescues: 0, byContract: {} },
    voyage: { active: false, startedAt: 0, elapsed: 0, damage: 0, harvested: [], observed: [], skippedObservations: [], visited: [], rescued: false, legIndex: -1, routeChoices: [], navigation: null },
    result: null, contactCooldown: 0, warningCooldown: 0, lowHullWarned: false,
  };
}

export function tideAt(time) {
  const phase = ((finite(time) % TIDE_PERIOD) + TIDE_PERIOD) % TIDE_PERIOD;
  const quarter = TIDE_PERIOD / 4;
  const index = Math.floor(phase / quarter);
  const secondsToChange = quarter - (phase % quarter);
  return {
    height: Math.sin(phase / TIDE_PERIOD * Math.PI * 2), ...tidePhases[index],
    nextLabel: tidePhases[(index + 1) % 4].label, secondsToChange,
    forecastHorizon: secondsToChange + quarter * 2,
    forecast: [1, 2].map((offset) => ({
      ...tidePhases[(index + offset) % 4], startsIn: secondsToChange + quarter * (offset - 1),
      secondsUntil: secondsToChange + quarter * (offset - 1), duration: quarter,
      height: Math.sin((index + offset) * Math.PI / 2),
    })),
  };
}

export function currentAt(x, z, time, seed = 1) {
  let dx = 0, dz = 0;
  const strengthScale = 0.88 + seedOf(seed) * 0.015;
  for (const stream of CURRENTS) {
    const d = Math.hypot(x - stream.x, z - stream.z);
    if (d >= stream.radius) continue;
    const phase = Math.sin(time / TIDE_PERIOD * Math.PI * 2 + stream.phase);
    const force = (1 - d / stream.radius) * stream.strength * phase * strengthScale;
    dx += stream.dx * force; dz += stream.dz * force;
  }
  for (const whirl of WHIRLS) {
    if (!whirlActive(whirl, time)) continue;
    const vx = x - whirl.x, vz = z - whirl.z, d = Math.hypot(vx, vz);
    if (d < 0.01 || d >= whirl.radius) continue;
    const force = (1 - d / whirl.radius) * whirl.strength;
    dx += (-vz / d - vx / d * 0.18) * force;
    dz += (vx / d - vz / d * 0.18) * force;
  }
  return { x: dx, z: dz, dx, dz, strength: Math.hypot(dx, dz) };
}

export function whirlActive(whirl, time) {
  return Math.sin(time / TIDE_PERIOD * Math.PI * 2 + whirl.phase) > 0.25;
}

export function contractProgress(state, contractId = state.contractId) {
  const contract = CONTRACTS.find((item) => item.id === contractId);
  if (!contract) return { contractId, objectives: [], completedCount: 0, total: 0, readyToDeliver: false, alreadyDelivered: false, nextObjective: null };
  // Per-voyage observations are independent of ordinary cargo capacity and loss.
  const observed = state.voyage.observed || state.voyage.harvested || [];
  const objectives = contract.objectives.map((item) => ({ ...item, islandName: getIsland(item.islandId).name, done: observed.includes(item.discoveryId) }));
  const completedCount = objectives.filter((item) => item.done).length;
  const next = objectives.find((item) => !item.done) || { kind: 'return', islandId: 'harbor', islandName: getIsland('harbor').name, name: '返回潮音港交付', done: false };
  return { contractId: contract.id, objectives, completedCount, total: objectives.length, readyToDeliver: completedCount === objectives.length, alreadyDelivered: state.completed.includes(contract.id), nextObjective: next };
}

export function nextObjective(state, contractId = state.contractId) {
  return contractProgress(state, contractId).nextObjective;
}

export function activeNavigation(state) {
  const navigation = state.voyage.navigation;
  if (state.mode !== 'sailing' || !navigation || navigation.legIndex !== state.voyage.legIndex || !navigation.waypoints[navigation.index]) return null;
  return { ...navigation, target: navigation.waypoints[navigation.index], remaining: navigation.waypoints.length - navigation.index };
}

function localRouteOptions(state, gate, direction) {
  return gate.directions[direction].options.map((option) => {
    let origin = state.boat, metres = 0, seconds = 0, flowSum = 0;
    for (const target of option.waypoints) {
      const length = distance(origin, target), heading = Math.atan2(target.x - origin.x, -(target.z - origin.z));
      const windAngle = -Math.PI / 4 + (state.seed - 1) * 0.035;
      const efficiency = 0.52 + 0.48 * (Math.cos(heading - windAngle) + 1) / 2;
      const current = currentAt((origin.x + target.x) / 2, (origin.z + target.z) / 2, state.time, state.seed);
      const along = current.x * Math.sin(heading) - current.z * Math.cos(heading);
      metres += length; flowSum += along * length;
      seconds += length / Math.max(0.5, getRig(state.rigId).speed * efficiency + along);
      origin = target;
    }
    const flow = metres ? flowSum / metres : 0;
    const condition = Math.abs(flow) < 0.04 ? '此段流力較弱；比較距離、固定風角與離岸空間。' : `${flow > 0 ? '目前大致順流' : '目前大致逆流'}（沿航路約 ${Math.abs(flow).toFixed(2)} m/s）；潮相變化後取捨會改變。`;
    return { ...option, available: true, condition, distanceMetres: Math.round(metres), estimatedSeconds: Math.round(seconds), alongCurrent: flow };
  });
}

function clearLocalPath(origin, waypoints) {
  for (const target of waypoints) {
    const dx = target.x - origin.x, dz = target.z - origin.z, length = dx * dx + dz * dz;
    for (const obstacle of [...ISLANDS.map((item) => ({ ...item, clearance: item.radius + 7 })), ...REEFS.map((item) => ({ ...item, clearance: item.radius + 1 })), ...WHIRLS.map((item) => ({ ...item, clearance: item.radius + 1 }))]) {
      const projection = length ? clamp(((obstacle.x - origin.x) * dx + (obstacle.z - origin.z) * dz) / length, 0, 1) : 0;
      if (Math.hypot(obstacle.x - origin.x - projection * dx, obstacle.z - origin.z - projection * dz) < obstacle.clearance - 1e-6) return false;
    }
    origin = target;
  }
  return true;
}

const validEntry = (entry) => entry && Number.isFinite(entry.x) && Number.isFinite(entry.z) && Number.isFinite(entry.radius) && entry.radius > 0;
const validOptions = (options) => Array.isArray(options) && options.length >= 2 && options.every((option) => option && typeof option.id === 'string' && Array.isArray(option.waypoints) && option.waypoints.length && option.waypoints.every((point) => point && Number.isFinite(point.x) && Number.isFinite(point.z)));

export function nearestRouteChoice(state, radiusOverride) {
  const lastChoice = state.voyage.routeChoices?.at(-1);
  if (state.mode !== 'sailing' || (activeNavigation(state) && lastChoice && state.time - lastChoice.time < 18)) return null;
  const forward = { x: Math.sin(state.boat.heading), z: -Math.cos(state.boat.heading) };
  return ROUTE_CHOICES.flatMap((gate) => Object.entries(gate.directions).flatMap(([direction, data]) => {
    const axis = Object.hasOwn(ROUTE_DIRECTIONS, direction) && ROUTE_DIRECTIONS[direction];
    const minForwardDot = Number.isFinite(data?.minForwardDot) && data.minForwardDot >= 0 && data.minForwardDot <= 1 ? data.minForwardDot : 0.2;
    if (!axis || !data || !validOptions(data.options) || forward.x * axis.x + forward.z * axis.z < minForwardDot) return [];
    const entries = [validEntry(data.entry) ? data.entry : gate, ...(Array.isArray(data.entries) ? data.entries.filter(validEntry) : [])];
    return entries.flatMap((entry, entryIndex) => {
    const destinationIslandId = typeof entry.destinationIslandId === 'string' ? entry.destinationIslandId : data.destinationIslandId;
    const destination = ISLANDS.find((island) => island.id === destinationIslandId);
    if (destination && Number.isFinite(entry.maxDestinationDistance) && entry.maxDestinationDistance > 0 && distance(state.boat, destination.dock) > entry.maxDestinationDistance) return [];
    const dx = state.boat.x - entry.x, dz = state.boat.z - entry.z;
    const along = dx * axis.x + dz * axis.z, across = dx * axis.z - dz * axis.x;
    const lateralRadius = Number.isFinite(entry.lateralRadius) && entry.lateralRadius > 0 ? entry.lateralRadius : entry.radius;
    const withinEntry = Math.hypot(along / entry.radius, across / lateralRadius) <= 1;
    const options = validOptions(entry.options) ? entry.options : data.options;
    return [{ ...gate, directions: { ...gate.directions, [direction]: { ...data, destinationIslandId, options } }, x: entry.x, z: entry.z, radius: entry.radius, direction, entryIndex, axis, withinEntry, distance: distance(state.boat, entry) }];
    });
  }))
    .filter((gate) => (!(Number.isFinite(radiusOverride) && radiusOverride > 0) ? gate.withinEntry : gate.distance <= radiusOverride)
      && (state.boat.x - gate.x) * gate.axis.x + (state.boat.z - gate.z) * gate.axis.z <= 2
      && gate.directions[gate.direction].options.every((option) => clearLocalPath(state.boat, option.waypoints))
      && !(state.voyage.routeChoices || []).some((choice) => choice.id === gate.id && choice.legIndex === state.voyage.legIndex))
    .sort((a, b) => a.distance - b.distance)
    .map((gate) => ({ ...gate, options: localRouteOptions(state, gate, gate.direction) }))[0] || null;
}

function validSavedRouteChoice(choice) {
  if (!choice || typeof choice.direction !== 'string' || !Object.hasOwn(ROUTE_DIRECTIONS, choice.direction)) return false;
  const gate = ROUTE_CHOICES.find((item) => item.id === choice.id);
  if (!gate || !Object.hasOwn(gate.directions, choice.direction)) return false;
  const options = gate.directions[choice.direction]?.options;
  return Array.isArray(options) && options.some((option) => option.id === choice.optionId);
}

export function chooseRoute(state, choiceId, optionId) {
  const gate = nearestRouteChoice(state);
  if (!gate || gate.id !== choiceId) return [event('info', '靠近前方導航門，再比較兩條可行支路。')];
  const option = gate.options.find((item) => item.id === optionId && item.available);
  if (!option) return [event('info', '請選擇這個導航門提供的航路。')];
  state.voyage.routeChoices ||= [];
  state.voyage.routeChoices.push({ id: gate.id, choiceId: gate.id, direction: gate.direction, optionId, time: state.time, tideHeight: tideAt(state.time).height, cargoCount: state.cargo.length, legIndex: state.voyage.legIndex });
  state.voyage.navigation = { choiceId: gate.id, optionId, label: option.label, waypoints: option.waypoints.map((point) => ({ ...point })), index: 0, legIndex: state.voyage.legIndex };
  return [event('route-choice', `已選${option.label}。${option.condition} 請手動駛向藍色航路點；隨時可取消引導。`, { choiceId: gate.id, optionId })];
}

export function cancelRoute(state) {
  state.voyage.navigation = null;
  return [event('route-cancelled', '已取消路點引導，保留這次選路紀錄；可手動航行並在下一個門重新選路。')];
}

export function nearestObservation(state, radius = 45, { includeSkipped = false } = {}) {
  if (state.mode !== 'sailing') return null;
  return OBSERVATIONS.map((item) => ({ ...item, distance: distance(state.boat, item) }))
    .filter((item) => item.distance <= radius && !state.voyage.harvested.includes(`observation:${item.id}`) && (includeSkipped || !state.voyage.skippedObservations?.includes(item.id)))
    .sort((a, b) => a.distance - b.distance)[0] || null;
}

export function skipObservation(state, id) {
  const item = OBSERVATIONS.find((entry) => entry.id === id);
  if (state.mode !== 'sailing' || !item || distance(state.boat, item) > 45 || state.voyage.harvested.includes(`observation:${id}`)) return [event('info', '靠近尚未取樣的觀測浮標，才能選擇繼續直航。')];
  state.voyage.skippedObservations ||= [];
  addUnique(state.voyage.skippedObservations, id);
  return [event('observation-skipped', `已記錄直航選擇：略過${item.name}，保留時間與貨艙。稍後仍可返回取樣。`, { observationId: id })];
}

export function collectObservation(state, id = nearestObservation(state, 9, { includeSkipped: true })?.id) {
  const item = OBSERVATIONS.find((entry) => entry.id === id);
  if (state.mode !== 'sailing' || !item || distance(state.boat, item) > 9) return [event('info', '進入觀測浮標 9 公尺內並收帆，按 E 取樣。')];
  const cargoId = `observation:${id}`;
  if (state.voyage.harvested.includes(cargoId)) return [event('info', '這座浮標本趟已取樣；可繼續直航。')];
  if (state.boat.speed > 1.4) return [event('info', '取樣需要低航速：先按空白鍵收帆，再按 E。')];
  if (state.cargo.length >= getRig(state.rigId).capacity) return [event('info', '貨艙已滿，這座浮標尚未消耗；返港交付後再來，或繼續直航。')];
  state.cargo.push(cargoId);
  state.voyage.harvested.push(cargoId);
  return [event('observation', `已取樣${item.name}。${item.note} 普通貨物 1 件，返港可得 3 航海印記。`, { observationId: id })];
}

export function depart(state, contractId = state.contractId, rigId = state.rigId) {
  if (!['harbor', 'island', 'result'].includes(state.mode)) return [event('info', '請先靠港，再規劃下一段航程。')];
  if (state.currentIsland === 'harbor') {
    if (CONTRACTS.some((item) => item.id === contractId)) state.contractId = contractId;
    if (RIGS.some((item) => item.id === rigId)) state.rigId = rigId;
    state.boat.hull = 100;
    state.lowHullWarned = false;
    state.voyage = { active: true, startedAt: state.time, elapsed: 0, damage: 0, harvested: [], observed: [], skippedObservations: [], visited: ['harbor'], rescued: false, legIndex: 0, routeChoices: [], navigation: null };
    state.elapsed = 0;
  } else if (!state.voyage.active) {
    state.voyage.active = true;
  }
  if (state.currentIsland !== 'harbor') state.voyage.legIndex = (state.voyage.legIndex ?? -1) + 1;
  state.voyage.navigation = null;
  const island = getIsland(state.currentIsland || state.lastSafeIsland);
  state.boat.x = island.dock.x;
  state.boat.z = island.dock.z;
  // Facing away from land makes every departure physically possible without reversing.
  state.boat.heading = Math.atan2(island.dock.x - island.x, -(island.dock.z - island.z));
  // Leave one metre beyond the hull collision margin so an inward current cannot
  // damage a newly undocked, still-furled boat before the player raises its sail.
  const departureOffset = Math.max(0, island.radius + 8 - distance(island, island.dock));
  if (departureOffset > 0) {
    state.boat.x += Math.sin(state.boat.heading) * departureOffset;
    state.boat.z -= Math.cos(state.boat.heading) * departureOffset;
  }
  state.boat.sail = 0;
  state.boat.speed = 0;
  state.mode = 'sailing';
  state.currentIsland = null;
  state.activeDive = null;
  state.result = null;
  state.contactCooldown = 0;
  return [event('depart', `離開${island.name}。船頭已朝外海，先按 W 直行離岸，再轉向目的地；靠港前按空白鍵收帆。`)];
}

function putAtDock(state, island) {
  state.voyage.navigation = null;
  state.boat.x = island.dock.x; state.boat.z = island.dock.z;
  state.boat.speed = 0; state.boat.sail = 0;
  state.currentIsland = island.id; state.lastSafeIsland = island.id;
  state.activeDive = null;
  state.diver = { ...island.dock };
  state.oxygen = 55;
}

export function dock(state) {
  if (state.mode === 'diving') return [event('info', '先按「浮出回船」，就能安全靠港。')];
  const island = [...ISLANDS].sort((a, b) => distance(state.boat, a.dock) - distance(state.boat, b.dock))[0];
  if (distance(state.boat, island.dock) > 13) return [event('info', '靠近金色泊位標記，再按 E 靠岸。')];
  if (state.boat.speed > 1.4) return [event('info', '航速太快：按空白鍵快速收帆，再按 E 靠岸。')];
  putAtDock(state, island);
  state.boat.hull = 100;
  state.lowHullWarned = false;
  addUnique(state.voyage.visited, island.id);
  state.mode = island.id === 'harbor' ? 'harbor' : 'island';
  const events = [event('dock', `已靠岸${island.name}，船體免費修復。${island.id === 'harbor' ? '可重新選擇委託、帆裝與潮汐。' : '按 E 調查；可再出發或展開淺水探索。'}`, { islandId: island.id })];
  if (island.id !== 'harbor' || !state.voyage.active) return events;

  const contract = CONTRACTS.find((item) => item.id === state.contractId);
  const firstDelivery = contract && contractProgress(state).readyToDeliver && !state.completed.includes(contract.id);
  if (firstDelivery) {
    state.completed.push(contract.id);
    state.credits += contract.reward;
    events.push(event('delivery', `委託完成：${contract.name}，獲得 ${contract.reward} 航海印記。${CREDITS_DESCRIPTION}`, { contractId: contract.id, reward: contract.reward }));
  }
  const cargoReward = state.cargo.length * 3;
  state.credits += cargoReward;
  state.cargo = [];
  const didExplore = state.voyage.visited.some((id) => id !== 'harbor');
  if (didExplore) {
    state.records.voyages += 1;
    if (!state.voyage.rescued) {
      state.records.bestTime = state.records.bestTime === null ? state.voyage.elapsed : Math.min(state.records.bestTime, state.voyage.elapsed);
      state.records.bestDamage = state.records.bestDamage === null ? state.voyage.damage : Math.min(state.records.bestDamage, state.voyage.damage);
    }
  }
  if (contract && contractProgress(state).readyToDeliver && !state.voyage.rescued) {
    state.records.byContract ||= {};
    const prior = state.records.byContract[contract.id];
    state.records.byContract[contract.id] = {
      bestTime: prior ? Math.min(prior.bestTime, state.voyage.elapsed) : state.voyage.elapsed,
      bestDamage: prior ? Math.min(prior.bestDamage, state.voyage.damage) : state.voyage.damage,
      voyages: (prior?.voyages || 0) + 1,
    };
  }
  const firstEnding = state.lighthouseFixed && !state.storyComplete;
  if (firstEnding) {
    state.storyComplete = true;
    events.push(event('ending', '遠潮燈塔重燃，港口為你的完整返航亮起歡迎燈！故事完成，自由航程已開放。'));
  }
  state.result = {
    title: firstEnding ? '燈火重逢，歡迎回家' : firstDelivery ? '委託完成' : '平安返航',
    text: firstEnding ? '三件零件重新連起七島。繼續自由航行，完成全圖鑑、六份委託，挑戰更快且無損的航線。' : firstDelivery ? `${contract.name}已交付。你的海圖保存了這次發現；可選下一份委託或重走航線挑戰紀錄。` : contract && !contractProgress(state).readyToDeliver ? '本趟委託未完成；下趟需重新完成調查清單，圖鑑與零件保留。所有修復免費。' : '本趟完整調查已完成，委託獎勵不重發；可比較本委託紀錄。圖鑑與主線零件已保存。',
    elapsed: state.voyage.elapsed, damage: state.voyage.damage, reward: (firstDelivery ? contract.reward : 0) + cargoReward,
    creditsDescription: CREDITS_DESCRIPTION,
    discoveries: state.discoveries.length, parts: state.parts.length, rescued: state.voyage.rescued,
  };
  state.mode = 'result';
  state.voyage.active = false;
  return events;
}

function discover(state, id, events) {
  const item = DISCOVERIES.find((entry) => entry.id === id);
  if (!item) return;
  state.voyage.observed ||= [];
  const firstThisVoyage = addUnique(state.voyage.observed, id);
  if (addUnique(state.discoveries, id)) events.push(event('discovery', `圖鑑新增：${item.name}。${item.description}`, { discoveryId: id }));
  else if (firstThisVoyage) events.push(event('observation', `本趟已再次調查：${item.name}。${item.description}`, { discoveryId: id }));
  if (!state.voyage.harvested.includes(id) && state.cargo.length < getRig(state.rigId).capacity) {
    addUnique(state.cargo, id);
    addUnique(state.voyage.harvested, id);
  } else if (firstThisVoyage && state.cargo.length >= getRig(state.rigId).capacity) events.push(event('info', '調查與委託進度已記錄；貨艙已滿，這次不增加普通貨物。主線零件仍可取得。'));
}

export function interact(state) {
  if (state.mode === 'sailing') {
    if (ISLANDS.some((island) => distance(state.boat, island.dock) <= 13)) return dock(state);
    const observation = nearestObservation(state, 9, { includeSkipped: true });
    return observation ? collectObservation(state, observation.id) : dock(state);
  }
  if (state.mode === 'diving') {
    const site = getSite(state.activeDive);
    if (!site) return surface(state);
    if (distance(state.diver, site.target) > 4.5) return [event('info', '沿發光路標游向金色目標，靠近後按 E；氣泡可補充氧氣。')];
    const events = [];
    discover(state, site.discoveryId, events);
    if (addUnique(state.parts, site.partId)) events.push(event('part', `取得燈塔零件：${site.partName}（${state.parts.length}/3）。主線零件在救援與重載後都會保留。`, { partId: site.partId }));
    state.diveCollected = true;
    if (!events.length) events.push(event('info', '這片淺灣已完成調查。可回到船旁，或按「浮出回船」。'));
    return events;
  }
  if (state.mode === 'harbor' || (state.mode === 'result' && state.currentIsland === 'harbor')) return [event('info', '選擇委託與帆裝，再按「揚帆出港」。先看海圖與未來兩段潮汐。')];
  if (state.mode !== 'island') return [];
  const island = getIsland(state.currentIsland);
  const events = [];
  for (const id of island.discoveries) {
    if (!DISCOVERIES.find((item) => item.id === id)?.diveSiteId) discover(state, id, events);
  }
  if (island.id === 'lighthouse') {
    if (state.parts.length === DIVE_SITES.length && !state.lighthouseFixed) {
      state.lighthouseFixed = true;
      events.push(event('lighthouse', '三件零件嵌入燈塔，光束重返海面！最後一步：駛回潮音港完成返航慶祝。'));
    } else if (!state.lighthouseFixed) {
      events.push(event('info', `燈塔還需要 ${3 - state.parts.length} 件零件。珊瑚灣、星盤島與琉璃礁的淺灣各藏有一件。`));
    }
  }
  if (!events.length) events.push(event('info', `${island.name}的岸上調查已完成。${island.diveSiteId ? '這裡還有淺水探索點。' : '可以前往下一座島，或回母港交付。'}`));
  return events;
}

export function startDive(state, siteId) {
  const site = getSite(siteId);
  if (state.mode !== 'island' || !site || site.islandId !== state.currentIsland) return [event('info', '請先靠岸到該淺水點所在島嶼。')];
  state.activeDive = site.id;
  state.mode = 'diving';
  state.oxygen = site.oxygen;
  state.diver = { ...site.entry };
  state.diveCollected = state.parts.includes(site.partId);
  return [event('dive', `${site.name}：方向鍵／WASD 游動，靠近金色目標按 E；氣泡補氧，隨時可浮出回船。`)];
}

export function surface(state) {
  if (state.mode !== 'diving') return [];
  const site = getSite(state.activeDive);
  state.mode = 'island';
  state.voyage.navigation = null;
  state.currentIsland = site?.islandId || state.lastSafeIsland;
  state.activeDive = null;
  state.oxygen = 55;
  state.diver = { x: state.boat.x, z: state.boat.z };
  return [event('surface', '已安全回船。圖鑑與零件已保存；可重新潛水或繼續航行。')];
}

export function rescue(state, reason = '船體受損') {
  const origin = state.mode === 'diving' ? state.diver : state.boat;
  const island = [...ISLANDS].sort((a, b) => distance(origin, a.dock) - distance(origin, b.dock))[0];
  const lost = Math.ceil(state.cargo.length / 2);
  state.cargo = state.cargo.slice(lost);
  putAtDock(state, island);
  state.boat.hull = 100;
  state.lowHullWarned = false;
  state.voyage.rescued = true;
  state.records.rescues += 1;
  state.mode = island.id === 'harbor' ? 'harbor' : 'island';
  state.result = null;
  state.contactCooldown = 2;
  return [event('rescue', `${reason}，救援船已送你回${island.name}。普通貨物損失 ${lost} 件；圖鑑、零件與已交付獎勵全部保留。船已免費修復，可以立即再出發。`, { islandId: island.id, lost })];
}

function damage(state, amount, text, events) {
  if (state.contactCooldown > 0) return;
  const applied = Math.min(state.boat.hull, amount);
  state.boat.hull -= applied;
  state.voyage.damage += applied;
  state.contactCooldown = 1.2;
  events.push(event('damage', text));
  if (state.boat.hull <= 0) events.push(...rescue(state, '船體失去浮力'));
  else if (state.boat.hull < 25 && !state.lowHullWarned) {
    state.lowHullWarned = true;
    const nearest = [...ISLANDS].sort((a, b) => distance(state.boat, a.dock) - distance(state.boat, b.dock))[0];
    events.push(event('warning', `船體低於 25%！最近安全港是${nearest.name}，靠岸即可免費修復。`));
  }
}

export function step(state, dt, input = {}) {
  const events = [];
  const duration = clamp(finite(dt), 0, 30);
  if (duration === 0) return events;
  const count = Math.ceil(duration / 0.05), delta = duration / count;
  const tideBefore = tideAt(state.time).label;
  const forecastWindowBefore = Math.floor((state.time + 30) / (TIDE_PERIOD / 4));
  for (let i = 0; i < count; i += 1) {
    state.time += delta;
    state.contactCooldown = Math.max(0, state.contactCooldown - delta);
    state.warningCooldown = Math.max(0, state.warningCooldown - delta);
    if (state.voyage.active) { state.voyage.elapsed += delta; state.elapsed = state.voyage.elapsed; }
    if (state.mode === 'diving') {
      const site = getSite(state.activeDive);
      if (!site) { events.push(...surface(state)); continue; }
      let dx = clamp(finite(input.diveX), -1, 1), dz = clamp(finite(input.diveZ), -1, 1);
      const magnitude = Math.hypot(dx, dz);
      if (magnitude > 1) { dx /= magnitude; dz /= magnitude; }
      state.diver.x += dx * delta * 2;
      state.diver.z += dz * delta * 2;
      const d = distance(state.diver, site.entry);
      if (d > site.radius) {
        state.diver.x = site.entry.x + (state.diver.x - site.entry.x) / d * site.radius;
        state.diver.z = site.entry.z + (state.diver.z - site.entry.z) / d * site.radius;
      }
      state.oxygen -= delta;
      if (site.bubbles.some((bubble) => distance(state.diver, bubble) < 3.5)) {
        state.oxygen = Math.min(site.oxygen, state.oxygen + delta * 7);
        if (state.warningCooldown === 0) { events.push(event('bubble', '氣泡正在補充氧氣。')); state.warningCooldown = 5; }
      }
      if (state.oxygen < 12 && state.warningCooldown === 0) { events.push(event('warning', '氧氣不足：靠近氣泡或立即按「浮出回船」。')); state.warningCooldown = 8; }
      if (state.oxygen <= 0) events.push(...rescue(state, '潛水氧氣耗盡'));
      continue;
    }
    if (state.mode !== 'sailing') continue;
    const boat = state.boat, rig = getRig(state.rigId);
    boat.sail = input.brake ? Math.max(0, boat.sail - delta * 4) : clamp(boat.sail + finite(input.sailDelta) * delta * 0.65, 0, 1);
    boat.heading += clamp(finite(input.turn), -1, 1) * rig.handling * delta * (0.45 + 0.55 * Math.min(1, boat.speed / rig.speed));
    boat.heading = Math.atan2(Math.sin(boat.heading), Math.cos(boat.heading));
    const windAngle = -Math.PI / 4 + (state.seed - 1) * 0.035;
    const windEfficiency = 0.52 + 0.48 * (Math.cos(boat.heading - windAngle) + 1) / 2;
    const targetSpeed = rig.speed * boat.sail * windEfficiency;
    boat.speed += (targetSpeed - boat.speed) * Math.min(1, delta * (input.brake ? 5 : 1.35));
    const current = currentAt(boat.x, boat.z, state.time, state.seed);
    boat.x += (Math.sin(boat.heading) * boat.speed + current.x) * delta;
    boat.z += (-Math.cos(boat.heading) * boat.speed + current.z) * delta;
    for (const island of ISLANDS) {
      const d = distance(boat, island), boundary = island.radius + 7;
      if (d >= boundary) continue;
      const vx = d > 0.001 ? (boat.x - island.x) / d : 0;
      const vz = d > 0.001 ? (boat.z - island.z) / d : -1;
      boat.x = island.x + vx * boundary;
      boat.z = island.z + vz * boundary;
      boat.speed *= 0.35;
      damage(state, 8, `擦碰${island.name}岸線，船體受損。沿岸外側駛向金色泊位。`, events);
      if (state.mode !== 'sailing') break;
    }
    if (state.mode !== 'sailing') continue;
    const tide = tideAt(state.time);
    for (const reef of REEFS) {
      if (tide.height > reef.safeHeight || distance(boat, reef) >= reef.radius + 1) continue;
      boat.speed *= Math.max(0.5, 1 - delta * 2);
      damage(state, 7, `${reef.name}水位不足，擦礁受損。繞開紅色礁圈或等待漲潮。`, events);
    }
    for (const whirl of WHIRLS) {
      if (whirlActive(whirl, state.time) && distance(boat, whirl) < whirl.radius * 0.45) damage(state, 5, `${whirl.name}正活躍，向外圈轉舵脫離。`, events);
    }
    if (Math.abs(boat.x) > WORLD_BOUND - 5 || Math.abs(boat.z) > WORLD_BOUND - 5) {
      boat.x = clamp(boat.x, -WORLD_BOUND + 5, WORLD_BOUND - 5);
      boat.z = clamp(boat.z, -WORLD_BOUND + 5, WORLD_BOUND - 5);
      boat.speed *= 0.8;
      if (state.warningCooldown === 0) { events.push(event('warning', '已到海圖邊界，請轉舵回到七島海域。')); state.warningCooldown = 5; }
    }
    const navigation = state.voyage.navigation;
    if (navigation && navigation.legIndex === state.voyage.legIndex) {
      while (navigation.waypoints[navigation.index] && distance(boat, navigation.waypoints[navigation.index]) <= 8) navigation.index += 1;
      if (navigation.index === navigation.waypoints.length) {
        state.voyage.navigation = null;
        events.push(event('route-arrival', '已通過所選支路；可以繼續駛向目的島，或在下一個導航門比較路況。'));
      }
    }
  }
  if (tideAt(state.time).label !== tideBefore) events.push(event('tide', `潮汐轉為${tideAt(state.time).label}。海圖上的潮流、淺礁與旋流已同步更新。`));
  if (Math.floor((state.time + 30) / (TIDE_PERIOD / 4)) > forecastWindowBefore) {
    const tide = tideAt(state.time);
    events.push(event('tide-forecast', `潮汐預報：約 ${Math.ceil(tide.secondsToChange)} 秒後轉為${tide.nextLabel}。${tide.forecast[0].description}`, { startsIn: tide.secondsToChange, nextLabel: tide.nextLabel }));
  }
  return events;
}

export function advanceTide(state) {
  if (!['harbor', 'result'].includes(state.mode) || state.currentIsland !== 'harbor') return [event('info', '只有潮音港可以安全等待下一潮。')];
  state.time += tideAt(state.time).secondsToChange + 0.001;
  return [event('tide', `已休息至${tideAt(state.time).label}，船體與氧氣不受影響。`)];
}

export function serialize(state) {
  return JSON.stringify({ ...state, schemaVersion: 1, savedAtSafeIsland: state.lastSafeIsland });
}

const cleanIds = (value, allowed) => [...new Set(Array.isArray(value) ? value.filter((id) => allowed.includes(id)) : [])];
export function restore(raw) {
  const fallback = (message) => ({ state: createState(), message });
  if (raw === null || raw === undefined || raw === '') return fallback('新航程準備好了。選擇第一份委託，從潮音港開始。');
  let saved;
  try { saved = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { return fallback('存檔格式損壞，已安全建立新航程。'); }
  if (!saved || typeof saved !== 'object' || Array.isArray(saved) || saved.schemaVersion !== 1) return fallback('存檔版本不相容，已安全建立新航程。');
  if (!Number.isFinite(saved.time) || !Number.isFinite(saved.seed) || saved.time < 0) return fallback('存檔時間或海流種子無效，已安全建立新航程。');
  const state = createState(saved.seed);
  state.time = saved.time;
  state.discoveries = cleanIds(saved.discoveries, DISCOVERIES.map((item) => item.id));
  state.parts = cleanIds(saved.parts, DIVE_SITES.map((item) => item.partId));
  state.completed = cleanIds(saved.completed, CONTRACTS.map((item) => item.id));
  state.rigId = getRig(saved.rigId).id;
  state.contractId = CONTRACTS.some((item) => item.id === saved.contractId) ? saved.contractId : CONTRACTS[0].id;
  const cargoIds = [...DISCOVERIES.map((item) => item.id), ...OBSERVATIONS.map((item) => `observation:${item.id}`)];
  state.cargo = cleanIds(saved.cargo, cargoIds).slice(0, getRig(state.rigId).capacity);
  state.lighthouseFixed = saved.lighthouseFixed === true && state.parts.length === 3;
  state.storyComplete = saved.storyComplete === true && state.lighthouseFixed;
  state.credits = clamp(finite(saved.credits), 0, 1e9);
  for (const key of ['bestTime', 'bestDamage']) state.records[key] = Number.isFinite(saved.records?.[key]) && saved.records[key] >= 0 ? saved.records[key] : null;
  for (const key of ['voyages', 'rescues']) state.records[key] = Math.floor(clamp(finite(saved.records?.[key]), 0, 1e6));
  state.records.byContract = {};
  for (const contract of CONTRACTS) {
    const record = saved.records?.byContract?.[contract.id];
    if (record && Number.isFinite(record.bestTime) && record.bestTime >= 0 && Number.isFinite(record.bestDamage) && record.bestDamage >= 0) state.records.byContract[contract.id] = { bestTime: record.bestTime, bestDamage: record.bestDamage, voyages: Math.floor(clamp(finite(record.voyages), 0, 1e6)) };
  }
  const previousVoyage = saved.voyage || {};
  state.voyage = {
    active: previousVoyage.active === true, startedAt: Math.max(0, finite(previousVoyage.startedAt)),
    elapsed: Math.max(0, finite(previousVoyage.elapsed)), damage: Math.max(0, finite(previousVoyage.damage)),
    harvested: cleanIds(previousVoyage.harvested, cargoIds),
    observed: cleanIds(previousVoyage.observed ?? previousVoyage.harvested, DISCOVERIES.map((item) => item.id)),
    skippedObservations: cleanIds(previousVoyage.skippedObservations, OBSERVATIONS.map((item) => item.id)),
    legIndex: Math.floor(Math.max(0, finite(previousVoyage.legIndex))),
    routeChoices: (Array.isArray(previousVoyage.routeChoices) ? previousVoyage.routeChoices : []).filter(validSavedRouteChoice).slice(-100).map((choice) => ({ id: choice.id, choiceId: choice.id, direction: choice.direction, optionId: choice.optionId, time: Math.max(0, finite(choice.time)), tideHeight: clamp(finite(choice.tideHeight), -1, 1), cargoCount: Math.floor(clamp(finite(choice.cargoCount), 0, 14)), legIndex: Math.floor(Math.max(0, finite(choice.legIndex))) })),
    navigation: null,
    visited: cleanIds(previousVoyage.visited, ISLANDS.map((item) => item.id)), rescued: previousVoyage.rescued === true,
  };
  state.elapsed = state.voyage.elapsed;
  const safeIsland = getIsland(saved.lastSafeIsland);
  putAtDock(state, safeIsland);
  state.mode = safeIsland.id === 'harbor' ? 'harbor' : 'island';
  const interrupted = saved.mode === 'sailing' || saved.mode === 'diving';
  if (interrupted) {
    state.cargo = state.cargo.slice(Math.ceil(state.cargo.length / 2));
    state.voyage.rescued = true;
    return { state, message: `已回到最近安全港${safeIsland.name}。中途離開保留一半普通貨物；圖鑑、主線零件與已交付獎勵完整保留，離線不消耗氧氣或潮汐。` };
  }
  return { state, message: `已恢復${safeIsland.name}的靠港紀錄。潮汐、圖鑑、零件與獎勵保持不變；船已免費修復。` };
}
