# stteak — 八款瀏覽器遊戲原始碼

八款開發中的原創遊戲工程：Aetherwake、Dust Redemption、Hollow Crown、Moss & Moon、Neon Drift、Orbit / Fall、Signal Zero、Tidebound。

**原始碼公開不代表遊戲完成。整體遊戲品質驗收目前為 0/8。** 本 repo 的建置與可攜單元測試不能代替完整實機操作、音訊聆聽、GPU／效能、行動裝置或無障礙驗收。既有問題與開發中體驗可能仍然存在。

## 快速開始

需要 Node.js 22.12+ 與 npm。使用 HTTP 伺服器，不要直接以 `file://` 開啟遊戲。

```sh
npm ci
npm run setup
npm run build
npm test
npm run dev
```

開啟 `http://127.0.0.1:4173`。`setup` 依每款既有 `package-lock.json` 從官方 npm registry 安裝，並使用 `--ignore-scripts` 停用依賴的安裝腳本；不下載 Playwright 瀏覽器。`build` 依序執行各款原有 package 的建置命令，最後把最小入口與遊戲 runtime 複製到 `dist/`。**沒有任何自動部署、GitHub push 或登入流程。**

若只想檢查一款：

```sh
node scripts/public.mjs setup neon-drift
node scripts/public.mjs build neon-drift
node scripts/public.mjs test neon-drift
npm run bundle
```

`npm run bundle` 只封裝現有 runtime，不重建遊戲。`npm run dev` 只服務 `dist/`、只綁定本機 loopback，沒有帳號服務或資料收集。

## 原始碼與重建入口

| 遊戲 ID | 可編輯遊戲邏輯 | 官方建置入口 |
|---|---|---|
| `aetherwake` | `games/aetherwake/src/` | `npm run build --prefix games/aetherwake` |
| `dust-redemption` | `games/dust-redemption/*.js` 與 `public/games/dust-redemption/*.js` | `npm run build --prefix games/dust-redemption` |
| `hollow-crown` | `public/games/hollow-crown/` | `npm run build --prefix games/hollow-crown` |
| `moss-and-moon` | `public/games/moss-and-moon/` | `npm run build --prefix games/moss-and-moon` |
| `neon-drift` | `games/neon-drift/src/` | `npm run build --prefix games/neon-drift` |
| `orbit-fall` | `public/games/orbit-fall/`、`games/orbit-fall/` | `npm run build --prefix games/orbit-fall` |
| `signal-zero` | `games/signal-zero/src/` | `npm run build --prefix games/signal-zero` |
| `tidebound` | `games/tidebound/src/` | `npm run build --prefix games/tidebound` |

部分遊戲直接維護 ES modules；另三款使用 esbuild bundle。`public/games/` 同時保留可運行版本與必要模型／音訊，因此不是可以整個刪掉的重複 dist。`dist/`、`node_modules/`、私人 QA 報告、影片、截圖與帳號資料不屬於發布內容。

## 程序資產重建

先執行對應遊戲的 `setup`。以下配方是原工程提供的建置入口；重建會更新**這個 checkout** 的資產與 manifest。GLB、骨架、碰撞與真正 3D 幾何不由平面圖片替代。

| 遊戲 | 模型／音訊配方 |
|---|---|
| Aetherwake | `npm run assets --prefix games/aetherwake` |
| Dust Redemption | `node assets/games/dust-redemption/recipes/build-frontier-kit.mjs`；`node assets/games/dust-redemption/audio/generate.mjs` |
| Hollow Crown | 遊戲 `build` 已呼叫模型、材質與音訊配方 |
| Moss & Moon | `npm run assets --prefix games/moss-and-moon`；`node games/moss-and-moon/export-audio.mjs` |
| Neon Drift | 遊戲 `build` 已呼叫模型與音訊配方 |
| Orbit / Fall | `node assets/games/orbit-fall/recipes/build-assets.mjs`；`node assets/games/orbit-fall/recipes/build-audio.mjs` |
| Signal Zero | `node assets/games/signal-zero/recipes/export-assets.mjs`；`node assets/games/signal-zero/recipes/export-audio.mjs` |
| Tidebound | `npm run assets --prefix games/tidebound`；`node games/tidebound/generate-audio.mjs` |

