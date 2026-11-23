---
id: sdr--rule-service-slo
type: rule
title: Services have an objective
fields:
  name: Services have an objective
  statement: Every service has an objective
  severity: warn
  applies_to:
    type: component
    kind: service
  check:
    require_link:
      type: guarantees
      node_type: slo
  pack: runtime@0.3.0
---
