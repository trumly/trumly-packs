---
id: sdd--rule-store-not-public
type: rule
title: Stores never in public zones
fields:
  name: Stores never in public zones
  statement: A datastore is never in a public zone
  severity: error
  applies_to:
    type: datastore
  check:
    forbid_link:
      type: placed-in
      node_type: network-zone
      node_fields:
        exposure: public
  pack: deployment@0.2.0
---

Data lives behind something.
