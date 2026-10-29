// Deterministic rule-test driver: ordinary fixed-step control inputs only.
// This is informed navigation, not blind or human playtime evidence.
import assert from 'node:assert/strict';
import { WORLD, islandById } from '../../../games/aetherwake/src/world.js';
export const dt = 1 / 60;
export const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

export function steer(sim, target, { landing = false } = {}) {
  const p = sim.player;
  let aim = target;
  const d = distance(p, target);
  if (!landing && target.heading && d < target.radius * 1.6) {
    const speed = Math.hypot(p.vx, p.vz), length = Math.hypot(target.heading.x, target.heading.z);
    const dot = (p.vx * target.heading.x + p.vz * target.heading.z) / Math.max(0.001, speed * length);
    // An unsuccessful approach is retried from behind the direction arrow.
    if (dot < (target.heading.minDot ?? 0.5) && !sim._pilotApproach) {
      sim._pilotApproach = { id: target.id, x: target.x - target.heading.x / length * 65, y: target.y, z: target.z - target.heading.z / length * 65 };
    }
  }
  if (sim._pilotApproach?.id !== target.id) sim._pilotApproach = null;
  if (sim._pilotApproach) {
    if (distance(p, sim._pilotApproach) < 12) sim._pilotApproach = null;
    else aim = sim._pilotApproach;
  }
  const ad = distance(p, aim);
  const brake = landing
    ? !p.grounded && d < Math.max(26, Math.max(0, p.y - target.y) / 7 * 5.2 + 9)
    : p.y > target.y + (target.radius || 15) * 0.65 && d < 55;
  sim.step({ x: (aim.x - p.x) / Math.max(ad, 0.001), z: (aim.z - p.z) / Math.max(ad, 0.001),
    glide: p.grounded && (!landing || d > 50 || Math.abs(p.y - target.y) > 2) || !p.grounded && !p.gliding,
    brake }, dt);
}

export function flyMainSegment(sim, mission, style = 'safe', { maxSeconds = 480 } = {}) {
  sim.setRouteStyle(style);
  const started = sim.elapsed, stalls = sim.stalls;
  for (let frame = 0; frame < maxSeconds * 60; frame++) {
    if (sim.activated.length >= mission || sim.status === 'complete') return sim.elapsed - started;
    if (sim.state.activeChallenge || sim.state.trackedHint) {
      assert.equal(sim.player.grounded, true, 'Main-route pilot may leave a course only from a safe landing, never by returning from midair');
      sim.cancelChallenge();
    }
    const target = sim.state.surveyHint;
    const island = islandById(sim.state.objective.islandId);
    if (!target && sim.player.grounded && distance(sim.player, island) < 8) { sim.interact(); continue; }
    steer(sim, target || island, { landing: !target });
    assert.equal(sim.stalls, stalls, `Main ${mission}/${style} recovery: ${JSON.stringify(sim.snapshot())}`);
  }
  assert.fail(`Main ${mission}/${style} timeout at ${JSON.stringify(sim.snapshot())}`);
}

function selectCourse(sim, challenge) {
  if (sim.state.activeChallenge === challenge.id || sim.state.trackedHint?.id === challenge.id) return;
  assert.equal(sim.player.grounded, true, `Select ${challenge.id} from safe ground: ${JSON.stringify(sim.snapshot())}`);
  assert.equal(sim.trackChallenge(challenge.id), true, `Cannot select ${challenge.id}`);
}

export function flyToCourseEntry(sim, challenge, { maxSeconds = 600, afterStep } = {}) {
  const started = sim.elapsed, stalls = sim.stalls;
  selectCourse(sim, challenge);
  for (let frame = 0; frame < maxSeconds * 60; frame++) {
    if (sim.state.activeChallenge === challenge.id) return sim.elapsed - started;
    assert.equal(sim.state.activeChallenge, null, `Unexpected course during transit to ${challenge.id}`);
    const target = sim.state.trackedHint;
    assert.equal(target?.id, challenge.id, `Lost transit target for ${challenge.id}: ${JSON.stringify(sim.snapshot())}`);
    const before = { x: sim.player.x, y: sim.player.y, z: sim.player.z };
    steer(sim, target);
    assert.equal(sim.stalls, stalls, `Transit to ${challenge.id} recovery: ${JSON.stringify(sim.snapshot())}`);
    afterStep?.(sim, before);
  }
  assert.fail(`Transit to ${challenge.id} timeout: ${JSON.stringify(sim.snapshot())}`);
}

export function flyCourse(sim, challenge, { stopAfterGate = Infinity, stopAfterStage = Infinity, maxSeconds = 1200 } = {}) {
  const started = sim.elapsed, stalls = sim.stalls;
  if (sim.challenges.includes(challenge.id)) return 0;
  selectCourse(sim, challenge);
  for (let frame = 0; frame < maxSeconds * 60; frame++) {
    if (sim.challenges.includes(challenge.id)) return sim.elapsed - started;
    if ((sim.state.courseStages[challenge.id] || 0) >= stopAfterStage) return sim.elapsed - started;
    if ((sim.state.challengeProgress[challenge.id] || 0) >= stopAfterGate) return sim.elapsed - started;
    assert.ok(!sim.state.activeChallenge || sim.state.activeChallenge === challenge.id, `Unexpected active course while flying ${challenge.id}`);
    const target = sim.state.activeChallenge === challenge.id ? sim.state.challengeHint : sim.state.trackedHint;
    assert.equal(target?.id, challenge.id, `Lost course or transit target for ${challenge.id}: ${JSON.stringify(sim.snapshot())}`);
    if (target.landing && sim.player.grounded && distance(sim.player, target) < 8) { sim.interact(); continue; }
    steer(sim, target, { landing: target.landing });
    assert.equal(sim.stalls, stalls, `Course ${challenge.id} recovery: ${JSON.stringify(sim.snapshot())}`);
  }
  assert.fail(`Course ${challenge.id} timeout at ${JSON.stringify(sim.snapshot())}`);
}

export function flyToIsland(sim, island, maxSeconds = 240) {
  const started = sim.elapsed;
  for (let frame = 0; frame < maxSeconds * 60; frame++) {
    if (sim.player.grounded && distance(sim.player, island) < 6) return sim.elapsed - started;
    assert.equal(sim.state.activeChallenge, null, 'Island approach must not cancel an active course and teleport out of flight');
    // Use a raised target until over the destination, then brake onto its disc.
    const landing = distance(sim.player, island) < 55;
    steer(sim, landing ? island : { ...island, y: island.y + 28, radius: 15 }, { landing });
  }
  assert.fail(`Transit timeout ${island.id}`);
}
