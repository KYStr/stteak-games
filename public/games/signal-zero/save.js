import { LEVELS, ENDINGS } from './levels.js'; // 讀取手工關卡與可保存結局白名單。
import { medalsFor,validSeed } from './core.js'; // 沿用既有獎章判定，不改遊戲規則。

export const SAVE_KEY = 'stteak.signal-zero.save.v1'; // 保持既有主存檔鍵，允許第一版資料向後相容。
export const SAVE_BACKUP_KEY = `${SAVE_KEY}.backup`; // 沿用上一份有效存檔的備份鍵。
export const DEFAULT_BINDINGS = Object.freeze({ left: 'KeyA', right: 'KeyD', up: 'KeyW', crouch: 'KeyS', jump: 'Space', cycle: 'KeyQ', tool: 'KeyE', pause: 'Escape' }); // 提供完整預設按鍵，不由存檔額外增加動作。
const clone = value => JSON.parse(JSON.stringify(value)); // 複製可序列化資料，避免驗證時修改輸入。
const clamp = (n, min, max) => Math.max(min, Math.min(max, n)); // 限制數值在明確上下界。
const finite = (n, fallback, min = 0, max = 86400) => Number.isFinite(n) ? clamp(n, min, max) : fallback; // 只接受有限數字，否則使用安全預設。

export function defaultSave() { // 每次建立獨立預設存檔。
  return { schema: 1, unlocked: 1, bests: {}, medals: {}, packets: [], endings: [], pendingEnding: false, activeLevel: null, activeSeed:1009,activeTrace:null,variantBests:{},relaxedBests:{}, settings: { difficulty:'standard',music: .45, sfx: .7, muted: false, reducedMotion: globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false, quality: 'auto', touchControls: 'auto', bindings: { ...DEFAULT_BINDINGS } }, checkpoint: null }; // 新進度維持 schema 一，入口與安全點都可為空。
} // 結束此驗證或處理區塊。

