# Aether delivery-docs.1：最小內容擴充、驗證與回復

本指南只補交付文件，不增加正式遊戲內容。候選身份見根目錄 `DELIVERY.json`；
runtime 仍是 `aetherwake-route-save-20261028-01`，60 檔不變。
閱讀、執行 CPU 檢查或成功建置都不是 GUI、實聽、效能或獨立品質評分。
不要在已凍結候選、正式存檔或正式網站上試改；下面只操作新建的隔離目錄。

## 1. 工具入口與界線

在本來源根目錄執行（不是 `games/aetherwake` 子目錄）：

| 目的 | 真實入口 | 讀寫範圍 |
|---|---|---|
| 目前資產結構 | `node scripts/aether-delivery/verify-assets.mjs` | 只讀；結果輸出 stdout，失敗非零退出 |
| 最小內容示例觀察 | `node scripts/aether-delivery/content-example.mjs baseline` 或 `extended` | 真 simulation/SaveStore/model APIs；只用新 Map 儲存，不接使用者 localStorage |
| 正式 runtime build | `node games/aetherwake/scripts/build.mjs` | 寫該副本 `public/games/aetherwake`；用現有鎖定 esbuild/Three |
| 原始資產重新產出 | `node games/aetherwake/scripts/export-assets.mjs` | 寫資產來源快照、manifest、runtime assets；僅在另一隔離副本按需執行 |

資產結構工具核 53 資產（31 GLB／10 WAV／12 SVG）的 hash/大小、GLTF 可解析幾何、
pilot 骨架/clip、生成器 LOD/碰撞/風場契約及來源快照一致性。
固定數量是本次既有 kit 的驗證契約，不是未來所有內容擴充的通用數量。
它不做 GPU 渲染、瀏覽器操作、耳機/喇叭實聽或實機效能，不產生品質分數。

### 歷史 Windows 環境紀錄未交付

`assets/games/aetherwake/recipes/verify-assets.mjs` 是原私版的歷史驗證配方，
**不包含在本公開來源子集中**（範圍見 `PUBLICATION-SCOPE.md`）。該歷史配方會讀
`generation/environment-before-assets.txt` 與 `environment-after-assets.txt`，
並改寫 `generation/asset-verification.json`；兩份環境 logs 也**不在本公開子集中**；
故不能在本交件宣稱該完整歷史配方可重跑或環境前後比較通過。
不要造空檔、複製同一份假 log、把新環境資料冒充舊資料，也不要用新結果覆寫歷史報告。
請使用上表確實交付的新 `scripts/aether-delivery/verify-assets.mjs`；
其輸出將歷史環境比較明列 `NOT_RUN`，只報當次結構檢查。
若將來取得真正歷史 logs，須另記來源/hash並在隔離副本獨立核實；本輪不聲稱已取得。

## 2. 先核依賴，建立隔離副本

需要 Node.js（本交件作者使用 v24.22.1）、Python 3，以及**已存在、可信且符合
`games/aetherwake/package-lock.json` 的依賴**。Three 固定 0.180.0，esbuild 固定 0.25.11。
本輪不安裝依賴、不下載、不執行 CI。若沒有依賴就停止並記 `BLOCKED_DEPENDENCIES`；
不能宣稱自測已跑。另獲安裝授權時才可用 README 的 `npm ci --prefix ...`。

以下在 bash 執行；把 `AETHER_DEPS` 換成已存在的真絕對路徑（不是下面的示意文字）。
只將該路徑用於解析現有模組，不會寫入它；`node_modules` 不屬交付來源或 ZIP。

