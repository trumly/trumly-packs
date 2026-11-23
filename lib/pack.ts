// What a pack is, and the checks that say a pack hangs together. This file is copied into trumly-cloud
// (`npm run sync:registry` there), so it must stay free of anything but the language.
// It mirrors `crates/fs/src/pack.rs` in trumly-spec: change one, change the other.

export type NodeJson = {
  id: string;
  type: string | null;
  title: string;
  parent: string | null;
  plane: string | null;
  fields: Record<string, any>;
  links: { type: string; to: string; key?: string; fields?: Record<string, any> }[];
  body: string;
};

export interface Pack {
  name: string;
  /** the name to show people (“Data model”); `name` stays the identifier */
  title: string;
  version: string;
  description: string;
  /** who may use the definitions and how: an SPDX identifier or expression, or `LicenseRef-...` for your own terms */
  license: string;
  /** who made and answers for the pack */
  publisher: string;
  /** `core` (the bundle every project starts from, built into the tools, published only by trumly) or `enrichment` (the default) */
  role: string;
  /** the core packs an enrichment pack adds detail to: it helps people and agents choose, it is not a dependency */
  enriches: string[];
  /** one sentence on when to reach for the pack */
  useWhen: string;
  /** the pattern (a folder under `patterns/`) to lift as "another one" when the pack is used many times in a project */
  defaultPattern?: string;
  /** the patterns (folders under `patterns/`) offered with "Include starter patterns" when the pack is added; the default pattern alone when this is empty */
  starterPatterns: string[];
  /** the short prefix of every node id this pack provides: `<namespace>--<local id>` */
  namespace: string;
  /** packs this one works with when the project has them: never installed by adding this pack, never needed for it to load */
  optional: string[];
  requires: string[];
  includes: string[];
  /** [node id, file text], the manifest included */
  files: [string, string][];
  /** the same files, parsed, in the same order */
  nodes: NodeJson[];
  /** worked examples and reusable patterns that show the pack in use */
  samples: Sample[];
  /** the raw files of every sample, `[examples/<name>/<id>, text]`, in the order a bundle carries them */
  sampleFiles: [string, string][];
}

/** A small project that shows a pack in use. An example is read or copied as a starting point; a pattern is lifted into a project of your own. */
export interface Sample {
  kind: 'example' | 'pattern';
  name: string;
  title: string;
  description: string;
  /** `starter` (copy it and carry on) or `inspiration` (flick through it) */
  usage: 'starter' | 'inspiration';
  /** packs it needs to check clean, its own pack included */
  requires: string[];
  /** packs it also uses when the project has them: the nodes that need one are left out of a project without it */
  optional: string[];
  /** patterns only: the node the rest hangs from, and the id prefix used on insert */
  root?: string;
  prefix?: string;
  /** the nodes, the manifest left out */
  nodes: NodeJson[];
}

/** `code` marks findings a library may treat more strictly: `near-name` (names easy to mix up). The same name in two packs is allowed: a project writes `<namespace>:<name>`. */
export interface Problem {
  pack: string;
  severity: 'error' | 'warning';
  message: string;
  code?: 'near-name';
  /** the other pack in a clash */ other?: string;
}

/** Reads Markdown node files; the caller supplies it (the WASM core). Files that cannot be read as nodes come back in `bad`. */
export type ReadNodes = (
  files: [string, string][]
) =>
  | { nodes: NodeJson[]; bad: { file: string; kind: string }[] }
  | Promise<{ nodes: NodeJson[]; bad: { file: string; kind: string }[] }>;

/** What a pack may carry: its own definitions, never ordinary nodes. */
export const DEFINITION_KINDS = ['type', 'link-type', 'rule', 'plane', 'derived'];

export const tagOf = (p: { name: string; version: string }) => `${p.name}@${p.version}`;
export const splitReq = (r: string): [string, string] => {
  const i = r.indexOf('@');
  return i < 0 ? [r, ''] : [r.slice(0, i), r.slice(i + 1)];
};
export const validNamespace = (ns: string) =>
  ns.length > 0 && ns.length <= 24 && ns.split('-').every(w => w.length > 0 && /^[a-z0-9]+$/.test(w));

