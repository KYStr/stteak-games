# Tidebound public source subset r3 + public-guide.2

公開交付身份：`tidebound-public-source-subset-r3-guide2-20261029`。產品來源仍為 `tidebound-cloud-input-lifecycle-20261028-01-delivery-docs.1`；這不是原私有已評整包，不沿用其90分或accepted。

- 唯讀產品來源：`source/`（原108檔）；凍結runtime：`runtime/`（原79檔）。素材配方在 `source/games/tidebound/export-assets.mjs`、`generate-audio.mjs`，package/lock在同目錄。
- 新整合的[可攜內容擴充指南](docs/CONTENT-EXTENSION.md)為精確 `tidebound-public-guide.2-20261029`，另有兩個helper；它只在明示的丟棄副本操作，不准就地修改來源。指南與來源可位於同一包根，範例的 SOURCE_ROOT 應明確指到本包根（即包含 source/ 與 evidence/ 的位置）。依賴仍須明選已存在的 Tide Three 0.180.0／esbuild 0.25.10，不安裝、不下載。
- 官方build有既有URL.pathname限制：scratch的canonical路徑不得包含需URL編碼的字元。原防護、來源108檔固定hash與不接受既有WORK等限制詳見指南，不能改hash或刪guard遷就另一版本。
- 原純來源／runtime manifests仍是 `evidence/original-source-manifest.json` 與 `evidence/original-runtime-manifest.json`；前者SHA256 `f5615ffcaf88e3834b62ae1e544c045fd35286aa6ace82c201aa04653b59c477`，正是guide.2預檢的固定身份。

本次只整合／靜態核身份與相對引用，不重做作者10、非作者7 CLI，不build、不重生素材、不跑遊戲／GUI／CI。指南技術PASS不等此完整公開subset已獨立品質驗收。sourceCommit／candidateURL仍null；發布與執行須另按精確manifest審查。界線與授權見[PUBLICATION-SCOPE.md](PUBLICATION-SCOPE.md)。
