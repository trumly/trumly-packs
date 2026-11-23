---
id: ctr--rule-container-realises-design
type: rule
title: Containers realise design
fields:
  name: Containers realise design
  statement: Every container details a component or a datastore, or runs in a workload that does
  severity: warn
  applies_to:
    type: container
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
    - require_link:
        min: 1
        type: runs-in
        node_type: workload
  pack: containers@0.1.0
---
**Why:** a container that realises nothing in the design is something that runs for no stated reason.

**Fix:** add a `details` link to the component it runs or the datastore it is. A container run by a Kubernetes workload takes its meaning from the workload instead.
