---
id: ctr--type-host
type: type
title: host
fields:
  name: host
  plane: ctr--containers
  description: 'Use for a single machine that runs containers directly, with no orchestrator: a developer
    laptop, a build server or a small VM running Docker.'
  fields:
  - name: runtime
    kind: choice
    label: Container engine
    required: true
    values:
    - docker
    - podman
    - containerd
    - other
  - name: kind
    kind: choice
    values:
    - laptop
    - server
    - virtual-machine
  - name: os
    kind: text
    label: Operating system
  - name: body
    kind: text
    label: Description
    required: true
  pack: containers@0.1.0
---
**Ask:** Which container engine? Is it a laptop, a server or a VM?

Containers and Compose projects point at it with `runs-in`.
