---
id: dm--rule-concept-becomes-entity
type: rule
title: Concepts become entities
fields:
  name: Concepts become entities
  applies_to:
    type: data-concept
  check:
    require_link:
    - min: 1
      node_type: data-entity
      type: data-realised-by
  pack: data-model@0.4.0
  severity: info
  statement: Every concept becomes an entity
---
