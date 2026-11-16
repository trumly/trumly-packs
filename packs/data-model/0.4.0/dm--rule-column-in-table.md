---
id: dm--rule-column-in-table
type: rule
title: Columns belong to a table
fields:
  name: Columns belong to a table
  applies_to:
    type: data-column
  check:
    require_link:
    - dir: in
      max: 1
      min: 1
      node_type: data-table
      type: data-contains
  pack: data-model@0.4.0
  severity: warn
  statement: Columns belong to one table
---
