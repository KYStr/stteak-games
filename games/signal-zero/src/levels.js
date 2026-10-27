// Metres, Y up. Every box is centre based; actors and pickups use foot positions.
// Geometry is shared by collision, visibility rays and the renderer.
const floor = length => ({ id: 'ground', x: length / 2, y: -.6, z: 0, w: length + 8, h: 1.2, d: 5 });
const shelf = (id, x, y, w) => ({ id, x, y: y - .25, z: 0, w, h: .5, d: 2.5 });
const cover = (id, x, h = 1.2, w = 1.8) => ({ id, x, y: h / 2, z: 0, w, h, d: 2 });
const guard = (id, x, min, max, dir = -1) => ({ id, type: 'guard', x, y: 0, min, max, dir, range: 9, speed: 1.15 });
const camera = (id, x, y, dir = -1) => ({ id, type: 'camera', x, y, min: x, max: x, dir, range: 10 });
const drone = (id, x, y, min, max, dir = -1) => ({ id, type: 'drone', x, y, min, max, dir, range: 8, speed: 1.35 });
const laser = (id, x, phase = 0) => ({ id, type: 'laser', x, y: 0, min: x, max: x, dir: 1, range: 2.4, period: 7, onTime: 3.3, phase });

const INTRO_MAPS = [
  {
    id: 'antenna', name: '01 · 雨線天台', region: '濕城 / LOWER CITY', length: 94, timeTarget: 80,
    brief: '取得街區頻譜，改寫東側中繼，再抵達撤離門。上層步道與貨箱路線都能通行。',
    comm: '零號，這裡是迴聲。城市說一切正常，卻每晚刪除一萬個聲音。先取回被刪除的頻譜；別讓他們知道你來過。',
    spawn: { x: 3, y: 0 }, theme: { sky: 0x080e23, accent: 0x5cf8d4, secondary: 0xd867b5 },
    platforms: [floor(94), shelf('roof-a', 19, 3.4, 14), shelf('roof-b', 46, 3.4, 16), shelf('roof-c', 73, 3.4, 15)],
    covers: [cover('crate-a', 12), cover('crate-b', 29), cover('crate-c', 38), cover('crate-d', 57), cover('crate-e', 65), cover('crate-f', 83)],
    ladders: [{ x: 13.5, y0: 0, y1: 3.4 }, { x: 25, y0: 0, y1: 3.4 }, { x: 40, y0: 0, y1: 3.4 }, { x: 52, y0: 0, y1: 3.4 }, { x: 67, y0: 0, y1: 3.4 }, { x: 79, y0: 0, y1: 3.4 }],
    devices: [guard('patrol-a', 23, 17, 27), camera('camera-a', 35, 2.7, -1), guard('patrol-b', 51, 43, 55), camera('camera-b', 80, 2.7, -1)],
    terminals: [{ id: 'frequency', x: 32, y: 0, kind: 'data', label: '街區頻譜' }, { id: 'relay', x: 61, y: 0, kind: 'rewrite', label: '東側中繼' }],
    packet: { x: 47, y: 3.4 }, exit: { x: 90, y: 0 }, checkpoint: { x: 34, y: 0 }, supplies: [2, 2, 2],
  },
  {
    id: 'canal', name: '02 · 靜默運河', region: '濕城 / LOWER CITY', length: 108, timeTarget: 96,
    brief: '穿越雷射閘道，下載渡運清單並改寫貨運節點。雷射熄滅時可徒步通過，上層維修橋可繞行。',
    comm: '頻譜裡有失蹤者的名字。他們沒有離開城市，只是被標記成「靜音」。渡運清單會告訴我們，聲音被送去了哪裡。',
    spawn: { x: 3, y: 0 }, theme: { sky: 0x071820, accent: 0x5cf8d4, secondary: 0xec9b5f },
    platforms: [floor(108), shelf('bridge-a', 24, 3.5, 18), shelf('bridge-b', 57, 3.5, 19), shelf('bridge-c', 88, 3.5, 17)],
    covers: [cover('box-a', 12), cover('box-b', 36), cover('box-c', 46), cover('box-d', 69), cover('box-e', 78), cover('box-f', 98)],
    ladders: [{ x: 16, y0: 0, y1: 3.5 }, { x: 31, y0: 0, y1: 3.5 }, { x: 49, y0: 0, y1: 3.5 }, { x: 64, y0: 0, y1: 3.5 }, { x: 81, y0: 0, y1: 3.5 }, { x: 94, y0: 0, y1: 3.5 }],
    devices: [laser('gate-a', 25), guard('canal-guard', 61, 53, 67), camera('dock-camera', 41, 2.6, -1), laser('gate-b', 86, 3.4), drone('canal-drone', 91, 5.4, 81, 97)],
    terminals: [{ id: 'manifest', x: 40, y: 0, kind: 'data', label: '渡運清單' }, { id: 'cargo', x: 73, y: 0, kind: 'rewrite', label: '貨運節點' }],
    packet: { x: 58, y: 3.5 }, exit: { x: 104, y: 0 }, checkpoint: { x: 43, y: 0 }, supplies: [2, 2, 2],
  },
  {
    id: 'archive', name: '03 · 玻璃檔案', region: '塔區 / THE STACK', length: 116, timeTarget: 104,
    brief: '取回兩段被抹除的證詞。玻璃走廊的守衛留在地面；高架檔案橋有無人機巡查。',
    comm: '清單終點是檔案塔。每一份記錄都有兩個版本：公開的空白，以及地下的真相。把證詞帶回來，他們就不能再替沉默命名。',
    spawn: { x: 3, y: 0 }, theme: { sky: 0x111027, accent: 0xab8fff, secondary: 0x5cf8d4 },
    platforms: [floor(116), shelf('archive-a', 24, 3.6, 20), shelf('archive-b', 60, 3.6, 20), shelf('archive-c', 95, 3.6, 21)],
    covers: [cover('cabinet-a', 11), cover('cabinet-b', 37), cover('cabinet-c', 47), cover('cabinet-d', 74), cover('cabinet-e', 82), cover('cabinet-f', 108)],
    ladders: [{ x: 15, y0: 0, y1: 3.6 }, { x: 32, y0: 0, y1: 3.6 }, { x: 51, y0: 0, y1: 3.6 }, { x: 68, y0: 0, y1: 3.6 }, { x: 86, y0: 0, y1: 3.6 }, { x: 103, y0: 0, y1: 3.6 }],
    devices: [guard('archive-guard-a', 29, 20, 34), drone('archive-drone', 62, 5.7, 52, 71), guard('archive-guard-b', 96, 89, 105), camera('archive-camera', 80, 2.8, -1)],
    terminals: [{ id: 'testimony-a', x: 41, y: 0, kind: 'data', label: '證詞 A' }, { id: 'testimony-b', x: 78, y: 0, kind: 'data', label: '證詞 B' }],
    packet: { x: 96, y: 3.6 }, exit: { x: 112, y: 0 }, checkpoint: { x: 44, y: 0 }, supplies: [2, 3, 2],
  },
  {
    id: 'switchyard', name: '04 · 逆流交換所', region: '塔區 / THE STACK', length: 128, timeTarget: 118,
    brief: '依序改寫兩個路由節點並下載簽章。雷射有固定週期；改線工具能永久關閉一座閘道。',
    comm: '證詞的簽章指向同一個協定：零號。它不是人，是每個人都能使用的廣播權。交換所把它拆成了碎片，我們把它接回去。',
    spawn: { x: 3, y: 0 }, theme: { sky: 0x101026, accent: 0xd981f7, secondary: 0xffc16f },
    platforms: [floor(128), shelf('switch-a', 24, 3.6, 20), shelf('switch-b', 63, 3.6, 22), shelf('switch-c', 103, 3.6, 22)],
    covers: [cover('switch-box-a', 11), cover('switch-box-b', 37), cover('switch-box-c', 49), cover('switch-box-d', 77), cover('switch-box-e', 89), cover('switch-box-f', 118)],
    ladders: [{ x: 15, y0: 0, y1: 3.6 }, { x: 32, y0: 0, y1: 3.6 }, { x: 53, y0: 0, y1: 3.6 }, { x: 72, y0: 0, y1: 3.6 }, { x: 93, y0: 0, y1: 3.6 }, { x: 112, y0: 0, y1: 3.6 }],
    devices: [laser('switch-laser-a', 24, 1), camera('switch-camera-a', 40, 2.7), laser('switch-laser-b', 62, 4), guard('switch-guard', 108, 98, 116), drone('switch-drone', 69, 5.8, 54, 75)],
    terminals: [{ id: 'route-a', x: 42, y: 0, kind: 'rewrite', label: '路由 A' }, { id: 'route-b', x: 82, y: 0, kind: 'rewrite', label: '路由 B' }, { id: 'signature', x: 121, y: 0, kind: 'data', label: '協定簽章' }],
    packet: { x: 104, y: 3.6 }, exit: { x: 124, y: 0 }, checkpoint: { x: 46, y: 0 }, supplies: [2, 2, 3],
  },
  {
    id: 'core', name: '05 · 心核迴廊', region: '心核 / SIGNAL CORE', length: 136, timeTarget: 126,
    brief: '從核心擷取原始訊號，解除兩層隔離。工具使用與守衛巡邏都能提供通行窗口。',
    comm: '我們已到心核。城市不是沒有聲音，只是每道聲音都得先被批准。原始訊號就在前方。拿到它以後，選擇就回到你手裡。',
    spawn: { x: 3, y: 0 }, theme: { sky: 0x07191c, accent: 0x5cf8d4, secondary: 0xff688a },
    platforms: [floor(136), shelf('core-a', 26, 3.8, 23), shelf('core-b', 67, 3.8, 24), shelf('core-c', 109, 3.8, 23)],
    covers: [cover('core-box-a', 11), cover('core-box-b', 41), cover('core-box-c', 51), cover('core-box-d', 82), cover('core-box-e', 94), cover('core-box-f', 125)],
    ladders: [{ x: 15.5, y0: 0, y1: 3.8 }, { x: 35.5, y0: 0, y1: 3.8 }, { x: 56, y0: 0, y1: 3.8 }, { x: 77, y0: 0, y1: 3.8 }, { x: 99, y0: 0, y1: 3.8 }, { x: 119, y0: 0, y1: 3.8 }],
    devices: [guard('core-guard-a', 30, 21, 38), laser('core-laser-a', 66, 2), camera('core-camera', 87, 2.8), drone('core-drone', 109, 5.9, 100, 121), guard('core-guard-b', 114, 104, 123)],
    terminals: [{ id: 'isolation-a', x: 45, y: 0, kind: 'rewrite', label: '隔離層 A' }, { id: 'raw-signal', x: 86, y: 0, kind: 'data', label: '原始訊號' }, { id: 'isolation-b', x: 129, y: 0, kind: 'rewrite', label: '隔離層 B' }],
    packet: { x: 68, y: 3.8 }, exit: { x: 132, y: 0 }, checkpoint: { x: 48, y: 0 }, supplies: [3, 2, 2],
  },
  {
    id: 'broadcast', name: '06 · 黎明廣播', region: '心核 / SIGNAL CORE', length: 148, timeTarget: 142,
    brief: '解開廣播鎖、上傳證詞，走進天線出口選擇城市的未來。上層與地面路線都可無工具通行。',
    comm: '最後一道門後是天線。公開證詞，讓所有人聽見真相；或拆除靜音協定，讓每個人決定何時開口。兩條路都會抵達黎明，答案由你留下。',
    spawn: { x: 3, y: 0 }, theme: { sky: 0x151124, accent: 0xffca86, secondary: 0x5cf8d4 },
    platforms: [floor(148), shelf('dawn-a', 27, 3.8, 24), shelf('dawn-b', 72, 3.8, 25), shelf('dawn-c', 118, 3.8, 25)],
    covers: [cover('dawn-box-a', 11), cover('dawn-box-b', 42), cover('dawn-box-c', 55), cover('dawn-box-d', 88), cover('dawn-box-e', 101), cover('dawn-box-f', 135)],
    ladders: [{ x: 16, y0: 0, y1: 3.8 }, { x: 37, y0: 0, y1: 3.8 }, { x: 61, y0: 0, y1: 3.8 }, { x: 82, y0: 0, y1: 3.8 }, { x: 107, y0: 0, y1: 3.8 }, { x: 128, y0: 0, y1: 3.8 }],
    devices: [laser('dawn-laser-a', 27, 2.5), camera('dawn-camera', 47, 2.8), guard('dawn-guard-a', 77, 68, 86), drone('dawn-drone', 121, 5.9, 108, 132), laser('dawn-laser-b', 120, .5), guard('dawn-guard-b', 125, 114, 133)],
    terminals: [{ id: 'broadcast-lock', x: 47, y: 0, kind: 'rewrite', label: '廣播鎖' }, { id: 'upload', x: 93, y: 0, kind: 'data', label: '證詞上傳' }, { id: 'antenna', x: 139, y: 0, kind: 'rewrite', label: '天線電源' }],
    packet: { x: 73, y: 3.8 }, exit: { x: 144, y: 0 }, checkpoint: { x: 51, y: 0 }, supplies: [3, 3, 3],
  },
];

