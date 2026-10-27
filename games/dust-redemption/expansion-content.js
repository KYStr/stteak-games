/**
 * NEXT-BUILD AUTHORING DATA ONLY. This module is deliberately outside the frozen runtime.
 * Original narrative/mechanism design, CC0-1.0. Positions are metres [x,z].
 * A correct menu answer alone MUST NOT complete a field task: record the physical steps first.
 * No task uses a minimum duration, forced idle timer, consumable key or permanent failure.
 */

const mistake = (message) => ({
  alertDelta: 1,
  exposureSeconds: 1.5,
  permanentDamage: 0,
  blocksInput: false,
  message,
});
const step = (id, title, kind, target, extra = {}) => ({
  id,
  title,
  kind,
  target,
  ...extra,
});
const choice = (id, label, success, effect, message, extra = {}) => ({
  id,
  label,
  success,
  effect,
  message,
  ...extra,
});
const prop = (base, mechanism, movingParts, footprint = [1.2, 1.2]) => ({
  base,
  mechanism,
  movingParts,
  footprint,
  origin: "ground-center",
  build:
    "Actual meshes with stable part IDs; moving parts and collision must share transforms.",
});
const movement = (id, geometry, axis, change) => ({
  id,
  geometry,
  axis,
  change,
});

export const EXPANSION_VERSION = "fieldwork-authoring-1";
export const SUPPLIES = Object.freeze({
  ammo: {
    id: "ammo",
    title: "備用彈帶",
    maximumLevel: 3,
    costs: [50, 80, 120],
    description:
      "每階在每次出發時增加 24 發備彈；不減少原本免費提供的基本彈藥。",
    levels: [0, 24, 48, 72],
    effect: "reserveBonus",
    unit: "發",
  },
  medicine: {
    id: "medicine",
    title: "繃帶藥效",
    maximumLevel: 3,
    costs: [50, 80, 120],
    description:
      "每階讓單次繃帶多恢復 10 生命；只在攜帶繃帶時生效，最大生命仍為 100。",
    levels: [0, 10, 20, 30],
    effect: "medkitHealBonus",
    unit: "生命",
  },
  smoke: {
    id: "smoke",
    title: "煙罐容量",
    maximumLevel: 3,
    costs: [50, 80, 120],
    description:
      "每階讓單次煙罐多持續 2 秒；只在攜帶煙罐時生效，原有 8 秒效果保留。",
    levels: [0, 2, 4, 6],
    effect: "smokeSecondsBonus",
    unit: "秒",
  },
});

/** Optional supplies is backwards compatible; validation must also be called by next-build save validation. */
export function validSupplies(supplies) {
  return (
    supplies === undefined ||
    Boolean(
      supplies &&
        typeof supplies === "object" &&
        !Array.isArray(supplies) &&
        Object.keys(supplies).every((id) => SUPPLIES[id]) &&
        Object.entries(supplies).every(
          ([id, level]) =>
            Number.isInteger(level) &&
            level >= 0 &&
            level <= SUPPLIES[id].maximumLevel,
        ),
    )
  );
}

export function supplyBonuses(profile) {
  if (!validSupplies(profile?.supplies))
    throw new Error("補給升級資料無法驗證；未套用額外效果。");
  const levels = { ammo: 0, medicine: 0, smoke: 0, ...profile?.supplies };
  return {
    reserveBonus: SUPPLIES.ammo.levels[levels.ammo],
    medkitHealBonus: SUPPLIES.medicine.levels[levels.medicine],
    smokeSecondsBonus: SUPPLIES.smoke.levels[levels.smoke],
    medkitHeal: 40 + SUPPLIES.medicine.levels[levels.medicine],
    smokeSeconds: 8 + SUPPLIES.smoke.levels[levels.smoke],
  };
}

/** Caller opens this only in the hub; active mission, replay and non-hub modes are always rejected. */
export function buySupply(profile, id, { mode = "hub" } = {}) {
  if (
    !profile ||
    typeof profile !== "object" ||
    mode !== "hub" ||
    profile.activeRun
  )
    throw new Error("補給只能在鎮上、沒有進行中委託時購買。");
  const item = SUPPLIES[id];
  if (!item) throw new Error("找不到這項補給。");
  if (!validSupplies(profile.supplies))
    throw new Error("補給升級資料無法驗證，未扣除旅費。");
  if (!Number.isInteger(profile.wallet) || profile.wallet < 0)
    throw new Error("旅費資料無法驗證，未購買補給。");
  const level = profile.supplies?.[id] || 0;
  if (level >= item.maximumLevel) throw new Error("這項補給已達三階上限。");
  const cost = item.costs[level];
  if (profile.wallet < cost)
    throw new Error(
      `旅費不足：需要 ${cost}，目前 ${profile.wallet}。基本裝備仍可完成委託。`,
    );
  const next = clone(profile);
  next.wallet -= cost;
  next.supplies = {
    ammo: 0,
    medicine: 0,
    smoke: 0,
    ...next.supplies,
    [id]: level + 1,
  };
  next.revision = Number.isInteger(next.revision) ? next.revision + 1 : 1;
  return {
    profile: next,
    purchase: {
      id,
      title: item.title,
      level: level + 1,
      cost,
      value: item.levels[level + 1],
      unit: item.unit,
    },
    bonuses: supplyBonuses(next),
    message: `${item.title}已升為 ${level + 1} 階，花費 ${cost} 旅費。下次出發自動套用。`,
  };
}

export const FIELD_CONTRACT = Object.freeze({
  integration:
    "After a scene is built, add field-task positions and travel checkpoints to the world.build exclusion points before procedural dressing. Preserve actual movement and shot collision. Field work must be complete before cargo/parley can resolve.",
  strategies: ["nonlethal", "combat"],
  sequence:
    "Explore and inspect → operate visible 3D controls → observe changed mechanism → continue through the chosen physical route → resolve the original combat/parley objective → extract.",
  errors:
    "A failed operation makes a visible alarm pulse and up to 1.5 seconds of exposure. Movement and correction remain available immediately. Cap active alert at +3; let normal AI decay it. Failed operations never consume permanent inventory, money or story choices.",
  accessibility:
    "All colors have matching text, symbols or notch counts. Every correct solution is inferable from a nearby inscription, visible geometry or readable clue. Reopen the hint without penalty. Do not rely on sound alone.",
  completion:
    "Do not call recordFieldStep for opening a panel or selecting text. Each step ID requires the named 3D manipulation, inspection orientation, carried-object movement or checkpoint overlap event. Recheck current dial/socket/drop-zone predicates before confirmation; call recordFieldStep with satisfied:false if a previously correct control is moved away.",
  save: "Field state belongs to the mission run and its safety snapshot. Death/restart discards it. Replay must not write wallet, NPC trust or story choices. Apply the returned mission-local effects once; persistent deltas, if integrated, are committed once at extraction. Supplies is an optional persistent hub field; extend next-build validateProfile with validSupplies, and call save immediately after a successful purchase. Calculate bonuses at mission start so the pre-mission snapshot includes the already paid purchase.",
  pacing:
    "These mechanics add observation, route decisions and traversal; no 8–12 minute duration is claimed without timing a real build.",
});

