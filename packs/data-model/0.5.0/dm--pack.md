---
id: dm--pack
type: pack
title: Data model
fields:
  name: data-model
  namespace: dm
  version: 0.5.0
  description: 'Concept to table in three layers: concepts, entities and attributes, then databases, schemas,
    tables, columns, indexes, constraints, views and grants. Seventeen rules keep the model honest, including
    that every foreign key points at one primary key of the same type and every relational datastore has a database.'
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  default-pattern: starter-data-model
  starter-patterns:
  - starter-data-model
  - naming-data-models
  enriches:
  - datastore
  use-when: 'When you need to say what is inside a datastore: the concepts, the entities and attributes,
    then the databases, schemas, tables, columns and indexes that realise them.'
  requires:
  - core@^1.0.0
  optional:
  - links@^1.0.0
  - naming@^0.1.0
---
