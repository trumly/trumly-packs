---
id: chart-ops
type: chart
title: ops
plane: k8s--helm
fields:
  version: 0.3.0
links:
- type: bundles
  to: workload-ops-api
- type: bundles
  to: service-ops-api
- type: bundles
  to: config-map-ops-api
- type: bundles
  to: autoscaler-ops-api
- type: bundles
  to: service-account-ops-api
- type: bundles
  to: network-policy-ops-default
---
Everything needed to run the API, packaged so it can be installed the same way in every environment. The ingress is left out and defined per environment.
