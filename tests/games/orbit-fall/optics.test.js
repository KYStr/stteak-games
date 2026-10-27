import test from 'node:test';
import assert from 'node:assert/strict';
import { traceOptics } from '../../../games/orbit-fall/optics.js';
import { puzzles } from '../../../public/games/orbit-fall/content.js';

const reflectionPuzzles = Object.values(puzzles).filter(puzzle => puzzle.type === 'reflection');
const distance = (a, b) => Math.hypot(...a.map((value, axis) => value - b[axis]));
const subtract = (a, b) => a.map((value, axis) => value - b[axis]);
const unit = vector => vector.map(value => value / Math.hypot(...vector));
const dot = (a, b) => a.reduce((sum, value, axis) => sum + value * b[axis], 0);
const assertFinite = result => {
  for (const point of [...result.path, ...result.normals]) { assert.equal(point.length, 3); assert.ok(point.every(Number.isFinite)); }
  assert.equal(typeof result.powered, 'boolean'); assert.ok(Number.isInteger(result.hitCount));
};

test('both authored target settings form complete geometric reflection paths through actual mirror centres', () => {
  for (const puzzle of reflectionPuzzles) {
    const result = traceOptics(puzzle, puzzle.targetAngles);
    assert.equal(result.powered, true, `${puzzle.id}: ${result.reason}`);
    assert.equal(result.hitCount, puzzle.mirrorPositions.length);
    assert.equal(result.path.length, puzzle.mirrorPositions.length + 2);
    assert.deepEqual(result.path[0], [-7, puzzle.mirrorPositions[0][1], -5]);
    result.path.slice(1, -1).forEach((point, index) => assert.ok(distance(point, puzzle.mirrorPositions[index]) < 1e-10));
    assert.ok(distance(result.path.at(-1), [6, puzzle.mirrorPositions.at(-1)[1], -6]) < 1e-10);
    for (const normal of result.normals) assert.ok(Math.abs(Math.hypot(...normal) - 1) < 1e-12);
    assertFinite(result);
  }
});

test('every reflected segment obeys d - 2 dot(d,n)n and the cross-layer path changes actual Y', () => {
  const puzzle = puzzles['puzzle-reflection-2']; const result = traceOptics(puzzle, puzzle.targetAngles);
  for (let index = 0; index < result.normals.length; index += 1) {
    const incoming = unit(subtract(result.path[index + 1], result.path[index]));
    const outgoing = unit(subtract(result.path[index + 2], result.path[index + 1]));
    const normal = result.normals[index];
    const reflected = incoming.map((value, axis) => value - 2 * dot(incoming, normal) * normal[axis]);
    assert.ok(distance(reflected, outgoing) < 1e-12);
  }
  assert.deepEqual(result.path.slice(1, -1).map(point => Math.round(point[1] * 100) / 100), [1.5, 4.5, 6]);
  assert.ok(result.normals.some(normal => Math.abs(normal[1]) > 0.1), 'Cross-deck reflection requires a real tilted plane.');
});

test('one wrong discrete dial at every mirror misses the receiver and shows the escaped ray', () => {
  for (const puzzle of reflectionPuzzles) for (let index = 0; index < puzzle.targetAngles.length; index += 1) {
    const angles = [...puzzle.targetAngles]; angles[index] = (angles[index] + 1) % 8;
    const result = traceOptics(puzzle, angles);
    assert.equal(result.powered, false, `${puzzle.id} wrong dial ${index} unexpectedly powers receiver`);
    assert.ok(result.path.length >= 2); assert.ok(result.hitCount > 0);
    const end = result.path.at(-1);
    assert.ok([Math.abs(end[0]) - 9, end[1], end[1] - 8, Math.abs(end[2]) - 8].some(value => Math.abs(value) < 1e-7), 'Missed ray should terminate visibly on a room wall.');
    assertFinite(result);
  }
});

