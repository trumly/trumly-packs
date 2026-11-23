---
id: mcp--rule-item-has-server
type: rule
title: Items belong to one server
fields:
  name: Items belong to one server
  statement: Every tool, resource and prompt is offered by exactly one server
  severity: error
  applies_to:
    type:
    - mcp-tool
    - mcp-resource
    - mcp-prompt
  check:
    require_link:
      min: 1
      max: 1
      type: offers
      dir: in
      node_type: mcp-server
  pack: mcp@0.1.0
---
**Why:** an agent can only reach what a server offers, so something with no server cannot be called.

**Fix:** link the server to it with `offers`.
