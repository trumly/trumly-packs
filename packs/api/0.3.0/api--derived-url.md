---
id: api--derived-url
type: derived
title: Endpoint address
fields:
  name: url
  label: Endpoint address
  description: The full address of an endpoint, one for each hostname that serves it.
  template: https://{served-by/runs-in/^serves/title}{path}
  applies_to:
    type: api-endpoint
  enabled: true
  pack: api@0.3.0
---
Follows the serving component to the environments it runs in, then the hostnames that serve them: one address per hostname. Needs the links and dns packs (`runs-in`, `serves`); without them the address is reported incomplete.
