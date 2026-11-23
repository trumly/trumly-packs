---
id: hst--link-type-in-region
type: link-type
title: in-region
fields:
  name: in-region
  description: A zone, environment or cloud service lies in this region.
  inverse: contains
  from:
  - network-zone
  - environment
  - cloud-service
  to:
  - region
  pack: hosting@0.2.0
---
