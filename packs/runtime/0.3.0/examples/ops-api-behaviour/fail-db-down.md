---
id: fail-db-down
type: failure-mode
title: Database down
plane: sdr--behaviour
fields:
  likelihood: rare
  impact: outage
links:
- type: mitigated-by
  to: component-ops-api
---
When the database does not answer, the API returns a clear error instead of hanging, so staff see the fault at once.
