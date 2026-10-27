import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const source=new URL('../../../assets/games/tidebound/',import.meta.url),runtime=new URL('../../../public/games/tidebound/',import.meta.url);
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
test('all 33 original model exports have retained sources, exact hashes and separate colliders',async()=>{
 const manifest=JSON.parse(await readFile(new URL('manifest.json',source),'utf8'));
 assert.equal(manifest.assets.length,33);
 for(const a of manifest.assets){assert.ok((await stat(new URL(a.source,source))).size>0);assert.ok(a.provenance.rights);assert.equal(a.spec.up,'+Y');assert.ok(a.spec.triangles>0);assert.ok(a.runtime.some(f=>f.endsWith('.glb')));assert.ok(a.runtime.some(f=>f.endsWith('.collider.json')));for(const p of a.runtime){const bytes=await readFile(new URL(`assets/${p}`,runtime));assert.equal(hash(bytes),a.sha256[p],a.id);}}
});
test('seven original sounds have editable PCM sources, matching runtime bytes and meaningful levels',async()=>{
 const assets=JSON.parse(await readFile(new URL('audio-manifest.json',source),'utf8'));assert.equal(assets.length,7);
 for(const a of assets){const raw=await readFile(new URL(a.source,source)),bytes=await readFile(new URL(a.runtime[0],runtime));assert.equal(raw.toString('ascii',0,4),'RIFF');assert.equal(hash(raw),hash(bytes));assert.equal(hash(bytes),a.sha256[a.runtime[0]]);assert.equal(bytes.readUInt32LE(24),22050);let peak=0;for(let i=44;i<bytes.length;i+=2)peak=Math.max(peak,Math.abs(bytes.readInt16LE(i)));assert.ok(peak>100&&peak<32767,`${a.id}: silent or clipped`);assert.ok(a.provenance.rights);assert.ok(Math.abs(a.spec.peakDbFS-20*Math.log10(peak/32768))<.011);}
});
test('byte-exact runtime checkout policy and local bundled module prevent mutable external dependencies',async()=>{
 const attributes=await readFile(new URL('.gitattributes',runtime),'utf8');assert.match(attributes,/\* -text/);
 const html=await readFile(new URL('index.html',runtime),'utf8');assert.match(html,/<script type="module" src="\.\/game\.js"/);assert.doesNotMatch(html,/<(?:script|link)[^>]+(?:src|href)="https?:/);
 const bundle=await readFile(new URL('game.js',runtime),'utf8');assert.doesNotMatch(bundle,/\bimport\s*\([^)]*https?:/);assert.doesNotMatch(bundle,/fetch\s*\([^)]*evidence\//);assert.ok((await stat(new URL('THREE-LICENSE.txt',runtime))).size>500);
});
