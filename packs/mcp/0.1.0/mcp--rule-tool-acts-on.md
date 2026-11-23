---
id: mcp--rule-tool-acts-on
type: rule
title: Tools act on something
fields:
  name: Tools act on something
  statement: Every tool and resource says what it acts on
  severity: warn
  applies_to:
    type:
    - mcp-tool
    - mcp-resource
  check:
    require_link:
      min: 1
      type: calls
  pack: mcp@0.1.0
---
**Why:** without the thing it reaches, nobody can tell what an agent could change or read through it.

**Fix:** add a `calls` link to the API endpoint, component, datastore, queue or external service it uses.
