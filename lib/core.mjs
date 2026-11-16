// Reads node files with trumly-core compiled to WebAssembly (vendor/trumly.wasm), so a pack is checked by the same code that reads a project.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

let x;
function load() {
  if (x) return x;
  const path = process.env.TRUMLY_WASM || fileURLToPath(new URL('../vendor/trumly.wasm', import.meta.url));
  x = new WebAssembly.Instance(new WebAssembly.Module(readFileSync(path)), {}).exports;
  return x;
}

/** @type {import('./pack.ts').ReadNodes} */
export function readNodes(files) {
  const w = load(),
    input = new TextEncoder().encode(JSON.stringify(files)),
    ptr = w.alloc(input.length);
  new Uint8Array(w.memory.buffer, ptr, input.length).set(input);
  const packed = w.check_json(ptr, input.length);
  const outPtr = Number(packed >> 32n),
    outLen = Number(packed & 0xffffffffn);
  const r = JSON.parse(new TextDecoder().decode(new Uint8Array(w.memory.buffer, outPtr, outLen)));
  w.dealloc(outPtr, outLen);
  w.dealloc(ptr, input.length);
  if (r.error) throw new Error(r.error);
  return { nodes: r.nodes, bad: r.load_errors };
}
