import { MISSIONS, ENCOUNTER_PROFILES } from "./content.js";
export const STORY_SEED = 17;
export const validSeed = (seed) =>
  Number.isInteger(seed) && seed >= 0 && seed <= 0xffffffff;
export function seededRandom(seed) {
  if (!validSeed(seed)) throw new TypeError("Seed must be uint32");
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}
export function encounterFor(
  missionId,
  seed = STORY_SEED,
  difficulty = "standard",
) {
  const mission = MISSIONS.find((m) => m.id === missionId);
  if (
    !mission ||
    !validSeed(seed) ||
    !["story", "standard", "hard"].includes(difficulty)
  )
    throw new TypeError("Invalid encounter");
  // Mix the complete uint32 seed; the draw selects an authored, bounded profile.
  let mixed = Math.imul(seed ^ (seed >>> 16), 0x7feb352d);
  mixed = Math.imul(mixed ^ (mixed >>> 15), 0x846ca68b);
  const draw = seededRandom((mixed ^ (mixed >>> 16)) >>> 0);
  const profile =
    ENCOUNTER_PROFILES[Math.floor(draw() * ENCOUNTER_PROFILES.length)];
  return {
    seed,
    difficulty,
    profile: profile.id,
    name: profile.name,
    description: profile.description,
    enemies: mission.enemies.map((e) => {
      const warning = e.type === "sniper" ? 1.25 : 0.95;
      return {
        id: e.id,
        warningSeconds: warning * profile.warning,
        recoverySeconds:
          (e.type === "sniper" ? 4.5 : e.type === "shotgun" ? 2.5 : 2.8) *
          profile.recovery,
        rounds: Math.floor(
          (e.type === "sniper" ? 16 : 30) *
            (missionId === "dawn-pact" ? 1 : profile.reserve),
        ),
      };
    }),
  };
}
export const challengeKey = (row) =>
  `${row.seed ?? STORY_SEED}:${row.encounterProfile ?? "patient-watch"}:${row.difficulty ?? "story"}:${row.stats.assisted ? "assist" : "manual"}:${row.stats.slowAim ? "slow" : "normal"}`;
