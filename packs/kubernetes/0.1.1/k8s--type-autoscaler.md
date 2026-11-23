---
id: k8s--type-autoscaler
type: type
title: autoscaler
fields:
  name: autoscaler
  plane: k8s--kubernetes
  description: Use when a workload should add or remove copies of itself automatically as load changes.
    Skip it for workloads with a fixed size.
  fields:
  - name: min-replicas
    kind: number
    required: true
  - name: max-replicas
    kind: number
    required: true
  - name: metric
    kind: choice
    values:
    - cpu
    - memory
    - custom
  - name: target
    kind: text
    label: Target (e.g. 70%)
  pack: kubernetes@0.1.1
---
**Ask:** What load pattern do you expect? What are the smallest and largest sensible sizes? What measurement triggers scaling?

Kubernetes calls this a HorizontalPodAutoscaler.
