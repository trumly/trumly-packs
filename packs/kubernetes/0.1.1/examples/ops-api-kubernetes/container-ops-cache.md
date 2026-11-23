---
id: container-ops-cache
type: container
title: Cache container
plane: ctr--containers
fields:
  port: 6379
  runs-as-root: false
links:
- type: runs
  to: image-ops-cache
- type: runs-in
  to: workload-ops-cache
---
The cache server that holds the latest job status.
