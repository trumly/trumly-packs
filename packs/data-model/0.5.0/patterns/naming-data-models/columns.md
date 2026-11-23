---
id: columns
type: name-pattern
parent: tables
title: Columns
plane: dm--names
fields:
  scope: Table columns
  pattern: '{title}'
  example: customer_id
  case: snake
  max-length: 63
links:
- type: describes
  to: dm--type-data-column
---
`<attribute>` is the attribute name in the singular. A foreign key column is the referenced table in the singular plus `_id` (customer_id). Booleans start with is_ or has_; timestamps end with _at.
