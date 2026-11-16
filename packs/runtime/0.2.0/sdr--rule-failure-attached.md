---
id: sdr--rule-failure-attached
type: rule
title: Failures belong to a component
fields:
  name: Failures belong to a component
  statement: Every failure mode belongs to a component
  severity: error
  applies_to:
    type: failure-mode
  check:
    require_link:
      type: fails-by
      dir: in
      node_type: component
  pack: runtime@0.2.0
---
