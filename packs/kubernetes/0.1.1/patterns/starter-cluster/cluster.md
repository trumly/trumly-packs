---
id: cluster
type: cluster
title: Cluster
plane: k8s--kubernetes
fields:
  distribution: eks
  version: '1.31'
links:
- type: runs-in
  to: production
---
The cluster everything below runs on. It runs in the production environment, which is how its namespaces find the environment code. Set the distribution and version to yours.
