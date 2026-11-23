---
id: k8s--derived-ingress-handle
type: derived
title: Ingress handle
fields:
  name: ingress-handle
  field-name: handle
  description: An ingress takes the name of the workload behind the service it routes to.
  template: '{routes-to/exposes/title}'
  applies_to:
    type: ingress
  enabled: true
  pack: kubernetes@0.1.1
---
An ingress that routes to no service, or to a service that exposes no workload, is reported incomplete.
