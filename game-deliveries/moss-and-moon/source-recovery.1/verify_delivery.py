from pathlib import Path
import json,hashlib
p=Path(__file__).resolve().parent
h=lambda b:hashlib.sha256(b).hexdigest()
m=json.loads((p/'PACKAGE-MANIFEST.json').read_text())
entries=list(p.rglob('*'))
assert not any(x.is_symlink() for x in entries), 'symbolic links are not allowed'
actual={x.relative_to(p).as_posix() for x in entries if x.is_file() and x.relative_to(p).as_posix()!='PACKAGE-MANIFEST.json'}
assert actual=={x['path'] for x in m['files']}, 'unexpected or missing file'
for x in m['files']:
 b=(p/x['path']).read_bytes();assert len(b)==x['bytes'] and h(b)==x['sha256'], x['path']
s=json.loads((p/'SOURCE-MAP.json').read_text());r=[x for x in s['files'] if x['relation']=='exact-preserved-runtime']
assert len(r)==101 and sum(x['bytes'] for x in r)==11001296
root=p/'public/games/moss-and-moon'
for name in ['asset-manifest.json','audio-manifest.json']:
 a=json.loads((root/'assets/data'/name).read_text())
 for x in a['assets']:
  for rel in x['runtime']:assert h((root/rel).read_bytes())==x['sha256'][rel],rel
src=p/'assets/games/moss-and-moon/sources'
model=(src/'model-kit.mjs').read_bytes()
assert model.replace(b"'../../../../games/moss-and-moon/node_modules/three/build/three.module.js'",b"'./vendor/three.module.js'")== (root/'models.js').read_bytes()
assert h(model)==json.loads((root/'assets/data/asset-manifest.json').read_text())['sourceSha256']
assert h((src/'audio-kit.mjs').read_bytes())==json.loads((root/'assets/data/audio-manifest.json').read_text())['source']['sha256']
print('DELIVERY_INTEGRITY_OK; native, regeneration and quality NOT_RUN')
