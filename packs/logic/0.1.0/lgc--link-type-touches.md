---
id: lgc--link-type-touches
type: link-type
title: touches
fields:
  name: touches
  description: 'Use to say what a step works on. Say how in the link''s `how`: call, read, write, publish
    or subscribe.'
  inverse: is touched by
  from:
  - step
  to:
  - interface
  - queue
  - datastore
  - api-endpoint
  - api-event
  - data-table
  pack: logic@0.1.0
---
