---
id: api--rule-endpoint-secured
type: rule
title: Non-public is secured
fields:
  name: Non-public is secured
  statement: A non-public endpoint is secured
  severity: error
  applies_to:
    type: api-endpoint
    public: false
  check:
    require_link:
      type: secured-by
      node_type: api-auth
  pack: api@0.3.0
---
