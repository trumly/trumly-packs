---
id: ctr--type-volume
type: type
title: volume
fields:
  name: volume
  plane: ctr--containers
  description: Use for storage a container reads or writes outside its own disposable filesystem, such
    as a database folder or uploaded files.
  fields:
  - name: kind
    kind: choice
    required: true
    values:
    - named
    - bind
    - tmpfs
  - name: size
    kind: text
  - name: body
    kind: text
    label: Description
    required: true
  pack: containers@0.1.0
---
**Ask:** What is kept here, and must it survive the container being replaced?

Containers attach it with `mounts`.
