---
id: k8s--type-nodepool
type: type
title: nodepool
fields:
  name: nodepool
  plane: k8s--kubernetes
  description: Use for a group of identical machines inside a cluster, when different kinds of work need
    different sizes or hardware, such as a small system pool and a larger application pool.
  fields:
  - name: vm-size
    kind: text
  - name: min-nodes
    kind: number
  - name: max-nodes
    kind: number
  - name: purpose
    kind: choice
    values:
    - system
    - application
    - batch
    - gpu
  pack: kubernetes@0.1.1
---
**Ask:** What kind of work runs here? How many machines at minimum and maximum? Does anything need special hardware?

Individual nodes are created by the cloud, so they are not modelled.
