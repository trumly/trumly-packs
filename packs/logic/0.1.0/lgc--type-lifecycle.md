---
id: lgc--type-lifecycle
type: type
title: lifecycle
fields:
  name: lifecycle
  plane: lgc--lifecycles
  description: Use for something that moves through states over its life, such as a lock, an invite or
    a job. Its states are its children.
  shape: hexagon
  pack: logic@0.1.0
---
**Ask:** What is the thing? What state does it start in? Which states are the end?

One lifecycle per thing. Say what it is about with `details` to a concept, entity or datastore. Make each state a child, point `begins-at` at the first one, and join states with `moves-to`.

**Watch:** two first states, a state nothing leads to, and a state that is not final but has no way out.
