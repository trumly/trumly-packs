---
id: hst--rule-service-region
type: rule
title: Services name a region
fields:
  name: Services name a region
  statement: Every cloud service says which region it runs in
  severity: warn
  applies_to:
    type: cloud-service
  check:
    require_link:
      type: in-region
      node_type: region
  pack: hosting@0.2.0
---
**Why:** the region decides where data lives, which is often a legal constraint.

**Fix:** add an `in-region` link from the service to its region (use the region you already modelled; the provider's own code, such as eu-west-2, is the region's `code`).
