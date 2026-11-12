// Fixed-arity scaled Euclidean norms. V8's generic Math.hypot builds a rest
// argument workspace on each call; these preserve its scaled/Kahan equations
// without that workspace. Flight coordinates remain finite and metre-scaled.
export function length2(x, y) {
  x = Math.abs(x); y = Math.abs(y);
  const max = Math.max(x, y);
  if (!max) return 0;
  if (max === Infinity) return Infinity;
  x /= max; y /= max;
  return Math.sqrt(x * x + y * y) * max;
}
export function length3(x, y, z) {
  x = Math.abs(x); y = Math.abs(y); z = Math.abs(z);
  const max = Math.max(x, y, z);
  if (!max) return 0;
  if (max === Infinity) return Infinity;
  x /= max; y /= max; z /= max;
  const first = x * x, second = y * y;
  const sum = first + second, compensation = (sum - first) - second;
  return Math.sqrt(sum + (z * z - compensation)) * max;
}
