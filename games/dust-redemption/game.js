import * as THREE from "./vendor/three.module.js";
import { World } from "./world.js";
import { FrontierAudio } from "./audio.js";
import { createBridge } from "./bridge.js";
import { MISSIONS, NPCS, WEAPONS, SCENES, dialogueFor } from "./content.js";
import {
  createProfile,
  beginMission,
  completeMission,
  failMission,
  endingFor,
  npcStance,
} from "./rules.js";
import { createStorage } from "./storage.js";
import { firstHit, moveCircle, coverDistance, makeBox } from "./physics.js";
import { FieldSystem } from "./field-system.js";
import { MissionSystem, missionPlacementPoints } from "./mission-system.js";
import { MISSION_FLOW, entryMissionProgress } from "./mission-flow.js";
import { WaterSystem, waterPlacementPoints } from "./water-system.js";
import { WATER_FLOW, entryWaterProgress } from "./water-flow.js";
import { SignalSystem, signalPlacementPoints } from "./signal-system.js";
import { SIGNAL_FLOW, entrySignalProgress } from "./signal-flow.js";
import { LedgerSystem, ledgerPlacementPoints } from "./ledger-system.js";
import { LEDGER_FLOW, entryLedgerProgress } from "./ledger-flow.js";
import { NightSystem, nightPlacementPoints } from "./night-system.js";
import { NIGHT_FLOW, entryNightProgress } from "./night-flow.js";
import { PactSystem, pactPlacementPoints } from "./pact-system.js";
import { PACT_FLOW, entryPactProgress } from "./pact-flow.js";
import {
  enemyWeaponRange,
  createEnemyTacticsState,
  updateEnemyTactics,
  planTacticalPath,
} from "./enemy-tactics.js";
import {
  SUPPLIES,
  buySupply,
  supplyBonuses,
  fieldPlacementPoints,
} from "./expansion-content.js";

export const BUILD = "dust-redemption-development-0020";
const sceneFlowFor = (id) =>
  MISSION_FLOW[id]
    ? MissionSystem
    : WATER_FLOW[id]
      ? WaterSystem
      : SIGNAL_FLOW[id]
        ? SignalSystem
        : LEDGER_FLOW[id]
          ? LedgerSystem
          : NIGHT_FLOW[id]
            ? NightSystem
            : PACT_FLOW[id]
              ? PactSystem
              : null;
const flowRequirements = (id) =>
  MISSION_FLOW[id]
    ? { missionFlowVersion: MISSION_FLOW[id].version }
    : WATER_FLOW[id]
      ? { waterFlowVersion: 1 }
      : SIGNAL_FLOW[id]
        ? { signalFlowVersion: 1 }
        : LEDGER_FLOW[id]
          ? { ledgerFlowVersion: 1 }
          : NIGHT_FLOW[id]
            ? { nightFlowVersion: 1 }
            : PACT_FLOW[id]
              ? { pactFlowVersion: 1 }
              : {};
const flowEntryFor = (id, activeRun) =>
  MISSION_FLOW[id]
    ? entryMissionProgress(activeRun)
    : WATER_FLOW[id]
      ? entryWaterProgress(activeRun)
      : SIGNAL_FLOW[id]
        ? entrySignalProgress(activeRun)
        : LEDGER_FLOW[id]
          ? entryLedgerProgress(activeRun)
          : NIGHT_FLOW[id]
            ? entryNightProgress(activeRun)
            : PACT_FLOW[id]
              ? entryPactProgress(activeRun)
              : null;
const flowProgressFor = (id, controller) =>
  !controller
    ? {}
    : MISSION_FLOW[id]
      ? { missionProgress: controller.progress }
      : WATER_FLOW[id]
        ? { waterProgress: controller.progress }
        : SIGNAL_FLOW[id]
          ? { signalProgress: controller.progress }
          : LEDGER_FLOW[id]
            ? { ledgerProgress: controller.progress }
            : NIGHT_FLOW[id]
              ? { nightProgress: controller.progress }
              : PACT_FLOW[id]
                ? { pactProgress: controller.progress }
                : {};
const $ = (id) => document.getElementById(id),
  overlay = $("overlay"),
  canvas = $("world");
const audio = new FrontierAudio(),
  storage = createStorage(),
  loaded = storage.load();
let profile = loaded.profile;
const defaults = {
  music: 0.3,
  sfx: 0.65,
  assist: true,
  slowAim: false,
  reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
  low: false,
};
let settings = { ...defaults };
try {
  const raw = JSON.parse(
    localStorage.getItem("stteak:dust-redemption:settings"),
  );
  for (const k of Object.keys(defaults))
    if (typeof raw?.[k] === typeof defaults[k])
      settings[k] =
        typeof raw[k] === "number" ? Math.max(0, Math.min(1, raw[k])) : raw[k];
} catch {}
audio.configure(settings);
let world,
  mode = "loading",
  run = null,
  mission = null,
  player = null,
  enemies = [],
  clues = [],
  objectives = [],
  cover = null;
let missionSystem = null;
let field = null,
  fieldSpeed = 1,
  fieldObjective = "",
  vaultMotion = null,
  bonuses = supplyBonuses(profile);
let fieldEffects = {
  exposure: 0,
  detectionRadius: 12,
  healCharges: 0,
  healAmount: 20,
  healPosition: null,
};
let ammo = 6,
  reserve = 72,
  hp = 100,
  reload = 0,
  cooldown = 0,
  elapsed = 0,
  secured = false,
  strategy = null,
  done = false,
  itemUsed = false,
  smoke = 0;
let stats = {},
  weapon = WEAPONS.revolver,
  aimPoint = new THREE.Vector3(0, 0, 0),
  keys = new Set(),
  firing = false,
  aiming = false,
  joystick = { x: 0, y: 0 },
  touchAim = { x: 0, y: -1 };
let mouseActive = false;
let shuttingDown = false;
let foreground = !document.hidden;
let previousMode = "hub",
  pauseReturn = null,
  selectedMission = null,
  lastResult = null,
  hurt = 0,
  stepTime = 0,
  toastTimer,
  warningAt = 0,
  frameTimes = [],
  frameSamples = 0,
  frameSum = 0,
  lastTime = 0;
let clueSet = new Set(),
  transitionTime = 0,
  transitionAction = null,
  sceneLabels = [],
  pointerPosition = null,
  tutorialStep = 0;
const touch =
  matchMedia("(pointer: coarse)").matches ||
  new URLSearchParams(location.search).has("touch");
if (touch) document.body.classList.add("touch");
orientationGuard();
function orientationGuard() {
  const portrait = touch && innerHeight > innerWidth;
  document.body.classList.toggle("is-portrait", portrait);
  if (portrait && ["playing", "town-walk"].includes(mode)) pause();
}
const npcModel = {
  mara: "npc-mara",
  silas: "npc-elias",
  inez: "npc-june",
  orin: "npc-sol",
};
const bridge = createBridge({
  start() {
    if (mode === "title") showHub();
  },
  pause() {
    pause();
  },
  resume() {
    resume();
  },
  restart() {
    restart();
  },
});
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (x) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        x
      ],
  );
