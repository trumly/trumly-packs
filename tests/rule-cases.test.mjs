// Proves every rule in every pack's newest version, with nodes made up from the rule itself.
//
// For each rule a node it applies to is built that must FAIL its check, and another that must PASS, then both are run through the
// real engine (vendor/trumly.wasm) together with the pack and what it requires. So a rule that never fires, always fires, or is
// mistyped (a link type that does not exist, a field name with a typo) is caught here, not by a user.
//
// This builds cases for the common checks, so a new rule often needs nothing more. A rule it cannot build one for (a filter on a
// field, a check on another node's fields, comparing two fields...) must have a test in its own pack: packs/<pack>/tests/.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { root, check, packNames, newest } from '../scripts/packs-lib.mjs';
import { toMd, engineFiles } from './scene.mjs';

const arr = v => (v === undefined ? [] : Array.isArray(v) ? v : [v]);

class Unbuildable extends Error {}
const no = what => {
  throw new Unbuildable(what);
};

/** a fresh scene: the subject node (one the rule applies to) plus anything made up around it */
const scene = (rule, tag) => {
  const w = rule.fields.applies_to ?? {};
  const type = arr(w.type)[0];
  if (!type) return null;
  const subject = { id: `zz-${tag}-subject`, type, title: 'subject', fields: {}, links: [] };
  const plane = arr(w.plane)[0];
  if (plane) subject.plane = plane;
  for (const [k, v] of Object.entries(w)) {
    if (k === 'type' || k === 'plane') continue;
    // other filters: only a plain top-level field equal to a plain value can be built
    if (k === 'id' || k === 'under' || /[.[\]]/.test(k) || (typeof v === 'object' && v !== null)) return null;
    subject.fields[k] = v;
  }
  return { subject, extra: [], n: 0, tag };
};
const made = (s, type, plane) => {
  const o = { id: `zz-${s.tag}-other-${++s.n}`, type: type ?? 'note', title: 'other', fields: {}, links: [] };
  if (plane) o.plane = plane;
  s.extra.push(o);
  return o;
};
const setPath = (obj, path, value) => {
  const parts = path.split('.');
  if (parts.some(p => !p || p.includes('[') || p.includes(']'))) no(`field path ${path}`);
  let o = obj;
  for (const p of parts.slice(0, -1)) o = o[p] ??= {};
  o[parts.at(-1)] = value;
};

const SIMPLE_LINK = ['type', 'dir', 'node_type', 'node_plane', 'to_type', 'to_plane', 'min', 'max'];
const addLink = (s, i) => {
  const o = made(s, i.node_type ?? i.to_type, i.node_plane ?? i.to_plane);
  (i.dir === 'in' ? o : s.subject).links.push({ type: i.type, to: i.dir === 'in' ? s.subject.id : o.id });
};
/** each builder returns functions that change a scene to satisfy (`ok`) or to break (`bad`) one check key */
const builders = {
  require_fields: paths => ({
    ok: s => arr(paths).forEach(p => setPath(s.subject.fields, p, 'x')),
    bad: () => {}
  }),
  require_link: spec => {
    const items = arr(spec);
    for (const i of items) {
      for (const k of Object.keys(i)) if (!SIMPLE_LINK.includes(k)) no(`require_link ${k}`);
      if (i.max !== undefined && (i.min ?? 1) > i.max) no('require_link bounds');
    }
    return {
      ok: s =>
        items.forEach(i => {
          for (let c = 0; c < (i.min ?? (i.max !== undefined ? 0 : 1)); c++) addLink(s, i);
        }),
      bad: () => {}
    };
  },
  forbid_link: spec => {
    const items = arr(spec);
    for (const i of items) for (const k of Object.keys(i)) if (!SIMPLE_LINK.includes(k)) no(`forbid_link ${k}`);
    return { ok: () => {}, bad: s => addLink(s, items[0]) };
  },
  acyclic: types => ({
    ok: () => {},
    bad: s => s.subject.links.push({ type: arr(types)[0], to: s.subject.id })
  }),
  require_link_fields: spec => {
    const items = arr(spec);
    if (items.length !== 1 || (items[0].dir ?? 'out') !== 'out') no('require_link_fields shape');
    return {
      // links of that type must carry the fields (those the other checks made, if any)
      ok: s =>
        s.subject.links
          .filter(l => l.type === items[0].type)
          .forEach(l => arr(items[0].fields).forEach(f => ((l.fields ??= {})[f] = 'x'))),
      bad: s => {
        const o = made(s);
        s.subject.links.push({ type: items[0].type, to: o.id });
      }
    };
  },
  field_is: spec => {
    const names = Object.keys(spec);
    if (names.length !== 1) no('field_is with several fields');
    const [name] = names,
      c = spec[name];
    const put = (s, v) => (name === 'title' ? (s.subject.title = v) : setPath(s.subject.fields, name, v));
    let good, bad;
    if (c.in) {
      good = c.in[0];
      bad = '__not-allowed__';
    } else if (c.max_bytes !== undefined || c.max_length !== undefined) {
      good = 'a';
      bad = 'a'.repeat(Math.max(c.max_bytes ?? 0, c.max_length ?? 0) + 1);
    } else if (c.min_length !== undefined) {
      good = 'a'.repeat(c.min_length);
      bad = c.min_length > 0 ? 'a'.repeat(c.min_length - 1) : no('min_length 0');
    } else if (c.type) {
      const ex = { string: 's', number: 1.5, integer: 1, boolean: true, list: [], map: {} };
      good = ex[c.type];
      bad = c.type === 'string' ? 1 : 's';
    } else no('field_is constraint');
    return { ok: s => put(s, good), bad: s => put(s, bad) };
  },
  any_of: list => {
    const alts = list.map(c => build(c));
    return { ok: s => alts[0].ok(s), bad: s => alts.forEach(a => a.bad(s)) };
  }
};
/** the builders for one check map: all keys must hold to pass; to fail it is enough that one breaks */
function build(checkMap) {
  const keys = Object.keys(checkMap);
  if (!keys.length) no('empty check');
  const parts = keys.map(k => {
    if (!builders[k]) no(`check ${k}`);
    return builders[k](checkMap[k]);
  });
  return {
    ok: s => parts.forEach(p => p.ok(s)),
    bad: s => {
      parts.slice(1).forEach(p => p.ok(s));
      parts[0].bad(s);
    }
  };
}