export const FIELD_WORK = {
  "dry-mail": {
    scene: "station",
    title: "把藥箱完整送出車站",
    newExperience: "實際轉動藥箱核對鉛封、切換道岔並把貨箱送到所選卸貨區。",
    tasks: [
      {
        id: "mail-seal",
        title: "核對三缺口鉛封",
        position: [-13, 11],
        model: "crate-low",
        prop: prop("crate-low", "rotating medicine-case cradle", [
          movement("case", "box", "y", "rotate in 90-degree detents"),
          movement("seal", "cylinder", "z", "flip open after verification"),
        ]),
        description:
          "藥箱正面貼了過期繳費單。轉到背面，看清刻在鉛封上的缺口，再對照診所的收貨牌。",
        requiredClues: ["mail-manifest"],
        hints: [
          "診所收貨牌：真封印為三個缺口，三角記號朝上；顏色只是輔助。",
          "黑色方印是過路費記號，不是藥品封印。",
        ],
        physicalSteps: [
          step("show-back", "轉動藥箱，露出背面鉛封", "rotate-part", "case", {
            targetDetent: 2,
          }),
          step("inspect-seal", "近距離檢查三缺口", "inspect-part", "seal", {
            maximumDistance: 2.2,
          }),
        ],
        choices: [
          choice(
            "three-notches",
            "確認三缺口原封完整，剪開運輸鎖",
            true,
            {
              world: [
                { target: "seal", state: "verified" },
                { target: "transport-lock", state: "open" },
              ],
              flags: ["medicine-verified"],
            },
            "原封與貨單一致。運輸鎖解除，藥品仍保持封裝。",
          ),
          choice(
            "tax-stamp",
            "把方形過路費印當成驗收封印",
            false,
            mistake("讀印器亮起叉號；牌上寫的是三缺口診所封印。"),
            "判讀不符。原封仍在，可以立即再檢查。",
          ),
          choice(
            "force-lid",
            "直接撬開沒有驗證的箱蓋",
            false,
            mistake("鎖扣發出一聲金屬響；先核對鉛封才能解除運輸鎖。"),
            "箱蓋未開，藥品沒有損失；轉到背面重新驗封。",
          ),
        ],
        solution: {
          choice: "three-notches",
          reasoning:
            "背面實體鉛封缺口數與收貨牌完全相同；過路費方印不是品質證據。",
        },
      },
      {
        id: "mail-switch",
        title: "扳動道岔，決定出貨線",
        position: [6, 5],
        model: "rail-segment",
        prop: prop(
          "rail-segment",
          "two-position railway turnout",
          [
            movement(
              "switch",
              "cylinder-and-box-lever",
              "z",
              "rotate ±40 degrees",
            ),
            movement(
              "points",
              "two-box-rails",
              "y",
              "sweep to the selected route",
            ),
          ],
          [1.4, 1.4],
        ),
        description:
          "西側貨棚線有掩護但較繞；東側直線較短，必須打開會被中央哨兵看見的柵門。兩條路都能送藥。",
        dependencies: ["mail-seal"],
        requiredClues: ["mail-rations"],
        hints: [
          "道岔銘牌：左箭頭＝貨棚，右箭頭＝直線。",
          "先看實際鐵軌與守軍位置，再扳到你選定的路。",
        ],
        physicalSteps: [
          step(
            "inspect-track",
            "從道岔看見兩條路線",
            "inspect-part",
            "route-sign",
          ),
          step(
            "throw-switch",
            "親手扳動道岔到固定檔位",
            "operate-part",
            "switch",
          ),
        ],
        choices: [
          choice(
            "siding",
            "走西側貨棚線：多繞一段，保留掩護",
            true,
            {
              flags: ["mail-route-siding"],
              route: [
                [6, 5],
                [-13, 5],
                [-13, 0],
                [-16, -4],
                [-12, -4],
              ],
              world: [
                { target: "switch", detent: -1 },
                { target: "siding-gate", state: "open" },
              ],
              carrySpeedMultiplier: 0.85,
            },
            "貨棚支線接通。接下來要實際把箱子送過支線的兩處轉角。",
            { tradeoff: "路程較長；不增加警戒，沿途可用貨棚遮擋。" },
          ),
          choice(
            "direct",
            "走東側直線：少繞路，打開暴露的柵門",
            true,
            {
              flags: ["mail-route-direct"],
              route: [
                [6, 5],
                [6, -4],
                [-12, -4],
              ],
              alertDelta: 2,
              world: [
                { target: "switch", detent: 1 },
                { target: "main-gate", state: "open" },
              ],
            },
            "直線柵門升起，中央守軍注意到動靜。可以立刻利用車廂換位，不必等待。",
            { tradeoff: "出貨路較直接，但開門當下提高警戒；和平策略仍可行。" },
          ),
          choice(
            "middle",
            "把道岔留在兩條軌之間",
            false,
            mistake("紅色缺口露出，鐵軌沒有接合；把把手推到左或右的實體止擋。"),
            "沒有車輛進入，無永久損失；立即重扳即可。",
          ),
        ],
        solution: {
          choices: ["siding", "direct"],
          reasoning: "兩側固定檔位都接軌；中央位置在模型上留有明顯斷口。",
        },
      },
      {
        id: "mail-unload",
        title: "把藥箱移進卸貨安全區",
        position: [-12, -4],
        model: "crate-low",
        prop: prop("crate-low", "movable medicine crate and receiving pallet", [
          movement(
            "medicine-crate",
            "box-with-handles",
            "xz",
            "follows carry handle; collides with walls",
          ),
          movement("pallet-latch", "box", "y", "closes when cargo is placed"),
        ]),
        description:
          "把驗好的箱子沿已接通的路線移到北方卸貨區。箱子不會瞬移；放下時你可以自由移動、開槍或躲避。",
        dependencies: ["mail-switch"],
        requiredClues: ["mail-letter"],
        hints: [
          "抓住有雙手符號的提把，沿先前扳好的路線走；再次互動可放下。",
          "箱子只有放進白線棧板才算安全；撤退或放下不會損壞它。",
        ],
        cargoStart: [-13, 11],
        physicalSteps: [
          step(
            "take-crate",
            "抓住可見藥箱提把",
            "carry-pickup",
            "medicine-crate",
            { position: [-13, 11] },
          ),
          step(
            "follow-route",
            "帶藥箱通過所選路線的轉折標記",
            "carry-route",
            "mail-route",
            { routeFrom: "mail-switch", allowDrop: true },
          ),
          step(
            "place-crate",
            "放入卸貨棧板",
            "carry-drop-zone",
            "receiving-pallet",
            { position: [-12, -4], radius: 1.25 },
          ),
        ],
        choices: [
          choice(
            "secure-pallet",
            "扣好棧板鎖，保留完整藥箱",
            true,
            {
              flags: ["medicine-ready"],
              world: [{ target: "pallet-latch", state: "closed" }],
            },
            "完整藥箱已到卸貨區。你仍可選擇帶證據議和，或擊敗守軍取回通行物件。",
          ),
          choice(
            "leave-outside",
            "把箱子算作已到貨，不移進白線",
            false,
            mistake("棧板指示仍是空箱圖示；把實體藥箱放進白線。"),
            "箱子留在原地，隨時可以重新提起。",
          ),
        ],
        solution: {
          choice: "secure-pallet",
          reasoning: "貨箱的真實碰撞體必須落在接收區；單純選文字不會通過。",
        },
      },
    ],
  },
  "broken-water": {
    scene: "canyon",
    title: "讓五格水真正流向三處聚落",
    newExperience:
      "操作有流向的三維水管、限壓旁通與三個配水輪；取捨維修備水和當日供水量。",
    tasks: [
      {
        id: "water-bypass",
        title: "把壓力導向修補旁通",
        position: [-13, 5],
        model: "barrel",
        prop: prop("barrel", "three-way pressure manifold", [
          movement("bypass-wheel", "torus", "z", "rotate to arrow detent"),
          movement(
            "pressure-needle",
            "box",
            "z",
            "moves between safe and overpressure marks",
          ),
        ]),
        description:
          "裂管仍在漏水。先用旁通管卸壓，才能更換裂口的接環；關掉整個水源會讓三地都斷水。",
        requiredClues: ["water-pipe"],
        hints: [
          "管身箭頭：源頭 → 旁通 → 下游。裂口位在直管；旁通沒有裂痕。",
          "壓力錶的安全區有三角刻記，不只用顏色。",
        ],
        physicalSteps: [
          step(
            "trace-pipe",
            "沿三維管線找到裂口",
            "inspect-part",
            "split-joint",
          ),
          step(
            "turn-bypass",
            "把旁通輪扳到下游箭頭",
            "rotate-part",
            "bypass-wheel",
            { targetDetent: 1 },
          ),
        ],
        choices: [
          choice(
            "bypass-downstream",
            "開旁通、隔離裂管，保持下游有水",
            true,
            {
              world: [
                { target: "bypass-flow", state: "on" },
                { target: "split-joint", state: "isolated" },
              ],
              flags: ["water-safe-pressure"],
            },
            "錶針回到刻記內，下游水流仍可見。接環現在可以處理。",
          ),
          choice(
            "feed-split",
            "把水壓直接灌進裂管",
            false,
            mistake("裂口噴出可見水霧；跟隨完整旁通管上的箭頭。"),
            "閥門自動退回安全位，沒有耗掉任務物品。",
          ),
          choice(
            "close-all",
            "關閉全部下游",
            false,
            mistake("三個聚落的流量計都歸零；旁通能卸壓，不必斷水。"),
            "重新打開旁通即可修正。",
          ),
        ],
        solution: {
          choice: "bypass-downstream",
          reasoning: "實體裂口在直管，旁通出口連到下游；刻記顯示卸壓成功。",
        },
      },
      {
        id: "water-allocation",
        title: "轉動三個配水輪",
        position: [5, 13],
        model: "barrel",
        prop: prop(
          "barrel",
          "three metered distribution wheels",
          ["clinic", "homes", "mine"].map((id) =>
            movement(
              id,
              "torus-and-notched-wheel",
              "z",
              "0–3 visible flow detents",
            ),
          ),
        ),
        description:
          "五格流量要供給診所、住區與礦場。三個輪子旁都刻著最低需求；你必須真的把各輪轉到目標刻度。",
        dependencies: ["water-bypass"],
        requiredClues: ["water-meter", "water-contract"],
        hints: [
          "今日需求牌：診所至少二格、住區至少二格、礦場至少一格；總水量五格。",
          "轉動一輪後，透明流量柱立即變化；可反覆改動，不消耗水。",
        ],
        physicalSteps: [
          step("set-clinic", "診所輪停在二格", "set-meter", "clinic", {
            value: 2,
          }),
          step("set-homes", "住區輪停在二格", "set-meter", "homes", {
            value: 2,
          }),
          step("set-mine", "礦場輪停在一格", "set-meter", "mine", { value: 1 }),
        ],
        choices: [
          choice(
            "two-two-one",
            "確認診所 2、住區 2、礦場 1",
            true,
            {
              allocation: { clinic: 2, homes: 2, mine: 1 },
              flags: ["water-distributed"],
              world: [{ target: "all-outlet-flows", state: "balanced" }],
            },
            "五格水全數分到位，三個流量柱都達到需求刻線。",
          ),
          choice(
            "three-one-one",
            "確認診所 3、住區 1、礦場 1",
            false,
            mistake("住區流量柱低於二格刻線；多給診所的一格可轉回住區。"),
            "只要重新轉輪，不會失去已完成的旁通修復。",
          ),
          choice(
            "two-two-two",
            "確認每地都給 2 格",
            false,
            mistake("需求合計六格，超過入口五格；礦場最低需求只有一格。"),
            "配水閥保持可調，不會因超配卡住。",
          ),
        ],
        solution: {
          choice: "two-two-one",
          values: { clinic: 2, homes: 2, mine: 1 },
          reasoning: "三處最低需求之和恰為入口流量 5；沒有隱藏條件。",
        },
      },
      {
        id: "water-reserve",
        title: "決定維修槽的最後一桶",
        position: [12, -7],
        model: "barrel",
        prop: prop("barrel", "reserve cistern with selectable discharge", [
          movement(
            "reserve-spout",
            "cylinder",
            "y",
            "swivel between maintenance and public trough",
          ),
          movement(
            "reserve-level",
            "transparent-cylinder",
            "y",
            "lower when discharged",
          ),
        ]),
        description:
          "修復後多出一桶乾淨備水。保留在維修槽能在槍戰中供應一次現場治療；送去公用槽會換來較多報酬。兩者都不改變剛才的基本配水。",
        dependencies: ["water-allocation"],
        requiredClues: ["water-contract"],
        hints: [
          "維修槽牌：現場緊急清洗一次；公用槽牌：多餘清水有補助。",
          "這不是主線水權決策；結算前仍會問誰管理水源。",
        ],
        physicalSteps: [
          step(
            "inspect-reserve",
            "看見維修槽仍有一桶水",
            "inspect-part",
            "reserve-level",
          ),
          step(
            "turn-spout",
            "把導水口轉向所選容器",
            "operate-part",
            "reserve-spout",
          ),
        ],
        choices: [
          choice(
            "keep-first-aid",
            "保留備水：新增一次現場恢復 20 生命",
            true,
            {
              flags: ["field-clean-water"],
              fieldHealCharges: 1,
              fieldHealAmount: 20,
              extractionRewardDelta: 0,
              world: [{ target: "maintenance-trough", state: "full" }],
            },
            "備水留在你所在的維修點。需要時返回使用；未受傷可以保留。",
            { tradeoff: "保留安全餘裕；放棄額外 15 旅費。" },
          ),
          choice(
            "donate-reserve",
            "送到公用槽：委託結算額外 15 旅費",
            true,
            {
              extractionRewardDelta: 15,
              fieldHealCharges: 0,
              world: [{ target: "public-trough", state: "full" }],
            },
            "公用槽多了一桶水，補助記在本次委託；現場沒有備水治療點。",
            { tradeoff: "報酬較高；本局失去額外現場治療，原有繃帶仍可用。" },
          ),
        ],
        solution: {
          choices: ["keep-first-aid", "donate-reserve"],
          reasoning: "兩項都維持基本配水；當局生存餘裕與結算報酬的公開取捨。",
        },
      },
    ],
  },
  "last-signal": {
    scene: "mine",
    title: "接通一封能抵達的電報",
    newExperience:
      "接地、插接帶符號的電纜，再選擇繞行安全中繼或冒險啟動直達信塔。",
    tasks: [
      {
        id: "signal-earth",
        title: "先接地，再接電源",
        position: [-13, 12],
        model: "crate-low",
        prop: prop("crate-low", "battery and earth terminals", [
          movement(
            "earth-plug",
            "cylinder",
            "xyz",
            "drag between labeled sockets",
          ),
          movement(
            "power-lever",
            "box",
            "z",
            "throw only after earth is connected",
          ),
        ]),
        description:
          "將帶三橫線符號的電纜插入同符號地線座，再拉下電源桿。接點都以符號與刻字辨認。",
        requiredClues: ["signal-wire"],
        hints: [
          "箱蓋寫著：先地線，後電源。三橫線接三橫線，雙閃電接電池。",
          "實體線路完好，故障來自接點被人拔出。",
        ],
        physicalSteps: [
          step(
            "earth-connected",
            "把三橫線插頭接入接地座",
            "socket-match",
            "earth-plug",
            { socket: "earth-socket" },
          ),
          step("power-on", "接地後拉下電源桿", "ordered-lever", "power-lever", {
            after: "earth-connected",
          }),
        ],
        choices: [
          choice(
            "earth-then-power",
            "確認接地完成後送電",
            true,
            {
              flags: ["signal-powered"],
              world: [{ target: "battery-lamp", state: "lit" }],
            },
            "電源燈亮起，接點沒有火花。下一步是把訊號送到正確端子。",
          ),
          choice(
            "power-first",
            "跳過接地，先送電",
            false,
            mistake("保護開關跳回，地線符號閃動；先接地線。"),
            "沒有燒毀零件；立即插回地線就能重試。",
          ),
          choice(
            "cross-battery",
            "把地線接到雙閃電端子",
            false,
            mistake("插座形狀不合，金屬碰響；對照三橫線符號。"),
            "插頭保持可拖動，無物品損耗。",
          ),
        ],
        solution: {
          choice: "earth-then-power",
          reasoning: "操作順序直接刻在電池蓋；端子以形狀與符號雙重對應。",
        },
      },
      {
        id: "signal-patch",
        title: "接通兩段電報線",
        position: [11, 5],
        model: "crate-low",
        prop: prop("crate-low", "four-port patch panel", [
          movement(
            "line-a",
            "curved-cylinder-cable",
            "xyz",
            "plug input triangle to output triangle",
          ),
          movement(
            "line-b",
            "curved-cylinder-cable",
            "xyz",
            "plug input circle to output circle",
          ),
        ]),
        description:
          "把兩條鬆脫電纜接到同符號出口。公司端子畫著封閉方框，接到那裡只會回傳封鎖訊息。",
        dependencies: ["signal-earth"],
        requiredClues: ["signal-code", "signal-roster"],
        hints: [
          "替換碼紙：三角送公共驛線；圓圈送家屬副線；方框是公司內線。",
          "插對後，可見的脈衝沿電纜流向出口；錯接的脈衝會折返。",
        ],
        physicalSteps: [],
        choices: [
          choice(
            "public-and-family",
            "確認公共驛線與家屬副線都接通",
            true,
            {
              flags: ["signal-routed"],
              world: [
                { target: "public-pulse", state: "outbound" },
                { target: "family-pulse", state: "outbound" },
              ],
            },
            "兩道脈衝向山外流去，訊息有了不受公司封鎖的出口。",
            { requiredSteps: [
          step(
            "triangle-linked",
            "三角輸入接三角出口",
            "socket-match",
            "line-a",
            { socket: "triangle-public" },
          ),
          step(
            "circle-linked",
            "圓圈輸入接圓圈出口",
            "socket-match",
            "line-b",
            { socket: "circle-families" },
          ),
            ] },
          ),
          choice(
            "company-square",
            "把兩條線都接進公司方框端子",
            false,
            mistake("脈衝折返，面板顯示封鎖；照替換碼改接三角與圓圈。"),
            "兩個插頭都能立即拔下重接。",
          ),
          choice(
            "one-output",
            "只接公共線，忽略家屬副線",
            false,
            mistake("圓圈出口仍是斷線符號；失蹤者名單需要一份家屬副本。"),
            "已接通的公共線保留，補上副線即可。",
          ),
          choice(
            "verify-complete-roster",
            "核驗 M17 完整名單與南側收件碼",
            true,
            { flags: ["signal-roster-verified"] },
            "四個工號與收件碼已核對；選公開驛線或守軍停火線後，仍須實際發送、讀回覆並南側簽收。",
            { requiredSteps: [
              step("inspect-full-roster", "讀取本次四人完整名單", "inspect-part", "roster-sheet", { flowOnly: "signal-v1" }),
              step("inspect-receiver-code", "核對本次收件員與批號", "inspect-part", "receiver-code-plate", { flowOnly: "signal-v1" }),
            ] },
          ),
        ],
        solution: {
          choice: "public-and-family",
          reasoning: "替換碼與端子符號互相對應；回傳脈衝是錯接的可見回饋。",
        },
      },
      {
        id: "signal-relay",
        title: "啟動中繼或直達信塔",
        position: [-3, -12],
        model: "crate-low",
        prop: prop("crate-low", "relay selector and raised antenna", [
          movement(
            "relay-selector",
            "torus",
            "z",
            "select sheltered relay or direct mast",
          ),
          movement(
            "antenna",
            "cylinder",
            "y",
            "raise visibly after manual handwheel",
          ),
        ]),
        description:
          "兩條送信方式都會傳出完整名單。安全中繼需要走到兩個受掩護接點；直達信塔只需一個接點，但升天線會暴露你的位置。",
        dependencies: ["signal-patch"],
        requiredClues: ["signal-code"],
        hints: [
          "路牌把中繼接點畫成兩個空心圓，直塔畫成一個實心三角。",
          "沒有傳輸倒數：完成實體接點後立即送出。",
        ],
        physicalSteps: [],
        choices: [
          choice(
            "sheltered-relay",
            "走兩處安全中繼，保持低警戒",
            true,
            {
              route: [
                [-3, -12],
                [-12, -11],
                [-12, -4],
              ],
              flags: ["signal-relay-sheltered"],
              world: [{ target: "relay-lamps", state: "linked" }],
            },
            "完整名單經兩處中繼送出。繞行增加移動，但沒有升起醒目的信塔。",
            {
              tradeoff: "要完成兩處實體接點；保留低警戒。",
              requiredSteps: [
          step(
            "select-relay",
            "在選擇器上指向送信路線",
            "operate-part",
            "relay-selector",
          ),
                step(
                  "relay-west",
                  "手動接通西側中繼",
                  "checkpoint-operate",
                  "relay-west",
                  { position: [-12, -11], radius: 1.7 },
                ),
                step(
                  "relay-south",
                  "手動接通南側中繼",
                  "checkpoint-operate",
                  "relay-south",
                  { position: [-12, -4], radius: 1.7 },
                ),
              ],
            },
          ),
          choice(
            "direct-mast",
            "升起直達天線，立即引起警戒",
            true,
            {
              alertDelta: 2,
              flags: ["signal-relay-direct"],
              world: [{ target: "antenna", state: "raised" }],
            },
            "天線升起，全部名單已送出；附近守軍看見了動靜。你仍可帶證據議和。",
            {
              tradeoff: "只操作一處接點；附近警戒提高。",
              requiredSteps: [
          step(
            "select-relay",
            "在選擇器上指向送信路線",
            "operate-part",
            "relay-selector",
          ),
                step(
                  "raise-mast",
                  "轉動手輪升起實體天線",
                  "operate-part",
                  "antenna-handwheel",
                ),
              ],
            },
          ),
          choice(
            "public-west-relay", "從西側掩體中繼送完整名單", true,
            { flags: ["signal-public-west"] },
            "在西側一個真接點送出完整名單；仍須讀取本次回覆，再到南側簽收。",
            { tradeoff: "東側木箱遮線；南北側翼仍開放。只操作此一中繼。", requiredSteps: [
              step("relay-west", "手動接通西側中繼", "checkpoint-operate", "relay-west", { position: [-12, -11], radius: 1.7 }),
            ] },
          ),
          choice(
            "public-south-relay", "從南側開闊中繼送完整名單", true,
            { flags: ["signal-public-south"] },
            "在南側一個真接點送出完整名單；仍須讀取本次回覆，再到南側簽收。",
            { tradeoff: "缺乏高掩體，但能預先看見追線守軍。只操作此一中繼。", requiredSteps: [
              step("relay-south", "手動接通南側中繼", "checkpoint-operate", "relay-south", { position: [-12, -4], radius: 1.7 }),
            ] },
          ),
          choice(
            "ceasefire-dispatch", "送出守軍調令，攜同一完整信袋南送", true,
            { flags: ["signal-ceasefire-dispatched"] },
            "調令已由實體發報鍵送出；接收員仍要本次回覆與同一信袋內的完整四人名單。",
            { tradeoff: "既有查線守軍退到指定掩體；你必須親自帶同一信袋到南側。", requiredSteps: [
              step("dispatch-order-sent", "按下真發報鍵送出第17號調令", "operate-part", "dispatch-key", { flowOnly: "signal-v1" }),
            ] },
          ),
        ],
        solution: {
          choices: ["sheltered-relay", "direct-mast"],
          reasoning: "兩條通路都已由前項接線證明可用；取捨實際繞行與當前警戒。",
        },
      },
    ],
  },
  "black-ledger": {
    scene: "station",
    title: "讓一份帳真正成為證據",
    newExperience:
      "用可轉動貨牌比對車廂、對齊複寫頁找出改寫痕跡，再決定副本的公開程度。",
    tasks: [
      {
        id: "ledger-carriage",
        flowV1: {
          description: "翻看夜班貨票與真車牌，提交票號、車號及批次；兩列資料都必須能互相支持。",
          hints: ["原票正反面與現場車牌都可讀取。", "錯誤比對會逐欄說明矛盾，可立即修正。"],
          choiceLabels: { "a17-314": "票號 A17／車號 314", "a17-341": "票號 A17／車號 341", "a71-314": "票號 A71／車號 314" },
          stepLabels: { "align-serials": "將驗證框對準你選定的車牌" },
        },
        title: "把貨運票對到真正車廂",
        position: [-14, 2],
        model: "crate-low",
        prop: prop("crate-low", "freight-tag rack and numbered wagon plate", [
          movement("tag", "box", "y", "rotate front and back"),
          movement(
            "matching-frame",
            "box-frame",
            "x",
            "slide over one of three serial plates",
          ),
        ]),
        description:
          "貨票正面寫 A17，背面原始車號是 314。架上有三塊車牌，只有一塊同時對上兩個編號。",
        requiredClues: ["ledger-ticket"],
        hints: [
          "背面小字：票號 A17／車號 314；不要只比第一個數字。",
          "移動驗證框，直到實體貨票與車牌兩列都重合。",
        ],
        physicalSteps: [
          step("read-tag-back", "翻轉貨票讀背面車號", "rotate-part", "tag", {
            targetDetent: 2,
          }),
          step(
            "align-serials",
            "把驗證框移到 A17／314 車牌",
            "align-parts",
            "matching-frame",
            { slot: "A17-314" },
          ),
        ],
        choices: [
          choice(
            "a17-314",
            "核對 A17／314，記錄未登記車廂",
            true,
            {
              flags: ["ledger-shipment-matched"],
              world: [{ target: "matching-frame", state: "confirmed" }],
            },
            "票與車牌兩列一致。這列車出現在失蹤當夜。",
          ),
          choice(
            "a17-341",
            "只看票號，選 A17／341",
            false,
            mistake("第二列數字不重合；把票翻過來再比較車號。"),
            "驗證框仍可移動，證據不會被破壞。",
          ),
          choice(
            "a71-314",
            "只看車號，選 A71／314",
            false,
            mistake("第一列字母數字不重合；票號應是 A17。"),
            "立即改移到正確車牌即可。",
          ),
        ],
        solution: {
          choice: "a17-314",
          reasoning: "兩項明示識別碼必須同時匹配，不需猜測隱藏密碼。",
        },
      },
      {
        id: "ledger-carbon",
        flowV1: {
          description: "對齊複寫頁並調整側光，將原付款壓痕、表面墨水與工名資料相互核對。",
          hints: ["先對定位孔，再以側光讀原筆壓痕。", "收款人、批次與完整工名都要相符；不能只採信改寫後的墨水。"],
          choiceLabels: { "manager-impression": "記錄側光下的原付款壓痕", "ink-only": "記錄表面墨水收款人", "rub-ink-away": "擦除墨水後再讀" },
        },
        title: "對齊複寫頁與付款憑證",
        position: [6, 14],
        model: "crate-low",
        prop: prop("crate-low", "sliding carbon-copy evidence light table", [
          movement("carbon-sheet", "thin-box", "xz", "align two punched holes"),
          movement(
            "raking-lamp",
            "cylinder",
            "y",
            "rotate to reveal raised pressure marks",
          ),
        ]),
        description:
          "原頁把收款人改成帳房。將複寫頁兩個孔對準定位釘，再轉側光，壓痕會顯出原本的經理簽記。",
        dependencies: ["ledger-carriage"],
        requiredClues: ["ledger-payment", "ledger-names"],
        hints: [
          "桌邊刻字：先對孔，再側照。抹掉的墨水不等於消失的壓痕。",
          "燈照到低角度時，原簽名會形成可見立體陰影；另提供文字讀取。",
        ],
        physicalSteps: [
          step(
            "align-holes",
            "把兩孔套上定位釘",
            "align-parts",
            "carbon-sheet",
            { slot: "two-pins" },
          ),
          step(
            "rake-light",
            "轉側光讀出原始簽記",
            "rotate-part",
            "raking-lamp",
            { targetDetent: 1 },
          ),
        ],
        choices: [
          choice(
            "manager-impression",
            "記錄複寫壓痕中的經理簽記",
            true,
            {
              flags: ["ledger-payment-verified"],
              world: [{ target: "carbon-sheet", state: "preserved" }],
            },
            "貨運票與原始收款人形成交叉證據，帳房不是實際領款者。",
          ),
          choice(
            "ink-only",
            "只採信表面改寫後的帳房姓名",
            false,
            mistake("側光下的原壓痕與墨水不一致；重新對孔後讀陰影文字。"),
            "複寫頁完整保留，現在就能修正記錄。",
          ),
          choice(
            "rub-ink-away",
            "磨掉表面墨水再讀",
            false,
            mistake("證物夾阻止了磨擦；側光就能讀壓痕，不必破壞頁面。"),
            "證物沒有受損，改用側光。",
          ),
        ],
        solution: {
          choice: "manager-impression",
          reasoning: "定位孔與立體壓痕提供可觀察的原文；證據來自交叉核對。",
        },
      },
      {
        id: "ledger-copy",
        flowV1: {
          description: "原帳一直留在你的背包。唯一副本可交南西信差保管，或在月台先公開一頁並由帳房見證。",
          hints: ["密封託付要把同一副本親自帶到南西奧林，10 旅費只在撤離結算一次。", "張貼一頁不決定原帳最終公開或封存；完整核證資料可使查驗退讓。"],
          choiceLabels: { "sealed-courier": "同一副本交南西信差保管（少領 10 旅費）", "notice-copy": "原公告欄先貼一頁，由帳房見證" },
          stepLabels: { "deliver-envelope": "將同一副本帶到南西信差信袋" },
        },
        title: "替原帳留下一份副本",
        position: [11, -7],
        model: "crate-low",
        prop: prop("crate-low", "hand press and evidence envelope", [
          movement(
            "press-handle",
            "box",
            "z",
            "lever downward to stamp duplicate",
          ),
          movement(
            "copy-tray",
            "box",
            "x",
            "slide out with readable duplicate",
          ),
        ]),
        description:
          "壓印副本已足以避免原帳意外毀損。你可以放進密封信袋，也可先在站內公告欄張貼一頁，讓守軍知道證據已經外流。",
        dependencies: ["ledger-carbon"],
        requiredClues: ["ledger-names"],
        hints: [
          "副本保管不取代撤離時的故事選擇；原帳是否全面公開，仍會在結算決定。",
          "公告欄在開闊月台。密封袋較安全，但需要支付信差當局的搬運費。",
        ],
        physicalSteps: [
          step(
            "press-copy",
            "壓下手動印臺，取出實體副本",
            "operate-part",
            "press-handle",
          ),
          step(
            "collect-copy",
            "從印臺托盤拿起副本",
            "carry-pickup",
            "copy-tray",
          ),
        ],
        choices: [
          choice(
            "sealed-courier",
            "放入密封信袋：安靜送出，少領 10 旅費",
            true,
            {
              extractionRewardDelta: -10,
              flags: ["ledger-copy-sealed"],
              world: [{ target: "evidence-envelope", state: "sealed" }],
            },
            "信差接下副本，報酬中預留 10 旅費。原帳與關鍵故事決策仍由你帶回。",
            {
              tradeoff: "保留低警戒；本次報酬減少 10。",
              requiredSteps: [
                step(
                  "deliver-envelope",
                  "把副本放進實體信袋",
                  "carry-drop-zone",
                  "evidence-envelope",
                  { position: [-13, 14], radius: 1.2 },
                ),
              ],
            },
          ),
          choice(
            "notice-copy",
            "張貼已核證的一頁：提高警戒，省下信差費",
            true,
            {
              alertDelta: 2,
              extractionRewardDelta: 0,
              flags: ["ledger-copy-notice"],
              world: [{ target: "notice-board", state: "posted" }],
            },
            "公告欄出現一頁核證副本，守軍提高警戒；帳冊其他頁仍待結算決策。",
            {
              tradeoff: "需要走到開闊公告欄且提高警戒；不扣報酬。",
              requiredSteps: [
                step(
                  "post-notice",
                  "走到月台公告欄貼上副本",
                  "carry-drop-zone",
                  "notice-board",
                  { position: [11, 1], radius: 1.2 },
                ),
              ],
            },
          ),
        ],
        solution: {
          choices: ["sealed-courier", "notice-copy"],
          reasoning: "兩者都保留可核對副本；明示當局警戒與費用差異。",
        },
      },
    ],
  },
  "long-night": {
    scene: "canyon",
    title: "把路上的人真正帶回來",
    newExperience:
      "觀察水位與落石，選擇路線；固定有方向的橋板，再護送可停等的三維家屬通過檢查點。",
    tasks: [
      {
        id: "night-route-plan",
        title: "實地選出疏散路線",
        position: [-13, 13],
        model: "rock-low",
        prop: prop("rock-low", "route-signpost with physical river gauge", [
          movement(
            "route-arm",
            "box",
            "y",
            "point toward west ford or east ridge",
          ),
          movement(
            "water-gauge",
            "notched-cylinder",
            "y",
            "visible fixed safe mark",
          ),
        ]),
        description:
          "西側淺灘水位低但繞行較遠；東側岩脊短一些，必須穿過狙擊可見的開口。今天兩條路都能走，選擇會改變家屬的實際行進線。",
        requiredClues: ["night-route", "night-order"],
        hints: [
          "水位低於兩道刻線，淺灘可通行。東岩脊沒有落石封路，但缺口正對哨位。",
          "路牌上的實體箭頭與地面標記一致；不用用生命試錯才能辨識。",
        ],
        physicalSteps: [
          step(
            "read-water",
            "近距離讀出淺灘水位",
            "inspect-part",
            "water-gauge",
          ),
          step(
            "point-route",
            "轉動路標指向所選路線",
            "operate-part",
            "route-arm",
          ),
        ],
        choices: [
          choice(
            "west-ford",
            "走西側淺灘：較遠但避開哨位開口",
            true,
            {
              flags: ["evacuation-west"],
              escortRoute: [
                [13, -7],
                [12, -4],
                [5, -4],
                [5, 5],
                [-13, 5],
                [-13, 13],
                [-12, 17],
              ],
              world: [{ target: "route-arm", detent: -1 }],
            },
            "地面淺灘標記亮起。家屬會跟著你走較長的西線。",
            { tradeoff: "護送實際路程較長；沒有新增警戒。" },
          ),
          choice(
            "east-ridge",
            "走東側岩脊：直接南撤，但穿過開口",
            true,
            {
              flags: ["evacuation-east"],
              escortRoute: [
                [13, -7],
                [12, -4],
                [5, -4],
                [5, 5],
                [3, 16],
                [-12, 17],
              ],
              alertDelta: 1,
              world: [{ target: "route-arm", detent: 1 }],
            },
            "岩脊標記亮起。家屬會在開口前停下，等你靠近帶領。",
            { tradeoff: "路程較短；開口附近警戒提高，需掩護或先讓守軍停火。" },
          ),
          choice(
            "closed-gully",
            "走標著叉號的落石溝",
            false,
            mistake(
              "路標叉號對著實體落石；這條溝沒有出口，換到兩條有箭頭的路。",
            ),
            "家屬尚未出發，立刻重選即可。",
          ),
        ],
        solution: {
          choices: ["west-ford", "east-ridge"],
          reasoning:
            "水位刻線與開口視線可在出發前觀察，封死的溝用實體岩石與叉號明示。",
        },
      },
      {
        id: "night-brace",
        title: "把斜撐裝在受力方向",
        position: [5, 5],
        model: "wall-wood",
        prop: prop(
          "wall-wood",
          "small evacuation footbridge repair rig",
          [
            movement(
              "brace",
              "box-plank",
              "z",
              "rotate to connect opposite joint sockets",
            ),
            movement("test-board", "box", "x", "settles only when braced"),
          ],
          [1.4, 1.4],
        ),
        description:
          "便橋的一側鬆脫。把斜撐接到上方左釘與下方右釘，形成三角支撐，再踩上試重板。",
        dependencies: ["night-route-plan"],
        requiredClues: ["night-papers"],
        hints: [
          "橋側刻有三角支撐圖，兩個對應插座刻著同一個手掌符號。",
          "橫放木板不會撐住晃動方向；正確支撐後，試重板只小幅沉降。",
        ],
        physicalSteps: [
          step("seat-brace", "把斜撐兩端插入對角插座", "align-parts", "brace", {
            slot: "upper-left-lower-right",
          }),
          step(
            "test-load",
            "實際踏上試重板確認穩固",
            "player-overlap",
            "test-board",
            { position: [5, 5], radius: 1.1 },
          ),
        ],
        choices: [
          choice(
            "diagonal-brace",
            "確認三角斜撐穩固，開放便橋",
            true,
            {
              flags: ["evacuation-bridge-safe"],
              world: [
                { target: "test-board", state: "stable" },
                { target: "bridge-gate", state: "open" },
              ],
            },
            "橋板承住重量，家屬能繼續走。修復不需消耗槍械彈藥。",
          ),
          choice(
            "horizontal-brace",
            "木板橫擺就算修好",
            false,
            mistake("試重板明顯晃動，安全擋板仍在；將木板轉向對角插座。"),
            "安全擋板保護了家屬，沒有人受傷；可以立即調整。",
          ),
        ],
        solution: {
          choice: "diagonal-brace",
          reasoning: "幾何三角支撐與實體對角插座明示方向，試重板提供確認。",
        },
      },
      {
        id: "night-escort",
        title: "帶家屬通過所選路線",
        position: [13, -7],
        model: "npc-mara",
        prop: prop(
          "npc-mara",
          "three actual 3D evacuees with follow/wait states",
          [
            movement(
              "evacuee-group",
              "rigged-character-group",
              "xz",
              "walk along selected checkpoints; no teleport",
            ),
          ],
          [1.4, 1.4],
        ),
        description:
          "三位家屬只在你附近時前進。你可以叫他們在掩體後停等，再去處理守軍；和平與戰鬥都能讓他們通行。",
        dependencies: ["night-brace"],
        requiredClues: ["night-papers"],
        hints: [
          "靠近按跟隨；再次互動是停等。距離超過六公尺時他們會停下，不會自行闖入戰場。",
          "家屬受驚會原地蹲下，並非永久死亡。靠近安撫即可恢復；這段不新增不可逆護送失敗。",
        ],
        physicalSteps: [
          step(
            "group-follows",
            "靠近家屬並讓三人進入跟隨狀態",
            "escort-start",
            "evacuee-group",
            { leash: 6 },
          ),
          step(
            "group-checkpoints",
            "陪同三人走完選定路線",
            "escort-route",
            "evacuee-group",
            {
              routeFrom: "night-route-plan",
              maximumDistance: 6,
              allowWait: true,
            },
          ),
          step(
            "group-safe",
            "確認三人進入南側集合圈",
            "escort-arrival",
            "evacuee-group",
            { position: [-12, 17], radius: 2.1, requiredCount: 3 },
          ),
        ],
        choices: [
          choice(
            "count-three",
            "核對三位家屬都已抵達",
            true,
            {
              flags: ["evacuation-complete"],
              world: [{ target: "evacuee-group", state: "safe" }],
            },
            "三位家屬都在集合圈。他們等待你完成議和或取回通行鈴，一起安全離開。",
          ),
          choice(
            "leave-straggler",
            "只確認先到的人就離開",
            false,
            mistake("集合牌仍有空的第三個位置；地面腳印會指向落隊者。"),
            "已到的人留在安全圈，回去帶上落隊者即可，不需全部重走。",
          ),
        ],
        solution: {
          choice: "count-three",
          reasoning:
            "三個實體角色與集合位置一一對應；必須實際移動完成，不以選單跳過。",
        },
      },
    ],
  },
  "dawn-pact": {
    scene: "mine",
    title: "讓最後的防線失去補給",
    newExperience:
      "辨認軍用與民生管線、移開真實補給礦車，再選擇解除探照燈或保留物資抵換報酬。",
    tasks: [
      {
        id: "pact-feed",
        pactFlowVersion: 1,
        title: "只切斷軍用輸送帶",
        position: [-12, 4],
        model: "crate-low",
        prop: prop("crate-low", "paired supply disconnect panel", [
          movement(
            "military-feed",
            "box-lever",
            "z",
            "disconnect crossed-rifle circuit",
          ),
          movement(
            "civilian-feed",
            "box-lever",
            "z",
            "retain bowl-and-cross circuit",
          ),
        ]),
        description:
          "兩條線都通向礦井：交叉槍符號供應軍用輸送帶，碗與十字符號供應民生儲藏。沿可見管線看清楚，再切掉軍用一條。",
        requiredClues: ["pact-wages"],
        hints: [
          "軍用路徑末端是彈箱；民生路徑末端是水桶與醫療箱。",
          "只要切軍用線。錯誤拉桿會被保護棘輪彈回，不會永久損失民生物資。",
        ],
        physicalSteps: [
          step(
            "trace-feeds",
            "沿實體管線分辨兩個儲藏區",
            "inspect-part",
            "feed-junction",
          ),
          step(
            "disconnect-military",
            "拉下交叉槍符號的軍用桿",
            "operate-part",
            "military-feed",
            { targetDetent: 0 },
          ),
        ],
        choices: [
          choice(
            "military-only",
            "切軍用線，保留水與醫療供應",
            true,
            {
              flags: ["pact-feed-off"],
              enemyAmmoMultiplier: 0.8,
              world: [
                { target: "military-belt", state: "stopped" },
                { target: "civilian-feed", state: "on" },
              ],
            },
            "軍用輸送帶停住，守軍補給減少；平民儲藏仍在運作。",
          ),
          choice(
            "civilian-first",
            "切碗與十字符號的線",
            false,
            mistake("棘輪彈回，水桶旁亮起警告；軍用線是交叉槍符號。"),
            "民生物資未斷供，現在就可改拉另一桿。",
          ),
          choice(
            "cut-both",
            "把兩條線一起切斷",
            false,
            mistake("共用保護桿拒絕動作；目標只是軍用輸送帶。"),
            "不需找新零件，立刻重選即可。",
          ),
        ],
        solution: {
          choice: "military-only",
          reasoning: "符號與物理管線目的地一致，不靠猜測顏色或未公開善惡值。",
        },
      },
      {
        id: "pact-cart",
        pactFlowVersion: 1,
        title: "把軍用補給礦車推進側線",
        position: [11, 13],
        model: "rail-segment",
        prop: prop(
          "rail-segment",
          "pushable locked ammunition cart",
          [
            movement(
              "cart",
              "box-and-four-cylinder-wheels",
              "xz",
              "moves only while player pushes from handle",
            ),
            movement("cart-brake", "box", "z", "engage in marked parking bay"),
          ],
          [1.4, 1.4],
        ),
        description:
          "把停在補給線上的礦車沿安全短軌推到側線，扣上煞車。軍用物資仍在，可供談判；不必引爆它。",
        dependencies: ["pact-feed"],
        requiredClues: ["pact-shares"],
        hints: [
          "推車提把朝南，白線停車灣在東側短軌末端。",
          "推車時可以隨時放手躲避；車輪遇到障礙會停住，不會穿牆。",
        ],
        physicalSteps: [
          step("release-brake", "拉開礦車煞車", "operate-part", "cart-brake", {
            targetDetent: 0,
          }),
          step("push-cart", "實際推車通過短軌轉角", "push-route", "cart", {
            waypoints: [
              [11, 13],
              [12, 9],
              [12, 5],
            ],
            allowRelease: true,
          }),
          step("park-cart", "在側線白框內重新扣煞車", "park-object", "cart", {
            position: [12, 5],
            radius: 1.2,
          }),
        ],
        choices: [
          choice(
            "brake-in-siding",
            "側線停穩並扣煞車，保留可談判物資",
            true,
            {
              flags: ["pact-cart-isolated"],
              world: [
                { target: "cart", state: "parked" },
                { target: "cart-brake", state: "engaged" },
              ],
            },
            "礦車已離開補給線，不能再送進防線；貨物保留為交涉籌碼。",
          ),
          choice(
            "brake-on-main",
            "仍停在補給主線就扣煞車",
            false,
            mistake("白框仍是空的；軍用礦車尚未離開主線。"),
            "拉開煞車繼續推即可，已推的距離不會歸零。",
          ),
        ],
        solution: {
          choice: "brake-in-siding",
          reasoning:
            "車身碰撞體必須進入可見白框並煞停；保留物資讓雙策略都可行。",
        },
      },
      {
        id: "pact-lights",
        pactFlowVersion: 1,
        title: "處理探照燈的最後一組電池",
        position: [-5, 12],
        model: "crate-low",
        prop: prop(
          "crate-low",
          "searchlight battery housing and manual shutter",
          [
            movement("battery", "box", "x", "remove into salvage slot"),
            movement(
              "shutter",
              "box",
              "z",
              "close the actual searchlight beam",
            ),
          ],
        ),
        description:
          "拆下電池能立即熄掉探照燈，降低北方暴露區的警戒；保留整組電池則可換成補助，但你必須自己通過明亮的區域。",
        dependencies: [],
        requiredClues: [],
        hints: [
          "電池箱說明：拆電池＝燈熄；完整交回＝補助二十。",
          "這是公開的當局取捨，不會直接改變最終議會／守望官選項。",
        ],
        physicalSteps: [
          step(
            "inspect-battery",
            "打開電池箱並看見供電線",
            "operate-part",
            "battery-lid",
          ),
        ],
        choices: [
          choice(
            "darken-approach",
            "拆電池關燈：北側更安全，放棄額外報酬",
            true,
            {
              alertDelta: -2,
              flags: ["pact-dark-approach"],
              world: [
                { target: "searchlight", state: "off" },
                { target: "battery", state: "removed" },
              ],
            },
            "實體光束熄滅，北方接近線變暗；剩餘守軍仍能靠近看到你。",
            {
              tradeoff: "降低接近北方的警戒；不領額外 20 旅費。",
              requiredSteps: [
                step(
                  "remove-battery",
                  "從箱中拉出實體電池",
                  "carry-pickup",
                  "battery",
                ),
              ],
            },
          ),
          choice(
            "preserve-battery",
            "保留完整電池：領 20 旅費，維持探照燈",
            true,
            {
              extractionRewardDelta: 20,
              flags: ["pact-lit-approach"],
              world: [
                { target: "searchlight", state: "on" },
                { target: "battery", state: "sealed" },
              ],
            },
            "箱蓋封好，補助記入本局；探照燈仍照著北方，你得利用現有掩體接近。",
            {
              tradeoff: "結算多 20 旅費；不獲得熄燈掩護。",
              requiredSteps: [
                step(
                  "seal-battery",
                  "把完整電池固定並封回箱蓋",
                  "operate-part",
                  "battery-lid",
                  { targetDetent: 0 },
                ),
              ],
            },
          ),
        ],
        solution: {
          choices: ["darken-approach", "preserve-battery"],
          reasoning:
            "取下電池與燈光的因果直接可見；兩種選擇都保留議和及交戰路線。",
        },
      },
    ],
  },
};

