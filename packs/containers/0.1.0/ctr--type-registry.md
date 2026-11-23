---
id: ctr--type-registry
type: type
title: registry
fields:
  name: registry
  plane: ctr--containers
  description: Use for the place images are stored and pulled from. Every image that runs somewhere other
    than the machine that built it needs one.
  fields:
  - name: url
    kind: text
    label: Address
  - name: visibility
    kind: choice
    required: true
    values:
    - private
    - public
  - name: body
    kind: text
    label: Description
    required: true
  pack: containers@0.1.0
---
**Ask:** Who can pull from it? Who can push to it? Is it a managed cloud service?

If it is a managed service (Amazon ECR, Azure Container Registry, Docker Hub), link it to that service with `runs-in`.
