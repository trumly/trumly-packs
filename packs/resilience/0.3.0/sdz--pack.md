---
id: sdz--pack
type: pack
title: Resilience
fields:
  name: resilience
  namespace: sdz
  version: 0.3.0
  description: 'Surviving loss: recovery objectives, backups and fallbacks. Rules are errors: every datastore has a recovery objective, and every datastore that holds data that cannot be rebuilt has a backup. A cache is rebuilt, so it needs no backup.'
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - datastore
  - component
  use-when: 'When you need to say how the system survives loss: recovery objectives, backups and fallbacks.'
  requires:
  - core@^1.0.0
  optional:
  - hosting@^0.2.0
  - data-model@^0.5.0
---
