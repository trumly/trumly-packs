---
id: dm--rule-attribute-in-entity
type: rule
title: Attributes belong to an entity
fields:
  name: Attributes belong to an entity
  applies_to:
    type: data-attribute
  check:
    require_link:
    - dir: in
      max: 1
      min: 1
      node_type: data-entity
      type: data-contains
  pack: data-model@0.4.0
  severity: warn
  statement: Attributes belong to one entity
---
