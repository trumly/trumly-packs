---
id: dm--rule-database-realises-datastore
type: rule
title: Databases realise a datastore
fields:
  name: Databases realise a datastore
  statement: Every database details a datastore in the design
  severity: warn
  applies_to:
    type: data-database
  check:
    any_of:
    - require_link:
        min: 1
        type: details
        node_type: datastore
  pack: data-model@0.5.0
---
**Why:** the physical database is how a datastore decision is carried out. Without the link the design cannot say where its data lives.

**Fix:** add a `details` link to the datastore this database is.
