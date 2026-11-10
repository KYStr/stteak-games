/** Original Dust & Redemption narrative and encounter data. CC0-1.0. Metres; positions are [x,z]. */
export const NPCS = Object.freeze([
  {
    id: "mara",
    name: "瑪拉",
    role: "驛站醫師",
    stance: "讓糧水先到傷者手裡；反對把平民當籌碼。",
    color: "#4caaa1",
  },
  {
    id: "silas",
    name: "西拉斯",
    role: "退休執法官",
    stance: "相信公開證據與可追責的秩序，不相信私刑。",
    color: "#bba16b",
  },
  {
    id: "inez",
    name: "伊妮絲",
    role: "礦工代表",
    stance: "支持工人自治，要求每筆資源分配都能被看見。",
    color: "#d07747",
  },
  {
    id: "orin",
    name: "奧林",
    role: "鐵路守望者",
    stance: "願意妥協換來安全，但不願再替公司掩埋真相。",
    color: "#768a9a",
  },
]);

export const WEAPONS = Object.freeze({
  revolver: {
    id: "revolver",
    name: "砂塵左輪",
    magazine: 6,
    reserve: 72,
    damage: 34,
    interval: 0.42,
    reload: 1.65,
    range: 36,
    spread: 0.018,
    description: "六發彈巢；單發威力高，探頭短點射。",
  },
  rifle: {
    id: "rifle",
    name: "驛路短步槍",
    magazine: 10,
    reserve: 100,
    damage: 24,
    interval: 0.24,
    reload: 2.1,
    range: 44,
    spread: 0.011,
    description: "十發彈匣；射速較快，適合壓制與中距離。",
  },
});

export const SCENES = Object.freeze({
  station: {
    id: "station",
    name: "暮砂車站",
    subtitle: "鐵軌與倉庫",
    color: "#c69258",
    sky: "#dec59d",
    routes: [
      {
        id: "west",
        name: "西側貨棚",
        description: "低箱密集，可以翻越短牆接近月台。",
        waypoints: [
          [-12, 17],
          [-16, 8],
          [-15, -8],
          [0, -16],
        ],
      },
      {
        id: "east",
        name: "東側鐵軌",
        description: "視野開闊；先利用水塔基座阻斷射線。",
        waypoints: [
          [-12, 17],
          [16, 12],
          [16, 4],
          [13, -11],
          [0, -16],
        ],
      },
    ],
  },
  canyon: {
    id: "canyon",
    name: "斷喉峽谷",
    subtitle: "岩壁與水道",
    color: "#bc7047",
    sky: "#d8ad87",
    routes: [
      {
        id: "west",
        name: "西側乾河床",
        description: "沿低岩前進，留意敵人的側翼腳步。",
        waypoints: [
          [-12, 17],
          [-16, 8],
          [-15, -8],
          [0, -16],
        ],
      },
      {
        id: "east",
        name: "東側岩棚",
        description: "高岩可擋住狙擊；越過缺口前觀察預告線。",
        waypoints: [
          [-12, 17],
          [16, 12],
          [16, 4],
          [13, -11],
          [0, -16],
        ],
      },
    ],
  },
  mine: {
    id: "mine",
    name: "灰脈礦場",
    subtitle: "礦棚與升降井",
    color: "#9b896c",
    sky: "#c7baa1",
    routes: [
      {
        id: "west",
        name: "西側運礦道",
        description: "礦車構成連續掩體，能避開中央高台。",
        waypoints: [
          [-12, 17],
          [-16, 8],
          [-15, -8],
          [0, -16],
        ],
      },
      {
        id: "east",
        name: "東側通風廊",
        description: "路較寬但掩體較少，適合短步槍壓制後轉移。",
        waypoints: [
          [-12, 17],
          [16, 12],
          [16, 4],
          [13, -11],
          [0, -16],
        ],
      },
    ],
  },
});

const point = (id, title, position, text) => ({ id, title, position, text });
const enemies = (prefix, types) =>
  types.map((type, i) => ({
    id: `${prefix}-${i + 1}`,
    type,
    position: [
      [-7, 0],
      [7, -3],
      [-5, -10],
      [9, -12],
      [1, -5],
      [-11, -4],
    ][i],
  }));