function parseVer(v: string): [number, number, number] | null {
  const parts = v.trim().split('.');
  if (parts.length !== 3 || !parts.every(p => /^[0-9]+$/.test(p))) return null;
  return parts.map(Number) as [number, number, number];
}
/** a version in a range may be short: `1` is 1.0.0 and `1.2` is 1.2.0 */
function parseRangeVer(v: string): [number, number, number] | null {
  const parts = v.trim().split('.');
  if (parts.length < 1 || parts.length > 3 || !parts.every(p => /^[0-9]+$/.test(p))) return null;
  const n = parts.map(Number);
  return [n[0], n[1] ?? 0, n[2] ?? 0];
}
const cmp = (a: number[], b: number[]) => {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] < b[i] ? -1 : 1;
  return 0;
};

/**
 * Does `version` satisfy `range`? Space-separated comparators, all of which must hold: ^ ~ >= > <= < = or a bare version. A short version is
 * padded with zeros, and a bare short one is a compatible range (`core@1` is `core@^1.0.0`). Empty or `*` accepts anything.
 */
export function satisfies(version: string, range: string): boolean {
  range = range.trim();
  if (range === '' || range === '*') return true;
  const v = parseVer(version);
  if (!v) return false;
  return range.split(/\s+/).every(c => {
    let op = ['^', '~', '>=', '<=', '>', '<', '='].find(o => c.startsWith(o)) ?? '=';
    const rest = ['^', '~', '>=', '<=', '>', '<', '='].some(o => c.startsWith(o)) ? c.slice(op.length) : c;
    const r = parseRangeVer(rest);
    if (!r) return false;
    if (op === '=' && !c.startsWith('=') && rest.split('.').length < 3) op = '^';
    switch (op) {
      case '^':
        return (
          cmp(v, r) >= 0 &&
          (r[0] > 0
            ? v[0] === r[0]
            : r[1] > 0
              ? v[0] === 0 && v[1] === r[1]
              : v[0] === 0 && v[1] === 0 && v[2] === r[2])
        );
      case '~':
        return cmp(v, r) >= 0 && v[0] === r[0] && v[1] === r[1];
      case '>=':
        return cmp(v, r) >= 0;
      case '>':
        return cmp(v, r) > 0;
      case '<=':
        return cmp(v, r) <= 0;
      case '<':
        return cmp(v, r) < 0;
      default:
        return cmp(v, r) === 0;
    }
  });
}

const str = (v: unknown) => (typeof v === 'string' ? v : undefined);
const strs = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);

/** Build a pack from (file stem, file text) pairs; `label` names it in errors. Throws a message a person can read. */
export async function packFromTexts(label: string, allItems: [string, string][], read: ReadNodes): Promise<Pack> {
  // `examples/<name>/<id>` and `patterns/<name>/<id>` are sample files; everything else is the pack proper
  const items = allItems.filter(([stem]) => !stem.includes('/'));
  const sampleFiles = allItems.filter(([stem]) => stem.includes('/'));
  const { nodes, bad } = await read(items.map(([stem, text]) => [`${stem}.md`, text] as [string, string]));
  if (bad.length)
    throw new Error(
      `${label}/${bad[0].file}: ${bad[0].kind === 'id_filename_mismatch' ? 'the file name must be the node id' : `cannot be read as a node (${bad[0].kind})`}`
    );
  const byId = new Map(nodes.map(n => [n.id, n]));
  const files: [string, string][] = [],
    ordered: NodeJson[] = [];
  let manifest: NodeJson | undefined;
  for (const [stem, text] of items) {
    const n = byId.get(stem);
    if (!n) throw new Error(`${label}/${stem}.md: the file name must be the node id`);
    if (n.type === 'pack') {
      if (manifest) throw new Error(`${label}: more than one pack node`);
      manifest = n;
    }
    files.push([n.id, text]);
    ordered.push(n);
  }
  if (!manifest) throw new Error(`${label}: no node of type pack`);
  const name = str(manifest.fields.name);
  if (!name) throw new Error(`${label}: the pack node needs fields.name`);
  const version = str(manifest.fields.version);
  if (!version) throw new Error(`${label}: the pack node needs fields.version (a string)`);
  const namespace = str(manifest.fields.namespace) ?? name;
  if (!validNamespace(namespace))
    throw new Error(`${label}: namespace '${namespace}' must be lower-case letters, digits and single dashes`);
  const tag = `${name}@${version}`;
  for (const n of ordered)
    if (!n.id.startsWith(`${namespace}--`))
      throw new Error(`${label}: node '${n.id}' must have an id starting '${namespace}--' (the pack's namespace)`);
  for (const n of ordered)
    if (n.type !== 'pack' && n.fields.pack !== tag)
      throw new Error(`${label}: node '${n.id}' must have fields.pack: ${tag}`);
  const samples = await readSamples(label, sampleFiles, read);
  return {
    name,
    version,
    namespace,
    // what people read in a list; the pack node's own title, so `data-model` shows as “Data model”
    title: manifest.title?.trim() || name,
    description: str(manifest.fields.description) ?? '',
    license: str(manifest.fields.license) ?? '',
    publisher: str(manifest.fields.publisher) ?? '',
    role: str(manifest.fields.role) ?? 'enrichment',
    enriches: strs(manifest.fields.enriches),
    useWhen: str(manifest.fields['use-when']) ?? '',
    defaultPattern: str(manifest.fields['default-pattern'])?.trim() || undefined,
    starterPatterns: strs(manifest.fields['starter-patterns']),
    requires: strs(manifest.fields.requires),
    optional: strs(manifest.fields.optional),
    includes: strs(manifest.fields.includes),
    files,
    nodes: ordered,
    samples,
    sampleFiles
  };
}

