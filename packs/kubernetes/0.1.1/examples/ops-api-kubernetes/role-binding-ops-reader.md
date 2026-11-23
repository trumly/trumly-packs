---
id: role-binding-ops-reader
type: role-binding
title: API reads config
plane: k8s--kubernetes
fields:
  scope: namespace
links:
- type: belongs-to
  to: namespace-ops
- type: grants
  to: role-ops-reader
- type: grants-to
  to: service-account-ops-api
---
Gives the API identity the config reader role in its own namespace.
