---
id: objects
type: name-pattern
title: Workloads and their addresses
parent: namespaces
plane: k8s--names
fields:
  scope: Workloads, services, ingresses, autoscalers and service accounts
  pattern: '{title}'
  example: ops-api
  case: kebab
  max-length: 63
links:
- type: describes
  to: k8s--type-workload
- type: describes
  to: k8s--type-service
- type: describes
  to: k8s--type-ingress
- type: describes
  to: k8s--type-autoscaler
- type: describes
  to: k8s--type-service-account
---
Names must be valid DNS labels: lower case letters, digits and -, starting and ending with a letter or digit, 63 characters at most. The workload's title is its name (`ops-api`), and the same name is used for every object that belongs to the workload (the workload, its service, its ingress, its autoscaler and its service account). The namespace already says the environment, so names do not repeat it. Title the workload with it; it and the service, ingress, autoscaler and service account all show it as their calculated `handle`, and the workload also gets its recommended labels as a calculated `labels` value. Label every object with the Kubernetes recommended labels: app.kubernetes.io/name, instance, version, component, part-of and managed-by.
