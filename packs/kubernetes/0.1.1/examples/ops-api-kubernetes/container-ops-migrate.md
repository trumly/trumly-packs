---
id: container-ops-migrate
type: container
title: Migration container
plane: ctr--containers
fields:
  runs-as-root: false
links:
- type: runs
  to: image-ops-api
- type: runs-in
  to: workload-ops-migrate
---
Same image as the API, started with the migration command.
