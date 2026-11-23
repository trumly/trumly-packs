---
id: mcp--type-mcp-client
type: type
title: mcp-client
fields:
  name: mcp-client
  plane: mcp--access
  description: Use for an application that connects to MCP servers on an agent's behalf, such as a desktop assistant, an IDE or your own agent.
  shape: circle 2d
  fields:
  - name: kind
    kind: choice
    required: true
    values:
    - desktop-app
    - ide
    - cli
    - web-app
    - agent
  pack: mcp@0.1.0
---
**Ask:** Which clients will connect? Do they show the person what a tool will do before it runs?

Link it to each server with `talks-to`. If a person uses the client, link them with `uses` from the actor.
