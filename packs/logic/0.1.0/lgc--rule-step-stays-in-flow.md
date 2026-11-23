---
id: lgc--rule-step-stays-in-flow
type: rule
title: Steps stay in their flow
fields:
  name: Steps stay in their flow
  statement: A step only leads on to steps of its own flow
  severity: warn
  applies_to:
    type: step
  check:
    forbid_link:
      type: next
      ancestor_type: flow
      scope: other
  pack: logic@0.1.0
---
