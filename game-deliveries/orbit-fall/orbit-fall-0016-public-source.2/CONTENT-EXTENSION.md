# 最小內容擴充：新增一個可選挑戰

目的：只在新副本加一項內容，沿用現有主流程；不修改 main/rules/storage，不混入原 0016 runtime。這是一個**新增挑戰配置**，不是新增謎題機制。新增房間/甲板/新謎題型態有額外空間與進度契約，不在本指南保證範圍。

## 1. 準備與基準

複製整個 source 至新的試驗目錄（不要在原交付改）。先在複本執行：

```sh
python tools/verify-delivery.py
```

保留 `public/games/orbit-fall/content.js` 原 bytes 在複本之外。已核內容原有 3 challenges；每個 challenge 含穩定唯一 id、title、deck、roomId、puzzleIds、timeLimit、objective。

## 2. 唯一必要編輯

開 `public/games/orbit-fall/content.js`，在 `export const challenges = [` 的最後一筆之後、結尾 `];` 之前加：

```js
  { id: 'challenge-docs-reflection', title: '指南試作：晨光速修', deck: 1, roomId: 'room-d1-optics', puzzleIds: ['puzzle-reflection-1'], timeLimit: 120, objective: '120 秒內完成晨光折返；僅文件擴充試驗，不納入產品。' },
```

不要加在 rooms 或 signals 區。目標 room/puzzle 必須存在且同 deck；puzzleIds 非空、唯一且可從該 deck 完成；正 timeLimit（本例120秒）。維持原有 ID，不把已有 PB 的 ID 指向不同內容。題目時間變動會改變排行榜可比性，正式版本應另建 ID/遷移政策。本例不改存檔 schema：storage 以 content 中的 challenge IDs 過濾保存；回舊版時新 ID 記錄會被忽略，所以只能用測試 storage。

主畫面挑戰按鈕來自 `main.js` 的 challenges.map；`startChallenge` 讀上面配置，`solvePuzzle` 以 puzzleIds 決定結束，`recordChallenge` 與 storage 保存該 ID。現有 `reflection` 互動與 optics/scene 模組可直接重用，無需重寫主循環。

## 3. 副本驗證工具與範圍

```sh
node --check public/games/orbit-fall/content.js
node tools/check-challenge-extension.mjs
```

預期 PASS，覆蓋：未達結局仍鎖定；真 main 產生新挑戰選項；啟動 A3；原鏡面互動完成新挑戰；新 PB 經真 storage 保存且不改故事永久進度；返回故事；新 main 載入記錄；舊 cargo 仍可啟動。

測試預置故事結局由公開 rules API 建立（不是玩家完整遊玩），DOM/render/audio/bridge/proximity/RAF 是受控替身；main、rules、storage、optics、PhysicsRoom/Rapier 真實執行。它不驗畫面布局、實際人類解謎、鍵鼠或音訊。fixture 是原0016已交付那份，copy bytes未改，工具明確傳入本子集的runtime目錄，不使用fixture的歷史預設路徑。fixture不應單獨以預設參數呼叫；請由本教學helper進入。這是CPU受控測試，不是自然遊玩證據。

如另有已授權原生環境：正常完成至少一結局→挑戰選單→「指南試作：晨光速修」→調2、6→確認結果/回故事/重載；本公開裁剪未執行任何功能、建置或原生步驟。

## 4. 還原與候選保護

把 content.js 還原原 bytes，執行 `python tools/verify-delivery.py`；82 檔全部一致才算還原。擴充試驗只准這一檔改動，使用工具不改新內容 ID/expected values偷過。若未還原，verify 必須 fail；不可將 manifest 同改。

保留 `diff -u original-content.js .../content.js` 與測試 log 作試驗證據。不要將這個第四挑戰、測試保存、node_modules 或建置試驗副本打包成正式遊戲。整個新副本可由執行者另行清理；原候選保留不動。
