---
id: k8s--derived-workload-handle
type: derived
title: Workload handle
fields:
  name: workload-handle
  field-name: handle
  description: A workload is named by its title, the name the cluster knows it by.
  template: '{title}'
  applies_to:
    type: workload
  enabled: true
  pack: kubernetes@0.1.1
---
Title the workload with its name (`ops-api`). Deployments, stateful sets, daemon sets, jobs and cron jobs all use the same rule, so labelling a map by `handle` names every Kubernetes object, workloads included.
