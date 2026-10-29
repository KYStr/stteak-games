# Dust Redemption：f06 公開來源候選快照

本 .2 僅修正內容擴充指南對預期 diff 退出碼1的處理與故意失敗探針的操作說明；產品、原始素材、runtime與測試輸入不變。這是新文件交付身份，不沿用任何舊品質分。

來源識別：`f06-public-source.2-20261029`。這是可獨立閱讀的來源子集，不是新遊戲版本、發布公告、功能測試報告或品質分數。打包不改既有產品位元組；尚未以本快照發布任何 URL。

## 內容與使用順序

1. [目前 runtime 與建置契約](docs/CURRENT-RUNTIME-CONTRACT.md)：30 authored、61 runtime、8 個官方測試及根 package，共 100 個產品檔案原樣保留。
2. [素材來源與授權](docs/ASSET-PROVENANCE.md)：8 個原始 recipe／來源檔、18 個輸出及精確歷史 commit。沒有逆造素材原始檔。
3. [新增一則結局段落](docs/CONTENT-EXTENSION-GUIDE.md)：可照做的資料擴充／還原流程，附既有 CPU main 探針及合成遊戲 fixture。
4. [授權範圍](LICENSE-SCOPE.md)、[媒體條款](ASSET-LICENSES.md)、[第三方說明](THIRD_PARTY_NOTICES.md)。

從本目錄執行以下命令，僅讀取檔案並核對 SHA256／Git blob，不安裝、不建置、不重生、不執行遊戲：

```sh
python3 tools/verify-public-source.py
```

工具檢查 111 個保留檔（100 產品 + 8 素材來源 + 3 探針輸入）、8 份固定來源、18 份輸出與 61 檔 runtime 清單。這不是密碼學簽章、歷史權利裁定或功能通過證明。完整快照的封件雜湊由交付者另行提供。

根 `package.json` 只提供 ES module 語義；真正依賴與 lock 在 `games/dust-redemption/`。`private: true` 是 npm 禁止誤發布設定，不表示包含私人資料。未附 node_modules、瀏覽器、安裝快取或平台帳號。既有 runtime 的平台相對引用沒有為新位置改寫；這不是自足的新 host／origin，實際整合仍須另驗。

## 精確保留與工具差異

`provenance/preserved-files.json` 記錄每個保留檔的 bytes、SHA256、Git blob；`asset-sources.json` 以不可變原始 commit 固定來源；`runtime-assets.json` 只描述輸出與 recipe 的映射；`runtime-manifest.json` 保留完整 f06 runtime 的原始逐檔清單。

公開 bytes-only 工具取代依賴舊交付報告的素材自測 helper：只保留雜湊核對概念，移除重生、依賴連結及報告讀寫。舊自動擴充 helper 不在本快照；改用指南與原樣保留的 `extension-probe.mjs`。不得把工具存在或這次封件當作已執行擴充／資產重生。

原模型資料仍引用未取得的 `verify-frontier-poses.mjs` 與 `pose-verification.json`；缺口明列，不提供假造替代歷史證據。
