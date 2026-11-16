---
id: dns--rule-domain-expiry
type: rule
title: Domains record expiry
fields:
  name: Domains record expiry
  statement: Every domain records when it expires
  severity: warn
  applies_to:
    type: domain
  check:
    require_fields:
    - expires
  pack: dns@0.2.0
---
