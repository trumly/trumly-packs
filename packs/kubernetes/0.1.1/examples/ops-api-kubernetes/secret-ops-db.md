---
id: secret-ops-db
type: secret
title: db
plane: k8s--kubernetes
fields:
  source: 'AWS Secrets Manager: ops/db-password'
  rotation: Every 90 days
links:
- type: belongs-to
  to: namespace-ops
---
Only the location of the value is recorded here. The value itself lives in the secrets manager.
