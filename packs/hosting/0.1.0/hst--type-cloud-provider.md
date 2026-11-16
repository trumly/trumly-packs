---
id: hst--type-cloud-provider
type: type
title: cloud-provider
fields:
  name: cloud-provider
  plane: hst--hosting
  description: 'Use for the company or platform that provides the infrastructure: a public cloud, a private
    data centre or a SaaS vendor. Link it to the environment it hosts with details.'
  shape: cloud
  fields:
  - name: kind
    kind: choice
    required: true
    values:
    - public-cloud
    - private-cloud
    - on-premises
    - saas
  - name: account
    kind: text
    label: Account or subscription
  pack: hosting@0.1.0
---
**Ask:** Who provides the infrastructure for this environment? Is there one account or several?

A provider is a vendor, not a product. The products it sells are cloud services. Link it to the environment it hosts with `details`.

**Watch:** a provider nothing runs in.
