// Runs every rule over every pack's examples. `npm run check` only loads packs; it never checks that an example is clean.
// Each example is checked as a project of its own: the pack and what it requires (and what the example lists in `requires`),
// then the example's nodes, through the wasm core's check_json. Prints failing rules and structure findings.
// The bar: exit code 1, in an example, for an `error` severity failure, a rule the
// wasm is too old to run (`unsupported`), a load error or a structure error.
// A `warn` failure in a pack version that is not locked yet (still editable, so it can be fixed) is listed at the end as a
// warning, which is fine while you work. With --strict, or when CI is set, it fails the run. `info` findings, and warnings in
// a locked version (which cannot change), are only printed.
// Every pack's newest version must have an example (the README requires one). At the end it counts the rules no example ever
// evaluates; --coverage lists the names. Rules are proven by each pack's own tests/ (tests/pack-tests.test.mjs), not here.
// Usage: node scripts/check-examples.mjs [--strict] [--coverage] [pack]
// `npm test` runs this through tests/examples.test.mjs. Set DERIVED=1 to print every node's calculated values.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, check, newest, closure, list } from './packs-lib.mjs';
const strict = process.argv.includes('--strict') || !!process.env.CI;
const only = process.argv.slice(2).find(a => !a.startsWith('--'));
const listCoverage = process.argv.includes('--coverage');
/** rule id -> statuses an example gave it */
const seen = {};
const lock = existsSync(join(root, 'registry.lock.json'))
  ? JSON.parse(readFileSync(join(root, 'registry.lock.json'), 'utf8'))
  : {};
/** warnings in versions that are not locked yet: pack@version -> count */
const open = {};
const total = { examples: 0, broken: 0, warnings: 0 };
for (const n of readdirSync(join(root, 'packs')).filter(d => d !== '.gitkeep')) {
  if (only && n !== only) continue;
  const v = newest(n),
    dir = join(root, 'packs', n, v, 'examples');
  if (!existsSync(dir) || !readdirSync(dir).length) {
    total.broken++;
    process.exitCode = 1;
    console.log(`${n}@${v}: NO EXAMPLE. Every pack needs one that checks clean (packs/${n}/${v}/examples/<name>/).`);
    continue;
  }
  for (const ex of readdirSync(dir)) {
    const files = {};
    const exm = readFileSync(join(dir, ex, 'example.md'), 'utf8');
    const req = [n, ...list(exm.replace(/^fields:/m, 'fields:').replace(/^ {2}requires:/m, '  requires:'), 'requires')];
    const all = [];
    for (const q of req) for (const c of closure(q)) if (!all.includes(c)) all.push(c);
    for (const p of all) {
      const d = join(root, 'packs', p, newest(p));
      for (const f of readdirSync(d)) if (f.endsWith('.md')) files[f] = readFileSync(join(d, f), 'utf8');
    }
    const ed = join(dir, ex);
    for (const f of readdirSync(ed)) if (f.endsWith('.md')) files[f] = readFileSync(join(ed, f), 'utf8');
    const r = check(files);
    if (r.error) {
      console.log('ERR', String(r.error).slice(0, 300));
      continue;
    }
    for (const f of r.results || []) (seen[f.rule] ||= new Set()).add(f.status);
    if (process.env.DERIVED)
      for (const nd of r.nodes || [])
        if (nd.derived) console.log('   DERIVED', nd.id, JSON.stringify(nd.derived).slice(0, 300));
    const fail = (r.results || r.findings || []).filter(f => f.status === 'fail' || f.status === 'unsupported');
    console.log(
      `${n}@${v}/${ex}: keys=${Object.keys(r).join(',')} load_errors=${(r.load_errors || []).length} fails=${fail.length}`
    );
    for (const f of fail.slice(0, 8)) console.log('   ', JSON.stringify(f).slice(0, 200));
    const st = r.structure || {};
    const hard = [
      ...fail.filter(f => f.status === 'unsupported' || f.severity === 'error'),
      ...(r.load_errors || []),
      ...(st.errors || [])
    ];
    total.examples++;
    total.warnings += fail.filter(f => f.status === 'fail' && f.severity !== 'error').length;
    const fixable = fail.filter(f => f.status === 'fail' && f.severity === 'warn').length;
    if (fixable && !lock[`${n}@${v}`]) open[`${n}@${v}`] = (open[`${n}@${v}`] || 0) + fixable;
    if (hard.length) {
      total.broken++;
      process.exitCode = 1;
      console.log(
        `    FAILS THE CHECK: ${hard.length} error${hard.length === 1 ? '' : 's'}${fail.some(f => f.status === 'unsupported') ? ' (a rule is newer than the wasm in vendor/: rebuild it)' : ''}`
      );
    }
    for (const e of [
      ...(st.errors || []).map(e => 'STRUCT-E ' + JSON.stringify(e)),
      ...(st.warnings || []).map(e => 'STRUCT-W ' + JSON.stringify(e))
    ].slice(0, 6))
      console.log('   ', e.slice(0, 220));
    for (const e of (r.load_errors || []).slice(0, 5)) console.log('   LOAD', JSON.stringify(e).slice(0, 200));
  }
}

// Which rules an example evaluates at all (the rules themselves are proven by each pack's tests/, see tests/pack-tests.test.mjs).
const ruleIds = n => {
  const d = join(root, 'packs', n, newest(n));
  return readdirSync(d)
    .filter(f => f.endsWith('.md') && /^type: rule$/m.test(readFileSync(join(d, f), 'utf8')))
    .map(f => f.replace(/\.md$/, ''));
};
const rules = readdirSync(join(root, 'packs'))
  .filter(d => d !== '.gitkeep' && (!only || d === only))
  .map(n => ({ n, ids: ruleIds(n) }));
const all = rules.flatMap(r => r.ids);
const never = rules.map(r => ({ n: r.n, ids: r.ids.filter(i => !seen[i]) }));
const count = l => l.reduce((t, x) => t + x.ids.length, 0);
console.log(
  `\nRule coverage: ${count(never)} of ${all.length} rules are never evaluated by an example (no node it applies to).`
);
if (listCoverage)
  for (const x of never) if (x.ids.length) console.log(`  ${x.n}: never evaluated: ${x.ids.join(', ')}`);
const unreleased = Object.entries(open);
if (unreleased.length && strict) process.exitCode = 1;
console.log(
  `\n${total.examples} example${total.examples === 1 ? '' : 's'} checked: ${total.broken} with errors, ${total.warnings} warning or info finding${total.warnings === 1 ? '' : 's'}${process.exitCode ? ' (exit 1)' : ''}`
);
if (unreleased.length)
  console.log(
    `${strict ? 'FAIL' : 'WARNING'}: warnings in versions that are not released yet: ${unreleased.map(([k, c]) => `${k} (${c})`).join(', ')}.\n` +
      (strict
        ? 'Fix them before release (this run is strict).'
        : 'Fine while you work. CI, and --strict, fail on these.')
  );
