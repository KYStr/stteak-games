# 原始素材來源、輸出與剩餘缺口

## 固定來源，不以同名冒稱同版

八個可編輯來源固定於 `KYStr/stteak-games` commit **469102e4ba891a8620d5971df29064ab13300464**，逐檔 URL、bytes、SHA256、Git blob 在 `provenance/asset-sources.json`。這些是原始來源的位元組副本，不是從輸出逆造，也不是移動 main 上的同名猜測。

| 原始檔（相對 assets/games/dust-redemption） | 關係 |
|---|---|
| audio/generate.mjs + audio/sound-project.json | 原 deterministic PCM 合成器與設計值，seed 193749，11 效果，44.1 kHz mono PCM16，並輸出 audio manifest |
| audio/manifest.json | 每份 WAV 的原 SHA256／bytes，與 runtime 音訊 manifest 相同 |
| recipes/build-frontier-kit.mjs + sources/palette.json | 原程序幾何、骨架／動畫曲線、貼圖公式與顏色；輸出 GLB、rig、colliders、三張 PNG 及主 manifest |
| generation/production-record.md | 原創作／權利聲明及軸向、骨架、材質、效能界線 |
| manifest.json | 模板／節點、材質、單位、輸出 hash、來源與 LOD 規則 |
| field-props/manifest.json | field-props.js 機械／來源映射，保留原 CRLF 位元組 |

field-props 的 `sourceSha256` 為 `ef45eda0d893b147de737b75b05da8538408953393820bb338f069046bc3d1a4`，對應交付 authored `field-props.js`（22780 bytes）；不要把此映射擴張為所有後來任務 props 的獨立驗證。

`provenance/runtime-assets.json` 列出 18 個實際輸出（11 WAV + audio manifest + GLB + rig + colliders + 3 PNG），逐檔映射原 recipe／editable input／record。這是來源與 bytes 對應，不是本次重新生成結果。

## 編輯／再生方式與安全界線

音訊改原 sound-project／generate，模型／貼圖改原 palette／build-frontier-kit。GLB 是輸出容器，不冒稱另有 .blend 或重建出的 DCC 原工程。

將本快照複製到全新可丟棄目錄，在副本的 `games/dust-redemption/node_modules` 備妥 lock 相符的 Three 0.180.0。從副本根目錄才執行：
```sh
node assets/games/dust-redemption/audio/generate.mjs
node assets/games/dust-redemption/recipes/build-frontier-kit.mjs
```
兩命令會寫入該副本的輸出／manifest，不能對原快照執行。先保留副本原始 hash，生成後逐檔比對 18 輸出及主 manifest；有修改來源時應檢查預期差異，而不是宣稱必須相等。這些是供日後使用的命令，本次未執行。

公開 `tools/verify-public-source.py` 只核既有 bytes，無生成、安裝、網路、GUI 或聽音。它不是舊素材自測的重生功能，也不讀取私人報告。

## 物件契約與授權

23 個註冊模板及 collider key 在 manifest；rig 列九個角色模板、各九 clip、weaponSocket、bind pose 與 crossfade 0.12 s。meters、+Y up、+Z forward、base-center pivot、無 root motion。複製 skinned template 使用 bundled SkeletonUtils.clone；彈藥／命中由遊戲規則決定，reload-visual 不是交易提交。

五個材質槽及三張 128×128 RGBA8／sRGB 程序 PNG 的原公式保留；vertex colors 提供色相。collider 是簡化移動／遮蔽契約，不證明所有命中體積正確。保留原 low-poly／instancing／遠處省略策略，不宣稱另有低階 mesh 或裝置效能測量。

音訊原聲明為 CC0-1.0；模型／貼圖原聲明是專案原創、隨專案重用／修改，不一律改成 CC0。Three 0.180.0 原 MIT 文字保留。這是保留來源聲明，不是獨立法律保證。

## 明確未交付的歷史檔案

原 manifest／rig 引用 `recipes/verify-frontier-poses.mjs` 和 `generation/pose-verification.json`，但它們不在固定原始 commit 對應目錄。此快照不提供、不仿造，也不聲稱重跑歷史 pose 驗證。這是確切來源／證據缺口；即使 bytes 相同，也不能替代它。
