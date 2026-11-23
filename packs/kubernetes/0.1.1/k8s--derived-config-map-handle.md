---
id: k8s--derived-config-map-handle
type: derived
title: Config map handle
fields:
  name: config-map-handle
  field-name: handle
  description: A config map is named for the workload that reads it, with -config.
  template: '{^consumes/title}-config'
  applies_to:
    type: config-map
  enabled: true
  pack: kubernetes@0.1.1
---
A config map no workload consumes is reported incomplete.
