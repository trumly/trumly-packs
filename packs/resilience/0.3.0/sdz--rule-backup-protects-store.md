---
id: sdz--rule-backup-protects-store
type: rule
title: Backups protect a datastore
fields:
  name: Backups protect a datastore
  statement: Every backup is the backup of a datastore
  severity: warn
  applies_to:
    type: backup
  check:
    any_of:
    - require_link:
        min: 1
        type: backed-up-by
        dir: in
        node_type: datastore
  pack: resilience@0.3.0
---
**Why:** a backup nothing points at protects nothing.

**Fix:** link the datastore it protects to it with `backed-up-by`.
