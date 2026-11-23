---
id: lgc--rule-state-reached
type: rule
title: States are reached
fields:
  name: States are reached
  statement: Every state except the first is reached from another state
  severity: warn
  applies_to:
    type: state
    initial: false
  check:
    require_link:
      type: moves-to
      dir: in
      node_type: state
      min: 1
  pack: logic@0.1.0
---
