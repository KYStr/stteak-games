import { MISSIONS, NPCS, WEAPONS, ENDINGS, missionById } from "./content.js";
import {
  FIELD_WORK,
  EXPANSION_VERSION,
  validSupplies,
  supplyBonuses,
} from "./expansion-content.js";

import {
  MISSION_FLOW as CURRENT_MISSION_FLOW,
  missionFlowRecord,
  validMissionFlowRecord,
  validMissionFlowRequirement,
} from "./mission-flow.js";

import {
  waterFlowRecord,
  validWaterFlowRecord,
  validWaterFlowRequirement,
} from "./water-flow.js";

import { signalFlowRecord, validSignalFlowRecord, validSignalFlowRequirement } from "./signal-flow.js";

import { ledgerFlowRecord, validLedgerFlowRecord, validLedgerFlowRequirement } from "./ledger-flow.js";

import { nightFlowRecord, validNightFlowRecord, validNightFlowRequirement } from "./night-flow.js";

import { pactFlowRecord, validPactFlowRecord, validPactFlowRequirement } from "./pact-flow.js";

export const PROFILE_SCHEMA = 2;
export const CHOICE_VALUES = Object.freeze({
  water: ["commons", "marshal"],
  ledger: ["publish", "bargain"],
  future: ["council", "warden"],
});
const clone = (value) => JSON.parse(JSON.stringify(value));
const bounded = (value, min, max, fallback = 0) =>
  Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
const integer = (value, min, max, fallback = 0) =>
  Math.round(bounded(value, min, max, fallback));
const record = (value) =>
  Boolean(value && typeof value === "object" && !Array.isArray(value));
const supplyLevels = (profile) => ({
  ammo: 0,
  medicine: 0,
  smoke: 0,
  ...profile.supplies,
});
function sameData(a, b) {
  if (a === b) return true;
  if (
    !a ||
    !b ||
    typeof a !== "object" ||
    typeof b !== "object" ||
    Array.isArray(a) !== Array.isArray(b)
  )
    return false;
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length &&
    keys.every((key) => Object.hasOwn(b, key) && sameData(a[key], b[key]))
  );
}

function summaryFromChoices(missionId, choices) {
  const authored = FIELD_WORK[missionId];
  if (
    !authored ||
    !record(choices) ||
    Object.keys(choices).length !== authored.tasks.length
  )
    throw new Error("現場選擇不完整或含有未知工作。");
  const rows = authored.tasks.map((task) => {
    const option =
      Object.hasOwn(choices, task.id) &&
      task.choices.find(
        (entry) => entry.id === choices[task.id] && entry.success,
      );
    if (!option) throw new Error("現場選擇無效，不能結算獎勵。");
    return {
      taskId: task.id,
      title: task.title,
      choiceId: option.id,
      label: option.label,
      message: option.message,
      tradeoff: option.tradeoff || null,
      rewardDelta: option.effect.extractionRewardDelta || 0,
    };
  });
  return {
    choices: Object.fromEntries(rows.map((row) => [row.taskId, row.choiceId])),
    rows,
    rewardDelta: rows.reduce((sum, row) => sum + row.rewardDelta, 0),
  };
}

