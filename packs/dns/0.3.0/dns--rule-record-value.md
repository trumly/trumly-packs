---
id: dns--rule-record-value
type: rule
title: Records have a value
fields:
  name: Records have a value
  statement: Every DNS record has a value
  severity: warn
  applies_to:
    type: dns-record
  check:
    require_fields:
    - value
  pack: dns@0.3.0
---
