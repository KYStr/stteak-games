// Hand-authored flight geography. All positions here are already in world metres;
// only world.js scales the six island centres. Times below are design budgets,
// never predicates, cooldowns, minimum durations or measured player results.
const point = (x, y, z) => ({ x, y, z });
const island = (islands, id) => islands.find((entry) => entry.id === `island-${id}`);
const above = (entry, height = 26) => point(entry.x, entry.y + height, entry.z);
const direction = (a, b) => {
  const length = Math.hypot(b.x - a.x, b.z - a.z) || 1;
  return { x: (b.x - a.x) / length, z: (b.z - a.z) / length };
};
export const pathLength = (points) => Math.round(points.slice(1).reduce((sum, p, i) =>
  sum + Math.hypot(p.x - points[i].x, p.y - points[i].y, p.z - points[i].z), 0));

const MAIN = [
  {
    mission: 1, from: 'camp', to: 'reed', type: 'survey', title: '校準蘆光風標',
    roles: ['起風基準', '上升剖面', '高層風速', '熱流出流', '側風補償', '低層回流', '定向復核', '校準交付'],
    safe: [
      [-60, 32, -150], [-280, 55, -300], [-520, 82, -360], [-690, 72, -510],
      [-680, 44, -700], [-530, 40, -875], [-350, 38, -885], [-308, 34, -712],
    ],
    shortcut: [
      [60, 30, -125], [20, 60, -260], [-70, 86, -375], [-150, 58, -490],
      [-265, 42, -580], [-390, 52, -650], [-410, 34, -760], [-308, 34, -712],
    ],
    decisions: ['在低層先對齊風向再起速', '藉熱流取得高處樣本而非直接越島', '穿過側風後修正航向再過門', '降回交付高度，保留落地能量'],
    descriptions: {
      safe: '沿外側寬風廊取得八份風層樣本；補能熱流多、急降少，路程較長。',
      shortcut: '沿中央窄風廊取得相同八份樣本；較短但高低轉換、航向及能量要求較高。',
    },
  },
  {
    mission: 2, from: 'reed', to: 'storm', type: 'carry', title: '運送定向星儀',
    roles: ['星儀接載', '第一段定向', '斷橋轉運', '高層避雷', '平穩出流', '第二段定向', '降落前復核', '星儀交付'],
    safe: [
      [-170, 40, -870], [70, 50, -1080], [300, 58, -1260], [510, 72, -1410],
      [755, 64, -1290], [1000, 58, -1100], [1120, 48, -930], [1008, 54, -792],
    ],
    shortcut: [
      [-155, 42, -700], [10, 70, -660], [190, 90, -660], [390, 94, -610],
      [580, 72, -680], [775, 62, -730], [935, 54, -875], [1008, 54, -792],
    ],
    decisions: ['起航後先穩住高度再運送', '選斷橋外緣或雷心上層', '預留轉彎距離，避免急降後才找交付門', '帶著餘能與正確航向抵達天文台'],
    descriptions: {
      safe: '繞斷橋外緣運送八段定向紀錄；轉彎較寬、穩定度門檻較寬鬆。',
      shortcut: '從雷脊高層運送同一星儀；路短，但必須提早爬升並平穩穿過窄風門。',
    },
  },
  {
    mission: 3, from: 'storm', to: 'dawn', type: 'observe', title: '重建歸星方位',
    roles: ['北方基線', '第一條視線', '霧邊辨向', '書庫方位', '第二條視線', '交會點驗證', '歸星航向', '星圖交付'],
    safe: [
      [1130, 60, -600], [1220, 72, -350], [1080, 52, -90], [930, 44, 90],
      [850, 58, 260], [690, 46, 470], [440, 36, 650], [272, 30, 728],
    ],
    shortcut: [
      [860, 60, -650], [720, 82, -440], [660, 66, -210], [560, 50, 25],
      [455, 68, 220], [325, 48, 425], [180, 34, 600], [272, 30, 728],
    ],
    decisions: ['從兩個不同方位辨認同一片航域', '在低層節能與高層視野間取捨', '先對齊可見的實體航標，再進入霧帶', '依交會方位完成南向返程'],
    descriptions: {
      safe: '沿書庫外緣取得八個方位節點；航標清楚、補能較充足，但距離較長。',
      shortcut: '從中央霧廊取得同義方位節點；較短但必須更準確對齊航向並控制高度。',
    },
  },
];

