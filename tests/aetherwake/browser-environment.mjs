import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

// SwiftShader and Chrome need writable XDG cache/config directories even when
// Playwright supplies a temporary profile. Do not depend on a writable home.
export async function browserEnvironment() {
  const directory = await mkdtemp(path.join(tmpdir(),'aetherwake-browser-'));
  const env = {...process.env};
  for (const [key,child] of [['XDG_CONFIG_HOME','config'],['XDG_CACHE_HOME','cache'],['XDG_DATA_HOME','data']]) {
    env[key] = path.join(directory,child);
    await mkdir(env[key]);
  }
  return {env,dispose:()=>rm(directory,{recursive:true,force:true})};
}