async function readSamples(label: string, items: [string, string][], read: ReadNodes): Promise<Sample[]> {
  const folders = [...new Set(items.map(([stem]) => stem.split('/').slice(0, 2).join('/')))].sort();
  const out: Sample[] = [];
  for (const folder of folders) {
    const [dir, name] = folder.split('/');
    const kind = dir === 'patterns' ? 'pattern' : 'example';
    const mine = items
      .filter(([stem]) => stem.startsWith(`${folder}/`))
      .map(([stem, text]) => [stem.slice(folder.length + 1), text] as [string, string]);
    if (mine.some(([id]) => id.includes('/'))) throw new Error(`${label}/${folder}: samples do not nest`);
    const { nodes, bad } = await read(mine.map(([id, text]) => [`${id}.md`, text] as [string, string]));
    if (bad.length)
      throw new Error(
        `${label}/${folder}/${bad[0].file}: ${bad[0].kind === 'id_filename_mismatch' ? 'the file name must be the node id' : `cannot be read as a node (${bad[0].kind})`}`
      );
    const manifest = nodes.find(n => n.id === kind);
    if (!manifest) throw new Error(`${label}/${folder}: needs a ${kind}.md describing it`);
    const usage = str(manifest.fields.use) ?? 'starter';
    if (usage !== 'starter' && usage !== 'inspiration')
      throw new Error(`${label}/${folder}/${kind}.md: use must be starter or inspiration`);
    const rest = nodes.filter(n => n.id !== kind);
    const root = str(manifest.fields.root);
    if (kind === 'pattern' && (!root || !rest.some(n => n.id === root)))
      throw new Error(`${label}/${folder}/pattern.md: root must name one of the pattern's nodes`);
    out.push({
      kind,
      name,
      title: str(manifest.fields.title) ?? name,
      description: str(manifest.fields.description) ?? '',
      usage,
      requires: strs(manifest.fields.requires),
      optional: strs(manifest.fields.optional),
      root,
      prefix: str(manifest.fields.prefix),
      nodes: rest
    });
  }
  return out;
}

/** Every pack must show itself in use: at least one example, each with nodes and a description. (Whether they check clean is `trumly pack check`'s job.) */
export function sampleProblems(all: Pack[]): Problem[] {
  const out: Problem[] = [];
  for (const p of all) {
    const push = (severity: Problem['severity'], message: string) => out.push({ pack: p.name, severity, message });
    if (!p.samples.some(s => s.kind === 'example'))
      push(
        'error',
        'It has no example. Add examples/<name>/ with an example.md and a small project that shows the pack in use.'
      );
    for (const s of p.samples) {
      if (!s.nodes.length) push('error', `The ${s.kind} “${s.name}” has no nodes.`);
      if (!s.description.trim()) push('warning', `The ${s.kind} “${s.name}” needs a description saying what it shows.`);
      for (const o of s.optional) {
        const n = splitReq(o)[0];
        if (!all.some(q => q.name === n))
          push('warning', `The ${s.kind} “${s.name}” lists “${n}” in optional, which is not a pack in the library.`);
      }
    }
  }
  return out;
}

/** The lightweight view of a pack's samples: enough to list and choose from. */
export function samplesOf(p: Pack) {
  return p.samples.map(s => ({
    default: s.kind === 'pattern' && s.name === p.defaultPattern,
    kind: s.kind,
    name: s.name,
    title: s.title,
    description: s.description,
    use: s.usage,
    requires: s.requires,
    optional: s.optional,
    root: s.root ?? null,
    nodes: s.nodes.length
  }));
}

