import { LEVELS, ENDINGS } from './levels.js';
import { medalsFor } from './core.js';

export const SAVE_KEY = 'stteak.signal-zero.save.v1';
export const SAVE_BACKUP_KEY = `${SAVE_KEY}.backup`;
export const DEFAULT_BINDINGS = Object.freeze({ left: 'KeyA', right: 'KeyD', up: 'KeyW', crouch: 'KeyS', jump: 'Space', cycle: 'KeyQ', tool: 'KeyE', pause: 'Escape' });
const clone = value => JSON.parse(JSON.stringify(value));
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const finite = (n, fallback, min = 0, max = 86400) => Number.isFinite(n) ? clamp(n, min, max) : fallback;

export function defaultSave() {
  return { schema: 1, unlocked: 1, bests: {}, medals: {}, packets: [], endings: [], pendingEnding: false, settings: { music: .45, sfx: .7, reducedMotion: false, quality: 'auto', touchControls: 'auto', bindings: { ...DEFAULT_BINDINGS } }, checkpoint: null };
}

/** Return a fresh bounded save, or null when its envelope cannot be trusted. */
export function validateSave(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.schema !== 1) return null;
  const data = defaultSave();
  data.unlocked = Number.isInteger(raw.unlocked) ? clamp(raw.unlocked, 1, LEVELS.length) : 1;
  for (const level of LEVELS) {
    const best = raw.bests?.[level.id];
    if (best && Number.isFinite(best.time) && best.time >= 0 && Number.isInteger(best.alerts) && best.alerts >= 0) {
      data.bests[level.id] = { time: finite(best.time, 0), alerts: finite(best.alerts, 0, 0, 100000), alertTime: finite(best.alertTime, 0), completions: Math.floor(finite(best.completions, 1, 1, 100000)) };
    }
    const medals = raw.medals?.[level.id];
    if (medals && typeof medals === 'object') data.medals[level.id] = { speed: medals.speed === true, ghost: medals.ghost === true, data: medals.data === true };
  }
  data.packets = LEVELS.filter(level => Array.isArray(raw.packets) && raw.packets.includes(level.id)).map(level => level.id);
  data.endings = ENDINGS.filter(ending => Array.isArray(raw.endings) && raw.endings.includes(ending.id)).map(ending => ending.id);
  data.pendingEnding = raw.pendingEnding === true;
  const settings = raw.settings;
  if (settings && typeof settings === 'object') {
    data.settings.music = finite(settings.music, .45, 0, 1);
    data.settings.sfx = finite(settings.sfx, .7, 0, 1);
    data.settings.reducedMotion = settings.reducedMotion === true;
    data.settings.quality = ['auto', 'low', 'high'].includes(settings.quality) ? settings.quality : 'auto';
    data.settings.touchControls = ['auto', 'on', 'off'].includes(settings.touchControls) ? settings.touchControls : 'auto';
    const taken = new Set();
    for (const [action, fallback] of Object.entries(DEFAULT_BINDINGS)) {
      const key = settings.bindings?.[action];
      const valid = typeof key === 'string' && /^(Key[A-Z]|Digit[0-9]|Arrow(Left|Right|Up|Down)|Space|Escape|ShiftLeft|ControlLeft)$/.test(key) && !taken.has(key);
      data.settings.bindings[action] = valid ? key : fallback;
      taken.add(data.settings.bindings[action]);
    }
    // A duplicate fallback is less useful than known-good defaults.
    if (new Set(Object.values(data.settings.bindings)).size !== Object.keys(DEFAULT_BINDINGS).length) data.settings.bindings = { ...DEFAULT_BINDINGS };
  }
  const checkpoint = raw.checkpoint;
  if (checkpoint?.schema === 1 && Number.isInteger(checkpoint.levelIndex) && checkpoint.levelIndex >= 0 && checkpoint.levelIndex < data.unlocked && LEVELS[checkpoint.levelIndex]?.id === checkpoint.levelId && (checkpoint.levelRevision || 1) === (LEVELS[checkpoint.levelIndex].revision || 1) && Array.isArray(checkpoint.tools) && checkpoint.tools.length === 3 && checkpoint.tools.every((n, i) => Number.isInteger(n) && n >= 0 && n <= LEVELS[checkpoint.levelIndex].supplies[i]) && Number.isFinite(checkpoint.time) && checkpoint.time >= 0 && Array.isArray(checkpoint.objectives)) {
    data.checkpoint = clone(checkpoint);
    // Bound storage by authored IDs, not a slice-era device count. Later sectors
    // must retain their patrol phase and permanent rewires through serialization.
    const savedDevices = Array.isArray(checkpoint.devices) ? checkpoint.devices : [];
    data.checkpoint.devices = LEVELS[checkpoint.levelIndex].devices
      .map(device => savedDevices.find(saved => saved?.id === device.id))
      .filter(Boolean).map(clone);
  }
  return data;
}