/** 回傳獨立且有界的存檔；無法信任外層格式時回傳空值。 */
export function validateSave(raw) { // 驗證並正規化不可信的外部存檔。
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.schema !== 1) return null; // 外層格式或版本不符時拒絕，不猜測進度。
  const data = defaultSave(); // 所有欄位由預設值開始填入。
  data.unlocked = Number.isInteger(raw.unlocked) ? clamp(raw.unlocked, 1, LEVELS.length) : 1; // 解鎖數量限制於既有六關範圍。
  for (const level of LEVELS) { // 僅讀取已編寫關卡的正式紀錄。
    const best = raw.bests?.[level.id]; // 尋找目前關卡的最佳成績。
    if (best && Number.isFinite(best.time) && best.time >= 0 && Number.isInteger(best.alerts) && best.alerts >= 0) { // 只接受有效時間與非負整數警報數。
      data.bests[level.id] = { time: finite(best.time, 0), alerts: finite(best.alerts, 0, 0, 100000), alertTime: finite(best.alertTime, 0), completions: Math.floor(finite(best.completions, 1, 1, 100000)) }; // 保留最佳成績並限制不合理巨大數值。
    } // 結束此驗證或處理區塊。
    const medals = raw.medals?.[level.id]; // 讀取此關各自獨立的獎章。
    if (medals && typeof medals === 'object') data.medals[level.id] = { speed: medals.speed === true, ghost: medals.ghost === true, data: medals.data === true }; // 獎章只接受明確布林真值。
  } // 結束此驗證或處理區塊。
  data.packets = LEVELS.filter(level => Array.isArray(raw.packets) && raw.packets.includes(level.id)).map(level => level.id); // 只保留已編寫關卡的資料包 ID。
  data.endings = ENDINGS.filter(ending => Array.isArray(raw.endings) && raw.endings.includes(ending.id)).map(ending => ending.id); // 只保留既有完整結局 ID。
  data.pendingEnding = raw.pendingEnding === true; // 待選結局狀態沿用明確布林值。
  // 章節入口延續獨立於選擇性的安全點。
  // 舊 schema 一仍有效，入口僅限已解鎖的手工章節。
  data.activeLevel = Number.isInteger(raw.activeLevel) && raw.activeLevel >= 0 && raw.activeLevel < data.unlocked ? raw.activeLevel : null; // 入口必須是有效且已解鎖的章節整數。
  data.activeSeed=validSeed(raw.activeSeed,data.activeLevel??0);data.activeTrace=Number.isFinite(raw.activeTrace)?finite(raw.activeTrace,0,0,1000):null;
  for(const key of ['variantBests','relaxedBests'])if(raw[key]&&typeof raw[key]==='object')for(const [id,best]of Object.entries(raw[key]).slice(-256))if(/^[a-z]+:(standard|relaxed):[0-9]+$/.test(id)&&Number.isFinite(best?.time)&&best.time>=0&&Number.isInteger(best.alerts)&&best.alerts>=0)data[key][id]={time:finite(best.time,0),alerts:finite(best.alerts,0,0,100000),completions:Math.floor(finite(best.completions,1,1,100000))};
  const settings = raw.settings; // 設定獨立於關卡遷移保存。
  if (settings && typeof settings === 'object') { // 只處理物件格式的設定。
    data.settings.difficulty=settings.difficulty==='relaxed'?'relaxed':'standard';
    data.settings.music = finite(settings.music, .45, 0, 1); // 音樂音量限制在零至一。
    data.settings.sfx = finite(settings.sfx, .7, 0, 1); // 音效音量限制在零至一。
    data.settings.muted = settings.muted === true;
    data.settings.reducedMotion = typeof settings.reducedMotion==='boolean'?settings.reducedMotion:data.settings.reducedMotion; // 減少動態僅接受布林真值。
    data.settings.quality = ['auto', 'low', 'high'].includes(settings.quality) ? settings.quality : 'auto'; // 畫質只接受既有選項。
    data.settings.touchControls = ['auto', 'on', 'off'].includes(settings.touchControls) ? settings.touchControls : 'auto'; // 觸控顯示只接受既有選項。
    const taken = new Set(); // 追蹤已使用按鍵避免重複。
    for (const [action, fallback] of Object.entries(DEFAULT_BINDINGS)) { // 每個既有動作都取得有效按鍵或預設值。
      const key = settings.bindings?.[action]; // 讀取此動作的保存按鍵。
      const valid = (action==='pause'?key==='Escape':key!=='Escape') && typeof key === 'string' && /^(Key[A-Z]|Digit[0-9]|Arrow(Left|Right|Up|Down)|Space|Escape|ShiftLeft|ControlLeft)$/.test(key) && !taken.has(key); // 按鍵須在白名單且未被其他動作使用。
      data.settings.bindings[action] = valid ? key : fallback; // 不合法按鍵回到已知預設。
      taken.add(data.settings.bindings[action]); // 記錄本次選定按鍵。
    } // 結束此驗證或處理區塊。
    // 發生重複回退時使用完整已知預設。
    if (new Set(Object.values(data.settings.bindings)).size !== Object.keys(DEFAULT_BINDINGS).length) data.settings.bindings = { ...DEFAULT_BINDINGS }; // 預設回退仍重複時整組恢復一致預設。
  } // 結束此驗證或處理區塊。
  const checkpoint = raw.checkpoint; // 僅在外層資料驗證後處理安全點。
  const level = Number.isInteger(checkpoint?.levelIndex) && checkpoint.levelIndex >= 0 && checkpoint.levelIndex < data.unlocked ? LEVELS[checkpoint.levelIndex] : null; // 先限制章節範圍與既有解鎖，無效身份不可取得地圖。
  const revision = checkpoint?.levelRevision === undefined ? 1 : checkpoint.levelRevision; // 僅缺省舊欄位視為第一版，拒絕字串、空值及其他異常版本。
  const validCheckpoint = checkpoint?.schema === 1 && level && level.id === checkpoint.levelId && Array.isArray(checkpoint.tools) && checkpoint.tools.length === 3 && checkpoint.tools.every((n, i) => Number.isInteger(n) && n >= 0 && n <= level.supplies[i]) && Number.isFinite(checkpoint.time) && checkpoint.time >= 0 && Array.isArray(checkpoint.objectives); // 與原安全點同一套信封檢查，不能只憑章節數字注入入口。
  if (validCheckpoint && revision === (level.revision || 1)) { // 同版快照維持原還原路徑及裝置白名單。
    data.checkpoint = clone(checkpoint);data.checkpoint.seed=validSeed(checkpoint.seed,checkpoint.levelIndex);data.checkpoint.difficulty=checkpoint.difficulty==='relaxed'?'relaxed':'standard';data.checkpoint.traceRemaining=Number.isFinite(checkpoint.traceRemaining)?finite(checkpoint.traceRemaining,0,0,level.traceDeadline):Math.max(0,level.traceDeadline-checkpoint.time); // 同版合法安全點複製為獨立資料。
    // 裝置依已編寫 ID 篩選，不使用早期切片的固定數量。
    // 晚期區段的巡邏相位與永久改線必須完整保留。
    const savedDevices = Array.isArray(checkpoint.devices) ? checkpoint.devices : []; // 裝置列表若非陣列就安全視為空。
    data.checkpoint.devices = LEVELS[checkpoint.levelIndex].devices // 依已編寫裝置白名單重新組成保存狀態。
      .map(device => savedDevices.find(saved => saved?.id === device.id)) // 以穩定 ID 對應每個既有裝置。
      .filter(Boolean).map(clone); // 移除缺失項目並複製，保留晚期區段裝置。
  } else if (validCheckpoint && data.activeLevel === null && Number.isInteger(revision) && revision >= 1 && revision < (level.revision || 1)) { // 只遷移已知格式的舊版快照；合法現有入口優先，未來版或錯誤資料不推測。
    data.activeLevel = checkpoint.levelIndex; // 只保留經驗證的章節身份；舊座標、工具、目標及巡邏快照一律不搬移。
  } // 結束此驗證或處理區塊。
  data.activeSeed=validSeed(raw.activeSeed,data.activeLevel??data.checkpoint?.levelIndex??0);
  return data; // 回傳安全且獨立的正規化存檔。
} // 結束此驗證或處理區塊。

