---
id: k8s--rule-nodepool-in-cluster
type: rule
title: Nodepools are in a cluster
fields:
  name: Nodepools are in a cluster
  statement: Every nodepool belongs to a cluster
  severity: warn
  applies_to:
    type: nodepool
  check:
    require_link:
      min: 1
      type: belongs-to
      max: 1
      node_type: cluster
  pack: kubernetes@0.1.1
---
**Fix:** add a `belongs-to` link to a cluster.
