---
id: k8s--rule-cron-job-has-schedule
type: rule
title: Cron jobs have a schedule
fields:
  name: Cron jobs have a schedule
  statement: Every cron-job workload has a schedule
  severity: error
  applies_to:
    type: workload
    kind: cron-job
  check:
    require_fields:
    - schedule
  pack: kubernetes@0.1.1
---
**Fix:** fill in the `schedule` field, for example `0 2 * * *` for 2am daily.
