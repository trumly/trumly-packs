---
id: lifecycle-job
type: lifecycle
title: Job
plane: lgc--lifecycles
links:
- type: begins-at
  to: state-queued
- type: details
  to: datastore-ops-db
---
A job from request to result, with up to three tries. The database holds its latest state.
