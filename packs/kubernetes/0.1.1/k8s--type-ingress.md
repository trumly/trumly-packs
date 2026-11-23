---
id: k8s--type-ingress
type: type
title: ingress
fields:
  name: ingress
  plane: k8s--kubernetes
  description: Use for the public front door that routes outside web traffic by hostname and path to a
    service inside the cluster. Skip it for anything that is only used internally.
  fields:
  - name: host
    kind: text
    label: Hostname
    required: true
  - name: tls
    kind: boolean
    label: HTTPS
  - name: controller
    kind: text
    label: Ingress controller
  pack: kubernetes@0.1.1
---
**Ask:** What hostname do people use? Does it need HTTPS? Which service receives the traffic?

The controller field replaces a separate ingress-class type.