function safeStorage(storage) { return storage ?? globalThis.localStorage; } // 測試可明確提供記憶體存儲，正式使用瀏覽器存儲。

export function loadSave(storage) { // 載入主檔，必要時嘗試有效備份。
  try { // 捕捉外部存儲可能拒絕存取的例外。
    const target = safeStorage(storage); // 取得本次指定的存儲介面。
    if (!target) return { data: defaultSave(), warning: '此環境未提供本機存檔；本次仍可遊玩。' }; // 存儲不存在時回傳可見說明而不拋錯。
    const text = target.getItem(SAVE_KEY); // 只讀取主存檔，不立即修改磁碟。
    if (text == null && target.getItem(SAVE_BACKUP_KEY) == null) return { data: defaultSave(), warning: '' }; // 只有主檔與備份皆不存在時才視為新玩家；孤立備份仍須嘗試復原。
    let data,parsed; // 分開保存原始物件及經驗證資料。
    try { parsed=JSON.parse(text); data = validateSave(parsed); } catch { data = null; } // 解析與驗證都可能失敗，交給備份路徑。
    if (data) return { data, warning: parsed.checkpoint && !data.checkpoint ? data.activeLevel !== null ? '安全點已失效，改由已保存章節起點繼續；正式成績與設定保留。' : '安全點資料無法復原；正式成績與設定保留，請從選關重新開始。' : '' }; // 對有可信入口與完全無法復原的資料分別說明，不再誤稱一定遷移同章。
    try { data = validateSave(JSON.parse(target.getItem(SAVE_BACKUP_KEY))); } catch { data = null; } // 主檔無效時才嘗試上一份有效備份。
    if (data) return { data, warning: text == null ? '主存檔缺失，已復原上一份有效備份。' : '主存檔格式損壞，已復原上一份有效備份。' }; // 備份有效時回報復原而不自動覆寫損壞主檔。
    return { data: defaultSave(), warning: '本機存檔無法讀取，已使用新進度；損壞資料沒有被自動覆寫。' }; // 雙份資料都無法使用時安全降級並明示原因。
  } catch { // 外部讀寫例外以有界錯誤結果處理。
    return { data: defaultSave(), warning: '瀏覽器拒絕讀取本機存檔；本次仍可遊玩。' }; // 雙份資料都無法使用時安全降級並明示原因。
  } // 結束此驗證或處理區塊。
} // 結束此驗證或處理區塊。

