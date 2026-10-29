# Tidebound public-guide.2：可攜、只改丟棄副本的浮標練習

指南身份：`tidebound-public-guide.2-20261029`。產品仍是 `tidebound-cloud-input-lifecycle-20261028-01`。
這份指南不是原私有 delivery-docs.1 整包或其品質分數；新公開子集須另有身份及獨立驗收。
本指南只處理可攜操作與來源保護，不表示已發布、GUI 通過或可以就地改正式來源。

## 1. 先認來源，不猜電腦路徑

必須由你明確選定三個**已存在**的位置：

| CLI 參數 | 要求 |
| --- | --- |
| `--source-root` | 唯讀來源包根；下面必須有 `source/` 與 `evidence/original-source-manifest.json`。可在任何已授權的雲端路徑，不必與指南同目錄。 |
| `--deps` | 已存在的 Tide `node_modules`，Three `0.180.0`、esbuild `0.25.10`；不是 Neon 的版本。本指南不安裝、不下載。 |
| `--scratch-parent` | 已存在、可丟棄的私人父目錄，不能位於來源包、指南包或依賴內；**其 realpath 不得含需 URL 編碼的字元**（例如空白、中文、`%`、`#`）。helper 只在其中原子新建 `tide-public-guide-*`，永不接受既有 WORK。 |

目前支援有 Node.js 與 `mktemp` 的 Linux 雲端環境；本次以 Node 24 驗證。未驗 Windows，不把命令當 Windows 指南。
來源 manifest 固定 SHA256：
`f5615ffcaf88e3834b62ae1e544c045fd35286aa6ace82c201aa04653b59c477`。
對應原 108 檔 source；world.js 為
`4ab3a7218ae750dea04022d49f6d9e051413cdd10106c6923dfc01e31df618fe`。
請勿改固定 hash 來讓另一版本通過：改產品後應另交新指南／候選。

**原官方 build 的既有路徑限制：** `build.mjs` 使用 URL.pathname 作為 esbuild 路徑，工作目錄含需 URL 編碼的字元時無法解析 entry；本指南未修改它。新 helper 在任何寫入前檢查 scratch 的 canonical 路徑，避免做到一半才失敗。來源、指南及依賴的位置仍可含中文／空白；scratch 的別名也可以，只要 realpath 是不需編碼的路徑。這不是 Windows 支援或全路徑可用的宣稱。

### 保護不是刪掉舊絕對路徑而已

本修訂以 realpath 比對 Node 的真正入口與模組自身，指南目錄的 symlink 別名也必須進入同一嚴格參數檢查。只被其他主模組 import 時不執行指南；沒有主檔名時也不啟動。入口路徑不存在、別名損壞或解析失敗會明示非零錯誤，不當成空白成功。來源／依賴／工作區的原保護條件不變。

入口 [tools/tide-guide.mjs](tools/tide-guide.mjs) 先對所有根目錄做 realpath，解開相對 `..`、尾斜線及符號連結別名；以相對路徑關係判斷，不誤把同名前綴兄弟當子目錄。
來源清單固定且逐檔 SHA/大小/檔案集合相同，來源子目錄連結／特殊檔拒絕；既有 `games/tidebound/node_modules` 不屬 108 檔，忽略而不修改。
每一份練習都由 helper 自己 `mkdtemp` 建立私人 0700 目錄，以 `wx` 新建每個副本檔，不用硬連結；新副本與來源、指南、依賴不得重疊。
手寫或官方 build 前再核目標 realpath、regular file、單一 hard-link 及 source/target inode 不同。依賴複製時解參照，不把指向來源的連結留在工作區。
沒有 `--work`、強制覆寫、就地 `add/restore` 或自訂 manifest hash 開關；未知／重複參數均失敗。

這是避免誤操作的單使用者工程保護，**不是對惡意同使用者並行換檔或不可信依賴執行碼的 OS sandbox**。來源、依賴及一次性父目錄須是你有權使用、受信任且執行中無其他人修改的檔案；不要用此指南執行不可信來源。

## 2. 一次照做（先只讀預檢，再明示執行）

在含有 `docs/` 的指南根目錄執行。先把 `SOURCE_ROOT` 與 `DEPS` 改成你已確認的來源／依賴位置；兩者可用相對路徑、空白或中文名稱。不要照抄不存在的示意名稱，也不要指向玩家存檔。

```bash
GUIDE_ROOT="$PWD"
SOURCE_ROOT="../tide-source-subset"
DEPS="../existing-tide-node_modules"
SCRATCH_PARENT="$(mktemp -d)"
node "$GUIDE_ROOT/docs/tools/tide-guide.mjs" \
  --source-root "$SOURCE_ROOT" --deps "$DEPS" \
  --scratch-parent "$SCRATCH_PARENT" --check-only
node "$GUIDE_ROOT/docs/tools/tide-guide.mjs" \
  --source-root "$SOURCE_ROOT" --deps "$DEPS" \
  --scratch-parent "$SCRATCH_PARENT" --run
```

