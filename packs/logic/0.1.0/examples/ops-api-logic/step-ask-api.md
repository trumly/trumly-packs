---
id: step-ask-api
type: step
title: Ask the API for jobs
parent: flow-list-jobs
plane: lgc--flows
fields:
  kind: action
links:
- type: by
  to: component-ops-api
- type: next
  to: step-read-db
---
