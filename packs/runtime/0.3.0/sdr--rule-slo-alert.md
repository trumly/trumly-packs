---
id: sdr--rule-slo-alert
type: rule
title: Objectives name an alert
fields:
  name: Objectives name an alert
  statement: Every objective names the alert that fires when it is missed
  severity: error
  applies_to:
    type: slo
  check:
    require_fields:
    - alert
  pack: runtime@0.3.0
---
