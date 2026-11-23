---
id: api--rule-endpoint-accepts-put
type: rule
title: PUT accepts a schema
fields:
  name: PUT accepts a schema
  statement: A PUT endpoint accepts a schema
  severity: warn
  applies_to:
    type: api-endpoint
    method: PUT
  check:
    require_link:
      type: accepts
      node_type: api-schema
  pack: api@0.3.0
---