/** Rebuild outcomes from authored choices; no caller-provided reward/effect amount is trusted. */
export function canonicalFieldwork(missionId, fieldState) {
  const authored = FIELD_WORK[missionId];
  const allowed = new Set([
    "version",
    "missionId",
    "completed",
    "choices",
    "progress",
    "mistakes",
    "effects",
  ]);
  if (
    !authored ||
    !record(fieldState) ||
    Object.keys(fieldState).some((key) => !allowed.has(key)) ||
    fieldState.version !== EXPANSION_VERSION ||
    fieldState.missionId !== missionId
  )
    throw new Error("現場狀態版本或委託不符。");
  const ids = authored.tasks.map((task) => task.id);
  if (
    !Array.isArray(fieldState.completed) ||
    fieldState.completed.length !== ids.length ||
    new Set(fieldState.completed).size !== ids.length ||
    fieldState.completed.some((id) => !ids.includes(id)) ||
    !record(fieldState.progress) ||
    Object.keys(fieldState.progress).length !== ids.length ||
    !Number.isInteger(fieldState.mistakes) ||
    fieldState.mistakes < 0 ||
    fieldState.mistakes > 100000
  )
    throw new Error("現場工作尚未全部完成，或進度資料無效。");
  const summary = summaryFromChoices(missionId, fieldState.choices);
  const canonicalEffects = [];
  for (const task of authored.tasks) {
    if (
      (task.dependencies || []).some(
        (id) =>
          fieldState.completed.indexOf(id) >=
          fieldState.completed.indexOf(task.id),
      )
    )
      throw new Error("現場工作尚未遵循已公開的前置依賴。");
    const option = task.choices.find(
      (entry) => entry.id === summary.choices[task.id],
    );
    const actual = fieldState.progress[task.id];
    const allSteps = [
      ...task.physicalSteps,
      ...task.choices.flatMap((entry) => entry.requiredSteps || []),
    ];
    const needed = [...task.physicalSteps, ...(option.requiredSteps || [])];
    if (
      !Array.isArray(actual) ||
      new Set(actual).size !== actual.length ||
      actual.some((id) => !allSteps.some((step) => step.id === id)) ||
      needed.some(
        (step) =>
          !actual.includes(step.id) ||
          (step.after && actual.indexOf(step.after) >= actual.indexOf(step.id)),
      )
    )
      throw new Error("現場實體操作證據缺少、失效或順序錯誤。");
    canonicalEffects.push({
      taskId: task.id,
      choiceId: option.id,
      effect: clone(option.effect),
    });
  }
  if (
    fieldState.effects !== undefined &&
    (!Array.isArray(fieldState.effects) ||
      fieldState.effects.length !== canonicalEffects.length ||
      new Set(fieldState.effects.map((entry) => entry?.taskId)).size !==
        canonicalEffects.length ||
      fieldState.effects.some(
        (entry) =>
          !sameData(
            entry,
            canonicalEffects.find(
              (expected) => expected.taskId === entry?.taskId,
            ),
          ),
      ))
  )
    throw new Error("現場效果與合法選擇不符，未發放獎勵。");
  return {
    version: EXPANSION_VERSION,
    ...summary,
    mistakes: fieldState.mistakes,
  };
}

function validFieldRecord(row) {
  const keys = [
    "fieldworkVersion",
    "fieldworkComplete",
    "fieldChoices",
    "fieldResults",
    "fieldRewardDelta",
    "fieldPotentialRewardDelta",
  ];
  if (keys.every((key) => row[key] === undefined)) return true; // Historical schema-1/2 results.
  try {
    if (row.fieldworkComplete === false)
      return (
        row.fieldworkVersion === null &&
        sameData(row.fieldChoices, {}) &&
        sameData(row.fieldResults, []) &&
        row.fieldRewardDelta === 0 &&
        row.fieldPotentialRewardDelta === 0
      );
    if (
      row.fieldworkComplete !== true ||
      row.fieldworkVersion !== EXPANSION_VERSION
    )
      return false;
    const canonical = summaryFromChoices(row.missionId, row.fieldChoices);
    const mission = missionById(row.missionId),
      storyChoice = mission.choice?.options.find(
        (option) => option.id === row.choice,
      );
    if (mission.choice && !storyChoice) return false;
    const reward = row.replay
      ? 0
      : mission.reward +
        (mission.effects[row.strategy]?.wallet || 0) +
        (storyChoice?.effect.wallet || 0) +
        canonical.rewardDelta;
    return (
      sameData(row.fieldResults, canonical.rows) &&
      row.fieldPotentialRewardDelta === canonical.rewardDelta &&
      row.fieldRewardDelta === (row.replay ? 0 : canonical.rewardDelta) &&
      row.reward === reward
    );
  } catch {
    return false;
  }
}

/** New flow evidence is additive; historical rows without it retain their old meaning. */
function validMissionFlowOutcome(row, expectedMissionId = row?.missionId) {
  if (!validMissionFlowRecord(row)) return false;
  if (!Object.hasOwn(row, "missionFlow")) return true;
  const result = row.missionFlow.result, defeated = result.defeatedActors;
  if (result.version === 2 && (
    (row.strategy === "combat" && defeated.length !== 4) ||
    (row.strategy === "nonlethal" && result.localChoices.handoff === "mutual-aid" && !result.promiseRelayed)
  )) return false;
  return (
    row.missionId === expectedMissionId &&
    ["nonlethal", "combat"].includes(row.strategy) &&
    Number.isInteger(row.stats?.kills) &&
    row.stats.kills === defeated.length &&
    (row.strategy !== "nonlethal" || defeated.length === 0)
  );
}

