---
id: tables
type: name-pattern
title: Tables
plane: dm--names
fields:
  scope: Database tables
  pattern: '{title}'
  example: work_orders
  case: snake
  max-length: 63
links:
- type: describes
  to: dm--type-data-table
---
The title is the name. Choose singular or plural and keep to it across the model; the ops example uses singular (`job`). 63 is the PostgreSQL identifier limit; lower it for other engines. Guidance only: data objects are titled by their real names.
