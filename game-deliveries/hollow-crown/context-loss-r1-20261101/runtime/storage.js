// Versioned, bounded local-only storage. A damaged primary falls back to the last valid backup.
export const SAVE_KEY = 'stteak.hollow-crown.v1';
export const DEFAULT_SETTINGS = Object.freeze({ music: 0.35, effects: 0.65, quality: 'high', autoAim: true, reducedMotion: false, flash: false, shake: false, practiceWindow: 0.32 });
export const freshProfile = () => ({ schemaVersion: 1, revision: 0, settings: { ...DEFAULT_SETTINGS }, tutorialDone: false, runs: 0, wins: 0, embers: 0, totalParries: 0, totalRooms: 0, flawlessRooms: 0, unlocked: ['fleet-ash','wide-oath'], skins: ['ivory'], selectedSkin: 'ivory', completed: [], challengeWins: [], best: null, checkpoint: null });
const finite = (n, fallback, max = 1e7) => Number.isFinite(n) ? Math.min(max, Math.max(0, n)) : fallback;
export function validateProfile(value) {
  if (!value || typeof value !== 'object' || ![0, 1].includes(value.schemaVersion ?? 0)) throw new Error('不支援的存檔版本');
  const p = freshProfile();
  for (const key of ['revision', 'runs', 'wins', 'embers', 'totalParries', 'totalRooms', 'flawlessRooms']) p[key] = Math.floor(finite(value[key], 0));
  p.tutorialDone = value.tutorialDone === true;
  const s = value.settings || {};
  p.settings.music = finite(s.music, 0.35, 1); p.settings.effects = finite(s.effects, 0.65, 1);
  p.settings.quality = s.quality === 'low' ? 'low' : 'high';
  for (const key of ['autoAim', 'reducedMotion', 'flash', 'shake']) if (typeof s[key] === 'boolean') p.settings[key] = s[key];
  p.settings.practiceWindow = [0.18, 0.32, 0.5].includes(s.practiceWindow) ? s.practiceWindow : 0.32;
  for (const key of ['unlocked', 'skins', 'completed', 'challengeWins']) p[key] = Array.isArray(value[key]) ? [...new Set(value[key].filter(x => typeof x === 'string' && /^[\w-]{1,80}$/.test(x)))].slice(-150) : p[key];
  for (const id of ['fleet-ash','wide-oath']) if (!p.unlocked.includes(id)) p.unlocked.unshift(id);
  if (!p.skins.includes('ivory')) p.skins.unshift('ivory');
  p.selectedSkin = p.skins.includes(value.selectedSkin) ? value.selectedSkin : 'ivory';
  p.best = value.best && Number.isFinite(value.best.time) ? { time: finite(value.best.time, 0), seed: String(value.best.seed).slice(0,40) } : null;
  if (value.checkpoint && typeof value.checkpoint === 'object' && JSON.stringify(value.checkpoint).length < 150000) p.checkpoint = value.checkpoint;
  return p;
}
export class SaveStore {
  constructor(storage = globalThis.localStorage) { this.storage = storage; this.notice = ''; this.available = true; }
  load() {
    try {
      const raw = this.storage.getItem(SAVE_KEY);
      if (!raw) return freshProfile();
      try { return validateProfile(JSON.parse(raw)); }
      catch {
        const backup = this.storage.getItem(SAVE_KEY + '.backup');
        if (backup) { // 備份讀取成功後，資料損壞與儲存API拒絕須分開處理。
          try { const p = validateProfile(JSON.parse(backup)); this.notice = '主存檔損壞，已恢復上一份安全備份。'; return p; } // 仍優先恢復可驗證的安全備份。
          catch {} // 備份內容也無效時繼續安全重建，不誤報儲存API被封鎖。
        } // 備份讀取本身若失敗，仍由外層回報儲存不可用。
        this.notice = '存檔無法讀取，已安全重建營地。'; return freshProfile();
      }
    } catch { this.available = false; this.notice = '瀏覽器無法存取儲存空間；本次進度只保留在這個頁面。'; return freshProfile(); }
  }
  save(profile) {
    try {
      const p = validateProfile(profile); p.revision += 1;
      const old = this.storage.getItem(SAVE_KEY);
      if (old) { try { validateProfile(JSON.parse(old)); this.storage.setItem(SAVE_KEY + '.backup', old); } catch {} }
      this.storage.setItem(SAVE_KEY, JSON.stringify(p)); profile.revision = p.revision;
      if (!this.available) this.notice = ''; // 只清除已恢復的儲存失敗告示，保留資料損壞或備份恢復提醒。
      this.available = true; return true; // 成功寫入後回復可用狀態。
    } catch { this.available = false; this.notice = '無法寫入存檔（儲存空間不足或被封鎖）。請保持頁面開啟，或匯出進度備份。'; return false; }
  }
}
export function settleRun(profile, runId, result) {
  if (profile.completed.includes(runId)) return false;
  profile.completed.push(runId); profile.completed = profile.completed.slice(-150);
  profile.runs++; profile.embers += Math.max(1, Array.isArray(result.rooms)?result.rooms.length:Number(result.rooms)||0) + (result.won ? 4 : 0);
  if (result.won) { profile.wins++; if (result.challenge && result.challengeComplete && !profile.challengeWins.includes(result.challenge)) profile.challengeWins.push(result.challenge); }
  if (profile.wins && !profile.skins.includes('cinder')) profile.skins.push('cinder');
  if (result.won && Number.isFinite(result.time) && (!profile.best || result.time < profile.best.time)) profile.best = { time: result.time, seed: String(result.seed) };
  profile.checkpoint = null; return true;
}
