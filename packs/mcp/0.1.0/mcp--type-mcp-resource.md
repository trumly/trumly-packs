---
id: mcp--type-mcp-resource
type: type
title: mcp-resource
fields:
  name: mcp-resource
  plane: mcp--surface
  description: Use for data a server lets an agent read by address, such as jobs://{id}. A resource is read, never run.
  shape: square
  fields:
  - name: uri
    kind: text
    label: URI or template, e.g. jobs://{id}
    required: true
  - name: mime
    kind: text
    label: Content type
  - name: subscribable
    kind: boolean
    label: Agent can subscribe to changes
  pack: mcp@0.1.0
---
**Ask:** What is behind the address? Who decides which agents may read it? Does it change while an agent is watching?

Say what it reads with `calls`. Anything that changes state is a tool, not a resource.
