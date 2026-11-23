---
id: dm--rule-object-name-fits
type: rule
title: Object names fit the limit
fields:
  name: Object names fit the limit
  statement: A column, schema or database name is at most 63 bytes
  severity: warn
  applies_to:
    type:
    - data-column
    - data-schema
    - data-database
  check:
    field_is:
      title:
        max_bytes: 63
  pack: data-model@0.5.0
---
**Why:** PostgreSQL cuts identifiers longer than 63 bytes, so two long names can collapse into one, and accented letters take more than one byte. These objects are named by their title (tables, views, indexes and constraints are checked on their calculated name).

**Fix:** shorten the title. Lower the limit in the naming pattern if your engine allows more.
