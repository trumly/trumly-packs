---
id: hst--rule-provider-used
type: rule
title: Providers host something
fields:
  name: Providers host something
  statement: Every cloud provider hosts at least one service
  severity: warn
  applies_to:
    type: cloud-provider
  check:
    require_link:
      dir: in
      min: 1
      node_type: cloud-service
      type: runs-in
  pack: hosting@0.2.0
---
**Why:** a provider nothing runs in is an unused account.

**Fix:** add `runs-in` from the services it provides.
