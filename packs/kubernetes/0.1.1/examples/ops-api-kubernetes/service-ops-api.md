---
id: service-ops-api
type: service
title: API address
plane: k8s--kubernetes
fields:
  kind: cluster-ip
  port: 80
links:
- type: exposes
  to: workload-ops-api
- type: belongs-to
  to: namespace-ops
---
The stable address in front of the API copies.
