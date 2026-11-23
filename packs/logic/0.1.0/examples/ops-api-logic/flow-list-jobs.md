---
id: flow-list-jobs
type: flow
title: List jobs
plane: lgc--flows
fields:
  trigger: Ops staff open the job list
  outcome: They see every job with its status, or an error
links:
- type: begins-at
  to: step-open-list
- type: details
  to: capability-view-job-status
- type: satisfies
  to: requirement-list-jobs
---
The path a request takes from the browser to the list on screen.
