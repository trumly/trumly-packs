---
id: api--rule-built-served
type: rule
title: Built endpoints are served
fields:
  name: Built endpoints are served
  statement: A built endpoint is served by something
  severity: warn
  applies_to:
    type: api-endpoint
    status: built
  check:
    require_link:
      type: served-by
  pack: api@0.3.0
---
