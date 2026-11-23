---
id: nodepool-apps
type: nodepool
title: Application pool
plane: k8s--kubernetes
fields:
  vm-size: m6i.xlarge
  min-nodes: 3
  max-nodes: 6
  purpose: application
links:
- type: belongs-to
  to: cluster-eks-prod
---
General-purpose machines for the API and its helpers.