function mainConditions(mission, index, style) {
  const safe = style === 'safe';
  if (mission === 1) return {
    ...([0, 2, 4].includes(index) ? { minSpeed: safe ? 10 : 13 } : {}),
    ...([2, 5].includes(index) ? { minEnergy: safe ? 30 : 45 } : {}),
    ...(index === 6 ? { maxVerticalSpeed: safe ? 4 : 3 } : {}),
  };
  if (mission === 2) return {
    maxVerticalSpeed: safe ? 3.5 : 2.7,
    ...([3, 6, 7].includes(index) ? { minEnergy: safe ? 25 : 40 } : {}),
  };
  return {
    ...([1, 3, 5, 6].includes(index) ? { maxVerticalSpeed: safe ? 3.5 : 2.8 } : {}),
    ...(index === 4 ? { minEnergy: safe ? 25 : 40 } : {}),
  };
}
function conditionText(sample) {
  return [sample.minSpeed ? `速度至少 ${sample.minSpeed} m/s` : '',
    sample.minEnergy ? `帆能量至少 ${sample.minEnergy}%` : '',
    sample.maxVerticalSpeed ? `垂直速度不超過 ${sample.maxVerticalSpeed} m/s` : '',
    sample.heading ? '沿風廊方向對齊入門' : '穿過立體標記'].filter(Boolean).join('；');
}

export function createMainRoutes(islands) {
  const routes = [];
  for (const plan of MAIN) for (const style of ['safe', 'shortcut']) {
    const from = island(islands, plan.from), to = island(islands, plan.to);
    const start = above(from), samples = [];
    plan[style].forEach(([x, y, z], index) => {
      const sample = { id: `sample-main-${plan.mission}-${index + 1}`, name: plan.roles[index],
        type: plan.type, x, y, z, radius: 15, ...mainConditions(plan.mission, index, style) };
      if ((plan.mission === 1 && [4, 6].includes(index)) ||
          (plan.mission === 2 && [1, 3, 5, 6].includes(index)) ||
          (plan.mission === 3 && index !== 0 && index !== 7)) {
        sample.heading = { ...direction(samples[index - 1] || start, sample), minDot: style === 'safe' ? 0.65 : 0.82 };
      }
      sample.instruction = `${sample.name}：${conditionText(sample)}。${index === 7 ? '取得後在島中央落地按 E 交付。' : '取樣不需等待，完成後立即飛往下一節點。'}`;
      samples.push(sample);
    });
    const waypoints = [start, ...samples, above(to)];
    routes.push({ id: `route-${plan.mission}-${style}`, mission: plan.mission, style,
      from: from.id, to: to.id, name: `第 ${plan.mission} 航線 · ${style === 'safe' ? '安全風道' : '穿雲捷徑'}`,
      title: plan.title, theme: plan.type, description: plan.descriptions[style], samples, waypoints,
      distanceMeters: pathLength(waypoints), decisions: plan.decisions, designBudgetMinutes: [2.3, 3.5] });
  }
  const from = island(islands, 'dawn'), to = island(islands, 'camp');
  for (const style of ['safe', 'shortcut']) {
    const waypoints = [above(from), above(to)];
    routes.push({ id: `route-4-${style}`, mission: 4, style, from: from.id, to: to.id,
      name: `返航 · ${style === 'safe' ? '安全風道' : '穿雲捷徑'}`, title: '帶星圖回家', theme: 'return', samples: [], waypoints,
      description: style === 'safe' ? '沿寬廣、補能充足的歸航風廊，返回營地中央落地按 E 結算。' : '沿較快的窄風廊返航；預留降落能量，回營地中央按 E 結算。',
      distanceMeters: pathLength(waypoints), decisions: ['選寬風廊穩定返航，或窄風廊快速返航', '提早下降，避免越過營地後回頭'], designBudgetMinutes: [0.8, 1.3] });
  }
  return routes;
}

