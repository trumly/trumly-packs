---
id: k8s--rule-release-name-fits
type: rule
title: Release names fit Helm's limit
fields:
  name: Release names fit Helm's limit
  statement: A release name is at most 53 characters
  severity: warn
  applies_to:
    type: release
  check:
    field_is:
      handle:
        max_length: 53
        optional: true
  pack: kubernetes@0.1.1
---
**Why:** Helm refuses release names longer than 53 characters.

**Fix:** shorten the chart title or the environment code in the name.
