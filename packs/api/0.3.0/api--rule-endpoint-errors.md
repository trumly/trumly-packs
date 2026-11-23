---
id: api--rule-endpoint-errors
type: rule
title: Endpoints document errors
fields:
  name: Endpoints document errors
  statement: Every endpoint documents its error cases
  severity: warn
  applies_to:
    type: api-endpoint
  check:
    require_link:
      type: fails-with
      node_type: api-error
  pack: api@0.3.0
---
