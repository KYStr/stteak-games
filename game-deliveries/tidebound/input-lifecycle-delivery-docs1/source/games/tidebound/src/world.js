/** Original, hand-authored chart. World units are metres; +Y is up and heading 0 is -Z. */
export const WORLD_BOUND = 260;
export const TIDE_PERIOD = 240;

export const ISLANDS = [
  { id: 'harbor', name: '潮音港', x: -12, z: 174, radius: 25, dock: { x: -12, z: 141 }, color: '#ead9ad', type: 'home', landmark: 'harbor', discoveries: [] },
  { id: 'coral', name: '珊瑚灣', x: -124, z: 90, radius: 24, dock: { x: -98, z: 66 }, color: '#f59e8b', type: 'explore', landmark: 'coral', discoveries: ['fan-coral', 'foxfish'], diveSiteId: 'coral-dive' },
  { id: 'gull', name: '白羽島', x: 124, z: 64, radius: 23, dock: { x: 100, z: 42 }, color: '#f0e6c7', type: 'explore', landmark: 'birds', discoveries: ['tern', 'turtle'] },
  { id: 'mangrove', name: '青根島', x: -140, z: -90, radius: 25, dock: { x: -110, z: -74 }, color: '#7db38e', type: 'explore', landmark: 'mangrove', discoveries: ['mangrove-root', 'seagrass'] },
  { id: 'ruin', name: '星盤島', x: 126, z: -100, radius: 24, dock: { x: 99, z: -80 }, color: '#c3b8de', type: 'explore', landmark: 'ruins', discoveries: ['star-tablet', 'tide-clock'], diveSiteId: 'ruin-dive' },
  { id: 'reef', name: '琉璃礁', x: 0, z: 4, radius: 16, dock: { x: 0, z: 27 }, color: '#6ec8c0', type: 'reef', landmark: 'reef', discoveries: ['glass-coral', 'nautilus'], diveSiteId: 'reef-dive' },
  { id: 'lighthouse', name: '遠潮燈塔', x: 0, z: -222, radius: 22, dock: { x: 0, z: -192 }, color: '#ead5a1', type: 'lighthouse', landmark: 'lighthouse', discoveries: ['beacon-lens', 'keepers-vault'] },
];

export const DISCOVERIES = [
  { id: 'foxfish', name: '珊瑚狐魚', kind: 'animal', islandId: 'coral', diveSiteId: 'coral-dive', description: '藏在扇珊瑚後的小魚，橘色條紋隨潮水閃動。' },
  { id: 'tern', name: '白羽燕鷗', kind: 'animal', islandId: 'gull', description: '沿著順流捕魚；牠們的航線是天然的海流提示。' },
  { id: 'turtle', name: '綠海龜', kind: 'animal', islandId: 'gull', description: '在溫暖淺灘休息。保持距離，將相遇畫進海圖。' },
  { id: 'nautilus', name: '珍珠鸚鵡螺', kind: 'animal', islandId: 'reef', diveSiteId: 'reef-dive', description: '在琉璃礁下緩慢漂移，殼中藏著海的螺旋。' },
  { id: 'fan-coral', name: '落日扇珊瑚', kind: 'plant', islandId: 'coral', description: '珊瑚是動物群體；本圖鑑將其列入植物／礁物調查。' },
  { id: 'mangrove-root', name: '青根紅樹', kind: 'plant', islandId: 'mangrove', description: '交織根系護住島岸，也替幼魚保留避風的小水道。' },
  { id: 'seagrass', name: '銀帶海草', kind: 'plant', islandId: 'mangrove', description: '海草隨著潮流傾伏，是判讀流向最安靜的工具。' },
  { id: 'glass-coral', name: '琉璃枝礁', kind: 'plant', islandId: 'reef', description: '半透明的潮間礁脈。退潮時露出，滿潮時可從外圍通行。' },
  { id: 'star-tablet', name: '七星航海碑', kind: 'relic', islandId: 'ruin', description: '石刻記錄七座島嶼，中央缺口正指向遠潮燈塔。' },
  { id: 'tide-clock', name: '沉睡潮鐘', kind: 'relic', islandId: 'ruin', diveSiteId: 'ruin-dive', description: '齒輪仍能隨潮擺動，為修復燈塔留下最後的線索。' },
  { id: 'beacon-lens', name: '守望者透鏡', kind: 'relic', islandId: 'lighthouse', description: '斑駁透鏡等待三件零件，將光重新投向潮音港。' },
  { id: 'keepers-vault', name: '守燈人航誌', kind: 'relic', islandId: 'lighthouse', description: '「讀懂潮水，再出發。」航誌最後一頁仍留給下一位旅人。' },
];

