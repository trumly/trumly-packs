---
id: config-maps
type: name-pattern
title: Config maps
parent: namespaces
plane: k8s--names
fields:
  scope: Config maps
  pattern: '{^consumes/title}-config'
  example: ops-api-config
  case: kebab
  max-length: 253
links:
- type: describes
  to: k8s--type-config-map
---
Named for the workload that reads them, with -config on the end. A config map name is a DNS subdomain, so it may be up to 253 characters and contain dots; keep it short. Calculated for you from the workload that consumes it.
