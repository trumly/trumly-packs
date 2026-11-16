// Reads packs/<name>/<version>/*.md, checks them, and works out the index.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readNodes } from './core.mjs';
import { contents, lint, packFromTexts, sampleProblems, samplesOf, tagOf } from './pack.ts';

/** verified = published by trumly or a source we have confirmed; community = everyone else. Core packs are always verified. */
export const TIERS = ['verified', 'community'];
const cmpVer = (a, b) => {
  const x = a.split('.').map(Number),
    y = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};

/** The hash of what a version contains, independent of folder layout. Once a version is published this must never change. */
export const bundleHash = files =>
  createHash('sha256')
    .update(JSON.stringify([...files].sort((a, b) => (a[0] < b[0] ? -1 : 1))))
    .digest('hex');

/**
 * Load every version of every pack under each root's `packs/` folder. Each pack's meta.json carries its tier.
 * Returns { versions, errors } where errors are things that must stop a release.
 */
export async function loadRegistry(root, ...others) {
  const errors = [],
    versions = [];
  for (const r of [root, ...others]) {
    const dir = join(r, 'packs');
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort()) {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) {
        errors.push(`packs/${name}: pack names are lower-case letters, digits and single dashes`);
        continue;
      }
      const metaPath = join(dir, name, 'meta.json');
      let meta = {};
      if (existsSync(metaPath)) {
        try {
          meta = JSON.parse(readFileSync(metaPath, 'utf8'));
        } catch {
          errors.push(`packs/${name}/meta.json is not valid JSON`);
        }
      }
      if (!TIERS.includes(meta.tier ?? 'community'))
        errors.push(`packs/${name}/meta.json: tier must be one of ${TIERS.join(', ')}`);
      if (versions.some(v => v.pack.name === name))
        errors.push(`packs/${name}: the name is already taken by another pack`);
      for (const ver of readdirSync(join(dir, name), { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
        .sort(cmpVer)) {
        const label = `packs/${name}/${ver}`;
        const items = readdirSync(join(dir, name, ver))
          .filter(f => f.endsWith('.md'))
          .sort()
          .map(f => [f.slice(0, -3), readFileSync(join(dir, name, ver, f), 'utf8')]);
        // examples/<name>/*.md and patterns/<name>/*.md travel with the version
        for (const kind of ['examples', 'patterns']) {
          const base = join(dir, name, ver, kind);
          if (!existsSync(base)) continue;
          for (const sub of readdirSync(base, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name)
            .sort()) {
            for (const f of readdirSync(join(base, sub))
              .filter(f => f.endsWith('.md'))
              .sort())
              items.push([`${kind}/${sub}/${f.slice(0, -3)}`, readFileSync(join(base, sub, f), 'utf8')]);
          }
        }
        try {
          const pack = await packFromTexts(label, items, readNodes);
          if (pack.name !== name)
            throw new Error(`${label}: the manifest says the pack is called '${pack.name}', not '${name}'`);
          if (pack.version !== ver) throw new Error(`${label}: the manifest says version ${pack.version}`);
          versions.push({ pack, meta, sha256: bundleHash([...pack.files, ...pack.sampleFiles]) });
          if (pack.role === 'core' && (meta.tier ?? 'community') !== 'verified')
            errors.push(`${label}: a core pack is always verified (set tier in meta.json)`);
        } catch (e) {
          errors.push(e.message);
        }
      }
    }
  }
  return { versions, errors };
}

/** The newest version of each pack: what a project gets by default. */
export function latest(versions) {
  const by = new Map();
  for (const v of versions) {
    const cur = by.get(v.pack.name);
    if (!cur || cmpVer(v.pack.version, cur.pack.version) > 0) by.set(v.pack.name, v);
  }
  return [...by.values()].sort((a, b) => (a.pack.name < b.pack.name ? -1 : 1));
}

/**
 * Every example of every pack's newest version as a project of its own, for the embedded editor: the definitions of the packs the
 * example needs (dependencies first, then what they bundle), then the example's nodes. Named ex-<pack>-<example>.
 */
