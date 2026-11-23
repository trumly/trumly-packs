---
id: k8s--rule-stateful-workload-mounts-storage
type: rule
title: Stateful sets keep storage
fields:
  name: Stateful sets keep storage
  statement: Every stateful set mounts a persistent volume claim
  severity: warn
  applies_to:
    type: workload
    kind: stateful-set
  check:
    require_link:
      min: 1
      type: mounts
      node_type: persistent-volume-claim
  pack: kubernetes@0.1.1
---
**Why:** a stateful set exists because it keeps data. Without durable storage that data is lost when it restarts.

**Fix:** add a `mounts` link to a persistent volume claim.
