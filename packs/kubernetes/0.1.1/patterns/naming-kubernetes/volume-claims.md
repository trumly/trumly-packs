---
id: volume-claims
type: name-pattern
title: Persistent volume claims
parent: namespaces
plane: k8s--names
fields:
  scope: Persistent volume claims
  pattern: '{^mounts/title}-{title}'
  example: ops-cache-data
  case: kebab
  max-length: 253
links:
- type: describes
  to: k8s--type-persistent-volume-claim
---
Named for the workload that mounts them and what they hold (data, logs, cache). Calculated for you from the workload that mounts it and the claim's own title, which says what it keeps. A stateful set's claim templates add the pod name themselves, so name the template, not the result.
