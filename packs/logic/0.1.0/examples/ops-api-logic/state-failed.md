---
id: state-failed
type: state
title: Failed
parent: lifecycle-job
plane: lgc--lifecycles
fields:
  initial: false
  final: false
links:
- type: moves-to
  to: state-queued
  fields:
    'on': it is retried
    guard: fewer than three tries so far
- type: moves-to
  to: state-abandoned
  fields:
    'on': the third try fails
---
