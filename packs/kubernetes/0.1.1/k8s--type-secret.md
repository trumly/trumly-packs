---
id: k8s--type-secret
type: type
title: secret
fields:
  name: secret
  plane: k8s--kubernetes
  description: Use for confidential values a workload needs, such as passwords, tokens and keys. The model
    records that the secret exists and where its real value is kept, never the value itself.
  fields:
  - name: source
    kind: text
    label: Where the value is kept
    required: true
  - name: rotation
    kind: text
    label: Rotation
  pack: kubernetes@0.1.1
---
**Ask:** What does it protect? Where is the real value kept? Who rotates it, and how often?

The value itself is never written in the model. Record where it lives (for example a key vault path) in `source`.
