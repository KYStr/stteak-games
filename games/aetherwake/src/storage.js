import { WORLD, MODULES, STATIONS } from './world.js';

export const SAVE_VERSION = 3;
export const SAVE_KEY = 'aetherwake-save';
const clone = (value) => JSON.parse(JSON.stringify(value));
const finite = (value, fallback = 0, max = 1e9) => Number.isFinite(value) && value >= 0 ? Math.min(max, value) : fallback;
const ids = (values, valid) => Array.isArray(values) ? [...new Set(values.filter((id) => valid.includes(id)))] : [];
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const count = (value, max) => Math.trunc(finite(value, 0, max));
const stageCount = (challenge) => Array.isArray(challenge.stages) ? challenge.stages.length : 0;
const sampleCount = (mission) => Math.max(0, ...WORLD.routes.filter((route) => route.mission === mission).map((route) => Array.isArray(route.samples) ? route.samples.length : 0));
const legacyIds = (values) => Array.isArray(values) ? [...new Set(values.filter((id) => typeof id === 'string' && id.length > 0))] : [];
function cleanRecords(value, validKeys, route = false) {
  if (!record(value)) return {};
  return Object.fromEntries(Object.entries(value).flatMap(([key, entry]) => {
    if ((validKeys && !validKeys.includes(key)) || !record(entry) || !Number.isFinite(entry.time) || entry.time < 0) return [];
    const clean = route
      ? { time: finite(entry.time), assisted: entry.assisted === true, module: MODULES.some((module) => module.id === entry.module) ? entry.module : 'turn', seed: Math.trunc(finite(entry.seed, 1, 0xffffffff)) >>> 0 }
      : { time: finite(entry.time), score: finite(entry.score), stalls: Math.trunc(finite(entry.stalls)), assisted: entry.assisted === true };
    return [[key, clean]];
  }));
}
export function defaultSave() {
  return { schemaVersion: SAVE_VERSION, seed: 1, module: 'turn', checkpoint: 'island-camp', unlocked: ['island-camp'], activated: [], relics: [], mainSamples: [0, 0, 0], courseStages: Object.fromEntries(WORLD.challenges.map((challenge) => [challenge.id, 0])), challenges: [], completedChallenges: [], cargoStability: 100, cargoDamage: 0, elapsed: 0, segmentStart: 0, stalls: 0, assist: false, usedAssist: false, routeStyle: 'safe', completed: false, records: {}, routeRecords: {}, legacyRecords: {}, legacyRouteRecords: {}, legacyChallenges: [], settings: { music: 0.35, sfx: 0.7, reducedMotion: false, camera: 'follow', quality: 'auto' } };
}
export function validateSave(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || value.schemaVersion !== SAVE_VERSION) return null;
  // A schema marker alone is not a usable checkpoint. Reject malformed core data,
  // then sanitize optional fields rather than discarding a valid old expedition.
  if (!WORLD.islands.some((island) => island.id === value.checkpoint) || !Array.isArray(value.relics) || !Array.isArray(value.activated)) return null;
  const result = defaultSave();
  result.seed = Math.trunc(finite(value.seed, 1, 0xffffffff)) >>> 0;
  result.module = MODULES.some((item) => item.id === value.module) ? value.module : 'turn';
  result.checkpoint = value.checkpoint;
  result.unlocked = ids(value.unlocked, WORLD.islands.map((item) => item.id));
  result.unlocked = [...new Set(['island-camp', ...result.unlocked, value.checkpoint])];
  result.relics = ids(value.relics, WORLD.relics.map((item) => item.id));
  result.mainSamples = result.mainSamples.map((_, index) => count(Array.isArray(value.mainSamples) ? value.mainSamples[index] : 0, sampleCount(index + 1)));
  for (const challenge of WORLD.challenges) result.courseStages[challenge.id] = count(record(value.courseStages) ? value.courseStages[challenge.id] : 0, stageCount(challenge));
  const fullCourses = WORLD.challenges.filter((challenge) => stageCount(challenge) > 0 && result.courseStages[challenge.id] === stageCount(challenge)).map((challenge) => challenge.id);
  result.challenges = ids(value.challenges, fullCourses);
  // A completed course badge survives replaying its stages from zero. Old short
  // courses never enter this list: migration archives them separately below.
  result.completedChallenges = [...new Set([...ids(value.completedChallenges, WORLD.challenges.map((item) => item.id)), ...fullCourses])];
  for (const station of STATIONS) { if (value.activated.includes(station)) result.activated.push(station); else break; }
  result.elapsed = finite(value.elapsed); result.stalls = Math.trunc(finite(value.stalls));
  // Older v3 saves did not preserve the active route clock. Unknown is not zero:
  // retain the checkpoint and PBs, but do not invent a shortened route record.
  result.segmentStart = Number.isFinite(value.elapsed) && value.elapsed >= 0 && value.elapsed <= 1e9 && Number.isFinite(value.segmentStart) && value.segmentStart >= 0 && value.segmentStart <= result.elapsed ? value.segmentStart : null;
  result.cargoStability = finite(value.cargoStability, 100, 100); result.cargoDamage = finite(value.cargoDamage);
  result.assist = value.assist === true; result.routeStyle = value.routeStyle === 'shortcut' ? 'shortcut' : 'safe';
  result.usedAssist = value.usedAssist === true || result.assist;
  result.completed = value.completed === true && result.activated.length === STATIONS.length && value.checkpoint === 'island-camp';
  if (record(value.settings)) {
    const settings = value.settings;
    result.settings.music = finite(settings.music, 0.35, 1); result.settings.sfx = finite(settings.sfx, 0.7, 1);
    result.settings.reducedMotion = settings.reducedMotion === true;
    result.settings.camera = settings.camera === 'overhead' ? 'overhead' : 'follow';
    result.settings.quality = ['auto', 'low', 'high'].includes(settings.quality) ? settings.quality : 'auto';
  }
  result.records = cleanRecords(value.records, MODULES.map((module) => module.id));
  result.routeRecords = cleanRecords(value.routeRecords, WORLD.routes.map((route) => route.id), true);
  // Historical IDs can outlive the content they describe. Keep valid historical
  // records without restricting their keys to the current world's IDs.
  result.legacyRecords = cleanRecords(value.legacyRecords);
  result.legacyRouteRecords = cleanRecords(value.legacyRouteRecords, null, true);
  result.legacyChallenges = legacyIds(value.legacyChallenges);
  return result;
}
export function migrateSave(value) {
  if (value?.schemaVersion === SAVE_VERSION) return { save: validateSave(value), migrated: false };
  const v1 = value?.schemaVersion === 1 || (value?.schemaVersion === undefined && value?.version === 1);
  if (record(value) && (v1 || value.schemaVersion === 2)) {
    const base = defaultSave();
    const old = v1 ? { ...base, ...value, checkpoint: value.checkpoint ?? value.island ?? base.checkpoint, relics: value.relics ?? value.fragments ?? [], activated: value.activated ?? [] } : value;
    const converted = validateSave({
      ...old, schemaVersion: SAVE_VERSION, segmentStart: null, mainSamples: base.mainSamples, courseStages: base.courseStages, cargoStability: 100, cargoDamage: 0,
      challenges: [], completedChallenges: [], records: {}, routeRecords: {},
      legacyRecords: { ...cleanRecords(value.legacyRecords), ...cleanRecords(value.records) },
      legacyRouteRecords: { ...cleanRecords(value.legacyRouteRecords, null, true), ...cleanRecords(value.routeRecords, null, true) },
      legacyChallenges: [...legacyIds(value.legacyChallenges), ...legacyIds(value.completedChallenges), ...legacyIds(value.challenges)],
    });
    return { save: converted, migrated: converted !== null };
  }
  return { save: null, migrated: false };
}
export class SaveStore {
  constructor(storage, key = SAVE_KEY) {
    this.key = key; this.memory = defaultSave(); this.storage = storage; this.pendingWriteWarning = null;
    if (storage === undefined) { try { this.storage = globalThis.localStorage; } catch { this.storage = null; } }
  }
  load() {
    // A failed atomic write leaves an older valid value on disk. Until a later
    // save succeeds, reading that value must not erase this tab's newer memory.
    if (this.pendingWriteWarning) return { save: clone(this.memory), warning: this.pendingWriteWarning, migrated: false };
    if (!this.storage) return { save: clone(this.memory), warning: '瀏覽器儲存不可用；本次進度僅保留在記憶體。', migrated: false };
    try {
      const raw = this.storage.getItem(this.key);
      if (!raw) return { save: clone(this.memory), warning: null, migrated: false };
      let parsed;
      try { parsed = JSON.parse(raw); } catch { parsed = null; }
      const converted = migrateSave(parsed);
      if (!converted.save) return { save: clone(this.memory), warning: '存檔已損壞或版本不支援；原始存檔仍保留，現在使用安全的新進度。', migrated: false };
      this.memory = converted.save;
      return { save: clone(this.memory), warning: converted.migrated ? '舊版存檔已安全升級；下一個安全保存點會寫入新格式。' : null, migrated: converted.migrated };
    } catch { return { save: clone(this.memory), warning: '無法讀取瀏覽器儲存；本次進度僅保留在記憶體。', migrated: false }; }
  }
  save(data) {
    const valid = validateSave({ ...this.memory, ...data, schemaVersion: SAVE_VERSION, settings: { ...this.memory.settings, ...data?.settings } });
    if (!valid) return { ok: false, warning: '存檔資料不完整，已保留上一個安全存檔。' };
    this.memory = valid;
    if (!this.storage) {
      this.pendingWriteWarning = '瀏覽器儲存不可用；本次進度僅保留在記憶體。';
      return { ok: false, warning: this.pendingWriteWarning };
    }
    try {
      // localStorage.setItem is atomic. One complete JSON value replaces the old
      // checkpoint; no delete-before-write or partial multi-key transaction.
      this.storage.setItem(this.key, JSON.stringify(valid));
      this.pendingWriteWarning = null;
      return { ok: true, warning: null };
    } catch {
      this.pendingWriteWarning = '儲存空間不足或被封鎖；目前進度仍在記憶體，離開前請保留此頁。';
      return { ok: false, warning: this.pendingWriteWarning };
    }
  }
  clearProgress() { const settings = clone(this.memory.settings); return this.save({ ...defaultSave(), settings }); }
}
