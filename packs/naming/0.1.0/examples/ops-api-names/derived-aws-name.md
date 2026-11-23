---
id: derived-aws-name
type: derived
title: AWS resource handle
fields:
  name: handle
  label: AWS resource handle
  template: '{details/^stands-for/value}-{details/runs-in/^stands-for/value}-{details/runs-in/in-region/^stands-for/value}-{details/@type/^stands-for/value}'
  applies_to:
    type: cloud-service
  enabled: true
links:
- type: details
  to: names-aws
---
RDS for PostgreSQL details the Ops db (db) in Production (prd), in London (euw2): `ops-prd-euw2-db`. ECS Fargate details the two services: `ops-prd-euw2-svc`.
