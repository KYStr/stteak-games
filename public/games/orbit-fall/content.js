// Original Orbit / Fall narrative and authored puzzle data. Units are metres.
export const CONTENT_VERSION = '1.0.0';
export const ROOM_BOUNDS = Object.freeze({ min: [-7, 0.75, -7], max: [7, 7.25, 7] });
export const decks = [
  { id: 1, name: '01 · 棲居甲板', objective: '接通貨艙電池與生活艙光路，恢復循環系統。', puzzleIds: ['puzzle-momentum-1', 'puzzle-reflection-1'] },
  { id: 2, name: '02 · 工程甲板', objective: '穩定壓差並提升電池，重啟航行控制。', puzzleIds: ['puzzle-airlock-1', 'puzzle-momentum-2'] },
  { id: 3, name: '03 · 記憶甲板', objective: '串接高低光路，打開核心壓力門。', puzzleIds: ['puzzle-reflection-2', 'puzzle-airlock-2'] },
];
export const puzzles = {
  'puzzle-momentum-1': { id: 'puzzle-momentum-1', type: 'momentum', deck: 1, name: '靜止的電池', roomId: 'room-d1-cargo', requiredTool: 'tether', crateStart: [-3, 1, 0], target: [3, 1, -2], targetRadius: 1.3, maxDockSpeed: 0.65, holdSeconds: 1.5, hint: '取得牽引束後帶電池前往方框接點。到位先煞車；電池須在低速下保持 1.5 秒。', objective: '將電池低速停靠在下層方框接點。', resetLabel: '回收電池', reward: '生活循環泵供電', signalId: 'signal-1' },
  'puzzle-reflection-1': { id: 'puzzle-reflection-1', type: 'reflection', deck: 1, name: '晨光折返', roomId: 'room-d1-optics', mirrorPositions: [[-2, 2, 0], [2, 2, -2]], initialAngles: [0, 0], targetAngles: [2, 6], angleSteps: 8, hint: '鏡面刻度共 8 格。依接收器線索設為「2 → 6」，每次互動旋轉一格。', objective: '調整兩面鏡，依序對準刻度 2、6。', resetLabel: '鏡面歸零', reward: '棲居甲板修復' },
  'puzzle-airlock-1': { id: 'puzzle-airlock-1', type: 'airlock', deck: 2, name: '呼吸的門', roomId: 'room-d2-airlock', sequence: [0, 2, 1], valveLabels: ['封閉外門', '開啟內門', '等壓'], valvePositions: [[-4, 1.5, -2], [0, 1.5, -2], [4, 1.5, -2]], hint: '先隔絕外部，再等壓，最後開內門：① → ③ → ②。錯誤只重設控制序列。', objective: '依「封閉外門 → 等壓 → 開啟內門」操作三閥。', resetLabel: '洩壓重置', reward: '工程氣閘穩定', signalId: 'signal-3' },
  'puzzle-momentum-2': { id: 'puzzle-momentum-2', type: 'momentum', deck: 2, name: '向上墜落', roomId: 'room-d2-cargo', requiredTool: 'tether', crateStart: [-4, 1, 2], target: [3, 5, -2], targetRadius: 1.4, maxDockSpeed: 0.7, holdSeconds: 1.5, hint: '接點位於上層 5 公尺。用高度推進抬升電池，繞開碎片。接近接點時放慢並煞停。', objective: '把重電池運到上層方框接點。', resetLabel: '回收重電池', reward: '航行控制恢復' },
  'puzzle-reflection-2': { id: 'puzzle-reflection-2', type: 'reflection', deck: 3, name: '跨層回聲', roomId: 'room-d3-optics', mirrorPositions: [[-4, 1.5, -2], [0, 4.5, -2], [4, 6, -2]], initialAngles: [0, 0, 0], targetAngles: [1, 5, 3], angleSteps: 8, hint: '線路跨越三層：下層 1、中層 5、上層 3。依圓環的數字與流動箭頭調整鏡面。', objective: '到不同高度，將三面鏡設為 1、5、3。', resetLabel: '鏡面歸零', reward: '記憶核心供電', signalId: 'signal-5' },
  'puzzle-airlock-2': { id: 'puzzle-airlock-2', type: 'airlock', deck: 3, name: '最後的壓差', roomId: 'room-d3-airlock', sequence: [0, 2, 0, 1], valveLabels: ['隔離', '核心門', '等壓'], valvePositions: [[-4, 1.5, -2], [0, 4.5, -2], [4, 1.5, -2]], hint: '雙腔氣閘需要再次隔離：① → ③ → ① → ②。上層的核心門是最後一步。', objective: '依「隔離 → 等壓 → 再隔離 → 核心門」操作。', resetLabel: '雙腔洩壓', reward: '終端抉擇開放' },
};
export const rooms = [
  { id: 'room-d1-safe', deck: 1, name: 'A1 · 甦醒氣閘', type: 'safe', description: '冷白燈逐段亮起。你的救生艙成了站內最後一處有空氣的地方。', objective: '閱讀操作指引，取得磁靴與牽引束，然後修復本甲板兩部設備。', grants: ['boots', 'tether'], hazard: null },
  { id: 'room-d1-cargo', deck: 1, name: 'A2 · 漂流貨艙', type: 'puzzle', puzzleId: 'puzzle-momentum-1', description: '沒有重力，電池依然保有質量。短推進與煞停能讓你帶它回家。', signalId: 'signal-1', hazard: 'leak' },
  { id: 'room-d1-optics', deck: 1, name: 'A3 · 無人溫室', type: 'puzzle', puzzleId: 'puzzle-reflection-1', description: '植物早已沉睡，光路面板仍記得清晨的方向。', hazard: 'arc' },
  { id: 'room-d1-signal', deck: 1, name: 'A4 · 留聲生活艙', type: 'signal', description: '一張固定在牆上的合照，提醒你這裡曾是某些人的家。', signalId: 'signal-2', hazard: null },
  { id: 'room-d2-safe', deck: 2, name: 'B1 · 工程氣閘', type: 'safe', description: '壓縮機重新喘息。安全燈下，你可以重新計畫路線。', objective: '穩定氣閘，將重電池送到上層接點。', hazard: null },
  { id: 'room-d2-airlock', deck: 2, name: 'B2 · 壓差控制室', type: 'puzzle', puzzleId: 'puzzle-airlock-1', description: '氣流把浮塵拉成長線。控制面板上留著清楚的操作次序。', signalId: 'signal-3', hazard: 'leak' },
  { id: 'room-d2-cargo', deck: 2, name: 'B3 · 垂直吊運井', type: 'puzzle', puzzleId: 'puzzle-momentum-2', description: '接點懸在頭頂。先觀察碎片軌跡，再帶著電池穿越。', hazard: 'debris' },
  { id: 'room-d2-signal', deck: 2, name: 'B4 · 航行檔案室', type: 'signal', description: '黑匣子保存著事故前最後一段不曾寄出的訊息。', signalId: 'signal-4', hazard: null },
  { id: 'room-d3-safe', deck: 3, name: 'C1 · 核心氣閘', type: 'safe', description: '空氣清冷而安靜。返航信標與記憶核心共享最後一組電源。', objective: '修復跨層光路與核心氣閘，前往訊號核心做出選擇。', hazard: null },
  { id: 'room-d3-optics', deck: 3, name: 'C2 · 光子迴廊', type: 'puzzle', puzzleId: 'puzzle-reflection-2', description: '光從不同高度接力，一如記憶在不同的人之間傳遞。', signalId: 'signal-5', hazard: 'arc' },
  { id: 'room-d3-airlock', deck: 3, name: 'C3 · 雙腔壓力門', type: 'puzzle', puzzleId: 'puzzle-airlock-2', description: '兩個壓力腔不能同時打開。最後一道門在上層等待。', hazard: 'debris' },
  { id: 'room-d3-signal', deck: 3, name: 'C4 · 訊號核心', type: 'signal', description: '三個甲板已重新甦醒。這一次，訊號的去向由你決定。', signalId: 'signal-6', hazard: null, endingTerminal: true },
];
export const signals = {
  'signal-1': { id: 'signal-1', title: '01 · 質量不會消失', speaker: '工程師 芷', roomId: 'room-d1-cargo', text: '若你聽見這段話，別急著追那塊電池。先推一小下，再反向煞車。太空不會替我們停下來，我們得學會等待自己的力道。' },
  'signal-2': { id: 'signal-2', title: '02 · 固定在牆上的家', speaker: '植物學家 林', roomId: 'room-d1-signal', text: '大家說站上沒有上下，但孩子總把照片貼在同一面牆。方向不一定來自重力，也可能來自你想回去的人。溫室的光，請留一盞。' },
  'signal-3': { id: 'signal-3', title: '03 · 留給後來的人', speaker: '工程師 芷', roomId: 'room-d2-airlock', text: '事故後我把維修步驟刻在每一道門旁。外門、等壓、內門。怕的時候照著順序做，不必憑記憶逞強。我們把路留下，你只要繼續往前。' },
  'signal-4': { id: 'signal-4', title: '04 · 未送出的座標', speaker: '導航員 澄', roomId: 'room-d2-signal', text: '逃生艇已離站。我把你的救生艙留在穩定軌道，希望循環泵能撐到你醒來。返航信標可以找到我們；但若你先想留下什麼，我也明白。' },
  'signal-5': { id: 'signal-5', title: '05 · 記憶的重量', speaker: '核心保管者 蘅', roomId: 'room-d3-optics', text: '記憶不是備份檔的大小。它是沒人記得時仍值得被留下的微小事物。核心還能把這些故事送往無人中繼站，但那會用掉信標的電力。' },
  'signal-6': { id: 'signal-6', title: '06 · 你有權選擇', speaker: '導航員 澄', roomId: 'room-d3-signal', text: '你沒有欠這座站一個結局。選返航，我們接你回來；選保存，長眠中的故事會繼續旅行。別尋找正確答案。讓它成為你的答案。' },
};
export const endings = {
  beacon: { id: 'beacon', title: '返航的光', action: '將能源導向返航信標', text: '琥珀色脈衝穿過破損的環帶。很久之後，一個熟悉的聲音回應了你。你把站內的合照帶進救生艙；其他的故事，就由活著的人繼續說下去。', epilogue: '任務完成。救援航線已建立，你正踏上回家的路。' },
  memory: { id: 'memory', title: '留在群星之間', action: '將能源導向記憶核心', text: '成千上萬段微小的日常沿著光路離站。你關閉信標，守著緩慢呼吸的循環泵。數日後，遠方的中繼站傳來確認：故事已收到。你也再次啟程。', epilogue: '任務完成。記憶已安全傳送，站體將陪伴你等待下一次接駁。' },
};
export const challenges = [
  { id: 'challenge-cargo', title: '精準吊運', deck: 1, roomId: 'room-d1-cargo', puzzleIds: ['puzzle-momentum-1'], timeLimit: 180, objective: '180 秒內低速停靠電池，改善推進時間與耗氧紀錄。' },
  { id: 'challenge-engineering', title: '工程接力', deck: 2, roomId: 'room-d2-safe', puzzleIds: ['puzzle-airlock-1', 'puzzle-momentum-2'], timeLimit: 360, objective: '360 秒內完成工程甲板兩項修復，計畫最省氧的路線。' },
  { id: 'challenge-core', title: '無聲的光路', deck: 3, roomId: 'room-d3-safe', puzzleIds: ['puzzle-reflection-2', 'puzzle-airlock-2'], timeLimit: 420, objective: '420 秒內修復核心甲板。所有線索均可從數字與圖形讀取。' },
];
export const roomById = Object.fromEntries(rooms.map(room => [room.id, room]));
