# 重建與內容擴充

所有命令從來源根執行；先複製到新的工作目錄，禁止覆寫交付 freeze。根目錄不是完整 monorepo，單款入口如下。

## 可重建依賴與輸出

`games/neon-drift/package.json` 及同層 lock 固定 `three@0.170.0`、`esbuild@0.25.0`（含各平台 optional binary 與 integrity）。Node >=22.12。使用 README 的單款 npm ci，再 `npm run build --prefix games/neon-drift`。後者依序執行：

1. `node games/neon-drift/tools/generate-assets.mjs`：從 `assets/games/neon-drift/sources/models.js` 產生 generated/models、colliders 及 manifest。
2. `node games/neon-drift/tools/generate-audio.mjs`：依音樂配方產生 generated/audio 及 audio-manifest。
3. `node games/neon-drift/tools/build.mjs`：esbuild ES2022 ESM minify、main.js→`public/games/neon-drift/game.js`，複製 index/style、Three LICENSE 與 generated 資產。

只改邏輯且保留既有資產時可直接跑第3步。建置不產生交付層 `runtime/release.json`，也不部署。部署或發布另需批准。輸出與交付 manifest 比對，不可只看檔名/版本。

`npm test --prefix games/neon-drift` 執行隨包 tests/games/neon-drift 的 js/mjs 測試；是 CPU/替身回歸，不等於原生 GUI、實聽、效能或完整品質通過。本輪文件補件未重跑產品測試。歷史 QC2 隔離 generators/build 與擴充測試是既有證據，不能換標成新執行。

## 結構

- `content.js`：車輛、配色、貼花、rawTracks、buildTrack、challenge 派生；`physics.js`：固定120Hz物理/過點/圈數規則。
- `main.js`：正常 UI 與局生命期協調；`input.js`：按鍵與焦點釋放；`storage.js`：驗證/主備份/成績持久化。
- `renderer.js` 與 `assets/games/neon-drift/sources/models.js`：Three 場景及共用幾何來源；`audio.js`：WAV及fallback、音量bus、跨局success失效；其餘模組依檔名負責bridge/diagnostics。

## 加一條賽道，不改主循環

在 `games/neon-drift/src/content.js` 的 `rawTracks` 新增資料物件。先複製一條既有紀錄到隔離分支，換唯一 `id`；填 name/subtitle/theme/difficulty/description/width、至少足夠形成非退化閉環的 `nodes` `[x,y,z]`。單位米，+Y向上、+Z前進；避免相鄰點重合、過窄、自交或坡度驟變。theme 沿用已有 harbor/skyway/oldtown 才不引入新素材要求。

`medals.time` 與 `medals.drift` 各三門檻，沿用既有排序意義；可選 shortcutRange 為路線比例範圍，shortcutOffset 為米。不要變更舊 id 以免既有存檔失去鍵映射。buildTrack 自動編譯路線/每圈8 checkpoint，TRACKS 從 rawTracks 派生；createChallenges 自動形成 `id-time` 雙圈計時與 `id-drift` 120秒漂移。difficulty 已是資料欄位，不需按索引加主循環分支。

驗收新增內容：先核唯一id/可編譯非零長度與所有checkpoint；重新build，再以正常可見UI選新卡、按順序過每圈8點、兩圈合計16點完成、結算保存、原入口重載讀回。不得直接設state/完成旗標當通關。CPU測試只能證規則；畫面、可駕駛性、兩種模式、手感/效能需要另做正式GUI驗證。移除試作資料並重建後逐檔比對原來源/runtime，不能把試作混入交付包。

加車先從 CARS 的穩定唯一id/尺寸/物理參數開始，再同步 models.js 的幾何命名及collider、生成manifest與選單/保存驗證。不可只加卡片文字而沒有模型、碰撞契約或可用控制。加音效須修改generate-audio.mjs配方，重新生成audio-score/manifest與audio.js正確路由，保留SFX bus跟隨靜音、跨局resetSuccess取消排程；同局pause尾音不是既定bug。
