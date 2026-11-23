---
id: aws
type: name-pattern
title: AWS resources
plane: hst--names
fields:
  scope: AWS resources (databases, services, queues)
  pattern: '{details/^stands-for/value}-{details/runs-in/^stands-for/value}-{details/runs-in/in-region/^stands-for/value}-{details/@type/^stands-for/value}'
  example: app-prd-euw2-db
  case: kebab
  max-length: 63
links:
- type: describes
  to: hst--type-cloud-service
---
AWS has no official abbreviation list, so the type token says what the resource is for in the design (db, svc, q), not which AWS product it is. The workload, environment and region parts come from their name tokens. Put the same parts in tags (Workload, Environment) so names and billing agree.