export const RIGS = [
  { id: 'steady', name: '穩定帆', description: '均衡轉向與航速，初次航行推薦。', speed: 4, handling: 1.75, capacity: 8 },
  { id: 'swift', name: '順風帆', description: '順風速度最快，轉向較慢；挑戰最省時紀錄。', speed: 5.25, handling: 1.3, capacity: 5 },
  { id: 'cargo', name: '遠航帆', description: '貨艙更大、轉向靈活，適合一次探索多座島。', speed: 3.25, handling: 2.05, capacity: 14 },
];

const port = (id) => ({ ...ISLANDS.find((item) => item.id === id).dock });
const leg = (fromIslandId, toIslandId, points = []) => ({ fromIslandId, toIslandId, waypoints: [port(fromIslandId), ...points.map(([x, z]) => ({ x, z })), port(toIslandId)] });
const route = (id, name, description, legs) => ({ id, name, description, legs, waypoints: legs.flatMap((item, i) => i ? item.waypoints.slice(1) : item.waypoints) });
const objective = (id) => {
  const item = DISCOVERIES.find((entry) => entry.id === id);
  return { discoveryId: item.id, islandId: item.islandId, kind: item.diveSiteId ? 'dive' : 'shore', ...(item.diveSiteId ? { siteId: item.diveSiteId } : {}), name: item.name };
};
export const CONTRACTS = [
  { id: 'coral-survey', name: '四棲地的潮汐海圖', islandId: 'coral', targetDiscovery: 'fan-coral', reward: 65,
    description: '在同一趟航程比較珊瑚灣岸礁與狐魚、青根紅樹、琉璃枝礁與鸚鵡螺，再記錄白羽燕鷗。四島六項調查、兩次淺潛後返港，連起水下、潮間、紅樹與空中的食物鏈，同時尋回兩件燈塔零件。',
    objectives: ['fan-coral', 'foxfish', 'mangrove-root', 'glass-coral', 'nautilus', 'tern'].map(objective),
    routes: [route('safe', '四棲地外緣', '從珊瑚灣沿紅樹東岸北上，再由琉璃礁西南外緣入港；經白羽島比較鳥類後返港，全程不需要等潮。', [leg('harbor', 'coral'), leg('coral', 'mangrove'), leg('mangrove', 'reef', [[-42, 38]]), leg('reef', 'gull'), leg('gull', 'harbor')]),
      route('tide', '四棲地潮道', '沿西側潮道比較棲地，再穿過琉璃礁南方深水前往白羽；流向不利時可移到外緣。', [leg('harbor', 'coral', [[-30, 90]]), leg('coral', 'mangrove', [[-66, 12], [-70, -40]]), leg('mangrove', 'reef', [[-40, -35], [-34, 38]]), leg('reef', 'gull', [[55, 25]]), leg('gull', 'harbor', [[32, 90]])])] },
  { id: 'gull-watch', name: '白羽的航線', islandId: 'gull', targetDiscovery: 'tern', reward: 35, description: '登錄白羽島燕鷗，再把流向觀察帶回母港。', objectives: [objective('tern')], routes: [route('safe', '白羽內緣', '沿旋流西側與白羽島西南岸之間的深水廊道。', [leg('harbor', 'gull')]), route('tide', '白羽潮灣', '從南方潮脊東側切入內灣，觀察旋流與近岸流向。', [leg('harbor', 'gull', [[32, 90]])])] },
  { id: 'green-roots', name: '青根的守護', islandId: 'mangrove', targetDiscovery: 'mangrove-root', reward: 45, description: '記錄青根紅樹的護岸根系，返港交付。', objectives: [objective('mangrove-root')], routes: [route('safe', '西礁外緣', '繞過潮脊西側與琉璃礁，再沿紅樹東岸靠港。', [leg('harbor', 'mangrove', [[-42, 99], [-70, 24], [-78, -35]])]), route('tide', '西側潮道', '沿青色潮道北行；逆流時移到潮道外緣。', [leg('harbor', 'mangrove', [[-50, 70], [-50, -40]])])] },
  { id: 'star-reading', name: '七星的航海圖', islandId: 'ruin', targetDiscovery: 'star-tablet', reward: 50, description: '讀取星盤島航海碑，將七島的記憶帶回。', objectives: [objective('star-tablet')], routes: [route('safe', '星盤潮門外緣', '穿過白羽島西側，再沿潮門東緣靠近星盤島西南港。', [leg('harbor', 'ruin', [[48, 96], [70, 20], [76, -34]])]), route('tide', '東側潮道', '沿東側潮道利用順流，退潮避開潮門。', [leg('harbor', 'ruin', [[55, 90], [55, -40]])])] },
  { id: 'glass-study', name: '琉璃礁記錄', islandId: 'reef', targetDiscovery: 'glass-coral', reward: 40, description: '在琉璃礁安全靠岸，登錄礁脈後回港。', objectives: [objective('glass-coral')], routes: [route('safe', '琉璃西環', '繞開南側潮脊，從礁島西南方靠岸；任何水位皆可抵達。', [leg('harbor', 'reef', [[-30, 95], [-34, 38]])]), route('tide', '潮脊直航', '滿潮時越過南方潮脊；低潮選西環。', [leg('harbor', 'reef', [[0, 80]])])] },
  { id: 'keepers-journal', name: '守燈人的消息', islandId: 'lighthouse', targetDiscovery: 'keepers-vault', reward: 65, description: '探訪遠潮燈塔並登錄航誌。三件零件齊備時可同時修復。', objectives: [objective('keepers-vault')], routes: [route('safe', '燈塔深水廊道', '經琉璃礁西側，再從青根旋流東緣的深水廊道抵達燈塔；不需要等潮。', [leg('harbor', 'lighthouse', [[-40, 100], [-48, 40], [-40, -25], [-20, -85], [0, -145]])]), route('tide', '東側借流廊道', '沿星盤潮道讀取順逆流，再從潮門東側深水通過；水位不足也有完整航路。', [leg('harbor', 'lighthouse', [[45, 90], [70, -40], [70, -140]])])] },
];