// These are authored spatial arrangements, in local metres. No random map generation
// or repeated padding: each sector has a different traversal shape and security role.
const SECTOR_LAYOUTS = {
  roofline: { name: '雙簷屋脊', hint: '地面以箱體避巡邏；屋脊兩段長跳可跨過監視區。', roofs: [[37, 3.8, 44], [91, 3.8, 59]], gap: [73, 2.4], guards: [43], camera: 85 },
  canal: { name: '雙階水道', hint: '觀察雷射熄滅再過水道；四段橋面有高低落差。', roofs: [[25, 3.5, 20], [49, 4.3, 23], [77, 4.3, 28], [109, 3.5, 31]], gap: [73, 2.5], guards: [102], lasers: [[65, 0], [84, 3.2]] },
  archive: { name: '檔案梯井', hint: '三層檔架逐步升高；脈衝可打開無人機的八秒窗口。', roofs: [[33, 3.6, 36], [70, 4.8, 33], [107, 6, 36]], gap: [75, 2.4], camera: 44, drone: [77, 7.1, 61, 83] },
  relay: { name: '錯層中繼', hint: '中繼橋遮住地面視線；離開陰影前先看守衛方向。', roofs: [[38, 4.5, 46], [94, 4.5, 61]], gap: [77, 2.6], guards: [42, 103], camera: 81 },
  maintenance: { name: '維修跳板', hint: '五塊窄跳板交替高低；地面通道有固定雷射節拍。', roofs: [[25, 3.8, 20], [47, 4.6, 20], [69, 3.8, 20], [91, 4.6, 20], [115, 3.8, 24]], gap: [75, 2.2], guards: [42], lasers: [[66, 2]] },
  skybridge: { name: '懸索監視橋', hint: '高橋受無人機巡查，橋面箱體可蹲伏遮擋；地面可繞行。', roofs: [[36, 5.2, 42], [80, 5.2, 42], [113, 4.2, 20]], gap: [74, 2.6], drone: [80, 7.5, 62, 97], lasers: [[46, 1.2]], camera: 112 },
  reactor: { name: '三拍反應室', hint: '三座雷射相位不同；高處依靠四次落點繞過供電線。', roofs: [[27, 4.5, 24], [55, 5.5, 27], [85, 4.5, 28], [114, 4.5, 25]], gap: [76, 2.4], lasers: [[34, 0], [65, 2.3], [103, 4.6]], camera: 85 },
  foundry: { name: '起重機貨場', hint: '高貨箱需要完整跳躍；貨架上方可用誘餌拉開下方守衛。', roofs: [[34, 4, 38], [77, 4.8, 43], [113, 3.8, 24]], gap: [73, 2.4], guards: [42, 103], drone: [75, 7.1, 61, 94], tallCrates: true },
  antenna: { name: '天線攀升段', hint: '四階天線逐步上升；頂層回落前可先觀察出口走廊。', roofs: [[27, 4.2, 24], [55, 5.2, 27], [85, 6.2, 28], [114, 7.2, 25]], gap: [75, 2.5], guards: [43], lasers: [[70, 1]], camera: 109 },
};