function safeStorage(storage) { return storage ?? globalThis.localStorage; }

export function loadSave(storage) {
  try {
    const target = safeStorage(storage);
    if (!target) return { data: defaultSave(), warning: '此環境未提供本機存檔；本次仍可遊玩。' };
    const text = target.getItem(SAVE_KEY);
    if (text == null) return { data: defaultSave(), warning: '' };
    let data,parsed;
    try { parsed=JSON.parse(text); data = validateSave(parsed); } catch { data = null; }
    if (data) return { data, warning: parsed.checkpoint&&!data.checkpoint?'關卡已更新，舊安全點改由章節起點繼續；正式成績與設定保留。':'' };
    try { data = validateSave(JSON.parse(target.getItem(SAVE_BACKUP_KEY))); } catch { data = null; }
    if (data) return { data, warning: '主存檔格式損壞，已復原上一份有效備份。' };
    return { data: defaultSave(), warning: '本機存檔無法讀取，已使用新進度；損壞資料沒有被自動覆寫。' };
  } catch {
    return { data: defaultSave(), warning: '瀏覽器拒絕讀取本機存檔；本次仍可遊玩。' };
  }
}

export function writeSave(raw, storage) {
  const data = validateSave(raw);
  if (!data) return { ok: false, warning: '存檔格式無效，原有資料已保留。' };
  try {
    const target = safeStorage(storage);
    if (!target) return { ok: false, warning: '本機存檔不可用；請勿在任務中關閉此頁。' };
    const prior = target.getItem(SAVE_KEY);
    if (prior) {
      let validPrior;
      try { validPrior = validateSave(JSON.parse(prior)); } catch { validPrior = null; }
      if (validPrior) target.setItem(SAVE_BACKUP_KEY, prior);
    }
    target.setItem(SAVE_KEY, JSON.stringify(data));
    return { ok: true, warning: '' };
  } catch {
    return { ok: false, warning: '本機存檔寫入失敗（可能被封鎖或已滿）；本次進度仍留在記憶體。' };
  }
}

export function recordCompletion(raw, run) {
  const data = validateSave(raw) || defaultSave();
  if (run.phase !== 'complete' || !LEVELS[run.levelIndex] || run.objectives.length !== LEVELS[run.levelIndex].terminals.length) return data;
  const id = LEVELS[run.levelIndex].id;
  const prior = data.bests[id];
  data.bests[id] = { time: Math.min(prior?.time ?? Infinity, run.time), alerts: Math.min(prior?.alerts ?? Infinity, run.alerts), alertTime: Math.min(prior?.alertTime ?? Infinity, run.alertTime), completions: (prior?.completions || 0) + 1 };
  const earned = medalsFor(run);
  const medals = data.medals[id] || {};
  data.medals[id] = { speed: Boolean(medals.speed || earned.speed), ghost: Boolean(medals.ghost || earned.ghost), data: Boolean(medals.data || earned.data) };
  if (run.packet && !data.packets.includes(id)) data.packets.push(id);
  data.unlocked = Math.min(LEVELS.length, Math.max(data.unlocked, run.levelIndex + 2));
  data.checkpoint = null;
  if (run.levelIndex === LEVELS.length - 1) data.pendingEnding = true;
  return data;
}
