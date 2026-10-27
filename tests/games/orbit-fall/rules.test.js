import test from 'node:test';
import assert from 'node:assert/strict';
import { rooms, roomById, puzzles, signals, endings, decks, challenges } from '../../../public/games/orbit-fall/content.js';
import { createRun, enterRoom, grantTool, solvePuzzle, collectSignal, finishEnding, continueRun, getProgress, tick, setPaused, respawn, damage, resetPuzzle, startChallenge, recordChallenge, legalizeSnapshot, storeSnapshot } from '../../../public/games/orbit-fall/rules.js';

function equipped(mode = 'standard') {
  const run = createRun(mode);
  assert.equal(grantTool(run, 'boots').ok, true);
  assert.equal(grantTool(run, 'tether').ok, true);
  return run;
}

function completeDeck(run, deckId) {
  for (const id of decks.find(deck => deck.id === deckId).puzzleIds) {
    assert.equal(enterRoom(run, puzzles[id].roomId).ok, true);
    assert.equal(solvePuzzle(run, id).ok, true);
  }
}

test('authored content has twelve reachable rooms, six distinct puzzles, six signals, two endings and three challenges', () => {
  assert.equal(rooms.length, 12);
  assert.equal(new Set(rooms.map(room => room.id)).size, 12);
  for (const deck of decks) assert.equal(rooms.filter(room => room.deck === deck.id).length, 4);
  assert.equal(Object.keys(puzzles).length, 6);
  for (const type of ['momentum', 'reflection', 'airlock']) assert.equal(Object.values(puzzles).filter(puzzle => puzzle.type === type).length, 2);
  assert.equal(Object.keys(signals).length, 6);
  assert.equal(Object.keys(endings).length, 2);
  assert.equal(challenges.length, 3);
  for (const puzzle of Object.values(puzzles)) assert.equal(roomById[puzzle.roomId].puzzleId, puzzle.id);
  for (const signal of Object.values(signals)) assert.equal(roomById[signal.roomId].signalId, signal.id);
  assert.ok(puzzles['puzzle-momentum-2'].target[1] > 4);
  assert.ok(new Set(puzzles['puzzle-reflection-2'].mirrorPositions.map(point => point[1])).size === 3);
});

test('mission gating prevents skipped decks, remote repair, and ending before all repairs', () => {
  const run = createRun();
  assert.equal(enterRoom(run, 'room-d3-signal').reason, 'deck-locked');
  assert.equal(solvePuzzle(run, 'puzzle-momentum-1').reason, 'wrong-room');
  assert.equal(finishEnding(run, 'beacon').reason, 'repairs-incomplete');
  enterRoom(run, 'room-d1-cargo');
  assert.equal(solvePuzzle(run, 'puzzle-momentum-1').reason, 'tool-required');
  assert.equal(grantTool(run, 'tether').reason, 'tool-not-here');
});

test('full campaign reaches every room, all recordings and both complete endings', () => {
  const run = equipped();
  const visited = new Set();
  for (const deck of decks) {
    for (const room of rooms.filter(item => item.deck === deck.id)) {
      assert.equal(enterRoom(run, room.id).ok, true);
      visited.add(room.id);
      if (room.signalId) assert.equal(collectSignal(run, room.signalId).ok, true);
      if (room.puzzleId) assert.equal(solvePuzzle(run, room.puzzleId).ok, true);
    }
  }
  assert.equal(visited.size, 12);
  assert.deepEqual(getProgress(run).repairedDecks, [1, 2, 3]);
  assert.equal(run.signals.length, 6);
  assert.equal(finishEnding(run, 'beacon').ok, true);
  assert.equal(run.status, 'completed');
  assert.equal(finishEnding(run, 'memory').reason, 'not-running');
  assert.equal(continueRun(run).ok, true);
  assert.equal(finishEnding(run, 'memory').ok, true);
  assert.deepEqual(run.endings, ['beacon', 'memory']);
});

