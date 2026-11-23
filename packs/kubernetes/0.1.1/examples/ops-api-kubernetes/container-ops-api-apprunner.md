---
id: container-ops-api-apprunner
type: container
title: API on App Runner
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
  to: cloud-service-apprunner
---
The same image run on a managed container service: no cluster to look after, fewer controls. Used for preview copies.