const objects = (id, negotiator, cargo) => [
  { id: `${id}-parley`, type: "parley", title: negotiator, position: [0, -16] },
  { id: `${id}-cargo`, type: "cargo", title: cargo, position: [2, -16] },
];
const common = {
  entry: [-12, 17],
  exit: [-12, 18],
  objective:
    "查明三條線索後前往據點議和，或擊敗守軍取回物件；最後返回南側撤離點。",
  strategies: ["nonlethal", "combat"],
};

export const MISSIONS = Object.freeze([
  {
    ...common,
    id: "dry-mail",
    number: 1,
    title: "沒有寄出的信",
    scene: "station",
    speaker: "mara",
    reward: 60,
    summary: "驛站的藥箱被扣在車站。找到扣押的理由，讓藥品趕上今晚。",
    briefing: [
      {
        speaker: "mara",
        text: "那不是公司的貨。每個藥瓶都刻著捐贈人的名字，但車站的人說我們欠過路費。",
      },
      {
        speaker: "silas",
        text: "先看貨單、診療通知和守衛的口糧。能說服他們最好；開槍就要承擔傷亡。西貨棚與東鐵軌都能到月台。",
      },
      {
        speaker: "mara",
        text: "三條線索能讓你在後方據點提出完整交換；若你決定交戰，清除守軍後拿藥箱。兩條路都得帶東西回南側。",
      },
    ],
    clues: [
      point(
        "mail-manifest",
        "捐贈貨單",
        [-16, 8],
        "藥箱屬於暮砂診所，並非鐵路公司的抵押財產。",
      ),
      point(
        "mail-rations",
        "空糧袋",
        [16, 4],
        "守軍已經三天沒有領到口糧。他們扣貨，是怕明天挨餓。",
      ),
      point(
        "mail-letter",
        "未寄出的求醫信",
        [-15, -8],
        "隊長的女兒也在診所候診。共同運送藥箱，能讓所有人先活過今晚。",
      ),
    ],
    interactables: objects(
      "dry-mail",
      "向守衛隊長提出糧藥互助",
      "取回診所藥箱",
    ),
    enemies: enemies("mail", ["guard", "flanker", "guard", "shotgun"]),
    debrief: {
      nonlethal: [
        {
          speaker: "mara",
          text: "守衛跟著藥箱來了。他們放下槍，留下來搬水。原來今天可以沒有新的病人。",
        },
        {
          speaker: "orin",
          text: "他們願意給我看下一班貨的路單。你替整條驛路多開了一扇門。",
        },
      ],
      combat: [
        {
          speaker: "mara",
          text: "藥箱到了，我會用它救人。車站的傷者也在等我；希望下次，來的只有藥箱。",
        },
        {
          speaker: "silas",
          text: "你守住了承諾，但街上的人現在會先看你的槍。以後得用更多證據換取信任。",
        },
      ],
    },
    effects: {
      nonlethal: { wallet: 15, trust: { mara: 2, orin: 1, silas: 1 } },
      combat: { wallet: 5, trust: { mara: -1, silas: 1 } },
    },
    consequence: {
      nonlethal: "診所與守衛建立互助；醫師信任 +2，額外報酬 +15。",
      combat: "藥品保住，但診所多了傷者；醫師信任 -1，額外報酬 +5。",
    },
    choice: null,
  },
  {
    ...common,
    id: "broken-water",
    number: 2,
    title: "水往哪裡流",
    scene: "canyon",
    speaker: "inez",
    reward: 75,
    summary: "被封住的水閘讓鎮上與礦區互相指責。決定今後由誰掌管水源。",
    briefing: [
      {
        speaker: "inez",
        text: "礦工說水被鎮上截了，鎮上說礦工偷開閘門。兩邊都渴，公司卻照常收水費。",
      },
      {
        speaker: "silas",
        text: "找到水錶、契約與破裂的水管，就能證明真正問題。拿回閥柄之後，你必須公開選擇管理方式。這是第一項關鍵決策。",
      },
    ],
    clues: [
      point(
        "water-meter",
        "乾轉的水錶",
        [-16, 8],
        "水錶持續計費，實際流量卻是零；帳上的「偷水」並不存在。",
      ),
      point(
        "water-contract",
        "共同水契",
        [16, 4],
        "原始契約允許各住區輪流管理水閘，公司只是維修承包者。",
      ),
      point(
        "water-pipe",
        "破裂的輸水管",
        [-15, -8],
        "閘門上游的管線失修。停止互相爭水，才能安排兩邊一起修復。",
      ),
    ],
    interactables: objects(
      "broken-water",
      "與水閘守軍協議共同修復",
      "取回水閘閥柄",
    ),
    enemies: enemies("water", ["guard", "flanker", "shotgun", "sniper"]),
    debrief: {
      nonlethal: [
        {
          speaker: "inez",
          text: "他們把閥柄交了出來，還留下兩個人修管線。現在我們得決定，誰有權每天開那扇閘。",
        },
      ],
      combat: [
        {
          speaker: "silas",
          text: "水閘拿下了。槍聲會傳得比流水快，分配方式必須公開，否則明天還會有人守在那裡。",
        },
      ],
    },
    effects: {
      nonlethal: { wallet: 20, trust: { inez: 2, mara: 1 } },
      combat: { wallet: 5, trust: { silas: 1, inez: -1 } },
    },
    consequence: {
      nonlethal: "兩方一起修管；礦工信任 +2。",
      combat: "閘門以武力解封；執法官信任 +1，礦工信任 -1。",
    },
    choice: {
      key: "water",
      title: "第一項關鍵決策：水權",
      options: [
        {
          id: "commons",
          label: "交給居民輪值共管",
          effect: { trust: { inez: 2, mara: 1, orin: 1 } },
          consequence: "居民與礦工共享水權；日後共同議會多一項公開制度。",
        },
        {
          id: "marshal",
          label: "交由執法官統一配給",
          effect: { wallet: 20, trust: { silas: 2, inez: -1 } },
          consequence:
            "配給受警署保護，額外補助 +20；礦工擔心自己的聲音再次被忽略。",
        },
      ],
    },
  },
  {
    ...common,
    id: "last-signal",
    number: 3,
    title: "最後一班電報",
    scene: "mine",
    speaker: "orin",
    reward: 85,
    summary: "礦場斷了對外訊息。修復信號，讓失蹤工人的名單離開山谷。",
    briefing: [
      {
        speaker: "orin",
        text: "電報房還亮著燈，卻沒有一封訊息傳出來。公司說山裡沒有人失蹤。那些名字，我認識。",
      },
      {
        speaker: "inez",
        text: "查電線、值班表與替換碼。讓守軍明白他們也被隔絕，或奪回發報線圈。這次我們要帶消息出去。",
      },
    ],
    contextual: {
      water: {
        commons: "居民水會願意替失蹤者家屬傳信；你的共管決定有了第一批回應。",
        marshal: "警署願意護送信差，但礦工堅持在名單上留下自己的印記。",
      },
    },
    clues: [
      point(
        "signal-wire",
        "完好的電線",
        [-16, 8],
        "電線沒有斷。發報被人手動切斷，並不是暴風造成的。",
      ),
      point(
        "signal-roster",
        "消失的值班表",
        [16, 4],
        "被刪除的工號與失蹤名單一致，其中也有守軍的親屬。",
      ),
      point(
        "signal-code",
        "替換密碼紙",
        [-15, -8],
        "取消封鎖的驗證碼仍可使用；守軍不必等待公司的許可。",
      ),
    ],
    interactables: objects(
      "last-signal",
      "說服電報守軍解除封鎖",
      "取回發報線圈",
    ),
    enemies: enemies("signal", [
      "guard",
      "flanker",
      "sniper",
      "shotgun",
      "guard",
    ]),
    debrief: {
      nonlethal: [
        {
          speaker: "orin",
          text: "他們自己按下了發送鍵。第一封不是命令，是問家裡的人還好不好。我的下一班車會留座位給信差。",
        },
        { speaker: "inez", text: "所有名字都送出去了，沒有一個被改成數字。" },
      ],
      combat: [
        {
          speaker: "orin",
          text: "線圈帶回來了，訊息終於能走。只是留在電報房的人，再也等不到回信。",
        },
        {
          speaker: "inez",
          text: "我會替每個失蹤的人追問；也會把今天的傷亡寫在同一張紙上。",
        },
      ],
    },
    effects: {
      nonlethal: { wallet: 25, trust: { orin: 2, inez: 1 } },
      combat: { wallet: 10, trust: { orin: -1, silas: 1 } },
    },
    consequence: {
      nonlethal: "信差得到守軍保護；守望者信任 +2，額外報酬 +25。",
      combat: "電報恢復，信差須另尋護送；守望者信任 -1。",
    },
    choice: null,
  },
  {
    ...common,
    id: "black-ledger",
    number: 4,
    title: "黑帳與白晝",
    scene: "station",
    speaker: "silas",
    reward: 100,
    summary: "證明公司侵吞與失蹤案的原始帳冊停在車站。決定真相如何被處理。",
    briefing: [
      {
        speaker: "silas",
        text: "我以前說沒有證據就不能查。現在證據就在車站，我不會再用這句話擋住你。",
      },
      {
        speaker: "mara",
        text: "貨運票、付款收據、被塗掉的工名，足夠讓帳房明白自己只是替罪羊。帶回原帳之後，第二項關鍵決策由你公開說明。",
      },
    ],
    clues: [
      point(
        "ledger-ticket",
        "夜班貨運票",
        [-16, 8],
        "每次工人失蹤的夜晚，都有一列未登記的公司車廂。",
      ),
      point(
        "ledger-payment",
        "守衛付款收據",
        [16, 4],
        "佣金以帳房名字領走，真正收款者卻是公司經理。帳房也被設計成替罪羊。",
      ),
      point(
        "ledger-names",
        "被塗抹的姓名",
        [-15, -8],
        "被稱為「耗材」的支出，對應每個失蹤工人的姓名。原帳能與家屬名單交叉證實。",
      ),
    ],
    interactables: objects(
      "black-ledger",
      "說服帳房公開原始證據",
      "取回公司黑帳",
    ),
    enemies: enemies("ledger", [
      "guard",
      "flanker",
      "sniper",
      "shotgun",
      "guard",
    ]),
    debrief: {
      nonlethal: [
        {
          speaker: "silas",
          text: "帳房願意作證。他說這是第一次有人問他願不願意，而不是叫他閉嘴。現在，帳冊怎麼處理？",
        },
      ],
      combat: [
        {
          speaker: "mara",
          text: "原帳沒有損毀。證據可以揭開真相，但今天沒有人能替你證明取回它時發生的一切。",
        },
      ],
    },
    effects: {
      nonlethal: { wallet: 20, trust: { silas: 2, orin: 1 } },
      combat: { wallet: 10, trust: { silas: -1, inez: 1 } },
    },
    consequence: {
      nonlethal: "取得願意作證的帳房；執法官信任 +2。",
      combat: "取得原帳，缺少現場證人；執法官信任 -1。",
    },
    choice: {
      key: "ledger",
      title: "第二項關鍵決策：真相",
      options: [
        {
          id: "publish",
          label: "公開原帳與全部姓名",
          effect: { trust: { silas: 2, inez: 2, orin: 1 } },
          consequence: "每個人都能核對真相；公開證據成為邊境自治的基礎。",
        },
        {
          id: "bargain",
          label: "用原帳換取撤軍與補償",
          effect: { wallet: 40, trust: { mara: 1, silas: -2, inez: -1 } },
          consequence:
            "公司付出補償 +40 並答應撤軍，但原帳被封存；受害家屬無法公開追責。",
        },
      ],
    },
  },
  {
    ...common,
    id: "long-night",
    number: 5,
    title: "長夜過峽",
    scene: "canyon",
    speaker: "mara",
    reward: 110,
    summary: "一隊返鄉家屬被攔在峽谷。找出通行理由，把他們帶回安全的路。",
    briefing: [
      {
        speaker: "mara",
        text: "診所等著他們，其中有兩個人不適合再走夜路。別讓最後這段路，變成他們走不過去的路。",
      },
      {
        speaker: "orin",
        text: "邊防守軍拿著舊命令。找到停戰令、親屬證件與安全路線，他們就能撤哨；不然你得打開路障，取回通行鈴。",
      },
    ],
    contextual: {
      ledger: {
        publish: "家屬帶著公開名單，終於不用再向哨兵證明失蹤的人存在。",
        bargain:
          "補償已付，但家屬仍不知道誰下了命令。今晚他們需要的是安全抵達。",
      },
    },
    clues: [
      point(
        "night-order",
        "過期的封路令",
        [-16, 8],
        "封路命令昨夜已失效；今天仍扣人，責任會落到值勤者身上。",
      ),
      point(
        "night-papers",
        "親屬證件",
        [16, 4],
        "所有人都是返鄉家屬，沒有武裝與公司的通緝對象。",
      ),
      point(
        "night-route",
        "未淹的渡口",
        [-15, -8],
        "渡口水位安全；撤掉路障後，守軍與家屬可以一起離開落石區。",
      ),
    ],
    interactables: objects("long-night", "說服邊防守軍撤哨護送", "取回通行鈴"),
    enemies: enemies("night", [
      "guard",
      "flanker",
      "shotgun",
      "sniper",
      "guard",
      "guard",
    ]),
    debrief: {
      nonlethal: [
        {
          speaker: "mara",
          text: "守軍背著走不動的人進了鎮。今晚診所只需要煮熱水，這是我盼了很久的事。",
        },
        {
          speaker: "orin",
          text: "鐘聲從峽谷響到車站。下一次有人求救，我們都聽得見。",
        },
      ],
      combat: [
        {
          speaker: "mara",
          text: "家屬回來了。我替他們關上門，也替被槍聲驚醒的孩子留著燈。",
        },
        {
          speaker: "silas",
          text: "路障倒下以後還得有人守路。我會把巡邏排下去。",
        },
      ],
    },
    effects: {
      nonlethal: { wallet: 25, trust: { mara: 2, orin: 2 } },
      combat: { wallet: 10, trust: { mara: -1, silas: 1 } },
    },
    consequence: {
      nonlethal: "守軍加入護送；醫師、守望者信任各 +2。",
      combat: "通路打開，警署接手巡邏；醫師信任 -1。",
    },
    choice: null,
  },
  {
    ...common,
    id: "dawn-pact",
    number: 6,
    title: "黎明之前的約定",
    scene: "mine",
    speaker: "inez",
    reward: 130,
    summary: "最後的公司督軍據守礦場。取回土地契據，選擇邊境明天的秩序。",
    briefing: [
      {
        speaker: "inez",
        text: "水流了，電報響了，家屬回家了。但地契還在礦井裡；只要它沒交出來，公司就能說這一切都是借來的。",
      },
      {
        speaker: "silas",
        text: "找股權頁、欠薪冊與撤離時刻。讓督軍知道沒有援軍，也沒有替他頂罪的人。帶回地契後，最後的權力安排會決定邊境往哪裡走。",
      },
    ],
    clues: [
      point(
        "pact-shares",
        "被放棄的股權",
        [-16, 8],
        "公司已賣掉這座礦，督軍守著一份不會再發薪的契約。",
      ),
      point(
        "pact-wages",
        "未付的薪冊",
        [16, 4],
        "守軍與礦工同在欠薪名單。他們有共同的債主，沒有必要互相討債。",
      ),
      point(
        "pact-train",
        "末班車時刻",
        [-15, -8],
        "督軍仍可搭車離境；交還地契能換來安全撤離與公開聽證。",
      ),
    ],
    interactables: objects(
      "dawn-pact",
      "談判督軍交還地契與撤離",
      "取回邊境土地契據",
    ),
    enemies: enemies("pact", [
      "guard",
      "flanker",
      "sniper",
      "shotgun",
      "guard",
      "sniper",
    ]),
    debrief: {
      nonlethal: [
        {
          speaker: "inez",
          text: "地契放在桌上，手印按在旁邊。這一次，沒有人的名字被劃掉。現在輪到我們決定怎麼一起生活。",
        },
      ],
      combat: [
        {
          speaker: "silas",
          text: "礦場已經安靜了。拿著地契的人能決定誰留下；希望你記得，槍放下以後的選擇才會留下最久。",
        },
      ],
    },
    effects: {
      nonlethal: { wallet: 30, trust: { inez: 2, silas: 1, mara: 1 } },
      combat: { wallet: 10, trust: { inez: 1, mara: -1 } },
    },
    consequence: {
      nonlethal: "守軍交械離境並接受聽證；礦工信任 +2。",
      combat: "督軍防線瓦解；礦工信任 +1，醫師信任 -1。",
    },
    choice: {
      key: "future",
      title: "第三項關鍵決策：明日",
      options: [
        {
          id: "council",
          label: "建立居民與礦工共同議會",
          effect: { trust: { inez: 2, mara: 1, orin: 1 } },
          consequence:
            "以公開席位與定期輪值分散權力；水權與真相將決定議會能否扎根。",
        },
        {
          id: "warden",
          label: "設立守望官與統一警備",
          effect: { wallet: 25, trust: { silas: 2, inez: -1 } },
          consequence:
            "集中警備換取迅速恢復通行，額外補助 +25；居民等待下一次移交權力。",
        },
      ],
    },
  },
]);

