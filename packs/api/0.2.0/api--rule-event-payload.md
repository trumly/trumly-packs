---
id: api--rule-event-payload
type: rule
title: Events carry a schema
fields:
  name: Events carry a schema
  statement: Every event carries a schema
  severity: error
  applies_to:
    type: api-event
  check:
    require_link:
      type: payload
      node_type: api-schema
  pack: api@0.2.0
---
