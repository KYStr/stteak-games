import {mkdtemp,mkdir,cp,symlink,readdir,readFile,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
export async function reproduceBuild(evidence){
 const root=fileURLToPath(new URL('../../',import.meta.url)),dir=await mkdtemp(join(tmpdir(),'orbit-repro-')),out=join(dir,'public/games/orbit-fall'),game=join(dir,'games/orbit-fall');
 try{
  await mkdir(out,{recursive:true});await mkdir(game,{recursive:true});
  for(const entry of await readdir(join(root,'games/orbit-fall'),{withFileTypes:true})){if(entry.name==='node_modules')continue;await cp(join(root,'games/orbit-fall',entry.name),join(game,entry.name),{recursive:true})}
  await symlink(join(root,'games/orbit-fall/node_modules'),join(game,'node_modules'));await cp(join(root,'assets/games/orbit-fall/vendor-sources'),join(dir,'assets/games/orbit-fall/vendor-sources'),{recursive:true});
  const build=spawnSync(process.execPath,[join(game,'build.mjs')],{encoding:'utf8'});assert.equal(build.status,0,build.stderr);const hashes={};
  async function check(base,relative=''){for(const entry of await readdir(base,{withFileTypes:true})){const path=join(relative,entry.name);if(entry.isDirectory())await check(join(base,entry.name),path);else{const actual=await readFile(join(base,entry.name)),expected=await readFile(join(root,'public/games/orbit-fall',path));assert.ok(actual.equals(expected),`Isolated generated file differs: ${path}`);hashes[path]=createHash('sha256').update(actual).digest('hex')}}}
  await check(out);const result={passed:true,generatedFiles:Object.keys(hashes).length,hashes};await writeFile(new URL('build-reproduction.json',evidence),JSON.stringify(result,null,2));return result;
 }finally{await rm(dir,{recursive:true,force:true})}
}
