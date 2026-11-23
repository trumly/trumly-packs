---
id: k8s--type-role
type: type
title: role
fields:
  name: role
  plane: k8s--kubernetes
  description: Use for a named set of permissions, such as 'read pods'. It grants nothing until a role
    binding attaches it to an identity.
  fields:
  - name: scope
    kind: choice
    required: true
    values:
    - namespace
    - cluster
  - name: permissions
    kind: text
    label: What it allows, in plain words
    required: true
  pack: kubernetes@0.1.1
---
**Ask:** What exactly must be allowed? Choose the narrowest scope: one namespace if you can.

This single type covers both Kubernetes roles (`scope: namespace`) and cluster roles (`scope: cluster`).
