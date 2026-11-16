---
id: dns--rule-production-named
type: rule
title: Production has a hostname
fields:
  name: Production has a hostname
  statement: Every production environment is reached by a hostname
  severity: warn
  applies_to:
    type: environment
    kind: production
  check:
    require_link:
      type: serves
      dir: in
      node_type: hostname
  pack: dns@0.2.0
---
