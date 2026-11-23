---
id: api--rule-endpoint-accepts-patch
type: rule
title: PATCH accepts a schema
fields:
  name: PATCH accepts a schema
  statement: A PATCH endpoint accepts a schema
  severity: warn
  applies_to:
    type: api-endpoint
    method: PATCH
  check:
    require_link:
      type: accepts
      node_type: api-schema
  pack: api@0.3.0
---
