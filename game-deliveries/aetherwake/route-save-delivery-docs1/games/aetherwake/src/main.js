import { WORLD, MODULES, islandById } from "./world.js";
import { FlightSimulation } from "./simulation.js";
import { SaveStore } from "./storage.js";
import { AetherScene } from "./scene.js";
import { FlightInput } from "./input.js";
import { AudioEngine } from "./audio.js";
import { HostBridge } from "./bridge.js";
import { BUILD } from "./version.js";
const $ = (s) => document.querySelector(s),
  show = (s, on = true) => $(s).classList.toggle("hidden", !on),
  text = (s, value) => {
    if ($(s).textContent !== String(value)) $(s).textContent = value;
  };
const clock = (t) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
function sampleConditions(hint) {
  const items = [];
  if (hint.minSpeed) items.push(`速度 ≥${hint.minSpeed}m/s`);
  if (hint.maxSpeed) items.push(`速度 ≤${hint.maxSpeed}m/s`);
  if (hint.minEnergy) items.push(`能量 ≥${hint.minEnergy}%`);
  if (hint.maxVerticalSpeed) items.push(`升降 ≤${hint.maxVerticalSpeed}m/s`);
  if (hint.heading) items.push("順環上箭頭通過");
  return items.join(" · ");
}
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
let scene,
  input,
  sim,
  audio,
  bridge,
  settings,
  loaded,
  currentStorageWarning = null,
  selectedModule = "turn",
  started = false,
  modalKind = "",
  returnFocus = null,
  toastTimer = 0,
  resultAudioTimer = 0,
  lastRoute = "",
  guideHidden = false,
  raf,
  accumulator = 0,
  previous = performance.now(),
  uiClock = 0;
const store = new SaveStore();
const frames = [];
let frameCount = 0,
  elapsedSample = 0,
  longFrames = 0;
