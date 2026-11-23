---
id: mcp--rule-client-talks-to-server
type: rule
title: Clients talk to a server
fields:
  name: Clients talk to a server
  statement: Every MCP client connects to at least one server
  severity: warn
  applies_to:
    type: mcp-client
  check:
    require_link:
      min: 1
      type: talks-to
      node_type: mcp-server
  pack: mcp@0.1.0
---
**Why:** a client that connects to nothing is only a box on the diagram.

**Fix:** add a `talks-to` link to each server it uses.
