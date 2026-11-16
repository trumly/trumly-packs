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
    require_fields:
    - region
  pack: hosting@0.1.0
---
**Why:** the region decides where data lives, which is often a legal constraint.

**Fix:** set region.
