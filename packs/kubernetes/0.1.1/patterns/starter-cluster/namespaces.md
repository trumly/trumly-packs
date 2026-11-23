---
id: namespaces
type: name-pattern
parent: cluster
title: Kubernetes namespaces
plane: k8s--names
fields:
  scope: Kubernetes namespaces
  pattern: '{title}-{belongs-to/runs-in/^stands-for/value}'
  example: myapp-prd
  case: kebab
  max-length: 63
links:
- type: describes
  to: k8s--type-namespace
---
Names must be valid DNS labels. Calculated for you: the namespace's `handle` is its title and the code of the environment its cluster runs in.
