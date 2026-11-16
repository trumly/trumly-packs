---
id: dm--rule-view-from-table
type: rule
title: Views are built from tables
fields:
  name: Views are built from tables
  applies_to:
    type: data-view
  check:
    require_link:
    - min: 1
      node_type: data-table
      type: data-derives-from
  severity: info
  statement: Every view is built from a table
  pack: data-model@0.4.0
---
