---
id: k8s--type-chart
type: type
title: chart
fields:
  name: chart
  plane: k8s--helm
  description: Use for a reusable, versioned package of Kubernetes objects (workloads, services, config)
    that can be installed again and again with different settings.
  fields:
  - name: version
    kind: text
    required: true
  - name: repository
    kind: text
  pack: kubernetes@0.1.1
---
**Ask:** Which Kubernetes objects belong together as one installable unit? What settings can vary between installs?

Link it to what it contains with `bundles`.
