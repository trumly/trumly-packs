---
id: api--rule-schema-used
type: rule
title: Schemas are used
fields:
  name: Schemas are used
  statement: Every schema is used by an endpoint or event
  severity: info
  applies_to:
    type: api-schema
  check:
    any_of:
    - require_link:
        type: accepts
        dir: in
    - require_link:
        type: returns
        dir: in
    - require_link:
        type: payload
        dir: in
  pack: api@0.2.0
---