/** Local water routing never owns permanent water rights or an extra reserve reward. */
function validWaterFlowOutcome(row, expectedMissionId = row?.missionId) {
  if (!validWaterFlowRecord(row)) return false;
  if (!Object.hasOwn(row, "waterFlow")) return true;
  const result = row.waterFlow.result;
  const defeated = result.defeatedActors;
  return (
    row.missionId === expectedMissionId &&
    ["nonlethal", "combat"].includes(row.strategy) &&
    Number.isInteger(row.stats?.kills) &&
    row.stats.kills === defeated.length &&
    (row.strategy === "nonlethal"
      ? defeated.length === 0 && result.guaranteePublished
      : defeated.length === Object.keys(result.actors).length) &&
    row.fieldworkComplete === true &&
    sameData(row.fieldChoices, {
      "water-bypass": "bypass-downstream",
      "water-allocation": "two-two-one",
      "water-reserve": result.reserve.choiceId,
    })
  );
}

/** A signal receipt owns no extra money or story choice; raw deaths and field evidence must agree. */
function validSignalFlowOutcome(row, expectedMissionId = row?.missionId) {
  if (!validSignalFlowRecord(row)) return false;
  if (!Object.hasOwn(row, "signalFlow")) return true;
  const result = row.signalFlow.result;
  return row.missionId === expectedMissionId &&
    ["nonlethal", "combat"].includes(row.strategy) &&
    Number.isInteger(row.stats?.kills) && row.stats.kills === result.defeatedActors.length &&
    (row.strategy === "nonlethal" ? result.defeatedActors.length === 0 : result.defeatedActors.length === 5) &&
    row.fieldworkComplete === true && sameData(row.fieldChoices, result.fieldChoices);
}

/** Original custody and local copy scope never settle the permanent ledger choice. */
function validLedgerFlowOutcome(row, expectedMissionId = row?.missionId) {
  if (!validLedgerFlowRecord(row)) return false;
  if (!Object.hasOwn(row, "ledgerFlow")) return true;
  const result = row.ledgerFlow.result;
  return row.missionId === expectedMissionId &&
    ["nonlethal", "combat"].includes(row.strategy) &&
    Number.isInteger(row.stats?.kills) && row.stats.kills === result.defeatedActors.length &&
    (row.strategy === "nonlethal" ? result.defeatedActors.length === 0 && result.clearance : result.defeatedActors.length === 5) &&
    row.fieldworkComplete === true && sameData(row.fieldChoices, result.fieldChoices);
}

/** Same three family members must physically arrive; local escort never changes story. */
function validNightFlowOutcome(row, expectedMissionId = row?.missionId) {
  if (!validNightFlowRecord(row)) return false;
  if (!Object.hasOwn(row, "nightFlow")) return true;
  const result = row.nightFlow.result;
  return row.missionId === expectedMissionId &&
    ["nonlethal", "combat"].includes(row.strategy) &&
    Number.isInteger(row.stats?.kills) && row.stats.kills === result.defeatedActors.length &&
    (row.strategy === "nonlethal" ? result.defeatedActors.length === 0 && result.clearance : result.defeatedActors.length === 6) &&
    row.fieldworkComplete === true && sameData(row.fieldChoices, result.fieldChoices);
}

/** Same finite supply cart and deed; final story choices remain at extraction. */
function validPactFlowOutcome(row, expectedMissionId = row?.missionId) {
  if (!validPactFlowRecord(row)) return false;
  if (!Object.hasOwn(row, "pactFlow")) return true;
  const result = row.pactFlow.result;
  return row.missionId === expectedMissionId &&
    ["nonlethal", "combat"].includes(row.strategy) &&
    Number.isInteger(row.stats?.kills) && row.stats.kills === result.defeatedActors.length &&
    (row.strategy === "nonlethal" ? result.defeatedActors.length === 0 && result.clearance : result.defeatedActors.length === 6) &&
    row.fieldworkComplete === true && sameData(row.fieldChoices, result.fieldChoices);
}

export function createProfile() {
  return {
    schema: PROFILE_SCHEMA,
    revision: 0,
    wallet: 0,
    choices: {},
    npcTrust: Object.fromEntries(NPCS.map((npc) => [npc.id, 0])),
    unlockedWeapons: ["revolver", "rifle"],
    equipment: { weapon: "revolver", item: "medkit" },
    inventory: { medkit: 1, smoke: 1 },
    supplies: { ammo: 0, medicine: 0, smoke: 0 },
    completed: [],
    rewards: [],
    history: [],
    challenges: {},
    activeRun: null,
    safeSnapshot: null,
    lastResult: null,
  };
}

