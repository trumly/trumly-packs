---
id: service-account-ops-api
type: service-account
title: API identity
plane: k8s--kubernetes
fields:
  purpose: Identity for the operations API
links:
- type: belongs-to
  to: namespace-ops
---
The identity the API runs as inside the cluster, so its permissions are its own.
