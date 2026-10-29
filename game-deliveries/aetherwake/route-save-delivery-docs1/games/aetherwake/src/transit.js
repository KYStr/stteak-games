import { WORLD } from './world.js';

const keyOf = ({ x, y, z }) => `${x},${y},${z}`;
const positionOf = ({ x, y, z }) => ({ x, y, z });
const aboveIsland = ({ x, y, z }) => ({ x, y: y + 26, z });
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

function createNetwork() {
  const nodes = new Map(), terminals = new Map();
  const addNode = (point) => {
    const key = keyOf(point);
    if (!nodes.has(key)) nodes.set(key, { position: positionOf(point), edges: new Map() });
    return key;
  };
  const connect = (a, b) => {
    if (a === b) return;
    const length = distance(nodes.get(a).position, nodes.get(b).position);
    nodes.get(a).edges.set(b, length);
    nodes.get(b).edges.set(a, length);
  };
  for (const route of WORLD.routes.filter((entry) => entry.style === 'safe')) {
    let previous;
    for (const point of route.waypoints) {
      const key = addNode(point);
      if (previous !== undefined) connect(previous, key);
      previous = key;
    }
  }

  // Shared island endpoints merge by their full three-dimensional position.
  // Only islands absent from that network need a short island-to-route branch;
  // search the original safe nodes, never another island's new branch.
  const safeNodes = [...nodes.keys()];
  for (const island of WORLD.islands) {
    const position = aboveIsland(island), key = keyOf(position);
    terminals.set(island.id, key);
    if (nodes.has(key)) continue;
    const nearest = safeNodes.reduce((best, candidate) =>
      best === undefined || distance(position, nodes.get(candidate).position) < distance(position, nodes.get(best).position)
        ? candidate : best, undefined);
    if (nearest === undefined) throw new Error('The safe transit network has no route waypoints.');
    addNode(position);
    connect(key, nearest);
  }
  return { nodes, terminals };
}

const network = createNetwork();

/** Navigation only: no samples, rewards, gates, energy, or timing side effects.
 * The caller keeps the existing safe wind network active in either direction.
 * Returns fresh points excluding the departure centre; the destination is 26 m
 * over its island, ready for the caller to append the current course entrance.
 */
export function planSafeTransit(fromIslandId, toIslandId) {
  const start = network.terminals.get(fromIslandId), goal = network.terminals.get(toIslandId);
  if (start === undefined || goal === undefined) throw new RangeError('Safe transit requires two known island IDs.');
  if (start === goal) return [];

  const costs = new Map([[start, 0]]), previous = new Map();
  const remaining = new Set(network.nodes.keys());
  while (remaining.size) {
    let current, cost = Infinity;
    for (const key of remaining) {
      const candidate = costs.get(key) ?? Infinity;
      if (candidate < cost) { current = key; cost = candidate; }
    }
    if (current === undefined) break;
    if (current === goal) {
      const path = [];
      for (let key = goal; key !== start; key = previous.get(key)) path.push(network.nodes.get(key).position);
      return path.reverse().map((position) => ({ ...position, radius: 24, name: '安全接駁風標',
        instruction: '沿寬風廊飛向接駁標；抵島後再前往遠征入口。' }));
    }
    remaining.delete(current);
    for (const [next, length] of network.nodes.get(current).edges) {
      if (!remaining.has(next)) continue;
      const nextCost = cost + length;
      if (nextCost < (costs.get(next) ?? Infinity)) {
        costs.set(next, nextCost);
        previous.set(next, current);
      }
    }
  }
  throw new Error(`No safe transit route connects ${fromIslandId} to ${toIslandId}.`);
}
