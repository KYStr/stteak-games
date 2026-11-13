// Wall time is an infrastructure watchdog; game time decides route/stall budgets.
export class ProgressClock {
  constructor({
    label,
    simulationBudget = 120,
    wallWatchdog = 1800000,
    stallSeconds = 10,
    progress,
    stallEligible,
    valid,
  } = {}) {
    Object.assign(this, {
      label,
      simulationBudget,
      wallWatchdog,
      stallSeconds,
      progress,
      stallEligible,
      valid,
    });
  }
  observe(d, wall = Date.now()) {
    if (this.startWall === undefined) {
      this.startWall = wall;
      this.startSim = d.challenge.activeSeconds;
      this.lastSim = this.startSim;
      this.best = this.progress?.(d);
      this.lastProgress = this.startSim;
    }
    if (d.mode === "dead" || d.mode === "error")
      throw Error(`${this.label}: ${d.mode}`);
    this.valid?.(d);
    const sim = d.challenge.activeSeconds;
    if (sim - this.startSim > this.simulationBudget)
      throw Error(
        `${this.label}: simulation budget exceeded (${sim - this.startSim}s)`,
      );
    const score = this.progress?.(d);
    const eligible = !this.stallEligible || this.stallEligible(d);
    if (!eligible) this.lastProgress = sim;
    if (score !== undefined && score < this.best - 0.03) {
      this.best = score;
      this.lastProgress = sim;
    }
    if (
      score !== undefined &&
      eligible &&
      sim - this.lastProgress > this.stallSeconds
    )
      throw Error(
        `${this.label}: movement stalled for ${this.stallSeconds} simulated seconds; ${JSON.stringify({ player: d.player, traversal: d.field?.traversal, party: d.nightFlow?.party, colliders: d.colliders })}`,
      );
    if (wall - this.startWall > this.wallWatchdog)
      throw Error(
        `${this.label}: infrastructure-or-render-progress timeout; simulation advanced ${sim - this.startSim}s`,
      );
    this.lastSim = sim;
  }
}