/** Strict validation rejects partially plausible saves rather than silently granting progress. */
export function validateProfile(profile, depth = 0) {
  if (
    !profile ||
    typeof profile !== "object" ||
    Array.isArray(profile) ||
    profile.schema !== PROFILE_SCHEMA ||
    depth > 1
  )
    return false;
  if (!validSupplies(profile.supplies)) return false;
  if (
    !Number.isInteger(profile.revision) ||
    profile.revision < 0 ||
    !Number.isFinite(profile.wallet) ||
    profile.wallet < 0 ||
    profile.wallet > 1000000
  )
    return false;
  if (
    !profile.choices ||
    typeof profile.choices !== "object" ||
    Array.isArray(profile.choices) ||
    Object.keys(profile.choices).some(
      (key) => !CHOICE_VALUES[key]?.includes(profile.choices[key]),
    )
  )
    return false;
  if (
    !profile.npcTrust ||
    NPCS.some(
      (npc) =>
        !Number.isFinite(profile.npcTrust[npc.id]) ||
        Math.abs(profile.npcTrust[npc.id]) > 100,
    )
  )
    return false;
  if (
    !Array.isArray(profile.completed) ||
    profile.completed.length > 6 ||
    new Set(profile.completed).size !== profile.completed.length ||
    profile.completed.some((id, index) => id !== MISSIONS[index].id)
  )
    return false;
  if (
    !Array.isArray(profile.rewards) ||
    profile.rewards.length !== profile.completed.length ||
    profile.rewards.some((id, index) => id !== profile.completed[index])
  )
    return false;
  for (const mission of MISSIONS.filter((mission) => mission.choice)) {
    if (
      profile.completed.includes(mission.id) !==
      Boolean(profile.choices[mission.choice.key])
    )
      return false;
  }
  if (
    !Array.isArray(profile.unlockedWeapons) ||
    !profile.unlockedWeapons.length ||
    profile.unlockedWeapons.some((id) => !WEAPONS[id])
  )
    return false;
  if (
    !profile.equipment ||
    !profile.unlockedWeapons.includes(profile.equipment.weapon) ||
    !["medkit", "smoke"].includes(profile.equipment.item)
  )
    return false;
  if (
    !profile.inventory ||
    !Number.isInteger(profile.inventory.medkit) ||
    !Number.isInteger(profile.inventory.smoke) ||
    profile.inventory.medkit < 0 ||
    profile.inventory.smoke < 0
  )
    return false;
  if (
    !Array.isArray(profile.history) ||
    profile.history.length > 100 ||
    profile.history.some(
      (row) =>
        !row ||
        !missionById(row.missionId) ||
        !["nonlethal", "combat"].includes(row.strategy) ||
        !row.stats ||
        typeof row.stats !== "object" ||
        !validFieldRecord(row) ||
        !validMissionFlowOutcome(row) ||
        !validWaterFlowOutcome(row) ||
        !validSignalFlowOutcome(row) ||
        !validLedgerFlowOutcome(row) ||
        !validNightFlowOutcome(row) ||
        !validPactFlowOutcome(row),
    )
  )
    return false;
  if (
    !profile.challenges ||
    typeof profile.challenges !== "object" ||
    Array.isArray(profile.challenges) ||
    Object.keys(profile.challenges).some((id) => !missionById(id))
  )
    return false;
  if (
    profile.lastResult &&
    (!validFieldRecord(profile.lastResult) ||
      !validMissionFlowOutcome(profile.lastResult) ||
      !validWaterFlowOutcome(profile.lastResult) ||
      !validSignalFlowOutcome(profile.lastResult) ||
      !validLedgerFlowOutcome(profile.lastResult) ||
      !validNightFlowOutcome(profile.lastResult) ||
      !validPactFlowOutcome(profile.lastResult))
  )
    return false;
  if (
    Object.entries(profile.challenges).some(
      ([missionId, entry]) =>
        entry?.last &&
        (!validFieldRecord(entry.last) ||
          !validMissionFlowOutcome(entry.last, missionId) ||
          !validWaterFlowOutcome(entry.last, missionId) ||
          !validSignalFlowOutcome(entry.last, missionId) ||
          !validLedgerFlowOutcome(entry.last, missionId) ||
          !validNightFlowOutcome(entry.last, missionId) ||
          !validPactFlowOutcome(entry.last, missionId)),
    )
  )
    return false;
  if (
    profile.safeSnapshot !== null &&
    !validateProfile(profile.safeSnapshot, depth + 1)
  )
    return false;
  if (profile.activeRun !== null) {
    const run = profile.activeRun;
    if (
      !run ||
      typeof run.id !== "string" ||
      run.id.length > 100 ||
      !missionById(run.missionId) ||
      typeof run.replay !== "boolean" ||
      !WEAPONS[run.weapon] ||
      !["medkit", "smoke"].includes(run.item) ||
      !profile.safeSnapshot
    )
      return false;
    if (
      run.replay
        ? !profile.completed.includes(run.missionId)
        : MISSIONS[profile.completed.length]?.id !== run.missionId
    )
      return false;
    if (!validMissionFlowRequirement(run) || !validWaterFlowRequirement(run) || !validSignalFlowRequirement(run) || !validLedgerFlowRequirement(run) || !validNightFlowRequirement(run) || !validPactFlowRequirement(run)) return false;
    if (run.before && !validateProfile(run.before, depth + 1)) return false;
    if (
      run.requireFieldwork !== undefined &&
      typeof run.requireFieldwork !== "boolean"
    )
      return false;
    if (
      !sameData(supplyLevels(profile), supplyLevels(profile.safeSnapshot)) ||
      (run.before &&
        !sameData(supplyLevels(run.before), supplyLevels(profile.safeSnapshot)))
    )
      return false;
    if (
      run.supplyBonuses !== undefined &&
      !sameData(run.supplyBonuses, supplyBonuses(profile.safeSnapshot))
    )
      return false;
  }
  return true;
}

