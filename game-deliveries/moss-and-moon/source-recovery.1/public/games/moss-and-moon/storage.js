import { createState, validateState } from './rules.js';

export const STORAGE_PREFIX = 'moss-and-moon:v1:slot:';
export const storageKeys = slot => ({ current: `${STORAGE_PREFIX}${slot}`, backup: `${STORAGE_PREFIX}${slot}:backup`, pending: `${STORAGE_PREFIX}${slot}:pending` });

// FNV-1a detects truncated/edited snapshots; gameplay schema validation is separate.
function checksum(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++) { hash ^= text.charCodeAt(index); hash = Math.imul(hash, 16777619); }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
function encode(state) {
  const payload = JSON.stringify(state);
  return JSON.stringify({ format: 'moss-and-moon', version: 1, checksum: checksum(payload), payload });
}
function decode(raw, slot) {
  try {
    if (typeof raw !== 'string' || raw.length > 200000) return null;
    const envelope = JSON.parse(raw);
    if (envelope?.format !== 'moss-and-moon' || envelope.version !== 1 || typeof envelope.payload !== 'string' || checksum(envelope.payload) !== envelope.checksum) return null;
    const state = JSON.parse(envelope.payload);
    if (!validateState(state).ok || (slot !== undefined && state.slot !== slot)) return null;
    return state;
  } catch { return null; }
}
function getStorage(supplied) {
  const storage = supplied ?? globalThis.localStorage;
  if (!storage || !['getItem', 'setItem', 'removeItem'].every(name => typeof storage[name] === 'function')) throw new Error('此瀏覽器未提供可用的本機存檔');
  return storage;
}
const validSlot = slot => slot === 1 || slot === 2;

export function loadSlot(slot = 1, suppliedStorage) {
  if (!validSlot(slot)) return { state: null, recovered: false, error: '存檔槽必須為 1 或 2' };
  try {
    const storage = getStorage(suppliedStorage), keys = storageKeys(slot);
    const raw = storage.getItem(keys.current), backup = storage.getItem(keys.backup);
    const currentState = decode(raw, slot);
    if (currentState) return { state: currentState, recovered: false, error: null };
    const backupState = decode(backup, slot);
    if (backupState) return { state: backupState, recovered: true, error: '主要存檔損壞，已載入上一個有效快照。' };
    return { state: createState(slot), recovered: false, error: raw !== null || backup !== null ? '存檔與備份無法讀取，已安全開啟新庭園；原始資料保留至下一次成功儲存。' : null };
  } catch (error) {
    return { state: createState(slot), recovered: false, error: `本機存檔無法讀取：${error.message}` };
  }
}

export function saveSlot(state, suppliedStorage) {
  const validation = validateState(state);
  if (!validation.ok) return { ok: false, error: `拒絕儲存損壞資料：${validation.error}` };
  try {
    const storage = getStorage(suppliedStorage), keys = storageKeys(state.slot), encoded = encode(state);
    const previousRaw = storage.getItem(keys.current), backupRaw = storage.getItem(keys.backup);
    // LocalStorage setItem replaces one entire string atomically. Pending is never loaded.
    storage.setItem(keys.pending, encoded);
    const previous = decode(previousRaw, state.slot) ? previousRaw : decode(backupRaw, state.slot) ? backupRaw : encoded;
    storage.setItem(keys.backup, previous);
    storage.setItem(keys.current, encoded);
    try { storage.removeItem(keys.pending); } catch { /* committed current remains authoritative */ }
    return { ok: true, error: null };
  } catch (error) { return { ok: false, error: `儲存失敗，先前有效快照仍保留：${error.message}` }; }
}

export function exportState(state) {
  const validation = validateState(state);
  if (!validation.ok) throw new Error(validation.error);
  return encode(state);
}

export function importSlot(slot, text, suppliedStorage) {
  if (!validSlot(slot)) return { ok: false, state: null, error: '存檔槽必須為 1 或 2' };
  const decoded = decode(text);
  if (!decoded) return { ok: false, state: null, error: '匯入檔案損壞或版本不相容；原有存檔未變更。' };
  decoded.slot = slot;
  const result = saveSlot(decoded, suppliedStorage);
  return { ...result, state: result.ok ? decoded : null };
}
