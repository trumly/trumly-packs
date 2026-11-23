---
id: role-bindings
type: name-pattern
title: Role bindings
parent: namespaces
plane: k8s--names
fields:
  scope: Role bindings
  pattern: '{grants-to/title}-{grants/title}'
  example: ops-api-config-reader
  case: kebab
  max-length: 253
links:
- type: describes
  to: k8s--type-role-binding
---
The subject first, then the role it is given, so a list of bindings reads as who may do what.
