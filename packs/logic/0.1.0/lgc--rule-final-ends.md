---
id: lgc--rule-final-ends
type: rule
title: Final states end
fields:
  name: Final states end
  statement: A final state has no way out
  severity: warn
  applies_to:
    type: state
    final: true
  check:
    forbid_link:
      type: moves-to
  pack: logic@0.1.0
---
