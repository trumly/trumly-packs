---
id: name
type: derived
title: AWS resource handle
fields:
  name: handle
  label: AWS resource handle
  template: '{details/^stands-for/value}-{details/runs-in/^stands-for/value}-{details/runs-in/in-region/^stands-for/value}-{details/@type/^stands-for/value}'
  applies_to:
    type: cloud-service
  enabled: true
links:
- type: details
  to: aws
---
Every part is found through the design node the cloud service details: where it runs, that environment's region, and its type. The workload part is the token that stands for the design node (`app` until you rename it). The region part follows `in-region` from the environment to its region.
