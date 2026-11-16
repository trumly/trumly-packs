---
id: dm--rule-table-in-schema
type: rule
title: Tables live in a schema
fields:
  name: Tables live in a schema
  applies_to:
    type: data-table
  check:
    require_link:
    - dir: in
      max: 1
      min: 1
      node_type: data-schema
      type: data-contains
  pack: data-model@0.4.0
  severity: warn
  statement: Tables live in a schema
---
