---
id: k8s--type-cluster
type: type
title: cluster
fields:
  name: cluster
  plane: k8s--kubernetes
  description: 'Use for one Kubernetes cluster: the set of machines and the control plane that runs your
    workloads. Usually one per environment, or one shared by several.'
  fields:
  - name: version
    kind: text
    label: Kubernetes version
  - name: distribution
    kind: choice
    values:
    - aks
    - eks
    - gke
    - k3s
    - other
  pack: kubernetes@0.1.1
---
**Ask:** Which cloud service provides it? Which Kubernetes version? How many clusters per environment?

Link it to what provides it with `runs-in`: the managed Kubernetes cloud service, or a host for a self-built cluster. You do not need to model the machines in it; use `nodepool` for the groups that matter.
