// The registry's promise: a published pack version never changes and never disappears, and CI refuses a version that is not locked.
// Each test checks a scratch copy of the checker with two real, locked packs (core and links), so the real packs are never touched.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('..', import.meta.url));
const made = [];

/** a scratch repo: the checker, the engine, and every pack version that is locked, with the lock itself */
function scratch() {
  const dir = mkdtempSync(join(tmpdir(), 'trumly-packs-'));
  made.push(dir);
  for (const d of ['scripts', 'lib', 'vendor']) cpSync(join(repo, d), join(dir, d), { recursive: true });
  cpSync(join(repo, 'package.json'), join(dir, 'package.json'));
  cpSync(join(repo, 'registry.lock.json'), join(dir, 'registry.lock.json'));
  const lock = JSON.parse(readFileSync(join(repo, 'registry.lock.json'), 'utf8'));
  for (const key of Object.keys(lock)) {
    const [name, version] = key.split('@');
    cpSync(join(repo, 'packs', name, version), join(dir, 'packs', name, version), { recursive: true });
    cpSync(join(repo, 'packs', name, 'meta.json'), join(dir, 'packs', name, 'meta.json'));
  }
  return dir;
}
const run = (dir, env = {}) =>
  spawnSync(process.execPath, [join(dir, 'scripts/check.mjs')], {
    cwd: dir,
    encoding: 'utf8',
    env: { PATH: process.env.PATH, ...env }
  });
const out = r => `${r.stdout}\n${r.stderr}`;

after(() => made.forEach(d => rmSync(d, { recursive: true, force: true })));

test('locked packs that have not changed pass', () => {
  const r = run(scratch());
  assert.equal(r.status, 0, out(r));
});

test('a locked version that was edited is refused, even locally', () => {
  const dir = scratch();
  const v = join(dir, 'packs/core/1.0.0');
  const file = readdirSync(v).find(f => f.endsWith('--pack.md'));
  writeFileSync(join(v, file), readFileSync(join(v, file), 'utf8') + '\nAn edit after publishing.\n');
  const r = run(dir);
  assert.equal(r.status, 1, out(r));
  assert.match(out(r), /core@1\.0\.0 has changed since it was published/);
});

test('a locked version that was deleted is refused', () => {
  const dir = scratch();
  rmSync(join(dir, 'packs/dns'), { recursive: true });
  const r = run(dir);
  assert.equal(r.status, 1, out(r));
  assert.match(out(r), /dns@0.2.0 was published and has been removed/);
});

test('a version that is not locked yet is a note locally and an error in CI', () => {
  const dir = scratch();
  const lock = JSON.parse(readFileSync(join(dir, 'registry.lock.json'), 'utf8'));
  delete lock['links@1.0.0'];
  writeFileSync(join(dir, 'registry.lock.json'), JSON.stringify(lock, null, 2));
  const local = run(dir);
  assert.equal(local.status, 0, out(local));
  assert.match(out(local), /unreleased, so not locked yet: links@1\.0\.0/);
  const ci = run(dir, { CI: '1' });
  assert.equal(ci.status, 1, out(ci));
  assert.match(out(ci), /New versions are not locked yet: links@1\.0\.0/);
});

test('every pack has a tier', () => {
  const dir = scratch();
  rmSync(join(dir, 'packs/links/meta.json'));
  const r = run(dir);
  assert.equal(r.status, 1, out(r));
  assert.match(out(r), /needs a tier/);
  assert.ok(existsSync(join(repo, 'packs/core/meta.json')));
});
