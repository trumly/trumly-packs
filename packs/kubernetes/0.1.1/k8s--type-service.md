---
id: k8s--type-service
type: type
title: service
fields:
  name: service
  plane: k8s--kubernetes
  description: Use for the stable internal address through which other things reach a workload, because
    the workload's copies come and go. Every workload that receives traffic needs one.
  fields:
  - name: kind
    kind: choice
    required: true
    values:
    - cluster-ip
    - node-port
    - load-balancer
  - name: port
    kind: number
    required: true
  pack: kubernetes@0.1.1
---
**Ask:** Who calls it: other things in the cluster, or the outside world? On which port?

This is a Kubernetes service (a stable address), not a business service or a cloud service.
