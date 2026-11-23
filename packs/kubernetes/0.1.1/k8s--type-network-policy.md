---
id: k8s--type-network-policy
type: type
title: network-policy
fields:
  name: network-policy
  plane: k8s--kubernetes
  description: Use to limit which workloads may talk to each other, so a break-in to one does not open
    up the rest.
  fields:
  - name: stance
    kind: choice
    required: true
    values:
    - deny-by-default
    - allow-all
  - name: allows
    kind: text
    label: What is allowed, in plain words
  pack: kubernetes@0.1.1
---
**Ask:** Which workloads may talk to which? Is the default open or closed?

Link it to the workloads it protects with `protects`. A deny-by-default stance is the safer start.
