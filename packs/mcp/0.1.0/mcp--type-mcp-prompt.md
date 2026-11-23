---
id: mcp--type-mcp-prompt
type: type
title: mcp-prompt
fields:
  name: mcp-prompt
  plane: mcp--surface
  description: Use for a ready-made instruction a server offers, which the person picks and the client fills in, such as triage_failed_jobs.
  shape: square
  fields:
  - name: arguments
    kind: text
    label: What the person fills in
  pack: mcp@0.1.0
---
**Ask:** What job does it set up? Which tools and resources does it expect the agent to use? Put that in the body.
