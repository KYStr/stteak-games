// CPU-only rule model. Synthetic starting ports and deterministic helm inputs are
// not a claim of browser, human, device, or independent acceptance.
import { createState, depart, dock, step, nearestRouteChoice, chooseRoute, activeNavigation, tideAt } from '../../../games/tidebound/src/rules.js';
import { CONTRACTS, OBSERVATIONS, ROUTE_CHOICES, ROUTE_DIRECTIONS, RIGS, ISLANDS, REEFS, WHIRLS } from '../../../games/tidebound/src/world.js';
const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const clamp = (n) => Math.max(-1, Math.min(1, n));
const round = (n) => +n.toFixed(3);
const heading = (a, b) => Math.atan2(b.x - a.x, -(b.z - a.z));
const errorTo = (state, target) => Math.atan2(Math.sin(heading(state.boat, target) - state.boat.heading), Math.cos(heading(state.boat, target) - state.boat.heading));
const port = (id) => ISLANDS.find((item) => item.id === id).dock;
function clearSegment(origin, target) {
  const dx = target.x - origin.x, dz = target.z - origin.z, length = dx * dx + dz * dz;
  return [...ISLANDS.map((item) => ({ ...item, clearance: item.radius + 7.2 })), ...REEFS.map((item) => ({ ...item, clearance: item.radius + 2 })), ...WHIRLS.map((item) => ({ ...item, clearance: item.radius + 2 }))].every((item) => {
    const t = length ? Math.max(0, Math.min(1, ((item.x - origin.x) * dx + (item.z - origin.z) * dz) / length)) : 0;
    // The dock itself is exactly at the island clearance for the reef.
    const margin = target.x === port('reef').x && target.z === port('reef').z && item.id === 'reef' ? 23 : item.clearance;
    return Math.hypot(item.x - origin.x - dx * t, item.z - origin.z - dz * t) >= margin - 1e-6;
  });
}

export function startLeg({ fromIslandId, contractId = 'coral-survey', seed = 1, time = 0, rigId = 'steady' }) {
  const state = createState(seed); state.time = time; depart(state, contractId, rigId);
  if (fromIslandId !== 'harbor') {
    state.mode = 'island'; state.currentIsland = fromIslandId; state.lastSafeIsland = fromIslandId;
    depart(state);
  }
  state.voyage.harvested = OBSERVATIONS.map((item) => `observation:${item.id}`);
  state.voyage.skippedObservations = OBSERVATIONS.map((item) => item.id);
  state.cargo = state.voyage.harvested.slice(0, RIGS.find((item) => item.id === rigId).capacity);
  return state;
}

