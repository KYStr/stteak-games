// Reusable visibility planner. Point/box workspaces grow only with scene capacity.
const inside = (x, z, b) =>
  x > b.minX && x < b.maxX && z > b.minZ && z < b.maxZ;
function intersects(ax, az, bx, bz, b) {
  let lo = 0,
    hi = 1,
    d = bx - ax;
  if (Math.abs(d) < 1e-8) {
    if (ax <= b.minX || ax >= b.maxX) return false;
  } else {
    let p = (b.minX - ax) / d,
      q = (b.maxX - ax) / d;
    if (p > q) {
      const t = p;
      p = q;
      q = t;
    }
    lo = Math.max(lo, p);
    hi = Math.min(hi, q);
    if (lo >= hi) return false;
  }
  d = bz - az;
  if (Math.abs(d) < 1e-8) {
    if (az <= b.minZ || az >= b.maxZ) return false;
  } else {
    let p = (b.minZ - az) / d,
      q = (b.maxZ - az) / d;
    if (p > q) {
      const t = p;
      p = q;
      q = t;
    }
    lo = Math.max(lo, p);
    hi = Math.min(hi, q);
  }
  return lo < hi;
}
export class EscortRouting {
  constructor(colliders = []) {
    this.boxes = [];
    this.nodes = [];
    this.revision = 0;
    this.recalculations = 0;
    this.adjusted = { x: 0, z: 0 };
    this.refresh(colliders);
  }
  refresh(colliders, revision) {
    let changed =
      this.colliders !== colliders || this.count !== colliders.length;
    this.colliders = colliders;
    this.sourceRevision = revision;
    this.count = colliders.length;
    for (let i = 0; i < colliders.length; i++) {
      const c = colliders[i],
        b = (this.boxes[i] ??= {});
      if (
        b.source !== c ||
        b.minX !== c.min.x - 0.27 ||
        b.maxX !== c.max.x + 0.27 ||
        b.minZ !== c.min.z - 0.27 ||
        b.maxZ !== c.max.z + 0.27
      )
        changed = true;
      b.source = c;
      b.minX = c.min.x - 0.27;
      b.maxX = c.max.x + 0.27;
      b.minZ = c.min.z - 0.27;
      b.maxZ = c.max.z + 0.27;
    }
    if (!changed) return;
    this.revision++;
    const capacity = colliders.length * 4 + 2;
    if (!this.costs || this.costs.length < capacity) {
      this.costs = new Float64Array(capacity);
      this.parents = new Int32Array(capacity);
      this.visited = new Uint8Array(capacity);
      this.reverse = new Int32Array(capacity);
      while (this.nodes.length < capacity) this.nodes.push({ x: 0, z: 0 });
    }
  }
  prepare(member) {
    if (!member.fieldRoute)
      member.fieldRoute = {
        points: [],
        index: 0,
        count: 0,
        revision: -1,
        x: NaN,
        z: NaN,
      };
    const points = member.fieldRoute.points;
    while (points.length < this.nodes.length) points.push({ x: 0, z: 0 });
    return member.fieldRoute;
  }
  free(x, z) {
    for (let i = 0; i < this.count; i++)
      if (inside(x, z, this.boxes[i])) return false;
    return true;
  }
  clear(a, b) {
    for (let i = 0; i < this.count; i++)
      if (intersects(a.x, a.z, b.x, b.z, this.boxes[i])) return false;
    return true;
  }
  target(member, target, colliders, revision) {
    this.refresh(colliders, revision);
    const from = member.position,
      to = this.adjusted,
      route = this.prepare(member);
    to.x = target.x;
    to.z = target.z;
    for (let i = 0; i < this.count; i++) {
      const b = this.boxes[i];
      if (!inside(to.x, to.z, b)) continue;
      let best = Infinity,
        bestX = to.x,
        bestZ = to.z;
      for (let side = 0; side < 4; side++) {
        const x =
          side === 0 ? b.minX - 0.02 : side === 1 ? b.maxX + 0.02 : to.x;
        const z =
          side === 2 ? b.minZ - 0.02 : side === 3 ? b.maxZ + 0.02 : to.z;
        const d = Math.hypot(x - from.x, z - from.z);
        if (this.free(x, z) && d < best) {
          best = d;
          bestX = x;
          bestZ = z;
        }
      }
      to.x = bestX;
      to.z = bestZ;
    }
    if (this.clear(from, to)) {
      route.count = 0;
      return to;
    }
    while (
      route.index < route.count - 1 &&
      Math.hypot(
        from.x - route.points[route.index].x,
        from.z - route.points[route.index].z,
      ) < 0.12
    )
      route.index++;
    if (
      route.revision !== this.revision ||
      route.x !== to.x ||
      route.z !== to.z ||
      !route.count ||
      !this.clear(from, route.points[route.index])
    ) {
      this.recalculations++;
      route.x = to.x;
      route.z = to.z;
      route.revision = this.revision;
      route.index = 0;
      route.count = 0;
      let count = 2;
      this.nodes[0].x = from.x;
      this.nodes[0].z = from.z;
      this.nodes[1].x = to.x;
      this.nodes[1].z = to.z;
      for (let i = 0; i < this.count; i++) {
        const b = this.boxes[i];
        for (let corner = 0; corner < 4; corner++) {
          const x = corner < 2 ? b.minX - 0.03 : b.maxX + 0.03,
            z = corner % 2 ? b.maxZ + 0.03 : b.minZ - 0.03;
          if (Math.abs(x) >= 22.7 || Math.abs(z) >= 22.7 || !this.free(x, z))
            continue;
          this.nodes[count].x = x;
          this.nodes[count++].z = z;
        }
      }
      this.costs.fill(Infinity, 0, count);
      this.parents.fill(-1, 0, count);
      this.visited.fill(0, 0, count);
      this.costs[0] = 0;
      for (let iteration = 0; iteration < count; iteration++) {
        let current = -1,
          best = Infinity;
        for (let i = 0; i < count; i++) {
          const score =
            this.costs[i] +
            Math.hypot(this.nodes[i].x - to.x, this.nodes[i].z - to.z);
          if (!this.visited[i] && score < best) {
            best = score;
            current = i;
          }
        }
        if (current < 0 || current === 1) break;
        this.visited[current] = 1;
        const a = this.nodes[current];
        for (let i = 1; i < count; i++) {
          if (this.visited[i]) continue;
          const b = this.nodes[i],
            cost = this.costs[current] + Math.hypot(a.x - b.x, a.z - b.z);
          if (cost + 1e-6 < this.costs[i] && this.clear(a, b)) {
            this.costs[i] = cost;
            this.parents[i] = current;
          }
        }
      }
      if (Number.isFinite(this.costs[1])) {
        let n = 0;
        for (let i = 1; i > 0; i = this.parents[i]) this.reverse[n++] = i;
        while (n) {
          const p = this.nodes[this.reverse[--n]],
            out = route.points[route.count++];
          out.x = p.x;
          out.z = p.z;
        }
      }
    }
    return route.count ? route.points[route.index] : from;
  }
}
