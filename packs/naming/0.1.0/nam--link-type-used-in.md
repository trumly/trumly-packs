---
id: nam--link-type-used-in
type: link-type
title: used-in
fields:
  name: used-in
  description: Use to limit a name token to the patterns it belongs to, when the same slot means different
    things in different patterns (region is uks on Azure, euw2 on AWS). A token with no used-in links
    fills that slot in every pattern.
  inverse: takes token
  from:
  - name-token
  to:
  - name-pattern
  pack: naming@0.1.0
---

