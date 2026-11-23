---
id: lgc--rule-lifecycle-begins
type: rule
title: Lifecycles begin in one state
fields:
  name: Lifecycles begin in one state
  statement: Every lifecycle begins in exactly one initial state
  severity: error
  applies_to:
    type: lifecycle
  check:
    require_link:
      type: begins-at
      node_type: state
      node_fields:
        initial: true
      min: 1
      max: 1
  pack: logic@0.1.0
---
