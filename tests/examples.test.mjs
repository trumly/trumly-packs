// Every pack's examples must check clean. This runs scripts/check-examples.mjs,
// so `npm test` (and the release, which runs it) fails if an example breaks one of its own pack's rules.
// If it says a rule is newer than the wasm, rebuild vendor/trumly.wasm from trumly-spec.
// The other tests prove the script itself: a missing or broken example must fail it, on a scratch copy of the packs.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('..', import.meta.url));
const made = [];
after(() => made.forEach(d => rmSync(d, { recursive: true, force: true })));

const checker = (cwd, args = [], env = {}) =>
  spawnSync(process.execPath, [join(cwd, 'scripts/check-examples.mjs'), ...args], {
    cwd,
    encoding: 'utf8',
    env: { PATH: process.env.PATH, ...env }
  });
const out = r => `${r.stdout}\n${r.stderr}`;
/** a scratch copy of the script, the engine and the packs, to break on purpose */
function scratch() {
  const dir = mkdtempSync(join(tmpdir(), 'trumly-examples-'));
  made.push(dir);
  for (const d of ['scripts', 'vendor', 'packs']) cpSync(join(repo, d), join(dir, d), { recursive: true });
  cpSync(join(repo, 'registry.lock.json'), join(dir, 'registry.lock.json'));
  return dir;
}
const newest = (dir, pack) =>
  readdirSync(join(dir, 'packs', pack))
    .filter(d => /^\d+\.\d+\.\d+$/.test(d))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .at(-1);

test('pack examples check clean', () => {
  const r = checker(repo);
  assert.equal(r.status, 0, `check-examples exited ${r.status}\n${out(r)}`);
});

test('a pack with no example fails the check', () => {
  const dir = scratch();
  rmSync(join(dir, 'packs/core', newest(dir, 'core'), 'examples'), { recursive: true });
  const r = checker(dir, ['core']);
  assert.equal(r.status, 1, out(r));
  assert.match(out(r), /NO EXAMPLE/);
});

test('an example that does not load fails the check', () => {
  const dir = scratch();
  const ex = join(dir, 'packs/core', newest(dir, 'core'), 'examples');
  writeFileSync(join(ex, readdirSync(ex)[0], 'broken.md'), 'no front matter, so this is not a node\n');
  const r = checker(dir, ['core']);
  assert.equal(r.status, 1, out(r));
  assert.match(out(r), /FAILS THE CHECK/);
});
