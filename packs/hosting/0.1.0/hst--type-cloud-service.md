---
id: hst--type-cloud-service
type: type
title: cloud-service
fields:
  name: cloud-service
  plane: hst--hosting
  description: 'Use for one product from a provider that realises part of the design: a managed database,
    a container platform, a queue or an object store. Link it to the design node it realises with details.'
  shape: hexagon 2d
  fields:
  - name: service
    kind: text
    label: Product name
    required: true
  - name: kind
    kind: choice
    required: true
    values:
    - compute
    - database
    - storage
    - queue
    - network
    - identity
    - observability
    - other
  - name: region
    kind: text
  pack: hosting@0.1.0
---
**Ask:** Which product from the provider realises this datastore, queue or component? In which region?

Say what the product is (for example RDS for PostgreSQL) and put it in the provider with `runs-in`. Link it to the design node it realises with `details`, so removing this pack leaves the design intact. Vendor tuning (instance sizes, settings) belongs in an infrastructure repository, not here.

**Watch:** a service that realises nothing in the design, or one with no region when data residency matters.
