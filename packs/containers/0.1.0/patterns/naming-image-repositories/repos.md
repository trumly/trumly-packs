---
id: repos
type: name-pattern
title: Image repositories
plane: ctr--names
fields:
  scope: Container image repository names and tags
  pattern: '{title}'
  example: ops-api
  case: kebab
  max-length: 128
links:
- type: describes
  to: ctr--type-image
---
Name the repository after the design component the image packages, and set it in the image's `repository` field. Tags are the release version, never latest; add the short commit (1.4.2-a1b2c3d) for builds between releases. One image for every environment: promote the same tag rather than rebuilding per environment. Guidance only: the repository field is the name.
