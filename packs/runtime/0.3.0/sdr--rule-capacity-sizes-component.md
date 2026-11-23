---
id: sdr--rule-capacity-sizes-component
type: rule
title: Capacity belongs to component
fields:
  name: Capacity belongs to component
  statement: Every capacity plan is for a component
  severity: warn
  applies_to:
    type: capacity
  check:
    any_of:
    - require_link:
        min: 1
        type: sized-for
        dir: in
        node_type: component
  pack: runtime@0.3.0
---
**Why:** a capacity plan nothing points at sizes nothing.

**Fix:** link the component to it with `sized-for`.
