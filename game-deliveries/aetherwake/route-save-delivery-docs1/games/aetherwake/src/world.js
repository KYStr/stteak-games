// Metres, Y-up. Player and island Y coordinates refer to the walking surface.
// Content IDs are stable across releases and save migrations.
import { createMainRoutes, createRouteWinds, createChallenges } from './flight-plans.js';

const MAP_SCALE = 4;
export const MODULES = Object.freeze([
  { id: 'turn', name: '燕翼舵', description: '靈活轉向、精準落島；巡航較慢。', speed: 0.92, turn: 1.6, energy: 1 },
  { id: 'reserve', name: '蓄風囊', description: '離開風帶更耐飛；轉向與順風加速較弱。', speed: 0.97, turn: 0.86, energy: 0.7 },
  { id: 'tailwind', name: '逐風鰭', description: '順風加速最強；偏離風帶時更耗能。', speed: 1.08, turn: 1, energy: 1.18 },
]);

const islands = [
  { id: 'island-camp', name: '晨風營地', region: '起風', x: 0, y: 0, z: 0, radius: 38, color: '#9aab74', station: false },
  { id: 'island-reed', name: '蘆光庭', region: '起風', x: -80, y: 8, z: -180, radius: 34, color: '#88ad82', station: true },
  { id: 'island-bridge', name: '斷橋之環', region: '斷橋', x: 90, y: 18, z: -335, radius: 34, color: '#baa17a', station: false },
  { id: 'island-storm', name: '雷雲天文台', region: '雷雲', x: 255, y: 28, z: -195, radius: 41, color: '#8b9d9a', station: true },
  { id: 'island-archive', name: '浮光書庫', region: '斷橋', x: 220, y: 18, z: 25, radius: 34, color: '#9da984', station: false },
  { id: 'island-dawn', name: '歸星臺', region: '雷雲', x: 65, y: 4, z: 185, radius: 38, color: '#b4ab80', station: true },
].map((island) => ({ ...island, x: island.x * MAP_SCALE, z: island.z * MAP_SCALE }));
const p = (x, y, z) => ({ x, y, z });
const routes = createMainRoutes(islands);
const winds = [];
for (const island of islands) {
  winds.push({ id: `wind-lift-${island.id}`, type: 'thermal', name: '起航熱流', x: island.x, y: island.y - 14, z: island.z, radius: island.radius + 11, height: 86, ceiling: island.y + 33, strength: 7, direction: p(0, 1, 0) });
}
winds.push(...createRouteWinds(routes));
winds.push(
  // Weather cells broaden modestly, while launch thermals and route corridors
  // retain their playable metre-scale widths; no blanket radius multiplication.
  { id: 'wind-cross-reed', type: 'crosswind', name: '脈動側風', x: -168, y: -25, z: -384, radius: 74, height: 100, strength: 4.5, period: 8, direction: p(1, 0, 0.2) },
  { id: 'wind-cross-storm', type: 'crosswind', name: '雷脊側風', x: 376, y: -20, z: -752, radius: 92, height: 120, strength: 6, period: 10, direction: p(0.2, 0, 1) },
  { id: 'wind-cross-dawn', type: 'crosswind', name: '歸星側風', x: 640, y: -20, z: -16, radius: 88, height: 120, strength: 5, period: 9, direction: p(-1, 0, 0.1) },
);