function button(action, label, cls = "", data = "") {
  return `<button class="${cls}" data-action="${action}" ${data}>${label}</button>`;
}
function panel(html, cls = "") {
  overlay.classList.toggle("field-view", cls === "field-work");
  document.body.classList.toggle("field-view", cls === "field-work");
  overlay.innerHTML = `<section class="panel ${cls}">${html}</section>`;
  overlay.classList.remove("hidden");
  clearInputs();
  queueMicrotask(() =>
    overlay.querySelector("button")?.focus({ preventScroll: true }),
  );
}
function hide() {
  overlay.classList.remove("field-view");
  document.body.classList.remove("field-view");
  overlay.classList.add("hidden");
  canvas.focus();
}
function clearInputs() {
  mouseActive = false;
  keys.clear();
  firing = false;
  aiming = false;
  joystick = { x: 0, y: 0 };
  $("move-pad").querySelector("i").style.transform = "";
}
function toast(text) {
  $("toast").textContent = text;
  $("toast").classList.add("show");
  hudLayoutCache.value?.invalidate();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    $("toast").classList.remove("show");
    hudLayoutCache.value?.invalidate();
  }, 4200);
}
function save() {
  const saved = storage.save(profile);
  if (!saved.ok) toast(saved.message);
  return saved;
}
function persistSettings() {
  audio.configure(settings);
  const task = field?.active;
  if (task) field.restoreCamera();
  world?.quality(settings.low);
  if (task)
    field.focus(
      task,
      task.focus || task.anchor || task.object,
      task.viewAngle || 0,
    );
  document.body.classList.toggle("reduced-motion", settings.reduced);
  try {
    localStorage.setItem(
      "stteak:dust-redemption:settings",
      JSON.stringify(settings),
    );
  } catch {
    toast("設定無法保存；目前分頁仍會套用。");
  }
}
function notifyRunning() {
  lastTime = 0;
  bridge.state("running");
  audio.resume();
}
function dialogueRows(rows) {
  return rows
    .map(
      (row) =>
        `<p><b>${esc(NPCS.find((n) => n.id === row.speaker)?.name || row.speaker)}</b>　${esc(row.text)}</p>`,
    )
    .join("");
}
function title() {
  mode = "title";
  world.build("town");
  world.actor("hero", -3, 4);
  world.actor("npc-mara", 3, -1);
  world.level.add(world.model("horse", 6, 5));
  panel(
    `<div class="title-layout"><div><p class="eyebrow">A FRONTIER IN SIX CONTRACTS</p><h1>荒塵之旅</h1><p class="lede">槍聲會散去。<br>留下來的，是你選擇守住的人。</p><p>六份邊境委託。三處荒野。<br>觀察地形、找齊證據，或從掩體後開火。<br>每次回到鎮上，聽見自己的決定帶來什麼。</p><div class="actions">${button("hub", profile.completed.length ? "繼續旅程" : "走進暮砂鎮", "primary")}${button("help", "操作指南")}</div><p class="meta">${BUILD} · Three.js 3D · 本機存檔<br>${esc(loaded.message)}</p></div><div class="side"><p class="eyebrow">BEFORE THE SUN GOES DOWN</p><h3>先看清，再決定。</h3><p>WASD 移動，滑鼠瞄準射擊。<br>E 調查／掩體，右鍵探頭，R 換彈。</p><hr><p>每份委託都有三項現場作業與實際交接。<br>和平：核對證據、交涉放行。交戰：解除守軍防線。<br>兩條策略都要完成貨物交付或護送，取得具名紀錄，再返回南側撤離。</p><p class="meta">失敗會回到任務前快照。<br>重玩只記錄挑戰成績，不改變故事。<br>手機請橫放，使用雙拇指操作。</p>${button("settings", "聲音與輔助設定", "quiet")}</div></div>`,
  );
  bridge.state("ready");
}
function showHub() {
  missionSystem?.dispose();
  missionSystem = null;
  field?.dispose?.();
  field = null;
  pauseReturn = null;
  mode = "hub";
  mission = null;
  run = null;
  cover = null;
  secured = false;
  clearInputs();
  audio.resume();
  world.build("town");
  player = world.actor("hero", -4, 9);
  sceneLabels = [];
  NPCS.forEach((npc, i) => {
    const x = -9 + i * 6,
      z = -4;
    world.actor(npcModel[npc.id], x, z);
    sceneLabels.push({ position: { x, y: 2.3, z }, text: npc.name });
  });
  world.level.add(world.model("horse", 10, 8));
  const ending = endingFor(profile);
  $("mission-name").textContent = "暮砂鎮";
  $("mission-sub").textContent = "把槍收好，聽聽別人的故事。";
  $("objective").innerHTML = "";
  setHudText("context", "");
  $("combat-hud").style.display = "none";
  panel(
    `<div class="columns"><div><p class="eyebrow">DUSTFALL · CONTRACT BOARD</p><h2>暮砂鎮委託簿</h2><p>${profile.completed.length ? `你已完成 ${profile.completed.length} / 6 份委託。新的安排，正從鎮上的對話裡浮現。` : "診所缺藥，鐵路停擺。第一份委託，就從一封沒有寄出的信開始。"}</p><div class="npc-row">${NPCS.map((n) => `<span>${n.name} · ${npcStance(profile, n.id)} (${profile.npcTrust[n.id]})</span>`).join("")}</div><p class="meta">旅費 ${profile.wallet} · 保存點：出發前與返回鎮上<br>所有任務包含充足彈藥與一件補給，不需刷錢。</p>${profile.activeRun ? `<div class="banner">上次委託尚未結束。可從安全入口恢復。</div><div class="actions">${button("recover", "恢復委託", "primary")}${button("abandon", "放棄並還原")}</div>` : ""}<div class="actions">${button("town-walk", "走訪小鎮")}${button("journal", "選擇紀錄")}${button("settings", "設定")}${ending ? button("ending", "查看結局", "primary") : ""}</div><p class="meta">目前只儲存在此瀏覽器。沒有雲端帳號或公開排行榜。</p></div><div><div class="chapter-list">${MISSIONS.map(
      (m, i) => {
        const complete = profile.completed.includes(m.id),
          open = i === profile.completed.length;
        return `<div class="contract"><span class="number">0${i + 1}</span><div><h3>${m.title}</h3><p>${SCENES[m.scene].name} · ${complete ? "已完成 · 可重玩" : open ? "下一份委託" : "隨故事解鎖"}</p>${profile.challenges[m.id] ? `<p>挑戰 ${profile.challenges[m.id].attempts} 次 · 最佳命中 ${profile.challenges[m.id].bestAccuracy}% · 最低受傷 ${profile.challenges[m.id].leastDamage}</p>` : ""}</div>${button("brief", complete ? "重玩挑戰" : open ? "查看委託" : "尚未解鎖", open ? "primary" : "", `data-id="${m.id}" ${(!complete && !open) || profile.activeRun ? "disabled" : ""}`)}</div>`;
      },
    ).join("")}</div></div></div>`,
  );
  overlay
    .querySelector(".actions")
    .insertAdjacentHTML("beforeend", button("supplies", "補給工坊"));
  notifyRunning();
}
function suppliesPanel() {
  mode = "supplies";
  panel(
    `<p class="eyebrow">DUSTFALL · OUTFITTER</p><h2>讓旅費帶來下一段餘裕</h2><p>旅費 ${profile.wallet}。基本裝備與每次出發的免費補給已足夠完成委託，升級會持續保留。</p><div class="choice-list">${Object.values(
      SUPPLIES,
    )
      .map((item) => {
        const level = profile.supplies?.[item.id] || 0,
          maxed = level === item.maximumLevel,
          cost = item.costs[level];
        return `<article class="supply"><h3>${item.title} · ${level}/3 階</h3><p>${item.description}</p><p class="meta">目前額外增加 ${item.levels[level]} ${item.unit}${maxed ? "" : `；下一階 ${item.levels[level + 1]} ${item.unit}`}</p>${button("buy-supply", maxed ? "已達最高階" : `升級 · ${cost} 旅費`, "", `data-id="${item.id}" ${maxed || profile.wallet < cost || profile.activeRun ? "disabled" : ""}`)}</article>`;
      })
      .join(
        "",
      )}</div>${profile.activeRun ? '<p class="banner">先完成或放棄目前委託，才能調整永久補給。</p>' : ""}<div class="actions">${button("hub", "回到委託簿", "primary")}</div>`,
  );
}
function briefing(id) {
  selectedMission = MISSIONS.find((m) => m.id === id);
  if (!selectedMission) return;
  mode = "briefing";
  const m = selectedMission,
    replay = profile.completed.includes(id);
  panel(
    `<p class="eyebrow">CONTRACT ${m.number} / 6 · ${replay ? "REPLAY" : "STORY"}</p><h2>${m.title}</h2><div class="columns"><div>${dialogueRows(
      MISSION_FLOW[m.id]
        ? [
            {
              speaker: "mara",
              text: "這箱藥共有兩份。請帶著運單核對箱身與當月收貨牌，確認它真能交給診所。",
            },
            {
              speaker: "silas",
              text: "先擬定診所兩份或雙方各一份的提案，再親自向查驗哨兵出示三份資料；他接受後才會開庭院門。若選互助，要用接通的通訊接點把承諾傳給其他哨位。",
            },
            {
              speaker: "mara",
              text: "實際交付後，帶具名回條向接收者確認通行，再由南側回鎮。搬運工還在貨棚邊，安全帶回他能打開捷徑。",
            },
          ]
        : WATER_FLOW[m.id]
          ? [
              {
                speaker: "inez",
                text: "五格主供水要先修復旁通、校正三輪，再親手選當日分流。三處至少各留一格；備水另有一桶，不算在五格裡。",
              },
              {
                speaker: "silas",
                text: "民用加量讓住區多一格，但須走東橋；保留維修旁通可開西淺灘。公開最低供水保證能取消守橋查驗，實際水量仍要驗流。",
              },
              {
                speaker: "inez",
                text: "我會在所選岸邊核對流量，交給你供水回條。今天怎麼分流與永久水權是兩件事；水權仍由你撤離時決定。",
              },
            ]
          : SIGNAL_FLOW[m.id]
            ? [
                {
                  speaker: "orin",
                  text: "不是電線斷了。先把原地線接回，再送電；本次發送與回覆都要對得上。信袋裡的 M17 四人名單，一個也不能少。",
                },
                {
                  speaker: "silas",
                  text: "公開驛線可選西側掩體中繼或南側開闊中繼，擇一接通。追線支路會讓既有守軍前往查驗；它和主驛線分開，可以切斷。",
                },
                {
                  speaker: "orin",
                  text: "也可在原接線台送出停火調令，再把同一只完整名單信袋帶給我。我在南側收件台核對本次回覆、簽收；不用再去北方找線圈。",
                },
              ]
            : LEDGER_FLOW[m.id]
              ? [
                  {
                    speaker: "orin",
                    text: "先核對貨票與車牌，再讀付款頁的側光壓痕與完整工名。錯填可以當場修正；核證後把同一本原帳收入背包，讓它一直跟著你。",
                  },
                  {
                    speaker: "silas",
                    text: "印出的只有一份副本。可以密封送到南西奧林，交接花費十旅費；或在原公告欄公開一頁，由帳房見證，兩名既有守軍會預告查驗公示通路。",
                  },
                  {
                    speaker: "orin",
                    text: "完整核證資料可以令查驗停止。把同一副本親手交到所選位置，拿具名保管回條後帶原帳南撤；是否全面公開原帳，仍在撤離時決定。",
                  },
                ]
              : NIGHT_FLOW[m.id]
                ? [
                    {
                      speaker: "mara",
                      text: "羅絲、塔文、米洛三人還在北段等你。核對封路令與三人的當日證件，把同一份文件帶在身上；出示有效文件才能讓守軍放行。",
                    },
                    {
                      speaker: "silas",
                      text: "西線有遮蔽，末段便橋連著原修橋台；斜撐試重完成後才可通行。東線較直接，但開口暴露。沿途能讓三人在安全掩體停等，再靠近帶他們續走。",
                    },
                    {
                      speaker: "mara",
                      text: "過中段後，側翼者塔洛可能預告繞行；先出示文件能預防，也能取消。即使清場，仍要親自把同三人帶到南側集合處，核對到達回條後直接回鎮。",
                    },
                  ]
                : PACT_FLOW[m.id]
                  ? [
                      {
                        speaker: "inez",
                        text: "軍用輸送帶與水醫線分開。只切軍線，能阻止兩名既有守軍從同一礦車領走剩餘補給；已領用的也會記入盤點。",
                      },
                      {
                        speaker: "silas",
                        text: "南側電池箱可先選熄燈掩護，或保留完整電池領二十旅費。同一礦車只能推一趟：完整交涉側線保留貨物，進攻側線封存六發作掩體，其餘仍可交涉。",
                      },
                      {
                        speaker: "inez",
                        text: "你可以用安全離境與公開聽證換六人交械，也可以突破防線。兩條路都要把同一車完整停妥，再到盤點台核對物資與地契。我簽回條後，你直接南撤；明日的制度由你在撤離時選擇。",
                      },
                    ]
                  : dialogueFor(m, profile, "briefing"),
    )}<div class="route-map"><b>兩條進入路線</b>${SCENES[m.scene].routes.map((r) => `<p>${r.name} — ${r.description}</p>`).join("")}</div></div><div><p>${esc(m.summary)}</p><div class="banner">${MISSION_FLOW[m.id] ? "核驗同一箱藥 → 擬定分配提案 → 親身交涉或清場取回 → 扳道岔並運送 → 出示交付回條。互助方案須接通原接點並傳達承諾；斷線可停止查驗，也會暫時阻斷傳話。最後南側撤離。" : "現場先完成三項 ⚙ 作業：觀察機關、動手操作，並完成搬運或護送。集齊三個 ◆ 線索可到北方議和，也可擊敗守軍取物。最後返回南側 ◇ 撤離。"}</div><p><label for="loadout-weapon">攜帶武器</label></p><select id="loadout-weapon">${profile.unlockedWeapons.map((id) => `<option value="${id}" ${profile.equipment.weapon === id ? "selected" : ""}>${WEAPONS[id].name} · ${WEAPONS[id].description}</option>`).join("")}</select><p><label for="loadout-item">一件補給</label></p><select id="loadout-item"><option value="medkit">繃帶 · F 恢復 40 生命（一次）</option><option value="smoke">煙罐 · F 降低附近守軍警戒 8 秒（一次）</option></select><p class="meta">${replay ? "重玩獨立快照：不改故事選擇、不重複發獎。" : "安全快照會在出發時保存；失敗不倒扣旅費。"}</p></div></div><div class="actions">${button("deploy", "騎馬前往 " + SCENES[m.scene].name, "primary")}${button("hub", "返回鎮上")}${button("help", "操作說明")}</div>`,
  );
  const supplies = supplyBonuses(profile);
  if (PACT_FLOW[m.id]) {
    overlay.querySelector(".columns > div:last-child .banner").textContent =
      "三份承諾證據 → 提前安排探照燈、只切軍線 → 同車選側線、完整推入白框扣煞車 → 盤點台交械或清場後核對庫存、地契及回條 → 南撤選擇明日制度。";
    overlay.querySelector(".route-map").innerHTML =
      "<b>同一礦車的兩個停靠用途</b><p>完整交涉側線：保留剩餘貨物。進攻掩體側線：六發封存為掩體，其餘仍可交涉。</p><p>兩名既有守軍至多各領一次六發；全場只有原二十四發車上庫存。切軍線可阻止尚未領取的補給，民生水醫線繼續供電。</p><p>南側電池箱可先準備；沒有必須等候的門檻。整車含把手與車尾進白框後才扣煞車，盤點台簽收後不再北返取物。</p>";
  }
  if (WATER_FLOW[m.id]) {
    overlay.querySelector(".columns > div:last-child .banner").textContent =
      "查閱三份水路證據 → 修復並測壓 → 完成三輪基準校正 → 選分流、操作導流柄與驗流 → 安排獨立備水 → 到所選岸邊由伊妮絲簽收。取得回條後確認停火或清場，再向南撤離。";
    overlay.querySelector(".route-map").innerHTML =
      "<b>實際過河位置</b><p>東橋始終可通行。西淺灘須保留維修旁通並實際驗流後才開啟。</p><p>配水前仍能經東橋調查北岸線索；兩岸各有岩石可遮蔽守軍射線。</p>";
  }
  if (SIGNAL_FLOW[m.id]) {
    overlay.querySelector(".columns > div:last-child .banner").textContent =
      "三份線索 → 真接地後送電 → 核對同袋四人名單與收件牌 → 選公開驛線或停火線 → 親手發送 → 南側讀本次回覆並由奧林簽收。停火線須連續搬運同一信袋；最後帶具名回條南撤。";
    overlay.querySelector(".route-map").innerHTML =
      "<b>本次通訊與收件路線</b><p>公開線：只需西側掩體或南側開闊中繼其中一處。可觀察後選位，並切追線支路預防／取消查驗。</p><p>停火線：原接線台傳第17號調令，既有查線守軍退守；完整名單仍須隨同一信袋親送南側奧林。</p>";
  }
  if (LEDGER_FLOW[m.id]) {
    overlay.querySelector(".columns > div:last-child .banner").textContent =
      "貨票與車牌互證 → 將原帳收入可見背包 → 側光核對付款壓痕與工名 → 印製並連續搬運同一副本 → 具名保管與原帳通行回條 → 帶原帳南撤。非致命須完整核證放行；清場後仍須完成交接。";
    overlay.querySelector(".route-map").innerHTML =
      "<b>副本的兩個實際去處</b><p>密封託付：搬到南西奧林的信差箱，交付時只收一次 10 旅費。</p><p>先公開一頁：搬到東側原公告欄，由旁邊帳房見證；完整核證資料可預防／取消既有守軍的查驗。</p><p>原帳一直在你的背包；永久公開或封存仍在南側撤離時選擇。</p>";
  }
  if (NIGHT_FLOW[m.id]) {
    overlay.querySelector(".columns > div:last-child .banner").textContent =
      "三份證據與同一份家屬文件 → 量水選路、斜撐試重 → 沿原路護送羅絲、塔文、米洛 → 南側核對三人到達回條 → 直接撤離。非致命須有效放行；六名守軍全倒仍須三人實際到達。";
    overlay.querySelector(".route-map").innerHTML =
      "<b>同三人的兩條護送路線</b><p>西側淺灘：較長但有遮蔽；原修橋台斜撐試重完成後，連動末段便橋開通。</p><p>東側岩脊：較直接，須穿過暴露開口；中段塔洛的一次繞行可用實體通行文件預防／取消。</p><p>在路旁掩體安排三人停等；續走前須靠近三人各 6 公尺內。南側集合處收回條，無須北返取鈴。</p>";
  }
  $("loadout-item").options[0].textContent =
    `繃帶 · F 恢復 ${supplies.medkitHeal} 生命（一次）`;
  $("loadout-item").options[1].textContent =
    `煙罐 · F 降低附近守軍警戒 ${supplies.smokeSeconds} 秒（一次）`;
  $("loadout-item").insertAdjacentHTML(
    "afterend",
    `<p class="meta">永久補給：額外 ${supplies.reserveBonus} 發備彈 · 每次出發自動套用。</p>`,
  );
  if (replay)
    overlay
      .querySelector(".actions")
      .insertAdjacentHTML("beforebegin", challengeComparison(m.id));
}
function deploy() {
  const m = selectedMission;
  if (!m) return;
  const result = beginMission(profile, m.id, {
    weapon: $("loadout-weapon").value,
    item: $("loadout-item").value,
    replay: profile.completed.includes(m.id),
    requireFieldwork: true,
    ...flowRequirements(m.id),
  });
  profile = result.profile;
  run = result.run;
  save();
  transition(() => startMission(m, run));
}
function transition(action) {
  if (settings.reduced) {
    action();
    return;
  }
  missionSystem?.dispose();
  missionSystem = null;
  field?.dispose();
  field = null;
  mode = "transition";
  hide();
  world.build("town");
  player = world.actor("hero", 0, 0);
  const horse = world.model("horse", 0, 0);
  world.dynamic.add(horse);
  player.object.position.y = 1.1;
  world.animate(player, "idle");
  transitionTime = 1.8;
  transitionAction = action;
  $("mission-name").textContent = "驛路";
  $("mission-sub").textContent = "離開暮砂鎮";
  $("objective").innerHTML =
    "<b>下一站，荒野。</b><small>每個人都帶著自己的理由。</small>";
}
function startMission(m, activeRun) {
  missionSystem?.dispose();
  missionSystem = null;
  field?.dispose?.();
  field = null;
  vaultMotion = null;
  fieldSpeed = 1;
  fieldObjective = "";
  bonuses = supplyBonuses(activeRun.before || profile);
  fieldEffects = {
    exposure: 0,
    detectionRadius: 12,
    healCharges: 0,
    healAmount: 20,
    healPosition: null,
  };
  mission = m;
  run = activeRun;
  if (sceneFlowFor(m.id)) {
    const requirement = Object.keys(flowRequirements(m.id))[0];
    const entry = flowEntryFor(m.id, activeRun);
    const upgrading = !activeRun[requirement];
    run = { ...activeRun, [requirement]: entry[requirement] };
    profile.activeRun = {
      ...profile.activeRun,
      [requirement]: entry[requirement],
    };
    save();
    if (upgrading) toast(entry.notice);
  }
  weapon = WEAPONS[run.weapon];
  hp = 100;
  ammo = weapon.magazine;
  reserve = weapon.reserve + bonuses.reserveBonus;
  reload = 0;
  cooldown = 0;
  elapsed = 0;
  secured = false;
  strategy = null;
  done = false;
  itemUsed = false;
  smoke = 0;
  clueSet = new Set();
  cover = null;
  hurt = 0;
  tutorialStep = 0;
  stats = {
    shots: 0,
    hits: 0,
    kills: 0,
    damageTaken: 0,
    reloads: 0,
    itemsUsed: 0,
    seconds: 0,
    clues: 0,
    assisted: settings.assist,
    slowAim: settings.slowAim,
    weapon: run.weapon,
  };
  world.build(m.scene, [
    ...m.clues.map((c) => c.position),
    ...m.interactables.map((o) => o.position),
    m.entry,
    m.exit,
    ...fieldPlacementPoints(m.id),
    ...missionPlacementPoints(m.id),
    ...waterPlacementPoints(m.id),
    ...signalPlacementPoints(m.id),
    ...ledgerPlacementPoints(m.id),
    ...nightPlacementPoints(m.id),
    ...pactPlacementPoints(m.id),
  ]);
  player = world.actor("hero", ...m.entry, run.weapon);
  enemies = m.enemies.map((e, i) => ({
    ...e,
    actor: world.actor(`enemy-${e.type}`, ...e.position),
    hp: e.type === "shotgun" ? 110 : 90,
    alert: 0,
    state: "patrol",
    timer: 1 + i * 0.3,
    windup: 0,
    suppressed: 0,
    tactics: createEnemyTacticsState(e.id),
    tacticalWarning: 0,
    start: [...e.position],
    heading: i,
    shotCount: 0,
    rounds: e.type === "sniper" ? 16 : 30,
    magazine: e.type === "sniper" ? 4 : 6,
    reloading: 0,
  }));
  clues = m.clues.map((c) => ({
    ...c,
    marker: world.marker(...c.position),
    read: false,
  }));
  objectives = m.interactables
    .filter((o) => !sceneFlowFor(m.id) || !["cargo", "parley"].includes(o.type))
    .map((o) => ({
      ...o,
      marker: world.marker(
        ...o.position,
        o.type === "parley" ? 0xd8bc73 : 0xe49469,
      ),
    }));
  objectives.push({
    type: "exit",
    title: "返回暮砂鎮",
    position: m.exit,
    marker: world.marker(...m.exit, 0xbedccb),
  });
  sceneLabels = [];
  mode = "playing";
  field = new FieldSystem(world, m.id, {
    panel(html) {
      mode = "field";
      panel(html, "field-work");
    },
    close() {
      mode = "playing";
      hide();
      updateHud();
    },
    effect: applyFieldEffect,
    toast,
    hasClue: (id) => clueSet.has(id),
    clueTitle: (id) =>
      m.clues.find((clue) => clue.id === id)?.title || "附近的委託線索",
    available: (task) => missionSystem?.available?.(task) !== false,
    interactionRadius: (task, fallback) =>
      missionSystem?.interactionRadius?.(task, fallback),
    extraControls: (task) => missionSystem?.controls(task) || "",
    recordStep: (task, step) => missionSystem?.recordStep(task, step),
    beforeChoice: (task, choice) => missionSystem?.beforeChoice(task, choice),
    beforeCargo: (task, action) => missionSystem?.beforeCargo(task, action),
    route: (task, step, route) =>
      missionSystem?.route(task, step, route) || route,
  });
  const SceneController = sceneFlowFor(m.id);
  if (SceneController)
    missionSystem = new SceneController(world, m.id, field, player, enemies, {
      toast,
      effect: applyFieldEffect,
      secured: () => secured,
      exitPosition: () => m.exit,
      kills: () => stats.kills,
      clueCount: () => clueSet.size,
      secure,
      panel(html) {
        mode = "parley";
        panel(html);
      },
      close() {
        mode = "playing";
        hide();
        updateHud();
      },
    });
  hide();
  $("combat-hud").style.display = "flex";
  $("mission-name").textContent = `${m.number}. ${m.title}`;
  $("mission-sub").textContent =
    `${SCENES[m.scene].name} · ${run.replay ? "獨立重玩" : "故事委託"}`;
  $("weapon-name").textContent = weapon.name;
  notifyRunning();
  toast("先沿西側調查 ◆ 線索，再到 ⚙ 現場作業。靠近後按 E。");
  updateHud();
  orientationGuard();
}
function recover() {
  const active = profile.activeRun;
  if (!active) return;
  const m = MISSIONS.find((m) => m.id === active.missionId);
  run = active;
  startMission(m, active);
}
function abandon() {
  if (profile.activeRun)
    profile = failMission(profile, profile.activeRun).profile;
  save();
  showHub();
}
function retry() {
  if (!mission || !run) return;
  const m = mission,
    options = {
      weapon: run.weapon,
      item: run.item,
      replay: run.replay,
      requireFieldwork: true,
      ...flowRequirements(m.id),
    };
  if (profile.activeRun) profile = failMission(profile, run).profile;
  const next = beginMission(profile, m.id, options);
  profile = next.profile;
  run = next.run;
  save();
  startMission(m, run);
}
function restart() {
  if (mode === "loading") return;
  if (mission && run && profile.activeRun) {
    retry();
  } else showHub();
}
function nearby() {
  if (!player || !mission) return null;
  const p = player.position;
  let found = null,
    d = 2.4;
  for (const o of [...clues.filter((c) => !c.read), ...objectives]) {
    const distance = Math.hypot(p.x - o.position[0], p.z - o.position[1]);
    if (distance < d) {
      found = o;
      d = distance;
    }
  }
  const work = field?.getNearby(p);
  if (work) {
    const point = field.taskPoint(work);
    const distance = Math.hypot(p.x - point.x, p.z - point.z);
    if (distance < d) {
      found = { ...work, type: "field", task: work };
      d = distance;
    }
  }
  const flowNear = missionSystem?.nearest();
  // A formal handoff may share the evacuation point (the night assembly).
  // Complete that interaction before offering withdrawal; once secured, E at
  // the exit must extract even if a recipient or family member is closer.
  if (
    flowNear &&
    !(secured && found?.type === "exit") &&
    (!found ||
      flowNear.distance < d ||
      (!secured && found?.type === "exit" && flowNear.distance < 2.4))
  )
    found = flowNear;
  if (
    fieldEffects.healCharges > 0 &&
    fieldEffects.healPosition &&
    Math.hypot(
      p.x - fieldEffects.healPosition[0],
      p.z - fieldEffects.healPosition[1],
    ) < 2.4
  )
    return {
      type: "field-heal",
      title: `取用保留淨水 · 恢復 ${fieldEffects.healAmount} 生命`,
    };
  return found;
}
function applyFieldEffect(effect, context = {}) {
  fieldEffects.exposure = Math.max(
    fieldEffects.exposure,
    effect.exposureSeconds || 0,
  );
  if (effect.alertDelta) {
    for (const enemy of enemies) {
      enemy.alert = Math.max(
        0,
        Math.min(5, enemy.alert + Math.max(-2, Math.min(3, effect.alertDelta))),
      );
      if (effect.alertDelta < 0) enemy.windup = 0;
    }
    if (effect.alertDelta < 0) fieldEffects.detectionRadius = 8;
  }
  if (effect.enemyAmmoMultiplier)
    for (const enemy of enemies) {
      enemy.rounds = Math.floor(enemy.rounds * effect.enemyAmmoMultiplier);
      enemy.magazine = Math.min(enemy.magazine, enemy.rounds);
    }
  if (effect.fieldHealCharges !== undefined) {
    fieldEffects.healCharges = effect.fieldHealCharges;
    fieldEffects.healAmount = effect.fieldHealAmount || 20;
    fieldEffects.healPosition = context.position
      ? [...context.position]
      : [...mission.entry];
  }
  if (effect.message) toast(effect.message);
}
function interact() {
  if (mode === "town-walk") {
    const nearest = sceneLabels.find(
      (n) =>
        Math.hypot(
          n.position.x - player.position.x,
          n.position.z - player.position.z,
        ) < 3,
    );
    if (nearest) {
      const npc = NPCS.find((n) => n.name === nearest.text);
      mode = "town-dialogue";
      panel(
        `<p class="eyebrow">DUSTFALL · ${npc.role}</p><h2>${npc.name}</h2><p>${npc.stance}</p><p>對你的立場：${npcStance(profile, npc.id)}（${profile.npcTrust[npc.id]}）</p><div class="actions">${button("town-walk", "繼續走訪", "primary")}${button("hub", "查看委託簿")}</div>`,
      );
    }
    return;
  }
  if (mode !== "playing") return;
  if (vaultMotion) return;
  if (missionSystem?.interactTraversal?.()) return;
  if (field?.interactTraversal?.(player.position)) return;
  const near = nearby();
  if (near) {
    if (near.type === "mission") {
      missionSystem.interact(near);
      return;
    }
    if (near.type === "field") {
      cover = null;
      field.open(near.task);
      return;
    }
    if (near.type === "field-heal") {
      if (hp >= 100) {
        toast("生命充足，淨水仍留在此處。受傷後可回來取用。");
        return;
      }
      const healed = Math.min(100 - hp, fieldEffects.healAmount);
      hp += healed;
      fieldEffects.healCharges--;
      toast(`飲用淨水，恢復 ${healed} 生命。`);
      updateHud();
      return;
    }
    if (near.text) {
      let flowEvidence;
      try {
        flowEvidence = missionSystem?.observeClue(near.id);
      } catch (error) {
        toast(error.message);
        return;
      }
      near.read = true;
      near.marker.visible = false;
      clueSet.add(near.id);
      stats.clues = clueSet.size;
      mode = "clue";
      audio.play("success");
      panel(
        `<p class="eyebrow">EVIDENCE ${clueSet.size} / ${clues.length}</p><h2>${near.title}</h2><p>${esc(flowEvidence ? near.text + " " + flowEvidence : near.text)}</p><div class="banner">${missionSystem ? esc(missionSystem.objective()) : clueSet.size === clues.length ? "證據已完整。完成三項 ⚙ 現場作業後，可前往北方金色 ◆ 據點議和。" : "其餘線索位在西北側與東側。移動時留意守軍射線，掩體能保護你。"}</div><div class="actions">${button("back-playing", "收好線索，繼續前進", "primary")}</div>`,
      );
      if (WATER_FLOW[mission.id])
        overlay.querySelector(".banner").textContent =
          "修復、校正並驗流五格主供水，安排獨立的一桶備水，再到所選岸邊由伊妮絲簽收。公開最低供水保證與零擊殺可換得停火通行。";
      return;
    }
    if (near.type === "parley") {
      if (!field?.complete) {
        toast("先完成三項 ⚙ 現場作業，再帶著成果前往議和。");
        return;
      }
      if (secured) {
        toast("目標已到手。回南側撤離。");
        return;
      }
      if (clueSet.size < clues.length) {
        toast(`需要三條證據才能議和。目前 ${clueSet.size} / 3。`);
        return;
      }
      if (stats.kills) {
        toast("已有守軍倒下，議和失效；清除其餘守軍後從取物點完成目標。");
        return;
      }
      mode = "parley";
      panel(
        `<p class="eyebrow">A WAY WITHOUT BLOOD</p><h2>${near.title}</h2><p>你把一路找到的證據放在桌上。對方放低槍口，等你提出交換。</p>${clues.map((c) => `<p>◆ ${c.title}：${c.text}</p>`).join("")}<div class="actions">${button("peace", "提出協議，帶回物件", "primary")}${button("back-playing", "暫時離開")}</div>`,
      );
      return;
    }
    if (near.type === "cargo") {
      if (!field?.complete) {
        toast("先完成三項 ⚙ 現場作業，才能將物件安全帶走。");
        return;
      }
      if (secured) {
        toast("物件已到手，前往南側撤離。");
        return;
      }
      if (enemies.some((e) => e.hp > 0)) {
        toast("取物點仍有守軍控制。可用完整證據議和，或擊敗守軍。");
        return;
      }
      secure("combat");
      return;
    }
    if (near.type === "exit") {
      if (secured) extract();
      else {
        mode = "withdraw";
        panel(
          `<p class="eyebrow">A SAFE WAY HOME</p><h2>暫時撤回？</h2><p>委託目標尚未完成。現在離開會還原任務前的物品與旅費，你可以重新選擇裝備。</p><div class="actions">${button("abandon", "撤回暮砂鎮")}${button("back-playing", "留下完成委託", "primary")}</div>`,
        );
      }
      return;
    }
  }
  if (cover) {
    cover = null;
    toast("離開掩體");
    return;
  }
  const box = world.colliders
    .filter((b) => coverDistance(player.position, b) < 1.2 && b.h < 2.2)
    .sort(
      (a, b) =>
        coverDistance(player.position, a) - coverDistance(player.position, b),
    )[0];
  if (box) {
    cover = box;
    tutorialStep = Math.max(tutorialStep, 1);
    audio.play("ui");
    toast(
      box.vaultable
        ? "已進入低掩體。右鍵探頭，左鍵射擊；Space 翻越。"
        : "已進入高掩體。右鍵沿側邊探頭；鬆開縮回。",
    );
  } else toast("靠近箱子或岩石再按 E；附近的線索也用 E 調查。");
}
function secure(solution) {
  if (!field?.complete) {
    toast("現場作業尚未完成。");
    return;
  }
  if (missionSystem && !missionSystem.complete) {
    toast(
      WATER_FLOW[mission.id]
        ? "供水尚未驗流與見證簽收，沒有供水回條。"
        : SIGNAL_FLOW[mission.id]
          ? "本次完整名單尚未由奧林核對回覆並簽收，沒有收件回條。"
          : LEDGER_FLOW[mission.id]
            ? "同一副本尚未完成保管交接，或原帳不在背包；尚未取得具名回條。"
            : NIGHT_FLOW[mission.id]
              ? "三名家屬尚未全數抵達南側，或文件與通行尚未核對；沒有到達回條。"
              : PACT_FLOW[mission.id]
                ? "同車庫存與地契尚未在盤點台完成交接，沒有具名回條。"
                : "藥品尚未實際交付，沒有接收回條。",
    );
    return;
  }
  strategy = solution;
  secured = true;
  enemies.forEach((e) => {
    e.windup = 0;
    e.alert = 0;
  });
  audio.play("success");
  mode = "playing";
  hide();
  toast(
    PACT_FLOW[mission.id]
      ? `地契已收入背包，具名回條已簽署。${solution === "nonlethal" ? "守軍已交械。" : "防線已清場。"}返回南側撤離。`
      : missionSystem
        ? solution === "nonlethal"
          ? "回條已確認，守軍停火。帶著具名回條返回南側撤離。"
          : "清場與回條已確認。返回南側撤離。"
        : solution === "nonlethal"
          ? "協議成立，守軍停火。帶著物件返回南側撤離。"
          : "物件已取回。返回南側撤離。",
  );
}
function extract() {
  if (done) return;
  mode = "extraction";
  if (mission.choice) {
    panel(
      `<p class="eyebrow">A DECISION THAT STAYS</p><h2>${mission.choice.title}</h2><p>這項選擇會改變後續對話與結局。結果保存在委託紀錄，可隨時回顧。${run.replay ? "本次重玩不會改變原本故事。" : ""}</p><div class="choice-list">${mission.choice.options.map((o) => button("commit", `<strong>${o.label}</strong><small>${o.consequence}</small>`, "", `data-id="${o.id}"`)).join("")}</div>`,
    );
  } else commit();
}
function commit(choice) {
  if (done || !secured || mode !== "extraction") return;
  stats.seconds = elapsed;
  const completed = completeMission(profile, run, {
    strategy,
    choice,
    stats,
    fieldState: field.state,
    ...flowProgressFor(mission.id, missionSystem),
  });
  profile = completed.profile;
  lastResult = completed.result;
  done = true;
  save();
  audio.play("success");
  showResult();
}
function showResult() {
  mode = "result";
  const r = lastResult,
    s = r.stats;
  panel(
    `<p class="eyebrow">CONTRACT COMPLETE · ${r.replay ? "CHALLENGE" : "STORY"}</p><h2>${r.title} · 委託完成</h2><div class="banner">${r.strategy === "nonlethal" ? "非致命協議" : "交戰取回"} · ${r.consequence}${r.choiceConsequence ? "<br>" + r.choiceConsequence : ""}</div><div class="stat-grid"><div><b>${s.accuracy}%</b><span>命中率 · ${s.hits}/${s.shots}</span></div><div><b>${s.damageTaken}</b><span>承受傷害</span></div><div><b>${Math.floor(s.seconds / 60)}:${String(Math.floor(s.seconds % 60)).padStart(2, "0")}</b><span>任務時間 · 含閱讀／操作</span></div><div><b>${r.replay ? "—" : "+" + r.reward}</b><span>${r.replay ? "重玩不發獎" : "旅費"}</span></div></div>${dialogueRows(resultDialogue(r))}<p class="meta">${s.assisted ? "瞄準輔助已開啟" : "手動瞄準"} · ${s.slowAim ? "慢速瞄準" : "標準時速"} · 換彈 ${s.reloads} · 道具 ${s.itemsUsed} · 線索 ${s.clues}/3<br>${s.shots === 0 ? "這次已零開火完成；下次可比較另一條路線與交戰策略。" : "下一次可嘗試另一條路線，或以不開槍的方式完成。"}</p><div class="actions">${button("hub", "回到暮砂鎮", "primary")}${button("replay-result", "重玩這份委託")}${endingFor(profile) ? button("ending", "查看邊境結局") : ""}</div>`,
  );
  overlay
    .querySelector(".stat-grid")
    .insertAdjacentHTML("afterend", fieldResultRows(r) + missionResultRows(r));
  if (r.replay) {
    overlay
      .querySelector(".banner")
      .insertAdjacentHTML(
        "afterbegin",
        '<p class="meta">以下是這條路線的故事後果；本次重玩不套用信任、旅費或故事選擇。</p>',
      );
    overlay
      .querySelector(".stat-grid")
      .insertAdjacentHTML("afterend", challengeComparison(r.missionId));
  }
}
function challengeComparison(id) {
  const first = profile.history.find((row) => row.missionId === id);
  if (!first) return "";
  const recent = profile.challenges[id]?.last;
  const rows = [
    [
      "策略",
      (row) => (row.strategy === "nonlethal" ? "非致命協議" : "交戰取回"),
    ],
    ["武器", (row) => WEAPONS[row.stats.weapon]?.name || row.stats.weapon],
    ["命中率", (row) => `${row.stats.accuracy}%`],
    ["承受傷害", (row) => row.stats.damageTaken],
    ["使用彈藥", (row) => `${row.stats.shots} 發`],
    ["消耗道具", (row) => `${row.stats.itemsUsed} 件`],
    ["瞄準輔助", (row) => (row.stats.assisted ? "開啟" : "關閉")],
  ];
  return `<details class="challenge-comparison" open><summary>比較故事首次與最近重玩</summary><table><thead><tr><th scope="col">表現</th><th scope="col">故事首次</th><th scope="col">最近重玩</th></tr></thead><tbody>${rows.map(([label, value]) => `<tr><th scope="row">${label}</th><td>${esc(value(first))}</td><td>${recent ? esc(value(recent)) : "尚未挑戰"}</td></tr>`).join("")}</tbody></table><p class="meta">重玩保留故事、信任與錢包；試試另一種策略，或降低彈藥與道具用量。</p></details>`;
}
function resultDialogue(result) {
  if (result.pactFlow) {
    const pact = result.pactFlow.result;
    return [
      {
        speaker: "inez",
        text: `同車物資已盤清：可交涉 ${pact.cart.stock.available} 發、守軍已領 ${pact.cart.stock.issued} 發、掩體封存 ${pact.cart.stock.cover} 發。地契已由你帶回，具名回條已簽署並記入交接紀錄。${result.strategy === "nonlethal" ? "六人交械，離境與聽證承諾已留下紀錄。" : "六人防線已解除，傷亡與物資去向都會留下紀錄。"}今後採議會或守望官，依你撤離時的決定。`,
      },
    ];
  }
  if (result.nightFlow) {
    const night = result.nightFlow.result;
    return [
      {
        speaker: "mara",
        text: `羅絲、塔文、米洛都已沿${night.routeId === "west-ford" ? "西線便橋" : "東側開口"}抵達南側集合處；同一份文件與三人的到達回條一起帶回了鎮上。${result.strategy === "nonlethal" ? "有效放行保住了這次通行，沒有守軍喪命。" : "清場之後，你仍把同三人安全帶到了。今天的傷亡也會留在紀錄裡。"}`,
      },
    ];
  }
  if (result.ledgerFlow) {
    const ledger = result.ledgerFlow.result;
    return [
      {
        speaker: "orin",
        text: `${ledger.localChoices.custody === "sealed-courier" ? "密封副本已交給我保管，這次交接的十旅費只收一次。" : "帳房已見證同一副本的一頁公示，具名保管回條已簽好。"}原帳始終由你背著，連同回條一起帶回鎮上。${result.strategy === "nonlethal" ? "完整核證讓這次通行沒有守軍喪命。" : "保管交接完成，今天的傷亡也會留在紀錄裡。"}原帳的永久去向依你撤離時的決定。`,
      },
    ];
  }
  if (result.signalFlow) {
    const signal = result.signalFlow.result;
    return [
      {
        speaker: "orin",
        text: `M17 四人的完整名單已簽收。${signal.receipt.receiveMode === "physical-pouch" ? "調令傳到守軍，同一只信袋也親手送到我面前。" : "所選中繼送出的公開名單與本次回覆完全相符。"}${result.strategy === "nonlethal" ? "沒有守軍喪命，四個名字都留在回條裡。" : "四個名字送到了，今天的傷亡也會留在紀錄裡。"}`,
      },
    ];
  }
  if (result.waterFlow) {
    const water = result.waterFlow.result;
    return [
      {
        speaker: "inez",
        text: `五格水已核對：診所 ${water.water.clinic} 格、住區 ${water.water.settlement} 格、礦場 ${water.water.mine} 格，維修旁通 ${water.water.bypass} 格。${result.strategy === "nonlethal" ? "最低供水保證讓守軍接受這次交接。" : "供水恢復了，今天的傷亡也會留在紀錄裡。"}這張回條證明今天的分流；今後水權則依你撤離時的公開決定。`,
      },
    ];
  }
  if (result.missionFlow) {
    const allocation = result.missionFlow.result.allocation;
    return [
      {
        speaker: "mara",
        text: `診所收到 ${allocation.clinic} 份，守軍醫護收到 ${allocation.guard} 份；同一箱藥的兩份都有了去處。${result.strategy === "nonlethal" ? "你帶回了具名回條，也讓這次交付沒有守軍喪命。" : "藥已收到，車站的傷者也需要照顧。我會把兩件事都記下。"}`,
      },
    ];
  }
  return dialogueFor(mission, profile, "debrief", strategy);
}
function missionResultRows(result) {
  const pact = result.pactFlow?.result;
  if (pact) {
    const stock = pact.cart.stock,
      bay = PACT_FLOW["dawn-pact"].bays[pact.localChoices.siding],
      response =
        {
          waiting: "未觸發",
          warned: "既有兩人領補給已預告",
          active: "既有兩人曾沿原路領補給",
          prevented: "切軍線預防領補給",
          cancelled: "切線或停火取消尚未領取的補給",
          neutralized: "領補給守軍已被擊倒，沒有替補",
        }[pact.response.status] || pact.response.status;
    return `<details class="field-results" open><summary>同車庫存與地契交接回條</summary><p>${esc(bay.title)} · 原二十四發：可交涉 ${stock.available}、已領 ${stock.issued}、掩體封存 ${stock.cover}。<br>軍用線已切斷，民生水醫線仍供電。${pact.localChoices.lighting === "darken-approach" ? "同一電池移入回收槽，探照燈熄滅。" : result.replay ? "完整電池留在原接點；本次重玩不發放二十旅費。" : "完整電池留在原接點；原工作的二十旅費只結算一次，已計入總額。"}</p><p>守軍回應：${esc(response)}。${pact.clearance ? "六名既有守軍已實際交械。" : "六名既有守軍已清場。"}<br>伊妮絲見證 · 回條 ${esc(pact.receipt.id)} · 同一地契已收入玩家背包。</p><small>${result.replay ? "本次挑戰的交接紀錄，不改故事、信任與旅費。" : "物資盤點、地契與簽收紀錄已隨安全撤離保存。"} 側線與燈光不代替明日制度的永久選擇；本地流程不另發獎。</small></details>`;
  }
  const night = result.nightFlow?.result;
  if (night) {
    const definition = NIGHT_FLOW["long-night"],
      names = night.receipt.memberIds.map(
        (id) =>
          definition.members.find((member) => member.id === id)?.name || id,
      ),
      response =
        {
          waiting: "未觸發",
          warned: "塔洛的繞行已預告",
          active: "既有側翼者塔洛已繞向所選通路",
          prevented: "實體文件預防繞行查驗",
          cancelled: "有效放行取消繞行，存活的塔洛返回原崗",
          neutralized: "塔洛已被擊倒，沒有替補",
        }[night.response.status] || night.response.status;
    return `<details class="field-results" open><summary>三名家屬的南側到達回條</summary><p>${names.map(esc).join("、")}，同三人均已抵達南側集合處。<br>${night.routeId === "west-ford" ? "西側淺灘與末段便橋：斜撐試重與連動開橋均已完成，沿途使用實際遮蔽。" : "東側岩脊開口：經較直接的暴露通路，三人沿原隊伍路線到達。"}</p><p>文件：${night.clearance ? "有效放行已核對" : "未取得放行，六名既有守軍已清場"}。守軍回應：${esc(response)}。<br>回條 ${esc(night.receipt.id)} · ${esc(night.receipt.title)}。</p><small>${result.replay ? "本次挑戰的護送紀錄，不改原故事、信任與旅費。" : "三人到達與同一份文件已隨安全撤離保存。"} 到達回條直接承接南側撤離，局部流程不另發獎。</small></details>`;
  }
  const ledger = result.ledgerFlow?.result;
  if (ledger) {
    const sealed = ledger.localChoices.custody === "sealed-courier";
    const response =
      {
        waiting: "未觸發",
        warned: "已展示公示查驗預告",
        active: "既有守軍正在查驗公示通路",
        prevented: "查驗已預防",
        cancelled: "完整核證取消查驗",
        neutralized: "查驗守軍已被擊倒",
      }[ledger.response.status] || ledger.response.status;
    return `<details class="field-results" open><summary>副本保管與原帳通行回條</summary><p>${sealed ? "密封託付 · 同一副本交南西奧林保管；原工作只收一次 10 旅費，已計入總額。" : "先公開一頁 · 同一副本張貼東側原公告欄，帳房具名見證；保管費用 0 旅費。"}</p><p>原帳一直由玩家背包保管，隨具名回條南撤。<br>批次 ${esc(ledger.receipt.batch)} · 回條 ${esc(ledger.receipt.id)} · 簽收者 ${sealed ? "奧林" : "帳房"}。守軍回應：${esc(response)}。</p><small>${result.replay ? "本次挑戰的保管紀錄，不改原故事、信任與旅費。" : "具名回條已隨安全撤離保存。"} 公示一頁不等於永久公開原帳；原帳的公開／封存仍依撤離時的選擇。本地流程不另發獎。</small></details>`;
  }
  const signal = result.signalFlow?.result;
  if (signal) {
    const channel = signal.localChoices.channel,
      endpoint =
        SIGNAL_FLOW["last-signal"].endpoints[signal.localChoices.endpoint];
    const response =
      {
        waiting: "未觸發",
        warned: "已展示追線預告",
        active: "既有守軍已開始查線",
        prevented: "查線已預防",
        cancelled: "追線支路切斷，查驗取消",
        neutralized: "查線守軍已被擊倒",
      }[signal.response.status] || signal.response.status;
    return `<details class="field-results" open><summary>奧林簽收的完整名單回條</summary><p>${channel === "public-dispatch" ? `公開驛線 · ${esc(endpoint?.title || "所選中繼")}；四人名單經本次回覆核對。` : "守軍停火線 · 調令傳送與同一信袋親送南側，兩件事均已完成。"}</p><p>M17：${signal.receipt.memberIds.map(esc).join("、")}，共四人。<br>本次訊息 ${esc(signal.receipt.messageId)} · 接線版本 ${signal.receipt.revision}。守軍回應：${esc(response)}；追線支路${signal.traceConnected ? "接通" : "已切斷"}。</p><small>${result.replay ? "本次挑戰的收件紀錄；不改原故事、信任與旅費。" : "具名回條已隨安全撤離保存。"} 本地收件不另加重複獎勵。</small></details>`;
  }
  const water = result.waterFlow?.result;
  if (water) {
    const response = {
      waiting: "未觸發",
      warned: "收到守橋查驗預告",
      active: "守橋查驗已啟動",
      prevented: "公開保證預防查驗",
      cancelled: "公開保證取消查驗",
      neutralized: "查驗守軍已被擊倒",
    }[water.response.status];
    return `<details class="field-results" open><summary>伊妮絲見證的五格供水回條</summary><p>診所 ${water.water.clinic} 格／住區 ${water.water.settlement} 格／礦場 ${water.water.mine} 格／維修旁通 ${water.water.bypass} 格。五格主供水已驗流與簽收。</p><p>${water.routeId === "west-ford" ? "保留旁通，西淺灘開啟；於西岸簽收。" : "民用加量，西淺灘關閉；經東橋簽收。"}<br>額外一桶備水：${water.reserve.choiceId === "keep-first-aid" ? "留在所選維修槽供現場治療" : "交給鎮上，原現場作業的旅費獎勵已計入總額"}。此桶獨立於五格主供水。</p><p>守軍回應：${esc(response)}。${water.guaranteePublished ? "最低供水保證已公開。" : "未公開最低供水保證。"}</p><small>${esc(NPCS.find((npc) => npc.id === water.receipt.witness)?.name || water.receipt.witness)}見證 · ${result.replay ? "本次挑戰紀錄，不改原水權故事" : "當日分流已保存；永久水權另按撤離時的選擇"}</small></details>`;
  }
  const flow = result.missionFlow?.result;
  if (!flow) return "";
  const response = {
    waiting: "未觸發",
    warned: "收到查驗呼叫",
    active: "查驗組已接近",
    suppressed: "通訊中斷，查驗暫停",
    prevented: "預防查驗",
    cancelled: "取消查驗",
    neutralized: "待命守軍已被擊倒",
  }[flow.response.status];
  return `<details class="field-results" open><summary>藥品交接回條</summary><p>診所 ${flow.allocation.clinic} 份／守軍醫護 ${flow.allocation.guard} 份。合計兩份已實際交付。</p><p>守軍回應：${esc(response)}；通訊${flow.communicationConnected ? "保持接通" : "已斷開"}。<br>搬運工${flow.workerSafe ? "已到安全處，貨棚捷徑開啟" : "未完成可選救助"}。核證修正 ${flow.verificationMistakes} 次。</p><small>${esc(flow.receipt.title)} · ${result.replay ? "本次挑戰紀錄，不改原故事" : "已隨安全撤離保存"}</small></details>`;
}
function fieldResultRows(result) {
  if (!result.fieldResults?.length) return "";
  const rows = result.fieldResults.map((row) => {
    if (result.pactFlow && row.taskId === "pact-cart") {
      const pact = result.pactFlow.result,
        stock = pact.cart.stock;
      return {
        ...row,
        label: PACT_FLOW["dawn-pact"].bays[pact.localChoices.siding].title,
        message: `同一礦車已完整進框並扣煞車；可交涉 ${stock.available} 發、已領 ${stock.issued} 發、掩體封存 ${stock.cover} 發，總共二十四發。`,
        tradeoff: stock.cover
          ? "六發封存作掩體，其餘物資保留交涉。"
          : "剩餘貨物保留交涉。",
      };
    }
    if (result.nightFlow) {
      const west = result.nightFlow.result.routeId === "west-ford";
      if (row.taskId === "night-route-plan")
        return {
          ...row,
          label: west ? "西側淺灘與末段便橋" : "東側岩脊開口",
          message: west
            ? "已量水選路；沿途遮蔽與原修橋台連動的末段便橋已實際通過。"
            : "已量水選路；三人經較直接但暴露的東側開口。",
          tradeoff: west
            ? "路線較長，有實際遮蔽。"
            : "路線較直接，須應對暴露開口。",
        };
      if (row.taskId === "night-brace")
        return {
          ...row,
          message: west
            ? "原斜撐兩端與試重均完成；連動西便橋已放平，不另設第二次修橋工作。"
            : "原斜撐兩端與試重均完成；本次選東側開口，不需開啟西便橋。",
          tradeoff: null,
        };
      if (row.taskId === "night-escort")
        return {
          ...row,
          label: "核對同三位家屬的南側到達",
          message:
            "羅絲、塔文、米洛已全部抵達；同一文件與具名到達回條直接承接南撤。",
          tradeoff: null,
        };
    }
    if (result.ledgerFlow) {
      const sealed =
        result.ledgerFlow.result.localChoices.custody === "sealed-courier";
      if (row.taskId === "ledger-carriage")
        return {
          ...row,
          title: "貨票與車牌互證",
          label: "核對同一原帳的貨運資料",
          message: "貨票與實際車牌已核對；原帳收入玩家可見背包並持續保管。",
          tradeoff: null,
        };
      if (row.taskId === "ledger-carbon")
        return {
          ...row,
          title: "付款壓痕與工名核證",
          label: "對齊複寫頁並讀取側光壓痕",
          message: "原付款人與同批次完整工名已互證；可據此要求守軍放行。",
          tradeoff: null,
        };
      if (row.taskId === "ledger-copy")
        return {
          ...row,
          title: "同一副本的保管交接",
          label: sealed ? "密封副本交南西奧林" : "原公告欄先公開一頁",
          message: sealed
            ? "副本親送南西信差箱；原帳仍由玩家背著。"
            : "同一副本在東側公告欄公示一頁，由帳房見證；原帳仍由玩家背著。",
          tradeoff: sealed
            ? "原現場工作已結算一次 10 旅費。"
            : "保管費用 0 旅費；既有守軍的查驗結果見具名回條。",
        };
    }
    if (result.waterFlow && row.taskId === "water-allocation")
      return {
        ...row,
        label: "完成三輪基準校正 2／2／1",
        message:
          "基準校正後已另行操作維修導流柄並驗流；最終分配見五格供水回條。",
        tradeoff: null,
      };
    if (!result.missionFlow) return row;
    if (row.taskId === "mail-switch")
      return {
        ...row,
        label: row.choiceId === "siding" ? "西側貨棚線" : "中央直線",
        message: "已親手扳定道岔，沿該運輸線將同一藥箱送入所選接收門。",
        tradeoff:
          row.choiceId === "siding"
            ? "外牆掩護；沒有開門警戒加成。"
            : "中央通道較暴露；開門提高警戒。",
      };
    if (row.taskId === "mail-unload")
      return {
        ...row,
        label: "實際交付兩份藥並收妥回條",
        message: "接收對象與實際分配已記在交接回條中。",
        tradeoff: null,
      };
    return row;
  });
  return `<details class="field-results"><summary>回顧三項現場決定 · ${result.replay ? "重玩不發放旅費" : `${result.fieldRewardDelta >= 0 ? "+" : ""}${result.fieldRewardDelta} 旅費已計入總額`}</summary>${rows.map((row) => `<h3>${esc(row.title)}</h3><p>${esc(row.label)}<br>${esc(row.message)}${row.tradeoff ? `<br><small>${esc(row.tradeoff)}</small>` : ""}</p>`).join("")}</details>`;
}
function ending() {
  const end = endingFor(profile);
  if (!end) return;
  mode = "ending";
  panel(
    `<p class="eyebrow">THE FRONTIER REMEMBERS</p><h2>${end.title}</h2><p>${end.summary}</p><div class="banner">公開結局條件：${end.rule}</div><div class="columns"><div>${end.outcomes.map((o) => `<h3>${o.title}</h3><p>${o.text}</p>`).join("")}</div><div>${NPCS.map((n) => `<h3>${n.name} · ${npcStance(profile, n.id)}</h3><p>${end.responses[n.id]}</p>`).join("")}</div></div><hr><p class="meta">${Object.entries(
      profile.choices,
    )
      .map(([key, v]) => {
        const m = MISSIONS.find((m) => m.choice?.key === key),
          o = m.choice.options.find((o) => o.id === v);
        return o.label;
      })
      .join(
        " → ",
      )}</p><p>六份委託已開放獨立重玩。比較命中、受傷、道具與非致命解法；故事與旅費保持不變。</p><div class="actions">${button("hub", "返回委託簿", "primary")}${button("journal", "回顧全部選擇")}</div>`,
  );
}
function journal() {
  previousMode = mode;
  mode = "journal";
  panel(
    `<p class="eyebrow">PUBLIC RECORD</p><h2>鎮上的人記得</h2>${profile.history.length ? profile.history.map((r) => `<h3>${r.title}</h3><p>${r.strategy === "nonlethal" ? "非致命協議" : "交戰取回"} · ${r.consequence}<br>${r.choiceConsequence || ""}</p>`).join("") : "<p>目前尚未完成委託。每次撤離成功後，實際後果會留在這裡。</p>"}<div class="actions">${button("hub", "回到委託簿", "primary")}</div>`,
  );
  const records = profile.history.filter((row) => row.fieldResults?.length);
  if (records.length)
    overlay
      .querySelector(".actions")
      .insertAdjacentHTML(
        "beforebegin",
        `<h3>現場作業的具體後果</h3>${records.map((row) => `<p>${esc(row.title)}</p>${fieldResultRows(row)}${missionResultRows(row)}`).join("")}`,
      );
}
function help() {
  const returnState = {
    parent: pauseReturn,
    mode,
    html: overlay.innerHTML,
    hidden: overlay.classList.contains("hidden"),
  };
  pauseReturn = returnState;
  mode = "help";
  panel(
    `<p class="eyebrow">FIELD GUIDE</p><h2>帶著選擇回到鎮上</h2><div class="columns"><div><dl class="control-list"><dt>WASD／方向鍵</dt><dd>沿螢幕方向移動</dd><dt>滑鼠／左鍵</dt><dd>瞄準／開火（按住可連射）</dd><dt>右鍵</dt><dd>精準瞄準；掩體中探頭</dd><dt>E</dt><dd>調查、談判、進出掩體、撤離</dd><dt>R／Space</dt><dd>換彈／翻越低掩體</dd><dt>Q／C · F</dt><dd>旋轉相機 · 使用一件補給</dd><dt>Esc</dt><dd>暫停與設定</dd></dl></div><div><p><b>和平：</b>完成三項 ⚙ 現場作業，找到三個青綠 ◆ 線索，靠近按 E，首章先與查驗哨兵核對分配提案，互助方案須用原接點傳達承諾，再向藥品接收者出示回條；第二章公開最低供水保證並由伊妮絲簽收；第三章完整送達四人名單，在南側奧林處讀回覆並簽收；第四章完整核證放行、交付同一副本，帶原帳與具名保管回條南撤。第五章持有效文件放行，護送同三人到南側核對到達回條。第六章在盤點台以安全離境與公開聽證換交械，核對同車物資並領地契回條。守軍倒下後，和平路線會關閉。</p><p><b>交戰：</b>先靠近掩體按 E。右鍵探頭、左鍵射擊；鬆開右鍵縮回。完成三項 ⚙ 現場作業並擊敗守軍後，前四章向實際接收者確認具名回條；第五章六敵全倒後仍須護送同三人抵達；第六章清場後仍須完整停車與盤點交接，地契收入背包後直接南撤。</p><p><b>首章：</b>提案可在交涉前重選；接受後才開對應庭院門。診所兩份只讓查驗者讓行，雙方各一份須保線傳達才讓其他哨位停止干預。同一接點可斷開或復接，守軍接續原查驗。搬運工可命令停等或跟隨；受前方射線威脅時會靠遮蔽物等候，可換路或解除威脅，救助仍是可選項。</p><p><b>第三章：</b>公開線只接兩個既有中繼之一，或原台發停火調令後搬同一信袋。地線或中繼改動會使舊回覆失效，須修復重送；南側真回覆紙與燈不可遠端讀取。搬運時雙手占用，先放下再換彈、開火或翻越。</p><p><b>第四章：</b>原帳核證後收入可見背包，持續隨身且不占雙手。同一副本可密封親送南西奧林，或到原公告欄公示一頁並由帳房見證；密封只收一次 10 旅費。公示查驗可用完整核證停止，清場後仍須交接。只有搬副本時占雙手；原帳永久公開或封存仍在撤離時決定。</p><p><b>第五章：</b>量水選西側有遮蔽的便橋路線，或東側較直接的暴露開口。選西線時，原修橋台試重完成即連動開橋。E 可讓隊伍停等；靠近停等家屬按 E 開面板，須在全三人各 6 公尺內才能續走，安全掩體可明確安排停等。中段塔洛的一次繞行有預告，出示同一份當日文件可預防／取消。三人都到南側後領回條直接撤離，不再北返取鈴；文件隨身不占雙手。</p><p><b>第六章：</b>南側電池箱可先選熄燈或完整保留；只切軍線保留水醫供應。原車二十四發，兩名既有守軍至多各領一次六發。推同一車至完整交涉側線，或封存六發作進攻掩體；整車進白框才扣煞車。E 可放手躲避，再靠近原車續推。兩策略均在盤點台由伊妮絲核對同車、地契及具名回條，最後南撤才選議會或守望官。</p><p><b>共同目標：</b>完成後回南側 ◇ 撤離。生命歸零可立即重試，物品與選擇回到出發前。</p><p><b>觸控：</b>左搖桿移動，右圓區拖曳設定射向。開火鍵會自動探頭，其他動作各有按鍵；上方可轉相機。</p><p class="meta">警戒者就地壓制；側翼者繞行且最多一名；近攻者在近距離較危險；狙擊以瞄線預告至少一秒。換位能中斷敵方射線。</p></div></div><div class="actions">${button("close-sheet", "明白，返回", "primary")}</div>`,
  );
  audio.pause();
}
function settingsPanel() {
  pauseReturn = {
    parent: pauseReturn,
    mode,
    html: overlay.innerHTML,
    hidden: overlay.classList.contains("hidden"),
  };
  mode = "settings";
  panel(
    `<p class="eyebrow">OPTIONS</p><h2>聲音與操作</h2><div class="settings columns"><div><label>配樂 <input type="range" min="0" max="1" step=".05" value="${settings.music}" data-setting="music"></label><label>音效 <input type="range" min="0" max="1" step=".05" value="${settings.sfx}" data-setting="sfx"></label><p class="meta">設為 0 即靜音，偏好保存在此瀏覽器。</p></div><div>${[
      ["assist", "瞄準輔助"],
      ["slowAim", "瞄準時放慢世界"],
      ["reduced", "減少動態"],
      ["low", "低畫質（關閉動態陰影）"],
    ]
      .map(
        ([key, label]) =>
          `<label>${label}<input type="checkbox" data-setting="${key}" ${settings[key] ? "checked" : ""}></label>`,
      )
      .join(
        "",
      )}</div></div><div class="actions">${button("close-sheet", "儲存並返回", "primary")}${button("reset-confirm", "重設故事進度", "danger")}</div>`,
  );
  audio.pause();
}
function closeSheet() {
  lastTime = 0;
  const saved = pauseReturn;
  pauseReturn = saved?.parent || null;
  if (!saved) {
    showHub();
    return;
  }
  mode = saved.mode;
  overlay.innerHTML = saved.html;
  overlay.classList.toggle("hidden", saved.hidden);
  overlay.classList.toggle("field-view", mode === "field");
  document.body.classList.toggle("field-view", mode === "field");
  if (mode !== "paused") audio.resume();
  clearInputs();
}
function pause() {
  if (["loading", "title", "paused", "help", "settings"].includes(mode)) return;
  previousMode = mode;
  pauseReturn = {
    mode,
    html: overlay.innerHTML,
    hidden: overlay.classList.contains("hidden"),
  };
  mode = "paused";
  audio.pause();
  bridge.state("paused");
  panel(
    `<p class="eyebrow">THE DUST CAN WAIT</p><h2>旅程暫停</h2><p>戰場、射線與消耗已暫停。任務只在出發前與返回鎮上保存，重載會回安全入口。</p><div class="actions">${button("resume", "繼續", "primary")}${button("help", "操作說明")}${button("settings", "設定")}${run && profile.activeRun ? button("retry-confirm", "重試本委託") : ""}${run && profile.activeRun ? button("abandon", "還原並回鎮上") : button("hub", "回到委託簿")}</div>`,
  );
}
function resume() {
  if (mode !== "paused") return;
  closeSheet();
  bridge.state("running");
  audio.resume();
}
function failure(reason) {
  if (done || mode !== "playing") return;
  mode = "dead";
  $("hp").textContent = "0";
  $("hp-fill").style.width = "0%";
  audio.play("hurt");
  clearInputs();
  world.animate(player, "down");
  panel(
    `<p class="eyebrow">A ROAD YOU CAN TAKE AGAIN</p><h2>倒在荒塵裡</h2><p>${reason}</p><div class="banner">任務前快照完整保留：旅費、選擇與物品不會被倒扣。換一條路、利用掩體或帶上繃帶再試。</div><div class="actions">${button("retry", "立即重試", "primary")}${button("abandon", "回鎮上換裝備")}</div>`,
  );
}
function handsOccupied() {
  return Boolean(field?.handsOccupied || missionSystem?.handsOccupied);
}
function constrainedPlayerStep(previous, dx, dz) {
  const proposed = { x: previous.x + dx, z: previous.z + dz };
  const limited =
    missionSystem?.constrainMove?.(previous, proposed) || proposed;
  const moved = moveCircle(
    previous,
    limited.x - previous.x,
    limited.z - previous.z,
    world.colliders,
  );
  const constrained = field?.constrainMovement(previous, moved) || moved;
  // Axis sliding must not stretch the signal tether. Do not introduce a second
  // diagonal collision path after sliding: an invalid end point stays at previous.
  const verified =
    missionSystem?.constrainMove?.(previous, constrained) || constrained;
  return Math.hypot(verified.x - constrained.x, verified.z - constrained.z) <=
    1e-8
    ? constrained
    : { x: previous.x, z: previous.z };
}
function reloadWeapon() {
  if (
    mode !== "playing" ||
    handsOccupied() ||
    reload > 0 ||
    ammo === weapon.magazine ||
    reserve <= 0
  )
    return;
  reload = weapon.reload;
  stats.reloads++;
  audio.play("reload");
  world.animate(player, "reload");
}
function vault() {
  if (mode !== "playing" || vaultMotion || field?.traversal || handsOccupied())
    return;
  const box =
    cover ||
    world.colliders.find(
      (b) => b.vaultable && coverDistance(player.position, b) < 0.9,
    );
  if (!box || !box.vaultable) {
    toast("只能翻越身旁的低掩體。高箱請從兩側繞過。");
    return;
  }
  const p = player.position;
  const dx = p.x - box.x,
    dz = p.z - box.z;
  const candidate = { x: p.x, z: p.z };
  if (Math.abs(dx) / (box.w / 2) > Math.abs(dz) / (box.d / 2))
    candidate.x = box.x - Math.sign(dx) * (box.w / 2 + 0.55);
  else candidate.z = box.z - Math.sign(dz) * (box.d / 2 + 0.55);
  if (
    world.colliders.some((b) => b !== box && coverDistance(candidate, b) < 0.4)
  ) {
    toast("另一側空間不足。");
    return;
  }
  vaultMotion = {
    from: { x: p.x, z: p.z },
    to: candidate,
    time: 0,
    duration: 0.55,
    height: box.h + 0.16,
  };
  cover = null;
  audio.play("step");
  toast("翻越時會離開掩護，留意新的射線方向。");
}
function useItem() {
  if (mode !== "playing" || itemUsed) return;
  if (run.item === "medkit") {
    if (hp >= 100) {
      toast("生命充足，繃帶保留。");
      return;
    }
    const restored = Math.min(100 - hp, bonuses.medkitHeal);
    hp += restored;
    toast(`繃帶：恢復 ${restored} 生命。`);
  } else {
    smoke = bonuses.smokeSeconds;
    enemies.forEach((e) => {
      if (e.actor.position.distanceTo(player.position) < 14) {
        e.windup = 0;
        e.alert = 0;
      }
    });
    toast(`煙罐：附近守軍失去你的方位 ${bonuses.smokeSeconds} 秒。`);
  }
  itemUsed = true;
  stats.itemsUsed++;
  audio.play("ui");
}
function muzzle(entity, isPlayer = false) {
  const p = entity.position;
  let x = p.x,
    z = p.z,
    y =
      (p.y || 0) +
      ((isPlayer && cover && !aiming && !firing) ||
      (!isPlayer && entity.state === "cover")
        ? 0.55
        : 1.35);
  if (isPlayer && cover && (aiming || firing)) {
    if (cover.h <= 1.25) y = 1.65;
    else {
      const dx = p.x - cover.x,
        dz = p.z - cover.z;
      if (Math.abs(dx) / (cover.w / 2) > Math.abs(dz) / (cover.d / 2))
        z = cover.z + (aimPoint.z > cover.z ? 1 : -1) * (cover.d / 2 + 0.43);
      else x = cover.x + (aimPoint.x > cover.x ? 1 : -1) * (cover.w / 2 + 0.43);
      y = 1.35;
    }
  }
  return { x, y, z };
}
function shoot() {
  if (vaultMotion || handsOccupied()) return;
  if (secured && strategy === "nonlethal") return;
  if (mode !== "playing" || cooldown > 0 || reload > 0) return;
  if (ammo <= 0) {
    reloadWeapon();
    return;
  }
  ammo--;
  cooldown = weapon.interval;
  stats.shots++;
  audio.play(run.weapon);
  const origin = muzzle(player, true);
  let target = {
    x: aimPoint.x,
    y: aimPoint.y > 0 ? aimPoint.y : 1.05,
    z: aimPoint.z,
  };
  if (settings.assist) {
    const dx = target.x - origin.x,
      dz = target.z - origin.z,
      len = Math.hypot(dx, dz);
    let best = null,
      bestDot = 0.94;
    for (const e of enemies.filter((e) => e.hp > 0)) {
      const ex = e.actor.position.x - origin.x,
        ez = e.actor.position.z - origin.z,
        d = Math.hypot(ex, ez),
        dot = (dx * ex + dz * ez) / (len * d);
      if (
        dot > bestDot &&
        d < weapon.range &&
        !world.trace(origin, {
          x: e.actor.position.x,
          y: e.actor.state === "cover" ? 0.55 : 1.05,
          z: e.actor.position.z,
        })
      ) {
        best = e;
        bestDot = dot;
      }
    }
    if (best)
      target = {
        x: best.actor.position.x,
        y: best.actor.state === "cover" ? 0.55 : 1.05,
        z: best.actor.position.z,
      };
  }
  const angle =
    Math.atan2(target.x - origin.x, target.z - origin.z) +
    Math.sin(stats.shots * 17.1) * weapon.spread * (aiming ? 0.3 : 1);
  const distance = Math.min(
    weapon.range,
    Math.hypot(target.x - origin.x, target.z - origin.z) + 2,
  );
  const endpoint = {
    x: origin.x + Math.sin(angle) * distance,
    y: target.y,
    z: origin.z + Math.cos(angle) * distance,
  };
  const enemyBoxes = enemies
    .filter((e) => e.hp > 0)
    .map((e) => ({
      ...makeBox(
        e.id,
        e.actor.position.x,
        e.actor.position.z,
        0.85,
        e.actor.colliderHeight,
        0.85,
      ),
      enemy: e,
    }));
  const hit = world.trace(origin, endpoint, enemyBoxes);
  let end = endpoint;
  if (hit) {
    const total = Math.hypot(
        endpoint.x - origin.x,
        endpoint.y - origin.y,
        endpoint.z - origin.z,
      ),
      ratio = hit.distance / total;
    end = {
      x: origin.x + (endpoint.x - origin.x) * ratio,
      y: origin.y + (endpoint.y - origin.y) * ratio,
      z: origin.z + (endpoint.z - origin.z) * ratio,
    };
    if (hit.box.enemy) {
      const e = hit.box.enemy;
      e.hp -= weapon.damage;
      stats.hits++;
      e.suppressed = 1.7;
      e.engaged = true;
      audio.play("hit");
      if (e.hp <= 0) {
        stats.kills++;
        missionSystem?.defeated(e.id);
        world.animate(e.actor, "down");
        toast(`守軍倒下 · ${enemies.filter((n) => n.hp > 0).length} 人仍在場`);
      }
    } else audio.play("stone");
  }
  world.tracer(origin, end);
  enemies.forEach((e) => {
    if (e.hp > 0) e.alert = Math.max(e.alert, 5);
  });
}
function updateEnemies(dt) {
  let flankerActive = false;
  for (const e of enemies) {
    if (e.hp <= 0) continue;
    if (missionSystem?.controlEnemy(e, dt)) continue;
    const p = e.actor.position,
      pp = player.position,
      dist = Math.hypot(p.x - pp.x, p.z - pp.z);
    e.timer -= dt;
    e.suppressed = Math.max(0, e.suppressed - dt);
    const to = muzzle(player, true),
      from = muzzle(e.actor);
    const visible = !world.trace(from, to);
    e.alert = Math.max(0, e.alert - dt * 0.2);
    if (
      (dist < fieldEffects.detectionRadius || fieldEffects.exposure > 0) &&
      visible
    )
      e.alert = 5;
    if (secured || (smoke > 0 && dist < 14)) {
      e.windup = 0;
      e.state = "retreat";
      world.animate(e.actor, "idle");
      continue;
    }
    if (e.rounds <= 0) {
      e.state = "out-of-ammo";
      e.windup = 0;
      world.animate(e.actor, "cover");
      continue;
    }
    if (e.reloading > 0) {
      e.reloading = Math.max(0, e.reloading - dt);
      e.state = "reload";
      world.animate(e.actor, "reload");
      if (e.reloading === 0)
        e.magazine = Math.min(e.type === "sniper" ? 4 : 6, e.rounds);
      continue;
    }
    if (e.magazine <= 0) {
      e.reloading = 2.4;
      e.windup = 0;
      continue;
    }
    if (e.alert <= 0) {
      e.state = "patrol";
      const tx = e.start[0] + Math.sin(elapsed * 0.3 + e.heading) * 1.5,
        tz = e.start[1] + Math.cos(elapsed * 0.3 + e.heading) * 1.5;
      moveEnemy(e, tx, tz, 0.65, dt);
      continue;
    }
    p.y = 0;
    e.actor.object.rotation.y = Math.atan2(pp.x - p.x, pp.z - p.z);
    if (e.windup <= 0 || e.suppressed > 0) {
      const tactical = updateEnemyTactics(
        e.tactics,
        {
          id: e.id,
          type: e.type,
          position: p,
          threat: pp,
          underFire: e.engaged === true,
          suppressed: e.suppressed,
          rounds: e.rounds,
          enabled: true,
          now: elapsed,
          colliders: world.colliders,
          radius: 0.38,
          bounds: 23,
        },
        {
          trace: (a, b) => world.trace(a, b),
          moveCircle,
          planPath: planTacticalPath,
        },
      );
      e.tactics = tactical.state;
      if (tactical.announcement) {
        // A movement cue; firing still requires the separate 0.95/1.25s aim line.
        e.tacticalWarning = 0.25;
        toast(tactical.announcement.text);
        audio.play("warning");
      }
      e.tacticalWarning = Math.max(0, e.tacticalWarning - dt);
      if (tactical.movement) {
        e.windup = 0;
        e.state = e.tacticalWarning > 0 ? "cover-warning" : "cover-transfer";
        if (e.tacticalWarning > 0) world.animate(e.actor, "cover");
        else {
          const target = tactical.movement.waypoint;
          moveEnemy(e, target.x, target.z, 1.6, dt);
        }
        continue;
      }
      if (
        !visible &&
        ["at-cover", "already-covered"].includes(tactical.reason)
      ) {
        e.state = "cover";
        e.windup = 0;
        world.animate(e.actor, "cover");
        continue;
      }
    }
    if (e.suppressed > 0) {
      e.state = "suppressed";
      e.windup = 0;
      world.animate(e.actor, "cover");
      continue;
    }
    if (e.windup > 0) {
      e.state = "telegraph";
      world.animate(e.actor, `aim-${e.actor.weapon}`);
    } else if (e.type === "flanker" && !flankerActive) {
      flankerActive = true;
      e.state = "flank";
      if (dist > 7) {
        const side = e.start[0] < 0 ? -1 : 1;
        moveEnemy(e, pp.x + side * 6, pp.z + 2, 1.6, dt);
        if (elapsed - warningAt > 6) {
          warningAt = elapsed;
          toast(`↔ 側翼腳步：${side < 0 ? "西側" : "東側"}有人正在繞行`);
          audio.play("warning");
        }
      }
    } else if (e.type === "shotgun" && dist > 7) {
      e.state = "advance";
      moveEnemy(e, pp.x, pp.z, 1.5, dt);
    } else if (!visible && e.type === "guard") {
      e.state = "cover";
      world.animate(e.actor, "cover");
    } else {
      e.state = "aim";
      world.animate(e.actor, `aim-${e.actor.weapon}`);
    }
    if (e.windup > 0) {
      e.windup -= dt;
      const locked = e.aimTarget || to;
      world.tracer(from, locked, e.type === "sniper" ? 0xf9bf65 : 0xd8956b);
      if (e.windup <= 0) {
        const playerBox = makeBox(
          "player",
          to.x,
          to.z,
          0.7,
          player.colliderHeight,
          0.7,
        );
        playerBox.min.y = player.position.y;
        playerBox.max.y += player.position.y;
        const shot = world.trace(from, locked, [playerBox]);
        const canHit = shot?.box?.id === "player";
        audio.play("enemy", { distance: dist, occluded: !visible });
        e.shotCount++;
        e.rounds--;
        e.magazine--;
        if (canHit && dist < enemyWeaponRange(e.type)) {
          const damage =
            e.type === "sniper" ? 24 : e.type === "shotgun" ? 18 : 9;
          const received = Math.min(hp, damage);
          hp -= received;
          stats.damageTaken += received;
          hurt = 0.25;
          audio.play("hurt");
          if (hp <= 0) {
            failure(
              "你暴露在敵人的射線裡。靠近掩體按 E，等敵方瞄線結束再探頭或轉移。",
            );
            return;
          }
        }
        e.timer = e.type === "sniper" ? 4.5 : e.type === "shotgun" ? 2.5 : 2.8;
      }
    } else if (visible && dist < enemyWeaponRange(e.type) && e.timer <= 0) {
      e.windup = e.type === "sniper" ? 1.25 : 0.95;
      const spread = e.type === "sniper" ? 0.08 : 0.22;
      e.aimTarget = {
        x: to.x + Math.sin((e.shotCount + 1) * 13.7 + e.heading) * spread,
        y: to.y,
        z: to.z + Math.cos((e.shotCount + 1) * 9.1 + e.heading) * spread,
      };
      e.state = "telegraph";
      if (e.type === "sniper") {
        audio.play("warning");
        toast("狙擊瞄線：立刻縮回掩體或換位。");
      }
    }
  }
}
function moveEnemy(e, x, z, speed, dt) {
  const p = e.actor.position,
    dx = x - p.x,
    dz = z - p.z,
    length = Math.hypot(dx, dz);
  if (length > 0.025) {
    const amount = Math.min(length, speed * Math.max(0, dt));
    const steps = Math.max(1, Math.ceil(amount / 0.1));
    for (let i = 0; i < steps; i++) {
      const next = moveCircle(
        p,
        ((dx / length) * amount) / steps,
        ((dz / length) * amount) / steps,
        world.colliders,
        0.38,
      );
      p.x = next.x;
      p.z = next.z;
    }
    e.actor.object.rotation.y = Math.atan2(dx, dz);
    world.animate(e.actor, "walk");
  } else world.animate(e.actor, "idle");
}
function movement(dt) {
  if (vaultMotion) {
    vaultMotion.time += dt;
    const t = Math.min(1, vaultMotion.time / vaultMotion.duration);
    player.position.x = THREE.MathUtils.lerp(
      vaultMotion.from.x,
      vaultMotion.to.x,
      t,
    );
    player.position.z = THREE.MathUtils.lerp(
      vaultMotion.from.z,
      vaultMotion.to.z,
      t,
    );
    player.position.y = Math.sin(Math.PI * t) * vaultMotion.height;
    world.animate(player, "cover");
    if (t === 1) {
      player.position.y = 0;
      vaultMotion = null;
    }
    return;
  }
  let x =
      (keys.has("KeyD") || keys.has("ArrowRight") ? 1 : 0) -
      (keys.has("KeyA") || keys.has("ArrowLeft") ? 1 : 0) +
      joystick.x,
    z =
      (keys.has("KeyS") || keys.has("ArrowDown") ? 1 : 0) -
      (keys.has("KeyW") || keys.has("ArrowUp") ? 1 : 0) +
      joystick.y;
  const length = Math.hypot(x, z);
  if (length > 1) {
    x /= length;
    z /= length;
  }
  const a = Math.PI / 4 + (world.cameraIndex * Math.PI) / 2;
  const dx = x * Math.cos(a) + z * Math.sin(a),
    dz = -x * Math.sin(a) + z * Math.cos(a);
  const speed = (cover ? 1.8 : aiming ? 3.2 : 5) * fieldSpeed;
  const constrained = constrainedPlayerStep(
    player.position,
    dx * speed * dt,
    dz * speed * dt,
  );
  player.position.x = constrained.x;
  player.position.z = constrained.z;
  if (cover && coverDistance(player.position, cover) > 1.3) cover = null;
  if (touch) {
    const tx = touchAim.x * Math.cos(a) + touchAim.y * Math.sin(a),
      tz = -touchAim.x * Math.sin(a) + touchAim.y * Math.cos(a);
    aimPoint.set(player.position.x + tx * 15, 0, player.position.z + tz * 15);
  }
  if (mode === "playing")
    player.object.rotation.y = Math.atan2(
      aimPoint.x - player.position.x,
      aimPoint.z - player.position.z,
    );
  else if (length > 0.1) player.object.rotation.y = Math.atan2(dx, dz);
  if (player.visual) {
    const peek = muzzle(player, true);
    player.object.updateMatrixWorld();
    const local = player.object.worldToLocal(
      new THREE.Vector3(peek.x, 0, peek.z),
    );
    player.visual.position.x = local.x;
    player.visual.position.z = local.z;
  }
  const animation =
    hurt > 0 && !cover
      ? "hurt"
      : reload > 0
        ? "reload"
        : cover
          ? aiming || firing
            ? cover.h <= 1.25
              ? "peek"
              : `aim-${run?.weapon || "revolver"}`
            : "cover"
          : length > 0.1
            ? "walk"
            : aiming || firing
              ? `aim-${run?.weapon || "revolver"}`
              : "idle";
  world.animate(player, animation);
  player.object.position.y = 0;
  if (handsOccupied() && player.weaponModel) player.weaponModel.visible = false;
  else if (player.weaponModel) player.weaponModel.visible = true;
  if (length > 0.1) {
    stepTime += dt;
    if (stepTime > 0.38) {
      stepTime = 0;
      audio.play("step");
    }
  }
}
function measureWorldLabel(label, maxWidth) {
  const text = String(label.text ?? ""),
    size = label.enemy ? 11 : 12,
    lineHeight = label.enemy ? 15 : 16,
    font = `700 ${size}px "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif`,
    fontState =
      typeof document === "undefined" ? "fallback" : document.fonts?.status;
  if (!measureWorldLabel.cache || measureWorldLabel.fontState !== fontState) {
    measureWorldLabel.cache = new Map();
    measureWorldLabel.fontState = fontState;
  }
  const key = `${font}|${maxWidth}|${text}`;
  let measured = measureWorldLabel.cache.get(key);
  if (!measured) {
    const context = (measureWorldLabel.context ??=
      typeof document === "undefined"
        ? null
        : document.createElement("canvas").getContext("2d"));
    if (context) context.font = font;
    const width = (value) =>
        context
          ? context.measureText(value).width
          : Array.from(value).length * size * 1.2,
      available = Math.max(1, maxWidth - 4),
      chars = Array.from(text),
      lines = [];
    let start = 0;
    while (start < chars.length) {
      let low = 1,
        high = chars.length - start;
      while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        if (width(chars.slice(start, start + mid).join("")) <= available)
          low = mid;
        else high = mid - 1;
      }
      lines.push(chars.slice(start, start + low).join(""));
      start += low;
    }
    if (!lines.length) lines.push("");
    measured = {
      lines,
      width: Math.ceil(Math.max(...lines.map(width))) + 4,
      lineHeight,
    };
    if (measureWorldLabel.cache.size >= 128) measureWorldLabel.cache.clear();
    measureWorldLabel.cache.set(key, measured);
  }
  const barWidth = label.enemy
    ? Math.min(36, Math.max(0, Number(label.hp) || 0) * 0.3)
    : 0;
  return {
    ...measured,
    width: Math.max(measured.width, barWidth),
    height: measured.lines.length * lineHeight + (label.enemy ? 8 : 0),
    barWidth,
  };
}
function layoutWorldLabels(items, width, height, reserved = []) {
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 12 ||
    height <= 12
  )
    return [];
  const margin = 6,
    gap = 5,
    placed = [],
    clamp = (n, low, high) => Math.max(low, Math.min(high, n)),
    overlaps = (a, b) =>
      a.x < b.x + b.width + gap &&
      a.x + a.width + gap > b.x &&
      a.y < b.y + b.height + gap &&
      a.y + a.height + gap > b.y;
  // Keep the player's identity attached to their head, then reserve enemy
  // health bars. Other labels use nearby free space and a leader.
  const ordered = items
    .map((item, index) => ({ ...item, index }))
    .sort(
      (a, b) =>
        Number(Boolean(b.player)) - Number(Boolean(a.player)) ||
        Number(Boolean(b.enemy)) - Number(Boolean(a.enemy)) ||
        a.index - b.index,
    );
  for (const item of ordered) {
    const a = item.anchor,
      w = item.width,
      h = item.height;
    if (
      ![a.x, a.y, w, h].every(Number.isFinite) ||
      w <= 0 ||
      h <= 0 ||
      a.x < 0 ||
      a.x > width ||
      a.y < 0 ||
      a.y > height ||
      w > width - margin * 2 ||
      h > height - margin * 2
    )
      continue;
    const candidates = [],
      seen = new Set(),
      add = (x, y) => {
        if (candidates.length >= 256) return;
        x = clamp(Math.round(x), margin, width - margin - w);
        y = clamp(Math.round(y), margin, height - margin - h);
        const key = `${x}:${y}`;
        if (seen.has(key)) return;
        seen.add(key);
        candidates.push({
          x,
          y,
          width: w,
          height: h,
          cost: (x + w / 2 - a.x) ** 2 + (y + h - a.y) ** 2,
        });
      };
    add(a.x - w / 2, a.y - h);
    const obstacles = [...reserved, ...placed].filter((p) => [p.x, p.y, p.width, p.height].every(Number.isFinite) && p.width > 0 && p.height > 0),
      clear = (c) => !obstacles.some((p) => overlaps(c, p)),
      nearest = () => {
        candidates.sort((a, b) => a.cost - b.cost || b.y - a.y || a.x - b.x);
        return candidates.find(clear);
      };
    let rect = clear(candidates[0]) ? candidates[0] : null;
    if (!rect) {
      // Edges of occupied rectangles give close, deterministic alternatives.
      for (const p of obstacles) {
        add(a.x - w / 2, p.y + p.height + gap);
        add(a.x - w / 2, p.y - gap - h);
        add(p.x - gap - w, a.y - h);
        add(p.x + p.width + gap, a.y - h);
        // Near a HUD edge a legal adjacent slot may require both axes to move.
        add(p.x - gap - w, p.y + p.height + gap);
        add(p.x + p.width + gap, p.y + p.height + gap);
        add(p.x - gap - w, p.y - gap - h);
        add(p.x + p.width + gap, p.y - gap - h);
      }
      rect = nearest();
    }
    if (!rect) {
      // Bounded shelf fallback handles dense clusters without a relaxation loop.
      for (
        let y = margin;
        y + h <= height - margin && candidates.length < 256;
        y += h + gap
      )
        for (
          let x = margin;
          x + w <= width - margin && candidates.length < 256;
          x += w + gap
        )
          add(x, y);
      rect = nearest();
    }
    // A physically full viewport cannot fit every label; never overprint a reserved health bar.
    if (!rect) continue;
    placed.push({
      ...item,
      ...rect,
      leader: Math.hypot(rect.x + w / 2 - a.x, rect.y + h - a.y) > 2,
    });
  }
  return placed.sort((a, b) => a.index - b.index);
}
// Geometry is measured only in ResizeObserver's post-layout delivery. Rendering
// reads this cache; text, visibility and viewport changes do not read layout.
function createHudLayoutCache(doc, win) {
  const ids = ["hud", "objective", "combat-hud", "move-pad", "aim-pad", "touch-interact", "touch-reload", "touch-vault", "touch-item", "touch-fire", "toast", "context"],
    entries = ids.map((id) => ({ id, element: doc.getElementById(id), offset: { x: 0, y: 0 }, rect: null })).filter((e) => e.element),
    canvas = doc.getElementById("world");
  const cache = { entries, revision: 0, closed: false, dirty: true };
  const invalidate = () => {
    if (cache.closed) return;
    cache.dirty = true; cache.revision++;
    // Request a fresh post-layout delivery even if a text/class change keeps
    // the same dimensions. Do not force a synchronous layout to refresh it.
    if (canvas) { observer.unobserve(canvas); observer.observe(canvas); }
  };
  const measure = () => {
    if (cache.closed) return;
    const origin = canvas?.getBoundingClientRect() || { left: 0, top: 0 };
    // Batch every read before any notification/label write.
    const next = entries.map((entry) => {
      const r = entry.element.getBoundingClientRect();
      return { x: r.left - origin.left - entry.offset.x, y: r.top - origin.top - entry.offset.y, width: r.width, height: r.height };
    });
    entries.forEach((entry, i) => { entry.rect = next[i]; });
    cache.dirty = false; cache.revision++;
    cache.onMeasure?.(); // All DOM reads above are finished before these writes.
  };
  const observer = new win.ResizeObserver(measure);
  for (const entry of entries) observer.observe(entry.element);
  if (canvas) observer.observe(canvas); // Height-only resize also changes bottom/center anchors.
  win.addEventListener("resize", invalidate);
  cache.invalidate = invalidate;
  cache.snapshot = () => {
    if (cache.closed || doc.body?.classList.contains("field-view")) return { fixed: [], notices: [] };
    const fixed = [], notices = [];
    for (const entry of entries) {
      const r = entry.rect;
      if (!r || r.width <= 0 || r.height <= 0) continue;
      if (entry.id === "toast" && !entry.element.classList.contains("show")) continue;
      if (["context", "objective"].includes(entry.id) && !entry.element.textContent) continue;
      if (entry.id === "combat-hud" && entry.element.style.display === "none") continue;
      if (/^(move-pad|aim-pad|touch-)/.test(entry.id) && !doc.body?.classList.contains("touch")) continue;
      if (["toast", "context"].includes(entry.id)) notices.push({ ...r, id: entry.id });
      else fixed.push({ ...r });
    }
    return { fixed, notices };
  };
  cache.apply = (placed) => {
    for (const entry of entries.filter((e) => ["toast", "context"].includes(e.id))) {
      const p = placed.find((r) => r.id === entry.id), r = entry.rect;
      if (!p || !r) continue;
      const offset = { x: p.x - r.x, y: p.y - r.y };
      if (offset.x !== entry.offset.x || offset.y !== entry.offset.y) {
        entry.element.style.translate = offset.x + "px " + offset.y + "px";
        entry.offset = offset;
      }
    }
  };
  cache.dispose = () => { cache.closed = true; cache.onMeasure = null; observer.disconnect(); win.removeEventListener("resize", invalidate); };
  return cache;
}
function hudLayoutCache() {
  if (typeof document === "undefined" || typeof window === "undefined" || !window.ResizeObserver) return null;
  return (hudLayoutCache.value ??= createHudLayoutCache(document, window));
}
function setHudText(id, text) {
  const target = $(id);
  if (target.textContent === text) return;
  target.textContent = text;
  hudLayoutCache.value?.invalidate();
}
function projectActorReservations(actors, camera, width, height) {
  const cache = (projectActorReservations.cache ??= new WeakMap()), result = [];
  for (const actor of actors || []) {
    if (!actor.object || actor.object.visible === false || actor.visual?.visible === false || !actor.position) continue;
    const visualRoot = actor.visual || actor.object;
    let bounds = cache.get(actor);
    if (!bounds) {
      // UI-only conservative envelope, sampled once per actor. It never changes
      // gameplay colliders and does not traverse the animated hierarchy per HUD tick.
      actor.object.updateWorldMatrix(true, false);
      // SkinnedMesh refreshes bindMatrixInverse in updateMatrixWorld, not in
      // updateWorldMatrix. The first HUD can run before the first render.
      actor.object.updateMatrixWorld(true);
      const inverse = visualRoot.matrixWorld.clone().invert();
      // Sample current vertices once; do not reuse a skinned boundingBox that
      // another CPU query may have cached before the bind matrices were ready.
      bounds = actor.visual ? new THREE.Box3().setFromObject(actor.visual, true).applyMatrix4(inverse) : new THREE.Box3();
      const height = Math.max(1.85, actor.colliderHeight || 0);
      bounds.union(new THREE.Box3(new THREE.Vector3(-.54, 0, -.54), new THREE.Vector3(.54, height + .2, .54)).applyMatrix4(actor.object.matrixWorld).applyMatrix4(inverse));
      bounds.expandByScalar(.12);
      cache.set(actor, bounds);
    }
    visualRoot.updateWorldMatrix(true, false);
    const projected = [];
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      const p = new THREE.Vector3(x, y, z).applyMatrix4(visualRoot.matrixWorld).project(camera);
      projected.push(p);
    }
    if (projected.every((p) => p.z < -1) || projected.every((p) => p.z > 1)) continue;
    const xs = projected.map((p) => (p.x * .5 + .5) * width), ys = projected.map((p) => (-p.y * .5 + .5) * height);
    const x = Math.min(...xs), y = Math.min(...ys), right = Math.max(...xs), bottom = Math.max(...ys);
    if (![x, y, right, bottom].every(Number.isFinite) || right < 0 || bottom < 0 || x > width || y > height) continue;
    result.push({ x, y, width: right - x, height: bottom - y, actor });
  }
  return result;
}
function labelLeaderReservations(labels) {
  return labels.filter((label) => label.leader).map((label) => {
    const x = Math.max(label.x, Math.min(label.x + label.width, label.anchor.x)),
      y = Math.max(label.y, Math.min(label.y + label.height, label.anchor.y)),
      padding = 2;
    return { x: Math.min(x, label.anchor.x) - padding, y: Math.min(y, label.anchor.y) - padding,
      width: Math.abs(x - label.anchor.x) + padding * 2, height: Math.abs(y - label.anchor.y) + padding * 2 };
  });
}
function layoutHudNotifications(notices, width, height, fixed, actors) {
  const items = notices.map((n) => ({ ...n, anchor: { x: n.x + n.width / 2, y: n.y + n.height } }));
  const placed = [];
  for (const item of items) {
    let rect = layoutWorldLabels([item], width, height, [...fixed, ...actors, ...placed])[0];
    // In an overfull viewport keep the notice readable and fixed HUD clear even
    // when avoiding every body is physically impossible. Never shrink its text.
    rect ||= layoutWorldLabels([item], width, height, [...fixed, ...placed])[0];
    if (rect) placed.push(rect);
    else placed.push({ ...item, x: Math.max(6, Math.min(width - item.width - 6, item.x)), y: Math.max(6, Math.min(height - item.height - 6, item.y)), limited: true });
  }
  return placed;
}
function renderWorldLabels(labels) {
  const viewport = (renderWorldLabels.viewport ??= new THREE.Vector2());
  world.renderer.getSize(viewport); // Renderer CSS size; no DOM geometry read after HUD writes.
  const width = viewport.x,
    height = viewport.y,
    maxWidth = Math.max(1, Math.min(280, width - 12));
  const projected = labels
    .map((label) => {
      const p = new THREE.Vector3(
        label.position.x,
        label.position.y ?? 1.8,
        label.position.z,
      ).project(world.camera);
      return {
        ...label,
        ...measureWorldLabel(label, maxWidth),
        anchor: {
          x: (p.x * 0.5 + 0.5) * width,
          y: (-0.5 * p.y + 0.5) * height,
        },
        depth: p.z,
      };
    })
    .filter((label) => label.depth >= -1 && label.depth <= 1);
  const cache = hudLayoutCache(), hud = cache?.snapshot() || { fixed: [], notices: [] },
    actorBoxes = projectActorReservations(world.actors, world.camera, width, height),
    placed = layoutWorldLabels(projected, width, height, [...hud.fixed, ...actorBoxes]),
    // Names and their original-anchor leaders remain legible before notices move.
    labelReservations = [...placed, ...labelLeaderReservations(placed)],
    notices = layoutHudNotifications(hud.notices, width, height, [...hud.fixed, ...labelReservations], actorBoxes),
    reserved = [...hud.fixed, ...notices, ...actorBoxes];
  if (cache) cache.onMeasure = () => renderWorldLabels(labels);
  cache?.apply(notices);
  const key = JSON.stringify([
      reserved.map((r) => [r.x, r.y, r.width, r.height].map((n) => Number(n.toFixed(1)))),
      width,
      height,
      projected.map((l) => [
        l.text,
        l.lines,
        l.enemy,
        l.player,
        l.barWidth,
        l.width,
        l.height,
        l.anchor.x.toFixed(1),
        l.anchor.y.toFixed(1),
      ]),
    ]),
    target = $("labels");
  if (renderWorldLabels.key === key && renderWorldLabels.target === target)
    return;
  const leaders = placed
      .filter((l) => l.leader)
      .map((l) => {
        const x = Math.max(l.x, Math.min(l.x + l.width, l.anchor.x)),
          y = Math.max(l.y, Math.min(l.y + l.height, l.anchor.y));
        return `<path d="M${l.anchor.x.toFixed(1)},${l.anchor.y.toFixed(1)} L${x.toFixed(1)},${y.toFixed(1)}"/><circle cx="${l.anchor.x.toFixed(1)}" cy="${l.anchor.y.toFixed(1)}" r="1.5"/>`;
      })
      .join("");
  target.innerHTML = `${leaders ? `<svg aria-hidden="true" width="${width}" height="${height}" style="position:absolute;inset:0;pointer-events:none" stroke="#efe8d7" stroke-opacity=".65" fill="#efe8d7" fill-opacity=".8" stroke-width="1">${leaders}</svg>` : ""}${placed.map((l) => `<div class="world-label ${l.player ? "player" : l.enemy ? "enemy" : ""}" style="left:${l.x}px;top:${l.y}px;width:${l.width}px;transform:none;line-height:${l.lineHeight}px;text-align:center">${l.lines.map(esc).join("<br>")}${l.enemy ? `<div class="bar" style="width:${l.barWidth}px"></div>` : ""}</div>`).join("")}`;
  renderWorldLabels.key = key;
  renderWorldLabels.target = target;
}
function updateHud() {
  if (mode === "playing") {
    $("hp").textContent = Math.ceil(hp);
    $("hp-fill").style.width = `${hp}%`;
    $("ammo").innerHTML = `${ammo} <span>/ ${reserve}</span>`;
    $("reload-state").textContent = handsOccupied()
      ? "雙手搬運 · 先放下再換彈／開火"
      : reload > 0
        ? `換彈 ${reload.toFixed(1)}s`
        : "R 換彈";
    $("cover-state").textContent = cover
      ? aiming || firing
        ? "探頭 · 暴露中"
        : "掩體 · 已縮回"
      : "自由移動";
    const workRemaining = field && !field.complete;
    const nextObjective = missionSystem
      ? missionSystem.objective()
      : workRemaining
        ? clueSet.size < 3
          ? "沿 ◆ 找齊線索，並完成 ⚙ 現場作業；備妥後才能交接。"
          : "證據已齊；先完成剩餘 ⚙ 現場作業，再前往交接。"
        : stats.kills
          ? "擊敗其餘守軍 → 橘色 ◆ 取物 → 南側撤離"
          : clueSet.size === 3
            ? "前往北方金色 ◆ 議和；或交戰取物。"
            : "西側、西北與東側各有線索。靠近按 E 調查。";
    const departure = secured ? missionSystem?.departure?.() : null;
    $("objective").innerHTML = secured
      ? departure
        ? `<b>◇ ${esc(departure.title)}</b><small>${esc(departure.detail)}</small>`
        : `<b>◇ ${PACT_FLOW[mission.id] ? "帶回地契與交接紀錄" : missionSystem ? "帶著具名回條" : "帶回物件"}，返回南側撤離</b><small>靠近出口按 E，安全提交這次決定。</small>`
      : `<b>◆ 證據 ${clueSet.size}/3　·　守軍 ${enemies.filter((e) => e.hp > 0).length}</b><small>${nextObjective}</small>`;
    if (!secured && field)
      $("objective").insertAdjacentHTML(
        "beforeend",
        `<small>⚙ 現場作業 ${field.state.completed.length}/3 · ${esc(fieldObjective || "靠近 ⚙ 標記按 E")}</small>`,
      );
    const near = nearby();
    if (
      !secured &&
      missionSystem &&
      (missionSystem.status.response.warned ||
        ((SIGNAL_FLOW[mission.id] ||
          LEDGER_FLOW[mission.id] ||
          NIGHT_FLOW[mission.id] ||
          PACT_FLOW[mission.id]) &&
          missionSystem.status.response.status !== "waiting"))
    ) {
      const responseText = (
        PACT_FLOW[mission.id]
          ? {
              warned:
                "兩名既有守軍將到同車領補給；切軍線可阻止尚未領取的六發補給。",
              active:
                "既有兩人正移動領補給；每人限一次六發，原車庫存同步減少。",
              prevented:
                "軍用線已切斷，剩餘補給保留在同車；民生水醫線繼續供電。",
              cancelled: "尚未領取的補給已取消；已領用數量仍須盤點。",
              neutralized:
                "領補給守軍已被擊倒，沒有替補；同車物資仍須停妥交接。",
            }
          : NIGHT_FLOW[mission.id]
            ? {
                warned:
                  "塔洛將繞向所選護送通路；可在路口出示同一份實體文件，讓三人在安全掩體停等。",
                active:
                  "既有側翼者塔洛正繞行；有效文件可取消查驗，續走前須靠近全三人。",
                prevented:
                  "通行文件已核對，塔洛的本次繞行已預防；繼續護送同三人。",
                cancelled:
                  "有效放行已取消繞行，存活的塔洛返回原崗；三人仍須到南側集合。",
                neutralized:
                  "塔洛已被擊倒，沒有替補；仍須同三人實際到達並領回條。",
              }
            : LEDGER_FLOW[mission.id]
              ? {
                  warned:
                    "兩名既有守軍將查驗公示通路；可在帳房身旁出示完整核證資料。",
                  active:
                    "既有守軍正前往公示通路；完整貨票、付款壓痕與工名可令查驗停止。",
                  prevented:
                    missionSystem.status.response.reason ===
                    "sealed-south-courier"
                      ? "密封副本由南西奧林保管；原帳仍在你的背包。"
                      : "完整核證已預防本次公示查驗。",
                  cancelled: "完整核證已取消查驗，存活守軍返回原崗。",
                  neutralized:
                    "查驗守軍已被擊倒；沒有增援，仍須同一副本交接與具名回條。",
                }
              : SIGNAL_FLOW[mission.id]
                ? {
                    warned:
                      "守軍看見公共訊號；追線查驗將沿可見電纜前往所選中繼。",
                    active:
                      "既有查線守軍正在移動；可回接線台切開追線支路，主驛線保留。",
                    prevented:
                      missionSystem.status.response.reason === "standdown-order"
                        ? "第17號調令送達；既有查線守軍正沿通路退守。"
                        : "追線支路已切斷，本次查驗已預防。",
                    cancelled: "追線查驗已取消，活著的查線守軍返回原崗。",
                    neutralized:
                      "查線守軍已被擊倒；仍須完整名單與南側簽收，沒有新敵人補入。",
                  }
                : WATER_FLOW[mission.id]
                  ? {
                      warned: "橋頭守軍已看見供水改道，正在準備查驗。",
                      active:
                        "守橋查驗組正前往簽收岸；可在配水牌公開最低供水保證。",
                      cancelled: "查驗已取消，守軍沿通路返回原崗。",
                      neutralized: "查驗守軍已被擊倒，沒有後續增援。",
                    }
                  : {
                      warned: "北側哨位已發出查驗呼叫；既有守軍正在準備。",
                      active: "北側查驗組正接近藥箱；可放下貨物斷開通訊。",
                      cancelled: "查驗已取消，待命守軍沿原路返回。",
                      neutralized: "待命守軍已被擊倒，沒有後續增援。",
                    }
      )[missionSystem.status.response.status];
      if (responseText)
        $("objective").insertAdjacentHTML(
          "beforeend",
          `<small>${responseText}</small>`,
        );
    }
    setHudText("context", near
      ? `E　${near.title}${near.type === "exit" && !secured ? "（未完成，可安全撤回）" : ""}`
      : cover
        ? "右鍵探頭 · 左鍵射擊 · E 離開掩體"
        : departure?.stage === "courtyard"
          ? "移動穿過已開門口 · 沿地面箭頭離院"
          : world.colliders.some(
                (b) => b.h < 2.2 && coverDistance(player.position, b) < 1.2,
              )
            ? "E　進入掩體"
            : "");
    $("status-note").textContent =
      smoke > 0
        ? `煙罐掩護 ${smoke.toFixed(0)} 秒`
        : itemUsed
          ? "補給已使用"
          : `F　${run.item === "medkit" ? "繃帶恢復生命" : "煙罐遮蔽警戒"} · 一次`;
  } else if (mode === "town-walk") {
    $("objective").innerHTML =
      "<b>暮砂鎮 · 走訪四位居民</b><small>靠近居民按 E。Esc 可回到委託簿。</small>";
    setHudText("context", sceneLabels.some(
      (n) =>
        Math.hypot(
          n.position.x - player.position.x,
          n.position.z - player.position.z,
        ) < 3,
    )
      ? "E　交談"
      : "");
  }
  const labels =
    mode === "playing"
      ? [
          ...(player
            ? [
                {
                  position: {
                    x: player.position.x,
                    z: player.position.z,
                    y: 2.25,
                  },
                  text: "你",
                  player: true,
                },
              ]
            : []),
          ...clues
            .filter((c) => !c.read)
            .map((c) => ({
              position: { x: c.position[0], z: c.position[1], y: 2.9 },
              text: "◆ " + c.title,
            })),
          ...objectives
            .filter((o) => o.type === "exit" || !secured)
            .map((o) => ({
              position: {
                x: o.position[0],
                z: o.position[1],
                y: o.type === "cargo" ? 3.6 : 2.8,
              },
              text:
                o.type === "exit"
                  ? "◇ 南側撤離"
                  : o.type === "parley"
                    ? "◆ 議和"
                    : "◆ 取物",
            })),
          ...enemies
            .filter((e) => e.hp > 0)
            .map((e) => ({
              position: {
                x: e.actor.position.x,
                z: e.actor.position.z,
                y: 2.35,
              },
              text: {
                guard: "警戒",
                flanker: "↔ 側翼",
                shotgun: "近攻",
                sniper: "◎ 狙擊",
              }[e.type],
              enemy: true,
              hp: e.hp,
            })),
          ...(field?.labels() || []),
          ...(missionSystem?.labels() || []),
          ...(fieldEffects.healCharges > 0 && fieldEffects.healPosition
            ? [
                {
                  position: {
                    x: fieldEffects.healPosition[0],
                    y: 2.7,
                    z: fieldEffects.healPosition[1],
                  },
                  text: "＋ 保留淨水",
                },
              ]
            : []),
        ]
      : sceneLabels;
  renderWorldLabels(labels);
}
function frame(time) {
  if (shuttingDown) return;
  requestAnimationFrame(frame);
  if (!world) return;
  const raw = lastTime ? (time - lastTime) / 1000 : 1 / 60;
  lastTime = time;
  const dt = Math.min(raw, 0.05);
  frameSamples++;
  frameSum += raw;
  if (frameSamples % 4 === 0) {
    frameTimes.push(raw * 1000);
    if (frameTimes.length > 18000) frameTimes.shift();
  }
  if (mode === "playing") {
    stats.assisted ||= settings.assist;
    stats.slowAim ||= settings.slowAim;
    const slow = settings.slowAim && aiming ? 0.55 : 1;
    if (foreground) elapsed += raw;
    cooldown = Math.max(0, cooldown - dt * slow);
    smoke = Math.max(0, smoke - dt * slow);
    fieldEffects.exposure = Math.max(0, fieldEffects.exposure - dt);
    if (handsOccupied()) reload = 0;
    if (reload > 0) {
      reload -= dt * slow;
      if (reload <= 0) {
        const n = Math.min(weapon.magazine - ammo, reserve);
        ammo += n;
        reserve -= n;
        audio.play("reload");
      }
    }
    movement(dt * slow);
    const fieldUpdate = field?.update(dt * slow, player, world.colliders);
    fieldSpeed = fieldUpdate?.speedMultiplier ?? 1;
    fieldObjective = fieldUpdate?.objective || "";
    if (mode === "playing") {
      missionSystem?.update(dt * slow);
      if (firing) shoot();
      updateEnemies(dt * slow);
    }
    audio.tick(elapsed);
    hurt = Math.max(0, hurt - dt);
    $("damage").style.opacity =
      hurt > 0 ? (settings.reduced ? ".2" : ".6") : "0";
  } else if (["field", "clue", "parley", "extraction"].includes(mode)) {
    if (foreground) elapsed += raw;
  } else if (mode === "town-walk") {
    movement(dt);
    audio.tick(time / 1000);
  } else if (mode === "transition") {
    transitionTime -= dt;
    player.position.z -= dt * 4;
    player.object.position.y = 1.1;
    world.animate(player, "idle");
    if (transitionTime <= 0) {
      const action = transitionAction;
      transitionAction = null;
      action?.();
    }
  }
  const active = [
    "playing",
    "town-walk",
    "transition",
    "hub",
    "title",
    "dead",
  ].includes(mode);
  missionSystem?.props.setInspection?.(mode === "field");
  world.update(active ? dt : 0, player, settings.reduced);
  if (frameSamples % 4 === 0) updateHud();
}