const branch = (id, label, reason, kind, x, z) => ({ id, label, reason, kind, waypoints: [{ x, z }] });
const navigationGate = (id, name, x, z, radius, north, south, extra = {}) => ({ id, name, x, z, radius, directions: { ...(north ? { north: Array.isArray(north) ? { options: north } : north } : {}), ...(south ? { south: Array.isArray(south) ? { options: south } : south } : {}), ...extra } });
export const ROUTE_DIRECTIONS = Object.freeze({
  north: Object.freeze({ x: 0, z: -1 }), south: Object.freeze({ x: 0, z: 1 }),
  east: Object.freeze({ x: 1, z: 0 }), west: Object.freeze({ x: -1, z: 0 }),
});
// These are navigable local branches, not automatic steering or extra collision objects.
// Both options remain open at every tide: inner lanes trade shore clearance or current
// exposure for a different distance/wind angle; outer lanes retain more manoeuvring room.
export const ROUTE_CHOICES = [
  navigationGate('shoal-margin', '南方潮脊西緣', -35, 99, 35,
    { entries: [{ destinationIslandId: 'reef', x: 0, z: 126, radius: 14, lateralRadius: 24, options: [branch('outer', '潮脊西側繞行', '西側航向較接近固定風向，後段從琉璃西南方入泊；必須保持礁圈外的轉向。', 'safe', -30, 76), branch('inner', '潮脊東側繞行', '東側航向的帆力較弱，後段接琉璃南面泊位較直接；同樣從礁圈外通過。', 'direct', 28, 72)] }], options: [branch('outer', '外緣留足岸距', '西側深水留出更大的轉舵空間，下一段到琉璃礁較遠。', 'safe', -48, 84), branch('inner', '內緣縮短接近', '從潮脊西緣近線通過，縮短往中央泊位的後段；需守住礁外岸距。', 'current', -24, 84)] },
    { entry: { x: -35, z: 99, radius: 39.5 }, entries: [{ destinationIslandId: 'harbor', x: 0, z: 60, radius: 9, lateralRadius: 15, options: [branch('outer', '西側繞礁返港', '由潮脊西側深水返港，固定風角較有利；後段要向東對準母港。', 'safe', -30, 105), branch('inner', '東側繞礁返港', '從潮脊東側深水返港，後段較接近母港中線；帆角較弱且靠近礁側，須守住路點。', 'direct', 30, 108)] }, { x: -34, z: 82, radius: 32, lateralRadius: 8 }], options: [branch('outer', '外緣保留轉舵空間', '沿西側深水出灣，離潮脊較遠但返港需多轉一次舵。', 'safe', -48, 94), branch('inner', '近礁線斜向母港', '從潮脊西緣斜向母港，航程較直接；不要切進標示礁圈。', 'current', -24, 94)] }),
  navigationGate('glass-west-current', '琉璃西岸流口', -53, 37, 50,
    [branch('outer', '潮道外緣', '較西的航線減少側流推移，保留較大離礁空間。', 'safe', -78, 29), branch('inner', '貼流進入內灣', '靠近青根潮道中心，順流時借速、逆流時多承受流阻。', 'current', -36, 29)],
    { entry: { x: -53, z: 37, radius: 52 }, entries: [{ x: -40, z: -10, radius: 14, lateralRadius: 16, options: [branch('outer', '西側深水斜出灣', '斜向西側深水，與琉璃礁保留較大距離；從北礁接近時帆角較有利，但航程較長，南側仍需回正。', 'safe', -58, 28), branch('inner', '礁西近線出灣', '沿礁西較近的深水線接南灣，縮短繞行；岸距較小，從北礁接近時帆角較弱。', 'current', -38, 25)] }, { x: -24, z: -10, radius: 18.5, lateralRadius: 24, options: [branch('outer', '西側穿流留岸距', '斜穿西側水域，保留較大礁岸距離；從北礁接近時帆角較有利，南側仍需回正。請按當下沿航路流速比較取捨。', 'current', -55, 20), branch('inner', '礁西近線接南灣', '從琉璃西岸較近的深水線進入南灣，少向西繞行；岸距較小，從北礁接近時帆角較弱。', 'safe', -36, 20)] }], options: [branch('outer', '外緣出灣', '從潮道外緣回到南灣，流影響較小但離母港中線較遠。', 'safe', -70, 12), branch('inner', '內緣借流出灣', '沿琉璃礁西側的較強流帶出灣，依當前流向決定是否值得。', 'current', -36, 20)] }),
  navigationGate('green-current', '青根潮道分流', -48, -8, 48,
    [branch('outer', '紅樹外緣水道', '較西側流力較弱，靠青根泊位也較直接。', 'safe', -87, -36), branch('inner', '中央流帶', '中央流帶較強；北上順流可加速，逆流則增加時間。', 'current', -43, -36)],
    [branch('outer', '西緣減少逆流', '沿較弱流力的外緣返航，以距離換取較少流阻。', 'safe', -68, -12), branch('inner', '中央流帶返航', '中央流帶較強；南下是否借到流速取決於目前潮相。', 'current', -52, -20)]),
  navigationGate('whirl-east-margin', '青根旋流東緣', -18, -87, 54,
    { entry: { x: -18, z: -94, radius: 45, lateralRadius: 26 }, options: [branch('outer', '向東多留旋流距離', '偏東深水離旋流更遠，適合先確保轉舵空間。', 'safe', 5, -104), branch('inner', '旋流外圈近線', '貼著旋流外圈的深水近線北上，路較直接但要守住外圈。', 'current', -25, -104)] },
    { entry: { x: 0, z: -87, radius: 42, lateralRadius: 42 }, options: [branch('outer', '東側深水返航', '遠離旋流後再轉入海圖中央，側流影響較少。', 'safe', 5, -70), branch('inner', '青根潮道接續線', '沿旋流東側接入青根潮道；比較當前流向與較直接的西側路徑。', 'current', -25, -70)] }),
  navigationGate('north-reef-current', '琉璃北礁流口', -24, -48, 46,
    { destinationIslandId: 'lighthouse', entry: { x: -24, z: -55, radius: 54 }, options: [branch('outer', '西側強流線', '西側接近青根潮道中心，順流可省時，逆流會拖慢。', 'current', -40, -74), branch('inner', '東側弱流線', '東側流力較弱，但下一段須保留旋流的東側通道。', 'safe', -12, -74)] },
    { entry: { x: -20, z: -38, radius: 34, lateralRadius: 60 }, entries: [{ x: 4, z: -48, radius: 31, lateralRadius: 12, options: [branch('outer', '東來向西側流帶', '從旋流東側接近時，斜向西側較強流帶，較近礁線多留離岸距離；順逆流決定這段的時間成本。', 'current', -33, -28), branch('inner', '東來向礁外近線', '從旋流東側接近時，沿較弱流的近線南下；橫向航程較短，但更靠近琉璃礁北側岸線。', 'safe', -15, -22)] }], options: [branch('outer', '西側流帶出入口', '較西側流力更強，且離琉璃礁較遠；順逆流決定時間成本。', 'current', -40, -22), branch('inner', '礁外弱流線', '避開潮道中心的較強流力，代價是更靠近琉璃礁北側岸線。', 'safe', -15, -22)] }),
  navigationGate('beacon-wind', '燈塔泊外分流', 0, -145, 26,
    { destinationIslandId: 'lighthouse', entry: { x: 0, z: -140, radius: 30 }, options: [branch('outer', '西側對位再靠泊', '從西側深水預留轉舵空間，再斜向燈塔泊位；航程較長，需在最後轉向前收帆。', 'safe', -20, -172), branch('inner', '中央近線靠泊', '沿中央短線接近燈塔泊位；較早面對島岸，須及時收帆避免過衝。', 'direct', 0, -172)] },
    [branch('outer', '西側深水返航', '向西接入旋流東側深水廊道，較少受到星盤潮流影響。', 'safe', -20, -112), branch('inner', '東側接星盤潮道', '偏東接近星盤流帶；順流可能省時，逆流時外緣更容易前進。', 'current', 20, -112)],
    { west: { destinationIslandId: 'lighthouse', entry: { x: 36, z: -140, radius: 42, lateralRadius: 35 }, options: [branch('outer', '東側留岸距入泊', '先在燈塔東南側預留轉向空間，再向泊位靠攏；末段較長但遠離島岸。', 'safe', 20, -172), branch('inner', '中央短線對位', '直接斜向中央泊位延長線，後段較短；先收帆再接近燈塔岸線。', 'direct', 0, -172)] } }),
  navigationGate('white-whirl-margin', '白羽旋流西緣', 54, 91, 48,
    { entry: { x: 54, z: 91, radius: 40 }, options: [branch('outer', '西側寬水域', '保留較大旋流與島岸距離，往白羽泊位需再轉向。', 'safe', 48, 56), branch('inner', '白羽泊外近線', '沿旋流西側近線對準白羽港，縮短後段但需要精準轉舵。', 'current', 76, 56)] },
    { entry: { x: 54, z: 91, radius: 48 }, options: [branch('outer', '西側寬水域返港', '向西保留旋流距離，再斜向母港，轉舵空間較大。', 'safe', 40, 112), branch('inner', '旋流近側短線', '由旋流西側深水近線回港，路更直接但不要往東切入旋流圈。', 'current', 50, 100)] }),
  navigationGate('glass-east-margin', '琉璃東岸水道', 45, 25, 46,
    { entry: { x: 45, z: 25, radius: 45 }, options: [branch('outer', '東側深水線', '離琉璃礁較遠，適合預留轉入星盤潮道的空間。', 'safe', 65, 0), branch('inner', '礁外近側線', '靠近琉璃礁東側外緣通過，與西側棲地的接續較短；勿貼岸急轉。', 'current', 42, 0)] },
    { entry: { x: 45, z: 25, radius: 45 }, options: [branch('outer', '白羽側深水線', '從東側深水接向白羽內灣，較少近岸修正。', 'safe', 65, 52), branch('inner', '中央礁外近線', '從琉璃礁東側外緣向母港中線接近，留意船體的離礁空間。', 'current', 36, 52)] }),
  navigationGate('star-gate-margin', '星盤潮門東緣', 74, -29, 26,
    { entry: { x: 74, z: -29, radius: 22 }, options: [branch('outer', '東側寬深水', '與星盤潮門保持較大距離，流力也較偏外緣。', 'safe', 82, -65), branch('inner', '潮門外借流線', '仍從潮門外側通過，但靠近星盤潮道中心；流向決定能否省時。', 'current', 68, -64)] },
    [branch('outer', '東側外緣返航', '以較大的礁外空間換取較弱的潮道推移。', 'safe', 82, 7), branch('inner', '中央流帶返航', '沿潮門東側流帶南下，順逆流會改變返航時間。', 'current', 65, 7)]),
  navigationGate('star-north-current', '星盤北側流緣', 70, -100, 26,
    [branch('outer', '北側深水外緣', '先沿星盤外側深水北行，再轉向燈塔，保留島岸空間。', 'safe', 76, -132), branch('inner', '偏西接燈塔', '偏西穿過潮道，往燈塔的後段較短；需修正側流推移。', 'current', 48, -132)],
    [branch('outer', '東側流緣', '向星盤潮道外緣移動，較容易控制下一次靠泊轉向。', 'safe', 76, -68), branch('inner', '西側流帶', '留在較靠近潮門的流帶中，依順逆流比較返航路程。', 'current', 65, -68)]),
  navigationGate('west-current-exit', '青根流尾與潮脊轉接', -41.5, 56, 40, null,
    { entries: [{ x: -45, z: 50, radius: 36, options: [branch('outer', '西側流尾接潮脊', '沿西側水域接向潮脊外緣，保留較大的離礁空間；南端再向母港回正，流況看當下沿線投影。', 'current', -48, 70), branch('inner', '斜出流尾接潮脊', '向東斜出流尾，較早接近潮脊西側；後段較直接，但離礁空間較小，需守住近線。', 'safe', -30, 60)] }], options: [branch('outer', '西緣留流再繞潮脊', '沿西側流尾接向潮脊外緣；比較目前流況與後續距離。', 'current', -65, 65), branch('inner', '提早離流接近潮脊', '斜穿流尾後離開流帶，較早接近潮脊西側；順流時會放棄部分流速。', 'safe', -30, 65)] }),
  navigationGate('harbor-approach', '潮音港泊外進港', 20, 147, 60, null,
    { destinationIslandId: 'harbor', entry: { x: 20, z: 147, radius: 60, maxDestinationDistance: 76 }, entries: [{ x: -38, z: 128, radius: 38, lateralRadius: 24, maxDestinationDistance: 50 }], options: [branch('outer', '外側對位後入港', '先在泊位西側對位，保留較大的岸距；最後仍需收帆轉向金色泊位。', 'safe', -20, 135), branch('inner', '直接對準金色泊位', '最直接的進港線，靠近母港岸線前需及時收帆，避免過衝。', 'current', -12, 141)] }),
  { id: 'glass-white-crossing', name: '琉璃與白羽橫向進港', x: 54, z: 35, radius: 20, directions: {
    east: { destinationIslandId: 'gull', entry: { x: 64, z: 35, radius: 17, lateralRadius: 38 }, options: [
      branch('outer', '白羽泊外對位', '先在白羽泊位的外側延長線對位，再沿岸外方向入港；航程較長，轉向時有較多離岸空間。', 'safe', 76, 20),
      branch('inner', '白羽近側短線', '直接接近白羽西北泊位，少繞一段；較早接近島岸，須收帆並守住金色泊位方向。', 'direct', 76, 38),
    ] },
    west: { destinationIslandId: 'reef', entry: { x: 44, z: 35, radius: 20 }, options: [
      branch('outer', '琉璃泊外對位', '先到琉璃南方泊位外側，再向北對準泊位；較長但保留轉舵與離岸空間。', 'safe', 0, 48),
      branch('inner', '琉璃近側短線', '從東南方直接接近琉璃泊位，縮短航程；收帆後才轉向近礁泊位，避免切入岸線。', 'direct', 24, 31),
    ] },
  } },
  { id: 'glass-port-approach', name: '琉璃西南泊外', x: -38, z: 36, radius: 18, directions: {
    south: { destinationIslandId: 'reef', entry: { x: -36, z: 11, radius: 6, lateralRadius: 12 }, options: [
      branch('outer', '南側對位入港', '先留在琉璃南側深水，再向北對準泊位；距離較長，轉向時離岸較遠。', 'safe', -8, 40),
      branch('inner', '近礁短線入港', '從西南側近線接泊位，縮短航程；保持船身在礁岸外，先收帆再轉向。', 'direct', -16, 31),
    ] },
    east: { destinationIslandId: 'reef', minForwardDot: 0.5, entry: { x: -38, z: 36, radius: 28, lateralRadius: 26, maxDestinationDistance: 54 }, options: [
      branch('outer', '南側對位入港', '先留在琉璃南側深水，再向北對準泊位；距離較長，轉向時離岸較遠。', 'safe', -8, 40),
      branch('inner', '近礁短線入港', '從西南側近線接泊位，縮短航程；保持船身在礁岸外，先收帆再轉向。', 'direct', -16, 31),
    ] },
    north: { destinationIslandId: 'reef', entry: { x: -30, z: 61, radius: 18, lateralRadius: 75 }, options: [
      branch('outer', '西南深水對位', '先在西南側留足岸距，再轉向琉璃泊位；較遠但轉向空間較大。', 'safe', -28, 37),
      branch('inner', '南面直接對位', '從琉璃南方接近泊位，後段較短；靠近礁岸前先收帆。', 'direct', 0, 43),
    ] },
  } },
  { id: 'green-port-approach', name: '青根泊外與流緣', x: -90, z: -52, radius: 22, directions: {
    west: { destinationIslandId: 'mangrove', entry: { x: -66, z: -60, radius: 46 }, options: [
      branch('outer', '泊外延長線對位', '先留在泊位延長線的深水側，保留岸距；仍接近青根流帶，須比較當前側推與較長路程。', 'current', -65, -50),
      branch('inner', '岸外直接入港', '直接接近青根東南泊位，路程較短且離流道中心較遠；靠岸轉向須更精準。', 'safe', -92, -75),
    ] },
    north: { destinationIslandId: 'mangrove', entry: { x: -98, z: -50, radius: 25, lateralRadius: 20 }, options: [
      branch('outer', '東側深水接泊位', '偏東保留紅樹岸距，再轉向泊位；接近流帶，需修正潮流側推。', 'current', -80, -58),
      branch('inner', '沿岸外緣近線', '沿紅樹東南岸外的近線入港，較少繞行；須守住岸距並提前收帆。', 'safe', -105, -50),
    ] },
  } },
  { id: 'coral-port-approach', name: '珊瑚灣泊外對位', x: -63, z: 67, radius: 18, directions: {
    west: { destinationIslandId: 'coral', options: [
      branch('outer', '北側深水對位', '先到珊瑚泊位北側的延長線，再沿岸外方向進港；較遠但有更多轉舵空間。', 'safe', -72, 42),
      branch('inner', '東側近線進港', '由東側近線直接接近珊瑚泊位；距離較短，收帆後再完成靠岸轉向。', 'direct', -82, 64),
    ] },
  } },
];

