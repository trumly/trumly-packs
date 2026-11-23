---
id: host-api
type: hostname
title: api.ops.example.com
plane: dns--naming
fields:
  kind: app
links:
- type: under
  to: domain-ops
- type: serves
  to: component-ops-api
- type: serves
  to: environment-production
---
