---
id: ctr--type-compose-project
type: type
title: compose-project
fields:
  name: compose-project
  plane: ctr--containers
  description: Use for a group of containers started together on one host from a single Compose file,
    such as an app, its database and its cache.
  fields:
  - name: file
    kind: text
    label: Compose file
    required: true
  - name: purpose
    kind: choice
    values:
    - development
    - testing
    - production
  - name: body
    kind: text
    label: Description
    required: true
  pack: containers@0.1.0
---
**Ask:** Which Compose file? Is it for development, testing or production?

Its containers join it with `belongs-to`; it runs on a host with `runs-in`.
