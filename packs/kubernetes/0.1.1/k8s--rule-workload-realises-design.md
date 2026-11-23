---
id: k8s--rule-workload-realises-design
type: rule
title: Workloads realise design
fields:
  name: Workloads realise design
  statement: Every workload details a component or a datastore
  severity: warn
  applies_to:
    type: workload
  check:
    any_of:
    - require_link:
        min: 1
        type: details
        node_type: component
    - require_link:
        min: 1
        type: details
        node_type: datastore
  pack: kubernetes@0.1.1
---
**Why:** a workload that realises nothing in the design is something the cluster runs for no stated reason, and nobody can trace a change in the design to what runs.

**Fix:** add a `details` link to the component it runs, or to the datastore it is (a database or cache run in the cluster).
