"""File assembly only. Does not execute game code, tests, servers or browsers."""
from pathlib import Path,PurePosixPath
import sys,json,hashlib,tarfile,io
sha=lambda b:hashlib.sha256(b).hexdigest()
cap,overlay,out=map(Path,sys.argv[1:]);source=Path(__file__).parent/'BASELINE-SOURCE-MANIFEST.json'
b=cap.read_bytes();assert len(b)==1424273 and sha(b)=='87668e558b03137ea9bb2ecb1c633237314d5169e84459da105e84f6fcd5cad8'
sb=source.read_bytes();assert sha(sb)=='2b2b17c3c2e4ff74248ba53273970745c2c1713af67c296aa4716b0b43278b51'
g=overlay.read_bytes();assert len(g)==700073 and sha(g)=='9b4fbae404aad2136937c21059b001011582eb9bfb093ba1566a4fd0e58ba57f'
assert not out.exists(); original=json.loads(sb)['files'];assert len(original)==78
with tarfile.open(fileobj=io.BytesIO(b),mode='r:gz') as tf:
 ms=tf.getmembers();assert len(ms)==78 and {x.name for x in ms}=={x['path'] for x in original}
 data={}
 for m in ms:
  q=PurePosixPath(m.name);assert m.isfile() and not q.is_absolute() and '..' not in q.parts and str(q)==m.name
  v=tf.extractfile(m).read();e=next(x for x in original if x['path']==m.name);assert len(v)==e['bytes'] and sha(v)==e['sha256'];data[m.name]=v
old=data['game.js'];assert sha(old)=='41dcb538ebbce62f7c9abc9fb4f5837933097d51947b613c0192ff3ec146e9e1';data['game.js']=g
out.mkdir(); rows=[]
for e in original:
 n=e['path'];v=data[n];p=out/'runtime'/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(v)
 ref=e['source'] if n!='game.js' else {'commit':'8b2cdfc72c03b1d450460ccbfc5e973491037230','path':'game-deliveries/tidebound/clock-r2-source.1-20261101/runtime/game.js'}
 rows.append({'path':n,'bytes':len(v),'sha256':sha(v),'source':ref})
(out/'rollback').mkdir();(out/'rollback/game.js').write_bytes(old)
r={'candidateId':'tidebound-clock-r2-full-assembly-20261101','repository':'KYStr/stteak-games','fileCount':78,'servedBytes':sum(x['bytes'] for x in rows),'sourceManifestCommit':'fab368a0d99808d26a9b747d2a1797e46b5f8e5a','baselineCapsuleCommit':'99b83ef5e6fc7b4943bf028321984bf90fbffde5','baselineCapsulePath':'qa-runtime/tide-time-ledger-served78-diag1.tar.gz','replacementCommit':'8b2cdfc72c03b1d450460ccbfc5e973491037230','changedRuntimeFiles':['game.js'],'files':rows}
(out/'RUNTIME-MANIFEST.json').write_text(json.dumps(r,indent=2)+'\n')
assert all((out/'runtime'/x['path']).read_bytes()==data[x['path']] for x in rows)
print(json.dumps({'files':78,'servedBytes':r['servedBytes'],'unchanged':77,'changed':['game.js'],'readbackEqual':True,'gameExecuted':False}))
