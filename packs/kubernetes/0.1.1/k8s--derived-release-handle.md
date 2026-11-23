---
id: k8s--derived-release-handle
type: derived
title: Release handle
fields:
  name: release-handle
  field-name: handle
  description: A release is named for its chart and the environment code of the namespace it installs into.
  template: '{installs/title}-{belongs-to/belongs-to/runs-in/^stands-for/value}'
  applies_to:
    type: release
  enabled: true
  pack: kubernetes@0.1.1
---
So two environments can install the same chart side by side (`ops-prd`, `ops-dev`).
