---
id: k8s--type-service-account
type: type
title: service-account
fields:
  name: service-account
  plane: k8s--kubernetes
  description: Use for the identity a workload runs as when it talks to the cluster itself. Needed whenever
    a workload must be allowed to do something, or when you want to keep its permissions separate.
  fields:
  - name: purpose
    kind: text
  pack: kubernetes@0.1.1
---
**Ask:** What does this workload need to be allowed to do inside the cluster? Give each workload its own account rather than sharing.

Grant permissions by linking a role binding to it with `grants-to`.
