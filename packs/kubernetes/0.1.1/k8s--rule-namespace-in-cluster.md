---
id: k8s--rule-namespace-in-cluster
type: rule
title: Namespaces are in a cluster
fields:
  name: Namespaces are in a cluster
  statement: Every namespace belongs to exactly one cluster
  severity: error
  applies_to:
    type: namespace
  check:
    require_link:
      min: 1
      type: belongs-to
      max: 1
      node_type: cluster
  pack: kubernetes@0.1.1
---
**Why:** a namespace only exists inside a cluster.

**Fix:** add a `belongs-to` link to a cluster.
