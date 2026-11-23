---
id: datastore-ops-cache
type: datastore
title: Ops cache
plane: dsn--design
fields:
  kind: cache
  owner: Platform
---
Holds recent job statuses so the API does not ask the database every time. It can be rebuilt from the database.