/** Additive schema-2 normalization; absent supplies means zero, malformed levels are never repaired. */
export function normalizeProfile(profile) {
  if (!validateProfile(profile)) return null;
  const next = clone(profile);
  next.supplies = supplyLevels(next);
  if (next.safeSnapshot)
    next.safeSnapshot = normalizeProfile(next.safeSnapshot);
  if (next.activeRun?.before)
    next.activeRun.before = normalizeProfile(next.activeRun.before);
  if (next.activeRun) {
    next.activeRun.requireFieldwork = next.activeRun.requireFieldwork ?? false;
    next.activeRun.supplyBonuses = supplyBonuses(next.safeSnapshot);
  }
  return next;
}

export function reportStats(stats = {}) {
  const shots = integer(stats.shots, 0, 100000),
    hits = integer(stats.hits, 0, shots);
  return {
    shots,
    hits,
    accuracy: shots ? Math.round((hits / shots) * 1000) / 10 : 0,
    damageTaken: Math.round(bounded(stats.damageTaken, 0, 100000) * 10) / 10,
    kills: integer(stats.kills, 0, 1000),
    seconds:
      Math.round(bounded(stats.seconds ?? stats.duration, 0, 86400) * 10) / 10,
    reloads: integer(stats.reloads, 0, 10000),
    itemsUsed: integer(stats.itemsUsed, 0, 1000),
    clues: integer(stats.clues, 0, 100),
    assisted: Boolean(stats.assisted),
    slowAim: Boolean(stats.slowAim),
    weapon: WEAPONS[stats.weapon] ? stats.weapon : "revolver",
  };
}

