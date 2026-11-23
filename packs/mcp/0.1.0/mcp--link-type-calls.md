---
id: mcp--link-type-calls
type: link-type
title: calls
fields:
  name: calls
  description: 'Use to say what a tool or resource acts on: an API endpoint, a component, a datastore, a queue or an external service.'
  inverse: called-by
  from:
  - mcp-tool
  - mcp-resource
  to:
  - api-endpoint
  - component
  - datastore
  - queue
  - external
  pack: mcp@0.1.0
---
