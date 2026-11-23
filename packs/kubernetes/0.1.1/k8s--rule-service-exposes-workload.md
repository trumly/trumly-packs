---
id: k8s--rule-service-exposes-workload
type: rule
title: Services expose a workload
fields:
  name: Services expose a workload
  statement: Every service exposes a workload
  severity: warn
  applies_to:
    type: service
  check:
    require_link:
      min: 1
      type: exposes
      node_type: workload
  pack: kubernetes@0.1.1
---
**Why:** a service with nothing behind it is an address that goes nowhere.

**Fix:** add an `exposes` link to the workload that receives the traffic.
