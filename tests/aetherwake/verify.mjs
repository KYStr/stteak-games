import { spawnSync } from 'node:child_process';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../../', import.meta.url));
const out = process.env.AETHERWAKE_EVIDENCE || '/tmp/aetherwake-acceptance';
mkdirSync(out, { recursive: true });
function run(command, args, capture = false) {
  const result = spawnSync(command, args, { cwd: root, env: process.env, stdio: capture ? 'pipe' : 'inherit', encoding: 'utf8' });
  if (capture) {
    writeFileSync(path.join(out, 'unit.tap'), result.stdout + result.stderr);
    console.log(result.stdout.split('\n').slice(-9).join('\n'));
  }
  if (result.status !== 0) { if (capture) console.error(result.stderr, result.stdout.slice(-5000)); process.exit(result.status || 1); }
}
const runtime = ['game.js','style.css','index.html','THREE-LICENSE.txt'];
const hashes = () => runtime.map(file => createHash('sha256').update(readFileSync(path.join(root, 'public/games/aetherwake', file))).digest('hex'));
const committed = hashes();
run('npm', ['--prefix','games/aetherwake','run','build']);
if (JSON.stringify(committed) !== JSON.stringify(hashes())) throw new Error('Runtime differs from source build. Rebuild and include public/games/aetherwake.');
console.log('PASS source build reproduces checked runtime bytes');
run('node', ['--experimental-vm-modules','--test', ...['bridge','rules','save-v3','transit','transit-flight'].map(name=>`tests/games/aetherwake/${name}.test.js`),'tests/aetherwake/audio.test.mjs','tests/aetherwake/timing.test.mjs','tests/aetherwake/scene.test.mjs'], true);
run('node', ['tests/aetherwake/acceptance.mjs']);
console.log('Aetherwake acceptance passed. Evidence:', out);
