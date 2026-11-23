---
id: ctr--type-image
type: type
title: image
fields:
  name: image
  plane: ctr--containers
  description: Use for a packaged, versioned build of your software that can be started as a container.
    Build it once, run it in many places. One image per deployable piece of software.
  fields:
  - name: repository
    kind: text
    label: Repository name
  - name: tag
    kind: text
    label: Version tag
    required: true
  - name: digest
    kind: text
    label: Content digest
  - name: base-image
    kind: text
    label: Base image
  - name: body
    kind: text
    label: Description
    required: true
  pack: containers@0.1.0
---
**Ask:** What software does this package? Which version? Where is it stored?

**Watch for:** the `latest` tag (you cannot tell what is running) and secrets baked into the image (keep them in a secret).

Link it to the thing it holds with `packages`, and to its registry with `stored-in`.
