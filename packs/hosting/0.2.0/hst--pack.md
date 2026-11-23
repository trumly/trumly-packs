---
id: hst--pack
type: pack
title: Hosting
fields:
  name: hosting
  namespace: hst
  version: 0.2.0
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - environment
  - datastore
  - queue
  - component
  description: 'Who provides the infrastructure and which of their products realise your design: cloud
    providers and cloud services, attached to environments, datastores, queues and components with details.
    Say that the operations database runs on RDS in AWS without changing the design underneath. Also where
    things sit: the regions the system runs in, the network zones within them, and the rule that a datastore
    never lives in a public zone.'
  use-when: When you need to say who provides the infrastructure, which of their services realise a datastore,
    queue or component, and where things sit (regions and network zones), for example that the operations
    database runs on RDS in AWS in a private zone in London.
  requires:
  - core@^1.0.0
  optional:
  - data-model@^0.5.0
  - containers@^0.1.0
  - kubernetes@^0.1.0
---
