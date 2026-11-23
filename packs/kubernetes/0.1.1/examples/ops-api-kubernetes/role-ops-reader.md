---
id: role-ops-reader
type: role
title: Config reader
plane: k8s--kubernetes
fields:
  scope: namespace
  permissions: Read config maps in the ops namespace
links:
- type: belongs-to
  to: namespace-ops
---
Narrowest useful scope: one namespace.
