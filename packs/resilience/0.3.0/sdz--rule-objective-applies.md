---
id: sdz--rule-objective-applies
type: rule
title: Objectives apply to a node
fields:
  name: Objectives apply to a node
  statement: Every recovery objective is set for a datastore or component
  severity: warn
  applies_to:
    type: recovery-objective
  check:
    any_of:
    - require_link:
        min: 1
        type: recovers-to
        dir: in
        node_type: datastore
    - require_link:
        min: 1
        type: recovers-to
        dir: in
        node_type: component
  pack: resilience@0.3.0
---
**Why:** an objective with nothing it applies to cannot be checked or met.

**Fix:** link the datastore or component to it with `recovers-to`.
