---
id: mcp--rule-remote-authenticated
type: rule
title: Remote servers authenticate
fields:
  name: Remote servers authenticate
  statement: Every remote MCP server says how it authenticates callers
  severity: error
  applies_to:
    type: mcp-server
    transport:
    - streamable-http
    - sse
  check:
    require_link:
      min: 1
      type: authenticated-by
      node_type: mcp-auth
  pack: mcp@0.1.0
---
**Why:** a remote server with no login lets anyone who finds the address call its tools.

**Fix:** add an `authenticated-by` link to an mcp-auth. Use OAuth so each person's agent acts with that person's rights.
