---
id: lgc--rule-transition-says-on
type: rule
title: Moves say what causes them
fields:
  name: Moves say what causes them
  statement: Every move between states says what causes it
  severity: error
  applies_to:
    type: state
  check:
    require_link_fields:
      type: moves-to
      fields:
      - 'on'
  pack: logic@0.1.0
---