export function sailCompleteLeg(state, leg, optionId = 'outer', { isolatedGate = null, inspectEvery = 0.2, dockRadius = 12.5 } = {}) {
  const start = state.time, startDamage = state.voyage.damage, events = [], choices = [];
  const ignoredGates = [], opportunities = [], promptTimeline = [], damageTrace = [], pathTransitions = [], routeAdaptations = [], seen = new Set(), ignored = new Set(), promptSeen = new Set();
  let lastTargetKey = '';
  let cursor = 1, lastDecision = start, maxDecisionGap = 0, metres = 0, nextInspection = start;
  const decide = (kind, id) => {
    const gap = state.time - lastDecision;
    maxDecisionGap = Math.max(maxDecisionGap, gap);
    events.push({ kind, id, time: round(state.time), timeRaw: state.time, gap: round(gap), gapRaw: gap, x: round(state.boat.x), z: round(state.boat.z) });
    lastDecision = state.time;
  };
  const tick = (input) => {
    const before = { ...state.boat }; step(state, 0.1, input); metres += distance(before, state.boat);
    if (state.boat.hull < before.hull) damageTrace.push({ time: state.time, before, after: { ...state.boat }, cursor, chartTarget: leg.waypoints[cursor], navigation: activeNavigation(state) });
    if (state.mode !== 'sailing') throw new Error(`Unexpected ${state.mode} during ${leg.fromIslandId}->${leg.toIslandId}`);
  };
  for (let frame = 0; frame < 12000; frame++) {
    while (cursor < leg.waypoints.length - 1) {
      const p = leg.waypoints[cursor - 1], q = leg.waypoints[cursor], vx = q.x - p.x, vz = q.z - p.z;
      const passed = ((state.boat.x - p.x) * vx + (state.boat.z - p.z) * vz) / (vx * vx + vz * vz) > 1;
      if ((distance(state.boat, q) < 5 || passed) && clearSegment(state.boat, leg.waypoints[cursor + 1])) cursor++; else break;
    }
    const guide = activeNavigation(state);
    if (!guide) {
      // Rejoin the furthest remaining chart point with a clear hull-width line;
      // a branch can invalidate a shortcut selected before that branch, so it
      // must be revalidated, including earlier safe chart points.
      let found = false;
      const goal = port(leg.toIslandId);
      for (let next = leg.waypoints.length - 1; next > 0; next--) {
        if (distance(leg.waypoints[next], goal) <= distance(state.boat, goal) + 8 && clearSegment(state.boat, leg.waypoints[next])) { cursor = next; found = true; break; }
      }
      if (!found && leg.routeId === 'tide') {
        const alternate = legCatalog('safe').find((item) => item.contractId === leg.contractId && item.fromIslandId === leg.fromIslandId && item.toIslandId === leg.toIslandId);
        for (let next = (alternate?.waypoints.length || 0) - 1; next > 0; next--) {
          if (distance(alternate.waypoints[next], goal) <= distance(state.boat, goal) + 8 && clearSegment(state.boat, alternate.waypoints[next])) {
            routeAdaptations.push({ time: state.time, x: state.boat.x, z: state.boat.z, reason: 'The selected branch joined the safe corridor; rejoin its authored forward chart point instead of sailing backward to the former tide corridor.', target: alternate.waypoints[next] });
            leg = alternate; cursor = next; break;
          }
        }
      }
    }
    // Count actual docking, including braking, and never turn its prompt into a decision.
    if (!guide && cursor === leg.waypoints.length - 1 && distance(state.boat, port(leg.toIslandId)) < dockRadius) {
      while (state.boat.sail > 0 || state.boat.speed > 0.5) tick({ brake: true });
      const arrivalHull = state.boat.hull, arrivalSpeed = state.boat.speed, arrivalDistance = distance(state.boat, port(leg.toIslandId));
      dock(state);
      if (state.currentIsland !== leg.toIslandId) throw new Error(`Cannot dock ${leg.toIslandId}: ${arrivalDistance}`);
      decide('dock-complete', leg.toIslandId);
      const times = [start, ...opportunities.map((item) => item.timeRaw), state.time];
      const maxOpportunityGap = Math.max(...times.slice(1).map((time, index) => time - times[index]));
      return { seconds: round(state.time - start), metres: round(metres), damage: state.voyage.damage - startDamage, damageTrace, pathTransitions, routeAdaptations, arrivalHull, arrivalSpeed: round(arrivalSpeed), arrivalDistance: round(arrivalDistance), maxDecisionGap: round(maxDecisionGap), maxDecisionGapRaw: maxDecisionGap, maxOpportunityGap: round(maxOpportunityGap), maxOpportunityGapRaw: maxOpportunityGap, firstPrompt: promptTimeline[0] || null, promptTimeline, opportunities, ignoredGates, choices, events };
    }
    if (state.time + 1e-7 >= nextInspection) {
      nextInspection = state.time + inspectEvery;
      const gate = nearestRouteChoice(state);
      if (gate && (!isolatedGate || gate.id === isolatedGate)) {
        const goal = port(leg.toIslandId), axis = ROUTE_DIRECTIONS[gate.direction];
        // Do not follow a northbound branch past an island lying to the south, or
        // chain unrelated destinations merely because a card is on screen.
        const advertisedDestination = gate.directions[gate.direction].destinationIslandId;
        const advances = (!advertisedDestination || advertisedDestination === leg.toIslandId)
          && (goal.x - state.boat.x) * axis.x + (goal.z - state.boat.z) * axis.z >= 0
          && gate.options.every((item) => distance(item.waypoints.at(-1), goal) <= distance(state.boat, goal) + 8)
          && gate.options.every((item) => (item.waypoints.at(-1).x - goal.x) * axis.x + (item.waypoints.at(-1).z - goal.z) * axis.z <= 16);
        const promptKey = `${gate.id}/${gate.direction}/${gate.entryIndex}`;
        if (!promptSeen.has(promptKey)) {
          promptSeen.add(promptKey);
          promptTimeline.push({ id: gate.id, direction: gate.direction, entryIndex: gate.entryIndex, time: round(state.time), timeRaw: state.time, x: round(state.boat.x), z: round(state.boat.z), relevant: advances });
        }
        if ((advances && !seen.has(gate.id)) || (!advances && !ignored.has(gate.id))) {
          const observation = { id: gate.id, direction: gate.direction, entryIndex: gate.entryIndex, time: round(state.time), timeRaw: state.time, x: round(state.boat.x), z: round(state.boat.z) };
          if (advances) { seen.add(gate.id); opportunities.push(observation); }
          else { ignored.add(gate.id); ignoredGates.push({ ...observation, reason: 'The offered branch points away from, or past, this leg destination. Not counted as a new relevant decision.' }); }
        }
        if (advances) {
        const option = gate.options.find((item) => item.id === optionId);
        if (!option || !gate.options.every((item) => item.available)) throw new Error(`Gate ${gate.id} does not offer two usable paths`);
        decide('route-choice', gate.id);
        choices.push({ id: gate.id, direction: gate.direction, optionId, time: round(state.time), x: round(state.boat.x), z: round(state.boat.z), options: gate.options.map((item) => ({ id: item.id, distanceMetres: item.distanceMetres, estimatedSeconds: item.estimatedSeconds, condition: item.condition, waypoints: item.waypoints })) });
        chooseRoute(state, gate.id, optionId);
        }
      }
    }
    const target = activeNavigation(state)?.target || leg.waypoints[cursor], error = errorTo(state, target);
    const targetKey = `${activeNavigation(state)?.choiceId || 'chart'}/${cursor}/${target.x}/${target.z}`;
    if (targetKey !== lastTargetKey) { pathTransitions.push({ time: state.time, boat: { ...state.boat }, cursor, target: { ...target }, source: activeNavigation(state)?.choiceId || 'chart', clear: clearSegment(state.boat, target) }); lastTargetKey = targetKey; }
    tick({ turn: clamp(error * 3), sailDelta: Math.abs(error) > 0.8 ? -1 : 1 });
  }
  throw new Error(`Navigation timeout ${leg.fromIslandId}->${leg.toIslandId}`);
}

