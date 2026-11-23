---
id: k8s--derived-service-account-handle
type: derived
title: Service account handle
fields:
  name: service-account-handle
  field-name: handle
  description: A service account takes the name of the workload that runs as it.
  template: '{^consumes/title}'
  applies_to:
    type: service-account
  enabled: true
  pack: kubernetes@0.1.1
---
A service account no workload consumes is reported incomplete.
