# 原資產工程與權利／規格追溯

這次不是用 runtime 反向臨摹一份「原始碼」。已從原雲端四分片 core 找回原 `assets/games/orbit-fall/`，其中 models-source.js、audio-source.js 與0016對應 runtime bytes相同；原生成 manifest 所有輸出也與0016相同。本公開子集只核保留檔案身份，沒有重新執行recipe或帶出歷史驗證報告。

| 類別 | 可編輯真來源 | 生成／使用 | 交付規格 |
|---|---|---|---|
| 四房間、太空人、13設備（18 GLB） | `sources/models-source.js` | `recipes/build-assets.mjs`；模型 runtime `models.js` | 米、+Y up、+Z forward；每個 pivot/bounds/materialSlots/UV/LOD/triangles 在 manifest |
| 模型材質 | 同一 source 中 named MeshStandardMaterial/PBR 色彩與參數 | GLB materials；沒有外部貼圖 | 無 texture bytes；不以平面替代3D |
| 骨架／動作 | 同一 source 的骨架與 AnimationClip | astronaut GLB | 11骨；idle/thrust/brake/anchored/damaged；loop/rootMotion 契約見manifest/原README |
| 碰撞與掛點 | 原recipe+object.userData.pivot/sockets/connectors | `assets/data/*-colliders.json` | capsule、box、compound；明示簡化代理/遊戲自己的hazard rules；不是僅visual bounds |
| 15 PCM WAV | `sources/sound-synthesis.mjs` deterministic score | `recipes/build-audio.mjs` | 24kHz mono16bit；loop/sample/duration/peak/rms記於manifest；沒有外部samples |
| 音訊引擎 | `sources/audio-source.js` | 複製為 audio.js | gesture unlock、分離music/SFX、paused/hidden/dispose契約見原README |
| Three工具/renderer | pinned Three0.180.0 tarball；helper原件`sources/vendor` | imports只改成本地相對路徑 | MIT notices保留 |
| Rapier | retained upstream mjs/WASM/Apache license及0014patch | 既有 build呼叫通知衍生patch，核source/call/WASM/raw及含通知output固定SHA256 | 0.19.0；既有初始化wrapper與新增檔內修改通知，公開API與WASM不變 |

上表路徑相對 `assets/games/orbit-fall/`（除 runtime、games、dependencies）。各資產 ID、version、runtime列表、hash、dependencies、author/rights/generation record在原 `manifest.json`（38筆）。原 `README.md` 是資產 API 契約；`generation/design-record.md` 是歷史作者生成說明；本包沒有自己聲稱授權來源經外部法律驗證。

原記錄聲明模型/合成為為stteak製作的 original procedural work，無第三方視覺/音訊樣本；Three與Rapier保留MIT/Apache-2.0原件。這是可核原件所載權利來源，不將存在的授權聲明當成任何第三方權利保證。舊核心包的其他遊戲概念圖不屬本focused交付，不帶入。

完整Rapier npm tarball、原上層平台同0016 commit未找回；僅本build所需精確source/WASM/license已保留。本子集不提供原平台整合/主站擴充保證，不以零依賴或無build帶過。
