# 缺項、限制與回滾

## 能由現有 bytes 保存

一個固定 r2 game.js、原始離線成功 JSON、來源基線引用、自查與限制文件及非自參照清單。不新增素材、依賴、物理或存檔變更。

## 尚不能聲稱具備

- 此子集沒有其餘77個 served 檔案，不是可直接打開的完整78檔遊戲包。歷史 SOURCE-MANIFEST 提供原映射，但本次未重組／重建其餘來源。
- 尚無此新來源公開 commit；尚無包含新 game.js 的新 capsule bytes/hash/commit 或新的完整 served manifest。舊 capsule 含的是舊 game，禁止移貼身份。
- 尚無重新綁定並啟用的 runner/workflow；既有隔離診斷入口仍 disabled。來源保存本身不表示可原生執行。
- 即時 CPU、頻繁 pointermove 的慢動作、視覺跳躍、focus/BFCache、聲音與原生3P均未驗。pagehide 後 disposed 行為保留，BFCache 自動恢復不承諾，可能需要正常重載。
- 最終同候選獨立品質驗收未完成；不能以離線數量或自查替代品質分數。

## 安全回滾

保留既有公開基線不覆寫。對日後另行準備的隔離完整副本，可將 game.js 還原為 BASELINE.json 的固定 C1 bytes並重新核其SHA256；第11次離線核已證16處逆 patch能精確回到該基線。此說明不是叫使用者覆寫已部署產品，也不聲稱已執行任何遠端回滾。這份來源子集不修改現有公開包／部署。
