import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { publish, publishSigned, redeploy, PATHNAME } from '../scripts/publish.mjs';

const file = n => {
  const f = join(mkdtempSync(join(tmpdir(), 'pub-')), 'packs.tgz');
  writeFileSync(f, Buffer.alloc(n, 1));
  return f;
};

test('uploads privately to one fixed pathname, replacing what is there', async () => {
  let got;
  const name = await publish(file(500), async (path, body, opts) => {
    got = { path, len: body.length, opts };
    return { pathname: path };
  });
  assert.equal(name, 'packs/packs.tgz');
  assert.deepEqual(got, {
    path: PATHNAME,
    len: 500,
    opts: { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/gzip' }
  });
});
test('refuses to publish an empty file', async () => {
  await assert.rejects(
    publish(file(10), async () => ({ pathname: '' })),
    /looks empty/
  );
});
test('the redeploy hook is posted to; unset warns; a failure is an error', async () => {
  let seen;
  assert.match(
    await redeploy('https://h/x', async (u, o) => {
      seen = [u, o.method];
      return { ok: true };
    }),
    /Asked/
  );
  assert.deepEqual(seen, ['https://h/x', 'POST']);
  assert.match(await redeploy(''), /not set/);
  await assert.rejects(
    redeploy('https://h/x', async () => ({ ok: false, status: 500 })),
    /HTTP 500/
  );
});
test('a hook belonging to this very project is refused, so it cannot loop', async () => {
  let called = false;
  await assert.rejects(
    redeploy(
      'https://api.vercel.com/v1/integrations/deploy/prj_ABC/xyz',
      async () => {
        called = true;
        return { ok: true };
      },
      'prj_ABC'
    ),
    /loop/
  );
  assert.equal(called, false);
});

test('publishSigned uploads the signature first, then the archive', async () => {
  const f = file(500);
  writeFileSync(`${f}.sig`, 'x'.repeat(90));
  const order = [];
  await publishSigned(f, async path => {
    order.push(path);
    return { pathname: path };
  });
  assert.deepEqual(order, ['packs/packs.tgz.sig', 'packs/packs.tgz']);
});