`--check-only` 的 helper 本身不寫檔，預期回 `sourceFiles:108, writes:0`。上面的 `mktemp` 由你明示建立空父目錄，與 helper 預檢的零寫入聲明分開。若 `TMPDIR` 令此父目錄落在需編碼的 realpath，預檢會停止；請另選受信任、已存在且不需 URL 編碼的丟棄父目錄，不修改產品 build 去遷就路徑。
兩種模式必須恰選一個；預檢失敗時不要繼續 `--run`。請逐條執行或由 shell 的 `set -e` 保證失敗即停。
成功的 run 回傳實際新建的 `base` 路徑與 `restoredExact:true`、`originalSourceUnchanged:true`、`normalInputRuns:1`、`qualityScore:null`。
stderr 會先印一次性工作區路徑；若後續失敗，保留那個現場，**不會回寫來源或自動刪檔**。

### 入口依序做什麼

1. 固定 manifest 身份 → 108 檔來源 hash／集合 → 依賴版本 → 路徑保護，全通過才開始寫入。
2. 新建 `base/work` 與 `base/evidence`，逐byte複製 108 檔、複製現成依賴；來源不動。
3. 在副本 `games/tidebound/src/world.js` 的 `export const OBSERVATIONS = [` 後新增**只有下面這一列**：

   ```js
     { id: 'docs-demo-buoy', name: '擴充教學浮標', x: -12, z: 108, note: '只供隔離擴充練習；不加入正式交件。' },
   ```

4. 執行 [tools/buoy-observer.mjs](tools/buoy-observer.mjs) 的一次新增後正常規則輸入，驗證 17 筆、取得新貨物且重複互動不重取。
5. 在副本 `games/tidebound` 執行 `node build.mjs`（與 package 的官方 build script 同命令），要求只有 `world.js` 與產出的 `public/games/tidebound/game.js` 不同。
6. 確認範例列完全符合預期才移除，執行同一官方 build；108 檔須逐位元回復，原來源也再次 hash 核同。

正常完成不必手動清理；`base/evidence` 留 `baseline-tree.json`、`extended-observation.json`、兩份 build log、`extended-tree.json`、`restored-tree.json`、`RESULT.json`。每次都是新目錄，永不覆寫前次證據。
官方 build 只重建 JS/HTML/CSS/license。73 個 static 素材已在原 source slice；本練習不產生 33 模型／7 WAV，也不跑產品完整 suite、GUI、CI、伺服器或發布。

## 3. 資料結構與選址：一般內容維護者需要知道的事

- `id` 必須唯一且穩定；使用小寫 ASCII slug `[a-z0-9-]+`，不要改已有 ID。`name`／`note` 使用非空純文字。
- `x,z` 是水平公尺座標，Y 向上，船 heading 0 朝 -Z；數字須有限且在 WORLD_BOUND 260 內，船實際被限制 ±255，選址應留餘裕。
- 避免浮標互相重疊、島礁／危險水域及碼頭 13 公尺 E 靠岸優先區。範例 `(-12,108)` 已配 seed 1 的下列正常路線；任意新座標不能套用其預期終點。
- `scene.js` 由 `OBSERVATIONS.map` 複製 `createSurveyBuoy()`；x/z 用資料、Y 隨海面與波動，不必新增 GLB 或改主迴圈。
  原碼設定非潛水時距離 <180 公尺顯示模型，未取樣且 <55 公尺顯示環；這裡是原碼連接說明，不是畫面實測。
- `main.js` 的地圖／觀測卡由同一資料驅動，卡片候選範圍 45 公尺。
  `rules.interact` 優先 13 公尺內靠岸，否則找 9 公尺內浮標；取樣要求 sailing、速度 ≤1.4、貨艙有空間、本航次尚未採過。
- 樣本身份 `observation:<id>`，占 1 格普通貨艙、返港值 3 印記；不是新物種、委託、主線門檻或潛水點。那些擴充另需對應規格與驗證。

## 4. 一次正常輸入與存檔界線

純觀察器保持原已評範例的規則核心，不呼叫強制指定 ID 採集、不寫船座標或任務進度：
`createState(1)` → `depart` → 60 Hz 的 30 秒 step：W 語意 `{sailDelta:1}` 2 秒、放開 `{}` 8 秒、空白鍵語意 `{brake:true}` 20 秒，再 `interact` 兩次。
預期 x≈-12、z≈108.218537、速度≤1.4，距範例<9；只有第一次得到 `observation:docs-demo-buoy`。
這是 `main.js input()` 的同語意值，不是實際鍵盤事件／GUI 證據。

`serialize` 使用 schemaVersion 1；`restore` 以目前 OBSERVATIONS 清理貨物／harvested／skipped ID。
航行中 restore 回安全港且扣 `ceil(cargo.length/2)` 普通貨物，所以此例單件貨物歸零、同表 harvested 仍保留；不能誤判成新 ID 無法存檔。
刪除或改名 ID 會被 allowlist 過濾，沒有自動遷移／補償。本次可攜操作只重做新增後的一次路線及同表中斷斷言；未重跑原三階段 route 或全存檔矩陣，不宣稱完整相容性。

## 5. 停止、回復與真正發布

任一非零 exit 立即停止；未知內容變化、連結或錯誤 manifest 不能用 force 繞過。失敗時不把改到一半的副本當成功回復；保留輸出、交維護者查原因，或自行另建全新丟棄區重做。不要手動向正式來源執行 `restore`。
正常成功時 helper 已把工作副本還原成原 108 檔，來源和原 runtime 從未被寫入。
若將來真的新增正式浮標，必須在另有授權的新產品候選實作、更新身份／manifest，做受影響檢查與非作者驗收；此教學不提供覆寫凍結源或發布權限。