export function legCatalog(routeId = 'safe') {
  return CONTRACTS.flatMap((contract) => {
    const route = contract.routes.find((item) => item.id === routeId);
    const outbound = route.legs.map((leg, index) => ({ ...leg, contractId: contract.id, routeId, legIndex: index }));
    if (contract.id === 'coral-survey') return outbound;
    return [...outbound, { contractId: contract.id, routeId, legIndex: outbound.length, fromIslandId: contract.islandId, toIslandId: 'harbor', waypoints: [...route.waypoints].reverse() }];
  });
}

export function simulateCompleteLeg(leg, seed = 1, time = 0, optionId = 'outer', rigId = 'steady') {
  const state = startLeg({ ...leg, seed, time, rigId });
  const fallback = leg.contractId === 'glass-study' && leg.routeId === 'tide' && tideAt(time).height < REEFS.find((reef) => reef.id === 'south-shoal').safeHeight;
  const effectiveLeg = fallback ? legCatalog('safe').find((item) => item.contractId === leg.contractId && item.fromIslandId === leg.fromIslandId) : leg;
  return { contractId: leg.contractId, routeId: leg.routeId, effectiveRouteId: effectiveLeg.routeId, ...(fallback ? { fallbackReason: 'The advertised tide shortcut is closed at departure; choose its existing safe route without waiting.' } : {}), fromIslandId: leg.fromIslandId, toIslandId: leg.toIslandId, legIndex: leg.legIndex, seed, time, optionId, rigId, ...sailCompleteLeg(state, effectiveLeg, optionId, leg.routeId === 'crossing-regression' ? { dockRadius: 8 } : {}) };
}

export function simulateReturn(contract, seed = 1, time = 0, optionId = 'outer', rigId = 'steady') {
  return simulateCompleteLeg(legCatalog().find((leg) => leg.contractId === contract.id && leg.toIslandId === 'harbor'), seed, time, optionId, rigId);
}

