// node scripts/status.mjs
// Which pack versions are locked (published, fixed) and which are still open to change.
//   locked    recorded in registry.lock.json and unchanged since
//   unlocked  not in registry.lock.json yet: free to edit, locked when you release (npm run lock)
//   CHANGED   locked but the files differ from what was locked: a published version must never change
// A locked version that no longer exists is reported as removed. Exits 1 if anything is CHANGED or removed.
// Deprecated packs and withdrawn versions (meta.json) are listed after the table; they never change the exit code.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRegistry } from '../lib/registry.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lockPath = join(root, 'registry.lock.json');
const lock = existsSync(lockPath) ? JSON.parse(readFileSync(lockPath, 'utf8')) : {};
const { versions } = await loadRegistry(root);

const cmp = (a, b) => {
  const x = a.split('.').map(Number),
    y = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};
const state = v => {
  const key = `${v.pack.name}@${v.pack.version}`;
  return !lock[key] ? 'unlocked' : lock[key] === v.sha256 ? 'locked' : 'CHANGED';
};

const byPack = new Map();
for (const v of versions) {
  if (!byPack.has(v.pack.name)) byPack.set(v.pack.name, []);
  byPack.get(v.pack.name).push(v);
}
const count = { locked: 0, unlocked: 0, CHANGED: 0 };
const open = [],
  changed = [];
const width = Math.max(...[...byPack.keys()].map(n => n.length));
for (const name of [...byPack.keys()].sort()) {
  const vs = byPack.get(name).sort((a, b) => cmp(a.pack.version, b.pack.version));
  const cells = vs.map(v => {
    const s = state(v);
    count[s]++;
    if (s === 'unlocked') open.push(`${name}@${v.pack.version}`);
    if (s === 'CHANGED') changed.push(`${name}@${v.pack.version}`);
    return `${v.pack.version} ${s}`;
  });
  console.log(`${name.padEnd(width)}  ${cells.join('   ')}`);
}
const retired = [...byPack.entries()].flatMap(([name, vs]) => {
  const meta = vs[0].meta,
    out = [];
  if (meta.deprecated) {
    const d = meta.deprecated;
    out.push(
      `${name}: deprecated since ${d.since}${d['replaced-by'] ? `, use ${d['replaced-by']}` : ''}${d.note ? ` (${d.note})` : ''}`
    );
  }
  for (const [v, why] of Object.entries(meta.withdrawn ?? {})) out.push(`${name}@${v}: withdrawn (${why})`);
  return out;
});
const removed = Object.keys(lock).filter(k => !versions.some(v => `${v.pack.name}@${v.pack.version}` === k));

console.log(
  `\n${versions.length} versions of ${byPack.size} packs: ${count.locked} locked, ${count.unlocked} unlocked` +
    (count.CHANGED ? `, ${count.CHANGED} CHANGED` : '') +
    (removed.length ? `, ${removed.length} removed` : '')
);
if (retired.length) console.log(`Retired:\n${retired.map(r => '  ' + r).join('\n')}`);
if (open.length) console.log(`Unlocked (editable until released): ${open.join(', ')}`);
if (changed.length) console.error(`CHANGED since locked, bump the version instead: ${changed.join(', ')}`);
if (removed.length) console.error(`Locked but removed, published versions stay: ${removed.join(', ')}`);
process.exit(changed.length || removed.length ? 1 : 0);
