---
id: mcp--pack
type: pack
title: MCP
fields:
  name: mcp
  namespace: mcp
  version: 0.1.0
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  default-pattern: starter-server
  starter-patterns:
  - starter-server
  enriches:
  - component
  - external
  - capability
  - requirement
  description: 'How a system is offered to AI agents over the Model Context Protocol: the servers, the tools, resources and prompts each one offers, the clients that connect, and how access is granted. Rules ask that every remote server authenticates, every tool belongs to one server and does something real, and destructive tools are confirmed.'
  use-when: When an agent will call into the system, or the system calls out to MCP servers, and you need to say what it can do, to what, and under whose authority.
  requires:
  - core@^1.0.0
  optional:
  - api@^0.3.0
  - links@^1.0.0
  - naming@^0.1.0
---
