# 【逐行中文】保留原工具說明字串：只準備精確建置輸入，不冒稱完整套件安裝。
"""New delivery-docs.1 helper: retained-source build inputs, NOT npm ci or a full Rapier package."""
# 【逐行中文】匯入實體路徑與純 POSIX 路徑工具，分別處理本地檔案與封包成員。
from pathlib import Path, PurePosixPath
# 【逐行中文】匯入標準庫的雜湊、JSON、Base64、tar 及複製工具；本工具不依賴第三方 Python 套件。
import hashlib,json,base64,tarfile,shutil
# 【逐行中文】從工具檔案位置定位 source、遊戲工程與待建立的 node_modules 目錄。
root=Path(__file__).resolve().parents[1];game=root/'games/orbit-fall';modules=game/'node_modules'
# 【逐行中文】拒絕已有依賴目錄的副本，以免混入另一版套件或覆蓋既有安裝。
assert not modules.exists(), 'Use a fresh source copy: node_modules already exists'
# 【逐行中文】讀取原遊戲鎖檔，並定位交付內保留的 Three 壓縮包。
lock=json.loads((game/'package-lock.json').read_text());archive=root/'dependencies/three-0.180.0.tgz'
# 【逐行中文】取出原鎖檔指定的完整 Three tarball integrity 字串。
expected=lock['packages']['node_modules/three']['integrity']
# 【逐行中文】重算整包 SHA512 並以 Base64 格式比對；不符即停止，不降級驗證。
assert 'sha512-'+base64.b64encode(hashlib.sha512(archive.read_bytes()).digest()).decode()==expected,'Three archive integrity mismatch'
# 【逐行中文】定位保留的 Rapier 原始 mjs，而不是修改後 runtime vendor。
original=root/'assets/games/orbit-fall/vendor-sources/rapier-0.19.0.mjs'
# 【逐行中文】核對保留 Rapier 原件固定 SHA256，拒絕同名但不同 bytes 的輸入。
assert hashlib.sha256(original.read_bytes()).hexdigest()=='1ade6875c663c1398f490d4fa67837386b2d7e0aad45fe54e9b7af52b8198a49','Rapier retained source mismatch'
# 【逐行中文】以 gzip tar 格式唯讀開啟 Three 依賴封包。
with tarfile.open(archive,'r:gz') as t:
 # 【逐行中文】取得封包成員列表，先完整檢查再開始寫入。
 members=t.getmembers()
 # 【逐行中文】逐一檢查每個成員的路徑與型態。
 for m in members:
  # 【逐行中文】用 POSIX 規則解讀封包路徑，不將成員名稱當系統命令。
  p=PurePosixPath(m.name)
  # 【逐行中文】拒絕絕對路徑、父層跳脫、錯誤根名與非一般檔案或目錄；連結類型因此不接受。
  assert not p.is_absolute() and '..' not in p.parts and p.parts[0]=='package' and (m.isfile() or m.isdir()),'Unsafe dependency member'
 # 【逐行中文】要求成員名稱唯一，避免重複項在解包時蓋過先前內容。
 assert len({m.name for m in members})==len(members),'Duplicate dependency members'
 # 【逐行中文】通過整體成員驗證後，才開始逐項解包。
 for m in members:
  # 【逐行中文】去掉封包的 package 根層，把相對內容放到隔離的 three 套件目錄。
  dest=modules/'three'/Path(*PurePosixPath(m.name).parts[1:])
  # 【逐行中文】對目錄項建立必要父層；不執行任何套件腳本。
  if m.isdir():dest.mkdir(parents=True,exist_ok=True)
  # 【逐行中文】對檔案項建立父層並寫出原封包 bytes。
  else:dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(t.extractfile(m).read())
# 【逐行中文】再核對解包後 package.json 所載版本為零點一八零點零。
assert json.loads((modules/'three/package.json').read_text())['version']=='0.180.0'
# 【逐行中文】只建立原建置所需的 Rapier 子目錄並複製精確原 mjs；沒有偽造完整 npm 套件。
rapier=modules/'@dimforge/rapier3d-compat';rapier.mkdir(parents=True);shutil.copyfile(original,rapier/'rapier.mjs')
# 【逐行中文】輸出 integrity 與原件雜湊，並明示 Rapier 僅為建置輸入子集及本工具未上網。
print(json.dumps({'status':'PASS','threeTarballLockIntegrity':True,'threeVersion':'0.180.0','rapierRetainedSourceSha256':hashlib.sha256(original.read_bytes()).hexdigest(),'rapierPackage':'build input subset only; not npm installation; only exact retained rapier.mjs','network':False}))
