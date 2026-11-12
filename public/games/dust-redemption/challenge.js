import { MISSIONS, STANDARD_DEADLINES } from "./content.js";
export const DIFFICULTIES = Object.freeze({
  story: "故事 · 無時限",
  standard: "標準",
  hard: "艱難",
});
export function deadlineFor(missionId, difficulty = "standard") {
  const i = MISSIONS.findIndex((m) => m.id === missionId);
  if (i < 0 || !Object.hasOwn(DIFFICULTIES, difficulty))
    throw new TypeError("Invalid challenge");
  return difficulty === "story"
    ? null
    : STANDARD_DEADLINES[i] * (difficulty === "hard" ? 0.8 : 1);
}
export function createClock(missionId, difficulty) {
  return {
    difficulty,
    activeSeconds: 0,
    deadlineSeconds: deadlineFor(missionId, difficulty),
    remainingSeconds: deadlineFor(missionId, difficulty),
    failureReason: null,
    warnings: 0,
  };
}
// The caller passes the unscaled, capped simulation delta. Menus and GPU stalls
// cannot spend time that was never simulated; slow aim does not stretch the clock.
export function tickClock(clock, dt, playing, foreground, contextValid) {
  if (!playing || !foreground || !contextValid || clock.failureReason) return 0;
  clock.activeSeconds += Math.max(0, Math.min(0.05, dt));
  if (clock.deadlineSeconds === null) return 0;
  clock.remainingSeconds = Math.max(
    0,
    clock.deadlineSeconds - clock.activeSeconds,
  );
  let warning = 0;
  if (
    clock.remainingSeconds <= clock.deadlineSeconds * 0.25 &&
    !(clock.warnings & 1)
  ) {
    clock.warnings |= 1;
    warning = 1;
  }
  if (clock.remainingSeconds <= 60 && !(clock.warnings & 2)) {
    clock.warnings |= 2;
    warning = 2;
  }
  if (clock.remainingSeconds <= 1e-7) {
    clock.remainingSeconds = 0;
    clock.failureReason = "deadline";
    return 3;
  }
  return warning;
}
export function clockText(seconds) {
  const n = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
}
