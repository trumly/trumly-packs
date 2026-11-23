# vendor/trumly.wasm

`trumly.wasm` is the trumly engine compiled for WebAssembly, so a pack is checked here by the same code the trumly command line uses.

- Source: `crates/wasm` in the [trumly-spec](https://github.com/trumly/trumly-spec) repository (Apache-2.0), built with `scripts/build-wasm.sh`.
- Built from trumly-spec commit: `d362bb306d41df71661cfad7d637d9978cd91e14`
- SHA-256: `dfbde0f524eece57ca3442825b06d857aa24e3b547557f3c71aec89f929544cc`

To verify: build trumly-spec at that commit and compare `shasum -a 256 dist/trumly.wasm`. `tests/vendor.test.mjs` fails if this file and the sha above disagree, so the record cannot drift silently.
