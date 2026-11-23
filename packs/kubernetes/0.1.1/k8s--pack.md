---
id: k8s--pack
type: pack
title: Kubernetes
fields:
  name: kubernetes
  namespace: k8s
  version: 0.1.1
  license: Apache-2.0
  publisher: trumly
  default-pattern: starter-cluster
  starter-patterns:
  - starter-cluster
  - naming-kubernetes
  role: enrichment
  enriches:
  - design
  description: 'How containers are scheduled, exposed, configured and secured on a Kubernetes cluster,
    and packaged with Helm: clusters, namespaces, workloads, services, ingresses, config, secrets, storage
    and access. Model what a designer decides; what the cluster creates for itself (pods, nodes, replica
    sets) is left out. Rules keep every object in a namespace and every workload running a container.'
  use-when: When containers run on a Kubernetes cluster and you need to say how they are scheduled, reached,
    configured and secured.
  requires:
  - core@^1.0.0
  - containers@^0.1.0
  optional:
  - hosting@^0.2.0
  - links@^1.0.0
  - naming@^0.1.0
---

