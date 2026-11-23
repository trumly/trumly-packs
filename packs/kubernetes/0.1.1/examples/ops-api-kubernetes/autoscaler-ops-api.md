---
id: autoscaler-ops-api
type: autoscaler
title: API autoscaler
plane: k8s--kubernetes
fields:
  min-replicas: 3
  max-replicas: 10
  metric: cpu
  target: 70%
links:
- type: scales
  to: workload-ops-api
- type: belongs-to
  to: namespace-ops
---
Adds copies of the API when CPU stays above 70%.
