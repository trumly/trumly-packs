---
id: ctr--pack
type: pack
title: Containers
fields:
  name: containers
  namespace: ctr
  version: 0.1.0
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - design
  description: 'How software is packaged and run as containers, before any orchestrator: the image that
    holds it, the registry that stores it, the container that runs it, the host it runs on and the storage
    it uses. OCI only, so Docker, Podman and containerd all fit. Rules ask that every container runs one
    image in one place, and that images are pinned and stored in a registry.'
  use-when: When the system ships as container images, run on laptops, servers, Compose or a managed container
    service. Add the kubernetes pack as well for a cluster.
  requires:
  - core@^1.0.0
  optional:
  - kubernetes@^0.1.0
---

