# Orbit / Fall 資產設計紀錄

建立日期：2026-10-25。製作者：Orbit / Fall asset maker。

全部視覺模型由可編輯 JavaScript 參數與幾何配方建立，沒有使用圖像生成、外部模型、商業遊戲角色、商標或來源不明音訊。Three.js 0.180.0 的基礎幾何、GLTFExporter、GLTFLoader、SkeletonUtils 與 BufferGeometryUtils 依 MIT 授權使用。音訊為本專案原創的確定性 PCM 合成，未使用取樣包、錄音或語音模型。

設計方向為冷白陶瓷外殼、深藍黑壓力結構、琥珀修復指示與少量青綠生命系統。艙室保留實際體積、結構肋、門框、管道、地板溝槽與設備連接位置。四種艙室套件供十二房間重用；前牆、上層側牆與天花板是截面呈現，房間碰撞邊界仍是 18 × 8 × 16 公尺。

太空人採 `orbit-suit-v1` 骨架，11 個骨節。壓力衣為 SkinnedMesh，硬殼、手臂及腿部固定在骨節；動畫為 idle、thrust、brake、anchored、damaged。統一 +Y 朝上、+Z 向前、公尺尺度；太空人原點在髖部、設備原點在底座中心。所有動畫無 root motion，遊戲物理持有位置權威。

材質使用未貼圖的 PBR 參數，保留基礎幾何的 UV。沒有烘入陰影、文字、光照或依賴 billboard 的主要物件。這批素材不需貼圖；未謊稱存在 normal/base-color 紋理。GLB 保留幾何、UV、PBR、骨架與 clips；碰撞體另以 JSON 儲存。

原創音訊包含 24 秒循環氛圍、2 秒推進循環與 13 個短事件。24 kHz、單聲道、16-bit PCM WAV。設計以低頻柔和機械聲與有限的和聲提示降低疲勞；重要提示必須由遊戲 UI 同步呈現。AudioEngine 最多 16 個事件聲道，低氧提醒至少間隔 8 秒，音樂與音效獨立調整。1.0.1 修正選單暫停為靜音背景與推進、保留短結果提示，切頁時才 suspend AudioContext；離開時完整釋放。

生成工具未使用隨機圖像服務，無 ImageGen prompt 或 seed。音訊噪聲 PRNG 種子與數學配方在 `sources/sound-synthesis.mjs`。所有素材可從保留原始碼重建。程式驗證只證明檔案、幾何、骨架、雜湊、PCM 與循環連續性，不能取代實際畫面、聆聽或真機品質驗收。
