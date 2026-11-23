---
id: api--rule-auth-scheme
type: rule
title: Auth names its scheme
fields:
  name: Auth names its scheme
  statement: Every auth names its scheme
  severity: error
  applies_to:
    type: api-auth
  check:
    require_fields:
    - scheme
  pack: api@0.3.0
---
