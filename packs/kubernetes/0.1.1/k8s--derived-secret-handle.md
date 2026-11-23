---
id: k8s--derived-secret-handle
type: derived
title: Secret handle
fields:
  name: secret-handle
  field-name: handle
  description: A secret is named for the workload that reads it and its own title.
  template: '{^consumes/title}-{title}'
  applies_to:
    type: secret
  enabled: true
  pack: kubernetes@0.1.1
---
Title the secret with what it holds (`db`, `tls`) and it comes out as `ops-api-db`. Never put the value or the vault path in the name.
