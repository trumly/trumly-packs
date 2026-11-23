---
id: names-aws
type: name-pattern
title: AWS resources
plane: nam--names
fields:
  scope: AWS resources (databases, services, queues)
  pattern: '{details/^stands-for/value}-{details/runs-in/^stands-for/value}-{details/runs-in/in-region/^stands-for/value}-{details/@type/^stands-for/value}'
  example: ops-prd-euw2-db
  case: kebab
  max-length: 63
links:
- type: describes
  to: hst--type-cloud-service
---
The workload part is `ops`. The type token says what the resource is for in the design, not which AWS product it is.
