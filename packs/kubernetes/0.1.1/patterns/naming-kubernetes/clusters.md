---
id: clusters
type: name-pattern
title: Clusters
parent: namespaces
plane: k8s--names
fields:
  scope: Kubernetes clusters
  pattern: '{distribution}-{runs-in/^stands-for/value}'
  example: ops-prd
  case: kebab
  max-length: 63
links:
- type: describes
  to: k8s--type-cluster
---
`<platform>` is the short name of what the cluster serves. Cloud providers add their own rules (an AKS cluster follows the Azure pattern in the hosting pack). Guidance only.
