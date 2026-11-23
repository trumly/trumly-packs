---
id: ep-list-jobs
type: api-endpoint
title: List jobs
plane: api--surface
fields:
  method: GET
  path: /jobs
  public: false
  idempotent: true
  status: built
links:
- type: operates-on
  to: res-job
- type: returns
  to: schema-job-list
- type: fails-with
  to: err-bad-request
- type: secured-by
  to: auth-bearer
- type: satisfies
  to: requirement-list-jobs
- type: served-by
  to: component-ops-api
---
