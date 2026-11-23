// Runs the tests each pack carries itself: packs/<pack>/tests/*.json. The owner of a pack writes and maintains these, so
// a submission arrives with the proof that its rules work. They are data, not code, so a pull request cannot run anything.
//
// One file tests one rule, and is named for it (<rule-id>.json):
//   {
//     "rule": "abc--rule-name",           the rule's id, in this pack's newest version
//     "cases": [
//       {
//         "name": "what this case shows",
//         "note": "why, if it needs saying",        (optional)
//         "nodes": [ ... ],                          a small project, added to the pack and what it requires
//         "pass": ["thing-1"],                       nodes the rule must PASS
//         "fail": ["thing-2"],                       nodes the rule must FAIL
//         "advisory": ["thing-3"]                    nodes of a rule with no check: it only advises
//       }
//     ]
//   }
// A node is { "id", "type", "title"?, "fields"?, "links"?: [{ "type", "to", "fields"? }], "parent"?, "plane"? }.
// Each case runs through the real engine (vendor/trumly.wasm), with rules a pack ships switched off turned on. A rule needs
// at least one node that passes and one that fails (the edges count: a value one under the limit and one over). Nodes the case
// names in none of the lists are not asserted. tests/rule-cases.test.mjs builds cases for the common checks by itself; a rule it
// cannot (it filters on a field, reads another node's fields, compares fields) needs one of these files.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { root, check, packNames, newest } from '../scripts/packs-lib.mjs';
import { toMd, engineFiles } from './scene.mjs';

const KEYS = ['rule', 'cases'];
const CASE_KEYS = ['name', 'note', 'nodes', 'pass', 'fail', 'advisory'];
const NODE_KEYS = ['id', 'type', 'title', 'fields', 'links', 'parent', 'plane'];
const LISTS = ['pass', 'fail', 'advisory'];

/** what is wrong with a test file, in words an author can act on. `rules` maps rule id to 'check' or 'advisory'. */
export function problemsWith(t, rules) {
  const out = [];
  if (!t || typeof t !== 'object' || Array.isArray(t)) return ['the file must hold one object'];
  for (const k of Object.keys(t)) if (!KEYS.includes(k)) out.push(`unknown key "${k}" (known: ${KEYS.join(', ')})`);
  if (typeof t.rule !== 'string') out.push('"rule" must be the rule id');
  else if (!rules.has(t.rule)) out.push(`"${t.rule}" is not a rule of this pack's newest version`);
  if (!Array.isArray(t.cases) || !t.cases.length) return [...out, '"cases" must be a list with at least one case'];
  const total = { pass: 0, fail: 0, advisory: 0 };
  t.cases.forEach((c, i) => {
    const at = `cases[${i}]${c?.name ? ` (${c.name})` : ''}`;
    if (!c || typeof c !== 'object') return out.push(`${at} must be an object`);
    for (const k of Object.keys(c))
      if (!CASE_KEYS.includes(k)) out.push(`${at}: unknown key "${k}" (known: ${CASE_KEYS.join(', ')})`);
    if (typeof c.name !== 'string' || !c.name) out.push(`${at}: give the case a "name"`);
    if (!Array.isArray(c.nodes) || !c.nodes.length) return out.push(`${at}: "nodes" must be a list of nodes`);
    const ids = c.nodes.map(x => x?.id);
    if (new Set(ids).size !== ids.length) out.push(`${at}: a node id is repeated`);
    for (const x of c.nodes) {
      if (typeof x?.id !== 'string' || typeof x?.type !== 'string')
        out.push(`${at}: every node needs an "id" and a "type"`);
      for (const k of Object.keys(x ?? {})) if (!NODE_KEYS.includes(k)) out.push(`${at}: unknown node key "${k}"`);
    }
    for (const l of LISTS) {
      if (c[l] === undefined) continue;
      if (!Array.isArray(c[l])) {
        out.push(`${at}: "${l}" must be a list of node ids`);
        continue;
      }
      total[l] += c[l].length;
      for (const id of c[l])
        if (!ids.includes(id)) out.push(`${at}: "${l}" names "${id}", which is not one of its nodes`);
    }
  });
  if (rules.get(t.rule) === 'advisory') {
    if (total.pass || total.fail) out.push('this rule has no check, so it only advises: list nodes under "advisory"');
    if (!total.advisory) out.push('a case needs a node under "advisory"');
  } else {
    if (!total.pass) out.push('no case has a node that must pass');
    if (!total.fail) out.push('no case has a node that must fail');
    if (total.advisory) out.push('only a rule with no check advises');
  }
  return out;
}

const statusOf = (out, rule, id) => out.results.find(r => r.rule === rule && r.node === id)?.status ?? 'not checked';

for (const pack of packNames().sort()) {
  const dir = join(root, 'packs', pack, 'tests');
  if (!existsSync(dir)) continue;
  test(`${pack}: tests/ holds only .json files`, () =>
    assert.deepEqual(
      readdirSync(dir).filter(f => !f.endsWith('.json')),
      []
    ));
  const rules = new Map(
    check(engineFiles(pack))
      .nodes.filter(n => n.type === 'rule' && String(n.fields?.pack ?? '').startsWith(`${pack}@`))
      .map(n => [n.id, Object.keys(n.fields.check ?? {}).length ? 'check' : 'advisory'])
  );
  for (const f of readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort())
    test(`${pack}@${newest(pack)} tests/${f}`, () => {
      const t = JSON.parse(readFileSync(join(dir, f), 'utf8'));
      assert.deepEqual(problemsWith(t, rules), [], `${f} is not a valid test`);
      assert.equal(f, `${t.rule}.json`, 'the file is named for its rule');
      for (const c of t.cases) {
        const files = engineFiles(pack);
        for (const x of c.nodes) files[`${x.id}.md`] = toMd(x);
        const out = check(files);
        assert.deepEqual(out.load_errors, [], `${c.name}: the nodes load`);
        for (const l of LISTS)
          for (const id of c[l] ?? []) assert.equal(statusOf(out, t.rule, id), l, `${c.name}: ${id} should ${l}`);
      }
    });
}

test('a test file with mistakes is told what is wrong', () => {
  const rules = new Map([['r1', 'check']]);
  const bad = { rule: 'nope', extra: 1, cases: [{ nodes: [{ id: 'x', type: 't', colour: 1 }], pass: ['s'], fail: 3 }] };
  const msgs = problemsWith(bad, rules).join('\n');
  for (const m of [
    'unknown key "extra"',
    'not a rule of this pack',
    'give the case a "name"',
    'unknown node key "colour"',
    'which is not one of its nodes',
    '"fail" must be a list'
  ])
    assert.match(msgs, new RegExp(m));
  assert.match(
    problemsWith({ rule: 'r1', cases: [{ name: 'a', nodes: [{ id: 'x', type: 't' }], pass: ['x'] }] }, rules).join(),
    /no case has a node that must fail/
  );
});
