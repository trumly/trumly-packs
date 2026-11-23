---
id: k8s--type-workload
type: type
title: workload
fields:
  name: workload
  plane: k8s--kubernetes
  description: 'Use for anything you ask the cluster to run: an API, a worker, a database, a one-off task
    or a scheduled job. The kind says how it runs. This replaces separate deployment, stateful-set, daemon-set,
    job and cron-job types.'
  fields:
  - name: kind
    kind: choice
    required: true
    values:
    - deployment
    - stateful-set
    - daemon-set
    - job
    - cron-job
  - name: replicas
    kind: number
    label: Copies
  - name: schedule
    kind: text
    label: Schedule (cron-job only)
  pack: kubernetes@0.1.1
---
**Ask:** Does it run all the time, once, or on a schedule? Does it keep its own data? How many copies?

- **deployment**: stateless, runs continuously (most web apps and APIs).
- **stateful-set**: runs continuously and keeps its own storage and identity (databases, queues).
- **daemon-set**: one copy on every machine (log or monitoring agents).
- **job**: runs once to completion (a migration).
- **cron-job**: runs on a schedule (a nightly report).

Link its containers with `runs-in` (from the container), its namespace with `belongs-to`, and config, secrets and its service account with `consumes`. Pods are created by the cluster and are not modelled.
