---
id: component-log-agent
type: component
title: Log agent
plane: dsn--design
fields:
  kind: service
  owner: Platform
  status: planned
links:
- type: runs-in
  to: environment-production
- type: satisfies
  to: requirement-list-jobs
---
Ships every machine's logs to one place, so a stale status can be traced to the machine that caused it.
