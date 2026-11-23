---
id: mcp--type-mcp-tool
type: type
title: mcp-tool
fields:
  name: mcp-tool
  plane: mcp--surface
  description: Use for one action an agent can ask a server to perform, such as list_jobs or cancel_job. Title it with the exact tool name.
  shape: square
  fields:
  - name: effect
    kind: choice
    required: true
    values:
    - read
    - write
    - destructive
  - name: idempotent
    kind: boolean
    label: Safe to repeat
  - name: confirmation
    kind: choice
    label: Who confirms it
    values:
    - client-prompts
    - in-tool
    - none
  - name: input
    kind: text
    label: Parameters
  - name: output
    kind: text
    label: What it returns
  pack: mcp@0.1.0
---
**Ask:** What does it change? Can it be undone? What does the agent need to give it, and what comes back?

- **read**: changes nothing.
- **write**: changes something that can be put back (creates a record, queues a job).
- **destructive**: deletes or overwrites something that cannot be put back. Say who confirms it: the client asks the person (`client-prompts`), or the tool itself refuses without a confirmation parameter (`in-tool`).

Title it with the tool's real name. Its calculated `handle` is the name clients show, `mcp__<server>__<tool>`. Say what it acts on with `calls`, and what it is for with `satisfies` or `details`.
