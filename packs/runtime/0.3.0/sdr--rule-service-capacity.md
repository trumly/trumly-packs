---
id: sdr--rule-service-capacity
type: rule
title: Services state their size
fields:
  name: Services state their size
  statement: Every service says what it is sized for
  severity: warn
  applies_to:
    type: component
    kind: service
  check:
    require_link:
      type: sized-for
      node_type: capacity
  pack: runtime@0.3.0
---
