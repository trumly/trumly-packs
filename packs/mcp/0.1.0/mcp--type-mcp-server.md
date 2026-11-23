---
id: mcp--type-mcp-server
type: type
title: mcp-server
fields:
  name: mcp-server
  plane: mcp--surface
  description: Use for one MCP server, the thing an agent connects to. It offers tools, resources and prompts, and is built or run by a component you own, or by someone else.
  shape: square
  fields:
  - name: transport
    kind: choice
    required: true
    values:
    - stdio
    - streamable-http
    - sse
  - name: trust
    kind: choice
    required: true
    values:
    - first-party
    - third-party
  - name: reviewed
    kind: boolean
    label: We have reviewed it
  - name: protocol
    kind: text
    label: Protocol version, e.g. 2025-06-18
  pack: mcp@0.1.0
---
**Ask:** Who runs it? Does it run on the agent's machine or somewhere remote? Do we trust whoever wrote it?

- **stdio**: started by the client on the same machine. No network, so no authentication of its own.
- **streamable-http**: a remote server over HTTP. Needs authentication.
- **sse**: the older remote transport. Prefer streamable-http for new work.

Say what it realises with `details`: the component you built, or the external service. Link what it offers with `offers`. Tool results are read by the agent as instructions, so a third-party server is a way for someone else's text into your agent: mark it reviewed only after you have read what it returns.

**Watch:** a remote server with no `authenticated-by`, and a third-party server nobody has reviewed.
