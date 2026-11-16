---
id: sdz--pack
type: pack
title: Resilience
fields:
  name: resilience
  namespace: sdz
  version: 0.2.0
  description: 'Deep module: surviving loss. Recovery objectives, backups and fallbacks. Rules are errors:
    every datastore has a backup and a recovery objective.'
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - datastore
  - component
  use-when: 'When you need to say how the system survives loss: recovery objectives, backups and fallbacks.'
  requires:
  - core@^1.0.0
---
