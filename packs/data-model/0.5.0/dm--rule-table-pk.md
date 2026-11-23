---
id: dm--rule-table-pk
type: rule
title: Tables have a primary key
fields:
  name: Tables have a primary key
  applies_to:
    type: data-table
  check:
    require_link:
    - min: 1
      node_fields:
        primary_key: true
      node_type: data-column
      type: data-contains
  pack: data-model@0.5.0
  severity: warn
  statement: Every table has a primary key
---