export function beginMission(profile, missionId, options = {}) {
  if (!validateProfile(profile))
    throw new Error("存檔結構無效，無法開始委託。");
  const mission = missionById(missionId),
    replay = Boolean(options.replay);
  if (!mission) throw new Error("找不到這份委託。");
  if (profile.activeRun) throw new Error("請先結束或放棄目前委託。");
  const flowRequirement = Object.hasOwn(options, "missionFlowVersion")
    ? { missionFlowVersion: options.missionFlowVersion }
    : {};
  if (!validMissionFlowRequirement({ missionId, ...flowRequirement }) ||
      (Object.hasOwn(options, "missionFlowVersion") && options.missionFlowVersion !== CURRENT_MISSION_FLOW[missionId]?.version))
    throw new Error("委託交接流程版本無效。");
  const waterRequirement = Object.hasOwn(options, "waterFlowVersion")
    ? { waterFlowVersion: options.waterFlowVersion }
    : {};
  if (!validWaterFlowRequirement({ missionId, ...waterRequirement }))
    throw new Error("供水流程版本無效。");
  const signalRequirement = Object.hasOwn(options, "signalFlowVersion")
    ? { signalFlowVersion: options.signalFlowVersion } : {};
  if (!validSignalFlowRequirement({ missionId, ...signalRequirement }))
    throw new Error("電報流程版本無效。");
  const ledgerRequirement = Object.hasOwn(options, "ledgerFlowVersion")
    ? { ledgerFlowVersion: options.ledgerFlowVersion } : {};
  if (!validLedgerFlowRequirement({ missionId, ...ledgerRequirement }))
    throw new Error("黑帳流程版本無效。");
  const nightRequirement = Object.hasOwn(options, "nightFlowVersion")
    ? { nightFlowVersion: options.nightFlowVersion } : {};
  if (!validNightFlowRequirement({ missionId, ...nightRequirement }))
    throw new Error("護送流程版本無效。");
  const pactRequirement = Object.hasOwn(options, "pactFlowVersion")
    ? { pactFlowVersion: options.pactFlowVersion } : {};
  if (!validPactFlowRequirement({ missionId, ...pactRequirement }))
    throw new Error("補給流程版本無效。");
  if (
    options.requireFieldwork !== undefined &&
    typeof options.requireFieldwork !== "boolean"
  )
    throw new Error("現場工作要求必須是布林值。");
  if (
    replay
      ? !profile.completed.includes(missionId)
      : MISSIONS[profile.completed.length]?.id !== missionId
  )
    throw new Error(
      replay ? "重玩需要先完成該委託。" : "請依故事順序完成委託。",
    );
  const weapon = options.weapon || profile.equipment.weapon,
    item = options.item || profile.equipment.item;
  if (
    !profile.unlockedWeapons.includes(weapon) ||
    !WEAPONS[weapon] ||
    !["medkit", "smoke"].includes(item)
  )
    throw new Error("裝備選項無效。");
  const before = clone(profile);
  before.activeRun = null;
  before.safeSnapshot = null;
  const id = `${missionId}:${profile.revision + 1}:${Date.now().toString(36)}:${Math.random().toString(36).slice(2, 9)}`;
  const run = {
    id,
    missionId,
    replay,
    weapon,
    item,
    requireFieldwork: options.requireFieldwork ?? false,
    ...flowRequirement,
    ...waterRequirement,
    ...signalRequirement,
    ...ledgerRequirement,
    ...nightRequirement,
    ...pactRequirement,
    supplyBonuses: supplyBonuses(before),
    before: clone(before),
    stats: reportStats({ weapon }),
    entry: clone(mission.entry),
  };
  const next = clone(profile);
  next.equipment = { weapon, item };
  next.activeRun = clone(run);
  next.safeSnapshot = before;
  return { profile: next, run };
}

function applyEffect(profile, effect = {}) {
  profile.wallet += effect.wallet || 0;
  for (const [npc, delta] of Object.entries(effect.trust || {}))
    if (Object.hasOwn(profile.npcTrust, npc))
      profile.npcTrust[npc] = bounded(profile.npcTrust[npc] + delta, -100, 100);
}

export function endingFor(profile) {
  if (
    !MISSIONS.every((mission) => profile.completed.includes(mission.id)) ||
    Object.keys(CHOICE_VALUES).some(
      (key) => !CHOICE_VALUES[key].includes(profile.choices[key]),
    )
  )
    return null;
  if (profile.choices.ledger === "bargain") return ENDINGS.quiet_frontier;
  if (
    profile.choices.water === "commons" &&
    profile.choices.future === "council"
  )
    return ENDINGS.common_dawn;
  return ENDINGS.guarded_peace;
}

