---
id: lgc--type-state
type: type
title: state
fields:
  name: state
  plane: lgc--lifecycles
  description: Use for one state of a lifecycle, such as free, held, queued or failed.
  shape: circle
  fields:
  - name: initial
    kind: boolean
    required: true
    label: The first state
  - name: final
    kind: boolean
    required: true
    label: An end state
  pack: logic@0.1.0
---
**Ask:** What is true while it is in this state? What moves it on?

Set `initial` on the first state and `final` on the ones where it stops. Link each way out with `moves-to`, with `on` for the event and `guard` for any condition. Use `enforces` for a requirement the state upholds.
