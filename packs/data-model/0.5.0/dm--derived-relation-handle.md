---
id: dm--derived-relation-handle
type: derived
title: Table and view handle
fields:
  name: relation-handle
  field-name: handle
  description: A table or view is named by its title.
  template: '{title}'
  applies_to:
    type:
    - data-table
    - data-view
  enabled: true
  pack: data-model@0.5.0
---
Title the table with its real name (`job`) and the handle is the same, so a search for the live table finds it.
