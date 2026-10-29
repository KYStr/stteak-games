# Neon Drift RC3 r2 — 單款可維護交付

這是 Neon 的精確來源子集，不是完整八款 monorepo。遊戲版本 `1.0.14-rc.3`，build `neon-drift-audio-lifecycle-20261028-rc3`。本次只補交文件及 runtime 的回滾 metadata；不改遊戲 JavaScript、資產、音樂、物理或平衡。舊 RC3 r2 品控維護性 86 保持原紀錄，新文件交付待獨立評估，其他品質面向未測不算通過。

## 隨包入口

- [重建、架構與內容擴充](docs/DEVELOPMENT.md)
- [資產契約、來源與權利界線](docs/ASSETS-AND-RIGHTS.md)
- [交付、回滾與限制](docs/DELIVERY.md)
- [Three.js 原 MIT 授權](public/games/neon-drift/THREE-LICENSE.txt)

可編輯程式在 `games/neon-drift/src/`；可直接服務的已建置檔案在 `public/games/neon-drift/`。交付包另附 `runtime/`（17 執行/資產/授權檔、1 .gitattributes 加 1 release.json）及完整 `rollback-runtime/`。路徑相對此來源根；不要從 file:// 開遊戲。

## 最小重建（供在獲准環境使用，本輪未安裝或啟動服務）

Node.js >=22.12、npm；依 `games/neon-drift/package-lock.json` 固定 Three.js 0.170.0、esbuild 0.25.0 與平台 binary。

```sh
npm ci --prefix games/neon-drift --no-audit --no-fund
npm run build --prefix games/neon-drift
npm test --prefix games/neon-drift
```

安裝會使用 lock 內 registry URL/integrity 並涉及網路及 esbuild 正常安裝程序；這是需自行授權的重現操作，不是離線安裝承諾。已備依賴時，只重打既有資產 bundle：`node games/neon-drift/tools/build.mjs`。完整 `npm run build --prefix ...` 會先重新生成模型/音訊；不要在凍結交付目錄內試作，先另複製。

根 `package.json`/lock 是保留的歷史 monorepo metadata；其中 `scripts/public.mjs` 不在這份單款子集中，**不要執行根 npm setup/build/test/dev**。以上單款命令才是本包入口。未把不存在的其他七款或 root scripts 冒稱隨包。