function corridor(id, start, end, options = {}) {
  const y = Math.min(start.y, end.y) - 26;
  return { id, type: 'tailwind', name: options.name || '分層航道', start: { ...start }, end: { ...end },
    x: (start.x + end.x) / 2, y, z: (start.z + end.z) / 2,
    radius: 26, height: Math.abs(end.y - start.y) + 58, ceiling: end.y + 1,
    strength: 2.4, charge: 4.8, liftCap: 6, direction: { ...direction(start, end), y: 0 }, ...options };
}
function thermal(id, target, options = {}) {
  return { id, type: 'thermal', name: '航段補給熱流', x: target.x, y: target.y - 35, z: target.z,
    radius: 24, height: 70, ceiling: target.y + 2, strength: 7.5, charge: 8,
    direction: { x: 0, y: 1, z: 0 }, ...options };
}
function crosswind(id, start, end, options = {}) {
  const forward = direction(start, end);
  return { id, type: 'crosswind', name: '可讀的脈動側流',
    x: (start.x + end.x) / 2, y: Math.min(start.y, end.y) - 24, z: (start.z + end.z) / 2,
    radius: 64, height: Math.abs(end.y - start.y) + 64, strength: 4.5, period: 8,
    direction: { x: -forward.z, y: 0, z: forward.x }, ...options };
}
export function createRouteWinds(routes) {
  const winds = [];
  for (const route of routes) for (let index = 1; index < route.waypoints.length; index++) {
    const start = route.waypoints[index - 1], end = route.waypoints[index];
    if (Math.hypot(end.x - start.x, end.z - start.z) < 0.1) continue;
    const safe = route.style === 'safe', tags = { routeId: route.id, mission: route.mission, sample: index - 1, style: route.style };
    winds.push(corridor(`wind-${route.id}-${index}`, start, end, { ...tags,
      radius: safe ? 26 : 17, strength: safe ? 2.8 : 4, charge: safe ? 5.2 : 3.9, liftCap: safe ? 6 : 7 }));
    if (end.y - start.y >= 10 || (safe && index % 3 === 1))
      winds.push(thermal(`wind-${route.id}-thermal-${index}`, end, { ...tags, radius: safe ? 26 : 21, charge: safe ? 8 : 6.5 }));
    if ((route.mission === 1 && index === 5) || (route.mission === 2 && [4, 7].includes(index)))
      winds.push(crosswind(`wind-${route.id}-side-${index}`, start, end, { ...tags, strength: safe ? 3.3 : 5.2, radius: safe ? 50 : 60 }));
  }
  return winds;
}

