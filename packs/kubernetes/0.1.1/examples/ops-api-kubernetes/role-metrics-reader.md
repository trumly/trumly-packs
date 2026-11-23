---
id: role-metrics-reader
type: role
title: Metrics reader
plane: k8s--kubernetes
fields:
  scope: cluster
  permissions: Read node and pod metrics across the whole cluster
links:
- type: belongs-to
  to: cluster-eks-prod
---
A cluster-wide role, because metrics are read across every namespace.