// Optional samples are ordinary cargo, never additional journal species or story gates.
export const OBSERVATIONS = [
  { id: 'coral-crossing', name: '珊瑚外灣浮標', x: -48, z: 112, note: '珊瑚灣與潮脊之間留有深水空隙，離礁越遠，越少受水位限制。' },
  { id: 'coral-north', name: '珊瑚北緣浮標', x: -89, z: 18, note: '沿島岸外側觀察，比貼著珊瑚岸線急轉更容易保留船體淨空。' },
  { id: 'root-front', name: '紅樹前灣浮標', x: -104, z: -30, note: '紅樹根系讓細沙沉積；靠近根灣時先收帆，能看清淺灘邊緣。' },
  { id: 'root-stream', name: '青根流緣浮標', x: -86, z: -34, note: '同一潮道會隨潮相反向；比較浮沫與船首，才能分辨順流和側流。' },
  { id: 'glass-west', name: '琉璃西緣浮標', x: -62, z: 7, note: '礁島西緣連接兩片棲地；繞到泊位外側後再轉向，可保留安全岸距。' },
  { id: 'glass-approach', name: '琉璃泊外浮標', x: -24, z: 32, note: '琉璃泊位在礁島南面，沿島南側靠近，能避開突出的礁岸。' },
  { id: 'shoal-west', name: '潮脊西側浮標', x: -30, z: 112, note: '南方潮脊露出時，西側深水仍可通行；取樣也能用來比較兩條航路。' },
  { id: 'shoal-south', name: '潮脊近灣浮標', x: -15, z: 62, note: '潮脊的可通水位由礁頂決定；漲潮不代表已經能越礁，先讀水位標記。' },
  { id: 'white-fork', name: '白羽分流浮標', x: 74, z: 135, note: '白羽旋流位在航道東側；保留外圈距離，比穿過中心更容易控制轉舵。' },
  { id: 'white-inlet', name: '白羽港外浮標', x: 75, z: 68, note: '燕鷗會沿魚群與流緣活動；觀察海鳥可以補充海圖，不能取代礁位標記。' },
  { id: 'star-stream', name: '星盤南流浮標', x: 65, z: 8, note: '東側潮道與西側潮道方向相反；潮汐預報能幫助選擇下一段借流方向。' },
  { id: 'star-gate', name: '潮門東緣浮標', x: 77, z: -44, note: '星盤潮門東邊有不依賴水位的廊道；借中央流速時需同時留意礁圈。' },
  { id: 'north-reef', name: '北礁廊道浮標', x: -42, z: -35, note: '離開琉璃礁向北後，中央深水連接燈塔；側流會推移船身，船首不等於航跡。' },
  { id: 'whirl-margin', name: '青根旋流外緣浮標', x: -35, z: -91, note: '旋流強度具有週期，外緣仍需保留空間；安全廊道從旋流東邊經過。' },
  { id: 'beacon-water', name: '遠潮深水浮標', x: 0, z: -145, note: '燈塔南面的深水是返航轉向區；先對準下一段航路，再把帆力提高。' },
  { id: 'beacon-approach', name: '守燈人迎航浮標', x: -7, z: -166, note: '燈塔泊位朝南，收帆後再進金色泊位；取樣與靠岸都需要低航速。' },
];

