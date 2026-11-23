---
id: entity-job
type: data-entity
title: Job
plane: dm--logical
links:
- type: data-contains
  to: attr-job-state
- type: data-contains
  to: attr-job-updated
- type: data-has-many
  to: entity-job-event
- type: data-realised-by
  to: table-job
---

