// Local delivery safeguards; this does not change the shared release contract.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

export const evidencePrefix = 'public/games/aetherwake/evidence/';
export const docsPrefix = 'docs/game-production/games/aetherwake/';

export function assertLocalPath(path, prefixes = [evidencePrefix, docsPrefix]) {
  assert.ok(typeof path === 'string' && prefixes.some(prefix => path.startsWith(prefix)), `Outside evidence scope: ${path}`);
  assert.ok(!/[\\\x00-\x1f:]/.test(path) && !path.split('/').some(part => part === '..' || part === '.' || part === ''), `Noncanonical evidence path: ${path}`);
  return path;
}

export function localEvidenceLink(link, origin) {
  const url = new URL(link, origin);
  assert.equal(url.origin, new URL(origin).origin, 'Evidence URL changed origin');
  const path = 'public' + decodeURIComponent(url.pathname);
  return assertLocalPath(path, [evidencePrefix]);
}

export function sealedExpectation(entry) {
  const path = assertLocalPath(entry.path);
  const bytes = entry.expectedBytes ?? entry.bytes;
  const sha256 = entry.expectedSha256 ?? entry.sha256;
  assert.ok(Number.isSafeInteger(bytes) && bytes >= 0, `Missing sealed length: ${path}`);
  assert.match(sha256 || '', /^[a-f0-9]{64}$/, `Missing sealed SHA-256: ${path}`);
  return { path, bytes, sha256 };
}

export function assertSealedBytes(bytes, expected) {
  assert.equal(bytes.length, expected.bytes, `Sealed length differs: ${expected.path}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256, `Sealed SHA-256 differs: ${expected.path}`);
}

export function requiresDeliveryCheck(path, tags, baselinePaths, changedPaths) {
  assertLocalPath(path, [evidencePrefix]);
  return !baselinePaths.has(path) || changedPaths.has(path) || tags.some(tag => path.slice(evidencePrefix.length).includes(tag));
}
