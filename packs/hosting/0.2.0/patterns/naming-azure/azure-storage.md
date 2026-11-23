---
id: azure-storage
type: name-pattern
parent: azure
title: Azure storage and registries
plane: hst--names
fields:
  scope: Azure resources whose names allow only lower-case letters and digits (storage accounts, container registries)
  pattern: '{@type/^stands-for/value}{title}{runs-in/^stands-for/value}{runs-in/in-region/^stands-for/value}'
  example: crapprduks
  case: lower
  max-length: 24
links:
- type: describes
  to: ctr--type-registry
---
Storage accounts and container registries reject hyphens and must be globally unique, so the same parts run together with no separator. Storage accounts cap at 24 characters, so keep the title's workload part to four letters or fewer. Where a resource has its own pattern, that one wins.
