---
id: nam--type-name-token
type: type
title: name-token
fields:
  name: name-token
  plane: nam--names
  shape: circle 2d
  description: Use for one agreed value in a name, such as the prefix psql or the environment code prd,
    and to say what it stands for. Tokens with the same slot fill that slot in every pattern, unless
    used-in limits them to some.
  fields:
  - name: value
    kind: text
    label: Value, e.g. prd
    required: true
  - name: slot
    kind: text
    label: Slot it fills, e.g. env
  pack: naming@0.1.0
---
**Ask:** What does this abbreviation mean, and which node or type is it the name for?

Title it with the value. Point it with `stands-for` at a node (prd to the production environment) or a type (psql to every database server). One meaning per token. If the slot means something different in another pattern, limit the token with `used-in`. A calculated handle reads the token's `value`.

**Watch:** two values for the same thing in one slot (prd and prod). An existing resource with an old name keeps it as an override on its node, not as a second token.
