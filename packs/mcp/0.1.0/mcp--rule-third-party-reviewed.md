---
id: mcp--rule-third-party-reviewed
type: rule
title: Third-party servers reviewed
fields:
  name: Third-party servers reviewed
  statement: Every third-party MCP server has been reviewed
  severity: warn
  applies_to:
    type: mcp-server
    trust: third-party
  check:
    field_is:
      reviewed:
        in:
        - true
  pack: mcp@0.1.0
---
**Why:** a tool result is read by the agent as if it were an instruction, so a server someone else wrote can steer your agent.

**Fix:** read what the server returns, restrict the tools you allow, then set `reviewed`.
