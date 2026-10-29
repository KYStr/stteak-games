# 目前 runtime 契約及文件勘誤

本快照保留原 f06 程式與 runtime 位元組，沒有變更產品：
- BUILD：`dust-redemption-cloud-result-save-20261028-01`。
- source/runtime `game.js` SHA256：`f06ac0a4af9334ee5ba4264c2623fe00f564c2d30103d7765185b80fc5827639`。
- 61 檔 runtime 原聚合識別：`6403e3bff7c0753671e2bcc0f1c0da4d9db89b12dfcc748ed53ec73bdb660554`。逐檔身份另見 `provenance/runtime-manifest.json`；勿將不同聚合算法當成產品改動。

## 過時註解不是功能開關

`games/dust-redemption/expansion-content.js` 開頭的 future-only／outside frozen runtime 註解已過時；runtime 鏡像保留相同舊文字以保持原位元組。實際上：
- `build.mjs` 會複製此模組；
- `game.js`、`field-system.js` 匯入其資料／helper，rules／storage 使用 supplies 驗證；
- `fieldwork-authoring-1` 是資料識別，不代表模組未納入；
- `validSupplies` 的 next-build 註解也是舊排程文字。應以真實 import／call site 為準。

## 建置不是完整產生器

30 個 game-local authored 檔含 package、lock 與 builder。builder 複製 27 個 authored 模組及 6 個 vendor／license 檔到 runtime，共 33 檔；其餘 28 個 direct ESM／static／asset 檔須已存在。完整 runtime 共 61 檔，不可只複製 authored 目錄就聲稱能重建整包。

`public/games/dust-redemption/content.js` 是直接 runtime 輸入，沒有另一份 authored `games/dust-redemption/content.js`。一般 copy-build 不產生／覆寫它，也不執行素材 recipes。

相對目錄保留原工作樹形狀。依賴位於 `games/dust-redemption/node_modules`，版本以 lock 為準。僅在可丟棄副本備妥匹配依賴後，才可另行執行 `node games/dust-redemption/build.mjs`；本來源準備沒有執行建置或安裝。

## 探針界線

`tests/captured-dom-harness.mjs` SHA256 `b780f19b8766c7f66fe31f270061851666a3818464a3b011e585443817976214`；
`tests/earned-after-dawn-pact.json` SHA256 `0fde17aa511471d40144f5917c3722ad16472f0e9227fcb26d32c4baa757b6c3`。
兩者及中文註解的 extension probe 原樣保留。fixture 是既有 CPU 流程得到的虛構遊戲資料（六任務、wallet 730、common_dawn），不是帳號／真人存檔，也不是這次新通關證明。

探針使用真 main／rules／storage／content，但 DOM、World／terrain／renderer、bridge、audio 由 CPU 替身提供。它不能證明真實畫面、自然移動／戰鬥、音效、裝置效能、瀏覽器／host 整合。runtime 的 replay 說明仍在既有 .banner 插入位置，沒有聲稱改善呈現。

這次只核來源子集與位元組；沒有重新執行功能、擴充實驗或原有整套測試，也不繼承任何原交付品質分數。
