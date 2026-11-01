// Original Moss & Moon content. Stable IDs are also the reusable asset names.
export const PHASES = [
  { id: 'new', name: '新月', icon: '●', description: '星帽菇喜歡安靜的新月。' },
  { id: 'waxing', name: '上弦', icon: '◐', description: '月蓮在上弦之夜舒展。' },
  { id: 'full', name: '滿月', icon: '○', description: '月光花在滿月長得更快。' },
  { id: 'waning', name: '下弦', icon: '◑', description: '整理庭園，為下一輪新月準備。' },
];
export const PLANTS = [
  { id: 'moss', name: '絨苔', color: '#90aa70', days: 3, price: 2, sell: 5, phase: null, neighborTag: null, tag: 'moss', description: '三個澆水日成熟，免費種子的可靠小夥伴。' },
  { id: 'moonflower', name: '月光花', color: '#e9e9ff', days: 4, price: 5, sell: 10, phase: 2, neighborTag: null, tag: 'flower', description: '滿月且澆水時，額外成長 1 點。' },
  { id: 'fern', name: '捲葉蕨', color: '#558866', days: 3, price: 3, sell: 7, phase: null, neighborTag: null, tag: 'fern', description: '三個澆水日成熟，適合自然風庭園。' },
  { id: 'bluebell', name: '藍風鈴', color: '#819ed2', days: 4, price: 4, sell: 9, phase: null, neighborTag: null, tag: 'blue', description: '藍風鈴會幫助相鄰的月蓮生長。' },
  { id: 'pumpkin', name: '蜜月南瓜', color: '#dca760', days: 5, price: 5, sell: 12, phase: null, neighborTag: null, tag: 'food', description: '慶典餐桌需要的甜美收成。' },
  { id: 'starcap', name: '星帽菇', color: '#bd9dcf', days: 4, price: 5, sell: 11, phase: 0, neighborTag: 'moss', tag: 'fungus', description: '新月 +1；上下左右鄰接絨苔 +1，均需澆水。' },
  { id: 'lavender', name: '暮紫薰衣草', color: '#ad91bd', days: 4, price: 4, sell: 9, phase: null, neighborTag: null, tag: 'scent', description: '為花冠與風鈴帶來柔和香氣。' },
  { id: 'lotus', name: '月蓮', color: '#f0c5cf', days: 5, price: 6, sell: 14, phase: 1, neighborTag: 'blue', tag: 'water', description: '上弦 +1；上下左右鄰接藍風鈴 +1，均需澆水。' },
];
export const DECORATIONS = [
  { id: 'planter', name: '苔木花盆', price: 12, tags: ['natural', 'cozy'], festival: false, shape: 'planter' },
  { id: 'lantern', name: '月光提燈', price: 28, tags: ['moon', 'cozy'], festival: true, shape: 'lantern' },
  { id: 'bench', name: '林間長椅', price: 15, tags: ['natural', 'cozy'], festival: false, shape: 'bench' },
  { id: 'arch', name: '月藤拱門', price: 38, tags: ['moon', 'natural'], festival: true, shape: 'arch' },
  { id: 'birdbath', name: '鳥兒水盆', price: 16, tags: ['water', 'natural'], festival: false, shape: 'birdbath' },
  { id: 'windchime', name: '晚風鈴', price: 18, tags: ['moon', 'cozy'], festival: false, shape: 'windchime' },
  { id: 'pond', name: '小月池', price: 20, tags: ['water', 'moon'], festival: false, shape: 'pond' },
  { id: 'stones', name: '溪石小徑', price: 5, tags: ['natural', 'water'], festival: false, shape: 'stones' },
  { id: 'fence', name: '榛木矮籬', price: 7, tags: ['natural', 'cozy'], festival: false, shape: 'fence' },
  { id: 'table', name: '慶典餐桌', price: 35, tags: ['cozy', 'moon'], festival: true, shape: 'table' },
  { id: 'moonstand', name: '月輪台座', price: 22, tags: ['moon', 'water'], festival: false, shape: 'moonstand' },
  { id: 'garland', name: '花葉彩帶', price: 14, tags: ['cozy', 'natural'], festival: false, shape: 'garland' },
];
export const RESIDENTS = [
  { id: 'mira', name: '米拉', color: '#ded8b4', first: '歡迎住進月光庭園！先種下絨苔，澆水後回屋睡一晚吧。', progress: '每一晚的照顧都會留下痕跡，不必趕時間。', complete: '這些柔軟的綠意，讓家真正有了家的味道。' },
  { id: 'rowan', name: '洛恩', color: '#b8936b', first: '森林、溪畔與山脊每天都有材料。走走看，收穫會不同。', progress: '帶回的材料可以手作，也可以留給明天。', complete: '你知道怎麼傾聽森林了。我們明天再走走。' },
  { id: 'lumi', name: '露米', color: '#b7c5e3', first: '我喜歡月亮。新月、上弦、滿月、下弦，每相兩天。', progress: '月光花等滿月，月蓮等上弦；今天就能先計畫。', complete: '你的花園，已經學會與月亮一起呼吸。' },
  { id: 'pip', name: '皮普', color: '#d9ad8c', first: '有水盆和溪石的地方，鳥兒也會願意停留。', progress: '主題任務會直接列出缺少的標籤，不用猜我的口味。', complete: '看！鳥兒已經記住回來的路了。' },
  { id: 'sage', name: '莎吉', color: '#a9b98a', first: '兩件自然物件相鄰，就像讓花園裡的小故事接在一起。', progress: '佈置不用急，最近的擺放可以撤銷。', complete: '這片庭園讓人想坐下來，慢慢過一整天。' },
  { id: 'noa', name: '諾亞', color: '#c8afd2', first: '慶典需要八件委託、提燈、拱門、餐桌，還有二級庭園。', progress: '慶典之後，我們仍會在這裡，你也能繼續種植。', complete: '今晚每一道月光，都有你的一份心意。' },
];
export const RECIPES = [
  { id: 'make-planter', name: '苔木花盆', cost: { wood: 2, moss: 1 }, result: { planter: 1 } },
  { id: 'make-lantern', name: '月光提燈', cost: { wood: 2, fiber: 1, moonflower: 1 }, result: { lantern: 1 } },
  { id: 'make-arch', name: '月藤拱門', cost: { wood: 3, fiber: 2, lotus: 1 }, result: { arch: 1 } },
  { id: 'make-table', name: '慶典餐桌', cost: { wood: 3, pumpkin: 2, starcap: 1 }, result: { table: 1 } },
  { id: 'make-birdbath', name: '鳥兒水盆', cost: { stone: 3, shell: 1 }, result: { birdbath: 1 } },
  { id: 'make-windchime', name: '晚風鈴', cost: { crystal: 2, fiber: 1, lavender: 1 }, result: { windchime: 1 } },
  { id: 'make-garland', name: '花葉彩帶', cost: { fiber: 2, bluebell: 1, fern: 1 }, result: { garland: 1 } },
  { id: 'make-moonstand', name: '月輪台座', cost: { stone: 3, crystal: 2 }, result: { moonstand: 1 } },
];
export const QUESTS = [
  { id: 'mira-1', residentId: 'mira', title: '第一抹綠意', description: '收成並交付 2 份絨苔。', requires: { moss: 2 }, reward: 15 },
  { id: 'mira-2', residentId: 'mira', title: '留一盞燈', description: '庭園放置 2 件溫馨物件，其中至少一件相鄰。', requires: {}, theme: { tags: { cozy: 2 }, adjacent: true }, reward: 20 },
  { id: 'rowan-1', residentId: 'rowan', title: '林間小拾', description: '交付 3 份木材與 2 份纖維。', requires: { wood: 3, fiber: 2 }, reward: 16 },
  { id: 'rowan-2', residentId: 'rowan', title: '樹葉的紋路', description: '交付 2 份捲葉蕨與 1 份星帽菇。', requires: { fern: 2, starcap: 1 }, reward: 24 },
  { id: 'lumi-1', residentId: 'lumi', title: '盛一捧月光', description: '交付 2 朵月光花。', requires: { moonflower: 2 }, reward: 25 },
  { id: 'lumi-2', residentId: 'lumi', title: '月輪小徑', description: '放置 2 件月光物件，並種植至少 2 株植物。', requires: {}, theme: { tags: { moon: 2 }, minPlants: 2 }, reward: 24 },
  { id: 'pip-1', residentId: 'pip', title: '溪畔收藏', description: '交付 3 份溪石與 2 枚小貝殼。', requires: { stone: 3, shell: 2 }, reward: 18 },
  { id: 'pip-2', residentId: 'pip', title: '鳥兒的停靠點', description: '放置 2 件水岸物件，並讓它們與任意物件相鄰。', requires: {}, theme: { tags: { water: 2 }, adjacent: true }, reward: 22 },
  { id: 'sage-1', residentId: 'sage', title: '一束晚風', description: '交付 2 份薰衣草與 1 朵藍風鈴。', requires: { lavender: 2, bluebell: 1 }, reward: 25 },
  { id: 'sage-2', residentId: 'sage', title: '手作的心意', description: '製作或購買 1 件苔木花盆交給莎吉。', requires: { planter: 1 }, reward: 20 },
  { id: 'noa-1', residentId: 'noa', title: '甜甜的邀請', description: '交付 2 顆蜜月南瓜。', requires: { pumpkin: 2 }, reward: 28 },
  { id: 'noa-2', residentId: 'noa', title: '池心的光', description: '交付 2 朵月蓮與 1 顆晶石。', requires: { lotus: 2, crystal: 1 }, reward: 30 },
];
export const REGIONS = [
  { id: 'forest', name: '苔語森林', description: '每天拾取木材 ×3、纖維 ×2、免費絨苔種子 ×2。', color: '#668774', resources: { wood: 3, fiber: 2, 'seed:moss': 2 } },
  { id: 'brook', name: '月影溪畔', description: '每天拾取溪石 ×3、小貝殼 ×2、藍風鈴種子 ×1。', color: '#8aafbb', resources: { stone: 3, shell: 2, 'seed:bluebell': 1 } },
  { id: 'ridge', name: '星眠山脊', description: '每天拾取晶石 ×2、纖維 ×2、星帽菇種子 ×1。', color: '#b1a5c8', resources: { crystal: 2, fiber: 2, 'seed:starcap': 1 } },
];
export const DISCOVERIES = [
  { id: 'dew', region: 'forest', name: '露珠絨苔', description: '細小的露珠讓整片苔蘚像柔軟星圖。' },
  { id: 'snail', region: 'forest', name: '條紋小蝸牛', description: '牠從不催促自己的旅程。' },
  { id: 'seedwing', region: 'forest', name: '旋翼種子', description: '風帶著種子，慢慢找到新的家。' },
  { id: 'leafprint', region: 'forest', name: '蕨葉拓印', description: '葉脈是一封寫給陽光的信。' },
  { id: 'shellspiral', region: 'brook', name: '螺旋小貝', description: '溪水在小小的螺旋裡留下回音。' },
  { id: 'waterbeetle', region: 'brook', name: '銀足水黽', description: '牠以輕巧腳步走過水面的月亮。' },
  { id: 'roundstone', region: 'brook', name: '圓潤溪石', description: '日子把稜角磨成可以握住的溫柔。' },
  { id: 'reed', region: 'brook', name: '夜風蘆葦', description: '蘆葦把風的速度變成沙沙聲。' },
  { id: 'mica', region: 'ridge', name: '薄光雲母', description: '岩石也收藏著能透過光的頁面。' },
  { id: 'moth', region: 'ridge', name: '月紋飛蛾', description: '翅膀的斑點像兩枚安靜的新月。' },
  { id: 'quartz', region: 'ridge', name: '星簇石英', description: '透明的尖端把月光切成細小光線。' },
  { id: 'lichen', region: 'ridge', name: '金邊地衣', description: '最安靜的地方，也有生命慢慢生長。' },
];
export const PUZZLES = [
  { id: 'forest-riddle', region: 'forest', name: '林間石碑', question: '不催促也不會凋萎。要讓新種子長大，睡覺前要做什麼？', choices: ['澆水', '賣掉', '拔除'], answer: '澆水', explanation: '澆過水的植物在睡覺換日時成長。', reward: { 'seed:fern': 2, wood: 2 } },
  { id: 'brook-riddle', region: 'brook', name: '溪畔月輪', question: '新月之後，依序來到哪一種月相？', choices: ['滿月', '上弦', '下弦'], answer: '上弦', explanation: '月相順序為新月 → 上弦 → 滿月 → 下弦，各兩天。', reward: { 'seed:lotus': 2, shell: 2 } },
  { id: 'ridge-riddle', region: 'ridge', name: '山脊星圖', question: '星帽菇身旁種下哪一種植物，可在澆水換日時額外成長？', choices: ['蜜月南瓜', '絨苔', '月蓮'], answer: '絨苔', explanation: '星帽菇喜歡上下左右相鄰的絨苔。', reward: { 'seed:lavender': 2, crystal: 2 } },
];
export const RESOURCE_NAMES = { wood: '木材', fiber: '纖維', stone: '溪石', shell: '小貝殼', crystal: '晶石' };
export const itemName = id => id?.startsWith('seed:') ? `${PLANTS.find(p => p.id === id.slice(5))?.name ?? id}種子` : PLANTS.find(p => p.id === id)?.name ?? DECORATIONS.find(d => d.id === id)?.name ?? RESOURCE_NAMES[id] ?? id;