```bash
set -euo pipefail
SOURCE="$PWD"  # 必須是本來源根目錄，有 DELIVERY.json
export AETHER_DEPS=/absolute/path/to/already-installed/games/aetherwake/node_modules
WORK=$(mktemp -d /tmp/aether-content-example.XXXXXX)
export SOURCE WORK
python3 - <<'PY'
import hashlib,json,os,pathlib,shutil
s=pathlib.Path(os.environ['SOURCE']).resolve()
w=pathlib.Path(os.environ['WORK']).resolve()
d=pathlib.Path(os.environ['AETHER_DEPS']).resolve(strict=True)
assert json.loads((s/'DELIVERY.json').read_text())['candidateId']=='aetherwake-public-source-docfix.1-20261029'
for package,version in [('three','0.180.0'),('esbuild','0.25.11')]:
    assert json.loads((d/package/'package.json').read_text())['version']==version
def rows(root):
    return {p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(root.rglob('*')) if p.is_file() and 'node_modules' not in p.relative_to(root).parts}
(w/'before.json').write_text(json.dumps(rows(s),sort_keys=True))
shutil.copytree(s,w/'source',ignore=shutil.ignore_patterns('node_modules'))
(w/'source/games/aetherwake/node_modules').symlink_to(d,target_is_directory=True)
shutil.copyfile(s/'games/aetherwake/src/world.js',w/'world.js.before')
print('WORKSHOP',w/'source')
PY
cd "$WORK/source"
node scripts/aether-delivery/verify-assets.mjs > "$WORK/assets-current.json"
node scripts/aether-delivery/content-example.mjs baseline > "$WORK/baseline.json"
```

預期：資產工具 `PASS_SCOPED_ASSET_STRUCTURE`、歷史環境 `NOT_RUN`；baseline 為 12 relics、
`collected:false`、`persisted:false`。任何 assert 或非零退出都先停止，保留 log，不跳過再報 PASS。

## 3. 一項資料擴充：營地步行可拾取的航信

只改副本 `games/aetherwake/src/world.js`：在 `const challenges = createChallenges(islands);`
**之前**，在既有 `relics` 建好後新增一筆。以下命令會拒絕重複執行／找不到唯一錨點：

```bash
python3 - <<'PY'
from pathlib import Path
p=Path('games/aetherwake/src/world.js'); s=p.read_text()
anchor='const challenges = createChallenges(islands);'
assert s.count(anchor)==1 and 'relic-docs-example' not in s
addition="relics.push({ id: 'relic-docs-example', islandId: 'island-camp', name: '示例航信', text: '只存在於隔離練習。', hint: '從營地向東步行五公尺。', x: 5, y: 1.4, z: 0, radius: 1.2, icon: './assets/icons/relic-01.svg' });\n"
p.write_text(s.replace(anchor,addition+anchor))
PY
node scripts/aether-delivery/content-example.mjs extended > "$WORK/extended.json"
node games/aetherwake/scripts/build.mjs > "$WORK/extended-build.log" 2>&1
python3 - <<'PY'
import hashlib,json,os,pathlib
root=pathlib.Path('.'); before=json.loads((pathlib.Path(os.environ['WORK'])/'before.json').read_text())
after={p.as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(root.rglob('*'))
       if p.is_file() and 'node_modules' not in p.parts}
changed=sorted(k for k in before.keys()|after.keys() if before.get(k)!=after.get(k))
assert changed==['games/aetherwake/src/world.js','public/games/aetherwake/game.js'],changed
print('ONLY',changed)
PY
```

### 欄位、ID、圖示與保存契約

- `id`：穩定唯一字串；不要重用或改名既有 ID。正式更動已發布 ID 需要明確 migration，
  此練習只新增測試 ID，不寫正式存檔。
- `islandId`：既有 `WORLD.islands` 的 ID；此例 `island-camp`，從新局正常入口可到達。
- `name/text/hint`：日誌的名稱、內容、未發現時提示；內容不應需要作者口頭提示。
- `x/y/z`：**已轉換後的世界公尺**，+Y 向上；不要再乘 `MAP_SCALE`。此例 (5,1.4,0)
  在營地島面內。`radius:1.2` 是拾取水平半徑，規則另要求垂直差 <4；不是模型尺寸。
