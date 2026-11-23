---
id: k8s--type-config-map
type: type
title: config-map
fields:
  name: config-map
  plane: k8s--kubernetes
  description: Use for non-confidential settings a workload reads at start-up, such as feature switches,
    URLs and log levels, kept outside the image so they can change without a rebuild.
  fields:
  - name: purpose
    kind: text
  pack: kubernetes@0.1.1
---
**Ask:** What settings differ between environments? Which workloads need them?

**Watch for:** anything confidential. Passwords and keys belong in a secret.
