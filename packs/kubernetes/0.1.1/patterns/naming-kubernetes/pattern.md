---
id: pattern
type: pattern
title: Naming – Kubernetes
fields:
  title: Naming – Kubernetes
  description: 'How every Kubernetes object is named, with the rules of the platform: namespaces as {app}-{belongs-to/runs-in/^stands-for/value} (ops-prd), clusters, node pools, workloads and the objects that go with them (ops-api), config, secrets, storage, roles and bindings, network policies, and Helm charts and releases. Names are calculated for namespaces, workloads, services, ingresses, autoscalers, config maps, secrets, volume claims, service accounts, charts and releases, and workloads get their recommended labels.'
  use: starter
  requires:
  - kubernetes
  - naming
  root: namespaces
  prefix: kn
---

