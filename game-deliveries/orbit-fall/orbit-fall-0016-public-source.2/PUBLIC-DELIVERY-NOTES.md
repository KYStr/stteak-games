# public-source.2 身份與裁剪

來源交付ID：`orbit-fall-0016-failure-return-cloud-candidate-1-delivery-docs.2`；前版公開子集：`orbit-fall-0016-public-source.1`；本子集：`orbit-fall-0016-public-source.2`。三者不是同一封包或評分身份，沒有移轉品質分。

本版只補Rapier modified-file通知：82 runtime records（81可HTTP資源及一份.gitattributes）之中，81檔與原docs2/.1逐byte相同；唯一異檔是`public/games/orbit-fall/vendor/rapier.mjs`，新增檔頭comment後hash改變。剝掉精確新增comment即回原.1 bytes。內部遊戲build label未改，不代表新公開位元仍是原0016 aggregate。

Rapier0.19.0既有17byte初始化wrapper保留；上游mjs/WASM/license與所有原版權/歸屬文字不刪改。`games/orbit-fall/rapier-init-patch.mjs`保留所有原source/call/WASM/raw-output guard，再產生同一段通知並核新output hash；原build.mjs呼叫契約不變。runtime及vendor-source manifests分列raw/annotated身份，沒有把原上游誤標為修改版。詳見[第三方說明](THIRD-PARTY-NOTICES.md)。

前版排除的私人機器環境快照、歷史驗證報告、外層工作狀態/對話/評分/回執及runner仍不公開。verify-assets維持前版NOT_INCLUDED裁剪，不重做原環境驗證。`source-provenance.json`與`PUBLIC-SOURCE-MANIFEST.json`只含純來源/新hash映射，不含私有報告。

本輪僅對新增通知作byte剝離等價、純patch輸出比對、JS syntax與身份/封包核；沒有完整build、資產生成、功能/GUI/CI或部署。所有既有授權保留，不新授權、不捏造作者或法律結論；公開commit/URL與發布批准仍無。
