---
id: gcp
type: name-pattern
title: Google Cloud resources
plane: hst--names
fields:
  scope: Google Cloud resources (databases, services, queues)
  pattern: '{details/title}-{details/runs-in/^stands-for/value}-{details/@type/^stands-for/value}'
  example: ops-prd-db
  case: kebab
  max-length: 63
links:
- type: describes
  to: hst--type-cloud-service
---
Lower case letters, digits and hyphens, starting with a letter, 63 characters at most. The first part is the title of the design node the service realises, then the environment code and what the resource is for. The region is set on the resource, not in its name.
