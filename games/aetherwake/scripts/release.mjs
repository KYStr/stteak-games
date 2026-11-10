import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { computeRuntimeHash } from "../../../scripts/game-build-hash.mjs";
import { BUILD } from "../src/version.js";
const file = new URL(
  "../../../src/game-development/releases/aetherwake.json",
  import.meta.url,
);
const release = JSON.parse(await readFile(file, "utf8"));
const runtime = fileURLToPath(
  new URL("../../../public/games/aetherwake/", import.meta.url),
);
const hash = await computeRuntimeHash(runtime);
const runtimeChanged =
  release.buildId !== BUILD.id || release.artifactHash !== hash.artifactHash;
// Rebuilding identical bytes must preserve reviewed release notes, known issues
// and milestone decisions. Only a new candidate starts with the defaults below.
if (runtimeChanged)
  Object.assign(release, {
    buildId: BUILD.id,
    version: BUILD.version,
    stage: BUILD.stage,
    entry: "games/aetherwake/index.html",
    updatedAt: BUILD.date,
    artifactHash: hash.artifactHash,
    summary:
      "真正 3D 六島浮空航線。校準風標、運送星儀、重建霧海方位，依序修復三座觀測台並返航；探索十二份文明碎片與六趟共 23 階段的跨島測風遠征。",
    instructions:
      "WASD／方向鍵移動；Space 起跳與切換展帆；Shift 按住減速下降；E 落地交付；Esc 暫停／返回上一層；C 回正、V 俯瞰。手機使用左搖桿＋展帆／減速。第一步：Space 起航，讀取高度與風向，依序完成八個觀測環後在蘆光庭落地交付。",
    changelog: [
      "專屬 Three.js 3D runtime、骨架飛行員、六座手工配置浮島與三種觀測台",
      "固定時間步長滑翔、三種風場、兩條路徑選擇、能量與失速恢復",
      "三主線各八個操作採樣點：測風校準、星儀運送與霧海定位，安全線與捷徑各有取捨",
      "六趟跨島測風遠征共 23 階段，每段九個不同高度／條件航門與落地交付，無等待或過門補能",
      "安全地面選課，沿既有安全風網接駁至入口；退出明確返回最後安全島並保留已交付階段",
      "十二文明碎片包含島面與空中支線位置提示；主線結果與結局重載後可繼續探索",
      "三模組與可重現風況種子、速度／平穩／探索結算及重玩",
      "v3 安全存檔保存主線樣本與已交付課程階段，舊版紀錄獨立保留；未交付階段重載或失速後重試",
      "原創程序資產來源、GLB 骨架動畫、分離碰撞與音效配方；修復HUD焦點、橫向教學遮擋、載入重試與完成存檔",
      "修正重複平台握手的狀態回報與封包型別驗證；探索進度與評級依內容資料計算",
      "手機橫向保留航線圖與切換鍵，教學使用觸控按鈕名稱；新增唯讀鏡頭觀察資料",
      "修復最小橫向畫面的啟程／續玩按鈕遮擋；短畫面準備表單保留可讀模組說明",
      "觀測台及島嶼前景遮擋角色時局部淡化，解除後恢復材質；保留原始遮擋與處理觀察資料",
      "Escape 在選單、表單與確認視窗依層級返回，保持正確暫停狀態與可見焦點",
      "存檔失敗警告在設定視窗內獨立顯示，短橫向畫面仍可閱讀及操作；成功保存後清除提示",
    ],
    knownIssues: [
      "Android Chrome／iOS Safari 真機觸控與熱機效能尚待驗收；桌面尺寸模擬不代表真機通過",
      "實體耳機與喇叭混音聆聽尚待驗收",
      "新候選版本待獨立檢查操作、節奏、視覺與完整流程；目前不宣稱品質門檻通過",
    ],
    milestones: [
      { id: "prototype", label: "核心玩法能完成一局", status: "done" },
      { id: "slice", label: "完整切片與風場手感", status: "active" },
      { id: "content", label: "1.0 內容與重玩循環", status: "active" },
      { id: "verification", label: "獨立驗收全項 90+", status: "pending" },
    ],
  });
if (
  release.review.buildId !== BUILD.id ||
  release.review.artifactHash !== hash.artifactHash
) {
  release.review.buildId = null;
  release.review.artifactHash = null;
  release.review.producer = null;
  release.review.reviewer = null;
  release.review.reviewedAt = null;
  for (const s of Object.values(release.review.scores)) {
    s.score = null;
    s.evidence = [];
    s.notes = "等待此固定版本的獨立實測";
  }
  release.review.blockers = [];
  for (const t of release.review.testMatrix) {
    t.status = "untested";
    t.evidence = [];
    t.device = "尚未記錄此版本實測裝置";
    t.browser = "尚未記錄此版本實測瀏覽器";
    t.notes = "等待此固定版本的獨立實測";
  }
}
await writeFile(file, JSON.stringify(release, null, 2) + "\n");
await mkdir(
  new URL(
    "../../../docs/game-production/games/aetherwake/builds/",
    import.meta.url,
  ),
  { recursive: true },
);
await writeFile(
  new URL(
    `../../../docs/game-production/games/aetherwake/builds/${BUILD.id}.json`,
    import.meta.url,
  ),
  JSON.stringify({ ...BUILD, ...hash }, null, 2) + "\n",
);
console.log(
  JSON.stringify({
    buildId: BUILD.id,
    artifactHash: hash.artifactHash,
    bytes: hash.files.reduce((n, f) => n + f.bytes, 0),
    files: hash.files.length,
  }),
);
