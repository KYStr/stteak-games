# Orbit / Fall 0016 — public-source.2

這是從 delivery-docs.2 裁出的公開來源準備子集，不是原交付包、不是新玩法版本，也沒有沿用原交付的評分或驗收身份。目前尚未發布。內部遊戲 build label 仍為 `orbit-fall-0016-failure-return-cloud-candidate-1`；公開82檔有81檔原bytes不變，僅 `vendor/rapier.mjs` 前置醒目修改通知，其新hash與aggregate見manifest，不能冒稱原runtime全byte相同。

- [BUILD-CONTRACT.md](BUILD-CONTRACT.md)：standalone retained-source 建置與依賴契約。
- [CONTENT-EXTENSION.md](CONTENT-EXTENSION.md)：只在副本新增挑戰的教學與限制。
- [ASSET-PROVENANCE.md](ASSET-PROVENANCE.md)：原模型、合成音訊與授權來源。
- [KNOWN-LIMITS.md](KNOWN-LIMITS.md)：缺少的上層平台與原生驗證。
- [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)：第三方授權檔。
- [PUBLIC-DELIVERY-NOTES.md](PUBLIC-DELIVERY-NOTES.md)：本子集的裁剪與身份界線。
- `PUBLIC-SOURCE-MANIFEST.json` 核本子集；`runtime-manifest.json` 核本public-source.2的82檔runtime集合。

主入口是 `public/games/orbit-fall/index.html`，由靜態 HTTP(S) origin 提供；ES modules 不支援直接 file:// 執行。Runtime 不需 npm/CDN，但作者工程使用 Three/Rapier，並非零依賴。此包不是完整 React/Vite 平台，不能以網站根 build 取代專屬契約。

0016只在失敗挑戰頁增加「放棄本次挑戰，返回故事」；舊版已有經重試及菜單返回的路徑，故不是softlock修復。本次.2只增加Rapier檔內修改通知；剝掉新增comment後與.1逐byte相同，不改可執行程式、物理或存檔schema。
