---
id: k8s--type-role-binding
type: type
title: role-binding
fields:
  name: role-binding
  plane: k8s--kubernetes
  description: Use to give an identity a role. This is the step that actually grants the permissions.
  fields:
  - name: scope
    kind: choice
    required: true
    values:
    - namespace
    - cluster
  pack: kubernetes@0.1.1
---
**Ask:** Which identity gets which role, and where?

Link it to the role with `grants` and to the identity with `grants-to`. Covers role bindings and cluster role bindings through `scope`.
