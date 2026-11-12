// Fixed storage, constant-time recording. Aggregation happens only on inspection.
export class TimingSamples {
  constructor(names, capacity = 2048) {
    this.names = names;
    this.capacity = capacity;
    this.samples = Object.fromEntries(names.map(name => [name, new Float64Array(capacity)]));
    this.count = 0;
    this.index = 0;
  }
  push(sample) {
    for(let i=0;i<this.names.length;i++){const name=this.names[i];this.samples[name][this.index]=sample[name];}
    this.index = (this.index + 1) % this.capacity;
    this.count = Math.min(this.count + 1, this.capacity);
  }
  summary() {
    return Object.fromEntries(this.names.map(name => {
      const values = Array.from(this.samples[name].subarray(0, this.count)).sort((a, b) => a - b);
      return [name, { count: this.count, mean: this.count ? values.reduce((a, b) => a + b, 0) / this.count : null,
        p95: this.count ? values[Math.min(this.count - 1, Math.floor(this.count * .95))] : null }];
    }));
  }
}
