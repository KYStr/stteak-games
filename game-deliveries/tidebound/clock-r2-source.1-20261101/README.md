# Tidebound clock r2：來源修正子集

交付身份 `clock-r2-source.1-20261101`。這是既有隔離修正版的來源保存子集，不是完整遊戲包、部署、原生測試入口或品質驗收通過。

`runtime/game.js` 原樣保存時計 r2 的 700073 bytes；SHA256 `9b4fbae404aad2136937c21059b001011582eb9bfb093ba1566a4fd0e58ba57f`。沒有為這份文件交付再改產品或建置。基線、歷史來源與依賴邊界見 BASELINE.json；自查與證據說明見 AUTHOR-CHECK.md；缺項與回滾見 LIMITATIONS-ROLLBACK.md。

來源沿用既有 Tidebound 產品與作者歷史；這份交付不重新署名、不變更原授權，也不另授第三方素材權利。產品保留原程式內聲明；第三方與其餘資產仍依原來源的各別條款。

SOURCE-MANIFEST.json 記錄其餘六檔的 bytes/SHA256，不包含自己，避免自參照。此檔案清單只證明子集身份，不能證明可運行、資產完整或新原生入口已綁定。未包含新的 capsule、workflow、啟用設定或完整 runner。
