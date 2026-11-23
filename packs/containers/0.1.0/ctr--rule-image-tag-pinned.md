---
id: ctr--rule-image-tag-pinned
type: rule
title: Image tags are pinned
fields:
  name: Image tags are pinned
  statement: No image uses the latest tag
  severity: warn
  applies_to:
    type: image
  check:
    compare_fields:
      left: tag
      op: '!='
      value: latest
  pack: containers@0.1.0
---
**Why:** `latest` moves, so you cannot say what is running or roll back to it.

**Fix:** use a specific version tag such as `1.4.2`.
