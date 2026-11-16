---
id: datastore-ops-db
type: datastore
title: Operations database
plane: dsn--design
fields:
  kind: relational
  owner: Platform team
links:
- type: backed-up-by
  to: backup-ops-db
- type: recovers-to
  to: rec-ops-db
---
Holds every job and its latest status.
