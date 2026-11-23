---
id: workload-ops-api
type: workload
title: ops-api
plane: k8s--kubernetes
fields:
  kind: deployment
  replicas: 3
links:
- type: details
  to: component-ops-api
- type: belongs-to
  to: namespace-ops
- type: runs-in
  to: nodepool-apps
- type: consumes
  to: config-map-ops-api
- type: consumes
  to: secret-ops-db
- type: consumes
  to: service-account-ops-api
---
The always-on, stateless API. Three copies for resilience; the autoscaler adds more under load.
