---
id: network-policies
type: name-pattern
title: Network policies
parent: namespaces
plane: k8s--names
fields:
  scope: Network policies
  pattern: '{title}'
  example: default-deny
  case: kebab
  max-length: 253
links:
- type: describes
  to: k8s--type-network-policy
---
Named for what it does, not for what it selects: default-deny, allow-api-from-ingress, allow-egress-dns. One intent per policy.