const lore = [
  ['第一封航信', '我們把家築在風上，仍願每個出發的人都有一條回家的路。'], ['帆匠的刻度', '不是把帆拉得最緊，而是知道何時讓風穿過。'],
  ['蘆葦的記憶', '風經過蘆葦，留下了第一首能被看見的歌。'], ['引風者的筆記', '金色上升環是熱流，彎曲長帶是順風。不要只靠顏色辨認。'],
  ['橋上的約定', '橋曾連接兩座島。橋斷後，信件仍然抵達。'], ['舊日測風尺', '從等待風到讀懂風，文明走過的距離比島與島更遠。'],
  ['天文台星圖', '星圖不是為了知道我們在哪，而是提醒我們要去何方。'], ['雷季觀測誌', '雷心亮起時，繞行外緣；風從不要求莽撞的勇敢。'],
  ['浮光書頁', '每一本書都曾是一個人留下的岸。'], ['無名返航者', '他帶回的不是寶物，而是所有人都能走的航線。'],
  ['歸星座標', '第三束光點亮時，遠方終於成為可以回去的地方。'], ['給下一位旅人', '你的航跡也會成為別人的地圖。現在，回家吧。'],
];
// Every relic is either on the walkable top (< 0.85 radius) or inside the
// unchanged launch thermal. None requires standing under an island mesh.
const relicOffsets = [
  [[-0.76, -0.20, 1.4, '營地西北側草地，沿島面走到外緣內側。'], [0.45, 0.45, 20, '營地東南側上空 20 公尺，借中央熱流升起後轉向。']],
  [[-0.55, 0.58, 1.4, '蘆光庭西南側草地，留在島緣石板內側。'], [0.65, -0.35, 24, '蘆光庭東北側上空 24 公尺，從熱流出口向東偏轉。']],
  [[0.72, 0.10, 1.4, '斷橋東側島面，斷橋遺跡內側的可站立石板。'], [-0.50, -0.55, 26, '斷橋西北側上空 26 公尺，先升至橋頂航標附近。']],
  [[-0.72, 0.18, 1.4, '天文台西側草地，中央環座外側但仍在島面上。'], [0.50, -0.50, 25, '天文台東北側上空 25 公尺，離開熱流時沿北側繞過柱冠。']],
  [[-0.20, 0.78, 1.4, '書庫南側島面，環形書架外的草地。'], [0.58, -0.48, 23, '書庫東北側上空 23 公尺，借中央熱流越過環形柱頂。']],
  [[0.72, 0.15, 1.4, '歸星臺東側草地，朝晨光路標走到島緣內側。'], [-0.58, -0.45, 22, '歸星臺西北側上空 22 公尺，回到熱流後向北離流。']],
];
const relics = islands.flatMap((island, i) => relicOffsets[i].map(([rx, rz, height, hint], j) => ({
  id: `relic-${String(i * 2 + j + 1).padStart(2, '0')}`, islandId: island.id,
  name: lore[i * 2 + j][0], text: lore[i * 2 + j][1], hint,
  x: island.x + rx * island.radius, y: island.y + height, z: island.z + rz * island.radius, radius: 3.6,
})));
const challenges = createChallenges(islands);
export const WORLD = Object.freeze({
  mapScale: MAP_SCALE, boundsRadius: 2600,
  islands, winds, routes, relics, challenges,
  hazards: [
    { id: 'hazard-thunder', type: 'thunder', name: '雷雲核心', x: 360, y: 10, z: -680, radius: 80, height: 100, period: 10, description: '雷心每 10 秒脈動；沿上層風廊繞開雷心，閃光期間靠近會加快耗能。' },
    { id: 'hazard-fog', type: 'fog', name: '浮光霧海', x: 868, y: -8, z: -12, radius: 175, height: 100, description: '沿書庫方位與下一個實體航標辨向；霧只遮擋視野，不直接扣能量。' },
    { id: 'hazard-fog-central', type: 'fog', name: '中央霧廊', x: 560, y: -8, z: 35, radius: 185, height: 100, description: '進霧前讀取風廊方向；低層節能，高層視野較清楚。' },
    { id: 'hazard-fog-west', type: 'fog', name: '西脊雲幕', x: 250, y: -8, z: -490, radius: 215, height: 90, description: '西向航段的雲幕遮住近景，沿有方向的觀測門逐段定位。' },
    { id: 'hazard-fog-north', type: 'fog', name: '北脊薄霧', x: 680, y: -8, z: -610, radius: 170, height: 100, description: '離開書庫後的第一段霧帶；先確認下一門方向再進入雲幕。' },
  ],
  dialogues: [
    { id: 'dialogue-1', station: 'island-reed', title: '第一束光', text: '八份風層樣本校準了蘆光風標。現在穩定運送定向星儀：可繞斷橋外緣，也可接上雷脊高層窄風廊。' },
    { id: 'dialogue-2', station: 'island-storm', title: '被記住的航線', text: '定向星儀安全抵達，八段紀錄讓遠星重新清晰。接著從不同高度和方位觀測霧海，重建南方歸星臺的座標。' },
    { id: 'dialogue-3', station: 'island-dawn', title: '家的座標', text: '八個方位節點已交會成星圖。現在沿歸航風帶返回晨風營地，讓所有旅人都能找到回家的方向。' },
  ],
  ending: { title: '風記得你的歸途', text: '天文台重新亮起。六座島不再是散落的岸，而是一張可以重走、可以分享的航圖。下一趟，試著更平穩、更迅速，或讀完風留下的十二封信。' },
});
export const STATIONS = islands.filter((island) => island.station).map((island) => island.id);
export const islandById = (id) => islands.find((island) => island.id === id) || islands[0];
// The selected route style is a connected exploration network. Optional
// expeditions supply their own wind fields so the two sets cannot stack.
export const routeWindActive = (wind, state) => !wind.routeId || (!state.activeChallenge && wind.style === (state.trackedHint ? 'safe' : state.routeStyle));
export function windWeight(wind, position) {
  if (position.y < wind.y || position.y > wind.y + wind.height) return 0;
  let distance;
  if (wind.start && wind.end) {
    const dx = wind.end.x - wind.start.x, dz = wind.end.z - wind.start.z;
    const t = Math.max(0, Math.min(1, ((position.x - wind.start.x) * dx + (position.z - wind.start.z) * dz) / (dx * dx + dz * dz)));
    distance = Math.hypot(position.x - wind.start.x - t * dx, position.z - wind.start.z - t * dz);
  } else distance = Math.hypot(position.x - wind.x, position.z - wind.z);
  return Math.max(0, 1 - Math.max(0, distance - wind.radius * 0.65) / (wind.radius * 0.35));
}
