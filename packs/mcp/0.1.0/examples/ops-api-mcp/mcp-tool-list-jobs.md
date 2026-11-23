---
id: mcp-tool-list-jobs
type: mcp-tool
title: list_jobs
plane: mcp--surface
fields:
  effect: read
  idempotent: true
  input: status filter (optional)
  output: every job with its current status
links:
- type: calls
  to: component-ops-api
- type: satisfies
  to: requirement-list-jobs
---
Lists jobs. Its client name is mcp__ops__list_jobs.
