---
id: lgc--type-flow
type: type
title: flow
fields:
  name: flow
  plane: lgc--flows
  description: Use for one scenario from the thing that sets it off to how it ends, such as opening a
    node or adding a person to a project. Its steps are its children.
  shape: chevron
  fields:
  - name: trigger
    kind: text
    label: What sets it off
    required: true
  - name: outcome
    kind: text
    label: How it ends
    required: true
  pack: logic@0.1.0
---
**Ask:** What starts it? What are the possible endings? What would an agent get wrong if it guessed?

One flow per scenario. Title it with what happens (`Open a node`). Make each step a child of the flow, point `begins-at` at the start step, and join the steps with `next`. Say why the flow exists with `details` or `satisfies` to a capability or requirement.

**Watch:** a flow that restates a business rule. Write the rule once as a requirement and let a step `enforces` it.
