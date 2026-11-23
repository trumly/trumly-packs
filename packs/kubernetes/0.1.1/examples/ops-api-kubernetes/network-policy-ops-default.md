---
id: network-policy-ops-default
type: network-policy
title: Ops default policy
plane: k8s--kubernetes
fields:
  stance: deny-by-default
  allows: The ingress controller to the API on port 8080, and the API to the database
links:
- type: protects
  to: workload-ops-api
- type: belongs-to
  to: namespace-ops
---
Closed by default; only the traffic the API needs is allowed.
