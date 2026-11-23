---
id: persistent-volume-claim-ops-cache
type: persistent-volume-claim
title: data
plane: k8s--kubernetes
fields:
  size: 10Gi
  access-mode: read-write-once
links:
- type: belongs-to
  to: namespace-ops
---
Durable disk so the cache keeps its contents when its workload is restarted.
