---
id: namespaces
type: name-pattern
title: Kubernetes namespaces
plane: k8s--names
fields:
  scope: Kubernetes namespaces
  pattern: '{title}-{belongs-to/runs-in/^stands-for/value}'
  example: ops-prd
  case: kebab
  max-length: 63
links:
- type: describes
  to: k8s--type-namespace
---
Names must be valid DNS labels: lower case letters, digits and -, starting and ending with a letter or digit, 63 characters at most. Calculated for you: a namespace's `handle` is its title and the code of the environment its cluster runs in. Title the namespace with its name (`ops`), and give the cluster's place a token that stands for its environment (see Naming – Environment codes).
