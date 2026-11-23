---
id: container-ops-api-cluster
type: container
title: API in the cluster
plane: ctr--containers
fields:
  port: 8080
  cpu-limit: 500m
  memory-limit: 512Mi
  runs-as-root: false
links:
- type: runs
  to: image-ops-api
- type: runs-in
  to: workload-ops-api
---
The container the operations API workload starts in each copy.
