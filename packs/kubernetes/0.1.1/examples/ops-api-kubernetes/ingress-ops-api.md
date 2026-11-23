---
id: ingress-ops-api
type: ingress
title: API front door
plane: k8s--kubernetes
fields:
  host: ops.example.com
  tls: true
  controller: nginx
links:
- type: routes-to
  to: service-ops-api
- type: belongs-to
  to: namespace-ops
---
Public entry point for the API. Hostname is a placeholder.
