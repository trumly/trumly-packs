---
id: dm--derived-constraint-handle
type: derived
title: Constraint handle
fields:
  name: constraint-handle
  field-name: handle
  description: A constraint is named by its kind and the table it constrains.
  template: '{kind}_{data-constrains/title}'
  applies_to:
    type: data-constraint
  enabled: true
  pack: data-model@0.5.0
---
`unique_job_event`. Add the columns to the constraint's title if one table has several of the same kind.
