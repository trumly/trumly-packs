---
id: hosts
type: name-pattern
title: Hostnames
plane: dns--names
fields:
  scope: Hostnames under the system's domains
  pattern: '{title}.{serves/runs-in/^stands-for/value}.{under/title}'
  example: api.dev.example.com
  case: lower
  max-length: 253
links:
- type: describes
  to: dns--type-hostname
---
Production drops the environment part (api.example.com). Each part is a DNS label: lower case, digits and -, 63 at most. Guidance only: dropping the environment for production needs a condition, which templates don't have, and a hostname's title already is the name.
