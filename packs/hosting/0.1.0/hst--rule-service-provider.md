---
id: hst--rule-service-provider
type: rule
title: Services have a provider
fields:
  name: Services have a provider
  statement: Every cloud service runs in exactly one provider
  severity: warn
  applies_to:
    type: cloud-service
  check:
    require_link:
      max: 1
      min: 1
      node_type: cloud-provider
      type: runs-in
  pack: hosting@0.1.0
---
**Why:** a product has to come from somewhere, and the provider decides where the data lives.

**Fix:** add a `runs-in` link to a cloud provider.
