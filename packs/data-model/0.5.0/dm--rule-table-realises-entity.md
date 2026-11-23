---
id: dm--rule-table-realises-entity
type: rule
title: Tables realise an entity
fields:
  name: Tables realise an entity
  statement: Every table realises an entity
  severity: warn
  applies_to:
    type: data-table
  check:
    require_link:
      min: 1
      type: data-realised-by
      dir: in
      node_type: data-entity
  pack: data-model@0.5.0
---
**Why:** a table with no entity behind it has no stated meaning, and the logical model drifts from the database.

**Fix:** link the entity to the table with `data-realised-by`.
