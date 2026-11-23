---
id: k8s--rule-workload-has-container
type: rule
title: Workloads run a container
fields:
  name: Workloads run a container
  statement: Every workload runs at least one container
  severity: error
  applies_to:
    type: workload
  check:
    require_link:
      min: 1
      type: runs-in
      node_type: container
      dir: in
  pack: kubernetes@0.1.1
---
**Why:** a workload is a request to run something. If nothing says what, the design is incomplete.

**Fix:** add a container that `runs-in` the workload.