export function exampleModels(versions) {
  const tops = latest(versions),
    by = new Map(tops.map(v => [v.pack.name, v.pack]));
  const closure = (name, out = []) => {
    const p = by.get(name);
    if (!p || out.includes(name)) return out;
    for (const r of p.requires) closure(r.split('@')[0], out);
    out.push(name);
    for (const i of p.includes) closure(i, out);
    return out;
  };
  const out = [];
  for (const { pack } of tops) {
    for (const s of pack.samples.filter(s => s.kind === 'example')) {
      const packs = [pack.name, ...s.requires].reduce((acc, n) => closure(n.split('@')[0], acc), []);
      const nodes = new Map();
      for (const n of packs) for (const node of by.get(n).nodes) nodes.set(node.id, node);
      for (const node of s.nodes) nodes.set(node.id, node);
      out.push({ file: `ex-${pack.name}-${s.name}.json`, nodes: [...nodes.values()] });
    }
  }
  return out;
}

/** Check every requirement and inclusion resolves, then lint the library. Errors stop a release; warnings are shown on the pack's page. */
export function checkLibrary(versions) {
  const errors = [],
    newest = latest(versions),
    all = newest.map(v => v.pack);
  for (const p of all)
    for (const r of [...p.requires.map(r => r.split('@')[0]), ...p.includes])
      if (!all.some(q => q.name === r)) errors.push(`${tagOf(p)} needs ${r}, which is not in the registry`);
  // a name clash is a stop when both packs are verified; a community pack clashing with a verified one is a note on the community pack
  const tier = name => newest.find(v => v.pack.name === name)?.meta.tier ?? 'community';
  const problems = [...lint(all), ...sampleProblems(all)].map(x =>
    x.code && tier(x.pack) !== 'community' && tier(x.other) !== 'community' ? { ...x, severity: 'error' } : x
  );
  for (const x of problems.filter(x => x.severity === 'error')) errors.push(`${x.pack}: ${x.message}`);
  return { errors, problems };
}

export function buildIndex(versions, problems) {
  const names = [...new Set(versions.map(v => v.pack.name))].sort();
  return {
    registry: 1,
    packs: names.map(name => {
      const vs = versions.filter(v => v.pack.name === name).sort((a, b) => cmpVer(b.pack.version, a.pack.version));
      const top = vs[0];
      return {
        name,
        latest: top.pack.version,
        description: top.pack.description,
        license: top.pack.license,
        publisher: top.pack.publisher,
        namespace: top.pack.namespace,
        tier: top.meta.tier ?? 'community',
        role: top.pack.role,
        useWhen: top.pack.useWhen,
        enriches: top.pack.enriches,
        requires: top.pack.requires,
        includes: top.pack.includes,
        nodes: top.pack.files.length - 1,
        samples: samplesOf(top.pack),
        ...(top.meta.repo ? { repo: top.meta.repo } : {}),
        ...(top.meta.homepage ? { homepage: top.meta.homepage } : {}),
        problems: problems.filter(p => p.pack === name).map(({ severity, message }) => ({ severity, message })),
        versions: vs.map(v => ({
          version: v.pack.version,
          sha256: v.sha256,
          file: `packs/${name}/${v.pack.version}.json`,
          nodes: v.pack.files.length - 1,
          requires: v.pack.requires,
          includes: v.pack.includes
        }))
      };
    })
  };
}

export function bundleOf({ pack, meta, sha256 }) {
  return {
    name: pack.name,
    version: pack.version,
    description: pack.description,
    license: pack.license,
    publisher: pack.publisher,
    namespace: pack.namespace,
    tier: meta.tier ?? 'community',
    role: pack.role,
    useWhen: pack.useWhen,
    enriches: pack.enriches,
    requires: pack.requires,
    includes: pack.includes,
    sha256,
    files: [...pack.files, ...pack.sampleFiles]
  };
}
export { contents };
