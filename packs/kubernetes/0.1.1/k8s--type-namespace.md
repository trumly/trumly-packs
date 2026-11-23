---
id: k8s--type-namespace
type: type
title: namespace
fields:
  name: namespace
  plane: k8s--kubernetes
  description: Use for a named partition of a cluster that keeps one team, environment or application
    separate from the others, with its own access rules and resources.
  fields:
  - name: purpose
    kind: text
  pack: kubernetes@0.1.1
---
**Ask:** What does it separate: teams, environments or applications? Who may use it?

Every workload, service, config and secret belongs to one namespace, and each namespace belongs to one cluster.
