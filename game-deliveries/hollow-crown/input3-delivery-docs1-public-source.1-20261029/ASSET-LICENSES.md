# Asset terms and provenance — Hollow Crown input.3

本文件把原 [README](README.md) 承諾的素材來源說明補到本次單款交付。它保留既有素材紀錄，**不宣稱獨立權利清查、不新增素材授權，也不把全部模型／貼圖／聲音改成 MIT、CC0 或公共領域**。

## 本包實際來源與產物

| 類別 | 已有可編輯來源與生成入口 | 隨包紀錄／產物 |
|---|---|---|
| 幾何、角色 rigid-Bone 動畫、材質與碰撞資訊 | [sources/kit.mjs](assets/games/hollow-crown/sources/kit.mjs)、[來源契約](assets/games/hollow-crown/sources/README.md)、[匯出配方](assets/games/hollow-crown/recipes/export-assets.mjs) | [manifest.json](assets/games/hollow-crown/manifest.json)；[models 目錄](public/games/hollow-crown/assets/models/) 內 17 個 GLB、runtime `kit.js`、`collision-proxies.json` |
| 原創程序石材像素 | [stone-surfaces.mjs](assets/games/hollow-crown/recipes/stone-surfaces.mjs) | 同一 manifest 的三張 [textures](public/games/hollow-crown/assets/textures/)：basecolor、normal、roughness PNG；石材 GLB 內含對應映射 |
| 原創合成音樂與音效 | [audio/generate.mjs](assets/games/hollow-crown/audio/generate.mjs) | [audio-manifest.json](assets/games/hollow-crown/audio-manifest.json) 的 16 個 record；[audio 目錄](public/games/hollow-crown/assets/audio/) 的 16 個 PCM WAV |

幾何／貼圖 manifest 有 **22 個 record**，音訊 manifest 有 **16 個 record**，共 38 個。每個 record 已有穩定 id、來源、產物路徑、SHA-256、規格與 provenance；這是素材紀錄數，不是遊戲品質分數。完整製作意圖另見 [generation/brief.md](assets/games/hollow-crown/generation/brief.md)。

## 保留的權利紀錄

本候選既有 manifest 逐項標示 `original-procedural`，沒有外部參考來源項目：

- 幾何／設計／材質／clips：`Original project geometry, designs, materials and clips; third-party engine Three.js is separately MIT licensed.`
- 程序貼圖：`Original project procedural pixels; no source photographs or external textures.`
- 合成音樂／音效：`Original project composition; no third-party samples`。

以上是原作者／生成紀錄的既有陳述，不是本次新做的所有權保證。現有記錄沒有給每個 media 檔一個廣泛、獨立的公共領域／CC0／MIT 再散布條款；**不得從生成程式的 MIT 推導該 media 也有相同授權**。第一方程式碼與第三方引擎界線分別見 [LICENSE-SCOPE.md](LICENSE-SCOPE.md) 與 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。本包不帶入 Dust 音訊的既有 CC0 聲明，那不是 Crown 的素材條款。

## 與固定公開參照的相符範圍

本說明參照 [既有公開資產條款](https://github.com/KYStr/stteak-games/blob/08e2c69b7b3bd7a070ea86865acd136214b469d1/ASSET-LICENSES.md)，只採用其中 Crown 對應的來源及授權界線。

比對該固定版本時，Crown 音訊 manifest 逐 byte 相同；幾何／貼圖 manifest 的 **22 個 record 的 id、source、runtime 路徑、SHA-256、version 和 provenance 相同**，但整份 manifest 不能宣稱逐 byte 相同：公開參照把 9 個非角色 prop 的 `spec.rig` / `spec.weaponMount` 改為 `null`。本次保留原 input.3 manifest bytes，沒有偷換它。這 9 個 prop 本來就記 `bones: 0`、無 clips；角色的 rigid-Bone／weapon-mount 契約不應套到靜態 prop。這個描述差異不增加權利，也不改變素材 bytes。

本輪沒有重新生成 GLB、PNG 或 WAV，沒有添加 AI 圖像、外部照片、sample 或 2D 替代 3D。本包 55 個 runtime 檔均沿用 input.3。用現有來源重建的操作見 [build.mjs](games/hollow-crown/build.mjs) 與 [來源契約](assets/games/hollow-crown/sources/README.md)；本次文件補件不宣稱又執行了建置或 GUI／實聽驗收。
