---
id: dns--rule-record-hostname
type: rule
title: Records answer a hostname
fields:
  name: Records answer a hostname
  statement: Every DNS record answers for a hostname
  severity: warn
  applies_to:
    type: dns-record
  check:
    require_link:
      type: answers
      node_type: hostname
  pack: dns@0.2.0
---
