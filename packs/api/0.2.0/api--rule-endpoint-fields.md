---
id: api--rule-endpoint-fields
type: rule
title: Endpoints state method, path
fields:
  name: Endpoints state method, path
  statement: Every endpoint states its method and path
  severity: error
  applies_to:
    type: api-endpoint
  check:
    require_fields:
    - method
    - path
  pack: api@0.2.0
---
