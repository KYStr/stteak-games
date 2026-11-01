# 作者有限自查

本修正只涉及時計、輸入／生命週期重設、模式切換停止與 ledger v2。每幀最多 0.4 秒／8 子步；超過 0.5 秒整段丟棄；不累積欠帳。原物理公式與存檔格式保留。頻繁輸入會截斷舊時間段，可能造成慢動作；沒有宣稱控制手感已通過。

2026-11-01T06:46:31Z 完成一次有限離線複驗，exit 0；60 秒 timeout、Node heap 256 MiB、10000 幀上限。這是整段工作的第 11 次，不是第 12 次。`evidence/offline-result.json` 是原始成功 stdout，SHA256 `77f686c81d69d8279762782c1a55bcfb426d433b7fbd6f7dccd8b956edb6ad5b`，未改內容。腳本原始輸出仍有歷史標籤 sharedExecution=10/totalMaximum=10；這兩個欄位不能用作本次實際次數，實際為第 11/11 次。保留原始輸出以免改寫證據。

實核 53 檔固定候選身份、16 處逆向 patch 回基線；400 個 1–400ms 的實際提取 su 數值點，其中 37 點有浮點微小上溢。103ms 實例 consumed=0.10300000000000001，loss=0，schema 接受；4 類實質超量仍拒絕。oxygen/collision 兩個離開 eligible 模式案例各只推進 0.05 秒，剩餘子步停止。輸入 anchor/reset/future-anchor 檢查通過。

容量記錄1538、ledger4789、body48451、stream58691 bytes，保留既有3072／10240／60000／65536硬限；這次核既有固定容量證據，不是再執行容量整套測試。

上述結果是離線提取程式與有限模型，不是整款產品通關、GUI、聲音、GPU效能、原生3P或品質分數。完整修正候選的診斷入口 executionReady=false/nativeAuthorized=false，這份子集也沒有將它啟用。