overlay.addEventListener("click", (event) => {
  const b = event.target.closest("[data-action]");
  if (!b || b.disabled) return;
  audio.unlock();
  audio.resume();
  audio.play("ui");
  const action = b.dataset.action;
  try {
    if (
      action.startsWith("mission-") ||
      action.startsWith("water-") ||
      action.startsWith("signal-") ||
      action.startsWith("ledger-") ||
      action.startsWith("night-") ||
      action.startsWith("pact-")
    ) {
      missionSystem?.handle(action, b.dataset);
      return;
    }
    if (action.startsWith("field-")) {
      if (missionSystem?.beforeFieldAction?.(action, b.dataset) === false)
        return;
      field?.handle(action, b.dataset);
      missionSystem?.afterFieldAction?.(action, b.dataset);
      return;
    }
    if (action === "supplies") suppliesPanel();
    else if (action === "buy-supply") {
      const purchase = buySupply(profile, b.dataset.id, { mode: "hub" });
      profile = purchase.profile;
      save();
      suppliesPanel();
      toast(purchase.message);
    } else if (action === "hub") showHub();
    else if (action === "brief") briefing(b.dataset.id);
    else if (action === "deploy") deploy();
    else if (action === "recover") recover();
    else if (action === "abandon") abandon();
    else if (action === "retry") retry();
    else if (action === "peace") secure("nonlethal");
    else if (action === "commit") commit(b.dataset.id);
    else if (action === "ending") ending();
    else if (action === "journal") journal();
    else if (action === "help") help();
    else if (action === "settings") settingsPanel();
    else if (action === "close-sheet") closeSheet();
    else if (action === "resume") resume();
    else if (action === "back-playing") {
      mode = "playing";
      hide();
    } else if (action === "replay-result") briefing(lastResult.missionId);
    else if (action === "town-walk") {
      mode = "town-walk";
      hide();
      notifyRunning();
    } else if (action === "retry-confirm") {
      panel(
        `<h2>重新開始這份委託？</h2><p>會回復任務前快照，這次場上的進度不保留。</p><div class="actions">${button("retry", "確認重試", "primary")}${button("resume", "繼續目前委託")}</div>`,
      );
    } else if (action === "reset-confirm") {
      panel(
        `<h2>清除六份委託的故事進度？</h2><p>這會清除本機故事、選擇與旅費，無法復原。音量偏好會保留。</p><div class="actions">${button("reset", "確認清除", "danger")}${button("close-sheet", "保留進度", "primary")}</div>`,
      );
    } else if (action === "reset") {
      profile = createProfile();
      save();
      showHub();
    }
  } catch (error) {
    toast(error.message);
    console.error(error);
  }
});
overlay.addEventListener("input", (event) => {
  const key = event.target.dataset.setting;
  if (!key) return;
  settings[key] =
    event.target.type === "checkbox"
      ? event.target.checked
      : Number(event.target.value);
  persistSettings();
});
$("pause-button").onclick = () => (mode === "paused" ? resume() : pause());
$("help-button").onclick = help;
$("rotate-left").onclick = () => world?.rotate(-1);
$("rotate-right").onclick = () => world?.rotate(1);
window.addEventListener("keydown", (event) => {
  if (["INPUT", "SELECT"].includes(event.target.tagName)) return;
  if (
    ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
      event.code,
    )
  )
    event.preventDefault();
  if (event.code === "Escape") {
    event.preventDefault();
    if (mode === "paused") resume();
    else if (mode === "help" || mode === "settings") closeSheet();
    else if (mode === "field") field.handle("field-close", {});
    else pause();
    return;
  }
  if (!["playing", "town-walk"].includes(mode)) return;
  keys.add(event.code);
  if (event.repeat) return;
  audio.unlock();
  if (event.code === "KeyE") interact();
  if (event.code === "KeyR") reloadWeapon();
  if (event.code === "Space") vault();
  if (event.code === "KeyF") useItem();
  if (event.code === "KeyQ") world.rotate(-1);
  if (event.code === "KeyC") world.rotate(1);
});
window.addEventListener("keyup", (event) => keys.delete(event.code));
function syncMouseButtons(event) {
  if (event.pointerType && event.pointerType !== "mouse") return;
  if (!mouseActive || mode !== "playing") return;
  firing = Boolean(event.buttons & 1);
  aiming = Boolean(event.buttons & 2);
  if (event.buttons === 0) mouseActive = false;
}
canvas.addEventListener("pointermove", (event) => {
  syncMouseButtons(event);
  pointerPosition = { x: event.clientX, y: event.clientY };
  const p = world?.aim(event.clientX, event.clientY);
  if (p) aimPoint.copy(p);
  $("reticle").style.left = `${event.clientX}px`;
  $("reticle").style.top = `${event.clientY}px`;
  $("reticle").style.display = mode === "playing" ? "block" : "none";
});
canvas.addEventListener("pointerdown", (event) => {
  if (mode !== "playing" || event.pointerType !== "mouse") return;
  audio.unlock();
  audio.resume();
  canvas.setPointerCapture(event.pointerId);
  mouseActive = true;
  const p = world.aim(event.clientX, event.clientY);
  if (p) aimPoint.copy(p);
  syncMouseButtons(event);
});
// Chord changes produce pointermove, not another pointerdown/up. Read the full
// buttons mask, and mouse events cover partial releases in all desktop engines.
canvas.addEventListener("mousedown", syncMouseButtons);
window.addEventListener("mouseup", syncMouseButtons);
window.addEventListener("pointerup", syncMouseButtons);
canvas.addEventListener("contextmenu", (e) => e.preventDefault());
canvas.addEventListener("pointercancel", () => {
  mouseActive = false;
  firing = false;
  aiming = false;
});
function bindPad(element, callback) {
  let id = null;
  element.addEventListener("pointerdown", (e) => {
    if (mode !== "playing" && mode !== "town-walk") return;
    id = e.pointerId;
    element.setPointerCapture(id);
    audio.unlock();
    update(e);
  });
  function update(e) {
    if (e.pointerId !== id) return;
    const r = element.getBoundingClientRect();
    let x = (e.clientX - r.left - r.width / 2) / (r.width * 0.38),
      y = (e.clientY - r.top - r.height / 2) / (r.height * 0.38);
    const len = Math.hypot(x, y);
    if (len > 1) {
      x /= len;
      y /= len;
    }
    callback(x, y, false);
  }
  element.addEventListener("pointermove", update);
  for (const name of ["pointerup", "pointercancel", "lostpointercapture"])
    element.addEventListener(name, (e) => {
      if (e.pointerId === id) {
        id = null;
        callback(0, 0, true);
      }
    });
}
bindPad($("move-pad"), (x, y) => {
  joystick = { x, y };
  $("move-pad").querySelector("i").style.transform =
    `translate(${x * 30}px,${y * 30}px)`;
});
bindPad($("aim-pad"), (x, y, end) => {
  if (!end && Math.hypot(x, y) > 0.1) {
    touchAim = { x, y };
    aiming = true;
  }
  if (end) aiming = false;
});
$("touch-fire").addEventListener("pointerdown", (e) => {
  if (mode !== "playing") return;
  e.currentTarget.setPointerCapture(e.pointerId);
  audio.unlock();
  audio.resume();
  firing = true;
  aiming = true;
});
for (const name of ["pointerup", "pointercancel", "lostpointercapture"])
  $("touch-fire").addEventListener(name, () => {
    firing = false;
    aiming = false;
  });
