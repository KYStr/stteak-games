import {
  PLANTS,
  DECORATIONS,
  RESIDENTS,
  RECIPES,
  QUESTS,
  DISCOVERIES,
  REGIONS,
  PHASES,
  PUZZLES,
  itemName,
} from "./content.js";
import {
  createState,
  phaseOf,
  growthPreview,
  gardenRating,
  questStatus,
  festivalStatus,
  transact,
} from "./rules.js";
import {STAGES, STAGE_MS, taskLabel} from "./campaign-content.js";
import {createCampaign, stepCampaign, campaignAction, campaignMetrics} from "./campaign.js";
import { loadSlot, saveSlot, loadRecords, recordCampaign, migrateState } from "./storage.js";
import { createWorld } from "./world.js";
import { createAudio } from "./audio.js";
import { bridge } from "./bridge.js";

const BUILD = "moss-and-moon-stteak8-r3",
  VERSION = "1.3.0";
const $ = (s) => document.querySelector(s),
  esc = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
const preferredSlot = () => {
  try {
    return localStorage.getItem("moss-and-moon:preferred-slot") === "2" ? 2 : 1;
  } catch {
    return 1;
  }
};
let slot = preferredSlot(),
  loaded = loadSlot(slot),
  state = loaded.state || createState(slot),
  tool = "plant",
  seed = PLANTS[0].id,
  decor = "planter",
  rotation = 0,
  selected = -1,
  movingFrom = null,
  started = false,
  paused = false,
  faulted = false,
  panelName = null,
  residentFilter = null,
  toastTimer,
  world,
  previousFocus = null;
let protectFallback = !!loaded.error && !loaded.recovered;
const sound = createAudio((message) => notice(message));
let connection,
  lastPanel = null;
const systemReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (state.revision === 0 && systemReduced) state.settings.reducedMotion = true;
let dialogueTimers = [];
let transitionGeneration = 0, transitioning = false;
function invalidateTransition() {
  transitionGeneration++; transitioning = false;
  $("#world").removeAttribute("aria-busy");
  $("#travel-status").hidden = true;
  document.querySelectorAll("[data-region]").forEach(el => { el.disabled = false; });
}
const paintOpportunity = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
let importSequence = 0; // Only the latest file read may commit to its unchanged garden session.
function revealDialogue() {
  for (const timer of dialogueTimers) clearInterval(timer);
  dialogueTimers = [];
  document.querySelectorAll("[data-full-dialogue]").forEach((p) => {
    p.textContent = p.dataset.fullDialogue;
  });
  document
    .querySelectorAll("[data-reveal-dialogue]")
    .forEach((b) => b.remove());
}
const count = (id) => state.inventory[id] || 0;
const button = (label, attr, cls = "") =>
  `<button ${attr} class="${cls}">${label}</button>`;
const costs = (items) =>
  Object.entries(items)
    .map(([id, n]) => `${esc(itemName(id))} ${count(id)}/${n}`)
    .join(" · ");
