import {
  createProfile,
  validateProfile,
  normalizeProfile,
  PROFILE_SCHEMA,
} from "./rules.js";

export const SAVE_KEY = "stteak:dust-redemption:profile:v2";
const clone = (value) => JSON.parse(JSON.stringify(value));

/** Explicit v1 migration. Additive schema-2 flow evidence is revalidated, never invented. */
export function migrateProfile(input) {
  if (input?.schema === PROFILE_SCHEMA) return normalizeProfile(input);
  if (
    input?.schema !== 1 ||
    !Array.isArray(input.completed) ||
    !input.choices ||
    !input.npcTrust ||
    !Array.isArray(input.rewards)
  )
    return null;
  const migrated = {
    ...createProfile(),
    ...clone(input),
    schema: PROFILE_SCHEMA,
    activeRun: null,
    safeSnapshot: null,
    challenges: input.challenges || {},
    lastResult: input.lastResult || null,
    revision: input.revision ?? input.completed.length,
  };
  return normalizeProfile(migrated);
}

function defaultStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

export function createStorage(storage = defaultStorage(), key = SAVE_KEY) {
  let lastReadCorrupt = false;
  let readBlocked = false;
  const readBlockedMessage =
    "無法讀取本機存檔；原資料未覆寫。當次進度只在本分頁，請保持分頁開啟並確認瀏覽器儲存權限。";
  return {
    load() {
      if (!storage)
        return {
          profile: createProfile(),
          status: "unavailable",
          message: "瀏覽器未開放本機儲存；本次進度只保留在這個分頁。",
        };
      let raw;
      try {
        raw = storage.getItem(key);
      } catch {
        readBlocked = true;
        return {
          profile: createProfile(),
          status: "unavailable",
          message: readBlockedMessage,
        };
      }
      // Only an explicit successful read or clear releases this instance's lock.
      // Readable corrupt bytes still follow the existing backup-before-save path.
      readBlocked = false;
      if (raw === null)
        return {
          profile: createProfile(),
          status: "new",
          message: "新的邊境旅程。進度保存在這台裝置。",
        };
      let input;
      try {
        if (raw.length > 1000000) throw new Error("oversize");
        input = JSON.parse(raw);
      } catch {
        lastReadCorrupt = true;
        return {
          profile: createProfile(),
          status: "corrupt",
          message:
            "存檔格式損毀；已以安全的新旅程開啟。原資料保留，儲存時會先備份。",
        };
      }
      const profile = migrateProfile(input);
      if (!profile) {
        lastReadCorrupt = true;
        return {
          profile: createProfile(),
          status: "corrupt",
          message:
            "存檔版本或內容無法驗證；已開啟安全的新旅程，原資料保留待備份。",
        };
      }
      if (profile.activeRun)
        return {
          profile,
          status: "recovered-entry",
          message: profile.activeRun.pactFlowVersion === 1
            ? "已恢復任務前快照。同一礦車、24發有限庫存、軍民線、電池及地契回原位；重做現場交接，沒有永久消耗。"
            : profile.activeRun.nightFlowVersion === 1
            ? "已恢復任務前快照。三名家屬及文件回原位，重新核對路線、便橋與南側到達；先前局部護送進度未保留，沒有永久消耗。"
            : profile.activeRun.ledgerFlowVersion === 1
            ? "已恢復任務前快照。從安全入口重新核對原帳與唯一副本保管，先前現場進度未保留；沒有永久消耗。"
            : profile.activeRun.signalFlowVersion === 1
            ? "已恢復任務前快照。從安全入口重新核對接地、名單與本次回覆，先前現場進度未保留；沒有永久消耗。"
            : profile.activeRun.waterFlowVersion === 1
            ? "已恢復任務前快照。從安全入口重新核驗閥位與供水，先前現場進度未保留；沒有永久消耗。"
            : [1, 2].includes(profile.activeRun.missionFlowVersion)
            ? "已恢復任務前快照。從安全入口依第二版交接流程重新核證、現場協商及搬運，先前現場進度未保留；沒有永久消耗。"
            : "已恢復任務前快照。重新進入時從安全入口開始，沒有永久消耗。",
        };
      const upgraded =
        input.schema !== PROFILE_SCHEMA || input.supplies === undefined;
      return {
        profile,
        status: upgraded ? "migrated" : "loaded",
        message: upgraded
          ? "舊版存檔已安全轉換，補給升級從零階保留相容。"
          : "已讀取本機進度。",
      };
    },
    save(profile) {
      if (!validateProfile(profile))
        return {
          ok: false,
          status: "invalid",
          message: "進度驗證失敗，未覆寫原存檔。",
        };
      if (readBlocked)
        return {
          ok: false,
          status: "unavailable",
          message: readBlockedMessage,
        };
      if (!storage)
        return {
          ok: false,
          status: "unavailable",
          message: "本機儲存不可用。請保持分頁開啟；目前進度尚未寫入。",
        };
      try {
        if (lastReadCorrupt) {
          const original = storage.getItem(key);
          if (original !== null) storage.setItem(`${key}:recovery`, original);
        }
        storage.setItem(key, JSON.stringify(normalizeProfile(profile)));
        lastReadCorrupt = false;
        return { ok: true, status: "saved", message: "已儲存在這台裝置。" };
      } catch (error) {
        return {
          ok: false,
          status: error?.name === "QuotaExceededError" ? "quota" : "denied",
          message:
            "存檔寫入失敗（空間不足或權限受限）。目前進度仍在分頁中，請勿關閉。",
        };
      }
    },
    clear() {
      if (!storage)
        return {
          ok: false,
          status: "unavailable",
          message: "本機儲存不可用。",
        };
      try {
        storage.removeItem(key);
        lastReadCorrupt = false;
        readBlocked = false;
        return { ok: true, status: "cleared", message: "本機故事進度已清除。" };
      } catch {
        return {
          ok: false,
          status: "denied",
          message: "無法清除存檔，請檢查儲存權限。",
        };
      }
    },
  };
}
