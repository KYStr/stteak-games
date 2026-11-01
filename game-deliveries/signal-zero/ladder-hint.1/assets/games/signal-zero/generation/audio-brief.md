# Signal Zero 原創音訊來源與重建契約

日期：2026-10-25。作曲／音效來源：Maker 的 `games/signal-zero/src/audio.js`。此包保存完全相同的可編輯工程 `sources/audio/audio.js`；沒有外部取樣、下載音樂或不可追溯的聲音模型。

Runtime 使用 Web Audio oscillator 合成器，沒有播放 WAV 資產。13 種事件包括跳躍、落地、腳步、駭入、目標、資料包、checkpoint、工具成功／失敗、警戒、被抓、完成與介面點擊。音樂由 64 步、四和弦音序組成，每步 330 ms、總長 21.12 秒；stealth 保留低頻脈動與音階，search 增加短警戒節奏。聲音可透過遊戲設定分別調整 music/sfx，且必須由使用者手勢啟用音訊。

單一 transport、最多 12 個同時 oscillator；暫停停止 voices 並 suspend AudioContext，離開釋放 context，onended 斷開 oscillator/gain。Runtime 跟隨裝置 AudioContext 的原生取樣率，並不強制成 44.1 kHz。參考原始檔則統一保存為 44.1 kHz、mono、PCM 16-bit WAV。參考 settings 為 sfx 0.7/music 0.45/master 0.55，對應目前預設設定。

配方 `recipes/export-audio.mjs` 直接載入實際 Sound class，攔截 event/update 發出的 tone 定義，再以 Microsoft Edge OfflineAudioContext 重建相同 oscillator、exponential frequency glide 與 attack/release envelope。這些 WAV 是可重製參考原始檔，並非宣稱 runtime 會下載或播放它們。相同參考檔可供 DCC／音訊工具編輯或其他引擎使用；runtime 作者若修改音序或配方，必須再執行配方同步追溯。

音樂先排程三個週期，擷取中間一個週期以保留跨越 loop 邊界的 note tails，輸出完整 931,392 samples。起點定義為首個音序 tick，省略原始 transport 開始前 330 ms 的等待。Loop 契約是 startSample=0/endSample=931392（不包含尾索引）。警戒狀態在 runtime 中隨更新決定是否加入該步的短音；參考 search 檔固定整圈警戒啟用。這個機制不會讓警戒音蓋掉腳步的政策由實際遊戲混音驗收決定，來源檢查不冒充聽感通過。

執行：

```powershell
node assets/games/signal-zero/recipes/export-audio.mjs
```

依賴已鎖定的 Playwright 與本機 Microsoft Edge，無需下載或修改系統環境。工具只寫 `assets/games/signal-zero/`。manifest 的 audio 項使用明確 `runtimeRoot: public/games/signal-zero`，其 audio.js 雜湊由實際 runtime 檔讀取；sourceSha256 則來自 source。`generation/audio-validation.json` 明確記錄兩者是否相同、WAV 位元數／雜湊、峰值、RMS 與 loop 首尾差異。