const clone = (value) => JSON.parse(JSON.stringify(value));
export function expansionFor(missionId) {
  return FIELD_WORK[missionId] || null;
}
export function createFieldState(missionId) {
  if (!FIELD_WORK[missionId]) throw new Error("未知現場委託。");
  return {
    version: EXPANSION_VERSION,
    missionId,
    completed: [],
    choices: {},
    progress: {},
    mistakes: 0,
    effects: [],
  };
}
function findTask(state, taskId) {
  const task = FIELD_WORK[state.missionId]?.tasks.find(
    (entry) => entry.id === taskId,
  );
  if (!task) throw new Error("未知現場工作。");
  return task;
}
function prerequisites(state, task) {
  return (task.dependencies || []).every((id) => state.completed.includes(id));
}
function stepsFor(task, option) {
  return [...task.physicalSteps, ...(option?.requiredSteps || [])];
}

/** Runtime may call this only after observing the named physical event; it is not a player cheat API. */
export function recordFieldStep(
  state,
  taskId,
  stepId,
  { satisfied = true } = {},
) {
  const task = findTask(state, taskId);
  if (!prerequisites(state, task))
    return {
      state,
      accepted: false,
      message: "先完成前面的現場工作；提示可免費重看。",
    };
  const known = [
    ...task.physicalSteps,
    ...task.choices.flatMap((option) => option.requiredSteps || []),
  ].find((entry) => entry.id === stepId);
  if (!known) throw new Error("未定義的實體操作。");
  if (
    satisfied &&
    known.after &&
    !(state.progress[taskId] || []).includes(known.after)
  )
    return {
      state,
      accepted: false,
      message: "先完成刻字指示的前一步，再操作這個零件。",
    };
  const next = clone(state);
  next.progress[taskId] = satisfied
    ? [...new Set([...(next.progress[taskId] || []), stepId])]
    : (next.progress[taskId] || []).filter((id) => id !== stepId);
  return { state: next, accepted: true, message: "已記錄實體操作。" };
}