export const CURRENTS = [
  { id: 'west-stream', name: '青根潮道', x: -50, z: -10, radius: 70, dx: 0.1, dz: -1, strength: 0.775, phase: 0 },
  { id: 'east-stream', name: '星盤潮道', x: 70, z: -80, radius: 75, dx: -0.1, dz: 1, strength: 0.9, phase: Math.PI },
];
export const REEFS = [
  { id: 'south-shoal', name: '南方潮脊', x: 0, z: 92, radius: 16, safeHeight: 0.35 },
  { id: 'east-gate', name: '星盤潮門', x: 43, z: -60, radius: 15, safeHeight: 0.05 },
];
export const WHIRLS = [
  { id: 'west-whirl', name: '青根旋流', x: -58, z: -125, radius: 20, phase: 0, strength: 1.625 },
  { id: 'east-whirl', name: '白羽旋流', x: 86, z: 115, radius: 16, phase: Math.PI, strength: 6 },
];

export const DIVE_SITES = [
  { id: 'coral-dive', islandId: 'coral', name: '珊瑚淺灣', partId: 'prism', partName: '聚光稜鏡', discoveryId: 'foxfish', entry: { x: -98, z: 66 }, target: { x: -83, z: 54 }, bubbles: [{ x: -91, z: 60 }], radius: 26, oxygen: 55 },
  { id: 'ruin-dive', islandId: 'ruin', name: '沉鐘水庭', partId: 'gear', partName: '潮鐘齒輪', discoveryId: 'tide-clock', entry: { x: 99, z: -80 }, target: { x: 83, z: -69 }, bubbles: [{ x: 91, z: -74 }], radius: 26, oxygen: 55 },
  { id: 'reef-dive', islandId: 'reef', name: '琉璃洞灣', partId: 'crystal', partName: '燈芯晶石', discoveryId: 'nautilus', entry: { x: 0, z: 27 }, target: { x: 16, z: 40 }, bubbles: [{ x: 8, z: 33 }], radius: 26, oxygen: 55 },
];
