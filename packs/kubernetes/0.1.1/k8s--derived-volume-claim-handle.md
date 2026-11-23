---
id: k8s--derived-volume-claim-handle
type: derived
title: Volume claim handle
fields:
  name: volume-claim-handle
  field-name: handle
  description: A volume claim is named for the workload that mounts it and its own title.
  template: '{^mounts/title}-{title}'
  applies_to:
    type: persistent-volume-claim
  enabled: true
  pack: kubernetes@0.1.1
---
Title the claim with what it keeps (`data`) and it comes out as `ops-cache-data`.
