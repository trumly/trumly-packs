---
id: lgc--rule-action-has-doer
type: rule
title: Actions say who does them
fields:
  name: Actions say who does them
  statement: Every action says who or what does it
  severity: warn
  applies_to:
    type: step
    kind: action
  check:
    require_link:
      type: by
      min: 1
  pack: logic@0.1.0
---