const defined = (p: Pack, kind: string) =>
  p.nodes
    .filter(n => n.type === kind)
    .map(n => str(n.fields.name))
    .filter((x): x is string => !!x);

/** Every pack this one brings with it or relies on, directly or not (its own name left out). */
function reach(all: Pack[], name: string): Set<string> {
  const seen = new Set<string>(),
    todo = [name];
  for (let n = todo.pop(); n !== undefined; n = todo.pop()) {
    const p = all.find(p => p.name === n);
    if (!p) continue;
    for (const d of [...p.requires.map(r => splitReq(r)[0]), ...p.includes])
      if (!seen.has(d)) {
        seen.add(d);
        todo.push(d);
      }
  }
  return seen;
}

/** Licences that let anyone copy the definitions into a project of their own, open or closed, with attribution at most. */
const OPEN_LICENSES = [
  'Apache-2.0',
  'MIT',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'ISC',
  '0BSD',
  'MPL-2.0',
  'CC0-1.0',
  'CC-BY-4.0',
  'CC-BY-3.0',
  'Unlicense'
];
const bare = (t: string) => t.replace(/^\(+|\)+$/g, '');
/** A licence expression as SPDX writes it: identifiers joined by AND, OR or WITH. */
const spdxLike = (l: string) => {
  const toks = l.trim().split(/\s+/).filter(Boolean);
  return (
    toks.length % 2 === 1 &&
    toks.every((t, i) => (i % 2 === 1 ? ['AND', 'OR', 'WITH'].includes(t) : /^[A-Za-z0-9.+:-]+$/.test(bare(t))))
  );
};
const isOpen = (l: string) =>
  l
    .trim()
    .split(/\s+/)
    .filter((_, i) => i % 2 === 0)
    .every(t => OPEN_LICENSES.includes(bare(t)));
const isCopyleft = (l: string) =>
  l
    .trim()
    .split(/\s+/)
    .some(t => ['GPL', 'AGPL', 'LGPL', 'CC-BY-SA', 'EUPL', 'OSL'].some(c => t.startsWith(c)));

/** The longest `use-when` that reads as one sentence in a list. */
export const USE_WHEN_MAX = 200;

/**
 * What the manifest itself must say. A `core` pack is one of the bundle every project starts from and the only kind built into the tools,
 * so only trumly may publish one. Every other pack is an `enrichment`: it adds detail to the core, says when to reach for it, and needs
 * the core (`requires: core@1`) so its definitions have something to attach to. Mirrors `manifest_problems` in trumly-spec.
 */
function manifestProblems(all: Pack[], p: Pack, push: (severity: Problem['severity'], message: string) => void) {
  if (p.defaultPattern && !p.samples.some(s => s.kind === 'pattern' && s.name === p.defaultPattern))
    push(
      'error',
      `default-pattern names “${p.defaultPattern}”, which is not one of its patterns (a folder under patterns/).`
    );
  for (const s of p.starterPatterns)
    if (!p.samples.some(x => x.kind === 'pattern' && x.name === s))
      push('error', `starter-patterns names “${s}”, which is not one of its patterns (a folder under patterns/).`);
  for (const r of p.optional) {
    const n = splitReq(r)[0];
    if (n !== p.name && !all.some(q => q.name === n))
      push('warning', `optional names “${n}”, which is not a pack in the library.`);
  }
  if (p.role === 'core') {
    if (p.publisher.trim() !== 'trumly')
      push('error', "It says role: core, which only trumly's own packs may. Use role: enrichment.");
    if (p.enriches.length) push('warning', 'A core pack does not enrich anything; leave enriches out.');
  } else if (p.role === 'enrichment') {
    const chars = [...p.useWhen.trim()].length;
    if (chars === 0)
      push(
        'warning',
        'It has no use-when. Say in one sentence when to reach for it (fields.use-when); lists and agents show it.'
      );
    else if (chars > USE_WHEN_MAX)
      push('warning', `use-when is ${chars} characters; keep it to one sentence of at most ${USE_WHEN_MAX}.`);
    const mine = reach(all, p.name),
      cores = all.filter(q => q.role === 'core').map(q => q.name);
    if (cores.length && !cores.some(c => mine.has(c)))
      push(
        'warning',
        'It does not require the core. Add requires: core@1 so its definitions have the core nodes to attach to.'
      );
    // what it enriches: a core pack, or a type that a core pack defines (a pack that adds detail to `component` says so)
    const coreTypes = new Set(all.filter(q => q.role === 'core').flatMap(q => defined(q, 'type')));
    for (const e of p.enriches) {
      const q = all.find(q => q.name === e);
      if (q && q.role !== 'core')
        push(
          'warning',
          `enriches names “${e}”, which is not a core pack. Name the core pack or core type it adds detail to.`
        );
      else if (q && !mine.has(e))
        push(
          'warning',
          `enriches names “${e}”, but the pack does not require it. Require core@1, or the pack it enriches.`
        );
      else if (!q && !coreTypes.has(e))
        push('warning', `enriches names “${e}”, which is neither a core pack nor a type a core pack defines.`);
    }
  } else push('error', `role “${p.role}” is not core or enrichment.`);
}

