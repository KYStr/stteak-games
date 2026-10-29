# Third-party notices — Hollow Crown only

本文件依本包 [package.json](games/hollow-crown/package.json)、[package-lock.json](games/hollow-crown/package-lock.json)、runtime vendor 及建置入口列出實際第三方範圍。第一方 [LICENSE](LICENSE) 不重新授權下列元件。

## 隨 runtime 分發：Three.js 0.180.0 — MIT

- 精確依賴：`three@0.180.0`，不是 Neon 使用的 `0.170.0`。
- 隨包引擎：[three.module.js](public/games/hollow-crown/vendor/three.module.js)、[three.core.js](public/games/hollow-crown/vendor/three.core.js)。
- 完整原授權：[THREE-LICENSE.txt](public/games/hollow-crown/vendor/THREE-LICENSE.txt)，包含 `Copyright © 2010-2025 three.js authors`。必須保留，不能以專案第一方 MIT 檔案替代。
- 上游：[Three.js](https://github.com/mrdoob/three.js)，對應固定版本 [r180 LICENSE](https://github.com/mrdoob/three.js/blob/r180/LICENSE)。
- [build.mjs](games/hollow-crown/build.mjs) 從同一安裝套件複製上述兩個引擎檔與 LICENSE；[資產匯出器](assets/games/hollow-crown/recipes/export-assets.mjs) 使用該套件的 `GLTFExporter` 生成 GLB。GLTFExporter 的原始套件需經依賴安裝取得，並未另拷成第一方程式碼。
- 本交付的引擎檔與授權沿用已驗 input.3 bytes；本輪只補文件，沒有更換或修改引擎。

## 只在精確鎖檔宣告，未隨本包分發的開發依賴

| 套件 | 版本 | 鎖檔保留的授權／用途 |
|---|---|---|
| `@playwright/test` | `1.56.1` | Apache-2.0；測試開發依賴 |
| `playwright` | `1.56.1` | Apache-2.0；上述套件的傳遞依賴 |
| `playwright-core` | `1.56.1` | Apache-2.0；上述套件的傳遞依賴 |
| `fsevents` | `2.3.2` | MIT；Playwright 的 optional、僅 Darwin 套件 |

表格是本包鎖檔的宣告，不表示這次安裝或執行了全部套件。本包不包含 `node_modules`、瀏覽器 binary、開發工具安裝檔或另外的離線套件 cache。若日後另外分發這些依賴，須從所分發的實際版本保留其完整適用授權及 notice；這份摘要不能代替那些授權文本。上游參照：[Playwright](https://github.com/microsoft/playwright)、[fsevents](https://github.com/fsevents/fsevents)。

## 字型與未包含的元件

本包 CSS 只列出可由本機字型／系統 fallback 滿足的字型名稱；沒有隨包 font binary、`@font-face` 或 Google Fonts 引入。列出 `Inter` 或 `Noto Serif TC` 等名稱不表示本包分發或重新授權它們。日後加入字型檔時，應隨該檔保留適用的原權利與授權。

本 Crown 單款交付沒有 Rapier、Orbit helper、其他遊戲引擎／bundle、公開 launcher 或平台行銷圖片；不盲抄八款總表使它們看似本包元件。素材另見 [ASSET-LICENSES.md](ASSET-LICENSES.md)。

## 既有 notices 的來源與核對界線

依據 [固定公開版本的第三方 notices](https://github.com/KYStr/stteak-games/blob/08e2c69b7b3bd7a070ea86865acd136214b469d1/THIRD_PARTY_NOTICES.md)，但只保留經本包核對的 Crown 範圍。該固定版本的 Crown `package.json`、lockfile 與 Three 授權文本皆和本包逐 byte 相符。公開倉庫 commit 是文件／元件參照，**不是本未發布 input.3 的 source commit**。
