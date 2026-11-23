---
id: server
type: mcp-server
title: my_server
plane: mcp--surface
fields:
  transport: streamable-http
  trust: first-party
links:
- type: offers
  to: tool
- type: authenticated-by
  to: auth
---
Title it with the server's name, which becomes part of every tool's name. Link it to the component it realises with `details`.
