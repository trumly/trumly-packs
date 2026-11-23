---
id: pattern
type: pattern
title: Kubernetes – Starter
fields:
  title: Kubernetes – Starter
  description: A small working cluster to start from, with its names already set. A production
    environment, a cluster and node pool in it, a namespace, a service account, an API workload with its
    container, image and registry, a service and a config map. Namespaces calculate as {app}-{belongs-to/runs-in/^stands-for/value} (myapp-prd)
    from the app field and the environment code.
  use: starter
  requires:
  - kubernetes
  - containers
  - naming
  root: cluster
  prefix: ks
---
