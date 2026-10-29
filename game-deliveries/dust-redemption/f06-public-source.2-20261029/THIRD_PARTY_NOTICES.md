# 第三方說明（本 Dust 子集）

## Three.js 0.180.0 — MIT

原版授權文字：`public/games/dust-redemption/vendor/THREE-LICENSE.txt`。保留 runtime 引擎、GLTFLoader、SkeletonUtils 及其相關 helper 的版權／授權；原建置程式會將部分 import 改成 runtime 的相對路徑，不宣稱這些路徑改寫等同 untouched upstream。

上游：https://github.com/mrdoob/three.js
固定授權參照：https://github.com/mrdoob/three.js/blob/r180/LICENSE

## 開發依賴

`games/dust-redemption/package-lock.json` 保留 Three 0.180.0、Playwright 1.56.1、Prettier 3.6.2 等宣告及鎖定資料。Three／Prettier 是 MIT；Playwright 套件是 Apache-2.0。未交付 node_modules、瀏覽器安裝檔或依賴快取；若另行散布它們，須保留各依賴適用授權。

## 媒體

音訊既有 CC0-1.0 聲明與模型／貼圖專案專屬聲明，均依 [ASSET-LICENSES.md](ASSET-LICENSES.md) 及原素材記錄，不一律改為 MIT。