/** Applies local effects exactly once. Never writes money, NPC trust or a story save itself. */
export function applyFieldChoice(state, taskId, choiceId) {
  const task = findTask(state, taskId),
    option = task.choices.find((entry) => entry.id === choiceId);
  if (!option) throw new Error("未知操作選項。");
  if (state.completed.includes(taskId))
    return {
      state,
      complete: true,
      duplicate: true,
      effects: [],
      message: "此項現場工作已完成，不重複領取效果。",
    };
  if (!prerequisites(state, task))
    return {
      state,
      complete: false,
      effects: [],
      missingDependencies: task.dependencies.filter(
        (id) => !state.completed.includes(id),
      ),
      message: "先完成前項操作；這次沒有扣除資源。",
    };
  if (!option.success) {
    const next = clone(state);
    next.mistakes += 1;
    return {
      state: next,
      complete: false,
      effects: [clone(option.effect)],
      message: option.message,
      retryImmediately: true,
    };
  }
  const missing = stepsFor(task, option).filter(
    (entry) => !(state.progress[taskId] || []).includes(entry.id),
  );
  if (missing.length)
    return {
      state,
      complete: false,
      effects: [],
      missingSteps: clone(missing),
      previewEffect: clone(option.effect),
      message: "先完成畫面中的實體操作，再確認這個方案。",
    };
  const next = clone(state);
  next.completed.push(taskId);
  next.choices[taskId] = choiceId;
  next.effects.push({ taskId, choiceId, effect: clone(option.effect) });
  return {
    state: next,
    complete: true,
    duplicate: false,
    effects: [clone(option.effect)],
    message: option.message,
  };
}