/**
 * Check packs against each other and against what a pack is for:
 * error: an ordinary node (not a type, link type, rule or plane) inside a pack;
 * warning: a type or link type another pack in the library also defines, when neither brings the other;
 * warning: a type named in a from/to list, a rule's filter or a check that neither the pack nor what it relies on defines;
 * warning: no licence or publisher, a licence that is not an SPDX expression, a copyleft licence, or an open pack that needs a pack that is not open.
 */
export function lint(all: Pack[]): Problem[] {
  const out: Problem[] = [];
  for (const p of all) {
    const push = (severity: Problem['severity'], message: string, code?: Problem['code'], other?: string) =>
      out.push({ pack: p.name, severity, message, ...(code ? { code, other } : {}) });
    for (const n of p.nodes.filter(n => n.type !== 'pack')) {
      const k = n.type ?? '';
      if (!DEFINITION_KINDS.includes(k))
        push(
          'error',
          `“${n.id}” is an ordinary node (type ${k || 'none'}). A pack carries definitions only: types, link types, rules, planes and derived values.`
        );
    }
    if (!p.license.trim())
      push(
        'warning',
        'It has no licence. Say who may use it and how in fields.license: an SPDX identifier such as Apache-2.0 or CC-BY-4.0.'
      );
    else if (!spdxLike(p.license))
      push(
        'warning',
        `The licence “${p.license}” is not an SPDX identifier or expression (for example Apache-2.0, or LicenseRef-Acme for your own terms).`
      );
    else if (isCopyleft(p.license))
      push(
        'warning',
        `The licence “${p.license}” is copyleft. A project that copies these definitions may have to be shared on the same terms; most packs should use a permissive licence.`
      );
    if (!p.publisher.trim())
      push('warning', 'It has no publisher. Say who made it and answers for it in fields.publisher.');
    manifestProblems(all, p, push);
    if (isOpen(p.license)) {
      for (const d of [...p.requires.map(r => splitReq(r)[0]), ...p.includes]) {
        const q = all.find(q => q.name === d);
        if (q && q.license.trim() && !isOpen(q.license))
          push(
            'warning',
            `It is open (${p.license}) but needs ${q.name}, which is ${q.license}. Nobody can use this pack without accepting those terms.`
          );
      }
    }
    const mine = reach(all, p.name);
    const known = new Set(defined(p, 'type'));
    const worksWith = new Set(p.optional.map(r => splitReq(r)[0]));
    for (const q of all.filter(q => mine.has(q.name) || worksWith.has(q.name)))
      for (const t of defined(q, 'type')) known.add(t);
    // `<namespace>:<name>` is known when the pack with that namespace defines the name
    const qualified = (t: string) => {
      const i = t.indexOf(':');
      return i > 0 && all.some(q => q.namespace === t.slice(0, i) && defined(q, 'type').includes(t.slice(i + 1)));
    };
    const knownLinks = new Set(defined(p, 'link-type'));
    for (const q of all.filter(q => mine.has(q.name) || worksWith.has(q.name)))
      for (const l of defined(q, 'link-type')) knownLinks.add(l);
    const linkKnown = (l: string) => {
      const i = l.indexOf(':');
      return (
        knownLinks.has(l) ||
        (i > 0 && all.some(q => q.namespace === l.slice(0, i) && defined(q, 'link-type').includes(l.slice(i + 1))))
      );
    };
    const seen = new Set<string>();
    const missing = (what: string, t: string) => {
      if (t && !known.has(t) && !qualified(t) && !seen.has(`${what}/${t}`)) {
        seen.add(`${what}/${t}`);
        push('warning', `${what} names the type “${t}”, which neither this pack nor the packs it relies on define.`);
      }
    };
    const typesIn = (v: any, acc: string[]) => {
      if (Array.isArray(v)) v.forEach(x => typesIn(x, acc));
      else if (v && typeof v === 'object')
        for (const [k, x] of Object.entries(v)) {
          if ((k === 'node_type' || k === 'to_type' || k === 'ancestor_type') && typeof x === 'string') acc.push(x);
          else typesIn(x, acc);
        }
    };
    for (const n of p.nodes) {
      const name = str(n.fields.name) ?? n.id;
      if (n.type === 'link-type') {
        for (const key of ['from', 'to']) for (const t of strs(n.fields[key])) missing(`The link type “${name}”`, t);
      } else if (n.type === 'rule') {
        const what = `The rule “${str(n.fields.name) ?? n.title}”`;
        const at = n.fields.applies_to?.type;
        if (typeof at === 'string') missing(what, at);
        const ts: string[] = [];
        if (n.fields.check !== undefined) typesIn(n.fields.check, ts);
        for (const t of ts) missing(what, t);
      } else if (n.type === 'derived') {
        const what = `The derived value “${name}”`;
        const at = n.fields.applies_to?.type;
        if (typeof at === 'string') missing(what, at);
        for (const l of templateLinks(str(n.fields.template) ?? '')) {
          if (!linkKnown(l) && !seen.has(`${what}/link/${l}`)) {
            seen.add(`${what}/link/${l}`);
            push(
              'warning',
              `${what} follows the link “${l}”, which neither this pack nor the packs it relies on define.`
            );
          }
        }
      }
    }
  }
  // names so alike they are easy to mix up (constraint / constrains), across packs only: a noun and its verb inside one pack is the convention
  const names = (p: Pack) => [
    ...defined(p, 'type').map(n => [n, 'type'] as const),
    ...defined(p, 'link-type').map(n => [n, 'link type'] as const)
  ];
  for (const p of all)
    for (const q of all.filter(q => q.name > p.name))
      for (const [a, ka] of names(p))
        for (const [b, kb] of names(q)) {
          if (near(a, b))
            out.push({
              pack: p.name,
              severity: 'warning',
              code: 'near-name',
              other: q.name,
              message: `The ${ka} “${a}” looks like the ${kb} “${b}” in ${q.name}. Names that close get mixed up; pick a clearer word for one of them.`
            });
        }
  return out;
}

