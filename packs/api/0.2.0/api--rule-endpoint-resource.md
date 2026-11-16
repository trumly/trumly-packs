---
id: api--rule-endpoint-resource
type: rule
title: Endpoints have a resource
fields:
  name: Endpoints have a resource
  statement: Every endpoint operates on a resource
  severity: warn
  applies_to:
    type: api-endpoint
  check:
    require_link:
      type: operates-on
      node_type: api-resource
  pack: api@0.2.0
---
