// The registry library: what every release and the public index are built from.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadRegistry, latest, bundleHash, TIERS } from '../lib/registry.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));

test('the real registry loads with no errors, and every version is hashed', async () => {
  const { versions, errors } = await loadRegistry(root);
  assert.deepEqual(errors, []);
  assert.ok(versions.length >= 19);
  for (const v of versions) {
    assert.match(v.sha256, /^[0-9a-f]{64}$/, v.pack.name);
    assert.ok(TIERS.includes(v.meta.tier ?? 'community'), v.pack.name);
  }
});

test('latest picks the highest version by number, not by text', () => {
  const mk = (name, version) => ({ pack: { name, version } });
  const got = latest([mk('a', '1.9.0'), mk('a', '1.10.0'), mk('a', '1.2.0'), mk('b', '0.1.0')]);
  const byName = Object.fromEntries(got.map(v => [v.pack.name, v.pack.version]));
  assert.deepEqual(byName, { a: '1.10.0', b: '0.1.0' });
});

test('bundleHash ignores the order of files and changes with any byte', () => {
  const a = [
    ['x', '1'],
    ['y', '2']
  ];
  assert.equal(bundleHash(a), bundleHash([...a].reverse()));
  assert.notEqual(
    bundleHash(a),
    bundleHash([
      ['x', '1'],
      ['y', '3']
    ])
  );
  assert.notEqual(
    bundleHash(a),
    bundleHash([
      ['x', '1'],
      ['z', '2']
    ])
  );
});

test('every pack has an example, and its samples travel with the version', async () => {
  const { versions } = await loadRegistry(root);
  for (const v of latest(versions))
    assert.ok(
      v.pack.samples.some(s => s.kind === 'example'),
      `${v.pack.name} has no example`
    );
});
