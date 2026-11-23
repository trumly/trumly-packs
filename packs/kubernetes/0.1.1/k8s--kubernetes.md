---
id: k8s--kubernetes
type: plane
title: Kubernetes
fields:
  order: 1
  stack: Kubernetes
  shapes:
    autoscaler: triangle
    cluster: cloud
    config-map: document
    ingress: pipe
    namespace: folder
    network-policy: shield
    nodepool: circle
    persistent-volume-claim: database
    role: person
    role-binding: person
    secret: star
    service: pipe
    service-account: person
    workload: diamond
  pack: kubernetes@0.1.1
---
How containers are scheduled, exposed, configured and secured on a Kubernetes cluster. Model what a designer decides (workloads, services, configuration, access). Do not model what the cluster creates for itself, such as pods, nodes and replica sets.