export function writeSave(raw, storage) { // 明確保存時才把正規化資料寫回。
  const data = validateSave(raw); // 寫入前同樣驗證外部資料。
  if (!data) return { ok: false, warning: '存檔格式無效，原有資料已保留。' }; // 拒絕無效資料，不破壞既有主檔。
  try { // 捕捉外部存儲可能拒絕存取的例外。
    const target = safeStorage(storage); // 取得本次指定的存儲介面。
    if (!target) return { ok: false, warning: '本機存檔不可用；請勿在任務中關閉此頁。' }; // 存儲不存在時回傳可見說明而不拋錯。
    const prior = target.getItem(SAVE_KEY); // 先查看前一份主檔是否可備份。
    if (prior) { // 只有存在舊資料才建立備份。
      let validPrior; // 保存舊資料驗證結果。
      try { validPrior = validateSave(JSON.parse(prior)); } catch { validPrior = null; } // 損壞資料不當作有效備份。
      if (validPrior) target.setItem(SAVE_BACKUP_KEY, prior); // 只備份上一份有效主檔。
    } // 結束此驗證或處理區塊。
    target.setItem(SAVE_KEY, JSON.stringify(data)); // 完整序列化新資料後寫入主檔。
    return { ok: true, warning: '' }; // 兩階段寫入成功才回報成功。
  } catch { // 外部讀寫例外以有界錯誤結果處理。
    return { ok: false, warning: '本機存檔寫入失敗（可能被封鎖或已滿）；本次進度仍留在記憶體。' }; // 儲存不足或被拒絕時顯示警語並保留記憶體進度。
  } // 結束此驗證或處理區塊。
} // 結束此驗證或處理區塊。

export function recordCompletion(raw, run) { // 只有正式完成才能累計紀錄，與遷移無關。
  const data = validateSave(raw) || defaultSave(); // 完成紀錄以已驗證的保存資料為基礎。
  if (run.phase !== 'complete' || !LEVELS[run.levelIndex] || run.objectives.length !== LEVELS[run.levelIndex].terminals.length) return data; // 非完成或目標數量不符不發放成績。
  const id = LEVELS[run.levelIndex].id; // 採用已編寫關卡的穩定 ID。
  const key=id+':'+(run.difficulty||'standard')+':'+validSeed(run.seed,run.levelIndex),records=run.difficulty==='relaxed'?data.relaxedBests:data.variantBests,variant=records[key];records[key]={time:Math.min(variant?.time??Infinity,run.time),alerts:Math.min(variant?.alerts??Infinity,run.alerts),completions:(variant?.completions||0)+1};
  if(run.difficulty!=='relaxed'){
  const prior = data.bests[id]; // 讀取此前正式最佳紀錄。
  data.bests[id] = { time: Math.min(prior?.time ?? Infinity, run.time), alerts: Math.min(prior?.alerts ?? Infinity, run.alerts), alertTime: Math.min(prior?.alertTime ?? Infinity, run.alertTime), completions: (prior?.completions || 0) + 1 }; // 分別累計最佳時間、最少警報與完成次數。
  const earned = medalsFor(run); // 從既有規則計算本次獎章。
  const medals = data.medals[id] || {}; // 保留此前取得的獨立獎章。
  data.medals[id] = { speed: Boolean(medals.speed || earned.speed), ghost: Boolean(medals.ghost || earned.ghost), data: Boolean(medals.data || earned.data) }; // 各獎章只會累積，不由較差重玩覆蓋。
  }
  if (run.packet && !data.packets.includes(id)) data.packets.push(id); // 正式完成時累計唯一資料包。
  data.unlocked = Math.min(LEVELS.length, Math.max(data.unlocked, run.levelIndex + 2)); // 解鎖數量限制於既有六關範圍。
  data.checkpoint = null; // 完成後不把舊安全點誤當仍在進行。
  data.activeLevel = null; // 完成後清空章節入口，避免重複發獎。
  if (run.levelIndex === LEVELS.length - 1) data.pendingEnding = true; // 末章完成後等待玩家明確選擇結局。
  return data; // 回傳安全且獨立的正規化存檔。
} // 結束此驗證或處理區塊。
