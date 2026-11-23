---
id: mcp--type-mcp-auth
type: type
title: mcp-auth
fields:
  name: mcp-auth
  plane: mcp--access
  description: 'Use for how a server lets a client in: no login, an API key, OAuth or mutual TLS, and the scopes it grants.'
  shape: hexagon 2d
  fields:
  - name: scheme
    kind: choice
    required: true
    values:
    - none
    - api-key
    - oauth
    - mtls
  - name: scopes
    kind: text
    label: Scopes, e.g. jobs:read
  pack: mcp@0.1.0
---
**Ask:** Who is the caller: a person, or the agent as itself? Which scopes does each tool need?

Remote servers should use OAuth, so each person's agent acts with that person's rights, not a shared key. Keep the scopes narrow: a read-only scope for read tools, a separate one for write and destructive tools. Never put a key or secret in the model; say where it is kept.
