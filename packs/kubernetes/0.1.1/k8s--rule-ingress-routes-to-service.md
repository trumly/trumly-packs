---
id: k8s--rule-ingress-routes-to-service
type: rule
title: Ingresses route to a service
fields:
  name: Ingresses route to a service
  statement: Every ingress routes to a service
  severity: warn
  applies_to:
    type: ingress
  check:
    require_link:
      min: 1
      type: routes-to
      node_type: service
  pack: kubernetes@0.1.1
---
**Why:** an ingress receives outside traffic and must hand it to something.

**Fix:** add a `routes-to` link to a service.
