# Standalone retained-source 建置契約

本子集82runtime中81檔保留原0016 bytes，Rapier衍生檔只增加修改通知；原模型、音訊與上游vendor輸入保留，不是完整上層網站工程。原始可編輯源及產物的純檔案映射在 `source-provenance.json`；本子集的當前雜湊在 `PUBLIC-SOURCE-MANIFEST.json`。

## 來源與產物

- 16個直接作者源位於 `public/games/orbit-fall/`：main、settings、rules、bridge、marker-layout、style、index、measurement、player-backup、player-backup-ui、storage、bootstrap、content、scene、physics、.gitattributes；不經bundler。
- 66個generated runtime由保留工程產生。`games/orbit-fall/build.mjs` 產出vendors與optics/hazards；`assets/games/orbit-fall/recipes/build-assets.mjs` 產出模型、colliders、catalog及models；`build-audio.mjs` 產出WAV、audio與catalog。
- 模型編輯 `assets/games/orbit-fall/sources/models-source.js`；音訊引擎編輯同目錄 `audio-source.js`；音符/合成編輯 `sound-synthesis.mjs`，勿只改下次build會覆寫的產物。
- public-source.2的82runtime aggregate：`5d57fe403cef9d3d8ebb6ac910f45d95dfebd8e7b81cc28dd011d630274383d3`（原docs2為`a7e60751b899f93ddcd90e11631d070d38642bebf0af780bab0b9ad4781e57d9`，兩者不可混用）。main SHA256：`743cc6a0d68fb1de56107e3a944a87c3c888a0ecf99ed020271478836867ed67`。

## 依賴

`games/orbit-fall/package.json`及`package-lock.json`原樣保留：Three0.180.0、Rapier0.19.0。`dependencies/three-0.180.0.tgz`完整SHA512須符合lock integrity。離線helper拒絕已有node_modules、unsafe tar paths、symlink/hardlink與重複member。

Rapier僅保留此build需要的原mjs/WASM/license及固定patch；完整npm tarball未提供。helper只準備build所讀的精確mjs，不是完整npm ci。原package/lock保留不是聲稱已做完整npm重裝。本子集沒有網路安裝步驟。

## 只在新副本重建

需要Python3標準庫與Node；原交付使用Node v24.22.1。以下是可執行的教學，不是本公開裁剪已重新執行的結果：

```sh
python tools/verify-delivery.py
python tools/clean-rebuild.py /absolute/new/nonexistent-orbit-copy
```

目的路徑必須不存在，且不能在來源內。helper只在新副本刪除66個generated outputs，依序執行離線依賴、既有vendor build（其patch函式輸出已帶修改通知）、模型/音訊配方，再對本.2 manifest逐byte核全部82runtime。不要在原交付內操作，不要將node_modules或重建回執列入公開來源。

手動命令亦須在新副本執行：

```sh
python tools/prepare-offline-dependencies.py
node games/orbit-fall/build.mjs
node assets/games/orbit-fall/recipes/build-assets.mjs
node assets/games/orbit-fall/recipes/build-audio.mjs
python tools/verify-delivery.py
```

雜湊不符就停止，保留差異；不可修改manifest冒充同版。Rapierguard不可放寬。擴充失敗只還原試驗副本，再重核82runtime；此包不提供或宣稱部署rollback。

## 公開驗證recipe的裁剪

`verify-assets.mjs`只裁去讀取私人歷史環境快照的三行與該成功欄位，改以`persistentEnvironmentCheck: NOT_INCLUDED_PUBLIC_SUBSET`明示缺項；資產與模型檢查原邏輯保留。這是衍生版本，不是原recipe相同hash，也未在本輪執行。原build-assets/build-audio與build.mjs不變；rapier-init-patch.mjs新增通知常數、保留原wrapper輸出guard，再核含通知的新輸出hash。歷史驗證結果未隨包發布，不能把腳本存在當成已通過。
