// Resolution changes never alter the simulation, CSS layout or input coordinates.
export class RenderBudget {
  constructor(software = false) { this.software = software; this.scale = software ? .7 : 1; this.samples = []; this.frames = 0; }
  record(ms) {
    if (!Number.isFinite(ms) || ms <= 0 || ms > 1000) return false;
    this.frames++; this.samples.push(ms); if (this.samples.length > 60) this.samples.shift();
    if (this.frames < 30 || this.frames % 60 !== 30) return false;
    const sorted = [...this.samples].sort((a,b)=>a-b), steady = sorted.slice(0,Math.ceil(sorted.length*.9));
    const mean = steady.reduce((a, b) => a + b, 0) / steady.length;
    const next = mean > 39 ? Math.max(.45, this.scale * Math.max(.65, Math.sqrt(30 / mean))) : mean < 23 ? Math.min(1, this.scale + .08) : this.scale;
    if (Math.abs(next - this.scale) < .001) return false;
    this.scale = next; return true;
  }
  reset() { this.samples = []; this.frames = 0; }
}
