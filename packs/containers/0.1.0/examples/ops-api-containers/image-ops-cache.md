---
id: image-ops-cache
type: image
title: Cache image
plane: ctr--containers
fields:
  repository: ops-cache
  tag: '7.2'
  base-image: none (vendor image)
links:
- type: stored-in
  to: registry-ecr
---
Third-party cache server, mirrored into our own registry so deployments do not depend on a public one.
