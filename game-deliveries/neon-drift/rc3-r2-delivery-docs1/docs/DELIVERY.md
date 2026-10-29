# 文件修正版與回滾

交付識別 `neon-drift-rc3-r2-docdelivery-20261029`，原遊戲候選 `neon-drift-audio-lifecycle-20261028-rc3-r2` 的全部可執行程式/18個非release.json檔（含.gitattributes）原樣。遊戲build/version不換標，沒有新的遊戲完成或GUI聲明。

原文件包ND-MAINT-DOC-001：README錯指完整monorepo缺失scripts/授權連結；本版換成可用的單款入口、隨包擴充/資產/回滾文件。原始package metadata不刪，明確不使用其缺失root scripts。恢復manifest指向的原vehicle-kit記錄，不輸入歷史評分作本版結果。

ND-MAINT-ROLLBACK-002：舊runtime/release.json的rollbackBundleSha256殘留RC1 `74d0c819557ba8eaf3be7958d260b4cd05b79f2f4d05b6a9aef581edce14b686`，不是雙回滾策略。此次只把它修成實際回滾RC2 game.js SHA256 `cf8cb0a59603bb924d62bb451ad13da340d4af60e2b3be059328b0fc41508885`，與baseline欄一致。rollback-runtime全19檔與原RC2逐byte同。

回滾時在獲准的新目標/維護窗口完整換入rollback-runtime，不能只替game.js留下混版index/style；先核ROLLBACK-MANIFEST.json全檔，再確認畫面及存檔相容。不要清使用者storage、刪備份或把原生回滾未測說已過。交付封包檢查只證bytes，不執行部署或使用者資料變更。

runtime的18個非release.json檔含所有13資產、game/index/style/Three license及.gitattributes保持精確；第19檔release.json metadata改了，因此**完整19檔aggregate不同**，不能沿用舊aggregate。新RUNTIME-MANIFEST及CHANGES.json列明。舊source/runtime/rollback ZIP與舊86評分不改。新文件候選需獨立複核，分數由品控另定。

限制：無新的GUI、實聽、GPU效能、手機或無障礙測試；無新依賴下載、CI、公開網址或發布。原技術測試與QC2擴充/清潔生成是歷史證據，不改時間冒稱本次測試。未測面向仍null，不因本文件補件自填90。