$("touch-interact").onclick = interact;
$("touch-reload").onclick = reloadWeapon;
$("touch-vault").onclick = vault;
$("touch-item").onclick = useItem;
window.addEventListener("blur", () => {
  foreground = false;
  lastTime = 0;
  clearInputs();
  if (mode === "playing" || mode === "town-walk") pause();
  else audio.pause();
});
window.addEventListener("focus", () => {
  foreground = !document.hidden;
  lastTime = 0;
});
document.addEventListener("visibilitychange", () => {
  foreground = !document.hidden && document.hasFocus();
  lastTime = 0;
  if (document.hidden) {
    clearInputs();
    if (mode === "playing" || mode === "town-walk") pause();
    else audio.pause();
  }
});
window.addEventListener("resize", () => {
  const task = field?.active;
  if (task) field.restoreCamera();
  world?.resize();
  if (task)
    field.focus(
      task,
      task.focus || task.anchor || task.object,
      task.viewAngle || 0,
    );
  orientationGuard();
});
window.addEventListener("pagehide", () => {
  shuttingDown = true;
  hudLayoutCache.value?.dispose();
  audio.dispose();
  bridge.dispose();
  missionSystem?.dispose();
  missionSystem = null;
  field?.dispose?.();
  world?.dispose();
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted && shuttingDown) location.reload();
});
window.addEventListener("error", (event) => {
  if (mode === "loading")
    $("overlay").innerHTML =
      `<section class="panel"><h2>載入未完成</h2><p>${esc(event.message)}</p><button onclick="location.reload()">重新載入</button></section>`;
});
// Read-only diagnostics for reproducible review. No teleport, invulnerability or save mutation APIs.
const pointForDiagnostics = (p) => ({ x: p.x, y: p.y, z: p.z });
window.dustDiagnostics = () => ({
  buildId: BUILD,
  mode,
  mission: mission?.id || null,
  player: player
    ? {
        x: player.position.x,
        y: player.position.y,
        z: player.position.z,
        animation: player.state,
        colliderHeight: player.colliderHeight,
        hp,
        cover: cover?.id || null,
        ammo,
        reserve,
        reload,
        firing,
        aiming,
        handsOccupied: handsOccupied(),
      }
    : null,
  secured,
  strategy,
  elapsed,
  field: field
    ? {
        state: JSON.parse(JSON.stringify(field.state)),
        handsOccupied: Boolean(field.handsOccupied),
        active: field.active?.id || null,
        traversal: field.traversal
          ? {
              type: field.traversal.type,
              taskId: field.traversal.task.id,
              index: field.traversal.index,
              route: field.traversal.route.map((p) => [...p]),
              paused: Boolean(field.traversal.paused),
            }
          : null,
        tasks: field.tasks.map((task) => {
          const p = field.taskPoint(task);
          return {
            id: task.id,
            position: { x: p.x, z: p.z },
            values: { ...task.values },
            cargo: task.cargo
              ? { x: task.cargo.position.x, z: task.cargo.position.z }
              : null,
          };
        }),
      }
    : null,
  missionFlow:
    missionSystem && MISSION_FLOW[mission?.id]
      ? JSON.parse(
          JSON.stringify({
            progress: missionSystem.progress,
            status: missionSystem.status,
            worker: pointForDiagnostics(missionSystem.props.worker.position),
            departure: {
              instruction: missionSystem.departure(),
              guidance: missionSystem.departureState || null,
            },
          }),
        )
      : null,
  waterFlow:
    missionSystem && WATER_FLOW[mission?.id]
      ? JSON.parse(
          JSON.stringify({
            progress: missionSystem.progress,
            status: missionSystem.status,
            ...(missionSystem.diagnostics?.() || {}),
          }),
        )
      : null,
  signalFlow:
    missionSystem && SIGNAL_FLOW[mission?.id]
      ? JSON.parse(
          JSON.stringify({
            progress: missionSystem.progress,
            status: missionSystem.status,
            ...(missionSystem.diagnostics?.() || {}),
          }),
        )
      : null,
  ledgerFlow:
    missionSystem && LEDGER_FLOW[mission?.id]
      ? JSON.parse(
          JSON.stringify({
            progress: missionSystem.progress,
            status: missionSystem.status,
            ...(missionSystem.diagnostics?.() || {}),
          }),
        )
      : null,
  nightFlow:
    missionSystem && NIGHT_FLOW[mission?.id]
      ? JSON.parse(
          JSON.stringify({
            progress: missionSystem.progress,
            status: missionSystem.status,
            ...(missionSystem.diagnostics?.() || {}),
          }),
        )
      : null,
  fieldEffects: JSON.parse(JSON.stringify(fieldEffects)),
  pactFlow:
    missionSystem && PACT_FLOW[mission?.id]
      ? JSON.parse(
          JSON.stringify({
            progress: missionSystem.progress,
            status: missionSystem.status,
            ...(missionSystem.diagnostics?.() || {}),
          }),
        )
      : null,
  stats: { ...stats },
  clues: [...clueSet],
  enemies: enemies.map((e) => ({
    id: e.id,
    type: e.type,
    x: e.actor.position.x,
    z: e.actor.position.z,
    hp: e.hp,
    state: e.state,
    colliderHeight: e.actor.colliderHeight,
    engaged: e.engaged === true,
    tacticalWarning: e.tacticalWarning,
    tacticalMovement: e.tactics?.cache?.movement?.kind || null,
    tacticalTravel: e.tactics?.approachTravel || 0,
    windup: e.windup,
    rounds: e.rounds,
    magazine: e.magazine,
  })),
  profile: JSON.parse(JSON.stringify(profile)),
  render: world?.stats(),
  performance: {
    samples: frameTimes.length,
    p95:
      [...frameTimes].sort((a, b) => a - b)[
        Math.floor(frameTimes.length * 0.95)
      ] || 0,
    meanMs: frameSamples ? (frameSum / frameSamples) * 1000 : 0,
  },
  audio: {
    state: audio.context?.state || "uninitialized",
    voices: audio.voices.size,
  },
  camera: world?.cameraIndex,
  colliders: world?.colliders.map((b) => ({ ...b })),
  geometry: world ? [...world.templates.keys()] : [],
});
try {
  world = new World(canvas);
  await world.load();
  world.quality(settings.low);
  document.body.classList.toggle("reduced-motion", settings.reduced);
  title();
  bridge.ready();
  requestAnimationFrame(frame);
} catch (error) {
  console.error(error);
  mode = "error";
  panel(
    `<p class="eyebrow">LOAD FAILED</p><h2>邊境暫時無法載入</h2><p>${esc(error.message)}</p><p>請確認瀏覽器啟用 WebGL，並重新整理重試。本機進度不會被清除。</p><div class="actions"><button onclick="location.reload()">重新載入</button></div>`,
  );
  bridge.error(error.message);
}
