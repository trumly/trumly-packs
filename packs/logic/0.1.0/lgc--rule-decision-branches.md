---
id: lgc--rule-decision-branches
type: rule
title: Decisions have branches
fields:
  name: Decisions have branches
  statement: Every decision has two or more branches and each says when it is taken
  severity: error
  applies_to:
    type: step
    kind: decision
  check:
    require_link:
      type: next
      node_type: step
      min: 2
    require_link_fields:
      type: next
      fields:
      - when
  pack: logic@0.1.0
---
