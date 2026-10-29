# 【逐行中文】保留原說明字串，明示這是有限離線身分查核，不是遊戲或安全認證。
"""Finite offline identity/source/asset checks for docs.1. No gameplay/GUI/security certification."""
# 【逐行中文】匯入檔案路徑操作工具。
from pathlib import Path
# 【逐行中文】匯入雜湊、JSON、Base64 及系統標準庫，不啟動外部服務。
import hashlib,json,base64,sys
# 【逐行中文】依工具位置定位 source 與遊戲 runtime 根目錄。
root=Path(__file__).resolve().parents[1];runtime=root/'public/games/orbit-fall'
# 【逐行中文】定義共用 SHA256 函式，以十六進位字串表示檔案內容指紋。
def sha(b):return hashlib.sha256(b).hexdigest()
# 【逐行中文】定義讀取必需一般檔案的輔助函式。
def regular(p):
 # 【逐行中文】要求檔案存在且不是符號連結；這是有限檔案條件，不聲稱對抗並行置換攻擊。
 assert p.is_file() and not p.is_symlink(),f'missing/not regular: {p}'
 # 【逐行中文】回傳完整原始 bytes，讓呼叫端精確比對而非只比檔名。
 return p.read_bytes()
# 【逐行中文】讀取固定 runtime manifest，準備蒐集實際檔案清單。
expected=json.loads(regular(root/'runtime-manifest.json'));rows=[]
# 【逐行中文】依排序遞迴巡訪 runtime 項目，維持 aggregate 計算順序穩定。
for p in sorted(runtime.rglob('*')):
 # 【逐行中文】拒絕 runtime 內的符號連結。
 assert not p.is_symlink(),f'symlink: {p}'
 # 【逐行中文】記錄每個一般檔案的相對路徑、大小與內容 SHA256。
 if p.is_file():rows.append({'path':p.relative_to(runtime).as_posix(),'bytes':p.stat().st_size,'sha256':sha(p.read_bytes())})
# 【逐行中文】要求清單逐值相等，同時拒絕缺檔、多檔與內容漂移。
assert rows==expected['files'],'runtime differs (missing, extra, changed bytes)'
# 【逐行中文】依固定精簡 JSON 編碼重算 aggregate，核對整樹指紋。
assert sha(json.dumps(rows,separators=(',',':')).encode())==expected['aggregate'],'runtime aggregate'
# 【逐行中文】讀取原資產 manifest，準備統計來源與輸出路徑。
assets=root/'assets/games/orbit-fall';manifest=json.loads(regular(assets/'manifest.json'));sourcePaths=set();outputs=set()
# 【逐行中文】逐筆檢查原資產記錄。
for a in manifest['assets']:
 # 【逐行中文】解析資產來源並拒絕跳出資產根目錄；要求來源檔存在後記錄其路徑。
 p=(assets/a['source']).resolve();assert assets.resolve() in p.parents,'asset source escapes';regular(p);sourcePaths.add(a['source'])
 # 【逐行中文】逐一檢查此資產宣告的 runtime 輸出。
 for name in a['runtime']:
  # 【逐行中文】限制輸出在 runtime 根內，逐檔核雜湊後加入輸出集合。
  p=(runtime/name).resolve();assert runtime.resolve() in p.parents,'asset runtime escapes';assert sha(regular(p))==a['sha256'][name],name;outputs.add(name)
# 【逐行中文】確認可編輯模型原碼與交付 models.js bytes 相同。
assert regular(assets/'sources/models-source.js')==regular(runtime/'models.js'),'model author source mismatch'
# 【逐行中文】確認可編輯音訊引擎原碼與交付 audio.js bytes 相同。
assert regular(assets/'sources/audio-source.js')==regular(runtime/'audio.js'),'audio author source mismatch'
# 【逐行中文】要求四支原資產建置及驗證配方檔確實存在；此行不執行配方。
for name in ['build-assets.mjs','build-audio.mjs','verify-assets.mjs','verify-audio.mjs']:regular(assets/'recipes'/name)
# 【逐行中文】讀取原遊戲 package 與鎖檔，後續核對宣告的相依套件。
lock=json.loads(regular(root/'games/orbit-fall/package-lock.json'));package=json.loads(regular(root/'games/orbit-fall/package.json'))
# 【逐行中文】要求 package 與鎖檔根節點的依賴宣告完全相同。
assert package['dependencies']==lock['packages']['']['dependencies']
# 【逐行中文】要求依賴仍為固定 Three 零點一八零點零與 Rapier 零點一九點零。
assert package['dependencies']=={'three':'0.180.0','@dimforge/rapier3d-compat':'0.19.0'}
# 【逐行中文】重算 Three 全 tarball 的 SHA512 integrity，必須符合原鎖檔。
tar=regular(root/'dependencies/three-0.180.0.tgz');assert 'sha512-'+base64.b64encode(hashlib.sha512(tar).digest()).decode()==lock['packages']['node_modules/three']['integrity'],'Three tarball lock integrity'
# 【逐行中文】讀取保留 Rapier 原件與衍生物的固定指紋清單。
rp=json.loads(regular(assets/'vendor-sources/manifest.json'))
# 【逐行中文】分別核對原 mjs、原 WASM 與授權 bytes，沒有以衍生檔取代原件。
for f,k in [('rapier-0.19.0.mjs','upstreamSourceSha256'),('rapier-0.19.0.wasm','wasmSha256'),('rapier-LICENSE.txt','licenseSha256')]:assert sha(regular(assets/'vendor-sources'/f))==rp[k],f
# 【逐行中文】核對 runtime Rapier 為已申報單一修補後的固定輸出。
assert sha(regular(runtime/'vendor/rapier.mjs'))==rp['patchedRuntimeSha256']
# 【逐行中文】輸出身分、來源與依賴的有限查核結果，不把它稱為完整安全審計或原生驗證。
print(json.dumps({'status':'PASS','runtimeFiles':len(rows),'aggregate':expected['aggregate'],'assetRecords':len(manifest['assets']),'manifestOutputs':len(outputs),'sourcePaths':len(sourcePaths),'threeLockIntegrity':True,'rapierRetainedBytes':True,'boundary':'finite offline identity/source check; not complete security audit, npm install, platform build or GUI'}))