test('same-plane normal reversals allow physically equivalent +4 dial solutions without exact-number gating', () => {
  const puzzle = puzzles['puzzle-reflection-1'];
  const reference = traceOptics(puzzle, puzzle.targetAngles);
  for (const angles of [[6, 6], [2, 2], [6, 2]]) {
    const result = traceOptics(puzzle, angles);
    assert.equal(result.powered, true);
    result.path.forEach((point, i) => assert.ok(distance(point, reference.path[i]) < 1e-10));
  }
  // A tilted normal's Y component does not reverse under a Y-axis half-turn.
  // Therefore +4 must not be globally aliased for genuinely 3D mirror geometry.
  const layered = puzzles['puzzle-reflection-2'];
  const changed = [...layered.targetAngles]; changed[0] += 4;
  assert.equal(traceOptics(layered, changed).powered, false);
});

test('finite apertures accept near-centre fractional geometric hits even when no dial equals its target', () => {
  for (const puzzle of reflectionPuzzles) {
    const angles = puzzle.targetAngles.map(angle => angle + 0.01);
    const result = traceOptics(puzzle, angles);
    assert.equal(result.powered, true, `${puzzle.id}: ${result.reason}`);
    for (let index = 0; index < puzzle.mirrorPositions.length; index += 1) assert.ok(distance(result.path[index + 1], puzzle.mirrorPositions[index]) <= 0.85 + 1e-8);
    assert.ok(distance(result.path.at(-1), [6, puzzle.mirrorPositions.at(-1)[1], -6]) <= 0.9 + 1e-8);
  }
});

test('initial zero angles, missing angles, large and negative values remain finite and periodic', () => {
  for (const puzzle of reflectionPuzzles) {
    for (const angles of [undefined, [], [0, 0, 0], [NaN, Infinity, -Infinity], [1e308, -1e308, 0]]) assertFinite(traceOptics(puzzle, angles));
    assert.equal(traceOptics(puzzle, [0, 0, 0]).powered, false);
    const reference = traceOptics(puzzle, puzzle.targetAngles);
    const wrapped = traceOptics(puzzle, puzzle.targetAngles.map(angle => angle - 80));
    assert.equal(wrapped.powered, true);
    wrapped.path.forEach((point, i) => assert.ok(distance(point, reference.path[i]) < 1e-10));
  }
});

test('all 576 authored discrete combinations produce finite bounded geometry and consistent hit counts', t => {
  const totals = [];
  for (const puzzle of reflectionPuzzles) {
    let powered = 0; let tried = 0;
    const iterate = angles => {
      if (angles.length < puzzle.mirrorPositions.length) { for (let angle = 0; angle < 8; angle += 1) iterate([...angles, angle]); return; }
      const result = traceOptics(puzzle, angles); tried += 1; powered += Number(result.powered); assertFinite(result);
      assert.ok(result.hitCount >= 0 && result.hitCount <= puzzle.mirrorPositions.length);
      assert.equal(result.path.length, result.hitCount + 2);
      if (result.powered) assert.equal(result.hitCount, puzzle.mirrorPositions.length);
      for (const point of result.path) assert.ok(Math.abs(point[0]) <= 9 + 1e-7 && point[1] >= -1e-7 && point[1] <= 8 + 1e-7 && Math.abs(point[2]) <= 8 + 1e-7);
    };
    iterate([]); assert.ok(powered > 0 && powered < tried); totals.push({ id: puzzle.id, tried, powered });
  }
  t.diagnostic(`Geometric solution enumeration: ${JSON.stringify(totals)}`);
});

test('zero-length, collinear and invalid authored geometry fails without NaN or an invented powered state', () => {
  for (const puzzle of [null, {}, { mirrorPositions: [] }, { mirrorPositions: [[0, NaN, 0]] }, { mirrorPositions: [[-7, 2, -5]], targetAngles: [0] }, { mirrorPositions: [[0, 2, -5], [0, 2, -5]], targetAngles: [0, 0] }, { mirrorPositions: [[0, 2, -5], [2, 2, -5]], targetAngles: [0, 0] }]) {
    const result = traceOptics(puzzle, [0, 0, 0]); assert.equal(result.powered, false); assertFinite(result);
  }
});

test('pure trace leaves puzzle data and input angles unchanged', () => {
  const puzzle = structuredClone(puzzles['puzzle-reflection-2']); const angles = [...puzzle.targetAngles];
  const before = JSON.stringify({ puzzle, angles }); traceOptics(puzzle, angles);
  assert.equal(JSON.stringify({ puzzle, angles }), before);
});
