---
id: mcp--rule-tool-traces
type: rule
title: Tools serve a requirement
fields:
  name: Tools serve a requirement
  statement: Every tool satisfies a requirement or details a capability
  severity: warn
  applies_to:
    type: mcp-tool
  check:
    any_of:
    - require_link:
        min: 1
        type: satisfies
    - require_link:
        min: 1
        type: details
        node_type: capability
  pack: mcp@0.1.0
---
**Why:** a tool that serves no stated need is surface area someone has to secure for no reason.

**Fix:** add a `satisfies` link to the requirement, or `details` the capability it gives the agent.