/** The only story-commit point. Caller must invoke after successful physical extraction. */
export function completeMission(profile, run, outcome = {}) {
  if (!validateProfile(profile))
    throw new Error("存檔結構無效，無法結算委託。");
  const mission = missionById(run?.missionId);
  if (!mission) throw new Error("委託資料無效。");
  if (!run.replay && profile.rewards.includes(mission.id))
    return {
      profile,
      result: {
        ...clone(
          profile.history.find((row) => row.missionId === mission.id) || {},
        ),
        duplicate: true,
      },
    };
  if (
    !profile.activeRun ||
    profile.activeRun.id !== run.id ||
    profile.activeRun.missionId !== run.missionId ||
    profile.activeRun.replay !== run.replay
  )
    throw new Error("這次委託已結束或不屬於目前進度。");
  const strategy = outcome.strategy;
  if (!["nonlethal", "combat"].includes(strategy))
    throw new Error("請先完成談判或戰鬥目標。");
  const choice = mission.choice
    ? mission.choice.options.find((option) => option.id === outcome.choice)
    : null;
  if (mission.choice && !choice) throw new Error("請先選定這次關鍵決策。");
  const hasFieldState = Object.hasOwn(outcome, "fieldState");
  if (profile.activeRun.requireFieldwork && !hasFieldState)
    throw new Error("本次委託必須完成現場工作才能撤離結算。");
  const field = hasFieldState
    ? canonicalFieldwork(mission.id, outcome.fieldState)
    : null;
  const hasMissionProgress = Object.hasOwn(outcome, "missionProgress");
  // The persisted active run owns this requirement; caller run data cannot disable it.
  if (profile.activeRun.missionFlowVersion !== undefined && !hasMissionProgress)
    throw new Error("本次委託必須完成藥品實際交付才能結算。");
  if (hasMissionProgress && !record(outcome.missionProgress))
    throw new Error("交接流程事件格式無效。");
  if (profile.activeRun.missionFlowVersion !== undefined &&
      (profile.activeRun.missionFlowVersion !== CURRENT_MISSION_FLOW[mission.id]?.version ||
       outcome.missionProgress?.version !== profile.activeRun.missionFlowVersion))
    throw new Error("舊版現場必須回安全入口重新開始；本次交接流程不可降級。");
  const flow = hasMissionProgress
    ? missionFlowRecord(mission.id, outcome.missionProgress)
    : null;
  // Check raw counts before reportStats can round/clamp them into a plausible value.
  if (
    flow &&
    !validMissionFlowOutcome({
      missionId: mission.id,
      strategy,
      stats: outcome.stats,
      missionFlow: flow,
    })
  )
    throw new Error("交接事件與實際擊殺統計不符，或未完成查驗者接受、共同醫護傳達或清場接管。");
  const hasWaterProgress = Object.hasOwn(outcome, "waterProgress");
  // Persisted requirements cannot be downgraded through the caller's run object.
  if (profile.activeRun.waterFlowVersion !== undefined && !hasWaterProgress)
    throw new Error("本次委託必須完成實際供水交接才能結算。");
  if (hasWaterProgress && !record(outcome.waterProgress))
    throw new Error("供水流程事件格式無效。");
  const waterFlow = hasWaterProgress
    ? waterFlowRecord(mission.id, outcome.waterProgress)
    : null;
  if (waterFlow && !field)
    throw new Error("供水交接必須同時提交三項現場工作證據。");
  if (
    waterFlow &&
    !validWaterFlowOutcome({
      missionId: mission.id,
      strategy,
      stats: outcome.stats,
      fieldworkComplete: Boolean(field),
      fieldChoices: field?.choices,
      waterFlow,
    })
  )
    throw new Error("供水事件與實際擊殺統計、非致命保證、清場或備水現場選擇不符。");
  const hasSignalProgress = Object.hasOwn(outcome, "signalProgress");
  if (profile.activeRun.signalFlowVersion !== undefined && !hasSignalProgress)
    throw new Error("本次委託必須完成本次電報與完整名單收件才能結算。");
  if (hasSignalProgress && !record(outcome.signalProgress))
    throw new Error("電報流程事件格式無效。");
  const signalFlow = hasSignalProgress ? signalFlowRecord(mission.id, outcome.signalProgress) : null;
  if (signalFlow && !field) throw new Error("電報收件必須同時提交三項現場工作證據。");
  if (signalFlow && !validSignalFlowOutcome({ missionId: mission.id, strategy, stats: outcome.stats,
      fieldworkComplete: Boolean(field), fieldChoices: field?.choices, signalFlow }))
    throw new Error("電報收件與實際傷亡、完整名單或現場路線選擇不符。");
  const hasLedgerProgress = Object.hasOwn(outcome, "ledgerProgress");
  if (profile.activeRun.ledgerFlowVersion !== undefined && !hasLedgerProgress)
    throw new Error("本次委託必須完成原帳核證與唯一副本保管交接才能結算。");
  if (hasLedgerProgress && !record(outcome.ledgerProgress))
    throw new Error("黑帳流程事件格式無效。");
  const ledgerFlow = hasLedgerProgress ? ledgerFlowRecord(mission.id, outcome.ledgerProgress) : null;
  if (ledgerFlow && !field) throw new Error("黑帳保管交接必須同時提交三項現場工作證據。");
  if (ledgerFlow && !validLedgerFlowOutcome({ missionId: mission.id, strategy, stats: outcome.stats,
      fieldworkComplete: Boolean(field), fieldChoices: field?.choices, ledgerFlow }))
    throw new Error("黑帳收據與實際傷亡、核證放行或副本保管選擇不符。");
  const hasNightProgress = Object.hasOwn(outcome, "nightProgress");
  if (profile.activeRun.nightFlowVersion !== undefined && !hasNightProgress)
    throw new Error("本次委託必須讓同三位家屬實際抵達南側，取得護送回條才能結算。");
  if (hasNightProgress && !record(outcome.nightProgress))
    throw new Error("護送流程事件格式無效。");
  const nightFlow = hasNightProgress ? nightFlowRecord(mission.id, outcome.nightProgress) : null;
  if (nightFlow && !field) throw new Error("護送到達回條必須同時提交三項現場工作證據。");
  if (nightFlow && !validNightFlowOutcome({ missionId: mission.id, strategy, stats: outcome.stats,
      fieldworkComplete: Boolean(field), fieldChoices: field?.choices, nightFlow }))
    throw new Error("護送回條與實際傷亡、文件放行或三人路線選擇不符。");
  const hasPactProgress = Object.hasOwn(outcome, "pactProgress");
  if (profile.activeRun.pactFlowVersion !== undefined && !hasPactProgress)
    throw new Error("本次委託必須完成同一補給車、有限庫存盤點與地契交接才能結算。");
  if (hasPactProgress && !record(outcome.pactProgress))
    throw new Error("補給流程事件格式無效。");
  const pactFlow = hasPactProgress ? pactFlowRecord(mission.id, outcome.pactProgress) : null;
  if (pactFlow && !field) throw new Error("補給地契回條必須同時提交三項現場工作證據。");
  if (pactFlow && !validPactFlowOutcome({ missionId: mission.id, strategy, stats: outcome.stats,
      fieldworkComplete: Boolean(field), fieldChoices: field?.choices, pactFlow }))
    throw new Error("補給回條與實際傷亡、交械放行或同車保管選擇不符。");
  const fieldDelta = field?.rewardDelta || 0;
  const stats = reportStats({
    ...outcome.stats,
    weapon: profile.activeRun.weapon,
  });
  const result = {
    missionId: mission.id,
    title: mission.title,
    strategy,
    replay: run.replay,
    choice: choice?.id || null,
    choiceKey: mission.choice?.key || null,
    stats,
    consequence: mission.consequence[strategy],
    choiceConsequence: choice?.consequence || null,
    fieldworkVersion: field?.version || null,
    fieldworkComplete: Boolean(field),
    fieldChoices: field?.choices || {},
    fieldResults: field?.rows || [],
    fieldRewardDelta: run.replay ? 0 : fieldDelta,
    fieldPotentialRewardDelta: fieldDelta,
    ...(flow ? { missionFlow: flow } : {}),
    ...(waterFlow ? { waterFlow } : {}),
    ...(signalFlow ? { signalFlow } : {}),
    ...(ledgerFlow ? { ledgerFlow } : {}),
    ...(nightFlow ? { nightFlow } : {}),
    ...(pactFlow ? { pactFlow } : {}),
    reward: run.replay
      ? 0
      : mission.reward +
        (mission.effects[strategy].wallet || 0) +
        (choice?.effect.wallet || 0) +
        fieldDelta,
    duplicate: false,
  };
  // Always restore the immutable pre-mission state first, so retries and consumables never leak.
  const next = clone(profile.safeSnapshot || run.before);
  if (run.replay) {
    const previous = next.challenges[mission.id];
    next.challenges[mission.id] = {
      attempts: (previous?.attempts || 0) + 1,
      last: result,
      bestAccuracy: Math.max(previous?.bestAccuracy || 0, stats.accuracy),
      leastDamage: Math.min(
        previous?.leastDamage ?? Infinity,
        stats.damageTaken,
      ),
      strategies: [...new Set([...(previous?.strategies || []), strategy])],
    };
  } else {
    next.completed.push(mission.id);
    next.rewards.push(mission.id);
    next.wallet += mission.reward;
    applyEffect(next, mission.effects[strategy]);
    if (choice) {
      next.choices[mission.choice.key] = choice.id;
      applyEffect(next, choice.effect);
    }
    next.wallet += fieldDelta;
    next.history.push(result);
    next.revision += 1;
  }
  next.activeRun = null;
  next.safeSnapshot = null;
  next.lastResult = result;
  result.ending = endingFor(next)?.id || null;
  return { profile: next, result };
}

export function failMission(profile, run) {
  if (!validateProfile(profile) || !run || profile.activeRun?.id !== run.id)
    throw new Error("找不到可恢復的任務前快照。");
  const next = clone(profile.safeSnapshot || run.before);
  next.activeRun = null;
  next.safeSnapshot = null;
  return {
    profile: next,
    run: {
      ...clone(run),
      stats: reportStats({ weapon: run.weapon }),
      entry: clone(missionById(run.missionId).entry),
    },
  };
}

export function npcStance(profile, id) {
  const trust = profile.npcTrust[id] || 0;
  return trust >= 5
    ? "堅定支持"
    : trust >= 2
      ? "願意合作"
      : trust <= -3
        ? "公開質疑"
        : trust < 0
          ? "保持距離"
          : "觀望";
}
