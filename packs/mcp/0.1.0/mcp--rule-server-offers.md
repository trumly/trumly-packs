---
id: mcp--rule-server-offers
type: rule
title: Servers offer something
fields:
  name: Servers offer something
  statement: Every MCP server offers at least one tool, resource or prompt
  severity: warn
  applies_to:
    type: mcp-server
  check:
    require_link:
      min: 1
      type: offers
  pack: mcp@0.1.0
---
**Why:** a server that offers nothing is dead weight, or the model is missing what it offers.

**Fix:** add the tools, resources or prompts with `offers`.
