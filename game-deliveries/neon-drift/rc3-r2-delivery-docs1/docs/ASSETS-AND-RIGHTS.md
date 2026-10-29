# 資產契約與權利來源

不以本文件重新授權第三方，也不把原創聲明擴張為公有領域。精確來源隨包：

- [模型/碰撞 manifest](../assets/games/neon-drift/manifest.json)。
- [音訊 manifest](../assets/games/neon-drift/audio-manifest.json)。
- [原始 vehicle-kit 生成記錄](../assets/games/neon-drift/generation/vehicle-kit.md)，原封不改從2026-10-26 bootstrap ZIP取回，精確provenance在交付根 PROVENANCE.json。
- [Three.js 0.170.0 MIT 原文](../public/games/neon-drift/THREE-LICENSE.txt)，runtime同檔保留；bundle法定註解不移除。

上列 manifests 包含每資產 id/version/source/runtime/SHA256、provenance、spec與budget，不能只靠檔名驗。模型來源 `assets/games/neon-drift/sources/models.js`，單位米、+Y向上、+Z前進；車輛原點在道路接觸中心，環境基底中心。三車 glTF 自帶buffer，具命名輪組、材質槽與動畫；colliders三個JSON分別對應。剛體車無skinning骨架，不把它描述成缺骨架素材或用平面圖取代3D。

13個runtime資產：6個glTF（3車+3環境）、3碰撞JSON、4 WAV（music/click/impact/success）。generated→public assets保持相對目錄；HTTP供應必須保留資產與Three授權檔。音訊manifest記錄22050Hz單聲道16bit PCM、loop及gain等，各檔依實際manifest核對，勿假定全部duration相同。

權利僅引用原資料：manifest稱模型/材質為原創程序生成、不用第三方模型/紋理/logo/font；音訊manifest稱原創作曲與合成、無第三方sample；vehicle-kit說原資產隨專案分發、不宣稱public domain。root package的MIT宣告及舊README之作者聲明是歷史來源，這份子集不臆造額外授權書或取得新權利。若要另行分發原創資產，應保留這些原條款並向權利人釐清超出「隨專案分發」之範圍。

three/esbuild依賴由lock的registry及integrity辨識，安裝後各套件LICENSE亦須遵循；本包不重新分發node_modules，不以現有cache稱離線可攜依賴包。若加入外部資產，需另附可核實來源/授權/版本/hash，不能沿用本案original-procedural聲明。
