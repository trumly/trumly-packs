---
id: container-ops-api-local
type: container
title: API on a laptop
plane: ctr--containers
fields:
  port: 8080
  runs-as-root: false
links:
- type: details
  to: component-ops-api
- type: runs
  to: image-ops-api
- type: runs-in
  to: host-dev-laptop
- type: belongs-to
  to: compose-project-ops-local
- type: mounts
  to: volume-ops-local-data
---
The same image as production, started by Compose for local development.
