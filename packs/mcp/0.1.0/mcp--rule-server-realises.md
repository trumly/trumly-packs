---
id: mcp--rule-server-realises
type: rule
title: Servers realise a design node
fields:
  name: Servers realise a design node
  statement: Every MCP server details a component or an external service
  severity: warn
  applies_to:
    type: mcp-server
  check:
    any_of:
    - require_link:
        min: 1
        type: details
        node_type: component
    - require_link:
        min: 1
        type: details
        node_type: external
  pack: mcp@0.1.0
---
**Why:** a server that stands for nothing in the design is an unexplained way into the system.

**Fix:** add a `details` link to the component that is the server, or to the external service if someone else runs it.
