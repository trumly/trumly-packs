---
id: constraint-event-unique
type: data-constraint
title: One event per job and moment
plane: dm--physical
fields:
  kind: unique
links:
- type: data-constrains
  to: table-job-event
---
A job cannot record two events at the same instant.
