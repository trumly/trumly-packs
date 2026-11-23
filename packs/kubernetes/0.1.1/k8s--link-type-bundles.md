---
id: k8s--link-type-bundles
type: link-type
title: bundles
fields:
  name: bundles
  description: Use to say which Kubernetes objects a Helm chart contains.
  inverse: bundled in
  from:
  - chart
  to:
  - workload
  - service
  - ingress
  - config-map
  - secret
  - autoscaler
  - persistent-volume-claim
  - service-account
  - role
  - role-binding
  - network-policy
  pack: kubernetes@0.1.1
---

