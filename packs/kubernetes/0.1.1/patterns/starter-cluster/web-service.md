---
id: web-service
type: service
parent: cluster
title: Web address
plane: k8s--kubernetes
fields:
  kind: cluster-ip
  port: 80
links:
- type: exposes
  to: web
- type: belongs-to
  to: app
---
The stable address in front of the workload copies.
