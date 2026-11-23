---
id: image-ops-api
type: image
title: ops-api image
plane: ctr--containers
fields:
  repository: ops-api
  tag: 1.4.2
  base-image: node:22-slim
links:
- type: packages
  to: component-ops-api
- type: stored-in
  to: registry-ecr
---
The operations API, built once and run on laptops and in the managed app service.
