---
id: identity
type: service-account
parent: cluster
title: App identity
plane: k8s--kubernetes
fields:
  purpose: Identity for the application
links:
- type: belongs-to
  to: app
---
The identity the workload runs as, so its permissions are its own.
