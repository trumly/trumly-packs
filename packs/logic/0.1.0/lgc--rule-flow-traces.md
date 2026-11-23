---
id: lgc--rule-flow-traces
type: rule
title: Flows trace to a reason
fields:
  name: Flows trace to a reason
  statement: Every flow details or satisfies something in Define
  severity: warn
  applies_to:
    type: flow
  check:
    any_of:
    - require_link:
        type: details
        node_type: capability
        min: 1
    - require_link:
        type: details
        node_type: requirement
        min: 1
    - require_link:
        type: satisfies
        node_type: requirement
        min: 1
  pack: logic@0.1.0
---
