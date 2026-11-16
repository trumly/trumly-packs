// The shared trumly formatting rules, tuned to how the code is already written:
// single quotes, no trailing commas, short arrows without parentheses, and long lines left alone.
export default {
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  printWidth: 120,
  tabWidth: 2,
  semi: true,
  singleAttributePerLine: false,
  svelteIndentScriptAndStyle: true,
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
