---
id: dm--derived-index-handle
type: derived
title: Index handle
fields:
  name: index-handle
  field-name: handle
  description: An index is named by its kind token, its table and the column it covers.
  template: '{@type/^stands-for/value}_{data-indexes/^data-contains/title}_{data-indexes/title}'
  applies_to:
    type: data-index
  enabled: true
  pack: data-model@0.5.0
---
`ix_job_event_job_id`. The `ix` comes from the naming token that stands for an index; without the naming pack the handle is reported incomplete.