test('repeating a repair or recording does not duplicate rewards or stats', () => {
  const run = equipped();
  enterRoom(run, 'room-d1-cargo');
  solvePuzzle(run, 'puzzle-momentum-1');
  collectSignal(run, 'signal-1');
  assert.equal(solvePuzzle(run, 'puzzle-momentum-1').alreadySolved, true);
  assert.equal(collectSignal(run, 'signal-1').added, false);
  assert.equal(run.solvedPuzzles.length, 1);
  assert.equal(run.stats.puzzlesSolved, 1);
  assert.equal(run.signals.length, 1);
});

test('fixed oxygen step is invariant at 30 and 60 FPS including fractional input', () => {
  const slow = equipped(); const fast = equipped();
  enterRoom(slow, 'room-d1-cargo'); enterRoom(fast, 'room-d1-cargo');
  for (let i = 0; i < 9000; i += 1) tick(slow, 1 / 30, { thrusting: true });
  for (let i = 0; i < 18000; i += 1) tick(fast, 1 / 60, { thrusting: true });
  assert.ok(Math.abs(slow.oxygen - fast.oxygen) < 1e-8);
  assert.ok(Math.abs(slow.oxygen - 40) < 1e-8);
  assert.ok(Math.abs(slow.elapsed - 300) < 1e-8);
  const part = equipped(); enterRoom(part, 'room-d1-cargo');
  assert.equal(tick(part, 1 / 120).steps, 0);
  assert.equal(tick(part, 1 / 120).steps, 1);
});

test('safe rooms and pause consume no oxygen; pause freezes all timers without catch-up', () => {
  const run = equipped(); tick(run, 120, { thrusting: true });
  assert.equal(run.oxygen, 100);
  enterRoom(run, 'room-d1-cargo'); tick(run, 40);
  const before = structuredClone(run);
  setPaused(run, true); tick(run, 30, { thrusting: true });
  assert.equal(run.oxygen, before.oxygen); assert.equal(run.elapsed, before.elapsed);
  setPaused(run, false); tick(run, 1 / 60);
  assert.ok(Math.abs(run.elapsed - before.elapsed - 1 / 60) < 1e-8);
  tick(run, 120, { paused: true });
  assert.ok(Math.abs(run.elapsed - before.elapsed - 1 / 60) < 1e-8);
  enterRoom(run, 'room-d1-safe'); assert.equal(run.oxygen, 100);
});

test('25% and 10% alarms emit only when crossing thresholds; oxygen failure is explicit', () => {
  const run = equipped(); enterRoom(run, 'room-d1-cargo');
  const first = tick(run, 470);
  assert.deepEqual(first.events.filter(event => event.type === 'low-oxygen').map(event => event.level), [25]);
  assert.deepEqual(tick(run, 1).events, []);
  const final = tick(run, 200);
  assert.equal(final.failed, true); assert.equal(run.lastFailure, 'oxygen');
  assert.deepEqual(final.events.filter(event => event.type === 'low-oxygen').map(event => event.level), [10]);
  assert.equal(tick(run, 100).steps, 0);
});

test('story oxygen gives more exploration time; conservative 300-second route keeps >=15% on each deck', () => {
  const story = equipped('story'); const standard = equipped();
  enterRoom(story, 'room-d1-cargo'); enterRoom(standard, 'room-d1-cargo');
  tick(story, 300, { thrusting: true }); tick(standard, 300, { thrusting: true });
  assert.ok(story.oxygen > standard.oxygen);
  // This is a deterministic budget check, not a claim of three measured human/physics routes.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const run = equipped();
    for (const deck of decks) {
      enterRoom(run, `room-d${deck.id}-safe`);
      for (const id of deck.puzzleIds) { enterRoom(run, puzzles[id].roomId); tick(run, 150, { thrusting: true }); solvePuzzle(run, id); }
      assert.ok(run.oxygen >= 15);
    }
  }
});

