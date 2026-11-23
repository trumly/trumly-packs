---
id: container-log-agent
type: container
title: Log agent container
plane: ctr--containers
fields:
  runs-as-root: true
links:
- type: runs
  to: image-log-agent
- type: runs-in
  to: workload-log-agent
---
Reads log files from each node and ships them. Runs as root because it must read files owned by other processes.
