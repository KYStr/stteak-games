import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {build} from '../../games/tidebound/node_modules/esbuild/lib/main.js';
test('shipped bundle, HTML, CSS and Three.js notice reproduce exactly from source',async()=>{
 const root=new URL('../../',import.meta.url),game=new URL('games/tidebound/',root),runtime=new URL('public/games/tidebound/',root);
 const result=await build({entryPoints:[new URL('src/main.js',game).pathname],bundle:true,minify:true,format:'esm',target:'es2022',write:false,legalComments:'eof'});
 assert.equal(result.outputFiles[0].text,await readFile(new URL('game.js',runtime),'utf8'));
 for(const f of ['index.html','style.css'])assert.equal((await readFile(new URL('src/'+f,game),'utf8')).replace(/\r\n/g,'\n'),await readFile(new URL(f,runtime),'utf8'));
 assert.equal((await readFile(new URL('node_modules/three/LICENSE',game),'utf8')).replace(/\r\n/g,'\n'),await readFile(new URL('THREE-LICENSE.txt',runtime),'utf8'));
});
