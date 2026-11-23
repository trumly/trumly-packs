// Shared by the pack checks: the engine (vendor/trumly.wasm), a pack's newest version, and the packs a pack needs.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = fileURLToPath(new URL('..', import.meta.url));
const wasm = root + '/vendor/trumly.wasm';
const x = new WebAssembly.Instance(new WebAssembly.Module(readFileSync(wasm)), {}).exports;
export function check(files) {
  const input = new TextEncoder().encode(JSON.stringify(Array.isArray(files) ? files : Object.entries(files))),
    ptr = x.alloc(input.length);
  new Uint8Array(x.memory.buffer, ptr, input.length).set(input);
  const packed = x.check_json(ptr, input.length),
    p = Number(packed >> 32n),
    l = Number(packed & 0xffffffffn);
  const r = JSON.parse(new TextDecoder().decode(new Uint8Array(x.memory.buffer, p, l)));
  return r;
}
export const sv = v => v.split('.').map(Number);
export const newest = n =>
  readdirSync(join(root, 'packs', n))
    .filter(d => /^\d+\.\d+\.\d+$/.test(d))
    .sort((a, b) => {
      const A = sv(a),
        B = sv(b);
      return A[0] - B[0] || A[1] - B[1] || A[2] - B[2];
    })
    .at(-1);
export const man = n =>
  readFileSync(
    join(
      root,
      'packs',
      n,
      newest(n),
      Object.values(readdirSync(join(root, 'packs', n, newest(n)))).find(f => f.endsWith('--pack.md'))
    ),
    'utf8'
  );
export const list = (t, k) => {
  const m = t.match(new RegExp('^  ' + k + ':\\n((?:  - .*\\n)+)', 'm'));
  return m
    ? m[1]
        .split('\n')
        .filter(Boolean)
        .map(s => s.replace(/^ {2}- /, '').split('@')[0])
    : [];
};
export const closure = (n, out = []) => {
  if (out.includes(n) || !existsSync(join(root, 'packs', n))) return out;
  const t = man(n);
  for (const r of [...list(t, 'requires'), ...list(t, 'includes')]) closure(r, out);
  out.push(n);
  return out;
};
/** the node files of a pack and every pack it needs (their newest versions), as { file: text } */
export const packFiles = n => {
  const files = {};
  for (const p of closure(n)) {
    const d = join(root, 'packs', p, newest(p));
    for (const f of readdirSync(d)) if (f.endsWith('.md')) files[f] = readFileSync(join(d, f), 'utf8');
  }
  return files;
};
/** the packs directory entries that are packs */
export const packNames = () => readdirSync(join(root, 'packs')).filter(d => d !== '.gitkeep');
