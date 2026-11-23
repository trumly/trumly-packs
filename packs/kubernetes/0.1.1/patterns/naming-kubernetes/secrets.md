---
id: secrets
type: name-pattern
title: Secrets
parent: namespaces
plane: k8s--names
fields:
  scope: Secrets
  pattern: '{^consumes/title}-{title}'
  example: ops-api-db
  case: kebab
  max-length: 253
links:
- type: describes
  to: k8s--type-secret
---
Named for the workload that reads them and what they hold: ops-api-db, ops-api-tls. Calculated for you from the workload that reads it and the secret's own title, which says what it holds. Never put the value or the vault path in the name. A secret name is a DNS subdomain, up to 253 characters.
