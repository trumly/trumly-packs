---
id: api--rule-error-code
type: rule
title: Errors state a status code
fields:
  name: Errors state a status code
  statement: Every error states its status code
  severity: error
  applies_to:
    type: api-error
  check:
    require_fields:
    - status_code
  pack: api@0.3.0
---
