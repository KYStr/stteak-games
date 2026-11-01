# Signal Zero 區域地標候選版 1.1

原創程序幾何，2026-10-25。入口為 `createSetpiece(type, options={})`，type 支援 city／archive／core；options.color 只覆寫功能光，其餘共用 PBR palette。與 1.0 的 runner、security、prop、animation 和 disposal API 相容。

三個地標都以公尺、+Y 向上、底部中心 pivot 建立，包圍盒小於 8 × 8 × 3 m。建議根節點置於遊戲平面後方 z=-5。它們的 userData 明示 decorative=true、collidable=false、standingSurface=false，不能當作平台、碰撞或安防遮擋來源。

- city：高壓變壓器、三組帶盤絕緣子、雙冷卻管路、支架與大型護網軸流風機。3,236 triangles、4 draw calls。
- archive：三座不同高度的玻璃資料塔、真實內部資料匣、光學垂直導軌、金屬框與跨塔架。1,416 triangles、7 draw calls。玻璃為共享透明 MeshStandardMaterial，不依賴貼圖或昂貴的 transmission 場景拷貝。
- core：有真正前後深度的三組同軸線圈、八片分段屏蔽塊、反應腔、徑向支架與兩側散熱穩定器。1,660 triangles、5 draw calls。

所有原始零件在建構時依材質合併；沒有每幀幾何或材質配置，也沒有文字、字型或圖片依賴。根節點與產生的 instance resources 支援現有 disposeInstance 清理。

`sources/procedural-models-candidate.js` 保存地標製作時的來源快照；`sources/procedural-models.js`、manifest 與 public 已在完整候選中同步匯出。全部 14 個 GLB 合計 954,660 bytes。`recipes/export-assets.mjs` 包含三個 environment 定義、非碰撞代理、尺寸與 draw/triangle 斷言；唯一模型編輯來源仍為 `games/signal-zero/src/models.js`。

Source-only 驗證與預覽（不寫 public）：

```powershell
node assets/games/signal-zero/recipes/verify-landmarks.mjs
node assets/games/signal-zero/recipes/render-preview.mjs --landmarks
```

結果在 `generation/landmark-validation.json`、`generation/landmark-render-validation.json` 與 `generation/landmark-contact-sheet.png`。Edge/SwiftShader 實際渲染無 JavaScript 錯誤；12 輪全地標建立／渲染／清理後，GPU geometry 始終回到 16。這些是來源和渲染檢查，不是 Reviewer 或真機性能驗收。

主製作者允許更新候選 runtime 後，於專案根目錄按順序統一匯出：

```powershell
node games/signal-zero/build.mjs
node assets/games/signal-zero/recipes/export-assets.mjs
node assets/games/signal-zero/recipes/export-audio.mjs
node assets/games/signal-zero/recipes/verify-manifest.mjs
```

最後再使用平台既有 `scripts/game-build-hash.mjs` 產生候選版整體指紋。上面第一個指令將新的 models.js 複製至 runtime；第二個產生全部 14 個 GLB 及同步來源／manifest；第三個讓音訊來源與剛建置的 runtime 雜湊保持一致；第四個檢查整份清單。
