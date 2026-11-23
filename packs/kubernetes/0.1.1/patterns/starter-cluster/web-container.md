---
id: web-container
type: container
parent: cluster
title: Web container
plane: ctr--containers
fields:
  port: 8080
  runs-as-root: false
links:
- type: runs
  to: web-image
- type: runs-in
  to: web
---
The container the workload starts in each copy.
