import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

test('vendor/trumly.wasm matches the sha256 recorded in vendor/PROVENANCE.md', () => {
  const recorded = readFileSync(new URL('../vendor/PROVENANCE.md', import.meta.url), 'utf8').match(
    /SHA-256: `([0-9a-f]{64})`/
  )?.[1];
  const actual = createHash('sha256')
    .update(readFileSync(new URL('../vendor/trumly.wasm', import.meta.url)))
    .digest('hex');
  assert.equal(actual, recorded);
});
