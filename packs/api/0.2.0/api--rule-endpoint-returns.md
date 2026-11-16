---
id: api--rule-endpoint-returns
type: rule
title: Endpoints return a schema
fields:
  name: Endpoints return a schema
  statement: Every endpoint returns a schema
  severity: warn
  applies_to:
    type: api-endpoint
  check:
    require_link:
      type: returns
      node_type: api-schema
  pack: api@0.2.0
---
