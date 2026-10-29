# Hollow Crown — input.3 單款來源交付

這個目錄包含可編輯遊戲程式、既有 runtime、程序資產配方、依賴鎖檔、可攜測試與授權資料。Runtime build 是 `hollow-crown-input-20261028-03`，版本 `1.0.0-rc.10-render.4-input.3`。

公開準備 subset：`input3-delivery-docs1-public-source.1-20261029`。整理來源不等於產品驗收通過，也不沿用其他封包的品質分數。此目錄沒有私人 QA 報告、工作看板、聊天、雲端收據、環境指紋或其他七款遊戲。尚未聲稱此 subset 有公開 source commit。

## 從這個交付目錄操作

需要 Node.js 22.12+ 與 npm。以下是供維護者使用的命令；這次整理未安裝依賴、重建、生成素材或執行遊戲套件。

```sh
npm run setup
npm run build
npm test
```

- `setup` 只按 [Crown 鎖檔](games/hollow-crown/package-lock.json) 安裝本款依賴，使用官方 npm registry 與 `--ignore-scripts`，不下載瀏覽器。
- `build` 執行 [原 build.mjs](games/hollow-crown/build.mjs)：複製 Three.js 0.180.0 及完整授權，然後重建 GLB／貼圖／音訊和素材 manifest。這會修改此工作副本的產物，請先保留自己的備份或版本紀錄。
- `test` 執行 [tests/games/hollow-crown](tests/games/hollow-crown/) 的可攜 Node 測試，不代表原生輸入、圖像、聲音、GPU或完整遊玩已驗證。沒有隨包私人測試報告；歷史 maker 驗證腳本也不屬於此 subset。

若只要讀取已帶入的 runtime，不需先重建。用你已安裝的靜態 HTTP 工具只服務 `public/games/hollow-crown/`；不要使用 `file://`。例如有 Python 3 的本機環境可自行使用：

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public/games/hollow-crown
```

開啟 `http://127.0.0.1:4173/`。此命令只是可選操作說明，本次準備沒有啟動伺服器或瀏覽器，也沒有任何自動部署、push、CI或登入流程。

## 修改位置與驗證順序

1. 玩法資料在 [content.js](public/games/hollow-crown/content.js)：房間 `ROOMS`、路線 `ROUTES`、天賦 `TALENTS` 與相關穩定 ID。先改少量資料並保留 ID／引用一致；戰鬥及存檔契約分別在 [rules.js](public/games/hollow-crown/rules.js)、[storage.js](public/games/hollow-crown/storage.js)。不要把讀檔版本或舊 ID 當可任意更名的顯示文字。
2. 入口整合在 [main.js](public/games/hollow-crown/main.js)，鍵鼠來源所有權在 [input.js](public/games/hollow-crown/input.js)，呈現與聲音在 [scene.js](public/games/hollow-crown/scene.js)、[audio.js](public/games/hollow-crown/audio.js)。修改後先執行對應 Node 測試，再以正常遊戲操作另行驗證；測試不能取代實機檢查。
3. 真正可編輯3D來源是 [kit.mjs](assets/games/hollow-crown/sources/kit.mjs)。座標／骨架／動畫／碰撞與擴充契約見 [sources/README.md](assets/games/hollow-crown/sources/README.md)；製作意圖見 [generation/brief.md](assets/games/hollow-crown/generation/brief.md)。模型不是2D截圖替代品。
4. 單獨重建素材可在依賴安裝後執行：

```sh
node assets/games/hollow-crown/recipes/export-assets.mjs
node assets/games/hollow-crown/audio/generate.mjs
```

匯出器使用 [stone-surfaces.mjs](assets/games/hollow-crown/recipes/stone-surfaces.mjs) 生成石材貼圖；音訊由 Node 合成。輸出與可核雜湊列在 [manifest.json](assets/games/hollow-crown/manifest.json) 及 [audio-manifest.json](assets/games/hollow-crown/audio-manifest.json)。來源、模型、runtime與manifest應一起檢查，不能只替換一份檔案便冒稱同一版本。跨平台匯出不保證GLB逐位元相同。

## 授權與來源

- [LICENSE](LICENSE)：既有第一方 MIT 文本。
- [LICENSE-SCOPE.md](LICENSE-SCOPE.md)：第一方程式、第三方與媒體的界線。
- [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)：實際 Third-party 版本及原授權，包含 [Three.js 完整授權](public/games/hollow-crown/vendor/THREE-LICENSE.txt)。
- [ASSET-LICENSES.md](ASSET-LICENSES.md)：既有素材來源與權利陳述；不從生成程式 MIT 推導所有 GLB／PNG／WAV 有新的廣泛授權。

沒有新授權決定。不要提交帳號、憑證、真實私人存檔、環境報告或其他人的個人資料。
