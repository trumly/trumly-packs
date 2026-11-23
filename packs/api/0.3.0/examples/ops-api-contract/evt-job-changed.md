---
id: evt-job-changed
type: api-event
title: Job changed
plane: api--surface
fields:
  channel: jobs.changed
  delivery: at-least-once
links:
- type: payload
  to: schema-job
- type: secured-by
  to: auth-bearer
---
