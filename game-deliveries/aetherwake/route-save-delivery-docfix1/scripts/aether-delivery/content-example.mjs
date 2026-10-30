// Bounded documentation exercise: real simulation/save/model APIs; no browser.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { WORLD } from '../../games/aetherwake/src/world.js';
import { FlightSimulation } from '../../games/aetherwake/src/simulation.js';
import { SaveStore, validateSave } from '../../games/aetherwake/src/storage.js';
import { createRelic } from '../../games/aetherwake/src/models.js';
import { Box3, Vector3 } from '../../games/aetherwake/node_modules/three/build/three.module.js';

const mode = process.argv[2];
assert(process.argv.length === 3 && ['baseline', 'extended'].includes(mode), 'Usage: node scripts/aether-delivery/content-example.mjs baseline|extended');
const id = 'relic-docs-example', item = WORLD.relics.find(x => x.id === id);
const extended = mode === 'extended';
assert.equal(!!item, extended, 'Example content presence');
assert.equal(WORLD.relics.length, extended ? 13 : 12);
assert.equal(new Set(WORLD.relics.map(x => x.id)).size, WORLD.relics.length);
const sim = new FlightSimulation();
assert(sim.launch());
assert.deepEqual([sim.player.x, sim.player.y, sim.player.z], [0, 0, 0]);
for (let i = 0; i < 30; i++) sim.step({ x: 1, z: 0 }, 1 / 60);
assert.equal(sim.relics.includes(id), extended);
assert.equal(sim.drainEvents().filter(e => e.type === 'relic' && e.id === id).length, extended ? 1 : 0);
for (let i = 0; i < 30; i++) sim.step({}, 1 / 60);
assert.equal(sim.drainEvents().filter(e => e.type === 'relic' && e.id === id).length, 0);
const memory = new Map(); // Explicit storage adapter, not browser localStorage.
const storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
const store = new SaveStore(storage, 'docs-only-not-user-save');
assert(store.save(sim.saveData()).ok);
const loaded = new SaveStore(storage, 'docs-only-not-user-save').load();
assert.equal(loaded.warning, null);
assert.equal(validateSave(loaded.save).relics.includes(id), extended);
const resumed = new FlightSimulation({ save: loaded.save });
assert.equal(resumed.relics.includes(id), extended);
let bounds = null;
if (extended) {
  assert.equal(item.islandId, 'island-camp');
  assert.equal(item.icon, './assets/icons/relic-01.svg');
  assert.deepEqual([item.x, item.y, item.z, item.radius], [5, 1.4, 0, 1.2]);
  const group = createRelic(WORLD.relics.indexOf(item));
  group.position.set(item.x, item.y + 1.2, item.z); // scene.js placement contract
  const box = new Box3().setFromObject(group);
  assert(box.getSize(new Vector3()).toArray().every(v => Number.isFinite(v) && v > 0));
  bounds = { min: box.min.toArray(), max: box.max.toArray() };
  await readFile(new URL('../../public/games/aetherwake/assets/icons/relic-01.svg', import.meta.url));
}
console.log(JSON.stringify({ status: 'PASS_SCOPED_CONTENT_EXERCISE', mode, relics: WORLD.relics.length,
  steps: 60, playerX: sim.player.x, collected: sim.relics.includes(id), persisted: resumed.relics.includes(id), bounds,
  limits: ['Real simulation/SaveStore with isolated Map adapter', 'No direct position/progress/completion injection', 'CPU geometry, not rendered GUI or browser storage'] }, null, 2));
