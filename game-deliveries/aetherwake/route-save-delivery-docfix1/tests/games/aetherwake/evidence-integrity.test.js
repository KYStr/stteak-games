import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { assertLocalPath, localEvidenceLink, sealedExpectation, assertSealedBytes, requiresDeliveryCheck } from './evidence-integrity.mjs';

const prefix = 'public/games/aetherwake/evidence/';
const origin = 'http://127.0.0.1:5181/';

test('review links cannot use encoded Windows separators to escape evidence', () => {
  for (const link of [
    'games/aetherwake/evidence/..%5cindex.html',
    'games/aetherwake/evidence/nested%5c..%5c..%5cindex.html',
    'games/aetherwake/evidence/%2e%2e/index.html',
    'games/aetherwake/evidence/nested/%2e%2e/%2e%2e/index.html',
    'games/aetherwake/evidence/C%3Asecret.json',
    'https://elsewhere.invalid/games/aetherwake/evidence/report.json',
  ]) assert.throws(() => localEvidenceLink(link, origin), link);
  assert.equal(localEvidenceLink('games/aetherwake/evidence/nested/report.json#case', origin), prefix + 'nested/report.json');
});

test('seal paths reject traversal before filesystem access', () => {
  for (const path of [prefix + '../index.html', prefix + '..\\index.html', prefix + 'nested/./report.json', prefix + 'report.json:stream'])
    assert.throws(() => assertLocalPath(path));
});

test('restaging changed bytes cannot satisfy an unchanged Reviewer seal', () => {
  const original = Buffer.from('original report');
  const expected = sealedExpectation({ path: prefix + 'report.json', bytes: original.length, sha256: createHash('sha256').update(original).digest('hex') });
  assert.doesNotThrow(() => assertSealedBytes(original, expected));
  assert.throws(() => assertSealedBytes(Buffer.from('modified report'), expected), /SHA-256/);
  assert.throws(() => assertSealedBytes(Buffer.from('short'), expected), /length/);
  assert.deepEqual(sealedExpectation({ path: expected.path, expectedBytes: expected.bytes, expectedSha256: expected.sha256 }), expected);
});

test('new unversioned evidence is selected even when absent from direct review links', () => {
  const old = prefix + 'historical-0006.webm';
  const changed = prefix + 'notes.json';
  const baseline = new Set([old, changed, prefix + 'review-0008.json']);
  const changes = new Set([changed]);
  assert.equal(requiresDeliveryCheck(prefix + 'session.webm', ['0008'], baseline, changes), true);
  assert.equal(requiresDeliveryCheck(changed, ['0008'], baseline, changes), true);
  assert.equal(requiresDeliveryCheck(prefix + 'review-0008.json', ['0008'], baseline, changes), true);
  assert.equal(requiresDeliveryCheck(old, ['0008'], baseline, changes), false);
});