export function fieldWorkComplete(state) {
  return FIELD_WORK[state.missionId].tasks.every((task) =>
    state.completed.includes(task.id),
  );
}
export function fieldPlacementPoints(missionId) {
  const result = [];
  for (const task of FIELD_WORK[missionId].tasks) {
    result.push(task.position);
    for (const entry of [
      ...task.physicalSteps,
      ...task.choices.flatMap((option) => option.requiredSteps || []),
    ]) {
      if (entry.position) result.push(entry.position);
      if (entry.waypoints) result.push(...entry.waypoints);
    }
    for (const option of task.choices)
      for (const key of ["route", "escortRoute"])
        if (option.effect[key]) result.push(...option.effect[key]);
  }
  return result.map((position) => [...position]);
}

/** Authoring regression tests; no browser/world completion or playtime claim is made. */
export function runExpansionSelfTests() {
  let assertions = 0;
  const check = (condition, message) => {
    assertions += 1;
    if (!condition) throw new Error(`Expansion test failed: ${message}`);
  };
  const taskIds = new Set(),
    totals = {
      missions: 0,
      tasks: 0,
      physicalSteps: 0,
      correctChoices: 0,
      recoverableMistakes: 0,
    };
  const knownCovers = [
    [-9, 11, 3, 1.4],
    [-2, 8, 3, 1.3],
    [8, 10, 3, 1.3],
    [-10, 1, 2, 2],
    [1, 1, 3, 1.4],
    [10, -1, 3, 1.6],
    [-8, -8, 3, 1.5],
    [3, -8, 3, 1.4],
    [9, -13, 3, 1.5],
    [-2, -17, 2, 1.4],
  ];
  for (const [missionId, data] of Object.entries(FIELD_WORK)) {
    totals.missions += 1;
    check(
      data.tasks.length >= 2 && data.tasks.length <= 3,
      `${missionId} task count`,
    );
    check(
      data.tasks.some(
        (task) => task.choices.filter((option) => option.success).length >= 2,
      ),
      `${missionId} has a real disclosed tradeoff`,
    );
    let state = createFieldState(missionId);
    for (const task of data.tasks) {
      totals.tasks += 1;
      check(!taskIds.has(task.id), `unique ${task.id}`);
      taskIds.add(task.id);
      check(
        task.position.length === 2 &&
          task.position.every(
            (value) => Number.isFinite(value) && Math.abs(value) <= 17,
          ),
        `${task.id} bounded position`,
      );
      check(
        task.model &&
          task.prop.movingParts.length &&
          task.physicalSteps.length >= 1 &&
          task.hints.length >= 2,
        `${task.id} physical model and clues`,
      );
      for (const [x, z, w, d] of knownCovers) {
        const dx = Math.max(Math.abs(task.position[0] - x) - w / 2, 0),
          dz = Math.max(Math.abs(task.position[1] - z) - d / 2, 0);
        check(
          Math.hypot(dx, dz) > Math.max(...task.prop.footprint) / 2 + 0.35,
          `${task.id} avoids existing cover at ${x},${z}`,
        );
      }
      if (data.scene === "station")
        check(
          Math.abs(task.position[0] - 14) > 1.5,
          `${task.id} avoids station rails`,
        );
      if (data.scene === "mine")
        check(
          Math.abs(task.position[0] - 5) > 1.5,
          `${task.id} avoids mine rails`,
        );
      const correct = task.choices.filter((option) => option.success),
        wrong = task.choices.filter((option) => !option.success);
      check(correct.length >= 1, `${task.id} has solution`);
      for (const option of correct) {
        totals.correctChoices += 1;
        check(
          option.message && option.effect,
          `${task.id}/${option.id} explicit effects`,
        );
        if (correct.length > 1)
          check(
            Boolean(option.tradeoff),
            `${task.id}/${option.id} discloses tradeoff`,
          );
        const noPhysical = applyFieldChoice(state, task.id, option.id);
        check(
          noPhysical.complete === false && noPhysical.effects.length === 0,
          `${task.id}/${option.id} no text-only completion`,
        );
        let branch = clone(state);
        for (const event of stepsFor(task, option)) {
          branch = recordFieldStep(branch, task.id, event.id).state;
          totals.physicalSteps += 1;
        }
        const done = applyFieldChoice(branch, task.id, option.id);
        check(
          done.complete && done.state.choices[task.id] === option.id,
          `${task.id}/${option.id} actual operations complete`,
        );
        for (let repeat = 0; repeat < 10; repeat++) {
          const again = applyFieldChoice(
            done.state,
            task.id,
            correct[correct.length - 1].id,
          );
          check(
            again.duplicate &&
              again.effects.length === 0 &&
              again.state.choices[task.id] === option.id,
            `${task.id} no duplicate/change after commit`,
          );
        }
      }
      for (const option of wrong) {
        totals.recoverableMistakes += 1;
        const failed = applyFieldChoice(state, task.id, option.id);
        check(
          !failed.complete &&
            failed.retryImmediately &&
            failed.state.mistakes === state.mistakes + 1,
          `${task.id} recoverable mistake`,
        );
        check(
          option.effect.permanentDamage === 0 &&
            !option.effect.blocksInput &&
            option.effect.exposureSeconds <= 1.5,
          `${task.id} no permanent lock or artificial wait`,
        );
        let repaired = failed.state;
        for (const event of stepsFor(task, correct[0]))
          repaired = recordFieldStep(repaired, task.id, event.id).state;
        check(
          applyFieldChoice(repaired, task.id, correct[0].id).complete,
          `${task.id} immediately correctable`,
        );
      }
      for (const event of stepsFor(task, correct[0]))
        state = recordFieldStep(state, task.id, event.id).state;
      state = applyFieldChoice(state, task.id, correct[0].id).state;
    }
    check(
      fieldWorkComplete(state),
      `${missionId} completes all substantive work`,
    );
    check(
      !("wallet" in state) && !("npcTrust" in state),
      `${missionId} does not mutate a story save`,
    );
    for (const position of fieldPlacementPoints(missionId))
      check(
        position.every(
          (value) => Number.isFinite(value) && Math.abs(value) <= 17,
        ),
        `${missionId} bounded field/checkpoint coordinates`,
      );
  }
  check(
    totals.missions === 6 && totals.tasks === 18,
    "complete authored scope",
  );
  const distance = (route) =>
    route
      .slice(1)
      .reduce(
        (total, p, i) =>
          total + Math.hypot(p[0] - route[i][0], p[1] - route[i][1]),
        0,
      );
  const mailRoutes = FIELD_WORK["dry-mail"].tasks[1].choices;
  check(
    distance(mailRoutes[0].effect.route) > distance(mailRoutes[1].effect.route),
    "quiet mail route is actually longer than direct route",
  );
  const nightRoutes = FIELD_WORK["long-night"].tasks[0].choices;
  check(
    distance(nightRoutes[0].effect.escortRoute) >
      distance(nightRoutes[1].effect.escortRoute),
    "quiet escort route is actually longer than exposed route",
  );
  check(
    nightRoutes
      .slice(0, 2)
      .every((option) =>
        option.effect.escortRoute.some(
          (position) => position[0] === 5 && position[1] === 5,
        ),
      ),
    "both escort routes use the repaired bridge",
  );
  const power = createFieldState("last-signal");
  check(
    !recordFieldStep(power, "signal-earth", "power-on").accepted,
    "electrical operation order cannot be bypassed",
  );
  let seal = createFieldState("dry-mail");
  for (const event of FIELD_WORK["dry-mail"].tasks[0].physicalSteps)
    seal = recordFieldStep(seal, "mail-seal", event.id).state;
  seal = recordFieldStep(seal, "mail-seal", "inspect-seal", {
    satisfied: false,
  }).state;
  check(
    !applyFieldChoice(seal, "mail-seal", "three-notches").complete,
    "invalidated physical evidence cannot complete a task",
  );
  return {
    ...totals,
    assertions,
    result: "passed",
    scope:
      "Authoring data and pure local-state tests only; 3D integration and timed playthrough untested.",
  };
}

