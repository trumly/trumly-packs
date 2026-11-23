---
id: nam--pack
type: pack
title: Naming
fields:
  name: naming
  namespace: nam
  version: 0.1.0
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - about
  - design
  description: 'How things are named: name patterns whose parts are filled from name tokens (prefixes, environment
    and region codes), each token pointing at the node or type it stands for. One rule: every token stands for
    a node or a type. Other packs ship naming patterns that use these types, and every calculated name is called
    `handle`, so one label choice shows them all.'
  use-when: When names follow a scheme (cloud resources, environments, tables) and people and agents should
    name new things the same way first time.
  requires:
  - core@^1.0.0
  - about@^1.1.0
  optional:
  - design@^1.0.0
---

