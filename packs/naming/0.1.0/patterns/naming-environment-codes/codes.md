---
id: codes
type: name-pattern
title: Environment codes
plane: nam--names
fields:
  scope: The short code for each environment, used inside other names
  pattern: '{^stands-for/value}'
  example: prd
  case: lower
  max-length: 3
links:
- type: describes
  to: dsn--type-environment
---
Every pattern that uses an environment code takes its value from these tokens, so add one per environment and point it at that environment with `stands-for`.
