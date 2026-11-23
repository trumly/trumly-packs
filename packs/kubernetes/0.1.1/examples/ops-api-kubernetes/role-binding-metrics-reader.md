---
id: role-binding-metrics-reader
type: role-binding
title: API reads metrics
plane: k8s--kubernetes
fields:
  scope: cluster
links:
- type: belongs-to
  to: cluster-eks-prod
- type: grants
  to: role-metrics-reader
- type: grants-to
  to: service-account-ops-api
---
A cluster-scoped binding, because the role it grants is cluster-wide.
