---
id: lgc--rule-step-leads-on
type: rule
title: Steps lead on
fields:
  name: Steps lead on
  statement: Every step except an end has a step that follows
  severity: error
  applies_to:
    type: step
    kind:
    - start
    - action
    - wait
    - decision
  check:
    require_link:
      type: next
      node_type: step
      min: 1
  pack: logic@0.1.0
---
