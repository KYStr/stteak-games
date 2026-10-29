# 【逐行中文】保留原說明字串：此工具只能在新路徑重建 generated outputs，不修改交付 source。
"""New docs.1 clean generated-output recreation in a NEW path; never edit delivered source."""
# 【逐行中文】匯入路徑操作工具。
from pathlib import Path
# 【逐行中文】匯入標準庫的序列化、雜湊、複製、子程序及參數工具。
import json,hashlib,shutil,subprocess,sys
# 【逐行中文】以工具檔案位置決定唯讀來源目錄。
source=Path(__file__).resolve().parents[1]
# 【逐行中文】要求恰有一個目的路徑參數，避免隱含或錯誤的位置。
assert len(sys.argv)==2,'Usage: python tools/clean-rebuild.py /absolute/new/nonexistent-copy'
# 【逐行中文】目的路徑必須是絕對路徑且不存在；不覆蓋任何已有目錄。
work=Path(sys.argv[1]);assert work.is_absolute() and not work.exists(),'Destination must be absolute and nonexistent'
# 【逐行中文】拒絕把目的放在 source 本身或其子目錄，防止遞迴複製來源。
assert source!=work and source not in work.parents,'Destination cannot be inside source'
# 【逐行中文】要求來源尚未帶 node_modules，避免把建置後副本當乾淨交付。
assert not (source/'games/orbit-fall/node_modules').exists(),'Use original clean delivery source, not a built tree'
# 【逐行中文】先執行有限來源驗證；來源不符時直接停止，不複製或重建。
subprocess.run([sys.executable,'tools/verify-delivery.py'],cwd=source,check=True)
# 【逐行中文】把完整 source 複製到已確認不存在的新目的路徑。
shutil.copytree(source,work)
# 【逐行中文】由資產 manifest 及原建置輸出補充清單計算 generated paths；直接作者源不列入刪除。
rt=Path('public/games/orbit-fall');manifest=json.loads((source/'assets/games/orbit-fall/manifest.json').read_text());generated=set(x for a in manifest['assets'] for x in a['runtime']);generated.update(['assets/data/model-catalog.json','assets/data/audio-catalog.json','vendor/three.module.js','vendor/three.core.js','vendor/three-LICENSE.txt','vendor/rapier.mjs','vendor/rapier-LICENSE.txt','optics.js','hazards.js','assets/runtime/three-LICENSE.txt'])
# 【逐行中文】只在新副本移除這些 generated 檔，建立乾淨產物重建前提。
for p in generated:(work/rt/p).unlink()
# 【逐行中文】排定離線依賴準備、原 vendor build、原模型與音訊配方，最後驗證82runtime；不是主平台 build。
commands=[[sys.executable,'tools/prepare-offline-dependencies.py'],['node','games/orbit-fall/build.mjs'],['node','assets/games/orbit-fall/recipes/build-assets.mjs'],['node','assets/games/orbit-fall/recipes/build-audio.mjs'],[sys.executable,'tools/verify-delivery.py']]
# 【逐行中文】準備逐命令的執行紀錄列表。
logs=[]
# 【逐行中文】按既定順序逐一執行建置與檢查命令。
for cmd in commands:
 # 【逐行中文】只在新副本執行子程序，收集 stdout、stderr 與結束碼，不吞掉失敗結果。
 x=subprocess.run(cmd,cwd=work,text=True,capture_output=True);logs.append({'command':cmd,'exitCode':x.returncode,'stdout':x.stdout,'stderr':x.stderr})
 # 【逐行中文】只有最後一步也成功才標 PASS；先前步驟完成仍維持 INCOMPLETE，並保留刪除清單與邊界。
 report={'status':'PASS' if x.returncode==0 and len(logs)==len(commands) else 'INCOMPLETE','removedGenerated':sorted(generated),'commands':logs,'boundary':'retained-source build; no npm ci/platform build/GUI/gameplay suite'}
 # 【逐行中文】每一步都將當前紀錄寫入新副本的回執，便於保留失敗現場。
 (work/'CLEAN-BUILD-RECEIPT.json').write_text(json.dumps(report,indent=2)+'\n')
 # 【逐行中文】子程序失敗便顯示錯誤並以相同結束碼停止，不繼續覆寫後續產物。
 if x.returncode:print(x.stderr,file=sys.stderr);raise SystemExit(x.returncode)
# 【逐行中文】全部命令成功後輸出重建數量與回執路徑；不把此結果擴稱原生遊戲驗收。
print(json.dumps({'status':'PASS','generatedFilesRemovedAndRebuilt':len(generated),'runtimeFiles':82,'receipt':str(work/'CLEAN-BUILD-RECEIPT.json')}))
