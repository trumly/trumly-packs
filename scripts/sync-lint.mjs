// Copies the shared lint and format rules from the sibling trumly-lint repo: `npm run sync:lint`.
// `npm run sync:lint -- --check` fails if the copies are behind (release.sh runs it).
import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const here = p => fileURLToPath(new URL('../' + p, import.meta.url));
// the lint rules repo: TRUMLY_LINT, or a trumly-lint folder next to this one
const lint = (process.env.TRUMLY_LINT || here('../trumly-lint')).replace(/\/$/, '');
const pairs = [
  [lint + '/base.mjs', 'eslint.shared.mjs'],
  [lint + '/prettier.mjs', 'prettier.config.mjs'],
  [lint + '/editorconfig', '.editorconfig'],
  [lint + '/prettierignore', '.prettierignore']
];
const from = p => (p.startsWith('/') ? p : here(p));
if (!existsSync(from(pairs[0][0]))) {
  console.error('Cannot find trumly-lint. Set TRUMLY_LINT to its folder, or clone it next to this repo.');
  process.exit(1);
}
const behind = pairs.filter(
  ([f, to]) => !existsSync(here(to)) || readFileSync(from(f), 'utf8') !== readFileSync(here(to), 'utf8')
);
if (process.argv.includes('--check')) {
  if (behind.length) {
    console.error(`Behind trumly-lint: ${behind.map(b => b[1]).join(', ')}. Run: npm run sync:lint`);
    process.exit(1);
  }
  process.exit(0);
}
for (const [f, to] of pairs) copyFileSync(from(f), here(to));
console.log('lint and format files updated from trumly-lint');
