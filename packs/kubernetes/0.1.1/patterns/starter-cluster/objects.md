---
id: objects
type: name-pattern
parent: namespaces
title: Kubernetes objects
plane: k8s--names
fields:
  scope: Workloads, services and config maps
  pattern: '{title}'
  example: myapp-web
  case: kebab
  max-length: 63
links:
- type: describes
  to: k8s--type-workload
- type: describes
  to: k8s--type-service
- type: describes
  to: k8s--type-config-map
---
The object's title is its name; the namespace already says the environment.