// Each row is an explicit chapter layout: sector position, spatial arrangement,
// authored name and optional narrative objective. Starts are deliberately irregular.
const CHAPTER_SECTORS = [
  [[120, 'roofline', '雨棚連廊'], [253, 'canal', '舊渡口', '橋接街區線'], [390, 'archive', '報廢轉播站'], [528, 'maintenance', '風管步道', '校準雨線天線'], [664, 'relay', '雙線中繼'], [803, 'skybridge', '霓虹懸橋'], [941, 'antenna', '第一道天光', '解開撤離頻道']],
  [[135, 'canal', '沉沒碼頭'], [271, 'maintenance', '排水閘道', '解開水閘鎖'], [409, 'foundry', '懸吊貨場'], [548, 'relay', '渡運調度', '下載完整渡運名單'], [686, 'roofline', '貨輪上層'], [824, 'skybridge', '跨河監視橋'], [964, 'reactor', '潮汐供電室', '切換離港路由']],
  [[142, 'archive', '索引梯井'], [280, 'relay', '封存走廊', '取得第二證詞'], [418, 'roofline', '玻璃外牆'], [558, 'foundry', '移動書庫', '解密原始簽章'], [699, 'maintenance', '檔案風道'], [839, 'skybridge', '懸空閱覽室'], [980, 'antenna', '證詞傳送塔', '傳送完整證詞']],
  [[153, 'reactor', '三相變電間'], [293, 'foundry', '電纜起重場', '改寫北方路由'], [435, 'maintenance', '封閉線槽'], [577, 'relay', '交換核心', '改寫南方路由'], [719, 'archive', '舊協定棧'], [862, 'canal', '冷卻支流'], [1005, 'antenna', '上行鏈路', '取得協定簽章']],
  [[164, 'foundry', '心核裝配場'], [306, 'archive', '身份梯井', '解除第二隔離層'], [449, 'reactor', '心搏反應室'], [592, 'skybridge', '無聲穹頂', '擷取未過濾訊號'], [736, 'maintenance', '緊急維修棧'], [880, 'relay', '訊號鏡廊'], [1024, 'antenna', '心核出口', '解除核心封鎖']],
  [[177, 'relay', '晨光接續站'], [320, 'reactor', '最後供電線', '解除廣播隔離'], [464, 'archive', '證詞之梯'], [608, 'canal', '天線冷卻渠', '上傳六段證詞'], [752, 'foundry', '廣播吊橋'], [896, 'skybridge', '黎明懸橋'], [1040, 'antenna', '自由頻道', '開啟城市天線']],
];