// Progress along the from->to axis is strictly increasing: these are broad
// ridge/lee/S approaches, not repeated circuits or artificial turn-back loops.
const PROFILES = {
  lee: [0, 0.32, 0.74, 1, 0.95, 0.62, 0.28, 0.08, 0],
  rim: [0, -0.36, -0.78, -1, -0.82, -0.5, -0.18, -0.06, 0],
  shear: [0, 0.58, 0.95, 0.48, -0.32, -0.82, -0.6, -0.2, 0],
  ridge: [0, 0.5, 0.95, 0.9, 0.5, 0, -0.32, -0.18, 0],
  descent: [0, -0.3, -0.72, -0.9, -0.55, 0, 0.24, 0.1, 0],
};
const FRACTIONS = [0.06, 0.16, 0.29, 0.43, 0.57, 0.71, 0.84, 0.94, 1];
const ALTITUDES = {
  sweep: [28, 36, 42, 46, 43, 36, 30, 26, 24],
  high: [32, 50, 72, 85, 76, 60, 42, 30, 24],
  rising: [25, 43, 68, 86, 90, 76, 54, 34, 24],
  shelves: [29, 47, 48, 73, 74, 51, 50, 32, 24],
  descending: [38, 65, 82, 72, 55, 39, 30, 25, 24],
  low: [25, 29, 32, 34, 31, 28, 27, 25, 24],
};
const STAGE_PLANS = [
  [
    ['camp', 'bridge', '展帆加速', '讀取順風進入點，先對準再加速；在斷橋交付起速紀錄。', 'lee', 'sweep', 0.30, 'accelerate'],
    ['bridge', 'dawn', '長彎保速', '沿外彎持續修正航向；比較切內線與保留風帶速度。', 'shear', 'low', 0.25, 'corner'],
    ['dawn', 'storm', '高層衝線', '先爬升再接高速風層，勿為搶速度錯過熱流出口。', 'ridge', 'high', 0.28, 'climb-fast'],
    ['storm', 'camp', '帶速返航', '在長下降段保速，末門前提早減速，回營地交付。', 'descent', 'descending', 0.25, 'finish'],
  ],
  [
    ['reed', 'archive', '讀取蓄風點', '交替經過補能段與低供能段；到書庫時保有充足餘能。', 'lee', 'shelves', 0.40, 'harvest'],
    ['archive', 'bridge', '有限能量越脊', '用前半段蓄能穿過高層弱風，避免急轉造成額外消耗。', 'shear', 'high', 0.40, 'budget'],
    ['bridge', 'reed', '餘能回收', '帶著剩餘能量沿背風側降返蘆光庭；不以失速補滿能量。', 'rim', 'descending', 0.42, 'reserve'],
  ],
  [
    ['bridge', 'camp', '辨認階梯熱流', '先低後高地接上三個熱流層，讀懂下一個上升出口。', 'ridge', 'rising', 0.30, 'rise'],
    ['camp', 'storm', '錯層換流', '在中高層風廊之間換流，避免直接拉直航線。', 'shear', 'shelves', 0.32, 'transfer'],
    ['storm', 'archive', '提前收帆', '從高處下降至書庫；提早減速，末門前恢復平穩垂直速度。', 'descent', 'descending', 0.35, 'descend'],
    ['archive', 'bridge', '越脊歸橋', '將爬升、換流與下降接成一次完整越脊，再回斷橋交付。', 'lee', 'high', 0.30, 'combine'],
  ],
  [
    ['storm', 'reed', '側流定向', '先對齊風門，再補償來自左側的脈動，不等待風停。', 'lee', 'sweep', 0.30, 'left-shear'],
    ['reed', 'dawn', '反向風切', '後半段側風方向反轉；觀察箭頭而非沿用上一段修正量。', 'shear', 'shelves', 0.28, 'reverse-shear'],
    ['dawn', 'bridge', '載儀過風脊', '保持定向和高度通過較強側流，沿斷橋外側進場。', 'rim', 'high', 0.26, 'loaded-shear'],
    ['bridge', 'storm', '背風返台', '先利用背風區蓄能，再穩定橫越最後側流交付。', 'ridge', 'descending', 0.32, 'lee-return'],
  ],
  [
    ['archive', 'reed', '尋找第一條視線', '用實體航標逐次確認西北方位，不把未知霧區當作直線捷徑。', 'lee', 'sweep', 0.36, 'sightline'],
    ['reed', 'storm', '高低層交叉定位', '從兩個不同高度重讀航向，建立可見風廊的交會點。', 'ridge', 'shelves', 0.34, 'triangulate'],
    ['storm', 'camp', '失去近景之後', '轉入低層薄霧，依下一個航標及風帶方向接回營地。', 'shear', 'low', 0.35, 'fog-channel'],
    ['camp', 'archive', '帶回完整風圖', '從相反方向辨認先前地標，修正方位後返回書庫交付。', 'rim', 'high', 0.38, 'chart-return'],
  ],
  [
    ['dawn', 'bridge', '空載定線', '先用寬風廊建立穩定路線，觀察下降前需要的準備距離。', 'lee', 'low', 0.28, 'empty-run'],
    ['bridge', 'camp', '滿載穿雲', '攜帶星儀穿過錯層雲廊，避免急升急降後才校正。', 'ridge', 'shelves', 0.30, 'loaded-run'],
    ['camp', 'archive', '交付前平航', '在長轉彎後恢復平航，帶足餘能抵達書庫交付點。', 'shear', 'sweep', 0.35, 'handover'],
    ['archive', 'dawn', '定向返家', '沿下沉風層提早收帆，在歸星臺上方重新穩定後落地。', 'descent', 'descending', 0.35, 'precision-return'],
  ],
];
const KINDS = ['speed', 'energy', 'thermal', 'crosswind', 'fog', 'stability'];
const NAMES = ['初帆競速', '蘆光蓄風', '斷橋升降', '雷脊定向', '書庫探霧', '歸星平航'];
const ENTRY_ISLANDS = ['camp', 'reed', 'bridge', 'storm', 'archive', 'dawn'];

