---
id: web
type: workload
parent: cluster
title: myapp-web
plane: k8s--kubernetes
fields:
  kind: deployment
  replicas: 2
links:
- type: belongs-to
  to: app
- type: runs-in
  to: apps
- type: consumes
  to: settings
- type: consumes
  to: identity
---
The always-on workload. Two copies so one can restart without an outage.
