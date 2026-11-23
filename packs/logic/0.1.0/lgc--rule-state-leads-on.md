---
id: lgc--rule-state-leads-on
type: rule
title: States lead on
fields:
  name: States lead on
  statement: Every state that is not final has a way out
  severity: warn
  applies_to:
    type: state
    final: false
  check:
    require_link:
      type: moves-to
      node_type: state
      min: 1
  pack: logic@0.1.0
---