function stageConditions(kind, focus, index) {
  const final = index === FRACTIONS.length - 1;
  if (kind === 'speed') return final ? { maxVerticalSpeed: 3.5 } : { minSpeed: index === 0 ? 12 : focus === 'corner' ? 15 : 16 };
  if (kind === 'energy') return { minEnergy: final ? (focus === 'budget' ? 35 : 48) : [2, 5].includes(index) ? (focus === 'budget' ? 42 : 55) : 25 };
  if (kind === 'thermal') return [3, 6, 8].includes(index) ? { maxVerticalSpeed: focus === 'descend' ? 3 : 4 } : {};
  if (kind === 'crosswind') return { ...([2, 4, 6, 8].includes(index) ? { maxVerticalSpeed: focus === 'loaded-shear' ? 2.8 : 3.5 } : {}), ...(final ? { minEnergy: 25 } : {}) };
  if (kind === 'fog') return [2, 5, 8].includes(index) ? { maxVerticalSpeed: 3.2 } : {};
  return { maxVerticalSpeed: focus === 'empty-run' ? 3.5 : 2.8, ...(final ? { minEnergy: 30 } : {}) };
}
function stageWinds(challengeId, stage, kind, focus) {
  const winds = [];
  for (let gate = 0; gate < stage.gates.length; gate++) {
    const start = gate ? stage.gates[gate - 1] : stage.launch, end = stage.gates[gate];
    const tags = { challengeId, stageId: stage.id, gate, style: 'challenge' };
    const harvesting = kind === 'energy' && [0, 1, 4, 7].includes(gate);
    const charge = kind === 'energy' ? harvesting ? 7 : 2.6 : kind === 'stability' ? 5.2 : 4.8;
    winds.push(corridor(`wind-${stage.id}-leg-${gate + 1}`, start, end, { ...tags,
      name: harvesting ? '蓄風補給段' : kind === 'energy' ? '有限供能段' : `${stage.name}風廊`,
      radius: kind === 'energy' ? 17 : 20, strength: kind === 'speed' ? 3.4 : 1.8,
      charge, liftCap: kind === 'thermal' ? 8 : 6 }));
    if (end.y - start.y > 12 || (kind === 'thermal' && gate % 3 === 1) || harvesting)
      winds.push(thermal(`wind-${stage.id}-rise-${gate + 1}`, end, { ...tags, radius: kind === 'thermal' ? 26 : 22, charge: harvesting ? 9 : 7 }));
    if (kind === 'crosswind' && gate > 0 && gate < 8) {
      const flow = direction(start, end), reverse = focus === 'reverse-shear' && gate >= 4 ? -1 : 1;
      winds.push(crosswind(`wind-${stage.id}-cross-${gate + 1}`, start, end, { ...tags,
        radius: 74, strength: focus === 'loaded-shear' ? 5.6 : 4.6, period: gate % 2 ? 7 : 9,
        direction: { x: -flow.z * reverse, y: 0, z: flow.x * reverse } }));
    }
  }
  return winds;
}
export function createChallenges(islands) {
  return STAGE_PLANS.map((plans, challengeIndex) => {
    const id = `challenge-${challengeIndex + 1}`, kind = KINDS[challengeIndex], home = island(islands, ENTRY_ISLANDS[challengeIndex]);
    const stages = plans.map(([fromId, toId, name, description, profile, altitude, widthRatio, focus], index) => {
      const from = island(islands, fromId), to = island(islands, toId), forward = direction(from, to);
      const perpendicular = { x: -forward.z, z: forward.x }, direct = Math.hypot(to.x - from.x, to.z - from.z);
      const width = Math.min(620, Math.max(260, direct * widthRatio));
      const stage = { id: `${id}-stage-${index + 1}`, name, description, fromIslandId: from.id, toIslandId: to.id,
        focus, landing: true, launch: above(from), gates: [], winds: [],
        decisions: [description, '最後一門位於落點上方；通過後仍需在島中央落地按 E 交付。'] };
      for (let gate = 0; gate < FRACTIONS.length; gate++) {
        const t = FRACTIONS[gate], lateral = PROFILES[profile][gate] * width;
        const sample = { id: `${stage.id}-gate-${gate + 1}`,
          name: gate === 8 ? `${to.name}進場確認` : `${name} · ${gate + 1}`,
          type: kind === 'stability' || focus === 'loaded-shear' ? 'carry' : kind === 'fog' ? 'observe' : 'survey',
          x: from.x + (to.x - from.x) * t + perpendicular.x * lateral,
          y: from.y + (to.y - from.y) * t + ALTITUDES[altitude][gate],
          z: from.z + (to.z - from.z) * t + perpendicular.z * lateral,
          radius: 15, ...stageConditions(kind, focus, gate) };
        if ((kind === 'crosswind' && [1, 3, 5, 7].includes(gate)) ||
            (kind === 'fog' && gate !== 0 && gate !== 8) ||
            (kind === 'stability' && [2, 5, 7].includes(gate)))
          sample.heading = { ...direction(stage.gates[gate - 1] || stage.launch, sample), minDot: kind === 'fog' ? 0.78 : 0.7 };
        sample.instruction = `${sample.name}：${conditionText(sample)}。${gate === 8 ? '降落島中央後按 E，才會保存本階段。' : description}`;
        stage.gates.push(sample);
      }
      stage.winds = stageWinds(id, stage, kind, focus);
      stage.distanceMeters = pathLength([stage.launch, ...stage.gates]);
      stage.designBudgetMinutes = [1.3, 2.2];
      return stage;
    });
    return { id, islandId: home.id, kind, name: NAMES[challengeIndex], courseRevision: 2,
      description: `${stages.length} 段跨島航程：${stages.map((stage) => stage.name).join(' → ')}。每段完成後在目的島中央落地按 E；失速或重載只重試當前段。`,
      x: home.x + (challengeIndex % 2 ? -18 : 18), y: home.y + 22, z: home.z - 18,
      radius: 10, minEnergy: 0, minSpeed: 0, stages,
      // The new controller must read stages. Deliberately no legacy flattened
      // gates/winds: silently replaying the old two-loop controller is invalid.
      distanceMeters: stages.reduce((sum, stage) => sum + stage.distanceMeters, 0),
      designBudgetMinutes: [6, 8], timingStatus: 'design-budget-not-measured' };
  });
}