- `icon`：新 ID 沒有自動產出的同名 SVG；明確重用已交付 `./assets/icons/relic-01.svg`。
  缺 `icon` 時 main 的日誌會用 `./assets/icons/<id>.svg`，若檔不存在會破圖。
  新美術需正式來源/授權/manifest/export，不要造一個路徑就稱資產完成。
- 模型：scene 通用迴圈用 `createRelic(index)` 並放在 `(x,y+1.2,z)`，不用重寫 main。
  新例沿用原生成器，`models.js`、`simulation.js`、`storage.js`、`scene.js` 均不用改。
- 收集：`FlightSimulation.step` 正常碰到範圍才發 `relic` 和 `save` 事件；已收 ID 不重發。
- 保存：schema 3 的 `validateSave` 從 `WORLD.relics` 建合法 ID 集，新增項自然可保存。
  移除內容後該 ID 會被過濾；**不能將這種練習回復當成正式玩家進度 migration**。
  保留原玩家資料，不把示例存檔帶進正式遊戲。
- UI 總數/探索評級讀 `WORLD.relics.length`，練習會變13，不要硬改原12內容要求。
  此例不改既有主線、站點、路段PB或結局文字；正式新增仍需另做內容/視覺評估。

預期 extended：13 relics、正常向東 30×1/60 秒步行到 x≈5，自然收集一次；
停留30步不重發；真 SaveStore 以新 Map adapter 寫入/新實例讀回後保留 ID；
生成器建立有限且正的三維 bounds。工具不瞬移、不注入 relic/完成旗標、不接瀏覽器。
build 必須成功且相較練習前只有 `world.js` 和 `game.js` 改變；若有其他差異先查明。
這是 CPU/建置證據，**不是**可見、可達、真儲存或鍵鼠 GUI 驗收。

## 4. 回復與逐檔證明

回復只覆寫這個新建的練習副本，原來源完全保留；不刪除任何資料或練習 log。

```bash
cp "$WORK/world.js.before" games/aetherwake/src/world.js
node games/aetherwake/scripts/build.mjs > "$WORK/restored-build.log" 2>&1
node scripts/aether-delivery/content-example.mjs baseline > "$WORK/restored.json"
python3 - <<'PY'
import hashlib,json,os,pathlib
w=pathlib.Path(os.environ['WORK']); before=json.loads((w/'before.json').read_text())
def rows(root):
    return {p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(root.rglob('*')) if p.is_file() and 'node_modules' not in p.relative_to(root).parts}
assert rows(w/'source')==before,'Restored copy differs'
assert rows(pathlib.Path(os.environ['SOURCE']))==before,'Original source changed'
print('RESTORED_EXACT',len(before),'source files; original unchanged')
PY
```

若中途失敗，先記命令、退出碼、log；可直接從本節回復，保留副本供查核。
不要為了通過改預期 hash、刪 failing log、造舊環境紀錄或放寬原需求。

## 5. 重建、交件與未測事項

資產變更才按需執行官方 export 並解釋 manifest 差異；本內容示例重用圖示/模型，
不需重產資產。遊戲實碼或資產若正式改動，必須新候選與對應受影響檢查；
本 docs.1 只有 README、本指南、兩個 delivery helper、DELIVERY 身份文件改動，
保留 route.1 source/runtime/舊包，未重跑已完成73/8遊戲回歸。

必要桌面 GUI／生命週期／瀏覽器save-recovery、實聽、GPU效能及其他九維仍未完成；
mobile-touch 未測依核准 v1.0 屬非阻擋限制，不冒稱行動端通過。
新交件十維先留 null，由非作者按固定 rubric 複評，不能把舊86或歷史技術PASS當新分數。
完整產品 source Git commit、同候選可訪 URL 尚未交付；這份來源不授權發布、安裝、CI或本地操作。
route.1 已知限制不變：舊資料已被0覆寫的PB無法從不存在的歷史找回；本修正不刪舊資料。
