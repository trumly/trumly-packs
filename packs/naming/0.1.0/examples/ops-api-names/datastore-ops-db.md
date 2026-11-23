---
id: datastore-ops-db
type: datastore
title: Ops db
plane: dsn--design
fields:
  kind: relational
  owner: Platform
links:
- type: placed-in
  to: zone-private
- type: runs-in
  to: environment-production
---

Holds every job and its latest status.
