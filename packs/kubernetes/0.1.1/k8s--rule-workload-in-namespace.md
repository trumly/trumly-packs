---
id: k8s--rule-workload-in-namespace
type: rule
title: Workloads are in a namespace
fields:
  name: Workloads are in a namespace
  statement: Every workload belongs to exactly one namespace
  severity: error
  applies_to:
    type: workload
  check:
    require_link:
      min: 1
      type: belongs-to
      max: 1
      node_type: namespace
  pack: kubernetes@0.1.1
---
**Why:** namespaces carry the access rules and resource limits that apply to a workload.

**Fix:** add a `belongs-to` link to a namespace.
