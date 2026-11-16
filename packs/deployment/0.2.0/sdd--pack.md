---
id: sdd--pack
type: pack
title: Deployment
fields:
  name: deployment
  namespace: sdd
  version: 0.2.0
  description: 'Deep module: where things sit. Regions and network zones, and the rule that a datastore
    never lives in a public zone.'
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - component
  - datastore
  use-when: 'When you need to say where things sit: regions and network zones, and which parts may be
    reached from outside.'
  requires:
  - core@^1.0.0
---
