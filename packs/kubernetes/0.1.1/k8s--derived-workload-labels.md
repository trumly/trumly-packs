---
id: k8s--derived-workload-labels
type: derived
title: Workload labels
fields:
  name: workload-labels
  field-name: labels
  description: The Kubernetes recommended labels for a workload, worked out from its name, its environment and its namespace.
  template: 'app.kubernetes.io/name={title}, app.kubernetes.io/instance={title}-{belongs-to/belongs-to/runs-in/^stands-for/value}, app.kubernetes.io/part-of={belongs-to/title}'
  applies_to:
    type: workload
  enabled: true
  pack: kubernetes@0.1.1
---
Put these on the workload and on everything it owns, so tools can group them. `instance` adds the environment code (ops-api-prd).
