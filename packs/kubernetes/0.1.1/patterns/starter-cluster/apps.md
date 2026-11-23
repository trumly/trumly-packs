---
id: apps
type: nodepool
parent: cluster
title: Application pool
plane: k8s--kubernetes
fields:
  vm-size: m6i.xlarge
  min-nodes: 3
  max-nodes: 6
  purpose: application
links:
- type: belongs-to
  to: cluster
---
General-purpose machines for the workloads. Change the size and counts to yours.
