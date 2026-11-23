---
id: lgc--rule-flow-begins
type: rule
title: Flows begin at one step
fields:
  name: Flows begin at one step
  statement: Every flow begins at exactly one start step
  severity: error
  applies_to:
    type: flow
  check:
    require_link:
      type: begins-at
      node_type: step
      node_fields:
        kind: start
      min: 1
      max: 1
  pack: logic@0.1.0
---
