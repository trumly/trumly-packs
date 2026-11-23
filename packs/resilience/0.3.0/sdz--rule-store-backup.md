---
id: sdz--rule-store-backup
type: rule
title: Data stores have a backup
fields:
  name: Data stores have a backup
  statement: Every datastore that holds data that cannot be rebuilt has a backup
  severity: error
  applies_to:
    type: datastore
    kind:
    - relational
    - document
    - key-value
    - object
    - search
    - file
  check:
    require_link:
      type: backed-up-by
      node_type: backup
  pack: resilience@0.3.0
---
