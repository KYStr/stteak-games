#!/usr/bin/env python3
# 中文說明：首行保留 Python 執行器宣告；此工具僅讀取公開來源與雜湊清單。
from pathlib import Path  # 中文說明：用腳本位置定位快照，不依賴呼叫者工作目錄。
import hashlib, json  # 中文說明：只使用標準函式庫計算雜湊及解析公開 JSON。
ROOT = Path(__file__).resolve().parents[1]  # 中文說明：快照根目錄為 tools 的上層。
def check(entry, prefix=""):  # 中文說明：核對一筆相對路徑的既有位元組，不寫入任何檔案。
    relative = Path(prefix) / entry["path"]  # 中文說明：runtime 清單額外加上固定公開路徑前綴。
    assert not relative.is_absolute() and ".." not in relative.parts, str(relative)  # 中文說明：拒絕絕對路徑與上層跳脫。
    file = (ROOT / relative).resolve()  # 中文說明：解析符號連結後再檢查讀取範圍。
    assert ROOT in file.parents and file.is_file(), str(relative)  # 中文說明：只接受快照根目錄內的一般檔案。
    data = file.read_bytes()  # 中文說明：用原始 bytes 保留 CRLF 及二進位資料。
    assert len(data) == entry["bytes"], str(relative)  # 中文說明：核對記錄的檔案長度。
    assert hashlib.sha256(data).hexdigest() == entry["sha256"], str(relative)  # 中文說明：核對 SHA256。
    if "gitBlob" in entry:  # 中文說明：有 Git blob 記錄時加核標準 Git blob SHA1。
        blob = b"blob " + str(len(data)).encode() + b"\0" + data  # 中文說明：組合 Git 標頭、NUL 與完整內容。
        assert hashlib.sha1(blob).hexdigest() == entry["gitBlob"], str(relative)  # 中文說明：比對來源 blob 身份。
def rows(name, count):  # 中文說明：讀取指定公開清單並檢查預期筆數與路徑唯一性。
    values = json.loads((ROOT / "provenance" / name).read_text(encoding="utf-8"))  # 中文說明：僅讀本快照 provenance。
    entries = values if isinstance(values, list) else values["files"]  # 中文說明：兼容原 runtime 陣列與新的 files 容器。
    assert len(entries) == count and len({e["path"] for e in entries}) == count, name  # 中文說明：拒絕缺檔或重複清單項。
    return entries  # 中文說明：回傳待核對項目，不執行產品或 recipe。
for item in rows("preserved-files.json", 111):  # 中文說明：核對 100 產品、8 原始素材來源與 3 探針輸入。
    check(item)  # 中文說明：逐檔核長度、SHA256 與 Git blob。
for item in rows("asset-sources.json", 8):  # 中文說明：再以固定歷史來源記錄核對八份素材來源。
    check(item)  # 中文說明：此處只核 bytes，不重新取得網路來源或裁定權利。
for item in rows("runtime-assets.json", 18):  # 中文說明：核對十八份已交付素材輸出，不重生素材。
    check(item)  # 中文說明：使用相對輸出路徑核對檔案身份。
for item in rows("runtime-manifest.json", 61):  # 中文說明：保留原 runtime 清單並核對全部六十一檔。
    check(item, "public/games/dust-redemption")  # 中文說明：原清單路徑是相對 runtime，故加此前綴。
print(json.dumps({"scope": "bytes-only", "preservedFiles": 111, "assetSources": 8, "runtimeAssets": 18, "runtimeFiles": 61, "executedProduct": False, "regeneratedAssets": False}))  # 中文說明：只報告本次位元組核對，沒有功能或品質分數聲稱。
