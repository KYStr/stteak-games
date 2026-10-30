import test from 'node:test';
import assert from 'node:assert/strict';
import { WORLD, windWeight } from '../../../games/aetherwake/src/world.js';
import { planSafeTransit } from '../../../games/aetherwake/src/transit.js';

const xyz = ({ x, y, z }) => ({ x, y, z });
const key = ({ x, y, z }) => `${x},${y},${z}`;
const above = ({ x, y, z }) => ({ x, y: y + 26, z });
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
const length = (points) => points.slice(1).reduce((sum, point, index) => sum + distance(point, points[index]), 0);
const safeRoutes = WORLD.routes.filter((route) => route.style === 'safe');
const safePositions = [...new Map(safeRoutes.flatMap((route) => route.waypoints).map((point) => [key(point), xyz(point)])).values()];
const safeKeys = new Set(safePositions.map(key));
const edges = safeRoutes.flatMap((route) => route.waypoints.slice(1).map((point, index) => [xyz(route.waypoints[index]), xyz(point)]));
const branches = WORLD.islands.filter((island) => !safeKeys.has(key(above(island)))).map((island) => {
  const from = above(island);
  const to = safePositions.toSorted((a, b) => distance(from, a) - distance(from, b))[0];
  return { island, from, to, distance: distance(from, to) };
});
const legalEdges = [...edges, ...branches.map(({ from, to }) => [from, to])];
const edgeKey = (a, b) => [key(a), key(b)].sort().join('|');
const legal = new Set(legalEdges.map(([a, b]) => edgeKey(a, b)));

test('all 36 island pairs use a continuous safe network, omit departure, and end over the destination', () => {
  for (const from of WORLD.islands) for (const to of WORLD.islands) {
    const plan = planSafeTransit(from.id, to.id);
    if (from.id === to.id) { assert.deepEqual(plan, []); continue; }
    assert.ok(plan.length > 0, `${from.id} -> ${to.id}`);
    assert.deepEqual(xyz(plan.at(-1)), above(to));
    const points = [above(from), ...plan];
    assert.equal(new Set(points.map(key)).size, points.length, 'A shortest transfer must not circle or repeat its departure.');
    for (let index = 1; index < points.length; index++) {
      assert.ok(legal.has(edgeKey(points[index - 1], points[index])), `Illegal direct leg ${from.id} -> ${to.id}, step ${index}`);
    }
    for (const point of plan) {
      assert.equal(point.radius, 24); assert.equal(point.name, '安全接駁風標'); assert.ok(point.instruction.length > 0);
      assert.deepEqual(Object.keys(point).sort(), ['instruction', 'name', 'radius', 'x', 'y', 'z']);
    }
  }
});

test('each transfer is a minimum-distance path in the bidirectional network', () => {
  // Independent all-pairs Floyd-Warshall oracle, rather than replaying the
  // production planner's Dijkstra selection or asserting a hand-picked route.
  const points = [...new Map(legalEdges.flat().map((point) => [key(point), point])).values()];
  const indices = new Map(points.map((point, index) => [key(point), index]));
  const costs = points.map((_, i) => points.map((__, j) => i === j ? 0 : Infinity));
  for (const [a, b] of legalEdges) {
    const i = indices.get(key(a)), j = indices.get(key(b));
    costs[i][j] = costs[j][i] = distance(a, b);
  }
  for (let k = 0; k < points.length; k++) for (let i = 0; i < points.length; i++) for (let j = 0; j < points.length; j++)
    costs[i][j] = Math.min(costs[i][j], costs[i][k] + costs[k][j]);
  for (const from of WORLD.islands) for (const to of WORLD.islands) {
    const actual = length([above(from), ...planSafeTransit(from.id, to.id)]);
    const expected = costs[indices.get(key(above(from)))][indices.get(key(above(to)))];
    assert.ok(Math.abs(actual - expected) < 1e-7, `${from.id} -> ${to.id}: ${actual} versus ${expected}`);
    const reverse = length([above(to), ...planSafeTransit(to.id, from.id)]);
    assert.ok(Math.abs(actual - reverse) < 1e-7, 'Reverse navigation must have the same geometric length.');
  }
});

test('only bridge and archive use short branches; every route leg remains inside an existing safe wind volume', () => {
  assert.deepEqual(branches.map(({ island }) => island.id).sort(), ['island-archive', 'island-bridge']);
  assert.ok(branches.find(({ island }) => island.id === 'island-bridge').distance < 102);
  assert.ok(branches.find(({ island }) => island.id === 'island-archive').distance < 52);
  const safeWinds = WORLD.winds.filter((wind) => wind.style === 'safe' && wind.type !== 'crosswind');
  for (const [start, end] of edges) {
    const steps = Math.max(1, Math.ceil(distance(start, end) / 10));
    for (let step = 0; step <= steps; step++) {
      const t = step / steps, point = { x: start.x + (end.x - start.x) * t, y: start.y + (end.y - start.y) * t, z: start.z + (end.z - start.z) * t };
      assert.ok(safeWinds.some((wind) => windWeight(wind, point) > 0), `Uncovered route point ${key(point)}`);
    }
  }
});

test('plans do not leak sample requirements, mutate world data, or share mutable points', () => {
  const snapshot = JSON.stringify(WORLD);
  const first = planSafeTransit('island-camp', 'island-storm');
  const expected = structuredClone(first);
  first[0].x = 999999; first[0].instruction = 'changed'; first.pop();
  assert.deepEqual(planSafeTransit('island-camp', 'island-storm'), expected);
  assert.equal(JSON.stringify(WORLD), snapshot);
  assert.throws(() => planSafeTransit('missing', 'island-camp'), RangeError);
  assert.throws(() => planSafeTransit('island-camp', 'missing'), RangeError);
});
