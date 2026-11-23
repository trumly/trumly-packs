---
id: dns--pack
type: pack
title: DNS
fields:
  name: dns
  namespace: dns
  version: 0.3.0
  description: 'DNS, how the system is named. Domains, the hostnames under them, the records
    that answer for them, and the providers behind them. A hostname must sit under a domain, have a record
    and serve something, and production must be reachable by name.'
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - component
  - environment
  use-when: When the system is reached by name and you need the domains, hostnames and records behind
    it.
  requires:
  - core@^1.0.0
---
