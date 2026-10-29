# Orbit / Fall 可重用資產

`sources/models-source.js` 為模型及材質的可編輯原始碼；`sources/sound-synthesis.mjs` 為原創音訊工程。`manifest.json` 包含每個模型、碰撞體與聲音的實際 SHA-256、大小、來源及規格。

在專案根目錄執行：

```powershell
node assets/games/orbit-fall/recipes/build-assets.mjs
node assets/games/orbit-fall/recipes/build-audio.mjs
node assets/games/orbit-fall/recipes/verify-assets.mjs
node assets/games/orbit-fall/recipes/verify-audio.mjs
```

需要已安裝、鎖定的 `games/orbit-fall/node_modules/three@0.180.0`。產物全部位於 `public/games/orbit-fall/` 的本款指紋範圍。私人歷史環境快照不隨公開子集提供；本子集的verify-assets已裁去該環境檢查，不宣稱環境不變。

## 執行契約

先 `await loadAssetLibrary()`，再呼叫 `createRoomKit(theme)`、`createAstronaut()`、`createDevice(kind,state)`；正常路徑讀取本地 GLB。回傳值列出任何 GLB 載入失敗；相同來源的程序模型只作可觀測的 fallback。

`createRoomKit` 支援 airlock、maintenance、habitat、core；房間 x = −9…9、y = 0…8、z = −8…8。房間套件不含動態光源，由場景限制光照預算。重複地板、牆板、柵格、標線及伺服器燈帶採 InstancedMesh。一次只呈現玩家所在房，低畫質降低陰影與 DPR。所有模型使用單一低多邊形 LOD；不以平面替代。

設備 kind：crate、receiver、mirror、gate、oxygen、console、leak、arc、debris、magnetic、tether、beacon、memory。設備原點在底座中心，貨箱幾何中心 y = .7；若物理原點在中心須設定模型位置 `body.y − .7`。`setDeviceState` 支援 offline、ready、active、powered、complete、danger。`animateDevice` 驅動門片、訊號裝置與視覺危險；它不改動遊戲規則。

太空人原點在髖部，腳底約 y = −.95，頭頂約 y = 1.08；`animateAstronaut(group,state,time,dt)` 使用保留的 GLB AnimationClip。狀態 idle、thrust、brake、anchored、damaged。物理控制位移；動畫不含 root motion。

GLB 複本共用 geometry 與初始材質；設備燈光狀態為每個實例獨立材質。`disposeObject` 停止角色動畫、釋放獨立狀態材質並移除場景物件；不破壞其他複本。整個遊戲離開時使用 `disposeAssetLibrary()` 釋放共用幾何與材質。fallback 程序物件會額外釋放它自己的幾何。

`AudioEngine` 提供 unlock、setVolumes、setPaused、setHidden、play、update、dispose。unlock 必須來自使用者手勢；`ready` 與 `loadErrors` 可供診斷。update 接收 0…1 推進強度。setPaused(true) 靜音背景與推進，仍容許 signal、ending、fail、success、click 短提示完整播放；音量修改不能解除背景靜音。切頁時 setHidden(true) 才 suspend AudioContext，返回 setHidden(false) 後仍保留選單的 paused 狀態。這些方法不會自行建立 AudioContext。音樂、音效皆可設為零。音訊沒有外部 URL 或帳號相依。

## 資產預算

初始模型 GLB 約 1.4 MB、音訊約 1.81 MB（十進位），另有約 0.2 MB Three.js 載入工具與少量模型程式。實際值以 manifest 為準。四種艙室各約 4,100–4,500 三角形，太空人 2,918 三角形、一套骨架；最大設備是電弧裝置 3,376 三角形。未使用貼圖，貼圖 GPU 記憶體為零；每個房間組合的 draw calls 與實際 GPU 記憶體由整合場景的 renderer.info 量測。

本資產包不宣稱十維驗收或手機效能通過；獨立 reviewer 必須使用同 build 的完整遊戲實際驗證。
