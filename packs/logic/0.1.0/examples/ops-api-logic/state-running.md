---
id: state-running
type: state
title: Running
parent: lifecycle-job
plane: lgc--lifecycles
fields:
  initial: false
  final: false
links:
- type: moves-to
  to: state-done
  fields:
    'on': it finishes
- type: moves-to
  to: state-failed
  fields:
    'on': it errors
---
