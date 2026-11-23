---
id: k8s--rule-names-fit
type: rule
title: Names fit the Kubernetes limit
fields:
  name: Names fit the Kubernetes limit
  statement: A namespace or service name is at most 63 characters
  severity: warn
  applies_to:
    type:
    - namespace
    - service
  check:
    field_is:
      handle:
        max_length: 63
        optional: true
  pack: kubernetes@0.1.1
---
**Why:** namespaces and services are DNS labels, which Kubernetes limits to 63 characters.

**Fix:** shorten the title or the environment code in the name.
