---
id: roles
type: name-pattern
title: Roles
parent: namespaces
plane: k8s--names
fields:
  scope: Roles
  pattern: '{title}'
  example: config-reader
  case: kebab
  max-length: 253
links:
- type: describes
  to: k8s--type-role
---
What it allows, in the form resource then access: config-reader, pods-viewer, secrets-editor. Say the scope (namespace or cluster) in the scope field, not in the name.
