---
id: sdd--rule-component-placed
type: rule
title: Components are placed
fields:
  name: Components are placed
  statement: Every component is placed in a zone
  severity: warn
  applies_to:
    type: component
  check:
    require_link:
      type: placed-in
      node_type: network-zone
  pack: deployment@0.2.0
---
