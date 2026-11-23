---
id: dns--rule-hostname-serves
type: rule
title: Hostnames serve something
fields:
  name: Hostnames serve something
  statement: Every hostname serves something or redirects
  severity: warn
  applies_to:
    type: hostname
  check:
    any_of:
    - require_link:
        type: serves
    - require_link:
        type: redirects-to
        node_type: hostname
  pack: dns@0.3.0
---
