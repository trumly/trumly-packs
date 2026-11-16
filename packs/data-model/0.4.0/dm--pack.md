---
id: dm--pack
type: pack
title: Data model
fields:
  name: data-model
  namespace: dm
  version: 0.4.0
  description: 'Concept to table in three layers: concepts, entities and attributes, then databases, schemas,
    tables, columns, indexes, constraints, views and grants. Twelve rules keep the model honest, including
    that every foreign key points at one primary key of the same type.'
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - datastore
  use-when: 'When you need to say what is inside a datastore: the concepts, the entities and attributes,
    then the databases, schemas, tables, columns and indexes that realise them.'
  requires:
  - core@^1.0.0
---
