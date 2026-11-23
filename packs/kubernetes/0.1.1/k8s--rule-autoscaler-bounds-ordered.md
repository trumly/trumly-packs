---
id: k8s--rule-autoscaler-bounds-ordered
type: rule
title: Autoscaler bounds in order
fields:
  name: Autoscaler bounds in order
  statement: An autoscaler's minimum is not above its maximum
  severity: error
  applies_to:
    type: autoscaler
  check:
    compare_fields:
      left: min-replicas
      op: <=
      right: max-replicas
  pack: kubernetes@0.1.1
---
**Fix:** check the `min-replicas` and `max-replicas` fields.
