---
id: dns--rule-redirect-acyclic
type: rule
title: Redirects do not loop
fields:
  name: Redirects do not loop
  statement: Hostnames do not redirect to each other in a circle
  severity: warn
  applies_to:
    type: hostname
  check:
    acyclic: redirects-to
  pack: dns@0.3.0
---
