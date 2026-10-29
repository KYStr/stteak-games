# 最小內容擴充：在既有結局加一則後日談

適用 `f06-public-source.2-20261029`；只在副本示範，不改交付 runtime。需要 Python 3 以及支援 `--experimental-vm-modules` 的 Node。探針使用 bundled Three，不需要網路、瀏覽器、伺服器或新依賴安裝。

## 為何可擴充

`public/games/dust-redemption/content.js` 的 `ENDINGS` 含 `outcomes: [{title,text},…]`。真正 `game.js:ending()` 會逐項輸出 h3 + p，既有 rules 選取 ending。增加既有 common_dawn 的一則敘事不需要改主迴圈、schema、save、規則或 ID。

不要透過本例增加第七任務／新結局 ID；任務、流程、save 驗證與 gate 另有契約。六個當前 briefing 都由 game.js 覆寫，僅編輯 content.js 的 fallback briefing 不能當成可見擴充示範。

## 1. 建立新副本、先驗不存在

以下從本快照根目錄執行；EXPERIMENT 是自行選的全新相鄰目錄，不能指向本快照或其內部：
```sh
set -eu
EXPERIMENT=../dust-epilogue-example
test ! -e "$EXPERIMENT"
cp -a . "$EXPERIMENT"
node --experimental-vm-modules tests/extension-probe.mjs \
 "$EXPERIMENT/public/games/dust-redemption" absent \
 '新驛站的一頁' '每週輪值的人把收件回條公開貼在鎮上的木板。'
```
任何前一步失敗即停止，不要繼續覆蓋已存在副本。預期 probe 顯示 PASS、expected absent。它載入附帶已取得的六任務 CPU fixture，再走真 title→hub→ending，不在本次重玩戰役。

## 2. 只修改副本的一個資料陣列

編輯副本 `public/games/dust-redemption/content.js`；找到 `export const ENDINGS` 下 `common_dawn.outcomes`，在陣列開頭插入：
```js
      { // 中文說明：只新增既有結局的一則資料物件。
        title: "新驛站的一頁", // 中文說明：此標題將成為結局的 h3。
        text: "每週輪值的人把收件回條公開貼在鎮上的木板。", // 中文說明：此正文將成為相鄰段落。
      }, // 中文說明：保留既有項目與其他結局。
```
只接受可信的人工撰寫純文字；不要放 HTML、尖括號、&、script 或外來使用者／網路字串。現有 renderer 直接插入 HTML，這份指南不宣稱 sanitization。

這是直接 runtime 檔，沒有 authored 鏡像；builder 不產生／覆寫 content.js。保留其他結局與項目。
```sh
node --experimental-vm-modules tests/extension-probe.mjs \
 "$EXPERIMENT/public/games/dust-redemption" present \
 '新驛站的一頁' '每週輪值的人把收件回條公開貼在鎮上的木板。'
diff_status=0 # 中文說明：先保留預設成功碼，不關閉整個shell的errexit。
diff -u public/games/dust-redemption/content.js "$EXPERIMENT/public/games/dust-redemption/content.js" || diff_status=$? # 中文說明：在OR條件中捕捉diff真正退出碼，預期差異不提早結束。
if [ "$diff_status" -gt 1 ]; then # 中文說明：0是相同、1是差異；大於1仍是必須停止的操作錯誤。
  exit "$diff_status" # 中文說明：保留真正錯誤碼，不用無條件成功吞掉故障。
fi # 中文說明：只有diff 0或1可繼續後續還原。
```
預期新增精確 h3/p 一次，profile／disk 不變、無 runtimeErrors。上面明確處理 diff 的 0／1：1 代表預期差異，不會因主要 shell 的 `set -eu` 跳過還原；2 或其他真正操作錯誤保留非零退出並停止。diff 本身的 0 並不證明新增成功，仍須前面的 present probe 成功且人工核對差異。

**可選的故意 absent 負例不屬於上面的連續成功命令。** 要驗證探針會拒絕已新增內容，請另開獨立終端 shell，從同一快照根目錄開始，重新把 `EXPERIMENT` 設為同一個實際副本路徑；只重用第1段的 `node … absent …` 命令，不重做 `test ! -e` 或 `cp`。不要把這個預期失敗命令裸接到已啟用 `set -eu` 的主要 shell。

負例應非零退出，且必須人工確認是 `actual main ending renders exact added outcome` 這個斷言、實際 true 對預期 false；檔案不存在、參數、語法或其他執行錯誤都不能算預期拒絕，也不能僅見 exit1 就記PASS。確認後回到原主要 shell（原 `EXPERIMENT` 仍在），接續第3節還原；若原因不符先處理，不用 `|| true` 吞錯。

若另行選擇在副本備妥相符依賴並執行 copy-build，新增 content 必須仍存在，再跑 present probe。此步不是本次來源整理已執行的測試。

## 3. 還原並逐檔比對

```sh
cp public/games/dust-redemption/content.js \
 "$EXPERIMENT/public/games/dust-redemption/content.js"
node --experimental-vm-modules tests/extension-probe.mjs \
 "$EXPERIMENT/public/games/dust-redemption" absent \
 '新驛站的一頁' '每週輪值的人把收件回條公開貼在鎮上的木板。'
python3 "$EXPERIMENT/tools/verify-public-source.py"
diff -qr . "$EXPERIMENT"
```
若明確增加 node_modules 依賴連結，最後 diff 僅可忽略那個連結；其他文件均須相同。把 diff／輸出記錄留在副本外，不能倒灌示例內容回原快照。

## 範圍

真 main HTML 資料探針配合 CPU DOM／World／renderer／bridge／audio 替身；不證明自然遊玩、GUI 排版、無障礙、聲音、瀏覽器或裝置體驗。本次公開子集準備未執行本實驗；成功與否須由實際執行者觀察，不能沿用舊報告或推導品質分數。
