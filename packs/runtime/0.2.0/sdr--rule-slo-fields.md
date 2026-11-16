---
id: sdr--rule-slo-fields
type: rule
title: Objectives have a target
fields:
  name: Objectives have a target
  statement: Every objective states a target and a window
  severity: error
  applies_to:
    type: slo
  check:
    require_fields:
    - objective
    - window
  pack: runtime@0.2.0
---
