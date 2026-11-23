---
id: k8s--derived-service-handle
type: derived
title: Service handle
fields:
  name: service-handle
  field-name: handle
  description: A service takes the name of the workload it exposes.
  template: '{exposes/title}'
  applies_to:
    type: service
  enabled: true
  pack: kubernetes@0.1.1
---
A service that exposes no workload is reported incomplete.
