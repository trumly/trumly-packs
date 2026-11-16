# trumly-packs

Verified and community packs for [trumly](https://spec.trumly.co/registry). This repository is the source of truth for every pack, including the **core** packs that are built into the trumly binary (`trumly-spec` copies the pinned versions listed in its `packs/core.pin`).

A pack is data, never code: a folder of Markdown files defining types, link types, rules and planes. Publishing your own pack is not open yet, and how it will work is not decided ([what is not decided yet](https://spec.trumly.co/about#not-decided)).

    packs/<name>/meta.json          { "tier": "community" }   (maintainers set "verified" after review)
    packs/<name>/<version>/<ns>--pack.md   role: core | enrichment, publisher, use-when, enriches, requires: [core@1]
    packs/<name>/<version>/*.md     the pack's nodes, including <ns>--pack.md, the manifest
    registry.lock.json              the checksum of every published version (updated by the maintainers)

## How packs are published

1. Checks run on every change: every pack loads, its types and links resolve, the lint passes, and no published version has changed. A change to a published version is a new version.
2. New versions are recorded, with a checksum, in `registry.lock.json`.
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

## Checking locally

    node scripts/check.mjs          # needs Node 22.18 or newer

`lib/` is the registry code that checks and bundles the packs. `vendor/trumly.wasm` is the trumly engine compiled for WebAssembly, so a pack is checked by the same code the trumly command line uses; `vendor/PROVENANCE.md` records the commit and checksum it was built from.

Dependencies are updated by Dependabot, and CI fails on a high-severity advisory in the dependencies that publish.

© 2026 Catchlove Ltd. Licensed under the Apache License 2.0 (see `LICENSE` and `NOTICE`). Each pack carries the licence named in its own manifest.