function extendedChapter(intro, index) {
  const chapter = CHAPTER_SECTORS[index];
  const end = chapter.at(-1)[0] + 139;
  const result = { ...intro, revision: 2, length: end, timeTarget: 265 + index * 15,
    platforms: intro.platforms.filter(p => p.id !== 'ground').map(p => ({ ...p })), covers: intro.covers.map(c => ({ ...c })), ladders: intro.ladders.map(l => ({ ...l })), devices: intro.devices.map(d => ({ ...d })),
    terminals: [{ ...intro.terminals[0] }], sectors: [{ id: 'arrival', name: '抵達 / ' + intro.name.slice(5), start: 0, end: chapter[0][0], hint: intro.brief }], gaps: [],
    exit: { x: end - 5, y: 0 }, checkpoints: [], upperEntries: intro.ladders.filter((_, i) => i % 2 === 0).map(l => ({ ...l })), supplies: [3, 3, 3],
  };
  for (let i = 0; i < chapter.length; i++) {
    const [start, type, name, objective] = chapter[i];
    const layout = SECTOR_LAYOUTS[type];
    const prefix = `sector-${i + 1}`;
    result.sectors.push({ id: prefix, name, start, end: chapter[i + 1]?.[0] || end, hint: layout.hint });
    const roofs = layout.roofs.map(([x, y, w], r) => shelf(`${prefix}-roof-${r}`, start + x, y, w));
    result.platforms.push(...roofs);
    const first = roofs[0];
    const ladder = { x: first.x - first.w / 2 + 1, y0: 0, y1: first.y + first.h / 2 };
    result.ladders.push(ladder);
    result.upperEntries.push(ladder);
    result.ladders.push({ x: roofs.at(-1).x + roofs.at(-1).w / 2 - 1, y0: 0, y1: roofs.at(-1).y + roofs.at(-1).h / 2 });
    for (const [c, x] of [12, 28, 60, 89, 128].entries()) result.covers.push(cover(`${prefix}-cargo-${c}`, start + x, layout.tallCrates && c === 1 ? 1.8 : 1.2, c === 4 ? 2.2 : 1.8));
    // Two physically solid rooftop shelters make drone timing observable and recoverable.
    if (layout.drone) {
      const middle = roofs[Math.floor(roofs.length / 2)];
      for (const [c, dx] of [-5, 5].entries()) result.covers.push({ id: `${prefix}-roof-shelter-${c}`, x: middle.x + dx, y: middle.y + middle.h / 2 + .6, z: 0, w: 1.8, h: 1.2, d: 2 });
    }
    for (const [g, x] of (layout.guards || []).entries()) result.devices.push(guard(`${prefix}-guard-${g}`, start + x, start + x - 8, start + x + 8, (i + g) % 2 ? 1 : -1));
    if (layout.camera) result.devices.push(camera(`${prefix}-camera`, start + layout.camera, 2.8, i % 2 ? 1 : -1));
    for (const [n, [x, phase]] of (layout.lasers || []).entries()) result.devices.push(laser(`${prefix}-laser-${n}`, start + x, phase));
    if (layout.drone) { const [x, y, min, max] = layout.drone; result.devices.push(drone(`${prefix}-drone`, start + x, y, start + min, start + max, i % 2 ? 1 : -1)); }
    result.gaps.push({ x: start + layout.gap[0], w: layout.gap[1] });
    if (objective) result.terminals.push({ id: `${prefix}-node`, x: start + 132, y: 0, kind: i === 3 ? 'data' : 'rewrite', label: objective });
    if (i === 1 || i === 3) result.checkpoints.push({ id: `${prefix}-safe`, x: start + 134.5, y: 0 });
    if (i === 4) {
      const roof = roofs[Math.floor(roofs.length / 2)];
      result.packet = { x: roof.x, y: roof.y + roof.h / 2 };
    }
  }
  result.checkpoint = result.checkpoints[0];
  const gaps = [...result.gaps].sort((a, b) => a.x - b.x);
  const ground = [];
  let left = -4;
  for (const [i, gap] of gaps.entries()) {
    const right = gap.x - gap.w / 2;
    ground.push({ id: `ground-${i}`, ground: true, x: (left + right) / 2, y: -.6, z: 0, w: right - left, h: 1.2, d: 5 });
    left = gap.x + gap.w / 2;
  }
  ground.push({ id: `ground-${gaps.length}`, ground: true, x: (left + end + 4) / 2, y: -.6, z: 0, w: end + 4 - left, h: 1.2, d: 5 });
  result.platforms.unshift(...ground);
  result.brief = `依序完成「${result.terminals.map(t => t.label).join('」、「')}」，再由出口撤離。八個區段都有地面與高處通路；可選資料包位於第六區上層。`;
  result.sectors[0].hint = `先取得「${result.terminals[0].label}」。A/D 移動，空白鍵跳過貨箱，W 攀梯或按住駭入；觀察視野再選地面或高處。`;
  return result;
}

export const LEVELS = INTRO_MAPS.map(extendedChapter);

export const ENDINGS = [
  { id: 'voices', title: '把真相交還所有人', text: '天線亮起，六段證詞穿過雨幕。城市第一次聽見被刪去的名字，人們開始在自己的窗前回答。零號不再是一個入侵者，而是每個願意作證的人。黎明的第一則新聞，終於沒有被改寫。' },
  { id: 'freedom', title: '讓每個人選擇開口', text: '你拆除了靜音協定，沒有替任何人發言。清晨，街角傳來久違的歌，也有人安靜地擁抱失而復得的生活。廣播塔不再批准任何聲音。零號的最後一則訊息只有一句：頻道屬於你。' },
];
