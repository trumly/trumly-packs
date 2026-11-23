---
id: ctr--rule-image-stored-in-registry
type: rule
title: Images live in a registry
fields:
  name: Images live in a registry
  statement: Every image is stored in a registry
  severity: warn
  applies_to:
    type: image
  check:
    require_link:
      min: 1
      node_type: registry
      type: stored-in
  pack: containers@0.1.0
---
**Why:** an image that is not in a registry can only run on the machine that built it.

**Fix:** add a `stored-in` link to a registry.
