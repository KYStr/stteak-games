# Signal Zero 原創程序模型紀錄

製作日期：2026-10-25。來源：本款 GDD 與專案 ASSET-STANDARD。無外部角色、品牌、素材下載或生成圖片。

視覺方向是深藍黑防護布料、藍灰金屬分件、薄荷青功能光與洋紅資料光。主角包含面罩、胸甲、腕部操作器、背包與腿甲，避免以單一盒體代替成品角色。保全包含帶鏡頭遮光罩及旋轉支架的攝影機、四旋翼與保護環的無人機、鰭片散熱的雷射發射器，以及琥珀識別的護甲守衛。場景模組保留櫃體通風格柵、螺栓、平台接縫、門框導軌、梯子固定架、終端鍵盤和資料晶片接點。

所有造型來自 `games/signal-zero/src/models.js` 的原創幾何構成；匯出配方會保存完全相同的可編輯來源至 `sources/procedural-models.js`，沒有另藏的建模工程。Three.js 的原始幾何建立 UV、法線與索引；PBR 使用 metalness/roughness/emissive 常數，沒有需要追蹤來源的貼圖。細節不是烘焙圖片或 billboard。

角色使用 21 個命名 Bone（包含四個手腳掛點），各部位頂點以權重 1 綁定到對應骨骼。這是刻意採用的硬表面分件骨架，不會在關節處把護甲拉伸。腳底 pivot、本地 +X 前方、+Y 向上、公尺單位。主角身高約 1.65 公尺。骨架／動畫可由 GLB 匯入一般 DCC 工具，包含九組主角動作與原地 root-motion 契約。守衛另有 patrol、notice、search、chase；電子保全各有 idle、alert、disabled。

可重建指令（從專案根目錄）：

```powershell
node assets/games/signal-zero/recipes/export-assets.mjs
```

依賴專案自有 `games/signal-zero/node_modules/three` 的鎖定版本 0.180.0；先按該目錄 package-lock 安裝依賴。配方以 GLTFExporter 產生二進位 GLB，隨即 GLTFLoader 回讀，檢查動畫及骨架、計算真實 SHA-256、位元數與幾何統計。runtime 以同源程序建立模型，GLB 是供重用的正式衍生資產，正常遊戲不額外下載它們。
