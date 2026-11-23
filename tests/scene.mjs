// Helpers for tests that build small projects around a pack and run them through the real engine.
import { packFiles } from '../scripts/packs-lib.mjs';

/** a node as a markdown file; `parent` is optional */
export const toMd = n => {
  const out = ['---', `id: ${n.id}`, `type: ${n.type}`, `title: ${JSON.stringify(n.title ?? n.id)}`];
  if (n.plane) out.push(`plane: ${n.plane}`);
  if (n.parent) out.push(`parent: ${n.parent}`);
  if (Object.keys(n.fields ?? {}).length) out.push(`fields: ${JSON.stringify(n.fields)}`);
  if (n.links?.length) out.push('links:', ...n.links.map(l => `- ${JSON.stringify(l)}`));
  return out.join('\n') + '\n---\n';
};

/** the pack and what it requires, with the rules a pack ships switched off turned on so they run */
export const engineFiles = pack => {
  const files = packFiles(pack);
  for (const f of Object.keys(files)) files[f] = files[f].replace(/^ {2}enabled: false\n/m, '');
  return files;
};
