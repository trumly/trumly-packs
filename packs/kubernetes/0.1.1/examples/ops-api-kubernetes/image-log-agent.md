---
id: image-log-agent
type: image
title: Log agent image
plane: ctr--containers
fields:
  repository: log-agent
  tag: 2.9.1
links:
- type: stored-in
  to: registry-ecr
---
Collects logs from every machine and ships them to the log store.
