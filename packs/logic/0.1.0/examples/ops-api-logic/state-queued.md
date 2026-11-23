---
id: state-queued
type: state
title: Queued
parent: lifecycle-job
plane: lgc--lifecycles
fields:
  initial: true
  final: false
links:
- type: moves-to
  to: state-running
  fields:
    'on': a worker picks it up
---
