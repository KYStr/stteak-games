# Orbit 0015：全新人工 A1 測試存檔

本目錄只有一次全新匿名故事經正常 UI 匯出的人工測試存檔及有限來源記錄；**不是個人存檔，不含個人帳號或憑證**。正常操作為新故事、暫停、故事模式備份、匯出，各一次且均有按時 acknowledgement。獨立審查僅接受此 fresh A1 producer 的有限結果。

## 原件身份

| 項目 | 值 |
|---|---|
| 檔名 | `story-backup.json` |
| 原件大小 | `808` bytes |
| SHA256 | `122f4a59f9e3c212a8238f29139e8ff951fd04b82d7e55a865ab95f6943f6ed8` |
| Git blob SHA1 | `6163abb6f3fce4d6aab1aebe0c9d02f4ecbcffb2` |
| Producer run / job | [`40577964973`](https://github.com/KYStr/stteak-games/actions/runs/40577964973) / `122449362671`，attempt `1` |
| Producer commit | `d236331996584c5fec9b410d9d4a5a67804dde78` |
| 已審 workflow SHA256 | `17705d3d7f66e637e7efb486069ecbe518162b1788867a5902a160da0f262275` |
| Runtime | `orbit-fall-0015`，Site version `2` |
| Runtime 來源 commit | `4460a5c5532c8bb8afadf57661702bcc34f00e83` |
| 預期來源 runtime SHA256 | `24d1cd8b283ca7e6621107191333ac7d8011946c25a233f8ecb79f999cc18c57` |
| 實際 browser | `155.0.8059.39`，原生 Chrome sandbox |
| 官方本輪 runner header | `ubuntu-24.04` / `20261012.334.1` |
| 內容 validator | `orbit0015-fresh-a1-public-v1` |
| Validator 程式 SHA256 | `71cb0222f2caef7d74dc8331eb8a1d59bf8b121f8328f221d0c43982629ee759` |
| 獨立結果收據 SHA256 | `fbb72c6df8eae5c6ecd048e5b7f1207947dda23adf1c28c24e7817f32315d0fa` |

原檔完整 bytes 未修改，未 pretty-print、換行、重新序列化或生成代用進度。目錄名稱就是此原件 SHA256。**Producer commit 是執行測試的程式版本，不是本資料的入庫 commit。** 後續 consumer 必須另外固定真正發布此資料的 commit，讀回核對原件 bytes、SHA256 及 Git blob；本記錄不自填尚未完成的發布 commit。

## 公開前檢查與範圍

公開 job log 的第一個 save byte 前，runner 已完成外層 9 欄、故事 run 24 欄、巢狀集合與有限值完整白名單，僅接受 fresh A1、空修復／訊號／挑戰進度及來源允許的有限技術值；未知／額外欄位、自由文字、非 canonical 原文、checksum 錯誤或超過 4096 bytes 都拒絕。正常操作、唯一受控下載、原 bytes 身份、封存、browser close、私有下載及輸出前 staging 清理也必須先通過。接收端嚴格重解三流並再驗原件，獨立 reviewer 另核完整檔案及原 PNG。

這不是對任意存檔的通用隱私保證。Hash／checksum 是 byte 身份和完整性檢查，不是認證或防作弊簽章。來源 runtime hash 不表示此輪重新讀回全部遠端部署 bytes；官方 runner header 已綁本輪，但下載套件／GPG 的完整供應鏈仍未全面驗證。

本輪**沒有 import、confirm、reload、restore 或跨輪持久性測試**；不能宣稱後續裝備、牽引、修復、收集或整款遊戲通過。實際 browser 是 155，不推定 156 在此情境已實跑。軟體 WebGL2 不代表硬體效能或真機相容性。

## provenance.json 逐欄說明

- `provenanceSchema/status/purpose`：來源記錄格式、有限 producer 結果與人工 fresh A1 用途，不是遊戲存檔 schema 或完整驗收。
- `producer.repository/runId/jobId/commit/attempt/workflowSha256`：同一次公開測試的身份及精確 workflow hash；不混入資料發布 commit。
- `runtime.build/siteVersion/sourceCommit/expectedSourceRuntimeSha256`：既有遊戲來源識別；`producerRemoteRuntimeBytesVerified:false` 明示未重新全量驗遠端 bytes。
- `validator.id/sourceSha256/maxBytes`：完整 fresh A1 白名單驗證器及 4096-byte 上限。
- `save.file/bytes/sha256/gitBlobSha1/originalBytesUnmodified`：固定公開檔名及真原件的大小、兩種 hash、原 bytes 未改寫確認，不含本機 path 或 GUID。
- `observed.browserVersion/runnerImage/runnerImageVersion`：本輪實際版本與官方 header，非預期值。
- `observed.strictTransferVerified/completeSchemaVerified/freshA1ProfileVerified/prepublicationPrivacyGateVerified`：嚴格傳輸、全內容、fresh 範圍及首 byte 前門檻的核驗結果；不是以事後審查代替首道隱私。
- `observed.privateDownloadsRemoved/stagingRemovedBeforeSaveStream/independentResultAccepted`：私有資料清理、輸出前刪除及獨立有限結果接受。
- `review.result/receiptSha256`：有限結果 enum 與獨立收據內容身份，不公開私人審核檔或聊天資料。
- `limitations`：未涵蓋的產品、來源、硬體及效能界線。