function notice(message, error = false) {
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 4400);
  if (error) sound.effect("error");
}
function persist(candidate = state) {
  const r = saveSlot(candidate);
  $("#save-status").textContent = r.ok
    ? "已保存 · 庭園 " + slot
    : "無法保存：" + r.error;
  if (r.ok) {
    protectFallback = false;
    loaded = { state:candidate, recovered:false, error:null };
    $("#save-warning").hidden = true;
  }
  if (!r.ok) notice("瀏覽器未能保存，請在設定匯出庭園備份。", true);
  return r.ok;
}
function action(a, { refresh = true } = {}) {
  if (transitioning) return false;
  if (["place", "move"].includes(a.type) && !world.canPlace(a.index)) {
    notice("你正站在這附近。先走到旁邊，讓家具也有自己的空間。", true);
    return false;
  }
  const result = transact(state, a);
  if (!result.ok) {
    notice(result.message, true);
    return false;
  }
  state = result.state;
  if (movingFrom !== null && state.grid[movingFrom]?.type !== "decor")
    movingFrom = null;
  const saved = persist();
  sound.effect(a.type, {confirmed:true});
  if (saved) notice(result.message);
  if (refresh) render();
  return true;
}
let selectedTask = 0, campaignHudMs = 0, campaignSaveMs = 0;
function newSeed() { return crypto.getRandomValues(new Uint32Array(1))[0] || 12345; }
function newJourney(seed,difficulty) {
  invalidateTransition();
  const fresh = createState(slot,{mode:'journey',seed,difficulty});
  campaignAction(fresh.campaign,{type:'begin'});fresh.revision=1;fresh.memo.tutorialStep=1;
  if(!persist(fresh))return;
  state=fresh;state.campaign.pendingMs=0;campaignSaveMs=0;selectedTask=0;
  closePanel();paused=false;render();resume();openPanel('journey-help');
}
function renderCampaign() {
  const c=state.campaign;
  $("#journey").hidden=state.mode!=='journey';
  document.body.classList.toggle("journey-mode",state.mode==='journey');
  if(!c)return;
  $("#journey-result-button").hidden = !["won","lost","stage-result"].includes(c.status);
  const g=stageGoalText(c);
  $("#journey-title").textContent=g;
  $("#journey-time").textContent=`${Math.ceil((STAGE_MS-c.stageElapsedMs)/1000)} 秒 · 月光 ${Math.ceil(c.integrity)}/100 · 任務 ${c.stageTasks}/${STAGES[c.stage].tasks}`;
  $("#journey-integrity").value=c.integrity;
  $("#journey-resources").textContent=`庇護絨苔 ${c.resources.moss} · 淨化植物 ${c.resources.plants}${c.carried?' · 攜帶光種 → '+((c.carried)%4+1)+' 號':''}`;
  for(let i=0;i<4;i++) {
    const n=c.taskNodes[i],row=$("#task-"+i),attached=c.hazards.some(h=>h.node===i&&h.attached);
    row.querySelector('span').textContent=`${i+1} ${n.done?'✓ 已恢復':taskLabel(n)}${attached?' · ◆ 陰影附著':''}${c.shieldTimers[i]>0?' · ⌂ 庇護':''}`;
    row.classList.toggle('threatened',attached);
  }
}
function stageGoalText(c) {return `${c.stage+1}/4 ${STAGES[c.stage].name} · ${c.difficulty==='standard'?'標準':'溫柔'}`;}
function performCampaign(kind,node=selectedTask) {
  if(state.mode!=='journey'||paused||transitioning||$("#panel").open)return;
  selectedTask=node;
  const c=state.campaign,n=c.taskNodes[node];
  if(kind==='auto')kind=tool==='water'?'water':tool==='harvest'?'harvest':c.carried&&node===c.carried%4?'deliver':n.kind==='path'&&n.rotation!==n.target?'rotate':'perform';
  const result=campaignAction(c,{type:kind,node},world.position());
  if(!result.ok){notice(result.message,true);return;}
  state.revision++;persist();sound.effect(kind==='rotate'?'ui':kind==='perform'?'success':kind,{confirmed:true});
  world.animate(kind==='water'?'water':'harvest');world.campaignFeedback(node);notice(result.message);renderCampaign();
}
function showCampaignResult() {
  const c=state.campaign;
  if(['won','lost'].includes(c.status)) {
    const result=recordCampaign(c);
    if(result.ok)c.resultRecorded=true;
    else notice('最佳紀錄保存失敗，庭園仍保留；請匯出備份。',true);
    if(c.status==='won'){state.festival=true;state.festivalDay=state.day;state.region='garden';}
    state.revision++;persist();
  }
  render();
  world.setEnabled(false);
  if(!paused){sound.setActive(true);sound.effect(c.status==='lost'?'error':'festival',{confirmed:true});}
  openPanel('journey-result');
  if(c.status==='won')world.celebrate();
}
function campaignTick(elapsedMs) {
  if(!started||paused||faulted||transitioning||document.hidden||$("#panel").open||state.mode!=='journey'||state.campaign.status!=='playing')return;
  const c=state.campaign;
  if(c.pendingMs+elapsedMs>60000){pause();notice('畫面長時間中斷，守望已暫停。準備好再繼續。');return;}
  c.pendingMs+=Math.max(0,elapsedMs);
  // At most two seconds of simulation per frame; preserve the remaining elapsed time.
  let budget=8;
  while(c.pendingMs>0&&budget--&&c.status==='playing')c.pendingMs-=stepCampaign(c,c.pendingMs);
  campaignHudMs+=elapsedMs;campaignSaveMs+=elapsedMs;
  if(campaignHudMs>=250){renderCampaign();campaignHudMs%=250;}
  if(state.campaign.status!=='playing'){state.campaign.pendingMs=0;state.revision++;persist();renderCampaign();showCampaignResult();}
  else if(campaignSaveMs>=5000){persist();campaignSaveMs%=5000;}
}
function dailyCounts() {
  return {
    thirsty: state.grid.filter(
      (c, i) =>
        c?.type === "plant" && !c.watered && !growthPreview(state, i).mature,
    ).length,
    mature: state.grid.filter(
      (c, i) => c?.type === "plant" && growthPreview(state, i).mature,
    ).length,
  };
}
function guidance() {
  if (state.mode === "journey") return {text:STAGES[state.campaign.stage].mechanic,label:"旅程操作說明 →",panel:"journey-help"};
  const { thirsty, mature } = dailyCounts();
  if (!state.completedQuests.includes("mira-1")) {
    if (count("moss") >= 2)
      return {
        text: "兩份絨苔準備好了！把第一抹綠意送給米拉。",
        label: "拜訪米拉 →",
        panel: "quests",
        resident: "mira",
      };
    const planted = state.grid.filter(
      (c) => c?.type === "plant" && c.id === "moss",
    ).length;
    if (planted + count("moss") < 2)
      return {
        text: `第一步：種下兩份絨苔（目前 ${planted}/2）。種子在下方選擇，點田地即可種植。`,
        label: count("seed:moss") ? "選格種植 →" : "去森林找種子 →",
        panel: count("seed:moss") ? "grid" : "map",
        tool: "plant",
      };
  }
  if (mature)
    return {
      text: `${mature} 株植物成熟了！收成後可以交付心願，或留作手作材料。`,
      label: "收成成熟植物 →",
      panel: "grid",
      tool: "harvest",
    };
  if (thirsty)
    return {
      text: `今天還有 ${thirsty} 株植物需要澆水。照顧好它們，睡一晚就會長大。`,
      label: "照顧庭園 →",
      panel: "grid",
      tool: "water",
    };
  const ready = state.activeQuests.find((id) => questStatus(state, id).ready);
  if (ready)
    return {
      text: `「${QUESTS.find((q) => q.id === ready).title}」已備齊，鄰居正在等你！`,
      label: "交付心願 →",
      panel: "quests",
    };
  if (!state.completedQuests.includes("mira-1"))
    return {
      text: "今天已照顧好植物。絨苔需要三個澆水日；準備好了，就睡到明天。",
      label: "讓今天落幕 →",
      panel: "sleep",
    };
  const f = festivalStatus(state);
  if (f.ready)
    return {
      text: "大家都準備好了。你的庭園，將迎來第一場月光慶典。",
      label: "點亮月光慶典 →",
      panel: "journal",
    };
  if (state.festival)
    return {
      text: `月光慶典已點亮。心願 ${state.completedQuests.length}/12 · 自然圖鑑 ${state.discoveries.length}/12，還有小故事等著你。`,
      label: "翻開庭園手帳 →",
      panel: "journal",
    };
  return {
    text: `月光慶典 · 心願 ${state.completedQuests.length}/8。${f.missing[0] || "佈置你的庭園。"}每位鄰居都願意幫忙。`,
    label: "看看鄰居的心願 →",
    panel: "quests",
  };
}
function goalText() {
  return guidance().text;
}
function followGuide() {
  const g = guidance();
  if (state.region !== "garden" && g.panel === "grid") travel("garden");
  if (g.tool) {
    tool = g.tool;
    if (tool === "plant") seed = "moss";
    const i = state.grid.findIndex((c, i) =>
      tool === "plant"
        ? !c
        : tool === "water"
          ? c?.type === "plant" && !c.watered && !growthPreview(state, i).mature
          : c?.type === "plant" && growthPreview(state, i).mature,
    );
    selected = i;
    world.select(i);
  }
  residentFilter = g.resident || null;
  render();
  openPanel(g.panel);
}
function render() {
  const phase = PHASES[phaseOf(state.day)],
    rating = gardenRating(state);
  $("#day").textContent =
    `第 ${state.day} 日 · ${phase.icon} ${phase.name} · ${state.day % 2 ? "還有 2 日" : "明日換相"}`;
  $("#coins").textContent = "◈ " + state.coins;
  $("#rating").textContent = `${"✧".repeat(rating.level)} ${rating.label}`;
  $("#goal").textContent = goalText();
  $("#guide-action").textContent = guidance().label;
  $("#switch-slot").textContent = `庭園 ${slot} · 切換存檔`;
  $("#new-game-options").hidden = state.revision > 0;
  $("#start").disabled = false;
  $("#start").innerHTML =
    (state.revision > 0 ? "繼續庭園 · 第 " + state.day + " 日" : "走進庭園") +
    " <span>→</span>";
  $("#region-label").textContent =
    state.region === "garden"
      ? "月光庭園"
      : REGIONS.find((r) => r.id === state.region)?.name || "月光庭園";
  $("#build-label").textContent = "進度保存在這台裝置 · 可匯出庭園備份";
  document.body.classList.toggle("reduced", !!state.settings?.reducedMotion);
  sound.update(state.settings || {});
  world?.sync(state);
  document
    .querySelectorAll("[data-tool]")
    .forEach((el) => el.classList.toggle("active", el.dataset.tool === tool));
  document
    .querySelectorAll("[data-region]")
    .forEach((el) =>
      el.classList.toggle("active", el.dataset.region === state.region),
    );
  if (state.region !== "garden")
    $("#seedbar").innerHTML =
      (REGIONS.some((r) => r.id === state.region)
        ? button("♧ 拾取今日贈禮", `data-gather="${state.region}"`)
        : "") +
      button("✧ 探索這片小路", 'data-open="fieldguide"') +
      button("⌂ 回到庭園", 'data-region="garden"');
  // cottage仍為合法legacy區，但不是有每日贈禮的採集區。
  else if (tool === "plant")
    $("#seedbar").innerHTML = PLANTS.map((p) =>
      button(
        `<span class="dot" style="background:${p.color}"></span>${p.name} ${count("seed:" + p.id)}`,
        `data-seed="${p.id}"`,
        seed === p.id ? "active" : "",
      ),
    ).join("");
  else if (tool === "decorate")
    $("#seedbar").innerHTML =
      button("選擇家具", 'data-open="decorate"') +
      button("旋轉 " + rotation * 90 + "°", "data-rotate-decor") +
      button("撤銷上次佈置", 'data-action="undo"') +
      button("選格面板", 'data-open="grid"');
  else {
    const { thirsty, mature } = dailyCounts();
    $("#seedbar").innerHTML =
      button(
        tool === "water"
          ? `♒ 一起澆水 · ${thirsty} 株`
          : `✂ 收成全部 · ${mature} 株`,
        `data-action="${tool === "water" ? "waterAll" : "harvestAll"}" ${(tool === "water" ? thirsty : mature) ? "" : "disabled"}`,
      ) + button("選格面板", 'data-open="grid"');
  }
  document
    .querySelectorAll("[data-tool],[data-seed],[data-region]")
    .forEach((el) =>
      el.setAttribute("aria-pressed", String(el.classList.contains("active"))),
    );
  renderCampaign();
  updateContext();
  if (panelName) renderPanel();
}
function updateContext() {
  if (selected < 0 || state.region !== "garden") {
    $("#context").textContent =
      state.region === "garden" ? "" : "點選採集籃、發現物或月輪謎題。";
    return;
  }
  const cell = state.grid[selected];
  if (cell?.type === "plant") {
    const p = growthPreview(state, selected);
    $("#context").textContent =
      `第 ${selected + 1} 格 · ${itemName(cell.id)} · ${p.mature ? "成熟，可收成" : `${cell.growth}/${p.required} 生長 · ${p.reason}`}`;
  } else if (cell) {
    $("#context").textContent =
      `第 ${selected + 1} 格 · ${itemName(cell.id)} · ${cell.rotation * 90 || 0}°`;
  } else
    $("#context").textContent =
      `第 ${selected + 1} 格 · 空地 · ${tool === "plant" ? "種植 " + itemName(seed) : tool === "decorate" ? (movingFrom === null ? "放置 " + itemName(decor) : "搬動至這裡") : "先種下植物吧"}`;
}
function chooseTool(next) {
  tool = next;
  movingFrom = null;
  render();
  if (next === "decorate") openPanel("decorate");
}
function tile(i) {
  selected = i;
  if (state.region !== "garden") return;
  const cell = state.grid[i];
  if (tool === "plant") action({ type: "plant", index: i, id: seed });
  else if (tool === "water") action({ type: "water", index: i });
  else if (tool === "harvest") action({ type: "harvest", index: i });
  else if (cell?.type === "decor" && movingFrom === null) {
    movingFrom = i;
    rotation = cell.rotation || 0;
    notice("已選取 " + itemName(cell.id) + "。點空格後確認搬動。");
    render();
  } else openPanel("placement");
  updateContext();
}
function interaction(obj) {
  if (obj.kind === "campaign") { selectedTask = obj.id; performCampaign("auto",obj.id); return; }
  if (obj.kind === "house") openPanel("sleep");
  else if (obj.kind === "shop") openPanel("shop");
  else if (obj.kind === "resident") {
    residentFilter = obj.id;
    action({ type: "talk", id: obj.id });
    openPanel("quests");
  } else if (obj.kind === "gather")
    action({ type: "gather", region: obj.region });
  else if (obj.kind === "discovery") {
    if (!state.discoveries.includes(obj.id))
      action({ type: "discover", id: obj.id });
    openPanel("discovery:" + obj.id);
  } else if (obj.kind === "puzzle") openPanel("puzzle:" + obj.region);
  else if (obj.kind === "return") travel("garden");
}
async function travel(region) {
  if (transitioning || faulted) return;
  if (state.mode === 'journey' && state.campaign.status === 'playing' && region !== STAGES[state.campaign.stage].region) {
    notice('本章正在守望這片月光。章節結束後可散步，或從結果繼續下一區。',true);return;
  }
  const wasPaused = paused;
  $("#travel-status").hidden = false;
  $("#travel-status").textContent = "正在前往…";
  $("#world").setAttribute("aria-busy", "true");
  world.setEnabled(false);
  if (!action({type:"travel", region}, {refresh:false})) { invalidateTransition(); world.setEnabled(started&&!paused&&!$("#panel").open); return; }
  const generation = ++transitionGeneration;
  transitioning = true;
  document.querySelectorAll("[data-region]").forEach(el => { el.disabled = true; });
  closePanel();
  world.setEnabled(false);
  await paintOpportunity();
  if (generation !== transitionGeneration || faulted) return;
  selected = -1; movingFrom = null;
  world.select(-1);
  render();
  transitioning = false;
  $("#travel-status").hidden = true;
  $("#world").removeAttribute("aria-busy");
  document.querySelectorAll("[data-region]").forEach(el => { el.disabled = false; });
  if (wasPaused) paused = true;
  world.setEnabled(started && !paused && !$("#panel").open);
  if (!paused && !$("#panel").open) $("#world").focus({preventScroll:true});
}
function welcomeMode(value) {
  $("#welcome").hidden = !value;
  $("#game").classList.toggle("welcome-mode", value);
  for (const el of $("#game").children)
    if (!["welcome", "panel", "fatal"].includes(el.id)) el.inert = value;
}
function returnToWorld() {
  if (started && !faulted) resume();
  else closePanel();
  if (started && !faulted) $("#world").focus({ preventScroll: true });
}
function start() {
  if (faulted) return;
  $("#start").disabled = true;
  notice("正在走進月光庭園…");
  if (state.revision === 0 && state.mode !== "journey" && $("#new-mode").value === "journey") {
    state.mode = "journey";
    state.campaign = createCampaign($("#new-seed").value || newSeed(),$("#new-difficulty").value);
  }
  if (state.mode === "journey" && state.campaign.status === "ready") campaignAction(state.campaign,{type:"begin"});
  started = true;
  paused = false;
  welcomeMode(false);
  world.setEnabled(!transitioning);
  // Commit onboarding before optional UI/layout work; audio resume stays in the trusted gesture.
  if (state.revision === 0) {
    const next = transact(state,{type:'tutorial',step:1});
    if (next.ok) {state=next.state;if(!loaded.error)persist();}
  }
  sound.setActive(true);
  sound.unlock();
  connection?.state("running");
  reportLoadOutcome();
  render();
  if (state.mode === "journey" && ["stage-result","won","lost"].includes(state.campaign.status)) showCampaignResult();
  if (!$("#panel").open) $("#world").focus();
}
function reportLoadOutcome(normalMessage) {
  $("#save-warning").hidden = true;
  if (loaded.recovered) {
    if (persist()) notice("已從上一份有效快照恢復庭園，並修復主要存檔。");
  } else if (loaded.error) {
    $("#save-warning-text").textContent = loaded.error;
    $("#save-warning").hidden = false;
    notice(loaded.error, true);
  }
  else
    notice(
      normalMessage || (state.mode === "journey" ? "守望開始。從右側任務列「走近 1」，再按「照顧」，守住月光。" : state.day > 1 || state.stats.planted > 0
        ? "歡迎回家。接著照顧庭園，或翻開手帳看看下一步吧。"
        : "歡迎回家。種下兩份絨苔，再澆水吧。"),
    );
}
function pause() {
  if (!started || faulted) return;
  world?.endCelebration();
  const alreadyPaused = paused;
  paused = true;
  world.setEnabled(false);
  sound.setActive(false);
  connection?.state("paused");
  if (!alreadyPaused || !$("#panel").open || !panelName)
    openPanel("settings", true);
} // 保留世界、音效及bridge暫停回報；已有命名dialog的重複暫停不重建DOM，首次／無面板仍開設定。
function resume() {
  if (faulted) return;
  if (!started) {
    start();
    return;
  }
  paused = false;
  closePanel();
  world.setEnabled(!transitioning);
  sound.setActive(true);
  connection?.state("running");
}
function openPanel(name, fromPause = false) {
  if (faulted) return;
  if (!$("#panel").open) previousFocus = document.activeElement;
  panelName = name;
  world?.setEnabled(false);
  if (!fromPause) sound.effect("click");
  renderPanel();
  if (!$("#panel").open) {
    $("#panel").showModal();
    $("#panel-title").focus({ preventScroll: true });
  }
}
function closePanel() {
  revealDialogue();
  world?.endCelebration();
  panelName = null;
  world?.clearPreview();
  if ($("#panel").open) $("#panel").close();
  if (started && !paused && !transitioning) world?.setEnabled(true);
  if (previousFocus?.isConnected && !previousFocus.closest("[hidden],[inert]"))
    previousFocus.focus({ preventScroll: true });
  else (started ? $("#world") : $("#start")).focus({ preventScroll: true });
}
function showFailure(title, message) {
  if (faulted) return;
  importSequence++;
  invalidateTransition();
  releaseEscape();
  faulted = true;
  paused = true;
  world?.setEnabled(false);
  sound.setActive(false);
  closePanel();
  const fatal = $("#fatal");
  fatal.hidden = false;
  fatal.setAttribute("role", "alertdialog");
  fatal.setAttribute("aria-modal", "true");
  fatal.setAttribute("aria-labelledby", "fatal-heading");
  fatal.innerHTML = `<h2 id="fatal-heading">${esc(title)}</h2><p>${esc(message)}</p><button onclick="location.reload()">恢復庭園</button>`;
  for (const child of $("#game").children)
    if (child !== fatal) child.inert = true;
  fatal.querySelector("button").focus({ preventScroll: true });
  connection?.state("paused");
}
function title(text, kicker = "苔蘚與月光 · 庭園手帳") {
  $("#panel-title").textContent = text;
  $("#panel-kicker").textContent = kicker;
}
function renderPanel() {
  revealDialogue();
  let html = "";
  const body = $("#panel-body"),
    active = document.activeElement,
    changed = lastPanel !== panelName,
    restore = !changed && body.contains(active),
    focusId = active?.id,
    focusData = active?.dataset ? { ...active.dataset } : {},
    scroll = $("#panel").scrollTop;
  lastPanel = panelName;
  if (panelName === "journey-help" || (panelName === "help" && state.mode === "journey")) {
    title("月光旅程 · 四章守望");
    html = `<p><strong>每章守望 160 秒，共 10 分 40 秒的實際遊玩。</strong>完成本章任務數並守住月光，四章後點亮慶典。月光歸零，或時間到但任務不足，將失敗。選單、暫停、背景切換和旅行不計時。</p><p>${STAGES[state.campaign.stage].mechanic}</p><ol><li>右側即時任務列：選「走近」，人物會沿路走到信標；再按「照顧」。也可點地面移動，走近編號 ◇ 按 E。</li><li>水滴／工具 2 或任務列「驅散」：驅散信標 1.7 公尺內的陰影。每個附著陰影持續消耗月光。</li><li>任務每 20 秒刷新。完成 +4 月光、獲得絨苔或培育植物；用絨苔庇護 20 秒，或消耗植物淨化附著陰影。</li><li>第二章拾種→下一編號交付；第三章先旋轉到目標方向，再接通光路；第四章綜合四節光路與接力。</li></ol><p>三種策略：沿信標輪流澆水；先完成任務累積庇護；保存培育植物作緊急淨化。完成額外任務可提高評等。標準為預設；溫柔模式陰影較慢出現、傷害較低。自由庭園完全不計時。</p><p>WASD／方向鍵移動，E 照顧附近信標；2 換澆水，3 換淨化，1 換一般照顧。右側任務列支援 Tab／Enter。Esc 暫停，選單內同樣暫停旅程。</p><div class="actions">${button("開始守望", "data-close", "primary")}</div>`;
  } else if (panelName === "journey-result") {
    const c=state.campaign,m=campaignMetrics(c),record=loadRecords();
    if(c.status==='stage-result'){
      m.score=Math.max(0,c.totalTasks*100+Math.round(c.integrity)*5+c.completedStages.length*250-c.mistakes*10);
      m.rank=m.score>=7000?'S':m.score>=6000?'A':m.score>=5000?'B':'C';
    }
    title(c.status === 'won' ? '月光照亮了共同的家' : c.status === 'lost' ? '這一次，月光歇息了' : '一章守望完成',`月光旅程 · 第 ${c.stage+1}/4 章`);
    html=`<p>${c.status==='lost'?esc(c.reason):c.status==='won'?'米拉鋪好絨苔，洛恩帶來新葉，露米點亮提燈。四個月相的守望，讓大家重新聚在庭園。':'下一章將引入新的照顧方式；月光至少恢復至 70。'}</p><p>種子 ${c.seed} · ${c.difficulty==='standard'?'標準':'溫柔'} · 實際遊玩 ${(c.activeMs/1000).toFixed(1)} 秒</p><div class="split"><div><h3>${c.status==='stage-result'?'預估 ':''}${m.rank} · ${m.score} 分</h3><p>完成任務 ${c.totalTasks} ×100<br>剩餘月光 ${Math.round(c.integrity)} ×5<br>完成章節 ${c.completedStages.length} ×250<br>失誤 ${c.mistakes} ×−10</p></div><div><h3>最佳 ${record.best?.score||0}</h3><p>S ≥7000 · A ≥6000 · B ≥5000 · C<br>額外任務與保留月光能提高評等。</p></div></div><div class="actions">${c.status==='stage-result'?button('前往下一章','data-campaign-next','primary'):button('重試相同種子','data-campaign-retry','primary')}${c.status==='lost'?button('重試這一章','data-campaign-retry-stage'):''}${button('新種子旅程','data-open="journey-new"')}${button('繼續自由庭園','data-campaign-free')}${button('匯出旅程備份','data-export')}</div>`;
  } else if (panelName === "journey-new") {
    title("新的月光旅程");
    html=`<p>將取代目前庭園；最佳紀錄保留，另一存檔不變。可先匯出備份。</p><label class="setting">種子 <input id="journey-seed" type="number" min="1" max="4294967295" value="${newSeed()}"></label><label class="setting">難度 <select id="journey-difficulty"><option value="standard">標準 · 正式守望</option><option value="gentle">溫柔 · 較少陰影</option></select></label><div class="actions">${button('換一個種子','data-random-journey')}${button('確認開始新旅程','data-campaign-new','primary')}${button('匯出備份','data-export')}</div>`;
  } else if (panelName === "help") {
    title("在月光下，慢慢來");
    html = `<p>你的目標是為月光慶典準備一座庭園：<strong>完成 8 份委託、放置月光提燈／月藤拱門／慶典餐桌，達到二級園地評價。</strong>慶典後仍可自由遊玩。</p><ol><li>選「種植」及絨苔，點兩塊空地。種子不夠可免費到森林採集。</li><li>選「澆水」，點剛種下的兩株。水滴代表今天已澆水。</li><li>選「睡覺」換日；重複澆水與睡覺三晚，絨苔成熟。</li><li>選「收成」帶回背包。打開「鄰居」接取並交付米拉的第一抹綠意。</li></ol><h3>你決定一天多長</h3><p>缺水只延後生長，不會枯萎，沒有體力或真實時間倒數。月相每兩天更換；相鄰加成會顯示在選格說明。可隨時走訪三個採集區、解謎或佈置。</p><h3>鍵盤、滑鼠與觸控</h3><p>WASD／方向鍵移動；E 與身旁物件互動；1–4 換工具；Q／R 旋轉鏡頭；Esc 暫停。直接點田地即可使用工具，點地面可移動。畫面方向鍵與旋轉鍵提供觸控替代。所有格位也可在手帳的「選格面板」透過 Tab／Enter 操作。</p><p>家具：選家具 → 點空格 → 旋轉 → 確認。點已放置家具再點空格可搬動。最近一次耕地／佈置可撤銷；交易與收成無法重複領取。</p><p class="note">每次動作會在本機保存。兩個存檔獨立，沒有雲端同步。設定可匯出備份。三維空間目前未提供完整螢幕閱讀器導航，選格面板提供文字替代。</p><div class="actions">${button("開始第一步", "data-close", "primary")}${button("開啟選格面板", 'data-open="grid"')}</div>`;
  } else if (panelName === "journal") {
    title("庭園手帳");
    const f = festivalStatus(state),
      g = gardenRating(state);
    html = `<p>${goalText()}</p><div class="split"><div><h3>${g.label} · 第 ${g.level} 級</h3><p>${g.plants} 株植物 / ${g.decorations} 件裝飾 / ${g.variety} 種植物</p><p class="note">${esc((g.missing || []).join(" · "))}</p></div><div><h3>月光慶典</h3><p>${state.completedQuests.length}/8 委託 · 圖鑑 ${state.discoveries.length}/12</p><p class="note">${esc(f.missing.join(" · ")) || "準備完成！"}</p><div class="meter" aria-label="慶典心願進度 ${Math.min(state.completedQuests.length, 8)}/8"><span style="width:${Math.min(state.completedQuests.length / 8, 1) * 100}%"></span></div></div></div><div class="actions">${button(state.festival ? "重溫慶典" : "點亮慶典", "data-festival", f.ready || state.festival ? "primary" : "")}${button("查看委託", 'data-open="quests"')}${button("自然圖鑑", 'data-open="discoveries"')}${button("選格面板", 'data-open="grid"')}${button("操作說明", 'data-open="help"')}</div><h3>接下來的月亮</h3>${Array.from(
      { length: 4 },
      (_, i) => {
        const day = state.day + i,
          phase = PHASES[phaseOf(day)];
        return `<div class="row"><span>第 ${day} 日 · ${phase.icon} ${phase.name}</span><small>${phase.description}</small></div>`;
      },
    ).join(
      "",
    )}<p class="note">沒有委託會過期。你可以選擇種植效率、手作或庭園主題，按自己的步調準備。</p>`;
  } else if (panelName === "grid") {
    title("選一塊田地");
    html = `<p>共 8×8 格，從北到南排列。方向鍵選格，Enter 選取；下方按鈕執行工具。</p><div class="grid-picker">${state.grid.map((c, i) => button(`${i + 1}<br>${c ? (c.type === "plant" ? "♧" : "⌑") : "·"}`, `data-grid-select="${i}" aria-label="第 ${i + 1} 格，${c ? itemName(c.id) + (c.type === "plant" ? (growthPreview(state, i).mature ? "，成熟" : c.watered ? "，已澆水" : "，待澆水") : "") : "空地"}" aria-pressed="${selected === i}"`, selected === i ? "selected" : "")).join("")}</div><p id="grid-info">${esc($("#context").textContent)}</p><div class="actions">${button("在選取格執行 " + { plant: "種植", water: "澆水", harvest: "收成", decorate: "佈置" }[tool], `data-grid-use ${selected < 0 ? "disabled" : ""}`, "primary")}${button("種植", 'data-grid-tool="plant"')}${button("澆水", 'data-grid-tool="water"')}${button("收成", 'data-grid-tool="harvest"')}${button("佈置", 'data-grid-tool="decorate"')}${button("清除／收回", `data-clear ${selected < 0 ? "disabled" : ""}`)}${button("撤銷", 'data-action="undo"')}${tool === "water" ? button(`一起澆水 · ${dailyCounts().thirsty} 株`, 'data-action="waterAll"') : tool === "harvest" ? button(`收成全部 · ${dailyCounts().mature} 株`, 'data-action="harvestAll"') : ""}</div>${tool === "plant" ? `<label class="inline-label">選擇種子 <select id="grid-seed">${PLANTS.map((p) => `<option value="${p.id}" ${seed === p.id ? "selected" : ""}>${p.name}（${count("seed:" + p.id)}）</option>`).join("")}</select></label>` : ""}`;
  } else if (panelName === "bag") {
    title("隨身背包");
    html = `<p>種子、收成、材料與家具都在這裡。背包無數量容量限制；物品均以整數保存。</p>${
      Object.entries(state.inventory)
        .filter(([, n]) => n > 0)
        .map(
          ([id, n]) =>
            `<div class="row"><div><strong>${esc(itemName(id))}</strong><p>${id.startsWith("seed:") ? "種下並每天澆水" : DECORATIONS.some((d) => d.id === id) ? "選佈置後放到空格" : "可用於手作或委託"}</p></div><span>× ${n}</span></div>`,
        )
        .join("") || "<p>背包空空的。森林每天都有免費材料。</p>"
    }<div class="actions">${button("免費救援種子", 'data-action="rescue"')}${button("前往森林", 'data-region="forest"')}${button("買賣物品", 'data-open="shop"')}</div>`;
  } else if (panelName === "shop") {
    title("森林小舖", "今天也有一些好東西");
    html = `<p>你有 <strong>◈ ${state.coins}</strong>。每次只買／賣一件，交易即保存。所有慶典物件也可用材料手作。</p><h3>八種種子</h3>${PLANTS.map((p) => `<div class="row"><div><strong><span class="dot" style="background:${p.color}"></span>${p.name}</strong><p>${p.description}</p><span class="tags">種子 ${count("seed:" + p.id)} · 收成 ${count(p.id)}</span></div><div>${button("買 ◈" + p.price, `data-buy="seed:${p.id}"`)} ${button("賣 ◈" + p.sell, `data-sell="${p.id}" ${count(p.id) ? "" : "disabled"}`)}</div></div>`).join("")}<h3>採集材料 · 每份可售 ◈1</h3>${Object.keys(
      { wood: 1, fiber: 1, stone: 1, shell: 1, crystal: 1 },
    )
      .map(
        (id) =>
          `<div class="row"><strong>${itemName(id)} ×${count(id)}</strong>${button("賣 ◈1", `data-sell="${id}" ${count(id) ? "" : "disabled"}`)}</div>`,
      )
      .join(
        "",
      )}<h3>家具與裝飾</h3>${DECORATIONS.map((d) => `<div class="row"><div><strong>${d.name}</strong><p>${d.festival ? "慶典必需 · " : ""}${d.tags.map(tagName).join(" / ")} · 背包 ${count(d.id)}</p></div>${button("買 ◈" + d.price, `data-buy="${d.id}"`)}</div>`).join("")}<div class="actions">${button("免費救援種子", 'data-action="rescue"')}${button("改用材料手作", 'data-open="craft"')}</div>`;
  } else if (panelName === "craft") {
    title("林間手作");
    html = `<p>慢慢把採集與收成變成生活的模樣。材料足夠才會一次扣除，製成品放入背包。</p>${RECIPES.map((r) => `<div class="row"><div><strong>${r.name}</strong><p>${costs(r.cost)}</p></div>${button("製作", `data-craft="${r.id}"`)}</div>`).join("")}<div class="actions">${button("去採集材料", 'data-open="map"')}${button("佈置製成品", 'data-open="decorate"')}</div>`;
  } else if (panelName === "decorate") {
    title("把庭園變成你的樣子");
    html = `<p>選一件家具，再點空格預覽。選取已放好的家具再點空格可搬動。外圍道路永遠保留，不會被佈置封住。</p>${DECORATIONS.map((d) => `<div class="row"><div><strong>${d.name}</strong><p>${d.tags.map(tagName).join(" / ")}${d.festival ? " · 慶典必需" : ""}</p></div>${button(`選取 ×${count(d.id)}`, `data-decor="${d.id}" ${count(d.id) ? "" : "disabled"}`, decor === d.id ? "active" : "")}</div>`).join("")}<div class="actions">${button("選格面板", 'data-open="grid"')}${button("撤銷最近佈置", 'data-action="undo"')}${button("買些家具", 'data-open="shop"')}</div>`;
  } else if (panelName === "placement") {
    title(movingFrom === null ? "放置預覽" : "搬動預覽");
    const id = movingFrom === null ? decor : state.grid[movingFrom]?.id;
    world.preview(id, selected, rotation);
    html = `<p><strong>${esc(itemName(id))}</strong> → 第 ${selected + 1} 格，方向 ${rotation * 90}°。</p><p>${state.grid[selected] ? "這格已有物件，請選另一塊空地。" : !world.canPlace(selected) ? "你正站在這附近。先關閉預覽，走到旁邊再放置。" : "這是可用的庭園格位，不會影響外圍通路。"}</p><div class="actions">${button("旋轉 90°", "data-rotate-decor")}${button("確認" + (movingFrom === null ? "放置" : "搬動"), `data-confirm-place ${state.grid[selected] || !world.canPlace(selected) ? "disabled" : ""}`, "primary")}${button("取消", "data-cancel-place")}</div>`;
  } else if (panelName === "quests") {
    title(
      "鄰居的心願",
      `同時最多 3 份 · 已接 ${state.activeQuests.length}/3 · 完成 ${state.completedQuests.length}/${QUESTS.length}`,
    );
    html = `<div class="tabs">${button("全部", 'data-resident="all"')}${RESIDENTS.map((r) => button(r.name, `data-resident="${r.id}"`)).join("")}</div>`;
    for (const r of RESIDENTS.filter(
      (r) => !residentFilter || r.id === residentFilter,
    )) {
      const completed = QUESTS.filter(
        (q) => q.residentId === r.id && state.completedQuests.includes(q.id),
      ).length;
      html += `<h3><span class="portrait" style="background:${r.color}">${r.name.slice(0, 1)}</span>${r.name}</h3><p>${completed > 0 ? r.complete : state.activeQuests.some((id) => QUESTS.find((q) => q.id === id)?.residentId === r.id) ? r.progress : r.first}</p>`;
      for (const q of QUESTS.filter((q) => q.residentId === r.id)) {
        const s = questStatus(state, q.id);
        html += `<div class="quest"><h3>${q.title} <span class="tag">${s.completed ? "已完成" : s.accepted ? "已接取" : "未接取"}</span></h3><p>${q.description}</p><p class="note">${s.completed ? r.complete : s.missing.join(" · ") || (s.accepted ? "條件已滿足，可以交付心意。" : "已滿足條件，接取後即可交付。")} · 報酬 ◈${q.reward}</p><div class="actions">${!s.completed ? (s.accepted ? button("交付心意", `data-deliver="${q.id}"`, "primary") + button("先放回", 'data-return-quest="' + q.id + '"') : button("接下委託", `data-accept="${q.id}"`)) : ""}</div></div>`;
      }
    }
  } else if (panelName === "map") {
    title("出門散個步");
    html = `<p>三條小路都可以隨時往返。每個採集區每天有一次贈禮，四種自然發現與一個不限時小謎題。</p><div class="split">${REGIONS.map((r) => `<div class="region-card"><h3>${r.name}</h3><p>${r.description}</p><p class="note">發現 ${DISCOVERIES.filter((d) => d.region === r.id && state.discoveries.includes(d.id)).length}/4 · ${state.puzzles.includes(PUZZLES.find((p) => p.region === r.id).id) ? "謎題已解開" : "謎題等待中"}</p><p class="note">${state.memo.gathered[r.id] === state.day ? "✓ 今日贈禮已拾取" : "♧ 今日贈禮等待中"}</p>${button("沿小路出發 ↗", `data-region="${r.id}"`)}</div>`).join("")}</div><div class="actions">${button("回到庭園", 'data-region="garden"')}${button("自然圖鑑", 'data-open="discoveries"')}</div>`;
  } else if (panelName === "fieldguide") {
    const r = REGIONS.find((r) => r.id === state.region),
      p = PUZZLES.find((p) => p.region === state.region);
    title(r?.name || "林間散步");
    html = `<p>${r?.description || ""}也能直接點選立體物件，將發現留在圖鑑。</p>${DISCOVERIES.filter(
      (d) => d.region === state.region,
    )
      .map(
        (d) =>
          `<div class="row"><div><strong>${d.name}</strong><p>${state.discoveries.includes(d.id) ? d.description : "沿小路看看，記下一份自然禮物。"}</p></div>${button(state.discoveries.includes(d.id) ? "再看看" : "觀察", state.discoveries.includes(d.id) ? `data-inspect="${d.id}"` : `data-discover="${d.id}"`)}</div>`,
      )
      .join(
        "",
      )}<div class="actions">${r ? button("拾取今日贈禮", `data-gather="${state.region}"`) : ""}${p ? button("讀讀小謎題", `data-open="puzzle:${state.region}"`) : ""}${button("回到庭園", 'data-region="garden"')}</div>`;
  } // 入口由實際內容決定，不為cottage虛造贈禮或第四謎題。
  else if (panelName.startsWith("puzzle:")) {
    const region = panelName.split(":")[1],
      p = PUZZLES.find((p) => p.region === region);
    if (p) {
      title(p.name);
      html = `<p>${p.question}</p><div class="puzzle-options">${p.choices.map((c) => button(c, `data-puzzle="${p.id}" data-answer="${esc(c)}" ${state.puzzles.includes(p.id) ? "disabled" : ""}`)).join("")}</div><p class="note">不計時，答錯也不會失去材料。再想一想就可以重試。</p>${state.puzzles.includes(p.id) ? `<p class="success">已解開：${p.explanation}</p>` : ""}`;
    } else {
      title("這裡暫無謎題");
      html =
        "<p>這個區域沒有可解讀的謎題。可以回到庭園，再沿三條小路探索。</p>" +
        button("回到庭園", 'data-region="garden"');
    }
  } // 共用consumer同時保護舊3D物件callback及文字入口的缺項情形。
  else if (panelName === "discoveries" || panelName.startsWith("discovery:")) {
    title("森林的十二封信");
    html = `<p>已記錄 ${state.discoveries.length}/12 種自然發現。到三個採集區，點選發現物即可記錄，沒有稀有掉落或等待。</p>${DISCOVERIES.map((d) => `<div class="row"><div><strong>${state.discoveries.includes(d.id) ? "✧ " + d.name : "◇ 尚未發現"}</strong><p>${state.discoveries.includes(d.id) ? d.description : REGIONS.find((r) => r.id === d.region).name}</p></div><span>${state.discoveries.includes(d.id) ? "已記錄" : ""}</span></div>`).join("")}`;
  } else if (panelName === "sleep") {
    title("讓今天，輕輕落幕");
    const thirsty = state.grid.filter(
      (c, i) =>
        c?.type === "plant" && !c.watered && !growthPreview(state, i).mature,
    ).length;
    html = `<p>第 ${state.day} 日即將結束，明天是 ${PHASES[phaseOf(state.day + 1)].name}。</p><p>${thirsty ? `還有 ${thirsty} 株未澆水，今晚不會成長；它們仍會健康地等你。` : "今天的植物都照顧好了，安心休息吧。"}每天的森林贈禮也會刷新。</p><div class="actions">${button("睡到明天", "data-sleep", "primary")}${button("再待一會", "data-close")}</div>`;
  } else if (panelName === "morning") {
    title(`早安，第 ${state.day} 日`, "每一次照顧，都有回應");
    const mature = state.grid.filter(
      (c, i) => c?.type === "plant" && growthPreview(state, i).mature,
    ).length;
    html = `<p>${PHASES[phaseOf(state.day)].description}</p><p>${mature} 株已成熟。三個採集區的贈禮重新準備好了。今天想種些什麼，或為誰做一件小事？</p><div class="actions">${button("開始今天", "data-close", "primary")}${button("看看今日目標", 'data-open="journal"')}</div>`;
  } else if (panelName === "festival") {
    title("把月光，送給每一個人", "月光慶典 · 第一章完成");
    html = `<p>米拉把柔軟絨苔鋪在窗前，洛恩帶來森林的新葉；露米點亮提燈，皮普招呼歸巢的鳥。莎吉繫好彩帶，諾亞將最後一盤南瓜放上餐桌。</p><p><strong>「這座庭園，一點一點地，成了我們共同的家。」</strong></p><div class="split"><div><h3>走過 ${state.day} 個日子</h3><p>完成 ${state.completedQuests.length} 份心願<br>記錄 ${state.discoveries.length} 種發現</p></div><div><h3>${gardenRating(state).label}</h3><p>${gardenRating(state).plants} 株植物與 ${gardenRating(state).decorations} 件家具<br>每個角落都是你留下的心意</p></div></div><p class="note">慶典後可繼續生活、完成全部十二個故事，或在另一存檔開始不同的庭園。</p><div class="actions">${button("繼續自由生活", "data-close", "primary")}${button("另一座庭園", 'data-open="slots"')}</div>`;
  } else if (panelName === "settings") {
    title(paused ? "歇一會兒" : "庭園設定");
    html = `<p>本機存檔 ${slot} · 第 ${state.day} 日 · v${VERSION}</p>${[
      ["music", "音樂"],
      ["ambient", "環境"],
      ["sfx", "操作音效"],
    ]
      .map(
        ([id, label]) =>
          `<label class="setting"><span>${label}</span><input aria-label="${label}音量" data-setting="${id}" type="range" min="0" max="1" step=".05" value="${state.settings?.[id] ?? 0.5}"></label>`,
      )
      .join(
        "",
      )}<label class="setting"><span>減少動態（關閉螢火移動）</span><input data-setting="reducedMotion" type="checkbox" ${state.settings?.reducedMotion ? "checked" : ""}></label><label class="setting"><span>畫質</span><select data-setting="quality"><option value="auto" ${state.settings?.quality === "auto" ? "selected" : ""}>自動 · 適應裝置</option><option value="high" ${state.settings?.quality === "high" ? "selected" : ""}>清晰 · 陰影</option><option value="low" ${state.settings?.quality === "low" ? "selected" : ""}>輕量 · 無陰影</option></select></label><p class="note">對話預設直接全文，可在下方調整速度；逐字顯示時也可立即展開。背景切換會暫停遊戲及聲音，不會自動換日。所有資料僅留在這台瀏覽器。</p><div class="actions">${button("繼續遊玩", "data-resume", "primary")}${button("兩座庭園／重開", 'data-open="slots"')}${button("匯出庭園備份", "data-export")}${button("匯入備份", "data-import")}${button("操作說明", 'data-open="help"')}</div><input id="import-file" type="file" accept="application/json" hidden>`;
  } else if (panelName === "slots") {
    title("兩座獨立的庭園");
    html = `<p>換到另一座庭園會保留目前進度。重新開始只會清除選定存檔，操作前會再次確認。</p>${[
      1, 2,
    ]
      .map((s) => {
        const saved = loadSlot(s);
        return `<div class="row"><div><strong>庭園 ${s}${slot === s ? " · 目前" : ""}</strong><p>第 ${saved.state?.day || 1} 日 · 完成 ${saved.state?.completedQuests?.length || 0} 份心願</p></div>${button("進入", `data-slot="${s}"`)}</div>`;
      })
      .join(
        "",
      )}<div class="actions">${button("重新開始目前庭園", 'data-open="reset"', "danger")}${button("開始新的月光旅程", 'data-open="journey-new"')}</div>`;
  } else if (panelName === "reset") {
    title("重新開始庭園 " + slot);
    html = `<p>這會以全新第 1 日取代目前存檔。另一個存檔不受影響。建議先匯出備份。</p><div class="actions">${button("匯出備份", "data-export")}${button("確認重新開始", "data-reset-confirm", "danger")}${button("保留進度", 'data-open="settings"', "primary")}</div>`;
  } else if (panelName === "clear") {
    title("清除選取格");
    html = `<p>第 ${selected + 1} 格的${esc(itemName(state.grid[selected]?.id))}：家具會回到背包；植物會移除，最近一次可撤銷。</p><div class="actions">${button("確認清除", "data-clear-confirm", "danger")}${button("取消", 'data-open="grid"')}</div>`;
  }
  body.innerHTML = html;
  if (transitioning) body.querySelectorAll("[data-region]").forEach(el => { el.disabled = true; });
  if (panelName === "settings") {
    const control = document.createElement("label");
    control.className = "setting";
    control.innerHTML =
      '<span>對話文字速度</span><select data-setting="textSpeed"><option value="0">直接全文</option><option value="1">慢慢說</option><option value="2">一般</option><option value="3">快速</option></select>';
    control.querySelector("select").value = String(state.settings.textSpeed);
    body.querySelector(".actions").before(control);
  }
  if (
    panelName === "quests" &&
    state.settings.textSpeed > 0 &&
    !state.settings.reducedMotion
  ) {
    for (const portrait of body.querySelectorAll(".portrait")) {
      const p = portrait.closest("h3").nextElementSibling;
      if (!p || p.tagName !== "P") continue;
      const text = p.textContent;
      p.dataset.fullDialogue = text;
      p.textContent = "";
      let n = 0;
      const timer = setInterval(() => {
        p.textContent = text.slice(0, ++n);
        if (n >= text.length) clearInterval(timer);
      }, [0, 65, 35, 15][state.settings.textSpeed]);
      dialogueTimers.push(timer);
    }
    const reveal = document.createElement("button");
    reveal.textContent = "直接顯示所有對話";
    reveal.dataset.revealDialogue = "";
    reveal.className = "subtle";
    body.prepend(reveal);
  }
  if (changed && $("#panel").open) {
    $("#panel").scrollTop = 0;
    $("#panel-title").focus({ preventScroll: true });
  } else if (restore) {
    const replacement = focusId
      ? document.getElementById(focusId)
      : [...body.querySelectorAll("button,input,select")].find(
          (el) =>
            Object.entries(focusData).length &&
            Object.entries(focusData).every(([k, v]) => el.dataset[k] === v),
        );
    (
      replacement ||
      $("#panel-title")
    ).focus({ preventScroll: true });
    $("#panel").scrollTop = scroll;
  } else if ($("#panel").open && !$("#panel").contains(document.activeElement)) {
    $("#panel-title").focus({ preventScroll: true });
  }

}
function tagName(tag) {
  return (
    { cozy: "溫馨", natural: "自然", moon: "月光", water: "水岸" }[tag] || tag
  );
}
function exportSave() {
  const blob = new Blob(
      [JSON.stringify({ game: "moss-and-moon", build: BUILD, state }, null, 2)],
      { type: "application/json" },
    ),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = `moss-and-moon-garden-${slot}-day-${state.day}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notice("庭園備份已下載，請妥善保存。");
}
// Capture trusted world gestures before tools or pointer handlers can open a panel.
const gestureEvents = new AbortController();
let escapeHeld = false;
const releaseEscape = () => { escapeHeld = false; };
addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  event.preventDefault();
  event.stopImmediatePropagation();
  if (event.repeat || escapeHeld) return;
  escapeHeld = true;
  if (!started || faulted) {
    if (!faulted && $("#panel").open) closePanel();
    return;
  }
  if ($("#panel").open) paused ? resume() : closePanel();
  else paused ? resume() : pause();
}, {capture:true, signal:gestureEvents.signal});
addEventListener("keyup", event => {
  if (event.key === "Escape") releaseEscape();
}, {capture:true, signal:gestureEvents.signal});
function recoverAudioFromGesture(event) {
  if (!event.isTrusted || event.repeat || !started || paused || faulted) return;
  if (sound.metrics().state !== "running") void sound.unlock();
}
for (const type of ["pointerdown", "keydown"])
  document.addEventListener(type, recoverAudioFromGesture, {
    capture: true, signal: gestureEvents.signal,
  });
$("#panel").addEventListener("keydown", (event) => {
  if (event.key !== "Tab") return;
  const controls = [...$("#panel").querySelectorAll(
    'button,input,select,textarea,a[href],[tabindex="0"]',
  )].filter((el) => !el.disabled && !el.closest("[hidden],[inert]") && el.getClientRects().length);
  const first = controls[0], last = controls.at(-1), active = document.activeElement;
  if (!first) { event.preventDefault(); $("#panel-title").focus(); return; }
  if (event.shiftKey && (active === first || active === $("#panel-title"))) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault(); first.focus();
  }
});
document.addEventListener("click", (e) => {
  if (faulted) return;
  const b = e.target.closest("button");
  if (!b) return;
  const d = b.dataset;
  if ("randomSeed" in d) $("#new-seed").value = newSeed();
  else if ("randomJourney" in d) $("#journey-seed").value = newSeed();
  else if ("campaignNew" in d) newJourney($("#journey-seed").value,$("#journey-difficulty").value);
  else if ("campaignRetryStage" in d) {
    const result=campaignAction(state.campaign,{type:'retry'});
    if(!result.ok)return;
    state.campaign.pendingMs=0;state.revision++;persist();closePanel();paused=false;render();resume();openPanel('journey-help');
  }
  else if ("campaignRetry" in d) newJourney(state.campaign.seed,state.campaign.difficulty);
  else if ("campaignNext" in d) {
    const result=campaignAction(state.campaign,{type:"continue"});
    if (!result.ok) return;
    notice("正在前往下一章…");
    state.region=STAGES[state.campaign.stage].region; state.revision++; persist();
    closePanel(); paused=false; render(); world.setEnabled(true); sound.setActive(true); openPanel("journey-help");
  }
  else if ("campaignFree" in d) {
    state.mode='free';state.campaign=null;state.revision++;persist();closePanel();paused=false;render();resume();
  }
  else if ("taskWalk" in d) { selectedTask=+d.taskWalk; world.walkToTask(selectedTask); notice('沿小路走近信標 '+(selectedTask+1)+'，到達後按照顧。'); }
  else if ("taskAction" in d) performCampaign(d.taskAction,+d.node);
  else if ("dismissWarning" in d) $("#save-warning").hidden = true;
  else if ("revealDialogue" in d) revealDialogue();
  else if (b.id === "start") {
    const first = state.revision === 0;
    start();
    if (first) openPanel("help");
  } else if (b.id === "switch-slot") openPanel("slots");
  else if (b.id === "close-panel" || "close" in d) {
    if (paused) resume();
    else closePanel();
  } else if ("guide" in d) followGuide();
  else if ("open" in d) {
    if (d.open === "settings") pause();
    else openPanel(d.open);
  } else if ("tool" in d) chooseTool(d.tool);
  else if ("seed" in d) {
    seed = d.seed;
    render();
    notice(
      itemName(seed) + " · " + PLANTS.find((p) => p.id === seed).description,
    );
  } else if ("camera" in d) world.rotate(+d.camera);
  else if ("zoom" in d) world.zoom(+d.zoom);
  else if (b.id === "interact") world.interact();
  else if ("region" in d) travel(d.region);
  else if ("gather" in d) action({ type: "gather", region: d.gather });
  else if ("inspect" in d) openPanel("discovery:" + d.inspect);
  else if ("discover" in d) action({ type: "discover", id: d.discover });
  else if ("buy" in d) action({ type: "buy", id: d.buy });
  else if ("sell" in d) action({ type: "sell", id: d.sell });
  else if ("craft" in d) action({ type: "craft", id: d.craft });
  else if ("accept" in d) action({ type: "accept", id: d.accept });
  else if ("deliver" in d) action({ type: "deliver", id: d.deliver });
  else if ("returnQuest" in d)
    action({ type: "returnQuest", id: d.returnQuest });
  else if ("action" in d) action({ type: d.action });
  else if ("resident" in d) {
    residentFilter = d.resident === "all" ? null : d.resident;
    if (residentFilter)
      action({ type: "talk", id: residentFilter }, { refresh: false });
    renderPanel();
  } else if ("decor" in d) {
    decor = d.decor;
    tool = "decorate";
    movingFrom = null;
    returnToWorld();
    render();
    notice("已選 " + itemName(decor) + "，點空地預覽放置。");
  } else if ("rotateDecor" in d) {
    rotation = (rotation + 1) % 4;
    render();
  } else if ("cancelPlace" in d) {
    movingFrom = null;
    returnToWorld();
  } else if ("confirmPlace" in d) {
    const a =
      movingFrom === null
        ? { type: "place", index: selected, id: decor, rotation }
        : { type: "move", from: movingFrom, index: selected, rotation };
    if (action(a)) {
      movingFrom = null;
      returnToWorld();
    }
  } else if ("gridSelect" in d) {
    selected = +d.gridSelect;
    world.select(selected);
    updateContext();
    renderPanel();
  } else if ("gridTool" in d) {
    tool = d.gridTool;
    if (tool === "decorate") openPanel("decorate");
    else render();
  } else if ("gridUse" in d) {
    tile(selected);
  } else if ("clear" in d) {
    if (state.grid[selected]) openPanel("clear");
    else notice("這格已經是空地。");
  } else if ("clearConfirm" in d) {
    action({ type: "clear", index: selected });
    openPanel("grid");
  } else if ("puzzle" in d)
    action({ type: "puzzle", id: d.puzzle, answer: d.answer });
  else if ("sleep" in d) {
    if (action({ type: "sleep" })) openPanel("morning");
  } else if ("festival" in d) {
    const replay = state.festival;
    if (replay || action({ type: "festival" })) {
      world.celebrate();
      if (replay) sound.effect("festival", {confirmed:true});
      openPanel("festival");
    }
  } else if ("resume" in d) resume();
  else if ("export" in d) exportSave();
  else if ("import" in d) $("#import-file").click();
  else if ("slot" in d) {
    invalidateTransition();
    if (started && !protectFallback && !persist()) return;
    slot = +d.slot;
    try {
      localStorage.setItem("moss-and-moon:preferred-slot", String(slot));
    } catch {}
    loaded = loadSlot(slot);
    protectFallback = !!loaded.error && !loaded.recovered;
    state = loaded.state || createState(slot);
    selected = -1;
    movingFrom = null;
    world.select(-1);
    closePanel();
    render();
    if (!started) start();
    else {
      resume();
      reportLoadOutcome("已進入庭園 " + slot + "。");
    }
  } else if ("resetConfirm" in d) {
    invalidateTransition();
    const fresh = createState(slot);
    if (!persist(fresh)) return;
    state = fresh;
    selected = -1;
    movingFrom = null;
    world.select(-1);
    closePanel();
    render();
    resume();
    notice("新的庭園，新的第一天。");
  }
});
document.addEventListener("change", async (e) => {
  if (e.target.dataset.setting) {
    const k = e.target.dataset.setting,
      v =
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.type === "range" || k === "textSpeed"
            ? +e.target.value
            : e.target.value;
    action({ type: "settings", values: { [k]: v } }, { refresh: false });
    sound.update(state.settings);
    world.sync(state);
    document.body.classList.toggle("reduced", !!state.settings.reducedMotion);
  }
  if (e.target.id === "grid-seed") {
    seed = e.target.value;
    render();
  }
  if (e.target.id === "import-file" && e.target.files[0]) {
    if (faulted) return;
    invalidateTransition();
    const file = e.target.files[0],
      request = ++importSequence,
      targetSlot = slot,
      targetState = state;
    const current = () =>
      !faulted &&
      request === importSequence &&
      slot === targetSlot &&
      state === targetState;
    try {
      if (file.size > 200000) throw new Error("檔案太大");
      const text = await file.text();
      if (!current()) {
        if (!faulted && request === importSequence)
          notice("匯入已取消：庭園已變更，請重新選擇備份。");
        return;
      }
      if (text.length > 200000) throw new Error("檔案太大");
      const data = JSON.parse(text);
      if (data.game !== "moss-and-moon") throw new Error("不是庭園備份");
      const candidate = migrateState({ ...data.state, slot: targetSlot });
      const saved = saveSlot(candidate);
      if (!saved.ok) throw new Error(saved.error);
      loaded = loadSlot(targetSlot);
      protectFallback = false;
      $("#save-warning").hidden = true;
      state = loaded.state;
      selected = -1;
      movingFrom = null;
      world.select(-1);
      render();
      notice("已匯入這座庭園。");
    } catch (err) {
      if (current()) { render(); notice("匯入失敗，原庭園保留：" + err.message, true); }
    } finally {
      e.target.value = "";
    }
  }
});
document.querySelectorAll("[data-move]").forEach((b) => {
  b.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    b.setPointerCapture(e.pointerId);
    world?.move(b.dataset.move, true);
  });
  for (const event of ["pointerup", "pointercancel", "lostpointercapture"])
    b.addEventListener(event, () => world?.move(b.dataset.move, false));
});
$("#panel").addEventListener("cancel", (e) => {
  e.preventDefault();
  if (paused) resume();
  else closePanel();
});
$("#panel-body").addEventListener("keydown", (e) => {
  const cell = e.target.closest("[data-grid-select]");
  if (
    !cell ||
    ![
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ].includes(e.key)
  )
    return;
  e.preventDefault();
  const old = +cell.dataset.gridSelect;
  const next =
    e.key === "Home"
      ? 0
      : e.key === "End"
        ? 63
        : Math.max(
            0,
            Math.min(
              63,
              old +
                { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -8, ArrowDown: 8 }[
                  e.key
                ],
            ),
          );
  selected = next;
  world.select(next);
  updateContext();
  renderPanel();
  $(`[data-grid-select="${next}"]`).focus({ preventScroll: true });
});
addEventListener("keydown", (e) => {
  if (!started && !$("#panel").open && e.key === "Tab") {
    const list = [...$("#welcome").querySelectorAll("button,input,select")].filter(el => !el.disabled && !el.closest("[hidden]") && el.getClientRects().length),
      i = list.indexOf(document.activeElement);
    e.preventDefault();
    list[(i + (e.shiftKey ? -1 : 1) + list.length) % list.length].focus();
    return;
  }

});
addEventListener("visibilitychange", () => {
  if (document.hidden) { releaseEscape(); if (started) pause(); }
});
addEventListener("blur", () => {
  releaseEscape();
  if (started && !paused) pause();
});
addEventListener("pagehide", (event) => {
  releaseEscape();
  invalidateTransition();
  importSequence++;
  if (!protectFallback) persist();
  if (event.persisted) {
    if (started && !paused) pause();
    return;
  }
  gestureEvents.abort();
  sound.dispose();
  world?.dispose();
  connection?.dispose();
}); // 可快取頁先保存並暫停、保留可用資源供原resume；真正離開仍完整清理，不reload或自動重開。
$("#world").addEventListener("webglcontextlost", (event) => {
  event.preventDefault();
  showFailure("畫面暫時中斷", "庭園進度已保留。重新載入以恢復三維畫面。");
});
try {
  world = createWorld($("#world"), {
    tile,
    tick: campaignTick,
    select(i) {
      selected = i;
      updateContext();
    },
    interact: interaction,
    tool: () => tool,
    chooseTool,
    notice,
    camera: () => notice("相機方向已旋轉，格位仍與田地對應。"),
  });
  connection = bridge({
    start,
    resume,
    pause,
    restart() {
      pause();
      openPanel("reset");
    },
  });
  sound.prepare();
  render();
  welcomeMode(true);
  $("#start").focus({ preventScroll: true });
  connection.ready();
  Object.defineProperty(window, "mossDiagnostics", {
    value: (options = {}) => ({
      buildId: BUILD,
      version: VERSION,
      world: world.metrics(options.since),
      audio: sound.metrics(),
      campaign: state.campaign ? structuredClone(campaignMetrics(state.campaign)) : null,
      record: loadRecords().best,
      transitioning,
      day: state.day,
      slot,
      started,
      paused,
      region: state.region,
      completedQuests: state.completedQuests.length,
      revision: state.revision,
    }),
    writable: false,
  });
} catch (error) {
  showFailure(
    "庭園暫時無法開啟",
    "請確認瀏覽器支援 WebGL 2，並重新載入。進度仍保留在本機。",
  );
  console.error(error);
  connection?.error(error.message);
}
