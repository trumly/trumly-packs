---
id: workload-ops-cache
type: workload
title: ops-cache
plane: k8s--kubernetes
fields:
  kind: stateful-set
  replicas: 1
links:
- type: details
  to: datastore-ops-cache
- type: belongs-to
  to: namespace-ops
- type: mounts
  to: persistent-volume-claim-ops-cache
---
Keeps its own data, so it is a stateful set with a durable disk.