function notify(message) {
  text("#toast", message);
  $("#toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 4200);
}
function resultStorageLabel() {
  return currentStorageWarning
    ? "遠征完成 / 本次保存未完成"
    : "遠征完成 / 個人成績已保存";
}
function storageWarning(warning) {
  currentStorageWarning = warning || null;
  show("#storage-warning", !!warning);
  if (warning) text("#storage-warning", warning);
  if (modalKind === "result") text("#modal-kicker", resultStorageLabel());
}
function persist() {
  const result = store.save({ ...sim.saveData(), settings });
  storageWarning(result.warning);
  loaded = store.load().save;
  return result;
}
function applySettings() {
  scene.setQuality(settings.quality);
  scene.reduced = settings.reducedMotion;
  scene.overhead = settings.camera === "overhead";
  audio.setVolumes({ music: settings.music, sfx: settings.sfx });
  text("#camera", scene.overhead ? "追隨 V" : "俯瞰 V");
}
function updateModuleButtons() {
  for (const b of document.querySelectorAll(".module"))
    b.setAttribute("aria-pressed", String(b.dataset.module === selectedModule));
}
function selectModule(id) {
  selectedModule = id;
  updateModuleButtons();
  audio?.play("ui");
}
function begin(resume = false) {
  clearTimeout(resultAudioTimer);
  closeModal(false);
  audio.unlock();
  if (resume) {
    sim = new FlightSimulation({ save: loaded });
    selectedModule = loaded.module;
  } else {
    sim.persisted = loaded;
    sim.reset({
      seed: Number($("#seed").value) || 2718,
      module: selectedModule,
    });
  }
  if (sim.status === "complete") {
    started = true;
    scene.menu = false;
    scene.recenter({ immediate: true });
    input.setEnabled(false);
    show("#landing", false);
    show("#flight-hud");
    updateHud();
    showResults();
    return;
  }
  sim.launch();
  started = true;
  scene.menu = false;
  scene.recenter({ immediate: true });
  accumulator = 0;
  previous = performance.now();
  input.setEnabled(true);
  show("#landing", false);
  show("#flight-hud");
  audio.setPaused(false);
  bridge.state("running");
  show("#guide", !guideHidden);
  $("#world").focus();
  persist();
  updateHud();
  notify(
    resume
      ? "已回到上次的安全落點。"
      : matchMedia("(pointer: coarse)").matches
        ? "先點展帆起跳，再用左搖桿沿地圖風線前進。"
        : "先按 Space 起跳，再沿地圖上的風線前進。",
  );
}
function pause(reason = "pause") {
  clearTimeout(resultAudioTimer);
  if (!started || sim.status === "complete") return;
  sim.setPaused(true);
  input.setEnabled(false);
  if (reason === "dialogue")
    resultAudioTimer = setTimeout(() => audio.setPaused(true), 1200);
  else audio.setPaused(true);
  accumulator = 0;
  bridge.state("paused");
  if (reason === "pause" || reason === "blur")
    openPause(reason === "blur" ? "航程已安全暫停" : "在風停下來的地方");
}
function resume() {
  clearTimeout(resultAudioTimer);
  if (!started || sim.status === "complete") return;
  closeModal(false);
  sim.setPaused(false);
  input.setEnabled(true);
  audio.unlock();
  audio.setPaused(false);
  previous = performance.now();
  accumulator = 0;
  bridge.state("running");
  $("#world").focus();
}
function togglePause() {
  if (modalKind) return dismissModal();
  if (!started) return openHelp();
  if (sim.status === "paused") resume();
  else pause();
}
function dismissModal() {
  if (!modalKind) return;
  if (modalKind === "erase") return openSettings();
  if (modalKind === "settings") return openHelp();
  if (modalKind === "courses") return started && sim.status === "complete" ? showResults() : openHelp();
  if (modalKind === "journal")
    return started && sim.status === "complete" ? showResults() : openHelp();
  if (modalKind === "restart") return openPause();
  if (modalKind === "result") {
    menu();
    $("#start").focus();
    return;
  }
  if (modalKind === "help") {
    if (!started) return closeModal();
    return sim.status === "complete" ? showResults() : openPause();
  }
  if (started && sim.status !== "complete") return resume();
  closeModal();
}
function setModal(
  kind,
  title,
  body,
  buttons = [],
  kicker = "AETHERWAKE / 航行誌",
) {
  if (!modalKind) returnFocus = document.activeElement;
  modalKind = kind;
  text("#modal-kicker", kicker);
  text("#modal-title", title);
  $("#modal").append($("#storage-warning"));
  $("#modal-body").innerHTML = body;
  $("#modal-actions").replaceChildren();
  for (const b of buttons) {
    const el = document.createElement("button");
    el.textContent = b.label;
    el.disabled = !!b.disabled;
    if (b.primary) el.className = "primary";
    el.onclick = () => {
      audio.play("ui");
      b.action();
    };
    $("#modal-actions").append(el);
  }
  show("#modal");
  requestAnimationFrame(() => {
    (kind === "courses" ? $("#close-modal") : $("#modal-actions button") || $("#close-modal")).focus();
    if (kind === "courses") $(".modal-panel").scrollTop = 0;
  });
}
function closeModal(restore = true) {
  show("#modal", false);
  $("#toast").after($("#storage-warning"));
  modalKind = "";
  if (restore) {
    const canRestore =
      returnFocus?.isConnected &&
      returnFocus !== document.body &&
      !returnFocus.closest(".hidden");
    (canRestore ? returnFocus : $(started ? "#world" : "#start")).focus();
  }
  returnFocus = null;
}
function settingsHTML() {
  return `<div class="settings-grid"><label>環境與音樂 <input id="music-volume" type="range" min="0" max="1" step="0.05" value="${settings.music}"></label><label>動作音效 <input id="sfx-volume" type="range" min="0" max="1" step="0.05" value="${settings.sfx}"></label><label>畫質 <select id="quality"><option value="auto">標準 · 1.5× DPR</option><option value="low">節能 · 關閉即時陰影</option><option value="high">精緻 · 即時陰影</option></select></label><label>鏡頭 <select id="camera-setting"><option value="follow">受控追隨</option><option value="overhead">俯瞰航線</option></select></label><label class="check"><input id="reduced-motion" type="checkbox" ${settings.reducedMotion ? "checked" : ""}>減少動態／視差</label><label class="check"><input id="assist" type="checkbox" ${sim.assist ? "checked" : ""}>風線輔助（獨立標記成績）</label></div>`;
}
function bindSettings() {
  $("#quality").value = settings.quality;
  $("#camera-setting").value = settings.camera;
  for (const [id, key] of [
    ["music-volume", "music"],
    ["sfx-volume", "sfx"],
  ])
    $("#" + id).oninput = (e) => {
      settings[key] = Number(e.target.value);
      audio.unlock();
      applySettings();
      persist();
    };
  $("#quality").onchange = (e) => {
    settings.quality = e.target.value;
    applySettings();
    persist();
  };
  $("#camera-setting").onchange = (e) => {
    settings.camera = e.target.value;
    applySettings();
    persist();
  };
  $("#reduced-motion").onchange = (e) => {
    settings.reducedMotion = e.target.checked;
    applySettings();
    persist();
  };
  $("#assist").onchange = (e) => {
    sim.setAssist(e.target.checked);
    persist();
  };
}
function openPause(title = "在風停下來的地方") {
  setModal(
    "pause",
    title,
    `<p>飛行、帆能量與計時已凍結。安全落島與取得碎片時會自動儲存；重新載入會回到最後的安全島。</p>${settingsHTML()}`,
    [
      { label: "繼續航程", primary: true, action: resume },
      { label: "操作與航行誌", action: openHelp },
      { label: "選擇測風遠征", action: openCourses },
      { label: "重新遠征", action: confirmRestart },
      { label: "返回準備畫面", action: menu },
    ],
    "Ⅱ / 航程暫停",
  );
  bindSettings();
}
function confirmRestart() {
  setModal(
    "restart",
    "重新迎接這陣風？",
    "<p>本趟觀測台、主線觀測與時間會重新計算。文明碎片、已交付的測風階段、已發現島嶼與個人成績保留。若要換模組或種子，請返回準備畫面。</p>",
    [
      { label: "重新遠征", primary: true, action: () => begin(false) },
      { label: "保留航程", action: () => openPause() },
    ],
  );
}
function menu() {
  clearTimeout(resultAudioTimer);
  if (started && sim.status !== "complete") {
    pause("silent");
    persist();
  }
  started = false;
  input.setEnabled(false);
  audio.setPaused(true);
  scene.menu = true;
  closeModal();
  show("#flight-hud", false);
  show("#landing");
  show("#continue", loaded.elapsed > 0);
  text("#continue", loaded.completed ? "查看結算／繼續探索" : "繼續上次航程");
  bridge.state("ready");
  text("#objective", "讓沉睡的星圖再次發光");
  text("#objective-sub", "依序修復三座觀測台，返回營地。");
}
function openHelp() {
  if (started && sim.status === "running") pause("silent");
  setModal(
    "help",
    "讀懂風，找到回家的路",
    `<p class="modal-note">三段主線分別是測風校準、穩定貨運、霧中定位。依序通過帶條件的觀測環，再落到蘆光庭 → 雷雲天文台 → 歸星臺按 E 交付，最後返回晨風營地結算。環上箭頭表示進入方向，直柱表示交付點。</p><div class="control-table"><b>WASD / 方向鍵</b><span>依畫面方向移動。空中放開會保持滑翔。</span><b>Space / 展帆</b><span>地面起跳，空中切換展帆。不必一直按住。</span><b>Shift / 減速</b><span>按住收帆下降。抵島上空時減速，落地後放開。</span><b>E / 互動鍵</b><span>交付觀測資料／測風階段，或回營地結算。</span><b>右鍵拖曳 / 滾輪</b><span>調整鏡頭；C 回正，V 切換俯瞰。</span><b>手機</b><span>左側搖桿＋右側展帆／減速可同時操作；空白場景拖動鏡頭。</span></div><h3>讀風與選路</h3><ul><li>長帶＋箭頭＝順風，持續補能並加速；螺旋環＝熱流，抬升高度。</li><li>橫向擺動標記＝間歇側風；雷心脈動時繞行外緣，霧中參考島名和地圖。</li><li>安全風道較寬，途經補給島；穿雲捷徑路短，需要更精準的方向修正。</li><li>沒有能量或掉落時回最後安全島，加計 8 秒，碎片保留。連續三次失速會提示可開啟輔助。</li><li>碎片靠近自動拾取，航行誌提供地標線索。先在安全地面從「六趟測風遠征」選課，沿安全接駁風標到金環開始。完成本段航門後到指定島中央按 E 交付；已交付階段永久保存。退出會返回最後安全島，不計失速，只放棄未交付段。</li></ul><h3>本機進度與個人成績</h3><p>只有這個瀏覽器保存進度，沒有雲端同步或全球排行榜。種子可重現相同風況；今日風況以台北日期計算。結算分別顯示速度、平穩與探索評級。</p>`,
    [
      {
        label: started ? "回到航程" : "回到準備",
        primary: true,
        action: () =>
          started
            ? sim.status === "complete"
              ? showResults()
              : resume()
            : closeModal(),
      },
      { label: "文明碎片", action: openJournal },
      { label: "六趟測風遠征", action: openCourses },
      { label: "設定與存檔", action: openSettings },
    ],
  );
}
function openCourses() {
  if (started && sim.status === "running") pause("silent");
  const canChoose = !started || sim.player.grounded;
  setModal("courses", "帶回下一份風的答案",
    `<p class="modal-note">${canChoose ? "在安全地面選擇一趟遠征，再沿安全接駁風標到指定島金環開始。" : "請先安全落島，再選擇遠征；空中可先閱讀各課程。"}完成一段後落島按 E 交付；已交付階段保存。退出會返回最後安全島，只放棄未交付段。</p><div class="journal-list">${WORLD.challenges.map(c => `<div><b>${escape(c.name)} · ${sim.state.courseStages[c.id] || 0}/${c.stages?.length || 1} 段</b><p>${escape(c.description)}<br>下一出發點：${escape(islandById(sim.courseStage(c)?.fromIslandId || c.islandId).name)}${sim.state.completedChallenges.includes(c.id) ? " · 已取得完成徽記" : ""}</p></div>`).join("")}</div>`,
    [{ label: "自由探索（保留進度）", primary: true, action: () => {
      if (!started) begin(loaded.elapsed > 0);
      if (sim.status === "complete") { sim.status = "paused"; guideHidden = true; }
      resume(); updateHud();
    } }, ...WORLD.challenges.filter(c => !sim.challenges.includes(c.id)).map(c => ({ label: `標記 ${c.name}`, disabled: !canChoose, action: () => {
      if (!started) begin(loaded.elapsed > 0);
      if (!sim.trackChallenge(c.id)) return;
      if (sim.status === "complete") { sim.status = "paused"; guideHidden = true; }
      resume(); updateHud();
    } })), { label: "返回航行誌", action: openHelp }], "測風遠征 / 階段永久保存");
}
function openSettings() {
  setModal(
    "settings",
    "調整你的航程",
    `${settingsHTML()}<h3>安全保存</h3><p>存檔格式 v3；落島、觀測樣本、碎片、階段交付、結算及設定變更時保存。舊版短程成績與徽記保留在歷史紀錄，新航程獨立計分。損壞存檔不會讓遊戲卡住，儲存失敗會明確提示。</p>${legacyHistoryHTML()}`,
    [
      {
        label: "完成",
        primary: true,
        action: () => (started ? openPause() : closeModal()),
      },
      {
        label: "重設全部進度",
        action: () =>
          setModal(
            "erase",
            "確定清除全部本機進度？",
            "<p>這會清除文明碎片、島嶼、觀測台、個人成績與本局 checkpoint，無法復原。音量與畫面偏好保留。</p>",
            [
              { label: "取消", primary: true, action: openSettings },
              {
                label: "清除全部進度",
                action: () => {
                  const r = store.clearProgress();
                  storageWarning(r.warning);
                  loaded = store.load().save;
                  sim = new FlightSimulation({ save: loaded });
                  menu();
                  notify("本機進度已重設。");
                },
              },
            ],
          ),
      },
    ],
  );
  bindSettings();
}
function legacyHistoryHTML() {
  const saved = sim.persisted;
  const records = Object.entries(saved.legacyRecords || {}).map(([id, item]) => `${escape(MODULES.find(m => m.id === id)?.name || id)} · ${clock(item.time)}${item.assisted ? " · 已使用輔助" : ""}`);
  const routes = Object.entries(saved.legacyRouteRecords || {}).map(([id, item]) => `${escape(WORLD.routes.find(r => r.id === id)?.name || id)} · ${clock(item.time)}`);
  const badges = (saved.legacyChallenges || []).map(id => escape(WORLD.challenges.find(c => c.id === id)?.name || id));
  if (!records.length && !routes.length && !badges.length) return "";
  return `<h3>舊版短程紀錄</h3><p>以下成績屬於改版前航程，獨立保留。</p>${records.length ? `<p>${records.join("<br>")}</p>` : ""}${routes.length ? `<p>${routes.join("<br>")}</p>` : ""}${badges.length ? `<p>舊徽記：${badges.join("、")}</p>` : ""}`;
}
function openJournal() {
  const ids = sim.relics;
  setModal(
    "journal",
    "風留下的航信",
    `<p>已發現 ${ids.length} / ${WORLD.relics.length}。靠近各浮島上的金色立體碎片即可拾取。</p><div class="journal-list">${WORLD.relics.map((r, i) => `<div><b><img src="${escape(r.icon || `./assets/icons/${r.id}.svg`)}" width="24" height="24" alt=""> ${String(i + 1).padStart(2, "0")} · ${ids.includes(r.id) ? escape(r.name) : "尚未發現"}</b><p>${ids.includes(r.id) ? escape(r.text) : escape(islandById(r.islandId).name) + " · " + escape(r.hint || "搜尋島面的金色光芒。")}</p></div>`).join("")}</div>`,
    [{ label: "返回航行誌", primary: true, action: openHelp }],
  );
}
function showDialogue(dialogue) {
  pause("dialogue");
  setModal(
    "dialogue",
    dialogue.title,
    `<p class="modal-note">${escape(dialogue.text)}</p><p>這段故事可跳過；下一個航標已在地圖上亮起。</p>`,
    [{ label: "繼續航程 / 跳過", primary: true, action: resume }],
    "✧ / 觀測台記錄",
  );
}
function showResults(playCue = false) {
  const s = sim.state,
    r = s.rating;
  input.setEnabled(false);
  if (!playCue) audio.setPaused(true);
  if (playCue) {
    audio.setPaused(false);
    audio.play("finish");
    resultAudioTimer = setTimeout(() => audio.setPaused(true), 1800);
  }
  bridge.state("paused");
  setModal(
    "result",
    WORLD.ending.title,
    `<p>${escape(WORLD.ending.text)}</p><div class="stats-grid"><div><strong>${r.speed}</strong><small>速度 · ${clock(s.elapsed)}</small></div><div><strong>${r.stability}</strong><small>平穩 · ${s.stalls} 次失速</small></div><div><strong>${r.exploration}</strong><small>探索 · ${s.relics.length}/${WORLD.relics.length}</small></div></div><p>測風挑戰 ${s.challenges.length}/${WORLD.challenges.length} · 本局航跡 ${Math.round(s.distance)}m · 種子 ${s.seed}<br>模組：${MODULES.find((m) => m.id === s.module).name} · ${r.assisted ? "風線輔助已使用，成績獨立標示" : "未使用風線輔助"}</p><p class="modal-note">下一趟目標：${escape(r.next)}</p>`,
    [
      { label: "再飛一趟", primary: true, action: () => begin(false) },
      { label: "繼續探索", action: openCourses },
      { label: "換模組與風況", action: menu },
      { label: "讀文明碎片", action: openJournal },
    ],
    resultStorageLabel(),
  );
}
function toggleView() {
  settings.camera = settings.camera === "overhead" ? "follow" : "overhead";
  applySettings();
  persist();
  if (sim.status === "running") $("#world").focus();
  notify(
    settings.camera === "overhead"
      ? "俯瞰模式 · V 返回追隨"
      : "追隨模式 · C 回正鏡頭",
  );
}
function routeToggle() {
  if (sim.state.trackedHint || sim.state.activeChallenge) return;
  sim.setRouteStyle(sim.routeStyle === "safe" ? "shortcut" : "safe");
  persist();
  updateHud();
  if (sim.status === "running") $("#world").focus();
  notify(
    WORLD.routes.find((r) => r.id === sim.state.objective.routeId)
      ?.description || "航線已切換",
  );
}
function updateHud() {
  const s = sim.state,
    p = s.player,
    objective = s.objective,
    route = WORLD.routes.find((r) => r.id === objective.routeId),
    hint = s.challengeHint || s.trackedHint || s.surveyHint,
    navigation = hint || objective,
    distance = Math.round(Math.hypot(p.x - navigation.x, p.z - navigation.z)),
    touch = matchMedia("(pointer: coarse)").matches,
    glideControl = touch ? "展帆鍵" : "Space",
    brakeControl = touch ? "減速鍵" : "Shift",
    interactControl = touch ? "互動鍵" : "E";
  if (started) {
    text(
      "#objective",
      `${s.challengeHint || s.trackedHint ? `測風 ${hint.stage}/${hint.stageTotal} · ` : s.activated.length < 3 ? `${s.activated.length + 1}/3 · ` : "返航 · "}${hint?.stageName || hint?.name || objective.name}  ${distance}m`,
    );
    text(
      "#objective-sub",
      s.nearby?.canInteract
        ? `安全落地 · 按 ${interactControl} ${s.activeChallenge ? "交付本階段" : "啟動航標"}`
        : p.grounded
          ? `${glideControl} 起航 · ${s.surveyHint ? "依序完成觀測環" : "地圖可切換航線"}`
          : hint?.landing ? `抵島上空按住 ${brakeControl} 下降` : hint ? sampleConditions(hint) || "穿過前方觀測環，記錄風況" : `抵島上空按住 ${brakeControl} 下降`,
    );
  }
  text(
    "#region",
    islandById(s.checkpoint).region + " / " + islandById(s.checkpoint).name,
  );
  text(
    "#flight-mode",
    p.grounded
      ? "安全地面"
      : p.braking
        ? "收帆下降"
        : p.gliding
          ? "乘風滑翔"
          : `自由落體 · ${glideControl} 展帆`,
  );
  text("#altitude", `${Math.round(p.y)} m 高度`);
  text("#speed", `${Math.round(Math.hypot(p.vx, p.vz))} m/s`);
  text("#clock", clock(s.elapsed));
  text(
    "#flight-tip",
    touch
      ? "左搖桿移動 · 展帆切換 · 按住減速下降"
      : "Space 起跳／展帆　·　Shift 收帆減速　·　E 互動",
  );
  text("#energy-value", `${Math.round(p.energy)}%`);
  $("#energy-bar").style.width = `${p.energy}%`;
  $(".energy-panel").classList.toggle("low", p.energy < 22);
  text(
    "#wind-label",
    s.hazard === "thunder"
      ? "⚡ 雷雲 · 向外繞行"
      : s.hazard === "fog"
        ? "≋ 雲霧 · 看航標"
        : s.wind.includes("thermal")
          ? "↑ 熱流抬升"
          : s.wind.includes("tailwind")
            ? "↗ 順風補能"
            : s.wind.includes("crosswind")
              ? "↔ 側風修正"
              : "風帶外 · 持續耗能",
  );
  text("#station-count", `觀測台 ${s.activated.length} / 3`);
  text("#relic-count", `碎片 ${s.relics.length} / ${WORLD.relics.length}`);
  text(
    "#challenge-count",
    `測風 ${s.challenges.length} / ${WORLD.challenges.length}`,
  );
  text("#route-label", s.activeChallenge ? "測風遠征航道" : s.trackedHint ? "安全接駁風道" : s.routeStyle === "safe" ? "安全風道" : "穿雲捷徑");
  $("#route-toggle").disabled = !!s.trackedHint || !!s.activeChallenge;
  text(
    "#route-toggle",
    s.activeChallenge ? "跟隨本段航門" : s.trackedHint ? "接駁使用安全風道" : s.routeStyle === "safe" ? "切換：技巧捷徑" : "切換：安全風道",
  );
  show("#interact", !!s.nearby?.canInteract && s.status === "running");
  text(
    "#interact",
    s.activeChallenge
      ? `${touch ? "" : "E · "}交付本階段`
      : s.activated.length === 3
      ? `${touch ? "" : "E · "}返回營地結算`
      : `${touch ? "" : "E · "}啟動觀測台`,
  );
  if (lastRoute !== objective.routeId) {
    scene.setRoute(route);
    lastRoute = objective.routeId;
  }
  show("#course", !!hint);
  show("#leave-course", !!s.activeChallenge || !!s.trackedHint);
  show("#guide", !guideHidden && !hint);
  if (hint) {
    const h = hint;
    const carrying = s.activeChallenge ? ["crosswind", "stability"].includes(WORLD.challenges.find(c => c.id === s.activeChallenge)?.kind) : s.activated.length === 1;
    text("#course-kicker", s.activeChallenge || s.trackedHint ? "選擇性測風遠征" : "主線觀測 · 不需停留等待");
    text("#course-title", h.transit ? `安全接駁 ${h.transitStep}/${h.transitTotal}` : `${s.challengeHint || s.trackedHint ? `${h.stageName} · ` : "航線觀測 · "}${h.entry ? "前往入口" : `${h.step}/${h.total}`}`);
    text(
      "#course-detail",
      `${p.grounded && !h.landing ? `${glideControl} 展帆起航。` : ""}${h.transit ? `沿風標前進，目標高度 ${Math.round(h.y)}m。抵島後進金環。` : h.entry ? h.instruction : h.landing ? `落到島中央，按 ${interactControl} 交付；已完成階段保留。` : `目標高度 ${Math.round(h.y)}m；垂直速度 ${p.vy.toFixed(1)}m/s。${sampleConditions(h) || "穿過環中央"}。`}${carrying && !h.entry && !h.transit ? ` 儀器穩定 ${Math.round(s.cargoStability)}%。` : ""}`,
    );
  }
  if (!guideHidden) {
    let step, title, detail;
    const destination = islandById(objective.islandId);
    if (p.grounded && s.checkpoint === objective.islandId) {
      step = "03 · 啟動航標";
      title =
        s.activated.length === 3
          ? `回營地中央按 ${interactControl}`
          : `靠近觀測台按 ${interactControl}`;
      detail = "安全落地已保存。走向島中央的金色航標完成這段航程。";
    } else if (!p.grounded && !p.gliding) {
      step = "飛行提示 · 收帆中";
      title = `按 ${glideControl} 重新展帆`;
      detail = `目前在自由落體。${glideControl} 是切換，不需要一直按住；展帆後風帶才會抬升你。`;
    } else if (!p.grounded && distance < 75 && p.y < destination.y + 3) {
      step = "飛行提示 · 高度不足";
      title = "先抬升，再降落";
      detail = `保持展帆，沿島邊螺旋熱流上升。先放開 ${brakeControl}；高過島面後再移向中央。`;
    } else if (
      !p.grounded &&
      distance < destination.radius - 4 &&
      p.y >= destination.y + 3
    ) {
      step = "02 · 安全落島";
      title = `現在按住 ${brakeControl} 下降`;
      detail = `你已在島面上方。持續修正方向，落地後放開 ${brakeControl}，走到觀測台按 ${interactControl}。`;
    } else if (s.activated.length) {
      step = "03 · 接續航程";
      title = objective.name;
      detail = route.description;
    } else if (p.grounded && s.checkpoint === "island-camp") {
      step = "01 · 讓風接住你";
      title = `按 ${glideControl} 起跳展帆`;
      detail = `${touch ? "左搖桿" : "WASD"} 朝前方金色航標移動，沿航線圖的安全風道前進。`;
    } else if (distance < 75) {
      step = "02 · 對準島面";
      title = "飛到島面上方再減速";
      detail =
        "保持展帆，朝金色直柱修正方向。到達島面上方後，提示會告訴你何時降落。";
    } else {
      step = "02 · 沿風帶前進";
      title = "順風補能，熱流抬升";
      detail = `沿地圖虛線到達蘆光庭。空中不用持續按 ${glideControl}；放開方向仍會滑翔。`;
    }
    text("#guide-step", step);
    text("#guide-text", title);
    text("#guide-detail", detail);
  }
  drawMap();
}
function drawMap() {
  const c = $("#map"),
    ctx = c.getContext("2d"),
    s = sim.state,
    scale = 0.48 / (WORLD.mapScale || 1),
    px = (x) => c.width * 0.3 + x * scale,
    pz = (z) => c.height * 0.6 + z * scale;
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.strokeStyle = "#bfd3bd14";
  ctx.lineWidth = 1;
  for (let x = 20; x < c.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, c.height);
    ctx.stroke();
  }
  for (let y = 0; y < c.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(c.width, y);
    ctx.stroke();
  }
  const course = WORLD.challenges.find(c => c.id === s.activeChallenge), stage = sim.courseStage(course);
  const tracked = WORLD.challenges.find(c => c.id === s.trackedHint?.id);
  const route = stage ? { waypoints: [islandById(stage.fromIslandId), ...stage.gates, islandById(stage.toIslandId)] } : tracked ? { waypoints: [s.player, ...s.transitWaypoints.slice(s.transitIndex), sim.courseEntry(tracked)] } : WORLD.routes.find((r) => r.id === s.objective.routeId);
  if (route) {
    ctx.strokeStyle = tracked || s.routeStyle === "safe" ? "#bcdfd0" : "#e6c17e";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    route.waypoints.forEach((p, i) =>
      i ? ctx.lineTo(px(p.x), pz(p.z)) : ctx.moveTo(px(p.x), pz(p.z)),
    );
    ctx.stroke();
    ctx.setLineDash([]);
  }
  WORLD.islands.forEach((i, index) => {
    ctx.beginPath();
    ctx.arc(px(i.x), pz(i.z), Math.max(5, i.radius * scale * 0.7), 0, Math.PI * 2);
    ctx.fillStyle = s.activated.includes(i.id) ? "#cdb97855" : "#6e97836b";
    ctx.fill();
    ctx.strokeStyle = i.id === s.objective.islandId ? "#ffdc8e" : "#b3cdb061";
    ctx.lineWidth = i.id === s.objective.islandId ? 2 : 1;
    ctx.stroke();
    ctx.fillStyle = "#f0e5ba";
    ctx.font = "17px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText(index + 1, px(i.x), pz(i.z) + 6);
  });
  WORLD.relics.forEach((r) => {
    if (s.relics.includes(r.id)) return;
    ctx.fillStyle = "#eac277";
    ctx.fillRect(px(r.x) - 2, pz(r.z) - 2, 4, 4);
  });
  const target = s.challengeHint || s.trackedHint || s.surveyHint;
  if (target) {
    ctx.beginPath(); ctx.arc(px(target.x), pz(target.z), 6, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffe6a7"; ctx.lineWidth = 2; ctx.stroke();
  }
  const p = s.player;
  ctx.save();
  ctx.translate(px(p.x), pz(p.z));
  ctx.rotate(p.heading);
  ctx.beginPath();
  ctx.moveTo(0, -9);
  ctx.lineTo(6, 7);
  ctx.lineTo(0, 3);
  ctx.lineTo(-6, 7);
  ctx.closePath();
  ctx.fillStyle = "#fff9dc";
  ctx.strokeStyle = "#24565a";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = "#adccbf";
  ctx.font = "14px Segoe UI";
  ctx.fillText("N ↑", c.width - 24, 22);
}
function handleEvents() {
  for (const e of sim.drainEvents()) {
    if (e.type === "save") persist();
    if (e.type === "glide") audio.play("glide");
    if (e.type === "wind") audio.play("tailwind");
    if (e.type === "land") {
      audio.play("land");
      notify(
        `${e.precise ? "精準落地" : "已安全落島"} · ${e.name} · checkpoint 已保存`,
      );
    }
    if (e.type === "stall") {
      audio.play("stall");
      notify(e.message);
    }
    if (["hint", "edge", "assist-offer", "low-energy"].includes(e.type)) {
      notify(e.message);
      if (e.type === "low-energy") audio.play("energy");
    }
    if (e.type === "relic") {
      audio.play("unlock");
      notify(`文明碎片 · ${e.name}｜${e.text}`);
    }
    if (e.type === "challenge") {
      audio.play("unlock");
      notify(`測風挑戰完成 · ${e.name} · 全部階段已保存`);
    }
    if (e.type === "challenge-start") { audio.play("ui"); notify(e.message); }
    if (e.type === "challenge-gate") audio.play("relic");
    if (e.type === "survey") { audio.play("relic"); notify(e.message); }
    if (e.type === "challenge-stage") { audio.play("unlock"); notify(e.message); }
    if (e.type === "challenge-reset" && e.reason === "cancel")
      notify(e.message);
    if (e.type === "station") {
      audio.play("unlock");
      showDialogue(e.dialogue);
    }
    if (e.type === "complete") {
      persist();
      showResults(true);
    }
  }
}
function tick(now) {
  const dt = Math.min((now - previous) / 1000, 0.15);
  previous = now;
  if (sim.status === "running") {
    accumulator += dt;
    let steps = 0;
    while (accumulator >= 1 / 60 && steps++ < 9) {
      sim.step(input.read(scene.yaw), 1 / 60);
      accumulator -= 1 / 60;
    }
    handleEvents();
  }
  scene.update(sim.state, Math.min(dt, 0.05), now / 1000, sim.state.objective);
  audio.update({
    speed: Math.hypot(sim.player.vx, sim.player.vz),
    energy: sim.player.energy,
    wind: sim.state.wind.length > 0,
  });
  uiClock += dt;
  if (uiClock > 0.1) {
    updateHud();
    uiClock = 0;
  }
  if (started && sim.status === "running") {
    frameCount++;
    elapsedSample += dt;
    frames.push(dt * 1000);
    if (frames.length > 9000) frames.shift();
    if (dt > 0.0333) longFrames++;
  }
  raf = requestAnimationFrame(tick);
}
async function initialize() {
  loaded = store.load();
  storageWarning(loaded.warning);
  loaded = loaded.save;
  settings = { ...loaded.settings };
  if (!loaded.elapsed && matchMedia("(prefers-reduced-motion: reduce)").matches)
    settings.reducedMotion = true;
  selectedModule = loaded.module;
  sim = new FlightSimulation({ save: loaded });
  scene = new AetherScene($("#world"));
  audio = new AudioEngine();
  applySettings();
  input = new FlightInput($("#world"), {
    pause: togglePause,
    help: openHelp,
    view: toggleView,
    recenter: () => scene.recenter(),
    interact: () => {
      sim.interact();
      handleEvents();
    },
    blur: () => {
      clearTimeout(resultAudioTimer);
      audio.setPaused(true);
      if (sim.status === "running") pause("blur");
    },
    rotate: (x, y) => scene.rotate(x, y),
    zoom: (d) => scene.zoom(d),
  });
  bridge = new HostBridge({
    "host:start": () => {
      if (!started) begin(loaded.elapsed > 0 || loaded.completed);
      else if (sim.status === "paused") resume();
    },
    "host:pause": () => pause(),
    "host:resume": resume,
    "host:restart": () => begin(false),
  });
  $("#modules").innerHTML = MODULES.map(
    (m, i) =>
      `<button class="module" data-module="${m.id}" aria-pressed="${m.id === selectedModule}"><span class="symbol">${["⌁", "◈", "↗"][i]}</span><strong>${m.name}</strong><small>${["轉向靈活 · 巡航較慢", "持久蓄能 · 轉向較緩", "順風加速 · 離風耗能"][i]}</small></button>`,
  ).join("");
  document
    .querySelectorAll(".module")
    .forEach((b) => (b.onclick = () => selectModule(b.dataset.module)));
  $("#seed").value = loaded.elapsed ? loaded.seed : 2718;
  $("#start").onclick = () => begin(false);
  $("#continue").onclick = () => begin(true);
  show("#continue", loaded.elapsed > 0);
  text("#continue", loaded.completed ? "查看結算／繼續探索" : "繼續上次航程");
  $("#daily-seed").onclick = () => {
    $("#seed").value =
      Number(
        new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Taipei",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
          .format(new Date())
          .replace(/-/g, ""),
      ) % 999999;
    notify("今日風況僅供本機重現，沒有全球排名。");
  };
  $("#new-seed").onclick = () => {
    $("#seed").value =
      (crypto.getRandomValues(new Uint32Array(1))[0] % 999999) + 1;
  };
  $("#pause").onclick = togglePause;
  $("#help").onclick = openHelp;
  $("#camera").onclick = toggleView;
  $("#route-toggle").onclick = routeToggle;
  $("#leave-course").onclick = () => {
    sim.cancelChallenge();
    handleEvents();
    updateHud();
    if (sim.status === "running") $("#world").focus();
  };
  $("#interact").onclick = () => {
    sim.interact();
    handleEvents();
  };
  $("#hide-guide").onclick = () => {
    guideHidden = true;
    show("#guide", false);
    if (sim.status === "running") $("#world").focus();
  };
  $("#close-modal").onclick = dismissModal;
  text("#build-label", `${BUILD.version} · ${BUILD.id} · 待獨立驗收`);
  $("#modal").addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      const items = [
          ...$("#modal").querySelectorAll("button,input,select"),
        ].filter((x) => !x.disabled),
        first = items[0],
        last = items.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  // Read-only inspection contract. No automation, teleport, or score mutation is exposed.
  Object.defineProperty(window, "__aetherwake", {
    value: Object.freeze({
      build: Object.freeze({ ...BUILD }),
      snapshot: () => sim.snapshot(),
      metrics: () => {
        const sorted = [...frames].sort((a, b) => a - b);
        const gl = scene.renderer.getContext(),
          debug = gl.getExtension("WEBGL_debug_renderer_info");
        return {
          ...scene.metrics,
          camera: scene.inspectCamera(sim.player),
          frameCount,
          elapsedSample,
          p50: sorted[Math.floor(sorted.length * 0.5)] || null,
          p95: sorted[Math.floor(sorted.length * 0.95)] || null,
          longFrames,
          renderer: scene.renderer
            .getContext()
            .getParameter(scene.renderer.getContext().RENDERER),
          unmaskedRenderer: debug
            ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)
            : null,
          audio: {
            contextState: audio.context?.state || "uninitialized",
            activeVoices: audio.active.size,
            peakVoices: audio.stats.peakVoices,
            musicVolume: audio.musicVolume,
            sfxVolume: audio.sfxVolume,
            loadedSamples: audio.sampleBuffers.size,
            sampleFailed: audio.sampleFailed,
          },
        };
      },
    }),
  });
  window.addEventListener("pagehide", () => {
    if (started) persist();
    input.clear();
    audio.setPaused(true);
  });
  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(raf);
    input.dispose();
    audio.dispose();
    scene.dispose();
    bridge.dispose();
  });
  updateHud();
  bridge.setReady();
  raf = requestAnimationFrame(tick);
}
initialize().catch((error) => {
  console.error(error);
  show("#fatal");
  text(
    "#fatal-message",
    `無法建立 3D 場景。請確認瀏覽器已啟用 WebGL，並重新載入。${error.message}`,
  );
  bridge?.send("game:error", { message: String(error.message).slice(0, 300) });
});
