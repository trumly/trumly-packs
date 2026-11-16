import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync, verify } from 'node:crypto';
import { readPrivateKey, signPacks, signedText } from '../scripts/sign.mjs';

const pair = () => generateKeyPairSync('ed25519');
const parse = text => JSON.parse(text);

test('a signature covers the bytes and the issue time, and fails if either changes', () => {
  const { privateKey, publicKey } = pair();
  const bytes = Buffer.from('packs');
  const s = parse(signPacks(bytes, privateKey, '2026-11-10T20:00:00.000Z'));
  assert.equal(s.v, 1);
  assert.equal(s.issued, '2026-11-10T20:00:00.000Z');
  const sig = Buffer.from(s.sig, 'base64');
  assert.equal(verify(null, Buffer.from(signedText(bytes, s.issued)), publicKey, sig), true);
  assert.equal(verify(null, Buffer.from(signedText(Buffer.from('packs!'), s.issued)), publicKey, sig), false);
  assert.equal(verify(null, Buffer.from(signedText(bytes, '2026-11-09T20:00:00.000Z')), publicKey, sig), false);
});
test('the issue time is now unless given', () => {
  const { privateKey } = pair();
  const before = Date.now();
  const t = Date.parse(parse(signPacks(Buffer.from('x'), privateKey)).issued);
  assert.ok(t >= before - 1000 && t <= Date.now() + 1000);
});
test('the key can be a PEM or a base64 PEM, and a missing key refuses', () => {
  const { privateKey, publicKey } = pair();
  const pem = privateKey.export({ type: 'pkcs8', format: 'pem' });
  for (const v of [pem, Buffer.from(pem).toString('base64')]) {
    const s = parse(signPacks(Buffer.from('x'), readPrivateKey(v), '2026-11-10T00:00:00.000Z'));
    assert.equal(
      verify(null, Buffer.from(signedText(Buffer.from('x'), s.issued)), publicKey, Buffer.from(s.sig, 'base64')),
      true
    );
  }
  assert.throws(() => readPrivateKey(''), /refusing to publish unsigned/);
});
