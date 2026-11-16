---
id: hst--pack
type: pack
title: Hosting
fields:
  name: hosting
  namespace: hst
  version: 0.1.0
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
    Say that the operations database runs on RDS in AWS without changing the design underneath.'
  use-when: When you need to say who provides the infrastructure and which of their services realise a
    datastore, queue or component, for example that the operations database runs on RDS in AWS.
  requires:
  - core@^1.0.0
---
