---
id: dm--rule-fk-references-pk
type: rule
title: Foreign keys reference a key
fields:
  name: Foreign keys reference a key
  applies_to:
    foreign_key: true
    type: data-column
  check:
    require_link:
    - max: 1
      min: 1
      node_fields:
        primary_key: true
      node_type: data-column
      same_fields:
      - data_type
      type: data-references
  severity: warn
  statement: Foreign key columns reference one primary key
  pack: data-model@0.4.0
---
