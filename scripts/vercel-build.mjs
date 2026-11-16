// The build command of this repository's Vercel project (vercel.json). Every deployment checks the packs;
// a production deployment (a commit to main) also publishes them and asks the spec site to redeploy.
// The project serves only the placeholder page in public/.
import { spawnSync } from 'node:child_process';

const run = (...args) => {
  if (spawnSync('npm', args, { stdio: 'inherit' }).status !== 0) process.exit(1);
};
run('run', 'check');
run('test');
run('run', 'pack');
if (process.env.VERCEL_ENV === 'production') {
  run('run', 'sign:packs');
  run('run', 'publish:packs');
} else
  console.log(
    `Not publishing (VERCEL_ENV=${process.env.VERCEL_ENV ?? 'unset'}): only a production deployment publishes.`
  );
