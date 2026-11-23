---
id: nam--derived-handle
type: derived
title: Environment handle
fields:
  name: handle
  label: Environment handle
  description: The short code of an environment, taken from the name token that stands for it.
  template: '{^stands-for/value}'
  applies_to:
    type: environment
  enabled: true
  pack: naming@0.1.0
---
Each environment shows the value of the token that stands for it (`prd`, `dev`). Add a token per environment and point it at the environment with `stands-for`; until then the environment is reported as incomplete.
