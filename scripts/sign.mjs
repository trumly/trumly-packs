// Signs dist/packs.tgz so the spec site can tell a real publish from a file someone wrote into the Blob store.
// What is signed is the archive's hash AND the time it was issued, so an old genuine archive cannot be put back later and still pass:
// the spec site refuses anything issued before the floor committed in its repository (registry/packs-min-issued.txt).
// The private key lives only in this project's Production environment (TRUMLY_PACKS_SIGNING_KEY); the matching public
// key is committed in the spec site's repository, so nothing that travels inside the archive can vouch for itself.
//
//   node scripts/sign.mjs --keygen          prints a new key pair (run once, keep the private key out of git)
//   node scripts/sign.mjs --pubkey          prints the public key that matches TRUMLY_PACKS_SIGNING_KEY
//   node scripts/sign.mjs [dist/packs.tgz]  writes <file>.sig (needs TRUMLY_PACKS_SIGNING_KEY)
import { createHash, generateKeyPairSync, createPrivateKey, createPublicKey, sign as edSign } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** The key may be a PEM, or the PEM base64-encoded (easier to paste into an environment variable). */
export function readPrivateKey(value) {
  if (!value) throw new Error('TRUMLY_PACKS_SIGNING_KEY is not set; refusing to publish unsigned packs.');
  const pem = value.includes('BEGIN') ? value : Buffer.from(value, 'base64').toString('utf8');
  return createPrivateKey(pem);
}

/** The text that is signed: a fixed label, the issue time, and the archive's SHA-256. The spec site builds the same text to verify. */
export function signedText(bytes, issued) {
  return `trumly-packs/1\n${issued}\n${createHash('sha256').update(bytes).digest('hex')}`;
}

/** The contents of packs.tgz.sig: JSON with the issue time (ISO 8601, UTC) and an Ed25519 signature over signedText(), base64 encoded. */
export function signPacks(bytes, key, issued = new Date().toISOString()) {
  return JSON.stringify({
    v: 1,
    issued,
    sig: edSign(null, Buffer.from(signedText(bytes, issued)), key).toString('base64')
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === '--keygen') {
    const { privateKey, publicKey } = generateKeyPairSync('ed25519');
    const priv = privateKey.export({ type: 'pkcs8', format: 'pem' });
    console.log('PRIVATE KEY (TRUMLY_PACKS_SIGNING_KEY, Production only, never commit):\n');
    console.log(Buffer.from(priv).toString('base64'));
    console.log('\nPUBLIC KEY (commit as apps/spec/registry/packs-public-key.pem in trumly-site):\n');
    console.log(publicKey.export({ type: 'spki', format: 'pem' }));
  } else if (process.argv[2] === '--pubkey') {
    // the public half of the key in TRUMLY_PACKS_SIGNING_KEY: compare it with registry/packs-public-key.pem in trumly-site
    console.log(
      createPublicKey(readPrivateKey(process.env.TRUMLY_PACKS_SIGNING_KEY)).export({ type: 'spki', format: 'pem' })
    );
  } else {
    const file = process.argv[2] ?? 'dist/packs.tgz';
    writeFileSync(
      `${file}.sig`,
      signPacks(readFileSync(file), readPrivateKey(process.env.TRUMLY_PACKS_SIGNING_KEY)) + '\n'
    );
    console.log(`Signed ${file}`);
  }
}
