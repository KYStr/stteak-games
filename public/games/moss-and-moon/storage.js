import { createState, validateState } from "./rules.js";

export const STORAGE_PREFIX = "moss-and-moon:v1:slot:";
export const storageKeys = (slot) => ({
  current: `${STORAGE_PREFIX}${slot}`,
  backup: `${STORAGE_PREFIX}${slot}:backup`,
  pending: `${STORAGE_PREFIX}${slot}:pending`,
});

// FNV-1a detects truncated/edited snapshots; gameplay schema validation is separate.
function checksum(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index++) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}
function encode(state) {
  const payload = JSON.stringify(state);
  return JSON.stringify({
    format: "moss-and-moon",
    version: 2,
    checksum: checksum(payload),
    payload,
  });
}
function decode(raw, slot) {
  try {
    if (typeof raw !== "string" || raw.length > 200000) return null;
    const envelope = JSON.parse(raw);
    if (
      envelope?.format !== "moss-and-moon" ||
      ![1,2].includes(envelope.version) ||
      typeof envelope.payload !== "string" ||
      checksum(envelope.payload) !== envelope.checksum
    )
      return null;
    const state = JSON.parse(envelope.payload);
    if (!validateState(state).ok || (slot !== undefined && state.slot !== slot))
      return null;
    return migrateState(state);
  } catch {
    return null;
  }
}
function getStorage(supplied) {
  const storage = supplied ?? globalThis.localStorage;
  if (
    !storage ||
    !["getItem", "setItem", "removeItem"].every(
      (name) => typeof storage[name] === "function",
    )
  )
    throw new Error("此瀏覽器未提供可用的本機存檔");
  return storage;
}
const validSlot = (slot) => slot === 1 || slot === 2;

export function loadSlot(slot = 1, suppliedStorage) {
  if (!validSlot(slot))
    return { state: null, recovered: false, error: "存檔槽必須為 1 或 2" };
  try {
    const storage = getStorage(suppliedStorage),
      keys = storageKeys(slot);
    const raw = storage.getItem(keys.current),
      backup = storage.getItem(keys.backup);
    const currentState = decode(raw, slot);
    if (currentState)
      return { state: currentState, recovered: false, error: null };
    const backupState = decode(backup, slot);
    if (backupState)
      return {
        state: backupState,
        recovered: true,
        error: "主要存檔損壞，已載入上一個有效快照。",
      };
    return {
      state: createState(slot),
      recovered: false,
      error:
        raw !== null || backup !== null
          ? "存檔與備份無法讀取，已安全開啟新庭園；原始資料保留至下一次成功儲存。"
          : null,
    };
  } catch (error) {
    return {
      state: createState(slot),
      recovered: false,
      error: `本機存檔無法讀取：${error.message}`,
    };
  }
}

export function saveSlot(state, suppliedStorage) {
  const validation = validateState(state);
  if (!validation.ok)
    return { ok: false, error: `拒絕儲存損壞資料：${validation.error}` };
  try {
    const storage = getStorage(suppliedStorage),
      keys = storageKeys(state.slot),
      encoded = encode(state);
    const previousRaw = storage.getItem(keys.current),
      backupRaw = storage.getItem(keys.backup);
    // LocalStorage setItem replaces one entire string atomically. Pending is never loaded.
    storage.setItem(keys.pending, encoded);
    const previous = decode(previousRaw, state.slot)
      ? previousRaw
      : decode(backupRaw, state.slot)
        ? backupRaw
        : encoded;
    storage.setItem(keys.backup, previous);
    storage.setItem(keys.current, encoded);
    try {
      storage.removeItem(keys.pending);
    } catch {
      /* committed current remains authoritative */
    }
    return { ok: true, error: null };
  } catch (error) {
    return {
      ok: false,
      error: `儲存失敗，先前有效快照仍保留：${error.message}`,
    };
  }
}

export function exportState(state) {
  const validation = validateState(state);
  if (!validation.ok) throw new Error(validation.error);
  return encode(state);
}

export function importSlot(slot, text, suppliedStorage) {
  if (!validSlot(slot))
    return { ok: false, state: null, error: "存檔槽必須為 1 或 2" };
  const decoded = decode(text);
  if (!decoded)
    return {
      ok: false,
      state: null,
      error: "匯入檔案損壞或版本不相容；原有存檔未變更。",
    };
  decoded.slot = slot;
  const result = saveSlot(decoded, suppliedStorage);
  return { ...result, state: result.ok ? decoded : null };
}

// Legacy saves keep all garden fields and remain untimed.
export function migrateState(state) {
  if (state?.schema === 1 && validateState(state).ok) return {...state,schema:2,mode:'free',campaign:null};
  return state;
}
export const RECORDS_KEY = 'moss-and-moon:records:v1';
const validRecord = r => r && Number.isInteger(r.seed) && r.seed>0 && r.seed<=4294967295 && ['standard','gentle'].includes(r.difficulty) && Number.isInteger(r.score) && r.score>=0 && r.score<=10000000 && Number.isFinite(r.activeMs) && r.activeMs>=0 && r.activeMs<=640000 && ['won','lost'].includes(r.outcome);
export function loadRecords(suppliedStorage) {
  try {
    const raw = getStorage(suppliedStorage).getItem(RECORDS_KEY);
    if (!raw) return {version:1,best:null,standard:null,gentle:null,seeds:[]};
    const r=JSON.parse(raw);
    if(r.version!==1 || ![r.best,r.standard,r.gentle].every(v=>v===null||validRecord(v)) || (r.standard&&r.standard.difficulty!=='standard') || (r.gentle&&r.gentle.difficulty!=='gentle') || !Array.isArray(r.seeds) || r.seeds.length>20 || !r.seeds.every(validRecord) || new Set(r.seeds.map(v=>v.seed+':'+v.difficulty)).size!==r.seeds.length) throw new Error('紀錄損壞');
    return r;
  } catch {return {version:1,best:null,standard:null,gentle:null,seeds:[]};}
}
export function recordCampaign(c,suppliedStorage) {
  const record={seed:c.seed,difficulty:c.difficulty,score:c.score,activeMs:c.activeMs,outcome:c.status};
  if(!validRecord(record))return {ok:false,error:'無效旅程紀錄'};
  try {
    const storage=getStorage(suppliedStorage),r=loadRecords(storage);
    const previous=r.seeds.find(v=>v.seed===record.seed&&v.difficulty===record.difficulty);
    if(previous && previous.score>=record.score)return {ok:true,records:r};
    if(!r.best||record.score>r.best.score)r.best=record;
    if(!r[record.difficulty]||record.score>r[record.difficulty].score)r[record.difficulty]=record;
    r.seeds=r.seeds.filter(v=>v.seed!==record.seed||v.difficulty!==record.difficulty);
    r.seeds.unshift(record);r.seeds.length=Math.min(20,r.seeds.length);
    storage.setItem(RECORDS_KEY,JSON.stringify(r));return {ok:true,records:r};
  }catch(error){return {ok:false,error:error.message};}
}
