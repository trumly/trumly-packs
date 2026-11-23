---
id: workload-ops-migrate
type: workload
title: ops-migrate
plane: k8s--kubernetes
fields:
  kind: job
links:
- type: details
  to: component-ops-api
- type: belongs-to
  to: namespace-ops
- type: consumes
  to: secret-ops-db
---
Runs once per release to bring the database schema up to date, then stops.
