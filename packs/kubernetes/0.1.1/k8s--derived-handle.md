---
id: k8s--derived-handle
type: derived
title: Namespace handle
fields:
  name: namespace-handle
  field-name: handle
  description: 'The name a namespace has in each environment: its own name and the code of the environment its cluster serves.'
  template: '{title}-{belongs-to/runs-in/^stands-for/value}'
  applies_to:
    type: namespace
  enabled: true
  pack: kubernetes@0.1.1
---
A namespace is titled with its name (`ops`). The environment comes through its cluster: the cluster it belongs to runs in a place, and a naming token stands for that place. Without the links and naming packs the handle is reported incomplete.
