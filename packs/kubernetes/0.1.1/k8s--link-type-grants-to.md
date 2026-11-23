---
id: k8s--link-type-grants-to
type: link-type
title: grants-to
fields:
  name: grants-to
  description: Use to say which identity a role binding gives its role to.
  inverse: receives
  from:
  - role-binding
  to:
  - service-account
  pack: kubernetes@0.1.1
---

