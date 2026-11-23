// node scripts/check.mjs [--update-lock] [--pack] [--strict]
// Checks every pack in packs/, the same way the spec site will when it publishes them.
//   --update-lock  record the checksum of versions that are new (maintainers only, when merging)
//   --pack         also write dist/packs.tgz: packs/ and registry.lock.json, what the site fetches
//   --strict       a version that is not locked yet is an error (always on in CI). Locally it is only a note: versions are
//                  locked when you release (release.sh runs the lock), so you can keep editing an unreleased version freely.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkLibrary, loadRegistry } from '../lib/registry.mjs';
import { suspicious } from './agent-text.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const update = process.argv.includes('--update-lock'),
  pack = process.argv.includes('--pack'),
  strict = process.argv.includes('--strict') || !!process.env.CI;
const { versions, errors } = await loadRegistry(root);
errors.push(...checkLibrary(versions).errors);

for (const v of versions) {
  if (!v.meta.tier) errors.push(`${v.pack.name}: packs/${v.pack.name}/meta.json needs a tier (verified or community)`);
}

// Text that reads as an instruction to an agent is not an error (it can be a false match) but a reviewer must look at it.
const flagged = [];
for (const v of versions)
  for (const [file, text] of [...v.pack.files, ...v.pack.sampleFiles])
    for (const m of suspicious(String(text)))
      flagged.push(`${v.pack.name}@${v.pack.version} ${file}:${m.line}  ${m.text}`);
if (flagged.length)
  console.warn(
    'Review: text that reads as an instruction to an agent (a pack must describe a design, never direct a reader):\n' +
      flagged.map(f => '  ' + f).join('\n')
  );

const lockPath = join(root, 'registry.lock.json');
const lock = existsSync(lockPath) ? JSON.parse(readFileSync(lockPath, 'utf8')) : {},
  next = { ...lock };
for (const v of versions) {
  const key = `${v.pack.name}@${v.pack.version}`;
  if (lock[key] && lock[key] !== v.sha256)
    errors.push(`${key} has changed since it was published. Published versions are fixed: bump the version instead.`);
  else if (!lock[key]) next[key] = v.sha256;
}
for (const key of Object.keys(lock))
  if (!versions.some(v => `${v.pack.name}@${v.pack.version}` === key))
    errors.push(`${key} was published and has been removed. Published versions stay.`);
if (errors.length) {
  console.error('Packs not accepted:\n' + errors.map(e => '  ' + e).join('\n'));
  process.exit(1);
}

const added = Object.keys(next).filter(k => !lock[k]);
if (added.length && !update) {
  if (strict) {
    console.error(
      `New versions are not locked yet: ${added.join(', ')}\nA maintainer runs: npm run lock (and commits registry.lock.json)`
    );
    process.exit(1);
  }
  // not an error while working: the release locks them, and until then they can still change
  console.log(`${versions.length} pack version(s) checked; unreleased, so not locked yet: ${added.join(', ')}.`);
  process.exit(0);
}
if (added.length)
  writeFileSync(lockPath, JSON.stringify(Object.fromEntries(Object.entries(next).sort()), null, 2) + '\n');
console.log(`${versions.length} pack version(s) checked${added.length ? `, ${added.length} locked` : ''}.`);

if (pack) {
  mkdirSync(join(root, 'dist'), { recursive: true });
  const t = spawnSync('tar', ['czf', join(root, 'dist/packs.tgz'), '-C', root, 'packs', 'registry.lock.json'], {
    stdio: 'inherit'
  });
  if (t.status !== 0) process.exit(1);
  console.log('dist/packs.tgz written.');
}
