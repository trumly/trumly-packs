// Publishes dist/packs.tgz to the packs Blob store, a private store the spec site reads at build time.
// Runs inside this repository's Vercel build (see vercel-build.mjs), where the store is connected to the project:
// Vercel gives the build a short-lived OIDC token and BLOB_STORE_ID, so there is no stored secret anywhere.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const PATHNAME = 'packs/packs.tgz';
export const SIG_PATHNAME = 'packs/packs.tgz.sig';

/** `put` is the Blob client's function; it is passed in so this can be tested without a network. */
export async function publish(file, put) {
  const body = readFileSync(file);
  if (body.length < 100) throw new Error(`${file} looks empty (${body.length} bytes); not publishing`);
  const r = await put(PATHNAME, body, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/gzip'
  });
  return r.pathname;
}

/** The signature is uploaded first, so a reader never sees a new archive beside an old signature for long, and a build that races a publish fails closed. */
export async function publishSigned(file, put) {
  const sig = readFileSync(`${file}.sig`);
  if (sig.length < 50) throw new Error(`${file}.sig looks wrong; not publishing`);
  await put(SIG_PATHNAME, sig, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'text/plain'
  });
  return publish(file, put);
}

/** Asks the spec site to rebuild so it picks up what was just published. An unset hook is a warning, a failed one an error. */
export async function redeploy(hook, fetchFn = fetch, ownProject = process.env.VERCEL_PROJECT_ID) {
  // A hook made in THIS project would redeploy this project, which publishes and calls the hook again, forever.
  if (hook && ownProject && hook.includes(ownProject))
    throw new Error(
      'SPEC_DEPLOY_HOOK is a deploy hook of this packs project, which would redeploy it in a loop. Create the hook in the spec project (Settings, Git, Deploy Hooks) and use that URL.'
    );
  if (!hook) return 'SPEC_DEPLOY_HOOK is not set; the site will pick this up on its next deploy.';
  const res = await fetchFn(hook, { method: 'POST' });
  if (!res.ok) throw new Error(`the spec site's deploy hook answered HTTP ${res.status}`);
  return 'Asked the spec site to redeploy.';
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { put } = await import('@vercel/blob');
  console.log(`Published ${await publishSigned(process.argv[2] ?? 'dist/packs.tgz', put)}`);
  console.log(await redeploy(process.env.SPEC_DEPLOY_HOOK));
}
