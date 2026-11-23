---
id: api--rule-endpoint-traces
type: rule
title: Endpoints satisfy a need
fields:
  name: Endpoints satisfy a need
  statement: Every endpoint satisfies a requirement
  severity: warn
  applies_to:
    type: api-endpoint
  check:
    require_link:
      type: satisfies
  pack: api@0.3.0
---

An endpoint nobody asked for is surface to defend for ever.
