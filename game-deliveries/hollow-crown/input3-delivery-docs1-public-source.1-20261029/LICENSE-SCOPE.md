# License scope — Hollow Crown input.3 delivery-docs.1

本文件只說明本次 **Hollow Crown 單款來源交付**。[README](README.md) 已在此公開準備 subset 收斂為單款操作；本包沒有其他七款的來源、launcher 或其素材。產品 runtime 仍是 `hollow-crown-input-20261028-03` / `1.0.0-rc.10-render.4-input.3`；`delivery-docs.1` 只是文件封包識別，不是新 runtime 版本。

## 已有的第一方程式碼授權

[LICENSE](LICENSE) 是既有 **MIT License — Copyright (c) 2026 gent a** 的原文副本，對應原 README 已聲明的專案自有原創程式碼：Hollow Crown 的遊戲模組、資產生成程式、可攜測試與本包所保留的建置腳本。它取自既有公開倉庫的固定版本，這次只是補齊授權文本，沒有代替使用者作新的授權決定。

這個第一方 MIT 聲明**不取代** Three.js 或其他第三方套件的原授權，也不把第三方程式改標為專案所有。請保留原版權和授權全文，詳見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## 素材與非程式碼

生成素材仍依各自已有的權利／來源紀錄；生成它們的程式採第一方 MIT，**不代表每個 GLB、PNG、WAV 自動獲得 MIT、CC0 或公共領域授權**。本包沒有替素材另增廣泛的獨立再散布授權。完整索引與界線見 [ASSET-LICENSES.md](ASSET-LICENSES.md)。

原始碼授權也不授權公開帳號、憑證、私人測試報告或其他私人資料。封包外的工作區、評分或收據不是這份程式碼授權的額外公開許可。

## 可核對的既有依據

- [固定公開版 LICENSE](https://github.com/KYStr/stteak-games/blob/08e2c69b7b3bd7a070ea86865acd136214b469d1/LICENSE)：本包原文逐 byte 相同。
- [固定公開版 License scope](https://github.com/KYStr/stteak-games/blob/08e2c69b7b3bd7a070ea86865acd136214b469d1/LICENSE-SCOPE.md)：本文件只取其第一方／第三方／素材界線，範圍收斂為本包實際包含的 Crown；沒有帶入 Dust 的 CC0 或 Orbit 的 Rapier。
- [本包遊戲套件](games/hollow-crown/package.json)、[精確依賴鎖](games/hollow-crown/package-lock.json) 以及兩份素材 manifest 是本包實際元件的依據，不能以公開倉庫的其他遊戲或較新 runtime 取代。

以上是隨交付保留的既有權利資訊與來源，不是獨立權利清查保證。來源沒有給出的權利，不在此推定或補造。
