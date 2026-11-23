---
id: k8s--rule-cluster-runs-somewhere
type: rule
title: Clusters say where they run
fields:
  name: Clusters say where they run
  statement: Every cluster says what provides it
  severity: warn
  applies_to:
    type: cluster
  check:
    any_of:
    - require_link:
        type: runs-in
        node_type: cloud-service
        min: 1
        max: 1
    - require_link:
        type: runs-in
        node_type: host
        min: 1
        max: 1
  pack: kubernetes@0.1.1
---
**Why:** this ties the cluster to where it physically lives, so cost, region and ownership can be traced.

**Fix:** add a `runs-in` link to the managed Kubernetes cloud service (with the hosting pack), or to a host for a self-built cluster.
