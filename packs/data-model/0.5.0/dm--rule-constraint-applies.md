---
id: dm--rule-constraint-applies
type: rule
title: Constraints apply to something
fields:
  name: Constraints apply to something
  applies_to:
    type: data-constraint
  check:
    require_link:
    - min: 1
      type: data-constrains
  severity: warn
  statement: Every constraint applies to something
  pack: data-model@0.5.0
---
