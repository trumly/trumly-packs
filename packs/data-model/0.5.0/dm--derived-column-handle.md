---
id: dm--derived-column-handle
type: derived
title: Column handle
fields:
  name: column-handle
  field-name: handle
  description: A column is named by its table and its own title.
  template: '{^data-contains/title}.{title}'
  applies_to:
    type: data-column
  enabled: true
  pack: data-model@0.5.0
---
`job_event.job_id`: the table that contains the column, then the column.
