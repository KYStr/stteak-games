# 第三方授權與保留來源

- Three.js0.180.0：MIT。見 [runtime notice](public/games/orbit-fall/vendor/three-LICENSE.txt)、[資產helper notice](assets/games/orbit-fall/sources/vendor/three-LICENSE.txt)。完整 `dependencies/three-0.180.0.tgz`內保留LICENSE與上游源，SHA512對原game lock。
- Rapier0.19.0：Apache-2.0。見 [retained notice](assets/games/orbit-fall/vendor-sources/rapier-LICENSE.txt)、[runtime notice](public/games/orbit-fall/vendor/rapier-LICENSE.txt)。本包只有建置所需retained mjs/WASM與本地初始化patch，不是完整npm發行包。
- 模型與合成音訊的原作者來源說明見 [資產設計紀錄](assets/games/orbit-fall/generation/design-record.md)及 [資產追溯](ASSET-PROVENANCE.md)。沒有替專案原創內容新增授權條款，第三方授權不自動覆蓋原創程式/資產。

所有既有第三方license bytes保持原樣；本清單不是外部法律審查或額外權利保證。

## public-source.2 的 Rapier 修改通知

`public/games/orbit-fall/vendor/rapier.mjs` 現在檔頭明列本發行版本相對上游的17byte初始化wrapper與新增通知，附原件、配方及原Apache-2.0 license引用。去新增comment後仍為原wrapper輸出。原上游mjs/WASM及license bytes保持不變；已保留的版權、歸屬/notice不刪改。此註記回應[Apache-2.0第4(b)節](https://www.apache.org/licenses/LICENSE-2.0)的修改檔揭露要求，不是新授權或完整法律審查；未提供的完整上游npm發行包仍不冒充已提供。
