---
id: lgc--pack
type: pack
title: Logic
fields:
  name: logic
  namespace: lgc
  version: 0.1.0
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  default-pattern: starter-flow
  enriches:
  - capability
  - requirement
  - component
  - interface
  description: 'How the application actually works, in order: the flows a request or a person goes through,
    the decisions along the way, and the lifecycles things move through (a lock, an invite, a job). The
    core says what the parts are; this pack says what they do and when. Rules ask that every flow starts
    somewhere, every step leads on, every decision has labelled branches and every lifecycle has one first
    state.'
  use-when: 'When the order of events matters and getting it wrong is a bug: concurrency, permissions,
    retries, or anything an agent would otherwise guess.'
  requires:
  - core@^1.0.0
  optional:
  - api@^0.3.0
  - data-model@^0.5.0
---
