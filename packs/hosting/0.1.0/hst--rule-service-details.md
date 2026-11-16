---
id: hst--rule-service-details
type: rule
title: Services realise a design node
fields:
  name: Services realise a design node
  statement: Every cloud service details a design node
  severity: warn
  applies_to:
    type: cloud-service
  check:
    require_link:
      min: 1
      type: details
  pack: hosting@0.1.0
---
**Why:** a service that realises nothing in the design is unexplained cost.

**Fix:** add a `details` link to the datastore, queue or component it realises.
