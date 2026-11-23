---
id: ctr--link-type-mounts
type: link-type
title: mounts
fields:
  name: mounts
  description: 'Use to say something reads and writes durable storage: a container mounts a volume, or (with
    the kubernetes pack) a workload mounts a persistent volume claim.'
  inverse: mounted by
  from:
  - container
  - workload
  to:
  - volume
  - persistent-volume-claim
  pack: containers@0.1.0
---

