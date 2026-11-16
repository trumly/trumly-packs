---
id: sdd--rule-zone-region
type: rule
title: Zones are in a region
fields:
  name: Zones are in a region
  statement: Every network zone is in a region
  severity: warn
  applies_to:
    type: network-zone
  check:
    require_link:
      type: in-region
      node_type: region
  pack: deployment@0.2.0
---