export const ENDINGS = Object.freeze({
  common_dawn: {
    id: "common_dawn",
    title: "眾人的黎明",
    rule: "水權共管＋公開原帳＋共同議會",
    summary:
      "你沒有留下自己的旗幟。水會、證人與輪值席位，讓每個人都能改變這座邊境。",
    outcomes: [
      {
        title: "水與土地",
        text: "居民水會公開每週分配，礦工取得維修與土地席位。乾季來臨時，第一場爭議在桌邊解決。",
      },
      {
        title: "正義與代價",
        text: "原帳與證詞送往公開聽證。補償來得慢，姓名卻終於回到家屬手裡。",
      },
      {
        title: "驛路的未來",
        text: "守望者恢復夜班信車，診所與礦場輪流供應物資。你可以留下，也可以把下一段路交給別人。",
      },
    ],
    responses: {
      mara: "下一個黎明，我會先開窗，再開診所。",
      silas: "這次我守的是規則，不是寫規則的人。",
      inez: "我們終於能把「我們」寫進地契。",
      orin: "下一班車有四封信，沒有一道封鎖令。",
    },
  },
  guarded_peace: {
    id: "guarded_peace",
    title: "守望下的安寧",
    rule: "公開原帳，但水權或最終權力仍集中於官署",
    summary:
      "邊境得到能追責的秩序，也得到一個尚未回答的問題：平靜之後，權力何時回到居民手中？",
    outcomes: [
      {
        title: "水與土地",
        text: "警署與居民分工維持供應，配給有據可查。礦工開始要求明確的移交時程。",
      },
      {
        title: "正義與代價",
        text: "公開原帳阻止了公司悄悄返回。警備擁有較大權力，卻不能再宣稱一切沒有證據。",
      },
      {
        title: "驛路的未來",
        text: "夜車在巡邏護送下恢復。下一場爭論將發生在公告欄前，居民要求守望者也受規則約束。",
      },
    ],
    responses: {
      mara: "只要配給名單上還看得見病人的名字，我就會繼續盯著它。",
      silas: "把權力交還的日期，也該寫進我的值勤簿。",
      inez: "今天能安全回家；明天我們會來問誰能投票。",
      orin: "車開了。我希望有一天，它不用等警哨吹響。",
    },
  },
  quiet_frontier: {
    id: "quiet_frontier",
    title: "沉默的邊境",
    rule: "以原帳換取撤軍與補償；真相未公開",
    summary:
      "你換來了及時的水、糧與撤軍。鎮上活了下來，但被封存的名字仍在每個安靜的夜裡等待回答。",
    outcomes: [
      {
        title: "水與土地",
        text: "補償修好了水管和診所；分配制度依你對水權的選擇運作，家屬仍不知道誰該為損失負責。",
      },
      {
        title: "正義與代價",
        text: "公司離開，原帳封存。沒有公開證據，下一個承包商仍可能沿用舊制度。",
      },
      {
        title: "驛路的未來",
        text: "最終權力安排維持了通行。守望者悄悄保存一份家屬名單，讓未說出的故事有機會再被讀到。",
      },
    ],
    responses: {
      mara: "今晚救得回的人，我先救。那些沒回來的人，我也會記得。",
      silas: "和平不是沒有問題；只是我們把問題留到了明天。",
      inez: "錢能補屋頂，補不了空椅子。",
      orin: "我替那些名字留了一封沒有收件人的信。",
    },
  },
});

export function missionById(id) {
  return MISSIONS.find((mission) => mission.id === id) || null;
}
export function dialogueFor(
  mission,
  profile,
  phase = "briefing",
  strategy = "nonlethal",
) {
  const lines =
    phase === "briefing"
      ? [...mission.briefing]
      : [...(mission.debrief[strategy] || [])];
  if (phase === "briefing")
    for (const [key, variants] of Object.entries(mission.contextual || {})) {
      const line = variants[profile.choices?.[key]];
      if (line) lines.push({ speaker: mission.speaker, text: line });
    }
  return lines;
}
