---
id: dns--rule-hostname-domain
type: rule
title: Hostnames sit under a domain
fields:
  name: Hostnames sit under a domain
  statement: Every hostname is under a domain
  severity: warn
  applies_to:
    type: hostname
  check:
    require_link:
      type: under
      node_type: domain
  pack: dns@0.3.0
---
