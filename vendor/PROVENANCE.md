# vendor/trumly.wasm

`trumly.wasm` is the trumly engine compiled for WebAssembly, so a pack is checked here by the same code the trumly command line uses.

- Source: `crates/wasm` in the [trumly-spec](https://github.com/trumly/trumly-spec) repository (Apache-2.0), built with `scripts/build-wasm.sh`.
- Built from trumly-spec commit: `f3412672eb07fa42cbeef6f6ef5ae3000c04111f`
- SHA-256: `7fbcec2559bd777f9f866b50dfba6e8f36c07fa6efe63d7eb369281e3bb76ae2`

To verify: build trumly-spec at that commit and compare `shasum -a 256 dist/trumly.wasm`. `tests/vendor.test.mjs` fails if this file and the sha above disagree, so the record cannot drift silently.