for (const pack of packNames().sort()) {
  test(`${pack}@${newest(pack)}: every rule fails and passes the nodes built from it`, () => {
    const files = engineFiles(pack);
    const rules = check(files).nodes.filter(
      n => n.type === 'rule' && String(n.fields?.pack ?? '').startsWith(`${pack}@`)
    );
    const skipped = [],
      cases = [];
    let tag = 0;
    for (const rule of rules) {
      if (!rule.fields.check || !Object.keys(rule.fields.check).length) {
        skipped.push(rule.id); // advisory: nothing to fail
        continue;
      }
      try {
        const t = `r${++tag}`;
        const okScene = scene(rule, `${t}p`),
          badScene = scene(rule, `${t}f`);
        if (!okScene) no('applies_to');
        const b = build(rule.fields.check);
        b.ok(okScene);
        b.bad(badScene);
        for (const s of [okScene, badScene]) for (const n of [s.subject, ...s.extra]) files[`${n.id}.md`] = toMd(n);
        cases.push({ id: rule.id, passId: okScene.subject.id, failId: badScene.subject.id });
      } catch (e) {
        if (!(e instanceof Unbuildable)) throw e;
        skipped.push(rule.id);
      }
    }
    const out = check(files);
    assert.deepEqual(out.load_errors, [], 'the made-up nodes load');
    const problems = [];
    for (const c of cases) {
      const res = id => out.results.find(r => r.rule === c.id && r.node === id)?.status;
      if (res(c.passId) !== 'pass') problems.push(`${c.id}: a node built to pass got ${res(c.passId) ?? 'no result'}`);
      if (res(c.failId) !== 'fail') problems.push(`${c.id}: a node built to fail got ${res(c.failId) ?? 'no result'}`);
    }
    assert.deepEqual(problems, [], problems.join('\n'));
    // what the generator cannot build, the pack's owner covers in packs/<pack>/tests/<rule>.json (see tests/pack-tests.test.mjs)
    const own = existsSync(join(root, 'packs', pack, 'tests'))
      ? readdirSync(join(root, 'packs', pack, 'tests')).map(f => f.replace(/\.json$/, ''))
      : [];
    const bare = skipped.filter(id => !own.includes(id));
    assert.deepEqual(
      bare,
      [],
      `no test for: ${bare.join(', ')}. Add packs/${pack}/tests/<rule-id>.json for each (see the README, "Testing your pack").`
    );
  });
}