/** Pass the existing rules/content exports to check against the actual snapshot and replay implementation. */
export function runSupplySelfTests({
  createProfile,
  beginMission,
  completeMission,
  failMission,
  validateProfile,
  MISSIONS,
}) {
  let assertions = 0;
  const check = (condition, message) => {
    assertions += 1;
    if (!condition) throw new Error(`Supply test failed: ${message}`);
  };
  const equal = (a, b, message) =>
    check(JSON.stringify(a) === JSON.stringify(b), message);
  const rejects = (fn, message) => {
    let thrown = false;
    try {
      fn();
    } catch {
      thrown = true;
    }
    check(thrown, message);
  };
  const old = createProfile(),
    original = clone(old);
  equal(
    supplyBonuses(old),
    {
      reserveBonus: 0,
      medkitHealBonus: 0,
      smokeSecondsBonus: 0,
      medkitHeal: 40,
      smokeSeconds: 8,
    },
    "old save has all base equipment",
  );
  equal(old, original, "reading optional field is immutable");
  check(
    validSupplies(undefined) && validSupplies({}) && validSupplies({ ammo: 3 }),
    "optional sparse supply schema",
  );
  for (const invalid of [
    null,
    [],
    { ammo: -1 },
    { ammo: 4 },
    { medicine: 1.5 },
    { smoke: "2" },
    { gold: 2 },
  ])
    check(!validSupplies(invalid), "malformed upgrades rejected");
  const poor = { ...old, wallet: 49 };
  rejects(() => buySupply(poor, "ammo"), "insufficient balance");
  equal(poor.wallet, 49, "failed purchase never spends");
  rejects(() => buySupply({ ...old, wallet: 100 }, "unknown"), "unknown item");
  rejects(
    () => buySupply({ ...old, wallet: 100 }, "ammo", { mode: "playing" }),
    "not in hub",
  );
  rejects(
    () => buySupply({ ...old, wallet: 100, supplies: { ammo: 9 } }, "ammo"),
    "corrupt upgrade",
  );
  for (const id of Object.keys(SUPPLIES)) {
    let profile = { ...createProfile(), wallet: 300 };
    for (let level = 1; level <= 3; level++) {
      const before = clone(profile),
        bought = buySupply(profile, id);
      equal(profile, before, `${id} purchase is immutable`);
      check(
        bought.purchase.level === level &&
          bought.purchase.cost === SUPPLIES[id].costs[level - 1],
        `${id} exact level and cost`,
      );
      check(
        bought.bonuses[SUPPLIES[id].effect] === SUPPLIES[id].levels[level],
        `${id} actual loadout effect`,
      );
      profile = bought.profile;
    }
    check(profile.wallet === 50, `${id} three purchases total 250`);
    rejects(() => buySupply(profile, id), `${id} capped at three levels`);
  }
  let profile = { ...createProfile(), wallet: 1000 };
  for (const id of Object.keys(SUPPLIES))
    profile = buySupply(profile, id).profile;
  check(
    validateProfile(profile),
    "new optional field accepted by existing profile shape",
  );
  const purchased = clone(profile),
    started = beginMission(profile, MISSIONS[0].id);
  rejects(
    () => buySupply(started.profile, "ammo"),
    "active story run blocks purchase",
  );
  equal(
    failMission(started.profile, started.run).profile,
    purchased,
    "failure retains paid upgrades and does not refund their price",
  );
  equal(
    supplyBonuses(started.run.before),
    supplyBonuses(profile),
    "loadout bonus available in safe snapshot",
  );
  for (const mission of MISSIONS) {
    const active = beginMission(profile, mission.id),
      outcome = {
        strategy: "nonlethal",
        choice: mission.choice?.options[0].id,
        stats: { shots: 0, hits: 0, seconds: 600 },
      };
    profile = completeMission(active.profile, active.run, outcome).profile;
    const settled = clone(profile);
    for (let i = 0; i < 10; i++)
      equal(
        completeMission(profile, active.run, outcome).profile,
        settled,
        "repeat completion cannot fund upgrades twice",
      );
  }
  const completed = clone(profile);
  for (const mission of MISSIONS) {
    const active = beginMission(profile, mission.id, { replay: true });
    rejects(
      () => buySupply(active.profile, "ammo"),
      "active replay blocks purchase",
    );
    equal(
      failMission(active.profile, active.run).profile,
      profile,
      "replay failure preserves upgrades and wallet",
    );
    profile = completeMission(active.profile, active.run, {
      strategy: "combat",
      choice: mission.choice?.options[1].id,
      stats: { shots: 12, hits: 8, seconds: 550 },
    }).profile;
    equal(profile.wallet, completed.wallet, "replay never farms shop funds");
    equal(
      profile.supplies,
      completed.supplies,
      "replay never changes upgrades",
    );
    equal(profile.choices, completed.choices, "replay never changes story");
  }
  return {
    assertions,
    supplies: 3,
    maximumLevel: 3,
    costs: [50, 80, 120],
    result: "passed",
    scope:
      "Pure purchase rules with actual existing failure/replay/save-shape compatibility; shop UI and loadout effects still require runtime integration.",
  };
}
