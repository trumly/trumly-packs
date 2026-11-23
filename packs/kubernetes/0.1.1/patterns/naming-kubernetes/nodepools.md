---
id: nodepools
type: name-pattern
title: Node pools
parent: namespaces
plane: k8s--names
fields:
  scope: Node pools
  pattern: '{purpose}'
  example: apps
  case: kebab
  max-length: 12
links:
- type: describes
  to: k8s--type-nodepool
---
Named for what they are for: system, apps, batch, gpu. Short and lower case with no dashes, because AKS limits a pool to 12 letters and digits; EKS and GKE allow more.