export function simulateBranch(gate, direction, optionId, seed = 1, time = 0, rigId = 'steady', entryIndex = 0) {
  const state = startLeg({ fromIslandId: 'harbor', seed, time, rigId });
  // Preserve the existing synthetic branch isolation: other gate IDs are marked
  // selected, but every entry of this gate remains eligible. This does not model
  // global prompt priority or independently validate a live player's approach.
  state.voyage.routeChoices = ROUTE_CHOICES.filter((item) => item.id !== gate.id).map((item) => ({ id: item.id, legIndex: state.voyage.legIndex }));
  const axis = ROUTE_DIRECTIONS[direction], data = gate.directions[direction], entry = [data.entry || gate, ...(data.entries || [])][entryIndex];
  Object.assign(state.boat, { x: entry.x - axis.x * (entry.radius - 1), z: entry.z - axis.z * (entry.radius - 1), heading: Math.atan2(axis.x, -axis.z), sail: 1, speed: 3 });
  if (gate.id === 'harbor-approach' && entryIndex === 0) Object.assign(state.boat, { x: 40, z: 115 });
  if (gate.id === 'glass-port-approach' && direction === 'east') Object.assign(state.boat, { x: -51, z: 36 });
  const originalCandidate = { ...state.boat };
  let found = nearestRouteChoice(state), attemptedCandidates = 1, selection = 'original-prior';
  const originalNearest = found ? { gateId: found.id, direction: found.direction, entryIndex: found.entryIndex } : null;
  const matches = (candidate) => candidate?.id === gate.id && candidate.direction === direction && candidate.entryIndex === entryIndex && candidate.options.length >= 2 && candidate.options.every((option) => option.available);
  if (!matches(found)) {
    // A changed destination-distance bound can exclude the historical prior.
    // Sample actual visible entries, upstream to the entry plane, then at most 2 m
    // downstream (the unchanged API's forward limit). Centre-first transverse
    // offsets alternate sides. No entry, option, or runtime query is overridden.
    const lateralRadius = Number.isFinite(entry.lateralRadius) && entry.lateralRadius > 0 ? entry.lateralRadius : entry.radius;
    const alongOffsets = [...Array.from({ length: 40 }, (_, index) => (index - 39) / 40 * entry.radius), Math.min(1, entry.radius / 40), Math.min(2, entry.radius / 20)];
    const acrossOffsets = [0, ...Array.from({ length: 39 }, (_, index) => [-(index + 1) / 40 * lateralRadius, (index + 1) / 40 * lateralRadius]).flat()];
    search: for (const along of alongOffsets) for (const across of acrossOffsets) {
      if (Math.hypot(along / entry.radius, across / lateralRadius) > 1) continue;
      Object.assign(state.boat, { x: entry.x + axis.x * along + axis.z * across, z: entry.z + axis.z * along - axis.x * across });
      attemptedCandidates++;
      found = nearestRouteChoice(state);
      if (matches(found)) { selection = 'bounded-entry-grid'; break search; }
    }
  }
  if (!matches(found)) throw new Error(`Invalid branch fixture ${gate.id}/${direction}/${entryIndex}: no actual visible matching entry with two usable options after ${attemptedCandidates} candidates; nearest=${found?.id}/${found?.direction}/${found?.entryIndex}`);
  const fixture = { method: 'synthetic-isolated-gate; all same-gate entries retained and actual nearestRouteChoice required', selection, attemptedCandidates, maximumCandidateQueries: 1 + 42 * 79, originalCandidate, originalNearest, initialPoint: { ...state.boat }, selectedEntry: { gateId: found.id, direction: found.direction, entryIndex: found.entryIndex, x: found.x, z: found.z, radius: found.radius } };
  chooseRoute(state, gate.id, optionId); const started = state.time;
  while (activeNavigation(state) && state.time - started < 100) {
    const error = errorTo(state, activeNavigation(state).target);
    step(state, 0.1, { turn: clamp(error * 3), sailDelta: Math.abs(error) > 0.8 ? -1 : 1 });
  }
  return { gateId: gate.id, direction, entryIndex, optionId, seed, time, rigId, fixture, seconds: round(state.time - started), damage: state.voyage.damage, completed: !activeNavigation(state) };
}

export const crossingLegs = ['east', 'west'].map((direction) => {
  const fromIslandId = direction === 'east' ? 'reef' : 'gull', toIslandId = direction === 'east' ? 'gull' : 'reef';
  return { contractId: 'coral-survey', routeId: 'crossing-regression', legIndex: 3, direction, fromIslandId, toIslandId, waypoints: [port(fromIslandId), port(toIslandId)] };
});

// Library only: evidence publication remains an explicit caller responsibility.
if (process.argv[1]?.endsWith('maker-0011-navigation.mjs')) {
  throw new Error('maker-0011-navigation.mjs is library-only; import its exported model helpers instead of executing it directly.');
}
