// Replays each pack's own tests (packs/<pack>/tests/*.json) against its older, locked versions.
//
// A locked version cannot change, but the engine that runs its rules can (vendor/trumly.wasm is rebuilt). The pack tests
// follow the newest version, so without this nothing would notice a new engine reading an old rule differently.
//
// A test file is replayed against an older version only when the rule in it is the same rule there: the same text, apart
// from the version in its `pack:` tag. A case is skipped when it uses a type the older version does not have yet. A rule that
// changed, or one the older version did not have, is not replayed: its behaviour is the newest version's to prove.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { root, check, packNames, newest, sv } from '../scripts/packs-lib.mjs';
import { toMd, engineFiles } from './scene.mjs';

const LISTS = ['pass', 'fail', 'advisory'];
const lock = JSON.parse(readFileSync(join(root, 'registry.lock.json'), 'utf8'));
const versionsOf = pack =>
  readdirSync(join(root, 'packs', pack))
    .filter(d => /^\d+\.\d+\.\d+$/.test(d))
    .sort((a, b) => {
      const [A, B] = [sv(a), sv(b)];
      return A[0] - B[0] || A[1] - B[1] || A[2] - B[2];
    });
const nodeFiles = (pack, version) => {
  const dir = join(root, 'packs', pack, version);
  return Object.fromEntries(
    readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => [f, readFileSync(join(dir, f), 'utf8')])
  );
};
/** the text of a node with its version tag taken out, so the same rule in two versions compares equal */
const same = t => t.replace(/^ {2}pack: .*$/m, '  pack:');
/** the files the engine reads for an older version: the newest packs it needs, with this pack's own files swapped for its older ones */
const filesFor = (pack, version) => {
  const files = engineFiles(pack);
  for (const f of Object.keys(nodeFiles(pack, newest(pack)))) delete files[f];
  return Object.assign(files, nodeFiles(pack, version));
};
const typesOf = files =>
  new Set(
    Object.values(files)
      .map(t => t.match(/^id: .*\ntype: type\n[\s\S]*?^ {2}name: (.+)$/m)?.[1])
      .filter(Boolean)
  );
const statusOf = (out, rule, id) => out.results.find(r => r.rule === rule && r.node === id)?.status ?? 'not checked';

for (const pack of packNames().sort()) {
  const dir = join(root, 'packs', pack, 'tests');
  if (!existsSync(dir)) continue;
  const latest = newest(pack);
  const older = versionsOf(pack).filter(v => v !== latest && lock[`${pack}@${v}`]);
  for (const version of older) {
    const then = nodeFiles(pack, version);
    const now = nodeFiles(pack, latest);
    const newTypes = [...typesOf(now)].filter(t => !typesOf(then).has(t));
    for (const f of readdirSync(dir)
      .filter(f => f.endsWith('.json'))
      .sort()) {
      const t = JSON.parse(readFileSync(join(dir, f), 'utf8'));
      const file = `${t.rule}.md`;
      if (!then[file] || !now[file] || same(then[file]) !== same(now[file])) continue;
      test(`${pack}@${version} replays tests/${f}`, () => {
        for (const c of t.cases) {
          if (c.nodes.some(x => newTypes.includes(x.type))) continue;
          const files = filesFor(pack, version);
          for (const x of c.nodes) files[`${x.id}.md`] = toMd(x);
          const out = check(files);
          assert.deepEqual(out.load_errors, [], `${c.name}: the nodes load`);
          for (const l of LISTS)
            for (const id of c[l] ?? []) assert.equal(statusOf(out, t.rule, id), l, `${c.name}: ${id} should ${l}`);
        }
      });
    }
  }
}

test('a rule that changed between versions is not replayed', () => {
  assert.notEqual(same('  pack: a@1.0.0\n  max: 1\n'), same('  pack: a@1.1.0\n  max: 2\n'));
  assert.equal(same('  pack: a@1.0.0\n  max: 1\n'), same('  pack: a@1.1.0\n  max: 1\n'));
});
