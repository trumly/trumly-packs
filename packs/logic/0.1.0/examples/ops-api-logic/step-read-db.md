---
id: step-read-db
type: step
title: Does the database answer?
parent: flow-list-jobs
plane: lgc--flows
fields:
  kind: decision
links:
- type: by
  to: component-ops-api
- type: touches
  to: datastore-ops-db
  fields:
    how: read
- type: enforces
  to: requirement-list-jobs
- type: next
  to: step-show-jobs
  fields:
    when: 'yes'
- type: next
  to: step-show-error
  fields:
    when: 'no'
---
The requirement says every job is listed with its current status, so a partial list is never shown.
