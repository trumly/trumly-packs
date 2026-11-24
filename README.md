# trumly-packs

Verified and community packs for [trumly](https://spec.trumly.co/registry). This repository is the source of truth for every pack, including the **core** packs that are built into the trumly binary (`trumly-spec` copies the pinned versions listed in its `packs/core.pin`).

A pack is data, never code: a folder of Markdown files defining types, link types, rules, planes and derived fields, with patterns and examples that show how to use them. Publishing your own pack is not open yet, and how it will work is not decided ([what is not decided yet](https://spec.trumly.co/about#not-decided)).

    packs/<name>/meta.json                    the tier, links and retirement notes (below); not part of any version's checksum
    packs/<name>/<version>/<ns>--pack.md      the manifest: role (core or enrichment), publisher, use-when, requires, optional, enriches,
                                              default-pattern and starter-patterns (the fields are in the specification, section 4)
    packs/<name>/<version>/<ns>--*.md         the definitions: planes, types, link types, rules and derived fields
    packs/<name>/<version>/patterns/<name>/   a pattern: pattern.md and the nodes it adds to a project
    packs/<name>/<version>/examples/<name>/   an example: example.md and a whole small project that checks clean
    packs/<name>/tests/<rule-id>.json         tests for one rule (see "Testing your pack")
    registry.lock.json                        the checksum of every published version (updated by the maintainers)

Every node a pack defines is named `<ns>--<local>` (the namespace is the pack's own prefix) and carries `pack: <name>@<version>`. A pack must have at least one example. The format of all of this is in the [specification](https://spec.trumly.co/specification).

### Derived fields

A pack can ship `derived` definitions: a value a node has but nobody writes, worked out from a template over its fields and links, such as the address of an endpoint or the name a Kubernetes object has in each environment. Several packs use one called `handle`, so a single choice of label shows every calculated name. Templates follow at most five links, and the specification (section 7a) gives the rules.

### Patterns and examples

A **pattern** is a starting point someone adds to a project and makes their own; an **example** shows the pack in use and is checked against every rule the pack and the packs it requires have, so a rule that its own example breaks does not ship. Examples line up with the one worked example the core packs share, a status API for operations staff, so they read as parts of one design.

## How packs are published

1. Checks run on every change: every pack loads, its types and links resolve, the lint passes, and no published version has changed. A change to a published version is a new version.
2. A version is locked when it is released, not while you work on it. `npm run mint -- <pack> [patch|minor|major]` starts the next version (a copy of the newest one with the version and every `pack:` tag updated); change it as often as you like, in a local dev server too. The release records its checksum in `registry.lock.json` (`npm run lock`), and from then on it cannot change. In CI an unlocked new version is an error; locally it is only a note.
3. The packs are bundled and published by the maintainers, and listed with their tier at [spec.trumly.co/registry](https://spec.trumly.co/registry). Only the core bundle is built into the trumly binary; every other pack is fetched from here.

## Pack tiers

- **community:** contributed by anyone, not reviewed. The site says so on every community pack.
- **verified:** reviewed by trumly. Set by a maintainer in `meta.json`. See "What the review checks" below.
- **core packs** are always verified and published by `trumly`. Every pack, verified or community, needs a passing example.

## What the review checks

A pack's text is read by people's AI agents (through the MCP server), so a pack is reviewed as something an agent will read, not only as a design. Before a pack is listed as verified, a maintainer checks that:

- it loads, its types, links and rules resolve, and its example passes (`npm run check`);
- the licence is stated, and the pack is data only: Markdown, no code or scripts;
- **its text describes a design and gives no instructions to an agent.** Nothing tells the reader to ignore or change its instructions, to hide something from the person, to reveal information, to run commands, or to send anything anywhere. Titles, descriptions, rule messages, node bodies, examples and patterns are all read.

`npm run check` prints a "Review" list of lines that read like agent-directed instructions. That list is a reviewer's aid and can have false matches; a pack that matches nothing is still read. Community packs are not reviewed, and the MCP server does not let an agent add one on its own.

## Status

Publishing your own pack and contributing are not open yet, and how they will work is not decided: see [what is not decided yet](https://spec.trumly.co/about#not-decided). When they open, every contribution will be reviewed by us before it is merged, and a contributor licence agreement must be signed first. Pull requests are closed automatically for now. Please [open an issue](../../issues/new/choose) to report a problem with a pack or ask for one.

Security problems: see `SECURITY.md`.

## Retiring a pack or a version

A published version never changes, so a pack is retired in `packs/<name>/meta.json`, which sits outside the version folders and can change after a version is locked (it is not part of the checksum):

    { "tier": "verified",
      "deprecated": { "since": "2026-11-23", "replaced-by": "hosting", "note": "merged into hosting" },
      "withdrawn":  { "0.2.0": "rules crash on empty links" } }

- **`deprecated`** retires the whole pack. `since` is a date; `replaced-by` (a pack that must exist) and `note` are optional. The registry marks the pack and leaves it out of the browse list. It is not added to a project that does not have it (the editor and MCP refuse, naming the replacement). Projects that already have it keep working, can upgrade, and are told once.
- **`withdrawn`** marks one version as defective, with the reason. It is refused when added, and a project that has it is warned. The newest version cannot be withdrawn: release a fixed one, or deprecate the pack.
- `npm run check` fails on a malformed entry or a `replaced-by` that does not exist. `npm run status` lists what is retired.
- A pack is only removed before anything is live. Once a version is locked, `registry.lock.json` is append-only and the checks fail if a locked version disappears.

## Testing your pack

You own your pack's tests, and CI runs them (`npm test`). A pack does not pass review until its rules are proven.

- **Common rules need nothing.** `tests/rule-cases.test.mjs` builds a node that should pass and one that should fail from the rule itself, for the usual checks (`require_fields`, `require_link`, `forbid_link`, `field_is` on one field, `any_of`, `acyclic`), and runs them through the engine. It also catches a link type or field that is mistyped.
- **Anything else needs a test file, and so does any case you want to keep.** If the rule filters on a field, checks another node's fields, compares two fields or uses `same_fields`, `ancestor_type` and the like, the suite fails and names the rule. Add `packs/<pack>/tests/<rule-id>.json`. You can also add one for a rule the suite already covers, to pin an edge you care about (the name limit in bytes, say). This is the one place a pack's failing cases live.

```json
{
  "rule": "mcp--rule-remote-authenticated",
  "cases": [
    {
      "name": "a remote server needs an auth, a local one does not",
      "nodes": [
        {
          "id": "srv-ok",
          "type": "mcp-server",
          "fields": { "transport": "sse" },
          "links": [{ "type": "authenticated-by", "to": "auth-1" }]
        },
        { "id": "auth-1", "type": "mcp-auth" },
        { "id": "srv-bare", "type": "mcp-server", "fields": { "transport": "streamable-http" } }
      ],
      "pass": ["srv-ok"],
      "fail": ["srv-bare"]
    }
  ]
}
```

A case is a small project: the pack and what it requires, plus its `nodes`. `pass` and `fail` list the nodes whose result for this rule is asserted, so one case can hold several. Across the file there must be at least one node that passes and one that fails, and the edges are worth including (a value just under a limit and just over it). A rule with no check only advises: use `"advisory"`. The file is named for the rule and holds data only, so nothing in it runs. Mistakes in the file are reported in plain words.

- **Whole-project examples** live in `packs/<pack>/<version>/examples/` and must check clean (`scripts/check-examples.mjs`).

Run just your pack's tests with `node --test --test-name-pattern="^<pack>" tests/*.test.mjs`.

## Checking locally

    node scripts/check.mjs          # needs Node 22.18 or newer

`lib/` is the registry code that checks and bundles the packs. `vendor/trumly.wasm` is the trumly engine compiled for WebAssembly, so a pack is checked by the same code the trumly command line uses; `vendor/PROVENANCE.md` records the commit and checksum it was built from.

Dependencies are updated by Dependabot, and CI fails on a high-severity advisory in the dependencies that publish.

© 2026 Catchlove Ltd. Licensed under the Apache License 2.0 (see `LICENSE` and `NOTICE`). Each pack carries the licence named in its own manifest.
