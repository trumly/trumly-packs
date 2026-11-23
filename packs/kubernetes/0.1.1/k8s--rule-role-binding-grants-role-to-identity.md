---
id: k8s--rule-role-binding-grants-role-to-identity
type: rule
title: Bindings give a role out
fields:
  name: Bindings give a role out
  statement: Every role binding gives one role to at least one identity
  severity: error
  applies_to:
    type: role-binding
  check:
    require_link:
    - min: 1
      type: grants
      max: 1
      node_type: role
    - min: 1
      type: grants-to
      node_type: service-account
  pack: kubernetes@0.1.1
---
**Why:** a role does nothing until a binding attaches it to an identity.

**Fix:** add a `grants` link to the role and a `grants-to` link to the service account.
