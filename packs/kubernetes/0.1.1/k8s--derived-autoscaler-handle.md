---
id: k8s--derived-autoscaler-handle
type: derived
title: Autoscaler handle
fields:
  name: autoscaler-handle
  field-name: handle
  description: An autoscaler takes the name of the workload it scales.
  template: '{scales/title}'
  applies_to:
    type: autoscaler
  enabled: true
  pack: kubernetes@0.1.1
---
An autoscaler that scales no workload is reported incomplete.