/** Two names a reader could take for each other: the same words with a different ending. Edit distance of two or less, both at least eight letters. */
function near(a: string, b: string): boolean {
  if (a === b || a.length < 8 || b.length < 8 || Math.abs(a.length - b.length) > 2) return false;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++)
      cur.push(Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)));
    prev = cur;
  }
  return prev[b.length] <= 2;
}

/** The link names a derived template follows: every part of a `{a/b/field}` placeholder but the last, without a leading `^`. */
export function templateLinks(template: string): string[] {
  const out: string[] = [];
  for (const m of template.matchAll(/\{([^{}]*)\}/g)) {
    const parts = m[1].split('/');
    for (const part of parts.slice(0, -1)) {
      const l = part.replace(/^\^+/, '');
      if (l && l !== '@type' && !out.includes(l)) out.push(l);
    }
  }
  return out;
}

/** A short line per node the pack provides (the manifest left out), for looking inside a pack before adding it. */
export function contents(p: Pack) {
  return p.nodes
    .filter(n => n.type !== 'pack')
    .map(n => ({
      id: n.id,
      type: n.type,
      title: n.title,
      name: str(n.fields.name) ?? null,
      description: str(n.fields.description) ?? null,
      statement: str(n.fields.statement) ?? null,
      plane: n.plane,
      order: Number.isInteger(n.fields.order) ? n.fields.order : null,
      from: n.fields.from ?? null,
      to: n.fields.to ?? null,
      inverse: str(n.fields.inverse) ?? null,
      template: str(n.fields.template) ?? null,
      stack: str(n.fields.stack) ?? null,
      severity: str(n.fields.severity) ?? null,
      /** the plane a type is drawn on (a type's `plane` field) */
      layer: str(n.fields.plane) ?? null,
      shape: str(n.fields.shape) ?? null,
      /** a plane's shapes by type name */
      shapes: n.fields.shapes && typeof n.fields.shapes === 'object' ? n.fields.shapes : null,
      applies: str((n.fields.applies_to as any)?.type) ?? null
    }))
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
