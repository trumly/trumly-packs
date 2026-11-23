---
id: api--derived-operation
type: derived
title: Endpoint operation
fields:
  name: operation
  label: Endpoint operation
  description: The method and path of an endpoint, such as GET /jobs.
  template: '{method} {path}'
  applies_to:
    type: api-endpoint
  enabled: true
  pack: api@0.3.0
---
A fact about the endpoint itself. A path's own braces (/jobs/{id}/status) are a value, not part of the template, so they come through as written.
