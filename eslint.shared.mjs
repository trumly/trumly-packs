// The shared trumly lint rules. Edit here, then `npm run sync:lint` in each repo to pick it up.
// Correctness rules are errors. Style is left to the editor: no formatter rules live here.
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';

const ignores = ['**/node_modules/**', '**/dist/**', '**/dist-embed/**', '**/build/**', '**/.svelte-kit/**', '**/.vercel/**', '**/.data/**', '**/*.tgz', '**/static/**', '**/public/**', '**/vendor/**'];

const rules = {
  // real bugs
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none', ignoreRestSiblings: true }],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { attributes: false } }],
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/no-unnecessary-type-assertion': 'off',   // tsc and svelte-check cover it; noisy in tests
  '@typescript-eslint/no-base-to-string': 'off',
  'no-control-regex': 'off',
  'no-regex-spaces': 'off',
  '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports', disallowTypeAnnotations: false }],
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'no-useless-escape': 'warn',
  'no-var': 'error',
  'prefer-const': 'error',
  'no-console': 'off',
  'no-empty': ['error', { allowEmptyCatch: true }],
  // used on purpose in this code base
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
};

const typeAware = ['no-floating-promises', 'no-misused-promises', 'await-thenable'];
/** the same rules without those that need type information, for monorepos with one tsconfig per app */
const untyped = Object.fromEntries(Object.entries(rules).filter(([k]) => !typeAware.some(t => k.endsWith('/' + t))));

/** TypeScript (and plain JS) files. `root` is the repo's directory. `typed: false` skips the rules that need type information. */
export function typescript({ root, globals: g = 'node', typed = true } = {}) {
  const r = typed ? rules : untyped;
  const parserOptions = typed ? { projectService: true, tsconfigRootDir: root } : {};
  return [
    { ignores },
    js.configs.recommended,
    ...(typed ? tseslint.configs.recommendedTypeChecked : tseslint.configs.recommended).map(c => ({ ...c, files: ['**/*.ts', '**/*.tsx'] })),
    {
      files: ['**/*.ts', '**/*.tsx'],
      languageOptions: { parserOptions, globals: globals[g] },
      rules: {
        ...r,
        // from the type-checked set: too noisy for code that handles untyped JSON on purpose
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'off',
      },
    },
    // files outside every tsconfig (dot folders, e2e helpers): linted without type information
    { files: ['**/.well-known/**/*.ts', 'e2e/**/*.ts', '*.config.ts', '**/*.config.ts'], ...tseslint.configs.disableTypeChecked },
    {
      files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
      languageOptions: { globals: { ...globals.node, ...globals.browser } },
      rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }], eqeqeq: ['error', 'always', { null: 'ignore' }], 'no-var': 'error', 'prefer-const': 'error', 'no-empty': ['error', { allowEmptyCatch: true }] },
    },
  ];
}

/** TypeScript plus Svelte 5 components. */
export function sveltekit({ root, globals: g = 'browser', typed = true } = {}) {
  const r = typed ? rules : untyped;
  const parserOptions = typed ? { projectService: true, tsconfigRootDir: root } : {};
  return [
    ...typescript({ root, globals: g, typed }),
    ...svelte.configs['flat/recommended'],
    {
      files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
      plugins: { '@typescript-eslint': tseslint.plugin },
      languageOptions: { parserOptions: { ...parserOptions, extraFileExtensions: ['.svelte'], parser: tseslint.parser }, globals: { ...globals.browser } },
      rules: {
        ...r,
        '@typescript-eslint/no-floating-promises': 'off',   // event handlers fire and forget
        'prefer-const': 'off',                              // `let { data } = $props()` is the Svelte 5 idiom
        'svelte/no-at-html-tags': 'error',
        'svelte/require-each-key': 'warn',      // keyed lists keep their state when reordered; add keys as you touch a list
        'svelte/no-navigation-without-resolve': 'off',
        'svelte/prefer-svelte-reactivity': 'off',        // plain Maps and Sets used as locals are fine; it cannot tell them from state
        'svelte/no-useless-children-snippet': 'off',
        'svelte/no-useless-mustaches': 'off',
      },
    },
  ];
}

/** Plain JavaScript repos (node scripts and tests, no TypeScript). */
export function javascript({ root, globals: g = 'node' } = {}) {
  return typescript({ root, globals: g, typed: false });
}
