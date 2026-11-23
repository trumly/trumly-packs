---
id: k8s--rule-secret-records-source
type: rule
title: Secrets say where they live
fields:
  name: Secrets say where they live
  statement: Every secret records where its value is kept
  severity: error
  applies_to:
    type: secret
  check:
    require_fields:
    - source
  pack: kubernetes@0.1.1
---
**Why:** the model never holds secret values, but it must say where the real one lives so someone can find and rotate it.

**Fix:** fill in the `source` field, for example a key vault path.