資產來源、用途與既有權利說明保留在 `assets/games/<id>/` 的 manifest／generation 文件。本文不宣稱隨機識別碼、工具版本或跨平台匯出必然得到逐位元相同的 GLB；每次產物都應重新驗證。

## 公開版與內部驗收分離

這是獨立公開建置流程，不包含原平台登入預覽、內部交辦文件、私人 evidence 或舊評分 UI。可攜測試是經選取的來源邏輯／存檔／物理／資產測試，**不是整套歷史 QA**。保留的模型測試不等於真實玩家通關或畫面／聲音驗收。

在 2026-10-27 的既有公開基準中，Orbit / Fall 保留 Rapier 原始 JS、WASM、Apache 授權與精確 patch 配方，並另加顯著修改標示，因此當時公開檔案的完整 SHA256 與沒有這段標示的歷史 runtime 不同。這是歷史來源與授權說明，不是目前 Orbit 全部程式差異的稽核結論。

## 本次公開建置身分與限制

- 本次僅核對 commit `3ccce575416ed394f6e6ac9ce1bc998c6c34683c` 的 Neon、Signal、Tide 三款當前 runtime 身分；不是八款現況的完整稽核。
- 2026-10-28 已公開 Neon `neon-drift-tutorial-progress-0015` 的教學進度顯示、Signal `signal-zero-cloud-input-20261028-01` 的實體鍵／觸控持有修正，以及 Tide `tidebound-cloud-helm-20261028-01` 的單指舵盤持有修正。三款在上述 commit 的完整 runtime 檔案集合與 GitHub 對應 blob 均已核對；沒有把 source／CPU 審查或發布成功當作 GUI、真機或整款品質驗收。
- Aether、Dust、Hollow Crown、Moss、Orbit 的五個既有紀錄保留為 2026-10-27 歷史 metadata，本次未重核，也未整併後續修正；不能據此認定它們仍與基準相同、或代表目前 main 的 build／hash。
- Aetherwake 的既有基準說明（2026-10-27）：公開 source 使用 `aetherwake-open-source-20261027`、`development` 身分，當時 `game.js`／窄螢幕 toast 樣式與 frozen 0008 不同，未獨立驗收；該公開版本沒有修改原正式 Site 的 frozen 0008。此處保留歷史區分，不代表本次重核了目前 Aether 的全部身分。
- Orbit 的既有基準說明（2026-10-27）：當時公開 distribution 的 Rapier 顯著修改標示產生獨立 runtime hash；歷史 engine build label 不等於該 distribution 的位元身分。這不是目前 Orbit 的完整差異清單，不表示後續版本只有 notice 變動。
- 本次已核三款的 build、runtime hash、發布 commit 與差異範圍見 `release-status.json`；`identityAuditCoverage` 明列當前已核與未重核的歷史紀錄。`checks` 保留 2026-10-27 初次公開稽核的歷史結果，並非更新後八款總測試的重跑結果。沒有把未通過項目填成分數或以開源取代驗收。
- Signal Zero 的音訊匯出配方原本固定使用 Microsoft Edge；公開版改為 Playwright Chromium，可用 `STTEAK_CHROMIUM_PATH` 明確指定已安裝的受信任 Chromium。配方需要瀏覽器；一般 `setup` 不下載它。本次雲端因 sandbox 禁止瀏覽器本機 socket，**此音訊配方未重新執行成功**；保留的原合成 WAV 與原授權／雜湊已逐檔核對，並非本次新生成音訊。
- 如需自行重建 Signal 音訊，可在允許啟動瀏覽器的環境先於 `games/signal-zero` 執行 `npx --no-install playwright install chromium`，再執行表中配方；下載瀏覽器是明確的額外步驟，不會在 `setup` 背景執行。

## 授權

自有原創程式碼採 **MIT，Copyright (c) 2026 gent a**。第三方引擎、其 bundle 片段及既有素材條款不被重新授權。

- [授權範圍](LICENSE-SCOPE.md)
- [第三方 notices](THIRD_PARTY_NOTICES.md)
- [素材既有條款與來源](ASSET-LICENSES.md)

請勿在 issue、存檔或測試資料中放入真實密碼、帳號、私人雲端連結或其他人的個人資料。
