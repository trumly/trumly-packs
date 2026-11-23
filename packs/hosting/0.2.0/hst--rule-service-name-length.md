---
id: hst--rule-service-name-length
type: rule
title: Names fit the cloud's limit
fields:
  name: Names fit the cloud's limit
  statement: A cloud service's name is at most 63 characters
  severity: warn
  applies_to:
    type: cloud-service
  check:
    field_is:
      handle:
        max_length: 63
        optional: true
  pack: hosting@0.2.0
---
**Why:** AWS, Azure and Google Cloud all limit most resource names to 63 characters, and a name over the limit is refused at creation, usually in the middle of a deployment.

The check reads the service's calculated `handle` (the naming patterns in this pack add one), so a project without a handle for cloud services is not affected. Some services have a tighter limit, such as 24 characters for an Azure storage account: copy this rule with a lower number and an `applies_to` that names those services.
