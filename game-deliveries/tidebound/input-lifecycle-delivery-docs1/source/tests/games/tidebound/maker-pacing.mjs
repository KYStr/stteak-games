// 公開版僅保留單元測試使用的純模型函式；已移除歷史 QA 報告輸出入口。
// Rules-model navigation evidence, not browser or human-play evidence.
import { createState, step, depart, dock, interact, startDive, surface, nearestObservation, skipObservation } from '../../../games/tidebound/src/rules.js';
import { ISLANDS, DIVE_SITES, CONTRACTS } from '../../../games/tidebound/src/world.js';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const island = (id) => ISLANDS.find((item) => item.id === id);
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const clamp = (n) => Math.max(-1, Math.min(1, n));
let decisions;
function tick(state, input) {
  step(state, 0.1, input);
  if (!decisions) return;
  let observation;
  while ((observation = nearestObservation(state, 45))) {
    decisions.push({ time: +state.time.toFixed(2), kind: 'optional-sample-or-skip', id: observation.id });
    skipObservation(state, observation.id);
  }
}
export function sailLeg(state, points, toIslandId) {
  const started = state.time;
  decisions?.push({ time: +state.time.toFixed(2), kind: 'depart-and-route', id: toIslandId });
  for (const [index, target] of points.entries()) {
    const final = index === points.length - 1;
    for (let frames = 0; frames < 10000; frames += 1) {
      const d = distance(state.boat, target);
      if (d <= (final ? 8 : 3)) break;
      if (frames === 9999 || state.mode !== 'sailing') throw new Error(`Navigation failed: ${toIslandId}`);
      const desired = Math.atan2(target.x - state.boat.x, -(target.z - state.boat.z));
      const error = Math.atan2(Math.sin(desired - state.boat.heading), Math.cos(desired - state.boat.heading));
      // Full sail on the leg; furl only for an actual tight turn, then brake for docking.
      tick(state, { turn: clamp(error * 3), sailDelta: Math.abs(error) > 0.8 ? -1 : 1 });
    }
  }
  decisions?.push({ time: +state.time.toFixed(2), kind: 'brake-and-dock', id: toIslandId });
  while (state.boat.speed > 0.5 || state.boat.sail > 0) tick(state, { brake: true });
  const hull = state.boat.hull;
  const events = dock(state);
  if (state.currentIsland !== toIslandId) throw new Error(`Dock failed: ${toIslandId}: ${JSON.stringify(events)}`);
  return { toIslandId, seconds: +(state.time - started).toFixed(2), arrivalHull: hull, damage: state.voyage.damage };
}
export function dive(state, id, returnSwimming = false) {
  const started = state.time, site = DIVE_SITES.find((item) => item.id === id);
  startDive(state, id);
  for (const target of returnSwimming ? [site.target, site.entry] : [site.target]) {
    while (distance(state.diver, target) > (target === site.target ? 4.4 : 0.5)) {
      const dx = target.x - state.diver.x, dz = target.z - state.diver.z, d = Math.hypot(dx, dz);
      step(state, 0.1, { diveX: dx / d, diveZ: dz / d });
    }
    if (target === site.target) interact(state);
  }
  surface(state);
  return { siteId: id, seconds: +(state.time - started).toFixed(2) };
}
export function measureFirst(seed = 1, time = 0, routeId = 'safe', continueStory = false) {
  const state = createState(seed); state.time = time; depart(state);
  const legs = [], dives = []; decisions = [];
  for (const leg of CONTRACTS[0].routes.find((route) => route.id === routeId).legs) {
    legs.push(sailLeg(state, leg.waypoints.slice(1), leg.toIslandId));
    if (leg.toIslandId === 'harbor') continue;
    interact(state);
    for (const objective of CONTRACTS[0].objectives.filter((item) => item.islandId === leg.toIslandId && item.siteId)) dives.push(dive(state, objective.siteId));
    depart(state);
  }
  const result = { contractId: 'coral-survey', seed, tideStart: time, routeId, seconds: +state.voyage.elapsed.toFixed(2), damage: state.voyage.damage, delivered: state.completed.includes('coral-survey'), legs, dives, decisions };
  if (continueStory) {
    const started = state.time; decisions = []; const storyLegs = [];
    depart(state, 'star-reading');
    storyLegs.push(sailLeg(state, CONTRACTS.find((item) => item.id === 'star-reading').routes[0].waypoints.slice(1), 'ruin'));
    interact(state); const storyDive = dive(state, 'ruin-dive'); depart(state);
    storyLegs.push(sailLeg(state, [{ x: 60, z: -150 }, island('lighthouse').dock], 'lighthouse'));
    interact(state); depart(state);
    storyLegs.push(sailLeg(state, [...CONTRACTS.find((item) => item.id === 'keepers-journal').routes[0].waypoints].reverse().slice(1), 'harbor'));
    result.story = { additionalSeconds: +(state.time - started).toFixed(2), totalSeconds: +(state.time - time).toFixed(2), damage: state.voyage.damage, completed: state.storyComplete, legs: storyLegs, dive: storyDive, decisions };
  }
  decisions = null;
  return result;
}
export function measureContract(contract, routeId = 'safe', seed = 1, time = 0) {
  if (contract.id === 'coral-survey') return measureFirst(seed, time, routeId);
  const state = createState(seed); state.time = time; depart(state, contract.id); decisions = [];
  const route = contract.routes.find((item) => item.id === routeId);
  const outbound = sailLeg(state, route.waypoints.slice(1), contract.islandId);
  interact(state); depart(state);
  const inbound = sailLeg(state, [...route.waypoints].reverse().slice(1), 'harbor');
  const result = { contractId: contract.id, routeId, seed, tideStart: time, seconds: +state.voyage.elapsed.toFixed(2), damage: state.voyage.damage, delivered: state.completed.includes(contract.id), legs: [outbound, inbound], decisions };
  decisions = null; return result;
}
