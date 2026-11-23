// node scripts/mint.mjs <pack> [patch|minor|major|x.y.z]
// Starts the next version of a pack: copies its newest version to a new folder, sets the new version in the manifest and in the
// `pack: <name>@<version>` tag on every file. The new version is not locked, so you can keep changing it (in the local dev
// server too) until the release locks it. The version you copied from is left alone.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [name, how = 'minor'] = process.argv.slice(2);
const semver = v => (/^\d+\.\d+\.\d+$/.test(v) ? v.split('.').map(Number) : null);
const cmp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
const fail = m => {
  console.error(m);
  process.exit(1);
};
if (!name) fail('usage: npm run mint -- <pack> [patch|minor|major|x.y.z]');
const dir = join(root, 'packs', name);
if (!existsSync(dir)) fail(`no pack called ${name} in packs/`);
const have = readdirSync(dir)
  .filter(d => semver(d) && statSync(join(dir, d)).isDirectory())
  .sort((a, b) => cmp(semver(a), semver(b)));
if (!have.length) fail(`${name} has no versions`);
const from = have.at(-1),
  [ma, mi, pa] = semver(from);
const next = semver(how)
  ? how
  : how === 'major'
    ? `${ma + 1}.0.0`
    : how === 'patch'
      ? `${ma}.${mi}.${pa + 1}`
      : how === 'minor'
        ? `${ma}.${mi + 1}.0`
        : null;
if (!next) fail(`"${how}" is not patch, minor, major or a version like 1.2.0`);
if (have.includes(next)) fail(`${name}@${next} already exists`);
if (cmp(semver(next), semver(from)) <= 0) fail(`${next} is not newer than ${from}`);

const to = join(dir, next);
// file by file, so a folder that is a network or synced mount copies as reliably as a local one
const copy = (a, b) => {
  mkdirSync(b, { recursive: true });
  for (const e of readdirSync(a)) {
    const [x, y] = [join(a, e), join(b, e)];
    if (statSync(x).isDirectory()) copy(x, y);
    else writeFileSync(y, readFileSync(x));
  }
};
copy(join(dir, from), to);
const retag = `${name}@${from}`;
let files = 0;
const walk = d => {
  for (const e of readdirSync(d)) {
    const f = join(d, e);
    if (statSync(f).isDirectory()) walk(f);
    else if (/\.(md|json|ya?ml|txt)$/.test(e)) {
      const t = readFileSync(f, 'utf8');
      let u = t.split(retag).join(`${name}@${next}`);
      if (/--pack\.md$/.test(e))
        u = u.replace(new RegExp(`^(\\s*version:\\s*)${from.replaceAll('.', '\\.')}\\s*$`, 'm'), `$1${next}`);
      if (u !== t) {
        writeFileSync(f, u);
        files++;
      }
    }
  }
};
walk(to);
console.log(
  `${name}@${next} started from ${from} (${files} files updated). Not locked: change it freely; the release locks it.`
);
