---
id: azure
type: name-pattern
title: Azure resources
plane: hst--names
fields:
  scope: Azure resources that allow hyphens (database servers, clusters, subnets)
  pattern: '{@type/^stands-for/value}-{title}-{runs-in/^stands-for/value}-{runs-in/in-region/^stands-for/value}'
  example: psql-app-prd-uks
  case: kebab
  max-length: 63
links:
- type: describes
  to: dm--type-data-db-server
- type: describes
  to: k8s--type-cluster
- type: describes
  to: hst--type-network-zone
---
The node's title carries the free part: the short name of the system the resource serves (`app`). Microsoft's order ends with a three-digit instance counter; where you run several, add it to the title, which puts it before the environment. The kind, environment and region parts come from name tokens, reached by the link paths in the pattern; the environment and region paths differ for some of the types it describes. Storage accounts and container registries have their own pattern, Azure storage and registries.
