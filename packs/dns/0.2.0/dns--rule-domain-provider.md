---
id: dns--rule-domain-provider
type: rule
title: Domains name a provider
fields:
  name: Domains name a provider
  statement: Every domain names the provider it is registered with
  severity: info
  applies_to:
    type: domain
  check:
    require_link:
      type: provided-by
      node_type: provider
  pack: dns@0.2.0
---
