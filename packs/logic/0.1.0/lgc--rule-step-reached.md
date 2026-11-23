---
id: lgc--rule-step-reached
type: rule
title: Steps are reached
fields:
  name: Steps are reached
  statement: Every step except the start is reached from another step
  severity: warn
  applies_to:
    type: step
    kind:
    - action
    - wait
    - decision
    - end
  check:
    require_link:
      type: next
      dir: in
      node_type: step
      min: 1
  pack: logic@0.1.0
---
