---
id: k8s--rule-autoscaler-scales-workload
type: rule
title: Autoscalers scale a workload
fields:
  name: Autoscalers scale a workload
  statement: Every autoscaler scales exactly one workload
  severity: error
  applies_to:
    type: autoscaler
  check:
    require_link:
      min: 1
      type: scales
      max: 1
      node_type: workload
  pack: kubernetes@0.1.1
---
**Fix:** add a `scales` link to the workload it resizes.
