---
id: objects
type: name-pattern
parent: tables
title: Indexes and constraints
plane: dm--names
fields:
  scope: Indexes and constraints
  pattern: '{@type/^stands-for/value}_{title}'
  example: fk_work_orders_customer_id
  case: snake
  max-length: 63
links:
- type: describes
  to: dm--type-data-index
- type: describes
  to: dm--type-data-constraint
---
`<table>` is the table the object belongs to; `<columns>` are the columns it covers, joined with _. A primary key is just pk_<table>.
