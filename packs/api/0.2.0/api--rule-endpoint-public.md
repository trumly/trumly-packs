---
id: api--rule-endpoint-public
type: rule
title: Endpoints say if public
fields:
  name: Endpoints say if public
  statement: Every endpoint says whether it is public
  severity: error
  applies_to:
    type: api-endpoint
  check:
    require_fields:
    - public
  pack: api@0.2.0
---

Public is a decision to make on purpose, not a default.
