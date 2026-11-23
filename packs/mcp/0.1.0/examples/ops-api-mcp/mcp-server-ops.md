---
id: mcp-server-ops
type: mcp-server
title: ops
plane: mcp--surface
fields:
  transport: streamable-http
  trust: first-party
  reviewed: true
links:
- type: details
  to: component-ops-api
- type: offers
  to: mcp-tool-list-jobs
- type: offers
  to: mcp-resource-job
- type: offers
  to: mcp-prompt-triage
- type: authenticated-by
  to: mcp-auth-oauth
---
The ops API as agents see it. First-party, so no review is needed, but the tools still return job names that were typed by other people.
