// Original second-phase assignments. Finite objects, ordered physical receipts.
export const ONWARD_VERSION = 5;
const read = (id, at, title, fact) => ({ id, kind: "read", at, title, fact });
const set = (id, at, title, values, answer) => ({
  id,
  kind: "set",
  at,
  title,
  values,
  answer,
});
const take = (id, at, cargo, title) => ({ id, kind: "take", at, cargo, title });
const give = (id, at, cargo, title) => ({ id, kind: "give", at, cargo, title });
const escort = (id, at, title) => ({ id, kind: "escort", at, title });
const sites = [
  { id: "nw", position: [-18, -16], title: "北西轉運所" },
  { id: "se", position: [18, 16], title: "南東接收所" },
  { id: "sw", position: [-18, 16], title: "南西接收所" },
  { id: "ne", position: [18, -16], title: "北東轉運所" },
  { id: "south", position: [0, 17], title: "南側核對站" },
  { id: "north", position: [0, -17], title: "北側核對站" },
];
const make = (id, title, choices, steps, extra = {}) => ({
  id,
  title,
  choices,
  sites: sites.map((s) => ({ ...s, position: [...s.position] })),
  steps,
  ...extra,
});
export const ONWARD = {
  "dry-mail": make(
    "mail-onward",
    "搬運工的兩站救濟",
    [
      {
        id: "clinic-priority",
        title: "診所優先：兩包都交醫護，走西線",
        quantities: [2, 0],
      },
      {
        id: "shared-relief",
        title: "共同救濟：診所與住戶各一包，走東線",
        quantities: [1, 1],
      },
    ],
    [
      read(
        "relief-order",
        "nw",
        "核對兩個獨立包號：R-01、R-02",
        "R-01／R-02，各一包，總量二",
      ),
      take("parcel-01-take", "nw", "R-01", "拿起 R-01 原包"),
      give("parcel-01-receipt", "se", "R-01", "第一接收者點收 R-01"),
      read(
        "second-order",
        "ne",
        "核對 R-02 與第二接收名冊",
        "R-02：只能由第二接收者點收",
      ),
      take("parcel-02-take", "ne", "R-02", "拿起 R-02 原包"),
      give("parcel-02-receipt", "sw", "R-02", "第二接收者點收 R-02"),
      read(
        "porter-meet",
        "worker",
        "向原搬運工出示兩份回條",
        "同一搬運工，兩份回條，不新增角色",
      ),
      escort("porter-stop-one", "north", "護送原搬運工到北側中轉站"),
      escort(
        "porter-stop-two",
        "worker-safe",
        "沿所選救濟路線護送原搬運工到安全處",
      ),
    ],
    { party: "worker" },
  ),
  "broken-water": make(
    "water-circuit",
    "三站配水迴路",
    [
      {
        id: "clinic-priority",
        title: "診所優先：三、一、一份",
        quantities: [3, 1, 1],
      },
      {
        id: "household-priority",
        title: "住戶優先：一、二、二份",
        quantities: [1, 2, 2],
      },
    ],
    [0, 1, 2].flatMap((i) => {
      const at = ["nw", "ne", "sw"][i],
        dest = ["se", "sw", "ne"][i],
        n = i + 1;
      return [
        read(
          `branch-${n}-read`,
          at,
          `讀第 ${n} 站真壓力與需求牌`,
          `支路 ${n} 壓力 ${[3, 2, 2][i]}，總供水固定五份`,
        ),
        set(
          `branch-${n}-isolate`,
          at,
          `先關閉第 ${n} 支路隔離閥`,
          ["關閉 0", "半開 1", "全開 2"],
          0,
        ),
        set(
          `branch-${n}-test`,
          at,
          `比對壓力，設定第 ${n} 站受水需求`,
          ["一份", "二份", "三份"],
          "quantity",
        ),
        take(`sample-${n}-take`, at, `W-${n}`, `取出本支路唯一樣瓶 W-${n}`),
        give(
          `sample-${n}-receipt`,
          dest,
          `W-${n}`,
          `同瓶送抵第 ${n} 接收者，記錄實際份數`,
        ),
        read(
          `branch-${n}-commission`,
          at,
          `返回第 ${n} 支路核對回壓與簽章`,
          `樣瓶與接收回條相符；開通固定配額`,
        ),
      ];
    }),
  ),
  "last-signal": make(
    "signal-chain",
    "三中繼往返校驗",
    [
      { id: "sheltered", title: "有遮蔽的西側接線：A → B → C", wire: "west" },
      { id: "exposed", title: "開闊東側接線：C → B → A", wire: "east" },
    ],
    [
      read(
        "chain-source",
        "nw",
        "讀取原始電文與回覆校驗碼",
        "MSG-17：A=2，B=3，C=1；校驗 2-3-1",
      ),
      ...["se", "sw", "ne"].flatMap((at, i) => [
        read(
          `relay-${i + 1}-read`,
          at,
          `讀中繼 ${i + 1} 的獨立針腳牌`,
          `第 ${i + 1} 站有效針腳 ${[2, 3, 1][i]}；回傳校驗 ${["17-A2", "17-B3", "17-C1"][i]}`,
        ),
        set(
          `relay-${i + 1}-wire`,
          at,
          `接入中繼 ${i + 1} 的正確針腳`,
          ["針腳 1", "針腳 2", "針腳 3"],
          [1, 2, 0][i],
        ),
      ]),
      take("chain-ack-take", "ne", "SIG-17", "取出有本次校驗的回傳封條"),
      give("chain-ack-b", "sw", "SIG-17", "同一封條核對 B 的回傳"),
      take("chain-ack-b-take", "sw", "SIG-17", "帶走 B 簽過的同一封條"),
      give("chain-ack-a", "se", "SIG-17", "同一封條核對 A 的回傳"),
      take("chain-ack-a-take", "se", "SIG-17", "帶走 A 簽過的同一封條"),
      give("chain-source-ack", "nw", "SIG-17", "原發訊人核對全部下游校驗"),
      take("chain-final-take", "nw", "SIG-17", "帶走具三站簽章的最終電文"),
      give("chain-final-receipt", "receiver", "SIG-17", "親手交給原接收者奧林"),
    ],
  ),
  "black-ledger": make(
    "ledger-witnesses",
    "三帳互證與兩份見證副本",
    [
      { id: "sealed", title: "密封交給兩名受託見證者", custody: "sealed" },
      {
        id: "public",
        title: "公開兩頁，各由一名見證者點收",
        custody: "public",
      },
    ],
    [
      read(
        "wage-north",
        "nw",
        "抄核北西工資紀錄：工名、金額、日期",
        "014 艾達／12 元／17 日",
      ),
      read(
        "wage-east",
        "se",
        "抄核南東付款紀錄：同一工人",
        "014 艾達／12 元／17 日；沒有付給替名者",
      ),
      read(
        "wage-west",
        "ne",
        "抄核北東出勤紀錄：本人日期相符",
        "014 艾達／12 元／17 日",
      ),
      set(
        "wage-match",
        "sw",
        "對照三份原始記錄，選出一致的身分",
        ["014／12／17", "041／12／17", "014／21／16"],
        0,
      ),
      take("witness-01-take", "sw", "L-01", "取走編號 L-01 的獨立見證副本"),
      give(
        "witness-01-receipt",
        "ne",
        "L-01",
        "第一見證人點收 L-01 並具名簽收",
      ),
      read(
        "witness-register",
        "sw",
        "返回登記台核對第一份簽章",
        "L-01 已在第一見證人處；L-02 仍在登記台",
      ),
      take("witness-02-take", "sw", "L-02", "取走編號 L-02 的另一份副本"),
      give(
        "witness-02-receipt",
        "se",
        "L-02",
        "第二見證人點收 L-02 並具名簽收",
      ),
      read(
        "witness-final",
        "nw",
        "回原工資登記處核對兩份獨立回條",
        "L-01 與 L-02 均已具名，不可重複計數",
      ),
    ],
  ),
  "long-night": make(
    "night-rendezvous",
    "三人夜間集合與第二座渡橋",
    [
      { id: "west-ford", title: "西線：西側集合點與斜撐", crossing: "west" },
      { id: "east-ridge", title: "東線：東側集合點與定位銷", crossing: "east" },
    ],
    [
      read(
        "party-roll",
        "party",
        "向原三人核對今日護送名冊",
        "羅絲、塔文、米洛；缺任何一人不得簽收",
      ),
      escort("rendezvous-one", "north", "同三人到第一集合點，重新逐人點名"),
      {
        id: "crossing-hold",
        kind: "hold",
        at: "north",
        title: "讓米洛原地停等，另外兩人也留在掩體",
      },
      read(
        "alternate-bridge",
        "se",
        "親赴所選第二渡橋讀水尺與榫孔",
        "水尺 1；西斜撐 2／東定位銷 3",
      ),
      set(
        "alternate-repair",
        "se",
        "依所選路線接妥真正橋件",
        ["未接", "西斜撐", "東定位銷"],
        "bridge",
      ),
      read(
        "alternate-load-test",
        "ne",
        "走到對岸試重板，驗證橋件沒有移位",
        "角色親自抵達對岸；三人仍在北側停等",
      ),
      read(
        "party-recall",
        "north",
        "回到同三人身旁，核對停等者並續行",
        "同一個米洛與另外兩人都在場",
      ),
      escort("rendezvous-two", "south", "同三人到第二集合點，再逐人點名"),
      escort("rendezvous-return", "arrival", "帶同三人返回正式接收圈"),
    ],
    { party: "family", arrivalPosition: [-12, 17], arrivalRadius: 2.1 },
  ),
  "dawn-pact": make(
    "pact-depots",
    "雙庫封印與同車二十四發核帳",
    [
      {
        id: "clinic-reserve",
        title: "保留給診所：可用存量三分之二入診所保管",
        reserve: "clinic",
      },
      {
        id: "road-reserve",
        title: "保留給道路：可用存量三分之二入道路保管",
        reserve: "road",
      },
    ],
    [
      read(
        "depot-a-seal",
        "nw",
        "近讀甲庫獨立封印 D-A-14",
        "原始甲庫十四發；與乙庫十發共二十四發",
      ),
      read(
        "depot-a-rack",
        "se",
        "赴甲庫實體出庫牌核對領用紀錄",
        "原守軍領用仍由同一車扣除，不另增彈藥",
      ),
      take("depot-a-auth", "nw", "D-A-14", "回甲庫拿起匹配封號的授權書"),
      give("depot-a-cart", "cart", "D-A-14", "把甲庫同一授權書帶回原車核帳"),
      read(
        "depot-b-seal",
        "ne",
        "近讀乙庫獨立封印 D-B-10",
        "原始乙庫十發；與甲庫十四發共二十四發",
      ),
      read(
        "depot-b-rack",
        "sw",
        "赴乙庫實體出庫牌核對封存紀錄",
        "發出＋車上＋封存＝二十四發，不能另造一批",
      ),
      take("depot-b-auth", "ne", "D-B-10", "回乙庫拿起匹配封號的授權書"),
      give("depot-b-cart", "cart", "D-B-10", "把乙庫另一份授權書帶回同一車"),
      read(
        "depot-reconciliation",
        "nw",
        "兩庫登記處核對兩份授權與同車總帳",
        "甲十四＋乙十＝二十四；含實際發出與原車封存",
      ),
    ],
  ),
};
export function onwardTask(missionId, dependencies) {
  const f = ONWARD[missionId];
  return {
    id: f.id,
    title: f.title,
    onward: true,
    position: [...f.sites[0].position],
    dependencies,
    model: "ledger",
    prop: { footprint: [0.8, 0.8] },
    description: "完成第一階段後的實體續程；所有交接均需同一物件與具名回條。",
    requiredClues: [],
    hints: [],
    physicalSteps: f.steps.map((s) => ({
      id: s.id,
      title: s.title,
      kind: "onward-proof",
      target: s.at,
    })),
    choices: f.choices.map((c) => ({
      id: c.id,
      label: c.title,
      success: true,
      effect: { flags: [`${f.id}:${c.id}`] },
      message: `${f.title}：${c.title}；全部實體回條已核對。`,
    })),
  };
}
// Physical relay inscriptions stay attached to their stations when wiring order reverses.
export function onwardFact(id, state, step) {
  if (
    id === "last-signal" &&
    state.version >= 4 &&
    state.choice === "exposed"
  ) {
    if (step.id === "relay-1-read")
      return ONWARD[id].steps.find((s) => s.id === "relay-3-read").fact;
    if (step.id === "relay-3-read")
      return ONWARD[id].steps.find((s) => s.id === "relay-1-read").fact;
  }
  return step.fact;
}
export function onwardAnswer(id, state, step) {
  const f = ONWARD[id],
    choice = f.choices.find((c) => c.id === state.choice);
  if (
    id === "last-signal" &&
    state.version >= 4 &&
    state.choice === "exposed"
  ) {
    if (step.id === "relay-1-wire") return 0;
    if (step.id === "relay-3-wire") return 1;
  }
  if (step.answer === "quantity")
    return choice.quantities[Number(step.id.match(/branch-(\d)/)[1]) - 1] - 1;
  if (step.answer === "bridge") return choice.id === "west-ford" ? 1 : 2;
  return step.answer;
}
export function createOnwardProgress() {
  return { version: ONWARD_VERSION, choice: null, events: [] };
}
const gap = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const check = (v, m) => {
  if (!v) throw Error(`續程：${m}`);
};
// Each event carries independent observed positions. Replaying this validator cannot invent receipts.
export function canonicalOnward(missionId, state, { complete = true } = {}) {
  const f = ONWARD[missionId];
  check(
    [2, 3, 4, ONWARD_VERSION].includes(state?.version) &&
      Array.isArray(state.events),
    "版本或事件格式不符",
  );
  const choice = f.choices.find((c) => c.id === state.choice);
  check(choice || !state.events.length, "先選定救濟／保管路線");
  check(state.events.length <= f.steps.length, "重複回條");
  let held = null,
    waiting = null;
  const delivered = new Set();
  for (let i = 0; i < state.events.length; i++) {
    const e = state.events[i],
      step = f.steps[i];
    check(
      e.id === step.id && e.kind === step.kind && e.sequence === i,
      "順序、身分或編號不符",
    );
    check(
      Array.isArray(e.player) &&
        e.player.length === 2 &&
        Array.isArray(e.target) &&
        e.target.length === 2 &&
        e.player.every((n) => Number.isFinite(n) && Math.abs(n) <= 23) &&
        e.target.every((n) => Number.isFinite(n) && Math.abs(n) <= 23) &&
        gap(e.player, e.target) <= 2.5,
      "需親自在實體站旁核對",
    );
    check(
      e.siteId === step.at ||
        (state.version === 2 &&
          missionId === "dry-mail" &&
          step.id === "porter-stop-two" &&
          e.siteId === "south"),
      "實體站別不符",
    );
    if (state.version >= 3 && step.at === "worker-safe")
      check(gap(e.target, [-13, 5]) < 0.1, "原搬運工的安全處不符");
    const site = f.sites.find((s) => s.id === step.at);
    if (site) {
      let actual = site;
      if (
        missionId === "dry-mail" &&
        state.choice === "shared-relief" &&
        step.id === "parcel-02-receipt"
      )
        actual = f.sites.find(
          (s) => s.id === (state.version === 2 ? "se" : "nw"),
        );
      if (
        missionId === "long-night" &&
        state.choice === "east-ridge" &&
        step.at === "se"
      )
        actual = f.sites.find((s) => s.id === "sw");
      if (missionId === "last-signal" && state.choice === "exposed")
        actual = f.sites.find(
          (s) =>
            s.id ===
            (step.at === "se" ? "ne" : step.at === "ne" ? "se" : step.at),
        );
      check(
        gap(e.target, actual.position) <= 3.1,
        "實際站點超出可達的原始配置",
      );
    }
    if (step.kind === "read")
      check(
        e.fact === onwardFact(missionId, state, step) &&
          e.visible === true &&
          e.normalDot > 0.18,
        "原始刻記未讀取",
      );
    if (step.kind === "set") {
      const quantityIndex = Number(step.id.match(/branch-(\d)/)?.[1]) - 1;
      const expected = onwardAnswer(missionId, state, step);
      check(
        e.value === expected && e.physical === true,
        "開關、壓力或針腳與本方案不符",
      );
      if (state.version >= 4 && missionId === "last-signal") {
        const number = Number(step.id.match(/relay-(\d)/)[1]);
        const tag =
          number === 2
            ? "B"
            : (number === 1) === (state.choice === "sheltered")
              ? "A"
              : "C";
        check(
          e.returnedChecksum === `17-${tag}${expected + 1}`,
          "實際中繼回傳校驗碼不符",
        );
      }
      if (
        state.version >= 3 &&
        missionId === "broken-water" &&
        step.id.endsWith("-test")
      ) {
        const pressure = [3, 2, 2][quantityIndex];
        check(
          e.valveClosed === true &&
            e.pressure === pressure &&
            expected + 1 <= pressure,
          "未先隔離支路，或真壓力不足",
        );
      }
      if (state.version >= 3 && step.id === "alternate-repair")
        check(Math.abs(e.bridgeAngle) < 0.01, "第二渡橋未實際打開");
    }
    if (step.kind === "take") {
      check(
        held === null && e.cargo === step.cargo && e.entity === step.cargo,
        "拿取物件身分不符",
      );
      held = step.cargo;
    }
    if (step.kind === "give") {
      check(
        held === step.cargo &&
          e.cargo === held &&
          e.entity === held &&
          Array.isArray(e.cargoPosition) &&
          gap(e.cargoPosition, e.target) <= 2.5,
        "同一物件未實際抵達",
      );
      if (state.version >= 3 && missionId === "dry-mail") {
        const recipient =
          step.cargo === "R-01"
            ? "clinic-front-desk"
            : state.choice === "shared-relief"
              ? "household-relief-house"
              : "clinic-field-post";
        check(
          e.quantity === 1 && e.recipientId === recipient,
          "救濟份數或具名接收者不符",
        );
      }
      if (missionId === "broken-water") {
        const n = Number(step.id.match(/sample-(\d)/)?.[1]) - 1;
        check(e.quantity === choice.quantities[n], "接收量與實際配額不符");
      }
      check(!delivered.has(step.id), "重複交付");
      delivered.add(step.id);
      held = null;
    }
    if (
      step.kind === "escort" ||
      step.kind === "hold" ||
      step.id === "party-recall"
    ) {
      const count = f.party === "family" ? 3 : 1,
        ids =
          f.party === "family"
            ? ["night-family-1", "night-family-2", "night-family-3"]
            : ["mail-porter"];
      check(
        e.members?.length === count &&
          e.members.every(
            (m, j) =>
              m.id === ids[j] &&
              Array.isArray(m.position) &&
              gap(m.position, e.target) <= 2.5,
          ),
        "原護送者未全部到場",
      );
    }
    if (state.version >= 5 && step.at === "arrival")
      check(
        gap(e.target, f.arrivalPosition) < 0.1 &&
          e.members.every((m) => gap(m.position, e.target) <= f.arrivalRadius),
        "原南側集合圈仍須全三人實際到達",
      );
    if (step.kind === "hold") waiting = e.members;
    if (state.version >= 3 && step.id === "alternate-load-test") {
      check(
        Math.abs(e.bridgeAngle) < 0.01 &&
          waiting &&
          e.members?.length === 3 &&
          e.members.every(
            (m, j) =>
              m.id === waiting[j].id &&
              gap(m.position, waiting[j].position) < 0.1,
          ),
        "試重時原三人沒有留在原掩體",
      );
    }
    if (
      state.version >= 3 &&
      (step.id === "depot-a-seal" || step.id === "depot-b-seal")
    )
      check(
        e.sealId === (step.id === "depot-a-seal" ? "D-A-14" : "D-B-10"),
        "實際庫封身分不符",
      );
    if (
      step.id === "depot-a-cart" ||
      step.id === "depot-b-cart" ||
      step.id === "depot-reconciliation"
    ) {
      const stock = e.stock;
      check(
        stock &&
          stock.initial === 24 &&
          [stock.issued, stock.cart, stock.sealed].every(
            (n) => Number.isInteger(n) && n >= 0,
          ) &&
          stock.issued + stock.cart + stock.sealed === 24,
        "同一二十四發存量不守恆",
      );
      check(
        e.reserve &&
          e.reserve.clinic + e.reserve.road === stock.cart &&
          e.reserve[choice.reserve] === Math.ceil((stock.cart * 2) / 3),
        "所選保留量與同車存量不符",
      );
    }
  }
  if (complete)
    check(
      state.events.length === f.steps.length && held === null,
      "續程尚未全部完成",
    );
  return {
    complete: state.events.length === f.steps.length,
    choice: state.choice,
    events: state.events.length,
    receipts: [...delivered],
  };
}
export function recordOnward(missionId, state, event) {
  const next = {
    version: state.version,
    choice: state.choice,
    events: [...state.events, structuredClone(event)],
  };
  canonicalOnward(missionId, next, { complete: false });
  return next;
}
