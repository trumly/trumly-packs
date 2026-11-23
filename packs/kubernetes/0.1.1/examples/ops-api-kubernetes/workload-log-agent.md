---
id: workload-log-agent
type: workload
title: log-agent
plane: k8s--kubernetes
fields:
  kind: daemon-set
links:
- type: details
  to: component-log-agent
- type: belongs-to
  to: namespace-ops
---
One copy on every machine, so it collects logs from everything that runs there.
