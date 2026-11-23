---
id: ctr--rule-container-runs-in-one-place
type: rule
title: Containers have one home
fields:
  name: Containers have one home
  statement: Every container runs in exactly one place
  severity: error
  applies_to:
    type: container
  check:
    require_link:
      max: 1
      min: 1
      type: runs-in
  pack: containers@0.1.0
---
**Why:** a container with no home never starts, and one with two homes is really two containers. Model one container per place the image runs.

**Fix:** add one `runs-in` link to a host or a cloud service (or a workload when the kubernetes pack is added).
