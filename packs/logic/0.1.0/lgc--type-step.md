---
id: lgc--type-step
type: type
title: step
fields:
  name: step
  plane: lgc--flows
  description: 'Use for one thing that happens in a flow: it begins, someone or something acts, a choice
    is made, it waits, or it ends. A decision''s outgoing `next` links each say when they are taken.'
  shape: square
  fields:
  - name: kind
    kind: choice
    required: true
    values:
    - start
    - action
    - decision
    - wait
    - end
  pack: logic@0.1.0
---
**Ask:** Who or what does this? What does it touch? What can happen next?

- **start**: where the flow begins (one per flow).
- **action**: someone or something does a thing. Say who with `by`.
- **decision**: a choice with two or more ways on; each `next` has a `when`.
- **wait**: nothing happens until time passes or an event arrives. Say which in the body.
- **end**: one way the flow finishes.

Use `touches` for the interface, queue or datastore it works on and put how in the link's `how` (call, read, write, publish, subscribe). Use `enforces` for a requirement or constraint it carries out.

**Watch:** a step with no way on, and a decision with one branch.