test('oxygen, arc and debris deaths recover repeatedly without losing permanent progress', () => {
  for (const reason of ['oxygen', 'arc', 'debris']) {
    const run = equipped(); completeDeck(run, 1); enterRoom(run, 'room-d2-safe');
    enterRoom(run, 'room-d2-airlock'); collectSignal(run, 'signal-3');
    for (let i = 0; i < 10; i += 1) {
      enterRoom(run, 'room-d2-airlock');
      storeSnapshot(run, run.roomId, { objects: [{ id: 'crate-main', position: [999, 999, 999] }] });
      if (reason === 'oxygen') tick(run, 1000); else damage(run, 100, reason);
      assert.equal(run.status, 'failed'); assert.equal(respawn(run).ok, true);
      assert.equal(run.roomId, 'room-d2-safe'); assert.equal(run.oxygen, 100); assert.equal(run.health, 100);
      assert.equal(run.signals.length, 1); assert.equal(run.solvedPuzzles.length, 2);
      assert.equal(run.snapshots['room-d2-airlock'], undefined);
    }
    completeDeck(run, 2); completeDeck(run, 3); enterRoom(run, 'room-d3-signal');
    assert.equal(finishEnding(run, 'beacon').ok, true); assert.equal(run.stats.deaths, 10);
  }
});

test('all six puzzle resets clear ten extreme snapshots without duplicating permanent state', () => {
  const run = equipped();
  for (const deck of decks) {
    for (const id of deck.puzzleIds) {
      enterRoom(run, puzzles[id].roomId);
      for (let extreme = 0; extreme < 10; extreme += 1) {
        storeSnapshot(run, run.roomId, { objects: [{ id: 'device-test', position: [extreme * 1e8, -extreme, -extreme * 1e8] }] });
        assert.equal(resetPuzzle(run, id).ok, true);
        assert.equal(run.snapshots[run.roomId], undefined);
      }
      solvePuzzle(run, id);
      resetPuzzle(run, id);
      assert.equal(solvePuzzle(run, id).alreadySolved, true);
    }
  }
  assert.equal(run.solvedPuzzles.length, 6); assert.equal(run.stats.puzzlesSolved, 6);
});

test('snapshot validation clamps positions, zeroes velocity, normalizes rotation and rejects duplicate IDs', () => {
  const snapshot = legalizeSnapshot({ objects: [{ id: 'crate-main', position: [999, -99, NaN], rotation: [0, 0, 0, 2], velocity: [100, 100, 100] }, { id: 'crate-main' }, { id: '__proto__' }] });
  assert.deepEqual(snapshot.objects, [{ id: 'crate-main', position: [7, 0.75, 0], rotation: [0, 0, 0, 1], velocity: [0, 0, 0] }]);
});

test('three post-story challenges are isolated, finishable and track personal bests', () => {
  const story = equipped(); assert.equal(startChallenge(challenges[0].id, story).reason, 'challenge-locked');
  for (const deck of decks) completeDeck(story, deck.id);
  enterRoom(story, 'room-d3-signal'); finishEnding(story, 'beacon');
  const permanent = structuredClone(story);
  for (const challenge of challenges) {
    const { run } = startChallenge(challenge.id, story);
    for (const id of challenge.puzzleIds) { enterRoom(run, puzzles[id].roomId); tick(run, 20); solvePuzzle(run, id); }
    assert.equal(run.status, 'completed'); assert.equal(story.roomId, permanent.roomId);
    assert.deepEqual(story.solvedPuzzles, permanent.solvedPuzzles);
    assert.equal(recordChallenge(story, run).ok, true);
  }
  assert.equal(Object.keys(story.challengeRecords).length, 3);
  const timed = startChallenge('challenge-cargo', story).run;
  setPaused(timed, true); tick(timed, 999); assert.equal(timed.challengeTime, 180);
  setPaused(timed, false); tick(timed, 181); assert.equal(timed.status, 'failed');
  assert.equal(respawn(timed).reason, 'restart-challenge-required'); assert.equal(timed.status, 'failed');
});
