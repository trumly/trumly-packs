---
id: dm--rule-datastore-modelled
type: rule
title: Stores have a database
fields:
  name: Stores have a database
  statement: Every relational datastore has a database
  severity: warn
  applies_to:
    type: datastore
    kind:
    - relational
  check:
    require_link:
      min: 1
      type: details
      dir: in
      node_type: data-database
  pack: data-model@0.5.0
---
**Why:** the design says there is a relational store; the data model should say where its tables live.

**Fix:** add a database and `details` the datastore from it.
