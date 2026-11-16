---
id: dm--rule-entity-built
type: rule
title: Entities are built as tables
fields:
  name: Entities are built as tables
  applies_to:
    type: data-entity
  check:
    require_link:
    - min: 1
      node_type: data-table
      type: data-realised-by
  pack: data-model@0.4.0
  severity: info
  statement: Every entity is built as a table
---
