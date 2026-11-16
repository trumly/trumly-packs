---
id: api--pack
type: pack
title: API
fields:
  name: api
  namespace: api
  version: 0.2.0
  description: 'An API as a contract: resources and endpoints, the schemas they accept and return, the
    errors they raise and how each is secured. Rules refuse an endpoint with no response, no error cases
    or no stated security.'
  license: Apache-2.0
  publisher: trumly
  role: enrichment
  enriches:
  - interface
  use-when: 'When the system offers an API and you need its contract: the resources, endpoints, schemas,
    errors and how each is secured.'
  requires:
  - core@^1.0.0
---
