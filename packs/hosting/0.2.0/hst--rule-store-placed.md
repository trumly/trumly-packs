---
id: hst--rule-store-placed
type: rule
title: Data stores are placed
fields:
  name: Data stores are placed
  statement: Every datastore is placed in a zone
  severity: warn
  applies_to:
    type: datastore
  check:
    require_link:
      type: placed-in
      node_type: network-zone
  pack: hosting@0.2.0
---
