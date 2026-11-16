---
id: sdz--rule-backup-tested
type: rule
title: Backups are restore-tested
fields:
  name: Backups are restore-tested
  statement: Every backup has had a restore tested
  severity: warn
  applies_to:
    type: backup
  check:
    field_is:
      restore_tested:
        in:
        - true
  pack: resilience@0.2.0
---
