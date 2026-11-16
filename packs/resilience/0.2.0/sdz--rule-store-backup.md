---
id: sdz--rule-store-backup
type: rule
title: Data stores have a backup
fields:
  name: Data stores have a backup
  statement: Every datastore has a backup
  severity: error
  applies_to:
    type: datastore
  check:
    require_link:
      type: backed-up-by
      node_type: backup
  pack: resilience@0.2.0
---
