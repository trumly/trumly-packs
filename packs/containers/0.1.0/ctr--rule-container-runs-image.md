---
id: ctr--rule-container-runs-image
type: rule
title: Containers run one image
fields:
  name: Containers run one image
  statement: Every container runs exactly one image
  severity: error
  applies_to:
    type: container
  check:
    require_link:
      max: 1
      min: 1
      node_type: image
      type: runs
  pack: containers@0.1.0
---
**Why:** a container is an instance of an image. Without one there is nothing to run.

**Fix:** add a `runs` link from the container to its image.
