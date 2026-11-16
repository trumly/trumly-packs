---
id: sdz--rule-objective-fields
type: rule
title: Objectives state RTO and RPO
fields:
  name: Objectives state RTO and RPO
  statement: Every recovery objective states time and data loss
  severity: error
  applies_to:
    type: recovery-objective
  check:
    require_fields:
    - rto
    - rpo
  pack: resilience@0.2.0
---
