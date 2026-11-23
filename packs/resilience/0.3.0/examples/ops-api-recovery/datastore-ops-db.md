---
id: datastore-ops-db
type: datastore
title: Ops db
plane: dsn--design
fields:
  kind: relational
  owner: Platform
links:
- type: backed-up-by
  to: backup-ops-db
- type: recovers-to
  to: rec-ops-db
---

Holds every job and its latest status.
