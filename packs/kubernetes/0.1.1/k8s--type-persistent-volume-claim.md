---
id: k8s--type-persistent-volume-claim
type: type
title: persistent-volume-claim
fields:
  name: persistent-volume-claim
  plane: k8s--kubernetes
  description: Use for a request for durable storage that outlives any one copy of a workload, such as
    a database's data disk. It states how much and what kind of storage is needed.
  fields:
  - name: size
    kind: text
    required: true
  - name: access-mode
    kind: choice
    values:
    - read-write-once
    - read-only-many
    - read-write-many
  - name: storage-class
    kind: text
  pack: kubernetes@0.1.1
---
**Ask:** What data is stored? How much? Must it survive the workload being replaced or moved?

The cluster or cloud provides the actual disk (a persistent volume), so only the request is modelled. Stateful workloads almost always need one.
