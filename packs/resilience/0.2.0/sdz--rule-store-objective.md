---
id: sdz--rule-store-objective
type: rule
title: Data stores have an objective
fields:
  name: Data stores have an objective
  statement: Every datastore has a recovery objective
  severity: error
  applies_to:
    type: datastore
  check:
    require_link:
      type: recovers-to
      node_type: recovery-objective
  pack: resilience@0.2.0
---
