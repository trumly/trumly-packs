---
id: pattern
type: pattern
title: Naming – Environment codes
fields:
  title: Naming – Environment codes
  description: A short code for each environment (prd, dev, sit, stg) that every other name pattern uses for its
    environment-code part. The naming pack already calculates each environment's code from the token that stands for
    it, so it shows as its label and can be searched. Link each token to its environment with stands-for.
  use: starter
  requires:
  - naming
  optional:
  - design
  root: codes
  prefix: env
---

