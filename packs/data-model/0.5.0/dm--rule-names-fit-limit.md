---
id: dm--rule-names-fit-limit
type: rule
title: Names fit the database limit
fields:
  name: Names fit the database limit
  statement: A table, view, index or constraint name fits PostgreSQL's 63-byte identifier limit
  severity: warn
  applies_to:
    type:
    - data-table
    - data-view
    - data-index
    - data-constraint
  check:
    field_is:
      handle:
        max_bytes: 63
        optional: true
  pack: data-model@0.5.0
---
**Why:** PostgreSQL cuts an identifier longer than 63 bytes, so two long names can end up the same. The limit is in bytes, not characters: accented letters take more than one.

The check reads each object's calculated `handle`, so it only measures a name the model can work out. A column's handle includes its table (`job_event.job_id`), so columns are left out: it is the column name alone that has the limit. Lower the number in a copy of this rule for another engine.
